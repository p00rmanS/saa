import Link from "next/link";
import { GitCompare, ArrowRight } from "lucide-react";
import { allQuestions } from "@/data";
import { comparisons } from "@/data/comparisons";
import { DOMAIN_TITLES, DOMAIN_WEIGHTS } from "@/lib/readiness";
import type { ExamDomainId } from "@/lib/types";

export const metadata = { title: "Quizzes — SAA Mentor" };

const domains: ExamDomainId[] = [1, 2, 3, 4];

export default function QuizzesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Quizzes</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Practice by exam domain, or drill the service comparisons that show up constantly on the real
        exam.
      </p>

      <h2 className="mb-3 mt-8 text-lg font-semibold tracking-tight">Practice by Domain</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {domains.map((d) => {
          const count = allQuestions.filter((q) => q.domain === d).length;
          return (
            <Link
              key={d}
              href={`/quizzes/domain/${d}`}
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/30"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Domain {d} · {DOMAIN_WEIGHTS[d]}% of exam
                </p>
                <p className="mt-0.5 text-base font-semibold group-hover:text-primary">
                  {DOMAIN_TITLES[d]}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{count} questions in the bank</p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Service Comparisons</h2>
        <span className="text-sm text-muted-foreground">{comparisons.length} comparisons</span>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((c) => (
          <Link
            key={c.id}
            href={`/quizzes/comparisons/${c.id}`}
            className="group flex flex-col gap-1.5 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/30"
          >
            <div className="flex items-center gap-2">
              <GitCompare className="size-4 text-muted-foreground" />
              <p className="text-sm font-medium group-hover:text-primary">{c.title}</p>
            </div>
            <p className="line-clamp-2 text-xs text-muted-foreground">{c.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
