"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ExamDomainId,
  FlashcardStatus,
  LessonProgress,
  MockExamResult,
  QuestionAttempt,
  TaglishMode,
} from "@/lib/types";

interface Settings {
  taglishMode: TaglishMode;
  mentorMode: boolean;
  beginnerMode: boolean;
  examMode: boolean;
}

/**
 * Matches the store's initial state below. Server renders (and each
 * client's very first, pre-hydration render) have no access to the
 * persisted localStorage settings, so any component that renders
 * differently based on settings must fall back to these defaults until
 * `useHasMounted()` flips true — otherwise a returning user with
 * non-default settings gets a hydration mismatch.
 */
export const DEFAULT_SETTINGS: Settings = {
  taglishMode: "both",
  mentorMode: true,
  beginnerMode: false,
  examMode: false,
};

interface ProgressState {
  lessons: Record<string, LessonProgress>;
  questionAttempts: Record<string, QuestionAttempt>;
  flashcards: Record<string, FlashcardStatus>;
  mockExams: MockExamResult[];
  studyStreak: number;
  lastStudyDate: string | null;
  settings: Settings;

  toggleLessonComplete: (lessonId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  setConfidence: (lessonId: string, confidence: 1 | 2 | 3 | 4 | 5) => void;
  recordAnswer: (questionId: string, correct: boolean) => void;
  setFlashcardStatus: (cardId: string, status: FlashcardStatus) => void;
  addMockExamResult: (result: MockExamResult) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  touchStreak: () => void;
  resetProgress: () => void;
}

function isToday(iso: string | null) {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function isYesterday(iso: string | null) {
  if (!iso) return false;
  const d = new Date(iso);
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return (
    d.getFullYear() === y.getFullYear() &&
    d.getMonth() === y.getMonth() &&
    d.getDate() === y.getDate()
  );
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      lessons: {},
      questionAttempts: {},
      flashcards: {},
      mockExams: [],
      studyStreak: 0,
      lastStudyDate: null,
      settings: DEFAULT_SETTINGS,

      toggleLessonComplete: (lessonId) => {
        get().touchStreak();
        set((state) => {
          const existing = state.lessons[lessonId] ?? {
            completed: false,
            bookmarked: false,
          };
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...existing,
                completed: !existing.completed,
                lastReviewed: new Date().toISOString(),
              },
            },
          };
        });
      },

      toggleBookmark: (lessonId) => {
        set((state) => {
          const existing = state.lessons[lessonId] ?? {
            completed: false,
            bookmarked: false,
          };
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: { ...existing, bookmarked: !existing.bookmarked },
            },
          };
        });
      },

      setConfidence: (lessonId, confidence) => {
        set((state) => {
          const existing = state.lessons[lessonId] ?? {
            completed: false,
            bookmarked: false,
          };
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: { ...existing, confidence },
            },
          };
        });
      },

      recordAnswer: (questionId, correct) => {
        get().touchStreak();
        set((state) => {
          const existing = state.questionAttempts[questionId];
          return {
            questionAttempts: {
              ...state.questionAttempts,
              [questionId]: {
                correct,
                attempts: (existing?.attempts ?? 0) + 1,
                lastAnsweredAt: new Date().toISOString(),
              },
            },
          };
        });
      },

      setFlashcardStatus: (cardId, status) => {
        set((state) => ({
          flashcards: { ...state.flashcards, [cardId]: status },
        }));
      },

      addMockExamResult: (result) => {
        get().touchStreak();
        set((state) => ({ mockExams: [...state.mockExams, result] }));
      },

      updateSettings: (patch) => {
        set((state) => ({ settings: { ...state.settings, ...patch } }));
      },

      touchStreak: () => {
        const { lastStudyDate, studyStreak } = get();
        if (isToday(lastStudyDate)) return;
        const nextStreak = isYesterday(lastStudyDate) ? studyStreak + 1 : 1;
        set({ studyStreak: nextStreak, lastStudyDate: new Date().toISOString() });
      },

      resetProgress: () => {
        set({
          lessons: {},
          questionAttempts: {},
          flashcards: {},
          mockExams: [],
          studyStreak: 0,
          lastStudyDate: null,
        });
      },
    }),
    { name: "saa-mentor-progress" }
  )
);

export function domainAccuracy(
  attempts: Record<string, QuestionAttempt>,
  questionDomainMap: Record<string, ExamDomainId>
) {
  const totals: Record<ExamDomainId, { correct: number; total: number }> = {
    1: { correct: 0, total: 0 },
    2: { correct: 0, total: 0 },
    3: { correct: 0, total: 0 },
    4: { correct: 0, total: 0 },
  };
  for (const [qId, attempt] of Object.entries(attempts)) {
    const domain = questionDomainMap[qId];
    if (!domain) continue;
    totals[domain].total += 1;
    if (attempt.correct) totals[domain].correct += 1;
  }
  return totals;
}
