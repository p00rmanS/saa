"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lightbulb,
  Sparkles,
  AlertTriangle,
  ArrowRightLeft,
  ShieldCheck,
  DollarSign,
  Gauge,
  CheckCircle2,
  XCircle,
  Quote,
  Tags,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/callout";
import { ArchitectureDiagram } from "@/components/lesson/architecture-diagram";
import { CheckpointQuiz } from "@/components/quiz/checkpoint-quiz";
import { TierBadge, ExamImportanceBadge, DomainBadge } from "@/components/badges";
import { useProgressStore, DEFAULT_SETTINGS } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import type { Lesson, Question } from "@/lib/types";
import { cn } from "cn";
import { Bookmark, BookmarkCheck, CheckCircle } from "lucide-react";

function Prose({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");
  return (
    <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground/90">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function SectionHeading({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
      <Icon className="size-4" />
      {children}
    </h2>
  );
}

export function LessonView({
  lesson,
  questions,
  prevLesson,
  nextLesson,
}: {
  lesson: Lesson;
  questions: Question[];
  prevLesson?: { id: string; title: string };
  nextLesson?: { id: string; title: string };
}) {
  const settingsFromStore = useProgressStore((s) => s.settings);
  const lessonProgress = useProgressStore((s) => s.lessons[lesson.id]);
  const toggleLessonComplete = useProgressStore((s) => s.toggleLessonComplete);
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);
  const mounted = useHasMounted();
  const router = useRouter();

  // Swipe left -> next lesson, swipe right -> previous lesson. Tracked via refs
  // (not state) since touch coordinates don't need to trigger re-renders.
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);
  const SWIPE_MIN_DISTANCE = 60;
  const SWIPE_MAX_VERTICAL_RATIO = 0.6;

  const handleTouchStart = (e: React.TouchEvent) => {
    // Skip swipe tracking when the gesture starts inside a horizontally
    // scrollable element (e.g. the architecture diagram) so scrolling that
    // content doesn't get hijacked into a lesson navigation.
    if ((e.target as HTMLElement).closest("[data-no-swipe-nav]")) {
      touchStart.current = null;
      return;
    }
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_DISTANCE) return;
    if (Math.abs(dy) > Math.abs(dx) * SWIPE_MAX_VERTICAL_RATIO) return;
    if (dx < 0 && nextLesson) {
      router.push(`/course/${nextLesson.id}`);
    } else if (dx > 0 && prevLesson) {
      router.push(`/course/${prevLesson.id}`);
    }
  };
  // Server (and each client's pre-hydration render) can't see persisted
  // settings, so fall back to defaults until mounted to avoid a mismatch.
  const settings = mounted ? settingsFromStore : DEFAULT_SETTINGS;

  const completed = mounted && Boolean(lessonProgress?.completed);
  const bookmarked = mounted && Boolean(lessonProgress?.bookmarked);

  const showEnglish = settings.taglishMode !== "taglish";
  const showTaglish = settings.taglishMode !== "english";

  const explanationBlock = (
    <div className="flex flex-col gap-4">
      {showEnglish && (
        <div>
          {showTaglish && <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">English</p>}
          <Prose text={lesson.englishExplanation} />
        </div>
      )}
      {showTaglish && (
        <div>
          {showEnglish && <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Taglish</p>}
          <Prose text={lesson.taglishExplanation} />
        </div>
      )}
    </div>
  );

  const analogyBlock = (
    <Callout icon={Quote} title="Real-Life Analogy" tone="info">
      <p>{lesson.analogy}</p>
    </Callout>
  );

  const teachingSection = settings.examMode ? (
    <details className="group rounded-xl border border-border">
      <summary className="cursor-pointer list-none rounded-xl px-4 py-3 text-sm font-medium text-foreground/90 hover:bg-muted/50">
        <span className="mr-2 inline-block transition-transform group-open:rotate-90">▸</span>
        Full explanation (exam mode is hiding this by default)
      </summary>
      <div className="border-t border-border px-4 py-4">
        {settings.beginnerMode ? (
          <div className="flex flex-col gap-4">
            {analogyBlock}
            {explanationBlock}
          </div>
        ) : (
          explanationBlock
        )}
      </div>
    </details>
  ) : settings.beginnerMode ? (
    <div className="flex flex-col gap-4">
      {analogyBlock}
      {explanationBlock}
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      {explanationBlock}
      {analogyBlock}
    </div>
  );

  return (
    <div
      className="flex flex-col gap-8 pb-16"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-border text-muted-foreground">
            {lesson.category}
          </Badge>
          <TierBadge tier={lesson.tier} />
          <ExamImportanceBadge importance={lesson.examImportance} />
          {lesson.domains.map((d) => (
            <DomainBadge key={d} domain={d} />
          ))}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{lesson.title}</h1>
        <p className="mt-2 max-w-3xl text-base text-muted-foreground">{lesson.oneLiner}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant={completed ? "default" : "outline"}
            onClick={() => toggleLessonComplete(lesson.id)}
          >
            <CheckCircle className="size-4" />
            {completed ? "Completed" : "Mark Complete"}
          </Button>
          <Button size="icon-sm" variant="outline" aria-label="Bookmark" onClick={() => toggleBookmark(lesson.id)}>
            {bookmarked ? <BookmarkCheck className="size-4 text-primary" /> : <Bookmark className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Explanation + analogy (order depends on beginner mode; collapsible in exam mode) */}
      <section>{teachingSection}</section>

      {/* Why it exists + flow */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <SectionHeading icon={HelpCircle}>Why Does This Exist?</SectionHeading>
          <p className="text-sm leading-relaxed text-foreground/90">{lesson.whyItExists}</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <SectionHeading icon={ArrowRightLeft}>What Happens When You Use It</SectionHeading>
          <p className="break-words font-mono text-sm leading-relaxed text-foreground/90">{lesson.flow}</p>
        </div>
      </section>

      {/* Without it */}
      <section className="rounded-xl border border-danger/20 bg-danger/5 p-4">
        <SectionHeading icon={XCircle}>What Happens If You Don&apos;t Use It</SectionHeading>
        <ul className="flex flex-col gap-1.5 text-sm text-foreground/90">
          {lesson.withoutIt.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-danger">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Use cases */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-success/20 bg-success/5 p-4">
          <SectionHeading icon={CheckCircle2}>Best Use Cases</SectionHeading>
          <ul className="flex flex-col gap-1.5 text-sm text-foreground/90">
            {lesson.bestUseCases.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-success">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <SectionHeading icon={XCircle}>Poor Use Cases</SectionHeading>
          <ul className="flex flex-col gap-1.5 text-sm text-foreground/90">
            {lesson.poorUseCases.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-muted-foreground">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Alternatives */}
      {lesson.alternatives.length > 0 && (
        <section>
          <SectionHeading icon={ArrowRightLeft}>Closest Alternatives</SectionHeading>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Need</th>
                  <th className="px-4 py-2 text-left font-medium">Choose</th>
                </tr>
              </thead>
              <tbody>
                {lesson.alternatives.map((row, i) => (
                  <tr key={i} className={cn("border-t border-border", i % 2 === 1 && "bg-muted/20")}>
                    <td className="px-4 py-2.5 text-foreground/90">{row.need}</td>
                    <td className="px-4 py-2.5 font-medium text-primary">{row.choose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Key features */}
      <section>
        <SectionHeading icon={Sparkles}>Key Features</SectionHeading>
        <div className="grid gap-2 sm:grid-cols-2">
          {lesson.keyFeatures.map((f, i) => (
            <div key={i} className="flex gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground/90">
              <span className="text-primary">•</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Availability / Security / Pricing */}
      <section className="grid gap-4">
        <div className="rounded-xl border border-border p-4">
          <SectionHeading icon={Gauge}>Availability, Durability & Scalability</SectionHeading>
          <p className="text-sm leading-relaxed text-foreground/90">{lesson.availability}</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <SectionHeading icon={ShieldCheck}>Security</SectionHeading>
          <p className="text-sm leading-relaxed text-foreground/90">{lesson.security}</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <SectionHeading icon={DollarSign}>Pricing Logic</SectionHeading>
          <p className="text-sm leading-relaxed text-foreground/90">{lesson.pricingLogic}</p>
        </div>
      </section>

      {/* Exam keywords + traps */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <SectionHeading icon={Tags}>Exam Keywords</SectionHeading>
          <div className="flex flex-wrap gap-1.5">
            {lesson.examKeywords.map((k, i) => (
              <Badge key={i} variant="outline" className="border-border bg-muted/40 font-mono text-xs">
                {k}
              </Badge>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-warning/20 bg-warning/5 p-4">
          <SectionHeading icon={AlertTriangle}>Common Exam Traps</SectionHeading>
          <ul className="flex flex-col gap-1.5 text-sm text-foreground/90">
            {lesson.examTraps.map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-warning">⚠</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Architecture */}
      <section>
        <SectionHeading icon={ArrowRightLeft}>Architecture Example</SectionHeading>
        <ArchitectureDiagram diagram={lesson.architectureDiagram} caption={lesson.architectureCaption} />
      </section>

      {/* Mentor tip */}
      {settings.mentorMode && (
        <Callout icon={Lightbulb} title="Mentor Tip" tone="brand">
          <p>{lesson.mentorTip}</p>
        </Callout>
      )}

      {/* Quiz */}
      {questions.length > 0 && (
        <section>
          <SectionHeading icon={HelpCircle}>Checkpoint Quiz</SectionHeading>
          <div className="flex flex-col gap-3">
            {questions.map((q, i) => (
              <CheckpointQuiz key={q.id} question={q} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Prev / next */}
      <nav className="flex items-center justify-between gap-3 border-t border-border pt-6">
        {prevLesson ? (
          <Button
            variant="outline"
            className="max-w-[48%]"
            nativeButton={false}
            render={<Link href={`/course/${prevLesson.id}`} />}
          >
            <span className="truncate">← {prevLesson.title}</span>
          </Button>
        ) : (
          <span />
        )}
        {nextLesson ? (
          <Button
            className="max-w-[48%]"
            nativeButton={false}
            render={<Link href={`/course/${nextLesson.id}`} />}
          >
            <span className="truncate">{nextLesson.title} →</span>
          </Button>
        ) : (
          <span />
        )}
      </nav>
      {(prevLesson || nextLesson) && (
        <p className="-mt-6 text-center text-xs text-muted-foreground sm:hidden">
          Swipe left/right to jump between lessons
        </p>
      )}
    </div>
  );
}
