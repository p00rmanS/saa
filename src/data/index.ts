import type { Flashcard, Lesson, Question } from "@/lib/types";

import { orientationLessons } from "./content/orientation";
import { orientationQuestions } from "./content/orientation-questions";
import { orientationFlashcards } from "./content/orientation-flashcards";

import { iamLessons } from "./content/iam";
import { iamQuestions } from "./content/iam-questions";
import { iamFlashcards } from "./content/iam-flashcards";

import { computeLessons } from "./content/compute";
import { computeQuestions } from "./content/compute-questions";
import { computeFlashcards } from "./content/compute-flashcards";

import { storageLessons } from "./content/storage";
import { storageQuestions } from "./content/storage-questions";
import { storageFlashcards } from "./content/storage-flashcards";

import { networkingLessons } from "./content/networking";
import { networkingQuestions } from "./content/networking-questions";
import { networkingFlashcards } from "./content/networking-flashcards";

import { databaseLessons } from "./content/databases";
import { databaseQuestions } from "./content/databases-questions";
import { databaseFlashcards } from "./content/databases-flashcards";

import { integrationLessons } from "./content/integration";
import { integrationQuestions } from "./content/integration-questions";
import { integrationFlashcards } from "./content/integration-flashcards";

import { analyticsLessons } from "./content/analytics";
import { analyticsQuestions } from "./content/analytics-questions";
import { analyticsFlashcards } from "./content/analytics-flashcards";

import { securityLessons } from "./content/security";
import { securityQuestions } from "./content/security-questions";
import { securityFlashcards } from "./content/security-flashcards";

import { governanceLessons } from "./content/governance";
import { governanceQuestions } from "./content/governance-questions";
import { governanceFlashcards } from "./content/governance-flashcards";

import { miscLessons } from "./content/misc";
import { miscQuestions } from "./content/misc-questions";
import { miscFlashcards } from "./content/misc-flashcards";

import { examMasteryLessons } from "./content/exam-mastery";
import { examMasteryQuestions } from "./content/exam-mastery-questions";
import { examMasteryFlashcards } from "./content/exam-mastery-flashcards";

export const allLessons: Lesson[] = [
  ...orientationLessons,
  ...iamLessons,
  ...computeLessons,
  ...storageLessons,
  ...networkingLessons,
  ...databaseLessons,
  ...integrationLessons,
  ...analyticsLessons,
  ...securityLessons,
  ...governanceLessons,
  ...miscLessons,
  ...examMasteryLessons,
];

export const allQuestions: Question[] = [
  ...orientationQuestions,
  ...iamQuestions,
  ...computeQuestions,
  ...storageQuestions,
  ...networkingQuestions,
  ...databaseQuestions,
  ...integrationQuestions,
  ...analyticsQuestions,
  ...securityQuestions,
  ...governanceQuestions,
  ...miscQuestions,
  ...examMasteryQuestions,
];

export const allFlashcards: Flashcard[] = [
  ...orientationFlashcards,
  ...iamFlashcards,
  ...computeFlashcards,
  ...storageFlashcards,
  ...networkingFlashcards,
  ...databaseFlashcards,
  ...integrationFlashcards,
  ...analyticsFlashcards,
  ...securityFlashcards,
  ...governanceFlashcards,
  ...miscFlashcards,
  ...examMasteryFlashcards,
];

export const lessonById = new Map<string, Lesson>(allLessons.map((l) => [l.id, l]));
export const questionById = new Map<string, Question>(allQuestions.map((q) => [q.id, q]));
export const flashcardById = new Map<string, Flashcard>(allFlashcards.map((f) => [f.id, f]));

export const lessonCategories: string[] = Array.from(
  new Set(allLessons.map((l) => l.category))
).sort();

export function lessonsByCategory(category: string): Lesson[] {
  return allLessons.filter((l) => l.category === category);
}

export function questionsForLesson(lessonId: string): Question[] {
  const lesson = lessonById.get(lessonId);
  if (!lesson) return [];
  return lesson.questionIds
    .map((id) => questionById.get(id))
    .filter((q): q is Question => Boolean(q));
}

export function flashcardsForLesson(lessonId: string): Flashcard[] {
  return allFlashcards.filter((f) => f.serviceId === lessonId);
}

export function questionDomainMap(): Record<string, 1 | 2 | 3 | 4> {
  const map: Record<string, 1 | 2 | 3 | 4> = {};
  for (const q of allQuestions) map[q.id] = q.domain;
  return map;
}
