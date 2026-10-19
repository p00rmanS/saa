"use client";

import * as React from "react";
import Link from "next/link";
import { Flame, Target, CheckCircle2, Percent, ArrowRight } from "lucide-react";
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
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-foreground/70">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xl font-semibold tabular-nums leading-none">{value}</p>
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
        <h1 className="text-4xl font-semibold sm:text-5xl">Your progress</h1>
        <p className="mt-2 text-muted-foreground">Welcome back. Here is where you stand against the SAA-C03 exam.</p>
      </div>

      {/* Readiness hero */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4 sm:gap-6">
            <ReadinessRing value={overall} size={104} strokeWidth={8} />
            <div className="min-w-0 flex-1 lg:max-w-xs">
              <p className="text-sm text-muted-foreground">Exam readiness</p>
              <p className="font-heading text-2xl font-semibold">{examReadinessLabel(overall)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Lesson completion counts for 40% and quiz accuracy for 60%, weighted by how much each
                domain counts on the real exam.
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
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Weakest domain</p>
          <p className="mt-1 text-lg font-semibold">{weakest.title}</p>
          <p className="text-sm text-muted-foreground">{Math.round(weakest.score)}%. Spend your next session here.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Strongest domain</p>
          <p className="mt-1 text-lg font-semibold">{strongest.title}</p>
          <p className="text-sm text-muted-foreground">{Math.round(strongest.score)}%</p>
        </div>
      </div>

      {/* Continue learning */}
      {nextLesson && (
        <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-muted-foreground">Pick up where you left off</p>
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
            <h2 className="text-2xl font-semibold">Worth another look</h2>
            <Link href="/weak-areas" className="text-sm text-primary underline-offset-4 hover:underline">
              All weak areas →
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
