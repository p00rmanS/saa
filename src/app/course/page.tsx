"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { modules } from "@/data/modules";
import { lessonById } from "@/data";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useProgressStore } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { TIER_LABEL } from "@/components/badges";

export default function CoursePage() {
  const mounted = useHasMounted();
  const progress = useProgressStore((s) => s.lessons);

  const totalLessons = modules.reduce((n, m) => n + m.lessonIds.length, 0);

  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-semibold sm:text-5xl">Course content</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {modules.length} sections, {totalLessons} lessons. Start at the top and work down, or use
        Services to jump straight to a single topic.
      </p>

      <Accordion className="mt-10 border-t border-border" defaultValue={[modules[0]?.id]}>
        {modules.map((mod, modIndex) => {
          const lessons = mod.lessonIds
            .map((id) => lessonById.get(id))
            .filter((l): l is NonNullable<typeof l> => Boolean(l));
          const done = mounted ? lessons.filter((l) => progress[l.id]?.completed).length : 0;

          return (
            <AccordionItem key={mod.id} value={mod.id} className="border-border">
              <AccordionTrigger className="px-1 py-4 hover:no-underline">
                <span className="flex flex-1 items-baseline justify-between gap-4 text-left">
                  <span className="font-heading text-xl font-semibold text-foreground">
                    {modIndex + 1}. {mod.title}
                  </span>
                  <span className="shrink-0 text-sm font-normal text-muted-foreground">
                    {done} / {lessons.length} lessons
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-3 px-1 text-muted-foreground">{mod.description}</p>
                <ol className="divide-y divide-border rounded-lg border border-border bg-card">
                  {lessons.map((lesson, lessonIndex) => {
                    const isDone = mounted && Boolean(progress[lesson.id]?.completed);
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={`/course/${lesson.id}`}
                          className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50"
                        >
                          <span className="w-10 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
                            {modIndex + 1}.{lessonIndex + 1}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-medium">{lesson.title}</span>
                            <span className="block truncate text-sm text-muted-foreground">
                              {lesson.oneLiner}
                            </span>
                          </span>
                          <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                            {TIER_LABEL[lesson.tier]}
                          </span>
                          <span
                            className={
                              isDone
                                ? "flex size-5 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground"
                                : "size-5 shrink-0 rounded-full border border-border"
                            }
                          >
                            {isDone && <Check className="size-3" />}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
