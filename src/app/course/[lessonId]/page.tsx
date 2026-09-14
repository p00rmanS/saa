import { notFound } from "next/navigation";
import { allLessons, lessonById, questionsForLesson } from "@/data";
import { moduleForLesson } from "@/data/modules";
import { LessonView } from "@/components/lesson/lesson-view";

export function generateStaticParams() {
  return allLessons.map((l) => ({ lessonId: l.id }));
}

export async function generateMetadata(props: PageProps<"/course/[lessonId]">) {
  const { lessonId } = await props.params;
  const lesson = lessonById.get(lessonId);
  return { title: lesson ? `${lesson.title} — SAA Mentor` : "Lesson — SAA Mentor" };
}

export default async function LessonPage(props: PageProps<"/course/[lessonId]">) {
  const { lessonId } = await props.params;
  const lesson = lessonById.get(lessonId);
  if (!lesson) notFound();

  const questions = questionsForLesson(lesson.id);
  const mod = moduleForLesson(lesson.id);

  let prevLesson: { id: string; title: string } | undefined;
  let nextLesson: { id: string; title: string } | undefined;

  if (mod) {
    const idx = mod.lessonIds.indexOf(lesson.id);
    const prevId = idx > 0 ? mod.lessonIds[idx - 1] : undefined;
    const nextId = idx >= 0 && idx < mod.lessonIds.length - 1 ? mod.lessonIds[idx + 1] : undefined;
    const prev = prevId ? lessonById.get(prevId) : undefined;
    const next = nextId ? lessonById.get(nextId) : undefined;
    if (prev) prevLesson = { id: prev.id, title: prev.title };
    if (next) nextLesson = { id: next.id, title: next.title };
  }

  return (
    <LessonView lesson={lesson} questions={questions} prevLesson={prevLesson} nextLesson={nextLesson} />
  );
}
