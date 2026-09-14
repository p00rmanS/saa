"use client";

import * as React from "react";
import { cn } from "cn";
import { generateStudyPlan, type StudyPlanDayCount } from "@/lib/study-plan";

const OPTIONS: StudyPlanDayCount[] = [7, 14, 30, 45, 60, 90];

export function StudyPlanCard() {
  const [days, setDays] = React.useState<StudyPlanDayCount>(30);
  const plan = React.useMemo(() => generateStudyPlan(days), [days]);

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex flex-wrap gap-1.5">
        {OPTIONS.map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
              days === d ? "border-primary/50 bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted/40"
            )}
          >
            {d} days
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col divide-y divide-border">
        {plan.plan.map((day, i) => (
          <div key={i} className="flex items-center gap-4 py-2.5 text-sm">
            <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">{day.days}</span>
            <span className="text-foreground/90">{day.focus}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
