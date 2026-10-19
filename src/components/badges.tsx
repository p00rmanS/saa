import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import type { Difficulty, ExamDomainId, ExamImportance, Tier } from "@/lib/types";
import { DOMAIN_SHORT_TITLES } from "@/lib/readiness";

export const TIER_LABEL: Record<Tier, string> = {
  1: "Core topic",
  2: "Important",
  3: "Know the basics",
};

export const IMPORTANCE_LABEL: Record<ExamImportance, string> = {
  critical: "Appears on nearly every exam",
  high: "Common on the exam",
  medium: "Shows up occasionally",
  low: "Rarely tested",
};

export function DomainBadge({ domain }: { domain: ExamDomainId }) {
  return (
    <Badge variant="outline" className="border-border bg-transparent font-normal text-muted-foreground">
      Domain {domain} · {DOMAIN_SHORT_TITLES[domain]}
    </Badge>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const cls =
    difficulty === "easy"
      ? "text-success"
      : difficulty === "medium"
        ? "text-warning"
        : difficulty === "hard"
          ? "text-danger"
          : "text-primary";
  return (
    <Badge variant="outline" className={cn("border-border bg-transparent font-normal capitalize", cls)}>
      {difficulty}
    </Badge>
  );
}
