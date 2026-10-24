import type { Lesson } from "@/lib/types";

export const deepDivesL: Lesson[] = [
  {
    id: "rds-storage-performance-insights-maintenance",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "RDS Operations: Storage Types, Autoscaling, Performance Insights and Maintenance",
    shortName: "RDS operations",
    tier: 1,
    domains: [3, 2, 4],
    examImportance: "high",
    oneLiner:
      "Choose RDS storage by IOPS need, let it grow automatically, find slow queries with Performance Insights, and understand what maintenance and changes do to availability.",
    englishExplanation:
      "RDS storage comes in General Purpose SSD (gp2 and gp3), Provisioned IOPS SSD (io1 and io2) for I/O-intensive production databases that need consistent high IOPS and low latency, and legacy magnetic. gp3 lets you set IOPS and throughput independently of size, which is usually cheaper than gp2 for the same performance. If a question describes a database that needs sustained very high IOPS, the answer is Provisioned IOPS. Storage autoscaling lets RDS grow storage automatically up to a maximum you set when free space runs low, which avoids out-of-space outages without over-provisioning, but after a storage change there is a cool-down of about six hours before the next one, and storage cannot be reduced.\n\nTo diagnose performance, Performance Insights shows database load over time broken down by wait events, SQL statements, hosts and users, so you can see which query is the bottleneck. AWS has been folding Performance Insights into Amazon CloudWatch Database Insights, which gives the same database load view, so you may see either name. The exam concept is identical. Enhanced Monitoring gathers operating system metrics at intervals as short as one second through an agent on the instance, while the standard CloudWatch metrics come from the hypervisor. For connection-heavy or spiky workloads add RDS Proxy, for read-heavy workloads add read replicas, and for repeated reads add a cache such as ElastiCache.\n\nConfiguration and maintenance are separate topics. Parameter groups hold engine settings, and some parameters are dynamic while static ones need a reboot to apply. Option groups enable engine features such as Oracle options. RDS applies patches in a weekly maintenance window you choose. In a Multi-AZ deployment the standby is patched first and then a failover occurs, so downtime is brief, while a single-AZ instance is unavailable during patching. Changing the instance class causes an outage or failover, so schedule it in a window. Minor version upgrades can be automatic, and major version upgrades are deliberate. Test major upgrades by restoring a snapshot into a new instance.",
    taglishExplanation:
      "Ang RDS storage ay General Purpose SSD (gp2, gp3), Provisioned IOPS (io1, io2) para sa production na nangangailangan ng mataas at tuloy-tuloy na IOPS, at legacy na magnetic. Sa gp3, puwedeng itakda ang IOPS at throughput nang hiwalay sa laki. Ang storage autoscaling ay awtomatikong nagpapalaki ng storage hanggang sa maximum na itinakda mo, may cool-down na mga anim na oras, at hindi mababawasan ang storage. Para sa diagnosis: ang Performance Insights ay nagpapakita ng database load ayon sa wait events at SQL, at unti-unti itong pinapalitan ng CloudWatch Database Insights na ganoon din ang ipinapakita. Ang Enhanced Monitoring ay OS metrics hanggang isang segundo. Sa maintenance: sa Multi-AZ, una ang standby tapos failover kaya maikli ang downtime.",
    analogy:
      "A restaurant kitchen. Provisioned IOPS storage is reserving the fastest burners for the busy dinner rush, gp3 is a flexible stove where you dial heat separately from pan size, and autoscaling adds shelf space when the pantry fills. Performance Insights is the head chef's ticket board showing which order is slowing the line, and the maintenance window is the quiet hour when equipment is serviced, one stove at a time if you have a backup stove (Multi-AZ).",
    whyItExists:
      "Databases fail from running out of space, from slow queries nobody can see, and from poorly timed maintenance. These features make capacity, visibility and change management routine rather than emergencies.",
    flow: "Pick storage type (gp3 / io2) -> enable storage autoscaling with a maximum -> monitor with Performance Insights and Enhanced Monitoring -> change parameters and patch in the maintenance window",
    withoutIt: [
      "A full disk would stop the database",
      "Slow queries would be found by guesswork",
      "Patching a single-AZ database would cause an unplanned outage",
    ],
    bestUseCases: [
      "Provisioned IOPS (io2) for latency-sensitive transactional databases with sustained high IOPS",
      "gp3 for most general workloads, tuning IOPS and throughput separately",
      "Storage autoscaling with a sensible maximum",
      "Performance Insights to find the top SQL and wait events",
      "Multi-AZ so maintenance and failover cause only a brief interruption",
    ],
    poorUseCases: [
      "Expecting to shrink allocated storage",
      "Relying on single-AZ instances for production maintenance windows",
      "Changing static parameters and forgetting that a reboot is required",
      "Using larger instance classes to fix a missing index",
    ],
    alternatives: [
      { need: "Storage that scales automatically with fine-grained cost", choose: "Amazon Aurora" },
      { need: "Absorb connection spikes from serverless clients", choose: "Amazon RDS Proxy" },
      { need: "Scale reads", choose: "Read replicas or ElastiCache" },
      { need: "Unpredictable load with minimal management", choose: "Aurora Serverless v2" },
    ],
    keyFeatures: [
      "Storage: gp2, gp3, io1, io2 (Provisioned IOPS), magnetic legacy",
      "gp3 sets IOPS and throughput independently of size",
      "Storage autoscaling up to a maximum, cool-down of about six hours, no shrinking",
      "Performance Insights, now part of CloudWatch Database Insights, and Enhanced Monitoring (OS metrics)",
      "Parameter groups (dynamic vs static) and option groups",
      "Weekly maintenance window, Multi-AZ patches standby first",
      "Minor version auto upgrade, major upgrades planned and tested",
    ],
    availability:
      "Multi-AZ reduces patching and failover downtime to a brief interruption. Instance class changes still cause a failover or outage, so plan them.",
    security:
      "Encrypt storage at creation with KMS, use SSL/TLS in transit and restrict access with security groups and IAM database authentication where supported.",
    pricingLogic:
      "Provisioned IOPS costs more than gp3, and over-allocated IOPS or storage is wasted spend. Autoscaling avoids over-provisioning, and longer retention of performance history is charged.",
    examKeywords: [
      "sustained IOPS",
      "storage autoscaling",
      "Performance Insights",
      "wait events",
      "maintenance window",
      "parameter group",
      "static parameter",
      "slow queries",
    ],
    examTraps: [
      "Storage autoscaling grows storage only. It never shrinks it.",
      "Performance Insights shows database load and top SQL. Enhanced Monitoring shows operating system metrics.",
      "Static parameter changes take effect after a reboot.",
      "A single-AZ instance is unavailable during patching. Multi-AZ makes it a brief failover.",
    ],
    architectureDiagram: `[RDS instance gp3/io2 + storage autoscaling (max 2 TB)]
   | Performance Insights: load by wait event / top SQL
   | Enhanced Monitoring: OS metrics (1 s)
Maintenance window (Sun 03:00): patch standby --> failover --> patch old primary`,
    architectureCaption: "Capacity, visibility and change windows for a managed database.",
    mentorTip:
      "Match symptom to tool: out of space is autoscaling, slow query is Performance Insights, sustained high IOPS is Provisioned IOPS, patch downtime is Multi-AZ.",
    questionIds: [
      "q-rds-storage-performance-insights-maintenance-1",
      "q-rds-storage-performance-insights-maintenance-2",
      "q-rds-storage-performance-insights-maintenance-3",
    ],
  },
  {
    id: "elastic-beanstalk-deployment-policies",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "Elastic Beanstalk: Environments and Deployment Policies",
    shortName: "Beanstalk deployments",
    tier: 2,
    domains: [2, 3],
    examImportance: "medium",
    oneLiner:
      "Beanstalk deploys your code for you, and the deployment policy you choose trades speed, capacity during the update and ease of rollback.",
    englishExplanation:
      "AWS Elastic Beanstalk lets developers upload application code and have AWS provision and manage the environment: EC2 instances in an Auto Scaling group, a load balancer, health monitoring and, optionally, a database. It supports common platforms such as Java, .NET, Node.js, Python, PHP, Ruby, Go and Docker. A web server environment serves HTTP traffic. A worker environment pulls jobs from an SQS queue, which suits background processing. You keep control of the underlying resources and can customise them with configuration files in .ebextensions. Beanstalk itself is free and you pay for the resources it creates.\n\nThe deployment policy decides how a new version reaches the instances. All at once deploys to every instance together, which is fastest but causes downtime if the new version fails. Rolling updates a batch of instances at a time, so capacity is reduced during the deployment. Rolling with additional batch launches a new batch first so full capacity is maintained throughout. Immutable launches a fresh set of instances in a new Auto Scaling group, shifts traffic when they are healthy and terminates the old ones, which keeps capacity, avoids changing running instances and makes rollback simple, at the cost of temporarily running double the instances. Traffic splitting sends a configurable percentage of traffic to the new version for a canary test and then completes or rolls back. Blue/green is done by cloning the environment and swapping the environment URLs, which gives the safest cutover and instant rollback.\n\nOne design rule is tested often. Do not put a production database inside the Beanstalk environment, because deleting or recreating the environment deletes the database. Create the database separately with RDS and connect to it. Managed platform updates can apply patches during a maintenance window, and environment health uses enhanced reporting.",
    taglishExplanation:
      "Ang Elastic Beanstalk ay nag-a-upload ng code mo at ang AWS na ang bahala sa environment: EC2 sa Auto Scaling group, load balancer, health monitoring, at optional na database. May web server environment at worker environment na kumukuha ng jobs sa SQS. Libre ang Beanstalk, ang resources lang ang binabayaran. Ang deployment policy: All at once (pinakamabilis, may downtime kapag pumalya), Rolling (batch-batch, bawas ang capacity), Rolling with additional batch (buo ang capacity), Immutable (bagong instances sa bagong ASG, madaling rollback pero pansamantalang doble ang instances), Traffic splitting (canary), at Blue/green (clone ng environment at swap ng URL). Huwag ilagay ang production database sa loob ng environment.",
    analogy:
      "Replacing the staff at a restaurant. All at once is sending everyone home and bringing in the new team, with the doors closed for a while. Rolling swaps a few waiters at a time. Rolling with an additional batch brings in extra waiters first so tables are never short. Immutable opens a second identical restaurant and moves the customers when it is ready. Blue/green keeps the old restaurant open next door so you can send customers back instantly.",
    whyItExists:
      "Many teams want to deploy web applications without managing infrastructure details, but still need safe release strategies and control over capacity during changes.",
    flow: "Upload application version -> choose deployment policy -> instances updated or replaced -> health checks pass -> traffic served by new version ; blue/green: swap environment URLs",
    withoutIt: [
      "Developers would assemble load balancers, Auto Scaling and monitoring by hand",
      "Releases would cause avoidable downtime",
      "Rollbacks would be slow and risky",
    ],
    bestUseCases: [
      "Quick deployment of a standard web application with minimal infrastructure work",
      "Immutable or blue/green deployments for production where rollback speed matters",
      "Traffic splitting to test a new version on a small share of users",
      "Worker environments for SQS-driven background jobs",
      "RDS created outside the environment and connected by endpoint",
    ],
    poorUseCases: [
      "All at once for a production application that cannot tolerate downtime",
      "Rolling when full capacity is required during deployment (use an additional batch or immutable)",
      "A production database inside the environment",
      "Highly custom container orchestration (use ECS or EKS)",
    ],
    alternatives: [
      { need: "Containers with fine control", choose: "Amazon ECS or EKS" },
      { need: "Simple managed web app from source or image", choose: "AWS App Runner" },
      { need: "Serverless functions", choose: "AWS Lambda" },
      { need: "Full-stack web and mobile app hosting", choose: "AWS Amplify" },
    ],
    keyFeatures: [
      "Web server and worker environments, platforms for common languages and Docker",
      "Provisions EC2, Auto Scaling, load balancer and health monitoring",
      "Deployment policies: all at once, rolling, rolling with additional batch, immutable, traffic splitting",
      "Blue/green by swapping environment URLs",
      "Customisation with .ebextensions and managed platform updates",
      "No charge for Beanstalk, pay for the underlying resources",
      "Keep the database outside the environment",
    ],
    availability:
      "Environments run across multiple AZs through Auto Scaling. Immutable and blue/green deployments protect availability during releases.",
    security:
      "Use instance profiles with least privilege, security groups, HTTPS on the load balancer and keep secrets in Secrets Manager or Parameter Store.",
    pricingLogic:
      "Beanstalk has no additional charge. Immutable and blue/green deployments temporarily double the instance cost during the release.",
    examKeywords: [
      "upload code, no infrastructure",
      "immutable deployment",
      "blue/green",
      "traffic splitting",
      "worker environment",
      "all at once",
      ".ebextensions",
      "rollback",
    ],
    examTraps: [
      "All at once is fastest and the only policy with full downtime on failure.",
      "Rolling reduces capacity during deployment. Rolling with additional batch does not.",
      "Immutable does not touch running instances, so rollback is fast, but it temporarily doubles instance count.",
      "A database inside the environment is deleted when the environment is terminated.",
    ],
    architectureDiagram: `Environment "prod" (blue)  <--- users (URL swap) --->  Environment "prod-v2" (green)
   Immutable: [old ASG v1] + [new ASG v2 (fresh instances)] --healthy--> terminate v1
   Rolling   : [batch1 v2][batch2 v1][batch3 v1] -> ... (capacity reduced)
   DB: RDS (outside the environment)`,
    architectureCaption: "Deployment policy sets capacity, speed and rollback behaviour.",
    mentorTip:
      "Rank the policies by safety: all at once, rolling, rolling with additional batch, immutable, then blue/green. Pick the cheapest one that meets the downtime and rollback requirement.",
    questionIds: [
      "q-elastic-beanstalk-deployment-policies-1",
      "q-elastic-beanstalk-deployment-policies-2",
      "q-elastic-beanstalk-deployment-policies-3",
    ],
  },
  {
    id: "dr-implementation-patterns-on-aws",
    moduleId: "phase-12-resilience",
    category: "Resilience",
    title: "Implementing Disaster Recovery on AWS: Services for Each Strategy",
    shortName: "DR implementation",
    tier: 1,
    domains: [2, 4],
    examImportance: "critical",
    oneLiner:
      "Each DR strategy is a combination of data replication, standby infrastructure and traffic failover, and the exam asks which AWS services deliver each one.",
    englishExplanation:
      "Disaster recovery planning starts with the recovery time objective (how long you can be down) and the recovery point objective (how much data you can lose). The four strategies sit on a cost versus speed ladder. Backup and restore keeps only backups in the recovery Region, so RPO is the age of the last backup and RTO is hours, because infrastructure is recreated from templates. Use AWS Backup with cross-Region copy, S3 replication, snapshot copies and CloudFormation to rebuild. Pilot light keeps the data layer continuously replicated and live, such as an Aurora Global Database secondary or a cross-Region read replica, with application servers defined but switched off, so you scale them up on failover and RTO is tens of minutes. Warm standby runs a complete but scaled-down copy that can serve traffic immediately and be scaled up, giving RTO in minutes. Multi-site active-active runs full capacity in two or more Regions serving traffic at once, using DynamoDB global tables, Aurora Global Database with write forwarding or other multi-writer designs, for RTO and RPO near zero at the highest cost.\n\nThree pieces make any strategy work. Data replication: S3 Cross-Region Replication, Aurora Global Database, DynamoDB global tables, RDS cross-Region replicas or snapshot copies, EBS snapshot copies, and Elastic Disaster Recovery for servers. Standby infrastructure: AMIs copied to the recovery Region, CloudFormation or StackSets to create stacks, Auto Scaling groups with minimum capacity zero or low, and pre-raised service quotas. Traffic failover: Route 53 failover or weighted records with health checks, or Global Accelerator for instant redirection without waiting for DNS caches.\n\nTesting is part of the design. Run regular failover drills, because an untested plan often fails on a forgotten dependency such as a missing parameter, secret, KMS key or quota in the recovery Region. Multi-AZ is not disaster recovery from a Regional failure, because it protects within one Region. Plan failback as well, which means replicating data back once the primary Region recovers.",
    taglishExplanation:
      "Nagsisimula ang DR sa RTO (gaano katagal puwedeng down) at RPO (gaano karaming data ang puwedeng mawala). Apat na strategy mula mura hanggang mabilis: Backup and restore (backup lang ang nasa recovery Region, RTO ay oras), Pilot light (naka-replicate ang data layer, patay ang app servers, RTO ay sampung minuto), Warm standby (kumpleto pero maliit na kopya, RTO ay minuto), at Multi-site active-active (buong capacity sa dalawa o higit pang Region, halos zero ang RTO at RPO). Tatlong piraso: data replication (S3 CRR, Aurora Global, DynamoDB global tables, snapshot copy, Elastic DR), standby infrastructure (AMI copy, CloudFormation, quotas), at traffic failover (Route 53 o Global Accelerator). Subukan palagi ang failover at tandaan na hindi DR ang Multi-AZ para sa Regional failure.",
    analogy:
      "A business keeping a second office for emergencies. Backup and restore is storing copies of the files in a safe and renting an empty office when disaster strikes. Pilot light is keeping the filing cabinets stocked and the lights off in a second office. Warm standby is a small staffed office ready to expand. Active-active is two full offices working all the time. Route 53 or Global Accelerator is the phone system that redirects calls to whichever office is open.",
    whyItExists:
      "Regional failures, bad deployments and data corruption happen. The right strategy balances the business cost of downtime against the cost of standing capacity.",
    flow: "Define RTO and RPO -> pick strategy -> replicate data to recovery Region -> prepare infrastructure (AMIs, templates, quotas) -> failover traffic (Route 53 / Global Accelerator) -> test and plan failback",
    withoutIt: [
      "A Regional outage would mean unbounded downtime and possible data loss",
      "Teams would overspend on active-active for workloads that tolerate hours of downtime",
      "Untested plans would fail at the moment they are needed",
    ],
    bestUseCases: [
      "Backup and restore with AWS Backup for low-criticality systems",
      "Pilot light with Aurora Global Database or a cross-Region replica for core databases",
      "Warm standby for important customer-facing systems",
      "Active-active with DynamoDB global tables and latency routing for mission-critical workloads",
      "Elastic Disaster Recovery for servers that cannot change",
    ],
    poorUseCases: [
      "Active-active for a workload that can tolerate a day of downtime",
      "Treating Multi-AZ as protection against a Regional failure",
      "Relying on a DR plan that has never been exercised",
      "Forgetting quotas, keys and secrets in the recovery Region",
    ],
    alternatives: [
      { need: "Continuous server replication to AWS", choose: "AWS Elastic Disaster Recovery" },
      { need: "Fast redirection without DNS caching", choose: "AWS Global Accelerator" },
      { need: "Policy-based backups across services", choose: "AWS Backup" },
      { need: "Repeatable environment creation", choose: "AWS CloudFormation" },
    ],
    keyFeatures: [
      "Four strategies: backup and restore, pilot light, warm standby, multi-site active-active",
      "RTO and RPO fall and cost rises along that ladder",
      "Data replication: S3 CRR, Aurora Global Database, DynamoDB global tables, snapshot copy, Elastic DR",
      "Infrastructure: copied AMIs, CloudFormation or StackSets, pre-raised quotas",
      "Traffic: Route 53 failover with health checks, or Global Accelerator",
      "Regular failover testing and a failback plan",
      "Multi-AZ covers AZ failure only, not a Regional disaster",
    ],
    availability:
      "Choose a strategy to meet the stated RTO and RPO and design every dependency, including identity, secrets, keys and DNS, to exist in the recovery Region.",
    security:
      "Encrypt replicated data with keys available in the recovery Region (multi-Region keys help), and keep backup copies in a separate account for protection against compromise.",
    pricingLogic:
      "Cost rises from backup and restore (storage only) to pilot light (replicated data plus minimal compute) to warm standby (running reduced capacity) to active-active (full capacity twice).",
    examKeywords: [
      "RTO",
      "RPO",
      "pilot light",
      "warm standby",
      "active-active",
      "cross-Region replica",
      "failover",
      "backup and restore",
    ],
    examTraps: [
      "Pilot light keeps data live and servers off. Warm standby keeps a scaled-down working copy running.",
      "Multi-AZ does not protect against loss of a whole Region.",
      "DNS failover depends on TTLs and caching. Global Accelerator fails over faster.",
      "Quotas are per Region, so the recovery Region may not allow the capacity you need until you ask.",
    ],
    architectureDiagram: `Primary Region                          Recovery Region
[App + DB] --replication-->             Backup/restore: backups only          RTO hours
                                        Pilot light   : DB replica live, app off   RTO tens of min
                                        Warm standby  : small full stack running   RTO minutes
                                        Active-active : full stack, serving traffic  RTO ~0
Route 53 health check / Global Accelerator --> fails traffic over`,
    architectureCaption: "More running capacity in the recovery Region means faster recovery and higher cost.",
    mentorTip:
      "Read the RTO and RPO numbers in the question, then pick the cheapest strategy that still meets them. Never pick active-active unless the numbers demand it.",
    questionIds: [
      "q-dr-implementation-patterns-on-aws-1",
      "q-dr-implementation-patterns-on-aws-2",
      "q-dr-implementation-patterns-on-aws-3",
    ],
  },
  {
    id: "cost-optimization-playbook-by-workload",
    moduleId: "phase-13-cost",
    category: "AWS Cost Management",
    title: "Cost Optimization Playbook: Compute, Storage, Database and Network Levers",
    shortName: "Cost playbook",
    tier: 1,
    domains: [4],
    examImportance: "critical",
    oneLiner:
      "Most savings come from a short list of moves: right-size, commit to steady usage, use Spot where you can, tier storage, and remove waste.",
    englishExplanation:
      "Cost optimisation is a habit of asking the same questions of every workload. For compute, first remove idle and oversized resources: use AWS Compute Optimizer and CloudWatch utilisation to right-size instances, shut down non-production environments outside working hours with Instance Scheduler or scheduled Auto Scaling, and consider Graviton instances for better price performance. Then match the purchasing option to the usage pattern: Savings Plans or Reserved Instances for the steady baseline, Spot Instances for interruptible work, and On-Demand for unpredictable peaks. Containers, Lambda and Fargate remove idle capacity for spiky workloads, and Auto Scaling keeps capacity aligned with demand.\n\nFor storage, use S3 lifecycle rules and Intelligent-Tiering to move cold data to cheaper classes, delete incomplete multipart uploads and old versions, move unattached EBS volumes and stale snapshots out of the account, choose gp3 over gp2 and match volume type to the workload, and use EFS lifecycle management. For databases, choose the right engine and capacity mode (on-demand for spiky DynamoDB tables and provisioned with auto scaling for steady ones), use Aurora Serverless for variable load, stop or schedule non-production databases, purchase reserved database instances for steady production, and trim backup retention and manual snapshots to what is needed. Use read replicas and caching to avoid scaling the primary.\n\nFor networking, keep traffic within an AZ and Region where design allows, use gateway endpoints for S3 and DynamoDB instead of NAT, put CloudFront in front of content, and be aware that public IPv4 addresses are charged hourly, including idle Elastic IPs and load balancer addresses, so release unused ones. Visibility makes savings stick: tag everything, activate cost allocation tags, set Budgets and anomaly detection, review Cost Explorer recommendations and Trusted Advisor cost checks, and use consolidated billing to share commitments. The Well-Architected cost principle is to pay only for what you use, measure efficiency and stop spending on undifferentiated heavy lifting by using managed services.",
    taglishExplanation:
      "Ang cost optimization ay ugali ng pagtatanong ng parehong tanong sa bawat workload. Sa compute: tanggalin ang idle at sobrang laki, gamitin ang Compute Optimizer para sa right-sizing, patayin ang non-production sa labas ng oras ng trabaho, at isaalang-alang ang Graviton. Pagkatapos: Savings Plans o Reserved para sa steady na baseline, Spot para sa kayang ma-interrupt, On-Demand para sa hindi tiyak na peak. Sa storage: lifecycle rules at Intelligent-Tiering, burahin ang unattached na EBS at lumang snapshot, gp3 kaysa gp2. Sa database: tamang capacity mode, Aurora Serverless, at bawasan ang backup retention. Sa network: gateway endpoint, CloudFront, at huwag mag-iwan ng hindi nagagamit na public IPv4 dahil may hourly charge.",
    analogy:
      "Running a household budget. Switch off lights in empty rooms (idle resources), buy a bus pass for your daily commute (commitments for the steady baseline) and use ride-sharing for odd trips (On-Demand), move rarely used items to a cheaper storage unit (tiering), and keep a receipt for every expense so you can see where the money goes (tags and Budgets).",
    whyItExists:
      "Cloud bills grow quietly. A repeatable checklist across compute, storage, database and network keeps spending proportional to the value delivered.",
    flow: "Measure (tags, Cost Explorer) -> remove waste -> right-size -> commit to the steady baseline -> tier and schedule -> monitor with Budgets and anomaly detection",
    withoutIt: [
      "Idle and oversized resources would run indefinitely",
      "Steady workloads would pay On-Demand rates",
      "Cold data would sit on expensive storage",
    ],
    bestUseCases: [
      "Compute Optimizer recommendations for right-sizing",
      "Savings Plans for the steady baseline with Spot and On-Demand for the rest",
      "Instance Scheduler to stop non-production resources overnight",
      "S3 lifecycle and Intelligent-Tiering, gp3 volumes, EFS lifecycle management",
      "Gateway endpoints, CloudFront and releasing unused public IPv4 addresses",
    ],
    poorUseCases: [
      "Buying commitments before right-sizing, which locks in waste",
      "Reserved capacity for workloads that may disappear",
      "Spot for jobs that cannot be interrupted",
      "Leaving unattached volumes, old snapshots and idle load balancers running",
    ],
    alternatives: [
      { need: "Right-sizing recommendations", choose: "AWS Compute Optimizer" },
      { need: "Cost visibility and forecasts", choose: "AWS Cost Explorer" },
      { need: "Alerts when spend exceeds a threshold", choose: "AWS Budgets and Cost Anomaly Detection" },
      { need: "Check for idle and underused resources", choose: "AWS Trusted Advisor" },
    ],
    keyFeatures: [
      "Right-size first, then commit to the baseline",
      "Savings Plans, Reserved Instances, Spot and On-Demand matched to usage patterns",
      "Scheduling non-production environments",
      "S3 lifecycle and Intelligent-Tiering, gp3, EFS lifecycle management",
      "DynamoDB on-demand vs provisioned, Aurora Serverless, reserved database instances",
      "Gateway endpoints, CloudFront, public IPv4 hourly charges",
      "Tags, Budgets, anomaly detection, Trusted Advisor, consolidated billing",
    ],
    availability:
      "Cost savings should respect availability requirements. Relax redundancy only for non-production, and keep Multi-AZ for production.",
    security:
      "Cost controls should not disable monitoring or backups. Use SCPs to prevent launching oversized or unapproved resources.",
    pricingLogic:
      "Think in a ladder: eliminate, shrink, commit, discount (Spot), tier and schedule. The earlier steps save the most and risk the least.",
    examKeywords: [
      "most cost-effective",
      "right-size",
      "steady-state",
      "interruptible",
      "idle resources",
      "lifecycle",
      "non-production",
      "reduce data transfer cost",
    ],
    examTraps: [
      "Right-size before committing, otherwise a commitment covers waste.",
      "Spot is cheapest but only for workloads that tolerate interruption.",
      "Unassociated Elastic IPs and other public IPv4 addresses cost money.",
      "The cheapest option that still meets the stated requirements is the answer, not the cheapest option overall.",
    ],
    architectureDiagram: `1 Eliminate idle (unattached EBS, old snapshots, idle ELB)
2 Right-size (Compute Optimizer)         3 Commit to baseline (Savings Plans / RI)
4 Discount interruptible work (Spot)     5 Tier and schedule (S3 lifecycle, stop non-prod)
6 Network: gateway endpoints, CloudFront, release unused public IPv4
7 Visibility: tags, Budgets, anomaly detection`,
    architectureCaption: "A cost ladder to climb in order.",
    mentorTip:
      "On cost questions, check whether the option meets every requirement first, then pick the cheapest. Wrong answers are often cheaper but break a stated requirement.",
    questionIds: [
      "q-cost-optimization-playbook-by-workload-1",
      "q-cost-optimization-playbook-by-workload-2",
      "q-cost-optimization-playbook-by-workload-3",
    ],
  },
  {
    id: "organizations-scp-control-tower-design",
    moduleId: "phase-1-iam",
    category: "Security, Identity, and Compliance",
    title: "Multi-Account Design: Organizations, SCP Strategy, Control Tower and Delegated Administration",
    shortName: "Multi-account design",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "Use many accounts as security boundaries, group them in organizational units, and apply guardrails from the top with SCPs and Control Tower.",
    englishExplanation:
      "AWS recommends separating workloads into multiple accounts because an account is the strongest isolation boundary for permissions, quotas, billing and blast radius. AWS Organizations manages them: a management account at the root, organizational units (OUs) that group accounts, and member accounts. Typical OUs separate security, infrastructure, workloads (production and non-production), sandbox and suspended accounts. Consolidated billing, shared commitments, organization-wide trails and sharing of resources through Resource Access Manager come with the organization.\n\nService control policies set the maximum permissions for accounts. SCPs attach to the root, an OU or an account, and inherit downward, so the effective permissions of an account are the intersection of every SCP above it and its own IAM policies. They never grant permissions and do not affect the management account or service-linked roles. There are two strategies. In the deny list approach, which is the default, the FullAWSAccess policy stays attached and you add explicit Deny statements for what must be blocked, such as leaving the approved Regions, disabling CloudTrail or removing the organization. In the allow list approach you remove FullAWSAccess and allow only specific services, which is stricter but needs more maintenance.\n\nAWS Control Tower automates a well-architected multi-account setup, called a landing zone. It creates a management account structure, a log archive account for central logs and an audit account for security tooling, configures IAM Identity Center for single sign-on, and offers an Account Factory to provision new accounts with baselines. Controls (formerly guardrails) enforce policy: preventive controls are implemented with SCPs and block actions, detective controls are implemented with AWS Config rules and report non-compliance, and proactive controls check CloudFormation templates before deployment. Delegated administrator accounts let you run services such as GuardDuty, Security Hub, Config and Backup from a security or tooling account instead of the management account, which should hold as little as possible.",
    taglishExplanation:
      "Inirerekomenda ng AWS na hiwa-hiwalay ang workloads sa maraming account dahil ang account ang pinakamatibay na hangganan para sa permissions, quota, billing, at blast radius. Ang Organizations ay may management account, mga OU na naggugrupo ng account, at mga member account. Ang SCP ay nagtatakda ng maximum na permission at namamana pababa; hindi ito nagbibigay ng permission at hindi tumatama sa management account. May deny list (default, may FullAWSAccess at dinadagdagan ng Deny) at allow list (mas mahigpit). Ang Control Tower ay nag-aautomate ng landing zone: log archive at audit accounts, IAM Identity Center, Account Factory. Ang controls ay preventive (SCP), detective (Config), at proactive (CloudFormation hooks). Gumamit ng delegated administrator para hindi gamitin ang management account.",
    analogy:
      "A company campus with separate buildings for finance, engineering and visitors. Each building has its own keys and fire doors (accounts). The campus rulebook posted at the gate (SCPs) says what nobody on campus may ever do, whatever their department allows. Control Tower is the facilities company that builds a standard campus, including a records building and a security office, and hands you a form to open a new building with the standard fittings (Account Factory).",
    whyItExists:
      "A single account mixes production with experiments and makes least privilege and cost attribution hard. Multiple accounts limit the blast radius and let central teams enforce rules that individual account administrators cannot override.",
    flow: "Management account -> OUs -> member accounts (Account Factory) ; SCPs inherit down the tree ; controls (preventive SCP, detective Config) ; logs to log archive account ; security tooling in a delegated administrator account",
    withoutIt: [
      "One compromised credential could reach every workload",
      "Developers could disable logging or use unapproved Regions",
      "New accounts would be configured inconsistently",
    ],
    bestUseCases: [
      "Separate accounts for production, development, security and shared services",
      "SCPs that deny leaving approved Regions or disabling CloudTrail",
      "Control Tower landing zone with Account Factory for new accounts",
      "A security account as delegated administrator for GuardDuty and Security Hub",
      "Organization trail and central log archive account",
    ],
    poorUseCases: [
      "Running everything in one account with only IAM policies for separation",
      "Using the management account for workloads",
      "Expecting SCPs to grant permissions",
      "Allow-list SCPs with no process to maintain them",
    ],
    alternatives: [
      { need: "Cap permissions for one identity", choose: "IAM permissions boundary" },
      { need: "Workforce single sign-on across accounts", choose: "IAM Identity Center" },
      { need: "Curated catalog of approved resources", choose: "AWS Service Catalog" },
      { need: "Evaluate configuration compliance", choose: "AWS Config" },
    ],
    keyFeatures: [
      "Organizations: management account, OUs, member accounts, consolidated billing",
      "SCPs: maximum permissions, inherited, never grant, not applied to the management account or service-linked roles",
      "Deny list (default FullAWSAccess plus Denys) vs allow list strategies",
      "Control Tower landing zone: log archive and audit accounts, IAM Identity Center, Account Factory",
      "Controls: preventive (SCP), detective (Config), proactive (CloudFormation hooks)",
      "Delegated administrators for security and management services",
      "Resource Access Manager sharing, tag policies and backup policies",
    ],
    availability:
      "Account separation limits the blast radius of failures and mistakes. Keep break-glass access to the management account well protected.",
    security:
      "Put guardrails in SCPs, protect the management account with MFA and minimal use, centralise logs in a locked-down account and use a delegated administrator for security services.",
    pricingLogic:
      "Organizations and SCPs are free. Control Tower itself has no extra charge, but the services it enables, such as Config and CloudTrail, are billed.",
    examKeywords: [
      "multiple accounts",
      "service control policy",
      "guardrail",
      "landing zone",
      "Account Factory",
      "delegated administrator",
      "deny list",
      "organizational unit",
    ],
    examTraps: [
      "SCPs do not grant access and do not apply to the management account.",
      "Effective permissions are the intersection of all SCPs on the path and the identity's policies.",
      "Preventive controls use SCPs. Detective controls use Config.",
      "Run workloads in member accounts, not in the management account.",
    ],
    architectureDiagram: `Root (SCP: deny disabling CloudTrail)
 |- OU Security : Log archive account, Audit / Security tooling (delegated admin: GuardDuty, Security Hub)
 |- OU Workloads
 |    |- OU Prod  (SCP: deny outside eu-west-1, us-east-1)
 |    \`- OU Dev
 \`- OU Sandbox (SCP: budget limits)
Management account: billing and Organizations only`,
    architectureCaption: "Accounts as boundaries, SCPs as guardrails.",
    mentorTip:
      "When a question asks how to stop every account, including administrators, from doing something, the answer is an SCP. When it asks how to set up many accounts consistently, think Control Tower.",
    questionIds: [
      "q-organizations-scp-control-tower-design-1",
      "q-organizations-scp-control-tower-design-2",
      "q-organizations-scp-control-tower-design-3",
    ],
  },
  {
    id: "ec2-networking-eni-eip-efa",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "EC2 Networking: ENIs, Elastic IPs, Enhanced Networking and EFA",
    shortName: "EC2 networking",
    tier: 2,
    domains: [3, 2, 4],
    examImportance: "medium",
    oneLiner:
      "A network interface carries an instance's addresses and security groups, an Elastic IP is a static public address, and ENA and EFA give high-speed networking for demanding workloads.",
    englishExplanation:
      "An elastic network interface (ENI) is a virtual network card. It has a primary private IPv4 address, optional secondary private addresses, an optional Elastic IP, a MAC address and one or more security groups. Every instance has a primary interface that cannot be detached, and you can attach additional interfaces, limited by instance type, within the same AZ. Because the ENI keeps its private IP, MAC and security groups, moving an ENI from a failed instance to a standby is a simple failover technique for legacy software with licences tied to a MAC address or clients that connect to a fixed private IP. Multiple interfaces also support a separate management network or a dual-homed appliance, but an ENI cannot be moved across AZs.\n\nAn Elastic IP address is a static public IPv4 address that you own until you release it and can remap between instances or ENIs, which preserves a public address across failures. A public IP that is auto-assigned at launch is released when the instance stops and is not retained. All public IPv4 addresses, including Elastic IPs and those attached to load balancers, are charged per hour, so release unused ones and prefer DNS names, load balancers and private connectivity. Use IPv6 where possible, because it is not subject to that charge.\n\nFor high-performance networking, the Elastic Network Adapter (ENA) provides enhanced networking, with higher bandwidth, lower latency and lower jitter on Nitro-based instances, and is enabled by default on current instance types. The Elastic Fabric Adapter (EFA) adds an OS-bypass interface for tightly coupled HPC and machine learning workloads using MPI or NCCL, and works best with instances in a cluster placement group. Network bandwidth grows with instance size, and traffic within a VPC supports jumbo frames of up to 9001 bytes MTU. A NAT instance, unlike a NAT gateway, requires the source and destination check to be disabled.",
    taglishExplanation:
      "Ang ENI ay virtual na network card na may primary private IPv4, optional na secondary private IPs, Elastic IP, MAC address, at security groups. May primary interface ang bawat instance na hindi matatanggal, at puwedeng magdagdag ng iba sa parehong AZ. Dahil nananatili ang private IP, MAC, at security groups ng ENI, puwede itong ilipat sa standby instance bilang simpleng failover. Ang Elastic IP ay static na public IPv4 na puwedeng ilipat-lipat; ang auto-assigned na public IP ay nawawala kapag na-stop ang instance. May hourly charge ang lahat ng public IPv4, kaya i-release ang hindi ginagamit. Ang ENA ay enhanced networking, at ang EFA ay para sa HPC at ML na may OS-bypass, kasama ang cluster placement group.",
    analogy:
      "An ENI is a detachable phone line with its own number and call-blocking rules. If a phone breaks, you unplug the line and plug it into a spare so callers never notice. An Elastic IP is a reserved public phone number you can redirect to any line. ENA is a faster cable, and EFA is a direct private hotline between machines in the same room for work that needs constant conversation.",
    whyItExists:
      "Addresses, security rules and network performance need to be managed separately from the instance itself, so identities survive instance replacement and demanding workloads get the bandwidth they need.",
    flow: "Instance primary ENI (private IP, SG) + extra ENI (management) ; failure: detach ENI/remap Elastic IP -> attach to standby ; HPC: EFA + cluster placement group",
    withoutIt: [
      "A replaced instance would get a new address and break fixed-IP clients",
      "Licences tied to a MAC address would break on failover",
      "Tightly coupled HPC jobs would be limited by standard network latency",
    ],
    bestUseCases: [
      "Moving an ENI to a standby instance for simple failover of legacy software",
      "A second ENI in a management subnet for administration traffic",
      "Elastic IP when a partner must allow-list a fixed public address",
      "ENA enhanced networking on current instance types for throughput-heavy workloads",
      "EFA with a cluster placement group for MPI and distributed training",
    ],
    poorUseCases: [
      "Holding unused Elastic IPs",
      "Expecting to attach an ENI from one AZ to an instance in another",
      "Relying on an auto-assigned public IP to stay the same across stop and start",
      "EFA for ordinary web workloads",
    ],
    alternatives: [
      { need: "Stable endpoint for many instances", choose: "Load balancer with DNS name" },
      { need: "Static IPs at the edge across Regions", choose: "AWS Global Accelerator" },
      { need: "Static IPs for a load balancer", choose: "Network Load Balancer with Elastic IPs" },
      { need: "Outbound internet access from private subnets", choose: "NAT gateway" },
    ],
    keyFeatures: [
      "ENI: primary and secondary private IPs, Elastic IP, MAC address, security groups",
      "Attach and detach additional ENIs within the same AZ, limits depend on instance type",
      "Elastic IP: static public IPv4, remappable, hourly charge for public IPv4",
      "Auto-assigned public IPs are released on stop",
      "ENA enhanced networking on Nitro instances",
      "EFA for OS-bypass HPC and ML, used with cluster placement groups",
      "Jumbo frames (9001 MTU) inside a VPC, source/destination check for NAT instances",
    ],
    availability:
      "Remapping an ENI or Elastic IP supports quick manual or scripted failover, but Auto Scaling with a load balancer is the more robust pattern for new designs.",
    security:
      "Security groups attach to ENIs, so a dedicated management ENI can use stricter rules. Keep sensitive instances without public addresses where possible.",
    pricingLogic:
      "ENIs are free. Public IPv4 addresses are charged hourly whether or not they are in use, and cross-AZ and internet data transfer add cost.",
    examKeywords: [
      "network interface",
      "static IP",
      "failover by moving the ENI",
      "MAC address licence",
      "Elastic Fabric Adapter",
      "enhanced networking",
      "MPI",
      "management network",
    ],
    examTraps: [
      "An ENI is bound to one AZ. It cannot be moved across AZs.",
      "An auto-assigned public IP changes on stop and start. An Elastic IP does not.",
      "EFA is for tightly coupled HPC and ML, not general web traffic.",
      "Idle Elastic IPs and other public IPv4 addresses are charged.",
    ],
    architectureDiagram: `[Primary instance] eth0 (10.0.1.10, SG-app)  +  eth1 (10.0.9.10, SG-mgmt)
        | failure
        v  detach eth1 / remap Elastic IP
[Standby instance] gets the same private IP, MAC and security groups
HPC: [EFA instances in a cluster placement group] -- OS-bypass MPI --`,
    architectureCaption: "The interface carries the identity, so moving it moves the identity.",
    mentorTip:
      "Identity tied to an address or MAC and a need for quick failover points to moving an ENI or Elastic IP. High-speed tightly coupled compute points to EFA in a cluster placement group.",
    questionIds: [
      "q-ec2-networking-eni-eip-efa-1",
      "q-ec2-networking-eni-eip-efa-2",
      "q-ec2-networking-eni-eip-efa-3",
    ],
  },
];
