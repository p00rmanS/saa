import { architecturePatterns } from "@/data/architecture-patterns";
import { whatIfScenarios } from "@/data/whatif";
import { whyNotScenarios } from "@/data/whynot";
import { lessonById } from "@/data";
import { ArchitectureDiagram } from "@/components/lesson/architecture-diagram";
import { WhatIfExplorer } from "@/components/architecture/what-if-explorer";
import { WhyNotExplorer } from "@/components/architecture/why-not-explorer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata = { title: "Architectures — SAA Mentor" };

export default function ArchitecturesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Architectures</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Reference patterns, and two interactive modes that teach architecture through failure and
        elimination.
      </p>

      <Tabs defaultValue="patterns" className="mt-8">
        <TabsList>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="whatif">What Happens If…</TabsTrigger>
          <TabsTrigger value="whynot">Why Not This?</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="mt-6">
          <div className="flex flex-col gap-6">
            {architecturePatterns.map((pattern) => (
              <div key={pattern.id} className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-lg font-semibold tracking-tight">{pattern.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{pattern.description}</p>

                <div className="mt-4">
                  <ArchitectureDiagram diagram={pattern.diagram} />
                </div>

                <ul className="mt-4 flex flex-col gap-1.5">
                  {pattern.decisions.map((d, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/90">
                      <span className="text-primary">•</span>
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pattern.relatedLessonIds.map((id) => {
                    const lesson = lessonById.get(id);
                    if (!lesson) return null;
                    return (
                      <Link key={id} href={`/course/${id}`}>
                        <Badge
                          variant="outline"
                          className="cursor-pointer border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                        >
                          {lesson.shortName ?? lesson.title}
                        </Badge>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="whatif" className="mt-6">
          <p className="mb-4 text-sm text-muted-foreground">
            Start from a simple architecture, then ask &quot;what happens if…&quot; at each layer. This is
            how architecture reasoning actually works on the exam.
          </p>
          <WhatIfExplorer scenarios={whatIfScenarios} />
        </TabsContent>

        <TabsContent value="whynot" className="mt-6">
          <p className="mb-4 text-sm text-muted-foreground">
            Pick an answer, then see exactly why every option is right or wrong — the skill that
            actually wins SAA-C03 scenario questions.
          </p>
          <WhyNotExplorer scenarios={whyNotScenarios} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
