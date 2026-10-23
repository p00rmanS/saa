import type { Lesson } from "@/lib/types";

export const deepDivesI: Lesson[] = [
  {
    id: "cloudtrail-config-event-types",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "CloudTrail and Config in Depth: Event Types, Organization Trails and Rules",
    shortName: "CloudTrail & Config",
    tier: 1,
    domains: [1, 2],
    examImportance: "high",
    oneLiner:
      "CloudTrail records who called which API, Config records what your resources look like and whether they follow your rules, and each has settings the exam likes to test.",
    englishExplanation:
      "AWS CloudTrail records API activity. Management events (control-plane actions such as creating a bucket or changing a security group) are recorded by default and are visible for 90 days in Event history. Data events (data-plane actions such as S3 object reads and writes or Lambda invocations) are off by default, are high volume and are charged. Insights events detect unusual API activity such as a sudden spike in resource provisioning. To keep records beyond 90 days you create a trail that delivers logs to S3 and optionally to CloudWatch Logs. A multi-Region trail captures all Regions, and an organization trail created from the management account captures every member account. Log file integrity validation produces signed digest files so you can prove logs were not altered. Protect the destination bucket with a restrictive policy, encryption and MFA delete or Object Lock. CloudTrail Lake offers managed storage and SQL queries over events.\n\nAWS Config records the configuration of resources over time as configuration items and keeps a timeline, so you can see what a security group looked like last Tuesday. Config rules evaluate resources against desired settings, either AWS managed rules such as checking that S3 buckets are not public and that volumes are encrypted, or custom rules using Lambda. Non-compliant resources can be remediated automatically using Systems Manager Automation documents. Conformance packs bundle rules and remediation as a deployable unit, and an aggregator collects Config data from multiple accounts and Regions into one view.\n\nThe exam distinction is purpose. CloudTrail answers who did what, when and from where, which is audit and forensics. Config answers what is the state of the resource now and over time, and is it compliant. CloudWatch answers how is it performing. Config rules detect after a change and can remediate, while preventive control comes from IAM policies and service control policies.",
    taglishExplanation:
      "Ang CloudTrail ay nagtatala ng API activity. Ang management events (control-plane) ay nire-record bilang default at makikita sa Event history ng 90 araw. Ang data events (S3 object read/write, Lambda invoke) ay naka-off bilang default at may bayad. Ang Insights events ay nakakahanap ng kakaibang API activity. Para tumagal ang record, gumawa ng trail papunta sa S3. Ang multi-Region trail ay sumasakop sa lahat ng Region, at ang organization trail ay sa lahat ng member account. Ang log file validation ay nagpapatunay na hindi binago ang logs. Ang Config naman ay nagtatala ng configuration ng resources sa paglipas ng panahon at may rules na nagche-check ng compliance at puwedeng awtomatikong mag-remediate gamit ang Systems Manager Automation. Ang CloudTrail ay para sa 'sino ang gumawa', ang Config ay para sa 'ano ang estado at compliant ba'.",
    analogy:
      "CloudTrail is the building's visitor and keycard log: who opened which door, at what time and from where. Config is the building inspector's photo album of every room over time, with a checklist that flags a room when it stops meeting the fire code and can send a maintenance crew to fix it.",
    whyItExists:
      "Security investigations, audits and change management need a trustworthy record of actions and of resource state, kept outside the resources themselves.",
    flow: "API call -> CloudTrail event -> trail -> S3 (+ CloudWatch Logs) ; resource change -> Config item -> Config rule evaluation -> non-compliant -> remediation action",
    withoutIt: [
      "You could not determine who deleted a resource or changed a policy",
      "Configuration drift would go unnoticed until something broke",
      "Auditors could not see the history of a resource's settings",
    ],
    bestUseCases: [
      "An organization trail to log all accounts into a central, protected S3 bucket",
      "Data events for sensitive S3 buckets and Lambda functions that need object-level audit",
      "Log file validation for tamper-evident logs",
      "Config managed rules for encryption and public-access checks with automatic remediation",
      "Aggregators and conformance packs for multi-account compliance",
    ],
    poorUseCases: [
      "Relying on Event history alone for long-term retention",
      "Enabling data events on everything without considering volume and cost",
      "Using Config rules as the only preventive control",
      "Using CloudWatch metrics to find out who made a change",
    ],
    alternatives: [
      { need: "Prevent actions before they happen", choose: "IAM policies and service control policies" },
      { need: "Compliance evidence for audits", choose: "AWS Audit Manager" },
      { need: "Detect threats from the logs automatically", choose: "Amazon GuardDuty" },
      { need: "Performance metrics and alarms", choose: "Amazon CloudWatch" },
    ],
    keyFeatures: [
      "Management events on by default, 90 days in Event history",
      "Data events off by default, Insights events for unusual activity",
      "Trails to S3 and CloudWatch Logs, multi-Region and organization trails",
      "Log file integrity validation with signed digests",
      "CloudTrail Lake for managed storage and SQL queries",
      "Config configuration items and resource timeline",
      "Config managed and custom rules, remediation through Systems Manager Automation, conformance packs and aggregators",
    ],
    availability:
      "Both are managed Regional services. Deliver logs to a bucket in a separate, locked-down account so a compromised workload account cannot erase evidence.",
    security:
      "Encrypt trail logs with KMS, restrict the bucket policy to CloudTrail, enable log file validation and consider Object Lock for retention.",
    pricingLogic:
      "The first copy of management events per Region is free in a trail. Data events, Insights, additional trails, CloudTrail Lake and Config items and rule evaluations are charged, so scope them to what you need.",
    examKeywords: [
      "who made the API call",
      "audit all accounts",
      "log file validation",
      "data events",
      "configuration history",
      "compliance rule",
      "auto-remediate",
      "organization trail",
    ],
    examTraps: [
      "CloudTrail data events (S3 objects, Lambda invokes) are not on by default.",
      "Event history only goes back 90 days. A trail to S3 is needed for longer retention.",
      "Config detects and can remediate after the fact. It does not block the change. SCPs and IAM do that.",
      "CloudTrail is who did what. Config is what the resource looks like. Do not swap them.",
    ],
    architectureDiagram: `All accounts --> [Organization trail] --> [S3 audit bucket (log validation, KMS)] --> Athena / CloudTrail Lake
Resource change --> [Config item + timeline] --> [Config rule: s3-bucket-public-read-prohibited]
                                  | non-compliant --> [SSM Automation remediation]
Aggregator: all accounts and Regions in one view`,
    architectureCaption: "One trail records actions everywhere. Config records state and checks compliance.",
    mentorTip:
      "Read the verb. 'Who' or 'which IP' is CloudTrail. 'What did it look like' or 'is it compliant' is Config.",
    questionIds: [
      "q-cloudtrail-config-event-types-1",
      "q-cloudtrail-config-event-types-2",
      "q-cloudtrail-config-event-types-3",
    ],
  },
  {
    id: "security-services-decision-guide",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "Which Security Service? GuardDuty, Inspector, Macie, Security Hub, Detective and Friends",
    shortName: "Security service guide",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "Each AWS security service answers a different question, and the exam is mostly about matching the question to the service.",
    englishExplanation:
      "Amazon GuardDuty is threat detection. It analyses CloudTrail events, VPC Flow Logs and DNS logs, with optional protection for S3, EKS and malware, to find compromised instances, unusual API calls and communication with known malicious addresses. It needs no agents. Amazon Inspector is vulnerability management: it scans EC2 instances, container images in ECR and Lambda functions for software vulnerabilities and unintended network exposure. Amazon Macie finds sensitive data such as personal information in S3 using machine learning and pattern matching. AWS Security Hub aggregates and prioritises findings from GuardDuty, Inspector, Macie, Firewall Manager and others, and checks accounts against standards such as the AWS Foundational Security Best Practices and CIS benchmarks. Amazon Detective helps investigate a finding by building a graph of related activity so you can find the root cause.\n\nThe protection services sit at the edge and network. AWS WAF filters web requests by rules, AWS Shield protects against DDoS, AWS Network Firewall filters VPC traffic with stateful and stateless rules and intrusion prevention, and AWS Firewall Manager applies WAF, Shield Advanced, security group and Network Firewall policies across accounts in an organization. The governance services record and control: CloudTrail logs API calls, Config tracks configuration and compliance, IAM Access Analyzer finds resources shared outside your account, Artifact provides AWS compliance reports and Audit Manager collects evidence for your audits. Key and secret services are KMS and CloudHSM for keys, Secrets Manager for credentials and ACM for certificates.\n\nA useful sequence is prevent (IAM, SCPs, WAF, Network Firewall, security groups), detect (GuardDuty, Inspector, Macie, Config, Security Hub), investigate (Detective, CloudTrail) and respond (EventBridge rules triggering Lambda or Systems Manager). The exam describes a need in one sentence, so memorise the one-sentence purpose of each service.",
    taglishExplanation:
      "Ang GuardDuty ay threat detection: sinusuri nito ang CloudTrail, VPC Flow Logs, at DNS logs para makahanap ng compromised na instance at kakaibang API calls, walang agent. Ang Inspector ay vulnerability management para sa EC2, container images sa ECR, at Lambda. Ang Macie ay naghahanap ng sensitibong data tulad ng personal information sa S3. Ang Security Hub ay nag-a-aggregate ng findings at nagche-check ng standards. Ang Detective ay tumutulong mag-imbestiga ng root cause. Sa proteksyon: WAF para sa web requests, Shield para sa DDoS, Network Firewall para sa VPC traffic, at Firewall Manager para sa central policies sa maraming account. Gawing sunod-sunod: prevent, detect, investigate, respond.",
    analogy:
      "A shopping mall's security team. Guards watching cameras for suspicious behaviour (GuardDuty), a safety inspector checking for faulty wiring (Inspector), someone scanning bags for confidential documents (Macie), a control room that gathers every alert on one screen (Security Hub), an investigator who reviews footage to find how a theft happened (Detective), and barriers and turnstiles at the doors (WAF, Shield, Network Firewall).",
    whyItExists:
      "Security work spans prevention, detection, investigation and response across many accounts. Purpose-built services let teams enable each capability without building scanners and analytics themselves.",
    flow: "Logs and resources -> GuardDuty / Inspector / Macie findings -> Security Hub (aggregate) -> Detective (investigate) -> EventBridge -> Lambda / Systems Manager (respond)",
    withoutIt: [
      "Threats such as credential misuse would go unnoticed",
      "Vulnerable software and exposed data would be found only after an incident",
      "Findings would be scattered across accounts and consoles",
    ],
    bestUseCases: [
      "GuardDuty enabled in every account and Region for baseline threat detection",
      "Inspector for continuous vulnerability scanning of EC2, ECR and Lambda",
      "Macie on buckets that may contain personal data",
      "Security Hub as the central dashboard across the organization",
      "Detective to trace the cause of a GuardDuty finding",
    ],
    poorUseCases: [
      "Expecting GuardDuty to block traffic (it detects and alerts)",
      "Using Inspector to find sensitive data in S3 (that is Macie)",
      "Using Macie to detect compromised instances (that is GuardDuty)",
      "Relying on detection services with no response automation",
    ],
    alternatives: [
      { need: "Block web exploits", choose: "AWS WAF" },
      { need: "Central firewall policies across accounts", choose: "AWS Firewall Manager" },
      { need: "Who made an API call", choose: "AWS CloudTrail" },
      { need: "Resources shared outside the account", choose: "IAM Access Analyzer" },
    ],
    keyFeatures: [
      "GuardDuty: threat detection from CloudTrail, VPC Flow Logs and DNS logs, agentless",
      "Inspector: vulnerability scanning of EC2, ECR images and Lambda",
      "Macie: sensitive data discovery in S3",
      "Security Hub: aggregate findings, security standards checks",
      "Detective: investigation graph and root cause analysis",
      "WAF, Shield, Network Firewall and Firewall Manager for protection",
      "Findings can trigger EventBridge for automated response",
    ],
    availability:
      "These are managed services. Enable them in every Region you use and designate a delegated administrator account in Organizations for central management.",
    security:
      "Use a delegated administrator and a separate security account, encrypt findings and restrict who can suppress or archive them.",
    pricingLogic:
      "Most are priced by the volume analysed (events, scanned instances or images, data scanned). Enabling them everywhere has a cost, so use the free trials to estimate it.",
    examKeywords: [
      "threat detection",
      "vulnerability scanning",
      "sensitive data in S3",
      "aggregate findings",
      "investigate root cause",
      "compromised instance",
      "personally identifiable information",
      "central firewall policy",
    ],
    examTraps: [
      "GuardDuty detects threats. It does not scan software for vulnerabilities (Inspector) or find PII (Macie).",
      "Security Hub aggregates findings. It does not generate the threat detections itself.",
      "Detective investigates. GuardDuty alerts.",
      "WAF filters web requests. Network Firewall filters VPC traffic. Shield handles DDoS.",
    ],
    architectureDiagram: `PREVENT: IAM, SCPs, WAF, Network Firewall, security groups
DETECT : GuardDuty (threats) | Inspector (vulnerabilities) | Macie (sensitive data) | Config (drift)
AGGREGATE: Security Hub  -->  INVESTIGATE: Detective, CloudTrail
RESPOND: EventBridge --> Lambda / Systems Manager Automation`,
    architectureCaption: "Prevent, detect, aggregate, investigate and respond, each with its own service.",
    mentorTip:
      "Memorise one verb per service: GuardDuty detects threats, Inspector scans vulnerabilities, Macie finds sensitive data, Security Hub aggregates, Detective investigates.",
    questionIds: [
      "q-security-services-decision-guide-1",
      "q-security-services-decision-guide-2",
      "q-security-services-decision-guide-3",
    ],
  },
  {
    id: "waf-shield-ddos-resilience",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "Defending Against DDoS and Web Exploits: WAF, Shield and Resilient Design",
    shortName: "DDoS and WAF design",
    tier: 1,
    domains: [1, 2],
    examImportance: "high",
    oneLiner:
      "Absorb attacks at the edge, filter bad requests with WAF, hide your origin and let the architecture scale, and use Shield Advanced when the stakes are high.",
    englishExplanation:
      "AWS WAF is a web application firewall. You create a web ACL containing rules and attach it to a CloudFront distribution, an Application Load Balancer, an API Gateway REST API, an AppSync API or a Cognito user pool. Rules can match IP addresses, geography, headers, query strings and body content, and managed rule groups from AWS and partners cover common threats such as SQL injection, cross-site scripting and known bad inputs. Rate-based rules block clients that send too many requests in a window, which helps against application-layer floods and brute-force attempts. Bot Control and CAPTCHA address automated traffic.\n\nAWS Shield protects against distributed denial of service attacks. Shield Standard is automatic and free for all customers and defends against common network and transport layer (layer 3 and 4) attacks. Shield Advanced is a paid subscription that adds enhanced detection and mitigation for protected resources such as CloudFront, Route 53, Global Accelerator, Elastic IP addresses and load balancers, access to the Shield Response Team, application-layer protection when combined with WAF, and cost protection that can credit scaling charges caused by an attack. AWS Firewall Manager applies WAF and Shield Advanced policies across accounts.\n\nThe resilient design follows the DDoS reference architecture. Put CloudFront and Route 53 at the edge so attack traffic is absorbed across a global network and cached content never reaches the origin. Use an Application Load Balancer behind Auto Scaling so the origin scales. Restrict the origin so that only CloudFront can reach it, using the CloudFront managed prefix list or a secret header, and keep instances in private subnets. Limit exposed ports with security groups, and use WAF rate-based rules and managed rules at the edge. Monitor with CloudWatch alarms and use Shield Advanced metrics.",
    taglishExplanation:
      "Ang AWS WAF ay web application firewall. Gagawa ka ng web ACL na may mga rules at ikakabit sa CloudFront, ALB, API Gateway REST API, AppSync, o Cognito user pool. Puwedeng tumugma ang rules sa IP, bansa, header, query string, at body, at may managed rule groups para sa SQL injection at XSS. Ang rate-based rule ay nagba-block ng client na sobra ang request. Ang Shield Standard ay awtomatiko at libre laban sa layer 3 at 4 na atake; ang Shield Advanced ay bayad, may Shield Response Team, proteksyon sa layer 7 kasama ang WAF, at cost protection. Sa disenyo: CloudFront at Route 53 sa edge, ALB na may Auto Scaling, at i-restrict ang origin para CloudFront lang ang makakapasok.",
    analogy:
      "A concert venue defending against a stampede. Crowd barriers far from the building spread the pressure (CloudFront and Route 53), ticket checkers turn away troublemakers and anyone trying to enter too many times (WAF and rate rules), a free standard security team handles everyday crowds (Shield Standard), and a paid specialist team and insurance cover the biggest events (Shield Advanced). The back door is locked from the outside (origin restriction).",
    whyItExists:
      "Attackers can overwhelm applications with traffic or exploit web vulnerabilities. Layered, edge-first defences keep applications available and limit the damage and cost of attacks.",
    flow: "Internet -> Route 53 / CloudFront (Shield, WAF web ACL) -> ALB (private origin, only CloudFront allowed) -> Auto Scaling instances in private subnets",
    withoutIt: [
      "Floods would hit the origin directly and exhaust it",
      "SQL injection and bot traffic would reach application code unfiltered",
      "An attack could create a very large scaling bill with no recourse",
    ],
    bestUseCases: [
      "WAF managed rules and rate-based rules in front of CloudFront or an ALB",
      "Shield Advanced for internet-facing, business-critical applications",
      "Firewall Manager to enforce WAF policies across an organization",
      "CloudFront with an origin that accepts traffic only from CloudFront",
      "Geo restriction or geo-match rules to block unneeded regions",
    ],
    poorUseCases: [
      "Relying on security groups alone against application-layer attacks",
      "Exposing the ALB or instance public IPs directly while also using CloudFront",
      "Buying Shield Advanced for a low-risk internal tool",
      "Using WAF to protect an EC2 instance directly (attach it to a supported front end)",
    ],
    alternatives: [
      { need: "Filter VPC network traffic with intrusion prevention", choose: "AWS Network Firewall" },
      { need: "Central policy management across accounts", choose: "AWS Firewall Manager" },
      { need: "Detect threats rather than block them", choose: "Amazon GuardDuty" },
      { need: "Static anycast IPs with DDoS absorption", choose: "AWS Global Accelerator" },
    ],
    keyFeatures: [
      "WAF web ACLs with managed rule groups, custom rules, rate-based rules, Bot Control and CAPTCHA",
      "WAF attaches to CloudFront, ALB, API Gateway REST, AppSync and Cognito user pools",
      "Shield Standard: automatic layer 3 and 4 protection, no charge",
      "Shield Advanced: Shield Response Team, enhanced detection, cost protection, layer 7 with WAF",
      "Firewall Manager for organization-wide policies",
      "Edge-first architecture with CloudFront and Route 53",
      "Origin restriction with managed prefix list or secret header",
    ],
    availability:
      "CloudFront, Route 53 and Global Accelerator absorb attacks across the global edge network, and Auto Scaling lets the origin handle legitimate surges.",
    security:
      "Combine WAF at the edge with security groups, private subnets and least-privilege access. Log WAF requests to S3, CloudWatch Logs or Data Firehose for analysis.",
    pricingLogic:
      "WAF charges per web ACL, per rule and per million requests. Shield Standard is free, while Shield Advanced has a monthly fee plus data transfer, and includes WAF fees for protected resources.",
    examKeywords: [
      "DDoS",
      "SQL injection",
      "cross-site scripting",
      "rate-based rule",
      "block by country",
      "Shield Response Team",
      "layer 7 attack",
      "protect the origin",
    ],
    examTraps: [
      "Shield Standard covers layers 3 and 4 and is on by default. Layer 7 protection needs WAF.",
      "Shield Advanced adds the Response Team and cost protection, and is not free.",
      "WAF cannot be attached directly to EC2 or to a Network Load Balancer.",
      "Hiding the origin matters. A public origin lets attackers bypass CloudFront and WAF.",
    ],
    architectureDiagram: `Users/attackers --> [Route 53] --> [CloudFront + WAF web ACL + Shield]
                               |   (cache hits never reach origin)
                       [ALB: accepts only CloudFront prefix list]
                               |
                    [Auto Scaling instances in private subnets]`,
    architectureCaption: "Attacks are absorbed or filtered at the edge, and the origin stays hidden and elastic.",
    mentorTip:
      "Match the layer: network and transport floods are Shield, web exploits and request floods are WAF, and the best defence is an edge-first architecture.",
    questionIds: [
      "q-waf-shield-ddos-resilience-1",
      "q-waf-shield-ddos-resilience-2",
      "q-waf-shield-ddos-resilience-3",
    ],
  },
  {
    id: "event-driven-service-selection",
    moduleId: "phase-6-integration",
    category: "Application Integration",
    title: "Choosing Between SQS, SNS, EventBridge, Kinesis, Amazon MQ and Step Functions",
    shortName: "Messaging decision guide",
    tier: 1,
    domains: [2, 3],
    examImportance: "critical",
    oneLiner:
      "Queue for work, topic for fan-out, event bus for routing, stream for ordered replayable data, broker for legacy protocols, workflow for multi-step logic.",
    englishExplanation:
      "Six services cover messaging and workflow, and the exam asks you to pick one from a description. Amazon SQS is a queue: producers add messages, consumers pull and delete them, which decouples and buffers work and lets consumers scale independently. Amazon SNS is publish and subscribe: one message is pushed to many subscribers such as SQS queues, Lambda functions, HTTP endpoints, email and SMS, and the SNS to SQS fan-out pattern combines both. Amazon EventBridge is an event bus: it receives events from AWS services, your applications and SaaS partners and routes them to targets by content-based rules, with schema discovery, scheduling and archive and replay. Amazon Kinesis Data Streams is for ordered, replayable streams of records that several consumers read in real time. Amazon MQ is a managed ActiveMQ or RabbitMQ broker for applications that already speak JMS, AMQP, MQTT or STOMP and cannot be rewritten. AWS Step Functions orchestrates multi-step workflows with branching, parallel steps, retries and error handling.\n\nA quick way to decide is to ask the shape of the problem. Many messages for one worker pool with retries and buffering means SQS. One event, many independent reactions means SNS, or EventBridge when you need rule-based routing, SaaS sources or schema management. A continuous high-volume stream where order and replay matter, or multiple consumers need the same data, means Kinesis Data Streams. Migrating an existing broker-based application unchanged means Amazon MQ. A business process with several steps and decisions means Step Functions. For ordering and exactly-once processing in a queue, use SQS FIFO.\n\nSome distinctions recur. SQS is pull-based and SNS is push-based. SQS messages are consumed by one consumer, while SNS delivers to all subscribers. EventBridge routes by content, SNS filters by message attributes or body. Kinesis retains records for replay, while SQS deletes messages after processing. Step Functions coordinates other services and is not a message transport.",
    taglishExplanation:
      "Anim na service ang sakop ng messaging at workflow. Ang SQS ay queue: nagdaragdag ang producer, humihila at nagbubura ang consumer, kaya na-de-decouple at nabu-buffer ang trabaho. Ang SNS ay publish/subscribe: isang mensahe, maraming subscriber. Ang EventBridge ay event bus na nagro-route ng events ayon sa content-based rules, kasama ang SaaS partners, schema discovery, at archive at replay. Ang Kinesis Data Streams ay para sa ordered at replayable na stream na binabasa ng maraming consumer. Ang Amazon MQ ay para sa legacy na app na gumagamit ng JMS, AMQP, MQTT o STOMP. Ang Step Functions ay nag-o-orchestrate ng multi-step workflow na may retries at error handling. Para sa ordering at exactly-once sa queue, SQS FIFO.",
    analogy:
      "A post office with different services. SQS is a mailbox that holds letters until a clerk is ready. SNS is a loudspeaker that tells everyone subscribed. EventBridge is the sorting office that reads each parcel's label and sends it to the right department. Kinesis is a conveyor belt with recorded history that many workers can rewind and re-read. Amazon MQ is the old-fashioned pneumatic tube system that legacy offices still rely on. Step Functions is the manager's checklist for a multi-step job.",
    whyItExists:
      "Modern applications are built from loosely coupled parts, and each coupling style (buffering, fan-out, routing, streaming, legacy compatibility, orchestration) needs a different tool.",
    flow: "Choose by shape: work buffer (SQS), broadcast (SNS), routed events (EventBridge), ordered stream (Kinesis), legacy broker (MQ), multi-step process (Step Functions)",
    withoutIt: [
      "Components would call each other directly and fail together",
      "Fan-out and routing would need custom code",
      "Legacy broker applications could not move without a rewrite",
    ],
    bestUseCases: [
      "SQS to absorb spikes between a web tier and workers",
      "SNS to SQS fan-out so several systems process each order independently",
      "EventBridge to react to AWS service events and SaaS events with rules",
      "Kinesis Data Streams for clickstream with multiple real-time consumers and replay",
      "Amazon MQ for lift and shift of ActiveMQ or RabbitMQ applications",
      "Step Functions to coordinate a multi-step order workflow with retries",
    ],
    poorUseCases: [
      "SQS when many subscribers need the same message (use SNS or EventBridge)",
      "SNS when you need buffering and retries for a slow consumer (add SQS)",
      "Kinesis for simple task queues with no replay or ordering need",
      "Amazon MQ for new cloud-native builds",
    ],
    alternatives: [
      { need: "Exactly-once, strictly ordered queue", choose: "SQS FIFO" },
      { need: "Kafka-compatible streaming", choose: "Amazon MSK" },
      { need: "Stream delivery to S3 with no consumer code", choose: "Amazon Data Firehose" },
      { need: "Schedule events or invoke targets on a timer", choose: "EventBridge Scheduler" },
    ],
    keyFeatures: [
      "SQS: pull queue, decouple and buffer, Standard or FIFO, DLQ",
      "SNS: push pub/sub to many protocols, filtering, FIFO topics",
      "EventBridge: event bus, content-based rules, SaaS and AWS sources, archive and replay, schemas",
      "Kinesis Data Streams: ordered by shard, retention and replay, multiple consumers",
      "Amazon MQ: managed ActiveMQ and RabbitMQ for JMS, AMQP, MQTT, STOMP",
      "Step Functions: orchestration with state machines, retries and error handling",
      "SNS to SQS fan-out is a standard pattern",
    ],
    availability:
      "All are managed, multi-AZ services (Amazon MQ offers a multi-AZ broker option). Design consumers to be idempotent because delivery is at least once for most of them.",
    security:
      "Use IAM and resource policies, encrypt with KMS, and use VPC endpoints for private access. Cross-account delivery needs resource policies on the receiving queue or topic.",
    pricingLogic:
      "SQS, SNS and EventBridge charge per request or event, Kinesis charges per shard or throughput, Amazon MQ charges per broker hour, and Step Functions charges per state transition (Standard) or per request and duration (Express).",
    examKeywords: [
      "decouple",
      "fan-out",
      "content-based routing",
      "replay",
      "ordered stream",
      "JMS or AMQP",
      "orchestrate workflow",
      "SaaS events",
    ],
    examTraps: [
      "SNS delivers to all subscribers. An SQS message is processed by one consumer.",
      "If the application already uses JMS, AMQP or MQTT and cannot change, the answer is Amazon MQ.",
      "SQS cannot replay processed messages. Kinesis can, within retention.",
      "Step Functions orchestrates. It does not replace a queue for buffering.",
    ],
    architectureDiagram: `Order placed --> [SNS topic] --> [SQS: payment queue] --> workers
                         \\--> [SQS: inventory queue] --> workers
AWS/SaaS events --> [EventBridge rules] --> Lambda / Step Functions / SQS
Clickstream --> [Kinesis Data Streams] --> several real-time consumers (replay)
Legacy JMS app <--> [Amazon MQ]`,
    architectureCaption: "Pick the integration style by the shape of the problem.",
    mentorTip:
      "Translate the sentence to a shape: buffer, broadcast, route, stream, legacy or workflow. The service follows from the shape.",
    questionIds: [
      "q-event-driven-service-selection-1",
      "q-event-driven-service-selection-2",
      "q-event-driven-service-selection-3",
    ],
  },
  {
    id: "step-functions-workflow-types",
    moduleId: "phase-6-integration",
    category: "Application Integration",
    title: "Step Functions: Standard vs Express Workflows and Common Patterns",
    shortName: "Step Functions types",
    tier: 2,
    domains: [2, 3, 4],
    examImportance: "medium",
    oneLiner:
      "Standard workflows run for up to a year with a full audit trail, Express workflows run for up to five minutes at very high volume and lower cost.",
    englishExplanation:
      "AWS Step Functions lets you define a workflow as a state machine in Amazon States Language. States include Task (do work, such as invoke Lambda or call another AWS service), Choice (branch on data), Parallel (run branches at once), Map (run steps for every item in a list), Wait, Pass, Succeed and Fail. Retry and Catch fields give each state built-in error handling with backoff and fallback paths, so you do not write retry code in every Lambda function. There are optimised integrations with many services and an SDK integration for most others, and a callback pattern with a task token lets a workflow pause until an external system or a human responds.\n\nThere are two workflow types. Standard workflows can run for up to one year, execute each step exactly once, and keep a full execution history that you can inspect in the console, which suits long-running, auditable processes such as order fulfilment or approvals. They are priced per state transition. Express workflows run for up to five minutes, support very high start rates, and are priced by number of executions and duration and memory, which suits high-volume, short tasks such as stream processing, IoT data ingestion and microservice orchestration. Express workflows provide at-least-once execution for asynchronous runs, so tasks should be idempotent, and their history is delivered to CloudWatch Logs.\n\nUse Step Functions when you need to coordinate several steps with branching, retries and visibility. Do not use it as a message queue. A simple chain of one Lambda calling another is a sign that a state machine would be clearer and more resilient. For a single step triggered by an event, EventBridge or SQS with Lambda is enough.",
    taglishExplanation:
      "Ang Step Functions ay nagde-define ng workflow bilang state machine. May Task, Choice, Parallel, Map, Wait, Succeed, at Fail na states, at ang Retry at Catch ay built-in na error handling kaya hindi mo na kailangang magsulat ng retry code sa bawat Lambda. May callback pattern na gumagamit ng task token para maghintay ng tugon ng tao o ng ibang sistema. May dalawang uri: ang Standard ay hanggang isang taon, exactly-once, at may kumpletong execution history, bayad per state transition. Ang Express ay hanggang limang minuto, napakataas ang volume, at bayad ayon sa executions at duration, at at-least-once ang asynchronous. Huwag gamitin ang Step Functions bilang message queue.",
    analogy:
      "A project manager's flowchart. A Standard workflow is a long-running case file that is carefully tracked for months, with every step recorded. An Express workflow is a fast conveyor in a factory that processes thousands of small parcels a minute, where only a log of the results is kept.",
    whyItExists:
      "Multi-step processes need branching, retries, timeouts and visibility. Writing that logic in application code is error-prone, so a managed orchestrator makes it declarative and observable.",
    flow: "Start execution -> states (Task, Choice, Parallel, Map) -> Retry/Catch on errors -> optional wait for callback -> succeed or fail ; history in console (Standard) or CloudWatch Logs (Express)",
    withoutIt: [
      "Retry and branching logic would be scattered across Lambda functions",
      "Long-running approvals would need custom state storage and timers",
      "Failures would be hard to trace across steps",
    ],
    bestUseCases: [
      "Standard workflows for order processing, approvals and long-running business processes",
      "Express workflows for high-volume short tasks such as stream or IoT processing",
      "Map state to process each item in a list in parallel",
      "Callback with task token for human approval",
      "Retry with backoff and Catch to a compensation path",
    ],
    poorUseCases: [
      "Using Standard for millions of tiny executions per hour where Express is cheaper",
      "Using Express for a process that must run for hours",
      "Using Step Functions as a replacement for a message queue",
      "Chaining Lambda functions by having each call the next",
    ],
    alternatives: [
      { need: "Buffer and decouple work", choose: "Amazon SQS" },
      { need: "Route events to targets by rules", choose: "Amazon EventBridge" },
      { need: "Apache Airflow workflows", choose: "Amazon MWAA (out of scope for the exam)" },
      { need: "Batch compute jobs", choose: "AWS Batch" },
    ],
    keyFeatures: [
      "State machines in Amazon States Language",
      "States: Task, Choice, Parallel, Map, Wait, Pass, Succeed, Fail",
      "Retry and Catch for built-in error handling",
      "Standard: up to 1 year, exactly-once, full execution history, per transition pricing",
      "Express: up to 5 minutes, very high rate, pricing by executions and duration, history to CloudWatch Logs",
      "Callback pattern with task tokens, optimised and SDK service integrations",
      "Visual workflow design and execution tracing",
    ],
    availability:
      "Step Functions is a managed multi-AZ service. Design tasks to be idempotent, especially with Express workflows where asynchronous executions are at-least-once.",
    security:
      "Each state machine has an execution role with least privilege for the services it calls. Encrypt data with KMS and log executions for audit.",
    pricingLogic:
      "Standard is priced per state transition, so many steps cost more. Express is priced by requests and duration, so high-volume short workflows are cheaper there.",
    examKeywords: [
      "orchestrate",
      "state machine",
      "long-running workflow",
      "human approval",
      "retry and error handling",
      "high-volume short workflow",
      "Map state",
      "callback",
    ],
    examTraps: [
      "Standard runs up to one year and is exactly-once. Express runs up to five minutes and may run more than once.",
      "Step Functions orchestrates other services. It is not a queue or a notification service.",
      "High-volume, short-lived workloads point to Express for cost. Auditable long processes point to Standard.",
      "Retry and Catch belong in the state machine, not in custom code in each function.",
    ],
    architectureDiagram: `Start --> [Task: validate (Lambda)] --> [Choice: amount > 1000?]
            yes --> [Task: wait for approval (callback token)] --> [Parallel: reserve stock | charge card]
            no  --> [Parallel: reserve stock | charge card]
   Retry (backoff) on each Task, Catch --> [Fail / compensate]   --> [Succeed]`,
    architectureCaption: "Branching, parallelism, approval and error handling in one state machine.",
    mentorTip:
      "Two numbers decide Standard versus Express: how long it can run (a year versus five minutes) and how many executions per second you need.",
    questionIds: [
      "q-step-functions-workflow-types-1",
      "q-step-functions-workflow-types-2",
      "q-step-functions-workflow-types-3",
    ],
  },
  {
    id: "cloudformation-change-sets-drift-stacksets",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "CloudFormation: Change Sets, Drift, StackSets and Safe Updates",
    shortName: "CloudFormation in depth",
    tier: 2,
    domains: [2, 1],
    examImportance: "medium",
    oneLiner:
      "CloudFormation builds infrastructure from templates, and the exam tests how you preview changes, detect manual drift, deploy across accounts and avoid losing data.",
    englishExplanation:
      "A CloudFormation template describes resources in JSON or YAML, and a stack is the set of resources created from it. Using templates makes infrastructure repeatable and reviewable, which supports the guide's goal of automating to ensure infrastructure integrity. Before updating a stack you can create a change set, which previews which resources will be added, modified or replaced without applying anything, so a risky replacement of a database is visible before it happens. If a stack operation fails, CloudFormation rolls back to the previous working state by default.\n\nDrift detection compares the actual configuration of resources with the template and reports resources that were changed outside CloudFormation, for example someone editing a security group in the console. It reports drift but does not fix it automatically. StackSets deploy the same template to many accounts and Regions in one operation, and with AWS Organizations you can use service-managed permissions so that new accounts in an organizational unit receive the stack automatically. Nested stacks let you reuse components, exports and imports share values between stacks, and custom resources run Lambda code for things CloudFormation does not support natively.\n\nProtect stateful resources with the DeletionPolicy attribute: Retain keeps the resource when the stack is deleted, Snapshot takes a final snapshot for supported resources such as RDS and EBS, and Delete removes it. UpdateReplacePolicy does the same when an update replaces a resource. Stack policies prevent updates to critical resources and termination protection prevents accidental stack deletion. CloudFormation itself is free, and you pay for the resources it creates.",
    taglishExplanation:
      "Ang CloudFormation template ay naglalarawan ng resources sa JSON o YAML, at ang stack ay ang mga resources na nalikha mula dito. Bago mag-update, gumawa ng change set para makita kung ano ang idadagdag, babaguhin, o papalitan nang hindi pa ina-apply. Kapag nabigo ang operation, awtomatikong nagro-rollback. Ang drift detection ay naghahambing ng aktwal na configuration sa template at nag-uulat ng pagbabago sa labas ng CloudFormation, pero hindi nito inaayos. Ang StackSets ay nagde-deploy ng parehong template sa maraming account at Region. Para protektahan ang data, gamitin ang DeletionPolicy: Retain, Snapshot, o Delete. May stack policy at termination protection din.",
    analogy:
      "Architectural blueprints. A change set is the redline markup showing what would change before construction begins. Drift detection is the inspector comparing the finished building to the blueprint and noting someone knocked down a wall. StackSets is issuing the same blueprint to many construction sites at once. DeletionPolicy is the clause that says the safe must be kept even if the building is demolished.",
    whyItExists:
      "Manually created infrastructure is hard to reproduce, review and keep consistent. Declarative templates make environments repeatable and let teams review and roll back changes safely.",
    flow: "Template -> create stack -> (update) create change set -> review -> execute -> on failure roll back ; periodic drift detection ; StackSets push to accounts and Regions",
    withoutIt: [
      "Environments would differ because of manual console changes",
      "Updates could replace a database unexpectedly",
      "Rolling out the same baseline to many accounts would be manual",
    ],
    bestUseCases: [
      "Change sets to review updates before applying them to production",
      "Drift detection to find out-of-band changes",
      "StackSets with Organizations to deploy baseline security resources to every account",
      "DeletionPolicy Retain or Snapshot on databases and buckets",
      "Nested stacks for reusable components",
    ],
    poorUseCases: [
      "Editing stack resources manually in the console and expecting the template to stay accurate",
      "Updating a production stack without previewing the change set",
      "Relying on drift detection to automatically correct changes",
      "Putting secrets in plain text in templates",
    ],
    alternatives: [
      { need: "Curated products users can launch", choose: "AWS Service Catalog" },
      { need: "Check configuration compliance continuously", choose: "AWS Config" },
      { need: "Multi-account guardrails and landing zone", choose: "AWS Control Tower" },
      { need: "Define infrastructure with programming languages", choose: "AWS CDK (out of scope for the exam)" },
    ],
    keyFeatures: [
      "Templates in JSON or YAML, stacks, parameters, mappings, outputs",
      "Change sets preview updates, automatic rollback on failure",
      "Drift detection reports out-of-band changes without fixing them",
      "StackSets deploy to multiple accounts and Regions, service-managed with Organizations",
      "Nested stacks, exports and imports, custom resources",
      "DeletionPolicy: Retain, Snapshot, Delete. UpdateReplacePolicy",
      "Stack policies and termination protection",
    ],
    availability:
      "Use templates to rebuild an environment quickly in another Region, which supports disaster recovery and consistent multi-Region deployments.",
    security:
      "Use IAM roles for CloudFormation, stack policies to protect critical resources, and Secrets Manager or Parameter Store dynamic references instead of plain-text secrets.",
    pricingLogic:
      "There is no charge for CloudFormation itself. You pay for the resources it provisions.",
    examKeywords: [
      "preview changes",
      "change set",
      "drift detection",
      "multiple accounts and Regions",
      "StackSets",
      "retain on delete",
      "rollback",
      "infrastructure as code",
    ],
    examTraps: [
      "A change set previews. It does not apply the change. Executing it does.",
      "Drift detection only detects. It does not remediate.",
      "To keep a database when the stack is deleted, set DeletionPolicy to Retain or Snapshot.",
      "StackSets is the answer for deploying one template to many accounts and Regions.",
    ],
    architectureDiagram: `Template v2 --> [Change set: DB replaced? yes] --> review --> execute or cancel
Stack ---- drift detection ---> "SG rule edited in console" (reported, not fixed)
[StackSet] --> Account A / us-east-1, Account B / eu-west-1 ... (auto for new accounts in OU)
RDS: DeletionPolicy: Snapshot`,
    architectureCaption: "Preview, detect drift, deploy broadly and protect data.",
    mentorTip:
      "Match the need to the feature: preview is change set, out-of-band edits is drift detection, many accounts is StackSets, keep data is DeletionPolicy.",
    questionIds: [
      "q-cloudformation-change-sets-drift-stacksets-1",
      "q-cloudformation-change-sets-drift-stacksets-2",
      "q-cloudformation-change-sets-drift-stacksets-3",
    ],
  },
];
