"use client";

import * as React from "react";
import { allFlashcards } from "@/data";
import { FlashcardDeck } from "@/components/flashcards/flashcard-deck";
import { Badge } from "@/components/ui/badge";
import { cn } from "cn";

export default function FlashcardsPage() {
  const [category, setCategory] = React.useState<string | null>(null);

  const categories = React.useMemo(
    () => Array.from(new Set(allFlashcards.map((f) => f.category))).sort(),
    []
  );

  const cards = React.useMemo(
    () => (category ? allFlashcards.filter((f) => f.category === category) : allFlashcards),
    [category]
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Flashcards</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {allFlashcards.length}+ spaced-repetition cards. Cards marked &quot;Difficult&quot; or &quot;Review
        Soon&quot; resurface first.
      </p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        <Badge
          variant="outline"
          onClick={() => setCategory(null)}
          className={cn(
            "cursor-pointer",
            !category ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-muted-foreground"
          )}
        >
          All
        </Badge>
        {categories.map((c) => (
          <Badge
            key={c}
            variant="outline"
            onClick={() => setCategory(c === category ? null : c)}
            className={cn(
              "cursor-pointer",
              category === c ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-muted-foreground"
            )}
          >
            {c}
          </Badge>
        ))}
      </div>

      <div className="mt-8">
        <FlashcardDeck cards={cards} key={category ?? "all"} />
      </div>
    </div>
  );
}
