import type { Lesson } from "@/lib/types";

export const deepDivesN: Lesson[] = [
  {
    id: "support-plans-trusted-advisor-health",
    moduleId: "phase-13-cost",
    category: "Management and Governance",
    title: "AWS Support Plans, Trusted Advisor Checks and the Health Dashboard",
    shortName: "Support plans",
    tier: 2,
    domains: [4, 2],
    examImportance: "medium",
    oneLiner:
      "Which support plan you have decides how fast AWS responds and how many Trusted Advisor checks you see, and the Health Dashboard tells you when AWS itself is the problem.",
    englishExplanation:
      "AWS support plans changed in late 2025, and exam material and older documentation may use either set of names. Basic support is free for everyone and includes customer service for account and billing questions, documentation and forums, the AWS Health Dashboard and a limited set of Trusted Advisor checks. The classic paid plans were Developer (business-hours email support for testing), Business (24x7 phone, chat and email, a response target under one hour for a production system that is down, and the full set of Trusted Advisor checks), Enterprise On-Ramp (a pool of Technical Account Managers) and Enterprise (a designated Technical Account Manager and the fastest response targets). In December 2025 AWS announced a restructure into three paid plans: Business Support+, Enterprise Support and Unified Operations, with faster critical-issue response targets of roughly 30 minutes, 15 minutes and 5 minutes respectively, and AI-assisted guidance. AWS has said customers on the classic Developer, Business and Enterprise On-Ramp plans can keep their current level of support until January 1, 2027, so check the current AWS support page for the latest details. Support plans are billed monthly, usually as a percentage of AWS usage with a minimum.\n\nAWS Trusted Advisor inspects your account against best practices in categories such as cost optimisation, performance, security, fault tolerance, service limits and operational excellence. Basic and Developer support include the core checks, such as service quota checks and some security checks (for example exposed access keys, S3 bucket permissions, MFA on the root account and open security group ports). Business-level support and above (classic Business, Enterprise On-Ramp and Enterprise, and the newer Business Support+, Enterprise Support and Unified Operations) unlock all checks, including cost checks for idle or low-utilisation EC2 instances, underused EBS volumes and idle load balancers, plus programmatic access through the AWS Support API and integration with EventBridge for alerts.\n\nThe AWS Health Dashboard shows the status of AWS services and events that may affect you. The service health view shows general AWS service status, and the account health view (formerly the Personal Health Dashboard) shows events affecting your own resources, such as an underlying hardware retirement for an EC2 instance, with notifications through EventBridge so you can automate responses. Use Trusted Advisor to improve the account, the Health Dashboard to learn about AWS-side events that affect you, and Support for human help.",
    taglishExplanation:
      "May ilang support plan ang AWS, at nagbago ito noong huling bahagi ng 2025, kaya puwedeng makita mo ang luma o bagong pangalan. Libre ang Basic: customer service sa account at billing, docs, Health Dashboard, at limitadong Trusted Advisor checks. Ang mga lumang bayad na plan ay Developer (email sa oras ng negosyo), Business (24x7, wala pang isang oras para sa production system down, buong Trusted Advisor), Enterprise On-Ramp, at Enterprise (dedicated na TAM). Noong December 2025, inanunsyo ng AWS ang tatlong bagong plan: Business Support+, Enterprise Support, at Unified Operations, na may mas mabilis na response sa critical issues, at puwedeng manatili ang mga lumang plan hanggang January 1, 2027. Ang Trusted Advisor ay nag-i-inspect ng account sa cost, performance, security, fault tolerance, at service limits, at ang buong checks ay nasa Business pataas. Ang Health Dashboard ay nagpapakita ng status ng AWS at mga event na tumatama sa resources mo, may EventBridge notifications.",
    analogy:
      "A car warranty and service package. The basic package gives you the manual and a help desk for billing questions. Higher packages add a mechanic on call, faster response when your car breaks down on the highway and a dedicated account manager. Trusted Advisor is the dashboard inspection checklist (more items checked on the premium package), and the Health Dashboard is the traffic and roadworks bulletin that tells you when something outside your control affects your route.",
    whyItExists:
      "Production workloads need help from AWS at different speeds and depths, and teams need automated guidance and early warning about issues in the platform.",
    flow: "Choose plan by production criticality -> Trusted Advisor checks run (full set on Business and above) -> Health Dashboard events -> EventBridge -> automated response or ticket",
    withoutIt: [
      "Critical outages would wait in a slow queue",
      "Idle and insecure resources would go unnoticed",
      "AWS-side events, such as an instance retirement, would surprise you",
    ],
    bestUseCases: [
      "Business support or higher for production workloads",
      "Trusted Advisor cost checks to find idle resources",
      "Trusted Advisor security checks for open ports and public buckets",
      "Health Dashboard with EventBridge to automate responses to planned maintenance",
      "Enterprise support with a TAM for large or critical estates",
    ],
    poorUseCases: [
      "Relying on Basic support for a production system with a strict response target",
      "Expecting full Trusted Advisor checks on Basic or Developer",
      "Using Trusted Advisor as a substitute for GuardDuty threat detection",
      "Ignoring Health Dashboard events that require action before a deadline",
    ],
    alternatives: [
      { need: "Right-size recommendations from utilisation data", choose: "AWS Compute Optimizer" },
      { need: "Threat detection", choose: "Amazon GuardDuty" },
      { need: "Resource configuration compliance", choose: "AWS Config" },
      { need: "Cost anomalies", choose: "AWS Cost Anomaly Detection" },
    ],
    keyFeatures: [
      "Classic plans: Basic, Developer, Business, Enterprise On-Ramp, Enterprise. Since December 2025: Basic plus Business Support+, Enterprise Support and Unified Operations",
      "Business level and above: 24x7 support, faster critical response, full Trusted Advisor checks",
      "Enterprise level: designated Technical Account Manager and the fastest response targets",
      "Trusted Advisor categories: cost, performance, security, fault tolerance, service limits, operational excellence",
      "Core checks on Basic (and classic Developer), all checks on Business level and above",
      "Health Dashboard: service health and account health with EventBridge notifications",
      "Support API for programmatic access on higher plans",
    ],
    availability:
      "Support plans do not change service availability but affect how quickly you get help during an incident. Health events can warn you before maintenance affects resources.",
    security:
      "Use Trusted Advisor security checks as a baseline and combine them with GuardDuty, Security Hub and Config for deeper coverage.",
    pricingLogic:
      "Basic is free. Higher plans are billed monthly with a minimum or a percentage of usage. Weigh the cost of downtime against the plan cost for production accounts.",
    examKeywords: [
      "full set of Trusted Advisor checks",
      "24x7 phone support",
      "Technical Account Manager",
      "production system down",
      "Health Dashboard",
      "service limits check",
      "support plan",
    ],
    examTraps: [
      "Full Trusted Advisor checks need Business-level support or higher. Basic (and classic Developer) get the core set.",
      "A designated Technical Account Manager belongs to the Enterprise level of support, not Business.",
      "The Health Dashboard reports AWS events. Trusted Advisor reports on your account's configuration.",
      "Classic Developer support was business-hours email, not 24x7. AWS is phasing out the classic plans, so expect either naming in study material.",
    ],
    architectureDiagram: `Classic : Basic (free) -> Developer -> Business (24x7, full Trusted Advisor) -> Enterprise On-Ramp -> Enterprise (TAM)
Since Dec 2025: Basic -> Business Support+ -> Enterprise Support -> Unified Operations (classic plans end Jan 1, 2027)
Trusted Advisor: cost | performance | security | fault tolerance | service limits
Health Dashboard --> EventBridge --> Lambda / SNS`,
    architectureCaption: "Plan level sets response speed and Trusted Advisor depth.",
    mentorTip:
      "Two anchors: full Trusted Advisor checks start at the Business level, and a dedicated TAM is an Enterprise-level benefit. Learn both the classic and the new plan names.",
    questionIds: [
      "q-support-plans-trusted-advisor-health-1",
      "q-support-plans-trusted-advisor-health-2",
      "q-support-plans-trusted-advisor-health-3",
    ],
  },
  {
    id: "eventbridge-pipes-scheduler-event-bus",
    moduleId: "phase-6-integration",
    category: "Application Integration",
    title: "EventBridge in Depth: Event Buses, Pipes, Scheduler and API Destinations",
    shortName: "EventBridge in depth",
    tier: 2,
    domains: [2, 3],
    examImportance: "medium",
    oneLiner:
      "EventBridge routes events by rule, Pipes connect a single source to a single target with filtering and enrichment, and Scheduler runs one-time and recurring tasks at scale.",
    englishExplanation:
      "An EventBridge event bus receives events from AWS services, your own applications and SaaS partners. Rules match events by pattern, including content-based filtering on fields in the event, and send them to up to several targets such as Lambda, Step Functions, SQS, SNS, Kinesis and API destinations. The default bus receives events from AWS services, custom buses carry your application events, and partner buses receive events from SaaS providers. You can send events across accounts and Regions, archive events and replay them later, and use a schema registry to discover event structure. Input transformers reshape an event before delivery, and API destinations let a rule call an HTTPS endpoint outside AWS with managed authentication and rate limiting.\n\nEventBridge Pipes are point-to-point integrations. A pipe reads from a source such as SQS, Kinesis, DynamoDB Streams, MSK or Amazon MQ, optionally filters events, optionally enriches them by calling a Lambda function, Step Functions state machine, API Gateway or API destination, and delivers them to a target. This replaces glue code that polls a source, filters, calls another service and writes to a target. Use Pipes when you have one source and one target, and an event bus when you need to route events to several consumers by rule.\n\nEventBridge Scheduler creates schedules that invoke a wide range of AWS services directly through universal targets, as one-time schedules, rate-based schedules or cron expressions, with time zones, flexible time windows to spread load and retry policies, and it scales to millions of schedules. It is the modern way to run scheduled work such as sending a reminder at a specific time for each user, and it supersedes using scheduled rules for per-item timers. In a decision, choose SQS for buffering work, SNS for fan-out, EventBridge buses for rule-based routing and SaaS events, Pipes for a filtered, enriched point-to-point flow and Scheduler for time-based triggers.",
    taglishExplanation:
      "Ang EventBridge event bus ay tumatanggap ng events mula sa AWS services, sarili mong apps, at SaaS partners. Ang rules ay tumutugma sa event pattern at nagpapadala sa mga target tulad ng Lambda, Step Functions, SQS, SNS, Kinesis, at API destinations. Puwedeng cross-account at cross-Region, may archive at replay, at schema registry. Ang Pipes ay point-to-point: source (SQS, Kinesis, DynamoDB Streams, MSK, MQ) papunta sa filter, enrichment (Lambda, Step Functions, API), at target, kaya hindi na kailangan ng glue code. Ang Scheduler ay para sa one-time, rate, at cron na schedules na direktang nag-iinvoke ng malawak na hanay ng AWS services, may time zone at flexible window, at kayang milyon-milyong schedule.",
    analogy:
      "A mail sorting centre. The event bus reads every parcel's label and forwards it to whichever departments asked for that kind of parcel. A pipe is a dedicated conveyor between one sender and one receiver, with a checkpoint that rejects unwanted items and a station that adds extra paperwork. Scheduler is the diary of timed deliveries: 'deliver this at 09:00 Manila time on the 5th', for millions of customers.",
    whyItExists:
      "Modern applications react to events from many systems and run timed work for many users. Managed routing, integration and scheduling replace custom polling and cron infrastructure.",
    flow: "Event -> bus -> rule (pattern) -> targets (+ archive) ; source -> pipe (filter, enrich) -> target ; schedule -> Scheduler -> target API call at the set time",
    withoutIt: [
      "You would write and run polling code to connect sources to targets",
      "Per-user timers would need a custom scheduling service",
      "Cross-account event distribution would require custom plumbing",
    ],
    bestUseCases: [
      "A bus rule that reacts to EC2 state changes or SaaS events",
      "Archive and replay to reprocess events after fixing a bug",
      "A pipe from a DynamoDB stream with filtering and Lambda enrichment into Step Functions",
      "Scheduler for a one-time reminder per user and for recurring jobs at scale",
      "API destinations to call external HTTPS APIs with managed throttling",
    ],
    poorUseCases: [
      "A bus when you only need a simple point-to-point flow (use Pipes)",
      "EventBridge as a buffer for slow consumers (add SQS)",
      "Custom cron servers for schedules that Scheduler can run",
      "Assuming ordering and exactly-once delivery",
    ],
    alternatives: [
      { need: "Buffer and decouple work", choose: "Amazon SQS" },
      { need: "Push to many subscribers", choose: "Amazon SNS" },
      { need: "Multi-step workflow", choose: "AWS Step Functions" },
      { need: "Ordered, replayable high-volume stream", choose: "Amazon Kinesis Data Streams" },
    ],
    keyFeatures: [
      "Event buses: default, custom and partner, rules with content-based patterns",
      "Targets include Lambda, Step Functions, SQS, SNS, Kinesis and API destinations",
      "Cross-account and cross-Region delivery, archive and replay, schema registry",
      "Pipes: source, filter, enrichment, target for point-to-point integration",
      "Scheduler: one-time, rate and cron schedules, time zones, flexible windows, millions of schedules",
      "Input transformers and retry policies with dead-letter queues",
      "Event delivery is at least once",
    ],
    availability:
      "EventBridge is a managed multi-AZ service. Configure retry policies and dead-letter queues on targets to avoid losing events when a target is unavailable.",
    security:
      "Use resource policies on buses for cross-account access, least-privilege execution roles for targets and encryption with KMS where supported.",
    pricingLogic:
      "Custom events, pipe requests and schedule invocations are charged per million. AWS service events on the default bus are free of charge.",
    examKeywords: [
      "event bus",
      "content-based routing",
      "replay",
      "SaaS events",
      "pipe",
      "schedule at scale",
      "API destination",
      "enrichment",
    ],
    examTraps: [
      "Pipes are point-to-point. Buses fan events out to many targets by rule.",
      "EventBridge delivery is at least once and not strictly ordered.",
      "Scheduler is for time-based triggers. Rules on a bus are for event patterns.",
      "EventBridge does not buffer for slow consumers the way SQS does.",
    ],
    architectureDiagram: `AWS / SaaS / app events --> [Event bus] --rule--> Lambda | Step Functions | SQS | API destination
                                    \\--> [Archive] --replay-->
DynamoDB stream --> [Pipe: filter -> enrich (Lambda) -> target] --> Step Functions
[Scheduler: 2026-11-05 09:00 Asia/Manila] --> invoke Lambda / SQS / ECS task`,
    architectureCaption: "Route by rule, connect point to point, and schedule by time.",
    mentorTip:
      "Pick by shape: many consumers by rule is a bus, one source to one target with enrichment is a pipe, and a time trigger is Scheduler.",
    questionIds: [
      "q-eventbridge-pipes-scheduler-event-bus-1",
      "q-eventbridge-pipes-scheduler-event-bus-2",
      "q-eventbridge-pipes-scheduler-event-bus-3",
    ],
  },
  {
    id: "cloudwatch-observability-synthetics-rum-insights",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "CloudWatch Observability: Logs Insights, Synthetics, RUM, Container Insights and Anomaly Detection",
    shortName: "CloudWatch observability",
    tier: 2,
    domains: [2, 3],
    examImportance: "medium",
    oneLiner:
      "Beyond metrics and alarms, CloudWatch can query logs, test endpoints like a user, measure real user experience and monitor containers.",
    englishExplanation:
      "CloudWatch Logs Insights lets you query log groups with a purpose-built language to filter, aggregate and visualise log data, for example counting errors per minute or finding the slowest requests, without exporting logs. Metric filters turn log patterns into metrics, and Contributor Insights finds the top contributors to a metric, such as the clients generating the most errors. Metric math creates new metrics from existing ones, and anomaly detection builds a model of a metric's normal pattern so an alarm triggers on deviations instead of a fixed threshold, which suits metrics with daily and weekly cycles.\n\nTwo features measure the user's view. CloudWatch Synthetics runs canaries, scripted tests written for Node.js or Python on a schedule, that check endpoints, APIs and user flows from outside, so you find out about an outage or broken login before customers do, and they can alarm and keep screenshots. CloudWatch RUM (Real User Monitoring) collects performance and error data from real users' browsers through a small script, showing page load times, JavaScript errors and the effect of changes by geography, device and browser. Synthetics is proactive and scripted, while RUM is passive and reflects real traffic.\n\nOther features support specific platforms. Container Insights collects metrics and logs from Amazon ECS, EKS and Kubernetes on EC2 at the cluster, node, pod and task level, and Lambda Insights provides function-level metrics such as memory and cold starts. Application Signals and X-Ray add application performance monitoring and distributed tracing, and cross-account observability lets a central monitoring account view metrics, logs and traces from many accounts. Dashboards can combine all of these and can be shared across accounts and Regions. Choose the tool by the question: what happened in the logs (Logs Insights), is the site up from the outside (Synthetics), how do real users experience it (RUM), how are my containers doing (Container Insights) and where is the latency across services (X-Ray).",
    taglishExplanation:
      "Ang Logs Insights ay nagku-query ng log groups para mag-filter, mag-aggregate, at mag-visualise nang hindi nag-e-export. Ang metric filter ay ginagawang metric ang log pattern, ang Contributor Insights ay nakakahanap ng top contributors, at ang anomaly detection ay gumagawa ng modelo ng normal na pattern para ang alarm ay sa paglihis, hindi sa fixed threshold. Ang Synthetics ay canaries (scripted na test sa Node.js o Python) na regular na nagche-check ng endpoint at user flow mula sa labas. Ang RUM ay kumukuha ng aktwal na performance at error data mula sa browser ng totoong user. Ang Container Insights ay para sa ECS at EKS, at ang X-Ray ay para sa distributed tracing.",
    analogy:
      "Monitoring a restaurant. Logs Insights is reading the order tickets to count mistakes. Synthetics is a mystery diner who places the same order every ten minutes and reports if anything fails. RUM is the feedback cards real customers fill in about their actual meal. Container Insights is the kitchen's equipment dashboard, anomaly detection is a manager who knows a normal busy Friday and raises the alarm only when something is unusual, and X-Ray follows one order from the door to the table.",
    whyItExists:
      "Healthy infrastructure metrics do not guarantee a good user experience. Teams need to query logs, test from the outside and see real user data to find problems quickly.",
    flow: "Logs -> Logs Insights queries / metric filters -> alarms ; canaries -> test endpoints on a schedule -> alarm ; RUM script -> real-user metrics ; Container Insights -> ECS/EKS metrics and logs",
    withoutIt: [
      "Outages would be detected by customers, not by you",
      "Log analysis would require exporting data to other tools",
      "Fixed thresholds would flood you with false alarms on cyclical metrics",
    ],
    bestUseCases: [
      "Logs Insights to investigate a spike in errors",
      "Synthetics canaries to test a login flow every five minutes",
      "RUM to see page load times by country and browser",
      "Container Insights for ECS and EKS cluster health",
      "Anomaly detection alarms for metrics with daily patterns",
    ],
    poorUseCases: [
      "Using RUM to detect an outage when no users are active (use Synthetics)",
      "Using Synthetics as a measure of real user experience",
      "Exporting logs to S3 just to query them occasionally when Logs Insights would do",
      "Fixed thresholds on strongly cyclical metrics",
    ],
    alternatives: [
      { need: "Trace requests across services", choose: "AWS X-Ray" },
      { need: "API call history", choose: "AWS CloudTrail" },
      { need: "Dashboards from many data sources", choose: "Amazon Managed Grafana" },
      { need: "Prometheus-compatible metrics", choose: "Amazon Managed Service for Prometheus" },
    ],
    keyFeatures: [
      "Logs Insights queries, metric filters, Contributor Insights",
      "Metric math and anomaly detection alarms",
      "Synthetics canaries scripted in Node.js or Python, run on a schedule",
      "RUM for real-user web performance and errors",
      "Container Insights for ECS, EKS and Kubernetes, Lambda Insights for functions",
      "Cross-account observability and shared dashboards",
      "Integration with X-Ray and Application Signals for tracing and APM",
    ],
    availability:
      "Canaries can run from multiple Regions to detect regional problems. Alarm on canary failures and route notifications to on-call tools.",
    security:
      "Restrict access to logs and dashboards with IAM, encrypt log groups with KMS and avoid placing secrets in logs or canary scripts.",
    pricingLogic:
      "Charges apply per canary run, per RUM event, per log byte ingested and per query data scanned. Tune sampling and retention to control cost.",
    examKeywords: [
      "synthetic monitoring",
      "canary",
      "real user monitoring",
      "Logs Insights",
      "anomaly detection",
      "Container Insights",
      "top contributors",
      "detect outage before customers",
    ],
    examTraps: [
      "Synthetics is scripted and proactive. RUM measures real users and is passive.",
      "Logs Insights queries logs in place. Exporting to S3 is a batch task.",
      "Anomaly detection alarms learn normal patterns, unlike static thresholds.",
      "Container Insights covers ECS, EKS and Kubernetes. Lambda has Lambda Insights.",
    ],
    architectureDiagram: `Canary (every 5 min) --> https://shop.example.com/login --> pass/fail --> alarm
Browser (RUM script) --> real page-load and JS error metrics by country/browser
ECS / EKS --> Container Insights --> cluster, node, pod metrics + logs
Log group --> Logs Insights: stats count(*) by bin(1m) | filter @message like /ERROR/`,
    architectureCaption: "Test from outside, measure real users and query what happened.",
    mentorTip:
      "Match the question: 'detect before users notice' is Synthetics, 'what do real users experience' is RUM, 'what happened in the logs' is Logs Insights.",
    questionIds: [
      "q-cloudwatch-observability-synthetics-rum-insights-1",
      "q-cloudwatch-observability-synthetics-rum-insights-2",
      "q-cloudwatch-observability-synthetics-rum-insights-3",
    ],
  },
  {
    id: "rds-custom-blue-green-aurora-io-optimized",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "RDS and Aurora Options: Blue/Green Deployments, RDS Custom, Aurora I/O-Optimized and Serverless v2",
    shortName: "RDS/Aurora options",
    tier: 2,
    domains: [2, 4, 3],
    examImportance: "medium",
    oneLiner:
      "Blue/green deployments make database changes safe, RDS Custom opens the operating system, and Aurora I/O-Optimized trades a higher base price for no per-I/O charges.",
    englishExplanation:
      "Changing a production database engine version, parameters or schema is risky. RDS Blue/Green Deployments create a staging environment, the green environment, that is a fully synchronised copy of production, the blue environment, kept current by replication. You make and test changes on green, such as a major version upgrade or parameter change, and then perform a switchover that promotes green to production, typically in under a minute, with the endpoints preserved so applications do not change their connection strings. If something goes wrong you can fall back to the old environment. This is available for RDS for MySQL, MariaDB and PostgreSQL and for Aurora.\n\nAmazon RDS Custom is a managed database service for applications that need customisation that standard RDS does not allow, such as installing custom software or changing database and operating system settings, for Oracle and SQL Server. You get access to the underlying EC2 instance and database while AWS still automates backups and monitoring. It sits between RDS and self-managed databases on EC2, so choose it when a legacy or packaged application requires OS-level access, and choose standard RDS otherwise because it has less operational burden.\n\nAurora offers two storage and pricing configurations. Aurora Standard charges for compute, storage and I/O requests, which is economical for workloads with modest I/O. Aurora I/O-Optimized has no charge for read and write I/O, with a higher price for compute and storage, and AWS suggests it when I/O charges are above about a quarter of your total Aurora spend, as is common for I/O-intensive workloads, with predictable pricing. Aurora Serverless v2 scales compute capacity up and down in fine-grained increments for variable or unpredictable workloads, so you pay only for capacity used, and it can scale to zero capacity when paused in supported configurations. Choose provisioned instances with reserved pricing for steady workloads and Serverless v2 for spiky ones.",
    taglishExplanation:
      "Ang pagbabago sa production database ay delikado. Ang RDS Blue/Green Deployments ay gumagawa ng green na staging environment na kopya ng production (blue) na naka-sync sa replication. Dito mo ita-test ang pagbabago (major version upgrade, parameter), tapos magso-switchover, kadalasan wala pang isang minuto, at nananatili ang endpoints. Available ito sa RDS para sa MySQL, MariaDB, PostgreSQL, at sa Aurora. Ang RDS Custom ay para sa Oracle at SQL Server na nangangailangan ng access sa OS at database customization, na automated pa rin ang backup at monitoring. Ang Aurora I/O-Optimized ay walang bayad sa I/O pero mas mataas ang presyo ng compute at storage, bagay kapag ang I/O ay lampas sa mga 25 porsyento ng gastos. Ang Serverless v2 ay para sa pabago-bagong load.",
    analogy:
      "Renovating a busy restaurant. Blue/green builds an identical twin kitchen next door, lets you test the new layout there and then swaps the signs in a minute. RDS Custom is renting a professional kitchen where you may still change the wiring when your recipes demand it. Aurora Standard is paying per order handled, while I/O-Optimized is a flat higher rent with unlimited orders, which pays off for a very busy restaurant.",
    whyItExists:
      "Teams need low-risk database change management, a middle path for packaged applications that need OS access, and pricing that fits both light and heavy I/O workloads.",
    flow: "Blue (production) --replication--> Green (staging) -> upgrade and test on green -> switchover (under a minute, same endpoints) -> keep or delete blue",
    withoutIt: [
      "Major version upgrades would require downtime windows and risky in-place changes",
      "Packaged applications needing OS access could not use a managed database",
      "I/O-heavy Aurora workloads would face unpredictable I/O charges",
    ],
    bestUseCases: [
      "Blue/green deployments for major engine upgrades and parameter changes",
      "RDS Custom for Oracle or SQL Server applications that require OS-level customisation",
      "Aurora I/O-Optimized when I/O is a large share of cost",
      "Aurora Standard for moderate I/O workloads",
      "Aurora Serverless v2 for variable or unpredictable load",
    ],
    poorUseCases: [
      "In-place major version upgrades of production without a staging copy",
      "RDS Custom when standard RDS meets the needs",
      "I/O-Optimized for a lightly used database with little I/O",
      "Serverless v2 for a flat, steady workload where reserved provisioned instances are cheaper",
    ],
    alternatives: [
      { need: "Full control of the database host", choose: "Self-managed database on EC2" },
      { need: "Rewind an Aurora MySQL cluster", choose: "Aurora Backtrack" },
      { need: "Create a test copy cheaply", choose: "Aurora cloning" },
      { need: "Cross-Region disaster recovery", choose: "Aurora Global Database" },
    ],
    keyFeatures: [
      "Blue/Green: synchronised green staging copy, switchover typically under a minute, endpoints preserved",
      "Supported for RDS MySQL, MariaDB, PostgreSQL and Aurora",
      "RDS Custom for Oracle and SQL Server with OS and database access",
      "Aurora Standard: pay for compute, storage and I/O",
      "Aurora I/O-Optimized: no I/O charges, higher compute and storage price, suited when I/O exceeds about 25 percent of spend",
      "Aurora Serverless v2: fine-grained automatic scaling of capacity",
      "Reserved pricing for steady provisioned instances",
    ],
    availability:
      "Blue/green reduces change-related downtime to a brief switchover. Keep Multi-AZ for production in all configurations.",
    security:
      "RDS Custom shifts more OS-level security responsibility to you. Encryption, IAM authentication and network controls are the same as standard RDS.",
    pricingLogic:
      "Compare the Aurora I/O share of your bill before choosing the configuration. Blue/green temporarily doubles database cost while both environments exist.",
    examKeywords: [
      "switchover",
      "staging copy",
      "major version upgrade",
      "OS-level access",
      "RDS Custom",
      "I/O-Optimized",
      "predictable pricing",
      "Serverless v2",
    ],
    examTraps: [
      "Blue/green keeps the same endpoints after switchover, so applications need no changes.",
      "RDS Custom is for Oracle and SQL Server, not for every engine.",
      "I/O-Optimized pays off when I/O is a large share of cost, not for light workloads.",
      "Blue/green temporarily doubles cost while both environments run.",
    ],
    architectureDiagram: `Blue (prod, v13) --replication--> Green (staging, upgraded to v15)
   test on Green --> SWITCHOVER (< 1 min, same endpoints) --> Green becomes prod
Aurora: Standard (compute + storage + I/O)   vs   I/O-Optimized (no I/O fees, higher base)`,
    architectureCaption: "Test the change on a twin, then swap.",
    mentorTip:
      "Safe database change with minimal downtime is blue/green. OS access on a managed database is RDS Custom. Heavy I/O bills point to Aurora I/O-Optimized.",
    questionIds: [
      "q-rds-custom-blue-green-aurora-io-optimized-1",
      "q-rds-custom-blue-green-aurora-io-optimized-2",
      "q-rds-custom-blue-green-aurora-io-optimized-3",
    ],
  },
  {
    id: "streaming-etl-flink-glue-databrew",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "Streaming and ETL Tools: Managed Service for Apache Flink, Glue and DataBrew",
    shortName: "Streaming & ETL tools",
    tier: 2,
    domains: [3, 4],
    examImportance: "medium",
    oneLiner:
      "Flink processes streams continuously, Glue runs ETL jobs and catalogues data, and DataBrew lets analysts clean data without code.",
    englishExplanation:
      "Amazon Managed Service for Apache Flink (the successor to Kinesis Data Analytics) runs Apache Flink applications that analyse streaming data in real time. It reads from Kinesis Data Streams, MSK and other sources and performs windowed aggregations, joins, anomaly detection and transformations using Java, Python, Scala or SQL, and it writes results to destinations such as S3, Kinesis, OpenSearch or databases. Use it when you need continuous, stateful, low-latency analytics on a stream, for example counting events per minute or detecting fraud patterns as they occur. Firehose, by contrast, simply delivers streaming data to a destination with optional transformation.\n\nAWS Glue is the serverless data integration service. Crawlers scan data stores and populate the Glue Data Catalog with table definitions that Athena, Redshift Spectrum and EMR use. Glue ETL jobs run Apache Spark or Python scripts to transform data, such as converting CSV to partitioned Parquet or joining datasets. Triggers and workflows orchestrate jobs, job bookmarks track what data has already been processed so reruns do not duplicate work, Glue Studio provides a visual job editor, and streaming ETL jobs consume from Kinesis and Kafka. The Glue Schema Registry validates the structure of streaming records as producers and consumers evolve.\n\nAWS Glue DataBrew is a visual data preparation tool for analysts and data scientists who do not write code. It offers hundreds of built-in transformations, profiling to detect quality issues and recipes that can be applied repeatedly. Choose by the job. Real-time windowed analytics on a stream is Managed Service for Apache Flink. Scheduled or large-scale data transformation with code and a catalogue is Glue ETL. Interactive, no-code cleaning of a dataset is DataBrew. Simple delivery of streaming data with light transformation is Firehose, and heavyweight custom big data frameworks are EMR.",
    taglishExplanation:
      "Ang Amazon Managed Service for Apache Flink (kapalit ng Kinesis Data Analytics) ay nagpapatakbo ng Flink applications para sa real-time na pagsusuri ng stream: windowed aggregations, joins, at anomaly detection gamit ang Java, Python, Scala, o SQL. Ang Glue ay serverless data integration: ang crawler ay pumupuno sa Data Catalog, ang ETL jobs ay Spark o Python na nagta-transform (halimbawa CSV papuntang Parquet), at ang job bookmarks ay sumusubaybay ng naproseso na. Ang DataBrew ay visual, no-code na paglilinis ng data para sa analyst, may daan-daang built-in na transformation at profiling. Real-time na stream analytics ay Flink; batch ETL ay Glue; no-code cleaning ay DataBrew; simpleng delivery ay Firehose.",
    analogy:
      "A food factory. Flink is the conveyor-belt inspector who counts and judges each item as it passes, minute by minute. Glue is the prep kitchen that processes full crates on a schedule and writes the recipe cards (catalogue). DataBrew is the point-and-click station where a taster with no kitchen skills can trim and tidy ingredients. Firehose is the delivery van that just takes boxes to the shop.",
    whyItExists:
      "Data arrives continuously and in messy formats. Teams need streaming analytics, scalable transformation and accessible data cleaning without running their own clusters.",
    flow: "Stream (Kinesis / MSK) -> Flink (windows, joins) -> S3 / OpenSearch ; raw files in S3 -> Glue crawler -> Catalog -> Glue ETL -> Parquet ; dataset -> DataBrew recipe -> clean output",
    withoutIt: [
      "You would run and scale your own Flink or Spark clusters",
      "Schema discovery and cataloguing would be manual",
      "Analysts would depend on engineers to clean every dataset",
    ],
    bestUseCases: [
      "Flink for real-time aggregations and anomaly detection on Kinesis streams",
      "Glue crawlers and ETL jobs to build a data lake catalogue and Parquet datasets",
      "Job bookmarks for incremental processing",
      "DataBrew for no-code profiling and cleaning by analysts",
      "Glue Schema Registry to manage evolving streaming schemas",
    ],
    poorUseCases: [
      "Glue batch ETL for sub-second stream analytics",
      "Flink when you only need to deliver raw data to S3 (use Firehose)",
      "DataBrew for complex code-driven transformations at very large scale",
      "EMR when a serverless Glue job would do",
    ],
    alternatives: [
      { need: "Deliver streaming data to S3 or Redshift with minimal setup", choose: "Amazon Data Firehose" },
      { need: "Custom Spark and Hadoop clusters", choose: "Amazon EMR" },
      { need: "Ad hoc SQL over S3", choose: "Amazon Athena" },
      { need: "Governed lake permissions", choose: "AWS Lake Formation" },
    ],
    keyFeatures: [
      "Managed Service for Apache Flink: stateful stream processing in Java, Python, Scala or SQL",
      "Glue crawlers and the Data Catalog",
      "Glue ETL (Spark or Python), triggers, workflows, job bookmarks, streaming ETL, Glue Studio",
      "Glue Schema Registry for streaming schemas",
      "DataBrew: visual, no-code preparation with profiling and reusable recipes",
      "Serverless, with no clusters to manage",
      "Integrates with S3, Kinesis, MSK, Redshift and Athena",
    ],
    availability:
      "These services are managed and run across multiple AZs. Flink applications use checkpoints and snapshots to recover state after failures.",
    security:
      "Use IAM roles, VPC connections for private sources, KMS encryption, and Lake Formation for data permissions.",
    pricingLogic:
      "Flink charges per processing unit hour, Glue per DPU hour and crawler run, and DataBrew per node hour and per interactive session. Right-size jobs and stop idle sessions.",
    examKeywords: [
      "real-time analytics on streams",
      "windowed aggregation",
      "serverless ETL",
      "crawler",
      "job bookmark",
      "no-code data preparation",
      "schema registry",
      "Apache Flink",
    ],
    examTraps: [
      "Kinesis Data Analytics is now Managed Service for Apache Flink.",
      "Firehose delivers data. Flink analyses streams continuously.",
      "Glue job bookmarks prevent reprocessing of data that was already handled.",
      "DataBrew is visual and no-code, while Glue ETL is code-based.",
    ],
    architectureDiagram: `Kinesis / MSK --> [Managed Service for Apache Flink: windows, joins] --> S3 / OpenSearch / DB
S3 raw --> [Glue crawler] --> [Data Catalog] --> [Glue ETL (bookmarks)] --> S3 Parquet --> Athena
Dataset --> [DataBrew recipe: profile, clean] --> clean dataset`,
    architectureCaption: "Stream analytics, batch ETL and no-code cleaning are separate jobs.",
    mentorTip:
      "Continuous analysis of a stream is Flink, scheduled transformation with a catalogue is Glue, and no-code cleaning is DataBrew.",
    questionIds: [
      "q-streaming-etl-flink-glue-databrew-1",
      "q-streaming-etl-flink-glue-databrew-2",
      "q-streaming-etl-flink-glue-databrew-3",
    ],
  },
  {
    id: "ec2-imdsv2-user-data-instance-hardening",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "EC2 Instance Security: Metadata Service (IMDSv2), User Data and Hardening",
    shortName: "IMDSv2 and instance security",
    tier: 1,
    domains: [1],
    examImportance: "medium",
    oneLiner:
      "The instance metadata service hands credentials to your code, so require IMDSv2, keep secrets out of user data, and reduce what an instance can reach.",
    englishExplanation:
      "Every EC2 instance can query the instance metadata service (IMDS) at the link-local address 169.254.169.254 to learn about itself, including its IDs, network settings and, if it has an instance profile, temporary IAM credentials. That makes IMDS a sensitive target. Version 1 (IMDSv1) answers simple GET requests, which a server-side request forgery flaw in an application could abuse to steal the role credentials. IMDSv2 is session-oriented: the caller must first send a PUT request to obtain a token and then include it in a header, and it refuses requests with an X-Forwarded-For header and uses a small default hop limit so that a proxy or container is less likely to forward a request. You can require IMDSv2 on an instance or in a launch template (HttpTokens set to required) and enforce it with IAM or an SCP condition. Containers on an instance may need a larger hop limit to reach IMDS, and you can disable the service where it is not needed.\n\nUser data is a script or cloud-init data that runs at launch to bootstrap an instance, by default only on first boot. It is limited to 16 KB, is readable by anyone who can read instance metadata or describe the instance attribute, and is not encrypted, so never put secrets in it. Fetch secrets at runtime from Secrets Manager or Parameter Store using the instance's role. For repeatable, fast launches bake software into a golden AMI instead of installing everything in user data.\n\nOther hardening practices are commonly tested. Use instance profiles instead of access keys on instances, restrict inbound access with security groups and use Systems Manager Session Manager instead of open SSH. Encrypt EBS volumes, enable EBS encryption by default for the account and Region, and share AMIs carefully. Patch with Systems Manager Patch Manager and scan with Amazon Inspector. Limit the role's permissions with least privilege, because anything running on the instance can use them, and use IMDSv2 together with a restricted outbound path so stolen credentials are less useful.",
    taglishExplanation:
      "Puwedeng i-query ng bawat EC2 instance ang metadata service (IMDS) sa 169.254.169.254 para malaman ang sarili nitong impormasyon, kasama ang temporary IAM credentials kung may instance profile. Kaya sensitibo ito. Ang IMDSv1 ay simpleng GET, na puwedeng abusuhin ng SSRF para nakawin ang credentials. Ang IMDSv2 ay session-based: PUT muna para sa token, tapos ilalagay ito sa header, at tinatanggihan ang request na may X-Forwarded-For. Puwedeng i-require ang IMDSv2 (HttpTokens: required). Ang user data ay script sa launch, hanggang 16 KB, hindi naka-encrypt, kaya huwag maglagay ng secrets. Kumuha ng secrets sa Secrets Manager gamit ang role. Gumamit ng golden AMI, Session Manager, EBS encryption by default, Patch Manager, at Inspector.",
    analogy:
      "A hotel room with a service phone. IMDSv1 is a phone anyone in the room can pick up and ask the front desk for the master key card. IMDSv2 requires you to first ask for a one-time passcode with a special request, and refuses calls relayed through a middleman, so a trick played on a guest cannot easily extract the key. User data is the note left on the pillow at check-in: anyone who walks in can read it, so never write the safe's combination on it.",
    whyItExists:
      "Applications on an instance need credentials and information without storing keys on disk, but that convenience becomes a risk if an attacker can trick the application into making a request. Session-based metadata access closes that common attack path.",
    flow: "App -> PUT /latest/api/token -> token -> GET metadata with token header -> temporary role credentials ; secrets fetched at runtime from Secrets Manager using the role",
    withoutIt: [
      "A web application flaw could leak the instance's role credentials",
      "Secrets in user data would be visible to anyone who can read it",
      "Instances would be configured with long-lived keys",
    ],
    bestUseCases: [
      "Require IMDSv2 on all new and existing instances",
      "Instance profiles with least-privilege roles",
      "Secrets Manager or Parameter Store for secrets, fetched at runtime",
      "Golden AMIs instead of long user data scripts",
      "Session Manager, Patch Manager, Inspector and EBS encryption by default",
    ],
    poorUseCases: [
      "Passwords or API keys in user data",
      "Leaving IMDSv1 enabled when it is not needed",
      "Access keys stored on instances instead of roles",
      "Over-permissive instance roles that make stolen credentials very powerful",
    ],
    alternatives: [
      { need: "Store and rotate credentials", choose: "AWS Secrets Manager" },
      { need: "Shell access without SSH ports", choose: "Systems Manager Session Manager" },
      { need: "Find vulnerabilities on instances", choose: "Amazon Inspector" },
      { need: "Apply patches on a schedule", choose: "Systems Manager Patch Manager" },
    ],
    keyFeatures: [
      "IMDS at 169.254.169.254 serves instance data and role credentials",
      "IMDSv1 uses simple GET. IMDSv2 uses a PUT token and header",
      "Require IMDSv2 with HttpTokens set to required, enforceable with IAM or SCP conditions",
      "Hop limit affects whether containers can reach IMDS",
      "User data: runs at first boot by default, up to 16 KB, not encrypted",
      "Instance profiles deliver temporary credentials",
      "EBS encryption by default, Session Manager, Patch Manager, Inspector",
    ],
    availability:
      "Hardening should not reduce availability. Use golden AMIs and automation so patched, secure instances can replace old ones through Auto Scaling.",
    security:
      "Combine IMDSv2, least-privilege roles, no secrets in user data, restricted egress and patching to limit the impact of a compromised application.",
    pricingLogic:
      "These controls have no direct cost beyond the services used. The cost of a credential leak is far higher.",
    examKeywords: [
      "instance metadata",
      "IMDSv2",
      "SSRF",
      "user data",
      "169.254.169.254",
      "instance profile",
      "golden AMI",
      "secrets in user data",
    ],
    examTraps: [
      "User data is not a safe place for secrets. It is visible and unencrypted.",
      "IMDSv2 requires a token from a PUT request. IMDSv1 uses simple GET requests.",
      "User data runs only at first boot by default and is limited to 16 KB.",
      "Role credentials from IMDS are temporary, but anything on the instance can use them.",
    ],
    architectureDiagram: `App --PUT /latest/api/token--> IMDSv2 --> token
App --GET /latest/meta-data/iam/security-credentials/ROLE (token header)--> temporary credentials
SSRF attempt (simple GET, no token) --> BLOCKED when HttpTokens = required
User data: bootstrap only. Secrets: Secrets Manager at runtime via the instance role`,
    architectureCaption: "Make credential retrieval require a session token and keep secrets out of user data.",
    mentorTip:
      "If a question mentions SSRF or stolen instance credentials, the answer is to require IMDSv2. If it mentions secrets in user data, the answer is Secrets Manager or Parameter Store.",
    questionIds: [
      "q-ec2-imdsv2-user-data-instance-hardening-1",
      "q-ec2-imdsv2-user-data-instance-hardening-2",
      "q-ec2-imdsv2-user-data-instance-hardening-3",
    ],
  },
  {
    id: "network-troubleshooting-reachability-lattice",
    moduleId: "phase-4-networking",
    category: "Networking and Content Delivery",
    title: "Network Troubleshooting and Service Networking: Reachability Analyzer, Flow Logs, Traffic Mirroring and VPC Lattice",
    shortName: "Network troubleshooting",
    tier: 2,
    domains: [1, 3],
    examImportance: "medium",
    oneLiner:
      "Reachability Analyzer explains why two resources cannot connect, Flow Logs record who did connect, Traffic Mirroring captures packets, and VPC Lattice connects services across VPCs.",
    englishExplanation:
      "When two resources cannot talk to each other, a methodical check covers security groups, network ACLs, route tables, gateways and endpoints. VPC Reachability Analyzer automates this. You choose a source and destination and it analyses the configuration of the path, including security groups, NACLs, route tables, gateways, peering and Transit Gateway attachments, and tells you whether the destination is reachable and which component blocks the path, without sending any packets. Network Access Analyzer works the other way: it defines the network access you intend, such as 'databases must not be reachable from the internet', and finds paths that violate it, which supports security reviews. VPC Flow Logs record accepted and rejected traffic metadata, so they show what actually happened, and an inbound accept followed by an outbound reject points to a stateless network ACL. Traffic Mirroring copies actual packets from an instance's network interface to a monitoring appliance or load balancer for deep inspection, troubleshooting and threat detection.\n\nSeveral other tools complement them. Route table checks verify the most specific route, security group rules are stateful and allow only, and NACLs are stateless and numbered. DNS problems are checked with Resolver query logs. Internet Monitor and Network Monitor give visibility into internet and hybrid network performance between users or on-premises sites and AWS.\n\nAmazon VPC Lattice is an application-layer service networking layer. It lets you connect, secure and monitor communication between services running on instances, containers and Lambda functions across many VPCs and accounts, with service discovery, routing rules, access control through auth policies using IAM, and observability, without managing peering, Transit Gateway routes or load balancers for every pair. Compare the options. Use VPC peering or Transit Gateway for network-level connectivity, PrivateLink to expose a single service privately, and VPC Lattice when you want consistent service-to-service communication, authorization and routing at the application layer across many VPCs.",
    taglishExplanation:
      "Kapag hindi makapag-usap ang dalawang resources, i-check ang security groups, NACLs, route tables, gateways, at endpoints. Ang VPC Reachability Analyzer ay nag-a-analisa ng configuration ng path sa pagitan ng source at destination at sinasabi kung reachable ito at aling component ang humaharang, nang hindi nagpapadala ng packets. Ang Network Access Analyzer ay naghahanap ng path na lumalabag sa gusto mong network access, tulad ng database na hindi dapat maabot mula internet. Ang Flow Logs ay nagtatala ng aktwal na accept at reject. Ang Traffic Mirroring ay kumokopya ng aktwal na packets para sa deep inspection. Ang VPC Lattice naman ay service networking sa application layer sa pagitan ng maraming VPC at account, na may auth policies gamit ang IAM, nang hindi namamahala ng peering o Transit Gateway routes.",
    analogy:
      "Solving a failed delivery. Reachability Analyzer is the map analyst who reads the road signs, locked gates and one-way streets to say 'a parcel cannot get through because gate 3 is locked', without sending a truck. Flow Logs are the logbook of trucks that actually arrived or were turned away. Traffic Mirroring is a camera that films every package on the road. VPC Lattice is a city-wide courier network with its own rules and ID checks that links every shop to every other without building a road between each pair.",
    whyItExists:
      "Network problems are hard to diagnose across many layers and accounts, and large microservice estates need consistent connectivity and security without a mesh of point-to-point networking.",
    flow: "Connectivity problem -> Reachability Analyzer (configuration) -> Flow Logs (actual traffic) -> Traffic Mirroring (packets) ; service-to-service across VPCs -> VPC Lattice service network with auth policies",
    withoutIt: [
      "Engineers would check security groups, NACLs and routes by hand",
      "Packet-level questions would need custom capture tooling",
      "Each pair of VPCs would need its own connectivity and access controls",
    ],
    bestUseCases: [
      "Reachability Analyzer to find the blocking security group, NACL or route",
      "Network Access Analyzer to verify that databases are not internet-reachable",
      "Flow Logs to confirm what traffic was accepted or rejected",
      "Traffic Mirroring to send packets to an IDS appliance",
      "VPC Lattice for service-to-service communication with IAM auth policies across accounts",
    ],
    poorUseCases: [
      "Expecting Reachability Analyzer to test application behaviour (it analyses configuration)",
      "Using Flow Logs to read packet payloads (use Traffic Mirroring)",
      "VPC Lattice when you only need network-level connectivity between two VPCs",
      "Peering mesh for many services needing per-service authorization",
    ],
    alternatives: [
      { need: "Network-level hub across many VPCs", choose: "AWS Transit Gateway" },
      { need: "Expose one service privately", choose: "AWS PrivateLink" },
      { need: "Block threats at the network", choose: "AWS Network Firewall" },
      { need: "Detect threats from logs", choose: "Amazon GuardDuty" },
    ],
    keyFeatures: [
      "Reachability Analyzer: static analysis of the path, no packets sent",
      "Network Access Analyzer: find unintended access paths against your intent",
      "VPC Flow Logs: metadata of accepted and rejected traffic",
      "Traffic Mirroring: copies packets to appliances for inspection",
      "Internet Monitor and Network Monitor for performance visibility",
      "VPC Lattice: application-layer service networking, auth policies, routing, observability",
      "Security groups stateful, NACLs stateless",
    ],
    availability:
      "These are diagnostic and connectivity tools. VPC Lattice spans AZs and simplifies resilient service-to-service connectivity.",
    security:
      "Use Network Access Analyzer for audits, Flow Logs and mirroring for forensics, and Lattice auth policies to restrict which services can call each other.",
    pricingLogic:
      "Reachability Analyzer and Network Access Analyzer charge per analysis. Traffic Mirroring charges per mirrored interface hour, Flow Logs per data published, and VPC Lattice per service hour and per data processed.",
    examKeywords: [
      "why can't instance A reach instance B",
      "analyse the path without sending traffic",
      "unintended internet access",
      "packet capture",
      "service-to-service across VPCs",
      "auth policy",
      "mirror traffic",
    ],
    examTraps: [
      "Reachability Analyzer evaluates configuration. It does not send test packets.",
      "Flow Logs show metadata, not payloads. Traffic Mirroring captures packets.",
      "Inbound accept followed by outbound reject suggests a stateless NACL problem.",
      "VPC Lattice is application-layer service networking. Transit Gateway and peering are network-layer connectivity.",
    ],
    architectureDiagram: `Why can A not reach B?  Reachability Analyzer: A -> SG ok -> route ok -> NACL DENY (blocks) ✗
Audit: Network Access Analyzer "no path from internet to DB subnets"
Actual traffic: VPC Flow Logs (ACCEPT/REJECT)      Packets: Traffic Mirroring -> IDS appliance
Services across VPCs/accounts: [VPC Lattice service network + IAM auth policy]`,
    architectureCaption: "Configuration analysis, traffic records, packet capture and service networking.",
    mentorTip:
      "Match the verb: 'why is it blocked' is Reachability Analyzer, 'what did traffic do' is Flow Logs, 'show me the packets' is Traffic Mirroring, 'connect services across VPCs with auth' is VPC Lattice.",
    questionIds: [
      "q-network-troubleshooting-reachability-lattice-1",
      "q-network-troubleshooting-reachability-lattice-2",
      "q-network-troubleshooting-reachability-lattice-3",
    ],
  },
  {
    id: "s3-express-one-zone-mountpoint-performance",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "S3 Performance Options: Express One Zone, Mountpoint and Consistency",
    shortName: "S3 performance options",
    tier: 2,
    domains: [3, 4],
    examImportance: "medium",
    oneLiner:
      "S3 is strongly consistent, and for latency-sensitive work you can use S3 Express One Zone in one AZ or mount a bucket as a file system with Mountpoint.",
    englishExplanation:
      "Amazon S3 provides strong read-after-write consistency for all operations, including PUTs of new objects, overwrites, deletes and list operations, at no extra cost and with no change in performance. After a successful write, any subsequent read or list returns the latest data, so applications no longer need workarounds for eventual consistency. Bucket-level operations such as creating buckets and changing configuration may still take a moment to propagate.\n\nFor workloads that need the lowest latency, Amazon S3 Express One Zone is a high-performance storage class designed for frequently accessed data and latency-sensitive applications such as machine learning training, interactive analytics, media processing and real-time workloads. It stores data in a single Availability Zone that you choose, in a new bucket type called a directory bucket, and delivers consistent single-digit millisecond request latency, much faster than S3 Standard. Because the data lives in one AZ, you should run the compute in the same AZ to minimise latency and cost, and you accept that an AZ failure can affect the data, so it is for data that can be recreated or is also stored elsewhere. It is compatible with many S3 APIs and integrates with services such as Athena, EMR and SageMaker.\n\nMountpoint for Amazon S3 is an open source file client that mounts a bucket as a local file system on Linux, so applications that expect file access can read and write objects at high throughput without code changes. It supports sequential writes of new files and reads of existing objects, but is not a full POSIX file system, so it does not support operations such as renaming or modifying objects in place. Combine these options with the standard S3 performance practices: spread requests over prefixes, use multipart upload and byte-range fetches, use Transfer Acceleration for long-distance uploads and CloudFront for global reads. Choose Express One Zone for latency, Standard for durability across AZs and EFS or FSx when you need a true shared file system.",
    taglishExplanation:
      "Ang S3 ay may strong read-after-write consistency sa lahat ng operasyon: PUT ng bagong object, overwrite, delete, at list, walang dagdag na bayad. Pagkatapos ng matagumpay na write, ang susunod na read o list ay ang pinakabagong data. Para sa pinakamababang latency, ang S3 Express One Zone ay high-performance na storage class sa isang AZ na pipiliin mo, sa directory bucket, na may single-digit millisecond na latency. Dahil isang AZ lang, patakbuhin ang compute sa parehong AZ at tanggapin na ang pagkasira ng AZ ay puwedeng makaapekto. Ang Mountpoint for Amazon S3 ay nagma-mount ng bucket bilang local file system sa Linux para sa high-throughput na read at sequential write, pero hindi ito kumpletong POSIX.",
    analogy:
      "A national warehouse chain with a rapid-pick room. Standard S3 is the main warehouse that keeps copies in several buildings and always has the latest stock list. Express One Zone is a small rapid-pick room in one building with parcels on the shelf beside the packing desk: extremely quick, but if that building has a problem the room is affected. Mountpoint is a conveyor-belt adapter that lets staff who only know folders and files work with the warehouse as though it were a shelf of folders.",
    whyItExists:
      "Machine learning, analytics and real-time workloads need object storage with much lower latency, and many applications expect a file interface rather than an object API.",
    flow: "Write to S3 -> subsequent read or list returns the latest data (strongly consistent) ; latency-sensitive app in AZ-a -> directory bucket in AZ-a (Express One Zone) ; file-expecting app -> Mountpoint mount of a bucket",
    withoutIt: [
      "Applications would need to cope with eventual consistency",
      "Latency-sensitive jobs would wait on standard S3 latency or need extra caching layers",
      "File-based tools would need code changes to read S3 objects",
    ],
    bestUseCases: [
      "Express One Zone for ML training data and interactive analytics needing single-digit millisecond access",
      "Running compute in the same AZ as an Express One Zone directory bucket",
      "Mountpoint for read-heavy, high-throughput access to S3 from file-based applications",
      "Strong consistency for read-after-write pipelines without extra coordination",
      "Standard S3 with multipart, prefixes and CloudFront for general performance",
    ],
    poorUseCases: [
      "Express One Zone as the only copy of irreplaceable data",
      "Mountpoint for workloads that rename or update files in place",
      "Choosing Express One Zone when multi-AZ durability is required",
      "Assuming S3 is still eventually consistent",
    ],
    alternatives: [
      { need: "True shared POSIX file system", choose: "Amazon EFS or FSx" },
      { need: "Global read performance", choose: "Amazon CloudFront" },
      { need: "Fast long-distance uploads", choose: "S3 Transfer Acceleration" },
      { need: "Cheapest durable object storage", choose: "S3 Standard with lifecycle tiering" },
    ],
    keyFeatures: [
      "Strong read-after-write consistency for objects and listings",
      "S3 Express One Zone: directory buckets, single AZ, single-digit millisecond latency",
      "Co-locate compute with the bucket's AZ",
      "Mountpoint for Amazon S3: mount a bucket as a local file system on Linux",
      "Mountpoint is not full POSIX: no in-place modification or rename",
      "Multipart upload, byte-range fetches, prefixes and Transfer Acceleration remain relevant",
      "Integrates with analytics and ML services",
    ],
    availability:
      "Express One Zone keeps data in one AZ, so it does not tolerate an AZ loss. Keep a copy in S3 Standard when the data matters.",
    security:
      "Express One Zone uses session-based authentication for directory buckets. Apply IAM and bucket policies and encryption as with other S3 storage.",
    pricingLogic:
      "Express One Zone has a higher storage price per GB but lower request costs, which suits high request rates and short-lived hot data. Move data to cheaper classes when it cools.",
    examKeywords: [
      "single-digit millisecond",
      "directory bucket",
      "read-after-write consistency",
      "mount S3 as a file system",
      "latency-sensitive",
      "machine learning training data",
      "same Availability Zone",
    ],
    examTraps: [
      "S3 is strongly consistent. Eventual consistency is outdated.",
      "Express One Zone stores data in one AZ, so it is not highly available across AZs.",
      "Mountpoint is not a full POSIX file system. Use EFS or FSx for that.",
      "Latency-sensitive plus acceptable single-AZ points to Express One Zone, not Standard-IA.",
    ],
    architectureDiagram: `PUT object --> success --> GET / LIST immediately returns the latest (strong consistency)
AZ-a: [GPU training cluster] <--single-digit ms--> [S3 Express One Zone directory bucket (AZ-a)]
Linux app (file API) --> [Mountpoint for S3] --> bucket (sequential writes, fast reads)`,
    architectureCaption: "Strong consistency everywhere, and low latency where you need it.",
    mentorTip:
      "Latency-critical and tolerant of one AZ means Express One Zone with compute in the same AZ. A real shared file system means EFS or FSx, not Mountpoint.",
    questionIds: [
      "q-s3-express-one-zone-mountpoint-performance-1",
      "q-s3-express-one-zone-mountpoint-performance-2",
      "q-s3-express-one-zone-mountpoint-performance-3",
    ],
  },
];
