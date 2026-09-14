"use client";

import * as React from "react";
import Link from "next/link";
import { Flame, Target, CheckCircle2, Percent, ArrowRight, Sparkles } from "lucide-react";
import { ReadinessRing } from "@/components/readiness-ring";
import { DomainBar } from "@/components/dashboard/domain-bar";
import { LessonCard } from "@/components/lesson/lesson-card";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import {
  computeDomainScores,
  computeOverallReadiness,
  weakestDomain,
  strongestDomain,
  overallQuestionAccuracy,
  overallLessonCompletion,
  examReadinessLabel,
} from "@/lib/readiness";
import { nextLessonToContinue, recommendedReviewLessons } from "@/lib/recommendations";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-lg font-semibold tabular-nums leading-none">{value}</p>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {label}
          {sub && <span className="text-muted-foreground/70"> · {sub}</span>}
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const mounted = useHasMounted();
  const lessons = useProgressStore((s) => s.lessons);
  const questionAttempts = useProgressStore((s) => s.questionAttempts);
  const streak = useProgressStore((s) => s.studyStreak);
  const mockExams = useProgressStore((s) => s.mockExams);

  const domainScores = computeDomainScores(lessons, questionAttempts);
  const overall = computeOverallReadiness(domainScores);
  const weakest = weakestDomain(domainScores);
  const strongest = strongestDomain(domainScores);
  const accuracy = overallQuestionAccuracy(questionAttempts);
  const lessonStats = overallLessonCompletion(lessons);
  const nextLesson = nextLessonToContinue(lessons);
  const reviewLessons = recommendedReviewLessons(weakest, lessons);

  if (!mounted) {
    return <div className="h-96" />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Maligayang pagbabalik! Here&apos;s where you stand.</p>
      </div>

      {/* Readiness hero */}
      <div className="glass-panel relative overflow-hidden rounded-2xl border p-6">
        <div className="terminal-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4 sm:gap-6">
            <ReadinessRing value={overall} size={104} strokeWidth={8} />
            <div className="min-w-0 flex-1 lg:max-w-xs">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                SAA-C03 Readiness
              </p>
              <p className="text-xl font-semibold tracking-tight">{examReadinessLabel(overall)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Blended from lesson completion (40%) and quiz accuracy (60%), weighted by each
                domain&apos;s real exam weight.
              </p>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-[280px]">
            {domainScores.map((d) => (
              <DomainBar key={d.domain} domain={d} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={Flame} label="Study streak" value={String(streak)} sub="days" />
        <StatCard
          icon={CheckCircle2}
          label="Lessons done"
          value={`${lessonStats.completed}/${lessonStats.total}`}
        />
        <StatCard icon={Percent} label="Quiz accuracy" value={`${accuracy.accuracy}%`} sub={`${accuracy.answered} answered`} />
        <StatCard icon={Target} label="Mock exams taken" value={String(mockExams.length)} />
      </div>

      {/* Weak / strong */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-danger/25 bg-danger/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-danger">Weakest Domain</p>
          <p className="mt-1 text-lg font-semibold">{weakest.title}</p>
          <p className="text-sm text-muted-foreground">{Math.round(weakest.score)}% — focus here next</p>
        </div>
        <div className="rounded-xl border border-success/25 bg-success/5 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-success">Strongest Domain</p>
          <p className="mt-1 text-lg font-semibold">{strongest.title}</p>
          <p className="text-sm text-muted-foreground">{Math.round(strongest.score)}% — keep it up</p>
        </div>
      </div>

      {/* Continue learning */}
      {nextLesson && (
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/25 bg-primary/5 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-primary">
              <Sparkles className="size-3.5" /> Continue Learning
            </p>
            <p className="mt-1 text-lg font-semibold">{nextLesson.title}</p>
            <p className="text-sm text-muted-foreground">{nextLesson.oneLiner}</p>
          </div>
          <Button render={<Link href={`/course/${nextLesson.id}`} />} nativeButton={false}>
            Continue <ArrowRight className="size-4" />
          </Button>
        </div>
      )}

      {/* Recommended review */}
      {reviewLessons.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Recommended Review</h2>
            <Link href="/weak-areas" className="text-sm text-primary hover:underline">
              See weak areas →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {reviewLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
