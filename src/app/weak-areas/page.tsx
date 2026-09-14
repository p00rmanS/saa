"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { useProgressStore } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { computeDomainScores } from "@/lib/readiness";
import { recommendedReviewLessons } from "@/lib/recommendations";
import { LessonCard } from "@/components/lesson/lesson-card";
import { DomainBar } from "@/components/dashboard/domain-bar";
import { Button } from "@/components/ui/button";

export default function WeakAreasPage() {
  const mounted = useHasMounted();
  const lessons = useProgressStore((s) => s.lessons);
  const questionAttempts = useProgressStore((s) => s.questionAttempts);

  const domainScores = React.useMemo(
    () => [...computeDomainScores(lessons, questionAttempts)].sort((a, b) => a.score - b.score),
    [lessons, questionAttempts]
  );

  if (!mounted) return <div className="h-96" />;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Weak Areas</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Ranked from weakest to strongest, blending lesson completion and quiz accuracy. Start from the
        top.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {domainScores.map((d) => (
          <DomainBar key={d.domain} domain={d} />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {domainScores.map((d) => {
          const reviewLessons = recommendedReviewLessons(d, lessons, 6);
          if (reviewLessons.length === 0) return null;

          return (
            <div key={d.domain}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className={
                      d.score < 50 ? "size-4 text-danger" : d.score < 80 ? "size-4 text-warning" : "size-4 text-success"
                    }
                  />
                  <h2 className="text-lg font-semibold tracking-tight">{d.title}</h2>
                  <span className="font-mono text-sm text-muted-foreground">{Math.round(d.score)}%</span>
                </div>
                <Button size="sm" variant="outline" render={<Link href={`/quizzes/domain/${d.domain}`} />} nativeButton={false}>
                  Practice this domain <ArrowRight className="size-3.5" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {reviewLessons.map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
