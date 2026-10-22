import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { examDomains } from "@/data/exam-domains";
import { lessonById } from "@/data";
import { taskStatements, inScopeServices } from "@/data/exam-guide";

export const metadata = { title: "Exam Domains — SAA Mentor" };

export default function ExamDomainsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Exam Domains</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        The SAA-C03 exam is scored across four domains. Security and resiliency carry the most
        weight — study time should reflect that.
      </p>

      <div className="mt-6 max-w-2xl rounded-lg border border-border bg-card p-4 text-sm">
        <p className="font-medium">Checked against the official exam guide</p>
        <p className="mt-1 text-muted-foreground">
          All {taskStatements.length} task statements and all {inScopeServices.length} in-scope services in the
          SAA-C03 guide (v1.1) are mapped to lessons below. Open a task statement to see the skills it tests and
          the lessons that cover them.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {examDomains.map((domain) => (
          <div key={domain.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
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

            <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4">
              <p className="text-sm font-medium">Task statements</p>
              {taskStatements
                .filter((t) => t.domain === domain.id)
                .map((t) => (
                  <details key={t.id} className="rounded-md border border-border px-3 py-2">
                    <summary className="cursor-pointer text-sm">
                      <span className="font-medium">{t.id}</span> {t.title}
                      <span className="ml-2 text-xs text-muted-foreground">{t.lessonIds.length} lessons</span>
                    </summary>
                    <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
                      {t.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                    <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      {t.lessonIds.map((id) => {
                        const lesson = lessonById.get(id);
                        if (!lesson) return null;
                        return (
                          <Link key={id} href={`/course/${id}`} className="text-primary hover:underline">
                            {lesson.shortName ?? lesson.title}
                          </Link>
                        );
                      })}
                    </p>
                  </details>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
