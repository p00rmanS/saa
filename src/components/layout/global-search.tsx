"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { BookOpen, FlaskConical, GitCompare, GraduationCap, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { allLessons } from "@/data";
import { glossary } from "@/data/glossary";
import { comparisons } from "@/data/comparisons";
import { labs } from "@/data/labs";

interface Result {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function GlobalSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  function handleOpenChange(next: boolean) {
    if (!next) setQuery("");
    onOpenChange(next);
  }

  const results = React.useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    const out: Result[] = [];

    for (const lesson of allLessons) {
      if (
        lesson.title.toLowerCase().includes(q) ||
        lesson.oneLiner.toLowerCase().includes(q) ||
        lesson.examKeywords.some((k) => k.toLowerCase().includes(q))
      ) {
        out.push({
          id: `lesson-${lesson.id}`,
          title: lesson.title,
          subtitle: lesson.category,
          href: `/course/${lesson.id}`,
          icon: GraduationCap,
        });
      }
    }

    for (const term of glossary) {
      if (term.term.toLowerCase().includes(q) || term.definition.toLowerCase().includes(q)) {
        out.push({
          id: `glossary-${term.id}`,
          title: term.term,
          subtitle: "Glossary",
          href: `/glossary#${term.id}`,
          icon: BookOpen,
        });
      }
    }

    for (const cmp of comparisons) {
      if (cmp.title.toLowerCase().includes(q)) {
        out.push({
          id: `comparison-${cmp.id}`,
          title: cmp.title,
          subtitle: "Comparison",
          href: `/quizzes/comparisons/${cmp.id}`,
          icon: GitCompare,
        });
      }
    }

    for (const lab of labs) {
      if (lab.title.toLowerCase().includes(q)) {
        out.push({
          id: `lab-${lab.id}`,
          title: lab.title,
          subtitle: "Lab",
          href: `/labs/${lab.id}`,
          icon: FlaskConical,
        });
      }
    }

    return out.slice(0, 20);
  }, [query]);

  function go(href: string) {
    handleOpenChange(false);
    router.push(href);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg gap-0 p-0" showCloseButton={false}>
        <DialogTitle className="sr-only">Search</DialogTitle>
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-4 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, glossary, comparisons, labs…"
            className="border-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="max-h-80 overflow-y-auto scrollbar-thin p-1.5">
          {query.trim().length < 2 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Type at least 2 characters to search.
            </p>
          )}
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">No results.</p>
          )}
          {results.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                onClick={() => go(r.href)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
              >
                <Icon className="size-4 shrink-0 text-muted-foreground" />
                <span className="min-w-0 flex-1 truncate">{r.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{r.subtitle}</span>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
