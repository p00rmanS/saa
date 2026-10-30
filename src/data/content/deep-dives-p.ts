import type { Lesson } from "@/lib/types";

const drill = (
  n: 1 | 2 | 3 | 4,
  domainName: string,
  focus: string,
  patterns: string[],
  traps: string[],
  diagram: string
): Lesson => ({
  id: `scenario-drill-domain-${n}`,
  moduleId: "phase-15-exam-mastery",
  category: "Exam Mastery",
  title: `Scenario Drill: Domain ${n} ${domainName}`,
  shortName: `Domain ${n} drill`,
  tier: 1,
  domains: [n],
  examImportance: "high",
  oneLiner: `Hard, multi-requirement scenarios for ${domainName.toLowerCase()}, where two or three constraints together decide the answer.`,
  englishExplanation: `Most missed exam questions are not about an unknown service. They are about a scenario with two or three constraints, and the right answer is the only option that satisfies all of them. This drill focuses on ${focus}.\n\nWork each question in a fixed order. First underline the constraints: the verb that sets the goal (reduce, secure, decouple, migrate), the limiting words (least operational overhead, lowest cost, no code changes, near real time) and any hard facts such as the data size, the protocol or the compliance rule. Second, discard options that break a hard constraint, even if they sound modern. Third, among what is left, choose the option that is managed and uses the fewest moving parts, because the exam favours it unless a constraint says otherwise. Fourth, check the survivor against each constraint again before you commit.\n\nPatterns to recognise in this domain: ${patterns.join(" ")}`,
  taglishExplanation: `Karamihan ng maling sagot sa exam ay hindi dahil sa hindi kilalang service kundi dahil sa scenario na may dalawa o tatlong constraints, at isa lang ang option na pasok sa lahat. Ito ang drill para sa ${focus}. Gawin ito nang sunod-sunod: i-underline ang mga constraint (goal, limiting words gaya ng least operational overhead o lowest cost, at mga hard fact), itapon ang option na lumalabag sa hard constraint, piliin ang pinaka-managed at pinakamakaunting gumagalaw na bahagi, at i-check ulit ang sagot laban sa bawat constraint.`,
  analogy:
    "Packing a suitcase with airline rules. Weight, size and liquids limits all apply together, and a bag that is perfect for two rules but breaks the third gets rejected at the gate.",
  whyItExists:
    "Knowing each service is necessary but not enough. The exam tests whether you can weigh several requirements at once, so practice in that format is the fastest way to improve.",
  flow: "Underline constraints -> eliminate options that break a hard constraint -> prefer managed and simple -> re-check against every constraint",
  withoutIt: [
    "You would pick the first familiar service that fits one requirement",
    "Distractors that satisfy only part of the scenario would look attractive",
    "Time would be lost re-reading questions instead of eliminating options",
  ],
  bestUseCases: [
    "Practising after finishing the topic lessons for this domain",
    "Reviewing missed questions to find which constraint you ignored",
    "Timed practice: about 90 seconds per question",
  ],
  poorUseCases: [
    "Using it before learning the underlying services",
    "Memorising answers instead of the reasoning",
  ],
  alternatives: [],
  keyFeatures: [
    "Three scenario questions that each combine multiple constraints",
    "Explanations that say why every wrong option fails",
    "Flashcards for the key decision rules",
  ],
  availability: "Not applicable. This is a study technique lesson.",
  security: "Not applicable. This is a study technique lesson.",
  pricingLogic: "Not applicable. This is a study technique lesson.",
  examKeywords: [
    "least operational overhead",
    "most cost-effective",
    "without changing application code",
    "highly available",
    "near real time",
  ],
  examTraps: traps,
  architectureDiagram: diagram,
  architectureCaption: "Read the constraints, eliminate, then choose the simplest survivor.",
  mentorTip:
    "After every wrong answer write one line: which constraint did I miss? Patterns repeat, and that list becomes your personal checklist.",
  questionIds: [
    `q-scenario-drill-domain-${n}-1`,
    `q-scenario-drill-domain-${n}-2`,
    `q-scenario-drill-domain-${n}-3`,
  ],
});

export const deepDivesP: Lesson[] = [
  drill(
    1,
    "Secure Architectures",
    "identity, data protection and network security decisions",
    [
      "Cross-account access is solved with roles and temporary credentials, never shared access keys.",
      "A permission that must never be exceeded points to a permission boundary or an SCP, while a grant points to an identity or resource policy.",
      "Encryption questions usually hinge on who controls the key, so look for key rotation, audit and cross-account use.",
      "Private access to AWS services points to VPC endpoints, and private exposure of your own service points to PrivateLink.",
    ],
    [
      "An SCP never grants permissions. It only limits what an account can be granted.",
      "Security groups are stateful and allow only. Network ACLs are stateless and can deny.",
      "Customer managed keys give control and audit. AWS managed keys do not allow key policy changes.",
    ],
    `Constraint list -> [IAM role / SCP / key policy / endpoint] -> verify every requirement`
  ),
  drill(
    2,
    "Resilient Architectures",
    "loose coupling, scaling and disaster recovery decisions",
    [
      "A queue between producer and consumer absorbs spikes and lets each side scale independently.",
      "The recovery objectives set the strategy: a long RTO and RPO allows backup and restore, a short one needs warm standby or active-active.",
      "Multi-AZ gives availability within a Region, while read replicas give read scaling and cross-Region copies give disaster recovery.",
      "Stateless tiers scale behind a load balancer, so move session state to a shared store.",
    ],
    [
      "A Multi-AZ standby does not serve read traffic in standard RDS Multi-AZ. Read replicas do.",
      "Route 53 failover needs health checks to detect the failure.",
      "SQS standard queues can deliver a message more than once, so consumers must be idempotent.",
    ],
    `Producer -> [SQS] -> ASG consumers   |   Region A primary -> replicate -> Region B standby`
  ),
  drill(
    3,
    "High-Performing Architectures",
    "choosing storage, compute, database and network performance options",
    [
      "Match the access pattern to the store: block for one instance, file for shared POSIX or SMB, object for scalable HTTP access.",
      "Caching in front of the slow part is the standard speed-up: CloudFront for content, ElastiCache or DAX for data.",
      "Provisioned throughput or IOPS matter only when a workload has a steady, measurable need.",
      "Read-heavy relational workloads scale with replicas, while key-value workloads at massive scale suit DynamoDB.",
    ],
    [
      "Instance store is the fastest local storage but it is lost when the instance stops or fails.",
      "Global Accelerator improves routing for TCP and UDP over the AWS network. CloudFront caches content.",
      "A bigger instance does not fix a database connection exhaustion problem. Use RDS Proxy.",
    ],
    `Client -> [CloudFront cache] -> ALB -> app -> [ElastiCache] -> database`
  ),
  drill(
    4,
    "Cost-Optimized Architectures",
    "storage tiering, compute purchasing and data transfer cost decisions",
    [
      "Steady, predictable usage earns commitments, while interruptible work earns Spot.",
      "Unknown or changing S3 access patterns suit Intelligent-Tiering, and known ageing patterns suit lifecycle rules.",
      "Data transfer across AZs, Regions and out to the internet is a frequent hidden cost, so keep chatty tiers together and use endpoints.",
      "Right-size first, then commit. Committing to oversized capacity locks in the waste.",
    ],
    [
      "Reserved Instances and Savings Plans do not reduce a bill for usage that is not covered by them.",
      "Glacier retrievals and early deletion fees can make archiving the wrong choice for data read often.",
      "A NAT gateway charges for processing data, so a gateway endpoint for S3 or DynamoDB can remove that cost.",
    ],
    `Measure usage -> right-size -> commit steady base -> Spot for flexible -> tier storage -> remove transfer waste`
  ),
];
