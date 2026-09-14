"use client";

import Link from "next/link";
import { Check, Bookmark } from "lucide-react";
import { cn } from "cn";
import { TierBadge, ExamImportanceBadge } from "@/components/badges";
import { useProgressStore } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import type { Lesson } from "@/lib/types";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const mounted = useHasMounted();
  const progress = useProgressStore((s) => s.lessons[lesson.id]);

  const completed = mounted && Boolean(progress?.completed);
  const bookmarked = mounted && Boolean(progress?.bookmarked);

  return (
    <Link
      href={`/course/${lesson.id}`}
      className={cn(
        "group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/30",
        completed && "border-success/30 bg-success/[0.03]"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium leading-snug text-foreground group-hover:text-primary">
          {lesson.title}
        </h3>
        <div className="flex shrink-0 items-center gap-1.5">
          {bookmarked && <Bookmark className="size-3.5 fill-primary text-primary" />}
          {completed && (
            <span className="flex size-4 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check className="size-2.5" />
            </span>
          )}
        </div>
      </div>
      <p className="line-clamp-2 text-xs text-muted-foreground">{lesson.oneLiner}</p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
        <TierBadge tier={lesson.tier} />
        <ExamImportanceBadge importance={lesson.examImportance} />
      </div>
    </Link>
  );
}
