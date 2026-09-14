"use client";

import * as React from "react";
import { HelpCircle, Lightbulb } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { ArchitectureDiagram } from "@/components/lesson/architecture-diagram";
import type { WhatIfScenario } from "@/lib/types";

export function WhatIfExplorer({ scenarios }: { scenarios: WhatIfScenario[] }) {
  const [scenarioId, setScenarioId] = React.useState(scenarios[0]?.id);
  const [revealedSteps, setRevealedSteps] = React.useState(0);

  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];

  function selectScenario(id: string) {
    setScenarioId(id);
    setRevealedSteps(0);
  }

  if (!scenario) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">
        {scenarios.map((s) => (
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
            {s.title}
          </button>
        ))}
      </div>

      <ArchitectureDiagram diagram={scenario.baseDiagram} />

      <div className="flex flex-col gap-3">
        {scenario.steps.slice(0, revealedSteps + 1).map((step, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4">
            <p className="flex items-center gap-2 text-sm font-medium">
              <HelpCircle className="size-4 text-primary" />
              {step.question}
            </p>
            {i < revealedSteps && (
              <ul className="mt-3 flex flex-col gap-1.5 border-t border-border pt-3">
                {step.teaches.map((t, j) => (
                  <li key={j} className="flex gap-2 text-sm text-foreground/90">
                    <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-warning" />
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {revealedSteps < scenario.steps.length ? (
        <Button
          className="self-start"
          onClick={() => setRevealedSteps((r) => Math.min(scenario.steps.length, r + 1))}
        >
          {revealedSteps === 0 ? "Reveal the answer" : "Next question →"}
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">
          You&apos;ve walked through this whole failure chain — try another scenario above.
        </p>
      )}
    </div>
  );
}
