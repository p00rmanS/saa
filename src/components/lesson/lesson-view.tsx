"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bookmark, BookmarkCheck, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArchitectureDiagram } from "@/components/lesson/architecture-diagram";
import { CheckpointQuiz } from "@/components/quiz/checkpoint-quiz";
import { TIER_LABEL } from "@/components/badges";
import { useProgressStore, DEFAULT_SETTINGS } from "@/lib/store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { DOMAIN_SHORT_TITLES } from "@/lib/readiness";
import type { Lesson, Question } from "@/lib/types";
import { cn } from "cn";

function Prose({ text }: { text: string }) {
  return (
    <div className="lesson-prose text-foreground/90">
      {text.split("\n\n").map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex max-w-[68ch] list-disc flex-col gap-2 pl-5 leading-relaxed marker:text-muted-foreground", className)}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function readingMinutes(lesson: Lesson): number {
  const text = [
    lesson.englishExplanation,
    lesson.whyItExists,
    lesson.availability,
    lesson.security,
    lesson.pricingLogic,
    ...lesson.keyFeatures,
    ...lesson.bestUseCases,
    ...lesson.examTraps,
  ].join(" ");
  return Math.max(2, Math.round(text.split(/\s+/).length / 200));
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

  const explanation = (
    <div className="flex flex-col gap-6">
      {showEnglish && (
        <div>
          {showTaglish && <p className="mb-2 text-sm font-medium text-muted-foreground">In English</p>}
          <Prose text={lesson.englishExplanation} />
        </div>
      )}
      {showTaglish && (
        <div>
          {showEnglish && <p className="mb-2 text-sm font-medium text-muted-foreground">Sa Taglish</p>}
          <Prose text={lesson.taglishExplanation} />
        </div>
      )}
    </div>
  );

  const analogy = (
    <aside className="max-w-[68ch] border-l-2 border-primary/50 pl-4">
      <p className="mb-1 text-sm font-medium text-muted-foreground">Think of it this way</p>
      <p className="leading-relaxed">{lesson.analogy}</p>
    </aside>
  );

  const overview = (
    <div className="flex flex-col gap-6">
      {settings.beginnerMode ? (
        <>
          {analogy}
          {explanation}
        </>
      ) : (
        <>
          {explanation}
          {analogy}
        </>
      )}
    </div>
  );

  const outline: { id: string; title: string }[] = [
    { id: "overview", title: "Overview" },
    { id: "why", title: "Why it exists" },
    { id: "when", title: "When to use it" },
    { id: "features", title: "How it works" },
    { id: "operations", title: "Availability, security, cost" },
    { id: "exam", title: "On the exam" },
    { id: "architecture", title: "Example architecture" },
    ...(questions.length > 0 ? [{ id: "check", title: "Check yourself" }] : []),
  ];

  const tierLabel = TIER_LABEL[lesson.tier];
  const domainText = lesson.domains.map((d) => `${d} (${DOMAIN_SHORT_TITLES[d]})`).join(", ");

  return (
    <div className="pb-16" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <header className="max-w-3xl">
        <p className="text-sm text-muted-foreground">
          <Link href="/course" className="hover:text-foreground hover:underline">
            Learn
          </Link>{" "}
          / {lesson.category}
        </p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">{lesson.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lesson.oneLiner}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          {tierLabel} · {readingMinutes(lesson)} min read · Exam domain {domainText}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant={completed ? "default" : "outline"}
            onClick={() => toggleLessonComplete(lesson.id)}
          >
            <CheckCircle className="size-4" />
            {completed ? "Completed" : "Mark complete"}
          </Button>
          <Button size="icon-sm" variant="outline" aria-label="Bookmark" onClick={() => toggleBookmark(lesson.id)}>
            {bookmarked ? <BookmarkCheck className="size-4 text-primary" /> : <Bookmark className="size-4" />}
          </Button>
        </div>
      </header>

      <div className="mt-10 grid gap-12 xl:grid-cols-[minmax(0,1fr)_14rem]">
        <div className="flex min-w-0 flex-col gap-14">
          <Section id="overview" title="Overview">
            {settings.examMode ? (
              <details className="group">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Exam mode is on, so the full explanation is collapsed. Click to read it.
                </summary>
                <div className="mt-4">{overview}</div>
              </details>
            ) : (
              overview
            )}
          </Section>

          <Section id="why" title="Why it exists">
            <Prose text={lesson.whyItExists} />
            <h3 className="mb-2 mt-8 text-lg font-semibold">What a request looks like</h3>
            <p className="max-w-[68ch] break-words font-mono text-sm leading-relaxed text-foreground/90">{lesson.flow}</p>
            <h3 className="mb-2 mt-8 text-lg font-semibold">Without it</h3>
            <BulletList items={lesson.withoutIt} />
          </Section>

          <Section id="when" title="When to use it">
            <h3 className="mb-2 text-lg font-semibold">A good fit</h3>
            <BulletList items={lesson.bestUseCases} />
            <h3 className="mb-2 mt-8 text-lg font-semibold">A poor fit</h3>
            <BulletList items={lesson.poorUseCases} />
            {lesson.alternatives.length > 0 && (
              <>
                <h3 className="mb-3 mt-8 text-lg font-semibold">Pick something else when…</h3>
                <div className="max-w-3xl overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      {lesson.alternatives.map((row, i) => (
                        <tr key={i} className={cn(i > 0 && "border-t border-border")}>
                          <td className="px-4 py-3 align-top text-foreground/90">{row.need}</td>
                          <td className="px-4 py-3 align-top font-medium">{row.choose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </Section>

          <Section id="features" title="How it works">
            <BulletList items={lesson.keyFeatures} />
          </Section>

          <Section id="operations" title="Availability, security, cost">
            <h3 className="mb-2 text-lg font-semibold">Availability and scaling</h3>
            <Prose text={lesson.availability} />
            <h3 className="mb-2 mt-8 text-lg font-semibold">Security</h3>
            <Prose text={lesson.security} />
            <h3 className="mb-2 mt-8 text-lg font-semibold">What you pay for</h3>
            <Prose text={lesson.pricingLogic} />
          </Section>

          <Section id="exam" title="On the exam">
            <h3 className="mb-2 text-lg font-semibold">Phrases that point here</h3>
            <p className="max-w-[68ch] leading-relaxed text-foreground/90">
              {lesson.examKeywords.join(" · ")}
            </p>
            <h3 className="mb-2 mt-8 text-lg font-semibold">Where people lose marks</h3>
            <BulletList items={lesson.examTraps} className="marker:text-warning" />
            {settings.mentorMode && (
              <aside className="mt-8 max-w-[68ch] rounded-lg bg-warning/10 p-4">
                <p className="mb-1 text-sm font-semibold text-warning">Mentor note</p>
                <p className="leading-relaxed text-foreground/90">{lesson.mentorTip}</p>
              </aside>
            )}
          </Section>

          <Section id="architecture" title="Example architecture">
            <ArchitectureDiagram diagram={lesson.architectureDiagram} caption={lesson.architectureCaption} />
          </Section>

          {questions.length > 0 && (
            <Section id="check" title="Check yourself">
              <div className="flex flex-col gap-4">
                {questions.map((q, i) => (
                  <CheckpointQuiz key={q.id} question={q} index={i} />
                ))}
              </div>
            </Section>
          )}

          <nav className="flex items-center justify-between gap-3 border-t border-border pt-6">
            {prevLesson ? (
              <Button
                variant="outline"
                className="max-w-[48%]"
                nativeButton={false}
                render={<Link href={`/course/${prevLesson.id}`} />}
              >
                <ArrowLeft className="size-4" />
                <span className="truncate">{prevLesson.title}</span>
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
                <span className="truncate">{nextLesson.title}</span>
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <span />
            )}
          </nav>
        </div>

        <aside className="hidden xl:block">
          <nav className="sticky top-24" aria-label="In this lesson">
            <p className="mb-3 text-sm font-semibold">In this lesson</p>
            <ol className="flex flex-col gap-2 border-l border-border text-sm">
              {outline.map((o) => (
                <li key={o.id}>
                  <a
                    href={`#${o.id}`}
                    className="-ml-px block border-l border-transparent pl-4 text-muted-foreground hover:border-foreground hover:text-foreground"
                  >
                    {o.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>
    </div>
  );
}
