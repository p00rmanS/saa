"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "cn";
import type { WhyNotScenario } from "@/lib/types";

export function WhyNotExplorer({ scenarios }: { scenarios: WhyNotScenario[] }) {
  const [scenarioId, setScenarioId] = React.useState(scenarios[0]?.id);
  const [picked, setPicked] = React.useState<string | null>(null);

  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];

  function selectScenario(id: string) {
    setScenarioId(id);
    setPicked(null);
  }

  if (!scenario) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            onClick={() => selectScenario(s.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
              scenario.id === s.id
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-muted/40"
            )}
          >
            Scenario {i + 1}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm font-medium text-foreground/90">{scenario.scenario}</p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {scenario.choices.map((choice) => {
          const isPicked = picked === choice;
          const isCorrect = choice === scenario.correctChoice;
          const revealed = picked !== null;

          return (
            <button
              key={choice}
              onClick={() => setPicked(choice)}
              className={cn(
                "flex flex-col gap-1.5 rounded-xl border p-3.5 text-left transition-colors",
                !revealed && "border-border hover:border-primary/40 hover:bg-muted/30",
                revealed && isCorrect && "border-success/50 bg-success/5",
                revealed && isPicked && !isCorrect && "border-danger/50 bg-danger/5",
                revealed && !isPicked && !isCorrect && "border-border opacity-60"
              )}
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                {revealed && isCorrect && <Check className="size-4 text-success" />}
                {revealed && isPicked && !isCorrect && <X className="size-4 text-danger" />}
                {choice}
              </span>
              {revealed && (
                <span
                  className={cn(
                    "text-xs",
                    isCorrect ? "text-success" : isPicked ? "text-danger" : "text-muted-foreground"
                  )}
                >
                  {scenario.reasoning[choice]}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
