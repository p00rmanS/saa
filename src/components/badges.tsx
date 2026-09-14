import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import type { Difficulty, ExamDomainId, ExamImportance, Tier } from "@/lib/types";
import { DOMAIN_SHORT_TITLES } from "@/lib/readiness";

export function TierBadge({ tier }: { tier: Tier }) {
  const label = tier === 1 ? "Must Know" : tier === 2 ? "Important" : "Recognize";
  const cls =
    tier === 1
      ? "border-primary/30 bg-primary/10 text-primary"
      : tier === 2
        ? "border-info/30 bg-info/10 text-info"
        : "border-muted-foreground/20 bg-muted text-muted-foreground";
  return (
    <Badge variant="outline" className={cn("font-medium", cls)}>
      {label}
    </Badge>
  );
}

export function ExamImportanceBadge({ importance }: { importance: ExamImportance }) {
  const stars = importance === "critical" ? 5 : importance === "high" ? 4 : importance === "medium" ? 3 : 2;
  return (
    <span className="inline-flex items-center gap-0.5 font-mono text-xs text-warning" title={`Exam importance: ${importance}`}>
      {"★".repeat(stars)}
      <span className="text-muted-foreground">{"★".repeat(5 - stars)}</span>
    </span>
  );
}

export function DomainBadge({ domain }: { domain: ExamDomainId }) {
  return (
    <Badge variant="outline" className="border-border bg-muted/50 text-muted-foreground">
      Domain {domain} · {DOMAIN_SHORT_TITLES[domain]}
    </Badge>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const cls =
    difficulty === "easy"
      ? "border-success/30 bg-success/10 text-success"
      : difficulty === "medium"
        ? "border-warning/30 bg-warning/10 text-warning"
        : difficulty === "hard"
          ? "border-danger/30 bg-danger/10 text-danger"
          : "border-primary/30 bg-primary/10 text-primary";
  return (
    <Badge variant="outline" className={cn("font-medium capitalize", cls)}>
      {difficulty}
    </Badge>
  );
}
