import { notFound } from "next/navigation";
import Link from "next/link";
import { allQuestions } from "@/data";
import { DomainPractice } from "@/components/quiz/domain-practice";
import { DOMAIN_TITLES, DOMAIN_WEIGHTS } from "@/lib/readiness";
import type { ExamDomainId } from "@/lib/types";

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

  const questionCount = allQuestions.filter((q) => q.domain === domain).length;

  return (
    <div>
      <Link href="/quizzes" className="text-sm text-muted-foreground hover:text-foreground">
        ← All quizzes
      </Link>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        Domain {domain}: {DOMAIN_TITLES[domain]}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {DOMAIN_WEIGHTS[domain]}% of the real exam · {questionCount} questions in this practice set, ten at a time
      </p>

      <div className="mt-6">
        <DomainPractice domain={domain} />
      </div>
    </div>
  );
}
