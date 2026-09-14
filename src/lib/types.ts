// Core content & progress types for the SAA-C03 Mentor platform.
// Every content file in src/data/** implements these shapes so the UI
// (lesson player, quiz engine, flashcards, mock exams, dashboard) can stay
// fully generic and data-driven.

export type ExamDomainId = 1 | 2 | 3 | 4;

export type ExamImportance = "low" | "medium" | "high" | "critical";

/** Depth tier per spec section 10 — not every service needs equal lesson depth. */
export type Tier = 1 | 2 | 3;

export type Difficulty = "easy" | "medium" | "hard" | "exam";

export interface AlternativeRow {
  need: string;
  choose: string;
}

export interface Lesson {
  id: string; // kebab-case, stable, used as slug e.g. "amazon-s3"
  moduleId: string; // groups lessons under a Module (course structure)
  category: string; // service category e.g. "Storage"
  title: string; // e.g. "Amazon S3"
  shortName?: string; // e.g. "S3"
  tier: Tier;
  domains: ExamDomainId[];
  examImportance: ExamImportance;

  oneLiner: string; // 6.2 one-sentence definition
  englishExplanation: string; // 6.3 explain it like I'm new (2-5 paragraphs, \n\n separated)
  taglishExplanation: string; // 6.4
  analogy: string; // 6.5 real-life analogy
  whyItExists: string; // 6.6
  flow: string; // 6.7 what happens when you use it (arrow chain or short flow)
  withoutIt: string[]; // 6.8 what happens if you do not use it
  bestUseCases: string[]; // 6.9
  poorUseCases: string[]; // 6.10
  alternatives: AlternativeRow[]; // 6.11
  keyFeatures: string[]; // 6.12
  availability: string; // 6.13
  security: string; // 6.14
  pricingLogic: string; // 6.15
  examKeywords: string[]; // 6.16
  examTraps: string[]; // 6.17
  architectureDiagram: string; // 6.18 ascii diagram
  architectureCaption?: string;
  mentorTip: string; // 6.19
  questionIds: string[]; // 6.20 checkpoint quiz + 6.21 scenario -> pulled from question bank
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  lessonId?: string;
  domain: ExamDomainId;
  difficulty: Difficulty;
  type: "single" | "multiple";
  kind: "checkpoint" | "scenario" | "exam"; // checkpoint = quick per-lesson; scenario = SAA-style; exam = mock/domain bank
  scenario: string;
  options: QuestionOption[];
  correctAnswers: string[]; // option ids
  explanation: string; // overall "why the correct answer is correct"
  optionExplanations: Record<string, string>; // per-option why right/wrong
  examKeywordHint?: string;
  mentorTip?: string;
  keywords: string[];
  services: string[]; // lesson ids referenced
}

export interface Flashcard {
  id: string;
  serviceId?: string;
  domain?: ExamDomainId;
  category: string;
  front: string;
  back: string;
}

export type FlashcardStatus = "new" | "know" | "review" | "difficult";

export interface ComparisonItem {
  name: string;
  primaryUse: string;
  scope: string;
  availability: string;
  scalability: string;
  operationalOverhead: string;
  costLogic: string;
  examKeywords: string[];
  whenNotToUse: string;
}

export interface Comparison {
  id: string;
  title: string; // "S3 vs EBS vs EFS"
  summary: string;
  items: ComparisonItem[];
  examTip: string;
}

export interface LabStep {
  step: string;
}

export interface Lab {
  id: string;
  title: string;
  relatedLessonIds: string[];
  goal: string;
  architecture: string; // ascii
  estimatedTime: string;
  prerequisites: string[];
  steps: string[];
  expectedResult: string;
  cleanup: string[];
  whyItMatters: string;
  commonErrors: string[];
}

export interface Module {
  id: string;
  phase: string; // "Phase 2 — Compute"
  phaseOrder: number;
  title: string;
  description: string;
  lessonIds: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  taglish: string;
}

export interface ExamDomain {
  id: ExamDomainId;
  title: string;
  weight: number; // percent
  subtopics: { title: string; services: string[] }[];
}

export interface ArchitecturePattern {
  id: string;
  title: string;
  description: string;
  diagram: string;
  decisions: string[];
  relatedLessonIds: string[];
}

export interface WhatIfStep {
  question: string;
  teaches: string[];
}

export interface WhatIfScenario {
  id: string;
  title: string;
  baseDiagram: string;
  steps: WhatIfStep[];
}

export interface WhyNotScenario {
  id: string;
  scenario: string;
  choices: string[];
  correctChoice: string;
  reasoning: Record<string, string>; // choice -> explanation
}

export interface StudyPlanDay {
  days: string; // "Days 1-3"
  focus: string;
  moduleIds: string[];
}

export interface StudyPlan {
  totalDays: 7 | 14 | 30 | 45 | 60 | 90;
  plan: StudyPlanDay[];
}

// ---------- Progress (persisted client-side) ----------

export interface QuestionAttempt {
  correct: boolean;
  attempts: number;
  lastAnsweredAt: string;
}

export interface LessonProgress {
  completed: boolean;
  bookmarked: boolean;
  notes?: string;
  confidence?: 1 | 2 | 3 | 4 | 5;
  lastReviewed?: string;
}

export interface MockExamResult {
  id: string;
  takenAt: string;
  totalQuestions: number;
  correct: number;
  domainScores: Record<ExamDomainId, { correct: number; total: number }>;
  durationSeconds: number;
}

export type TaglishMode = "english" | "taglish" | "both";
