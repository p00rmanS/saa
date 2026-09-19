import type { Lesson } from "@/lib/types";

export const examMasteryLessons: Lesson[] = [
  {
    id: "keyword-recognition",
    moduleId: "phase-15-exam-mastery",
    category: "Exam Mastery",
    title: "Keyword Recognition",
    shortName: "Keywords",
    tier: 1,
    domains: [1, 2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "Certain words in a scenario reliably point to a specific AWS service family — train yourself to spot them instantly.",
    englishExplanation:
      "After enough practice, an experienced test-taker doesn't fully re-derive the architecture from scratch for every question — they recognize patterns. Certain words show up again and again in SAA-C03 scenarios because they map almost one-to-one to a specific service or design pattern.\n\nThis is not a shortcut to replace understanding — it's what understanding looks like once it becomes fast. You still need to verify the keyword against the full scenario (constraints can override the obvious match), but keyword recognition dramatically speeds up your first read of a question and narrows your options before you even start eliminating answers.",
    taglishExplanation:
      "Pagkatapos ng maraming practice, hindi mo na kailangang mag-isip mula zero sa bawat tanong — may mga salita na paulit-ulit lumalabas at halos direkta nang tumuturo sa isang specific na AWS service. Hindi ito \"shortcut\" para hindi na intindihin — ito na mismo ang itsura ng pag-intindi kapag mabilis na. Pero laging i-verify pa rin sa buong tanong, kasi minsan may constraint na pumipigil sa \"obvious\" na sagot.",
    analogy:
      "This is like a doctor who, after years of practice, hears \"chest pain radiating to the left arm\" and immediately thinks \"possible cardiac event\" — not because they skip the diagnosis, but because pattern recognition IS expertise.",
    whyItExists:
      "The exam is timed, and re-deriving every architecture decision from first principles for all 65 questions would take too long. Recognizing patterns lets you move fast on the questions that match a clear pattern, saving time for the genuinely ambiguous ones.",
    flow: "Read scenario -> spot the keyword(s) -> shortlist the matching service(s) -> verify against constraints -> select the most appropriate answer",
    withoutIt: [
      "You would need to reason from first principles on every question, running out of time",
      "You might miss well-known service-to-keyword associations under exam pressure",
    ],
    bestUseCases: [
      "Rapidly narrowing down answer choices on straightforward scenario questions",
      "Building exam speed during timed practice",
    ],
    poorUseCases: [
      "Blindly picking a service from a keyword without checking the rest of the scenario for overriding constraints",
    ],
    alternatives: [],
    keyFeatures: [
      "\"decouple\" -> SQS",
      "\"fanout\" -> SNS + SQS",
      "\"static content worldwide\" -> CloudFront",
      "\"shared Linux file system\" -> EFS",
      "\"block storage for EC2\" -> EBS",
      "\"object storage\" -> S3",
      "\"serverless NoSQL\" -> DynamoDB",
      "\"managed relational database\" -> RDS/Aurora",
      "\"audit API activity\" -> CloudTrail",
      "\"metrics and alarms\" -> CloudWatch",
      "\"protect web app from SQL injection\" -> WAF",
      "\"DDoS\" -> Shield",
      "\"sensitive data in S3\" -> Macie",
      "\"private subnet internet access\" -> NAT Gateway",
    ],
    availability: "Not applicable — this is an exam technique.",
    security: "Not applicable.",
    pricingLogic: "Not applicable.",
    examKeywords: ["keyword recognition", "pattern matching"],
    examTraps: [
      "Picking a service purely from a keyword without checking whether a constraint elsewhere in the question overrides it.",
    ],
    architectureDiagram:
      "\"decouple\" -> SQS\n\"fanout\" -> SNS+SQS\n\"static content worldwide\" -> CloudFront\n\"shared Linux filesystem\" -> EFS",
    mentorTip:
      "Build your own running list of keyword-to-service mappings as you study — writing them yourself cements them far better than reading someone else's list.",
    questionIds: [
      "q-keyword-recognition-1",
      "q-keyword-recognition-2",
      "q-keyword-recognition-3",
      "q-keyword-recognition-4",
      "q-keyword-recognition-5",
    ],
  },
  {
    id: "eliminating-distractors",
    moduleId: "phase-15-exam-mastery",
    category: "Exam Mastery",
    title: "How to Eliminate Distractors",
    shortName: "Elimination",
    tier: 1,
    domains: [1, 2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "Most SAA questions can be narrowed from four options to two by spotting one clear requirement mismatch — learn the common mismatch patterns.",
    englishExplanation:
      "Distractor elimination is the practical skill of quickly ruling out answers that are wrong for a structural reason, before spending time deciding which of the remaining options is best.\n\nFour common mismatch patterns cover a large share of SAA distractors: a requirement mismatch (the option ignores something explicitly required, like \"no server management\"), an availability mismatch (the option is single-AZ when the question requires surviving an AZ failure), a storage mismatch (the option uses block storage where a shared filesystem is needed, or vice versa), and a network mismatch (the option routes traffic over the public internet when a private AWS connectivity option is required).",
    taglishExplanation:
      "Ang \"pag-eliminate ng distractors\" ay ang kasanayang mabilis na alisin ang mga sagot na mali dahil sa structural reason, bago ka pa mag-isip kung alin sa natitira ang pinakamahusay. Apat na common na klase ng mismatch: requirement mismatch, availability mismatch, storage mismatch, at network mismatch.",
    analogy:
      "This is like a job interviewer with a stack of 100 resumes and only 15 minutes. They don't carefully evaluate every resume equally — they first throw out the ones that clearly don't meet the minimum requirements (wrong location, no required certification), THEN carefully compare the remaining candidates.",
    whyItExists:
      "Elimination is faster than full evaluation. Recognizing a disqualifying mismatch takes seconds; fully reasoning about whether an option is \"the best\" takes longer — save that effort for the options that survive the first pass.",
    flow: "Read all 4 options -> check each against the scenario's explicit requirements -> eliminate structural mismatches -> deeply compare what's left",
    withoutIt: [
      "You would spend equal time evaluating every option, including obviously-wrong ones",
      "You would be more likely to run out of time under exam conditions",
    ],
    bestUseCases: [
      "Any multiple-choice or multiple-response SAA question",
      "Timed practice exams where speed matters",
    ],
    poorUseCases: [
      "Questions with only one plausible option — elimination isn't needed if there's nothing to compare",
    ],
    alternatives: [],
    keyFeatures: [
      "Requirement mismatch: e.g. \"no server management\" rules out EC2-heavy answers",
      "Availability mismatch: single-AZ answers are wrong when AZ-failure tolerance is required",
      "Storage mismatch: EBS is usually wrong when multiple instances need shared files (EFS territory)",
      "Network mismatch: public-internet routing is wrong when private AWS connectivity is explicitly required",
    ],
    availability: "Not applicable.",
    security: "Not applicable.",
    pricingLogic: "Not applicable.",
    examKeywords: ["distractor", "elimination", "requirement mismatch"],
    examTraps: [
      "Eliminating an option for the wrong reason (e.g. assuming higher cost automatically means wrong, when cost wasn't the binding constraint).",
    ],
    architectureDiagram:
      "4 options\n  |\ncheck requirement mismatch\n  |\ncheck availability mismatch\n  |\ncheck storage mismatch\n  |\ncheck network mismatch\n  |\n1-2 options remain -> compare deeply",
    mentorTip:
      "Practice narrating WHY you eliminated an answer, not just that you did — this catches the mistake of eliminating for the wrong reason.",
    questionIds: [
      "q-eliminating-distractors-1",
      "q-eliminating-distractors-2",
      "q-eliminating-distractors-3",
      "q-eliminating-distractors-4",
      "q-eliminating-distractors-5",
    ],
  },
  {
    id: "timed-mini-exams",
    moduleId: "phase-15-exam-mastery",
    category: "Exam Mastery",
    title: "Timed Mini Exams",
    shortName: "Mini Exams",
    tier: 1,
    domains: [1, 2, 3, 4],
    examImportance: "high",
    oneLiner:
      "Short, timed 10/20/30-question sets build exam stamina and pacing before you attempt a full 65-question mock exam.",
    englishExplanation:
      "Jumping straight into a full 130-minute, 65-question mock exam before you're ready can be discouraging and doesn't isolate what's actually weak. Timed mini exams — 10, 20, or 30 questions — let you practice pacing and pressure in smaller, more frequent doses, and quickly surface which domains need more review.\n\nThe platform's mini exams pull from the same stratified question bank as the full mock exam, sampled proportionally to the real exam's domain weights, so the experience mirrors the real thing at a smaller scale.",
    taglishExplanation:
      "Bago ka sumabak sa buong 65-question mock exam, mas maganda munang mag-practice gamit ang maiikling 10/20/30-question sets. Dito mo mas mabilis makikita kung aling domain ang kailangan mo pang balikan, bago ka mag-invest ng buong 130 minutes.",
    analogy:
      "This is like practicing free throws in short sets of 10 before playing a full basketball game — you build the specific muscle memory and rhythm in manageable chunks.",
    whyItExists:
      "Pacing under time pressure is a skill separate from knowing the material — mini exams build that skill incrementally instead of all at once.",
    flow: "Select question count (10/20/30) -> timed session -> instant scoring -> domain breakdown -> recommended review",
    withoutIt: [
      "You would only get pacing practice during the full, high-stakes mock exam",
      "Weak areas would surface less frequently, slowing down your improvement loop",
    ],
    bestUseCases: [
      "Daily/weekly practice rhythm during active study",
      "Quick checks after finishing a new module",
    ],
    poorUseCases: [
      "Replacing the full mock exam entirely — you still need at least 2 full 65-question simulations before the real exam",
    ],
    alternatives: [
      { need: "A full, realistic exam-day simulation", choose: "Full 65-question Mock Exam" },
    ],
    keyFeatures: [
      "10, 20, or 30-question timed sets",
      "Stratified sampling matching real exam domain weights",
      "Immediate scoring and domain breakdown",
    ],
    availability: "Not applicable.",
    security: "Not applicable.",
    pricingLogic: "Not applicable.",
    examKeywords: ["timed practice", "pacing"],
    examTraps: [
      "Only ever taking mini exams and never a full 65-question simulation, which has a different stamina/pacing profile.",
    ],
    architectureDiagram: "Pick length (10/20/30) -> Timer starts -> Answer -> Score + domain breakdown",
    mentorTip:
      "Track your average time per question in mini exams — the real exam gives roughly 2 minutes per question; if you're consistently over that, focus on faster elimination.",
    questionIds: ["q-timed-mini-exams-1", "q-timed-mini-exams-2", "q-timed-mini-exams-3"],
  },
  {
    id: "full-mock-exam",
    moduleId: "phase-15-exam-mastery",
    category: "Exam Mastery",
    title: "Full Mock Exam",
    shortName: "Mock Exam",
    tier: 1,
    domains: [1, 2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "A full 65-question, 130-minute simulation mirroring the real SAA-C03 exam's structure and domain weighting.",
    englishExplanation:
      "The full mock exam simulates the real exam experience: 65 questions (a mix of multiple choice and multiple response), a 130-minute timer, and questions drawn proportionally from the four domains at their real weights (30/26/24/20). After submission, you get your total score, a domain-by-domain breakdown, a list of weak services/concepts, and recommended lessons to review.\n\nThis platform recommends completing at least two full mock exams, with a 75%+ average and no domain below 70%, as one signal (alongside lesson completion and quiz averages) that you're ready to schedule the real exam.",
    taglishExplanation:
      "Ito ang pinakamalapit na simulation sa totoong exam: 65 questions, 130 minutes, at ang bilang ng tanong bawat domain ay sumusunod sa tunay na weighting (30/26/24/20). Pagkatapos, makikita mo ang total score mo, breakdown per domain, mga mahihinang paksa, at inirerekomendang aralin muli.",
    analogy:
      "This is a full dress rehearsal before opening night — same length, same structure, same pressure, so nothing about exam day itself feels unfamiliar.",
    whyItExists:
      "Knowing the material and performing under real exam conditions (time pressure, question mix, mental stamina over 130 minutes) are different skills — the full mock exam trains and validates both together.",
    flow: "Start mock exam -> answer 65 questions within 130 minutes -> submit -> score + domain breakdown -> weak-area recommendations",
    withoutIt: [
      "You would walk into the real exam without having experienced its actual length and pacing demands",
      "You wouldn't have a reliable readiness signal before scheduling the real exam",
    ],
    bestUseCases: [
      "Final-stage exam preparation, after most modules are complete",
      "Validating readiness before scheduling the real SAA-C03 exam",
    ],
    poorUseCases: [
      "Taking it very early in your studies, before you've covered most modules — the low score can be discouraging without being diagnostic",
    ],
    alternatives: [
      { need: "Shorter, more frequent practice", choose: "Timed Mini Exams" },
      { need: "Practice focused on one exam domain only", choose: "Domain-specific quizzes on the Exam Domains page" },
    ],
    keyFeatures: [
      "65 questions, 130-minute timer",
      "Domain-weighted question sampling (30/26/24/20)",
      "Multiple choice and multiple response question types",
      "Post-exam domain score breakdown and weak-area recommendations",
    ],
    availability: "Not applicable.",
    security: "Not applicable.",
    pricingLogic: "Not applicable.",
    examKeywords: ["mock exam", "65 questions", "130 minutes"],
    examTraps: [
      "Treating a single mock exam result as final — this platform recommends at least two full attempts before drawing conclusions.",
    ],
    architectureDiagram: "65 questions (weighted 30/26/24/20 by domain) -> 130-minute timer -> Submit -> Score + domain breakdown -> Weak-area report",
    mentorTip:
      "These internal thresholds (90% lessons, 80%+ domain quizzes, 75%+ mock average, no domain below 70%) are study recommendations, not official AWS passing criteria — use them as a personal readiness signal, not a guarantee.",
    questionIds: ["q-full-mock-exam-1", "q-full-mock-exam-2", "q-full-mock-exam-3"],
  },
];
