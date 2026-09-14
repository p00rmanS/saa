import { notFound } from "next/navigation";
import Link from "next/link";
import { allQuestions } from "@/data";
import { CheckpointQuiz } from "@/components/quiz/checkpoint-quiz";
import { DOMAIN_TITLES, DOMAIN_WEIGHTS } from "@/lib/readiness";
import type { ExamDomainId } from "@/lib/types";

const DIFFICULTY_ORDER = { easy: 0, medium: 1, hard: 2, exam: 3 } as const;

export function generateStaticParams() {
  return [{ domainId: "1" }, { domainId: "2" }, { domainId: "3" }, { domainId: "4" }];
}

export async function generateMetadata(props: PageProps<"/quizzes/domain/[domainId]">) {
  const { domainId } = await props.params;
  const d = Number(domainId) as ExamDomainId;
  return { title: `${DOMAIN_TITLES[d] ?? "Domain"} Quiz — SAA Mentor` };
}

export default async function DomainQuizPage(props: PageProps<"/quizzes/domain/[domainId]">) {
  const { domainId } = await props.params;
  const d = Number(domainId);
  if (![1, 2, 3, 4].includes(d)) notFound();
  const domain = d as ExamDomainId;

  const questions = allQuestions
    .filter((q) => q.domain === domain)
    .sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);

  return (
    <div>
      <Link href="/quizzes" className="text-sm text-muted-foreground hover:text-foreground">
        ← All quizzes
      </Link>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        Domain {domain}: {DOMAIN_TITLES[domain]}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {DOMAIN_WEIGHTS[domain]}% of the real exam · {questions.length} questions in this practice set
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {questions.map((q, i) => (
          <CheckpointQuiz key={q.id} question={q} index={i} />
        ))}
      </div>
    </div>
  );
}
