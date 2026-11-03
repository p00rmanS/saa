"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { studyPaths } from "@/lib/paths";
import { useProgressStore } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { TIER_LABEL } from "@/components/badges";
import { cn } from "@/lib/utils";

export default function PathsPage() {
  const mounted = useHasMounted();
  const progress = useProgressStore((s) => s.lessons);
  const [activeId, setActiveId] = useState(studyPaths[1].id);
  const active = studyPaths.find((p) => p.id === activeId) ?? studyPaths[0];
  const done = mounted ? active.lessons.filter((l) => progress[l.id]?.completed).length : 0;
  const next = mounted ? active.lessons.find((l) => !progress[l.id]?.completed) : active.lessons[0];

  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-semibold sm:text-5xl">Study paths</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Pick the route that matches where you are. Every path ends at the same place: ready for SAA-C03.
        Progress is shared with the full course, so finishing a lesson here checks it off everywhere.
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Study paths">
        {studyPaths.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={p.id === active.id}
            onClick={() => setActiveId(p.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              p.id === active.id
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">{active.title}</h2>
        <p className="mt-1 text-muted-foreground">{active.audience}</p>
        <p className="mt-1 text-muted-foreground">{active.summary}</p>
        <p className="mt-3 text-sm tabular-nums text-muted-foreground">
          {done} of {active.lessons.length} lessons complete
          {next && (
            <>
              {" "}
              ·{" "}
              <Link href={`/course/${next.id}`} className="text-foreground underline underline-offset-4">
                {done === 0 ? "Start" : "Continue"}: {next.title}
              </Link>
            </>
          )}
        </p>

        <ol className="mt-5 divide-y divide-border rounded-lg border border-border bg-card">
          {active.lessons.map((lesson, i) => {
            const isDone = mounted && Boolean(progress[lesson.id]?.completed);
            return (
              <li key={lesson.id}>
                <Link href={`/course/${lesson.id}`} className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50">
                  <span className="w-8 shrink-0 text-right text-sm tabular-nums text-muted-foreground">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{lesson.title}</span>
                    <span className="block text-sm text-muted-foreground">
                      {lesson.category} · {TIER_LABEL[lesson.tier]}
                    </span>
                  </span>
                  {isDone && <Check className="size-4 shrink-0 text-foreground" aria-label="Completed" />}
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
