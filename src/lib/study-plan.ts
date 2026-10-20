import { modules } from "@/data/modules";
import type { StudyPlan, StudyPlanDay } from "@/lib/types";

const ALLOWED_DAYS = [7, 14, 30, 45, 60, 90] as const;
export type StudyPlanDayCount = (typeof ALLOWED_DAYS)[number];

export function isValidPlanLength(n: number): n is StudyPlanDayCount {
  return (ALLOWED_DAYS as readonly number[]).includes(n);
}

/**
 * Spreads every module across the requested number of days, reserving the
 * final ~10% of days for practice-exam review, proportional to how many
 * lessons each module actually contains (so S3/VPC-sized modules get more
 * days than a 2-lesson module).
 */
export function generateStudyPlan(totalDays: StudyPlanDayCount): StudyPlan {
  const reviewDays = Math.max(2, Math.round(totalDays * 0.1));
  const studyDays = totalDays - reviewDays;

  const totalLessons = modules.reduce((sum, m) => sum + m.lessonIds.length, 0);

  // Build study blocks from numeric day ranges. A module that rounds to zero days is
  // grouped with the next one, and modules beyond the last study day are folded into the
  // final block, so no module is ever dropped from short plans.
  interface Block {
    start: number;
    end: number;
    titles: string[];
    moduleIds: string[];
  }
  const blocks: Block[] = [];
  let pending: { titles: string[]; moduleIds: string[] } = { titles: [], moduleIds: [] };
  let dayCursor = 1;

  for (const mod of modules) {
    pending.titles.push(mod.title);
    pending.moduleIds.push(mod.id);

    const share = mod.lessonIds.length / totalLessons;
    const daysForModule = Math.round(share * studyDays);
    if (daysForModule < 1 && dayCursor <= studyDays) continue;

    if (dayCursor > studyDays) {
      const last = blocks[blocks.length - 1];
      last.titles.push(...pending.titles);
      last.moduleIds.push(...pending.moduleIds);
    } else {
      const end = Math.min(studyDays, dayCursor + daysForModule - 1);
      blocks.push({ start: dayCursor, end, ...pending });
      dayCursor = end + 1;
    }
    pending = { titles: [], moduleIds: [] };
  }

  if (pending.moduleIds.length > 0) {
    if (blocks.length > 0) {
      const last = blocks[blocks.length - 1];
      last.titles.push(...pending.titles);
      last.moduleIds.push(...pending.moduleIds);
    } else {
      blocks.push({ start: 1, end: studyDays, ...pending });
    }
  }

  // Stretch the last block over any leftover study days instead of leaving a gap.
  if (blocks.length > 0 && dayCursor <= studyDays) {
    blocks[blocks.length - 1].end = studyDays;
  }

  const plan: StudyPlanDay[] = blocks.map((b) => ({
    days: b.start === b.end ? `Day ${b.start}` : `Days ${b.start}-${b.end}`,
    focus: b.titles.join(" + "),
    moduleIds: b.moduleIds,
  }));

  const mockExamDays = Math.max(1, Math.floor(reviewDays / 2));
  plan.push({
    days:
      studyDays + 1 === totalDays - mockExamDays
        ? `Day ${studyDays + 1}`
        : `Days ${studyDays + 1}-${totalDays - mockExamDays}`,
    focus: "Timed mini exams and domain quiz review",
    moduleIds: [],
  });
  plan.push({
    days: totalDays - mockExamDays + 1 === totalDays
      ? `Day ${totalDays}`
      : `Days ${totalDays - mockExamDays + 1}-${totalDays}`,
    focus: "Full mock exam(s) and weak-area review",
    moduleIds: [],
  });

  return { totalDays, plan };
}
