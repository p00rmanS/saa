import type { Lesson } from "@/lib/types";

export const deepDivesM: Lesson[] = [
  {
    id: "storage-service-decision-guide",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "Which Storage Service? S3, EBS, EFS, FSx and Instance Store Compared",
    shortName: "Storage decision guide",
    tier: 1,
    domains: [3, 4, 2],
    examImportance: "critical",
    oneLiner:
      "Object, block and file are three different shapes of storage, and the exam is mostly about matching the shape and the protocol to the right service.",
    englishExplanation:
      "Start with the storage type. Object storage (Amazon S3) holds whole objects addressed by key over an HTTP API, scales without limit, is highly durable and is ideal for static content, backups, data lakes and logs. Block storage (Amazon EBS, or instance store) behaves like a disk attached to one instance, with low latency for boot volumes and databases. File storage presents a shared file system over a protocol such as NFS or SMB. Amazon EFS is a managed NFS file system for Linux that many instances across AZs mount at once and that grows and shrinks automatically. Amazon FSx provides managed third-party file systems. FSx for Windows File Server gives SMB shares with Active Directory integration and NTFS. FSx for Lustre gives a very high-throughput parallel file system for HPC and machine learning that links to S3. FSx for NetApp ONTAP supports NFS, SMB and iSCSI with NetApp features such as snapshots, cloning and tiering, which suits migrations from NetApp. FSx for OpenZFS offers low-latency NFS with ZFS features such as snapshots and clones.\n\nThen apply the discriminating facts. EBS volumes live in one AZ and attach to one instance (Multi-Attach for io1 and io2 is the exception), so shared access across AZs points to EFS or FSx. Instance store is the fastest but ephemeral, so it fits scratch data and replicated caches. Windows workloads needing SMB, AD and NTFS permissions point to FSx for Windows. A POSIX shared file system for Linux web servers or containers points to EFS. High-performance computing that reads and writes huge files in parallel points to FSx for Lustre. A hybrid on-premises application that must keep using NFS, SMB, iSCSI or tape and store data in AWS points to Storage Gateway.\n\nRemember a few S3 facts. Since December 2020 S3 provides strong read-after-write consistency for PUTs of new objects, overwrites and deletes, and for list operations, so old advice about eventual consistency in S3 no longer applies. S3 is regional with objects spread across at least three AZs in most classes. For cost, tier data with lifecycle rules and Intelligent-Tiering, and for performance use multipart upload, byte-range fetches and prefixes. Use S3 for the cheapest durable storage per GB, EFS when you need a shared POSIX file system, and EBS when one instance needs a fast disk.",
    taglishExplanation:
      "Magsimula sa uri ng storage. Ang object storage (S3) ay buong object na may key, walang limit ang laki, matibay, bagay sa static content, backup, data lake. Ang block storage (EBS, instance store) ay parang disk ng isang instance. Ang file storage ay shared na file system gamit ang NFS o SMB: ang EFS ay managed NFS para sa Linux na puwedeng i-mount ng maraming instance sa iba't ibang AZ; ang FSx ay managed na third-party file systems: Windows File Server (SMB, AD), Lustre (HPC, ML, konektado sa S3), NetApp ONTAP (NFS, SMB, iSCSI), at OpenZFS. Tandaan: ang EBS ay nasa isang AZ at isang instance lang. Mula Disyembre 2020, strongly consistent na ang S3 sa read-after-write at list.",
    analogy:
      "Three ways to keep belongings. S3 is a vast warehouse where you hand over whole parcels and get a ticket (the key). EBS is a personal hard drive bolted to your desk. EFS and FSx are shared filing rooms that many staff can walk into at once: EFS is the open-plan Linux room, FSx for Windows is the room with the Windows-style locks and badges, and FSx for Lustre is the industrial print room built for speed.",
    whyItExists:
      "Applications need very different access patterns: web assets, database volumes, shared home directories, parallel compute scratch space and Windows shares. One storage service could not serve all of them well or cheaply.",
    flow: "Identify shape (object, block, file) -> identify protocol and OS (HTTP, block device, NFS, SMB, iSCSI) -> identify scale and sharing (one instance or many, one AZ or many) -> pick service -> tier for cost",
    withoutIt: [
      "Teams would run their own NFS and SMB servers on EC2 and manage their capacity and failover",
      "Shared access across AZs would need custom replication",
      "Windows and HPC workloads would be forced onto storage that does not fit their protocol or performance needs",
    ],
    bestUseCases: [
      "S3 for static assets, backups, logs and data lakes",
      "EBS gp3 or io2 for boot volumes and databases on a single instance",
      "EFS for shared content and home directories across Linux instances in several AZs",
      "FSx for Windows File Server for SMB shares with Active Directory",
      "FSx for Lustre for HPC and machine learning with S3-linked data",
      "Instance store for scratch data and replicated caches",
    ],
    poorUseCases: [
      "EBS for storage that many instances in different AZs must share",
      "S3 as a POSIX file system for a lift-and-shift application that needs file locking",
      "EFS for Windows workloads that need SMB and AD (use FSx for Windows)",
      "Instance store for data that must survive a stop",
    ],
    alternatives: [
      { need: "Hybrid access to cloud storage from on-premises with NFS, SMB, iSCSI or tape", choose: "AWS Storage Gateway" },
      { need: "Cheapest long-term archive", choose: "S3 Glacier Deep Archive" },
      { need: "Move data into storage services on a schedule", choose: "AWS DataSync" },
      { need: "Mount an S3 bucket as a local file system for read-heavy workloads", choose: "Mountpoint for Amazon S3" },
    ],
    keyFeatures: [
      "Object: S3, regional, strongly consistent, unlimited scale, storage classes and lifecycle",
      "Block: EBS (one AZ, one instance except Multi-Attach) and instance store (ephemeral)",
      "File: EFS (NFS, Linux, multi-AZ) and FSx",
      "FSx for Windows: SMB, AD, NTFS. FSx for Lustre: parallel HPC file system linked to S3",
      "FSx for NetApp ONTAP: NFS, SMB and iSCSI with NetApp features. FSx for OpenZFS: low-latency NFS with ZFS features",
      "S3 strong read-after-write consistency for objects and lists",
      "Match protocol and operating system first, then scale and cost",
    ],
    availability:
      "S3 and EFS Standard span multiple AZs. EBS and instance store are single-AZ, so use snapshots and replication for resilience. FSx offers Multi-AZ deployment options for several file system types.",
    security:
      "Encrypt all of them with KMS. Control S3 with bucket policies and Block Public Access, EFS and FSx with security groups and file-level permissions, and EBS with snapshot sharing controls.",
    pricingLogic:
      "S3 is the cheapest per GB and charges per request and retrieval for colder classes. EFS costs more per GB but offers lifecycle tiers. EBS is billed for provisioned size, IOPS and throughput. FSx is billed for capacity, throughput and backups.",
    examKeywords: [
      "shared file system",
      "SMB",
      "Active Directory",
      "HPC",
      "POSIX",
      "boot volume",
      "static content",
      "iSCSI",
    ],
    examTraps: [
      "EBS is not shareable across AZs. The shared answer is EFS or FSx.",
      "Windows file shares with AD point to FSx for Windows, not EFS.",
      "S3 is strongly consistent now. Do not choose an answer based on old eventual-consistency advice.",
      "Instance store data is lost on stop. It is not durable storage.",
    ],
    architectureDiagram: `Object  -> S3          (web assets, data lake, backups)
Block   -> EBS / instance store   (one instance: boot, DB, scratch)
File    -> EFS (Linux NFS, multi-AZ)
        -> FSx Windows (SMB + AD) | FSx Lustre (HPC + S3) | FSx ONTAP (NFS/SMB/iSCSI) | FSx OpenZFS (NFS)
Hybrid  -> Storage Gateway (NFS/SMB/iSCSI/tape -> AWS)`,
    architectureCaption: "Pick by shape, protocol, sharing and scale.",
    mentorTip:
      "Ask three questions in order: what shape (object, block, file), what protocol and OS, and how many instances in how many AZs need it at once.",
    questionIds: [
      "q-storage-service-decision-guide-1",
      "q-storage-service-decision-guide-2",
      "q-storage-service-decision-guide-3",
    ],
  },
  {
    id: "compute-service-decision-guide",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "Which Compute Service? EC2, Lambda, Fargate, ECS, EKS, Beanstalk, Batch and App Runner",
    shortName: "Compute decision guide",
    tier: 1,
    domains: [3, 4, 2],
    examImportance: "critical",
    oneLiner:
      "Choose the most managed option that still meets the control, runtime and duration requirements, because the exam rewards least operational overhead.",
    englishExplanation:
      "Think of compute as a ladder from most control to least operational work. Amazon EC2 gives full control of the operating system and instance type and suits legacy software, specialised hardware, long-running servers and workloads that need GPUs or custom kernels, but you patch, scale and secure it. Containers sit one step up. Amazon ECS is the simple AWS-native orchestrator and Amazon EKS is managed Kubernetes, and both can run on EC2 or on AWS Fargate, which removes the servers so you only define CPU and memory per task. AWS Lambda is the most managed: you supply functions that run on events for up to 15 minutes, scale automatically and pay per millisecond, which suits event-driven and spiky workloads.\n\nPurpose-built services fill particular needs. AWS Elastic Beanstalk deploys a web application from code and manages the EC2, load balancer and Auto Scaling for you while leaving you in control of the resources. AWS App Runner builds and runs a web service or API from source or a container image with almost no configuration. AWS Batch runs queued batch jobs on managed compute, including Spot Instances, and suits large numbers of independent jobs. Amazon EMR runs big data frameworks. AWS Outposts and Wavelength bring AWS infrastructure on premises or to telecom edge locations for low latency and data residency, and VMware Cloud on AWS runs existing VMware workloads unchanged.\n\nDecide with a few questions. Does the workload run longer than 15 minutes, need a specific OS, GPU or licensing model, or hold local state? That points to EC2 or containers. Is it event-driven, short and spiky, and should it scale to zero? That points to Lambda. Is it a container that you want to run without managing servers? Fargate. Do you need Kubernetes portability? EKS. Is it a simple web application you want to deploy quickly? Beanstalk or App Runner. Are there thousands of independent batch jobs? Batch. When two answers both work, the exam usually prefers the one with less operational overhead, and when cost is the focus it prefers the one that avoids paying for idle capacity.",
    taglishExplanation:
      "Isipin ang compute bilang hagdan mula pinakamalaking kontrol hanggang pinakamaliit na trabaho. Ang EC2 ay buong kontrol (OS, instance type, GPU) pero ikaw ang magpa-patch at mag-scale. Sa itaas nito ang containers: ECS (simple, AWS-native) at EKS (managed Kubernetes), na puwedeng tumakbo sa EC2 o sa Fargate na walang server. Ang Lambda ang pinaka-managed: functions na tumatakbo sa events hanggang 15 minuto, awtomatikong nag-i-scale, bayad kada millisecond. May mga specialised: Beanstalk para sa web app, App Runner para sa web service o API, Batch para sa maraming independent na batch jobs, EMR para sa big data, at Outposts, Wavelength, at VMware Cloud on AWS para sa espesyal na lokasyon o pangangailangan. Kapag magkapareho ang dalawang sagot, piliin ang mas kaunting operational overhead.",
    analogy:
      "Getting to work. EC2 is owning and maintaining your own car: total control and total responsibility. ECS and EKS on EC2 are leasing a fleet you manage. Fargate is a chauffeur service for your own vehicle model. Lambda is a taxi you hail for one short trip and pay by the minute. Beanstalk and App Runner are a company shuttle that handles the route for you, and Batch is a bus depot that dispatches hundreds of identical trips from a queue.",
    whyItExists:
      "Workloads differ in runtime, duration, control and cost shape. A ladder of services lets teams pay for control only where they need it.",
    flow: "Check duration, OS and hardware needs, state and traffic shape -> pick the most managed service that still fits -> size and scale -> consider Spot or Savings Plans for cost",
    withoutIt: [
      "Every workload would run on servers you must patch and scale",
      "Spiky workloads would pay for idle capacity",
      "Simple web apps would need hand-built infrastructure",
    ],
    bestUseCases: [
      "Lambda for event-driven functions and glue code",
      "Fargate for containers without server management",
      "EKS when Kubernetes portability or tooling is required",
      "EC2 for GPUs, custom kernels, licensing needs and long-running stateful servers",
      "Batch with Spot for large queues of independent jobs",
      "Beanstalk or App Runner for quick web application deployment",
    ],
    poorUseCases: [
      "Lambda for jobs that run longer than 15 minutes",
      "EC2 for a small spiky workload that could be a function",
      "EKS for a simple app with no Kubernetes requirement",
      "Fargate for workloads needing GPUs or host-level access",
    ],
    alternatives: [
      { need: "Run VMware workloads unchanged", choose: "VMware Cloud on AWS" },
      { need: "Low-latency compute at a 5G network edge", choose: "AWS Wavelength" },
      { need: "AWS infrastructure in your own data center", choose: "AWS Outposts" },
      { need: "Big data processing frameworks", choose: "Amazon EMR" },
    ],
    keyFeatures: [
      "EC2: full control, many instance families, Spot and Savings Plans",
      "ECS and EKS orchestrate containers on EC2 or Fargate",
      "Fargate: serverless containers, no host access, no GPUs",
      "Lambda: event-driven, up to 15 minutes, scales to zero",
      "Beanstalk and App Runner: simplified web application deployment",
      "Batch: managed batch jobs with Spot",
      "Outposts, Wavelength and VMware Cloud on AWS for special locations",
    ],
    availability:
      "Run across multiple AZs behind a load balancer for EC2, ECS and EKS. Lambda and Fargate manage placement for you. Design stateless components so replacement is safe.",
    security:
      "The more managed the service, the less patching you own. Use least-privilege roles for every option and private networking where possible.",
    pricingLogic:
      "Lambda and Fargate remove idle cost for variable load. EC2 with Savings Plans or Reserved Instances is cheapest for steady, high-utilisation workloads, and Spot is cheapest for interruptible work.",
    examKeywords: [
      "least operational overhead",
      "serverless",
      "event-driven",
      "longer than 15 minutes",
      "GPU",
      "Kubernetes",
      "batch jobs",
      "deploy a web application quickly",
    ],
    examTraps: [
      "Lambda's maximum duration is 15 minutes. Longer work needs containers, Batch or EC2.",
      "Fargate is a compute engine, not an orchestrator. It runs under ECS or EKS.",
      "Least operational overhead usually means the most managed option that still works.",
      "Steady, always-on high utilisation is often cheaper on committed EC2 than on Lambda.",
    ],
    architectureDiagram: `More control / more work                                     Less control / less work
EC2  ->  ECS or EKS on EC2  ->  ECS or EKS on Fargate  ->  Beanstalk / App Runner  ->  Lambda
        Batch (queued jobs)   Outposts / Wavelength / VMware (special locations)`,
    architectureCaption: "Pick the most managed rung that satisfies the requirements.",
    mentorTip:
      "List the hard requirements first (duration, OS, GPU, Kubernetes, state), then choose the most managed service that satisfies all of them.",
    questionIds: [
      "q-compute-service-decision-guide-1",
      "q-compute-service-decision-guide-2",
      "q-compute-service-decision-guide-3",
    ],
  },
  {
    id: "identity-service-decision-guide",
    moduleId: "phase-1-iam",
    category: "Security, Identity, and Compliance",
    title: "Which Identity Service? IAM, Identity Center, Cognito, Directory Service and Roles Anywhere",
    shortName: "Identity decision guide",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "Different people and workloads need different identity services: employees, customers, existing directories, servers outside AWS and AWS services themselves.",
    englishExplanation:
      "Start by asking who or what needs access. For AWS services and applications running in AWS, use IAM roles: an EC2 instance profile, a Lambda execution role or an ECS task role delivers temporary credentials, so no long-lived keys are stored. For employees who need access to many AWS accounts and business applications, use IAM Identity Center. It provides single sign-on, connects to an identity provider such as Microsoft Entra ID or Okta or to Active Directory, and assigns permission sets to accounts through Organizations. For customers of your web or mobile application, use Amazon Cognito: user pools handle sign-up, sign-in and tokens, and identity pools exchange identities for temporary AWS credentials.\n\nIf you already have Microsoft Active Directory, AWS Directory Service offers three options. AWS Managed Microsoft AD is a real Microsoft AD in AWS that supports trust relationships with your on-premises AD and is the choice for Windows workloads, FSx for Windows and full AD features. AD Connector is a proxy that forwards authentication requests to your on-premises AD without caching or storing directory data in AWS. Simple AD is a basic Samba-based directory for small, simple needs. Federation with SAML 2.0 or OpenID Connect lets users from an external identity provider assume IAM roles through STS, and web identity federation does the same for social logins.\n\nTwo more cases are worth knowing. Servers and workloads running outside AWS, such as on-premises applications that need to call AWS APIs, can use IAM Roles Anywhere, which exchanges an X.509 certificate issued by your certificate authority for temporary AWS credentials, so you avoid creating long-lived access keys for IAM users. Cross-account access uses a role in the target account that trusts the source account, assumed through STS. Whenever a question mentions long-lived access keys embedded in code or on servers, the improvement is almost always a role with temporary credentials.",
    taglishExplanation:
      "Itanong muna kung sino o ano ang kailangang mag-access. Para sa AWS services at apps na tumatakbo sa AWS: IAM roles (instance profile, Lambda execution role, ECS task role) na nagbibigay ng temporary credentials. Para sa empleyado na kailangan ng maraming AWS account: IAM Identity Center (SSO). Para sa customer ng web o mobile app: Cognito (user pools at identity pools). Kung may Active Directory na: Directory Service. AWS Managed Microsoft AD ay totoong AD na may trust sa on-premises, ang AD Connector ay proxy lang papunta sa on-premises AD, at ang Simple AD ay basic na Samba. Para sa mga server sa labas ng AWS na kailangang tumawag ng AWS API: IAM Roles Anywhere na gumagamit ng X.509 certificate. Para sa cross-account: role na may trust, sa pamamagitan ng STS.",
    analogy:
      "A building with different kinds of visitors. Resident services (AWS services) carry a staff pass that expires every few hours (roles). Employees swipe a single corporate badge for every office floor (Identity Center). Customers register at the public front desk (Cognito). If the company already has a directory of staff, the building can copy it (Managed AD), phone the old office to check each badge (AD Connector) or keep a small simple list (Simple AD). A contractor working off-site proves who they are with a company-issued certificate and gets a day pass (Roles Anywhere).",
    whyItExists:
      "Using one kind of identity for everything leads to long-lived keys, unmanaged users and permissions that are hard to audit. Matching the service to the population keeps credentials short-lived and centrally governed.",
    flow: "Who needs access? AWS resource -> IAM role. Employee -> Identity Center. Customer -> Cognito. Existing AD -> Directory Service. Non-AWS workload -> Roles Anywhere. Another account -> assumable role",
    withoutIt: [
      "Access keys would be embedded in code and servers",
      "Employees would need separate credentials in every account",
      "Existing corporate directories could not be reused",
    ],
    bestUseCases: [
      "IAM roles with instance profiles, execution roles and task roles for workloads in AWS",
      "IAM Identity Center for workforce SSO to many accounts",
      "Cognito for consumer-facing application sign-in",
      "AWS Managed Microsoft AD for Windows workloads and trust with on-premises AD",
      "AD Connector to reuse an on-premises directory without storing data in AWS",
      "IAM Roles Anywhere for on-premises servers that call AWS APIs",
    ],
    poorUseCases: [
      "IAM users with long-lived keys for applications running on EC2",
      "Cognito for workforce access to AWS accounts",
      "Simple AD when you need trust with on-premises AD or advanced AD features",
      "Creating an IAM user per employee instead of federating",
    ],
    alternatives: [
      { need: "Permissions boundaries for delegated admins", choose: "IAM permissions boundaries" },
      { need: "Centrally restrict what accounts can do", choose: "AWS Organizations SCPs" },
      { need: "Store and rotate credentials", choose: "AWS Secrets Manager" },
      { need: "Temporary credentials for another account", choose: "STS AssumeRole" },
    ],
    keyFeatures: [
      "IAM roles deliver temporary credentials through STS",
      "IAM Identity Center: SSO, permission sets, Organizations, external IdP or AD",
      "Cognito user pools (directory and tokens) and identity pools (AWS credentials)",
      "Directory Service: AWS Managed Microsoft AD, AD Connector, Simple AD",
      "SAML 2.0 and OIDC federation, web identity federation",
      "IAM Roles Anywhere: X.509 certificates for workloads outside AWS",
      "Cross-account roles with trust policies",
    ],
    availability:
      "Managed Microsoft AD can be deployed across two AZs. AD Connector depends on the availability of your on-premises directory and the connectivity to it.",
    security:
      "Prefer temporary credentials, enforce MFA, apply least privilege through permission sets and policies, and remove unused IAM users and keys.",
    pricingLogic:
      "IAM and Identity Center are free. Cognito charges by monthly active users, Directory Service charges per directory, and Roles Anywhere has no additional charge.",
    examKeywords: [
      "single sign-on",
      "federation",
      "temporary credentials",
      "on-premises Active Directory",
      "mobile app users",
      "servers outside AWS",
      "cross-account access",
      "long-lived access keys",
    ],
    examTraps: [
      "AD Connector stores no directory data in AWS. Managed Microsoft AD does.",
      "Cognito is for application customers. Identity Center is for the workforce.",
      "Access keys in code are the problem. The fix is a role, not a more secret key.",
      "Roles Anywhere is for workloads outside AWS. Inside AWS, use instance profiles and execution roles.",
    ],
    architectureDiagram: `AWS workload      -> IAM role (instance profile / execution / task role)
Employees         -> IAM Identity Center -> permission sets -> many accounts
Customers         -> Cognito user pool -> identity pool -> AWS (if needed)
Existing AD       -> Directory Service (Managed AD | AD Connector | Simple AD)
On-prem workload  -> IAM Roles Anywhere (X.509 cert -> temporary credentials)`,
    architectureCaption: "Match the identity service to the population.",
    mentorTip:
      "Name the population first: services, employees, customers, an existing directory or servers outside AWS. The service follows from it.",
    questionIds: [
      "q-identity-service-decision-guide-1",
      "q-identity-service-decision-guide-2",
      "q-identity-service-decision-guide-3",
    ],
  },
  {
    id: "caching-and-edge-decision-guide",
    moduleId: "phase-4-networking",
    category: "Networking and Content Delivery",
    title: "Which Cache or Edge Service? CloudFront, Global Accelerator, ElastiCache, MemoryDB, DAX and API Gateway Caching",
    shortName: "Caching & edge guide",
    tier: 1,
    domains: [3, 4, 2],
    examImportance: "high",
    oneLiner:
      "Caching can happen at the edge, in front of the API, in front of a database or inside a durable in-memory database, and each layer has its own service.",
    englishExplanation:
      "Cache as close to the user as possible, and match the layer to the data. At the edge, Amazon CloudFront caches static and dynamic HTTP content in edge locations, with TTLs and invalidation, and also accelerates dynamic content, handles HTTPS and absorbs attacks. AWS Global Accelerator is different: it does not cache. It gives static anycast IP addresses and routes TCP and UDP traffic over the AWS backbone to the best healthy regional endpoint, which improves performance and failover for non-HTTP traffic, gaming, VoIP and applications that need fixed IPs. In front of an API, Amazon API Gateway can cache responses (default 300 seconds) so repeated calls do not hit the backend.\n\nIn front of data stores, use an in-memory cache. Amazon ElastiCache for Redis or Memcached is the general-purpose option and needs application logic to populate it, using lazy loading or write-through. DynamoDB Accelerator (DAX) is a drop-in, write-through, microsecond cache specific to DynamoDB that needs no cache logic in the application beyond using the DAX client, and it helps eventually consistent reads. Amazon MemoryDB for Redis is different again: it is a durable, Redis-compatible, in-memory primary database that stores data across multiple AZs with a transaction log, so it can be the system of record, while ElastiCache is a cache in front of another database.\n\nUse a simple decision path. Static or cacheable HTTP content for global users is CloudFront. Fixed IPs, UDP or fast regional failover is Global Accelerator. API responses that repeat is API Gateway caching. Repeated reads from DynamoDB with microsecond latency and no code changes is DAX. A cache or session store in front of RDS or any database is ElastiCache. A primary database that must be in memory and durable is MemoryDB. Also consider browser and application caching headers, which cost nothing and reduce requests before any AWS service is involved.",
    taglishExplanation:
      "Mag-cache malapit sa user at itugma ang layer sa data. Sa edge, ang CloudFront ay nagka-cache ng HTTP content sa edge locations at nagpapabilis din ng dynamic content, HTTPS, at DDoS absorption. Ang Global Accelerator ay hindi nagka-cache: nagbibigay ito ng static anycast IP at nagro-route ng TCP at UDP sa AWS backbone papunta sa pinakamahusay na healthy endpoint, bagay sa non-HTTP, gaming, at fixed IP. Sa harap ng API: API Gateway caching (default 300 segundo). Sa harap ng database: ElastiCache (Redis o Memcached) na kailangan ng cache logic, o DAX na drop-in para sa DynamoDB. Ang MemoryDB ay durable na in-memory na primary database, hindi lang cache.",
    analogy:
      "Keeping things handy at different distances. CloudFront is a local branch kiosk holding popular items near customers. Global Accelerator is a private express road with a fixed street address that sends travellers to the nearest open branch, but stores nothing. API Gateway caching is the receptionist who remembers yesterday's answers. ElastiCache is a notepad on the cashier's desk, DAX is a notepad the cashier fills automatically, and MemoryDB is a fireproof ledger kept on the desk itself.",
    whyItExists:
      "Latency and backend load are reduced most by serving repeated requests from memory or nearby locations, and different layers have different consistency, durability and integration needs.",
    flow: "User -> CloudFront (edge cache) or Global Accelerator (fast path) -> API Gateway (response cache) -> application -> ElastiCache / DAX (data cache) -> database (or MemoryDB as the database)",
    withoutIt: [
      "Every request would reach the origin and database",
      "Global users would see higher latency",
      "Backends would need to be sized for peak repeated reads",
    ],
    bestUseCases: [
      "CloudFront for global static content and acceleration of dynamic content",
      "Global Accelerator for static IPs, TCP or UDP traffic and rapid regional failover",
      "API Gateway caching for repeated API responses",
      "DAX for hot DynamoDB reads with no application cache logic",
      "ElastiCache for session stores and database query caching",
      "MemoryDB when microsecond reads and durable storage are both required",
    ],
    poorUseCases: [
      "Global Accelerator when you only need to cache static content",
      "ElastiCache as the only copy of important data",
      "DAX for write-heavy workloads or strongly consistent reads",
      "CloudFront for traffic that cannot be cached and is not HTTP",
    ],
    alternatives: [
      { need: "Reduce latency for HTTP content only", choose: "Amazon CloudFront" },
      { need: "Relational read scaling", choose: "RDS or Aurora read replicas" },
      { need: "Serverless key-value with global replication", choose: "DynamoDB global tables" },
      { need: "Low-latency compute near users", choose: "Lambda@Edge or CloudFront Functions" },
    ],
    keyFeatures: [
      "CloudFront: edge caching, TTLs, invalidation, HTTPS, WAF integration",
      "Global Accelerator: static anycast IPs, TCP and UDP, health-based routing, no caching",
      "API Gateway cache: default TTL 300 seconds",
      "ElastiCache: Redis and Memcached, needs cache logic, lazy loading or write-through",
      "DAX: microsecond, write-through cache for DynamoDB, drop-in client",
      "MemoryDB: durable in-memory Redis-compatible database",
      "Cache invalidation and TTL control freshness",
    ],
    availability:
      "Edge services run on AWS's global network. ElastiCache Redis and MemoryDB support Multi-AZ replication and failover, while Memcached nodes are independent.",
    security:
      "Encrypt in transit and at rest, restrict access with security groups and use WAF at CloudFront. Do not cache personalised or sensitive responses without care.",
    pricingLogic:
      "CloudFront data transfer is usually cheaper than direct egress and reduces origin load. Global Accelerator has an hourly fee plus a data transfer premium. In-memory services are billed per node hour.",
    examKeywords: [
      "static IP addresses",
      "UDP",
      "microsecond latency",
      "DynamoDB cache",
      "session store",
      "durable in-memory database",
      "edge caching",
      "no application changes",
    ],
    examTraps: [
      "Global Accelerator does not cache. CloudFront does.",
      "DAX works only with DynamoDB. ElastiCache is general purpose and needs cache logic.",
      "MemoryDB is durable and can be a primary database. ElastiCache is a cache.",
      "CloudFront is for HTTP and HTTPS. UDP and arbitrary TCP point to Global Accelerator.",
    ],
    architectureDiagram: `Users --> [CloudFront edge cache] --> [ALB / API Gateway (cache 300s)] --> app
Users (UDP, fixed IP) --> [Global Accelerator] --> regional endpoint
app --> [ElastiCache Redis] --> RDS      app --> [DAX] --> DynamoDB      app --> [MemoryDB] (system of record)`,
    architectureCaption: "Cache at the layer where the repeated work happens.",
    mentorTip:
      "Ask what is being repeated and where: HTTP content (CloudFront), API responses (API Gateway), DynamoDB reads (DAX), database queries (ElastiCache) or network paths (Global Accelerator).",
    questionIds: [
      "q-caching-and-edge-decision-guide-1",
      "q-caching-and-edge-decision-guide-2",
      "q-caching-and-edge-decision-guide-3",
    ],
  },
  {
    id: "spot-reserved-capacity-strategies",
    moduleId: "phase-13-cost",
    category: "AWS Cost Management",
    title: "EC2 Purchasing in Depth: Spot Strategies, Reserved Instance Types and Capacity Reservations",
    shortName: "Spot & RI strategies",
    tier: 1,
    domains: [4, 2],
    examImportance: "high",
    oneLiner:
      "Use Spot across many instance types with graceful interruption handling, choose the right commitment type for the flexibility you need, and know what each one does and does not guarantee.",
    englishExplanation:
      "Spot Instances use spare EC2 capacity at a deep discount, but AWS can reclaim them. Instances receive a two-minute interruption notice, and an earlier rebalance recommendation signals elevated risk, so applications should checkpoint work, handle the notice and be stateless or restartable. The way to use Spot reliably is diversification: request many instance types and sizes across several AZs so that a shortage in one pool does not stop you. The allocation strategy controls selection. Price-capacity-optimized, the recommended default, picks pools with the lowest interruption risk and a low price, capacity-optimized prefers the pools with the most spare capacity, and lowest-price is cheapest but most likely to be interrupted. An Auto Scaling group with a mixed instances policy can keep an On-Demand base, for example a minimum number of instances that must always run, and fill the rest of capacity with Spot, and EC2 Fleet and Spot Fleet offer similar control outside Auto Scaling. Good Spot workloads include batch, CI, big data and web tiers behind a load balancer that can tolerate losing instances.\n\nCommitment products differ in flexibility. A Standard Reserved Instance gives the largest discount for a specific instance family in a Region, and can be sold on the Reserved Instance Marketplace if your needs change. A Convertible Reserved Instance gives a smaller discount but lets you exchange it for different families, operating systems or tenancies, and cannot be sold on the marketplace. Reservation scope matters: a zonal reservation reserves capacity in one AZ but is less flexible, while a regional reservation applies across AZs in the Region and offers instance size flexibility within a family but does not reserve capacity. Savings Plans commit to a dollar amount per hour: Compute Savings Plans apply to any EC2 usage regardless of family, size, Region or operating system and also to Fargate and Lambda, while EC2 Instance Savings Plans are tied to a family and Region for a deeper discount.\n\nCapacity is a separate concern from price. On-Demand Capacity Reservations guarantee that capacity exists in a specific AZ for as long as you hold them, at On-Demand rates with no commitment term, and you can combine them with Savings Plans or regional reservations for the discount. Use them for events or compliance-driven readiness where running out of capacity would be costly, and use Spot, savings products and capacity reservations together: commit to the baseline, reserve capacity where you must be sure of it, use Spot for interruptible work and On-Demand for the remainder.",
    taglishExplanation:
      "Ang Spot ay sobrang tipid pero puwedeng bawiin ng AWS na may dalawang-minutong notice, at may rebalance recommendation bago pa nito. Para maging maaasahan: mag-diversify sa maraming instance type at AZ. Ang allocation strategy: price-capacity-optimized (inirerekomenda), capacity-optimized, at lowest-price (pinakamura pero pinakamadaling ma-interrupt). Sa ASG, puwedeng may On-Demand base at Spot ang natitira. Sa commitments: ang Standard RI ay pinakamalaking discount at puwedeng ibenta sa RI Marketplace; ang Convertible RI ay mas maliit ang discount pero puwedeng palitan ng ibang family, at hindi puwedeng ibenta. Ang Zonal RI ay nagre-reserve ng capacity; ang Regional ay flexible pero walang capacity reservation. Ang Compute Savings Plan ay pinaka-flexible, kasama ang Fargate at Lambda.",
    analogy:
      "Booking seats on trains. Spot is standby tickets that are very cheap but can be cancelled with short notice, so you keep many train times in mind. A Standard reservation is a fixed season ticket on one line with the best price that you can resell. A Convertible one lets you change lines for a smaller discount. A Savings Plan is a monthly travel budget valid on any route. A capacity reservation is a guaranteed seat on one specific train, paid at the normal fare unless combined with a season ticket.",
    whyItExists:
      "Compute demand has a steady baseline, interruptible work and moments where capacity guarantees matter. Different products price and guarantee these differently.",
    flow: "Baseline -> Savings Plan or RI. Must-have capacity -> Capacity Reservation. Interruptible work -> diversified Spot with interruption handling. Everything else -> On-Demand",
    withoutIt: [
      "Steady workloads would pay On-Demand rates",
      "Spot interruptions would take services down because they depend on one instance type",
      "Capacity shortages could block launches during critical events",
    ],
    bestUseCases: [
      "Diversified Spot with price-capacity-optimized allocation for batch and stateless tiers",
      "Mixed instances ASG with an On-Demand base and Spot above it",
      "Compute Savings Plans for flexibility across families, Regions and services",
      "Standard RIs for stable, long-lived workloads where the larger discount matters",
      "Capacity Reservations for planned events and regulatory readiness",
    ],
    poorUseCases: [
      "Spot for a single instance that must never stop",
      "Single instance type Spot requests, which concentrate interruption risk",
      "Expecting a regional Reserved Instance to reserve capacity",
      "Convertible RIs when you intend to resell them",
    ],
    alternatives: [
      { need: "Run containers without servers at lower cost", choose: "Fargate Spot" },
      { need: "Managed batch on Spot", choose: "AWS Batch" },
      { need: "Right-size before committing", choose: "AWS Compute Optimizer" },
      { need: "Track commitment coverage and utilisation", choose: "AWS Cost Explorer" },
    ],
    keyFeatures: [
      "Spot: two-minute interruption notice, rebalance recommendation, diversify types and AZs",
      "Allocation strategies: price-capacity-optimized, capacity-optimized, lowest-price",
      "ASG mixed instances policy with On-Demand base and Spot",
      "Standard RI (resellable on the Marketplace) vs Convertible RI (exchangeable, not resellable)",
      "Zonal RI reserves capacity. Regional RI is flexible across AZs and sizes",
      "Compute Savings Plans vs EC2 Instance Savings Plans",
      "On-Demand Capacity Reservations: guaranteed capacity, no discount alone",
    ],
    availability:
      "Spot is not a high availability mechanism by itself. Combine diversified Spot with an On-Demand base and multiple AZs for resilient services.",
    security:
      "Pricing options do not change security. Ensure Spot instances use the same hardened AMIs, roles and encryption as On-Demand ones.",
    pricingLogic:
      "Think layers: committed baseline for steady use, capacity reservations for guarantees, Spot for flexible work and On-Demand for the rest. Right-size before committing.",
    examKeywords: [
      "two-minute interruption notice",
      "mixed instances policy",
      "Convertible Reserved Instance",
      "Reserved Instance Marketplace",
      "zonal reservation",
      "Compute Savings Plan",
      "capacity reservation",
      "diversify",
    ],
    examTraps: [
      "Only zonal reservations and Capacity Reservations reserve capacity. A regional RI does not.",
      "Convertible RIs cannot be sold on the Reserved Instance Marketplace. Standard RIs can.",
      "Compute Savings Plans cover Fargate and Lambda. EC2 Instance Savings Plans do not.",
      "Spot instances should be diversified across types and AZs and be able to handle interruption.",
    ],
    architectureDiagram: `ASG (mixed instances):  On-Demand base = 4 (covered by Savings Plan)
                        Spot above base across m5, m5a, m6i, c5 ... in 3 AZs (price-capacity-optimized)
Event day: On-Demand Capacity Reservation in AZ-a (guaranteed seats)
Spot interruption: 2-minute notice -> drain, checkpoint, rebalance`,
    architectureCaption: "Layer commitments, reservations and Spot.",
    mentorTip:
      "Separate price from capacity in your head. Savings products lower the price, Capacity Reservations guarantee the capacity, and Spot is cheap but interruptible.",
    questionIds: [
      "q-spot-reserved-capacity-strategies-1",
      "q-spot-reserved-capacity-strategies-2",
      "q-spot-reserved-capacity-strategies-3",
    ],
  },
];
