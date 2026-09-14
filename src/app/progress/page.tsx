"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { allLessons } from "@/data";
import { useProgressStore } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { computeDomainScores, overallLessonCompletion, overallQuestionAccuracy } from "@/lib/readiness";
import { modules } from "@/data/modules";
import { lessonById } from "@/data";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-medium">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-muted-foreground">
          {p.name}: <span className="font-mono text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function ProgressPage() {
  const mounted = useHasMounted();
  const lessons = useProgressStore((s) => s.lessons);
  const questionAttempts = useProgressStore((s) => s.questionAttempts);
  const flashcards = useProgressStore((s) => s.flashcards);
  const mockExams = useProgressStore((s) => s.mockExams);

  const domainScores = computeDomainScores(lessons, questionAttempts);
  const lessonStats = overallLessonCompletion(lessons);
  const accuracy = overallQuestionAccuracy(questionAttempts);

  const domainChartData = domainScores.map((d) => ({ name: d.shortTitle, Score: Math.round(d.score) }));

  const moduleChartData = modules
    .map((mod) => {
      const total = mod.lessonIds.length;
      const completed = mod.lessonIds.filter((id) => lessons[id]?.completed).length;
      return { name: mod.title, Completed: completed, Remaining: total - completed };
    })
    .filter((m) => m.Completed + m.Remaining > 0);

  const flashcardCounts = { new: 0, know: 0, review: 0, difficult: 0 };
  for (const status of Object.values(flashcards)) {
    flashcardCounts[status] += 1;
  }

  const mockExamTrend = mockExams.map((e, i) => ({
    name: `#${i + 1}`,
    Score: Math.round((e.correct / e.totalQuestions) * 100),
  }));

  if (!mounted) return <div className="h-96" />;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Progress</h1>
        <p className="mt-2 text-muted-foreground">
          {lessonStats.completed}/{lessonStats.total} lessons complete · {accuracy.accuracy}% quiz accuracy
          across {accuracy.answered} answered questions
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold tracking-tight">Domain Readiness</h2>
        <div className="h-64 rounded-xl border border-border bg-card p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={domainChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)" }} />
              <Bar dataKey="Score" fill="var(--color-brand)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold tracking-tight">Lesson Completion by Phase</h2>
        <div className="h-80 rounded-xl border border-border bg-card p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moduleChartData} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="var(--muted-foreground)"
                fontSize={11}
                width={140}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)" }} />
              <Bar dataKey="Completed" stackId="a" fill="var(--color-success)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Remaining" stackId="a" fill="var(--muted)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-semibold tracking-tight">Flashcard Status</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-success/25 bg-success/5 p-4">
              <p className="text-2xl font-semibold text-success">{flashcardCounts.know}</p>
              <p className="text-xs text-muted-foreground">Know It</p>
            </div>
            <div className="rounded-xl border border-warning/25 bg-warning/5 p-4">
              <p className="text-2xl font-semibold text-warning">{flashcardCounts.review}</p>
              <p className="text-xs text-muted-foreground">Review Soon</p>
            </div>
            <div className="rounded-xl border border-danger/25 bg-danger/5 p-4">
              <p className="text-2xl font-semibold text-danger">{flashcardCounts.difficult}</p>
              <p className="text-xs text-muted-foreground">Difficult</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-2xl font-semibold">{allLessons.length > 0 ? Object.keys(flashcards).length : 0}</p>
              <p className="text-xs text-muted-foreground">Total Reviewed</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold tracking-tight">Mock Exam Trend</h2>
          {mockExamTrend.length > 0 ? (
            <div className="h-40 rounded-xl border border-border bg-card p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockExamTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line type="monotone" dataKey="Score" stroke="var(--color-brand)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="rounded-xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
              Take a mock exam to see your trend here.
            </p>
          )}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold tracking-tight">Bookmarked Lessons</h2>
        <BookmarkedList lessons={lessons} />
      </div>
    </div>
  );
}

function BookmarkedList({ lessons }: { lessons: Record<string, { bookmarked: boolean }> }) {
  const bookmarkedIds = Object.entries(lessons)
    .filter(([, p]) => p.bookmarked)
    .map(([id]) => id);

  if (bookmarkedIds.length === 0) {
    return <p className="text-sm text-muted-foreground">No bookmarks yet — bookmark a lesson to revisit it quickly.</p>;
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {bookmarkedIds.map((id) => {
        const lesson = lessonById.get(id);
        if (!lesson) return null;
        return (
          <a
            key={id}
            href={`/course/${id}`}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm hover:border-primary/40 hover:text-primary"
          >
            {lesson.title}
          </a>
        );
      })}
    </div>
  );
}
