"use client";

import * as React from "react";
import { Check, RotateCcw, AlertTriangle, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProgressStore } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import type { Flashcard, FlashcardStatus } from "@/lib/types";

const STATUS_WEIGHT: Record<FlashcardStatus, number> = {
  difficult: 0,
  review: 1,
  new: 2,
  know: 3,
};

export function FlashcardDeck({ cards }: { cards: Flashcard[] }) {
  const mounted = useHasMounted();
  const statuses = useProgressStore((s) => s.flashcards);
  const setFlashcardStatus = useProgressStore((s) => s.setFlashcardStatus);
  const [index, setIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);

  const ordered = React.useMemo(() => {
    return [...cards].sort((a, b) => {
      const sa = STATUS_WEIGHT[statuses[a.id] ?? "new"];
      const sb = STATUS_WEIGHT[statuses[b.id] ?? "new"];
      return sa - sb;
    });
  }, [cards, statuses]);

  const boundedIndex = Math.min(index, Math.max(0, ordered.length - 1));
  const card = ordered[boundedIndex];

  function go(delta: number) {
    setFlipped(false);
    setIndex((i) => Math.min(Math.max(i + delta, 0), ordered.length - 1));
  }

  function mark(status: FlashcardStatus) {
    if (!card) return;
    setFlashcardStatus(card.id, status);
    go(1);
  }

  if (!mounted) return <div className="h-80" />;

  if (!card) {
    return <p className="py-12 text-center text-muted-foreground">No flashcards match your filters.</p>;
  }

  const known = mounted ? Object.values(statuses).filter((s) => s === "know").length : 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full max-w-lg items-center justify-between text-xs text-muted-foreground">
        <span>
          Card {boundedIndex + 1} of {ordered.length}
        </span>
        <span>{known} known overall</span>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="flex h-64 w-full max-w-lg flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-transform hover:-translate-y-0.5"
        style={{ perspective: "1000px" }}
      >
        <Badge variant="outline" className="border-border text-muted-foreground">
          {card.category}
        </Badge>
        <p className={cn("text-lg font-medium leading-snug", flipped && "text-primary")}>
          {flipped ? card.back : card.front}
        </p>
        <span className="text-xs text-muted-foreground">
          {flipped ? "Click to see the question" : "Click to reveal the answer"}
        </span>
      </button>

      <div className="flex items-center gap-2">
        <Button size="icon-sm" variant="outline" onClick={() => go(-1)} disabled={boundedIndex === 0}>
          <ChevronLeft className="size-4" />
        </Button>
        <Button size="icon-sm" variant="outline" onClick={() => setFlipped((f) => !f)}>
          <RotateCcw className="size-4" />
        </Button>
        <Button size="icon-sm" variant="outline" onClick={() => go(1)} disabled={boundedIndex === ordered.length - 1}>
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="grid w-full max-w-lg grid-cols-3 gap-2">
        <Button variant="outline" className="border-danger/30 text-danger hover:bg-danger/10" onClick={() => mark("difficult")}>
          <AlertTriangle className="size-4" /> Difficult
        </Button>
        <Button variant="outline" className="border-warning/30 text-warning hover:bg-warning/10" onClick={() => mark("review")}>
          <Clock className="size-4" /> Review Soon
        </Button>
        <Button variant="outline" className="border-success/30 text-success hover:bg-success/10" onClick={() => mark("know")}>
          <Check className="size-4" /> Know It
        </Button>
      </div>
    </div>
  );
}
