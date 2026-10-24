import type { Difficulty, ExamDomainId, Flashcard, Question } from "@/lib/types";

const IDS = ["a", "b", "c", "d", "e"];

export function mk(
  lessonId: string,
  n: number,
  domain: ExamDomainId,
  difficulty: Difficulty,
  scenario: string,
  options: string[],
  correct: string,
  explanation: string,
  why: string[],
  hint: string,
  keywords: string[]
): Question {
  const correctAnswers = correct.split("");
  const optionExplanations: Record<string, string> = {};
  options.forEach((_, i) => {
    const id = IDS[i];
    optionExplanations[id] = `${correctAnswers.includes(id) ? "Correct. " : "Incorrect. "}${why[i]}`;
  });
  return {
    id: `q-${lessonId}-${n}`,
    lessonId,
    domain,
    difficulty,
    type: correctAnswers.length > 1 ? "multiple" : "single",
    kind: n === 3 ? "scenario" : "checkpoint",
    scenario,
    options: options.map((text, i) => ({ id: IDS[i], text })),
    correctAnswers,
    explanation,
    optionExplanations,
    examKeywordHint: hint,
    keywords,
    services: [lessonId],
  };
}

export const deepDiveQuestions: Question[] = [
  // ---- EC2 purchasing and placement ----
  mk(
    "ec2-purchasing-options-placement-groups", 1, 4, "easy",
    "A company runs a nightly image-rendering job on a fleet of EC2 instances. The job is split into small tasks, any task can be retried, and the finish time is flexible. Which purchasing option gives the lowest cost?",
    ["On-Demand Instances", "Spot Instances", "Dedicated Hosts", "A three-year Standard Reserved Instance"],
    "b",
    "Spot Instances use spare capacity at up to 90 percent off. Because the tasks are retryable, an interruption only costs a retry.",
    [
      "No commitment, but full price. The workload tolerates interruption, so a cheaper option exists.",
      "Spot is cheapest and suits fault-tolerant, flexible batch work.",
      "Dedicated Hosts are the most expensive option and solve licensing or compliance, not cost.",
      "A reservation suits steady 24/7 usage, not a job that runs for a few hours a night.",
    ],
    "\"can be retried / flexible start\" -> Spot", ["Spot", "batch", "cost"]
  ),
  mk(
    "ec2-purchasing-options-placement-groups", 2, 3, "medium",
    "A research team runs a tightly coupled HPC simulation where nodes exchange data constantly and network latency between instances is the main performance factor. Which configuration is best?",
    ["A Spread placement group across three AZs", "A Cluster placement group in a single AZ", "A Partition placement group with seven partitions", "Instances in separate Regions connected by VPC peering"],
    "b",
    "A Cluster placement group packs instances close together in one AZ, giving the lowest latency and highest throughput between them.",
    [
      "Spread groups put instances on separate hardware to reduce correlated failure. That increases isolation, not speed.",
      "Cluster groups are designed for low-latency, high-throughput node-to-node traffic.",
      "Partition groups isolate failure domains for big distributed stores, not tightly coupled compute.",
      "Cross-Region links add latency, the opposite of what the workload needs.",
    ],
    "\"lowest latency between instances / HPC\" -> Cluster placement group", ["placement group", "HPC", "latency"]
  ),
  mk(
    "ec2-purchasing-options-placement-groups", 3, 4, "hard",
    "A company has a steady web tier running 24/7 on m5 instances and expects to move to other instance families and to Fargate over the next two years. They want the largest discount that does not lock them to an instance family. Which should they buy?",
    ["Standard Reserved Instances for m5", "EC2 Instance Savings Plan for the m5 family", "Compute Savings Plan", "On-Demand Capacity Reservations"],
    "c",
    "A Compute Savings Plan applies across instance families, sizes, Regions and also to Fargate and Lambda, so it survives the planned changes.",
    [
      "Standard RIs are tied to the instance family and cannot follow the move to Fargate.",
      "EC2 Instance Savings Plans are tied to one family in one Region, so a family change loses the discount.",
      "Compute Savings Plan is the flexible commitment that covers EC2, Fargate and Lambda.",
      "Capacity Reservations guarantee capacity but give no discount on their own.",
    ],
    "\"change instance family / Fargate\" -> Compute Savings Plan", ["Savings Plan", "flexibility", "Fargate"]
  ),

  // ---- S3 storage classes ----
  mk(
    "s3-storage-classes-lifecycle", 1, 4, "easy",
    "A media company stores user uploads in S3. Some become popular and are read constantly, others are never read again, and nobody can predict which. They want to minimise cost without writing automation. Which storage class should they use?",
    ["S3 Standard-IA", "S3 One Zone-IA", "S3 Intelligent-Tiering", "S3 Glacier Deep Archive"],
    "c",
    "Intelligent-Tiering moves each object between access tiers automatically based on usage and charges no retrieval fee.",
    [
      "Standard-IA charges a retrieval fee, which hurts when some objects turn out to be popular.",
      "One Zone-IA stores in a single AZ and also charges for retrieval. It is not suitable for the only copy of user data.",
      "Intelligent-Tiering is designed for unknown or changing access patterns.",
      "Deep Archive takes hours to retrieve, which breaks popular content.",
    ],
    "\"unpredictable access pattern\" -> Intelligent-Tiering", ["Intelligent-Tiering", "unknown access"]
  ),
  mk(
    "s3-storage-classes-lifecycle", 2, 4, "medium",
    "A company must keep financial records for seven years for compliance. The records are almost never read, and when they are, a retrieval time of up to 12 hours is acceptable. Which is the most cost-effective storage class?",
    ["S3 Standard-IA", "S3 Glacier Instant Retrieval", "S3 Glacier Flexible Retrieval", "S3 Glacier Deep Archive"],
    "d",
    "Glacier Deep Archive has the lowest storage price and a standard retrieval time of about 12 hours, which fits long-term, rarely accessed compliance data.",
    [
      "Standard-IA is far more expensive per GB and optimised for millisecond access.",
      "Glacier Instant Retrieval offers millisecond reads that the company does not need, at a higher price.",
      "Flexible Retrieval is cheaper than Instant but still more expensive than Deep Archive for data kept for years.",
      "Deep Archive is the cheapest option and the 12-hour retrieval window is acceptable.",
    ],
    "\"7 years / rarely read / hours is fine\" -> Deep Archive", ["Glacier Deep Archive", "compliance", "archive"]
  ),
  mk(
    "s3-storage-classes-lifecycle", 3, 4, "hard",
    "A company stores application logs in S3 Standard. Logs are read often for the first 30 days, rarely for the next 60 days, and must be deleted after 365 days. Which lifecycle configuration meets the need at the lowest cost?",
    ["Transition to Standard-IA at 30 days, to Glacier Flexible Retrieval at 90 days, and expire at 365 days", "Transition to One Zone-IA at day 1 and expire at 365 days", "Transition to Glacier Deep Archive at day 1 and expire at 365 days", "Enable Intelligent-Tiering and never expire the objects"],
    "a",
    "A staged lifecycle follows the access pattern: hot for 30 days, infrequent for the next 60, archive afterwards, and then expire. Transitions to Standard-IA require objects to be at least 30 days old.",
    [
      "This matches access frequency at each stage and removes the data at the retention limit.",
      "Objects cannot move to One Zone-IA before 30 days, and the logs are still read often early on.",
      "Moving to Deep Archive on day 1 makes the frequently read early logs take hours to retrieve and incurs the 180-day minimum charge.",
      "Intelligent-Tiering adds monitoring cost and never expiring objects violates the 365-day deletion requirement.",
    ],
    "\"hot, then rarely, then delete\" -> lifecycle transitions + expiration", ["lifecycle", "transition", "expiration"]
  ),

  // ---- S3 security ----
  mk(
    "s3-security-encryption", 1, 1, "easy",
    "A security team wants a record in CloudTrail of every time the key protecting S3 objects is used, and wants to control that key's policy. Which encryption option meets this?",
    ["SSE-S3", "SSE-KMS with a customer managed key", "SSE-C", "No encryption, relying on bucket policies"],
    "b",
    "SSE-KMS uses a KMS key you control and every use is logged in CloudTrail.",
    [
      "SSE-S3 keys are managed by S3 and their use is not exposed to you.",
      "KMS gives key policies and CloudTrail visibility of key usage.",
      "With SSE-C you manage keys yourself outside AWS and there is no KMS audit trail.",
      "Policies control access but do not encrypt data or log key use.",
    ],
    "\"audit key usage / control key policy\" -> SSE-KMS", ["SSE-KMS", "audit", "CloudTrail"]
  ),
  mk(
    "s3-security-encryption", 2, 1, "medium",
    "A regulated company must ensure that backup objects in S3 cannot be deleted or overwritten by anyone, including administrators and the root user, for seven years. What should they configure?",
    ["Versioning with MFA Delete", "S3 Object Lock in Governance mode", "S3 Object Lock in Compliance mode with a seven-year retention period", "A bucket policy denying s3:DeleteObject"],
    "c",
    "Object Lock in Compliance mode makes object versions immutable for the retention period and nobody, including the root user, can shorten or remove the lock.",
    [
      "MFA Delete protects against accidental deletion but can be turned off by an authorised user.",
      "Governance mode can be bypassed by users with special permissions.",
      "Compliance mode gives true WORM protection, which regulators typically require.",
      "A policy can be edited by an administrator, so it does not guarantee immutability.",
    ],
    "\"nobody including root can delete\" -> Object Lock Compliance mode", ["Object Lock", "WORM", "Compliance mode"]
  ),
  mk(
    "s3-security-encryption", 3, 1, "hard",
    "A company wants a private S3 bucket to be reachable only over HTTPS and only from workloads inside a specific VPC. Which combination should be used? (Select TWO.)",
    ["A bucket policy that denies requests where aws:SecureTransport is false", "A bucket policy that denies requests not coming through a specific VPC endpoint (aws:SourceVpce)", "Make the bucket public and use security groups on the objects", "Enable S3 Transfer Acceleration"],
    "ab",
    "Denying non-TLS requests enforces HTTPS, and a condition on the VPC endpoint restricts access to traffic from that VPC.",
    [
      "The aws:SecureTransport condition enforces encryption in transit.",
      "aws:SourceVpce restricts access to the VPC endpoint, keeping traffic private.",
      "Security groups do not apply to S3 objects and making the bucket public does the opposite of the requirement.",
      "Transfer Acceleration speeds up transfers over the internet. It has nothing to do with restricting access.",
    ],
    "\"HTTPS only + only from our VPC\" -> SecureTransport + SourceVpce", ["bucket policy", "VPC endpoint", "TLS"]
  ),

  // ---- EBS ----
  mk(
    "ebs-volume-types-snapshots", 1, 3, "easy",
    "A production relational database needs sustained 40,000 IOPS with consistent low latency. Which EBS volume type should be used?",
    ["gp3", "st1", "io2", "sc1"],
    "c",
    "Provisioned IOPS io2 volumes are built for latency-sensitive databases needing high, consistent IOPS beyond what gp3 offers.",
    [
      "gp3 tops out at 16,000 IOPS, below the requirement.",
      "st1 is throughput-optimised HDD for sequential workloads and cannot deliver high random IOPS.",
      "io2 supports high provisioned IOPS with consistent performance.",
      "sc1 is cold HDD for infrequently accessed data.",
    ],
    "\"sustained high IOPS database\" -> io2", ["io2", "IOPS", "database"]
  ),
  mk(
    "ebs-volume-types-snapshots", 2, 1, "medium",
    "A company has an existing unencrypted EBS volume attached to a running instance and now must encrypt its data at rest. What is the correct approach?",
    ["Enable encryption on the volume in the console", "Create a snapshot, copy it with encryption enabled, and create a new volume from the encrypted copy", "Attach an encrypted volume and delete the old one without copying data", "Enable S3 default encryption"],
    "b",
    "An existing volume cannot be encrypted in place. Snapshot it, copy the snapshot with encryption, and restore a new encrypted volume.",
    [
      "Encryption cannot be toggled on an existing volume.",
      "This is the documented path to an encrypted volume that preserves the data.",
      "That discards the data, which the company still needs.",
      "S3 settings do not apply to EBS.",
    ],
    "\"encrypt an existing volume\" -> snapshot, encrypted copy, new volume", ["EBS", "encryption", "snapshot"]
  ),
  mk(
    "ebs-volume-types-snapshots", 3, 2, "hard",
    "A team needs to move an EBS volume's data from us-east-1a to us-east-1b and also keep a copy in another Region for disaster recovery. Which steps accomplish both?",
    ["Detach the volume and attach it to an instance in us-east-1b", "Take a snapshot, create a volume from it in us-east-1b, and copy the snapshot to the other Region", "Enable Multi-Attach across the two AZs", "Use an instance store volume and replicate it"],
    "b",
    "EBS volumes are bound to an AZ. Snapshots are Regional, can be restored into any AZ in the Region, and can be copied to other Regions.",
    [
      "A volume can only attach to instances in its own AZ.",
      "Snapshots decouple data from the AZ and support cross-Region copy.",
      "Multi-Attach works only within a single AZ.",
      "Instance store is ephemeral and offers no replication feature.",
    ],
    "\"move volume to another AZ / Region\" -> snapshot", ["EBS", "snapshot", "cross-Region"]
  ),

  // ---- VPC peering ----
  mk(
    "vpc-peering", 1, 1, "easy",
    "VPC A is peered with VPC B, and VPC B is peered with VPC C. An instance in VPC A tries to reach an instance in VPC C by private IP and fails. What is the reason?",
    ["Security groups do not allow peering traffic", "VPC peering is not transitive", "Peering only works inside a single Region", "The route tables are automatically updated incorrectly"],
    "b",
    "Peering connections are one-to-one and non-transitive, so A cannot reach C through B without its own peering connection.",
    [
      "Security groups could matter in general, but the underlying reason here is architectural.",
      "Non-transitivity is the defining limitation of VPC peering.",
      "Peering works across Regions and accounts.",
      "Route tables are never updated automatically for peering.",
    ],
    "\"A-B and B-C peered, A cannot reach C\" -> non-transitive", ["peering", "transitive"]
  ),
  mk(
    "vpc-peering", 2, 3, "medium",
    "A company has two VPCs that both use the CIDR 10.0.0.0/16 and needs to let one application in VPC A consume a single internal API hosted in VPC B. Which solution works?",
    ["VPC peering between the two VPCs", "AWS Transit Gateway attaching both VPCs", "AWS PrivateLink exposing the API as an endpoint service", "An internet gateway in each VPC"],
    "c",
    "PrivateLink exposes a service without exposing the whole network and does not require non-overlapping CIDRs.",
    [
      "Peering requires non-overlapping CIDR blocks.",
      "Transit Gateway also needs non-overlapping CIDRs for routing.",
      "PrivateLink works with overlapping CIDRs and limits exposure to one service.",
      "Using the internet is unnecessary and weaker for private service access.",
    ],
    "\"overlapping CIDR + one service\" -> PrivateLink", ["PrivateLink", "overlapping CIDR"]
  ),
  mk(
    "vpc-peering", 3, 1, "hard",
    "After a peering connection between two VPCs is accepted, instances in each VPC still cannot reach each other by private IP. Which TWO actions are required?",
    ["Add a route to the peer VPC's CIDR via the peering connection in each VPC's route tables", "Allow the traffic in the relevant security groups", "Attach an internet gateway to both VPCs", "Create a NAT gateway in each VPC"],
    "ab",
    "Peering does not update routing. Both route tables need entries for the peer's CIDR and security groups must permit the traffic.",
    [
      "Routes to the peer CIDR are needed on both sides.",
      "Security groups (and NACLs) must allow the traffic.",
      "Peering uses private connectivity, so an internet gateway is not involved.",
      "NAT gateways are for outbound internet access, not peering.",
    ],
    "\"accepted but no traffic\" -> routes + security groups", ["peering", "route table", "security group"]
  ),

  // ---- Route 53 ----
  mk(
    "route-53-routing-policies", 1, 2, "easy",
    "A company runs an application in us-east-1 and keeps a standby copy in eu-west-1. Traffic should go to the standby only when the primary is unhealthy. Which Route 53 routing policy fits?",
    ["Weighted", "Latency", "Failover", "Geolocation"],
    "c",
    "Failover routing returns the primary record while its health check passes and the secondary when it fails.",
    [
      "Weighted splits traffic by ratio and does not implement primary and standby behaviour.",
      "Latency sends users to the fastest Region and does not model a standby.",
      "Failover implements active-passive routing based on health checks.",
      "Geolocation routes by the user's location, not by health.",
    ],
    "\"only if the primary is unhealthy\" -> failover", ["Route 53", "failover"]
  ),
  mk(
    "route-53-routing-policies", 2, 3, "medium",
    "A company wants to point the apex domain example.com at an Application Load Balancer. What should they create in Route 53?",
    ["A CNAME record pointing to the ALB DNS name", "An A record with the ALB's IP address", "An Alias record pointing to the ALB", "An NS record for the ALB"],
    "c",
    "A CNAME cannot exist at the zone apex, and ALB IPs change. An Alias record is allowed at the apex, follows the ALB, and is free of query charges for AWS targets.",
    [
      "DNS does not allow a CNAME at the zone apex.",
      "ALB addresses change over time, so a fixed IP would break.",
      "Alias records are designed for exactly this case.",
      "NS records delegate a zone and do not route traffic.",
    ],
    "\"zone apex to AWS resource\" -> Alias record", ["Alias", "zone apex", "ALB"]
  ),
  mk(
    "route-53-routing-policies", 3, 3, "hard",
    "A global application runs in four Regions. The company wants each user to reach the Region that gives them the lowest network latency, and wants unhealthy Regions to be skipped. Which configuration meets this?",
    ["Geolocation records with a default record", "Latency records with a health check on each endpoint", "Weighted records with equal weights", "Simple routing with multiple values"],
    "b",
    "Latency routing answers with the lowest-latency Region, and attached health checks remove unhealthy endpoints from answers.",
    [
      "Geolocation maps by country, which is not always the lowest latency.",
      "Latency records choose the fastest Region and health checks exclude failed ones.",
      "Equal weights spread traffic randomly without regard to the user's proximity.",
      "Simple routing returns all values with no latency or health logic.",
    ],
    "\"lowest latency + skip unhealthy\" -> latency routing with health checks", ["latency routing", "health check"]
  ),

  // ---- RDS Multi-AZ vs replicas ----
  mk(
    "rds-multi-az-read-replicas", 1, 2, "easy",
    "A company's production RDS MySQL database must survive an Availability Zone failure with automatic failover and no application endpoint change. What should they enable?",
    ["A read replica in another AZ", "Multi-AZ deployment", "Automated backups only", "A larger instance class"],
    "b",
    "Multi-AZ keeps a synchronous standby in a second AZ and fails over automatically using the same endpoint.",
    [
      "Read replicas are asynchronous and promotion is manual, with a different endpoint.",
      "Multi-AZ provides automatic failover with the same endpoint.",
      "Backups help recovery but involve restoring, not automatic failover.",
      "A bigger instance does not protect against an AZ failure.",
    ],
    "\"automatic failover\" -> Multi-AZ", ["RDS", "Multi-AZ", "failover"]
  ),
  mk(
    "rds-multi-az-read-replicas", 2, 3, "medium",
    "Heavy reporting queries are slowing down a transactional RDS PostgreSQL database. The reports can tolerate data that is a few seconds old. What is the best solution?",
    ["Enable Multi-AZ and run reports against the standby", "Create a read replica and point the reports at it", "Increase the backup retention period", "Move the database to a larger storage volume"],
    "b",
    "Read replicas offload read traffic to separate instances through asynchronous replication, which is acceptable when slightly stale data is fine.",
    [
      "The standby in a Multi-AZ instance deployment cannot be read from.",
      "Replicas have their own endpoints and are designed for read scaling.",
      "Backup retention does not affect query load.",
      "Storage size does not address competing read queries.",
    ],
    "\"reports slow down OLTP\" -> read replica", ["read replica", "reporting"]
  ),
  mk(
    "rds-multi-az-read-replicas", 3, 2, "hard",
    "A company needs a disaster recovery copy of its RDS MySQL database in another Region that can be promoted to a standalone database if the primary Region fails. Which feature should they use?",
    ["Multi-AZ deployment", "A cross-Region read replica", "Automated backups in the same Region", "A read replica in the same AZ"],
    "b",
    "A cross-Region read replica holds an asynchronously replicated copy in another Region and can be promoted to become a standalone database.",
    [
      "Multi-AZ stays within one Region.",
      "Cross-Region replicas support Regional DR and can be promoted.",
      "Backups in the same Region do not protect against loss of the Region.",
      "A replica in the same AZ offers no Regional resilience.",
    ],
    "\"another Region + promote\" -> cross-Region read replica", ["read replica", "cross-Region", "DR"]
  ),

  // ---- DynamoDB ----
  mk(
    "dynamodb-capacity-dax-global-tables", 1, 3, "easy",
    "A DynamoDB table backs a product catalogue that is read thousands of times per second, mostly for the same popular items. The team wants microsecond read latency with minimal code changes. What should they add?",
    ["ElastiCache for Redis with custom caching logic", "DynamoDB Accelerator (DAX)", "A global secondary index", "More write capacity units"],
    "b",
    "DAX is a managed in-memory cache for DynamoDB that delivers microsecond reads and works through a compatible client.",
    [
      "Redis would work but needs application-level cache logic and invalidation.",
      "DAX is purpose-built for DynamoDB read acceleration with minimal changes.",
      "A GSI provides another query path, not a cache.",
      "Write capacity does not speed up reads.",
    ],
    "\"DynamoDB + microsecond reads\" -> DAX", ["DAX", "cache"]
  ),
  mk(
    "dynamodb-capacity-dax-global-tables", 2, 3, "medium",
    "A table must store items of 6 KB and the application performs 100 strongly consistent reads per second. How many read capacity units must be provisioned?",
    ["100", "200", "300", "600"],
    "b",
    "One RCU covers one strongly consistent read of up to 4 KB per second. A 6 KB item needs two RCUs per read, so 100 reads require 200 RCUs.",
    [
      "That would be right only for items of 4 KB or less.",
      "6 KB rounds up to two 4 KB units, so 100 x 2 = 200.",
      "That would correspond to 12 KB items.",
      "That would correspond to far larger items than 6 KB.",
    ],
    "\"1 RCU = 4 KB strongly consistent, round up\"", ["RCU", "capacity"]
  ),
  mk(
    "dynamodb-capacity-dax-global-tables", 3, 2, "hard",
    "A gaming company needs a DynamoDB table that accepts writes in both us-east-1 and ap-southeast-1, with each Region serving local players at low latency. Which feature should they use?",
    ["Read replicas in each Region", "DynamoDB Global Tables", "DAX clusters in both Regions", "Cross-Region S3 replication of an export"],
    "b",
    "Global Tables provide multi-Region, multi-active replication, so each replica accepts writes and serves local reads.",
    [
      "DynamoDB has no read replica feature like RDS and they would be read-only anyway.",
      "Global Tables replicate across Regions with writes allowed in each.",
      "DAX is a cache and does not replicate data across Regions.",
      "An S3 export is a batch snapshot, not live replication.",
    ],
    "\"writes in multiple Regions\" -> Global Tables", ["Global Tables", "multi-Region"]
  ),

  // ---- IAM evaluation ----
  mk(
    "iam-policy-evaluation-sts-scps", 1, 1, "easy",
    "An IAM user's identity policy allows s3:DeleteObject on a bucket, but the bucket policy contains an explicit deny for that action for this user. What is the result?",
    ["The user can delete objects because the identity policy allows it", "The request is denied because an explicit deny overrides any allow", "The result depends on which policy was created first", "The user can delete only objects they created"],
    "b",
    "An explicit deny always wins over an allow in policy evaluation.",
    [
      "An allow cannot override an explicit deny.",
      "Explicit deny takes precedence in every case.",
      "Creation order is irrelevant in policy evaluation.",
      "Object ownership is not part of this evaluation.",
    ],
    "\"explicit deny\" always wins", ["explicit deny", "policy evaluation"]
  ),
  mk(
    "iam-policy-evaluation-sts-scps", 2, 1, "medium",
    "A company uses AWS Organizations and wants to prevent every member account from using any Region except eu-west-1, even for account administrators. What should they use?",
    ["IAM policies in each account", "A service control policy (SCP) attached to the organization root or OUs", "Permissions boundaries on each user", "AWS Config rules"],
    "b",
    "SCPs set maximum permissions for member accounts and apply to all identities in them, including administrators and root users of those accounts.",
    [
      "Account administrators could simply change IAM policies in their own account.",
      "An SCP is a central guardrail that cannot be overridden from within the member account.",
      "Boundaries apply to individual identities and are managed within each account.",
      "Config detects non-compliance but does not block API calls.",
    ],
    "\"restrict all accounts centrally\" -> SCP", ["SCP", "Organizations", "guardrail"]
  ),
  mk(
    "iam-policy-evaluation-sts-scps", 3, 1, "hard",
    "A company's SCP allows all actions on Amazon S3 in a member account, but no IAM policy in that account grants any S3 permission to a particular role. Can the role list the objects in a bucket?",
    ["Yes, because the SCP allows S3 actions", "No, because an SCP does not grant permissions on its own and an IAM allow is still required", "Yes, but only in the management account", "Yes, if the role is assumed through STS"],
    "b",
    "SCPs only set the maximum available permissions. An identity or resource policy must still explicitly allow the action.",
    [
      "An SCP allow never grants access by itself.",
      "Effective permissions need both an SCP that allows and a policy that grants.",
      "The scenario is about a member account, and SCPs do not grant anywhere.",
      "Assuming the role through STS does not add any permission.",
    ],
    "\"SCP allow\" is a ceiling, not a grant", ["SCP", "effective permissions"]
  ),

  // ---- CloudFront ----
  mk(
    "cloudfront-origins-security", 1, 1, "easy",
    "A company serves a website from a private S3 bucket through CloudFront and wants only CloudFront to be able to read objects from the bucket. What should they use?",
    ["Make the bucket public", "Origin Access Control (OAC) with a bucket policy allowing CloudFront", "A security group on the bucket", "An IAM user for each viewer"],
    "b",
    "OAC lets CloudFront sign requests to S3 so the bucket stays private and only the distribution can read from it.",
    [
      "A public bucket allows direct access, bypassing CloudFront.",
      "OAC with a matching bucket policy limits access to the distribution.",
      "S3 buckets do not use security groups.",
      "Viewers are anonymous internet users, not IAM identities.",
    ],
    "\"private S3 + only CloudFront\" -> OAC", ["OAC", "S3", "CloudFront"]
  ),
  mk(
    "cloudfront-origins-security", 2, 1, "medium",
    "A streaming company hosts hundreds of video segments per title and wants only paying subscribers to access them, without changing each segment's URL. What should they use?",
    ["CloudFront signed URLs", "CloudFront signed cookies", "S3 presigned URLs", "Geo restriction"],
    "b",
    "Signed cookies grant access to multiple files without modifying their URLs.",
    [
      "Signed URLs work per file and would require changing every URL.",
      "Signed cookies suit many files and keep URLs unchanged.",
      "Presigned URLs are per object and bypass CloudFront.",
      "Geo restriction filters by country, not by subscription.",
    ],
    "\"many files, URLs unchanged\" -> signed cookies", ["signed cookies", "CloudFront"]
  ),
  mk(
    "cloudfront-origins-security", 3, 3, "hard",
    "A company needs to rewrite request headers and perform simple URL redirects for millions of requests per second at the lowest cost and latency. The logic needs no network access. Which feature is best?",
    ["Lambda@Edge on origin request", "CloudFront Functions on viewer request", "An EC2 fleet behind an ALB", "AWS WAF rules"],
    "b",
    "CloudFront Functions run lightweight JavaScript at the viewer events with sub-millisecond start times at very large scale and low cost.",
    [
      "Lambda@Edge is more capable but costs more and has higher latency, so it is excessive here.",
      "CloudFront Functions are designed for simple, high-volume header and redirect logic.",
      "Adding servers increases latency and cost for a simple edge rewrite.",
      "WAF filters traffic and does not rewrite headers or redirect.",
    ],
    "\"simple header/redirect at massive scale\" -> CloudFront Functions", ["CloudFront Functions", "edge"]
  ),

  // ---- RDS Proxy / Aurora Global ----
  mk(
    "rds-proxy-aurora-global-database", 1, 3, "easy",
    "A serverless application with thousands of concurrent Lambda invocations connects to an RDS MySQL database and frequently fails with 'too many connections'. What should the architect do?",
    ["Add a read replica", "Place Amazon RDS Proxy between Lambda and the database", "Enable Multi-AZ", "Increase the Lambda memory"],
    "b",
    "RDS Proxy pools and shares database connections across many short-lived clients, preventing connection exhaustion.",
    [
      "Replicas help read scale, but writes and connections to the primary are unaffected.",
      "The proxy multiplexes many client connections onto fewer database connections.",
      "Multi-AZ provides availability and does not reduce connection counts.",
      "Memory does not change how many connections the functions open.",
    ],
    "\"Lambda + too many connections\" -> RDS Proxy", ["RDS Proxy", "Lambda", "connections"]
  ),
  mk(
    "rds-proxy-aurora-global-database", 2, 2, "medium",
    "An application on Aurora needs a Regional disaster recovery solution with a recovery point objective of about one second and a recovery time objective of under a minute, plus low-latency reads in another Region. Which feature fits?",
    ["Aurora Replicas in the same Region", "Aurora Global Database", "A cross-Region manual snapshot every hour", "Multi-AZ RDS"],
    "b",
    "Aurora Global Database replicates at the storage layer with typical lag under a second and supports fast promotion of a secondary Region.",
    [
      "Same-Region replicas do not survive a Regional failure.",
      "Global Database delivers sub-second replication and quick cross-Region failover.",
      "Hourly snapshots imply an RPO of up to an hour and a slow restore.",
      "Multi-AZ covers an AZ failure, not a Regional one.",
    ],
    "\"RPO ~1s cross-Region Aurora\" -> Aurora Global Database", ["Aurora Global Database", "DR"]
  ),
  mk(
    "rds-proxy-aurora-global-database", 3, 1, "hard",
    "A team wants Lambda functions to authenticate to a database without storing a password in code and wants failover to be faster for the application. Which TWO benefits does RDS Proxy provide?",
    ["IAM authentication with credentials held in Secrets Manager", "Reduced failover time because the proxy preserves client connections", "Automatic multi-Region replication", "Publicly accessible endpoints for easy testing"],
    "ab",
    "RDS Proxy supports IAM authentication using Secrets Manager credentials and shortens failover by holding connections while the database switches over.",
    [
      "The proxy integrates with IAM and Secrets Manager to avoid embedded passwords.",
      "Failover impact is reduced because clients stay connected to the proxy.",
      "Cross-Region replication belongs to Aurora Global Database, not the proxy.",
      "RDS Proxy is reachable only from within a VPC.",
    ],
    "\"no password in code + faster failover\" -> RDS Proxy", ["RDS Proxy", "IAM authentication"]
  ),

  // ---- VPC Flow Logs ----
  mk(
    "vpc-flow-logs", 1, 1, "easy",
    "A security engineer needs to know which source IP addresses were rejected when trying to connect to a subnet, including the destination port. Which service provides this?",
    ["AWS CloudTrail", "VPC Flow Logs", "AWS Config", "Amazon Inspector"],
    "b",
    "VPC Flow Logs capture accepted and rejected IP traffic metadata including addresses, ports and protocol.",
    [
      "CloudTrail records API calls, not network traffic.",
      "Flow Logs record traffic metadata with an ACCEPT or REJECT action.",
      "Config tracks resource configuration changes.",
      "Inspector scans for vulnerabilities on workloads.",
    ],
    "\"IP traffic accepted/rejected\" -> VPC Flow Logs", ["Flow Logs", "REJECT"]
  ),
  mk(
    "vpc-flow-logs", 2, 1, "medium",
    "A flow log shows an inbound request on port 443 as ACCEPT, but the outbound response for the same flow as REJECT. What is the most likely cause?",
    ["The security group blocks outbound traffic", "The network ACL is denying the return traffic", "The route table lacks a route to the internet", "The instance has no public IP"],
    "b",
    "Security groups are stateful, so a response to an allowed request is permitted automatically. A rejected response points to the stateless network ACL.",
    [
      "A stateful security group would automatically allow the response.",
      "The stateless NACL must explicitly allow return traffic, and a missing rule would cause this.",
      "A missing route would prevent the connection altogether instead of rejecting only the response.",
      "A missing public IP would stop the inbound request from being accepted.",
    ],
    "\"inbound ACCEPT, outbound REJECT\" -> NACL", ["NACL", "stateless", "Flow Logs"]
  ),
  mk(
    "vpc-flow-logs", 3, 1, "hard",
    "A team wants to retain flow logs cheaply for a year and run ad hoc SQL queries over them. Which design is most appropriate?",
    ["Publish flow logs to CloudWatch Logs and keep them for a year", "Publish flow logs to S3 and query them with Amazon Athena", "Publish flow logs to an EBS volume", "Stream flow logs to DynamoDB"],
    "b",
    "S3 is inexpensive for long retention and Athena can query the logs directly with SQL.",
    [
      "CloudWatch Logs works but is more expensive for long retention and large volumes.",
      "S3 plus Athena gives low-cost storage and SQL analysis without managing servers.",
      "Flow logs cannot be delivered directly to EBS.",
      "DynamoDB is not a supported destination and is not suited to this analysis.",
    ],
    "\"retain cheaply + SQL\" -> S3 + Athena", ["Flow Logs", "S3", "Athena"]
  ),
];

export function fc(
  lessonId: string,
  n: number,
  domain: ExamDomainId,
  category: string,
  front: string,
  back: string
): Flashcard {
  return { id: `fc-${lessonId}-${n}`, serviceId: lessonId, domain, category, front, back };
}

export const deepDiveFlashcards: Flashcard[] = [
  fc("ec2-purchasing-options-placement-groups", 1, 4, "Compute", "Spot Instances: discount and catch?", "Up to 90% off On-Demand, but AWS can reclaim the instance with a two-minute warning. Use for stateless, restartable work."),
  fc("ec2-purchasing-options-placement-groups", 2, 3, "Compute", "Cluster vs Spread vs Partition placement group?", "Cluster: one AZ, lowest latency. Spread: separate hardware, max 7 running instances per AZ. Partition: up to 7 partitions per AZ for large distributed stores."),
  fc("ec2-purchasing-options-placement-groups", 3, 4, "Compute", "Capacity Reservation: does it give a discount?", "No. It guarantees capacity in one AZ at On-Demand rates. Combine it with a Savings Plan or Reserved Instance for a discount."),

  fc("s3-storage-classes-lifecycle", 1, 4, "Storage", "Which S3 class for unknown or changing access patterns?", "S3 Intelligent-Tiering. It moves objects between tiers automatically with no retrieval fee, for a small per-object monitoring charge."),
  fc("s3-storage-classes-lifecycle", 2, 4, "Storage", "Minimum storage durations: Standard-IA, Glacier Flexible, Deep Archive?", "30 days, 90 days, and 180 days. Deleting early still bills the remaining days."),
  fc("s3-storage-classes-lifecycle", 3, 4, "Storage", "Why avoid One Zone-IA for important data?", "It stores data in a single AZ. If that AZ is lost, so is the data. Use it only for data you can recreate."),

  fc("s3-security-encryption", 1, 1, "Storage", "Governance vs Compliance mode in Object Lock?", "Governance can be bypassed by users with special permission. Compliance cannot be changed by anyone, including root, until retention expires."),
  fc("s3-security-encryption", 2, 1, "Storage", "SSE-S3 vs SSE-KMS vs SSE-C?", "SSE-S3: S3 manages keys (default). SSE-KMS: you control the KMS key and get CloudTrail logs. SSE-C: you supply the key on every request."),
  fc("s3-security-encryption", 3, 1, "Storage", "How do you force HTTPS on an S3 bucket?", "Add a bucket policy that denies requests where aws:SecureTransport is false."),

  fc("ebs-volume-types-snapshots", 1, 3, "Storage", "gp3 baseline performance?", "3,000 IOPS and 125 MiB/s included, scalable independently up to 16,000 IOPS and 1,000 MiB/s."),
  fc("ebs-volume-types-snapshots", 2, 1, "Storage", "How do you encrypt an existing unencrypted EBS volume?", "Snapshot it, copy the snapshot with encryption enabled, then create a new volume from the encrypted copy."),
  fc("ebs-volume-types-snapshots", 3, 2, "Storage", "How do you move an EBS volume to another AZ or Region?", "Take a snapshot, create a volume from it in the target AZ, or copy the snapshot to the other Region first."),

  fc("vpc-peering", 1, 1, "Networking and Content Delivery", "Three limits of VPC peering?", "No overlapping CIDRs, not transitive, and no edge-to-edge routing through the peer's VPN, Direct Connect or internet gateway."),
  fc("vpc-peering", 2, 3, "Networking and Content Delivery", "Peering vs Transit Gateway vs PrivateLink?", "Peering: few VPCs, one-to-one. Transit Gateway: hub for many VPCs and on-premises. PrivateLink: one service, works with overlapping CIDRs."),
  fc("vpc-peering", 3, 1, "Networking and Content Delivery", "Peering accepted but no traffic. Why?", "Routes are not added automatically. Add the peer CIDR route in both route tables and allow the traffic in security groups and NACLs."),

  fc("route-53-routing-policies", 1, 2, "Networking and Content Delivery", "Which Route 53 policy for active-passive DR?", "Failover routing with a health check on the primary record."),
  fc("route-53-routing-policies", 2, 3, "Networking and Content Delivery", "Latency vs Geolocation routing?", "Latency picks the Region with the lowest latency to the user. Geolocation picks by the user's country or continent."),
  fc("route-53-routing-policies", 3, 3, "Networking and Content Delivery", "Why use an Alias record instead of a CNAME?", "Alias works at the zone apex, targets AWS resources directly, can follow target health, and AWS-target queries are free."),

  fc("rds-multi-az-read-replicas", 1, 2, "Database", "Multi-AZ vs read replica in one sentence?", "Multi-AZ is synchronous, for availability and automatic failover. Read replicas are asynchronous, for read scaling and can be promoted manually."),
  fc("rds-multi-az-read-replicas", 2, 3, "Database", "Can you read from the standby of a Multi-AZ instance deployment?", "No. The standby only takes over on failover. Use read replicas, or a Multi-AZ DB cluster with readable standbys."),
  fc("rds-multi-az-read-replicas", 3, 2, "Database", "RDS automated backup retention range?", "1 to 35 days, enabling point-in-time recovery. Manual snapshots stay until you delete them."),

  fc("dynamodb-capacity-dax-global-tables", 1, 3, "Database", "What is 1 RCU and 1 WCU?", "1 RCU: one strongly consistent read per second up to 4 KB (or two eventually consistent). 1 WCU: one write per second up to 1 KB."),
  fc("dynamodb-capacity-dax-global-tables", 2, 3, "Database", "What does DAX not help with?", "Writes and strongly consistent reads, which pass through to DynamoDB. It speeds up eventually consistent and repeated reads."),
  fc("dynamodb-capacity-dax-global-tables", 3, 2, "Database", "GSI vs LSI?", "GSI: any time, own partition and sort key, own capacity. LSI: same partition key, created only with the table, shares capacity."),

  fc("iam-policy-evaluation-sts-scps", 1, 1, "Security, Identity, and Compliance", "IAM evaluation rule in one line?", "Default deny, an explicit deny always wins, and an explicit allow is needed to grant access."),
  fc("iam-policy-evaluation-sts-scps", 2, 1, "Security, Identity, and Compliance", "Does an SCP grant permissions?", "No. It only sets the maximum. A policy in the account must still allow the action. It does not apply to the management account."),
  fc("iam-policy-evaluation-sts-scps", 3, 1, "Security, Identity, and Compliance", "Default and maximum STS role session duration?", "One hour by default, up to 12 hours by role setting, and role chaining is capped at one hour."),

  fc("cloudfront-origins-security", 1, 1, "Networking and Content Delivery", "Signed URL vs signed cookie?", "Signed URL: one file, or clients without cookie support. Signed cookie: many files without changing URLs."),
  fc("cloudfront-origins-security", 2, 1, "Networking and Content Delivery", "OAC vs OAI?", "Origin Access Control is the current way to keep an S3 origin private to CloudFront and replaces Origin Access Identity."),
  fc("cloudfront-origins-security", 3, 3, "Networking and Content Delivery", "CloudFront Functions vs Lambda@Edge?", "Functions: lightweight JavaScript at viewer events, very fast and cheap. Lambda@Edge: more compute and network access, at viewer and origin events."),

  fc("rds-proxy-aurora-global-database", 1, 3, "Database", "Problem RDS Proxy solves?", "Connection exhaustion from many short-lived clients like Lambda, by pooling connections. It also shortens failover and supports IAM auth."),
  fc("rds-proxy-aurora-global-database", 2, 2, "Database", "Aurora Global Database key numbers?", "One primary Region, up to five read-only secondary Regions, typical replication lag under one second, RTO usually under a minute."),
  fc("rds-proxy-aurora-global-database", 3, 2, "Database", "Aurora Global Database vs cross-Region read replica?", "Global Database uses storage-level replication with far lower lag and faster promotion than engine-level asynchronous replicas."),

  fc("vpc-flow-logs", 1, 1, "Networking and Content Delivery", "What do VPC Flow Logs capture?", "Metadata about IP traffic (addresses, ports, protocol, bytes, ACCEPT or REJECT), not packet contents."),
  fc("vpc-flow-logs", 2, 1, "Networking and Content Delivery", "Inbound ACCEPT but outbound REJECT in a flow log?", "The stateless network ACL is blocking return traffic. A stateful security group would allow the reply automatically."),
  fc("vpc-flow-logs", 3, 1, "Networking and Content Delivery", "Traffic not captured by Flow Logs?", "DHCP, Amazon DNS resolver queries, instance metadata (169.254.169.254), Amazon Time Sync and the default VPC router's reserved address."),
];
