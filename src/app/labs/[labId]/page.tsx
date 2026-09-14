import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ListChecks, Target, AlertCircle, Sparkles, Trash2 } from "lucide-react";
import { labs } from "@/data/labs";
import { lessonById } from "@/data";
import { ArchitectureDiagram } from "@/components/lesson/architecture-diagram";
import { Callout } from "@/components/callout";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return labs.map((l) => ({ labId: l.id }));
}

export async function generateMetadata(props: PageProps<"/labs/[labId]">) {
  const { labId } = await props.params;
  const lab = labs.find((l) => l.id === labId);
  return { title: lab ? `${lab.title} — SAA Mentor Labs` : "Lab — SAA Mentor" };
}

export default async function LabPage(props: PageProps<"/labs/[labId]">) {
  const { labId } = await props.params;
  const lab = labs.find((l) => l.id === labId);
  if (!lab) notFound();

  return (
    <div>
      <Link href="/labs" className="text-sm text-muted-foreground hover:text-foreground">
        ← All labs
      </Link>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{lab.title}</h1>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Clock className="size-3.5" /> {lab.estimatedTime}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {lab.relatedLessonIds.map((id) => {
          const lesson = lessonById.get(id);
          if (!lesson) return null;
          return (
            <Link key={id} href={`/course/${id}`}>
              <Badge variant="outline" className="cursor-pointer border-border text-muted-foreground hover:border-primary/40 hover:text-primary">
                {lesson.shortName ?? lesson.title}
              </Badge>
            </Link>
          );
        })}
      </div>

      <Callout icon={Target} tone="brand" title="Goal" className="mt-6">
        <p>{lab.goal}</p>
      </Callout>

      <div className="mt-6">
        <ArchitectureDiagram diagram={lab.architecture} />
      </div>

      {lab.prerequisites.length > 0 && (
        <div className="mt-6 rounded-xl border border-border p-4">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Prerequisites
          </h2>
          <ul className="flex flex-col gap-1 text-sm text-foreground/90">
            {lab.prerequisites.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <ListChecks className="size-4" /> Steps
        </h2>
        <ol className="flex flex-col gap-2">
          {lab.steps.map((step, i) => (
            <li key={i} className="flex gap-3 rounded-lg border border-border p-3 text-sm">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs text-primary">
                {i + 1}
              </span>
              <span className="text-foreground/90">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <Callout icon={Sparkles} tone="success" title="Expected Result" className="mt-6">
        <p>{lab.expectedResult}</p>
      </Callout>

      <div className="mt-6 rounded-xl border border-danger/20 bg-danger/5 p-4">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-danger">
          <Trash2 className="size-4" /> Cleanup (avoid unexpected charges)
        </h2>
        <ul className="flex flex-col gap-1 text-sm text-foreground/90">
          {lab.cleanup.map((c, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-danger">—</span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-xl border border-border p-4">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Why This Matters for the Exam
        </h2>
        <p className="text-sm text-foreground/90">{lab.whyItMatters}</p>
      </div>

      {lab.commonErrors.length > 0 && (
        <Callout icon={AlertCircle} tone="warning" title="Common Errors" className="mt-6">
          <ul className="flex flex-col gap-1">
            {lab.commonErrors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </Callout>
      )}
    </div>
  );
}
