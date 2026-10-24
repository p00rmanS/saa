import type { Lesson } from "@/lib/types";

// Concept lessons mapped to the official SAA-C03 task statements (Knowledge of / Skills in).

export const deepDivesG: Lesson[] = [
  {
    id: "shared-responsibility-account-security",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "The Shared Responsibility Model and Account Security Basics",
    shortName: "Shared responsibility",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "AWS secures the cloud itself, you secure what you put in it, and the split shifts depending on how managed the service is.",
    englishExplanation:
      "The shared responsibility model divides security duties. AWS is responsible for security of the cloud: the physical data centers, hardware, the global network, and the software that runs managed services. You are responsible for security in the cloud: your data, who can access it, how it is encrypted, your network configuration and anything you install. Where the line falls depends on the service type. With infrastructure services such as EC2 you manage the guest operating system, patches, firewall rules and applications. With managed services such as RDS, AWS patches the operating system and database engine, while you still manage data, access, security groups and parameters. With abstracted services such as S3, DynamoDB and Lambda, AWS manages the platform and you manage your data, IAM permissions and encryption choices.\n\nSome controls are shared, such as patch management (AWS patches the infrastructure, you patch your guest OS and applications) and configuration management. Others are inherited, meaning you rely entirely on AWS, such as physical security of the data center. The exam commonly asks who patches what, so remember that moving up the managed-service ladder shifts work to AWS.\n\nAccount-level best practices are the first things the exam expects. Protect the root user: enable multi-factor authentication, never create access keys for it, use a strong unique password, and use it only for the few tasks that require it, such as changing the account's support plan or closing the account. Do daily work with IAM identities, grant least privilege, prefer roles with temporary credentials over long-lived keys, require MFA for privileged users, and review access with IAM Access Analyzer and the credential report. AWS Artifact provides AWS's compliance reports.",
    taglishExplanation:
      "Hinahati ng shared responsibility model ang tungkulin sa seguridad. Ang AWS ang responsable sa security of the cloud: data center, hardware, global network, at software ng managed services. Ikaw ang responsable sa security in the cloud: data mo, access, encryption, network configuration, at anumang ini-install mo. Nag-iiba ang hati ayon sa uri ng service: sa EC2, ikaw ang nag-pa-patch ng guest OS; sa RDS, AWS ang nag-pa-patch ng OS at engine pero ikaw pa rin ang bahala sa data at access; sa S3, DynamoDB, at Lambda, AWS ang platform at ikaw ang data, IAM, at encryption. Para sa root user: MFA, walang access keys, at gamitin lang sa ilang gawain. Sa araw-araw, gumamit ng IAM identities na least privilege at roles.",
    analogy:
      "Renting an apartment. The landlord is responsible for the building, the locks on the main door and the plumbing in the walls. You are responsible for locking your own door, who you give keys to, and what you keep inside. A serviced apartment (a managed service) shifts more chores to the landlord, but you still decide who comes in and what you store.",
    whyItExists:
      "Customers need to know which security controls they must implement and which they inherit, so that nothing falls into a gap between provider and customer.",
    flow: "Choose service type -> AWS handles layers below the line -> you secure data, identity, network config and anything above the line",
    withoutIt: [
      "Teams would assume AWS patches their EC2 operating systems and leave them vulnerable",
      "Auditors could not tell which controls the customer must evidence",
      "Root credentials would be left unprotected and over-used",
    ],
    bestUseCases: [
      "Deciding who patches what when choosing between EC2, RDS and a serverless service",
      "Setting up a new account with root MFA and IAM-based daily access",
      "Using AWS Artifact for inherited-control evidence during audits",
    ],
    poorUseCases: [
      "Assuming a managed service makes you responsible for nothing",
      "Using the root user for routine administration",
      "Sharing IAM user credentials between people",
    ],
    alternatives: [
      { need: "Obtain AWS's own compliance reports", choose: "AWS Artifact" },
      { need: "Find unintended external access to resources", choose: "IAM Access Analyzer" },
      { need: "Enforce account guardrails across many accounts", choose: "AWS Organizations SCPs" },
      { need: "Check for security best-practice gaps", choose: "AWS Trusted Advisor" },
    ],
    keyFeatures: [
      "AWS: security of the cloud. Customer: security in the cloud",
      "Infrastructure, container (managed) and abstracted service models shift responsibility",
      "Shared controls: patch management, configuration management, training",
      "Inherited controls: physical and environmental",
      "Root user: MFA, no access keys, use only for tasks that require it",
      "IAM: least privilege, roles, MFA, credential report, Access Analyzer",
      "AWS Artifact for compliance reports and agreements",
    ],
    availability:
      "The model also covers resilience: AWS provides the infrastructure and multiple AZs, and you design your workload to use them.",
    security:
      "Your responsibilities include data classification, encryption choices, identity and access management, network controls and monitoring.",
    pricingLogic:
      "More managed services cost more per unit but remove patching and operations work, which is part of the total cost trade-off.",
    examKeywords: [
      "security of the cloud",
      "security in the cloud",
      "who is responsible for patching",
      "root user",
      "MFA",
      "least privilege",
      "inherited controls",
    ],
    examTraps: [
      "For EC2, the customer patches the guest OS. For RDS, AWS patches the OS and engine.",
      "The customer is always responsible for their data and IAM configuration, even on fully managed services.",
      "Creating access keys for the root user is a bad practice, not a safeguard.",
      "Encryption choices are the customer's responsibility even when AWS provides the feature.",
    ],
    architectureDiagram: `            CUSTOMER: data, IAM, encryption, network config, guest OS (EC2), apps
   ------------------------------------------------------------------------
   AWS: managed service software (RDS engine, S3 platform), virtualisation,
        hardware, global infrastructure (Regions, AZs, edge), physical security`,
    architectureCaption: "The more managed the service, the higher the line moves up.",
    mentorTip:
      "For any 'who is responsible' question, find the layer in question and ask whether you can even touch it. If you cannot log in to it, AWS owns it.",
    questionIds: [
      "q-shared-responsibility-account-security-1",
      "q-shared-responsibility-account-security-2",
      "q-shared-responsibility-account-security-3",
    ],
  },
  {
    id: "well-architected-framework-pillars",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "The Well-Architected Framework and its Six Pillars",
    shortName: "Well-Architected pillars",
    tier: 1,
    domains: [1, 2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "The Well-Architected Framework gives six pillars for judging an architecture, and the exam's four domains map onto them.",
    englishExplanation:
      "The exam guide says the certification validates the ability to design solutions based on the AWS Well-Architected Framework. The framework has six pillars. Operational Excellence is running and improving systems through automation, small reversible changes and learning from failure. Security protects data and systems with a strong identity foundation, traceability, defence in depth, encryption and preparation for incidents. Reliability is the ability to recover from failures and meet demand by testing recovery, scaling horizontally and automating change. Performance Efficiency is using resources efficiently, choosing the right types and sizes, going global in minutes and using serverless. Cost Optimization is delivering value at the lowest price by measuring consumption, avoiding undifferentiated heavy lifting and attributing spend. Sustainability is minimising environmental impact by maximising utilisation and using managed, efficient services.\n\nThe four exam domains line up with four of these pillars. Design Secure Architectures matches Security. Design Resilient Architectures matches Reliability. Design High-Performing Architectures matches Performance Efficiency. Design Cost-Optimized Architectures matches Cost Optimization. Operational Excellence and Sustainability appear throughout as supporting themes, for example automation, monitoring and right-sizing.\n\nThe AWS Well-Architected Tool is a free service in the console for reviewing a workload against the pillars. You answer questions, it identifies high-risk issues and produces an improvement plan, and you can save milestones to track progress. Lenses add guidance for specific areas such as serverless or SaaS. When a scenario asks which principle supports a decision, think of the design principles: stop guessing capacity, test at production scale, automate, use data-driven decisions and allow architectures to evolve.",
    taglishExplanation:
      "Sinasabi ng exam guide na sinusubok ng certification ang kakayahang magdisenyo base sa AWS Well-Architected Framework. May anim na pillar: Operational Excellence (pagpapatakbo at pagpapabuti ng systems gamit ang automation at maliliit na reversible na pagbabago), Security, Reliability (pag-recover sa failure at pagtugon sa demand), Performance Efficiency, Cost Optimization, at Sustainability. Ang apat na exam domain ay tumutugma sa apat na pillar: Secure ay Security, Resilient ay Reliability, High-Performing ay Performance Efficiency, Cost-Optimized ay Cost Optimization. Ang Well-Architected Tool ay libreng review tool sa console na nagbibigay ng improvement plan.",
    analogy:
      "A building inspection checklist with six sections: running the building day to day, locks and alarms, resilience to storms, efficiency of the layout, running costs and environmental impact. A good building scores well on all six, and the inspector's report tells you where to improve first.",
    whyItExists:
      "Architecture choices involve trade-offs. A shared vocabulary of pillars and principles helps teams compare options consistently and review existing designs.",
    flow: "Define workload -> review against six pillars (Well-Architected Tool) -> identify high-risk issues -> improvement plan -> milestones -> repeat",
    withoutIt: [
      "Architecture reviews would be ad hoc and inconsistent",
      "Teams would optimise one pillar, such as cost, and neglect others, such as reliability",
    ],
    bestUseCases: [
      "Reviewing an existing workload for improvements",
      "Mapping exam scenarios to the pillar being tested",
      "Using lenses for serverless or other specialised workloads",
    ],
    poorUseCases: [
      "Treating the framework as a certification or compliance audit",
      "Optimising a single pillar in isolation",
    ],
    alternatives: [
      { need: "Check best practice gaps in a running account", choose: "AWS Trusted Advisor" },
      { need: "Right-size compute", choose: "AWS Compute Optimizer" },
      { need: "Evidence for compliance audits", choose: "AWS Audit Manager" },
      { need: "Review a workload against the pillars", choose: "AWS Well-Architected Tool" },
    ],
    keyFeatures: [
      "Six pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability",
      "Exam domains map to Security, Reliability, Performance Efficiency and Cost Optimization",
      "Design principles per pillar, such as automate, stop guessing capacity and test recovery",
      "Well-Architected Tool: workload reviews, improvement plans, milestones",
      "Lenses for serverless, SaaS and other domains",
      "No charge for the Tool",
    ],
    availability:
      "The Reliability pillar covers foundations, workload architecture, change management and failure management.",
    security:
      "The Security pillar covers identity, detection, infrastructure protection, data protection and incident response.",
    pricingLogic:
      "The Well-Architected Tool is free. The pillar of Cost Optimization guides how to reduce spend on the workloads themselves.",
    examKeywords: [
      "Well-Architected Framework",
      "pillars",
      "operational excellence",
      "sustainability",
      "design principles",
      "improvement plan",
    ],
    examTraps: [
      "There are six pillars, including Sustainability. Older material lists five.",
      "The Well-Architected Tool reviews a workload against pillars. Trusted Advisor checks account-level best practices.",
      "Reliability is the pillar behind resilient and fault-tolerant design.",
    ],
    architectureDiagram: `Operational Excellence | Security | Reliability | Performance Efficiency | Cost Optimization | Sustainability
                       ^              ^                  ^                        ^
                 Exam Domain 1  Exam Domain 2     Exam Domain 3             Exam Domain 4`,
    architectureCaption: "Four exam domains line up with four pillars.",
    mentorTip:
      "When two answers both work, ask which pillar the question stresses: safe, recoverable, fast or cheap. Choose the one that favours that pillar.",
    questionIds: [
      "q-well-architected-framework-pillars-1",
      "q-well-architected-framework-pillars-2",
      "q-well-architected-framework-pillars-3",
    ],
  },
  {
    id: "scaling-statelessness-multi-tier",
    moduleId: "phase-12-resilience",
    category: "Resilience",
    title: "Horizontal vs Vertical Scaling, Stateless Design and Multi-Tier Architecture",
    shortName: "Scaling & tiers",
    tier: 1,
    domains: [2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "Scale out with more small servers behind a load balancer, keep state off the servers, and separate the tiers so each can scale and be secured on its own.",
    englishExplanation:
      "Vertical scaling makes one server bigger by moving to a larger instance type. It is simple, but it usually needs a restart, has an upper limit and leaves a single point of failure. Horizontal scaling adds more servers behind a load balancer. It has no practical ceiling, removes the single point of failure and works with Auto Scaling, but the application must be designed for it. The key requirement is statelessness: any server can handle any request because no user-specific data lives only on that server. Session data moves to a shared store such as ElastiCache or DynamoDB, or into a token the client carries. Uploaded files go to S3 or EFS, configuration goes to Parameter Store, and logs go to CloudWatch. Sticky sessions can pin a user to a server, but they undermine even load and resilience, so externalising the session is preferred.\n\nA multi-tier architecture separates responsibilities. A typical three-tier design has a presentation tier (an internet-facing load balancer and web servers in public or private subnets), an application tier (app servers in private subnets, reached through an internal load balancer) and a data tier (databases in isolated subnets with no route to the internet). Security groups chain the tiers: the database group accepts traffic only from the app group, and the app group only from the load balancer. Each tier has its own Auto Scaling group across multiple AZs, so tiers scale independently.\n\nStateful components such as databases scale differently: vertically, with read replicas for reads, with sharding or with managed engines such as Aurora and DynamoDB that scale storage and throughput for you. For cost, horizontal scaling lets capacity track demand, while hibernation or scheduled scaling can reduce non-production cost.",
    taglishExplanation:
      "Ang vertical scaling ay pinalaki ang isang server, simple pero kadalasang kailangan ng restart, may limit, at single point of failure. Ang horizontal scaling ay dinadagdagan ang dami ng server sa likod ng load balancer, walang practical na limit at gumagana sa Auto Scaling, pero kailangang stateless ang application: puwedeng asikasuhin ng kahit anong server ang kahit anong request. Ilipat ang session sa ElastiCache o DynamoDB, ang files sa S3 o EFS. Sa multi-tier: presentation tier na may load balancer, application tier sa private subnet, at data tier sa isolated subnet, na pinag-uugnay ng security group chaining. Bawat tier ay may sariling Auto Scaling group sa maraming AZ.",
    analogy:
      "A call centre. Vertical scaling is giving one agent a faster computer. Horizontal scaling is hiring more agents, which only works if each agent can pick up any customer's call from the shared case notes (statelessness) and not from a private notebook. Tiers are the reception desk, the specialists and the records room, each staffed and locked separately.",
    whyItExists:
      "Single big servers fail and cannot grow forever. Stateless, tiered designs let each layer scale, fail and be secured independently, which is the basis of resilient cloud architecture.",
    flow: "Client -> ALB -> stateless web/app instances in Auto Scaling groups -> shared session store, S3/EFS and database (read replicas or managed scale)",
    withoutIt: [
      "Scaling would be limited by the largest instance available",
      "Losing a server would lose user sessions",
      "A breach of the web tier could reach the database directly",
    ],
    bestUseCases: [
      "Horizontal scaling with Auto Scaling for web and app tiers",
      "Externalising session state to ElastiCache or DynamoDB",
      "Three-tier subnets with security group chaining",
      "Vertical scaling for a database that cannot scale out yet",
    ],
    poorUseCases: [
      "Sticky sessions as the only session strategy",
      "Storing uploaded files on instance disk in an Auto Scaling group",
      "Placing databases in public subnets",
      "Vertical scaling as the plan for unbounded growth",
    ],
    alternatives: [
      { need: "Avoid managing servers entirely", choose: "AWS Lambda or Fargate" },
      { need: "Database that scales storage and reads for you", choose: "Amazon Aurora or DynamoDB" },
      { need: "Shared files across instances", choose: "Amazon EFS" },
      { need: "Session store with low latency", choose: "Amazon ElastiCache or DynamoDB" },
    ],
    keyFeatures: [
      "Vertical: bigger instance, restart, limit, single point of failure",
      "Horizontal: more instances behind a load balancer, needs stateless design",
      "Stateless: sessions in ElastiCache or DynamoDB, files in S3 or EFS",
      "Three tiers: presentation, application, data",
      "Public, private and isolated subnets with security group chaining",
      "Internal load balancer between tiers",
      "Independent Auto Scaling per tier across AZs",
    ],
    availability:
      "Spread each tier across at least two AZs, health check through the load balancer and let Auto Scaling replace failed instances.",
    security:
      "Only the load balancer is internet-facing. App and data tiers are private, and each security group allows only the tier above it.",
    pricingLogic:
      "Horizontal scaling follows demand and avoids paying for peak capacity all day. Stateless instances can also use Spot capacity.",
    examKeywords: [
      "stateless",
      "scale out",
      "single point of failure",
      "session state",
      "three-tier",
      "decouple tiers",
      "sticky sessions",
    ],
    examTraps: [
      "Horizontal scaling is not possible without stateless design. If sessions are on the server, externalise them first.",
      "Vertical scaling usually needs downtime and has a ceiling, so it rarely satisfies a high availability requirement.",
      "Databases belong in isolated private subnets, not public ones.",
      "Sticky sessions are a workaround, not a design for resilience.",
    ],
    architectureDiagram: `Internet -> [ALB public] -> [Web ASG, 3 AZs]
                        -> [Internal ALB] -> [App ASG, 3 AZs] -> [Aurora writer + replicas] (isolated subnets)
          sessions -> ElastiCache / DynamoDB      uploads -> S3 / EFS
   SG chain: ALB -> web -> internal ALB -> app -> database`,
    architectureCaption: "Stateless tiers that scale and fail independently.",
    mentorTip:
      "Whenever a question says 'scale' or 'single point of failure', check whether state is trapped on a server. Moving state out is usually step one.",
    questionIds: [
      "q-scaling-statelessness-multi-tier-1",
      "q-scaling-statelessness-multi-tier-2",
      "q-scaling-statelessness-multi-tier-3",
    ],
  },
  {
    id: "microservices-event-driven-resilience-patterns",
    moduleId: "phase-12-resilience",
    category: "Resilience",
    title: "Microservices, Event-Driven Design, Distributed Patterns and Immutable Infrastructure",
    shortName: "Design patterns",
    tier: 1,
    domains: [2, 3],
    examImportance: "high",
    oneLiner:
      "Small independent services communicate through events and queues, tolerate failure with retries and timeouts, and are replaced rather than patched.",
    englishExplanation:
      "A monolith deploys and scales as one unit. Microservices split an application into small services, each owning one capability and ideally its own data store, which can be deployed and scaled independently. They talk through APIs or, better for resilience, through asynchronous messages. Loose coupling means a caller does not need the callee to be up at that moment: SQS queues buffer work, SNS fans out notifications, EventBridge routes events by rule, and Step Functions orchestrates multi-step workflows. In an event-driven design, producers emit events and consumers react, so new consumers can be added without changing producers. Choreography lets services react to each other's events, while orchestration uses a central coordinator such as Step Functions, which is easier to follow and monitor.\n\nDistributed systems fail in partial ways, so resilient designs use proven patterns. Retries with exponential backoff and jitter avoid overwhelming a recovering service. Timeouts stop a caller waiting forever. Idempotent operations make retries safe, because repeating them has the same effect as doing them once, which matters because queues deliver at least once. A dead-letter queue captures messages that keep failing. A circuit breaker stops calling a failing dependency for a while. Throttling and load shedding protect a service under overload. The saga pattern manages multi-step transactions with compensating actions. Using purpose-built services, such as DynamoDB for key-value or OpenSearch for search, lets each service use the right data store.\n\nImmutable infrastructure means you never patch or modify running servers. You build a new image (an AMI or container image) with the change, launch new instances from it and terminate the old ones, usually through blue/green or rolling deployment. This removes configuration drift, makes rollbacks a matter of redeploying the previous image and requires servers to be stateless, so replacement is safe.",
    taglishExplanation:
      "Ang monolith ay iisang yunit sa deployment at scaling. Hinahati ng microservices ang application sa maliliit na service na may sariling responsibilidad at data store, na puwedeng i-deploy at i-scale nang hiwalay. Mas resilient ang komunikasyon sa pamamagitan ng asynchronous na messages: SQS para sa buffer, SNS para sa fan-out, EventBridge para sa event routing, at Step Functions para sa orchestration. Para sa partial failure: retries na may exponential backoff at jitter, timeouts, idempotent na operations, dead-letter queue, circuit breaker, at throttling. Ang immutable infrastructure ay hindi nagpa-patch ng tumatakbong server; gumagawa ka ng bagong image, nagla-launch ng bagong instance, at tinatanggal ang luma.",
    analogy:
      "A restaurant kitchen with separate stations (microservices) that pass tickets on a rail (events and queues) instead of shouting across the room. If the dessert station is slow, tickets queue up without stopping the grill. When a pan is dirty or damaged you swap in a clean one rather than scrubbing in the middle of service (immutable infrastructure).",
    whyItExists:
      "Large tightly coupled systems are hard to change and fail together. Independent services, asynchronous communication and disciplined failure handling let teams move faster and limit the blast radius of problems.",
    flow: "Producer emits event -> EventBridge/SNS/SQS -> consumers react (Lambda, containers) -> failures retried with backoff -> DLQ ; deployment: new AMI/image -> replace instances -> terminate old",
    withoutIt: [
      "A failure in one component would cascade through direct synchronous calls",
      "Retries without idempotency could create duplicate orders or charges",
      "Hand-patched servers would drift and be hard to reproduce",
    ],
    bestUseCases: [
      "SQS between a web tier and a processing tier to absorb bursts",
      "SNS to SQS fan-out for several independent consumers",
      "Step Functions for workflows with retries and compensation",
      "Blue/green or rolling deployments from baked images",
      "Per-service data stores chosen for the access pattern",
    ],
    poorUseCases: [
      "Splitting a small application into microservices without the team to operate them",
      "Synchronous chains of many services with no timeouts or circuit breakers",
      "Retrying non-idempotent operations blindly",
      "SSH-ing into production servers to patch them",
    ],
    alternatives: [
      { need: "Run containers without servers", choose: "AWS Fargate" },
      { need: "Trace requests across services", choose: "AWS X-Ray" },
      { need: "Route events from AWS services and SaaS", choose: "Amazon EventBridge" },
      { need: "Coordinate multi-step workflows", choose: "AWS Step Functions" },
    ],
    keyFeatures: [
      "Independent deployable services with their own data stores",
      "Loose coupling through queues, topics and event buses",
      "Choreography vs orchestration",
      "Retries with exponential backoff and jitter, timeouts, idempotency",
      "Dead-letter queues, circuit breakers, throttling, saga pattern",
      "Purpose-built databases per service",
      "Immutable infrastructure with baked AMIs or container images and blue/green deployments",
    ],
    availability:
      "Decoupling limits blast radius: a slow or failed consumer builds a queue backlog instead of breaking the producer. Immutable deployments make rollbacks fast.",
    security:
      "Each service gets its own least-privilege role. Private endpoints and per-service security groups limit lateral movement.",
    pricingLogic:
      "Serverless and managed messaging lower operations cost, while many small services add monitoring and networking overhead. Right-size granularity to the team.",
    examKeywords: [
      "loosely coupled",
      "event-driven",
      "idempotent",
      "exponential backoff",
      "dead-letter queue",
      "immutable infrastructure",
      "blue/green",
      "microservices",
    ],
    examTraps: [
      "Retries are only safe with idempotent operations. Queues deliver at least once, so consumers must handle duplicates.",
      "Direct synchronous calls create tight coupling. A queue or event bus is the loosely coupled answer.",
      "Immutable means replace, not patch. SSH patching of running servers is the opposite.",
      "Step Functions orchestrates a workflow. EventBridge routes events. Do not swap them.",
    ],
    architectureDiagram: `[Order service] --event--> [EventBridge] --> [Payment service (Lambda)] --retry/backoff--> DLQ
                                  |--> [Inventory service (SQS + workers)]
                                  +--> [Notification service (SNS)]
Deploy: bake AMI v2 -> launch new ASG -> shift traffic (blue/green) -> terminate v1`,
    architectureCaption: "Independent services connected by events, deployed by replacement.",
    mentorTip:
      "If a question says 'decouple', reach for a queue or event bus. If it says 'retry safely', look for idempotency. If it says 'patch servers', the immutable answer is a new image.",
    questionIds: [
      "q-microservices-event-driven-resilience-patterns-1",
      "q-microservices-event-driven-resilience-patterns-2",
      "q-microservices-event-driven-resilience-patterns-3",
    ],
  },
  {
    id: "ec2-instance-families-hibernation",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "EC2 Instance Families, Sizing, Graviton and Hibernation",
    shortName: "Instance families",
    tier: 1,
    domains: [3, 4],
    examImportance: "high",
    oneLiner:
      "Pick the instance family by the resource your workload is bound by, pick the size by measured use, and use hibernation or Graviton to save money.",
    englishExplanation:
      "An EC2 instance type name such as m7g.large has a family letter, a generation number, optional attributes and a size. The family tells you what it is optimised for. General purpose instances (M and burstable T) balance CPU, memory and network and suit web servers and small databases. Compute optimised (C) have a high CPU to memory ratio for batch processing, media encoding and high-performance web serving. Memory optimised (R, X, and z1d) suit in-memory databases, caches and big analytics. Storage optimised (I, D, H) provide high local disk throughput for NoSQL and data warehouses. Accelerated computing (P, G, Inf, Trn, F) adds GPUs, AWS ML chips or FPGAs for machine learning and graphics.\n\nAttribute letters add detail: g means AWS Graviton (Arm) processors, which usually offer better price performance if your software supports Arm, a means AMD, i means Intel, d means local NVMe storage and n means enhanced networking. Burstable T instances earn CPU credits while idle and spend them in bursts, which is cheap for spiky, low-average workloads, but sustained high CPU exhausts the credits and either throttles or, in unlimited mode, incurs extra charges. Sizes run from nano up to metal. Choose by measuring actual CPU, memory and network use, and use AWS Compute Optimizer or Cost Explorer recommendations to right-size. Resizing an EBS-backed instance means stopping it, changing the type and starting it.\n\nHibernation saves the contents of RAM to the encrypted EBS root volume and stops the instance. On start, memory is restored and processes resume where they left off. While hibernated you pay for EBS storage and any Elastic IP but not for compute. It suits applications with long start-up times and non-production environments that are used only part of the day. It needs an encrypted root volume with room for the RAM, a supported instance family, and has a size limit on RAM and a maximum hibernation period of 60 days.",
    taglishExplanation:
      "Ang pangalan ng instance type tulad ng m7g.large ay may family letter, generation, attribute, at size. Ang family ang nagsasabi kung para saan ito: general purpose (M, T) para sa balanseng workload, compute optimized (C) para sa CPU-heavy, memory optimized (R, X) para sa in-memory database at cache, storage optimized (I, D) para sa mabilis na local disk, at accelerated (P, G) para sa GPU. Ang 'g' ay Graviton (Arm) na kadalasang mas magandang price-performance. Ang T ay burstable na may CPU credits. Piliin ang size batay sa sukat ng aktwal na gamit gamit ang Compute Optimizer. Ang hibernation ay isine-save ang RAM sa encrypted na EBS root volume, kaya mabilis bumalik ang proseso, at walang bayad sa compute habang naka-hibernate.",
    analogy:
      "Choosing vehicles for a delivery business. A small van (general purpose) handles most jobs, a lorry with a big engine (compute) hauls heavy loads fast, a refrigerated truck (memory) keeps a lot of goods ready, and a specialist rig (accelerated) does one unusual task very well. Hibernation is parking with the engine state saved so you can drive off instantly without restarting the whole route.",
    whyItExists:
      "Workloads are bound by different resources, so a single instance shape would waste money. Specialised families and flexible sizes let you pay for what the workload actually uses.",
    flow: "Profile workload (CPU, memory, I/O) -> choose family -> choose size from measured use -> consider Graviton and burstable -> monitor and right-size ; non-prod: hibernate when idle",
    withoutIt: [
      "Memory-heavy workloads would pay for unused CPU on general-purpose types",
      "Instances would be over-provisioned for fear of running out of capacity",
      "Dev environments would run all night at full price or take long to restart",
    ],
    bestUseCases: [
      "C family for compute-bound batch and encoding jobs",
      "R or X family for in-memory caches and databases",
      "I family for high-throughput NoSQL on local NVMe",
      "Graviton instances for cost-efficient Linux workloads that support Arm",
      "T family for low-average, spiky workloads",
      "Hibernation for non-production environments and slow-starting apps",
    ],
    poorUseCases: [
      "T instances for sustained high CPU",
      "Choosing the largest size 'to be safe' without measuring",
      "Hibernation for instances with instance store volumes or unsupported types",
      "Graviton for software that has no Arm build",
    ],
    alternatives: [
      { need: "Right-sizing recommendations from usage data", choose: "AWS Compute Optimizer" },
      { need: "Avoid choosing instances at all", choose: "AWS Lambda or Fargate" },
      { need: "Cheaper compute for interruptible work", choose: "Spot Instances" },
      { need: "Commitment discounts on steady usage", choose: "Savings Plans" },
    ],
    keyFeatures: [
      "Families: general purpose (M, T), compute (C), memory (R, X), storage (I, D), accelerated (P, G, Inf, Trn)",
      "Attributes: g Graviton, a AMD, i Intel, d local NVMe, n networking",
      "Burstable T instances use CPU credits, unlimited mode can add cost",
      "Sizes from nano to metal, resize by stop, change type, start",
      "Nitro System underpins current generation instances",
      "Hibernation stores RAM on an encrypted EBS root volume",
      "Hibernation limits: supported types, RAM size limit, up to 60 days",
    ],
    availability:
      "Instance family and size do not change AZ placement. Use Auto Scaling across AZs for resilience, and hibernation is a cost feature rather than a resilience one.",
    security:
      "Nitro offloads and isolates virtualisation. Hibernation requires an encrypted root volume, which also protects the saved RAM contents.",
    pricingLogic:
      "Right-sizing and Graviton lower cost per unit of work. Hibernated instances cost only EBS and Elastic IP charges. T unlimited mode can raise the bill under sustained load.",
    examKeywords: [
      "memory optimized",
      "compute optimized",
      "burstable",
      "Graviton",
      "right-size",
      "hibernate",
      "GPU",
      "long start-up time",
    ],
    examTraps: [
      "A workload that is memory bound needs a memory optimised family, not a bigger general-purpose one.",
      "Burstable T instances are not for sustained high CPU.",
      "Hibernation saves RAM to EBS and needs an encrypted root volume. Instance store data is not preserved.",
      "Stopping an instance loses RAM contents, while hibernating keeps them.",
    ],
    architectureDiagram: `m7g.large
 | |  | |
 | |  | +-- size (nano ... metal)
 | |  +---- attribute: g = Graviton
 | +------- generation 7
 +--------- family M = general purpose
Hibernate: RAM -> encrypted EBS root volume -> instance stopped (no compute charge) -> resume restores processes`,
    architectureCaption: "Read the type name, then match family to the bound resource.",
    mentorTip:
      "Ask what the workload is bound by: CPU, memory, disk or GPU. That picks the family. Measurement picks the size.",
    questionIds: [
      "q-ec2-instance-families-hibernation-1",
      "q-ec2-instance-families-hibernation-2",
      "q-ec2-instance-families-hibernation-3",
    ],
  },
  {
    id: "cost-allocation-tags-consolidated-billing",
    moduleId: "phase-13-cost",
    category: "AWS Cost Management",
    title: "Cost Allocation Tags, Consolidated Billing and Cost Visibility",
    shortName: "Tags & billing",
    tier: 1,
    domains: [4],
    examImportance: "high",
    oneLiner:
      "Tags tell you who is spending, consolidated billing pools accounts for bigger discounts, and the cost tools turn both into decisions.",
    englishExplanation:
      "The exam guide repeats the same knowledge item under four cost task statements: cost allocation tags and multi-account billing. A tag is a key-value label on a resource, such as Project=Checkout or Environment=Prod. A cost allocation tag is one you activate in the Billing and Cost Management console so that it appears as a dimension in Cost Explorer, Budgets and the Cost and Usage Report. There are user-defined tags and AWS-generated tags such as aws:createdBy. Tags are not retroactive: they apply from the time they are activated, and a resource must be tagged to be attributed. To keep tagging consistent, use tag policies in AWS Organizations, Service Control Policies or AWS Config rules to require tags, and the Resource Groups Tag Editor to find untagged resources.\n\nConsolidated billing is a feature of AWS Organizations. Member accounts roll up to the management account, which receives one bill and pays for all of them at no extra charge. Usage across all accounts is combined, so tiered pricing such as S3 storage and data transfer reaches cheaper tiers sooner. Reserved Instance and Savings Plans discounts can be shared across the accounts in the organisation, so unused commitment in one account benefits another, although sharing can be turned off per account. Each account's costs stay separately visible, which supports chargeback or showback to teams.\n\nThe tools complement each other. Cost Explorer visualises and forecasts spend and gives rightsizing and commitment recommendations. AWS Budgets alerts or even triggers actions when costs or usage cross thresholds. The Cost and Usage Report is the most detailed dataset, delivered to S3 for analysis in Athena or QuickSight. Cost Categories group costs by your own business rules, and Cost Anomaly Detection flags unusual spend automatically.",
    taglishExplanation:
      "Ang tag ay key-value na label sa resource, gaya ng Project=Checkout. Ang cost allocation tag ay tag na ina-activate mo sa Billing console para lumabas sa Cost Explorer, Budgets, at Cost and Usage Report. Hindi ito retroactive. Para maging pare-pareho ang tagging, gumamit ng tag policies sa Organizations, o Config rules. Ang consolidated billing ay feature ng Organizations: isang bill sa management account, pinagsasama ang usage kaya mas mabilis maabot ang mas murang tier, at puwedeng pagbahaginan ang Reserved Instance at Savings Plans discount ng mga account. Libre ito. Ang Cost Explorer ay para sa visualization at forecast, ang Budgets ay para sa alerts, at ang Cost and Usage Report ay ang pinakadetalyadong data.",
    analogy:
      "A family sharing one phone plan. Everyone's usage is added up, so the family reaches better data tiers and unused minutes are shared. Each person's line is still itemised on the bill, and labelling each call as 'work' or 'personal' (tags) shows where the money goes.",
    whyItExists:
      "In organisations with many teams and accounts, nobody can optimise cost without knowing who spends what, and separate accounts would otherwise lose volume discounts and shared commitments.",
    flow: "Tag resources -> activate cost allocation tags -> consolidated bill across accounts -> Cost Explorer / Budgets / CUR -> action (right-size, buy commitments, delete waste)",
    withoutIt: [
      "Costs would appear as one lump with no owner",
      "Each account would pay list price tiers and waste its own unused reservations",
      "Budget overruns would be discovered after the bill arrives",
    ],
    bestUseCases: [
      "Activating tags such as Project and Environment for chargeback",
      "Organizations consolidated billing for shared discounts and one invoice",
      "Budgets with alerts or actions for cost control",
      "CUR in S3 queried with Athena for detailed analysis",
      "Cost Anomaly Detection for unexpected spikes",
    ],
    poorUseCases: [
      "Assuming untagged historical costs will be attributed after tagging",
      "Relying on manual tagging without policy enforcement",
      "Using one shared account for all teams when attribution matters",
    ],
    alternatives: [
      { need: "Visualise and forecast costs", choose: "AWS Cost Explorer" },
      { need: "Alert on cost or usage thresholds", choose: "AWS Budgets" },
      { need: "Most detailed cost data for analysis", choose: "AWS Cost and Usage Report" },
      { need: "Find unused or oversized resources", choose: "Trusted Advisor and Compute Optimizer" },
    ],
    keyFeatures: [
      "Tags: user-defined and AWS-generated, activated as cost allocation tags",
      "Not retroactive, resources must be tagged",
      "Tag policies in Organizations, Config rules, Tag Editor",
      "Consolidated billing: one bill, combined volume tiers, shared RI and Savings Plans",
      "Cost Explorer: visualisation, forecasts, rightsizing and commitment recommendations",
      "Budgets: thresholds with alerts and actions",
      "CUR to S3, Cost Categories, Cost Anomaly Detection",
    ],
    availability:
      "Cost tools do not affect workload availability. Budget actions can apply controls, so test them before applying them to production.",
    security:
      "Limit who can view billing data and activate tags with IAM. SCPs and tag policies can enforce tagging standards.",
    pricingLogic:
      "Consolidated billing and tags are free. CUR storage in S3 and any Athena queries cost standard rates.",
    examKeywords: [
      "cost allocation tags",
      "consolidated billing",
      "chargeback",
      "multi-account billing",
      "share Reserved Instances",
      "volume discounts",
      "budget alert",
    ],
    examTraps: [
      "Tags must be activated as cost allocation tags before they appear in cost reports, and they are not retroactive.",
      "Consolidated billing is an Organizations feature and is free.",
      "Cost Explorer shows and forecasts costs. Budgets alerts on thresholds. CUR is the detailed data set.",
      "Reserved Instance sharing across accounts can be disabled per account.",
    ],
    architectureDiagram: `Member accounts A, B, C  --> [Organizations management account: ONE bill]
   combined usage -> volume tiers; shared RI / Savings Plans
Tags (Project, Env) activated --> Cost Explorer / Budgets / CUR (S3 -> Athena -> QuickSight)`,
    architectureCaption: "Tags answer who, consolidated billing answers how to pay less.",
    mentorTip:
      "Two questions cover most cost-visibility items: how do I attribute spend (tags) and how do accounts share discounts (consolidated billing)?",
    questionIds: [
      "q-cost-allocation-tags-consolidated-billing-1",
      "q-cost-allocation-tags-consolidated-billing-2",
      "q-cost-allocation-tags-consolidated-billing-3",
    ],
  },
];
