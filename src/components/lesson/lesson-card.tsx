"use client";

import Link from "next/link";
import { Check, Bookmark } from "lucide-react";
import { cn } from "cn";
import { TIER_LABEL } from "@/components/badges";
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
        "group flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/30",
        completed && "bg-muted/40"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading text-lg font-semibold leading-snug text-foreground group-hover:underline">
          {lesson.title}
        </h3>
        <div className="flex shrink-0 items-center gap-1.5 pt-1">
          {bookmarked && <Bookmark className="size-3.5 fill-primary text-primary" />}
          {completed && (
            <span className="flex size-4 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check className="size-2.5" />
            </span>
          )}
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-muted-foreground">{lesson.oneLiner}</p>
      <p className="mt-auto pt-1 text-xs text-muted-foreground">{TIER_LABEL[lesson.tier]}</p>
    </Link>
  );
}
