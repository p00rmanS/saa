export function ArchitectureDiagram({
  diagram,
  caption,
}: {
  diagram: string;
  caption?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-card">
      <pre
        data-no-swipe-nav
        className="scrollbar-thin overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-foreground/90 sm:text-sm"
      >
        {diagram}
      </pre>
      {caption && (
        <figcaption className="border-t border-border px-4 py-2.5 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
