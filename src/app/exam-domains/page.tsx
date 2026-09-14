import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { examDomains } from "@/data/exam-domains";
import { lessonById } from "@/data";

export const metadata = { title: "Exam Domains — SAA Mentor" };

export default function ExamDomainsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Exam Domains</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        The SAA-C03 exam is scored across four domains. Security and resiliency carry the most
        weight — study time should reflect that.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {examDomains.map((domain) => (
          <div key={domain.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Domain {domain.id}
                </p>
                <h2 className="text-xl font-semibold tracking-tight">{domain.title}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-semibold text-primary">{domain.weight}%</span>
                <Link
                  href={`/quizzes/domain/${domain.id}`}
                  className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:border-primary/40 hover:text-primary"
                >
                  Practice <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${domain.weight * 2}%` }} />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {domain.subtopics.map((sub) => (
                <div key={sub.title}>
                  <p className="mb-2 text-sm font-medium text-foreground/90">{sub.title}</p>
                  <ul className="flex flex-col gap-1">
                    {sub.services.map((serviceId) => {
                      const lesson = lessonById.get(serviceId);
                      if (!lesson) return null;
                      return (
                        <li key={serviceId}>
                          <Link
                            href={`/course/${serviceId}`}
                            className="text-xs text-muted-foreground hover:text-primary hover:underline"
                          >
                            {lesson.shortName ?? lesson.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
