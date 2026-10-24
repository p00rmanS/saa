"use client";

import * as React from "react";
import { cn } from "cn";
import { allQuestions } from "@/data";
import { CheckpointQuiz } from "@/components/quiz/checkpoint-quiz";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { seededShuffle } from "@/lib/shuffle";
import type { Difficulty, ExamDomainId } from "@/lib/types";

const PAGE_SIZE = 10;
const FILTERS: { value: Difficulty | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

/**
 * A domain practice set can hold hundreds of questions, so it is shown ten at a time, mixed across topics
 * in a stable order, with a difficulty filter and an option to hide questions already answered correctly.
 */
export function DomainPractice({ domain }: { domain: ExamDomainId }) {
  const mounted = useHasMounted();
  const attempts = useProgressStore((s) => s.questionAttempts);
  const [difficulty, setDifficulty] = React.useState<Difficulty | "all">("all");
  const [hideMastered, setHideMastered] = React.useState(false);
  const [page, setPage] = React.useState(0);

  const pool = React.useMemo(
    () =>
      seededShuffle(
        allQuestions.filter((q) => q.domain === domain),
        `domain-practice-${domain}`
      ),
    [domain]
  );

  const filtered = pool.filter((q) => {
    if (difficulty !== "all" && q.difficulty !== difficulty) return false;
    if (hideMastered && mounted && attempts[q.id]?.correct) return false;
    return true;
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const visible = filtered.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  function changeDifficulty(value: Difficulty | "all") {
    setDifficulty(value);
    setPage(0);
  }

  function go(next: number) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => changeDifficulty(f.value)}
            className={cn(
              "rounded-md border px-3 py-1.5 text-sm transition-colors",
              difficulty === f.value
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-muted/40"
            )}
          >
            {f.label}
          </button>
        ))}
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground sm:ml-auto">
          <input
            type="checkbox"
            checked={hideMastered}
            onChange={(e) => {
              setHideMastered(e.target.checked);
              setPage(0);
            }}
          />
          Hide questions I answered correctly
        </label>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {filtered.length} question{filtered.length === 1 ? "" : "s"} · page {current + 1} of {pageCount}
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {visible.map((q, i) => (
          <CheckpointQuiz key={q.id} question={q} index={current * PAGE_SIZE + i} />
        ))}
        {visible.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No questions match. Change the filter to see more.
          </p>
        )}
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <Button variant="outline" size="sm" disabled={current === 0} onClick={() => go(current - 1)}>
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            {current + 1} / {pageCount}
          </span>
          <Button size="sm" disabled={current >= pageCount - 1} onClick={() => go(current + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
