"use client";

import * as React from "react";
import { Search, Flame } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { GlobalSearch } from "@/components/layout/global-search";
import { useProgressStore } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { Badge } from "@/components/ui/badge";

export function Topbar({ mobileTrigger }: { mobileTrigger: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const mounted = useHasMounted();
  const streak = useProgressStore((s) => s.studyStreak);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 sm:px-6 lg:px-8">
      {mobileTrigger}

      <button
        onClick={() => setSearchOpen(true)}
        className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted sm:max-w-sm"
      >
        <Search className="size-3.5" />
        <span className="flex-1 text-left">Search lessons, services, terms…</span>
        <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-2">
        {mounted && streak > 0 && (
          <Badge
            variant="outline"
            className="hidden items-center gap-1 border-warning/30 bg-warning/10 text-warning sm:flex"
          >
            <Flame className="size-3" />
            <span className="font-mono tabular-nums">{streak}</span>
            <span className="hidden md:inline">day streak</span>
          </Badge>
        )}
        <ThemeToggle />
      </div>

      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
