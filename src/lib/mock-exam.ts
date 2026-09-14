import { allQuestions } from "@/data";
import type { ExamDomainId, Question } from "@/lib/types";
import { DOMAIN_WEIGHTS } from "@/lib/readiness";

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Stratified-samples questions from the shared bank proportionally to the
 * real exam's domain weights (30/26/24/20), avoiding ids in `exclude` when
 * the pool is large enough to do so, so two mock exams in the same session
 * don't feel identical.
 */
export function generateMockExam(
  totalQuestions: number,
  opts?: { seed?: number; exclude?: Set<string>; pool?: Question[] }
): Question[] {
  const rand = mulberry32(opts?.seed ?? Date.now());
  const pool = opts?.pool ?? allQuestions;
  const exclude = opts?.exclude ?? new Set<string>();

  const domains: ExamDomainId[] = [1, 2, 3, 4];
  const totalWeight = domains.reduce((s, d) => s + DOMAIN_WEIGHTS[d], 0);

  const counts: Record<ExamDomainId, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  let assigned = 0;
  for (const d of domains) {
    counts[d] = Math.floor((DOMAIN_WEIGHTS[d] / totalWeight) * totalQuestions);
    assigned += counts[d];
  }
  let remainder = totalQuestions - assigned;
  for (const d of domains) {
    if (remainder <= 0) break;
    counts[d] += 1;
    remainder -= 1;
  }

  const selected: Question[] = [];
  for (const d of domains) {
    const domainPool = pool.filter((q) => q.domain === d);
    const fresh = domainPool.filter((q) => !exclude.has(q.id));
    const candidates = fresh.length >= counts[d] ? fresh : domainPool;
    const picked = shuffle(candidates, rand).slice(0, counts[d]);
    selected.push(...picked);
  }

  return shuffle(selected, rand);
}

export function domainWeightSummary(): { domain: ExamDomainId; weight: number }[] {
  return ([1, 2, 3, 4] as ExamDomainId[]).map((d) => ({ domain: d, weight: DOMAIN_WEIGHTS[d] }));
}
