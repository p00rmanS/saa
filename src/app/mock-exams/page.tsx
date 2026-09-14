"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, ClipboardList, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { DOMAIN_TITLES } from "@/lib/readiness";
import type { ExamDomainId } from "@/lib/types";

const OPTIONS = [
  { count: 10, minutes: 20, label: "10-Question Mini Exam" },
  { count: 20, minutes: 40, label: "20-Question Mini Exam" },
  { count: 30, minutes: 60, label: "30-Question Mini Exam" },
  { count: 65, minutes: 130, label: "Full Mock Exam" },
];

export default function MockExamsPage() {
  const mounted = useHasMounted();
  const mockExams = useProgressStore((s) => s.mockExams);

  const fullExams = mockExams.filter((e) => e.totalQuestions === 65);
  const avgFull =
    fullExams.length > 0
      ? Math.round(
          (fullExams.reduce((sum, e) => sum + e.correct / e.totalQuestions, 0) / fullExams.length) * 100
        )
      : null;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Mock Exams</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Questions are sampled from the shared bank, stratified to match the real exam&apos;s domain
        weights (30/26/24/20). Aim for at least 2 full mock exams with a 75%+ average and no domain
        below 70% before scheduling the real thing.
      </p>

      {mounted && fullExams.length > 0 && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <TrendingUp className="size-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Full mock exam average</p>
            <p className="font-mono text-xl font-semibold">
              {avgFull}% <span className="text-sm font-normal text-muted-foreground">across {fullExams.length} attempt{fullExams.length === 1 ? "" : "s"}</span>
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((opt) => (
          <div
            key={opt.count}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ClipboardList className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium">{opt.label}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" /> {opt.minutes} minutes
                </p>
              </div>
            </div>
            <Button size="sm" render={<Link href={`/mock-exams/run?count=${opt.count}`} />} nativeButton={false}>
              Start
            </Button>
          </div>
        ))}
      </div>

      {mounted && mockExams.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-3 text-lg font-semibold tracking-tight">History</h2>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                  <th className="px-4 py-2 text-left font-medium">Type</th>
                  <th className="px-4 py-2 text-left font-medium">Score</th>
                  <th className="px-4 py-2 text-left font-medium">Weakest Domain</th>
                </tr>
              </thead>
              <tbody>
                {[...mockExams].reverse().map((exam, i) => {
                  const pct = Math.round((exam.correct / exam.totalQuestions) * 100);
                  const domains = Object.entries(exam.domainScores) as [string, { correct: number; total: number }][];
                  const weakest = domains.reduce((min, [id, s]) => {
                    const pctD = s.total > 0 ? s.correct / s.total : 1;
                    const minPct = min.s.total > 0 ? min.s.correct / min.s.total : 1;
                    return pctD < minPct ? { id, s } : min;
                  }, { id: domains[0][0], s: domains[0][1] });

                  return (
                    <tr key={exam.id} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                      <td className="border-t border-border px-4 py-2.5 text-muted-foreground">
                        {new Date(exam.takenAt).toLocaleDateString()}
                      </td>
                      <td className="border-t border-border px-4 py-2.5">
                        {exam.totalQuestions === 65 ? "Full Mock" : `${exam.totalQuestions}-Question`}
                      </td>
                      <td className="border-t border-border px-4 py-2.5 font-mono font-medium">{pct}%</td>
                      <td className="border-t border-border px-4 py-2.5 text-muted-foreground">
                        {DOMAIN_TITLES[Number(weakest.id) as ExamDomainId]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
