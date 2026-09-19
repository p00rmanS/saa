import type { Lesson } from "@/lib/types";

export const storageLessons: Lesson[] = [
  {
    id: "amazon-s3",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "Amazon S3",
    shortName: "S3",
    tier: 1,
    domains: [1, 3, 4],
    examImportance: "critical",
    oneLiner:
      "Amazon S3 is durable, virtually unlimited object storage accessed over the internet (or privately via VPC endpoints) using a simple key-value model of buckets and objects.",
    englishExplanation:
      "Amazon S3 (Simple Storage Service) stores data as objects (the file plus metadata) inside containers called buckets. There is no folder hierarchy underneath — what looks like a folder is actually just a common \"prefix\" in the object's key (its full name), e.g. photos/2024/trip.jpg. Buckets are created in a specific Region, bucket names are globally unique across all of AWS, and each object can range from 0 bytes up to 5 TB. A single PUT can upload up to 5 GB; AWS recommends multipart upload for objects larger than 100 MB, and requires it for objects larger than 5 GB.\n\nS3 is one of the most exam-heavy services on the SAA-C03 because it touches every domain: resilient architectures (versioning, replication, static website hosting), high-performing designs (Transfer Acceleration, S3 Select, multipart upload), security (bucket policies, IAM, encryption, presigned URLs, Access Points, Block Public Access), and cost optimization (the seven storage classes and lifecycle rules). S3 is also the backbone behind countless other services — CloudFront origins, data lake storage for Athena/Redshift Spectrum, ELB access logs, CloudTrail logs, and backup targets.\n\nData in S3 is stored redundantly across a minimum of three Availability Zones within a Region by design (for the Standard and equivalent multi-AZ classes), which is why AWS advertises very high durability (11 nines) — this is a design property, not a numeric quota you need to memorize, but the concept \"S3 Standard is resilient to the loss of an entire AZ\" is exam-testable. Availability (being reachable) is a separate concept from durability (not losing your data) — the exam likes to test that distinction.\n\nA huge part of mastering S3 for the exam is the storage-class decision: all classes have the same underlying durability, but they trade off retrieval speed, retrieval cost, minimum storage duration, and availability for a much lower per-GB storage price. Getting this trade-off right (via lifecycle rules) is the single most commonly tested S3 cost-optimization pattern.",
    taglishExplanation:
      "Isipin mo ang S3 parang isang napakalaking online storage locker na walang literal na folders sa loob — ang tinatawag na \"folder\" ay pekeng structure lang, gawa sa naming convention ng key (halimbawa \"reports/2024/file.pdf\"). Bawat bucket ay may sariling pangalan na dapat unique sa buong mundo ng AWS, hindi lang sa account mo. Ang laman ng bucket, ang tawag ay \"objects\" — puwedeng litrato, video, backup file, kahit ano. Ang pinaka-importante sa exam: alam mo ba kung kailan gagamit ng Standard, kailan Glacier, at bakit may lifecycle rules — dahil malaking part ng cost optimization questions ay nakabase dito. Tandaan din: durability (hindi mawawala ang datos mo) ay iba sa availability (kung kaya mong ma-access agad) — parehong pinag-uusapan pero magkaibang concept.",
    analogy:
      "S3 is like a giant self-storage warehouse chain with branches (Regions) all over the world. Each storage unit (bucket) has a unique tag, and inside it you can drop in labeled boxes (objects) with a name tag (key) — there are no literal shelves or folders, just naming conventions you invent for your own convenience. You can choose different storage tiers within the warehouse: a shelf near the front door for frequent access (S3 Standard) or a cheap basement vault you rarely visit but that takes hours or days to retrieve from (Glacier).",
    whyItExists:
      "Before object storage like S3, storing large or unpredictable amounts of unstructured data (images, backups, logs, videos) meant provisioning and managing file servers or SANs, which had fixed capacity, needed manual scaling, and were expensive to make durable across sites. S3 removed capacity planning entirely — you never provision size, you just PUT objects, and it durably replicates them across multiple AZs automatically, at a price per GB that keeps dropping.",
    flow: "User/App -> S3 API (PUT/GET) -> Bucket (Region) -> Object stored redundantly across 3+ AZs -> (optional) CloudFront caches at edge -> (optional) Lifecycle rule transitions object to a cheaper storage class over time",
    withoutIt: [
      "You would need to run and patch your own file/object servers and plan storage capacity manually",
      "You would need to build your own cross-AZ or cross-region replication for durability",
      "You would lose easy integration with CloudFront, Athena, Glue, Lambda triggers, and other AWS services that natively read from S3",
      "You would have no simple way to serve static websites or large files directly over HTTPS at scale",
    ],
    bestUseCases: [
      "Static website hosting and static assets (images, CSS, JS, videos) served via CloudFront",
      "Data lake storage for analytics (Athena, Redshift Spectrum, EMR)",
      "Backup and disaster recovery target, including cross-region replication for compliance",
      "Storing and archiving logs (CloudTrail, ELB, VPC Flow Logs, application logs)",
      "Distributing large files to many users cheaply via presigned URLs or CloudFront",
      "Storing infrequently changing data with lifecycle rules to automatically move it to cheaper tiers",
    ],
    poorUseCases: [
      "Data that needs a POSIX filesystem interface shared by many EC2 instances — use EFS instead",
      "A block device backing an OS boot volume or a database's data files — use EBS instead",
      "Data needing millisecond, transactional, row-level updates like a relational database",
      "Extremely latency-sensitive small reads/writes at very high frequency (consider a database or cache instead)",
    ],
    alternatives: [
      { need: "A POSIX shared filesystem mounted by many Linux EC2 instances", choose: "Amazon EFS" },
      { need: "A block volume attached to a single EC2 instance (like a hard disk)", choose: "Amazon EBS" },
      { need: "Long-term, rarely-accessed archival at the lowest possible cost", choose: "S3 Glacier storage classes" },
      { need: "A managed, hybrid on-premises gateway to cloud storage", choose: "AWS Storage Gateway" },
    ],
    keyFeatures: [
      "Buckets and objects with keys/prefixes (no real folder hierarchy, just naming convention)",
      "Versioning — keeps multiple variants of an object in the same bucket, protecting against accidental overwrite/delete",
      "Lifecycle rules — automatically transition or expire objects based on age (e.g. Standard -> IA -> Glacier -> expire)",
      "Replication (CRR cross-region, SRR same-region) for compliance, latency, or redundancy needs, requires versioning enabled",
      "Event notifications (to SNS, SQS, or Lambda) when objects are created/deleted",
      "Server-side encryption (SSE-S3, SSE-KMS, SSE-C) and client-side encryption; encryption in transit via HTTPS/TLS",
      "Access control layers: bucket policies (resource-based, bucket-wide), IAM policies (identity-based), ACLs (legacy), and Block Public Access (account/bucket level safety switch)",
      "Presigned URLs — grant time-limited access to a private object without changing bucket permissions",
      "Static website hosting — serve HTML directly from a bucket over HTTP(S)",
      "Multipart upload — upload large objects in parallel parts, required above a size threshold, resumable",
      "S3 Transfer Acceleration — routes uploads through CloudFront edge locations for faster long-distance transfer",
      "Storage classes: S3 Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Instant Retrieval, Glacier Flexible Retrieval, Glacier Deep Archive",
    "S3 Object Lock — bucket/object-level WORM (write-once-read-many) protection using retention periods and/or legal hold, enforceable in Governance or Compliance mode",
    ],
    availability:
      "S3 Standard, Intelligent-Tiering, Standard-IA, and the Glacier classes (except One Zone-IA) store data redundantly across a minimum of three Availability Zones in the Region, so the loss of a single AZ does not lose your data or typically interrupt access. S3 One Zone-IA deliberately stores data in only one AZ — cheaper, but if that AZ is destroyed the data is lost, so it should only hold data you can recreate or that is already replicated elsewhere. Cross-Region Replication (CRR) can be added for regional-level resilience, compliance data residency, or lower-latency reads in another Region.\n\nStorage-class decision guide by access pattern (same durability across all, only availability/access speed/cost differ):\n- Standard: frequently accessed, unpredictable access patterns, needs millisecond first-byte latency — default choice.\n- Intelligent-Tiering: unknown or changing access patterns; AWS automatically moves objects between frequent/infrequent/archive tiers based on actual usage, avoiding retrieval fees for a small monitoring fee.\n- Standard-IA: infrequently accessed but needs rapid access when needed (e.g. monthly reports, DR backups); lower storage cost than Standard but has a retrieval fee.\n- One Zone-IA: infrequently accessed, non-critical, recreatable data where you accept single-AZ risk for an even lower price.\n- Glacier Instant Retrieval: archive data accessed roughly once a quarter but still needs millisecond retrieval (e.g. medical images, news media archives).\n- Glacier Flexible Retrieval: archives accessed a few times a year, retrieval in minutes to hours (expedited/standard/bulk tiers), lower cost than Instant Retrieval.\n- Glacier Deep Archive: lowest-cost storage class, for data rarely if ever accessed (compliance retention, 7-10 year archives), retrieval takes hours.",
    security:
      "By default, every S3 bucket and object is private. Access is granted through IAM policies (attached to users/roles — best for controlling what your own principals can do), bucket policies (attached to the bucket itself — best for cross-account access or blanket rules like \"require encryption\" or \"deny non-HTTPS\"), and legacy ACLs (avoid for new designs). S3 Block Public Access is an account/bucket-level override that can force-block public access even if a policy would otherwise allow it — a common exam trap is forgetting this can silently block an otherwise-correct policy. Presigned URLs let you grant temporary, time-limited access (e.g. 15 minutes) to a specific private object without making the bucket public — commonly used for direct browser uploads/downloads. Encryption at rest is available via SSE-S3 (S3-managed keys), SSE-KMS (customer-managed keys in KMS, adds audit trail and control), or SSE-C (customer-supplied keys); encryption in transit is enforced via HTTPS/TLS and can be required with a bucket policy condition (aws:SecureTransport).",
    pricingLogic:
      "You pay for storage (per GB per month, varies by storage class), for requests (PUT/GET/LIST etc., varying by type and class), for data retrieval (for IA and Glacier classes), and for data transfer out to the internet (transfer within the same Region to another AWS service, or in, is generally free or negligible). Lifecycle rules exist specifically to reduce storage cost by automatically demoting older or less-accessed objects to cheaper classes — but retrieving from a cheaper class or deleting before its minimum storage duration can trigger extra fees, so lifecycle rules must match real access patterns.",
    examKeywords: [
      "object storage",
      "bucket and key/prefix",
      "durability vs availability",
      "versioning",
      "lifecycle rule",
      "presigned URL",
      "static website hosting",
      "multipart upload",
      "Transfer Acceleration",
      "cross-region replication",
    ],
    examTraps: [
      "S3 is object storage, not block storage — it cannot be mounted as a raw filesystem/boot volume like EBS.",
      "\"Folders\" in the S3 console are cosmetic; the real structure is the object key/prefix.",
      "Block Public Access can silently override a bucket policy that looks correct — check it whenever a public-access question fails unexpectedly.",
      "One Zone-IA trades resilience (single AZ) for cost — never pick it for critical, non-recreatable data.",
      "Cross-Region Replication requires versioning enabled on both source and destination buckets, and does not retroactively replicate existing objects unless you use S3 Batch Replication.",
      "Deleting an object early from an IA or Glacier class before its minimum storage duration can incur an early-deletion charge.",
      "Presigned URLs inherit the permissions of the user/role that generated them and expire — they are not a permanent public link.",
    ],
    architectureDiagram:
      "User\n  |\nCloudFront (optional edge cache)\n  |\nS3 Bucket (Region)\n  |-- Standard (hot)\n  |-- Lifecycle Rule (age > 30d)\n  |     -> Standard-IA\n  |-- Lifecycle Rule (age > 90d)\n  |     -> Glacier Flexible Retrieval\n  |-- Lifecycle Rule (age > 365d)\n        -> Glacier Deep Archive",
    architectureCaption:
      "A typical cost-optimized S3 lifecycle: hot data starts in Standard and automatically cools down into cheaper classes as it ages.",
    mentorTip:
      "Whenever a scenario gives you an access-frequency pattern (\"accessed once a month,\" \"rarely accessed but needs sub-second access when it is,\" \"almost never accessed, compliance retention\"), map it directly to a storage class before looking at the answer options — Standard-IA, Glacier Instant Retrieval, and Glacier Deep Archive are the three the exam contrasts most often.",
    questionIds: [
      "q-amazon-s3-1",
      "q-amazon-s3-2",
      "q-amazon-s3-3",
      "q-amazon-s3-4",
      "q-amazon-s3-5",
    ],
  },
  {
    id: "amazon-ebs",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "Amazon EBS",
    shortName: "EBS",
    tier: 1,
    domains: [3, 4],
    examImportance: "critical",
    oneLiner:
      "Amazon EBS provides durable, network-attached block storage volumes that behave like a hard disk for a single EC2 instance.",
    englishExplanation:
      "Amazon EBS (Elastic Block Store) gives you virtual hard disks — block-level storage volumes — that you attach to an EC2 instance. Unlike S3's object model, EBS presents raw blocks, so the OS can format it with a filesystem (ext4, XFS, NTFS) and use it just like a physical disk, including as the boot volume. A given EBS volume lives in exactly one Availability Zone and can normally only be attached to one EC2 instance at a time (except io2/io1 Multi-Attach, which is a special case for clustered filesystems).\n\nEBS volume types trade off performance characteristics and cost. At a conceptual level: General Purpose SSD (gp3/gp2) is the default balanced choice for most workloads (boot volumes, dev/test, small-to-medium databases); Provisioned IOPS SSD (io1/io2) is for the highest-performance, most consistent workloads like large relational databases needing very high and predictable IOPS; and HDD-based types (st1 throughput-optimized, sc1 cold) are for large, sequential, throughput-heavy workloads like big data or infrequently accessed data — HDD types cannot be used as a boot volume.\n\nTwo performance concepts the exam separates clearly: IOPS (input/output operations per second — how many read/write operations happen) and throughput (MB/s — how much data moves). A workload with many small random reads/writes (like a transactional database) is IOPS-bound, while a workload streaming large sequential files (like big data processing) is throughput-bound — picking the right volume type depends on which one your workload actually needs.",
    taglishExplanation:
      "Ang EBS ay parang hard disk na naka-attach sa isang EC2 instance lang — hindi tulad ng S3 na para sa buong internet, ito ay parang sariling disk mo lang, naka-plug sa isang server. Importante: naka-tali ang EBS volume sa isang Availability Zone lang, kaya kung gusto mong i-attach ito sa instance na nasa ibang AZ, kailangan mo munang mag-snapshot at gumawa ng bagong volume doon. Sa exam, tandaan ang pagkakaiba ng IOPS (bilang ng operations, parang bilis ng typing) at throughput (dami ng datos, parang laki ng pipe) — kung ang tanong ay tungkol sa database na maraming maliliit na transactions, IOPS ang priority; kung tungkol sa malalaking sequential file processing, throughput ang priority.",
    analogy:
      "EBS is like an external hard drive you plug directly into one specific computer (EC2 instance) via a dedicated cable. It only works with that one computer at a time (with a rare exception for special multi-attach cases), and if you move it to a computer in a different city (Availability Zone), you cannot just carry it over — you first need to make a copy (snapshot) and recreate it there.",
    whyItExists:
      "EC2 instance store (local disk physically attached to the host) is fast but ephemeral — data is lost when the instance stops or the underlying hardware fails. EBS exists to give EC2 instances persistent, durable block storage that survives instance stop/start, that can be resized and have its performance tuned independently of the instance, and that can be snapshotted for backup or cloned into new volumes — all without the data living and dying with the physical host.",
    flow: "EC2 instance requests a volume -> EBS provisions a durable block volume in the same AZ -> Volume attached via the network to the instance as a device -> OS formats/mounts it -> (optional) Snapshot to S3 for backup/DR -> (optional) Restore snapshot as a new volume in another AZ/Region",
    withoutIt: [
      "EC2 instances would only have ephemeral instance-store disks that lose data on stop or hardware failure",
      "You could not resize storage independently of the instance without significant manual copying",
      "You would lose the ability to take point-in-time snapshots for backup or to quickly clone volumes",
      "You could not easily move a volume's data to another AZ via a simple snapshot-and-restore workflow",
    ],
    bestUseCases: [
      "Boot volumes for EC2 instances",
      "Databases running on EC2 that need low-latency, high-IOPS block storage (io1/io2)",
      "General-purpose application and dev/test workloads (gp3/gp2)",
      "Big data, log processing, or data warehouse workloads needing high throughput on large sequential I/O (st1)",
      "Point-in-time backup and disaster recovery via snapshots copied across Regions",
    ],
    poorUseCases: [
      "Shared access from many EC2 instances at once — use EFS for POSIX shared file access instead",
      "Data that must survive independent of any single AZ without extra replication effort — use S3 instead",
      "Massive, globally distributed static asset storage — S3 with CloudFront is a better fit and far cheaper",
    ],
    alternatives: [
      { need: "Shared filesystem mounted by many Linux instances at once", choose: "Amazon EFS" },
      { need: "Internet-scale object storage for unstructured data", choose: "Amazon S3" },
      { need: "Managed Windows-native or high-performance shared filesystem", choose: "Amazon FSx" },
      { need: "Fast, ephemeral, instance-local scratch disk (no persistence needed)", choose: "EC2 Instance Store" },
    ],
    keyFeatures: [
      "Volume types: gp3/gp2 (general purpose SSD), io1/io2 (provisioned IOPS SSD, highest performance), st1 (throughput HDD), sc1 (cold HDD)",
      "Elastic Volumes — resize (grow) a volume, change type, or adjust IOPS/throughput without downtime",
      "Snapshots — incremental, point-in-time backups stored in S3, used to restore or clone volumes, and can be copied cross-Region",
      "Encryption at rest using KMS, including the ability to encrypt an unencrypted volume by copying its snapshot",
      "AZ-scoped: a volume must be in the same AZ as the EC2 instance it attaches to",
      "Multi-Attach: a narrow exception (on io1/io2 volumes) allowing one volume to attach to multiple instances in the same AZ for clustered applications; io2 Block Express is a separate, higher-performance io2 tier",
    ],
    availability:
      "An EBS volume is replicated within its own Availability Zone by AWS for durability against hardware failure, but it does not span multiple AZs — if the entire AZ has an outage, that volume (and the instance it is attached to) is affected. For resilience across AZs, take regular snapshots (stored durably in S3, which spans multiple AZs) so you can quickly recreate the volume elsewhere, or replicate data at the application layer (e.g. database replication).",
    security:
      "EBS volumes support encryption at rest via KMS with effectively no performance penalty; you can set your account to encrypt all new volumes and snapshots by default. Snapshots of encrypted volumes are automatically encrypted, and copying a snapshot is the standard way to encrypt a previously unencrypted volume. Access to EBS API actions (create/attach/delete volumes and snapshots) is controlled through IAM; the data itself is only reachable through the attached, running EC2 instance's OS-level permissions, not directly over the network like S3.",
    pricingLogic:
      "You pay per GB provisioned per month for the volume (not just what you use — EBS is provisioned capacity, unlike S3), plus additional cost for provisioned IOPS/throughput on io1/io2 and gp3 above the included baseline. Snapshots are billed for the incremental storage they consume in S3. Unlike EC2 On-Demand compute, EBS volume charges continue even while the attached instance is stopped, because the storage still exists.",
    examKeywords: [
      "block storage",
      "single EC2 instance",
      "AZ-scoped",
      "IOPS vs throughput",
      "gp3",
      "io1/io2 Provisioned IOPS",
      "snapshot",
      "boot volume",
    ],
    examTraps: [
      "An EBS volume cannot attach to an instance in a different AZ — you must snapshot and restore into that AZ first.",
      "Stopping an EC2 instance does not delete its attached EBS volumes or stop their storage charges (only \"Delete on Termination\" affects that at terminate time).",
      "HDD-based volumes (st1, sc1) cannot be used as a boot volume — only SSD types can.",
      "High IOPS requirement (many small transactions) points to io1/io2, not to st1/sc1 which are throughput-oriented for large sequential access.",
      "EBS is not natively shareable across many instances — Multi-Attach is a narrow exception for specific clustered use cases, not a general substitute for EFS.",
    ],
    architectureDiagram:
      "EC2 Instance (AZ-a)\n  |\n  |-- attached --> EBS Volume (AZ-a)\n                        |\n                  Snapshot (stored in S3, spans AZs)\n                        |\n                  Restore as new volume in AZ-b\n                        |\n                  Attach to EC2 Instance (AZ-b)",
    architectureCaption:
      "EBS volumes are AZ-scoped; snapshots are the standard mechanism to move or recover data into a different AZ or Region.",
    mentorTip:
      "If a question mentions a database or app needing very high, consistent IOPS, think io1/io2. If it mentions big sequential throughput (big data, log streaming), think st1. If it just says \"general purpose, cost-effective, boot volume,\" that is gp3/gp2 by default.",
    questionIds: [
      "q-amazon-ebs-1",
      "q-amazon-ebs-2",
      "q-amazon-ebs-3",
      "q-amazon-ebs-4",
      "q-amazon-ebs-5",
    ],
  },
  {
    id: "amazon-efs",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "Amazon EFS",
    shortName: "EFS",
    tier: 1,
    domains: [3],
    examImportance: "high",
    oneLiner:
      "Amazon EFS is a fully managed, elastic NFS filesystem that many Linux EC2 instances (or containers/Lambda) can mount and share at the same time.",
    englishExplanation:
      "Amazon EFS (Elastic File System) is a managed network file system using the NFS protocol. Unlike EBS, which attaches to exactly one instance, an EFS filesystem can be mounted concurrently by many EC2 instances (typically Linux) across multiple Availability Zones in a Region at the same time, all reading and writing the same shared POSIX-compliant filesystem. Capacity is elastic — you don't provision size up front; it grows and shrinks automatically as you add or remove files, and you pay for what you actually store.\n\nThis makes EFS the natural fit whenever multiple compute instances need a shared, consistent view of the same files — for example, a fleet of web servers behind a load balancer that all need to serve the same uploaded content, or a content-management system where any app server can read/write the same directory. EFS mount targets are created per-AZ, so instances in different AZs each connect to a mount target in their own AZ while transparently sharing the same underlying filesystem.",
    taglishExplanation:
      "Kung ang EBS ay parang sariling hard disk mo lang, ang EFS naman ay parang shared network drive na puwedeng i-access nang sabay-sabay ng maraming EC2 instances — kahit nasa magkaibang Availability Zone sila. Perfect ito kapag maraming web servers mo ang kailangang magbasa at magsulat sa parehong set ng files, halimbawa mga naka-upload na larawan sa isang content management system. Hindi mo na kailangang mag-isip ng laki — automatic siyang lumalaki o lumiliit depende sa dami ng laman.",
    analogy:
      "EFS is like a shared network drive in an office that every employee's computer can open and edit at the same time, no matter which floor (Availability Zone) they sit on — everyone sees the same files in real time, and the drive automatically expands as more files are added, with no one needing to request more disk space.",
    whyItExists:
      "Many applications (content management, shared home directories, media processing pipelines, container workloads) need multiple compute nodes to see a consistent, shared set of files. EBS cannot do this because it is single-instance and AZ-scoped; building your own shared NFS server would mean managing scaling, patching, and multi-AZ availability yourself. EFS exists to provide that shared POSIX filesystem as a fully managed, multi-AZ, auto-scaling service.",
    flow: "EC2 Instances (multiple, multi-AZ) -> mount targets (one per AZ) -> shared EFS filesystem -> files visible identically to every connected instance",
    withoutIt: [
      "You would need to build and manage your own clustered NFS server, handling scaling and multi-AZ failover yourself",
      "Instances could not transparently share a live, POSIX-compliant filesystem across multiple AZs",
      "You would need to manually provision and resize storage capacity instead of it scaling automatically",
    ],
    bestUseCases: [
      "Shared content directories for a fleet of web/app servers behind a load balancer",
      "Home directories for Linux-based workloads shared across multiple instances",
      "Big data analytics, media processing, or container workloads needing shared POSIX storage across many compute nodes",
      "Lift-and-shift of existing on-premises NFS workloads that need a shared filesystem in AWS",
    ],
    poorUseCases: [
      "A single EC2 instance's boot volume or dedicated disk — EBS is simpler and cheaper for that",
      "Windows-native shared file storage — FSx for Windows File Server fits SMB/Active Directory needs better",
      "High-performance computing workloads needing extreme sub-millisecond, massively parallel throughput — consider FSx for Lustre",
    ],
    alternatives: [
      { need: "Block storage for a single EC2 instance", choose: "Amazon EBS" },
      { need: "Windows-native SMB file shares with Active Directory integration", choose: "Amazon FSx for Windows File Server" },
      { need: "High-performance computing shared storage", choose: "Amazon FSx for Lustre" },
      { need: "Object storage for unstructured data, not a mounted filesystem", choose: "Amazon S3" },
    ],
    keyFeatures: [
      "NFS-based, POSIX-compliant shared filesystem mountable by many instances concurrently",
      "Elastic — capacity scales automatically with usage, no pre-provisioning of size",
      "Multi-AZ by design, with mount targets created in each subnet/AZ you need",
      "Storage classes: Standard, Infrequent Access (EFS-IA), and Archive, plus lifecycle management to move files to IA/Archive automatically as they age",
      "Two performance modes (general purpose vs max I/O) and two throughput modes (bursting vs provisioned) at a conceptual level",
      "Works with EC2, ECS/EKS containers, and AWS Lambda for shared file access",
    ],
    availability:
      "EFS filesystems are regional resources designed to be highly available and durable across multiple Availability Zones, since mount targets are placed in each AZ your compute resources use. This multi-AZ nature is a key differentiator from EBS, which is confined to a single AZ.",
    security:
      "Access control uses a mix of standard Linux/POSIX file permissions (for who can read/write specific files once mounted), IAM policies (to control which principals can mount or manage the filesystem via EFS access points and IAM authorization), security groups on the mount targets (to control network access), and encryption at rest via KMS plus encryption in transit over TLS.",
    pricingLogic:
      "You pay per GB actually stored per month (no pre-provisioning like EBS), with a lower rate for the Infrequent Access storage class, plus charges for throughput mode if using provisioned throughput instead of the default bursting model. There is no charge for unused/unprovisioned capacity, unlike EBS.",
    examKeywords: [
      "shared file system",
      "NFS",
      "POSIX",
      "multiple EC2 instances",
      "multi-AZ",
      "elastic capacity",
      "mount target",
    ],
    examTraps: [
      "EFS is Linux/NFS-oriented — for Windows shared file storage the exam wants FSx for Windows File Server, not EFS.",
      "Do not confuse EFS's automatic elastic scaling with EBS's fixed provisioned size — the exam tests \"no capacity planning needed\" as an EFS signal.",
      "EFS is not a substitute for a database despite being shared storage — it's a filesystem, not a query engine.",
    ],
    architectureDiagram:
      "EC2 (AZ-a) --\\\n              \\\n               >-- Mount Target (per AZ) -- EFS Filesystem (shared, multi-AZ)\n              /\nEC2 (AZ-b) --/",
    architectureCaption:
      "Multiple EC2 instances across AZs each connect to their own mount target but share one logical EFS filesystem.",
    mentorTip:
      "The instant a question says \"multiple EC2 instances need to read and write the same files at the same time,\" that is EFS, not EBS — EBS cannot be shared like that across instances in the general case.",
    questionIds: [
      "q-amazon-efs-1",
      "q-amazon-efs-2",
      "q-amazon-efs-3",
      "q-amazon-efs-4",
      "q-amazon-efs-5",
    ],
  },
  {
    id: "amazon-fsx",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "Amazon FSx",
    shortName: "FSx",
    tier: 2,
    domains: [3],
    examImportance: "medium",
    oneLiner:
      "Amazon FSx is a family of fully managed, third-party-compatible file systems for specific workloads: Windows File Server, Lustre, NetApp ONTAP, and OpenZFS.",
    englishExplanation:
      "Amazon FSx launches and manages purpose-built, specific file system technologies as a service, rather than a single generic filesystem like EFS. The exam mainly wants you to recognize which FSx flavor matches which need: FSx for Windows File Server provides native SMB shares with Windows-specific features (Active Directory integration, NTFS permissions, DFS) for Windows-based applications; FSx for Lustre is a high-performance parallel filesystem built for compute-intensive workloads like high-performance computing (HPC), machine learning training, and media processing, and can integrate directly with S3 as its data source; FSx for NetApp ONTAP brings NetApp's popular on-premises filesystem features (snapshots, cloning, multi-protocol NFS/SMB/iSCSI) into AWS for teams already standardized on NetApp; and FSx for OpenZFS provides a fully managed ZFS-based filesystem for Linux workloads wanting ZFS-specific features (snapshots, cloning, high performance).\n\nThe conceptual exam decision is: choose EFS by default for a simple Linux/NFS shared filesystem; choose FSx when you specifically need Windows/SMB compatibility, extreme HPC-grade performance tightly coupled with S3, or you are migrating an existing workload that already depends on NetApp ONTAP or ZFS features.",
    taglishExplanation:
      "Ang FSx ay parang \"menu\" ng iba't ibang klase ng managed file system, bawat isa gawa para sa specific na pangangailangan. Kung Windows-based ang application mo at kailangan ng SMB file shares na naka-integrate sa Active Directory, FSx for Windows File Server ang gamitin. Kung high-performance computing o machine learning training na kailangan ng sobrang bilis at direktang koneksyon sa S3, FSx for Lustre ang tama. Kung galing kayo sa on-premises NetApp o gusto niyo ng ZFS features, meron ding FSx for NetApp ONTAP at FSx for OpenZFS. Sa madaling salita: EFS ang default kapag simpleng Linux shared storage lang ang kailangan; FSx kapag may specific na technology requirement.",
    analogy:
      "If EFS is a generic shared network drive, FSx is like ordering a specialized appliance built by a specific vendor — a Windows file server appliance, a supercomputer-grade parallel storage rig, or a NetApp/ZFS box — fully assembled and managed for you, for when the generic drive doesn't speak the exact protocol or deliver the exact performance profile your workload already depends on.",
    whyItExists:
      "Many organizations already run applications tightly coupled to a specific file system technology — Windows apps needing real SMB and Active Directory integration, HPC pipelines needing Lustre's parallel I/O, or teams standardized on NetApp ONTAP or ZFS. Rebuilding those workloads around a generic Linux/NFS filesystem like EFS is often impractical. FSx exists so AWS can offer these exact technologies as a managed service, removing the operational burden of running them yourself.",
    flow: "Application (Windows or HPC/Linux workload) -> FSx file system (matching technology: Windows/Lustre/ONTAP/OpenZFS) -> (for Lustre) optionally backed by / synced with an S3 bucket for the data lake",
    withoutIt: [
      "You would need to self-host and manage Windows File Server, Lustre, NetApp ONTAP, or ZFS clusters yourself, including patching and HA",
      "You would lose native protocol compatibility (SMB, Active Directory) needed by many existing Windows applications",
      "HPC/ML workloads would lack a managed, S3-integrated, high-throughput parallel filesystem option",
    ],
    bestUseCases: [
      "Windows applications needing SMB file shares and Active Directory-integrated permissions (FSx for Windows File Server)",
      "High-performance computing, machine learning training, and media rendering needing a fast parallel filesystem tied to S3 (FSx for Lustre)",
      "Teams migrating existing NetApp ONTAP-based storage workflows into AWS (FSx for NetApp ONTAP)",
      "Linux workloads wanting ZFS-specific snapshot/cloning features (FSx for OpenZFS)",
    ],
    poorUseCases: [
      "Simple Linux shared file storage with no special protocol requirement — EFS is simpler and usually cheaper",
      "A single-instance boot/data disk — EBS is the right fit, not a managed shared filesystem",
    ],
    alternatives: [
      { need: "Simple, generic Linux/NFS shared filesystem", choose: "Amazon EFS" },
      { need: "Block storage for a single EC2 instance", choose: "Amazon EBS" },
      { need: "Object storage / data lake without needing a mounted filesystem", choose: "Amazon S3" },
    ],
    keyFeatures: [
      "FSx for Windows File Server — native SMB, Active Directory/NTFS permission integration, DFS namespaces",
      "FSx for Lustre — high-throughput, low-latency parallel file system, integrates with S3 for HPC/ML workloads",
      "FSx for NetApp ONTAP — NetApp features (snapshots, cloning, multi-protocol NFS/SMB/iSCSI) as a managed service",
      "FSx for OpenZFS — managed ZFS filesystem with snapshots and cloning for Linux workloads",
      "All flavors are fully managed: patching, replication, and backups are handled by AWS",
    ],
    availability:
      "Each FSx type offers configurations for high availability across multiple AZs (specifics vary per file system type — check current AWS docs), plus backup features for point-in-time recovery, similar in spirit to how EFS and RDS provide managed durability without you operating the underlying servers.",
    security:
      "Access control follows each underlying technology's native model: Windows File Server uses Active Directory and NTFS permissions; Lustre, ONTAP, and OpenZFS use POSIX-style and protocol-specific permissions. All FSx types support encryption at rest via KMS and encryption in transit, plus VPC security groups to control network-level access.",
    pricingLogic:
      "You pay based on provisioned storage capacity and throughput/performance tier chosen for the specific FSx type, generally higher per-GB than EFS given the specialized technology and features, similar in spirit to how a specialized managed database costs more than a generic one.",
    examKeywords: [
      "Windows File Server",
      "SMB",
      "Active Directory integration",
      "Lustre",
      "high performance computing",
      "NetApp ONTAP",
      "OpenZFS",
    ],
    examTraps: [
      "If the scenario mentions SMB or Active Directory-integrated file shares, that is FSx for Windows File Server, not EFS.",
      "If the scenario mentions HPC/ML training needing extreme throughput tied to S3, that is FSx for Lustre, not EFS or generic EBS.",
      "Do not default to FSx when a simple Linux NFS share would do — EFS is usually the simpler, cheaper answer unless a specific technology is named.",
    ],
    architectureDiagram:
      "Windows App --> FSx for Windows File Server --> Active Directory\n\nHPC/ML Job --> FSx for Lustre <--> S3 (data lake)",
    architectureCaption:
      "FSx picks the specific underlying technology (Windows/Lustre/ONTAP/OpenZFS) to match a workload's existing protocol or performance needs.",
    mentorTip:
      "Scan the scenario for a named technology or protocol (SMB, Active Directory, Lustre, NetApp, ZFS, HPC) — that keyword alone usually tells you which FSx flavor is correct, versus EFS being the answer when no specific technology is named.",
    questionIds: ["q-amazon-fsx-1", "q-amazon-fsx-2", "q-amazon-fsx-3"],
  },
  {
    id: "s3-glacier",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "Amazon S3 Glacier (Archive Strategy)",
    shortName: "Glacier",
    tier: 1,
    domains: [1, 4],
    examImportance: "critical",
    oneLiner:
      "S3 Glacier is the family of S3 storage classes purpose-built for long-term, low-cost archival, with different retrieval speed and cost trade-offs.",
    englishExplanation:
      "S3 Glacier is not a separate service from S3 — it is a set of storage classes within S3 (Glacier Instant Retrieval, Glacier Flexible Retrieval, and Glacier Deep Archive) designed for data you need to keep for a long time but access rarely. You still manage Glacier objects through the same S3 API, bucket, and lifecycle rules as any other S3 object; you just choose (or transition into, via a lifecycle rule) a Glacier class once the object's active life is over.\n\nThe exam-critical distinction is retrieval time and cost, not just storage cost. Glacier Instant Retrieval behaves almost like Standard-IA for read speed (milliseconds) but at a much lower storage price, at the cost of a minimum storage duration and higher retrieval fees per request — best for archives that are rarely touched but must be available instantly when they are (e.g. medical images that might be pulled up unpredictably). Glacier Flexible Retrieval offers three explicit retrieval speed tiers you choose per request: Expedited (minutes), Standard (hours), and Bulk (many hours, cheapest) — best when you know in advance an occasional access might happen and can tolerate some wait. Glacier Deep Archive is the cheapest storage class AWS offers and is built for data almost never accessed, with retrieval taking longer (typically well within a business day, standard vs bulk tiers) — the classic fit for 7-10 year compliance retention or regulatory archives.\n\nFor strict regulatory WORM (write-once-read-many) requirements, S3 Object Lock can be applied to objects in any S3 storage class, including the Glacier classes — you set a retention period and/or a legal hold, and in Compliance mode not even the account root user can delete or shorten that retention until it expires. (Note: this is distinct from the older \"Vault Lock\" feature of the original, separate Amazon S3 Glacier vaults/archives API — for objects living in an S3 bucket, which is what this course focuses on, S3 Object Lock is the mechanism the exam expects.)",
    taglishExplanation:
      "Ang Glacier ay hindi hiwalay na service — bahagi lang siya ng storage classes sa loob mismo ng S3, para sa mga file na kailangan mo pang itago nang matagal pero bihira mo nang buksan. Ang pinaka-importante dito para sa exam ay ang bilis ng pag-retrieve: kung kailangan mong makuha agad-agad kahit bihira i-access (halimbawa medical records), Glacier Instant Retrieval ang tama. Kung okay lang na maghintay ng ilang minuto hanggang oras paminsan-minsan, Glacier Flexible Retrieval (may Expedited, Standard, Bulk options pa). Kung talagang \"itago mo lang, halos hindi na babalikan\" — compliance archive na 7-10 years — Glacier Deep Archive ang pinakamura pero pinakamatagal ang paghintay kapag kinailangan.",
    analogy:
      "Think of Glacier as a spectrum of storage lockers at increasing distance from your office. Glacier Instant Retrieval is a locker in the basement — cheap, but still instantly accessible when you walk down. Glacier Flexible Retrieval is a locker at an off-site facility a town away — you call ahead and wait minutes to hours depending on how much you're willing to pay for rush delivery. Glacier Deep Archive is a locker in a vault on the other side of the country — extremely cheap to keep things there, but you must plan ahead because getting it back takes real time.",
    whyItExists:
      "Many businesses are legally or operationally required to retain data for years (financial records, healthcare data, compliance logs) but almost never read it again. Storing that at S3 Standard prices would be wasteful. Glacier classes exist to let you keep data virtually forever at a small fraction of the cost, accepting slower retrieval in exchange, with lifecycle rules automating the transition from active storage into archive tiers as data ages.",
    flow: "Object created in S3 Standard -> Lifecycle rule after N days -> transitions to Glacier Flexible Retrieval or Deep Archive -> (if needed) Restore request initiated -> object temporarily copied back to a retrievable state -> download",
    withoutIt: [
      "Long-term compliance data would sit in expensive, frequent-access storage classes indefinitely",
      "You would need to build your own tiered archive process (e.g. exporting to tape) instead of a native, automated lifecycle transition",
      "You would lose built-in compliance features like retention lock for regulatory archiving",
    ],
    bestUseCases: [
      "Regulatory/compliance data that must be retained for years but is almost never accessed (Deep Archive)",
      "Backup archives accessed only during rare disaster-recovery events (Flexible Retrieval)",
      "Media or medical archives that are rarely accessed but must return instantly when they are (Instant Retrieval)",
      "Replacing physical tape backup archives with a durable, cloud-native equivalent",
    ],
    poorUseCases: [
      "Data accessed regularly (daily/weekly) — retrieval fees and delay make Glacier classes a poor fit; use Standard or Standard-IA instead",
      "Data needing guaranteed millisecond retrieval on every access at high frequency — Instant Retrieval only helps for rare, not frequent, access",
      "Data with unknown/unpredictable but frequent access patterns — Intelligent-Tiering is the better automated fit",
    ],
    alternatives: [
      { need: "Frequently accessed hot data", choose: "S3 Standard" },
      { need: "Infrequent but rapid access with predictable pattern", choose: "S3 Standard-IA" },
      { need: "Unknown/changing access pattern managed automatically", choose: "S3 Intelligent-Tiering" },
      { need: "Centralized backup policy across many AWS services (not just S3 objects)", choose: "AWS Backup" },
    ],
    keyFeatures: [
      "Glacier Instant Retrieval — millisecond access, lowest cost among the \"instant\" classes, for rarely accessed archives",
      "Glacier Flexible Retrieval — Expedited/Standard/Bulk retrieval tiers trading speed for cost",
      "Glacier Deep Archive — lowest-cost class, retrieval takes longer, ideal for long-term compliance retention",
      "Lifecycle rules automate transition from Standard/IA into Glacier classes based on object age",
      "S3 Object Lock (Governance or Compliance mode) to enforce WORM-style retention/legal hold, even on Glacier-class objects",
      "Managed entirely through the standard S3 API and console, not a separate service",
    ],
    availability:
      "Glacier storage classes (aside from any single-AZ options, if configured) are designed for high durability using the same multi-AZ redundancy model as other S3 classes — the trade-off versus Standard is retrieval latency and request cost, not durability.",
    security:
      "The same S3 security model applies: bucket policies, IAM policies, Block Public Access, and encryption at rest (SSE-S3/SSE-KMS). Additionally, S3 Object Lock (which requires versioning) can enforce immutability/retention for compliance — in Compliance mode it prevents deletion or modification even by the account root user until the retention period expires — this is the feature to reach for whenever a scenario mentions legal hold or regulatory WORM requirements.",
    pricingLogic:
      "Storage cost per GB decreases significantly the \"deeper\" into Glacier you go (Instant Retrieval < Flexible Retrieval < Deep Archive from a cost perspective, cheapest last), but retrieval fees and minimum storage duration charges increase. Early deletion (before the minimum storage duration) incurs a penalty, so lifecycle design should match real, expected retention needs.",
    examKeywords: [
      "archival storage",
      "retrieval tiers",
      "Expedited/Standard/Bulk",
      "compliance retention",
      "S3 Object Lock / WORM",
      "lifecycle transition",
      "Deep Archive",
    ],
    examTraps: [
      "Glacier is not a separate service — it is a set of S3 storage classes managed through the same S3 API and lifecycle rules.",
      "Choosing Deep Archive for data that might need to be pulled back urgently is a common wrong-answer trap — check the retrieval time requirement in the scenario carefully.",
      "Early deletion before the minimum storage duration on any Glacier class triggers a fee — don't pick Glacier for short-retention data.",
      "\"Rarely accessed but needs millisecond retrieval\" is Instant Retrieval, not Flexible Retrieval or Deep Archive — read the retrieval-speed requirement, not just the word \"rare.\"",
    ],
    architectureDiagram:
      "S3 Standard (0-30 days)\n   |\n   v (lifecycle rule)\nS3 Standard-IA (30-90 days)\n   |\n   v (lifecycle rule)\nGlacier Flexible Retrieval (90-365 days)\n   |\n   v (lifecycle rule)\nGlacier Deep Archive (365+ days, compliance retention)",
    architectureCaption:
      "A classic compliance-driven S3 lifecycle progressively archives data into cheaper, slower-retrieval Glacier tiers as it ages.",
    mentorTip:
      "When a Glacier question appears, first identify the retrieval-time requirement stated in the scenario (instant, minutes/hours, or \"almost never, plan ahead\") — that alone almost always points to exactly one of the three Glacier classes.",
    questionIds: [
      "q-s3-glacier-1",
      "q-s3-glacier-2",
      "q-s3-glacier-3",
      "q-s3-glacier-4",
      "q-s3-glacier-5",
    ],
  },
  {
    id: "aws-storage-gateway",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "AWS Storage Gateway",
    shortName: "Storage Gateway",
    tier: 2,
    domains: [3, 4],
    examImportance: "medium",
    oneLiner:
      "AWS Storage Gateway is a hybrid storage service that connects on-premises applications to AWS storage, presenting cloud storage through familiar on-premises protocols (file, volume, or tape).",
    englishExplanation:
      "AWS Storage Gateway is a software appliance (deployed as a VM on-premises, on a hardware appliance, or in EC2) that lets on-premises applications keep using local storage protocols they already understand — NFS/SMB file shares, iSCSI block volumes, or a virtual tape library — while data is actually being stored durably in AWS behind the scenes. It exists specifically for hybrid cloud scenarios: companies that are not ready or able to fully move applications to the cloud, but want to extend their storage into AWS for capacity, backup, or disaster recovery.\n\nThere are three gateway types, each mapping to a familiar on-premises need: File Gateway presents an NFS/SMB file share backed by S3 objects, ideal for on-premises applications that need file access to data that is ultimately stored (and can be directly accessed/processed) as S3 objects; Volume Gateway presents iSCSI block volumes backed by EBS snapshots in AWS, either cached (frequently used data kept locally, full dataset in AWS) or stored (full dataset kept locally, async backup to AWS) mode; and Tape Gateway presents a virtual tape library (VTL) interface compatible with existing backup software, replacing physical tape infrastructure with cloud storage (that can archive to Glacier), for organizations with tape-based backup workflows they don't want to re-architect immediately.",
    taglishExplanation:
      "Ang Storage Gateway ay parang tulay sa pagitan ng on-premises data center mo at ng AWS cloud. Gagamit ka pa rin ng parehong pamilyar na paraan ng pag-access ng storage sa opisina niyo (file share, block volume, o virtual tape), pero sa likod, talagang nasa AWS na ang datos. Kapaki-pakinabang ito kapag hindi pa puwedeng lumipat agad nang tuluyan sa cloud ang isang kumpanya, pero gusto na nilang gamitin ang AWS para sa backup, disaster recovery, o extra capacity. May tatlong klase: File Gateway (NFS/SMB na nakabase sa S3), Volume Gateway (iSCSI block volumes na naka-backup sa EBS snapshots), at Tape Gateway (parang virtual tape para sa existing backup software).",
    analogy:
      "Storage Gateway is like installing a smart adapter at your office that makes a filing cabinet you already know how to use (file share, disk drive, or tape backup system) secretly connect to an enormous, durable warehouse on the other side of town (AWS) — you keep working the exact same way you always have, but your files are actually being kept safe in the cloud.",
    whyItExists:
      "Not every organization can immediately rewrite applications to talk to S3 or EBS natively — many depend on decades-old protocols like NFS, SMB, iSCSI, or tape backup software. Storage Gateway exists to let those existing applications gain the durability, scalability, and off-site protection of AWS storage without any application rewrite, easing the transition toward cloud adoption and hybrid architectures.",
    flow: "On-premises application -> Storage Gateway appliance (local cache) -> presents familiar protocol (NFS/SMB, iSCSI, or VTL) -> data asynchronously/durably stored in AWS (S3, EBS snapshots, or Glacier via virtual tapes)",
    withoutIt: [
      "On-premises applications would need to be rewritten to call AWS storage APIs directly",
      "Extending on-premises backup or storage into AWS would require custom-built replication tooling",
      "Organizations relying on physical tape backup would have no simple cloud-native migration path",
    ],
    bestUseCases: [
      "Hybrid cloud storage where on-premises apps need low-latency local access but want AWS-backed durability (cached Volume Gateway)",
      "Extending on-premises file shares into S3-backed storage without changing applications (File Gateway)",
      "Replacing physical tape backup infrastructure with a cloud-backed virtual tape library (Tape Gateway)",
      "Disaster recovery scenarios where an on-premises data center needs an off-site, durable backup target",
    ],
    poorUseCases: [
      "New, cloud-native applications with no on-premises component — build directly on S3/EBS/EFS instead",
      "Workloads needing the lowest possible latency with no cache/gateway layer in between",
    ],
    alternatives: [
      { need: "A cloud-native application storing data directly in AWS with no on-premises component", choose: "Amazon S3 / Amazon EBS directly" },
      { need: "Centralized backup policy management across many AWS resources", choose: "AWS Backup" },
      { need: "A dedicated network connection instead of storage protocol translation", choose: "AWS Direct Connect" },
    ],
    keyFeatures: [
      "File Gateway — NFS/SMB file shares backed by S3 objects",
      "Volume Gateway — iSCSI block volumes backed by EBS snapshots, in cached or stored mode",
      "Tape Gateway — virtual tape library (VTL) compatible with existing backup software, can archive to Glacier",
      "Local caching of frequently accessed data for low-latency on-premises reads",
      "Asynchronous, encrypted data transfer to AWS storage services in the background",
    ],
    availability:
      "Data written through Storage Gateway is durably stored in AWS services (S3, EBS snapshots, or Glacier) that themselves offer multi-AZ durability; the on-premises appliance itself is a single point tied to the local site unless deployed redundantly, so availability planning still needs to consider the local hardware/VM and network link to AWS.",
    security:
      "Data is encrypted in transit (TLS) between the gateway and AWS, and at rest in the underlying AWS storage service (S3/EBS, which support KMS encryption). Access to the gateway's management and the underlying AWS resources is controlled via IAM, and the appliance itself should be secured at the network level on-premises like any other infrastructure component.",
    pricingLogic:
      "You pay for the underlying AWS storage consumed (S3 storage for File Gateway, EBS snapshot storage for Volume Gateway, Glacier storage for Tape Gateway archived tapes) plus data transfer charges for moving data into AWS, similar in spirit to paying for the destination storage service directly, with no separate large licensing fee for the gateway software itself.",
    examKeywords: [
      "hybrid cloud storage",
      "on-premises",
      "File Gateway",
      "Volume Gateway (cached/stored)",
      "Tape Gateway / virtual tape library",
      "NFS/SMB/iSCSI",
    ],
    examTraps: [
      "Storage Gateway is for hybrid (on-premises + cloud) scenarios — it is not the right answer for a purely cloud-native architecture question.",
      "Cached Volume Gateway keeps a local copy of frequently used data with full data in AWS; Stored Volume Gateway keeps the primary copy on-premises with async backup to AWS — the exam tests you can tell these apart.",
      "Tape Gateway is for existing tape backup software workflows — do not confuse it with generic S3 backup.",
    ],
    architectureDiagram:
      "On-Premises App\n     |\nStorage Gateway Appliance (local cache)\n     |\n  (NFS/SMB)      (iSCSI)         (VTL)\n     |               |               |\n  S3 Bucket    EBS Snapshots   Glacier (virtual tapes)",
    architectureCaption:
      "Storage Gateway translates familiar on-premises protocols into AWS-native storage behind the scenes.",
    mentorTip:
      "If a scenario says \"on-premises\" and mentions a specific legacy protocol (file share, iSCSI, tape backup software), Storage Gateway is almost always the right family — then match the protocol keyword to the exact gateway type.",
    questionIds: ["q-aws-storage-gateway-1", "q-aws-storage-gateway-2", "q-aws-storage-gateway-3"],
  },
  {
    id: "aws-backup",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "AWS Backup",
    shortName: "AWS Backup",
    tier: 1,
    domains: [1, 2],
    examImportance: "high",
    oneLiner:
      "AWS Backup is a centralized, policy-based service for automating and managing backups across many AWS services from one place.",
    englishExplanation:
      "AWS Backup exists because, before it, each AWS service (EBS, RDS, DynamoDB, EFS, Storage Gateway volumes, and more) had its own separate snapshot/backup mechanism, making it hard to apply a consistent backup policy, monitor compliance, or manage retention across an entire account. AWS Backup provides one central place to define backup plans (schedule, frequency, lifecycle/retention rules, and which resources to back up via tags or direct selection) and applies them consistently across all supported services.\n\nBackups are stored in backup vaults, which can have access policies controlling who can create or delete recovery points, and support cross-Region and cross-account copying — useful for disaster recovery (keeping backups isolated in another Region or even another AWS account, so that a compromised or deleted primary account/Region does not also destroy your backups) and for compliance requirements that mandate data residency or retention in a specific location. AWS Backup also supports a Vault Lock feature (again, a WORM-style protection) to prevent backups from being altered or deleted even by administrators until a retention period passes, and provides auditable, centralized reporting on backup compliance across resources.",
    taglishExplanation:
      "Bago nagkaroon ng AWS Backup, magkakahiwalay ang paraan ng pag-backup ng bawat AWS service — may sariling snapshot mechanism ang EBS, iba naman sa RDS, iba pa sa DynamoDB. Ang AWS Backup ang nag-iisang sentro kung saan puwede kang gumawa ng \"backup plan\" — schedule, gaano katagal itatago, at anong mga resources ang isasama (puwede via tags) — at automatic na ito ang mag-a-apply sa lahat ng napiling services. Puwede ring i-copy ang mga backup sa ibang Region o ibang AWS account para sa disaster recovery o compliance, at may Vault Lock feature para hindi mabago o matanggal ang backup kahit ng administrator hanggang matapos ang retention period — importante ito para sa mga legal o regulatory requirements.",
    analogy:
      "Before AWS Backup, it was like every department in a company having its own separate filing system with different rules for how long to keep records. AWS Backup is like hiring one central records-management office that applies one consistent policy (\"keep financial records for 7 years, keep project files for 1 year\") across every department at once, and locks the archive room so records can't be tampered with before their time is up.",
    whyItExists:
      "Managing backups per-service was operationally heavy and error-prone: inconsistent retention, difficulty proving compliance across an entire account, and no single dashboard for backup health. AWS Backup exists to centralize backup policy, automate it via tags/plans instead of manual per-resource snapshot scheduling, and provide auditable compliance reporting and cross-Region/cross-account protection in one place.",
    flow: "Define Backup Plan (schedule + lifecycle + retention) -> Assign resources (by tag or direct selection) -> AWS Backup automatically creates recovery points in a Backup Vault -> (optional) Copy recovery points cross-Region/cross-account -> Restore from a recovery point when needed",
    withoutIt: [
      "You would need to manage separate backup/snapshot schedules per AWS service manually",
      "Applying and proving a consistent retention/compliance policy across many resources would be difficult",
      "You would have no single dashboard to audit backup compliance across your account",
      "Protecting backups from accidental or malicious deletion would require building your own cross-account/cross-region copy process",
    ],
    bestUseCases: [
      "Organizations needing one consistent backup and retention policy across multiple AWS services",
      "Compliance-driven environments needing auditable backup history and immutability (Vault Lock)",
      "Disaster recovery strategies requiring backups copied to another Region or a separate AWS account",
      "Simplifying operations by tagging resources once and letting policy-based plans handle backup automatically",
    ],
    poorUseCases: [
      "A single resource with a one-off, highly custom backup script requirement not shared by anything else",
      "Extremely low-level backup control beyond what centralized policies expose — a custom script might still be needed for edge cases",
    ],
    alternatives: [
      { need: "Manual per-service snapshot management with full custom control", choose: "Native per-service snapshot features (e.g. EBS Snapshots, RDS automated backups)" },
      { need: "Long-term, low-cost archival storage for exported data (not backup orchestration)", choose: "Amazon S3 Glacier storage classes" },
      { need: "Hybrid on-premises backup target using familiar protocols", choose: "AWS Storage Gateway" },
    ],
    keyFeatures: [
      "Centralized backup plans: schedule, lifecycle (transition to cold storage), and retention rules in one policy",
      "Tag-based or direct resource assignment so new resources can be automatically included in a plan",
      "Backup vaults with access policies controlling who can create/delete recovery points",
      "Cross-Region and cross-account backup copy for disaster recovery and compliance isolation",
      "Vault Lock for WORM-style immutability of backups during a retention period",
      "Centralized monitoring/reporting of backup jobs and compliance status across the account",
      "Supports many services conceptually including EBS, RDS, DynamoDB, EFS, Storage Gateway, and more — check current AWS docs for the exact supported-service list",
    ],
    availability:
      "AWS Backup itself is a regional control-plane service that orchestrates backups of underlying resources; the resulting recovery points inherit the durability of the storage they are kept in (e.g. S3-backed), and cross-Region copy adds resilience against a full Region-level disaster affecting the primary copy.",
    security:
      "IAM controls who can create, modify, or delete backup plans and vaults; backup vault access policies add a resource-based layer restricting recovery-point deletion even further. Recovery points can be encrypted via KMS. Vault Lock adds compliance-grade immutability, preventing deletion of backups before their retention period expires, which directly addresses ransomware and insider-threat concerns the exam sometimes raises.",
    pricingLogic:
      "You pay for the backup storage consumed (per GB, varying by warm vs cold/archive tier) and for cross-Region/cross-account data transfer when copying backups elsewhere. There is no separate large licensing fee — cost scales with how much you back up and how long you retain it, so lifecycle/retention policy tuning directly affects cost.",
    examKeywords: [
      "centralized backup",
      "backup plan",
      "backup vault",
      "cross-region/cross-account backup",
      "Vault Lock",
      "policy-based",
      "compliance reporting",
    ],
    examTraps: [
      "AWS Backup is centralized policy/orchestration — it does not replace the underlying storage durability of the service being backed up; the backups still live in AWS storage that has its own durability model.",
      "If a scenario needs backups protected even from a compromised administrator account, that's Vault Lock, not just a backup plan.",
      "Cross-account backup copy is the go-to answer when a scenario worries about an entire account being compromised or deleted, not just a Region-level outage.",
      "Don't confuse AWS Backup (policy orchestration across services) with a single service's native snapshot feature (e.g. \"RDS automated backups\") — the exam may ask which is more centralized/consistent across many resource types.",
    ],
    architectureDiagram:
      "Backup Plan (schedule + retention)\n   |\n   |-- tag-based resource selection\n   |\n   v\nEBS / RDS / DynamoDB / EFS resources\n   |\n   v\nBackup Vault (Region A)\n   |\n   v (copy)\nBackup Vault (Region B / other Account) -- Vault Lock (WORM)",
    architectureCaption:
      "One backup plan can consistently protect many resource types and replicate recovery points cross-Region or cross-account.",
    mentorTip:
      "Whenever a question says \"centralized,\" \"consistent policy across multiple services,\" or \"protect backups from deletion even by an administrator,\" think AWS Backup (with Vault Lock for the immutability angle) rather than a single service's native snapshot feature.",
    questionIds: ["q-aws-backup-1", "q-aws-backup-2", "q-aws-backup-3", "q-aws-backup-4", "q-aws-backup-5"],
  },
];
