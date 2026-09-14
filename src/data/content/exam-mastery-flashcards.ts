import type { Flashcard } from "@/lib/types";

export const examMasteryFlashcards: Flashcard[] = [
  { id: "fc-keyword-recognition-1", serviceId: "keyword-recognition", domain: 3, category: "Exam Mastery", front: "\"decouple\" -> ?", back: "SQS (or SNS/EventBridge for event-driven decoupling)." },
  { id: "fc-keyword-recognition-2", serviceId: "keyword-recognition", domain: 3, category: "Exam Mastery", front: "\"static content worldwide\" -> ?", back: "Amazon CloudFront." },
  { id: "fc-keyword-recognition-3", serviceId: "keyword-recognition", domain: 1, category: "Exam Mastery", front: "\"audit API activity\" -> ?", back: "AWS CloudTrail." },
  { id: "fc-keyword-recognition-4", serviceId: "keyword-recognition", domain: 1, category: "Exam Mastery", front: "Taglish: Bakit hindi puwedeng basta piliin ang sagot base sa keyword lang?", back: "Kasi minsan may constraint sa tanong na puwedeng mag-override sa 'obvious' na sagot — laging i-verify sa buong scenario." },
  { id: "fc-keyword-recognition-5", serviceId: "keyword-recognition", domain: 3, category: "Exam Mastery", front: "\"private subnet internet access\" -> ?", back: "NAT Gateway." },

  { id: "fc-eliminating-distractors-1", serviceId: "eliminating-distractors", domain: 4, category: "Exam Mastery", front: "Name the four common distractor mismatch types.", back: "Requirement mismatch, availability mismatch, storage mismatch, network mismatch." },
  { id: "fc-eliminating-distractors-2", serviceId: "eliminating-distractors", domain: 2, category: "Exam Mastery", front: "What kind of mismatch is a single-AZ answer when AZ-failure tolerance is required?", back: "An availability mismatch." },
  { id: "fc-eliminating-distractors-3", serviceId: "eliminating-distractors", domain: 3, category: "Exam Mastery", front: "What kind of mismatch is EBS proposed for multi-instance shared file access?", back: "A storage mismatch (EFS/FSx is usually correct instead)." },
  { id: "fc-eliminating-distractors-4", serviceId: "eliminating-distractors", domain: 4, category: "Exam Mastery", front: "Taglish: Ano ang dapat gawin pagkatapos mag-eliminate ng mga structural mismatches?", back: "Ikumpara nang mabuti ang mga natitirang sagot laban sa lahat ng requirements, saka piliin ang pinakaangkop." },

  { id: "fc-timed-mini-exams-1", serviceId: "timed-mini-exams", domain: 4, category: "Exam Mastery", front: "What lengths are available for mini exams?", back: "10, 20, or 30 questions, timed." },
  { id: "fc-timed-mini-exams-2", serviceId: "timed-mini-exams", domain: 4, category: "Exam Mastery", front: "Why take mini exams before the full mock exam?", back: "They build pacing and stamina in smaller, less overwhelming doses." },

  { id: "fc-full-mock-exam-1", serviceId: "full-mock-exam", domain: 4, category: "Exam Mastery", front: "Full mock exam length?", back: "65 questions, 130 minutes — matching the real SAA-C03 exam." },
  { id: "fc-full-mock-exam-2", serviceId: "full-mock-exam", domain: 4, category: "Exam Mastery", front: "How many full mock exams does this platform recommend before the real exam?", back: "At least 2, with a 75%+ average and no domain below 70%." },
];
