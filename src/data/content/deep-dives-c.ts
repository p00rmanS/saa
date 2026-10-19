import type { Lesson } from "@/lib/types";

export const deepDivesC: Lesson[] = [
  {
    id: "ec2-instance-store-and-amis",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "EC2 Instance Store and AMIs",
    shortName: "Instance store & AMIs",
    tier: 2,
    domains: [3, 2],
    examImportance: "high",
    oneLiner:
      "Instance store is very fast disk that vanishes when the instance stops, and an AMI is the template you launch instances from, copy across Regions and share.",
    englishExplanation:
      "Instance store volumes are disks physically attached to the host server. They give the highest IOPS and lowest latency of any EC2 storage, at no extra charge, but the data is ephemeral. It survives a reboot, but it is lost if the instance stops, hibernates or terminates, or if the underlying hardware fails. That makes it right for caches, buffers, scratch space and data replicated elsewhere, such as the nodes of a distributed database that already keeps copies. It is wrong for anything you cannot afford to lose. You cannot detach an instance store volume and attach it to another instance.\n\nAn Amazon Machine Image (AMI) packages the operating system, installed software and block device mappings needed to launch an instance. Most AMIs are EBS-backed, with a snapshot behind each volume. An AMI belongs to one Region. To launch in another Region you copy the AMI there, and the copy gets a new AMI ID. You can share an AMI with specific accounts or make it public, and if it is backed by encrypted snapshots you must also share the KMS key. A golden AMI, built with your patches and agents baked in, makes Auto Scaling launches fast and consistent, compared with installing everything at boot through user data. EC2 Image Builder automates building, testing and distributing those images.\n\nThe exam likes the contrast with EBS. If a question says the data must persist when the instance stops, instance store is out. If it says 'highest possible IOPS' or 'temporary scratch data', instance store is in. For disaster recovery, copying AMIs and snapshots to a second Region is the simple way to be able to relaunch there.",
    taglishExplanation:
      "Ang instance store ay disk na nakakabit mismo sa physical host. Pinakamabilis ito at walang dagdag na bayad, pero ephemeral. Hindi mawawala kapag nag-reboot, pero mawawala kapag na-stop, na-terminate, o nasira ang hardware. Kaya para lang ito sa cache, buffer, at scratch data, o data na may kopya na sa ibang node. Ang AMI naman ay template na ginagamit para mag-launch ng instance: may OS, software, at block device mappings. Nakatali ang AMI sa isang Region, kaya kopyahin mo ito para magamit sa ibang Region, at magkakaroon ng bagong AMI ID. Kapag encrypted ang snapshot, kailangan mo ring i-share ang KMS key. Ang golden AMI ay may patches at agents na nakabake na, kaya mabilis mag-scale ang Auto Scaling.",
    analogy:
      "Instance store is the whiteboard in a meeting room: lightning fast to write on, but wiped when the meeting ends. EBS is the filing cabinet you can carry to another room. An AMI is the room's setup photo: desks, projector and cables exactly as you want them, so any new room can be arranged identically.",
    whyItExists:
      "Some workloads need disk speed that network-attached storage cannot match, and they already handle data loss through replication. Separately, launching identical servers repeatedly needs a reusable image rather than manual setup.",
    flow: "Build and configure instance -> create AMI (snapshots of volumes) -> copy AMI to other Regions -> launch instances from it; instance store data is lost on stop or terminate",
    withoutIt: [
      "High-throughput scratch workloads would pay for provisioned EBS IOPS they do not need",
      "Every new server would need slow, error-prone manual or scripted configuration",
      "Relaunching a fleet in another Region would mean rebuilding it from scratch",
    ],
    bestUseCases: [
      "Instance store for caches, temporary buffers and shuffle data in big-data jobs",
      "Instance store for replicated, distributed databases where each node tolerates loss",
      "Golden AMIs for Auto Scaling groups so instances start ready to serve",
      "Cross-Region AMI copies as a simple DR foundation",
      "EC2 Image Builder pipelines for regular patched images",
    ],
    poorUseCases: [
      "Instance store for the only copy of important data or a database that is not replicated",
      "Expecting instance store data to survive a stop and start",
      "Relying on a long user-data script to install everything at every launch when a golden AMI would be faster",
      "Using a public AMI from an unknown publisher in a regulated environment",
    ],
    alternatives: [
      { need: "Persistent block storage that survives stop and start", choose: "Amazon EBS" },
      { need: "Shared file storage for many instances", choose: "Amazon EFS" },
      { need: "Automated image creation, patching and testing", choose: "EC2 Image Builder" },
      { need: "Back up instances on a schedule", choose: "AWS Backup or Data Lifecycle Manager" },
    ],
    keyFeatures: [
      "Instance store: physically attached, highest IOPS, included in price, not all instance types have it",
      "Data survives reboot, not stop, hibernate, terminate or host failure",
      "AMI contents: root volume template, launch permissions, block device mapping",
      "AMIs are Regional. Copying creates a new AMI ID in the target Region",
      "Share with accounts or publicly. Encrypted AMIs need the KMS key shared too",
      "Launch templates reference an AMI for Auto Scaling groups",
      "EC2 Image Builder automates the image lifecycle",
    ],
    availability:
      "Instance store has no durability guarantee. AMIs and the snapshots behind them are durable in S3-backed storage, and copying them to another Region gives a recovery path.",
    security:
      "Instance store data on NVMe drives is encrypted at rest by default on supported types. Bake the SSM agent and security tooling into the AMI, never embed secrets, and restrict who can make AMIs public.",
    pricingLogic:
      "Instance store is bundled with the instance price, so extra IOPS cost nothing. AMIs cost only the storage of their snapshots.",
    examKeywords: [
      "temporary data",
      "highest IOPS",
      "ephemeral storage",
      "golden image",
      "launch in another Region",
      "copy AMI",
      "survive stop",
    ],
    examTraps: [
      "Instance store survives reboot but not stop or terminate. Do not confuse the two.",
      "An AMI is not global. A launch in another Region needs a copied AMI, which has a different ID.",
      "Sharing an encrypted AMI also requires sharing the customer managed KMS key.",
      "Instance store cannot be backed up with an EBS snapshot.",
    ],
    architectureDiagram: `Build instance --> [AMI us-east-1] --copy--> [AMI eu-west-1]
                          |                         |
                   Launch template           Launch template
                          v                         v
                 Auto Scaling group         Auto Scaling group
   each instance: [EBS root (persistent)] + [Instance store (scratch, lost on stop)]`,
    architectureCaption: "AMIs make fleets repeatable. Instance store is local scratch only.",
    mentorTip:
      "Ask one question: would losing this disk on a stop be acceptable? If yes and speed matters, instance store. If no, EBS.",
    questionIds: [
      "q-ec2-instance-store-and-amis-1",
      "q-ec2-instance-store-and-amis-2",
      "q-ec2-instance-store-and-amis-3",
    ],
  },
  {
    id: "gateway-load-balancer",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "Gateway Load Balancer",
    shortName: "GWLB",
    tier: 2,
    domains: [1, 3],
    examImportance: "medium",
    oneLiner:
      "Gateway Load Balancer inserts a fleet of third-party security appliances into your traffic path and scales them like any other target group.",
    englishExplanation:
      "Application and Network Load Balancers spread traffic across servers that handle it. A Gateway Load Balancer (GWLB) does something different: it sends traffic through a fleet of virtual appliances, such as firewalls, intrusion detection and prevention systems or deep packet inspection tools, and then back on its way. It operates at layer 3, acts as a transparent bump in the wire, and encapsulates traffic with the GENEVE protocol on port 6081 so that the original packet reaches the appliance unchanged.\n\nIn practice you create the GWLB in a security VPC along with the appliance instances registered as its targets. In each application VPC you create a Gateway Load Balancer endpoint, which uses PrivateLink, and edit route tables so that traffic to and from the internet or between subnets is routed to that endpoint. Traffic flows application subnet, endpoint, GWLB, appliance, back through the GWLB and endpoint, and on to its destination. The GWLB health-checks appliances, removes failed ones, keeps flows sticky to one appliance using a flow hash, and scales the fleet as you add or remove instances.\n\nThe exam signal is 'third-party virtual appliance' or 'inspect all traffic with our existing firewall vendor'. If AWS-managed filtering is acceptable, AWS Network Firewall is the managed alternative and needs no appliance fleet. AWS WAF works at layer 7 for HTTP requests and is a different tool.",
    taglishExplanation:
      "Ang ALB at NLB ay nagpapasa ng traffic sa mga server na mag-aasikaso nito. Ang Gateway Load Balancer ay nagpapadaan ng traffic sa grupo ng virtual appliances tulad ng firewall, IDS o IPS, o deep packet inspection, tapos ibabalik ito sa dati nitong daan. Layer 3 ito at gumagamit ng GENEVE sa port 6081. Ilalagay mo ang GWLB at mga appliance sa security VPC, tapos sa bawat application VPC ay gagawa ka ng Gateway Load Balancer endpoint na PrivateLink ang gamit, at ie-edit mo ang route table para dumaan doon ang traffic. Naghe-health check ito, nag-i-scale, at pinapanatili ang flow sa iisang appliance. Kapag third-party appliance ang nabanggit sa tanong, GWLB iyon. Kung AWS-managed ang gusto, Network Firewall.",
    analogy:
      "An airport security checkpoint. Passengers (packets) do not stop at the checkpoint, they just pass through it on the way to their gate. The airport adds or removes screening lanes (appliances) as queues grow, closes a broken lane, and always sends one traveller's bags through the same lane so nothing gets separated.",
    whyItExists:
      "Many companies standardise on a particular firewall or inspection vendor. Before GWLB, inserting those appliances meant complicated routing, manual scaling and single points of failure. GWLB makes them behave like a managed, elastic service.",
    flow: "App subnet -> route table -> GWLB endpoint -> GWLB (GENEVE) -> appliance fleet inspects -> GWLB -> endpoint -> destination",
    withoutIt: [
      "Inline appliances would be single points of failure unless you built your own failover",
      "Scaling inspection capacity would mean manual routing changes",
      "Each VPC would need its own appliance deployment instead of one shared security VPC",
    ],
    bestUseCases: [
      "Centralised third-party firewall or IPS inspection for many VPCs",
      "Deep packet inspection of traffic between VPCs or to the internet",
      "Scaling a virtual appliance fleet automatically behind a single entry point",
    ],
    poorUseCases: [
      "Plain HTTP load balancing of web servers (use ALB)",
      "Layer 7 filtering of web exploits (use AWS WAF)",
      "When an AWS-managed firewall is acceptable and you want no appliances to run",
    ],
    alternatives: [
      { need: "Managed network firewall without running appliances", choose: "AWS Network Firewall" },
      { need: "Filter HTTP requests for SQLi and XSS", choose: "AWS WAF" },
      { need: "Layer 4 load balancing with static IPs and extreme performance", choose: "Network Load Balancer" },
      { need: "HTTP routing by path or host", choose: "Application Load Balancer" },
    ],
    keyFeatures: [
      "Layer 3 gateway combined with layer 4 load balancing",
      "GENEVE encapsulation on UDP port 6081",
      "Gateway Load Balancer endpoints built on PrivateLink",
      "Targets are instances or IPs running the appliance",
      "Health checks and flow stickiness",
      "Route tables steer traffic into and out of the inspection path",
      "Works across AZs and accounts",
    ],
    availability:
      "Deploy appliances in several AZs and enable cross-zone load balancing. The GWLB removes unhealthy appliances from rotation automatically.",
    security:
      "All traffic can be inspected transparently without changing applications. Keep the security VPC separate and restrict who can edit route tables that point at the endpoint.",
    pricingLogic:
      "You pay per hour and per LCU of traffic for the GWLB and its endpoints, plus the cost of the appliance instances and any vendor licences.",
    examKeywords: [
      "third-party virtual appliance",
      "inline inspection",
      "firewall fleet",
      "GENEVE",
      "centralised security VPC",
      "intrusion prevention",
    ],
    examTraps: [
      "ALB and NLB deliver traffic to your servers. GWLB passes it through appliances and onward.",
      "GWLB endpoints use PrivateLink, but the service is not exposing an application, it is steering traffic.",
      "If the question allows an AWS-managed service and wants low operations, Network Firewall beats GWLB.",
      "GWLB is not a Layer 7 filter. HTTP-level rules belong to WAF.",
    ],
    architectureDiagram: `App VPC                              Security VPC
[App subnet] -> route -> [GWLB endpoint] ==PrivateLink==> [Gateway Load Balancer]
                                                          |  GENEVE 6081
                                                   [Firewall appliance x N]
                          back out the same path to the destination`,
    architectureCaption: "Traffic detours through the appliance fleet and continues, unchanged, to where it was going.",
    mentorTip:
      "Three words trigger GWLB: third-party, appliance, inline. Any one of them in a scenario is a strong signal.",
    questionIds: [
      "q-gateway-load-balancer-1",
      "q-gateway-load-balancer-2",
      "q-gateway-load-balancer-3",
    ],
  },
  {
    id: "lambda-concurrency-and-vpc",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "Lambda Concurrency and VPC Networking",
    shortName: "Lambda concurrency & VPC",
    tier: 1,
    domains: [3, 2, 1],
    examImportance: "high",
    oneLiner:
      "Lambda scales by running more copies at once, and you control how many with reserved and provisioned concurrency. Putting a function in a VPC changes how it reaches the internet.",
    englishExplanation:
      "Concurrency is the number of function instances executing at the same moment. By default an account has a Regional quota of 1,000 concurrent executions shared by all functions, which can be raised. Reserved concurrency sets aside part of that quota for one function. It guarantees the function can scale to that number and also caps it, so it protects both the function and downstream resources such as a database. It is free. Provisioned concurrency keeps a set number of execution environments initialised and ready, which removes cold-start latency for latency-sensitive paths, and you pay for it whether or not it is used.\n\nWhat happens at the limit depends on the invocation type. Synchronous callers, such as API Gateway, receive a 429 throttling error. Asynchronous invocations are queued and retried for up to six hours, with two retries by default, and failures can go to a dead-letter queue or on-failure destination. For queue sources, Lambda polls SQS and scales consumers up to a limit, and you can set a maximum concurrency on the event source mapping to avoid overwhelming a backend.\n\nBy default a function runs in an AWS-managed network with internet access but no access to your private resources. To reach an RDS database or an internal service, you attach the function to subnets and security groups in your VPC. Lambda then uses network interfaces in those subnets. A function in a VPC loses default internet access: even in a public subnet it has no public IP, so it needs a NAT gateway in a public subnet to reach the internet, or VPC endpoints to reach AWS services privately. Remember the other limits too: a maximum timeout of 15 minutes, up to 10 GB of memory and 10 GB of ephemeral /tmp storage.",
    taglishExplanation:
      "Ang concurrency ay ang bilang ng function instances na sabay-sabay tumatakbo. Default na 1,000 kada Region at shared ito ng lahat ng function sa account. Ang reserved concurrency ay inilalaan para sa isang function: garantisado ito at may limit din, kaya protektado rin ang database sa likod. Libre ito. Ang provisioned concurrency ay mga environment na handa na, kaya walang cold start, pero may bayad kahit hindi gamitin. Kapag umabot sa limit, 429 ang makukuha ng synchronous caller, habang ang asynchronous ay ilalagay sa queue at ire-retry hanggang anim na oras. Kapag nilagay mo ang Lambda sa VPC para maabot ang RDS, mawawalan ito ng internet access. Kailangan mo ng NAT gateway para sa internet, o VPC endpoint para sa AWS services. Ang max timeout ay 15 minuto.",
    analogy:
      "A restaurant kitchen with a fixed number of cooks for the whole building (account quota). Reserved concurrency is assigning five cooks to one restaurant so it always has them but never takes more. Provisioned concurrency is keeping those cooks already in whites with stoves lit, so the first order is not delayed by getting ready.",
    whyItExists:
      "Serverless scaling is automatic, but unlimited scaling can overwhelm a database or run up cost, and cold starts can hurt latency. Concurrency controls give you guardrails and speed where it matters.",
    flow: "Request -> Lambda finds a warm environment or starts one (cold start) -> runs -> if at concurrency limit: sync 429, async queued and retried",
    withoutIt: [
      "A traffic spike on one function could use the whole account quota and starve others",
      "A flood of invocations could overwhelm a relational database with connections",
      "Latency-sensitive functions would suffer unpredictable cold starts",
    ],
    bestUseCases: [
      "Reserved concurrency to protect a downstream database or guarantee capacity for a critical function",
      "Provisioned concurrency for user-facing APIs with strict latency targets",
      "Placing functions in a VPC to reach RDS or ElastiCache",
      "VPC endpoints so a VPC function can call S3 or DynamoDB without a NAT gateway",
      "Maximum concurrency on SQS event source mappings to throttle consumers",
    ],
    poorUseCases: [
      "Provisioned concurrency for rarely called functions, which wastes money",
      "Putting a function in a VPC when it only calls public AWS APIs and nothing private",
      "Expecting a function in a public subnet to have internet access without a NAT gateway",
      "Long-running jobs beyond 15 minutes (use Step Functions, Batch or containers)",
    ],
    alternatives: [
      { need: "Jobs running longer than 15 minutes", choose: "AWS Fargate or AWS Batch" },
      { need: "Avoid DB connection storms from many functions", choose: "Amazon RDS Proxy" },
      { need: "Orchestrate multi-step workflows with retries", choose: "AWS Step Functions" },
      { need: "Smooth bursts into a backend", choose: "Amazon SQS in front of Lambda" },
    ],
    keyFeatures: [
      "Default account concurrency 1,000 per Region, adjustable by request",
      "Reserved concurrency: guarantees and caps for one function, no charge",
      "Provisioned concurrency: pre-initialised environments, billed, removes cold starts",
      "Sync throttle returns 429. Async retries for up to six hours with a DLQ or destination",
      "VPC attachment via subnets and security groups, no default internet access",
      "NAT gateway or VPC endpoints needed for outbound access from a VPC function",
      "Timeout up to 15 minutes, memory up to 10 GB, /tmp up to 10 GB",
    ],
    availability:
      "Lambda runs across multiple AZs automatically. For a VPC function, select subnets in at least two AZs so it keeps running if one AZ fails.",
    security:
      "Each function has an execution role. VPC placement lets you apply security groups and keep traffic to private resources off the internet. Use VPC endpoints and endpoint policies to restrict reachable AWS services.",
    pricingLogic:
      "You pay per request and per GB-second of duration. Reserved concurrency is free, provisioned concurrency adds a charge for the time it is configured, and NAT gateways in front of VPC functions add hourly and data processing costs.",
    examKeywords: [
      "throttling",
      "cold start",
      "limit concurrent executions",
      "protect the database",
      "function cannot reach the internet",
      "VPC",
      "15 minutes",
    ],
    examTraps: [
      "Reserved concurrency is both a guarantee and a ceiling. It does not pre-warm environments.",
      "Provisioned concurrency is what removes cold starts, and it costs money.",
      "A Lambda function in a public subnet still has no internet access. It needs a NAT gateway.",
      "Throttled synchronous calls fail with 429 and are not queued. Only asynchronous invocations are retried.",
    ],
    architectureDiagram: `API Gateway --> [Lambda (reserved = 50, provisioned = 10)]
                          | in VPC private subnets (2 AZs)
                          +--> RDS (private)
                          +--> VPC endpoint --> S3 / DynamoDB
                          +--> NAT gateway (public subnet) --> internet`,
    architectureCaption: "Reserved concurrency caps load on the database. The NAT gateway or endpoints give a VPC function its outbound paths.",
    mentorTip:
      "Split the problem into three: how many at once (reserved), how fast to start (provisioned), and where it can reach (VPC with NAT or endpoints).",
    questionIds: [
      "q-lambda-concurrency-and-vpc-1",
      "q-lambda-concurrency-and-vpc-2",
      "q-lambda-concurrency-and-vpc-3",
    ],
  },
  {
    id: "efs-performance-throughput-storage-classes",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "EFS Performance, Throughput and Storage Classes",
    shortName: "EFS in depth",
    tier: 2,
    domains: [3, 4],
    examImportance: "medium",
    oneLiner:
      "EFS is shared NFS storage for Linux, and you tune it with a performance mode, a throughput mode and storage classes that move cold files to cheaper tiers.",
    englishExplanation:
      "Amazon EFS is a managed NFS file system that many Linux instances, containers and Lambda functions mount at once, across AZs, with capacity that grows and shrinks automatically. You reach it through mount targets, one per AZ, and security groups control access over NFS port 2049. It does not support Windows, for which you use FSx for Windows File Server.\n\nTwo settings shape performance. The performance mode is General Purpose (the default and the right choice for almost everything, with the lowest latency) or Max I/O, which allows higher aggregate IOPS and throughput for highly parallel workloads such as big data and media processing, at the cost of slightly higher latency. Max I/O applies only to the standard Regional file systems. The throughput mode decides how throughput is provided: Elastic scales up and down automatically with workload and is the recommended default, Provisioned lets you buy a fixed throughput independent of storage size, and Bursting ties throughput to the amount stored.\n\nCost comes from storage classes. Standard is for frequently accessed files, Infrequent Access (IA) and Archive are cheaper for cold files with a per-GB access fee, and One Zone variants keep data in a single AZ for a lower price. Lifecycle management moves files that have not been accessed for a chosen period to IA or Archive, and back again when accessed if you enable intelligent tiering. Encryption at rest uses KMS, encryption in transit uses TLS through the EFS mount helper, and EFS access points give an application a specific root directory and POSIX identity. Replication copies a file system to another Region.",
    taglishExplanation:
      "Ang EFS ay managed NFS file system na puwedeng i-mount ng maraming Linux instance, container, at Lambda nang sabay, sa iba't ibang AZ. Awtomatikong lumalaki o lumiliit ang capacity. May mount target sa bawat AZ at security group ang kumokontrol sa port 2049. Hindi ito para sa Windows, FSx for Windows ang gamit doon. Dalawang setting ang mahalaga: performance mode at throughput mode. General Purpose ang default at para sa halos lahat, habang ang Max I/O ay para sa sobrang parallel na workload na mas mataas ang latency. Sa throughput, ang Elastic ang recommended, Provisioned kung fixed ang kailangan mo, Bursting kung nakadepende sa laki. Para makatipid, gamitin ang lifecycle management na maglilipat ng malalamig na file sa IA o Archive.",
    analogy:
      "A shared office network drive that every desk can open at once and that never runs out of space. Performance mode is how many lanes the corridor has versus how fast one person can walk it. Storage classes are the filing room: files nobody has opened in a month get moved to a cheaper archive room, and fetched back on demand.",
    whyItExists:
      "EBS cannot be shared across AZs, and S3 is not a POSIX file system. Applications such as content management systems, shared home directories and machine learning training data need a file system many servers can use together.",
    flow: "Instances in several AZs -> mount target in each AZ (NFS 2049) -> shared file system -> lifecycle rule moves untouched files to IA or Archive",
    withoutIt: [
      "You would run your own NFS server and manage its capacity and failover",
      "Multi-AZ shared file access would require custom replication",
      "Cold files would stay on expensive storage with no automatic tiering",
    ],
    bestUseCases: [
      "Shared content, web serving directories and home directories across Linux fleets",
      "Container and Lambda workloads that need persistent shared storage",
      "Big-data or media processing with many parallel clients (Max I/O)",
      "Lifecycle management to cut cost of rarely used files",
    ],
    poorUseCases: [
      "Windows workloads needing SMB and Active Directory (use FSx for Windows)",
      "A single instance's boot or database volume (use EBS)",
      "Maximum throughput HPC needing Lustre (use FSx for Lustre)",
      "Object storage for web delivery (use S3)",
    ],
    alternatives: [
      { need: "Windows file shares with SMB and AD", choose: "Amazon FSx for Windows File Server" },
      { need: "High-performance computing and ML training with S3 integration", choose: "Amazon FSx for Lustre" },
      { need: "Block storage for one instance", choose: "Amazon EBS" },
      { need: "Cheap shared object storage", choose: "Amazon S3" },
    ],
    keyFeatures: [
      "NFSv4.1, Linux only, mounted across AZs through mount targets",
      "Performance modes: General Purpose (default), Max I/O (higher aggregate, higher latency)",
      "Throughput modes: Elastic (recommended), Provisioned, Bursting",
      "Storage classes: Standard, Infrequent Access, Archive, with One Zone options",
      "Lifecycle management and intelligent tiering between classes",
      "Encryption at rest with KMS, in transit with TLS, access points, replication",
      "Capacity grows and shrinks automatically, with no provisioning",
    ],
    availability:
      "Standard storage classes keep data across multiple AZs. One Zone classes keep it in one AZ and are cheaper but not resilient to an AZ failure. Backups can be handled by AWS Backup.",
    security:
      "Control access with security groups on mount targets, IAM authorisation, file system policies and POSIX permissions. Use access points to confine an application to a directory.",
    pricingLogic:
      "You pay per GB-month by storage class, per GB for IA and Archive access, and for any provisioned throughput above what Bursting or Elastic gives. Lifecycle policies are the main cost lever.",
    examKeywords: [
      "shared file system",
      "NFS",
      "multiple AZs",
      "Linux",
      "highly parallel",
      "infrequently accessed files",
      "lifecycle",
    ],
    examTraps: [
      "EFS is Linux only. 'Windows file share' means FSx for Windows File Server.",
      "General Purpose is the default and usually right. Max I/O is chosen only for massively parallel workloads and trades latency for scale.",
      "One Zone classes lose AZ resilience. Do not choose them when the data must survive an AZ outage.",
      "EBS cannot be mounted by many instances across AZs, which is why shared-access questions point to EFS.",
    ],
    architectureDiagram: `AZ-a: [EC2] --\\
AZ-b: [EC2] ---+--> mount targets (NFS 2049) --> [EFS file system]
AZ-c: [ECS] --/                                    |  lifecycle
                                          Standard -> IA -> Archive`,
    architectureCaption: "One file system, a mount target per AZ, and lifecycle rules that tier cold files down.",
    mentorTip:
      "Think EFS for 'shared, Linux, many AZs'. For tuning, default to General Purpose and Elastic throughput unless the question explicitly describes massive parallelism.",
    questionIds: [
      "q-efs-performance-throughput-storage-classes-1",
      "q-efs-performance-throughput-storage-classes-2",
      "q-efs-performance-throughput-storage-classes-3",
    ],
  },
  {
    id: "kinesis-data-streams-vs-firehose",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "Kinesis Data Streams vs Firehose in Practice",
    shortName: "KDS vs Firehose",
    tier: 1,
    domains: [3],
    examImportance: "high",
    oneLiner:
      "Data Streams gives you a replayable stream you read with your own code. Firehose just delivers streaming data to a destination with no code and no shards.",
    englishExplanation:
      "Kinesis Data Streams (KDS) stores records in shards. In provisioned mode each shard accepts up to 1 MB per second or 1,000 records per second of writes and serves up to 2 MB per second of reads, so you size the stream by adding shards. On-demand mode scales automatically instead. Records with the same partition key go to the same shard and keep their order, and a partition key with too much traffic creates a hot shard. Data is retained for 24 hours by default and up to 365 days, so consumers can replay it, and several consumers can read the same stream independently. With enhanced fan-out each consumer gets its own 2 MB per second per shard instead of sharing, which helps when many applications read the same data.\n\nAmazon Data Firehose has no shards to manage and no replay. It buffers incoming data by size or time, with a minimum buffer interval of about 60 seconds, so delivery is near real time rather than real time. It can transform records with Lambda, convert JSON to Parquet or ORC, and deliver to S3, Redshift (through S3), OpenSearch, Splunk and HTTP endpoints. It can also read from a Kinesis Data Stream as its source.\n\nA common pattern combines them: producers write to KDS, a custom consumer such as Lambda or Managed Service for Apache Flink processes in real time, and a Firehose stream reads the same KDS to land raw data in S3 for later analysis with Athena. Choosing between them comes down to a few questions. Do you need to write custom consumer logic? Do you need replay? Do you need sub-second latency? Any yes points to KDS. If you just want data in S3 or Redshift with the least work, it is Firehose.",
    taglishExplanation:
      "Sa Kinesis Data Streams, nagsusulat ang producers ng records sa shards. Sa provisioned mode, bawat shard ay kayang 1 MB bawat segundo o 1,000 records bawat segundo na write, at 2 MB bawat segundo na read. Puwede rin ang on-demand mode na kusang nag-i-scale. Ang parehong partition key ay mapupunta sa parehong shard at mananatili ang order, kaya kapag sobrang dami ng traffic sa isang key, magkakaroon ng hot shard. Nare-retain ang data ng 24 oras hanggang 365 araw, kaya puwedeng i-replay. Ang Firehose ay walang shard at walang replay. Nagbu-buffer ito, kaya near real time lang, at ihahatid sa S3, Redshift, OpenSearch, Splunk o HTTP. Kung kailangan mo ng sariling code, replay, o sobrang bilis, KDS. Kung gusto mo lang ilagay ang data sa S3, Firehose.",
    analogy:
      "Data Streams is a conveyor belt with numbered lanes where your own staff pick items off and can rewind the belt for a day or a year. Firehose is a courier service: you hand it parcels, it waits to fill a van, and then it delivers them to the address you chose. You cannot rewind a courier.",
    whyItExists:
      "Some applications need to react to events within milliseconds with custom logic, and others only need a reliable pipe into storage. Two services avoid forcing the simple case to carry the complexity of the hard one.",
    flow: "Producers -> KDS shards (retained 24h to 365d) -> custom consumers (Lambda, Flink, EC2)  |  KDS or direct put -> Firehose (buffer) -> S3 / Redshift / OpenSearch",
    withoutIt: [
      "You would run Kafka or a custom queue cluster for real-time ingestion",
      "Landing streaming data in S3 would need a custom batching application",
      "Multiple teams could not independently read the same event stream",
    ],
    bestUseCases: [
      "KDS for real-time analytics, custom processing and replay of events",
      "KDS with enhanced fan-out when several consumers need full read throughput",
      "Firehose to land clickstream or logs in S3 with no code",
      "Firehose to convert JSON to Parquet before storing in S3 for Athena",
      "KDS feeding both a Lambda consumer and a Firehose delivery stream",
    ],
    poorUseCases: [
      "Firehose when you need sub-second latency, because of buffering",
      "Firehose when consumers must replay old data",
      "KDS when you just want data in S3 and have no processing logic",
      "KDS with a low-cardinality partition key that overloads one shard",
    ],
    alternatives: [
      { need: "Kafka-compatible managed streaming", choose: "Amazon MSK" },
      { need: "Decoupled queue for individual messages with no ordering at scale", choose: "Amazon SQS" },
      { need: "SQL or Flink processing of a stream", choose: "Managed Service for Apache Flink" },
      { need: "Ad hoc SQL over delivered data", choose: "Amazon Athena on S3" },
    ],
    keyFeatures: [
      "KDS shard limits: 1 MB/s or 1,000 records/s in, 2 MB/s out per shard",
      "Provisioned and on-demand capacity modes",
      "Ordering is per shard, determined by partition key",
      "Retention 24 hours by default, extendable up to 365 days, supports replay",
      "Enhanced fan-out gives each consumer dedicated 2 MB/s per shard",
      "Firehose: fully managed, buffered, near real time, no replay",
      "Firehose transformations with Lambda, format conversion, dynamic partitioning",
    ],
    availability:
      "KDS replicates data across three AZs in the Region. Firehose is a managed service that retries delivery and can back up failed records to S3.",
    security:
      "Both support server-side encryption with KMS, VPC endpoints through PrivateLink, and IAM policies for producers and consumers. Encrypt in transit with TLS.",
    pricingLogic:
      "KDS charges per shard-hour (or per throughput in on-demand) and per PUT payload, plus extra for extended retention and enhanced fan-out. Firehose charges per GB ingested, with extra for format conversion and transformation.",
    examKeywords: [
      "real-time",
      "custom consumer",
      "replay",
      "shards",
      "near real-time delivery to S3",
      "no administration",
      "partition key",
      "hot shard",
    ],
    examTraps: [
      "Firehose is near real time, not real time, because of its buffer.",
      "Only KDS supports replay and multiple independent consumers of the same data.",
      "A hot partition key overloads one shard even if the stream has capacity elsewhere.",
      "Firehose has no shard concept. If a question talks about shards, it is KDS.",
    ],
    architectureDiagram: `Producers --> [Kinesis Data Streams: shard 1..N, retained 24h-365d]
                      |-- Lambda / Flink consumer (real-time processing)
                      +-- Firehose (buffer ~60s) --> S3 --> Athena
Direct PUT ---------------------------> Firehose --> Redshift / OpenSearch`,
    architectureCaption: "KDS for real-time custom processing and replay, Firehose for simple delivery, often together.",
    mentorTip:
      "Ask: does anyone need to write code that reads this data live, or replay it? If yes, KDS. If the goal is simply 'get it into S3 or Redshift', Firehose.",
    questionIds: [
      "q-kinesis-data-streams-vs-firehose-1",
      "q-kinesis-data-streams-vs-firehose-2",
      "q-kinesis-data-streams-vs-firehose-3",
    ],
  },
  {
    id: "aws-elastic-disaster-recovery",
    moduleId: "phase-12-resilience",
    category: "Resilience",
    title: "AWS Elastic Disaster Recovery",
    shortName: "Elastic DR",
    tier: 2,
    domains: [2],
    examImportance: "medium",
    oneLiner:
      "AWS Elastic Disaster Recovery continuously copies your servers to a cheap staging area in AWS so you can launch full recovery instances within minutes, with seconds of data loss.",
    englishExplanation:
      "Elastic Disaster Recovery (DRS) protects physical, virtual and cloud servers. You install an agent on each source server, and it continuously replicates disk changes at block level to a staging area in your target AWS Region. The staging area is deliberately cheap: a small replication server and low-cost EBS volumes, rather than a full copy of your fleet. Because replication is continuous, the recovery point objective is typically seconds, and because the data is already in AWS, the recovery time objective is typically minutes.\n\nWhen you run a drill or a real failover, DRS launches recovery instances from the replicated data, using launch settings you prepared in advance, and converts them to boot natively on EC2. Drills do not disrupt replication or the source, so you can test often. Point-in-time recovery lets you recover to an earlier state, which helps if corruption or ransomware was replicated, and failback replicates changes back to the original environment once it is healthy.\n\nIn the DR strategy ladder, this is a managed take on pilot light: minimal always-on resources and fast scale-up when needed. It costs far less than warm standby or multi-site active-active, but recovers much faster than restoring from backup. It is also distinct from AWS Backup, which takes periodic point-in-time backups with a longer recovery, and from AWS Application Migration Service, which uses the same replication technology but exists to cut over a migration permanently rather than to protect a workload.",
    taglishExplanation:
      "Ang Elastic Disaster Recovery ay nagpoprotekta sa physical, virtual, at cloud servers. Maglalagay ka ng agent sa bawat source server at tuloy-tuloy nitong kokopyahin ang pagbabago sa disk, block by block, papunta sa murang staging area sa target Region: maliit na replication server at mura na EBS volume. Dahil tuloy-tuloy ang replication, ang RPO ay segundo lang, at dahil nasa AWS na ang data, ang RTO ay mga minuto. Kapag nag-drill o nag-failover, magla-launch ito ng recovery instances gamit ang launch settings na inihanda mo. Puwede ka ring mag-recover sa mas naunang oras kung na-corrupt o na-ransomware ang data, at may failback pabalik sa original. Hindi ito AWS Backup, at hindi rin Application Migration Service na para sa permanenteng migration.",
    analogy:
      "A photocopier that keeps a live duplicate of your office paperwork in a small storage unit across town, updated every few seconds. If the office burns down, you do not rebuild the filing system from boxes of old backups. You walk into a prepared space, hand over the keys, and everything is there within minutes.",
    whyItExists:
      "Full duplicate environments are expensive, and restoring from backups is slow. Many organisations need minutes of downtime and seconds of data loss for servers they cannot easily re-architect, without paying for a second data centre sitting idle.",
    flow: "Agent on source server -> continuous block replication -> low-cost staging area in target Region -> failover or drill -> recovery instances launched on EC2 -> failback when ready",
    withoutIt: [
      "You would pay for a duplicate environment running all the time or accept slow backup restores",
      "DR drills would risk disrupting production",
      "Recovering a lift-and-shift server from corruption would depend on infrequent backups",
    ],
    bestUseCases: [
      "DR for on-premises servers to AWS with low standing cost",
      "DR across AWS Regions or from another cloud for existing EC2-style workloads",
      "Frequent non-disruptive DR drills for audit requirements",
      "Recovery from ransomware using point-in-time recovery",
    ],
    poorUseCases: [
      "Near-zero RTO and RPO for a mission-critical app (use multi-site active-active)",
      "Permanent migration to AWS (use Application Migration Service)",
      "Simple long-term retention and compliance backups (use AWS Backup)",
      "Protecting managed services such as RDS or DynamoDB (use their native replication and backup)",
    ],
    alternatives: [
      { need: "Scheduled backups and retention policies across AWS services", choose: "AWS Backup" },
      { need: "One-time lift-and-shift migration", choose: "AWS Application Migration Service" },
      { need: "Near-zero downtime across Regions", choose: "Multi-site active-active architecture" },
      { need: "Cross-Region copy of managed databases", choose: "Aurora Global Database or cross-Region replicas" },
    ],
    keyFeatures: [
      "Agent-based continuous block-level replication",
      "Low-cost staging area with lightweight replication servers",
      "RPO in seconds, RTO in minutes",
      "Non-disruptive drills and automated launch of recovery instances",
      "Point-in-time recovery and failback support",
      "Works for physical, virtual and cloud-hosted servers",
      "Same underlying replication technology as Application Migration Service",
    ],
    availability:
      "The recovery site only exists in full when you launch it, so availability during a disaster depends on a prepared and tested launch configuration, not on standby capacity.",
    security:
      "Replication traffic is encrypted in transit and data is encrypted at rest on EBS. Use least-privilege IAM for the replication agent and separate accounts or Regions for the recovery target.",
    pricingLogic:
      "You pay per source server per hour plus the low-cost staging resources, and pay for full recovery instances only during drills or real events. That is the core cost advantage over warm standby.",
    examKeywords: [
      "continuous replication",
      "RPO of seconds",
      "RTO of minutes",
      "on-premises servers",
      "pilot light",
      "low cost standby",
      "failback",
    ],
    examTraps: [
      "Elastic Disaster Recovery is not AWS Backup. DRS replicates continuously, Backup takes periodic recovery points.",
      "Application Migration Service uses similar replication but its purpose is migration cutover, not ongoing DR.",
      "The staging area is cheap, so cost is closer to pilot light than warm standby.",
      "It protects servers, not managed database services.",
    ],
    architectureDiagram: `Source (on-premises / other cloud)            Target Region
[Server + DRS agent] ==continuous replication==> [Staging: replication server + EBS]
                                                        |  drill or failover
                                                        v
                                                [Recovery EC2 instances]
                                                        |  failback when healthy
                                                        v
                                                [Original environment]`,
    architectureCaption: "Low standing cost until a recovery is launched.",
    mentorTip:
      "Place DR options on a ladder: backup and restore, pilot light, warm standby, multi-site. DRS sits at pilot light with unusually fast recovery.",
    questionIds: [
      "q-aws-elastic-disaster-recovery-1",
      "q-aws-elastic-disaster-recovery-2",
      "q-aws-elastic-disaster-recovery-3",
    ],
  },
];
