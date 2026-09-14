"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { allLessons, lessonCategories } from "@/data";
import { LessonCard } from "@/components/lesson/lesson-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "cn";

const EXCLUDED_CATEGORIES = ["Orientation", "Exam Mastery"];

export default function ServicesPage() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);

  const categories = lessonCategories.filter((c) => !EXCLUDED_CATEGORIES.includes(c));
  const totalServiceLessons = allLessons.filter((l) => !EXCLUDED_CATEGORIES.includes(l.category)).length;

  const lessons = allLessons.filter((l) => {
    if (EXCLUDED_CATEGORIES.includes(l.category)) return false;
    if (category && l.category !== category) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        l.title.toLowerCase().includes(q) ||
        l.oneLiner.toLowerCase().includes(q) ||
        l.examKeywords.some((k) => k.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Services</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Every AWS service in scope for SAA-C03, with a dedicated lesson page each. {totalServiceLessons}
        service and concept pages covering all four exam domains.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services…"
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="outline"
            onClick={() => setCategory(null)}
            className={cn(
              "cursor-pointer",
              !category ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-muted-foreground"
            )}
          >
            All ({totalServiceLessons})
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
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>

      {lessons.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted-foreground">No services match your search.</p>
      )}
    </div>
  );
}
