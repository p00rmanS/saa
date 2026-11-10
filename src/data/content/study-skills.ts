import type { Flashcard, Lesson, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const studySkillsLessons: Lesson[] = [
  {
    id: "memory-techniques-for-aws-exam",
    moduleId: "phase-15-exam-mastery",
    category: "Exam Mastery",
    title: "How to Make It Stick: Memory Techniques and AWS Mnemonics",
    shortName: "Memory techniques",
    tier: 1,
    domains: [1, 2, 3, 4],
    examImportance: "high",
    oneLiner:
      "Reading feels like learning but recall is what the exam tests, so study by retrieving, spacing, comparing and explaining, and attach hooks to the facts that keep slipping.",
    englishExplanation:
      "Most people re-read lessons and feel they know the material, because familiar text is easy to recognise. The exam does not show you the lesson, it asks you to retrieve the right idea from memory with similar-looking distractors beside it. So the single most useful habit is active recall: close the lesson and try to answer from memory first, then check. Flashcards, practice questions and explaining a topic aloud all force retrieval, and being wrong while practising is useful because it marks exactly what to fix.\n\nSpacing beats cramming. Review a topic after one day, then three days, then a week, then two weeks. Each time you almost forget and then recall it, the memory gets stronger. The flashcard deck in this course is built for this: mark cards you know and revisit the difficult ones more often. Interleave topics instead of studying one service for hours, because the exam mixes services and you need to choose between look-alikes, such as SQS or SNS, EBS or EFS, Shield or WAF. Compare pairs side by side and write the single deciding difference.\n\nMake facts meaningful. Link each service to a concrete story: S3 is the unlimited filing cabinet, Lambda is the vending machine that runs code only when someone presses a button. Chunk long lists into groups of three to five, and use mnemonics for the ones that will not stick, such as the six Well-Architected pillars or the order of disaster recovery strategies. Add numbers only where they matter (for example Lambda's 15 minute limit or Glacier minimum storage durations) and keep them on one cheat sheet.\n\nBuild a loop around mistakes. Keep an error log with one line per missed question: what the question was really asking, which keyword you missed and the rule that decides it. Re-read the log before each practice session. Sleep, regular short sessions and a full timed mock exam in the last week do more than late-night marathons. For each topic, finish by teaching it in plain words to an imaginary friend or in Taglish to yourself. If you cannot explain it simply, you do not know it yet.",
    taglishExplanation:
      "Karamihan ay nagbabasa ulit ng lesson at pakiramdam nila alam na nila, kasi madaling makilala ang pamilyar na teksto. Pero ang exam ay hindi nagpapakita ng lesson, kailangan mong bawiin sa alaala ang tamang sagot na may katabing mga lokong option. Kaya ang pinakamahalagang gawi ay active recall: isara ang lesson, sumagot muna mula sa alaala, saka i-check. Flashcards, practice questions, at pagpapaliwanag nang malakas ay pawang retrieval, at okay lang magkamali habang nagpa-practice dahil doon mo nakikita ang aayusin.\n\nMas mabisa ang spaced review kaysa cramming: balikan pagkatapos ng 1 araw, 3 araw, 1 linggo, 2 linggo. I-interleave ang mga topic para masanay kang pumili sa pagitan ng magkakamukhang service (SQS o SNS, EBS o EFS, Shield o WAF), at isulat ang iisang pagkakaiba. Gawing may kahulugan ang mga fact gamit ang kuwento o analogy, hatiin sa 3 hanggang 5 na grupo, at gumamit ng mnemonic sa mga ayaw dumikit.\n\nMagtago ng error log: isang linya kada maling sagot na may keyword na nalampasan at ang rule na nagpapasya. Basahin ito bago mag-practice. Mas epektibo ang tulog, maiikling regular na session, at isang timed mock exam sa huling linggo kaysa puyatan. Sa dulo ng bawat topic, ituro ito sa simpleng salita, kahit sa Taglish sa sarili mo. Kapag hindi mo kayang ipaliwanag nang simple, hindi mo pa ito kabisado.",
    analogy:
      "Training for a sport. Watching videos of the game feels productive, but only practising the moves under pressure builds the skill. Spaced practice is the weekly training plan, and the mistake log is the coach's notebook.",
    whyItExists:
      "Learning science shows that retrieval, spacing and interleaving produce much stronger long-term memory than rereading, and certification exams reward exactly that kind of recall.",
    flow: "Learn a topic -> close it and recall from memory -> check and fix -> space the review -> mix topics -> log mistakes -> timed mock exam",
    withoutIt: [
      "You would reread and feel prepared but forget under exam pressure",
      "Look-alike services would blur together",
      "The same mistakes would repeat because nothing records them",
    ],
    bestUseCases: [
      "A daily 20 to 30 minute flashcard session",
      "Interleaved quizzes across domains",
      "An error log reviewed before each session",
      "Teaching a topic aloud in your own words or Taglish",
    ],
    poorUseCases: [
      "Marathon sessions the night before the exam",
      "Highlighting and rereading as the only method",
      "Memorising answers instead of the deciding rule",
    ],
    alternatives: [],
    keyFeatures: [
      "Active recall: answer before you look",
      "Spaced repetition: 1 day, 3 days, 1 week, 2 weeks",
      "Interleaving and side-by-side comparison of look-alikes",
      "Mnemonics and analogies for stubborn facts",
      "Error log with the keyword and the deciding rule",
      "Timed mock exams in the final week",
    ],
    availability: "Not applicable. This is a study technique lesson.",
    security: "Not applicable. This is a study technique lesson.",
    pricingLogic: "Not applicable. This is a study technique lesson.",
    examKeywords: ["active recall", "spaced repetition", "mnemonic", "error log", "interleaving"],
    examTraps: [
      "Feeling familiar with a page is not the same as being able to recall it.",
      "Studying one service for hours feels good but hides the look-alike confusion the exam tests.",
      "Memorising a number without the rule that uses it will not survive a reworded question.",
    ],
    architectureDiagram: `Learn -> Recall (close the page) -> Check -> Space (1d, 3d, 1w, 2w)
        ^                                              |
        +----- Error log: keyword + deciding rule <----+
Weekly: mixed quiz.  Final week: timed mock exam.`,
    architectureCaption: "A loop of recall, spacing and mistake review.",
    mentorTip:
      "Use mnemonics in this order: first a story or analogy, then a short phrase, and only last a raw acronym. Make them funny or personal and they last longer.",
    questionIds: [
      "q-memory-techniques-for-aws-exam-1",
      "q-memory-techniques-for-aws-exam-2",
      "q-memory-techniques-for-aws-exam-3",
    ],
  },
  {
    id: "exam-cram-sheet-look-alikes-and-numbers",
    moduleId: "phase-15-exam-mastery",
    category: "Exam Mastery",
    title: "Cram Sheet: Look-Alike Pairs, Key Numbers and Keyword Shortcuts",
    shortName: "Cram sheet",
    tier: 1,
    domains: [1, 2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "A last-48-hours page of the pairs the exam uses as distractors, the few numbers worth knowing, and the keyword that points to each service.",
    englishExplanation:
      "Look-alike pairs. SQS is a queue that consumers pull from, while SNS pushes one message to many subscribers. EBS is block storage for one instance in one AZ, EFS is shared Linux file storage across AZs, FSx for Windows is SMB with Active Directory, and S3 is object storage. A security group is stateful and only allows, while a network ACL is stateless, applies to the subnet and can deny. Shield defends against DDoS, WAF filters web requests by rules. CloudWatch watches metrics, logs and alarms, while CloudTrail records who called which API and Config records how resources are configured. RTO is how long you can be down and RPO is how much data you can lose. Multi-AZ is for availability with a standby that does not serve reads in standard RDS, and read replicas are for read scaling. Vertical scaling makes one machine bigger, horizontal scaling adds machines.\n\nNumbers worth knowing. Lambda runs up to 15 minutes. A DynamoDB item can be up to 400 KB. An S3 object can be up to 5 TB, and a single upload call is limited to 5 GB, so use multipart upload for large files. S3 is designed for 11 nines of durability. A Kinesis Data Streams shard takes 1 MB per second or 1,000 records per second in. An SQS message is kept for 4 days by default and up to 14 days, and the default visibility timeout is 30 seconds. Spot interruptions give a two-minute warning. Aurora supports up to 15 read replicas. A Glacier Flexible Retrieval object has a 90-day minimum storage duration, and Deep Archive has 180 days. VPC peering is not transitive. Security groups allow inbound by rule and all outbound by default, and a custom network ACL denies everything until you add rules.\n\nKeyword shortcuts. Least operational overhead points to a managed or serverless service. Decouple points to SQS, SNS or EventBridge. Lowest latency worldwide points to CloudFront or Global Accelerator. Steady usage points to Savings Plans or reserved capacity, interruptible work points to Spot. Unpredictable access pattern points to S3 Intelligent-Tiering. Audit who did what points to CloudTrail. Cross-account without keys points to an IAM role. Temporary credentials point to STS. Encryption key control and audit points to KMS customer managed keys, and rotating database passwords points to Secrets Manager. Private access to S3 or DynamoDB points to a gateway endpoint, and private access to other services or your own service points to PrivateLink. Read-heavy database points to replicas and caching. Disaster recovery with minutes of RTO and RPO points to warm standby.",
    taglishExplanation:
      "Mga magkakamukha: SQS ay queue na hinihila ng consumer, SNS ay nagtutulak ng isang mensahe sa maraming subscriber. EBS ay block storage para sa isang instance sa isang AZ, EFS ay shared Linux file storage sa maraming AZ, FSx for Windows ay SMB na may Active Directory, S3 ay object storage. Ang security group ay stateful at allow lang; ang network ACL ay stateless, nasa subnet, at puwedeng mag-deny. Shield para sa DDoS, WAF para sa web request rules. CloudWatch ay metrics at logs, CloudTrail ay kung sino ang tumawag ng API, Config ay kung paano naka-configure ang resources. RTO ay gaano katagal puwedeng down, RPO ay gaano karaming data ang puwedeng mawala.\n\nMga numero: Lambda hanggang 15 minuto; DynamoDB item hanggang 400 KB; S3 object hanggang 5 TB (multipart para sa malalaki); Kinesis shard 1 MB/s o 1,000 records/s papasok; SQS retention 4 araw default hanggang 14; Spot ay may 2-minutong babala; Aurora hanggang 15 read replicas; Glacier Flexible 90-araw minimum, Deep Archive 180; hindi transitive ang VPC peering.\n\nKeyword shortcuts: least operational overhead = managed o serverless; decouple = SQS/SNS/EventBridge; global na mababang latency = CloudFront o Global Accelerator; steady = Savings Plans; interruptible = Spot; hindi tiyak ang access = Intelligent-Tiering; audit = CloudTrail; cross-account na walang keys = IAM role; private S3/DynamoDB = gateway endpoint; read-heavy DB = replicas at cache; DR na minuto lang = warm standby.",
    analogy:
      "The index card you glance at in the car park before an exam. It holds only what is easy to mix up, not the whole course.",
    whyItExists:
      "Late revision is best spent on the facts that decide between near-identical options, not on rereading everything.",
    flow: "Read the pairs -> cover and recall each difference -> check the numbers -> run the keyword shortcuts against a few practice questions",
    withoutIt: [
      "Distractors that differ by one detail would catch you",
      "You would lose time recalling basic limits during the exam",
    ],
    bestUseCases: [
      "The last 48 hours before the exam",
      "A pre-practice warm-up",
      "Checking your recall of look-alike pairs",
    ],
    poorUseCases: [
      "Learning a topic for the first time from this page",
      "Memorising numbers without the scenario that uses them",
    ],
    alternatives: [],
    keyFeatures: [
      "Fifteen look-alike pairs with the deciding difference",
      "Key service limits and durations",
      "Keyword to service shortcuts",
    ],
    availability: "Not applicable. This is a reference lesson.",
    security: "Not applicable. This is a reference lesson.",
    pricingLogic: "Not applicable. This is a reference lesson.",
    examKeywords: ["least operational overhead", "decouple", "lowest latency", "cross-account", "unpredictable access"],
    examTraps: [
      "Limits change over time. Treat the numbers as a memory aid and confirm anything important in the AWS documentation.",
      "A keyword shortcut points to the likely service, but always check the other constraints in the scenario.",
      "Standard RDS Multi-AZ standby does not serve read traffic.",
    ],
    architectureDiagram: `Pairs:  SQS pull | SNS push    EBS 1 AZ | EFS shared    SG stateful | NACL stateless
        Shield DDoS | WAF rules    CloudWatch metrics | CloudTrail who | Config state
Keys:   decouple->queue  latency->CDN  steady->commit  spiky->serverless  audit->CloudTrail`,
    architectureCaption: "The pairs, the numbers and the keywords on one page.",
    mentorTip:
      "Cover the right-hand side and recite each difference out loud. If you stumble, put that pair on a flashcard.",
    questionIds: [
      "q-exam-cram-sheet-look-alikes-and-numbers-1",
      "q-exam-cram-sheet-look-alikes-and-numbers-2",
      "q-exam-cram-sheet-look-alikes-and-numbers-3",
    ],
  },
];

export const studySkillsQuestions: Question[] = [
  mk(
    "memory-techniques-for-aws-exam", 1, 1, "easy",
    "Which study habit best prepares you to choose between similar-looking answer options under exam conditions?",
    [
      "Rereading the lesson several times",
      "Answering practice questions from memory, then reviewing the ones you missed",
      "Highlighting every definition",
      "Studying only one service per week",
    ],
    "b",
    "Retrieval practice with feedback trains the exact skill the exam tests, and missed questions show what to fix.",
    [
      "Rereading creates familiarity without testing recall.",
      "Active recall with review builds retrieval and finds weak spots.",
      "Highlighting is passive.",
      "Studying services in isolation hides the confusion between look-alikes.",
    ],
    "Active recall beats rereading", ["active recall"]
  ),
  mk(
    "memory-techniques-for-aws-exam", 2, 1, "medium",
    "A learner keeps confusing SQS and SNS. What is the most effective way to fix it?",
    [
      "Read both lessons again from the start",
      "Write the single deciding difference on a flashcard and mix it into daily reviews",
      "Skip both services on the exam",
      "Memorise the pricing page",
    ],
    "b",
    "Comparing the pair and reviewing the one deciding difference over spaced sessions targets the exact confusion.",
    [
      "Rereading everything is slow and does not isolate the confusion.",
      "A short deciding-difference card, reviewed with spacing, works.",
      "Skipping topics leaves gaps in a high-frequency area.",
      "Pricing does not decide between these services.",
    ],
    "Fix confusion with a one-line deciding difference", ["interleaving", "flashcard"]
  ),
  mk(
    "memory-techniques-for-aws-exam", 3, 1, "medium",
    "Which review schedule follows the idea of spaced repetition?",
    [
      "Study a topic for six hours once",
      "Review after 1 day, 3 days, 1 week and 2 weeks",
      "Review every topic only on the final day",
      "Review only the topics you find easy",
    ],
    "b",
    "Spacing reviews with growing gaps strengthens memory more than one long session.",
    [
      "One long session fades quickly.",
      "Growing gaps between reviews is spaced repetition.",
      "Last-day cramming gives weak long-term retention.",
      "Easy topics need less review, hard ones need more.",
    ],
    "Spread reviews over growing gaps", ["spaced repetition"]
  ),
  mk(
    "exam-cram-sheet-look-alikes-and-numbers", 1, 2, "medium",
    "A rule must be added to block one specific IP address from reaching a subnet. Which statement is correct?",
    [
      "A security group can deny a specific IP",
      "A network ACL can deny a specific IP, and it is stateless",
      "A security group is stateless",
      "A network ACL is attached to an instance",
    ],
    "b",
    "Network ACLs apply at the subnet, are stateless and support deny rules. Security groups are stateful and allow only.",
    [
      "Security groups cannot deny.",
      "NACLs are stateless and support explicit deny.",
      "Security groups are stateful.",
      "NACLs attach to subnets, not instances.",
    ],
    "NACL = stateless + deny, SG = stateful + allow", ["NACL", "security group"]
  ),
  mk(
    "exam-cram-sheet-look-alikes-and-numbers", 2, 3, "medium",
    "A processing job takes about 40 minutes per run. Which service is NOT suited because of its execution time limit?",
    ["AWS Lambda", "AWS Batch", "Amazon ECS on Fargate", "Amazon EC2"],
    "a",
    "Lambda functions can run for at most 15 minutes, so a 40-minute job needs a container, batch or instance based service.",
    [
      "Lambda's 15-minute limit rules it out.",
      "Batch handles long-running jobs.",
      "Fargate tasks can run as long as needed.",
      "EC2 has no such limit.",
    ],
    "Longer than 15 minutes -> not Lambda", ["Lambda", "15 minutes"]
  ),
  mk(
    "exam-cram-sheet-look-alikes-and-numbers", 3, 4, "medium",
    "Which service records which user called which AWS API and when?",
    ["Amazon CloudWatch", "AWS CloudTrail", "AWS Config", "Amazon Inspector"],
    "b",
    "CloudTrail records API activity for auditing.",
    [
      "CloudWatch collects metrics, logs and alarms.",
      "CloudTrail answers who did what.",
      "Config tracks configuration state and changes.",
      "Inspector scans for vulnerabilities.",
    ],
    "\"who called\" -> CloudTrail", ["CloudTrail"]
  ),
];

export const studySkillsFlashcards: Flashcard[] = [
  // Memory aids and mnemonics
  fc("memory-techniques-for-aws-exam", 1, 1, "Exam Mastery", "Mnemonic: six Well-Architected pillars?", "\"Our Secure Rooftop Pool Costs Sustainably\": Operational excellence, Security, Reliability, Performance efficiency, Cost optimization, Sustainability."),
  fc("memory-techniques-for-aws-exam", 2, 2, "Exam Mastery", "Mnemonic: DR strategies from cheapest and slowest to costliest and fastest?", "\"Bears Pick Warm Mittens\": Backup and restore, Pilot light, Warm standby, Multi-site active-active."),
  fc("memory-techniques-for-aws-exam", 3, 2, "Exam Mastery", "Remember RTO vs RPO?", "RTO = Recovery TIME (how long to be back). RPO = Recovery POINT (how much data you can lose, measured back in time)."),
  fc("memory-techniques-for-aws-exam", 4, 1, "Exam Mastery", "Remember security group vs NACL?", "SG = Stateful Guest list at the instance door (allow only). NACL = No-memory Checkpoint at the subnet gate (stateless, can deny)."),
  fc("memory-techniques-for-aws-exam", 5, 2, "Exam Mastery", "Remember SQS vs SNS?", "SQS = Sip from a Queue (consumers pull). SNS = Shout to Subscribers (push to many)."),
  fc("memory-techniques-for-aws-exam", 6, 1, "Exam Mastery", "Remember CloudWatch vs CloudTrail?", "CloudWatch WATCHES metrics and logs. CloudTrail leaves a TRAIL of who called which API."),
  fc("memory-techniques-for-aws-exam", 7, 3, "Exam Mastery", "Remember EBS vs EFS?", "EBS = one disk for one instance in one AZ. EFS = Everyone's File Share across instances and AZs."),
  fc("memory-techniques-for-aws-exam", 8, 1, "Exam Mastery", "Remember Shield vs WAF?", "Shield blocks floods (DDoS). WAF filters web requests by rules (Web App Filter)."),
  fc("memory-techniques-for-aws-exam", 9, 4, "Exam Mastery", "Remember the S3 storage classes from hot to cold?", "Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Instant Retrieval, Glacier Flexible Retrieval, Glacier Deep Archive. Cheaper to store, costlier to retrieve as you go down."),
  fc("memory-techniques-for-aws-exam", 10, 4, "Exam Mastery", "Remember Spot vs reserved?", "Spot = Stop anytime (cheap, interruptible). Reserved or Savings Plans = Steady usage (commit for a discount)."),
  fc("memory-techniques-for-aws-exam", 11, 3, "Exam Mastery", "Remember scale up vs scale out?", "Up = a bigger machine (vertical). Out = more machines (horizontal) behind a load balancer."),
  fc("memory-techniques-for-aws-exam", 12, 1, "Exam Mastery", "How do you review so it sticks?", "Recall before you look, space reviews (1 day, 3 days, 1 week, 2 weeks), mix topics, log mistakes with the missed keyword."),
  fc("exam-cram-sheet-look-alikes-and-numbers", 1, 3, "Exam Mastery", "Lambda maximum run time?", "15 minutes."),
  fc("exam-cram-sheet-look-alikes-and-numbers", 2, 3, "Exam Mastery", "DynamoDB maximum item size?", "400 KB."),
  fc("exam-cram-sheet-look-alikes-and-numbers", 3, 3, "Exam Mastery", "S3 maximum object size and single upload limit?", "5 TB per object. A single PUT is limited to 5 GB, so use multipart upload for large files."),
  fc("exam-cram-sheet-look-alikes-and-numbers", 4, 3, "Exam Mastery", "Kinesis Data Streams per-shard write limit?", "1 MB per second or 1,000 records per second in."),
  fc("exam-cram-sheet-look-alikes-and-numbers", 5, 2, "Exam Mastery", "SQS retention and visibility timeout defaults?", "Retention 4 days by default, up to 14. Visibility timeout 30 seconds by default."),
  fc("exam-cram-sheet-look-alikes-and-numbers", 6, 4, "Exam Mastery", "Minimum storage durations for Glacier classes?", "Glacier Flexible Retrieval 90 days, Deep Archive 180 days. Deleting early is still billed for the remainder."),
  fc("exam-cram-sheet-look-alikes-and-numbers", 7, 2, "Exam Mastery", "Aurora read replica limit?", "Up to 15 read replicas."),
  fc("exam-cram-sheet-look-alikes-and-numbers", 8, 3, "Exam Mastery", "Keyword: least operational overhead?", "Choose the managed or serverless service."),
  fc("exam-cram-sheet-look-alikes-and-numbers", 9, 1, "Exam Mastery", "Keyword: cross-account access without keys?", "An IAM role assumed with temporary credentials (STS)."),
  fc("exam-cram-sheet-look-alikes-and-numbers", 10, 2, "Exam Mastery", "Keyword: DR with minutes of RTO and RPO?", "Warm standby with continuous replication."),
];
