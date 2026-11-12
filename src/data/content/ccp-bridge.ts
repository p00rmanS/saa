import type { Flashcard, Lesson, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const ccpBridgeLessons: Lesson[] = [
  {
    id: "ccp-security-compliance-refresher",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "CCP Refresher: Security and Compliance in One Sitting",
    shortName: "CCP security refresher",
    tier: 1,
    domains: [1],
    examImportance: "high",
    oneLiner:
      "A teacher-style walkthrough of the Cloud Practitioner security domain: who is responsible for what, how access works, and which service answers which security question.",
    englishExplanation:
      "Let's start with the big idea, because the Cloud Practitioner exam builds almost everything on it: the shared responsibility model. AWS is responsible for security of the cloud, meaning the data centres, hardware, the network and the software that runs the managed services. You are responsible for security in the cloud, meaning your data, who can access it, how you configure the services and how you patch what you control. The split moves with the service. With EC2 you patch the guest operating system. With a managed service such as RDS, AWS patches the database engine, but you still manage access, encryption choices and the data. With a fully managed service like S3 or DynamoDB, you mostly handle data, access and configuration. A good test question to ask yourself is: who can touch this layer? If AWS physically controls it, it is AWS's job.\n\nNext, identity. IAM is how you control access. Users are people or applications, groups collect users, roles give temporary permissions to anyone or anything that assumes them, and policies are the JSON documents that say what is allowed. The principle that ties it together is least privilege: give only what is needed. Always protect the root user with multi-factor authentication and do not use it for daily work. For employees at a company, IAM Identity Center gives single sign-on to multiple accounts. Applications on AWS should use roles, not stored access keys.\n\nNow the service-to-question map, which is where the points are. Who made this API call? CloudTrail. What does this resource's configuration look like and did it change? Config. Are there threats or unusual behaviour? GuardDuty. Are there software vulnerabilities in my EC2 instances, containers or Lambda code? Inspector. Where is sensitive data such as personal information in S3? Macie. How do I protect against DDoS? Shield. How do I filter malicious web requests? WAF. How do I manage encryption keys? KMS, and CloudHSM when you need a dedicated hardware module you control. How do I store and rotate secrets? Secrets Manager. How do I see one dashboard of findings across services? Security Hub. How do I get AWS compliance reports and agreements? AWS Artifact. How do I check best practices, including security checks? Trusted Advisor. And how do I give users access to apps with sign-in? Cognito.\n\nFinally, compliance and data protection. AWS provides compliance reports and certifications that you can download in Artifact, but being on a compliant platform does not make your application compliant, since that is still shared. Encrypt data at rest and in transit, and know that KMS lets you control keys. For penetration testing, AWS lets you test many of your own resources without prior approval, but not activities such as denial of service attacks, so check the current policy. Pro tip from the teacher's desk: for every security question, first ask whether the answer is about identity, detection, protection or data. That alone removes half the options.",
    taglishExplanation:
      "Simulan natin sa pinakamahalagang konsepto: ang shared responsibility model. Ang AWS ang responsable sa security of the cloud: data centers, hardware, network, at software ng managed services. Ikaw ang responsable sa security in the cloud: ang data mo, sino ang may access, paano mo kino-configure ang services, at ang pag-patch ng kontrolado mo. Gumagalaw ang hati ayon sa service. Sa EC2, ikaw ang magpa-patch ng guest OS. Sa RDS, AWS ang magpa-patch ng database engine pero ikaw pa rin ang bahala sa access at encryption. Sa S3 o DynamoDB, data, access at configuration ang karamihan sa iyo. Tanong na gamitin: sino ang makakahawak sa layer na ito? Kung AWS lang, AWS ang may gawa.\n\nSunod, identity. Sa IAM: users, groups, roles (temporary permissions), at policies (JSON na nagsasabi kung ano ang pinapayagan). Prinsipyo: least privilege. I-MFA ang root user at huwag gamitin sa araw-araw. Para sa empleyado, IAM Identity Center. Para sa applications, roles at hindi access keys.\n\nAng service-to-question map: sino ang tumawag ng API? CloudTrail. Ano ang configuration at nagbago ba? Config. May banta ba? GuardDuty. May vulnerability ba sa EC2, containers, Lambda? Inspector. Nasaan ang sensitive data sa S3? Macie. DDoS? Shield. Malisyosong web request? WAF. Encryption keys? KMS (CloudHSM kung gusto mo ng dedikadong hardware). Secrets? Secrets Manager. Isang dashboard ng findings? Security Hub. Compliance reports? Artifact. Best practice checks? Trusted Advisor. Sign-in ng app users? Cognito.\n\nSa compliance: makakakuha ka ng reports sa Artifact, pero hindi ibig sabihin na compliant na ang application mo dahil shared pa rin. I-encrypt ang data at rest at in transit. Pro tip: sa bawat security question, itanong muna kung identity, detection, protection, o data ang paksa. Kalahati ng options ay mawawala agad.",
    analogy:
      "Renting an apartment. The landlord (AWS) maintains the building, the locks on the main door and the plumbing. You lock your own flat, decide who gets a key and look after your belongings. If you leave the door open, that is on you, not the landlord.",
    whyItExists:
      "Security is the largest part of the Cloud Practitioner exam and the first topic where associate-level questions go deeper, so a clear mental map pays off twice.",
    flow: "Identify the layer -> who controls it? -> pick identity, detection, protection or data -> choose the matching service",
    withoutIt: [
      "You would assume AWS secures everything, or that you must secure the hardware",
      "Look-alike security services would blur together",
    ],
    bestUseCases: [
      "Refreshing the CCP security domain before associate study",
      "Quick identification of the right security service from a one-line need",
    ],
    poorUseCases: [
      "Treating this as a replacement for the in-depth IAM, KMS and network lessons",
    ],
    alternatives: [],
    keyFeatures: [
      "Shared responsibility: security of the cloud vs security in the cloud",
      "IAM users, groups, roles, policies and least privilege",
      "Root user: MFA and rare use",
      "CloudTrail who, Config what, GuardDuty threats, Inspector vulnerabilities, Macie sensitive data",
      "Shield DDoS, WAF web filtering, KMS keys, Secrets Manager secrets",
      "Security Hub dashboard, Artifact reports, Trusted Advisor checks",
    ],
    availability: "Not applicable. This is a refresher lesson.",
    security: "Not applicable. This is a refresher lesson.",
    pricingLogic: "Not applicable. This is a refresher lesson.",
    examKeywords: [
      "shared responsibility",
      "least privilege",
      "who made the API call",
      "threat detection",
      "compliance reports",
      "DDoS",
    ],
    examTraps: [
      "Patching the guest OS on EC2 is the customer's job. Patching the database engine in RDS is AWS's job.",
      "Compliance of the AWS platform does not make your application compliant.",
      "GuardDuty detects threats. Inspector finds vulnerabilities. They are not the same.",
      "CloudTrail records API calls. CloudWatch collects metrics and logs.",
    ],
    architectureDiagram: `Identity:  IAM, Identity Center, Cognito          Detection: CloudTrail, Config, GuardDuty, Inspector, Macie
Protection: Shield, WAF, Security groups, NACLs     Data: KMS, CloudHSM, Secrets Manager, ACM
Visibility and reports: Security Hub, Artifact, Trusted Advisor`,
    architectureCaption: "Identity, detection, protection and data: four buckets for every security question.",
    mentorTip:
      "Before you read the options, name the bucket. Who can do it is identity. Did something bad happen is detection. Stop it is protection. Keep it secret is data.",
    questionIds: [
      "q-ccp-security-compliance-refresher-1",
      "q-ccp-security-compliance-refresher-2",
      "q-ccp-security-compliance-refresher-3",
    ],
  },
  {
    id: "ccp-billing-pricing-support-refresher",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "CCP Refresher: Billing, Pricing and Support in One Sitting",
    shortName: "CCP billing refresher",
    tier: 1,
    domains: [4],
    examImportance: "high",
    oneLiner:
      "A teacher-style recap of the Cloud Practitioner billing domain: how you are charged, how to save, which tool shows what and what you get from support.",
    englishExplanation:
      "Let's walk the money from start to finish. How you are charged: pay as you go for compute, storage and data leaving AWS, with discounts when you commit and lower unit prices at higher volume. How to save: for steady usage use Savings Plans or Reserved Instances, for interruptible work use Spot, right-size what you run, and stop what you do not need. Storage tiers and lifecycle rules save money on data that is rarely read, and Compute Optimizer recommends better-sized resources.\n\nNow the tool map, because the exam loves it. Estimate before you build: Pricing Calculator. Analyse and forecast past spend: Cost Explorer. Alert when you cross a threshold: Budgets. See the most detailed raw usage: the Cost and Usage Report. Find unexpected spikes automatically: Cost Anomaly Detection. Group by team or project: cost allocation tags, which you must activate and which are not retroactive, and Cost Categories for custom groupings. Compare on-premises cost with AWS: TCO analysis and Migration Evaluator. Best-practice checks that include cost: Trusted Advisor.\n\nAccounts and consolidation: AWS Organizations lets you manage many accounts and use consolidated billing to get one bill, share volume discounts and share Savings Plans or Reserved Instance benefits across accounts. Service control policies add guardrails. AWS Marketplace lets you buy third-party software that is billed through your AWS bill. The Free Tier offers always-free services, trials and, for newer accounts, a credit-based plan, so always read the current terms.\n\nSupport: Basic support is included with every account, with access to documentation, forums, the Health Dashboard and a limited set of Trusted Advisor checks. Paid plans add technical support, with faster response times for production and business-critical issues, and the top tier adds a Technical Account Manager and proactive guidance. AWS restructured its plans in late 2025, so check the current names and features on the AWS site. Remember the classic ladder as a way to think: more money buys faster responses, more people to talk to and more proactive help. Pro tip: if a question says a TAM, architectural guidance or concierge support, it points to the highest tier. If it says just billing questions and documentation, it is Basic.",
    taglishExplanation:
      "Sundan natin ang pera mula simula hanggang dulo. Paano ka sinisingil: pay as you go sa compute, storage, at data na lumalabas sa AWS; may discount kung magko-commit at mas mababang unit price sa mas malaking volume. Paano makatipid: Savings Plans o Reserved Instances para sa steady, Spot para sa interruptible, i-right-size ang tumatakbo, at itigil ang hindi kailangan. Ang storage tiers at lifecycle rules ay nakakatipid sa bihirang basahing data, at ang Compute Optimizer ay nagrerekomenda ng mas tamang laki.\n\nAng tool map: Pricing Calculator para mag-estimate bago magtayo; Cost Explorer para sa pagsusuri at forecast; Budgets para sa alert; Cost and Usage Report para sa pinakadetalyadong data; Cost Anomaly Detection para sa biglaang pagtaas; cost allocation tags para i-group ayon sa team (kailangang i-activate at hindi retroactive); TCO at Migration Evaluator para ikumpara ang on-premises; Trusted Advisor para sa best-practice checks.\n\nSa accounts: AWS Organizations at consolidated billing para sa isang bill at shared na volume discounts. Ang AWS Marketplace ay bumibili ng third-party software na isinasama sa AWS bill. Sa support: Basic ay kasama sa lahat ng account (docs, forums, Health Dashboard, limitadong Trusted Advisor checks). Ang mga bayad na plan ay nagdaragdag ng technical support at mas mabilis na response, at ang pinakamataas ay may Technical Account Manager. Nagbago ang mga plan noong huling bahagi ng 2025, kaya tingnan ang kasalukuyang pangalan sa AWS site. Pro tip: kapag TAM o architectural guidance ang nasa tanong, pinakamataas na tier; kapag billing questions at docs lang, Basic.",
    analogy:
      "A household budget. Estimate the shopping list (Pricing Calculator), check last month's receipts (Cost Explorer), set a spending alert (Budgets), buy in bulk for things you always use (Savings Plans), and pick a service plan for the car (support).",
    whyItExists:
      "Billing and support is a smaller domain, but its questions are the most predictable, and it connects directly to the cost-optimization domain of the associate exam.",
    flow: "Estimate -> build -> track -> alert -> optimise -> choose the support level your workload needs",
    withoutIt: [
      "You would mix up the cost tools",
      "You would miss cheap wins such as commitments and tagging",
    ],
    bestUseCases: [
      "Refreshing CCP billing before associate cost topics",
      "Matching a cost need to the right tool in one step",
    ],
    poorUseCases: [
      "Relying on this page for current support plan names and prices",
    ],
    alternatives: [],
    keyFeatures: [
      "Pay as you go, commit to save, volume discounts",
      "Pricing Calculator, Cost Explorer, Budgets, Cost and Usage Report, Cost Anomaly Detection",
      "Cost allocation tags (activate, not retroactive) and Cost Categories",
      "Organizations consolidated billing and shared discounts",
      "AWS Marketplace billing through AWS",
      "Free Tier types and the support plan ladder",
    ],
    availability: "Not applicable. This is a refresher lesson.",
    security: "Not applicable. This is a refresher lesson.",
    pricingLogic:
      "Costs follow usage. Commitments, Spot, right-sizing, storage tiers and tagging are the levers.",
    examKeywords: [
      "estimate cost",
      "forecast",
      "budget alert",
      "consolidated billing",
      "Technical Account Manager",
      "Marketplace",
    ],
    examTraps: [
      "Pricing Calculator is for estimates. Cost Explorer is for actual and past spend.",
      "Cost allocation tags must be activated, and they are not retroactive.",
      "Consolidated billing combines accounts into one bill and shares volume and commitment discounts.",
      "Support plan names and features have changed, so check the current AWS page.",
    ],
    architectureDiagram: `Estimate (Pricing Calculator) -> Track (Cost Explorer, CUR) -> Alert (Budgets, Anomaly Detection)
Save: Savings Plans, Reserved, Spot, right-size, storage tiers      Organize: tags, Cost Categories, Organizations
Support: Basic -> paid plans -> top tier with a TAM`,
    architectureCaption: "Estimate, track, alert, save, organise and support.",
    mentorTip:
      "Match the verb: estimate means Pricing Calculator, analyse means Cost Explorer, alert means Budgets, group means tags.",
    questionIds: [
      "q-ccp-billing-pricing-support-refresher-1",
      "q-ccp-billing-pricing-support-refresher-2",
      "q-ccp-billing-pricing-support-refresher-3",
    ],
  },
  {
    id: "ccp-to-saa-bridge-how-to-think",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "From CCP to SAA: How the Thinking Changes",
    shortName: "CCP to SAA bridge",
    tier: 1,
    domains: [1, 2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "Cloud Practitioner asks what a service is. Solutions Architect Associate asks which service you would choose, under which constraints, and why the others lose.",
    englishExplanation:
      "Here is the shift in one sentence. On the Cloud Practitioner exam you recognise a service from its description. On the Solutions Architect Associate exam you are given a business situation with two or three constraints and you choose the design that satisfies all of them, usually with the least operational effort. The facts you learned for CCP are still the foundation, but you now use them to compare.\n\nHere is a method that works, and it is the one this course uses. Step one: underline the constraints in the question. Look for the goal (secure, resilient, fast, cheap), the limiting phrases (least operational overhead, no code changes, near real time, lowest cost, highly available) and hard facts such as data size, protocol or a compliance rule. Step two: name the domain the question lives in, because that tells you what the exam writer is testing: secure, resilient, high-performing or cost-optimised. Step three: eliminate options that break a hard constraint, even if they sound impressive. Step four: among what is left, prefer the managed, simpler and more native option, unless a constraint says otherwise. Step five: re-check your answer against every constraint, because the wrong options usually satisfy only one or two.\n\nHere are the thinking upgrades. From what a service does to what trade-off it makes: for example Multi-AZ trades cost for availability, a cache trades freshness for speed, Spot trades reliability for price. From single answers to layered designs: security uses identity, network, data and detection together. From a single Region to failure domains: think instance, Availability Zone, Region. From features to limits: Lambda's 15 minutes, the SQS at-least-once delivery, S3's per-prefix rates and Glacier minimum durations are what decide close calls. And from memorising to deciding: build decision rules such as steady usage means commit, interruptible means Spot, unpredictable access means Intelligent-Tiering, decouple means a queue.\n\nPro tips from the teacher's desk. Read the last sentence of the question first, because it states what you must choose. Treat words such as most cost-effective and least operational overhead as tie-breakers, not decoration. When two options seem right, find the one detail in the question that only one of them satisfies. Use the practice questions here to build that habit: after each miss, write which constraint you ignored. If you recognise the service but cannot say why it beats the alternatives, go back to the lesson's comparison table and rehearse the deciding difference out loud, in English or Taglish.",
    taglishExplanation:
      "Ito ang pagbabago sa isang pangungusap. Sa Cloud Practitioner, kinikilala mo ang service mula sa description. Sa Solutions Architect Associate, binibigyan ka ng sitwasyon na may dalawa o tatlong constraints at pipiliin mo ang disenyong pasok sa lahat, kadalasan na may pinakamaliit na operational effort. Ang mga natutunan mo sa CCP ay pundasyon pa rin, pero ngayon ginagamit mo ito para mag-compare.\n\nAng method: Una, i-underline ang constraints (goal gaya ng secure, resilient, fast, cheap; limiting phrases gaya ng least operational overhead, no code changes, near real time; at hard facts gaya ng laki ng data o compliance rule). Pangalawa, pangalanan ang domain para alam mo kung ano ang sinusubok. Pangatlo, alisin ang mga option na lumalabag sa hard constraint kahit mukhang magaling. Pang-apat, sa natira, piliin ang managed at mas simple, maliban kung may constraint na iba. Panlima, i-check ulit ang sagot laban sa bawat constraint, dahil ang maling option ay kadalasang pasok lang sa isa o dalawa.\n\nMga upgrade sa pag-iisip: mula sa kung ano ang ginagawa ng service papunta sa kung anong trade-off nito (Multi-AZ: gastos kapalit ng availability; cache: freshness kapalit ng bilis; Spot: reliability kapalit ng presyo). Mula sa isang sagot papunta sa layered na disenyo. Mula sa isang Region papunta sa failure domains: instance, AZ, Region. Mula sa features papunta sa limits (Lambda 15 minuto, SQS at-least-once, S3 per-prefix, Glacier minimum duration). At mula sa pagkakabisado papunta sa pagpapasya gamit ang decision rules.\n\nPro tips: basahin muna ang huling pangungusap ng tanong. Ang 'most cost-effective' at 'least operational overhead' ay tie-breaker, hindi palamuti. Kapag dalawang option ang mukhang tama, hanapin ang detalye sa tanong na isa lang ang pasok. Pagkatapos ng bawat mali, isulat kung anong constraint ang nalampasan mo.",
    analogy:
      "Learning to drive versus learning the road signs. CCP is knowing what each sign means. SAA is choosing the route when there is traffic, a toll, a deadline and a passenger who gets car sick, and being able to explain why you did not take the other roads.",
    whyItExists:
      "Many learners know the services but miss questions because they answer 'what is this' instead of 'which fits all the constraints'. Naming the shift removes that mistake.",
    flow: "Underline constraints -> name the domain -> eliminate hard-constraint breakers -> prefer managed and simple -> re-check every constraint",
    withoutIt: [
      "You would pick the first service that matches one requirement",
      "Distractors that satisfy part of the scenario would look right",
    ],
    bestUseCases: [
      "Reading this right after the CCP refreshers and before the associate material",
      "Re-reading before a mock exam",
    ],
    poorUseCases: ["Skipping it because you already know the services"],
    alternatives: [],
    keyFeatures: [
      "Five-step method: underline, name the domain, eliminate, prefer managed and simple, re-check",
      "Think in trade-offs, layers, failure domains, limits and decision rules",
      "Read the last sentence first",
      "Tie-breaker phrases: least operational overhead, most cost-effective, no code changes",
    ],
    availability: "Not applicable. This is a study-method lesson.",
    security: "Not applicable. This is a study-method lesson.",
    pricingLogic: "Not applicable. This is a study-method lesson.",
    examKeywords: [
      "least operational overhead",
      "most cost-effective",
      "highly available",
      "without changing the application",
      "near real time",
    ],
    examTraps: [
      "An option that satisfies one requirement perfectly can still fail another.",
      "Impressive or newer services are not automatically correct.",
      "Ignoring a single hard constraint, such as data residency or a 15-minute limit, eliminates an otherwise good answer.",
    ],
    architectureDiagram: `CCP:  description  -->  service name
SAA:  situation + constraints  -->  eliminate  -->  managed and simple  -->  re-check  -->  answer`,
    architectureCaption: "From recognising services to choosing between them.",
    mentorTip:
      "After every missed question write one line: the constraint I ignored was ___. In a week you will see your own pattern.",
    questionIds: [
      "q-ccp-to-saa-bridge-how-to-think-1",
      "q-ccp-to-saa-bridge-how-to-think-2",
      "q-ccp-to-saa-bridge-how-to-think-3",
    ],
  },
];

export const ccpBridgeQuestions: Question[] = [
  mk(
    "ccp-security-compliance-refresher", 1, 1, "easy",
    "Under the shared responsibility model, which task is the customer's responsibility when running a database on Amazon EC2?",
    [
      "Physical security of the data centre",
      "Patching the database software and the guest operating system",
      "Maintaining the hypervisor",
      "Replacing failed network hardware",
    ],
    "b",
    "With EC2 the customer manages the guest operating system and the software on it. AWS manages the physical infrastructure and virtualisation layer.",
    [
      "Physical security is AWS's responsibility.",
      "The customer patches the OS and database on EC2.",
      "The hypervisor is managed by AWS.",
      "AWS maintains the network hardware.",
    ],
    "Who can touch this layer?", ["shared responsibility", "EC2"]
  ),
  mk(
    "ccp-security-compliance-refresher", 2, 1, "medium",
    "A company wants to find which S3 buckets contain personal information such as names and addresses. Which service should it use?",
    ["Amazon GuardDuty", "Amazon Macie", "AWS Shield", "AWS Artifact"],
    "b",
    "Macie discovers and classifies sensitive data in S3.",
    [
      "GuardDuty detects threats and suspicious activity.",
      "Macie finds sensitive data such as PII in S3.",
      "Shield protects against DDoS.",
      "Artifact provides compliance reports.",
    ],
    "Sensitive data in S3 -> Macie", ["Macie", "PII"]
  ),
  mk(
    "ccp-security-compliance-refresher", 3, 1, "medium",
    "An auditor asks for AWS's SOC reports and ISO certifications. Where can the company download them?",
    ["AWS Artifact", "AWS Config", "Amazon Inspector", "AWS Trusted Advisor"],
    "a",
    "AWS Artifact is the portal for on-demand access to AWS compliance reports and agreements.",
    [
      "Artifact provides compliance documents.",
      "Config tracks resource configuration.",
      "Inspector scans for vulnerabilities.",
      "Trusted Advisor gives best-practice checks.",
    ],
    "Compliance reports -> Artifact", ["Artifact"]
  ),
  mk(
    "ccp-billing-pricing-support-refresher", 1, 4, "easy",
    "A company wants to be alerted when its monthly spend is forecast to exceed a set amount. Which service does this?",
    ["AWS Budgets", "AWS CloudTrail", "AWS Config", "Amazon Inspector"],
    "a",
    "AWS Budgets lets you set cost and usage thresholds and sends alerts, including on forecasted spend.",
    [
      "Budgets handles cost alerts.",
      "CloudTrail records API activity.",
      "Config tracks configuration.",
      "Inspector scans for vulnerabilities.",
    ],
    "Alert on spend -> Budgets", ["Budgets"]
  ),
  mk(
    "ccp-billing-pricing-support-refresher", 2, 4, "medium",
    "A company with several AWS accounts wants one bill and to share volume discounts across all of them. What should it use?",
    [
      "AWS Organizations with consolidated billing",
      "Separate credit cards for each account",
      "AWS Config aggregators",
      "Amazon CloudWatch dashboards",
    ],
    "a",
    "Consolidated billing in AWS Organizations combines accounts into one bill and shares volume pricing and commitment discounts.",
    [
      "Organizations provides consolidated billing.",
      "Separate payment methods keep bills separate.",
      "Config aggregators collect configuration data.",
      "Dashboards display metrics, not bills.",
    ],
    "One bill, shared discounts -> Organizations", ["consolidated billing"]
  ),
  mk(
    "ccp-billing-pricing-support-refresher", 3, 4, "medium",
    "Which statement about cost allocation tags is correct?",
    [
      "They apply retroactively to all past usage when created",
      "They must be activated in the billing console and apply to usage after activation",
      "They are required before any resource can be launched",
      "They reduce the price of resources",
    ],
    "b",
    "Cost allocation tags need to be activated and only appear in reports for usage after activation.",
    [
      "They are not retroactive.",
      "Activation is required and applies going forward.",
      "Tags are optional unless enforced by policy.",
      "Tags attribute cost, they do not lower prices.",
    ],
    "Activate early, not retroactive", ["cost allocation tags"]
  ),
  mk(
    "ccp-to-saa-bridge-how-to-think", 1, 3, "medium",
    "A question describes a workload that needs high availability and the least operational overhead. Two options meet the availability need, but one requires managing servers. How should you choose?",
    [
      "Pick the one with more services",
      "Prefer the managed option, since least operational overhead is a stated constraint",
      "Pick the newest service name",
      "Pick the cheapest option regardless of other constraints",
    ],
    "b",
    "Stated tie-breakers such as least operational overhead point to the managed or serverless option when other constraints are met.",
    [
      "The number of services says nothing about fit.",
      "The managed option satisfies the stated operational constraint.",
      "Newness is not a criterion.",
      "Cost does not override the stated constraints.",
    ],
    "Tie-breaker phrase decides", ["least operational overhead"]
  ),
  mk(
    "ccp-to-saa-bridge-how-to-think", 2, 2, "medium",
    "What is the best first step when reading a long scenario question?",
    [
      "Pick the first option that mentions a familiar service",
      "Underline the goal, the limiting phrases and any hard facts, then eliminate options that break them",
      "Skip the question",
      "Choose the longest option",
    ],
    "b",
    "Identifying constraints first lets you eliminate options that fail a hard requirement.",
    [
      "A familiar name may satisfy only part of the scenario.",
      "Constraints then elimination is the reliable method.",
      "Skipping loses a mark you can often earn.",
      "Length is not a signal.",
    ],
    "Constraints first, then eliminate", ["constraints", "elimination"]
  ),
  mk(
    "ccp-to-saa-bridge-how-to-think", 3, 3, "hard",
    "A processing task takes 40 minutes. One otherwise attractive option uses AWS Lambda. Why should it be eliminated?",
    [
      "Lambda cannot access databases",
      "Lambda functions run for at most 15 minutes, which breaks a hard constraint",
      "Lambda is not serverless",
      "Lambda has no monitoring",
    ],
    "b",
    "A hard limit such as Lambda's 15-minute maximum eliminates an option no matter how good the rest of it sounds.",
    [
      "Lambda can connect to databases.",
      "The 15-minute limit rules it out for a 40-minute task.",
      "Lambda is serverless.",
      "Lambda integrates with CloudWatch.",
    ],
    "Hard limits eliminate options", ["Lambda", "limits"]
  ),
];

export const ccpBridgeFlashcards: Flashcard[] = [
  fc("ccp-security-compliance-refresher", 1, 1, "Orientation", "Who patches the guest OS on EC2?", "The customer. AWS manages the physical infrastructure and virtualisation layer."),
  fc("ccp-security-compliance-refresher", 2, 1, "Orientation", "Four buckets for security questions?", "Identity, detection, protection, data. Name the bucket before reading the options."),
  fc("ccp-security-compliance-refresher", 3, 1, "Orientation", "Macie vs GuardDuty vs Inspector?", "Macie finds sensitive data in S3. GuardDuty detects threats. Inspector finds software vulnerabilities."),
  fc("ccp-billing-pricing-support-refresher", 1, 4, "Orientation", "Which cost tool for estimate, analyse, alert?", "Pricing Calculator estimates, Cost Explorer analyses, Budgets alerts."),
  fc("ccp-billing-pricing-support-refresher", 2, 4, "Orientation", "What does consolidated billing give you?", "One bill for many accounts, plus shared volume discounts and commitment benefits."),
  fc("ccp-billing-pricing-support-refresher", 3, 4, "Orientation", "Which support signal means the top tier?", "A Technical Account Manager and proactive architectural guidance."),
  fc("ccp-to-saa-bridge-how-to-think", 1, 3, "Orientation", "CCP vs SAA in one line?", "CCP recognises what a service is. SAA chooses which service fits all the constraints and why others lose."),
  fc("ccp-to-saa-bridge-how-to-think", 2, 2, "Orientation", "The five-step method?", "Underline constraints, name the domain, eliminate hard-constraint breakers, prefer managed and simple, re-check every constraint."),
  fc("ccp-to-saa-bridge-how-to-think", 3, 3, "Orientation", "Read which part of the question first?", "The last sentence, because it states what you must choose."),
];
