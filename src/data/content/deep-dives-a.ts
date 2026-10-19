import type { Lesson } from "@/lib/types";

// Deep-dive lessons: topics the exam keeps returning to that the service overviews only touch on.

export const deepDivesA: Lesson[] = [
  {
    id: "ec2-purchasing-options-placement-groups",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "EC2 Purchasing Options and Placement Groups",
    shortName: "EC2 pricing & placement",
    tier: 1,
    domains: [4, 3],
    examImportance: "high",
    oneLiner:
      "You pay for EC2 in five different ways, and you can tell AWS how to arrange your instances on hardware: close together for speed, far apart for safety.",
    englishExplanation:
      "The same instance can cost you very different amounts depending on how you buy it. On-Demand charges per second with no commitment, which makes it the right default for unpredictable or short-lived work. Reserved Instances and Savings Plans trade a one- or three-year commitment for a discount of up to roughly 70 percent. Spot Instances use spare capacity at up to 90 percent off, but AWS can take the instance back with a two-minute warning. Dedicated Hosts give you a whole physical server, which matters when licensing is tied to sockets or cores.\n\nThe discount products differ in flexibility. A Standard Reserved Instance is locked to an instance family and Region (and optionally an AZ). A Convertible Reserved Instance lets you change family later for a smaller discount. A Compute Savings Plan applies to any EC2 instance regardless of family, size, Region or OS, and also covers Fargate and Lambda. An EC2 Instance Savings Plan is tied to one family in one Region but earns a deeper discount. A Capacity Reservation is different again: it guarantees capacity in one AZ but gives no discount by itself, so you pair it with a Savings Plan or Reserved Instance.\n\nPlacement groups are about where instances sit physically. A Cluster group packs instances into one AZ on the same network segment for low latency and high throughput, which suits tightly coupled HPC jobs. A Spread group puts each instance on distinct hardware, with a limit of seven running instances per AZ per group, so a single rack failure takes out at most one. A Partition group splits instances into up to seven partitions per AZ that do not share racks, which fits big distributed stores such as Cassandra, HDFS and Kafka that are partition-aware.",
    taglishExplanation:
      "Iisang instance lang, pero iba-iba ang presyo depende kung paano mo bilhin. On-Demand ang walang commitment, kaya okay para sa unpredictable na workload. Kapag steady ang gamit mo buong taon, mag-Reserved o Savings Plan ka para makatipid ng hanggang mga 70 percent. Ang Spot ang pinakamura, hanggang 90 percent off, pero puwedeng bawiin ng AWS ang instance na may two-minute warning lang, kaya para lang sa kayang ma-interrupt tulad ng batch jobs. Ang Dedicated Host naman ay buong physical server na sa iyo, kailangan kapag per-socket o per-core ang license mo. Sa placement groups: Cluster ang pinagdikit para sa bilis, Spread ang pinaghiwalay para ligtas, at Partition ang hinati sa mga grupo na hindi nagbabahagi ng rack, para sa malalaking distributed system.",
    analogy:
      "Think of a long-stay hotel. Walk-in rate is On-Demand. Paying for a year up front is a Reserved Instance. Taking whatever rooms are empty tonight at a steep discount is Spot, and you accept the front desk may ask you to leave. A Dedicated Host is renting the entire floor. Placement groups are seating: Cluster is everyone in adjoining rooms, Spread is one guest per wing, Partition is a few wings that each have their own fire exit.",
    whyItExists:
      "Compute demand is uneven. AWS has idle capacity at some moments and committed customers at others, so it sells the same hardware at different prices for different guarantees. Placement groups exist because the default placement is optimised for neither latency nor fault isolation, and some workloads need one or the other.",
    flow: "Workload shape (steady / bursty / interruptible / licensed) -> pick purchase option -> pick placement group if latency or fault isolation matters -> launch",
    withoutIt: [
      "You would pay On-Demand rates for steady workloads that could be 40 to 70 percent cheaper",
      "Batch and CI workloads would cost far more than they need to without Spot",
      "A tightly coupled HPC job could land on instances spread across the AZ and lose network performance",
      "A replicated database could end up with all its nodes on one rack and fail together",
    ],
    bestUseCases: [
      "Savings Plans or Reserved Instances for the always-on baseline (web tier, database host)",
      "Spot for stateless, restartable work: batch, rendering, CI, big-data workers",
      "Dedicated Hosts when a license is bound to physical sockets or cores, or compliance forbids sharing hardware",
      "Cluster placement groups for MPI and other low-latency HPC jobs",
      "Spread placement groups for a handful of critical instances that must not share hardware",
    ],
    poorUseCases: [
      "Spot for a single database or any job that cannot tolerate a two-minute interruption",
      "Reserved Instances for a workload you may shut down next month",
      "Cluster groups for a workload that must survive an AZ failure (a cluster group lives in one AZ)",
      "Spread groups for large fleets, because of the seven-instance-per-AZ limit",
    ],
    alternatives: [
      { need: "Discount that follows you across instance families, Fargate and Lambda", choose: "Compute Savings Plan" },
      { need: "Guaranteed capacity in a specific AZ for a known event", choose: "On-Demand Capacity Reservation" },
      { need: "Run interruptible jobs at the lowest cost", choose: "Spot Instances (often through an Auto Scaling group or AWS Batch)" },
      { need: "Server-level control for per-core licensing", choose: "Dedicated Host" },
    ],
    keyFeatures: [
      "On-Demand: per-second billing for Linux, no commitment",
      "Standard RI: biggest RI discount, fixed family. Convertible RI: smaller discount, can change family",
      "Compute Savings Plan: most flexible. EC2 Instance Savings Plan: deeper discount, tied to one family and Region",
      "Spot: up to 90 percent off, two-minute interruption notice, can use Spot Fleet or an Auto Scaling mixed instances policy",
      "Dedicated Instance: your own hardware but no host-level visibility. Dedicated Host: whole server, sockets and cores visible, supports BYOL",
      "Capacity Reservation: reserves capacity, no discount, can be combined with Savings Plans",
      "Cluster group: one AZ, lowest latency. Spread group: max 7 running instances per AZ. Partition group: up to 7 partitions per AZ",
    ],
    availability:
      "Cluster groups concentrate risk by design: one AZ, one network segment. Spread and Partition groups reduce correlated hardware failure and can span AZs. Spot capacity can vanish at any time, so pair it with a flexible Auto Scaling group using several instance types and AZs.",
    security:
      "Dedicated Hosts and Dedicated Instances isolate you at the hardware level, which some compliance regimes require. Purchase option has no effect on IAM, security groups or encryption.",
    pricingLogic:
      "Think in terms of commitment against flexibility. The more you commit and the less flexible the product, the bigger the discount. Capacity Reservations charge On-Demand rates whether or not you launch into them.",
    examKeywords: [
      "steady-state",
      "interruptible",
      "fault-tolerant batch",
      "per-socket license",
      "BYOL",
      "lowest latency between instances",
      "HPC",
      "hardware failure isolation",
      "Cassandra / Hadoop / Kafka",
    ],
    examTraps: [
      "A Capacity Reservation does not give a discount. If the question says 'cheapest and guaranteed', the answer is a reservation plus a Savings Plan.",
      "Spot is cheapest, but if the scenario says the job cannot be interrupted, it is the wrong answer.",
      "Cluster placement groups are single-AZ. They do not satisfy a high-availability requirement.",
      "Dedicated Host is the answer for BYOL licensing. Dedicated Instance does not expose sockets and cores.",
    ],
    architectureDiagram: `Baseline (24/7)       Burst (unpredictable)     Batch (can be interrupted)
+----------------+    +-------------------+     +------------------------+
| Savings Plan / |    | On-Demand         |     | Spot Instances         |
| Reserved       |    |                   |     | (mixed instance types) |
+-------+--------+    +---------+---------+     +-----------+------------+
        \\                      |                           /
         +---------- Auto Scaling group across 3 AZs ------+
                     (Spread or Partition placement group)`,
    architectureCaption: "One Auto Scaling group can mix purchase options: committed baseline, On-Demand burst, Spot for the rest.",
    mentorTip:
      "When you see 'most cost-effective', first ask: can this workload be interrupted? Then ask: is it steady? Those two questions eliminate most wrong answers.",
    questionIds: [
      "q-ec2-purchasing-options-placement-groups-1",
      "q-ec2-purchasing-options-placement-groups-2",
      "q-ec2-purchasing-options-placement-groups-3",
    ],
  },
  {
    id: "s3-storage-classes-lifecycle",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "S3 Storage Classes and Lifecycle Rules",
    shortName: "S3 classes & lifecycle",
    tier: 1,
    domains: [4],
    examImportance: "critical",
    oneLiner:
      "Every S3 storage class has the same durability. What changes is how fast you can read, what a read costs, and how long you are billed at minimum.",
    englishExplanation:
      "S3 Standard is the default: millisecond access, no retrieval fee, no minimum storage duration. Intelligent-Tiering watches access patterns per object and moves objects between frequent and infrequent tiers for you, with no retrieval fee, in exchange for a small monthly monitoring charge per object. It is the answer when access patterns are unknown or change. Standard-IA and One Zone-IA are cheaper per GB but charge a retrieval fee, bill a minimum of 30 days and a 128 KB minimum object size. One Zone-IA stores data in a single AZ, so it is only appropriate for data you can recreate.\n\nThe Glacier family is for archives. Glacier Instant Retrieval gives millisecond access with a 90-day minimum and suits archives you read about once a quarter. Glacier Flexible Retrieval takes minutes to hours (expedited 1 to 5 minutes, standard 3 to 5 hours, bulk 5 to 12 hours) with a 90-day minimum. Glacier Deep Archive is the cheapest, with a 180-day minimum and 12-hour standard retrieval (48 hours for bulk), and is aimed at compliance data kept for years.\n\nLifecycle rules automate the walk down this ladder. A rule can transition objects after N days, expire them, clean up noncurrent versions in a versioned bucket, and abort incomplete multipart uploads. Transitions only move downward through the classes, and objects must sit in Standard for at least 30 days before moving to Standard-IA or One Zone-IA. Small objects under 128 KB are usually not worth transitioning, because the per-object overhead and minimum billable size can cost more than they save.",
    taglishExplanation:
      "Pare-pareho ang durability ng lahat ng S3 class, kaya ang pinagkaiba lang ay bilis ng pagbasa, singil sa retrieval, at minimum na tagal ng bayad. Standard ang default. Kung hindi mo alam kung gaano kadalas gagamitin ang data, Intelligent-Tiering ang piliin, kasi siya na ang maglilipat ng object sa tamang tier. Ang Standard-IA at One Zone-IA ay mas mura sa storage pero may retrieval fee at 30-day minimum. Tandaan, ang One Zone-IA ay isang AZ lang, kaya para lang sa data na kaya mong gawing ulit. Ang Glacier naman ay para sa archive: Instant Retrieval para sa millisecond access, Flexible para sa minuto hanggang oras, at Deep Archive para sa pinakamurang pangmatagalang archive. Gamitin ang lifecycle rules para awtomatikong bumaba ang data sa mas murang class habang tumatanda.",
    analogy:
      "A house with a living room, a hallway closet, a garage, and a rented storage unit across town. Things you use daily stay in the living room. Things you might need this season go in the closet. Old tax records live in the storage unit: very cheap, but you drive there and it takes a while. A lifecycle rule is the habit of moving stuff outward as it ages.",
    whyItExists:
      "Most data is read heavily when it is new and rarely afterwards. Charging the same price for hot and cold bytes would force customers to either overpay or build their own archiving. Storage classes let AWS price by access pattern, and lifecycle rules let you automate the move.",
    flow: "Object uploaded to Standard -> lifecycle rule: day 30 to Standard-IA -> day 90 to Glacier Flexible Retrieval -> day 365 to Deep Archive -> day 2555 expire",
    withoutIt: [
      "Cold data would sit in Standard and cost several times more than it should",
      "Someone would have to write and run scripts to move or delete old objects",
      "Old noncurrent versions and failed multipart uploads would pile up as silent cost",
    ],
    bestUseCases: [
      "Intelligent-Tiering for data lakes and user content with unpredictable access",
      "Standard-IA for backups read rarely but needed immediately when something breaks",
      "One Zone-IA for secondary copies or thumbnails that can be regenerated",
      "Glacier Deep Archive for seven-year regulatory retention",
      "Lifecycle expiration for logs older than the retention policy",
    ],
    poorUseCases: [
      "One Zone-IA for the only copy of important data",
      "Glacier Flexible or Deep Archive for anything a user waits on in real time",
      "Standard-IA for tiny objects or data deleted within 30 days, because minimums erase the saving",
      "Intelligent-Tiering for huge numbers of tiny objects, since monitoring is charged per object",
    ],
    alternatives: [
      { need: "Instant access to rarely read archives", choose: "S3 Glacier Instant Retrieval" },
      { need: "Cheapest long-term archive where hours of delay is fine", choose: "S3 Glacier Deep Archive" },
      { need: "Unknown or changing access pattern", choose: "S3 Intelligent-Tiering" },
      { need: "Fast file storage that needs POSIX semantics", choose: "Amazon EFS (not S3)" },
    ],
    keyFeatures: [
      "Same 11 nines durability across classes. Availability differs: One Zone-IA is a single AZ",
      "Standard-IA and One Zone-IA: 30-day and 128 KB minimums, per-GB retrieval fee",
      "Intelligent-Tiering: automatic tiers, no retrieval fee, monitoring fee, optional archive tiers",
      "Glacier Instant: 90-day minimum. Flexible Retrieval: 90-day minimum. Deep Archive: 180-day minimum",
      "Lifecycle actions: Transition, Expiration, NoncurrentVersionTransition, NoncurrentVersionExpiration, AbortIncompleteMultipartUpload",
      "Rules can filter by prefix, tag or object size",
      "Early deletion before the minimum still bills you for the remaining days",
    ],
    availability:
      "Standard, Intelligent-Tiering, Standard-IA and the Glacier classes store data across at least three AZs. One Zone-IA keeps it in one AZ, and if that AZ is destroyed the data is lost.",
    security:
      "Encryption, bucket policies and Block Public Access apply identically across classes. Restoring from Glacier Flexible or Deep Archive creates a temporary readable copy, and the restore request needs the s3:RestoreObject permission.",
    pricingLogic:
      "Lower storage price is paid for with higher retrieval cost, longer minimum duration or lower availability. Lifecycle transitions themselves have a small per-request charge, which matters for billions of tiny objects.",
    examKeywords: [
      "unknown access pattern",
      "infrequently accessed but rapid access",
      "can be recreated",
      "long-term archive",
      "compliance retention",
      "lifecycle policy",
      "minimize storage cost",
    ],
    examTraps: [
      "'Unpredictable access patterns' means Intelligent-Tiering, not a lifecycle rule to Standard-IA.",
      "One Zone-IA is wrong whenever the data is irreplaceable or must survive an AZ outage.",
      "Retrieval from Glacier Flexible Retrieval is not instant. If the scenario needs milliseconds, it is Glacier Instant Retrieval or Standard-IA.",
      "Lifecycle rules move objects down only. You cannot use one to promote an object back to Standard.",
    ],
    architectureDiagram: `Upload
  |
  v
[S3 Standard] --30d--> [Standard-IA] --90d--> [Glacier Flexible] --365d--> [Deep Archive] --7y--> delete
   ms reads             ms reads, fee          mins-hours                    ~12h`,
    architectureCaption: "A typical retention ladder. The day counts come from how often the data is actually read.",
    mentorTip:
      "Build the ladder by asking two things for each rung: how quickly must I read it, and how long will I keep it? The minimum-duration numbers then tell you which rungs are not worth using.",
    questionIds: [
      "q-s3-storage-classes-lifecycle-1",
      "q-s3-storage-classes-lifecycle-2",
      "q-s3-storage-classes-lifecycle-3",
    ],
  },
  {
    id: "s3-security-encryption",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "S3 Security and Encryption",
    shortName: "S3 security",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "S3 access is decided by several layers working together, and encryption is a choice of who holds the key: S3, KMS, or you.",
    englishExplanation:
      "Access to an S3 object is the combined result of IAM policies on the caller, the bucket policy on the resource, Block Public Access settings at the bucket and account level, and optionally a VPC endpoint policy. An explicit deny anywhere wins. Block Public Access is the safety net: when on, it overrides any policy or ACL that would make data public. ACLs are now disabled by default through the Bucket owner enforced Object Ownership setting, so new designs should use bucket policies instead. S3 Access Points give each application its own named endpoint with its own policy, which scales better than one enormous bucket policy.\n\nEncryption at rest is automatic: every new object is encrypted with SSE-S3 unless you choose otherwise. SSE-KMS uses a KMS key you control, gives you key policies, rotation and a CloudTrail record of every use, but each request calls KMS and counts against its request quotas. SSE-C means you supply the key on every request over HTTPS and S3 does not store it. Client-side encryption means you encrypt before upload and S3 never sees plaintext. Encryption in transit is enforced with a bucket policy that denies requests where aws:SecureTransport is false.\n\nThree features answer 'how do I stop this being changed or leaked'. Versioning with MFA Delete protects against accidental or malicious deletes. S3 Object Lock gives write-once-read-many protection: Governance mode can be overridden by users with special permission, Compliance mode cannot be overridden by anyone, including root, until retention ends, and Legal Hold has no expiry. Object Lock requires versioning. Presigned URLs grant time-limited access to a single private object using the signer's permissions.",
    taglishExplanation:
      "Ang access sa S3 ay resulta ng ilang layer na sabay na tumitingin: IAM policy ng user, bucket policy, Block Public Access, at minsan VPC endpoint policy. Kapag may explicit deny kahit saan, talo na ang allow. Ang Block Public Access ang safety net na pumipigil na maging public ang data kahit magkamali ka sa policy. Sa encryption, lahat ng bagong object ay naka-SSE-S3 na by default. Kung gusto mo ng kontrol at audit, SSE-KMS ang gamitin, pero tandaan na may limit ang KMS requests. Kung ikaw mismo ang may hawak ng key at ipapadala mo sa bawat request, SSE-C iyon. Para naman sa proteksyon laban sa pagbura o pag-edit, may versioning, MFA Delete, at Object Lock na WORM. Ang presigned URL ay pansamantalang link para sa isang private object.",
    analogy:
      "A bank vault with several locks. The building guard (IAM) checks your badge, the vault door (bucket policy) has its own list of who may enter, and a master switch (Block Public Access) can shut the whole door to outsiders no matter what the lists say. Encryption is whether the bank, a locksmith firm that logs every use, or you personally keep the key to the safe deposit box.",
    whyItExists:
      "Public S3 buckets have been behind many well-known data leaks, almost always from a permissive policy someone forgot about. The layered model and Block Public Access exist so that one mistake is not enough, and the encryption options exist because different organisations need different answers to 'who controls the key'.",
    flow: "Request -> authenticated? -> IAM allow? -> bucket policy / ACL / access point allow? -> Block Public Access ok? -> any explicit deny? -> decrypt object (S3 or KMS) -> return data",
    withoutIt: [
      "A single bad bucket policy could expose an entire data set to the internet",
      "You could not prove who read or changed sensitive objects",
      "Ransomware or an insider could delete or overwrite backups with nothing to restore from",
    ],
    bestUseCases: [
      "Block Public Access on at the account level for every account that does not host a public website",
      "SSE-KMS where auditors want key usage logged and key policies controlled",
      "Object Lock in Compliance mode for regulatory WORM retention",
      "Presigned URLs to let a user download or upload one file without making the bucket public",
      "Bucket policy with aws:SecureTransport and aws:SourceVpce conditions to force HTTPS and private access",
    ],
    poorUseCases: [
      "SSE-KMS on a very high-request-rate bucket without planning for KMS throttling (consider S3 Bucket Keys)",
      "Compliance-mode Object Lock without being certain about the retention period, since nobody can shorten it",
      "Using ACLs for new designs",
      "Sharing a long-lived presigned URL as if it were permanent access",
    ],
    alternatives: [
      { need: "Per-application access to a shared data lake bucket", choose: "S3 Access Points" },
      { need: "Find sensitive data (PII) inside buckets", choose: "Amazon Macie" },
      { need: "Keys that never leave dedicated hardware you control", choose: "AWS CloudHSM with a custom key store" },
      { need: "Serve private content through a CDN", choose: "CloudFront with Origin Access Control" },
    ],
    keyFeatures: [
      "Block Public Access: four settings, applied per bucket or per account",
      "Bucket policy (resource-based) and IAM policy (identity-based). Explicit deny always wins",
      "Object Ownership 'bucket owner enforced' disables ACLs",
      "SSE-S3 (default), SSE-KMS, DSSE-KMS, SSE-C, client-side encryption",
      "S3 Bucket Keys reduce KMS request volume and cost",
      "Versioning, MFA Delete, Object Lock (Governance, Compliance, Legal Hold)",
      "Presigned URLs, VPC gateway endpoints, Access Points, Access Analyzer for S3",
    ],
    availability:
      "Security features do not change durability. Object Lock and versioning increase storage because older versions are kept. A KMS key that is deleted or whose policy is broken makes the objects it encrypted unreadable.",
    security:
      "Encrypt in transit by denying non-TLS requests. Log access with CloudTrail data events or server access logs. Use IAM Access Analyzer to find buckets shared outside your account.",
    pricingLogic:
      "SSE-S3 is free. SSE-KMS adds KMS request charges, reduced by Bucket Keys. Versioned buckets cost more storage. Macie charges by data scanned.",
    examKeywords: [
      "prevent accidental public access",
      "audit key usage",
      "WORM",
      "regulatory retention",
      "time-limited access",
      "encrypt in transit",
      "customer-provided key",
      "cross-account access",
    ],
    examTraps: [
      "Governance mode can be bypassed by users with the right permission. Only Compliance mode is truly immutable.",
      "'Audit every use of the encryption key' points to SSE-KMS, because SSE-S3 keys are managed invisibly by S3.",
      "Object Lock needs versioning. If a question has versioning disabled, enabling it comes first.",
      "A bucket policy cannot override Block Public Access. If public access is blocked, the policy change alone will not open it.",
    ],
    architectureDiagram: `            +----------------------+
 User ----> | IAM policy (caller)  |--+
            +----------------------+  |
            +----------------------+  |   +------------------+
 Request -> | Bucket policy        |--+-> | Block Public     |--> S3 object
            | (+ Access Point)     |      | Access           |      |
            +----------------------+      +------------------+      v
                                                              SSE-S3 / SSE-KMS`,
    architectureCaption: "Every layer must allow the request, and an explicit deny at any layer ends it.",
    mentorTip:
      "For any S3 security question, ask who holds the key, who is allowed to call, and whether anyone could change or delete it. Those are three different controls and the distractors usually mix them up.",
    questionIds: [
      "q-s3-security-encryption-1",
      "q-s3-security-encryption-2",
      "q-s3-security-encryption-3",
    ],
  },
  {
    id: "ebs-volume-types-snapshots",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "EBS Volume Types and Snapshots",
    shortName: "EBS types & snapshots",
    tier: 2,
    domains: [3, 2, 4],
    examImportance: "high",
    oneLiner:
      "EBS has SSD and HDD volume types for different jobs, and snapshots are how you back up, copy, encrypt and move volumes across AZs and Regions.",
    englishExplanation:
      "The SSD types serve random I/O. gp3 is the general default: 3,000 IOPS and 125 MiB/s included, scalable independently up to 16,000 IOPS and 1,000 MiB/s. gp2 is the older type where IOPS scale with size and burst. io2 and io2 Block Express are Provisioned IOPS volumes for latency-sensitive databases that need sustained high IOPS, and they support Multi-Attach to up to 16 Nitro instances in the same AZ. The HDD types serve sequential throughput: st1 for big streaming reads such as log processing and data warehouses, sc1 for the coldest, cheapest case. HDD volumes cannot be boot volumes.\n\nAn EBS volume lives in one AZ and attaches to instances in that AZ. A snapshot is a point-in-time backup stored in S3 (managed by AWS, not visible in your buckets). The first snapshot copies everything and later ones are incremental, yet deleting an older snapshot never breaks a newer one, because AWS keeps the blocks still needed. Snapshots can be copied across Regions, shared with other accounts, and used to create a volume in any AZ, which is how you move data between AZs.\n\nEncryption interacts with snapshots in a way the exam loves. A snapshot of an encrypted volume is encrypted, and volumes created from it are encrypted. To encrypt an existing unencrypted volume, snapshot it, copy the snapshot with encryption enabled, and create a volume from the encrypted copy. Fast Snapshot Restore removes first-read latency on restored volumes, the Recycle Bin protects against accidental snapshot deletion, and Data Lifecycle Manager automates scheduled snapshots and retention.",
    taglishExplanation:
      "Sa EBS, SSD ang para sa random na read at write, HDD ang para sa malalaking sunod-sunod na basa. Ang gp3 ang karaniwang default: 3,000 IOPS na kasama na at puwede mong itaas nang hiwalay sa laki ng volume. Kapag database na kailangan ng sobrang taas at consistent na IOPS, io2 ang piliin. Ang st1 at sc1 ay HDD kaya mura pero hindi puwedeng boot volume. Ang volume ay nakatali sa isang AZ lang. Para ilipat ito sa ibang AZ o Region, gumawa ka ng snapshot, tapos gawan ng volume sa gusto mong lugar. Ang snapshot ay incremental, kaya ang una lang ang buo. Para i-encrypt ang volume na hindi pa encrypted: snapshot, copy na may encryption, tapos gumawa ng bagong volume mula doon.",
    analogy:
      "An EBS volume is a hard drive bolted into one specific building (the AZ). A snapshot is a photocopy of its contents filed in a central archive. You can send the photocopy to a new building, or another city, and make a fresh drive from it. Later photocopies only record the pages that changed.",
    whyItExists:
      "Instance storage disappears when an instance stops, and workloads differ enormously in how they read and write. Separate volume types let you pay for IOPS where a database needs it and for plain throughput where a log pipeline needs it, while snapshots decouple the data from any one drive or AZ.",
    flow: "Create volume in AZ -> attach to EC2 -> take snapshot (stored in S3) -> copy to another Region or restore into another AZ -> attach to a new instance",
    withoutIt: [
      "Databases would be stuck on one performance profile that is either too slow or needlessly expensive",
      "Moving data to another AZ or Region would require manual copy jobs",
      "Backups would be full copies every time, with higher storage cost",
    ],
    bestUseCases: [
      "gp3 for boot volumes, dev databases and most general workloads",
      "io2 or io2 Block Express for production databases needing high, steady IOPS",
      "st1 for Hadoop, Kafka logs and data warehouse scans",
      "Scheduled snapshots through Data Lifecycle Manager or AWS Backup",
      "Cross-Region snapshot copy for disaster recovery",
    ],
    poorUseCases: [
      "st1 or sc1 for a boot volume or random I/O",
      "EBS for shared storage across many instances in different AZs (use EFS)",
      "Relying on a single snapshot taken once as your whole backup strategy",
      "Multi-Attach for a standard filesystem that is not cluster-aware, since it can corrupt data",
    ],
    alternatives: [
      { need: "Shared filesystem across many instances and AZs", choose: "Amazon EFS" },
      { need: "Extremely fast temporary scratch space", choose: "EC2 instance store (data lost on stop)" },
      { need: "Policy-driven backups across many services", choose: "AWS Backup" },
      { need: "Windows file shares", choose: "Amazon FSx for Windows File Server" },
    ],
    keyFeatures: [
      "gp3: 3,000 IOPS and 125 MiB/s baseline, up to 16,000 IOPS and 1,000 MiB/s",
      "io2: provisioned IOPS, Multi-Attach in one AZ, higher durability than gp3",
      "st1 (throughput optimised HDD) and sc1 (cold HDD), neither can be a boot volume",
      "Volumes are AZ-scoped. Snapshots are Regional and can be copied across Regions",
      "Incremental snapshots, with Fast Snapshot Restore and Recycle Bin",
      "Encryption by default option per Region, uses KMS",
      "Elastic Volumes lets you change type, size and IOPS without detaching",
    ],
    availability:
      "Each volume is replicated within its AZ, so it survives a hardware failure but not an AZ outage. Snapshots are the cross-AZ and cross-Region durability mechanism.",
    security:
      "Encrypted volumes encrypt data at rest, in transit between instance and volume, and all snapshots and volumes derived from them. Snapshots can be shared only with specified accounts, and encrypted snapshots require sharing the KMS key as well.",
    pricingLogic:
      "You pay for provisioned GB and, for gp3 and io2, provisioned IOPS and throughput whether or not you use them. Snapshots are billed on stored changed data, so frequent snapshots of a slowly changing volume are cheap.",
    examKeywords: [
      "sustained IOPS",
      "latency-sensitive database",
      "throughput-intensive sequential",
      "move volume to another AZ",
      "encrypt an existing volume",
      "Multi-Attach",
      "boot volume",
    ],
    examTraps: [
      "You cannot encrypt an existing volume in place. The answer is snapshot, encrypted copy, new volume.",
      "A volume cannot be attached across AZs. Moving AZ means snapshot and restore.",
      "gp2 and gp3 are not the same. gp3 lets you buy IOPS without buying more storage, so it is usually the cheaper correct answer.",
      "Deleting the oldest snapshot does not make later incremental snapshots invalid.",
    ],
    architectureDiagram: `AZ-a                          Region                      AZ-b
[EC2]--[EBS gp3]  --snapshot-->  [Snapshot in S3]  --restore-->  [EBS gp3]--[EC2]
                                       |
                                  copy to other Region (DR)`,
    architectureCaption: "Snapshots are the only way an EBS volume's data crosses an AZ or Region boundary.",
    mentorTip:
      "Memorise one sentence per type: gp3 general, io2 for databases that need guaranteed IOPS, st1 for big sequential reads, sc1 for cold. Everything else on the exam is a variation.",
    questionIds: [
      "q-ebs-volume-types-snapshots-1",
      "q-ebs-volume-types-snapshots-2",
      "q-ebs-volume-types-snapshots-3",
    ],
  },
  {
    id: "vpc-peering",
    moduleId: "phase-4-networking",
    category: "Networking",
    title: "VPC Peering",
    shortName: "VPC peering",
    tier: 2,
    domains: [1, 3],
    examImportance: "high",
    oneLiner:
      "A VPC peering connection links two VPCs privately so they talk over AWS's network, but it is one-to-one and never transitive.",
    englishExplanation:
      "Peering gives two VPCs private connectivity, using private IPs, without a gateway, VPN or the public internet. The VPCs can be in the same account or different accounts, and in the same Region or different Regions. Traffic stays on the AWS backbone and, for inter-Region peering, is encrypted. There is no single point of failure or bandwidth bottleneck, because peering is not a device.\n\nThree rules produce most exam questions. The CIDR blocks of the two VPCs must not overlap. Peering is not transitive: if A is peered with B and B with C, A cannot reach C through B, so you need a direct A to C connection. And there is no edge-to-edge routing: a peered VPC cannot use your VPN, Direct Connect or internet gateway to reach outside. Creating the connection is not enough. One VPC sends a request, the other accepts, and then both sides must add routes in their route tables pointing the other CIDR at the peering connection, and security groups must allow the traffic.\n\nPeering is simple and cheap for a few VPCs. With dozens of VPCs the number of connections grows as n times n minus one over two, and the lack of transitivity gets painful. That is where AWS Transit Gateway takes over as a hub. If you only need to expose one service, not the whole network, PrivateLink is the cleaner tool, and it works even when CIDRs overlap.",
    taglishExplanation:
      "Ang VPC peering ay private na koneksyon ng dalawang VPC gamit ang private IP, hindi dumadaan sa internet. Puwedeng magkaibang account o Region. Tatlong rule ang lagi mong tatandaan. Una, hindi puwedeng mag-overlap ang CIDR. Pangalawa, hindi transitive: kung A ay naka-peer sa B at B sa C, hindi pa rin makakarating ang A sa C, kailangan ng direktang A-C. Pangatlo, walang edge-to-edge routing, ibig sabihin hindi magagamit ng peer ang VPN, Direct Connect o internet gateway mo. Pagkatapos ng accept, dapat mag-update ng route table ang magkabilang panig at payagan ng security group ang traffic. Kapag marami nang VPC, Transit Gateway na ang mas maayos. Kung isang service lang ang ibabahagi, PrivateLink.",
    analogy:
      "A private walkway between two office buildings. People in building A can walk to building B, but if B also has a walkway to C, A's people still cannot walk through B to C. Each pair of buildings needs its own walkway, and each building has to put up a sign pointing to it.",
    whyItExists:
      "Teams and accounts end up with separate VPCs, such as shared services, production and analytics, and those VPCs often need to talk privately. Routing through the internet or a VPN appliance adds cost, latency and risk.",
    flow: "Requester VPC sends peering request -> accepter VPC accepts -> both add routes to the peer CIDR -> security groups and NACLs allow traffic -> private IP to private IP",
    withoutIt: [
      "VPC to VPC traffic would go over the public internet or through VPN tunnels you manage",
      "You would pay for and operate gateway devices for what is a simple private link",
      "Cross-account sharing of internal services would be much harder to secure",
    ],
    bestUseCases: [
      "Connecting an application VPC to a shared-services VPC (logging, directory, tooling)",
      "Cross-account access between production and a partner or analytics account",
      "A small number of VPCs that need full mutual connectivity",
      "Inter-Region replication or access over the AWS backbone",
    ],
    poorUseCases: [
      "Dozens of VPCs that all need to reach each other (use Transit Gateway)",
      "VPCs with overlapping CIDRs (use PrivateLink)",
      "Giving a peer access to your on-premises network through your VPN",
      "Exposing a single service to many consumers without sharing the whole network (use PrivateLink)",
    ],
    alternatives: [
      { need: "Hub-and-spoke across many VPCs and on-premises", choose: "AWS Transit Gateway" },
      { need: "Expose one service privately, even with overlapping CIDRs", choose: "AWS PrivateLink" },
      { need: "Encrypted link between VPC and on-premises", choose: "Site-to-Site VPN" },
      { need: "Share subnets across accounts instead of connecting VPCs", choose: "VPC sharing with AWS RAM" },
    ],
    keyFeatures: [
      "One-to-one connection between exactly two VPCs",
      "Same or different account, same or different Region",
      "No overlapping IPv4 or IPv6 CIDRs between the two VPCs",
      "Not transitive and no edge-to-edge routing",
      "Requires route table entries on both sides plus security group rules",
      "Same-Region peering lets you reference the peer's security group in rules",
      "No bandwidth limit imposed by a gateway and no hourly charge, though cross-AZ and cross-Region data transfer is billed",
    ],
    availability:
      "Peering is built on AWS's redundant network and has no single point of failure. Availability of the connection is not something you size or manage.",
    security:
      "Traffic never crosses the public internet. Use security groups and NACLs to limit which subnets and ports the peer can reach, and route only the CIDRs you need. Inter-Region traffic is encrypted automatically.",
    pricingLogic:
      "There is no charge for the peering connection itself. You pay standard data transfer rates for traffic that crosses AZs or Regions. Transit Gateway, by contrast, charges per attachment and per GB processed.",
    examKeywords: [
      "private connectivity between VPCs",
      "different accounts",
      "overlapping CIDR",
      "transitive routing",
      "hub and spoke",
      "no single point of failure",
    ],
    examTraps: [
      "If A-B and B-C are peered, A cannot reach C. Do not choose an answer that assumes it can.",
      "Overlapping CIDRs rule out peering and Transit Gateway. PrivateLink is the workaround.",
      "Accepting the request does not make traffic flow. Route tables must be updated on both sides.",
      "A peer cannot go out through your NAT gateway, internet gateway or VPN. There is no edge-to-edge routing.",
    ],
    architectureDiagram: `VPC A 10.0.0.0/16 <== peering ==> VPC B 10.1.0.0/16 <== peering ==> VPC C 10.2.0.0/16
        \\                                                              /
         x------------ A cannot reach C through B ---------------------x
Route table A: 10.1.0.0/16 -> pcx-AB         Route table B: 10.0.0.0/16 -> pcx-AB`,
    architectureCaption: "Each pair needs its own connection and its own routes. Nothing is inherited through a middle VPC.",
    mentorTip:
      "On the exam, count the VPCs. Two or three means peering. A growing number, or on-premises in the mix, means Transit Gateway. One service for many consumers means PrivateLink.",
    questionIds: [
      "q-vpc-peering-1",
      "q-vpc-peering-2",
      "q-vpc-peering-3",
    ],
  },
  {
    id: "route-53-routing-policies",
    moduleId: "phase-4-networking",
    category: "Networking",
    title: "Route 53 Routing Policies and Health Checks",
    shortName: "Route 53 policies",
    tier: 1,
    domains: [2, 3],
    examImportance: "critical",
    oneLiner:
      "A Route 53 routing policy decides which answer a DNS query gets: any, a weighted share, the fastest, the nearest, the healthy one, or the one for the caller's location.",
    englishExplanation:
      "Route 53 answers DNS queries, and the routing policy on a record decides how. Simple returns one or several values with no logic. Weighted splits traffic by ratio you set, useful for gradual rollouts and A/B tests. Latency returns the Region with the lowest measured latency to the user. Failover returns a primary record while it is healthy and a secondary when it is not, which is how you build active-passive DR. Geolocation answers by the user's country or continent, for compliance or localisation. Geoproximity routes by distance to resources and lets you shift traffic with a bias value, and needs Traffic Flow. IP-based routing maps client CIDRs to endpoints. Multivalue answer returns up to eight healthy records, a light form of client-side load balancing.\n\nHealth checks make the policies useful. A health check can probe an endpoint over HTTP, HTTPS or TCP, combine other checks into a calculated check, or follow a CloudWatch alarm. Failover, weighted, latency and multivalue records use health checks to stop returning an unhealthy target. Endpoints inside a private hosted zone cannot be probed from the internet, so for those you create a CloudWatch alarm on a metric and attach a health check to the alarm.\n\nTwo more details appear often. An Alias record is a Route 53 extension that points a name at an AWS resource such as CloudFront, an ELB, an S3 website or another Route 53 record. It works at the zone apex (example.com), where a CNAME is not allowed, it is free of query charges when it points to AWS resources, and it can follow target health. TTL controls how long resolvers cache an answer, so lower it before a planned change.",
    taglishExplanation:
      "Ang routing policy ang nagdedesisyon kung anong sagot ang ibibigay ng Route 53 sa DNS query. Simple ay walang logic. Weighted ay hinahati ang traffic ayon sa ratio, maganda para sa gradual rollout. Latency ay ibinibigay ang Region na pinakamabilis sa user. Failover ay primary hangga't healthy, at secondary kapag hindi, ito ang gamit sa active-passive DR. Geolocation ay base sa bansa o continent ng user. Geoproximity ay base sa layo, may bias na puwedeng i-adjust. Multivalue ay hanggang walong healthy na record. Kailangan ng health check para malaman kung buhay ang target. Para sa private hosted zone, CloudWatch alarm ang gamitin. At tandaan: Alias record ang puwede sa zone apex at libre ang query kapag AWS resource ang tinuturo, hindi puwede ang CNAME doon.",
    analogy:
      "Route 53 is a receptionist who answers 'where can I find the shop?'. Simple always gives one address. Weighted says 'send nine out of ten to the old branch and one to the new'. Latency says 'whichever branch is quickest for you'. Failover says 'main branch, unless it is closed, then the backup'. Geolocation says 'you are from Germany, so the Frankfurt branch'.",
    whyItExists:
      "A single DNS name often fronts many endpoints in many Regions. DNS is the earliest and cheapest place to steer traffic, so putting the decision logic there lets you do global load distribution, DR failover and staged rollouts without extra infrastructure.",
    flow: "Client resolves app.example.com -> Route 53 evaluates routing policy and health checks -> returns chosen record -> client connects directly to that endpoint",
    withoutIt: [
      "Each Region would need its own hostname and clients would have to pick one",
      "A failed endpoint would keep receiving traffic until someone edited DNS by hand",
      "Gradual migrations and canary releases would need a separate traffic-splitting layer",
    ],
    bestUseCases: [
      "Failover for an active-passive disaster recovery setup",
      "Latency routing across Regions for a global application",
      "Weighted routing for blue/green or canary rollouts",
      "Geolocation to serve region-specific content or meet data residency rules",
      "Alias record from the zone apex to a CloudFront distribution or ALB",
    ],
    poorUseCases: [
      "Relying on DNS failover for instant cutover, because resolvers cache answers for the TTL",
      "Geolocation when you want the fastest endpoint (that is latency routing)",
      "Per-request load balancing (use a load balancer, DNS returns an answer per lookup)",
      "A CNAME at the zone apex, which DNS does not allow",
    ],
    alternatives: [
      { need: "Per-request load balancing inside a Region", choose: "Application Load Balancer" },
      { need: "Fast failover without DNS caching delay and static anycast IPs", choose: "AWS Global Accelerator" },
      { need: "Cache content close to users", choose: "Amazon CloudFront" },
      { need: "Private DNS for names inside a VPC", choose: "Route 53 private hosted zone" },
    ],
    keyFeatures: [
      "Policies: Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, IP-based, Multivalue answer",
      "Health checks: endpoint, calculated, and CloudWatch alarm based",
      "Alias records: free for AWS targets, work at the zone apex, can evaluate target health",
      "Failover needs a health check on the primary record",
      "Weight of 0 stops traffic to a record without deleting it",
      "Public and private hosted zones, plus Resolver for hybrid DNS",
      "Domain registration and DNSSEC signing",
    ],
    availability:
      "Route 53 is a global service designed for a 100 percent availability SLA. The data plane is highly redundant. Your application's failover speed is limited by the record TTL and by how often health checks run.",
    security:
      "IAM controls who can change records. DNSSEC signing protects against spoofed responses for public zones. Private hosted zones keep internal names invisible to the internet.",
    pricingLogic:
      "You pay per hosted zone per month, per million queries (alias queries to AWS resources are free), and per health check. Traffic Flow and Geoproximity policies add a charge per policy record.",
    examKeywords: [
      "active-passive failover",
      "lowest latency",
      "gradual shift of traffic",
      "users in a specific country",
      "zone apex",
      "health check",
      "private hosted zone",
    ],
    examTraps: [
      "Latency routing is not the same as geolocation. Latency picks the fastest Region, geolocation picks by where the user is.",
      "A CNAME cannot be created at the zone apex. Use an Alias record.",
      "Health checks cannot reach private IPs directly. Use a CloudWatch alarm health check for private targets.",
      "DNS failover is bounded by TTL. If the scenario demands near-instant failover, Global Accelerator is the better answer.",
    ],
    architectureDiagram: `              app.example.com  (Route 53)
                    |
     +--------------+---------------+
     | Failover policy + health check|
     +--------------+---------------+
          primary   |        secondary
        (healthy)   |        (if primary fails)
                    v
   ALB us-east-1 ........ ALB eu-west-1`,
    architectureCaption: "Failover routing returns the secondary endpoint only after the primary's health check fails.",
    mentorTip:
      "Read the verb in the question: 'fastest' is latency, 'nearest to the user' is geoproximity, 'users in France' is geolocation, 'only if healthy' is failover, 'ten percent to the new version' is weighted.",
    questionIds: [
      "q-route-53-routing-policies-1",
      "q-route-53-routing-policies-2",
      "q-route-53-routing-policies-3",
    ],
  },
];
