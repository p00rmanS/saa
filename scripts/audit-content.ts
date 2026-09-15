import { allLessons, allQuestions, allFlashcards } from "../src/data";
import { modules } from "../src/data/modules";
import type { Lesson, Question, Flashcard } from "../src/lib/types";

type Issue = { severity: "error" | "warn"; area: string; id: string; message: string };
const issues: Issue[] = [];
const err = (area: string, id: string, message: string) => issues.push({ severity: "error", area, id, message });
const warn = (area: string, id: string, message: string) => issues.push({ severity: "warn", area, id, message });

// ---------- Lessons ----------
const lessonIdCounts = new Map<string, number>();
for (const l of allLessons) lessonIdCounts.set(l.id, (lessonIdCounts.get(l.id) ?? 0) + 1);
for (const [id, count] of lessonIdCounts) if (count > 1) err("lesson", id, `duplicate lesson id used ${count} times`);

const moduleIds = new Set(modules.map((m) => m.id));
const validModuleIdsFromLessons = new Set(allLessons.map((l) => l.moduleId));

const REQUIRED_STRING_FIELDS: (keyof Lesson)[] = [
  "oneLiner",
  "englishExplanation",
  "taglishExplanation",
  "analogy",
  "whyItExists",
  "flow",
  "availability",
  "security",
  "pricingLogic",
  "architectureDiagram",
  "mentorTip",
];
const REQUIRED_ARRAY_FIELDS: (keyof Lesson)[] = [
  "domains",
  "withoutIt",
  "bestUseCases",
  "poorUseCases",
  "alternatives",
  "keyFeatures",
  "examKeywords",
  "examTraps",
  "questionIds",
];

// crude Tagalog-marker heuristic: common Tagalog function words/particles
const TAGALOG_MARKERS = [
  " ang ", " ng ", " sa ", " mga ", " na ", " ay ", " kung ", " para ", " dahil ", " kapag ",
  " hindi ", " puwede ", " pwede ", " dapat ", " lang ", " din ", " rin ", " yun ", " ito ",
  " nito ", " niya ", " nila ", " ako ", " ka ", " mo ", " ba ", " may ", " wala ",
];

function looksTaglish(text: string): boolean {
  const padded = ` ${text.toLowerCase()} `;
  const hits = TAGALOG_MARKERS.filter((m) => padded.includes(m)).length;
  return hits >= 3;
}

const questionById = new Map<string, Question>(allQuestions.map((q) => [q.id, q]));
const flashcardsByServiceId = new Map<string, Flashcard[]>();
for (const f of allFlashcards) {
  if (!f.serviceId) continue;
  const list = flashcardsByServiceId.get(f.serviceId) ?? [];
  list.push(f);
  flashcardsByServiceId.set(f.serviceId, list);
}

for (const lesson of allLessons) {
  const where = lesson.id;

  if (!moduleIds.has(lesson.moduleId)) {
    err("lesson", where, `moduleId "${lesson.moduleId}" has no matching entry in modules.ts PHASE_META`);
  }

  for (const field of REQUIRED_STRING_FIELDS) {
    const val = lesson[field] as unknown as string;
    if (typeof val !== "string" || val.trim().length === 0) {
      err("lesson", where, `missing/empty required string field "${field}"`);
    }
  }
  for (const field of REQUIRED_ARRAY_FIELDS) {
    const val = lesson[field] as unknown as unknown[];
    if (!Array.isArray(val) || val.length === 0) {
      err("lesson", where, `missing/empty required array field "${field}"`);
    }
  }

  // Taglish quality checks
  if (typeof lesson.taglishExplanation === "string" && lesson.taglishExplanation.trim().length > 0) {
    if (lesson.taglishExplanation.trim().length < 80) {
      warn("lesson", where, `taglishExplanation looks too short (${lesson.taglishExplanation.trim().length} chars)`);
    } else if (!looksTaglish(lesson.taglishExplanation)) {
      warn("lesson", where, `taglishExplanation doesn't look Taglish (few/no Tagalog markers) — may be English copy-pasted`);
    }
  }
  if (typeof lesson.analogy === "string" && lesson.analogy.trim().length > 0) {
    if (lesson.analogy.trim().length < 40) {
      warn("lesson", where, `analogy looks too short (${lesson.analogy.trim().length} chars)`);
    }
  }
  // guard against accidental exact duplication between english and taglish fields
  if (
    lesson.englishExplanation &&
    lesson.taglishExplanation &&
    lesson.englishExplanation.trim() === lesson.taglishExplanation.trim()
  ) {
    err("lesson", where, `taglishExplanation is byte-identical to englishExplanation`);
  }

  // questionIds referential integrity
  if (Array.isArray(lesson.questionIds)) {
    if (lesson.questionIds.length < 3) {
      warn("lesson", where, `only ${lesson.questionIds.length} questionIds (expected >= 3)`);
    }
    for (const qid of lesson.questionIds) {
      const q = questionById.get(qid);
      if (!q) {
        err("lesson", where, `questionIds references "${qid}" which does not exist in any question bank`);
      }
    }
  }

  // alternatives shape
  if (Array.isArray(lesson.alternatives)) {
    lesson.alternatives.forEach((a, i) => {
      if (!a.need?.trim() || !a.choose?.trim()) {
        err("lesson", where, `alternatives[${i}] has empty need/choose`);
      }
    });
  }

  if (!Array.isArray(lesson.domains) || lesson.domains.length === 0) {
    err("lesson", where, `domains array is empty`);
  } else {
    for (const d of lesson.domains) {
      if (![1, 2, 3, 4].includes(d)) err("lesson", where, `invalid domain id ${d}`);
    }
  }

  // flashcard coverage sanity (not strictly required but worth flagging)
  const fc = flashcardsByServiceId.get(lesson.id) ?? [];
  if (fc.length === 0) {
    warn("lesson", where, `no flashcards reference this lesson via serviceId`);
  }
}

for (const modId of validModuleIdsFromLessons) {
  if (!moduleIds.has(modId)) {
    err("module", modId, `lessons reference moduleId "${modId}" but modules.ts has no PHASE_META for it (module will be silently dropped)`);
  }
}

// ---------- Questions ----------
const questionIdCounts = new Map<string, number>();
for (const q of allQuestions) questionIdCounts.set(q.id, (questionIdCounts.get(q.id) ?? 0) + 1);
for (const [id, count] of questionIdCounts) if (count > 1) err("question", id, `duplicate question id used ${count} times`);

const lessonIdSet = new Set(allLessons.map((l) => l.id));

for (const q of allQuestions) {
  const where = q.id;
  if (!q.scenario?.trim()) err("question", where, `empty scenario`);
  if (!Array.isArray(q.options) || q.options.length < 2) {
    err("question", where, `fewer than 2 options`);
  } else {
    const optionIds = new Set(q.options.map((o) => o.id));
    if (optionIds.size !== q.options.length) err("question", where, `duplicate option ids`);
    for (const o of q.options) {
      if (!o.text?.trim()) err("question", where, `option "${o.id}" has empty text`);
    }
  }
  if (!Array.isArray(q.correctAnswers) || q.correctAnswers.length === 0) {
    err("question", where, `no correctAnswers specified`);
  } else {
    const optionIds = new Set((q.options ?? []).map((o) => o.id));
    for (const ca of q.correctAnswers) {
      if (!optionIds.has(ca)) err("question", where, `correctAnswers references option id "${ca}" not present in options`);
    }
    if (q.type === "single" && q.correctAnswers.length !== 1) {
      err("question", where, `type is "single" but correctAnswers has ${q.correctAnswers.length} entries`);
    }
  }
  if (!q.explanation?.trim()) err("question", where, `empty explanation`);
  if (q.options) {
    for (const o of q.options) {
      if (!q.optionExplanations?.[o.id]?.trim()) {
        err("question", where, `optionExplanations missing/empty for option "${o.id}"`);
      }
    }
  }
  if (q.lessonId && !lessonIdSet.has(q.lessonId)) {
    err("question", where, `lessonId "${q.lessonId}" does not match any lesson id`);
  }
  for (const svc of q.services ?? []) {
    if (!lessonIdSet.has(svc)) {
      warn("question", where, `services references "${svc}" which is not a known lesson id`);
    }
  }
  if (![1, 2, 3, 4].includes(q.domain)) err("question", where, `invalid domain ${q.domain}`);
}

// cross-check: every lesson's questionIds should actually be "kind: checkpoint" or scenario tied back to that lesson
for (const lesson of allLessons) {
  for (const qid of lesson.questionIds ?? []) {
    const q = questionById.get(qid);
    if (q && q.lessonId && q.lessonId !== lesson.id) {
      warn("lesson", lesson.id, `questionIds includes "${qid}" but that question's lessonId is "${q.lessonId}"`);
    }
  }
}

// orphaned questions: checkpoint/scenario questions not referenced by any lesson.questionIds
const referencedQIds = new Set(allLessons.flatMap((l) => l.questionIds ?? []));
for (const q of allQuestions) {
  if (q.kind !== "exam" && !referencedQIds.has(q.id)) {
    warn("question", q.id, `kind="${q.kind}" question is not referenced by any lesson's questionIds`);
  }
}

// ---------- Flashcards ----------
const flashcardIdCounts = new Map<string, number>();
for (const f of allFlashcards) flashcardIdCounts.set(f.id, (flashcardIdCounts.get(f.id) ?? 0) + 1);
for (const [id, count] of flashcardIdCounts) if (count > 1) err("flashcard", id, `duplicate flashcard id used ${count} times`);

for (const f of allFlashcards) {
  const where = f.id;
  if (!f.front?.trim()) err("flashcard", where, `empty front`);
  if (!f.back?.trim()) err("flashcard", where, `empty back`);
  if (f.serviceId && !lessonIdSet.has(f.serviceId)) {
    err("flashcard", where, `serviceId "${f.serviceId}" does not match any lesson id`);
  }
  if (f.domain && ![1, 2, 3, 4].includes(f.domain)) err("flashcard", where, `invalid domain ${f.domain}`);
}

// ---------- Report ----------
const errors = issues.filter((i) => i.severity === "error");
const warnings = issues.filter((i) => i.severity === "warn");

console.log(`\n=== AUDIT SUMMARY ===`);
console.log(`Lessons: ${allLessons.length}, Questions: ${allQuestions.length}, Flashcards: ${allFlashcards.length}, Modules: ${modules.length}`);
console.log(`Errors: ${errors.length}, Warnings: ${warnings.length}\n`);

function printGroup(title: string, list: Issue[]) {
  if (list.length === 0) return;
  console.log(`--- ${title} (${list.length}) ---`);
  for (const i of list) {
    console.log(`[${i.area}] ${i.id}: ${i.message}`);
  }
  console.log("");
}

printGroup("ERRORS", errors);
printGroup("WARNINGS", warnings);

if (errors.length > 0) process.exitCode = 1;
