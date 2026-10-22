import type { Lesson } from "@/lib/types";

export const deepDivesE: Lesson[] = [
  {
    id: "storage-gateway-types",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "Storage Gateway: File, Volume and Tape",
    shortName: "Gateway types",
    tier: 2,
    domains: [3, 2, 4],
    examImportance: "medium",
    oneLiner:
      "Storage Gateway is a local appliance that makes AWS storage look like the file shares, disk volumes or tape library your on-premises systems already use.",
    englishExplanation:
      "Storage Gateway runs as a virtual machine or hardware appliance in your data center and keeps a local cache for fast access to recent data, while the bulk of the data lives in AWS. It comes in four types, and the exam is mostly about picking the right one. S3 File Gateway exposes NFS and SMB shares and stores each file as an object in S3, so you get file access on premises and S3 features such as lifecycle rules and analytics in the cloud. FSx File Gateway gives low-latency local access to Amazon FSx for Windows File Server shares.\n\nVolume Gateway presents block storage over iSCSI in two modes. Cached volumes keep the primary data in S3 and cache the frequently accessed part locally, so you need little local storage. Stored volumes keep the entire data set on premises for low-latency access and asynchronously back it up to S3 as EBS snapshots. Tape Gateway presents a virtual tape library to existing backup software over iSCSI and stores the virtual tapes in S3, archiving them to S3 Glacier or Deep Archive, so you can retire physical tapes without changing your backup process.\n\nThe common confusion is with DataSync and Snow devices. Storage Gateway is for ongoing hybrid access where on-premises applications keep reading and writing. DataSync is for moving or syncing large amounts of data on a schedule or as a migration. Snow Family is for bulk offline transfer when bandwidth is limited.",
    taglishExplanation:
      "Ang Storage Gateway ay VM o hardware appliance sa data center mo na may local cache para mabilis ang access, habang ang karamihan ng data ay nasa AWS. May apat na uri. Ang S3 File Gateway ay NFS at SMB share na ang bawat file ay nagiging object sa S3. Ang FSx File Gateway ay para sa FSx for Windows. Ang Volume Gateway ay iSCSI block storage: sa cached mode, nasa S3 ang pangunahing data at ang madalas gamitin lang ang naka-cache; sa stored mode, buong data ay nasa on-premises at may async backup sa S3 bilang EBS snapshot. Ang Tape Gateway ay virtual tape library para sa backup software, naka-archive sa Glacier. Huwag ihalo sa DataSync, na para sa paglipat ng data, at Snow Family, para sa offline na bulk transfer.",
    analogy:
      "A local post office counter that is really an agent for a giant warehouse across the country. You hand over and collect items at the counter like always, the counter keeps the recent ones on a shelf behind it, and everything else is stored at the warehouse. Which counter you use depends on whether you drop off files, disks or tapes.",
    whyItExists:
      "Many organisations cannot move every application to the cloud at once but want cloud durability, cheaper archives and offsite backups. A gateway lets existing software keep using familiar protocols while the data lands in AWS.",
    flow: "On-premises app -> NFS/SMB/iSCSI -> Storage Gateway (local cache) -> AWS (S3, S3 Glacier, EBS snapshots, FSx)",
    withoutIt: [
      "Applications would need to be rewritten to speak the S3 API",
      "Offsite tape backups would still need physical media and couriers",
      "Cloud backup of on-premises volumes would need custom scripting",
    ],
    bestUseCases: [
      "S3 File Gateway to give on-premises apps file access backed by S3",
      "Tape Gateway to replace physical tape libraries without changing backup software",
      "Cached Volume Gateway to extend primary storage into the cloud with little local disk",
      "Stored Volume Gateway when the whole data set must stay local with cloud backups",
      "FSx File Gateway for fast local access to Windows file shares in FSx",
    ],
    poorUseCases: [
      "One-off or scheduled bulk migration (use DataSync)",
      "Offline transfer of hundreds of terabytes over a slow link (use Snow Family)",
      "Cloud-native applications that can call S3 directly",
      "Cached volumes when the application needs the entire data set at local speed (use stored volumes)",
    ],
    alternatives: [
      { need: "Scheduled or one-time bulk transfer into S3, EFS or FSx", choose: "AWS DataSync" },
      { need: "Offline transfer of very large data sets", choose: "AWS Snow Family" },
      { need: "Managed SFTP, FTPS or FTP endpoints into S3", choose: "AWS Transfer Family" },
      { need: "Policy-based backup of AWS resources", choose: "AWS Backup" },
    ],
    keyFeatures: [
      "Four types: S3 File, FSx File, Volume (cached or stored), Tape",
      "Local cache for low-latency access to recent data",
      "File gateways use NFS and SMB. Volume and Tape gateways use iSCSI",
      "Stored volumes snapshot to S3 as EBS snapshots",
      "Virtual tapes archive to S3 Glacier or Deep Archive",
      "Deployed as VM (VMware, Hyper-V, KVM), EC2 instance or hardware appliance",
      "Data encrypted in transit and at rest",
    ],
    availability:
      "Data in AWS is durable, but the gateway appliance itself is a single local component. Run it on a highly available hypervisor and keep the cache sized correctly. Data not yet uploaded from the cache is at risk if the appliance is lost.",
    security:
      "Traffic to AWS is encrypted with TLS, objects are encrypted at rest (SSE-S3 or KMS), and file shares can integrate with Active Directory for SMB access control.",
    pricingLogic:
      "You pay per GB stored in the underlying AWS service, a gateway usage fee for some types and per-GB charges for data written, plus the cost of the hardware or VM that runs it.",
    examKeywords: [
      "hybrid",
      "on-premises NFS/SMB to S3",
      "virtual tape library",
      "iSCSI",
      "cached volumes",
      "stored volumes",
      "replace physical tapes",
    ],
    examTraps: [
      "Cached volumes keep primary data in S3. Stored volumes keep primary data on premises. They are opposites.",
      "Tape Gateway needs no change to backup software. If the scenario forbids changing the backup process, it is Tape Gateway.",
      "Storage Gateway is for ongoing access, not for bulk migration. A one-time transfer is DataSync or Snow.",
      "File Gateway data is stored as S3 objects, so it supports lifecycle rules and S3 features.",
    ],
    architectureDiagram: `On premises                                AWS
[App servers] --NFS/SMB--> [S3 File Gateway + cache] --> [S3 bucket]
[DB server]   --iSCSI----> [Volume Gateway]          --> [S3 + EBS snapshots]
[Backup sw]   --iSCSI----> [Tape Gateway]            --> [S3 Glacier / Deep Archive]`,
    architectureCaption: "Three gateway types, three familiar protocols, one AWS storage backend.",
    mentorTip:
      "Match the protocol in the question: file share means File Gateway, iSCSI disk means Volume Gateway, backup software and tapes means Tape Gateway.",
    questionIds: [
      "q-storage-gateway-types-1",
      "q-storage-gateway-types-2",
      "q-storage-gateway-types-3",
    ],
  },
  {
    id: "aurora-features-endpoints",
    moduleId: "phase-5-databases",
    category: "Databases",
    title: "Aurora Features: Replicas, Endpoints, Backtrack and Cloning",
    shortName: "Aurora features",
    tier: 1,
    domains: [2, 3],
    examImportance: "high",
    oneLiner:
      "Aurora separates compute from a shared, self-healing storage layer, which gives it fast failover, many replicas, instant clones and rewind without restoring.",
    englishExplanation:
      "An Aurora cluster has one writer instance and up to 15 Aurora Replicas, all reading from the same distributed storage volume. The volume keeps six copies of your data across three AZs, grows automatically in 10 GB steps up to 128 TiB, and repairs itself. Because replicas share storage rather than copying it, replica lag is typically in the low milliseconds, and a replica can be promoted quickly if the writer fails, usually within about 30 seconds. Aurora Replicas can also auto scale based on load.\n\nEndpoints simplify connection handling. The cluster endpoint always points to the current writer. The reader endpoint load-balances connections across the replicas. Custom endpoints let you group chosen instances, for example larger ones for analytics. Instance endpoints address one instance directly and are rarely used by applications.\n\nSeveral features are exam favourites. Backtrack (Aurora MySQL) rewinds the database to a point in time within a configured window up to 72 hours without restoring from backup, which is ideal for undoing a bad change in seconds. Cloning creates a new cluster that initially shares the same storage with copy-on-write, so it is fast and cheap for test environments. Continuous backup to S3 supports point-in-time restore with retention up to 35 days. Aurora Serverless v2 scales compute in fine-grained capacity units for variable workloads, Aurora Global Database replicates across Regions, and parallel query pushes some analytic work down into the storage layer.",
    taglishExplanation:
      "Ang Aurora cluster ay may isang writer at hanggang 15 Aurora Replica, na lahat ay nagbabasa sa iisang shared storage volume. Anim na kopya ng data sa tatlong AZ, kusang lumalaki hanggang 128 TiB, at kusang nag-aayos. Dahil shared ang storage, ilang milliseconds lang ang lag ng replica at mabilis ang failover, mga 30 segundo. Sa endpoints: ang cluster endpoint ay laging papunta sa writer, ang reader endpoint ay nagba-balance sa mga replica, at ang custom endpoint ay para sa piniling grupo ng instance. Ang Backtrack ay nagre-rewind ng database hanggang 72 oras nang walang restore, para sa Aurora MySQL. Ang cloning ay mabilis at mura dahil copy-on-write. Ang Serverless v2 ay nag-i-scale ng compute ayon sa load.",
    analogy:
      "A restaurant group with one shared kitchen pantry (the storage volume) and several service counters (instances) that all draw from it. Adding a counter does not mean copying the pantry. Backtrack is a rewind button on the pantry's inventory, and a clone is a second restaurant that starts with the same pantry and only gets its own shelves when it changes something.",
    whyItExists:
      "Traditional replicas each keep a full copy and replay the writer's log, which creates lag and slow rebuilds. Sharing a distributed storage layer removes that cost and makes high availability and read scaling much cheaper to operate.",
    flow: "App -> cluster endpoint -> writer ; reads -> reader endpoint -> replicas ; all instances -> shared storage volume (6 copies, 3 AZs) -> continuous backup to S3",
    withoutIt: [
      "Each replica would need its own copy of the data and would lag more",
      "Recovering from a bad change would require a slow restore from backup",
      "Creating a test copy of a large database would take hours and double the storage",
    ],
    bestUseCases: [
      "Reader endpoint to spread read traffic across up to 15 replicas",
      "Backtrack to undo accidental deletes or bad deployments quickly on Aurora MySQL",
      "Cloning to create production-sized test environments cheaply",
      "Serverless v2 for spiky or unpredictable workloads",
      "Custom endpoints to isolate reporting on bigger replicas",
    ],
    poorUseCases: [
      "Instance endpoints in application code, since they break on failover",
      "Backtrack as a replacement for backups (it is a short-window rewind, and only for Aurora MySQL)",
      "Aurora when a simple small database would do and cost matters more than features",
      "Expecting a replica in another Region without Global Database or a cross-Region replica",
    ],
    alternatives: [
      { need: "Multi-Region low-lag replication", choose: "Aurora Global Database" },
      { need: "Pool connections from many Lambda functions", choose: "Amazon RDS Proxy" },
      { need: "Key-value access at massive scale", choose: "Amazon DynamoDB" },
      { need: "Petabyte analytics", choose: "Amazon Redshift" },
    ],
    keyFeatures: [
      "Shared storage: 6 copies across 3 AZs, auto-grows to 128 TiB",
      "Up to 15 Aurora Replicas with typical lag in milliseconds, automatic failover in about 30 seconds",
      "Cluster, reader, custom and instance endpoints",
      "Backtrack (Aurora MySQL): rewind up to 72 hours without restoring",
      "Fast cloning with copy-on-write",
      "Continuous backups to S3 with point-in-time restore, up to 35 days",
      "Serverless v2, Global Database, parallel query",
    ],
    availability:
      "Storage tolerates the loss of two copies without losing write availability and three without losing read availability. Replicas in other AZs act as failover targets. Global Database adds Regional resilience.",
    security:
      "Encrypt the cluster with KMS at creation (it cannot be added later to an unencrypted cluster, though a snapshot copy can be encrypted). Use IAM database authentication, security groups and private subnets.",
    pricingLogic:
      "You pay for instances, storage actually used, I/O (or a flat I/O-optimised option) and backup storage beyond the free allowance. Clones cost extra only for the data that changes.",
    examKeywords: [
      "15 read replicas",
      "reader endpoint",
      "rewind without restore",
      "clone production database",
      "six copies across three AZs",
      "failover in about 30 seconds",
    ],
    examTraps: [
      "Backtrack is Aurora MySQL only and rewinds in place. Point-in-time restore creates a new cluster.",
      "The cluster endpoint is the writer. Only the reader endpoint load-balances reads.",
      "Aurora Replicas are in the same Region. Cross-Region needs Global Database or a cross-Region replica.",
      "A clone is not a backup. It shares storage until data diverges.",
    ],
    architectureDiagram: `App writes --> [Cluster endpoint] --> [Writer]
App reads  --> [Reader endpoint] --> [Replica 1] [Replica 2] ... [Replica 15]
                         \\             |             /
                  [Shared cluster volume: 6 copies / 3 AZs]  --> S3 backups
Clone: new cluster shares the same pages until they change (copy-on-write)`,
    architectureCaption: "Compute scales independently of one shared storage layer.",
    mentorTip:
      "Link each feature to its verb: 'rewind' is Backtrack, 'copy for testing' is cloning, 'spread reads' is the reader endpoint, 'other Region' is Global Database.",
    questionIds: [
      "q-aurora-features-endpoints-1",
      "q-aurora-features-endpoints-2",
      "q-aurora-features-endpoints-3",
    ],
  },
  {
    id: "containers-ecs-eks-fargate-decision",
    moduleId: "phase-7-containers",
    category: "Containers",
    title: "Choosing ECS, EKS or Fargate, and Task Roles",
    shortName: "Container choices",
    tier: 1,
    domains: [3, 1, 4],
    examImportance: "high",
    oneLiner:
      "ECS is AWS's own container orchestrator, EKS is managed Kubernetes, and Fargate removes the servers from either. Task roles decide what a container may do.",
    englishExplanation:
      "Two things run containers on AWS and one thing decides where. The orchestrators are Amazon ECS, a simple AWS-native service, and Amazon EKS, a managed Kubernetes control plane. Choose EKS when you already use Kubernetes, want portability across clouds or on premises, or rely on the Kubernetes ecosystem. Choose ECS when you want the simplest path with deep AWS integration. The compute option is either EC2, where you manage a fleet of instances and get control over instance types, GPUs and host access, or Fargate, a serverless engine where you define CPU and memory per task and pay per second with no instances to patch or scale. Fargate works with both ECS and EKS. Fargate does not give you host-level access, so a workload that needs privileged mode, GPUs or custom kernel settings needs EC2.\n\nImages come from Amazon ECR, a private registry with image scanning and cross-Region replication. In ECS, a task definition describes the containers, and a service keeps a desired number of tasks running, often behind an ALB. With the awsvpc network mode, each task gets its own network interface and security group, and the load balancer target type is IP.\n\nTwo IAM roles are easy to confuse. The task execution role is used by ECS itself to pull images from ECR, write logs to CloudWatch and fetch secrets. The task role is the identity your application code uses to call AWS services such as S3 or DynamoDB, which gives each task least privilege instead of sharing the instance's role. For Kubernetes, IAM roles for service accounts do the same job for pods. Persistent shared storage for tasks is typically Amazon EFS.",
    taglishExplanation:
      "May dalawang orchestrator: ang ECS na simple at AWS-native, at ang EKS na managed Kubernetes. Piliin ang EKS kung Kubernetes na ang gamit mo o kailangan ang portability. Ang compute naman ay EC2, na ikaw ang bahala sa mga instance at may kontrol sa GPU at host, o Fargate na serverless, CPU at memory per task ang itinatakda mo at per second ang bayad. Gumagana ang Fargate sa ECS at EKS. Walang host access sa Fargate, kaya kapag kailangan ng privileged mode o GPU, EC2. Ang ECR ang private image registry. May dalawang role: ang task execution role ay ginagamit ng ECS para mag-pull ng image at mag-log, at ang task role ay ginagamit ng code mo para tumawag ng AWS services gaya ng S3.",
    analogy:
      "ECS and EKS are two different building managers who decide which tenant goes in which unit. EC2 versus Fargate is whether you own and maintain the building or rent serviced offices by the hour. The task execution role is the moving crew's pass that lets them carry the furniture in. The task role is the tenant's own key card for the rooms they are allowed to use.",
    whyItExists:
      "Containers need scheduling, scaling, networking and security around them. Offering several orchestration and compute choices lets teams pick between simplicity, portability and control.",
    flow: "Build image -> push to ECR -> task or pod definition -> ECS or EKS schedules on EC2 or Fargate -> ALB routes traffic -> task role grants AWS API access",
    withoutIt: [
      "You would build and run your own scheduler and manage every host",
      "Containers would share broad instance credentials instead of per-task permissions",
      "Scaling and patching container hosts would be manual",
    ],
    bestUseCases: [
      "ECS on Fargate for teams who want containers with minimal operations",
      "EKS when the organisation standardises on Kubernetes or needs portability",
      "EC2 launch type for GPUs, privileged containers or large steady fleets with Savings Plans",
      "Task roles for least-privilege access from each service",
      "EFS volumes for shared persistent storage across tasks",
    ],
    poorUseCases: [
      "Fargate for workloads needing GPUs or host-level access",
      "EKS for a small team with no Kubernetes experience and no portability need",
      "Sharing one broad IAM role across all containers on an instance",
      "Running long-lived, steady, very large fleets on Fargate if cost is the main driver and EC2 with commitments is cheaper",
    ],
    alternatives: [
      { need: "Run a short function without managing containers", choose: "AWS Lambda" },
      { need: "Simple web app from source or image with minimal setup", choose: "AWS App Runner or Elastic Beanstalk" },
      { need: "Kubernetes on premises with AWS tooling", choose: "Amazon EKS Anywhere" },
      { need: "Run ECS tasks on your own servers", choose: "Amazon ECS Anywhere" },
    ],
    keyFeatures: [
      "ECS: task definitions, services, clusters, EC2 and Fargate launch types",
      "EKS: managed Kubernetes control plane, worker nodes on EC2, managed node groups or Fargate",
      "Fargate: serverless compute, per-second billing, no host access, no GPUs",
      "ECR: private registry, image scanning, replication",
      "Task execution role vs task role",
      "awsvpc networking gives each task its own ENI and security group",
      "Service auto scaling on CPU, memory or request count",
    ],
    availability:
      "Run tasks across multiple AZs behind a load balancer. ECS services replace failed tasks automatically, and EKS replaces failed pods through the Kubernetes scheduler.",
    security:
      "Use per-task roles, private subnets, security groups per task, image scanning in ECR and secrets from Secrets Manager or Parameter Store injected at launch.",
    pricingLogic:
      "ECS has no control-plane charge. EKS charges an hourly fee per cluster. Fargate bills per vCPU and GB-second. EC2 launch type bills for the instances whether or not they are full.",
    examKeywords: [
      "serverless containers",
      "no servers to manage",
      "Kubernetes",
      "task role",
      "GPU",
      "private registry",
      "per-task permissions",
      "portability",
    ],
    examTraps: [
      "The task execution role pulls images and writes logs. The task role is what the application code uses.",
      "Fargate is a compute option, not an orchestrator. It runs under ECS or EKS.",
      "If the scenario says 'already using Kubernetes', the answer is EKS even if ECS would be simpler.",
      "Fargate offers no host access. Privileged or GPU workloads need the EC2 launch type.",
    ],
    architectureDiagram: `ECR (image) --> [ECS service / EKS deployment]
                    |  compute: Fargate (no servers) or EC2 (you manage)
   ALB --(target type: IP)--> [Task A (task role -> S3)] [Task B (task role -> DynamoDB)]
   Task execution role: pull from ECR, write CloudWatch Logs`,
    architectureCaption: "Orchestrator, compute and IAM roles are three separate choices.",
    mentorTip:
      "Split the question into three layers: which orchestrator, which compute, which role. Most wrong answers mix the layers.",
    questionIds: [
      "q-containers-ecs-eks-fargate-decision-1",
      "q-containers-ecs-eks-fargate-decision-2",
      "q-containers-ecs-eks-fargate-decision-3",
    ],
  },
  {
    id: "cloudwatch-metrics-alarms-logs",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "CloudWatch Metrics, Alarms and Logs in Practice",
    shortName: "CloudWatch deep dive",
    tier: 1,
    domains: [2, 3, 1],
    examImportance: "high",
    oneLiner:
      "CloudWatch collects metrics and logs, alarms act on them, and the details that decide exam answers are what EC2 does not report by default and how log data gets processed.",
    englishExplanation:
      "CloudWatch metrics are time-series data points. EC2 publishes basic monitoring every 5 minutes at no charge, or detailed monitoring every minute for a fee. EC2 does not report memory or disk space usage at all, because those are inside the operating system, so you install the CloudWatch agent to collect them as custom metrics. Custom metrics can be standard resolution (one minute) or high resolution (down to one second). Metric data is kept for 15 months, with finer data rolled up as it ages.\n\nAn alarm watches one metric and moves between OK, ALARM and INSUFFICIENT_DATA. Actions include notifying an SNS topic, triggering Auto Scaling, and EC2 actions such as stop, terminate, reboot or recover, where recover moves an instance with a failed system status check to new hardware. Composite alarms combine several alarms with AND and OR logic to cut noise.\n\nCloudWatch Logs organises events into log groups and streams. Retention is never-expire by default, so set a retention period to control cost. Logs Insights queries logs interactively. A metric filter turns patterns in log text, such as the word ERROR, into a metric you can alarm on. A subscription filter streams matching events in near real time to Kinesis, Data Firehose or Lambda, which is how you ship logs to S3 or OpenSearch continuously. Exporting a log group to S3 is a batch task and not real time. Other features include dashboards, Container Insights, Synthetics canaries for scripted endpoint checks and EventBridge integration for event-driven reactions.",
    taglishExplanation:
      "Ang EC2 ay nagpapadala ng basic metrics kada 5 minuto nang libre, o detailed monitoring kada 1 minuto na may bayad. Hindi nire-report ng EC2 ang memory at disk space, kaya mag-install ng CloudWatch agent para sa mga ito. Ang custom metric ay puwedeng high resolution hanggang 1 segundo. Ang alarm ay may estado na OK, ALARM, at INSUFFICIENT_DATA, at puwedeng mag-notify sa SNS, mag-trigger ng Auto Scaling, o mag-recover ng EC2. Sa Logs, default na never-expire ang retention kaya mag-set ng retention. Ang metric filter ay ginagawang metric ang pattern sa logs. Ang subscription filter ay nag-i-stream ng logs sa Kinesis, Firehose, o Lambda nang halos real time. Ang export sa S3 ay batch, hindi real time.",
    analogy:
      "A hospital monitoring station. Vital signs from each bed are metrics, and the nurse only sees heart rate and temperature unless someone attaches a special sensor (the agent) for things the bed cannot measure itself. Alarms are the beeps and the automatic call to the doctor. Logs are the patient chart, and a subscription filter is a courier who delivers each new page to the records department as it is written.",
    whyItExists:
      "You cannot operate what you cannot see. Centralised metrics, logs and alarms let you detect problems, trigger automated responses and keep evidence without logging into servers.",
    flow: "Resource or agent -> metric/log data -> CloudWatch -> alarm threshold -> SNS / Auto Scaling / EC2 action ; logs -> subscription filter -> Kinesis / Firehose / Lambda",
    withoutIt: [
      "You would not know about memory exhaustion or disk-full conditions until the application failed",
      "Scaling and recovery would need manual intervention",
      "Logs would stay on instances and disappear when they terminate",
    ],
    bestUseCases: [
      "CloudWatch agent for memory, disk and application logs",
      "Alarm with EC2 recover action to restore an instance after a system status check failure",
      "Metric filters and alarms on error counts in logs",
      "Subscription filters to stream logs to Firehose and S3 for long-term storage",
      "Composite alarms to reduce alert noise",
    ],
    poorUseCases: [
      "Expecting memory metrics from EC2 without the agent",
      "Using log export to S3 when near-real-time delivery is needed",
      "Leaving log groups on never-expire when logs are only needed for 30 days",
      "Using CloudWatch for audit of API calls (use CloudTrail)",
    ],
    alternatives: [
      { need: "Who called which AWS API", choose: "AWS CloudTrail" },
      { need: "Track and evaluate resource configuration changes", choose: "AWS Config" },
      { need: "Trace requests across services", choose: "AWS X-Ray" },
      { need: "Route events to targets by rule", choose: "Amazon EventBridge" },
    ],
    keyFeatures: [
      "EC2 basic monitoring 5 minutes, detailed 1 minute",
      "Memory and disk usage need the CloudWatch agent",
      "High-resolution custom metrics down to 1 second, 15 months retention",
      "Alarm states OK, ALARM, INSUFFICIENT_DATA, with SNS, Auto Scaling and EC2 actions",
      "Composite alarms",
      "Log groups with configurable retention, Logs Insights, metric filters",
      "Subscription filters for near-real-time streaming, export tasks for batch to S3",
    ],
    availability:
      "CloudWatch is Regional and highly available. Use alarms with the EC2 recover action or Auto Scaling health replacement to increase availability of workloads.",
    security:
      "Encrypt log groups with KMS, restrict access with IAM, and use cross-account observability to centralise monitoring while limiting who can read data.",
    pricingLogic:
      "You pay for custom metrics, alarms, detailed monitoring, log ingestion, storage and Logs Insights queries. Retention policies and filtering at the source are the main cost controls.",
    examKeywords: [
      "memory utilisation",
      "disk space",
      "recover instance",
      "near real time log delivery",
      "metric filter",
      "retention",
      "high-resolution",
    ],
    examTraps: [
      "EC2 does not publish memory or disk usage by default. The CloudWatch agent is required.",
      "Exporting logs to S3 is not real time. Use a subscription filter for streaming.",
      "Default log retention is never expire, which can quietly grow the bill.",
      "CloudWatch records metrics and logs, CloudTrail records API activity. Do not swap them.",
    ],
    architectureDiagram: `[EC2 + CloudWatch agent] --> metrics (memory, disk) + logs
        |                                   |
   [Alarm: memory > 80%] --> SNS / Auto Scaling      [Log group]
        |                                       |-- metric filter "ERROR" --> alarm
   EC2 recover action                           +-- subscription filter --> Firehose --> S3`,
    architectureCaption: "Agent for what EC2 cannot see, alarms to act, filters to turn logs into signals.",
    mentorTip:
      "When a question mentions memory or disk, think agent. When it mentions streaming logs elsewhere, think subscription filter. When it mentions API calls, think CloudTrail.",
    questionIds: [
      "q-cloudwatch-metrics-alarms-logs-1",
      "q-cloudwatch-metrics-alarms-logs-2",
      "q-cloudwatch-metrics-alarms-logs-3",
    ],
  },
  {
    id: "secrets-manager-vs-parameter-store",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "Secrets Manager vs Systems Manager Parameter Store",
    shortName: "Secrets vs Parameters",
    tier: 1,
    domains: [1, 4],
    examImportance: "high",
    oneLiner:
      "Both store sensitive values encrypted. Secrets Manager adds automatic rotation and costs per secret. Parameter Store is cheaper and simpler.",
    englishExplanation:
      "Applications should never hold passwords in code or environment files. AWS offers two managed places to keep them. AWS Secrets Manager is built for secrets: it encrypts them with KMS, versions them, replicates them across Regions, and above all rotates them automatically on a schedule using a Lambda function, with built-in rotation for Amazon RDS, Aurora, Redshift and DocumentDB credentials. A secret can be up to 64 KB, and you pay per secret per month plus per API call.\n\nSystems Manager Parameter Store is a general configuration store that also holds secrets as SecureString parameters, encrypted with KMS. Standard parameters are free, up to 4 KB each, and you can have thousands of them. Advanced parameters allow up to 8 KB, more parameters and parameter policies such as expiration, for a fee. Parameters are organised in a hierarchy of paths such as /prod/db/host, which makes it easy to grant access to a whole path and to fetch all parameters under it. It has no native automatic rotation.\n\nBoth services integrate with IAM for access control and CloudTrail for auditing, and both can be referenced from CloudFormation, ECS task definitions and Lambda. The decision rule used on the exam is simple: if the question needs automatic rotation of credentials or built-in database credential management, choose Secrets Manager. If it needs plain configuration or inexpensive storage of values with no rotation, choose Parameter Store. A Secrets Manager secret can even be read through the Parameter Store API, so the two can coexist.",
    taglishExplanation:
      "Hindi dapat nakalagay ang password sa code. Ang Secrets Manager ay para sa secrets: naka-encrypt gamit ang KMS, may versioning, may replication sa ibang Region, at higit sa lahat awtomatikong nag-ro-rotate gamit ang Lambda, na may built-in para sa RDS, Aurora, Redshift at DocumentDB. May bayad kada secret kada buwan. Ang Parameter Store ay para sa configuration na puwede ring maglaman ng SecureString na naka-encrypt sa KMS. Libre ang standard parameter, hanggang 4 KB, at may hierarchy ng path tulad ng /prod/db/host. Walang native na automatic rotation. Kapag kailangan ang automatic rotation ng credentials, Secrets Manager. Kapag simpleng config o murang imbakan lang, Parameter Store.",
    analogy:
      "Secrets Manager is a safe-deposit service that also changes your locks on a schedule and updates every key holder automatically. Parameter Store is a well-organised filing cabinet with some locked drawers: cheap and tidy, but you change the locks yourself.",
    whyItExists:
      "Long-lived credentials in code or config files are a leading cause of breaches. A managed store with access control, encryption, audit and rotation removes secrets from source control and shortens the damage window.",
    flow: "App (IAM role) -> GetSecretValue / GetParameter -> KMS decrypts -> value returned ; Secrets Manager rotation: Lambda updates secret and database credential on schedule",
    withoutIt: [
      "Passwords would live in source code, AMIs or environment files",
      "Rotating a database password would require redeploying every application",
      "You could not audit who read a credential",
    ],
    bestUseCases: [
      "Secrets Manager for RDS or Aurora credentials with automatic rotation",
      "Secrets Manager replicas for multi-Region applications",
      "Parameter Store for application configuration and feature settings",
      "Parameter Store SecureString for low-cost storage of values that do not rotate",
      "Path-based IAM policies for per-environment access to parameters",
    ],
    poorUseCases: [
      "Parameter Store when automatic rotation is required",
      "Secrets Manager for thousands of non-sensitive config values, because of per-secret cost",
      "Hard-coding secrets in Lambda environment variables without encryption controls",
      "Storing large files in either service",
    ],
    alternatives: [
      { need: "Create and control encryption keys", choose: "AWS KMS" },
      { need: "Dedicated hardware key storage", choose: "AWS CloudHSM" },
      { need: "Short-lived database auth without passwords", choose: "IAM database authentication" },
      { need: "TLS certificates", choose: "AWS Certificate Manager" },
    ],
    keyFeatures: [
      "Secrets Manager: automatic rotation via Lambda, native RDS-family integration, cross-Region replication, up to 64 KB",
      "Secrets Manager versioning with staging labels",
      "Parameter Store: standard (free, 4 KB) and advanced (8 KB, policies, paid) tiers",
      "SecureString parameters use KMS encryption",
      "Hierarchical paths for organisation and access control",
      "Both integrate with IAM, CloudTrail, CloudFormation and ECS",
      "Parameter Store has no built-in rotation",
    ],
    availability:
      "Both are Regional managed services. Secrets Manager can replicate secrets to other Regions so a DR Region has the same credentials.",
    security:
      "Grant least privilege with IAM and, where appropriate, resource policies. Encrypt with customer managed KMS keys for control and audit, and deny access outside the application's role.",
    pricingLogic:
      "Secrets Manager charges per secret per month and per 10,000 API calls. Parameter Store standard parameters are free, and advanced parameters carry a small monthly charge.",
    examKeywords: [
      "automatic rotation",
      "database credentials",
      "least cost",
      "configuration values",
      "SecureString",
      "hierarchy",
      "multi-Region secret",
    ],
    examTraps: [
      "Automatic rotation points to Secrets Manager. Parameter Store cannot rotate on its own.",
      "'Lowest cost' for non-rotating values points to Parameter Store standard parameters.",
      "Both encrypt with KMS. Encryption alone is not the deciding factor.",
      "Neither replaces KMS. They store values, KMS manages keys.",
    ],
    architectureDiagram: `App (IAM role) --> [Secrets Manager: db/prod credentials] <-- rotation Lambda (every 30 days) --> [RDS]
App (IAM role) --> [Parameter Store: /prod/app/feature-flag, /prod/app/endpoint]
Both: encrypted with KMS, audited by CloudTrail`,
    architectureCaption: "Rotating credentials in Secrets Manager, plain configuration in Parameter Store.",
    mentorTip:
      "Underline 'rotate' in the question. If it is there, Secrets Manager. If the stress is cost or plain configuration, Parameter Store.",
    questionIds: [
      "q-secrets-manager-vs-parameter-store-1",
      "q-secrets-manager-vs-parameter-store-2",
      "q-secrets-manager-vs-parameter-store-3",
    ],
  },
  {
    id: "direct-connect-vpn-resilience",
    moduleId: "phase-4-networking",
    category: "Networking",
    title: "Direct Connect and VPN: Design for Resilience",
    shortName: "DX & VPN design",
    tier: 1,
    domains: [2, 1, 3],
    examImportance: "high",
    oneLiner:
      "Direct Connect gives a private, consistent link to AWS but takes weeks and is not encrypted. Site-to-Site VPN is quick and encrypted but rides the internet. Together they make a resilient hybrid design.",
    englishExplanation:
      "AWS Direct Connect is a dedicated network connection from your data center to AWS through a Direct Connect location. Dedicated connections come in 1, 10 or 100 Gbps, and hosted connections from partners start much smaller, at 50 Mbps. It gives consistent latency and lower data transfer costs than the internet, but provisioning takes weeks and the traffic is not encrypted by default. You add encryption with a VPN over Direct Connect, or MACsec on supported dedicated connections. Virtual interfaces define what you reach: a private VIF to VPCs, a public VIF to public AWS services such as S3, and a transit VIF to a Transit Gateway. A Direct Connect Gateway lets one connection reach VPCs in multiple Regions and accounts.\n\nAWS Site-to-Site VPN builds IPsec tunnels over the internet. Each VPN connection has two tunnels for redundancy, each up to about 1.25 Gbps, and it can be set up in minutes. It terminates on a virtual private gateway, a Transit Gateway or a customer gateway on your side. With a Transit Gateway, ECMP can spread traffic across multiple tunnels for more aggregate bandwidth.\n\nResilience patterns are heavily tested. A single Direct Connect link is a single point of failure. For high resilience use connections at two different Direct Connect locations, and for maximum resilience use two connections at each of two locations. A cost-effective backup is a Site-to-Site VPN as failover for a Direct Connect link, using BGP to prefer the Direct Connect path. If you need link aggregation of multiple connections at one location, use a LAG.",
    taglishExplanation:
      "Ang Direct Connect ay dedicated na koneksyon mula sa data center mo papunta sa AWS. Dedicated na 1, 10, o 100 Gbps, at ang hosted ay nagsisimula sa 50 Mbps. Consistent ang latency, pero inaabot ng linggo ang setup at hindi naka-encrypt bilang default, kaya magdagdag ng VPN over Direct Connect o MACsec. May private VIF para sa VPC, public VIF para sa public AWS services, at transit VIF para sa Transit Gateway. Ang Site-to-Site VPN ay IPsec sa internet, dalawang tunnel bawat connection, at minuto lang ang setup. Para sa resilience: dalawang location ang high resilience, at dalawang connection sa bawat isa ng dalawang location ang maximum. Ang VPN ay murang backup ng Direct Connect.",
    analogy:
      "Direct Connect is a private road you pay to have built between your office and AWS: smooth and predictable, but it takes time and anyone on it can see the cars unless you add tinted windows. A VPN is a convoy in armoured vehicles on the public highway: ready immediately and private inside, but subject to traffic. Smart companies build the private road and keep the convoy as the backup route.",
    whyItExists:
      "Hybrid workloads need reliable bandwidth, predictable latency and private paths to the cloud that the public internet cannot always provide, and they also need a fast way to connect before a dedicated link is ready.",
    flow: "On-premises router -> Direct Connect location -> private/public/transit VIF -> VPC, S3 or Transit Gateway ; backup: IPsec VPN over internet -> VGW/TGW",
    withoutIt: [
      "Large data transfers would use the internet with variable performance and higher cost",
      "Latency-sensitive hybrid applications would suffer unpredictable delays",
      "A failed single link would cut hybrid connectivity entirely",
    ],
    bestUseCases: [
      "Direct Connect for steady high-bandwidth hybrid workloads and large data transfers",
      "Two Direct Connect locations for high availability",
      "Site-to-Site VPN as an immediate, encrypted link or as backup for Direct Connect",
      "Direct Connect Gateway for multi-Region and multi-account VPC access",
      "VPN over Direct Connect public VIF for encrypted traffic on a private link",
    ],
    poorUseCases: [
      "Direct Connect when connectivity is needed within days",
      "A single Direct Connect link for a mission-critical workload",
      "Assuming Direct Connect traffic is encrypted without adding VPN or MACsec",
      "VPN as the only path for sustained multi-gigabit transfers",
    ],
    alternatives: [
      { need: "Connect individual remote users securely", choose: "AWS Client VPN" },
      { need: "Hub-and-spoke across many VPCs and sites", choose: "AWS Transit Gateway" },
      { need: "Move bulk data offline", choose: "AWS Snow Family" },
      { need: "Accelerate internet VPN performance", choose: "Accelerated Site-to-Site VPN with Global Accelerator" },
    ],
    keyFeatures: [
      "Direct Connect: dedicated 1, 10, 100 Gbps and hosted from 50 Mbps",
      "Weeks to provision, not encrypted by default, optional MACsec or VPN over DX",
      "VIF types: private, public, transit",
      "Direct Connect Gateway for multi-Region access",
      "Site-to-Site VPN: IPsec, two tunnels per connection, about 1.25 Gbps each, minutes to create",
      "BGP for dynamic routing and path preference",
      "LAG for aggregating connections at one location, ECMP over TGW for VPN",
    ],
    availability:
      "Two connections at two locations is high resilience, and two connections at each of two locations is maximum resilience. VPN over the internet is a cost-effective failover path.",
    security:
      "Direct Connect is private but not encrypted. Add MACsec or an IPsec VPN when the data is sensitive. VPN tunnels are encrypted with IPsec.",
    pricingLogic:
      "Direct Connect charges a port-hour fee and lower data transfer out rates. VPN charges per connection-hour plus standard data transfer. A VPN backup is much cheaper than a second Direct Connect link.",
    examKeywords: [
      "dedicated connection",
      "consistent latency",
      "encrypted over Direct Connect",
      "quick setup",
      "backup connectivity",
      "multi-Region VPC access",
      "maximum resilience",
    ],
    examTraps: [
      "Direct Connect is not encrypted by default. If encryption is required, add VPN or MACsec.",
      "One Direct Connect connection is a single point of failure, even though AWS's side is redundant.",
      "A VPN is the fast answer when the deadline is days. Direct Connect takes weeks.",
      "Reaching VPCs in several Regions over one connection needs a Direct Connect Gateway.",
    ],
    architectureDiagram: `On premises ==Direct Connect (location A)== [DX Gateway] --> VPC us-east-1
            ==Direct Connect (location B)==        \\--> VPC eu-west-1
            ..IPsec VPN over internet (backup, BGP lower preference)..> [VGW / TGW]`,
    architectureCaption: "Two private links at different locations, with a VPN as the third path.",
    mentorTip:
      "Memorise the ladder: speed to deploy (VPN, days) versus consistency (Direct Connect, weeks), and resilience (two locations, then two connections each).",
    questionIds: [
      "q-direct-connect-vpn-resilience-1",
      "q-direct-connect-vpn-resilience-2",
      "q-direct-connect-vpn-resilience-3",
    ],
  },
  {
    id: "api-gateway-types-throttling",
    moduleId: "phase-misc",
    category: "Front-End Web and Mobile",
    title: "API Gateway: API Types, Endpoints, Throttling and Authorizers",
    shortName: "API Gateway in depth",
    tier: 1,
    domains: [3, 1, 2],
    examImportance: "high",
    oneLiner:
      "API Gateway puts a managed front door on your backends, and the exam asks which API type, which endpoint type, how callers authenticate and what happens under load.",
    englishExplanation:
      "Amazon API Gateway offers three API types. REST APIs have the fullest feature set: request validation, API keys and usage plans, caching, WAF integration, canary releases and private endpoints. HTTP APIs are simpler, cheaper and lower latency, with JWT authorizers and Lambda or HTTP backends, but fewer features. WebSocket APIs keep a persistent two-way connection for chat and live updates. A backend can be Lambda, an HTTP service, or another AWS service.\n\nEndpoint types decide where the API is reachable from. Edge-optimised endpoints route requests through CloudFront edge locations to help geographically spread clients. Regional endpoints serve clients in the same Region and are the usual choice when you front it with your own CloudFront. Private endpoints are reachable only from a VPC through an interface endpoint.\n\nAuthentication and protection are common questions. IAM authorisation uses signed requests and suits internal callers. A Cognito user pool authorizer validates tokens from your user directory. A Lambda authorizer runs your own logic for custom tokens. Throttling defaults to 10,000 requests per second per Region with a burst of 5,000 across all APIs in an account, and you can set stage and method limits and per-client usage plans. Throttled calls return 429. Caching (default TTL 300 seconds) reduces backend load and latency. Integration timeout defaults to 29 seconds, so long work should be asynchronous, and a 504 means the backend did not answer in time. Stages and canary releases support gradual deployment.",
    taglishExplanation:
      "May tatlong API type ang API Gateway. Ang REST API ay kumpleto ang features: request validation, API keys, usage plans, caching, WAF, at canary. Ang HTTP API ay mas simple, mas mura, at mas mabilis pero mas kaunti ang features. Ang WebSocket API ay para sa two-way na koneksyon tulad ng chat. Sa endpoint types: edge-optimized ay dumadaan sa CloudFront edge, regional ay para sa clients sa parehong Region, at private ay sa loob lang ng VPC. Sa authentication: IAM, Cognito user pool authorizer, o Lambda authorizer. Default na throttle ay 10,000 request kada segundo kada Region, 429 ang error kapag lumampas. May caching na 300 segundo ang default. Ang timeout ay 29 segundo, kaya ang matagal na trabaho ay gawing asynchronous.",
    analogy:
      "A hotel concierge desk in front of many departments. It checks your ID (authorizers), limits how many guests can be served per minute (throttling), keeps copies of frequent answers (caching) and routes each request to the right department (backend). Different desks exist for walk-ins, the VIP lounge and the internal staff entrance, which are the endpoint types.",
    whyItExists:
      "Backends should not each implement authentication, throttling, caching and versioning. A managed gateway handles those concerns once and scales without servers.",
    flow: "Client -> API Gateway (authorizer, throttle, cache) -> integration (Lambda / HTTP / AWS service) -> response",
    withoutIt: [
      "Each service would implement its own authentication and rate limiting",
      "Backends would be directly exposed to traffic spikes and abuse",
      "Gradual deployments and versioned APIs would need custom routing",
    ],
    bestUseCases: [
      "REST API with caching and usage plans for a public product API",
      "HTTP API for low-cost, low-latency Lambda backends with JWT auth",
      "WebSocket API for chat and live dashboards",
      "Private API for internal microservices reachable only from a VPC",
      "Canary release to shift a small percentage of traffic to a new version",
    ],
    poorUseCases: [
      "Long-running synchronous requests beyond the 29-second default timeout",
      "REST API when only simple proxying is needed and cost matters (consider HTTP API)",
      "Exposing a private API through the internet endpoint",
      "Relying on API keys alone as authentication",
    ],
    alternatives: [
      { need: "Layer 7 load balancing of web servers", choose: "Application Load Balancer" },
      { need: "GraphQL with real-time subscriptions", choose: "AWS AppSync" },
      { need: "Cache static content globally", choose: "Amazon CloudFront" },
      { need: "User sign-in and tokens", choose: "Amazon Cognito" },
    ],
    keyFeatures: [
      "API types: REST, HTTP, WebSocket",
      "Endpoint types: edge-optimised, Regional, private",
      "Authorisation: IAM, Cognito user pool authorizer, Lambda authorizer, JWT (HTTP API)",
      "Throttling: 10,000 requests per second default with 5,000 burst per Region, 429 on limit",
      "Caching with default TTL 300 seconds (REST API)",
      "Usage plans and API keys, request validation, WAF integration",
      "Stages, stage variables and canary deployments, 29-second default integration timeout",
    ],
    availability:
      "API Gateway is Regional and spans multiple AZs automatically. For multi-Region availability, deploy the API in each Region and use Route 53 failover or latency routing.",
    security:
      "Combine an authorizer with WAF, TLS and resource policies. Use private endpoints with VPC endpoint policies for internal APIs and CloudWatch logging for audit.",
    pricingLogic:
      "You pay per million API calls and for data transfer, with HTTP APIs significantly cheaper than REST APIs. Caching is charged by cache size per hour.",
    examKeywords: [
      "throttling",
      "429",
      "usage plan",
      "API key",
      "private API",
      "WebSocket",
      "Lambda authorizer",
      "cache API responses",
    ],
    examTraps: [
      "API keys and usage plans control quotas, not authentication. Use an authorizer for security.",
      "The default timeout is 29 seconds. A long job must be asynchronous with a queue or Step Functions.",
      "HTTP APIs lack some REST features such as API keys with usage plans and WAF integration, so read the requirement carefully.",
      "Edge-optimised endpoints use CloudFront managed by API Gateway, which is different from placing your own CloudFront in front.",
    ],
    architectureDiagram: `Client --> [API Gateway]
            |- authorizer: Cognito / Lambda / IAM
            |- throttle + usage plan
            |- cache (TTL 300s)
            v
      Lambda / HTTP service / DynamoDB (direct integration)
   WebSocket API: persistent two-way connection for live updates`,
    architectureCaption: "Authentication, throttling and caching happen before the backend is touched.",
    mentorTip:
      "Choose the type by features needed (REST for caching and usage plans, HTTP for cheap and fast), then the endpoint by who is calling (edge, Regional or private).",
    questionIds: [
      "q-api-gateway-types-throttling-1",
      "q-api-gateway-types-throttling-2",
      "q-api-gateway-types-throttling-3",
    ],
  },
  {
    id: "cognito-user-vs-identity-pools",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "Cognito User Pools vs Identity Pools",
    shortName: "Cognito pools",
    tier: 1,
    domains: [1],
    examImportance: "high",
    oneLiner:
      "A user pool signs people in and gives them tokens. An identity pool trades those tokens for temporary AWS credentials.",
    englishExplanation:
      "Amazon Cognito has two parts that solve different problems and are often used together. A user pool is a user directory. It handles sign-up and sign-in, password policies, multi-factor authentication, account recovery, a hosted sign-in page, and federation with social providers and SAML or OIDC identity providers. After a successful sign-in it issues JSON Web Tokens (ID, access and refresh tokens). Those tokens prove who the user is to your application and can be validated by API Gateway through a Cognito authorizer or by an Application Load Balancer.\n\nAn identity pool, also called federated identities, answers a different question: how does a user get permission to call AWS services directly? It accepts proof of identity from a user pool, a social provider, a SAML provider, or allows unauthenticated guest access, and exchanges it for temporary AWS credentials through STS, using IAM roles that you define for authenticated and unauthenticated users. That lets a mobile app upload to S3 or read DynamoDB with the user's own limited permissions and no embedded keys.\n\nThe exam shortcut is the verb. 'Sign up, sign in, user directory, tokens, hosted UI' is a user pool. 'Access S3 or DynamoDB directly from the app, temporary AWS credentials, guest access' is an identity pool. For employees signing in to many AWS accounts with corporate credentials, IAM Identity Center is the better fit than Cognito.",
    taglishExplanation:
      "May dalawang bahagi ang Cognito na magkaibang problema ang sinasagot. Ang user pool ay user directory: sign-up, sign-in, password policy, MFA, hosted UI, at federation sa social o SAML. Pagkatapos mag-sign in, magbibigay ito ng JWT tokens na puwedeng i-validate ng API Gateway o ALB. Ang identity pool ay nagpapalit ng patunay ng identity, galing sa user pool, social, SAML, o guest, para maging pansamantalang AWS credentials gamit ang STS at IAM role, kaya direktang makaka-access ang app sa S3 o DynamoDB nang walang naka-embed na key. Shortcut: sign-in at tokens ay user pool, AWS credentials ay identity pool. Para sa empleyado sa maraming AWS account, IAM Identity Center.",
    analogy:
      "A user pool is the front desk that checks your passport and issues a visitor badge with your name on it. An identity pool is the security office that looks at that badge and hands you a temporary key card that opens specific rooms in the building. The badge says who you are. The key card says what you may open.",
    whyItExists:
      "Building sign-in, password reset, MFA and token handling for every app is slow and risky. And embedding long-lived AWS keys in mobile or web apps is unsafe. Cognito supplies managed authentication and short-lived, scoped AWS credentials.",
    flow: "User -> user pool sign-in (password, MFA, social) -> JWT tokens -> app calls API Gateway with token ; optional: tokens -> identity pool -> STS -> temporary AWS credentials -> S3 / DynamoDB",
    withoutIt: [
      "You would build and secure your own user database and login flows",
      "Mobile apps might embed long-lived AWS access keys",
      "Social and enterprise federation would need custom integration",
    ],
    bestUseCases: [
      "User pool for customer sign-up and sign-in on a web or mobile app",
      "User pool authorizer on API Gateway to protect an API",
      "Identity pool for direct, scoped access to S3 or DynamoDB from a mobile app",
      "Identity pool unauthenticated role for limited guest access",
      "Social or SAML federation into a user pool",
    ],
    poorUseCases: [
      "Using an identity pool alone to store user profiles or handle sign-in",
      "Using Cognito for workforce single sign-on across many AWS accounts (use IAM Identity Center)",
      "Giving the unauthenticated role broad permissions",
      "Embedding IAM user keys in a mobile app instead of using identity pools",
    ],
    alternatives: [
      { need: "Workforce SSO to multiple AWS accounts and apps", choose: "AWS IAM Identity Center" },
      { need: "Managed Microsoft Active Directory", choose: "AWS Directory Service" },
      { need: "Authenticate users at an Application Load Balancer", choose: "ALB with Cognito or OIDC authentication" },
      { need: "Custom token logic for an API", choose: "API Gateway Lambda authorizer" },
    ],
    keyFeatures: [
      "User pool: directory, sign-up and sign-in, MFA, hosted UI, social and SAML/OIDC federation",
      "User pool tokens: ID, access, refresh (JWT)",
      "Identity pool: exchanges identities for temporary AWS credentials via STS",
      "Authenticated and unauthenticated IAM roles in the identity pool",
      "Works with API Gateway Cognito authorizer and ALB authentication",
      "Fine-grained access with IAM policy variables such as the identity ID",
      "Lambda triggers to customise sign-up and sign-in flows",
    ],
    availability:
      "Cognito is a managed, Regional, highly available service that scales to millions of users without capacity planning.",
    security:
      "Enable MFA, use strong password policies, protect against compromised credentials with advanced security features, and scope identity pool roles to the minimum, using the user's identity ID in policies.",
    pricingLogic:
      "User pools are priced per monthly active user with a generous free tier. Identity pools themselves are free, and you pay for the AWS resources users access.",
    examKeywords: [
      "user directory",
      "sign-up and sign-in",
      "JWT",
      "social identity provider",
      "temporary AWS credentials",
      "unauthenticated guest access",
      "mobile app direct S3 access",
    ],
    examTraps: [
      "User pools authenticate. Identity pools authorise access to AWS services. Many questions need both.",
      "Only identity pools issue AWS credentials. User pool tokens alone cannot call S3.",
      "Cognito is for customers and app users. Workforce SSO to AWS accounts is IAM Identity Center.",
      "API Gateway can validate user pool tokens natively with a Cognito authorizer, with no Lambda needed.",
    ],
    architectureDiagram: `User --> [Cognito User Pool]  (sign-in, MFA, social/SAML) --> JWT tokens
                |                                               |
                |                              [API Gateway: Cognito authorizer]
                v
         [Cognito Identity Pool] --STS--> temporary credentials --> S3 / DynamoDB
                (authenticated role / unauthenticated guest role)`,
    architectureCaption: "User pool proves who you are, identity pool decides which AWS resources you can reach.",
    mentorTip:
      "Ask what the result must be: a token for your own backend is a user pool, temporary AWS credentials for direct access to AWS services is an identity pool.",
    questionIds: [
      "q-cognito-user-vs-identity-pools-1",
      "q-cognito-user-vs-identity-pools-2",
      "q-cognito-user-vs-identity-pools-3",
    ],
  },
];
