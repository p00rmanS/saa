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

  const plan: StudyPlanDay[] = [];
  let dayCursor = 1;

  for (const mod of modules) {
    const share = mod.lessonIds.length / totalLessons;
    const daysForModule = Math.max(1, Math.round(share * studyDays));
    const start = dayCursor;
    const end = Math.min(studyDays, dayCursor + daysForModule - 1);
    if (start > studyDays) break;

    plan.push({
      days: start === end ? `Day ${start}` : `Days ${start}-${end}`,
      focus: mod.title,
      moduleIds: [mod.id],
    });
    dayCursor = end + 1;
  }

  // Merge any leftover single day into the last study block instead of leaving a gap.
  if (dayCursor <= studyDays && plan.length > 0) {
    const last = plan[plan.length - 1];
    const lastStart = parseInt(last.days.replace(/[^\d-]/g, "").split("-")[0], 10);
    plan[plan.length - 1] = {
      ...last,
      days: `Days ${lastStart}-${studyDays}`,
    };
  }

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
