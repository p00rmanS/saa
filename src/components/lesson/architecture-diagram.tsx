import { Network } from "lucide-react";

export function ArchitectureDiagram({
  diagram,
  caption,
}: {
  diagram: string;
  caption?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2">
        <Network className="size-3.5 text-muted-foreground" />
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Architecture
        </span>
      </div>
      <pre className="scrollbar-thin overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-foreground/90 sm:text-sm">
        {diagram}
      </pre>
      {caption && (
        <p className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">{caption}</p>
      )}
    </div>
  );
}
