"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { MockExamRunner } from "@/components/quiz/mock-exam-runner";

const PRESETS: Record<string, { count: number; minutes: number }> = {
  "10": { count: 10, minutes: 20 },
  "20": { count: 20, minutes: 40 },
  "30": { count: 30, minutes: 60 },
  "65": { count: 65, minutes: 130 },
};

export function MockExamRunClient() {
  const searchParams = useSearchParams();
  const preset = searchParams.get("count") ?? "65";
  const config = PRESETS[preset] ?? PRESETS["65"];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {config.count === 65 ? "Full Mock Exam" : `${config.count}-Question Mini Exam`}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {config.count} questions · {config.minutes} minutes · domain-weighted like the real exam
      </p>

      <div className="mt-6">
        <MockExamRunner key={preset} totalQuestions={config.count} durationMinutes={config.minutes} />
      </div>
    </div>
  );
}
