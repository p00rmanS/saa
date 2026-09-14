"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { glossary } from "@/data/glossary";
import { Input } from "@/components/ui/input";
import { useProgressStore, DEFAULT_SETTINGS } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";

export default function GlossaryPage() {
  const [query, setQuery] = React.useState("");
  const mounted = useHasMounted();
  const taglishModeFromStore = useProgressStore((s) => s.settings.taglishMode);
  // Fall back to the default until mounted so a returning user with
  // "English only" saved doesn't cause a hydration mismatch.
  const taglishMode = mounted ? taglishModeFromStore : DEFAULT_SETTINGS.taglishMode;

  const terms = glossary
    .filter((t) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
    })
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Glossary</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Core architecture vocabulary, every term with a Taglish explanation.
      </p>

      <div className="relative mt-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms…"
          className="pl-8"
        />
      </div>

      <dl className="mt-6 flex flex-col divide-y divide-border rounded-xl border border-border">
        {terms.map((t) => (
          <div key={t.id} id={t.id} className="scroll-mt-20 p-4">
            <dt className="text-base font-semibold">{t.term}</dt>
            <dd className="mt-1 text-sm text-foreground/90">{t.definition}</dd>
            {taglishMode !== "english" && (
              <dd className="mt-2 rounded-lg border border-info/20 bg-info/5 p-2.5 text-sm text-muted-foreground">
                <span className="font-medium text-info">Taglish: </span>
                {t.taglish}
              </dd>
            )}
          </div>
        ))}
        {terms.length === 0 && (
          <p className="p-6 text-center text-sm text-muted-foreground">No terms match your search.</p>
        )}
      </dl>
    </div>
  );
}
