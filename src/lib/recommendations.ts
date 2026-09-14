import { modules } from "@/data/modules";
import { lessonById } from "@/data";
import type { Lesson, LessonProgress } from "@/lib/types";
import type { DomainScore } from "@/lib/readiness";

export function nextLessonToContinue(lessonProgress: Record<string, LessonProgress>): Lesson | undefined {
  for (const mod of modules) {
    for (const id of mod.lessonIds) {
      if (!lessonProgress[id]?.completed) {
        return lessonById.get(id);
      }
    }
  }
  return undefined;
}

export function recommendedReviewLessons(
  weakest: DomainScore,
  lessonProgress: Record<string, LessonProgress>,
  limit = 4
): Lesson[] {
  const candidates: Lesson[] = [];
  for (const mod of modules) {
    for (const id of mod.lessonIds) {
      const lesson = lessonById.get(id);
      if (!lesson) continue;
      if (!lesson.domains.includes(weakest.domain)) continue;
      candidates.push(lesson);
    }
  }
  // Prefer not-yet-completed, higher-tier lessons first.
  candidates.sort((a, b) => {
    const aDone = lessonProgress[a.id]?.completed ? 1 : 0;
    const bDone = lessonProgress[b.id]?.completed ? 1 : 0;
    if (aDone !== bDone) return aDone - bDone;
    return a.tier - b.tier;
  });
  return candidates.slice(0, limit);
}
