import type { Lesson } from "@/lib/types";

export const orientationLessons: Lesson[] = [
  {
    id: "role-of-a-solutions-architect",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "What a Solutions Architect Actually Does",
    shortName: "SA Mindset",
    tier: 1,
    domains: [1, 2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "A Solutions Architect turns business requirements into an AWS architecture that balances security, reliability, performance, and cost.",
    englishExplanation:
      "Before you learn a single AWS service, you need to learn how a Solutions Architect actually thinks. The job is not \"know every AWS service by heart.\" The job is: gather what the business actually needs, translate that into a technical design, and defend the trade-offs you made.\n\nEvery real design goes through the same five lenses: security (who can access what), reliability (what happens when something fails), performance (is it fast enough for the users we have), cost (are we paying for more than we need), and operations (how much manual work does this create for the team). Almost every SAA-C03 exam question is secretly asking you to weigh these five lenses against each other.\n\nThis is exactly why the exam rarely asks \"What is EC2?\" It asks: \"Given these requirements, which architecture is BEST?\" There is usually more than one technically-working answer — your job is to find the one that best satisfies the stated requirements without over-engineering or under-engineering it.",
    taglishExplanation:
      "Bago ka mag-aral ng mga AWS services, kailangan mo munang intindihin kung paano talaga umiisip ang isang Solutions Architect. Hindi ito \"memorize lahat ng services.\" Ito ay: kunin mo muna kung ano talaga ang kailangan ng business, tapos i-translate mo iyon sa isang technical design — at kaya mong ipaliwanag kung bakit ganoon ang ginawa mong desisyon, kasama na ang mga sacrifice/tradeoff.\n\nSa exam, halos palaging may ilang sagot na \"gumagana naman,\" pero isa lang ang PINAKAangkop batay sa hinihingi ng tanong — kaya laging babalikan mo itong limang lens: security, reliability, performance, cost, at operations.",
    analogy:
      "Being a Solutions Architect is like being an architect who designs a house, not the construction worker who lays every brick. The homeowner (the business) tells you they need a 3-bedroom house that can survive earthquakes and floods, within a budget. You don't need to personally know how to manufacture concrete — you need to know which materials and layout satisfy the requirements, and why.",
    whyItExists:
      "Without this discipline, teams either over-build (paying for redundancy and scale nobody needs) or under-build (systems that fall over during the first real traffic spike or outage). The Solutions Architect role — and the SAA-C03 exam — exists to certify that someone can make these trade-offs correctly and defend them.",
    flow:
      "Business requirement -> constraints (budget, timeline, compliance) -> candidate architectures -> evaluate against Security/Reliability/Performance/Cost/Operations -> chosen design -> implementation guidance",
    withoutIt: [
      "Architectures get built around whichever service the engineer happens to know, not the one that fits",
      "Security and cost get treated as an afterthought instead of a design input",
      "Nobody can explain why a design decision was made, which makes it hard to change safely later",
    ],
    bestUseCases: [
      "Any new system design where more than one AWS service could technically work",
      "Evaluating an existing architecture for a compliance, cost, or reliability review",
      "Communicating trade-offs to non-technical stakeholders",
    ],
    poorUseCases: [
      "This is a mindset, not a service — there is no \"poor use case,\" but skipping this thinking and jumping straight to services is the #1 mistake new learners make",
    ],
    alternatives: [],
    keyFeatures: [
      "Gather business/functional requirements before picking services",
      "Translate requirements into non-functional needs: security, reliability, performance, cost",
      "Consider operational overhead — who maintains this after launch?",
      "Compare trade-offs explicitly instead of picking the first workable option",
    ],
    availability:
      "Not applicable — this is a decision-making framework, not an AWS service.",
    security:
      "Security is one of the five lenses (and the largest single exam domain at 30%) — a Solutions Architect treats it as a first-class requirement, not something bolted on at the end.",
    pricingLogic:
      "Cost is always one of the five lenses. \"Cheapest\" and \"most cost-effective\" are different: the exam wants the solution that meets every stated requirement at the lowest reasonable total cost, not simply the cheapest individual service.",
    examKeywords: [
      "BEST solution",
      "MOST cost-effective",
      "requirements",
      "constraints",
      "trade-off",
    ],
    examTraps: [
      "Picking the first answer that \"would work\" instead of the one that best fits every stated requirement.",
      "Ignoring a constraint mentioned early in the question (e.g. \"minimum operational overhead\") when evaluating the options.",
    ],
    architectureDiagram:
      "Business Requirement\n      |\n  Constraints (cost, compliance, timeline)\n      |\n  Candidate Architectures\n      |\nSecurity | Reliability | Performance | Cost | Operations\n      |\n  Chosen Design",
    architectureCaption:
      "Every SAA scenario question is secretly running your answer through these five lenses.",
    mentorTip:
      "When you read a scenario question, before looking at the options, ask yourself: \"What is this company optimizing for?\" Usually one or two of the five lenses are clearly emphasized in the wording — that's your filter for eliminating wrong answers.",
    questionIds: [
      "q-role-of-a-solutions-architect-1",
      "q-role-of-a-solutions-architect-2",
      "q-role-of-a-solutions-architect-3",
      "q-role-of-a-solutions-architect-4",
      "q-role-of-a-solutions-architect-5",
    ],
  },
  {
    id: "reading-scenario-questions",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "How to Read AWS Scenario Questions",
    shortName: "Question Parsing",
    tier: 1,
    domains: [1, 2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "SAA scenario questions hide a requirement, a constraint, and distractors inside a short story — learn to pull those apart before choosing an answer.",
    englishExplanation:
      "SAA-C03 questions are written as short business scenarios, not trivia. Buried in that paragraph are usually: the actual requirement (what must be true), a constraint (a limit you cannot violate, like budget or \"no code changes\"), and a key architecture signal (a phrase like \"unpredictable traffic\" or \"must survive an Availability Zone failure\").\n\nThe four answer choices are then designed so that most of them violate the requirement or the constraint in a subtle way, or satisfy it in a technically-correct-but-worse way. Two answers are often eliminated almost immediately once you spot the constraint; the remaining two require you to judge which is MORE appropriate, not just \"which one works.\"\n\nUse this framework every time: (1) What does the company actually need? (2) What constraint matters most? (3) Which AWS services naturally match that need? (4) Which remaining answer(s) violate a requirement? (5) Of what's left, which is MOST appropriate?",
    taglishExplanation:
      "Ang mga SAA scenario questions ay parang maiikling kwento tungkol sa isang company. Sa loob ng kwentong iyon, may nakatagong (1) totoong requirement, (2) constraint o limitasyon, at (3) malaking clue/signal tungkol sa tamang architecture. Karaniwan, dalawa sa apat na choices ay puwede mong agad na alisin dahil lumalabag sila sa constraint — ang natitira, doon mo gagamitin ang \"alin ang PINAKA-angkop.\"",
    analogy:
      "Reading a scenario question is like a doctor reading a patient's symptoms before prescribing anything. You don't jump to the first medicine that could help a headache — you check the full list of symptoms (constraints) first, because some medicines that fix the headache would be dangerous given the patient's other conditions.",
    whyItExists:
      "AWS designs the exam this way on purpose — to test judgment under realistic, messy requirements, not memorization of service names.",
    flow:
      "Read scenario -> identify requirement -> identify constraint -> shortlist matching services -> eliminate answers that violate the constraint -> pick the MOST appropriate remaining answer",
    withoutIt: [
      "You'll pick technically-working-but-wrong answers because you ignored a stated constraint",
      "You'll waste time re-reading the question instead of parsing it systematically",
      "You'll fall for distractors that sound impressive but don't fit the requirement",
    ],
    bestUseCases: [
      "Every single scenario and multiple-response question on the real exam",
      "Practicing with this framework consistently builds exam speed",
    ],
    poorUseCases: [
      "Simple recall/definition questions don't need the full framework, just direct knowledge",
    ],
    alternatives: [],
    keyFeatures: [
      "Requirement identification — what MUST be true",
      "Constraint identification — budget, compliance, \"no code changes\", timeline",
      "Key architecture signal spotting — phrases that point to a specific service family",
      "Distractor elimination before final answer selection",
    ],
    availability: "Not applicable — this is an exam technique, not an AWS service.",
    security: "Not applicable.",
    pricingLogic: "Not applicable.",
    examKeywords: [
      "MOST cost-effective",
      "MOST operationally efficient",
      "with the LEAST operational overhead",
      "highly available",
      "minimum downtime",
    ],
    examTraps: [
      "Choosing an answer that solves the problem but ignores an explicit constraint like budget or compliance.",
      "Spending too long on one question instead of eliminating obviously-wrong answers first.",
    ],
    architectureDiagram:
      "1. What does the company need?\n2. What constraint matters most?\n3. What AWS services match?\n4. Which answer violates a requirement?\n5. Which remaining answer is MOST appropriate?",
    mentorTip:
      "Underline (mentally or on scratch paper in the real exam) the constraint word — \"least operational overhead\", \"lowest cost\", \"no downtime\" — before you even look at the four options.",
    questionIds: [
      "q-reading-scenario-questions-1",
      "q-reading-scenario-questions-2",
      "q-reading-scenario-questions-3",
      "q-reading-scenario-questions-4",
      "q-reading-scenario-questions-5",
    ],
  },
  {
    id: "aws-global-infrastructure",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "AWS Global Infrastructure",
    shortName: "Regions & AZs",
    tier: 1,
    domains: [2, 3],
    examImportance: "critical",
    oneLiner:
      "AWS infrastructure is organized into Regions, Availability Zones, and Edge Locations — and almost every availability decision starts here.",
    englishExplanation:
      "A Region is a physical geographic area (like ap-southeast-1 in Singapore) that contains multiple, isolated data centers. Those isolated data centers are grouped into Availability Zones (AZs) — each AZ has independent power, cooling, and networking, so a problem in one AZ (a flood, a power failure) should not take down another AZ in the same Region.\n\nEdge Locations are a much larger set of smaller sites closer to end users, used by services like CloudFront and Route 53 to cache content and resolve DNS close to the user for speed.\n\nSome AWS services are Regional (you choose a Region to deploy them in, e.g. EC2, RDS), and a few are Global (IAM, Route 53, CloudFront config) with no Region selection needed. Understanding this hierarchy is the foundation for almost every high-availability and disaster-recovery decision in the rest of the course: Multi-AZ protects against a data-center-level failure, Multi-Region protects against a much larger, Region-wide event.",
    taglishExplanation:
      "Ang Region ay parang isang siyudad (halimbawa, Singapore). Sa loob ng siyudad na iyon, may ilang magkakahiwalay na \"gusali\" — iyon ang Availability Zones (AZ), bawat isa may sariling power at networking kaya kung magkaproblema sa isang gusali, tuloy-tuloy pa rin ang iba. Ang Edge Locations naman ay parang maliliit na sangay na malapit sa users para mabilis ang serbisyo (gaya ng CloudFront).",
    analogy:
      "Region = a city. Availability Zone = separate, independently-powered buildings within that city. Multi-Region = having operations in entirely separate cities, so even a city-wide disaster doesn't stop you.",
    whyItExists:
      "Without this physical isolation model, AWS could not offer high-availability guarantees — a single data center failure would be able to take down every customer's application in that location.",
    flow:
      "Choose a Region closest to your users/compliance needs -> deploy resources across 2+ AZs in that Region -> optionally replicate to a second Region for disaster recovery",
    withoutIt: [
      "A single data center failure could take your entire application offline",
      "Users far from your chosen Region would experience high latency",
      "Disaster recovery planning would have no structured way to think about blast radius",
    ],
    bestUseCases: [
      "Deciding where to deploy an application for latency and compliance reasons (Region selection)",
      "Designing Multi-AZ architectures for high availability",
      "Designing Multi-Region architectures for disaster recovery or global user bases",
    ],
    poorUseCases: [
      "Not applicable — every architecture must consider this, it's foundational, not optional",
    ],
    alternatives: [],
    keyFeatures: [
      "Regions are isolated from each other by default (data doesn't cross Regions unless you configure it to)",
      "Each Region has multiple (usually 3+) Availability Zones",
      "Regional services require you to pick a Region; Global services do not",
      "Edge Locations exist in far more places than Regions, for low-latency content delivery and DNS",
    ],
    availability:
      "This module IS the definition of availability options in AWS: single-AZ (no protection from a data-center failure), Multi-AZ (protection from an AZ failure), Multi-Region (protection from a Region-wide event).",
    security:
      "Regions are isolated for data residency/compliance — data does not leave a Region unless you explicitly replicate or transfer it, which matters for regulatory requirements.",
    pricingLogic:
      "Pricing can vary by Region. Data transfer between AZs within a Region, and especially between Regions, incurs cost — a recurring exam cost-optimization theme.",
    examKeywords: [
      "Region",
      "Availability Zone",
      "Edge Location",
      "multi-AZ",
      "multi-Region",
      "global service",
      "regional service",
    ],
    examTraps: [
      "Assuming an AZ failure and a Region failure require the same DR strategy — they don't; Region failure needs a second Region.",
      "Forgetting that cross-AZ and cross-Region data transfer has a cost.",
    ],
    architectureDiagram:
      "Region: ap-southeast-1\n  |- AZ-a (independent power/network)\n  |- AZ-b (independent power/network)\n  |- AZ-c (independent power/network)\nEdge Locations: many, closer to end users, used by CloudFront/Route 53",
    mentorTip:
      "If a question says the workload must \"survive the loss of an entire Availability Zone,\" you need at least two AZs. If it says \"survive the loss of an entire Region,\" you need a second Region — no amount of extra AZs in the same Region will satisfy that requirement.",
    questionIds: [
      "q-aws-global-infrastructure-1",
      "q-aws-global-infrastructure-2",
      "q-aws-global-infrastructure-3",
      "q-aws-global-infrastructure-4",
      "q-aws-global-infrastructure-5",
    ],
  },
];
