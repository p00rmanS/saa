import { cn } from "cn";
import type { DomainScore } from "@/lib/readiness";

export function DomainBar({ domain }: { domain: DomainScore }) {
  const color =
    domain.score >= 80 ? "bg-success" : domain.score >= 50 ? "bg-primary" : "bg-danger";

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-baseline gap-x-2 text-sm">
        <span className="font-medium">{domain.shortTitle}</span>
        <span className="ml-auto shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
          {Math.round(domain.score)}%{" "}
          <span className="text-muted-foreground/60">({domain.weight}% weight)</span>
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${Math.round(domain.score)}%` }}
        />
      </div>
    </div>
  );
}
