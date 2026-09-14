import { modules } from "@/data/modules";
import { lessonById } from "@/data";
import { LessonCard } from "@/components/lesson/lesson-card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const metadata = { title: "Learn — SAA Mentor" };

export default function CoursePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Learn</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Every phase of the SAA-C03 curriculum, from AWS fundamentals to exam mastery. Work through
        them in order, or jump straight to a service from{" "}
        <span className="text-foreground">Services</span>.
      </p>

      <Accordion className="mt-8" defaultValue={[modules[0]?.id]}>
        {modules.map((mod) => {
          const lessons = mod.lessonIds
            .map((id) => lessonById.get(id))
            .filter((l): l is NonNullable<typeof l> => Boolean(l));

          return (
            <AccordionItem key={mod.id} value={mod.id} className="border-border">
              <AccordionTrigger className="px-1">
                <span className="flex flex-col items-start gap-0.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {mod.phase}
                  </span>
                  <span className="text-base font-semibold text-foreground">{mod.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-4 px-1 text-sm text-muted-foreground">{mod.description}</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {lessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
