import { notFound } from "next/navigation";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { comparisons } from "@/data/comparisons";
import { Callout } from "@/components/callout";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return comparisons.map((c) => ({ comparisonId: c.id }));
}

export async function generateMetadata(props: PageProps<"/quizzes/comparisons/[comparisonId]">) {
  const { comparisonId } = await props.params;
  const cmp = comparisons.find((c) => c.id === comparisonId);
  return { title: cmp ? `${cmp.title} — SAA Mentor` : "Comparison — SAA Mentor" };
}

export default async function ComparisonPage(props: PageProps<"/quizzes/comparisons/[comparisonId]">) {
  const { comparisonId } = await props.params;
  const cmp = comparisons.find((c) => c.id === comparisonId);
  if (!cmp) notFound();

  return (
    <div>
      <Link href="/quizzes" className="text-sm text-muted-foreground hover:text-foreground">
        ← All quizzes
      </Link>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{cmp.title}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{cmp.summary}</p>

      <Callout icon={Lightbulb} tone="brand" title="Exam Tip" className="mt-6">
        <p>{cmp.examTip}</p>
      </Callout>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {cmp.items.map((item) => (
          <div key={item.name} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
            <h2 className="text-base font-semibold text-primary">{item.name}</h2>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Primary Use</p>
              <p className="text-sm text-foreground/90">{item.primaryUse}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Scope</p>
              <p className="text-sm text-foreground/90">{item.scope}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Availability</p>
              <p className="text-sm text-foreground/90">{item.availability}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Scalability</p>
              <p className="text-sm text-foreground/90">{item.scalability}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Operational Overhead
              </p>
              <p className="text-sm text-foreground/90">{item.operationalOverhead}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Cost Logic</p>
              <p className="text-sm text-foreground/90">{item.costLogic}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Exam Keywords</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {item.examKeywords.map((k) => (
                  <Badge key={k} variant="outline" className="border-border bg-muted/40 font-mono text-[11px]">
                    {k}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-danger/20 bg-danger/5 p-2.5">
              <p className="text-xs font-medium uppercase tracking-wide text-danger">When NOT to use</p>
              <p className="text-sm text-foreground/90">{item.whenNotToUse}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
