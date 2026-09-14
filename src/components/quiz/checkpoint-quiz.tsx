"use client";

import * as React from "react";
import { Lightbulb, Sparkles } from "lucide-react";
import { QuestionOptions } from "@/components/quiz/question-options";
import { DifficultyBadge } from "@/components/badges";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/lib/store";
import type { Question } from "@/lib/types";
import { cn } from "cn";

function arraysEqualAsSets(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((x) => setB.has(x));
}

export function CheckpointQuiz({ question, index }: { question: Question; index?: number }) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [submitted, setSubmitted] = React.useState(false);
  const recordAnswer = useProgressStore((s) => s.recordAnswer);

  const isCorrect = arraysEqualAsSets(selected, question.correctAnswers);

  function handleSubmit() {
    if (selected.length === 0) return;
    setSubmitted(true);
    recordAnswer(question.id, isCorrect);
  }

  function handleRetry() {
    setSubmitted(false);
    setSelected([]);
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {typeof index === "number" && (
          <span className="font-mono text-xs text-muted-foreground">Q{index + 1}</span>
        )}
        <DifficultyBadge difficulty={question.difficulty} />
        {question.type === "multiple" && (
          <span className="text-xs text-muted-foreground">Select all that apply</span>
        )}
      </div>

      <p className="mb-3 text-sm leading-relaxed">{question.scenario}</p>

      <QuestionOptions
        question={question}
        selected={selected}
        onChange={setSelected}
        revealed={submitted}
        disabled={submitted}
      />

      {!submitted ? (
        <Button className="mt-3" size="sm" onClick={handleSubmit} disabled={selected.length === 0}>
          Check Answer
        </Button>
      ) : (
        <div className="mt-3 flex flex-col gap-3">
          <div
            className={cn(
              "rounded-lg border p-3 text-sm",
              isCorrect ? "border-success/30 bg-success/5" : "border-danger/30 bg-danger/5"
            )}
          >
            <p className={cn("mb-1 font-medium", isCorrect ? "text-success" : "text-danger")}>
              {isCorrect ? "Correct!" : "Not quite."}
            </p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>

          {question.examKeywordHint && (
            <div className="flex items-start gap-2 rounded-lg border border-info/30 bg-info/5 p-3 text-sm">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-info" />
              <p>
                <span className="font-medium text-info">Exam keyword: </span>
                <span className="text-muted-foreground">{question.examKeywordHint}</span>
              </p>
            </div>
          )}

          {question.mentorTip && (
            <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
              <p>
                <span className="font-medium text-primary">Mentor Tip: </span>
                <span className="text-muted-foreground">{question.mentorTip}</span>
              </p>
            </div>
          )}

          <Button variant="outline" size="sm" className="self-start" onClick={handleRetry}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
