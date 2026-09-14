"use client";

import * as React from "react";
import { Flag, Clock, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { QuestionOptions } from "@/components/quiz/question-options";
import { DifficultyBadge, DomainBadge } from "@/components/badges";
import { generateMockExam } from "@/lib/mock-exam";
import { useProgressStore } from "@/lib/store";
import type { ExamDomainId, MockExamResult, Question } from "@/lib/types";
import { DOMAIN_TITLES } from "@/lib/readiness";

function arraysEqualAsSets(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((x) => setB.has(x));
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type Phase = "running" | "results";

/**
 * Generates the question set on the client only, inside an effect. The
 * selection is randomized (seeded by Date.now()), so it must never run
 * during a render that could be server-rendered — otherwise the client's
 * hydration render would regenerate a *different* random set than the
 * server sent down, producing a hydration mismatch. Rendering a loading
 * state until the effect fires sidesteps that entirely.
 */
export function MockExamRunner({
  totalQuestions,
  durationMinutes,
}: {
  totalQuestions: number;
  durationMinutes: number;
}) {
  const [questions, setQuestions] = React.useState<Question[] | null>(null);

  React.useEffect(() => {
    // Intentional: generateMockExam is randomized and must only ever run on
    // the client, never during a render that could be server-rendered (see
    // the comment above this component for why). There's no external
    // system to subscribe to here — deferring to an effect is the fix.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuestions(generateMockExam(totalQuestions));
  }, [totalQuestions]);

  if (!questions) {
    return <div className="h-96 animate-pulse rounded-xl border border-border bg-card" />;
  }

  return <MockExamActive questions={questions} durationMinutes={durationMinutes} />;
}

function MockExamActive({
  questions,
  durationMinutes,
}: {
  questions: Question[];
  durationMinutes: number;
}) {
  const [answers, setAnswers] = React.useState<Record<string, string[]>>({});
  const [flagged, setFlagged] = React.useState<Set<string>>(new Set());
  const [current, setCurrent] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>("running");
  const [secondsLeft, setSecondsLeft] = React.useState(durationMinutes * 60);
  const [result, setResult] = React.useState<MockExamResult | null>(null);
  const startedAt = React.useRef(0);
  const answersRef = React.useRef(answers);
  const submittedRef = React.useRef(false);
  const addMockExamResult = useProgressStore((s) => s.addMockExamResult);
  const recordAnswer = useProgressStore((s) => s.recordAnswer);

  React.useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  React.useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const submit = React.useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    const currentAnswers = answersRef.current;
    const domainScores: Record<ExamDomainId, { correct: number; total: number }> = {
      1: { correct: 0, total: 0 },
      2: { correct: 0, total: 0 },
      3: { correct: 0, total: 0 },
      4: { correct: 0, total: 0 },
    };
    let correct = 0;
    for (const question of questions) {
      const given = currentAnswers[question.id] ?? [];
      const isCorrect = arraysEqualAsSets(given, question.correctAnswers);
      domainScores[question.domain].total += 1;
      if (isCorrect) {
        domainScores[question.domain].correct += 1;
        correct += 1;
      }
      recordAnswer(question.id, isCorrect);
    }
    const durationSeconds = Math.round((Date.now() - startedAt.current) / 1000);
    const examResult: MockExamResult = {
      id: `mock-${Date.now()}`,
      takenAt: new Date().toISOString(),
      totalQuestions: questions.length,
      correct,
      domainScores,
      durationSeconds,
    };
    setResult(examResult);
    addMockExamResult(examResult);
    setPhase("results");
  }, [questions, recordAnswer, addMockExamResult]);

  React.useEffect(() => {
    if (phase !== "running") return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  React.useEffect(() => {
    if (phase === "running" && secondsLeft === 0) {
      submit();
    }
  }, [phase, secondsLeft, submit]);

  const q = questions[current];
  const selected = answers[q.id] ?? [];

  function setSelected(next: string[]) {
    setAnswers((a) => ({ ...a, [q.id]: next }));
  }

  function toggleFlag() {
    setFlagged((f) => {
      const next = new Set(f);
      if (next.has(q.id)) next.delete(q.id);
      else next.add(q.id);
      return next;
    });
  }

  const answeredCount = Object.keys(answers).filter((id) => answers[id]?.length > 0).length;

  if (phase === "results" && result) {
    const pct = Math.round((result.correct / result.totalQuestions) * 100);
    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Mock Exam Result
          </p>
          <p className={cn("mt-2 font-mono text-5xl font-bold", pct >= 75 ? "text-success" : pct >= 50 ? "text-warning" : "text-danger")}>
            {pct}%
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {result.correct} / {result.totalQuestions} correct · {formatTime(result.durationSeconds)} elapsed
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {([1, 2, 3, 4] as ExamDomainId[]).map((d) => {
            const s = result.domainScores[d];
            const domainPct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
            return (
              <div key={d} className="rounded-xl border border-border p-4">
                <p className="text-sm font-medium">{DOMAIN_TITLES[d]}</p>
                <p className="mt-1 font-mono text-lg tabular-nums">
                  {domainPct}%{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    ({s.correct}/{s.total})
                  </span>
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full", domainPct >= 70 ? "bg-success" : "bg-danger")}
                    style={{ width: `${domainPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold tracking-tight">Review Answers</h2>
          <div className="flex flex-col gap-3">
            {questions.map((question, i) => {
              const given = answers[question.id] ?? [];
              const isCorrect = arraysEqualAsSets(given, question.correctAnswers);
              return (
                <div key={question.id} className="rounded-xl border border-border p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">Q{i + 1}</span>
                    <DomainBadge domain={question.domain} />
                    <DifficultyBadge difficulty={question.difficulty} />
                    <span
                      className={cn(
                        "ml-auto flex items-center gap-1 text-xs font-medium",
                        isCorrect ? "text-success" : "text-danger"
                      )}
                    >
                      {isCorrect ? <Check className="size-3.5" /> : null}
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>
                  <p className="mb-3 text-sm">{question.scenario}</p>
                  <QuestionOptions question={question} selected={given} onChange={() => {}} revealed disabled />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-3">
        <span className="text-sm text-muted-foreground">
          Answered {answeredCount}/{questions.length}
        </span>
        <span
          className={cn(
            "flex items-center gap-1.5 font-mono text-sm font-semibold tabular-nums",
            secondsLeft < 300 ? "text-danger" : "text-foreground"
          )}
        >
          <Clock className="size-4" />
          {formatTime(secondsLeft)}
        </span>
        <Button size="sm" onClick={submit}>
          Submit Exam
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {questions.map((question, i) => {
          const isAnswered = (answers[question.id]?.length ?? 0) > 0;
          const isFlagged = flagged.has(question.id);
          return (
            <button
              key={question.id}
              onClick={() => setCurrent(i)}
              className={cn(
                "flex size-7 items-center justify-center rounded-md border font-mono text-[11px] transition-colors",
                i === current && "ring-2 ring-primary",
                isAnswered ? "border-success/40 bg-success/10 text-success" : "border-border text-muted-foreground",
                isFlagged && "border-warning/50 bg-warning/10 text-warning"
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">
            Question {current + 1} of {questions.length}
          </span>
          <DomainBadge domain={q.domain} />
          <DifficultyBadge difficulty={q.difficulty} />
          {q.type === "multiple" && (
            <span className="text-xs text-muted-foreground">Select all that apply</span>
          )}
          <Button
            size="icon-sm"
            variant="outline"
            className={cn("ml-auto", flagged.has(q.id) && "border-warning/40 text-warning")}
            onClick={toggleFlag}
            aria-label="Flag for review"
          >
            <Flag className="size-3.5" />
          </Button>
        </div>

        <p className="mb-4 text-sm leading-relaxed">{q.scenario}</p>

        <QuestionOptions question={q} selected={selected} onChange={setSelected} revealed={false} />
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
          <ChevronLeft className="size-4" /> Previous
        </Button>
        {current === questions.length - 1 ? (
          <Button onClick={submit}>Submit Exam</Button>
        ) : (
          <Button onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}>
            Next <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
