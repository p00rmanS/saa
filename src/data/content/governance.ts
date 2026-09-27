import type { Lesson } from "@/lib/types";

export const governanceLessons: Lesson[] = [
  {
    id: "amazon-cloudwatch",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "Amazon CloudWatch",
    shortName: "CloudWatch",
    tier: 1,
    domains: [2, 3],
    examImportance: "critical",
    oneLiner:
      "Amazon CloudWatch is AWS's native monitoring service for metrics, logs, alarms, and dashboards across almost every AWS resource.",
    englishExplanation:
      "Amazon CloudWatch is the central nervous system for observability in AWS. Every major AWS service automatically publishes metrics to CloudWatch — CPU utilization for an EC2 instance, request count for an ALB, invocation count and duration for a Lambda function, and so on. You can also push your own custom metrics (like \"number of items in a shopping cart\") from your application code. CloudWatch stores these as time-series data points that you can graph on dashboards.\n\nOn top of metrics sits CloudWatch Alarms. An alarm watches a metric over a period of time and compares it against a threshold — for example, \"if average CPU is above 80% for 5 minutes.\" When the alarm goes into ALARM state, it can trigger an action: send a notification through SNS, scale an Auto Scaling group, or even stop/reboot an EC2 instance. This is the piece that turns passive monitoring into active, automated response.\n\nCloudWatch Logs is a separate but related capability: it centralizes log files from EC2 instances (via the CloudWatch agent), Lambda functions, VPC Flow Logs, and many other sources into log groups and log streams that you can search, filter with metric filters (to turn a log pattern into a numeric metric), and retain for a configurable period.\n\nCloudWatch also has Events/EventBridge-style rules that react to state changes (like \"an EC2 instance just terminated\") and route them to a target such as a Lambda function or SNS topic. Conceptually, CloudWatch answers the question \"what is happening right now and how is my system performing,\" which is very different from CloudTrail's job of answering \"who did what.\"",
    taglishExplanation:
      "CloudWatch ang \"dashboard ng katawan\" ng infrastructure mo sa AWS — parang vital signs monitor sa hospital. Nakikita mo dito ang CPU usage, memory (kung may agent ka), request count, errors — lahat ng metrics. Puwede ka rin mag-set ng alarm, halimbawa \"kapag lumagpas ng 80% ang CPU sa loob ng 5 minutes, mag-alert ka sa akin\" — at puwede pang i-automate na mag-scale up agad ang mga servers. May Logs feature din siya kung saan pupunta lahat ng log files mo para hindi ka na mag-SSH lang para tumingin ng logs sa bawat server.",
    analogy:
      "CloudWatch is like the dashboard and warning lights in your car — speedometer, fuel gauge, engine temperature, and a check-engine light that turns on and alerts you the moment something crosses a dangerous threshold. It tells you what your system is doing right now and warns you before it breaks down, but it does not tell you who was driving or who changed the oil last week — that is a different kind of record entirely.",
    whyItExists:
      "Without a centralized monitoring service, every team would need to build and maintain their own agents, dashboards, and alerting pipelines just to know if their application is healthy. CloudWatch exists so that monitoring is built into the platform itself — metrics show up automatically the moment you launch a resource, so you can detect and react to problems (or trigger automated scaling) without wiring anything custom.",
    flow: "AWS resource (EC2, Lambda, ALB, RDS...) -> emits metrics -> CloudWatch Metrics -> CloudWatch Alarm crosses threshold -> SNS notification / Auto Scaling action",
    withoutIt: [
      "You would have no built-in visibility into resource health, CPU, memory, or error rates",
      "Auto Scaling groups would have no signal to know when to add or remove instances",
      "You would need a third-party or self-hosted monitoring stack for basic operational awareness",
      "Log files would stay scattered across individual instances instead of centralized",
    ],
    bestUseCases: [
      "Real-time monitoring of EC2, RDS, Lambda, ALB, and most other AWS services out of the box",
      "Driving Auto Scaling decisions based on CPU, request count, or custom application metrics",
      "Centralizing and searching application/system logs from many instances or functions",
      "Building operational dashboards for a NOC or on-call team",
      "Alerting via SNS when a metric crosses a defined threshold",
      "Turning log patterns (e.g. \"ERROR\" lines) into countable metrics via metric filters",
    ],
    poorUseCases: [
      "Auditing exactly which IAM user changed a security group — that is CloudTrail's job",
      "Tracking configuration drift or compliance over time — that is AWS Config's job",
      "Deep distributed tracing of a request across multiple microservices — that is X-Ray's job",
    ],
    alternatives: [
      { need: "An audit trail of who called which API and when", choose: "AWS CloudTrail" },
      { need: "Track configuration changes and compliance over time", choose: "AWS Config" },
      { need: "Trace a single request across multiple microservices", choose: "AWS X-Ray" },
      { need: "Third-party APM with deeper application-level insight", choose: "Partner tools (e.g. Datadog) alongside CloudWatch" },
    ],
    keyFeatures: [
      "Automatic metrics for most AWS services (CPU, network, request counts, errors, latency)",
      "Custom metrics published from your own application code",
      "Alarms that trigger SNS notifications or Auto Scaling actions",
      "CloudWatch Logs for centralized log storage, search, and metric filters",
      "CloudWatch Dashboards for visualizing metrics in one place",
      "CloudWatch Events/EventBridge-style rules that react to resource state changes",
      "Composite alarms that combine multiple alarms with AND/OR logic",
    ],
    availability:
      "CloudWatch is a regional service — metrics and alarms live in the region of the resource they monitor, though a global CloudWatch dashboard can pull data from multiple regions. It is a fully managed service, so AWS handles the underlying scaling and durability of the metrics and logs storage.",
    security:
      "Access to view or modify CloudWatch metrics, alarms, and logs is controlled by IAM policies. Logs can be encrypted with KMS. CloudWatch itself does not store your data outside the account/region boundary you configure, and cross-account dashboards require explicit sharing.",
    pricingLogic:
      "Basic EC2 metrics at 5-minute intervals are free; detailed monitoring (1-minute intervals), custom metrics, dashboards, alarms, and log storage/ingestion are billed based on volume and retention. Costs can grow quickly with high-resolution custom metrics or long log retention, so it is common to tune retention periods and metric resolution deliberately.",
    examKeywords: [
      "metrics",
      "alarms",
      "dashboards",
      "CloudWatch Logs",
      "custom metrics",
      "metric filter",
      "real-time monitoring",
    ],
    examTraps: [
      "CloudWatch monitors performance/health; it does NOT log who made an API call — that's CloudTrail.",
      "CloudWatch does NOT track configuration compliance over time — that's AWS Config.",
      "An EC2 Auto Scaling policy needs a CloudWatch alarm as its trigger — the two work together, not instead of each other.",
      "Basic monitoring is 5-minute granularity by default; 1-minute \"detailed monitoring\" costs extra.",
    ],
    architectureDiagram:
      "EC2 / Lambda / ALB / RDS\n        |\n   emits metrics\n        |\n  CloudWatch Metrics\n        |\n  CloudWatch Alarm (threshold breached)\n     /            \\\nSNS Notification   Auto Scaling Action",
    architectureCaption:
      "CloudWatch collects metrics from AWS resources, and alarms convert threshold breaches into notifications or automated scaling actions.",
    mentorTip:
      "When a scenario asks about \"real-time performance monitoring\" or \"trigger auto scaling,\" think CloudWatch. When it asks \"who deleted this resource\" or \"audit API activity,\" that is CloudTrail — do not confuse the two on the exam.",
    questionIds: [
      "q-amazon-cloudwatch-1",
      "q-amazon-cloudwatch-2",
      "q-amazon-cloudwatch-3",
      "q-amazon-cloudwatch-4",
      "q-amazon-cloudwatch-5",
    ],
  },

  {
    id: "aws-cloudtrail",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "AWS CloudTrail",
    shortName: "CloudTrail",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "AWS CloudTrail records who did what, when, and from where across your AWS account by logging every API call.",
    englishExplanation:
      "AWS CloudTrail is your account's audit log. Every time someone (a human user, an IAM role, or an AWS service acting on your behalf) makes an API call — launching an EC2 instance, deleting an S3 bucket, changing a security group — CloudTrail records that event: who made the call, what action was called, the source IP, the time, and whether it succeeded or failed. This is fundamentally different from CloudWatch, which tracks performance and health metrics, not identity and intent.\n\nCloudTrail is enabled by default in every AWS account with a 90-day \"Event history\" view in the console for management events, at no extra cost. For long-term retention, deeper querying, or multi-region/multi-account visibility, you create a CloudTrail \"trail\" that delivers log files continuously to an S3 bucket (and optionally CloudWatch Logs for alerting). Trails can be organization-wide, capturing events across every account in AWS Organizations.\n\nCloudTrail distinguishes between management events (control-plane actions like creating a VPC or IAM policy) and data events (data-plane actions like S3 object-level GetObject/PutObject or Lambda invocations), which are higher volume and cost extra to log. It also has CloudTrail Insights, which can automatically flag unusual API activity patterns.\n\nThe exam loves to contrast the three governance tools: CloudTrail answers \"who did what and when\" (audit/security forensics), CloudWatch answers \"how is my system performing right now\" (operational monitoring), and AWS Config answers \"what does my configuration look like now versus before, and is it compliant\" (configuration history and compliance). A classic scenario: after a security incident, you need to find out which IAM user deleted a security group — that is CloudTrail, not CloudWatch or Config.",
    taglishExplanation:
      "CloudTrail ang \"CCTV camera\" ng AWS account mo — lahat ng ginawa, sino gumawa, at kailan, naka-log. Kapag may nawawalang resource o may nag-delete ng bagay na hindi dapat, dito ka pupunta para malaman \"sino may kasalanan.\" Iba ito sa CloudWatch — hindi tungkol sa performance ang CloudTrail, kundi tungkol sa \"paper trail\" ng mga aksyon. By default, may 90-day history ka na agad pagka-gawa ng account, pero kung gusto mo permanent record o multi-region visibility, gagawa ka ng \"trail\" papuntang S3.",
    analogy:
      "CloudTrail is like the CCTV and sign-in log at a secure office building: it records who badged in, which door they opened, and at what time — even if they were just passing through and not doing anything wrong. It is not there to tell you the building's temperature or how crowded the elevators are (that's CloudWatch); it exists purely so that when something goes wrong, you can rewind the tape and find out exactly who did it.",
    whyItExists:
      "In a shared, API-driven cloud environment, dozens of people and automated systems can change infrastructure at any moment. Without an immutable, centralized audit trail, you would have no reliable way to investigate a security incident, prove compliance to an auditor, or even figure out which teammate accidentally deleted a production resource. CloudTrail exists to make every account action attributable and reviewable after the fact.",
    flow: "IAM user/role calls an AWS API -> CloudTrail records the event (who, what, when, source IP) -> Event history (90 days) or delivered to S3 trail -> optionally streamed to CloudWatch Logs for alerting -> CloudTrail Insights flags anomalies",
    withoutIt: [
      "You would have no reliable record of who made a given change to your infrastructure",
      "Security investigations after an incident would be extremely difficult or impossible",
      "You could not prove compliance to auditors who require an activity trail",
      "Detecting anomalous or malicious API usage patterns would require building your own logging",
    ],
    bestUseCases: [
      "Security investigations: determining who deleted, modified, or created a specific resource",
      "Compliance and audit requirements that mandate an API activity log",
      "Detecting unusual or unauthorized API activity via CloudTrail Insights",
      "Organization-wide governance: one trail capturing events from every account",
      "Feeding API activity into a SIEM or CloudWatch Logs for automated alerting",
    ],
    poorUseCases: [
      "Real-time performance/health monitoring of running resources — use CloudWatch instead",
      "Tracking whether a resource's configuration is currently compliant with a rule — use AWS Config",
      "Debugging application-level errors inside your code — use CloudWatch Logs or X-Ray",
    ],
    alternatives: [
      { need: "Monitor performance metrics and trigger alarms", choose: "Amazon CloudWatch" },
      { need: "Track configuration history and compliance rules", choose: "AWS Config" },
      { need: "Centralized security findings across accounts", choose: "AWS Security Hub / Amazon GuardDuty" },
    ],
    keyFeatures: [
      "Records every management (control-plane) API call by default, account-wide",
      "90-day Event history included at no extra charge, no trail required",
      "Trails deliver log files continuously to S3 for long-term retention",
      "Can log data events (S3 object-level, Lambda invocations) for deeper visibility, at extra cost",
      "Organization trails capture events across all AWS Organizations member accounts",
      "CloudTrail Insights automatically detects unusual API call volume or patterns",
      "Log file integrity validation to prove logs have not been tampered with",
    ],
    availability:
      "CloudTrail is enabled by default for every AWS account. A single trail can be configured to apply to all regions, so activity anywhere in the account is captured centrally, and delivery to S3 is designed for high durability. Organization trails extend this across every account in an AWS Organization automatically, including new accounts as they join.",
    security:
      "CloudTrail log files should be delivered to a dedicated, tightly access-controlled S3 bucket, ideally in a separate account, with log file integrity validation enabled so tampering can be detected. Access to CloudTrail configuration itself should be restricted via IAM, since disabling or altering a trail is a red flag investigators look for.",
    pricingLogic:
      "The first copy of management event history (90-day event history) is free. Creating a trail to S3 for management events is also free for one copy; you pay for the S3 storage. Logging data events (S3 object-level, Lambda) and additional trails incur per-event charges, so teams often enable data events selectively on sensitive buckets rather than account-wide.",
    examKeywords: [
      "who did what",
      "API call history",
      "audit trail",
      "management events",
      "data events",
      "trail",
      "governance and compliance",
    ],
    examTraps: [
      "CloudTrail is about identity/actions, not performance — do not pick it for monitoring CPU or latency questions.",
      "\"Who deleted this resource\" or \"which user made this API call\" is always a CloudTrail signal.",
      "Data events (S3 object-level, Lambda) are NOT logged by default — you must explicitly enable them and they cost extra.",
      "CloudTrail is not the same as AWS Config: CloudTrail shows the action taken; Config shows the resulting configuration state over time.",
    ],
    architectureDiagram:
      "IAM User / Role / Service\n        |\n   calls an AWS API\n        |\n    AWS CloudTrail\n     /          \\\nEvent History   Trail -> S3 bucket\n(90 days, free)      |\n                CloudWatch Logs (alerts) / Insights (anomalies)",
    architectureCaption:
      "Every API call is captured by CloudTrail; a configured trail delivers the full history to S3 for long-term audit and can stream to CloudWatch Logs for alerting.",
    mentorTip:
      "Memorize this trio: CloudTrail = who did it (audit), CloudWatch = how is it performing (monitoring), Config = what does it look like now vs. before (compliance/configuration history). The exam almost always tests whether you can tell these three apart in a scenario.",
    questionIds: [
      "q-aws-cloudtrail-1",
      "q-aws-cloudtrail-2",
      "q-aws-cloudtrail-3",
      "q-aws-cloudtrail-4",
      "q-aws-cloudtrail-5",
    ],
  },

  {
    id: "aws-config",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "AWS Config",
    shortName: "Config",
    tier: 2,
    domains: [1],
    examImportance: "high",
    oneLiner:
      "AWS Config continuously records the configuration of your AWS resources and evaluates them against rules to track compliance over time.",
    englishExplanation:
      "AWS Config takes a snapshot of the configuration of your AWS resources (an EC2 instance's security groups, an S3 bucket's public access settings, an IAM policy's permissions) and keeps a history of how that configuration changed over time. Whereas CloudTrail tells you the API call that was made, Config tells you the actual resulting state of the resource, before and after — you can literally see a configuration timeline and diff two points in time.\n\nOn top of that history, Config Rules let you define desired-state checks — either AWS managed rules (e.g. \"S3 buckets must not be publicly readable\") or custom rules backed by a Lambda function — and Config continuously evaluates your resources against them, flagging each one as compliant or non-compliant. This makes Config the backbone of ongoing compliance monitoring rather than a one-time audit.",
    taglishExplanation:
      "Kung CloudTrail ay CCTV ng mga aksyon, si AWS Config naman ay parang \"snapshot history\" ng settings ng resources mo. Halimbawa, nag-configure ka ng security group noong Lunes, tapos may nagbago noong Miyerkules — makikita mo sa Config ang \"before\" at \"after.\" May Config Rules din na parang automated checklist: \"lahat ng S3 bucket ba ay hindi public?\" — kung may lumabag, mafla-flag agad as non-compliant.",
    analogy:
      "AWS Config is like a home inspector who visits your house every day, photographs every room, and keeps a binder showing exactly how each room looked on each date — plus a checklist confirming whether every room still meets code (smoke detectors installed, no exposed wiring). CloudTrail tells you who opened which door; Config tells you what the room actually looked like afterward and whether it still passes inspection.",
    whyItExists:
      "As environments grow, configurations drift — someone opens a security group \"just for testing\" and forgets to close it, or a bucket policy quietly becomes public. Config exists to catch that drift automatically and continuously, and to give you a historical record so you can answer \"when did this setting change\" without guessing.",
    flow: "AWS resource configuration changes -> Config records a configuration item/snapshot -> Config Rule evaluates the resource -> compliant / non-compliant status -> optional remediation action or SNS notification",
    withoutIt: [
      "Configuration drift could go unnoticed until it causes an incident or audit failure",
      "You would have no historical timeline of how a resource's configuration changed",
      "Verifying compliance across hundreds of resources would require manual, one-off checks",
    ],
    bestUseCases: [
      "Continuously checking resources against compliance rules (e.g. \"encryption must be enabled\")",
      "Investigating exactly how a resource's configuration changed over time",
      "Feeding automated remediation workflows when a resource drifts out of compliance",
    ],
    poorUseCases: [
      "Recording who called which API — that is CloudTrail's job, Config focuses on resulting state",
      "Real-time performance metrics or alarms — that is CloudWatch's job",
    ],
    alternatives: [
      { need: "Log the actual API calls/identity behind a change", choose: "AWS CloudTrail" },
      { need: "Enforce guardrails across an entire multi-account org", choose: "AWS Organizations (SCPs) / Control Tower" },
    ],
    keyFeatures: [
      "Configuration history and timeline per resource",
      "Config Rules (managed or custom Lambda-backed) for compliance evaluation",
      "Conformance packs to deploy a collection of rules as one compliance framework",
      "Multi-account, multi-region aggregation of compliance data",
      "Can trigger automated remediation via Systems Manager Automation documents",
    ],
    availability:
      "Config operates per region and can aggregate data across regions and accounts using an aggregator, which is important for organization-wide compliance dashboards.",
    security:
      "Config needs an IAM role to read resource configurations and, if delivering to S3, to write there; access to Config settings and rule results should be restricted since disabling Config would blind your compliance monitoring.",
    pricingLogic:
      "Pricing is based on the number of configuration items recorded and the number of rule evaluations performed, so cost scales with how many resources you track and how frequently their configuration changes.",
    examKeywords: [
      "configuration history",
      "compliance rules",
      "configuration item",
      "drift",
      "conformance pack",
    ],
    examTraps: [
      "Config shows the resulting configuration state, not the identity of who made the API call — that distinction is a favorite trick question.",
      "Config is about ongoing/continuous compliance checking, not a one-time security scan.",
    ],
    architectureDiagram:
      "Resource config changes\n        |\n   AWS Config records item\n        |\n   Config Rule evaluates\n     /            \\\nCompliant     Non-compliant -> SNS / Remediation",
    architectureCaption:
      "AWS Config tracks configuration history and continuously evaluates resources against rules to flag compliance drift.",
    mentorTip:
      "If a question mentions \"track configuration changes over time\" or \"check compliance against a rule continuously,\" that's Config. If it mentions \"who made the API call,\" that's CloudTrail.",
    questionIds: ["q-aws-config-1", "q-aws-config-2", "q-aws-config-3"],
  },

  {
    id: "aws-systems-manager",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "AWS Systems Manager",
    shortName: "SSM",
    tier: 2,
    domains: [2, 3],
    examImportance: "high",
    oneLiner:
      "AWS Systems Manager is a suite of tools for operationally managing your EC2 and on-premises fleet: parameters, patching, remote access, and running commands at scale.",
    englishExplanation:
      "AWS Systems Manager (SSM) bundles several operational capabilities under one roof. Parameter Store lets you centrally store configuration values and secrets (with optional KMS encryption) that your applications retrieve at runtime instead of hardcoding them. Session Manager gives you a secure, auditable shell into an EC2 instance without opening inbound SSH/RDP ports or managing key pairs — connections go through the Systems Manager service endpoint instead. Patch Manager automates applying OS and software patches across your fleet on a defined schedule. Run Command lets you execute a command or script across many instances at once without logging into each one individually.\n\nAll of this works through the SSM Agent installed on the instance (pre-installed on many AMIs) and requires the instance to have an IAM role with the appropriate SSM permissions. Because Session Manager and Run Command don't need inbound ports open, Systems Manager is a major building block for reducing your attack surface while still being able to manage instances at scale, including instances in private subnets with no direct internet access (via an SSM VPC endpoint).",
    taglishExplanation:
      "Systems Manager ay parang \"remote control panel\" para sa lahat ng EC2 instances mo. May Parameter Store para sa mga config values/secrets (di na kailangan i-hardcode sa code). May Session Manager na parang SSH pero hindi mo na kailangan buksan ang port 22 — gamit ang IAM role at SSM agent, makaka-login ka na ng secure at may log pa. May Patch Manager para sa automated patching, at Run Command para makapag-execute ka ng script sa daan-daang instances nang sabay-sabay, walang login isa-isa.",
    analogy:
      "Systems Manager is like a building facilities team with a master key system and a central intercom: they can patch every unit's locks on a schedule (Patch Manager), broadcast an instruction to every unit at once (Run Command), securely enter any unit without needing a key handed out beforehand (Session Manager), and keep a shared notice board of settings everyone can reference (Parameter Store) — all without leaving spare keys under doormats (open SSH ports).",
    whyItExists:
      "Managing dozens or thousands of servers by logging into each one individually, hardcoding secrets in code, and manually patching them does not scale and creates security risk (open SSH ports, exposed credentials). Systems Manager exists to centralize and automate fleet operations securely.",
    flow: "EC2 instance (with SSM Agent + IAM role) -> registers with Systems Manager -> admin uses Session Manager / Run Command / Patch Manager from the console or CLI -> action executed on the instance without inbound ports",
    withoutIt: [
      "You would need to open and manage SSH/RDP access (and key pairs) for every instance",
      "Patching would be manual or require a separate third-party tool",
      "Configuration values and secrets would likely end up hardcoded or duplicated across instances",
    ],
    bestUseCases: [
      "Secure shell access to instances in private subnets without a bastion host or open SSH port",
      "Centralized, encrypted storage of configuration values and secrets (Parameter Store)",
      "Fleet-wide patching on a schedule (Patch Manager) and ad-hoc command execution (Run Command)",
    ],
    poorUseCases: [
      "Managing secrets that need automatic rotation with fine-grained versioning across services — Secrets Manager may fit better for that",
      "Deep application performance tracing — that's X-Ray, not Systems Manager",
    ],
    alternatives: [
      { need: "Automatic secret rotation with native database integrations", choose: "AWS Secrets Manager" },
      { need: "Traditional bastion host SSH access", choose: "A bastion host (Session Manager is generally the more secure replacement)" },
    ],
    keyFeatures: [
      "Parameter Store: hierarchical, encryptable configuration/secret storage",
      "Session Manager: browser- or CLI-based shell access with no open inbound ports",
      "Patch Manager: scheduled OS/software patch compliance",
      "Run Command: execute scripts/commands across many instances at once",
      "State Manager: enforce a defined configuration state on instances",
    ],
    availability:
      "Systems Manager works across EC2 and on-premises/hybrid servers registered as \"managed instances,\" as long as the SSM Agent is installed and the instance has network access (direct or via VPC endpoint) to the Systems Manager service.",
    security:
      "Session Manager access is controlled by IAM policy and logged, removing the need for open SSH/RDP ports or distributed SSH keys. Parameter Store values can be encrypted with KMS and access-controlled per parameter path via IAM.",
    pricingLogic:
      "Most core Systems Manager capabilities (Session Manager, Run Command, standard Parameter Store parameters) have no additional charge beyond the underlying instance; advanced parameters and higher-throughput API usage can incur small charges.",
    examKeywords: [
      "Parameter Store",
      "Session Manager",
      "Patch Manager",
      "Run Command",
      "no open inbound ports",
      "fleet management",
    ],
    examTraps: [
      "Session Manager is the exam's preferred answer whenever a scenario wants secure access \"without opening port 22\" or \"without managing SSH keys.\"",
      "Don't confuse Parameter Store (general config/secrets, cheaper) with Secrets Manager (automatic rotation, native DB integration) — the exam tests when each is preferred.",
    ],
    architectureDiagram:
      "Admin\n  |\nSystems Manager (Session Manager / Run Command / Patch Manager)\n  |\nSSM Agent on EC2 (private subnet, no inbound ports needed)",
    architectureCaption:
      "Systems Manager reaches managed instances through the SSM Agent and an IAM role, avoiding the need for inbound SSH/RDP access.",
    mentorTip:
      "\"Manage instances in a private subnet without a bastion host\" is almost always a Session Manager answer.",
    questionIds: ["q-aws-systems-manager-1", "q-aws-systems-manager-2", "q-aws-systems-manager-3"],
  },

  {
    id: "aws-xray",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "AWS X-Ray",
    shortName: "X-Ray",
    tier: 2,
    domains: [3],
    examImportance: "high",
    oneLiner:
      "AWS X-Ray traces individual requests as they travel across the multiple services and microservices that make up a distributed application.",
    englishExplanation:
      "In a monolithic application, if something is slow, you can often find it in one place. In a distributed, microservices-based application — where a single user request might touch an API Gateway, a Lambda function, a DynamoDB table, and another downstream service — figuring out which hop is slow or failing is much harder. AWS X-Ray solves this by tracing a request end-to-end: it generates a trace with segments and subsegments showing the time spent in each component, and visualizes the whole thing as a service map.\n\nX-Ray requires light instrumentation (the X-Ray SDK or auto-instrumentation for supported services like Lambda, API Gateway, and ECS) to attach trace headers as a request flows through your system. The resulting service map makes it visually obvious where latency is concentrated or where errors are occurring, which is far faster than manually correlating logs from five different services.",
    taglishExplanation:
      "X-Ray literal na parang X-ray machine — nakikita mo ang \"loob\" ng request habang dumadaan ito sa maraming services (API Gateway, Lambda, DynamoDB, etc). Kapag mabagal ang isang request, dito mo makikita kung saang service talaga nagkaroon ng bottleneck — hindi mo na kailangan mag-check ng logs isa-isa sa bawat microservice.",
    analogy:
      "X-Ray is like a package tracking number that shows every stop the package made — the sorting facility, the regional hub, the local courier — with a timestamp at each stop. If the package arrives late, you can see exactly which stop caused the delay instead of only knowing it \"arrived late\" overall.",
    whyItExists:
      "Microservices architectures spread a single business transaction across many independently deployed services, which makes debugging latency and errors much harder than in a single application. X-Ray exists to reconstruct the full path of a request and pinpoint exactly where time is being spent or lost.",
    flow: "Client request -> API Gateway -> Lambda -> DynamoDB (each instrumented) -> X-Ray collects segments -> X-Ray console renders a service map with latency per hop",
    withoutIt: [
      "You would have to manually correlate timestamps across separate logs from each microservice",
      "Finding the specific bottleneck in a multi-service request would be slow and error-prone",
    ],
    bestUseCases: [
      "Diagnosing latency bottlenecks in a microservices or serverless architecture",
      "Visualizing dependencies between services with a service map",
      "Root-causing intermittent errors that only occur in a specific downstream call",
    ],
    poorUseCases: [
      "Simple single-instance applications with no downstream service calls to trace",
      "General infrastructure metrics/alarms — that's CloudWatch's job",
    ],
    alternatives: [
      { need: "General performance metrics and alarms", choose: "Amazon CloudWatch" },
      { need: "Third-party distributed tracing/APM", choose: "Partner tools (e.g. Datadog, New Relic) alongside or instead of X-Ray" },
    ],
    keyFeatures: [
      "End-to-end request tracing across services with segments/subsegments",
      "Visual service map showing latency and error rates per hop",
      "Sampling rules to control tracing volume/cost",
      "Integrates with Lambda, API Gateway, ECS, EC2, and more",
    ],
    availability:
      "X-Ray is a regional service; traces are collected for requests within that region's resources, and supported services can be auto-instrumented with minimal setup.",
    security:
      "Trace data access is controlled through IAM; be mindful not to log sensitive data (like PII) into trace annotations/metadata, since traces are viewable by anyone with X-Ray read permissions.",
    pricingLogic:
      "Pricing is based on the number of traces recorded and retrieved, so high-traffic systems typically use sampling rules to trace a representative subset of requests rather than every single one.",
    examKeywords: [
      "distributed tracing",
      "service map",
      "latency bottleneck",
      "microservices debugging",
      "segments and subsegments",
    ],
    examTraps: [
      "X-Ray traces requests across services; it does not replace CloudWatch's infrastructure metrics or CloudTrail's audit trail.",
      "Any scenario emphasizing \"trace a request across multiple microservices\" or \"find where latency is coming from\" points to X-Ray, not CloudWatch alone.",
    ],
    architectureDiagram:
      "Client -> API Gateway -> Lambda -> DynamoDB\n   \\________________X-Ray traces every hop________________/\n              |\n     Service map with per-hop latency",
    architectureCaption:
      "X-Ray attaches to each hop of a distributed request and reconstructs the full path with per-segment timing.",
    mentorTip:
      "Whenever the exam scenario is a microservices/serverless app and the question is about finding \"which service is causing the slowdown,\" X-Ray is the answer, not CloudWatch.",
    questionIds: ["q-aws-xray-1", "q-aws-xray-2", "q-aws-xray-3"],
  },

  {
    id: "aws-trusted-advisor",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "AWS Trusted Advisor",
    shortName: "Trusted Advisor",
    tier: 2,
    domains: [4],
    examImportance: "high",
    oneLiner:
      "AWS Trusted Advisor automatically checks your account against AWS best practices across cost, security, performance, fault tolerance, and service limits.",
    englishExplanation:
      "Trusted Advisor is an automated advisor that scans your account and reports on how well it follows AWS best practices in five categories: cost optimization (e.g. idle or underutilized resources), security (e.g. an S3 bucket with open access, MFA not enabled on the root account), performance (e.g. service usage approaching a limit), fault tolerance (e.g. no multi-AZ setup for a critical resource), and service limits/quotas (warning before you hit an account limit).\n\nThe depth of checks available depends on your AWS Support plan: a Basic/Developer support plan gets a limited set of core checks (mostly security and service limits), while Business and Enterprise support plans unlock the full set of checks across all five categories, plus programmatic access via the Support API.",
    taglishExplanation:
      "Trusted Advisor parang \"health checkup\" ng buong AWS account mo — tinitingnan niya kung sumusunod ka sa best practices sa cost, security, performance, fault tolerance, at service limits. Halimbawa, sasabihin niya kung may idle na EC2 instance na nagsasayang ng pera, o kung may S3 bucket na public na hindi dapat. Depende sa Support plan mo kung gaano kalalim ang mga check — Basic support, konti lang; Business/Enterprise, buo na.",
    analogy:
      "Trusted Advisor is like an annual physical checkup performed by a doctor who checks your heart, blood pressure, and cholesterol against known healthy ranges, and hands you a report card — but a basic checkup only screens a few vital signs, while a premium plan gets you the full panel of tests.",
    whyItExists:
      "Even experienced teams miss best practices at scale — an unused Elastic IP here, an overly permissive security group there. Trusted Advisor exists to continuously and automatically surface these issues so you don't have to manually audit every resource against every best practice.",
    flow: "Trusted Advisor scans account resources -> checks against best-practice rules in 5 categories -> flags issues with a status (green/yellow/red) -> optionally notifies via email or integrates with CloudWatch/EventBridge",
    withoutIt: [
      "Cost waste from idle/underutilized resources could go unnoticed indefinitely",
      "Common security misconfigurations might not be surfaced proactively",
      "You would need to manually check for approaching service limits",
    ],
    bestUseCases: [
      "Quick account-wide health check across cost, security, performance, and fault tolerance",
      "Catching low-hanging cost optimization opportunities (idle load balancers, unattached EBS volumes)",
      "Proactively catching resources approaching a service quota before they cause an outage",
      "Security checks like open security groups or missing root account MFA",
    ],
    poorUseCases: [
      "Deep, continuous compliance rule enforcement — AWS Config is built for that",
      "Fine-grained ML-based rightsizing recommendations — Compute Optimizer goes deeper",
    ],
    alternatives: [
      { need: "Continuous custom compliance rule checking", choose: "AWS Config" },
      { need: "ML-based rightsizing recommendations for compute", choose: "AWS Compute Optimizer" },
    ],
    keyFeatures: [
      "Five check categories: cost optimization, security, performance, fault tolerance, service limits",
      "Simple color-coded status per check (green/yellow/red)",
      "Deeper check coverage unlocked with Business/Enterprise Support plans",
      "Weekly notification emails summarizing account status",
    ],
    availability:
      "Trusted Advisor evaluates resources across your account/regions where applicable; full check coverage and programmatic API access require a paid Support plan above Basic/Developer.",
    security:
      "Trusted Advisor itself only reads configuration to generate recommendations; access to view its findings is controlled via IAM.",
    pricingLogic:
      "Trusted Advisor's core checks are included at no extra charge, but the full breadth of checks and API access require a Business or Enterprise Support plan, which carries its own separate cost.",
    examKeywords: [
      "best practice checks",
      "cost optimization",
      "security checks",
      "fault tolerance checks",
      "service limits",
      "Support plan tiers",
    ],
    examTraps: [
      "Full Trusted Advisor checks require Business or Enterprise Support — Basic/Developer support only gets limited checks.",
      "Trusted Advisor gives point-in-time best-practice recommendations; it is not a continuous compliance engine like Config.",
    ],
    architectureDiagram:
      "AWS Account Resources\n        |\n   Trusted Advisor scan\n        |\n Cost | Security | Performance | Fault Tolerance | Service Limits\n        |\n  Color-coded recommendations",
    architectureCaption:
      "Trusted Advisor scans your account across five best-practice categories and reports actionable recommendations.",
    mentorTip:
      "If a question mentions checking for idle resources, security misconfigurations, or approaching limits in one unified best-practices report, think Trusted Advisor — and remember the Support plan gating detail.",
    questionIds: ["q-aws-trusted-advisor-1", "q-aws-trusted-advisor-2", "q-aws-trusted-advisor-3"],
  },

  {
    id: "aws-compute-optimizer",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "AWS Compute Optimizer",
    shortName: "Compute Optimizer",
    tier: 3,
    domains: [4],
    examImportance: "medium",
    oneLiner:
      "AWS Compute Optimizer uses machine learning on your historical utilization data to recommend better-sized EC2, EBS, and Lambda configurations.",
    englishExplanation:
      "AWS Compute Optimizer analyzes the actual utilization history of your EC2 instances, EBS volumes, Lambda functions, and Auto Scaling groups, then uses machine learning to recommend a more cost-effective or better-performing configuration — for example, suggesting a smaller instance type if your CPU has been consistently underutilized, or a larger one if you're consistently maxed out. It's a more automated, data-driven complement to the general best-practice checks in Trusted Advisor.",
    taglishExplanation:
      "Compute Optimizer parang \"tailor\" na titingnan ang actual usage mo (hindi lang best-practice checklist) at sasabihin kung tama ba ang laki ng instance type mo. Halimbawa kung matagal nang mababa lang ang CPU usage mo, imumungkahi niyang lumipat ka sa mas maliit at mas mura na instance — gamit ang machine learning batay sa historical data.",
    analogy:
      "Compute Optimizer is like a tailor who watches how you actually move and sit for weeks before recommending a properly fitted suit size, instead of just going off a generic size chart — it bases its recommendation on your real, observed usage pattern.",
    whyItExists:
      "It's common to over-provision \"just in case\" or under-provision without realizing it, and manually analyzing weeks of CloudWatch metrics for every resource to rightsize is tedious. Compute Optimizer automates that analysis with ML so rightsizing recommendations are backed by real usage data.",
    flow: "EC2/EBS/Lambda usage metrics (via CloudWatch) -> Compute Optimizer ML analysis -> rightsizing recommendation (instance type/size, volume type, memory allocation)",
    withoutIt: [
      "Rightsizing would rely on manual analysis of CloudWatch metrics or guesswork",
      "You might keep paying for over-provisioned resources without realizing it",
    ],
    bestUseCases: [
      "Getting data-driven rightsizing recommendations for EC2 instances, EBS volumes, and Lambda memory settings",
      "Identifying consistently idle or over-provisioned resources for cost savings",
    ],
    poorUseCases: [
      "Real-time alarming or monitoring — that's CloudWatch",
      "Broad best-practice checks outside of rightsizing (security, fault tolerance) — that's Trusted Advisor",
    ],
    alternatives: [
      { need: "General account-wide best-practice checks", choose: "AWS Trusted Advisor" },
      { need: "Manual rightsizing based on raw metrics", choose: "Amazon CloudWatch metrics review" },
    ],
    keyFeatures: [
      "ML-based recommendations for EC2, EBS, Lambda, and Auto Scaling groups",
      "Estimated cost savings per recommendation",
      "Risk indicator showing likelihood the recommended change affects performance",
    ],
    availability:
      "Compute Optimizer analyzes resources across the regions where they run and requires opt-in enrollment at the account or organization level.",
    security:
      "Compute Optimizer only reads utilization metrics and resource metadata; access to its recommendations is controlled through IAM.",
    pricingLogic:
      "AWS Compute Optimizer's standard recommendations are provided at no additional charge; it reads existing CloudWatch metrics data.",
    examKeywords: ["rightsizing", "ML recommendations", "underutilized instance", "EC2/EBS/Lambda optimization"],
    examTraps: [
      "Don't confuse Compute Optimizer (ML-based rightsizing) with Trusted Advisor (broad best-practice checklist) — the exam may test the more specific ML/rightsizing angle for Compute Optimizer.",
    ],
    architectureDiagram:
      "CloudWatch utilization data\n        |\n  Compute Optimizer (ML)\n        |\nRightsizing recommendation (EC2/EBS/Lambda)",
    architectureCaption:
      "Compute Optimizer analyzes historical CloudWatch utilization data with ML to recommend better-fitted resource sizes.",
    mentorTip:
      "If the scenario specifically says \"machine learning\" and \"rightsizing based on historical utilization,\" that's Compute Optimizer, not Trusted Advisor.",
    questionIds: ["q-aws-compute-optimizer-1", "q-aws-compute-optimizer-2", "q-aws-compute-optimizer-3"],
  },

  {
    id: "aws-cloudformation",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "AWS CloudFormation",
    shortName: "CloudFormation",
    tier: 1,
    domains: [2, 4],
    examImportance: "critical",
    oneLiner:
      "AWS CloudFormation lets you define your entire infrastructure as code in a template, then create and manage it as a single, repeatable stack.",
    englishExplanation:
      "AWS CloudFormation is AWS's native Infrastructure as Code (IaC) service. Instead of clicking through the console to create a VPC, subnets, security groups, an ALB, an Auto Scaling group, and a database one by one, you describe all of it declaratively in a JSON or YAML template. CloudFormation reads the template and creates every resource in the correct order, tracking them together as a single \"stack.\" If you update the template, CloudFormation calculates a change set — exactly what would be added, modified, or replaced — and applies it in a controlled way. If something fails partway through, CloudFormation automatically rolls the stack back to its last known-good state.\n\nThe huge benefit is repeatability and consistency: the same template can spin up an identical dev, staging, and production environment, eliminating the \"it worked on my machine/environment\" class of problems caused by manual configuration drift. It also becomes a disaster recovery tool in itself — if a region or environment is lost, you can redeploy the entire infrastructure from the template in another region rather than trying to manually reconstruct it from memory or tribal knowledge.\n\nCloudFormation supports parameters (to customize a template per environment), outputs (to expose values like an ALB's DNS name for other stacks or humans to use), nested stacks (to compose large templates from smaller reusable ones), and StackSets (to deploy the same stack across multiple accounts/regions at once, important for organization-wide governance).",
    taglishExplanation:
      "CloudFormation ay \"blueprint\" ng buong infrastructure mo, nakasulat sa isang file (YAML o JSON). Sa halip na mag-click-click sa console para gawin ang VPC, EC2, database, isang beses mo lang ide-define lahat, tapos i-\"deploy\" mo bilang isang \"stack.\" Kapag kailangan mong gumawa ng parehong environment (dev, staging, prod), pare-pareho lang — kopyahin mo lang ang template. Kapag may nagbago at gusto mong i-update, kino-compute muna ni CloudFormation ang \"change set\" bago niya gawin, at kung mag-fail sa gitna, awtomatikong babalik (rollback) sa dating maayos na state.",
    analogy:
      "CloudFormation is like architectural blueprints for a house: instead of directing individual workers verbally room by room (and getting a slightly different result every time), you hand everyone the same blueprint. Need to build the exact same house again in another city? Just hand over the same blueprint — you don't have to remember every measurement and material by heart.",
    whyItExists:
      "Manually created infrastructure is fragile and inconsistent — it depends on someone remembering every click they made, and rebuilding it after a disaster or for a new environment is slow and error-prone. CloudFormation exists so infrastructure becomes versioned, reviewable, repeatable code, which drastically improves consistency, auditability, and disaster recovery speed.",
    flow: "Author a template (YAML/JSON) -> CloudFormation creates a stack -> resources provisioned in dependency order -> update template -> CloudFormation computes a change set -> apply changes (or automatic rollback on failure)",
    withoutIt: [
      "Environments would be built by hand, leading to inconsistent, undocumented configuration drift",
      "Disaster recovery would mean manually rebuilding infrastructure from memory or scattered runbooks",
      "Reviewing infrastructure changes (like a code review) would not be straightforward",
    ],
    bestUseCases: [
      "Standing up identical dev/staging/production environments repeatably",
      "Version-controlling infrastructure changes alongside application code",
      "Fast, reliable disaster recovery by redeploying a known-good template",
      "Deploying the same baseline stack across many AWS accounts/regions with StackSets",
    ],
    poorUseCases: [
      "One-off, throwaway resources where writing a template is more overhead than it's worth",
      "Teams wanting a more programming-language-native IaC experience (consider AWS CDK, which compiles to CloudFormation)",
    ],
    alternatives: [
      { need: "Write infrastructure in a general-purpose programming language", choose: "AWS Cloud Development Kit (CDK)" },
      { need: "Multi-cloud infrastructure as code", choose: "Terraform (third-party)" },
      { need: "Pre-packaged, self-service product catalog for end users", choose: "AWS Service Catalog (which can be built on CloudFormation templates)" },
    ],
    keyFeatures: [
      "Declarative templates in YAML or JSON describing all resources",
      "Stacks group resources and manage their lifecycle together",
      "Change sets preview exactly what an update will add/modify/replace before applying",
      "Automatic rollback on failed stack creation or update",
      "Nested stacks for composing large templates from smaller reusable ones",
      "StackSets to deploy the same stack across multiple accounts/regions",
      "Drift detection to identify when a resource was manually changed outside the template",
    ],
    availability:
      "Stacks are created per region; StackSets extend deployment across multiple regions and accounts, which is important for consistent multi-account governance.",
    security:
      "CloudFormation actions are controlled through IAM, and you can constrain what a stack itself is allowed to create/modify with a service role, so the people running the stack don't need the full underlying permissions themselves.",
    pricingLogic:
      "CloudFormation itself has no additional charge — you pay only for the underlying resources the template creates. StackSets and some advanced features may have minor associated costs depending on usage.",
    examKeywords: [
      "infrastructure as code",
      "template",
      "stack",
      "change set",
      "rollback",
      "repeatable environments",
      "StackSets",
    ],
    examTraps: [
      "CloudFormation is declarative infrastructure as code — it is not a monitoring, logging, or auditing tool.",
      "A failed stack update triggers automatic rollback by default; know that this is built-in behavior, not something you script yourself.",
      "Don't confuse CloudFormation (defines/provisions infrastructure) with Systems Manager (operates/manages already-running instances).",
    ],
    architectureDiagram:
      "Template (YAML/JSON)\n        |\n  CloudFormation Stack\n     /      |      \\\n   VPC   Security   EC2/ASG\n         Groups        |\n                     RDS, etc.\n(update template -> change set -> apply or rollback)",
    architectureCaption:
      "A single CloudFormation template provisions and manages an entire set of related resources together as one stack.",
    mentorTip:
      "\"Rebuild the exact same environment quickly\" or \"consistent, repeatable infrastructure\" is a strong CloudFormation (or CDK) signal — and it's a favorite for disaster recovery scenario questions.",
    questionIds: [
      "q-aws-cloudformation-1",
      "q-aws-cloudformation-2",
      "q-aws-cloudformation-3",
      "q-aws-cloudformation-4",
      "q-aws-cloudformation-5",
    ],
  },

  {
    id: "aws-organizations-control-tower-service-catalog",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "AWS Organizations, Control Tower & Service Catalog",
    shortName: "Org/Control Tower/Service Catalog",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "Organizations, Control Tower, and Service Catalog together let you centrally govern many AWS accounts: guardrails, automated setup, and a controlled self-service catalog.",
    englishExplanation:
      "As a company grows on AWS, it typically ends up with many separate AWS accounts (one per team, environment, or business unit) rather than one giant account — this limits blast radius and makes cost allocation and permission boundaries cleaner. AWS Organizations is the foundation for managing that multi-account structure: it lets you group accounts into organizational units (OUs), consolidate billing across all accounts, and — most importantly for the exam — apply Service Control Policies (SCPs). An SCP is a guardrail that sets the maximum available permissions for every account (and every IAM user/role within it) under that OU, no matter what their own IAM policies allow. SCPs cannot grant permissions by themselves; they only restrict what could otherwise be allowed.\n\nAWS Control Tower builds on top of Organizations to automate setting up a secure, well-architected multi-account environment (often called a \"landing zone\") in minutes instead of manually wiring together Organizations, SCPs, logging, and account baselines yourself. It provides pre-built guardrails (mandatory and recommended) and a dashboard for ongoing compliance visibility across all accounts, plus an Account Factory for provisioning new accounts consistently.\n\nAWS Service Catalog is a different but related governance tool: it lets you define approved, pre-configured \"products\" (usually CloudFormation templates for things like a standard VPC, an approved EC2 configuration, or a database setup) and publish them to a catalog that end users or teams can self-service launch — without needing broad IAM permissions to build the underlying resources themselves, and without deviating from your approved architecture. This is how large organizations let developers move fast while staying within governance boundaries.",
    taglishExplanation:
      "Kapag lumaki na ang company, maraming AWS accounts na ang gagamitin (isa per team o environment) sa halip na isang malaking account lang — mas ligtas at mas malinis ang billing. AWS Organizations ang \"payong\" na naghahawak sa lahat ng accounts na ito, may consolidated billing, at may Service Control Policies (SCPs) na parang \"batas\" na nagse-set ng maximum na pwedeng gawin sa bawat account — kahit anong sabihin ng IAM policy sa loob, hindi lalagpas sa hangganan ng SCP. Control Tower naman ay parang \"auto-setup wizard\" na nagbibigay ng ready-made secure na multi-account structure (\"landing zone\") kasama na ang mga guardrails, kaya hindi mo na kailangan i-configure lahat nang manual. Service Catalog naman ay parang \"approved menu\" — pwedeng mag-order ang team ng pre-configured na resources (halimbawa isang standard na VPC setup) nang hindi na kailangan buong access para gawin ito mula zero.",
    analogy:
      "Think of a franchise business: AWS Organizations is the parent company that owns every branch (account) and can impose company-wide rules (SCPs) that no branch manager can override, no matter their local authority. Control Tower is the standardized \"franchise starter kit\" that sets up a new branch correctly from day one — wiring, safety systems, signage — instead of each branch owner figuring it out themselves. Service Catalog is the approved equipment supplier list: a branch can order a fryer or a register from the approved catalog quickly, but can't just buy any random equipment off the street.",
    whyItExists:
      "Without central governance, a growing multi-account AWS environment quickly becomes inconsistent and risky — one team might accidentally leave a region enabled that should be restricted, or provision non-compliant resources. Organizations + SCPs enforce hard guardrails, Control Tower removes the manual toil of setting up that governance correctly, and Service Catalog lets you delegate self-service without giving up architectural control.",
    flow: "AWS Organizations groups accounts into OUs -> SCPs applied per OU set maximum permissions -> Control Tower automates landing zone setup and guardrails across those accounts -> Service Catalog lets end users launch approved, pre-approved products (often CloudFormation templates) within those guardrails",
    withoutIt: [
      "Every account would need governance, logging, and guardrails configured manually and inconsistently",
      "There would be no hard ceiling preventing an over-permissioned IAM policy from taking a dangerous action in some account",
      "End users would either need broad permissions to self-serve infrastructure, or be bottlenecked waiting for a central team",
    ],
    bestUseCases: [
      "Enforcing account-wide guardrails that no IAM policy can override (e.g. \"never allow leaving this AWS Region\") — SCPs via Organizations",
      "Quickly standing up a secure, compliant multi-account landing zone — Control Tower",
      "Letting developers self-service pre-approved, governed infrastructure products — Service Catalog",
      "Consolidated billing and volume discounts across many accounts — Organizations",
    ],
    poorUseCases: [
      "A single-account setup with no need for cross-account governance (Organizations/Control Tower add unnecessary overhead)",
      "Granting permissions — SCPs only restrict, they never grant access on their own",
    ],
    alternatives: [
      { need: "Grant specific permissions to a user or role", choose: "IAM policies (SCPs only set the ceiling, not the grant)" },
      { need: "Manually wire together multi-account governance from scratch", choose: "AWS Organizations + custom scripts (Control Tower automates this instead)" },
    ],
    keyFeatures: [
      "Organizations: consolidated billing, OUs, and Service Control Policies (SCPs)",
      "SCPs set the maximum permissions boundary for accounts/OUs; they never grant permissions by themselves",
      "Control Tower: automated landing zone setup, mandatory + recommended guardrails, Account Factory",
      "Service Catalog: curated, self-service catalog of approved products (often CloudFormation-based)",
      "Together they enable delegated, governed self-service at scale",
    ],
    availability:
      "Organizations and Control Tower operate at the management-account level and apply guardrails across member accounts in multiple regions; Service Catalog portfolios can be shared across accounts within an organization.",
    security:
      "SCPs are a critical security guardrail layer — since they cap what even an administrator's IAM policy can do within an account, they are commonly used to enforce things like disallowing account root user actions or restricting to approved regions. Control Tower's guardrails add further automated compliance checks.",
    pricingLogic:
      "AWS Organizations and Control Tower themselves have no direct usage fee (you pay for the underlying resources/guardrail infrastructure they provision, like CloudTrail/Config). Service Catalog is also generally low-cost for the catalog mechanism itself; you pay for whatever resources the launched products create.",
    examKeywords: [
      "Service Control Policy (SCP)",
      "multi-account governance",
      "landing zone",
      "guardrails",
      "consolidated billing",
      "self-service catalog",
    ],
    examTraps: [
      "SCPs restrict/cap permissions — they can NEVER grant a permission by themselves, even to the root user of a member account.",
      "Control Tower is built on top of Organizations, not a replacement for it — it automates and extends what Organizations provides.",
      "Service Catalog is about giving controlled self-service to end users, not about restricting permissions account-wide (that's SCPs).",
    ],
    architectureDiagram:
      "Management Account\n        |\n  AWS Organizations (OUs + SCPs)\n     /            \\\nOU: Prod         OU: Dev/Test\n   |                  |\nMember accounts   Member accounts\n(guardrails via Control Tower; self-service via Service Catalog)",
    architectureCaption:
      "Organizations structures and restricts accounts with SCPs; Control Tower automates the setup; Service Catalog lets teams self-serve approved products within those guardrails.",
    mentorTip:
      "When a question says \"prevent even an account administrator from doing X across the whole organization,\" think SCP. When it says \"quickly and consistently set up new, compliant AWS accounts,\" think Control Tower. When it says \"let developers launch pre-approved infrastructure without full IAM access,\" think Service Catalog.",
    questionIds: [
      "q-aws-organizations-control-tower-service-catalog-1",
      "q-aws-organizations-control-tower-service-catalog-2",
      "q-aws-organizations-control-tower-service-catalog-3",
      "q-aws-organizations-control-tower-service-catalog-4",
      "q-aws-organizations-control-tower-service-catalog-5",
    ],
  },

  {
    id: "aws-dms",
    moduleId: "phase-11-migration",
    category: "Migration and Transfer",
    title: "AWS Database Migration Service (DMS)",
    shortName: "DMS",
    tier: 1,
    domains: [3],
    examImportance: "critical",
    oneLiner:
      "AWS Database Migration Service migrates databases into AWS with minimal downtime, replicating ongoing changes while the source database keeps running.",
    englishExplanation:
      "AWS Database Migration Service (DMS) moves data from a source database to a target database, and its signature feature is that the source database can remain fully operational and in use throughout the migration. DMS performs a full initial load of existing data, and then continuously captures and applies ongoing changes (change data capture) from the source until you're ready to cut over — this keeps downtime to a small cutover window rather than requiring a long maintenance freeze.\n\nDMS supports two broad migration patterns. Homogeneous migrations move between the same database engine (e.g. on-premises MySQL to Amazon RDS for MySQL) — schemas are largely compatible already. Heterogeneous migrations move between different engines (e.g. on-premises Oracle to Amazon Aurora PostgreSQL), where the schema, data types, and stored procedures/functions need to be converted first — this is where the AWS Schema Conversion Tool (SCT) comes in, analyzing and converting the source schema/code into a target-compatible format before DMS handles the actual data replication. Together, SCT converts the structure and DMS moves the data.\n\nDMS itself runs as a managed replication instance in AWS; you don't need to install or manage replication software on the source or target yourself, only configure the source/target endpoints and the replication task.",
    taglishExplanation:
      "DMS ang gamit mo kapag ililipat mo ang database papuntang AWS pero ayaw mong itigil ang operations habang nagmi-migrate. Kumukuha muna siya ng buong \"snapshot\" ng existing data (full load), tapos patuloy niyang sinusundan ang mga bagong changes (ongoing replication) hanggang sa handa ka nang mag-cutover — kaya konti lang ang downtime, hindi kailangan ng matagal na \"maintenance window.\" Kung parehong engine lang (MySQL to MySQL), tinatawag itong homogeneous — diretso lang. Kung iba ang engine (Oracle to Aurora PostgreSQL), heterogeneous ito, at kailangan mo muna ng Schema Conversion Tool (SCT) para i-convert ang schema/stored procedures bago mag-migrate ng data gamit ang DMS.",
    analogy:
      "DMS is like moving into a new house while the old one is still fully furnished and lived in: movers first copy everything over (full load), then keep bringing over anything new that gets added to the old house (ongoing changes), until the day you finally flip the switch and start living in the new house exclusively (cutover) — with barely any disruption in between.",
    whyItExists:
      "Traditional database migrations often required a long maintenance window with the application offline while data was exported and imported. DMS exists to eliminate most of that downtime by replicating changes continuously, which is essential for production systems that can't tolerate long outages.",
    flow: "Source database (on-prem or cloud) -> (optional) Schema Conversion Tool converts schema for heterogeneous migration -> DMS replication instance: full load + ongoing change data capture -> Target database (e.g. RDS/Aurora) -> cutover",
    withoutIt: [
      "Database migrations would likely require a lengthy application downtime window",
      "Heterogeneous engine migrations would require painful, error-prone manual schema conversion",
      "You would need to build and manage your own replication tooling",
    ],
    bestUseCases: [
      "Migrating an on-premises or self-managed database to a managed AWS database with minimal downtime",
      "Homogeneous migrations (same engine) needing simple, reliable ongoing replication",
      "Heterogeneous migrations (different engine) paired with the Schema Conversion Tool",
      "Ongoing cross-region or cross-database replication beyond a one-time migration",
    ],
    poorUseCases: [
      "Migrating large unstructured file/object datasets — use DataSync or Snow Family instead",
      "One-time file transfers with no database structure involved",
    ],
    alternatives: [
      { need: "Convert schema/code between different database engines", choose: "AWS Schema Conversion Tool (SCT), used alongside DMS" },
      { need: "Migrate large file/object datasets rather than databases", choose: "AWS DataSync" },
      { need: "Physically move very large datasets with limited network bandwidth", choose: "AWS Snow Family" },
    ],
    keyFeatures: [
      "Minimal-downtime migration via full load plus continuous change data capture",
      "Supports homogeneous (same engine) and heterogeneous (different engine) migrations",
      "Works with many source/target combinations, including on-premises, EC2-hosted, and RDS/Aurora databases",
      "Pairs with AWS Schema Conversion Tool for heterogeneous schema/code conversion",
      "Can also be used for ongoing database replication, not just one-time migration",
    ],
    availability:
      "DMS runs as a managed replication instance within a region/VPC that you specify, and can replicate across regions or between on-premises and AWS as long as network connectivity (VPN/Direct Connect/public endpoint) exists between source and target.",
    security:
      "Connections to source and target endpoints can be encrypted in transit, and DMS supports encrypting data at rest for its replication storage; access to DMS configuration is controlled via IAM.",
    pricingLogic:
      "You pay for the DMS replication instance (compute) while the migration/replication task runs, plus any associated data transfer; there is no separate license fee for the DMS service itself for many standard migration scenarios.",
    examKeywords: [
      "minimal downtime migration",
      "homogeneous vs heterogeneous",
      "Schema Conversion Tool",
      "change data capture",
      "database migration",
    ],
    examTraps: [
      "DMS keeps the source database operational during migration — this \"minimal downtime\" phrasing is the key exam signal.",
      "Heterogeneous migrations need the Schema Conversion Tool for schema/code; DMS alone handles data replication, not schema conversion.",
      "DMS is for databases — don't pick it for bulk file/object migrations (that's DataSync or Snow Family).",
    ],
    architectureDiagram:
      "Source DB (on-prem/EC2)\n        |\n  [Schema Conversion Tool - if heterogeneous]\n        |\n   DMS Replication Instance\n   (full load + CDC)\n        |\n  Target DB (RDS / Aurora)",
    architectureCaption:
      "DMS performs an initial full load then continuously replicates ongoing changes until cutover, minimizing downtime.",
    mentorTip:
      "\"Migrate database with minimal downtime, source stays operational\" is almost always DMS. If the engines differ, remember to mention the Schema Conversion Tool too.",
    questionIds: ["q-aws-dms-1", "q-aws-dms-2", "q-aws-dms-3", "q-aws-dms-4", "q-aws-dms-5"],
  },

  {
    id: "aws-datasync",
    moduleId: "phase-11-migration",
    category: "Migration and Transfer",
    title: "AWS DataSync",
    shortName: "DataSync",
    tier: 1,
    domains: [3, 4],
    examImportance: "critical",
    oneLiner:
      "AWS DataSync automates fast, secure online transfer of large amounts of file and object data between on-premises storage and AWS, or between AWS storage services.",
    englishExplanation:
      "AWS DataSync is purpose-built for moving large datasets of files or objects online — think terabytes to petabytes of files sitting on an on-premises NFS/SMB file share or object storage, needing to land in Amazon S3, Amazon EFS, or Amazon FSx. Rather than writing custom scripts around a generic tool like rsync, DataSync uses a purpose-built agent (deployed as a VM on-premises) combined with a network-optimized, encrypted transfer protocol that automatically handles retries, validates data integrity, and can scale to use available bandwidth efficiently.\n\nDataSync also works AWS-to-AWS — for example, syncing data between two S3 buckets, or between EFS file systems, including across regions or accounts — making it useful for cross-region replication and not just initial migration. It supports both one-time transfers and scheduled, recurring syncs, which is useful for keeping an on-premises location and an AWS location incrementally in sync (only transferring changed data after the first full sync) rather than repeating a full copy every time.",
    taglishExplanation:
      "DataSync ang gamit mo kapag maraming files (hindi database) ang ililipat mo papuntang AWS — halimbawa terabytes ng files na nasa on-premises NFS/SMB file share, ililipat sa S3, EFS, o FSx. May agent siyang ini-install sa on-premises (parang VM) na kumokonekta papuntang AWS gamit ang optimized at encrypted na transfer — mas mabilis at mas reliable kaysa sa custom script o basic rsync. Puwede rin siyang gamitin sa AWS-to-AWS transfers (halimbawa S3 to S3 across regions), at puwedeng i-schedule para paulit-ulit na mag-sync, mga changed files na lang ang ililipat sa susunod na beses.",
    analogy:
      "DataSync is like hiring a professional moving company with a dedicated, optimized truck route between your old warehouse and the new one — they handle packing efficiently, verify nothing was damaged or lost in transit, and can make repeat trips carrying only the new boxes that showed up since the last trip, instead of reloading the entire warehouse every time.",
    whyItExists:
      "Manually scripting large file transfers over the internet (with retry logic, integrity checks, and bandwidth management) is time-consuming and error-prone at scale. DataSync exists to make large-scale online file/object data transfer fast, reliable, and largely hands-off.",
    flow: "On-premises NFS/SMB file share -> DataSync agent (on-prem VM) -> encrypted, optimized transfer over the network -> Amazon S3 / EFS / FSx (or AWS-to-AWS between storage services)",
    withoutIt: [
      "You would need to build and maintain custom scripts for large-scale file transfer, retries, and validation",
      "Keeping on-premises and AWS storage incrementally in sync would be manual and inefficient",
      "Transfers could be slower and less reliable than a purpose-built, network-optimized tool",
    ],
    bestUseCases: [
      "One-time or recurring migration of large file/object datasets from on-premises to AWS",
      "Ongoing incremental sync between an on-premises location and AWS storage",
      "AWS-to-AWS transfers between S3, EFS, or FSx, including across regions",
      "Situations with sufficient network bandwidth for online transfer (as opposed to physical shipping)",
    ],
    poorUseCases: [
      "Environments with very limited or no network connectivity to move huge datasets — Snow Family fits better",
      "Relational database migration — use DMS instead",
    ],
    alternatives: [
      { need: "Physically ship very large datasets when network transfer is impractical", choose: "AWS Snow Family" },
      { need: "Migrate a relational/NoSQL database rather than files", choose: "AWS Database Migration Service" },
      { need: "Managed SFTP/FTPS access to S3/EFS for external partners", choose: "AWS Transfer Family" },
    ],
    keyFeatures: [
      "Purpose-built agent for on-premises-to-AWS transfer of NFS/SMB file data",
      "Also supports AWS-to-AWS transfers between S3, EFS, and FSx",
      "Automatic encryption in transit and data integrity validation",
      "Scheduled, incremental syncs after the initial full transfer",
      "Bandwidth throttling controls to avoid saturating a network link",
    ],
    availability:
      "DataSync transfers can run between any on-premises location with network access to AWS and a supported AWS storage service in one or more regions, and it manages retries automatically if a transfer is interrupted.",
    security:
      "Data is encrypted in transit; DataSync integrates with IAM for access control and can write to encrypted S3/EFS/FSx destinations. The on-premises agent only needs outbound connectivity, reducing the need to open inbound firewall ports.",
    pricingLogic:
      "You pay per gigabyte of data copied by DataSync, in addition to any normal storage and data transfer costs on the source/destination side, which makes cost roughly proportional to how much data actually moves.",
    examKeywords: [
      "large-scale file transfer",
      "online data transfer",
      "NFS/SMB to S3/EFS",
      "incremental sync",
      "DataSync agent",
    ],
    examTraps: [
      "DataSync is for online transfer over the network — when bandwidth is too limited or the dataset too massive for that to be practical, Snow Family is the better exam answer.",
      "DataSync moves files/objects, not relational database records — don't pick it for database migration scenarios.",
    ],
    architectureDiagram:
      "On-premises NFS/SMB share\n        |\n   DataSync Agent (on-prem)\n        |\n  Encrypted transfer over network\n        |\n  Amazon S3 / EFS / FSx",
    architectureCaption:
      "DataSync's on-premises agent transfers file/object data securely and efficiently into AWS storage services, with support for recurring incremental syncs.",
    mentorTip:
      "If the scenario says \"large amounts of file data\" plus \"over the network\" plus \"needs to keep syncing periodically,\" that's DataSync. If it says \"no network bandwidth\" or \"weeks to transfer over our connection,\" think Snow Family instead.",
    questionIds: ["q-aws-datasync-1", "q-aws-datasync-2", "q-aws-datasync-3", "q-aws-datasync-4", "q-aws-datasync-5"],
  },

  {
    id: "aws-snow-family",
    moduleId: "phase-11-migration",
    category: "Migration and Transfer",
    title: "AWS Snow Family",
    shortName: "Snow Family",
    tier: 2,
    domains: [3, 4],
    examImportance: "high",
    oneLiner:
      "The AWS Snow Family provides physical, ruggedized devices to transfer very large datasets into or out of AWS when network transfer is too slow, too expensive, or not possible.",
    englishExplanation:
      "When you need to move an enormous amount of data (many terabytes to petabytes) and your network connection would take days, weeks, or longer to transfer it — or you simply have no reliable connectivity, such as a remote or disconnected site — AWS ships you a physical device instead. You load your data onto the device locally, then ship it back to AWS, which imports the data directly into services like S3. Conceptually there's a range of device sizes: a small, portable option for edge locations and modest datasets, a mid-size ruggedized option for larger on-premises datasets (often used for classic large-scale migrations), and a truck-based option for truly massive, exabyte-scale transfers where even multiple smaller devices wouldn't be practical.\n\nMany of these devices also support \"edge computing\" use cases — running compute and even machine learning inference locally on the device in disconnected or remote environments (like a ship, a factory floor, or a research station) before eventually syncing results back to AWS when connectivity is available. The core exam concept, though, is the trade-off: the Snow Family exists because sometimes \"just transfer it over the internet\" (DataSync) is genuinely worse than physically shipping a device — the classic rule of thumb is that if transferring your data online would take more than about a week, physical transfer is usually faster and more practical.",
    taglishExplanation:
      "Snow Family ang sagot kapag ang dami ng dapat mong ilipat na data ay napakalaki (terabytes hanggang petabytes) at kung susubukan mong i-upload sa internet, aabutin ng linggo o buwan — o kaya wala ka ngang maasahang internet connection sa lugar mo. Sa halip na mag-transfer online, magpapadala ang AWS ng physical device sa iyo — ilo-load mo ang data doon, ipapadala mo pabalik sa AWS, tapos doon na nila i-i-import papasok sa S3. May iba't ibang laki ng device: maliit at portable para sa mas konting data o edge locations, mas malaki para sa mas malalaking on-prem migrations, at meron pang truck-sized para sa talagang napakalaking (exabyte-scale) na datasets. May ilan ding device na puwedeng gamitin pang mag-compute sa lugar na walang internet bago i-sync pabalik sa AWS.",
    analogy:
      "The Snow Family is like deciding that mailing a hard drive by courier is faster than trying to upload the same data over a slow home internet connection — sometimes \"sneakernet\" genuinely beats the network, especially when you're talking about moving an entire library's worth of data rather than a single document.",
    whyItExists:
      "Network transfer speed has physical limits, and for truly massive datasets or poor-connectivity environments, waiting weeks for an online transfer (or having no connectivity at all) is not acceptable. The Snow Family exists to make \"sneakernet\" a first-class, secure, AWS-managed migration option.",
    flow: "AWS ships a Snow device -> you load data onto it on-premises (or run edge compute on it) -> ship the device back to AWS -> AWS imports the data into S3/other services",
    withoutIt: [
      "Extremely large migrations over a limited network connection could take weeks or months",
      "Remote or disconnected sites would have no practical way to get bulk data into AWS",
      "Edge locations without reliable connectivity could not run local compute/ML workloads tied into AWS workflows",
    ],
    bestUseCases: [
      "One-time bulk migration of very large datasets where online transfer would take too long",
      "Sites with limited, unreliable, or no internet connectivity",
      "Edge computing/ML inference in remote or disconnected environments before syncing to AWS",
      "Highly secure or air-gapped data transfer scenarios",
    ],
    poorUseCases: [
      "Smaller datasets or environments with strong network connectivity — DataSync is simpler and faster to set up",
      "Ongoing, frequent incremental syncs — a physical device isn't practical for continuous small updates",
    ],
    alternatives: [
      { need: "Ongoing online transfer with good network connectivity", choose: "AWS DataSync" },
      { need: "Database-specific migration with minimal downtime", choose: "AWS Database Migration Service" },
    ],
    keyFeatures: [
      "Range of ruggedized physical devices sized for different data volumes",
      "Some devices support local edge compute/ML inference in disconnected environments",
      "Data is encrypted on the device during transit",
      "AWS handles the import into S3 (or other services) once the device is received",
    ],
    availability:
      "Devices are shipped to your physical location and returned to an AWS facility; available device options and regions can vary, so exact availability should be checked against current AWS documentation.",
    security:
      "Data on Snow devices is encrypted, and devices are designed to be tamper-resistant/tamper-evident; chain-of-custody tracking is part of the shipping process to maintain security during physical transit.",
    pricingLogic:
      "Pricing is generally based on the device type, rental/usage duration, and any data transfer out charges, rather than a simple per-gigabyte online transfer fee — making it more predictable for very large one-time transfers.",
    examKeywords: [
      "physical data transfer",
      "no/limited network connectivity",
      "petabyte-scale migration",
      "edge computing",
      "sneakernet",
    ],
    examTraps: [
      "The classic trigger phrase is a huge dataset combined with limited bandwidth or a stated transfer time of weeks — that points to Snow Family over DataSync.",
      "Don't pick Snow Family for small datasets or when good connectivity already exists — that's needless physical logistics overhead.",
    ],
    architectureDiagram:
      "AWS ships device -> On-premises: load data (or run edge compute) -> Ship device back -> AWS imports data into S3",
    architectureCaption:
      "The Snow Family physically transports data to/from AWS when network transfer is impractical.",
    mentorTip:
      "If a scenario gives you a number like \"it would take our connection several weeks to transfer this data,\" that is your cue for the Snow Family instead of DataSync.",
    questionIds: ["q-aws-snow-family-1", "q-aws-snow-family-2", "q-aws-snow-family-3"],
  },

  {
    id: "aws-transfer-family",
    moduleId: "phase-11-migration",
    category: "Migration and Transfer",
    title: "AWS Transfer Family",
    shortName: "Transfer Family",
    tier: 3,
    domains: [3],
    examImportance: "medium",
    oneLiner:
      "AWS Transfer Family provides fully managed SFTP, FTPS, and FTP endpoints backed by Amazon S3 or Amazon EFS.",
    englishExplanation:
      "Many organizations and business partners still rely on SFTP/FTPS/FTP for exchanging files, and rebuilding those integrations is often impractical. AWS Transfer Family lets you expose a managed file transfer endpoint that speaks these familiar protocols to external users or systems, while the actual files land directly in Amazon S3 or Amazon EFS — so you get modern, durable, scalable storage on the backend without the partner needing to change how they connect at all.",
    taglishExplanation:
      "Marami pa ring partners o legacy systems ang gumagamit ng SFTP/FTPS/FTP para mag-exchange ng files. Transfer Family ang nagbibigay ng managed endpoint na parang normal na FTP/SFTP server, pero sa likod, diretso na napupunta ang files sa S3 o EFS — kaya hindi na kailangan baguhin ng partner ang paraan ng koneksyon nila, pero moderno at scalable na ang storage sa backend.",
    analogy:
      "Transfer Family is like keeping the same familiar mailbox and address for old business partners who insist on sending physical mail, while secretly routing everything that arrives straight into your modern, searchable digital filing system.",
    whyItExists:
      "Migrating every external partner off legacy file transfer protocols is often not realistic in the short term. Transfer Family exists so you can modernize your storage backend (moving to S3/EFS) without forcing every partner to change their existing SFTP/FTPS/FTP workflows.",
    flow: "External partner/system -> connects via SFTP/FTPS/FTP -> AWS Transfer Family endpoint -> file stored directly in Amazon S3 or Amazon EFS",
    withoutIt: [
      "You would need to run and maintain your own FTP/SFTP servers on EC2",
      "Modernizing storage while keeping legacy protocol compatibility would require custom integration work",
    ],
    bestUseCases: [
      "Exposing SFTP/FTPS/FTP access to external partners while storing data in S3 or EFS",
      "Retiring self-managed FTP servers in favor of a fully managed service",
    ],
    poorUseCases: [
      "Bulk, one-time large dataset migration — DataSync or Snow Family are better fits",
      "Internal application-to-application transfer where you control both ends (no legacy protocol needed)",
    ],
    alternatives: [
      { need: "Large-scale file migration over the network", choose: "AWS DataSync" },
      { need: "Physical transfer of very large datasets", choose: "AWS Snow Family" },
    ],
    keyFeatures: [
      "Managed SFTP, FTPS, and FTP(S) endpoints",
      "Backed by Amazon S3 or Amazon EFS as the storage layer",
      "Integrates with existing identity providers for user authentication",
    ],
    availability:
      "Transfer Family endpoints are deployed within a region and can be configured for high availability across multiple AZs.",
    security:
      "Supports encryption in transit (SFTP/FTPS) and integrates with IAM roles to scope exactly what each user can access in the underlying S3/EFS storage.",
    pricingLogic:
      "Pricing is based on the endpoint's provisioned hours plus the amount of data transferred, in addition to normal S3/EFS storage costs.",
    examKeywords: ["managed SFTP", "FTPS/FTP", "legacy protocol", "S3-backed file transfer"],
    examTraps: [
      "Transfer Family is about ongoing partner file exchange over legacy protocols, not bulk one-time migration — don't confuse it with DataSync or Snow Family.",
    ],
    architectureDiagram:
      "External Partner\n     |  SFTP/FTPS/FTP\nAWS Transfer Family Endpoint\n     |\n  Amazon S3 / EFS",
    architectureCaption:
      "Transfer Family exposes familiar file transfer protocols while storing data directly in S3 or EFS.",
    mentorTip:
      "\"Our partners require SFTP\" plus \"want to store the files in S3\" is the exact phrase pattern for Transfer Family.",
    questionIds: ["q-aws-transfer-family-1", "q-aws-transfer-family-2", "q-aws-transfer-family-3"],
  },

  {
    id: "aws-application-migration-service",
    moduleId: "phase-11-migration",
    category: "Migration and Transfer",
    title: "AWS Application Migration Service (MGN)",
    shortName: "MGN",
    tier: 3,
    domains: [2],
    examImportance: "medium",
    oneLiner:
      "AWS Application Migration Service (MGN) automates lift-and-shift rehosting of on-premises or cloud servers into AWS with minimal changes.",
    englishExplanation:
      "AWS Application Migration Service (MGN) is AWS's recommended lift-and-shift (rehost) migration tool: it installs a lightweight replication agent on your source servers (physical, virtual, or on another cloud), continuously replicates their disks to AWS, and lets you launch fully functional, near-identical copies of those servers as EC2 instances with minimal manual reconfiguration. This is aimed at moving servers as-is rather than re-architecting the application first.",
    taglishExplanation:
      "MGN ang gamit mo kapag \"lift-and-shift\" lang — ililipat mo lang yung mga existing servers papuntang AWS as-is, walang muna malaking pagbabago sa application. May lightweight agent na iiinstall sa source servers (on-prem man o ibang cloud), kokopyahin nito ang disks papuntang AWS nang tuloy-tuloy, at kapag handa ka na, puwede mo nang i-launch ang mga ito bilang EC2 instances na halos kaparehong-kapareho ng orihinal.",
    analogy:
      "MGN is like hiring movers who make an exact working replica of your entire office — down to the furniture arrangement — inside a new building, so employees can start working the moment they walk in, without redesigning the office layout first. Redesigning (re-architecting) can happen later, once everyone has safely moved in.",
    whyItExists:
      "Re-architecting an application before migrating is often too slow or risky for an initial move, especially under deadline pressure (like a data center exit). MGN exists to make the fastest, lowest-risk path into AWS — move first as-is, optimize/re-architect later if desired.",
    flow: "Install MGN replication agent on source servers -> continuous block-level replication to AWS -> test launch of EC2 instances -> cutover launch replaces the source servers with running EC2 instances",
    withoutIt: [
      "Lift-and-shift migrations would require manual server imaging, conversion, and configuration",
      "Cutover would likely involve more downtime and manual verification effort",
    ],
    bestUseCases: [
      "Data center exit or large-scale rehosting under time pressure",
      "Migrating servers as-is with minimal application changes before optimizing later",
    ],
    poorUseCases: [
      "Migrations that specifically require re-architecting into managed/serverless services first",
      "Pure database migrations without full server rehosting — use DMS instead",
    ],
    alternatives: [
      { need: "Migrate just a database rather than a whole server", choose: "AWS Database Migration Service" },
      { need: "Re-architect into containers/serverless during migration", choose: "Manual re-platforming (not a lift-and-shift tool)" },
    ],
    keyFeatures: [
      "Lightweight agent-based continuous block-level replication",
      "Non-disruptive test launches before final cutover",
      "Automated conversion of source servers into bootable EC2 instances",
    ],
    availability:
      "MGN replicates from source servers (on-premises, virtualized, or other clouds) into a target AWS region as long as network connectivity to the MGN service endpoint exists.",
    security:
      "Replication traffic is encrypted in transit, and access to MGN and the resulting EC2 instances is controlled via IAM, following normal EC2 security practices post-migration.",
    pricingLogic:
      "MGN itself does not charge for the replication/orchestration service during the migration window in typical usage; you pay for the underlying AWS resources used (staging storage, EC2 instances) during and after migration.",
    examKeywords: ["lift and shift", "rehost", "server replication", "data center exit"],
    examTraps: [
      "MGN rehosts whole servers as-is; it's not for database-only migrations (that's DMS) or bulk file transfer (that's DataSync/Snow Family).",
      "\"Lift and shift with minimal changes\" is the key phrase pointing to MGN over a re-architecting approach.",
    ],
    architectureDiagram:
      "Source Server (on-prem/other cloud)\n        |\n  MGN Replication Agent\n        |\n  Continuous replication to AWS\n        |\n  Test launch -> Cutover launch as EC2",
    architectureCaption:
      "MGN continuously replicates source servers so they can be launched as ready-to-run EC2 instances with minimal changes.",
    mentorTip:
      "\"Data center exit\" or \"migrate servers as-is quickly\" almost always signals Application Migration Service (MGN) for a rehost/lift-and-shift approach.",
    questionIds: ["q-aws-application-migration-service-1", "q-aws-application-migration-service-2", "q-aws-application-migration-service-3"],
  },

  {
    id: "aws-auto-scaling",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "AWS Auto Scaling",
    shortName: "Auto Scaling (unified)",
    tier: 2,
    domains: [2, 4],
    examImportance: "medium",
    oneLiner:
      "AWS Auto Scaling is a unified service for configuring automatic scaling across multiple AWS resource types at once — not just EC2 — including DynamoDB tables, Aurora Replicas, ECS services, and Spot Fleets, with an optional machine-learning \"predictive scaling\" mode.",
    englishExplanation:
      "It's easy to mix this up with EC2 Auto Scaling, so start with the distinction the exam cares about: EC2 Auto Scaling manages one thing — an Auto Scaling group of EC2 instances. AWS Auto Scaling (the underlying API is actually called Application Auto Scaling) is broader — it is the single service AWS built so that scaling policies can be defined and monitored for many different scalable resources from one place, using the same target-tracking model EC2 Auto Scaling made popular (\"keep this metric near a target value\").\n\nResources that can be scaled through AWS/Application Auto Scaling include: EC2 Auto Scaling group capacity, ECS service desired task count, DynamoDB table (or Global Secondary Index) read/write capacity, Aurora Replica count, EMR cluster instance groups, and even Spot Fleet target capacity. Rather than configuring each of these separately in its own console with its own scaling logic, you can build a single \"scaling plan\" that covers several resources at once with consistent target-tracking policies.\n\nThe other feature that sets AWS Auto Scaling apart is predictive scaling: instead of only reacting to a metric after demand has already changed (dynamic/target-tracking scaling), predictive scaling uses machine learning on historical load patterns to forecast a recurring demand curve (like a daily 9am traffic spike) and pre-launches capacity slightly ahead of time, so instances are already warm when the spike actually arrives. This is opt-in and works alongside dynamic scaling as a safety net for anything the forecast under-predicts.",
    taglishExplanation:
      "Madaling malito ito sa EC2 Auto Scaling, kaya linawin muna natin: ang EC2 Auto Scaling ay para lang sa isang bagay — sa mga EC2 instances sa loob ng isang Auto Scaling group. Ang AWS Auto Scaling naman (tinatawag ding Application Auto Scaling sa likod ng API) ay mas malawak — isa itong \"sentro\" kung saan puwede mong i-configure ang automatic scaling ng iba't ibang klaseng resources nang sabay-sabay: ECS service task count, DynamoDB read/write capacity, Aurora Replica count, EMR cluster size, at Spot Fleet capacity — gamit ang parehong \"target tracking\" na paraan (halimbawa \"panatilihin ang CPU sa 50%\").\n\nMay bonus pa itong \"predictive scaling\" — sa halip na maghintay munang tumaas ang trapiko bago mag-react (yun ang ginagawa ng normal na dynamic scaling), gumagamit ito ng machine learning para tantiyahin ang paulit-ulit na pattern ng trapiko (halimbawa laging tumataas tuwing alas-9 ng umaga) at maaga na siyang magdadagdag ng capacity bago pa man dumating ang tunay na spike, para handa na agad ang mga instance.",
    analogy:
      "EC2 Auto Scaling is like one department supervisor who only manages that department's staffing. AWS Auto Scaling is like the building's overall facilities manager, who can adjust staffing levels across several departments at once using the same simple rule (\"keep each department's workload comfortable\") — and who also glances at the calendar to know a big event is coming next Tuesday, so extra staff are already scheduled before the crowd shows up, instead of scrambling to call people in after the line is already out the door.",
    whyItExists:
      "As more AWS services (DynamoDB, ECS, Aurora, EMR, Spot Fleet) each grew their own scaling knobs, there was no single place to define consistent target-tracking policies across them, and no way to get ahead of predictable demand instead of only reacting to it. AWS Auto Scaling exists to unify that scaling experience and add forecast-based predictive scaling on top of reactive scaling.",
    flow: "Choose resources to include in a scaling plan (EC2 ASG, ECS service, DynamoDB table, Aurora Replicas, Spot Fleet, etc.) -> define a target-tracking metric per resource -> (optionally) enable predictive scaling for EC2 -> AWS Auto Scaling adjusts capacity automatically as load changes or as forecasted",
    withoutIt: [
      "Each scalable resource type must be configured and monitored separately, with inconsistent scaling logic across services",
      "Scaling is purely reactive — capacity is only added after a metric crosses a threshold, so brief cold-start delays can hit users right as a predictable spike begins",
      "No single dashboard to review scaling activity across multiple resource types at once",
    ],
    bestUseCases: [
      "Coordinating target-tracking scaling policies across several different resource types (EC2, ECS, DynamoDB, Aurora, Spot Fleet) from one scaling plan",
      "Workloads with a known, recurring demand pattern (daily/weekly traffic curve) that can benefit from predictive scaling pre-launching EC2 capacity ahead of time",
      "DynamoDB tables or Aurora clusters that need their capacity/replica count to track load automatically without manual intervention",
    ],
    poorUseCases: [
      "A single EC2 fleet with simple, reactive scaling needs — plain EC2 Auto Scaling groups already cover this without the extra scaling-plan layer",
      "Workloads with no predictable pattern and no need to coordinate scaling across multiple resource types",
    ],
    alternatives: [
      { need: "Scale only one EC2 fleet reactively", choose: "EC2 Auto Scaling group directly" },
      { need: "Automatic read/write capacity scaling for a DynamoDB table", choose: "DynamoDB Auto Scaling (built on the same Application Auto Scaling API)" },
      { need: "Get ahead of a known, recurring demand pattern", choose: "AWS Auto Scaling predictive scaling for EC2" },
    ],
    keyFeatures: [
      "Unified scaling plans spanning EC2, ECS, DynamoDB, Aurora Replicas, EMR, and Spot Fleet",
      "Target-tracking scaling policies (\"keep this metric near a target value\") shared across resource types",
      "Predictive scaling using machine learning to forecast recurring demand and pre-launch EC2 capacity",
      "Single dashboard for reviewing scaling activity and forecasts across resources",
    ],
    availability:
      "A regional, fully managed control-plane service; it configures scaling policies on the underlying resources but does not itself need to be provisioned or scaled.",
    security:
      "IAM controls who can create or modify scaling plans; the underlying scaling actions on each resource are performed via service-linked roles scoped to that resource type.",
    pricingLogic:
      "There is no additional charge for using AWS Auto Scaling itself — you only pay for the underlying resources (EC2 instances, DynamoDB capacity, Aurora Replicas, etc.) that it scales for you.",
    examKeywords: [
      "unified scaling across services",
      "scaling plan",
      "predictive scaling",
      "target tracking",
      "scale DynamoDB/ECS/Aurora Replicas automatically",
    ],
    examTraps: [
      "If a scenario mentions scaling something other than plain EC2 instances — DynamoDB capacity, ECS task count, Aurora Replica count, Spot Fleet — the answer is AWS Auto Scaling (Application Auto Scaling), not EC2 Auto Scaling.",
      "\"Predictive scaling based on historical patterns\" is a distinguishing phrase for AWS Auto Scaling; plain EC2 Auto Scaling target tracking is reactive only.",
      "AWS Auto Scaling doesn't replace EC2 Auto Scaling groups — it can manage an existing ASG's capacity as one of several resources in a scaling plan.",
    ],
    architectureDiagram:
      "Scaling Plan\n  |-- EC2 Auto Scaling group (target tracking + predictive scaling)\n  |-- ECS service (desired task count)\n  |-- DynamoDB table (read/write capacity)\n  |-- Aurora Replica count\n  |-- Spot Fleet target capacity",
    architectureCaption:
      "One AWS Auto Scaling plan can coordinate target-tracking policies across several different resource types at once.",
    mentorTip:
      "Say this pair out loud until it sticks: \"EC2 Auto Scaling scales EC2. AWS Auto Scaling scales almost everything else too, plus it can predict demand before it happens.\"",
    questionIds: ["q-aws-auto-scaling-1", "q-aws-auto-scaling-2", "q-aws-auto-scaling-3"],
  },
];
