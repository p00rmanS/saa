import type { Lesson } from "@/lib/types";

export const deepDivesB: Lesson[] = [
  {
    id: "rds-multi-az-read-replicas",
    moduleId: "phase-5-databases",
    category: "Databases",
    title: "RDS Multi-AZ vs Read Replicas",
    shortName: "Multi-AZ vs replicas",
    tier: 1,
    domains: [2, 3],
    examImportance: "critical",
    oneLiner:
      "Multi-AZ keeps your database alive when something fails. Read replicas make it faster when too many people are reading. They solve different problems.",
    englishExplanation:
      "A Multi-AZ DB instance deployment keeps a standby copy in a second AZ. Writes are replicated synchronously, so the standby is always current. You cannot connect to the standby to read from it. If the primary fails, RDS flips the DNS name to the standby, typically within one to two minutes, and your application reconnects to the same endpoint. This is a high availability feature. It also lets backups and some maintenance run against the standby, which reduces impact on the primary. A Multi-AZ DB cluster (MySQL and PostgreSQL) goes further: one writer and two readable standbys across three AZs, with faster failover.\n\nRead replicas are separate DB instances fed by asynchronous replication. Because replication is asynchronous there can be lag, so reads from a replica may be slightly stale. You connect to each replica through its own endpoint and your application sends read traffic there. MySQL, MariaDB and PostgreSQL support up to 15 replicas, and they can be in another Region. A replica can be promoted to a standalone database, which makes it useful for disaster recovery and for migrations. Replica traffic inside a Region is not charged for data transfer, but cross-Region replication is.\n\nA useful way to combine them: Multi-AZ on the primary for availability, and one or more read replicas for read scaling or reporting. You can even make a replica Multi-AZ itself. Backups are separate again: automated backups with a retention of 1 to 35 days enable point-in-time recovery, and manual snapshots are kept until you delete them.",
    taglishExplanation:
      "Ang Multi-AZ ay para sa availability. May standby copy sa ibang AZ na synchronous ang replication, kaya laging updated, pero hindi mo ito mababasahan. Kapag nasira ang primary, awtomatikong lilipat ang DNS sa standby, mga isa hanggang dalawang minuto. Ang read replica naman ay para sa performance. Asynchronous ang replication, kaya puwedeng may kaunting lag, at may sarili itong endpoint na kailangan mong gamitin sa application mo para sa mga read. Puwede itong nasa ibang Region at puwedeng i-promote bilang standalone na database. Madalas, pinagsasama ang dalawa: Multi-AZ para sa uptime, read replica para sa dami ng read. Huwag mong ipagpalit ang dalawa sa exam, iyan ang pinakamadalas na bitag.",
    analogy:
      "Multi-AZ is a spare driver sitting in the back seat, fully briefed and ready to take the wheel if the first one faints, but he is not carrying any passengers. Read replicas are extra cashiers who take the queue of people only asking questions, although they work from a copy of the price list that may be a minute out of date.",
    whyItExists:
      "A single database instance is a single point of failure and a single point of read contention. Replication solves both, but synchronous replication gives safety at the cost of latency, while asynchronous replication gives scale at the cost of freshness. AWS offers each deliberately.",
    flow: "App writes to primary -> (sync) standby in another AZ for HA  |  (async) read replicas for read scaling -> failure: DNS flips to standby / replica is promoted manually",
    withoutIt: [
      "An instance or AZ failure would mean restoring from backup, with minutes to hours of downtime",
      "Reporting queries would compete with transactional traffic on the same database",
      "There would be no easy way to place a copy of the database in another Region",
    ],
    bestUseCases: [
      "Multi-AZ for every production database that needs automatic failover",
      "Read replicas for read-heavy applications, dashboards and reporting",
      "Cross-Region read replica as a DR target or to serve users near another Region",
      "Promoting a replica to cut over during a database migration",
    ],
    poorUseCases: [
      "Expecting a Multi-AZ standby to serve read traffic (the instance deployment cannot)",
      "Using a read replica as your only HA mechanism, since promotion is manual and data can be missing due to lag",
      "Sending writes to a read replica",
      "Read replicas for strongly consistent reads of just-written data",
    ],
    alternatives: [
      { need: "Up to 15 low-lag replicas and faster failover", choose: "Amazon Aurora" },
      { need: "Cache hot reads to cut database load", choose: "Amazon ElastiCache" },
      { need: "Global database with sub-second cross-Region replication", choose: "Aurora Global Database" },
      { need: "Pool connections from many Lambda functions", choose: "Amazon RDS Proxy" },
    ],
    keyFeatures: [
      "Multi-AZ: synchronous replication, automatic failover, same endpoint, no read access to the standby (instance deployment)",
      "Multi-AZ DB cluster: two readable standbys, MySQL and PostgreSQL",
      "Read replicas: asynchronous, up to 15 (MySQL, MariaDB, PostgreSQL), own endpoints, can be cross-Region",
      "Replicas can be promoted to standalone databases",
      "Automated backups: 1 to 35 days retention, point-in-time recovery",
      "Manual snapshots persist until deleted, and can be copied across Regions",
      "Encrypted source means encrypted replicas",
    ],
    availability:
      "Multi-AZ survives an instance or AZ failure with a brief failover. Read replicas survive only if you promote one, and promotion can lose whatever had not replicated yet. Aurora narrows both gaps.",
    security:
      "Replicas inherit encryption from the source. Cross-Region encrypted replicas use a KMS key in the destination Region. Security groups and subnet groups are configured per instance.",
    pricingLogic:
      "Multi-AZ roughly doubles the instance cost because you pay for the standby. Each read replica is a full instance charge, plus cross-Region data transfer if applicable.",
    examKeywords: [
      "high availability",
      "automatic failover",
      "scale reads",
      "reporting workload",
      "disaster recovery cross-Region",
      "synchronous",
      "asynchronous",
    ],
    examTraps: [
      "Multi-AZ is not a performance feature. 'Reduce load on the primary' is read replicas.",
      "Read replica failover is not automatic. 'Automatic failover' is Multi-AZ.",
      "Replicas are eventually consistent. A question demanding the latest write on read must use the primary.",
      "For MySQL, MariaDB and PostgreSQL up to 15 replicas, but Oracle and SQL Server are limited to fewer.",
    ],
    architectureDiagram: `           writes
 App ------------> [Primary AZ-a] ==sync==> [Standby AZ-b]   (HA, no reads)
  |                      |
  | reads                +==async==> [Read Replica 1]
  +--------------------------------> [Read Replica 2, other Region]`,
    architectureCaption: "Solid line is for availability, dotted for scale. Same database, two different jobs.",
    mentorTip:
      "Underline the problem word in the question. 'Fails', 'outage', 'automatic' means Multi-AZ. 'Slow', 'reports', 'read-heavy' means read replica.",
    questionIds: [
      "q-rds-multi-az-read-replicas-1",
      "q-rds-multi-az-read-replicas-2",
      "q-rds-multi-az-read-replicas-3",
    ],
  },
  {
    id: "dynamodb-capacity-dax-global-tables",
    moduleId: "phase-5-databases",
    category: "Databases",
    title: "DynamoDB Capacity, DAX and Global Tables",
    shortName: "DynamoDB deep dive",
    tier: 1,
    domains: [3, 2, 4],
    examImportance: "critical",
    oneLiner:
      "DynamoDB scales by capacity mode, speeds up reads with an in-memory cache called DAX, and spreads across Regions with Global Tables.",
    englishExplanation:
      "DynamoDB bills capacity in two modes. On-demand charges per request and scales instantly, which suits unpredictable or new workloads. Provisioned mode lets you set read and write capacity units, optionally with auto scaling, and is cheaper for steady traffic. One read capacity unit gives one strongly consistent read per second of up to 4 KB, or two eventually consistent reads. One write capacity unit gives one write per second of up to 1 KB. Data spreads over partitions by partition key, so a 'hot' key that receives most of the traffic can throttle even when the table's total capacity looks fine. A good key has many distinct values with even access.\n\nSecondary indexes add query paths. A Global Secondary Index (GSI) has its own partition and sort key, can be added any time, and has its own capacity. A Local Secondary Index (LSI) keeps the same partition key with a different sort key, must be created with the table, and shares its capacity. Streams record item changes for 24 hours and feed Lambda for event-driven work. TTL deletes expired items for free. Point-in-time recovery restores to any second in the last 35 days.\n\nDAX is a managed, in-memory, write-through cache that sits in front of DynamoDB and cuts read latency from milliseconds to microseconds with no application rewrite beyond using the DAX client. It helps with eventually consistent reads and repeated reads of hot items. It does not help writes or strongly consistent reads, which pass through. Global Tables replicate a table to multiple Regions, with every replica accepting writes (multi-active). Conflicts are resolved last-writer-wins. Streams must be enabled, and the result is low-latency local access and Regional resilience.",
    taglishExplanation:
      "May dalawang capacity mode ang DynamoDB. On-demand ay per request ang bayad at agad nag-i-scale, para sa hindi predictable na traffic. Provisioned ay ikaw ang magse-set ng RCU at WCU, mas mura kung steady ang gamit. Tandaan na ang isang RCU ay isang strongly consistent read na hanggang 4 KB kada segundo, at ang isang WCU ay isang write na hanggang 1 KB kada segundo. Kung may hot partition key, magka-throttle kahit mukhang sapat ang kabuuang capacity. Ang DAX ay in-memory cache na nagpapabilis ng read hanggang microsecond, pero hindi nakakatulong sa write o strongly consistent read. Ang Global Tables naman ay multi-Region at multi-active, kaya puwedeng magsulat sa kahit anong Region, at last-writer-wins ang resolution kapag nag-conflict.",
    analogy:
      "A large shop with many service counters (partitions). Customers are assigned to a counter by the first letter of their surname, so if everyone is called Smith, one counter is swamped while the others sit idle. DAX is a notice board by the entrance with the most-asked answers, so staff are rarely interrupted. Global Tables are branches in several cities that all keep the same ledger in sync.",
    whyItExists:
      "Key-value workloads such as sessions, carts and leaderboards need predictable single-digit-millisecond latency at any scale, without capacity planning for servers. The capacity modes, caching and replication features exist so one service can serve both a hobby app and a global game.",
    flow: "Client -> (optional) DAX cache -> DynamoDB partition chosen by hash of partition key -> change appears in Stream -> Lambda or Global Table replica in another Region",
    withoutIt: [
      "You would run and scale your own key-value cluster and its replicas",
      "Read-heavy hot items would hammer the table and drive up read capacity cost",
      "Multi-Region active-active data would need custom replication and conflict handling",
    ],
    bestUseCases: [
      "On-demand mode for spiky or unknown traffic and new applications",
      "Provisioned with auto scaling for predictable, steady workloads",
      "DAX for read-heavy tables with repeated reads of the same items",
      "Global Tables for multi-Region active-active applications and low-latency local reads",
      "Streams plus Lambda for reacting to changes",
    ],
    poorUseCases: [
      "DAX for write-heavy workloads or ones that need strongly consistent reads",
      "DAX for caching large scan-style analytics results",
      "Complex joins and ad hoc relational queries (use RDS or Aurora)",
      "A low-cardinality partition key such as 'status' or 'country'",
    ],
    alternatives: [
      { need: "General in-memory cache for any datastore", choose: "Amazon ElastiCache" },
      { need: "Relational model with joins and transactions", choose: "Amazon Aurora / RDS" },
      { need: "Multi-Region relational database", choose: "Aurora Global Database" },
      { need: "Ad hoc analytics over DynamoDB data", choose: "Export to S3 and query with Athena" },
    ],
    keyFeatures: [
      "On-demand and provisioned capacity modes, with auto scaling for provisioned",
      "1 RCU = one 4 KB strongly consistent read/s or two eventually consistent. 1 WCU = one 1 KB write/s",
      "GSI: any time, own capacity. LSI: at table creation only, shares capacity",
      "Streams (24 hours), TTL, point-in-time recovery (35 days), on-demand backups",
      "DAX: microsecond reads, write-through, item and query caches, API compatible client",
      "Global Tables: multi-Region, multi-active, last-writer-wins, needs Streams",
      "Transactions across items with TransactWriteItems and TransactGetItems",
    ],
    availability:
      "Data is stored across three AZs in a Region automatically. Global Tables add Regional resilience, with a 99.999 percent SLA when you replicate across Regions. A DAX cluster should span multiple AZs.",
    security:
      "IAM controls access down to item and attribute level using fine-grained conditions. Encryption at rest is always on, with an AWS owned, AWS managed or customer managed KMS key. VPC gateway endpoints keep traffic private.",
    pricingLogic:
      "On-demand costs more per request but nothing when idle. Provisioned is cheaper per request if you keep it well utilised. Global Tables charge replicated write capacity in each Region. DAX is charged per node-hour.",
    examKeywords: [
      "single-digit millisecond",
      "microsecond latency",
      "unpredictable traffic",
      "hot partition",
      "multi-Region active-active",
      "key-value",
      "session store",
    ],
    examTraps: [
      "DAX only accelerates eventually consistent reads. Strongly consistent reads bypass the cache.",
      "A Local Secondary Index cannot be added after the table exists. A Global Secondary Index can.",
      "Global Tables need DynamoDB Streams enabled, and conflicts resolve by last writer wins, not by merging.",
      "ElastiCache and DAX are not interchangeable: DAX needs no cache logic in your application and is DynamoDB specific.",
    ],
    architectureDiagram: `App ---> [DAX cluster] ---> [DynamoDB table us-east-1] <== Global Table ==> [Table eu-west-1]
                               |                                                   |
                               +--> Stream --> Lambda                       local users read/write here`,
    architectureCaption: "DAX shortens the read path. Global Tables add a second writable Region.",
    mentorTip:
      "If the question mentions microseconds and DynamoDB, the answer is DAX. If it mentions multiple Regions and writes in each, the answer is Global Tables. Capacity math is just division by 4 KB and 1 KB, rounded up.",
    questionIds: [
      "q-dynamodb-capacity-dax-global-tables-1",
      "q-dynamodb-capacity-dax-global-tables-2",
      "q-dynamodb-capacity-dax-global-tables-3",
    ],
  },
  {
    id: "iam-policy-evaluation-sts-scps",
    moduleId: "phase-1-iam",
    category: "Security, Identity, and Compliance",
    title: "IAM Policy Evaluation, STS and SCPs",
    shortName: "Policy evaluation",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "AWS decides every request with the same logic: deny by default, an explicit deny always wins, and each layer can only narrow what the layer below it allows.",
    englishExplanation:
      "Every request starts as an implicit deny. It is allowed only if some policy explicitly allows it and no policy explicitly denies it. Within one account, identity-based policies on the principal and resource-based policies on the resource are combined, so either one can allow access, though an explicit deny in either blocks it. For cross-account access, both sides must allow: the resource owner's policy must trust the other account, and the other account's identity must also be permitted to make the call.\n\nSome policy types never grant permissions, they only limit them. A service control policy (SCP) in AWS Organizations sets the maximum permissions for accounts in an OU. It applies to every user and role in member accounts, including the root user of those accounts, but does not apply to the management account. A permissions boundary sets the maximum an IAM user or role can ever receive from identity policies. A session policy limits a temporary session further. The effective permission is the intersection of all of these and an allow in an identity or resource policy.\n\nAWS STS issues temporary credentials. A role is assumed with AssumeRole and returns an access key, secret and session token that expire, by default after one hour and up to 12 hours depending on the role setting. Role chaining caps the session at one hour. Typical uses are cross-account access, EC2 instance profiles, federation from a corporate identity provider or web identity, and Lambda execution roles. Use an external ID when a third party assumes a role in your account, to prevent the confused deputy problem.",
    taglishExplanation:
      "Lahat ng request ay deny by default. Papayagan lang kapag may explicit allow at walang explicit deny. Kapag explicit deny, talo ang lahat ng allow. Sa iisang account, pinagsasama ang identity-based at resource-based policy, kaya puwedeng isa lang ang mag-allow. Sa cross-account, dapat pumayag ang dalawang panig. May mga policy na hindi nagbibigay ng permission kundi naglilimit lang: ang SCP sa Organizations, ang permissions boundary, at ang session policy. Ang SCP ay tumatama sa lahat ng member account, pati root user nila, pero hindi sa management account. Ang STS ay nagbibigay ng pansamantalang credentials. Ang AssumeRole ay may default na isang oras, at hanggang 12 oras depende sa setting ng role. Gumamit ng external ID kapag third party ang mag-a-assume ng role mo.",
    analogy:
      "A nightclub. Everyone starts outside (implicit deny). The guest list lets you in (allow). A banned list overrides the guest list (explicit deny). The fire marshal's capacity limit and the building's rules (SCP and permissions boundary) never invite anyone in, but they cap how many and who can be inside no matter what the guest list says. A wristband that expires at midnight is an STS session.",
    whyItExists:
      "In a large organisation you cannot trust every account administrator to configure permissions perfectly. Guardrails that only restrict let a central team set hard limits while delegating day-to-day administration, and short-lived credentials remove the risk of long-lived keys being leaked.",
    flow: "Request -> SCP allows? -> permissions boundary allows? -> session policy allows? -> identity or resource policy allows? -> no explicit deny anywhere? -> allowed",
    withoutIt: [
      "A compromised admin in one account could use any service in any Region",
      "You would hand out long-lived access keys for cross-account and application access",
      "There would be no central way to enforce rules like 'no resources outside eu-west-1'",
    ],
    bestUseCases: [
      "SCPs to block unapproved Regions or services across all member accounts",
      "Permissions boundaries to let developers create roles without escalating their own privileges",
      "AssumeRole for cross-account access instead of sharing keys",
      "Instance profiles and execution roles so applications never store credentials",
      "Web identity or SAML federation for external users",
    ],
    poorUseCases: [
      "Expecting an SCP to grant permission (it never does)",
      "Expecting SCPs to restrict the management account",
      "Long-lived IAM user keys embedded in application code",
      "Relying on role chaining for a long-running job beyond its one-hour limit",
    ],
    alternatives: [
      { need: "Give people SSO access to many accounts", choose: "IAM Identity Center" },
      { need: "Let a web or mobile app user get temporary AWS access", choose: "Amazon Cognito identity pools" },
      { need: "Detect permissions that are too broad or externally shared", choose: "IAM Access Analyzer" },
      { need: "Create short-lived database passwords", choose: "IAM database authentication / Secrets Manager" },
    ],
    keyFeatures: [
      "Default deny, explicit deny always overrides allow",
      "Same account: identity-based OR resource-based can allow. Cross account: both must allow",
      "SCPs filter, never grant, and do not affect the management account",
      "Permissions boundary limits identity-based permissions of a user or role",
      "STS operations: AssumeRole, AssumeRoleWithSAML, AssumeRoleWithWebIdentity, GetSessionToken",
      "Default session 1 hour, role maximum up to 12 hours, role chaining capped at 1 hour",
      "External ID and condition keys (aws:PrincipalOrgID, aws:SourceIp, aws:MultiFactorAuthPresent)",
    ],
    availability:
      "IAM is a global, highly available control plane. STS has Regional endpoints, and using a Regional endpoint reduces latency and improves resilience compared to the single global one.",
    security:
      "Prefer roles and temporary credentials over users. Require MFA with conditions for sensitive actions. Use aws:PrincipalOrgID in resource policies to allow any account in your organization without listing each one.",
    pricingLogic:
      "IAM, STS and SCPs are free. The cost is operational: complex policy layers are hard to debug, which is what the IAM policy simulator and Access Analyzer are for.",
    examKeywords: [
      "explicit deny",
      "guardrail",
      "maximum permissions",
      "cross-account access",
      "temporary credentials",
      "prevent privilege escalation",
      "restrict Regions",
    ],
    examTraps: [
      "An SCP with an allow does not grant access. A principal still needs an allow in an IAM or resource policy.",
      "SCPs do not apply to the management account, and they do not apply to service-linked roles.",
      "Roles do not have long-term credentials. AssumeRole returns temporary ones.",
      "A resource-based policy can grant access to a principal in the same account without any identity policy, but cross-account needs both sides.",
    ],
    architectureDiagram: `AWS Organization
  Root (SCP: deny non-approved Regions)
   +-- OU Prod
        +-- Account A: Role "Deploy" (permissions boundary)
                         ^
                         | sts:AssumeRole (temporary credentials, 1h)
        Account B: CI/CD pipeline`,
    architectureCaption: "Effective permission = allowed by SCP, boundary and session policy, and granted by an identity or resource policy.",
    mentorTip:
      "Draw a funnel. SCP is the widest ring, then the permissions boundary, then the session policy, and an actual allow must exist inside all of them. An explicit deny anywhere closes the funnel.",
    questionIds: [
      "q-iam-policy-evaluation-sts-scps-1",
      "q-iam-policy-evaluation-sts-scps-2",
      "q-iam-policy-evaluation-sts-scps-3",
    ],
  },
  {
    id: "cloudfront-origins-security",
    moduleId: "phase-4-networking",
    category: "Networking",
    title: "CloudFront Origins, Signed Access and Edge Compute",
    shortName: "CloudFront in depth",
    tier: 2,
    domains: [1, 3],
    examImportance: "high",
    oneLiner:
      "CloudFront caches content at the edge, and the exam tests how you lock the origin down, restrict who can view content, and run small bits of code at the edge.",
    englishExplanation:
      "A distribution has one or more origins (an S3 bucket, an ALB, an API Gateway, or any HTTP server) and cache behaviors that route path patterns to an origin with specific caching rules. The cache key and TTL determine how often the edge goes back to the origin. To update content you can invalidate paths (which costs after a free allowance) or, better, give files versioned names so old and new never collide. Origin groups provide failover: if the primary origin returns configured error codes, CloudFront retries against a secondary.\n\nSecuring access has two parts. First, protect the origin so only CloudFront can reach it. For S3 you use Origin Access Control (OAC), which replaces the older Origin Access Identity, and a bucket policy allowing only the CloudFront service principal. For an ALB or custom origin you can require a secret header or use the CloudFront managed prefix list in the security group. Second, restrict viewers. Signed URLs control access to a single file and work for clients that do not support cookies. Signed cookies control access to many files, such as a whole video library, without changing URLs. Geo restriction blocks or allows by country, and AWS WAF attached to the distribution filters malicious requests. Field-level encryption protects sensitive form fields end to end.\n\nFor logic at the edge there are two options. CloudFront Functions are lightweight JavaScript that run at viewer request and viewer response with sub-millisecond start times, suited to header rewrites, redirects and URL normalisation. Lambda@Edge runs Node.js or Python at viewer and origin events, with more time and memory and network access, suited to heavier work such as authentication or dynamic origin selection. Certificates used by CloudFront must be issued or imported in ACM in the us-east-1 Region.",
    taglishExplanation:
      "Ang CloudFront distribution ay may origin (S3, ALB, o iba pang HTTP server) at cache behavior na nagsasabi kung aling path ang pupunta saan. Para ma-update ang content, mas maganda ang versioned na filename kaysa invalidation. Sa security, dalawa ang kailangan: protektahan ang origin at i-restrict ang viewer. Para sa S3, gamitin ang Origin Access Control para CloudFront lang ang makakabasa ng bucket. Para sa viewer, signed URL ang para sa isang file, signed cookie ang para sa maraming file. May geo restriction din at puwedeng ikabit ang WAF. Para sa code sa edge: CloudFront Functions ang magaan at mabilis, para sa header o redirect lang. Lambda@Edge ang mas malakas, para sa mabigat na logic. At tandaan, ang ACM certificate para sa CloudFront ay dapat nasa us-east-1.",
    analogy:
      "A chain of local newsagents (edge locations) stocking copies of a magazine printed at one factory (the origin). The factory only hands copies to the chain's own drivers (OAC). Premium subscribers show a ticket for one issue (signed URL) or a pass for the whole shelf (signed cookie). A clerk at the door can quickly tweak the order slip (CloudFront Function) or phone head office for a more complex decision (Lambda@Edge).",
    whyItExists:
      "Serving every request from one Region is slow for faraway users and expensive for the origin. A CDN moves the bytes close to the user, and the security and edge-compute features exist so that moving content outward does not mean giving up control over who sees it.",
    flow: "Viewer -> nearest edge -> cache hit? return. Miss -> (edge function) -> origin (S3 via OAC / ALB) -> cache and return",
    withoutIt: [
      "Users far from your Region would see high latency and the origin would absorb every request",
      "Your S3 bucket would need to be public or have complicated access rules to serve a website",
      "Paid content could be shared by anyone who found the URL",
    ],
    bestUseCases: [
      "Static website or media delivery from private S3 using OAC",
      "Signed cookies for a subscriber-only video library",
      "Signed URLs for a one-off download link",
      "Origin groups for resilient failover across two origins",
      "CloudFront Functions for redirects and header manipulation at massive scale",
      "Lambda@Edge for authentication or A/B routing logic that needs more compute",
    ],
    poorUseCases: [
      "Caching highly personalised content that differs on every request",
      "Using invalidations for every deployment (use versioned file names)",
      "Making the S3 bucket public instead of using OAC",
      "Lambda@Edge for simple header changes that CloudFront Functions can do far more cheaply",
    ],
    alternatives: [
      { need: "Static anycast IPs and TCP/UDP acceleration for non-HTTP apps", choose: "AWS Global Accelerator" },
      { need: "Give a single user a time-limited link to a private S3 object without a CDN", choose: "S3 presigned URL" },
      { need: "Filter SQL injection and bot traffic", choose: "AWS WAF on the distribution" },
      { need: "DDoS protection beyond the default", choose: "AWS Shield Advanced" },
    ],
    keyFeatures: [
      "Origins: S3, ALB, EC2, API Gateway, custom HTTP, and origin groups for failover",
      "Cache behaviors by path pattern, TTLs and cache policies",
      "Origin Access Control for S3 (OAC replaces OAI)",
      "Signed URLs (one file) and signed cookies (many files)",
      "Geo restriction, WAF integration, field-level encryption, HTTPS enforcement",
      "CloudFront Functions (viewer events only, JavaScript) vs Lambda@Edge (viewer and origin events)",
      "Price classes limit which edge locations you use, trading reach for cost",
    ],
    availability:
      "Content is served from a global network of edge locations, and origin groups let CloudFront fail over automatically. Shield Standard protects every distribution against common DDoS attacks at no additional cost.",
    security:
      "Enforce HTTPS between viewer and edge and between edge and origin. Use OAC so the bucket is never public. Use signed URLs or cookies for paid content and attach WAF for application-layer filtering.",
    pricingLogic:
      "You pay for data transferred out to viewers and per request, which is usually cheaper than serving from the origin. Origin fetch from S3 is free of transfer charges. Invalidations beyond the free monthly allowance, Lambda@Edge invocations and field-level encryption add cost.",
    examKeywords: [
      "private S3 bucket",
      "restrict access to CloudFront only",
      "paid content",
      "multiple files",
      "single file",
      "run code at the edge",
      "geo-restrict",
      "us-east-1 certificate",
    ],
    examTraps: [
      "Signed cookies for many files, signed URLs for one file or for clients that do not support cookies.",
      "OAC replaces OAI. If both appear, OAC is the modern answer.",
      "The ACM certificate for CloudFront must be in us-east-1, regardless of where your origin is.",
      "CloudFront Functions cannot access the network or run at origin events. If the scenario needs either, it is Lambda@Edge.",
    ],
    architectureDiagram: `Viewer --HTTPS--> [Edge: CloudFront Function (rewrite)]
                        |   hit -> return
                        v   miss
              [Lambda@Edge origin request] --> [S3 via OAC]   (bucket not public)
                                   \\---------> [ALB origin]  (failover origin group)`,
    architectureCaption: "Only CloudFront can read the bucket, and edge code runs before the request ever reaches the origin.",
    mentorTip:
      "Memorise the pairs: one file means signed URL, many files means signed cookie, simple and fast means CloudFront Function, needs network or origin events means Lambda@Edge.",
    questionIds: [
      "q-cloudfront-origins-security-1",
      "q-cloudfront-origins-security-2",
      "q-cloudfront-origins-security-3",
    ],
  },
  {
    id: "rds-proxy-aurora-global-database",
    moduleId: "phase-5-databases",
    category: "Databases",
    title: "RDS Proxy and Aurora Global Database",
    shortName: "RDS Proxy & Aurora Global",
    tier: 2,
    domains: [2, 3],
    examImportance: "high",
    oneLiner:
      "RDS Proxy pools database connections so serverless and spiky apps do not exhaust them, and Aurora Global Database copies your data across Regions with about a second of lag.",
    englishExplanation:
      "Every database connection uses memory. When hundreds of Lambda functions each open their own connection, the database can run out and start refusing clients. RDS Proxy sits between the application and the database, keeps a pool of established connections and shares them across many short-lived clients. It also shortens failover time for Multi-AZ RDS and Aurora, by up to about two thirds, because the proxy holds client connections while the database fails over. It supports IAM authentication and stores credentials in Secrets Manager, and it is only reachable from inside a VPC.\n\nAurora Global Database is built for worldwide applications and Regional disaster recovery. One primary Region accepts writes. Up to five secondary Regions hold read-only copies, kept in sync by storage-level replication with typical lag under one second. Local users read from their nearest Region. If the primary Region fails, you promote a secondary, with a recovery point objective of around one second and a recovery time objective typically under a minute for a managed failover. Write forwarding lets a secondary accept write requests and pass them to the primary.\n\nThis is different from a cross-Region read replica on RDS, which uses engine-level asynchronous replication, has more lag, and takes longer to promote. For a multi-Region active-active key-value workload the answer is DynamoDB Global Tables, but for a relational database with fast Regional failover it is Aurora Global Database.",
    taglishExplanation:
      "Bawat database connection ay gumagamit ng memory. Kapag daan-daang Lambda function ang sabay-sabay na kumokonekta, puwedeng maubusan ang database. Ang RDS Proxy ang nasa gitna at nagpo-pool ng connections, kaya mas kaunti ang aktwal na connection sa database. Pinapabilis din niya ang failover ng Multi-AZ, at sumusuporta sa IAM authentication at Secrets Manager. Sa loob lang ng VPC siya naaabot. Ang Aurora Global Database naman ay may isang primary Region na tumatanggap ng write at hanggang limang secondary Region na read-only, na kadalasang wala pang isang segundo ang lag. Kapag bumagsak ang primary Region, mag-promote ka ng secondary, RPO mga isang segundo at RTO karaniwang wala pang isang minuto. Mas mabilis ito kaysa cross-Region read replica ng ordinaryong RDS.",
    analogy:
      "RDS Proxy is a receptionist at a busy clinic. Instead of every visitor demanding a doctor's attention immediately, the receptionist keeps a few doctor slots open and routes visitors through them. Aurora Global Database is a medical records system mirrored in clinics in several countries, so patients can be seen locally and if the main clinic floods, another can take over within a minute.",
    whyItExists:
      "Serverless compute scales to thousands of short-lived clients, which is the opposite of how relational databases want to be used. And global businesses want local read latency and a recovery plan that survives losing an entire Region.",
    flow: "Lambda x1000 -> RDS Proxy (pooled connections) -> Aurora primary  ||  Aurora primary Region -> storage replication (<1s) -> secondary Regions",
    withoutIt: [
      "A burst of Lambda invocations could exhaust database connections and cause errors",
      "Failover would break every client connection and take longer to recover",
      "Cross-Region DR would rely on slower, engine-level replication with more potential data loss",
    ],
    bestUseCases: [
      "RDS Proxy in front of RDS or Aurora when Lambda or many small clients connect",
      "RDS Proxy to cut failover time for production Multi-AZ databases",
      "Aurora Global Database for worldwide read latency",
      "Aurora Global Database for a cross-Region DR plan with RPO of seconds",
    ],
    poorUseCases: [
      "RDS Proxy for a handful of long-lived connections that the database already handles",
      "Making RDS Proxy publicly accessible (it cannot be)",
      "Aurora Global Database for a small single-Region app (extra cost with no benefit)",
      "Aurora Global Database as a multi-writer solution (only one primary Region accepts writes natively)",
    ],
    alternatives: [
      { need: "Multi-Region active-active key-value data", choose: "DynamoDB Global Tables" },
      { need: "Cheaper cross-Region copy where minutes of lag is acceptable", choose: "Cross-Region read replica" },
      { need: "Scale reads inside one Region", choose: "Aurora Replicas (up to 15)" },
      { need: "Cache query results", choose: "Amazon ElastiCache" },
    ],
    keyFeatures: [
      "RDS Proxy: connection pooling and multiplexing, IAM auth, Secrets Manager credentials",
      "RDS Proxy reduces failover time and is VPC-only",
      "Supports RDS MySQL, PostgreSQL, MariaDB, SQL Server and Aurora",
      "Aurora Global Database: one primary Region, up to five read-only secondary Regions",
      "Storage-level replication, typical lag under one second",
      "Managed failover and switchover, write forwarding from secondaries",
      "Secondary Regions can have up to 16 read replicas each",
    ],
    availability:
      "RDS Proxy is itself deployed across multiple AZs. Aurora Global Database survives the loss of an entire Region, with a recovery point of about one second.",
    security:
      "Use IAM authentication so applications do not hold database passwords, and keep the proxy and database in private subnets. Global databases can be encrypted with a KMS key in each Region.",
    pricingLogic:
      "RDS Proxy is charged per vCPU of the underlying database instance per hour. Aurora Global Database charges for each secondary Region's instances and storage, plus replicated write I/O and cross-Region data transfer.",
    examKeywords: [
      "too many connections",
      "Lambda connecting to RDS",
      "connection pooling",
      "reduce failover time",
      "cross-Region disaster recovery",
      "RPO of one second",
      "low-latency global reads",
    ],
    examTraps: [
      "A read replica does not solve 'too many connections' from Lambda. RDS Proxy does.",
      "Aurora Global Database has a single primary Region for writes. Multi-Region active-active writes on the exam point to DynamoDB Global Tables, not Aurora.",
      "RDS Proxy can only be reached from within the VPC.",
      "Aurora Global is not the same as Aurora Replicas. Replicas are inside one Region.",
    ],
    architectureDiagram: `us-east-1 (primary)                          eu-west-1 (secondary, read-only)
Lambda x N --> [RDS Proxy] --> [Aurora writer]  --storage replication--> [Aurora readers]
                                  |  (lag < 1s)                                ^
                                  +----------------------------------- EU users read here`,
    architectureCaption: "The proxy protects the database from connection storms. Global Database moves data to where users are.",
    mentorTip:
      "'Lambda' and 'database' in the same sentence usually means RDS Proxy. 'Another Region' and 'RPO of seconds' in one sentence usually means Aurora Global Database.",
    questionIds: [
      "q-rds-proxy-aurora-global-database-1",
      "q-rds-proxy-aurora-global-database-2",
      "q-rds-proxy-aurora-global-database-3",
    ],
  },
  {
    id: "vpc-flow-logs",
    moduleId: "phase-4-networking",
    category: "Networking",
    title: "VPC Flow Logs",
    shortName: "VPC Flow Logs",
    tier: 2,
    domains: [1],
    examImportance: "medium",
    oneLiner:
      "VPC Flow Logs record who talked to whom, on which port, and whether it was accepted or rejected. They record metadata about traffic, never its contents.",
    englishExplanation:
      "A flow log captures information about IP traffic going to and from network interfaces. You can create one at three levels: the whole VPC, a single subnet, or a single network interface (ENI). Each record is a summary of a flow over a capture window, including source and destination address and port, protocol, packet and byte counts, and an ACCEPT or REJECT action. Logs can be delivered to CloudWatch Logs, S3, or Kinesis Data Firehose. Flow logs do not slow your traffic, and delivery is not real time, with records typically appearing several minutes after the traffic.\n\nTheir main exam use is troubleshooting connectivity. Security groups are stateful and NACLs are stateless, and flow logs can help tell them apart. If you see an inbound ACCEPT followed by an outbound REJECT for the same flow, the NACL is blocking return traffic, because a stateful security group would have allowed the response automatically. If inbound is REJECT, either the security group or the NACL is denying the request. Flow logs also feed security analysis: send them to S3 and query with Athena, or to CloudWatch Logs and create metric filters and alarms for suspicious patterns.\n\nSome traffic is not logged: DNS queries to the Amazon-provided resolver, DHCP traffic, requests to the instance metadata service at 169.254.169.254, Amazon Time Sync traffic and traffic to the reserved address of the default VPC router. Flow log configuration cannot be changed after creation, so you delete and recreate to change the fields or destination. If you need to inspect actual packet contents, use VPC Traffic Mirroring instead.",
    taglishExplanation:
      "Ang VPC Flow Logs ay nagtatala ng impormasyon tungkol sa IP traffic: sino ang source at destination, anong port at protocol, at kung ACCEPT o REJECT. Hindi nito nire-record ang laman ng packet. Puwede mo itong i-set sa VPC, subnet, o ENI level, at ipadala sa CloudWatch Logs, S3, o Firehose. Hindi ito real time, may delay na ilang minuto. Sa exam, madalas ginagamit ito sa troubleshooting: kung ACCEPT ang inbound pero REJECT ang outbound ng parehong flow, NACL ang may problema, kasi stateful ang security group at kusa nitong papayagan ang response. Hindi rin kasama ang DNS ng Amazon, DHCP, at metadata service. Kung gusto mong makita ang mismong laman ng packet, VPC Traffic Mirroring ang gamitin.",
    analogy:
      "A visitor log at a building entrance. It records who came, which door they used, what time, and whether the guard let them through or turned them away. It never records what was said once they got inside.",
    whyItExists:
      "Without visibility into network flows, 'why can't A reach B?' and 'who is probing my servers?' are guesswork. Flow logs give a cheap, always-available record that supports troubleshooting, forensics and compliance.",
    flow: "Packet crosses ENI -> flow record aggregated over a window -> delivered to CloudWatch Logs / S3 / Firehose -> queried (Athena / Logs Insights) or alarmed on",
    withoutIt: [
      "Connectivity problems between security groups and NACLs would be much harder to diagnose",
      "You could not show an auditor which IPs connected to a sensitive subnet",
      "Port scans and unusual outbound connections would go unnoticed",
    ],
    bestUseCases: [
      "Diagnosing why traffic is blocked and whether a security group or NACL is responsible",
      "Long-term network audit logs stored in S3, queried with Athena",
      "CloudWatch metric filters and alarms for repeated REJECTs from one address",
      "Feeding data to security tools such as GuardDuty (which analyses flow logs itself)",
    ],
    poorUseCases: [
      "Inspecting application payloads (use Traffic Mirroring or application logs)",
      "Real-time blocking of malicious traffic (use WAF, Network Firewall or security groups)",
      "Expecting to see DNS queries to the Amazon resolver (use Route 53 Resolver query logs)",
      "Expecting instant visibility, since delivery is delayed",
    ],
    alternatives: [
      { need: "Copy actual packets to an inspection appliance", choose: "VPC Traffic Mirroring" },
      { need: "Log DNS queries made inside a VPC", choose: "Route 53 Resolver query logging" },
      { need: "Detect threats using flow and DNS data automatically", choose: "Amazon GuardDuty" },
      { need: "Block traffic by rule at the network edge", choose: "AWS Network Firewall" },
    ],
    keyFeatures: [
      "Scope: VPC, subnet or ENI",
      "Filter: ACCEPT, REJECT or ALL",
      "Destinations: CloudWatch Logs, S3, Kinesis Data Firehose",
      "Records contain 5-tuple, packets, bytes, action and status, with optional custom fields",
      "Does not affect network throughput or latency",
      "Cannot modify a flow log's configuration after it is created",
      "Excludes DHCP, Amazon DNS resolver, instance metadata, Time Sync and default router reserved traffic",
    ],
    availability:
      "Flow logs are a monitoring feature and do not affect the availability of your workloads. Delivery to S3 or CloudWatch Logs is best effort with a delay.",
    security:
      "Use flow logs as evidence for investigations and compliance. Protect the destination bucket or log group with encryption and restrictive policies, because the logs reveal your network layout.",
    pricingLogic:
      "There is no charge for enabling flow logs, but you pay vended log charges for the data published to CloudWatch Logs or S3, and for storage and queries on that data.",
    examKeywords: [
      "capture IP traffic information",
      "troubleshoot connectivity",
      "security group vs NACL",
      "accepted and rejected",
      "audit network traffic",
      "Athena",
    ],
    examTraps: [
      "Flow logs show metadata, not packet contents. 'Inspect payload' points to Traffic Mirroring.",
      "Inbound ACCEPT followed by outbound REJECT for the same flow means the NACL, not the security group.",
      "Logs are not real time, so they are not a mechanism to stop an attack in progress.",
      "You cannot edit a flow log's settings. Delete and create a new one.",
    ],
    architectureDiagram: `[EC2 ENI] --traffic--> VPC
     |
     +-- Flow Log (ACCEPT/REJECT, 5-tuple)
              |
     +--------+---------+-----------------+
     v                  v                 v
CloudWatch Logs       S3 --> Athena     Firehose --> SIEM`,
    architectureCaption: "One flow log, three possible destinations, chosen by how you want to analyse the data.",
    mentorTip:
      "To tell security group from NACL in a flow log: stateful allows replies automatically, so a rejected reply means the stateless NACL is in the way.",
    questionIds: [
      "q-vpc-flow-logs-1",
      "q-vpc-flow-logs-2",
      "q-vpc-flow-logs-3",
    ],
  },
];
