import { Suspense } from "react";
import { MockExamRunClient } from "./run-client";

export const metadata = { title: "Mock Exam — SAA Mentor" };

export default function MockExamRunPage() {
  return (
    <Suspense fallback={<div className="h-96" />}>
      <MockExamRunClient />
    </Suspense>
  );
}
