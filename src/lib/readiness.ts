import { allLessons, allQuestions } from "@/data";
import type { ExamDomainId, LessonProgress, QuestionAttempt } from "@/lib/types";

export const DOMAIN_WEIGHTS: Record<ExamDomainId, number> = {
  1: 30,
  2: 26,
  3: 24,
  4: 20,
};

export const DOMAIN_TITLES: Record<ExamDomainId, string> = {
  1: "Design Secure Architectures",
  2: "Design Resilient Architectures",
  3: "Design High-Performing Architectures",
  4: "Design Cost-Optimized Architectures",
};

export const DOMAIN_SHORT_TITLES: Record<ExamDomainId, string> = {
  1: "Security",
  2: "Resiliency",
  3: "Performance",
  4: "Cost Optimization",
};

export interface DomainScore {
  domain: ExamDomainId;
  title: string;
  shortTitle: string;
  weight: number;
  lessonCompletion: number; // 0-100
  quizAccuracy: number | null; // 0-100, null if no attempts yet
  score: number; // 0-100 blended score
}

function clamp(n: number) {
  return Math.max(0, Math.min(100, n));
}

export function computeDomainScores(
  lessonProgress: Record<string, LessonProgress>,
  questionAttempts: Record<string, QuestionAttempt>
): DomainScore[] {
  const domains: ExamDomainId[] = [1, 2, 3, 4];

  return domains.map((domain) => {
    const domainLessons = allLessons.filter((l) => l.domains.includes(domain));
    const completedCount = domainLessons.filter(
      (l) => lessonProgress[l.id]?.completed
    ).length;
    const lessonCompletion =
      domainLessons.length > 0
        ? clamp((completedCount / domainLessons.length) * 100)
        : 0;

    const domainQuestions = allQuestions.filter((q) => q.domain === domain);
    const attempted = domainQuestions.filter((q) => questionAttempts[q.id]);
    const correct = attempted.filter((q) => questionAttempts[q.id]?.correct);
    const quizAccuracy =
      attempted.length > 0 ? clamp((correct.length / attempted.length) * 100) : null;

    const score = clamp(
      lessonCompletion * 0.4 + (quizAccuracy ?? 0) * 0.6
    );

    return {
      domain,
      title: DOMAIN_TITLES[domain],
      shortTitle: DOMAIN_SHORT_TITLES[domain],
      weight: DOMAIN_WEIGHTS[domain],
      lessonCompletion,
      quizAccuracy,
      score,
    };
  });
}

export function computeOverallReadiness(domainScores: DomainScore[]): number {
  const totalWeight = domainScores.reduce((sum, d) => sum + d.weight, 0);
  const weighted = domainScores.reduce((sum, d) => sum + d.score * d.weight, 0);
  return totalWeight > 0 ? Math.round(weighted / totalWeight) : 0;
}

export function weakestDomain(domainScores: DomainScore[]): DomainScore {
  return domainScores.reduce((min, d) => (d.score < min.score ? d : min), domainScores[0]);
}

export function strongestDomain(domainScores: DomainScore[]): DomainScore {
  return domainScores.reduce((max, d) => (d.score > max.score ? d : max), domainScores[0]);
}

export function overallQuestionAccuracy(
  questionAttempts: Record<string, QuestionAttempt>
): { answered: number; correct: number; accuracy: number } {
  const entries = Object.values(questionAttempts);
  const answered = entries.length;
  const correct = entries.filter((a) => a.correct).length;
  return {
    answered,
    correct,
    accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
  };
}

export function overallLessonCompletion(
  lessonProgress: Record<string, LessonProgress>
): { completed: number; total: number; percent: number } {
  const total = allLessons.length;
  const completed = allLessons.filter((l) => lessonProgress[l.id]?.completed).length;
  return {
    completed,
    total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export function examReadinessLabel(overall: number): string {
  if (overall >= 80) return "Exam Ready";
  if (overall >= 60) return "Almost There";
  if (overall >= 35) return "Building Momentum";
  return "Just Getting Started";
}
