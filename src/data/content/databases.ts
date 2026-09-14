import type { Lesson } from "@/lib/types";

export const databaseLessons: Lesson[] = [
  {
    id: "database-decision-framework",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "Database Decision Framework",
    shortName: "DB Framework",
    tier: 1,
    domains: [3],
    examImportance: "critical",
    oneLiner:
      "A mental checklist for picking the right AWS database — relational, NoSQL, cache, warehouse, graph, or document — before you even look at the answer choices.",
    englishExplanation:
      "The SAA exam almost never asks you to memorize a database's feature list in isolation — it asks you to pick the RIGHT database given a scenario, usually among 3-4 plausible-sounding options. If you don't have a decision framework, you will fall for distractors that \"could technically work\" but are not the best fit. The framework starts with one question: what shape is your data, and how do you need to query it?\n\nFirst, ask if the data is naturally tabular with relationships that need to be joined and queried with complex SQL, and if you need strong ACID transactions (e.g., an order system where inventory and payment must update together). If yes, you are in relational territory — RDS or Aurora. Second, ask if you have a simple, predictable access pattern (\"get me the item by this key\") at massive, unpredictable scale, where you know your queries in advance and don't need joins. That is the classic NoSQL / DynamoDB signal. Third, ask if the requirement is about SPEED for repeated reads of the same data — sub-millisecond lookups, session storage, leaderboard, or reducing load on a primary database. That points to a cache — ElastiCache.\n\nFourth, ask if this is about analytics: crunching huge historical datasets with complex aggregate queries (SUM, GROUP BY across billions of rows) for BI dashboards, not transactional operations. That is a data warehouse signal — Redshift (or Athena if it's ad hoc on S3 data). Fifth, if the domain is inherently about relationships and traversal — \"who is connected to whom,\" \"what items are frequently bought together, hops away\" — that's a graph database signal, Neptune. Finally, if you see \"MongoDB compatible\" or \"Cassandra compatible\" in the scenario, that is almost always a literal pointer to DocumentDB or Keyspaces respectively — AWS wants you to recognize the compatibility keyword, not necessarily choose the \"best\" architecture from scratch.\n\nThe exam loves layering a second constraint on top: \"with minimal operational overhead\" (favors managed/serverless options), \"the company already has strong SQL skills and legacy stored procedures\" (favors RDS/Aurora over a NoSQL rewrite), or \"the workload is spiky/unpredictable\" (favors DynamoDB on-demand or Aurora Serverless over provisioned RDS). Train yourself to underline the data shape, the access pattern, the scale, and any secondary constraint before jumping to the options.",
    taglishExplanation:
      "Sa exam, hindi laging tanong ang \"ano ang DynamoDB\" — mas madalas, binibigyan ka ng scenario tapos kailangan mong pumili ng tamang database sa gitna ng ilang mukhang-tamang choices. Kaya kailangan mo ng framework. Una, tanungin mo: may relasyon ba ang data at kailangan ng JOIN at transactions na dapat lahat-o-wala (ACID)? Kung oo, relational (RDS/Aurora) yan. Pangalawa, kung simple lang ang access pattern — \"kunin mo ito gamit itong key\" — pero sobrang laki at mabilis ang scale, NoSQL (DynamoDB) yan. Pangatlo, kung ang usapan ay bilis ng paulit-ulit na pagbasa ng parehong data — parang \"cache\" lang — ElastiCache yan. Pang-apat, kung analytics at reporting sa napakaraming historical data, Redshift (data warehouse) yan. Panlima, kung usapan ng \"koneksyon\" o \"relasyon sa pagitan ng mga bagay\" — social network, fraud detection — Neptune (graph) yan. At kung nabanggit sa scenario na \"MongoDB-compatible\" o \"Cassandra-compatible,\" halos laging direct hint yun papunta sa DocumentDB o Keyspaces.",
    analogy:
      "Think of it like choosing the right container in your kitchen. Need to store leftovers you'll reheat and eat as-is quickly? Tupperware in the fridge (cache — ElastiCache). Need a full pantry system with labeled shelves, recipes cross-referencing ingredients (joins), and strict rules about what goes where (transactions)? A proper pantry (relational — RDS/Aurora). Need to store millions of identical small items you'll grab one at a time by a barcode, at massive scale? A warehouse bin system (DynamoDB). Need to analyze a year's worth of grocery receipts for spending patterns? A spreadsheet and reporting tool (Redshift). You wouldn't put your reheat-tonight leftovers in the analytics spreadsheet, and you wouldn't run BI reports out of the fridge.",
    whyItExists:
      "AWS offers over 15 purpose-built database services because no single database is good at everything — a database optimized for millisecond key lookups at massive scale (DynamoDB) makes different engineering trade-offs than one optimized for complex multi-table joins (RDS) or graph traversals (Neptune). The exam tests whether you understand these trade-offs well enough to route a real business requirement to the right purpose-built tool, instead of defaulting to \"just use RDS for everything\" the way many beginners do.",
    flow: "Read scenario -> identify data shape & access pattern -> identify scale & consistency needs -> identify secondary constraints (ops overhead, cost, compatibility) -> match to database family -> pick specific AWS service",
    withoutIt: [
      "You would default to the database you know best (usually RDS) even when it is the wrong fit, leading to wrong exam answers and poor real-world architecture",
      "You would get tricked by distractor options that technically \"work\" but are not the best/most cost-effective/most scalable choice",
      "You would miss compatibility keywords (\"MongoDB-compatible\", \"Cassandra-compatible\", \"Redis-compatible\") that are direct hints toward a specific service",
    ],
    bestUseCases: [
      "Used mentally before answering ANY database question on the exam — not an AWS service itself",
      "Useful when a scenario lists a business requirement first and only implies the database category",
      "Useful for real-world architecture decisions when your team is choosing among managed database options",
    ],
    poorUseCases: [
      "Not a replacement for knowing the specific features of each database service in depth",
      "Does not help when the question is a pure syntax/feature-detail question about one already-named service",
    ],
    alternatives: [
      { need: "A specific relational database", choose: "Amazon RDS or Amazon Aurora" },
      { need: "A specific key-value/document NoSQL database", choose: "Amazon DynamoDB" },
      { need: "A specific caching layer", choose: "Amazon ElastiCache" },
      { need: "A specific analytics warehouse", choose: "Amazon Redshift" },
    ],
    keyFeatures: [
      "Step 1: identify data shape (tabular/relational vs key-value vs document vs graph vs wide-column)",
      "Step 2: identify access pattern (complex joins/ad hoc SQL vs known key lookups vs graph traversal vs aggregate analytics)",
      "Step 3: identify scale and consistency requirements (ACID transactions vs eventual consistency at massive scale)",
      "Step 4: look for compatibility keywords (MongoDB, Cassandra, Redis/Memcached) as direct hints",
      "Step 5: layer in secondary constraints — operational overhead, cost model, spiky vs steady traffic",
    ],
    availability:
      "Not applicable directly — this is a decision process, not a deployed service. However, availability requirements themselves are one of the inputs: a requirement for \"multi-Region active-active with single-digit millisecond reads\" points toward DynamoDB Global Tables, while \"automatic failover within one Region for a relational workload\" points toward RDS Multi-AZ or Aurora.",
    security:
      "Not applicable directly, but note that the SPECIFIC service you choose determines the security model available to you (IAM database authentication, encryption at rest via KMS, VPC security groups, etc.) — part of a good decision includes checking whether the compliance/security requirements in the scenario are satisfiable by the candidate service.",
    pricingLogic:
      "Not applicable directly, but cost is frequently the deciding secondary constraint: DynamoDB on-demand for unpredictable spiky traffic avoids paying for idle provisioned capacity, Aurora Serverless avoids paying for an always-on instance for intermittent workloads, and Redshift/EMR avoid running expensive OLAP queries against an OLTP-tuned RDS instance.",
    examKeywords: [
      "best fit",
      "most cost-effective",
      "least operational overhead",
      "MongoDB-compatible",
      "Cassandra-compatible",
      "millisecond latency at scale",
      "complex joins",
      "ACID transactions",
    ],
    examTraps: [
      "Assuming RDS/Aurora is always the \"safe\" answer — many scenarios are deliberately designed so relational is the WRONG answer (e.g. massive unpredictable key-value scale).",
      "Ignoring compatibility keywords like \"MongoDB\" or \"Cassandra\" which are almost always literal hints, not red herrings.",
      "Choosing a cache (ElastiCache) as a primary data store — a cache is a supplement to, not a replacement for, a durable database.",
      "Forgetting that \"analytics on huge historical data\" is a warehouse (Redshift) problem, not something you bolt onto a transactional RDS instance.",
    ],
    architectureDiagram:
      "Scenario\n  |\n  v\nWhat shape is the data?\n /   |   |    |    \\\nJoins Key-Value Cache Analytics Graph\n  |     |       |      |         |\n RDS/ DynamoDB ElastiCache Redshift Neptune\nAurora",
    architectureCaption:
      "A simple routing tree: identify the data shape and access pattern first, then narrow to the specific AWS database service.",
    mentorTip:
      "Before reading the answer options, force yourself to say out loud (or write down) what KIND of database this scenario needs — relational, key-value, cache, warehouse, graph, or document. Then look at the options. This stops you from being swayed by a familiar service name that doesn't actually fit.",
    questionIds: [
      "q-database-decision-framework-1",
      "q-database-decision-framework-2",
      "q-database-decision-framework-3",
      "q-database-decision-framework-4",
      "q-database-decision-framework-5",
    ],
  },
  {
    id: "amazon-rds",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "Amazon RDS",
    shortName: "RDS",
    tier: 1,
    domains: [2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "Amazon RDS is a managed relational database service that handles the undifferentiated heavy lifting — patching, backups, and failover — for engines like MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server.",
    englishExplanation:
      "Amazon RDS (Relational Database Service) lets you run a standard relational database engine without managing the underlying server yourself. AWS handles OS patching, database engine patching (during your maintenance window), automated backups, and infrastructure provisioning. You still design your schema, write your SQL, and tune your queries — RDS manages the plumbing underneath the database, not the database logic itself. This is the classic managed-service trade-off: you give up some low-level control (you cannot SSH into an RDS instance) in exchange for far less operational burden than self-hosting a database on EC2.\n\nThe single most tested distinction in the entire Databases domain is Multi-AZ versus Read Replicas, and you must be able to state it instantly: Multi-AZ is for HIGH AVAILABILITY. It keeps a synchronously-replicated standby copy of your database in a different Availability Zone, and RDS automatically fails over to that standby if the primary fails — the standby is not used for reads under normal operation and shares the same endpoint. Read Replicas are for READ SCALING. They are asynchronously-replicated, separate, independently-addressable copies you can point read-heavy traffic at to take load off the primary; they are not automatic failover targets by default (although a read replica can be manually promoted to standalone). A common exam trap is a scenario describing heavy read traffic where a distractor answer suggests Multi-AZ — wrong, because Multi-AZ's standby cannot serve read traffic in the standard configuration; you want Read Replicas for that.\n\nRDS also offers RDS Proxy, a fully managed database proxy that pools and shares database connections, which is critical when a fleet of Lambda functions or a serverless application would otherwise open (and potentially exhaust) too many direct database connections. RDS Proxy also improves failover time transparently for the application. Storage can be configured with Storage Auto Scaling, which automatically increases allocated storage when RDS predicts you are close to running out, removing the need to manually provision for future growth. Automated backups (with a retention window and point-in-time recovery) and manual DB snapshots (retained until you delete them) are both available, and RDS applies engine patches during a maintenance window you configure.",
    taglishExplanation:
      "Si RDS, parang may taga-alaga ka na ng database mo — si AWS ang bahala sa OS patching, backups, at pag-provision ng server, pero ikaw pa rin ang gagawa ng schema at SQL queries. Ang pinaka-importanteng dapat mong tandaan dito (lagi itong lumalabas sa exam): Multi-AZ ay para sa AVAILABILITY — may standby copy sa ibang AZ na automatic na fina-failover kapag namatay ang primary, pero hindi mo pwedeng basahin ang standby na yan sa normal setup. Read Replica naman ay para sa READ SCALING — hiwalay na copy na pwede mong bigyan ng sarili niyang traffic para sa mabibigat na SELECT queries, pero hindi ito automatic failover target. Kapag nakita mong \"maraming read traffic, gusto bawasan ang load sa primary,\" Read Replica ang sagot, HINDI Multi-AZ.",
    analogy:
      "Multi-AZ is like having a backup generator wired into your house that kicks in automatically the moment the power goes out — you don't use it for anything else day-to-day, it just sits ready. A Read Replica is like opening a second cash register at a busy store — it actively helps handle more customers (read traffic) right now, but if the main register breaks, the second one doesn't automatically become the \"main\" register without someone deciding to promote it.",
    whyItExists:
      "Before managed database services, teams spent significant engineering time on database operations that added no unique business value: applying security patches, configuring backups correctly, setting up replication, and building custom failover logic. RDS exists so teams can get a production-grade relational database quickly and keep using SQL skills and tools they already know, while AWS absorbs the operational burden of keeping the engine patched, backed up, and highly available.",
    flow: "Application -> RDS endpoint (writer) -> Primary DB instance -> (synchronous) Multi-AZ standby in another AZ | -> (asynchronous) Read Replica(s) for read-heavy queries",
    withoutIt: [
      "You would need to install, patch, and operate a database engine yourself on EC2, including building your own backup and failover automation",
      "A single point of failure unless you build your own multi-AZ replication and failover logic by hand",
      "No native, easy read-scaling story — you would have to build and maintain your own replication pipeline",
    ],
    bestUseCases: [
      "Traditional relational workloads (e-commerce orders, ERP, CRM) needing ACID transactions and SQL joins",
      "Lift-and-shift of an on-premises MySQL/PostgreSQL/SQL Server/Oracle database with minimal changes",
      "Applications with existing SQL skills, ORMs, or stored procedures that must be preserved",
      "Read-heavy applications that benefit from adding Read Replicas without re-architecting",
      "Workloads needing point-in-time recovery and automated backups without building it themselves",
    ],
    poorUseCases: [
      "Massive, unpredictable-scale key-value workloads better suited to DynamoDB",
      "Applications needing the deepest possible cloud-native scaling of storage/compute independently — consider Aurora instead",
      "Extremely spiky or intermittent workloads where paying for an always-on instance is wasteful — consider Aurora Serverless",
    ],
    alternatives: [
      { need: "Cloud-native relational engine with more automatic storage scaling and faster replicas", choose: "Amazon Aurora" },
      { need: "Relational capacity that scales to zero-ish for intermittent workloads", choose: "Aurora Serverless" },
      { need: "Massive-scale key-value/document access with single-digit millisecond latency", choose: "Amazon DynamoDB" },
      { need: "Self-managed full OS/engine control", choose: "Database engine self-hosted on EC2" },
    ],
    keyFeatures: [
      "Supports MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server engines",
      "Multi-AZ deployments for synchronous standby and automatic failover (availability)",
      "Read Replicas for asynchronous, read-scaling copies (can even be cross-Region)",
      "RDS Proxy for connection pooling, especially valuable with Lambda-heavy or serverless applications",
      "Automated backups with point-in-time recovery, plus manual DB snapshots",
      "Storage Auto Scaling to grow allocated storage automatically as data grows",
      "Configurable maintenance windows for OS/engine patching",
    ],
    availability:
      "A single RDS instance without Multi-AZ lives in one AZ and is a single point of failure. Enabling Multi-AZ adds a synchronously replicated standby in a second AZ; RDS automatically detects primary failure and fails over to the standby, updating the DNS endpoint so the application does not need to change its connection string. Read Replicas can be deployed within the same Region or cross-Region for disaster recovery and geographic read locality, but they are not automatic failover targets in the standard Multi-AZ sense.",
    security:
      "RDS instances run inside a VPC and are protected by security groups controlling network access; they should almost always be placed in private subnets with no direct public route for production workloads. Encryption at rest is available via KMS (must be enabled at creation time for most engines), and encryption in transit is available via SSL/TLS. IAM database authentication is supported for some engines as an alternative to long-lived database passwords, and Secrets Manager is commonly used to store and rotate database credentials.",
    pricingLogic:
      "You pay for the instance hours (based on instance class), the storage provisioned (and IOPS if using provisioned IOPS storage), backup storage beyond the free allotment tied to your DB size, and data transfer. Multi-AZ roughly doubles the compute/storage cost since you are paying for a standby instance; Read Replicas each incur their own instance cost. Reserved Instances are available for steady-state workloads at a discount versus On-Demand.",
    examKeywords: [
      "managed relational database",
      "Multi-AZ",
      "Read Replica",
      "automatic failover",
      "RDS Proxy",
      "point-in-time recovery",
      "maintenance window",
      "storage autoscaling",
    ],
    examTraps: [
      "Confusing Multi-AZ (availability/failover) with Read Replicas (read scaling) — this is the single most common RDS exam trap.",
      "Assuming the Multi-AZ standby can serve read traffic in the standard configuration — it cannot; you would need Read Replicas for that.",
      "Forgetting that Read Replicas use asynchronous replication, so there can be replication lag — not appropriate if the read absolutely must reflect the latest write.",
      "Thinking RDS gives you OS-level/SSH access — it does not; RDS is a managed service and you interact with it only via the database engine's own interface.",
    ],
    architectureDiagram:
      "App\n |\n RDS Endpoint (writer)\n |\n Primary (AZ-a) --sync--> Standby (AZ-b)   [Multi-AZ: availability]\n |\n --async--> Read Replica (AZ-c)             [Read Replica: read scaling]",
    architectureCaption:
      "Multi-AZ (synchronous, failover-only standby) is a completely different mechanism from Read Replicas (asynchronous, actively queryable copies).",
    mentorTip:
      "Drill this pair until it's automatic: the word \"availability\" or \"failover\" in a scenario means Multi-AZ; the word \"read-heavy\" or \"reporting queries\" or \"offload reads\" means Read Replica. If a question wants BOTH, the answer is usually \"enable Multi-AZ AND add Read Replicas\" — they are not mutually exclusive.",
    questionIds: [
      "q-amazon-rds-1",
      "q-amazon-rds-2",
      "q-amazon-rds-3",
      "q-amazon-rds-4",
      "q-amazon-rds-5",
    ],
  },
  {
    id: "amazon-aurora",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "Amazon Aurora",
    shortName: "Aurora",
    tier: 1,
    domains: [2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "Amazon Aurora is AWS's cloud-native relational database, MySQL- and PostgreSQL-compatible, built on a distributed storage layer that gives higher throughput, faster replicas, and faster failover than standard RDS.",
    englishExplanation:
      "Amazon Aurora is a relational database engine designed by AWS specifically for the cloud, offered as a deployment option within RDS but architecturally different underneath. Instead of a single storage volume tied to one instance the way traditional RDS engines work, Aurora separates compute from storage: your database instances write to a distributed, self-healing storage layer that is automatically replicated 6 ways across 3 Availability Zones. This storage layer is shared by the writer instance and all reader instances, which is why Aurora replicas can be created and promoted much faster than traditional RDS read replicas — they are not copying the whole dataset, they are just attaching more compute to the same underlying storage.\n\nAurora is exposed as MySQL-compatible and PostgreSQL-compatible, meaning existing tools, drivers, and application code written for those engines generally work unchanged, while Aurora's engine underneath handles storage, replication, and crash recovery differently (and generally faster) than the open-source engines it is compatible with. Aurora supports up to 15 read replicas (compared to fewer for standard RDS engines on some engines), and any Aurora Replica can also serve as a failover target — Aurora failover is typically faster than standard RDS Multi-AZ failover because there's no need to re-attach a large storage volume, just point traffic at an instance that already has access to the shared storage.\n\nFor the exam, the key comparison is: Aurora vs RDS is about performance, scalability, and faster read replicas/failover on the SAME relational data model; Aurora vs DynamoDB is a completely different comparison of relational vs NoSQL. If a scenario says \"needs a cloud-native, high-performance relational database with fast read scaling and minimal replication lag,\" that is pointing at Aurora over standard RDS. If a scenario says \"needs the highest possible throughput on MySQL/PostgreSQL with the least operational tuning,\" that is also Aurora. Aurora also offers a Global Database feature for cross-Region disaster recovery and low-latency global reads, and Aurora Serverless (a separate lesson) for on-demand autoscaling capacity.",
    taglishExplanation:
      "Si Aurora ay parang \"pinaupgrade\" na version ng RDS na ginawa mismo ni AWS para sa cloud. MySQL-compatible o PostgreSQL-compatible siya, kaya halos parehas lang gamitin sa existing code mo, pero mas mabilis at mas iba ang architecture sa ilalim — hiwalay ang storage sa compute, at automatic na na-replicate ang storage sa 6 na lugar sa 3 AZs. Dahil shared ang storage, mas mabilis gumawa ng bagong reader (Aurora Replica) kumpara sa traditional RDS Read Replica, at mas mabilis din ang failover dahil hindi na kailangan i-attach ulit ang buong storage. Sa exam, kung sinabi nilang \"cloud-native,\" \"mas mabilis na read scaling,\" o \"pinaka-mataas na throughput sa MySQL/PostgreSQL,\" Aurora ang hint na yan kumpara sa plain RDS.",
    analogy:
      "Standard RDS is like each restaurant branch having its own private kitchen and its own food storage — if you want a new branch, you have to build and stock a whole new kitchen (copy all the data). Aurora is like all branches sharing one giant, automatically-replicated central pantry — opening a new branch (adding a reader) just means adding a serving counter that reaches into the same pantry, which is much faster than building a whole new kitchen from scratch.",
    whyItExists:
      "Traditional relational database engines were designed decades ago for single-server hardware, not for elastic cloud infrastructure. Aurora exists because AWS re-engineered the storage and replication layer from scratch to take advantage of the cloud — distributed, self-healing, automatically-replicated storage — while keeping wire compatibility with MySQL and PostgreSQL so customers don't have to rewrite their applications to get the benefit.",
    flow: "Application -> Aurora Cluster Endpoint (writer) -> Writer instance -> Shared distributed storage volume (6 copies / 3 AZs) <- Aurora Replicas (readers, same storage)",
    withoutIt: [
      "You would use standard RDS engines with per-instance storage, meaning slower replica creation and slower failover",
      "You would need to manage read scaling with replicas that fully copy data asynchronously, with more replication lag",
      "You would not get Aurora-specific features like Aurora Global Database or Aurora Serverless",
    ],
    bestUseCases: [
      "High-throughput relational workloads needing MySQL or PostgreSQL compatibility",
      "Applications needing fast read scaling with many low-lag read replicas",
      "Workloads needing fast, reliable failover with minimal downtime",
      "Global applications needing cross-Region read replicas or disaster recovery (Aurora Global Database)",
      "Teams migrating from commercial databases wanting open-engine compatibility with better cloud performance",
    ],
    poorUseCases: [
      "Very simple, low-traffic databases where standard RDS is simpler and cheaper",
      "Non-relational access patterns better suited to DynamoDB",
      "Workloads needing engines Aurora does not support (e.g. SQL Server, Oracle) — use standard RDS",
    ],
    alternatives: [
      { need: "Simpler/cheaper standard relational engine incl. Oracle/SQL Server", choose: "Amazon RDS" },
      { need: "On-demand autoscaling relational capacity for intermittent workloads", choose: "Aurora Serverless" },
      { need: "Massive-scale key-value/document workload", choose: "Amazon DynamoDB" },
      { need: "Cross-Region active-active reads at global scale outside relational model", choose: "DynamoDB Global Tables" },
    ],
    keyFeatures: [
      "Distributed, self-healing storage automatically replicated 6 ways across 3 AZs",
      "MySQL- and PostgreSQL-compatible engines",
      "Up to 15 low-latency Aurora Replicas sharing the same underlying storage",
      "Fast failover — any Aurora Replica can become the new writer quickly since storage is already shared",
      "Aurora Global Database for cross-Region disaster recovery and low-latency global reads",
      "Backtrack (on some engine versions) to rewind a database to an earlier point without a full restore",
      "Aurora Serverless option for automatic capacity scaling",
    ],
    availability:
      "Aurora storage is automatically replicated across 3 Availability Zones (6 copies) regardless of how many reader instances you run, giving strong built-in durability. For compute-level high availability, Aurora Replicas across AZs can be promoted to writer during a failure, and this promotion is typically faster than a traditional RDS Multi-AZ failover since the new writer already has access to the shared storage volume. Aurora Global Database extends this to cross-Region disaster recovery with typically low replication lag to secondary Regions.",
    security:
      "Same security model as RDS: deploy inside a VPC with security groups controlling access, prefer private subnets for production, encrypt at rest with KMS, encrypt in transit with SSL/TLS, and use IAM database authentication or Secrets Manager-managed credentials instead of hardcoded passwords.",
    pricingLogic:
      "You pay for Aurora instance hours (by instance class) for the writer and any reader instances, plus storage consumed (Aurora storage scales automatically and is billed per GB actually used, plus I/O requests), plus backup storage and data transfer. There is no need to pre-provision a fixed storage size the way you might with standard RDS. Aurora Serverless bills by capacity units consumed instead of fixed instance hours.",
    examKeywords: [
      "MySQL-compatible",
      "PostgreSQL-compatible",
      "cloud-native relational database",
      "distributed storage",
      "fast failover",
      "Aurora Replica",
      "Aurora Global Database",
      "higher throughput than RDS",
    ],
    examTraps: [
      "Assuming Aurora and RDS are entirely separate services — Aurora is actually a database engine option offered through the RDS console/API.",
      "Choosing standard RDS when the scenario emphasizes \"fastest possible read replica creation\" or \"minimal failover downtime\" — that phrasing favors Aurora.",
      "Forgetting Aurora does not support every engine RDS supports (no Oracle/SQL Server on Aurora) — if the scenario requires those, standard RDS is correct.",
      "Confusing Aurora's storage-level replication (always on, 6 copies/3 AZs) with the separate concept of Aurora Replicas (compute-level readers you explicitly add).",
    ],
    architectureDiagram:
      "App\n |\n Aurora Cluster Endpoint\n |\n Writer instance --- Reader instance(s)\n        \\              /\n     Shared distributed storage\n      (6 copies across 3 AZs)",
    architectureCaption:
      "Aurora's storage layer is shared and always multi-AZ; readers attach to the same storage instead of copying it, which is why they spin up and fail over faster than standard RDS replicas.",
    mentorTip:
      "When a question pits Aurora against plain RDS and mentions speed of replicas, failover time, or throughput, Aurora wins. When it mentions an engine Aurora doesn't support, or it's a small/simple/cost-sensitive workload with no special performance ask, plain RDS can still be the right, simpler answer.",
    questionIds: [
      "q-amazon-aurora-1",
      "q-amazon-aurora-2",
      "q-amazon-aurora-3",
      "q-amazon-aurora-4",
      "q-amazon-aurora-5",
    ],
  },
  {
    id: "amazon-aurora-serverless",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "Amazon Aurora Serverless",
    shortName: "Aurora Serverless",
    tier: 2,
    domains: [3, 4],
    examImportance: "high",
    oneLiner:
      "Aurora Serverless automatically starts, scales, and pauses database capacity on demand, making it a good fit for variable, intermittent, or unpredictable relational workloads.",
    englishExplanation:
      "Aurora Serverless is a deployment option for Aurora where you do not choose and manage a fixed instance size. Instead, the database automatically scales compute capacity up and down (measured in Aurora Capacity Units) based on actual load, and for intermittent workloads it can scale down to a minimum and, depending on configuration, pause entirely when there is no activity, resuming automatically when a new connection or query comes in. This removes the guesswork of instance-size capacity planning for applications whose traffic is unpredictable, infrequent, or has long idle periods.\n\nThe classic exam scenarios for Aurora Serverless are: a development/test database that is only used during work hours and should not incur cost overnight or on weekends; a new application with unpredictable or unknown traffic patterns where over-provisioning a fixed instance would waste money and under-provisioning would cause performance problems; and infrequently-used applications (e.g., an internal reporting tool used once a month). The trade-off versus a fixed-capacity Aurora or RDS instance is that a fully scaled-down/paused database has a cold-start delay when it needs to resume, which makes it a poor fit for latency-sensitive, constantly-active production workloads with steady traffic — for those, a provisioned Aurora or RDS instance (possibly with Reserved Instance pricing) is more predictable and cost-effective.",
    taglishExplanation:
      "Si Aurora Serverless ay parang \"on-demand\" na version ng Aurora — hindi mo na pipiliin ang laki ng instance, automatic na siyang mag-a-adjust ng capacity depende sa traffic, at pwede pa ngang mag-pause kung walang gumagamit, tapos gigising ulit pag may bagong request. Perfect ito para sa dev/test environments na ginagamit lang sa office hours, o mga app na hindi mo alam kung gaano kalaki ang magiging traffic. Ang bentahang alalahanin: kapag na-pause siya, may konting delay (cold start) pag nag-resume — kaya hindi ito magandang piliin kung kailangan mo ng laging mabilis at steady na performance.",
    analogy:
      "A fixed Aurora/RDS instance is like renting a full-time employee who is paid whether or not there's work to do. Aurora Serverless is like an on-call contractor who only gets paid (and only shows up) when there's actual work, but needs a few minutes' notice to show up if they've been completely idle for a while — great for unpredictable or occasional work, less ideal if you need someone standing at the counter every second of the day.",
    whyItExists:
      "Many real applications do not have steady, predictable traffic — dev/test databases, new products validating demand, and internal tools all have long idle periods punctuated by bursts of activity. Provisioning a fixed instance for the peak wastes money during idle time, and provisioning for the average risks poor performance during bursts. Aurora Serverless exists to remove that capacity-planning trade-off for relational workloads.",
    flow: "Application connects -> Aurora Serverless endpoint -> capacity scales up automatically to meet load -> capacity scales down (or pauses) automatically when load drops",
    withoutIt: [
      "You would need to manually estimate and provision a fixed instance size for unpredictable workloads",
      "You would pay for idle capacity during long periods of low or no traffic",
      "You would need to manually resize instances up/down in response to traffic changes, or build your own automation to do so",
    ],
    bestUseCases: [
      "Development and test databases with irregular, business-hours-only usage",
      "New applications with unknown or highly variable traffic patterns",
      "Infrequently used applications (e.g., monthly reporting) where paying for an always-on instance is wasteful",
    ],
    poorUseCases: [
      "Steady-state, latency-sensitive production workloads where a cold start would violate SLAs",
      "Workloads with well-understood, consistent traffic where Reserved Instance pricing on provisioned Aurora is more cost-effective",
      "Very high, constant throughput workloads where a fixed, tuned instance performs more predictably",
    ],
    alternatives: [
      { need: "Steady, predictable relational workload", choose: "Provisioned Amazon Aurora or RDS" },
      { need: "Non-relational workload with on-demand scaling", choose: "Amazon DynamoDB on-demand capacity" },
      { need: "Fully serverless compute paired with a database", choose: "AWS Lambda + Aurora Serverless / RDS Proxy" },
    ],
    keyFeatures: [
      "Automatic scaling of compute capacity (Aurora Capacity Units) based on load",
      "Ability to scale down to a minimum, and pause entirely during inactivity (configuration-dependent)",
      "Automatic resume when new connections/queries arrive after a pause",
      "Same underlying Aurora storage engine and MySQL/PostgreSQL compatibility",
    ],
    availability:
      "Built on the same distributed, multi-AZ Aurora storage layer, so durability characteristics are similar to provisioned Aurora. Cold-start/resume time after a pause is the key availability trade-off to weigh against a constantly-provisioned instance.",
    security:
      "Same VPC, security group, KMS encryption-at-rest, and IAM authentication model as standard Aurora — Aurora Serverless does not change the security posture, only the capacity management model.",
    pricingLogic:
      "Billed per Aurora Capacity Unit-second actually consumed rather than a flat instance-hour rate, plus storage. This means cost tracks actual usage closely — near-zero cost while paused or idle, and cost that rises only when load rises — which is why it fits spiky/intermittent workloads better than a fixed instance that costs the same whether busy or idle.",
    examKeywords: [
      "variable workload",
      "unpredictable traffic",
      "intermittent usage",
      "scales to zero",
      "pause and resume",
      "dev/test database",
      "on-demand database capacity",
    ],
    examTraps: [
      "Picking Aurora Serverless for a steady, high-throughput, latency-sensitive production workload — the cold-start risk makes provisioned Aurora the better fit there.",
      "Forgetting that Aurora Serverless is still relational — if the scenario actually needs NoSQL scale, DynamoDB on-demand is the better parallel concept.",
      "Assuming Aurora Serverless is always cheaper — for constant, predictable high load, a provisioned instance (especially Reserved) can be cheaper.",
    ],
    architectureDiagram:
      "Application\n  |\n Aurora Serverless endpoint\n  |\n Capacity: [idle/paused] --burst--> [scaled up] --quiet--> [scaled down/paused]",
    architectureCaption:
      "Capacity tracks load automatically — rising during bursts and shrinking (or pausing) during idle periods, unlike a fixed-size provisioned instance.",
    mentorTip:
      "Keyword-match \"unpredictable,\" \"intermittent,\" \"dev/test,\" or \"infrequent\" traffic on a relational workload to Aurora Serverless. Keyword-match \"steady,\" \"constant,\" or \"predictable high throughput\" to provisioned Aurora/RDS instead.",
    questionIds: [
      "q-amazon-aurora-serverless-1",
      "q-amazon-aurora-serverless-2",
      "q-amazon-aurora-serverless-3",
    ],
  },
  {
    id: "amazon-dynamodb",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "Amazon DynamoDB",
    shortName: "DynamoDB",
    tier: 1,
    domains: [2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "Amazon DynamoDB is a fully managed, serverless NoSQL key-value and document database built for single-digit-millisecond performance at virtually any scale.",
    englishExplanation:
      "DynamoDB stores data as items (roughly analogous to rows) grouped into tables, but unlike a relational database it does not enforce a fixed schema across items and it is not designed for multi-table joins. Every table has a primary key, which is either a simple primary key (just a Partition Key) or a composite primary key (Partition Key + Sort Key). The Partition Key determines which physical partition an item lives on — DynamoDB hashes it to spread data (and traffic) across partitions, which is exactly how it achieves massive, near-linear scalability. The Sort Key, when present, lets you store multiple related items under the same partition key and query/sort a range of them efficiently — e.g., PartitionKey = CustomerId, SortKey = OrderDate lets you fetch \"all of this customer's orders, sorted by date\" extremely efficiently.\n\nDesigning a good DynamoDB table starts from your ACCESS PATTERNS, not your data model — this is the single biggest mental shift coming from relational databases. You ask \"what queries will my application actually run?\" first, and design the partition/sort keys (and any secondary indexes) around those exact queries, because DynamoDB does not support arbitrary ad hoc joins efficiently the way SQL does. A Global Secondary Index (GSI) lets you query the table using a different partition/sort key combination than the base table's, and can be added or removed at any time; a Local Secondary Index (LSI) shares the base table's partition key but offers an alternate sort key, and must be defined at table creation time.\n\nDynamoDB offers two capacity modes: On-Demand, where you pay per request and DynamoDB handles scaling automatically — ideal for unpredictable or spiky traffic — and Provisioned, where you specify read/write capacity units ahead of time (optionally with Auto Scaling to adjust within a range) — often more cost-effective for steady, predictable traffic. DynamoDB Accelerator (DAX) is an optional in-memory cache that sits in front of DynamoDB for microsecond read latency on repeated reads. Time to Live (TTL) automatically expires and deletes items after a timestamp you set, which is great for session data or temporary records without needing your own cleanup job. DynamoDB Streams captures a time-ordered sequence of item-level changes, which you can process with Lambda to trigger workflows (e.g., updating a search index, sending notifications). Global Tables extend a table across multiple Regions with active-active, multi-Region replication for low-latency global reads and writes and for disaster recovery. On-demand and continuous backups (point-in-time recovery) are both available. Realistic use cases the exam loves: a shopping cart (PartitionKey = UserId), a gaming leaderboard (needs fast, sorted reads of top scores), a session store (fast key lookups, often paired with TTL), and IoT device metadata (huge write volume, simple key-based lookups per device).",
    taglishExplanation:
      "Si DynamoDB ay NoSQL key-value/document database — walang mahigpit na schema, at hindi ito ginawa para sa complicated JOINs gaya ng SQL. Ang bawat table ay may Partition Key (kung saan ipapasok ang item sa partitions) at optional na Sort Key (para maka-store ka ng maraming related items sa parehong partition key, tapos ma-sort/query mo sila by range — halimbawa, CustomerId bilang partition key at OrderDate bilang sort key para makuha lahat ng orders ng customer na naka-sort by date). Ang malaking difference sa mindset kumpara sa relational: sa DynamoDB, dapat mo munang tanungin \"anong queries ang gagawin ko?\" bago mo idisenyo ang table — kasi hindi siya magaling sa random na JOIN queries.\n\nMayroong dalawang capacity mode: On-Demand (bayad ka per request, automatic ang scaling — maganda kapag hindi mo alam ang magiging traffic) at Provisioned (nagse-set ka ng read/write capacity, mas mura kung steady ang traffic). May GSI (Global Secondary Index — pwede ka mag-query gamit ibang key combination, anytime pwede idagdag) at LSI (Local Secondary Index — parehas na partition key pero ibang sort key, dapat naka-set up agad sa paggawa ng table). May TTL para automatic mag-expire ng data (session store), May Streams para makapag-trigger ng Lambda sa bawat pagbabago, at may Global Tables para sa multi-Region active-active replication.",
    analogy:
      "DynamoDB is like a massive wall of labeled lockers (partitions) in a huge building. The Partition Key tells you exactly which section of lockers to walk to — that's why lookups are so fast even with millions of lockers, you never have to search the whole building. The Sort Key is like having several numbered compartments inside one locker (e.g., one customer's orders), letting you grab a specific range of them quickly. But you can't easily ask the whole building \"show me every locker containing a red item\" (an arbitrary ad hoc query) — you'd need to have planned for that by keeping a separate directory (a Global Secondary Index) in advance.",
    whyItExists:
      "Relational databases struggle to scale horizontally for extremely high-throughput, simple-access-pattern workloads — sharding a relational database yourself is hard, and joins do not scale linearly across shards. DynamoDB exists to give applications virtually unlimited, predictable-latency scale for the (very common) case where you know your access patterns in advance and don't need complex ad hoc joins — trading relational flexibility for massive, fully managed scalability with no servers to patch or manage.",
    flow: "Application -> DynamoDB API (GetItem/PutItem/Query) -> Partition Key hashed -> routed to correct partition -> (optional) DAX cache in front for hot reads -> (optional) Streams trigger Lambda on changes",
    withoutIt: [
      "You would need to manually shard a relational database to reach similar scale, which is complex and error-prone",
      "You would be responsible for capacity planning, patching, and replication of a self-managed NoSQL cluster",
      "You would lose native features like TTL-based expiry, Streams-driven event processing, and Global Tables replication",
    ],
    bestUseCases: [
      "Shopping carts and e-commerce order data with simple, known access patterns",
      "Gaming leaderboards needing fast, sorted reads at massive concurrency",
      "Session stores needing millisecond lookups and automatic expiry via TTL",
      "IoT device metadata and telemetry with huge write throughput and simple per-device lookups",
      "Any workload needing single-digit-millisecond latency at unpredictable or massive scale with minimal operations",
    ],
    poorUseCases: [
      "Applications needing complex ad hoc multi-table joins or flexible reporting queries",
      "Workloads requiring full ACID transactions across many unrelated tables in complex ways (DynamoDB does support limited transactions, but it is not built for complex relational transaction logic)",
      "Small applications where the team already has strong relational/SQL skills and no scale requirement",
    ],
    alternatives: [
      { need: "Complex joins and ad hoc SQL reporting", choose: "Amazon RDS or Aurora" },
      { need: "Sub-millisecond caching layer in front of a database", choose: "Amazon ElastiCache or DynamoDB DAX" },
      { need: "MongoDB-compatible document database with a different data model", choose: "Amazon DocumentDB" },
      { need: "Graph relationship queries", choose: "Amazon Neptune" },
    ],
    keyFeatures: [
      "Partition Key (simple) or Partition Key + Sort Key (composite) primary keys",
      "On-Demand and Provisioned (with optional Auto Scaling) capacity modes",
      "Global Secondary Index (GSI) and Local Secondary Index (LSI) for alternate query patterns",
      "Time to Live (TTL) for automatic item expiry",
      "DynamoDB Streams for event-driven processing of item-level changes",
      "DynamoDB Accelerator (DAX) for microsecond in-memory read caching",
      "Global Tables for multi-Region, active-active replication",
      "On-demand backups and continuous backups with point-in-time recovery",
    ],
    availability:
      "DynamoDB automatically replicates data across multiple Availability Zones within a Region for durability and availability with no configuration required from you — this is fundamentally different from RDS where you must explicitly enable Multi-AZ. For multi-Region resilience and low-latency global access, Global Tables provide active-active replication across chosen Regions.",
    security:
      "Access is controlled through IAM policies, which can be scoped down to the item/attribute level using fine-grained access control (useful for giving end users direct, safe access to only their own items). Encryption at rest is enabled by default using AWS KMS. VPC endpoints allow private access from within a VPC without traversing the public internet.",
    pricingLogic:
      "On-Demand mode charges per read/write request actually made, with no capacity planning needed — best for unpredictable or spiky traffic. Provisioned mode charges for the read/write capacity units you configure (optionally with Auto Scaling to adjust the provisioned amount within limits you set), which is typically cheaper for steady, predictable traffic. Storage, backups, Streams, DAX, and Global Tables replication are billed separately.",
    examKeywords: [
      "key-value",
      "NoSQL",
      "partition key",
      "sort key",
      "single-digit millisecond",
      "on-demand capacity",
      "GSI",
      "LSI",
      "TTL",
      "DynamoDB Streams",
      "Global Tables",
      "DAX",
    ],
    examTraps: [
      "Designing a DynamoDB table around the data model (like a relational ERD) instead of around access patterns — the exam rewards access-pattern-first thinking.",
      "Confusing GSI (different partition+sort key, can be added anytime) with LSI (same partition key, alternate sort key, must be created at table creation).",
      "Assuming DynamoDB is bad at scale-related availability — it actually replicates across AZs by default, no \"Multi-AZ\" toggle needed.",
      "Reaching for DynamoDB when the scenario clearly needs complex joins or ad hoc SQL reporting — that is a relational (RDS/Aurora) or warehouse (Redshift) signal instead.",
      "Forgetting DAX is a DynamoDB-specific cache (API-compatible with DynamoDB) — it is not the same as ElastiCache, which sits in front of other data sources generically.",
    ],
    architectureDiagram:
      "Application\n  |\n DynamoDB API\n  |\n Partition Key hash --> Partition A / B / C ... (auto-sharded, auto-replicated across AZs)\n  |\n (optional) DAX cache in front\n  |\n (optional) Streams --> Lambda --> downstream processing",
    architectureCaption:
      "DynamoDB automatically shards by partition key and replicates across AZs — there is no server to size, patch, or fail over manually.",
    mentorTip:
      "When you see \"massive scale,\" \"unpredictable traffic,\" \"single-digit millisecond,\" \"serverless,\" or \"key-value access pattern\" together in a scenario, DynamoDB is almost always the answer. When you see \"joins,\" \"complex relational queries,\" or \"ad hoc reporting,\" it almost never is.",
    questionIds: [
      "q-amazon-dynamodb-1",
      "q-amazon-dynamodb-2",
      "q-amazon-dynamodb-3",
      "q-amazon-dynamodb-4",
      "q-amazon-dynamodb-5",
    ],
  },
  {
    id: "amazon-elasticache",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "Amazon ElastiCache",
    shortName: "ElastiCache",
    tier: 1,
    domains: [3],
    examImportance: "high",
    oneLiner:
      "Amazon ElastiCache is a managed in-memory data store (Redis/Valkey or Memcached) used to cache frequently accessed data and dramatically reduce read load and latency on a primary database.",
    englishExplanation:
      "ElastiCache provides a managed, in-memory key-value store that sits in front of (or alongside) a primary database to serve extremely fast reads for data that is requested often and does not need to be recalculated or re-fetched from the primary store every time. Because it is in-memory rather than disk-based, ElastiCache delivers microsecond-to-low-millisecond latency, far faster than even a well-tuned relational or NoSQL database on disk-backed storage.\n\nElastiCache supports two engines with different trade-offs. Redis (and its open-source-compatible fork, Valkey) supports rich data structures (lists, sets, sorted sets, hashes), persistence (so data can survive a restart), replication for read scaling, and built-in high availability through Multi-AZ with automatic failover. Memcached is simpler — a straightforward, multi-threaded, in-memory key-value cache with no persistence and no built-in replication/failover — it is a good fit when you need the simplest possible caching layer and don't need Redis's advanced features. The exam usually signals Redis when a scenario mentions leaderboards, pub/sub, persistence, or high availability requirements for the cache itself, and signals Memcached when it emphasizes simplicity or the ability to scale out horizontally by simply adding nodes with a simple partitioning scheme.\n\nThe most commonly tested application pattern is cache-aside (also called lazy loading): the application first checks the cache for the data; on a cache hit, it returns the cached value immediately; on a cache miss, it fetches from the primary database, returns the result to the caller, AND writes it into the cache so the next request for the same key is a hit. This pattern trades a small amount of staleness risk (the cache can serve slightly out-of-date data until it expires or is invalidated) for a large reduction in load on the primary database and much faster response times. ElastiCache is also commonly used for session state storage (so any web server in a fleet can retrieve a user's session, making the web tier stateless) — a very common SAA scenario about horizontally scaled, stateless EC2 fleets.",
    taglishExplanation:
      "Si ElastiCache ay parang \"quick-access memory\" na nasa harap ng database mo — instead na laging bumalik sa database (na mas mabagal dahil nasa disk), kinukuha muna sa in-memory cache kung nandun na ang sagot. Meron siyang dalawang engine choices: Redis (o Valkey) na may advanced features gaya ng persistence, replication, at automatic failover — maganda para sa leaderboards, pub/sub, at kailangan ng high availability; at Memcached na mas simple, walang persistence, walang built-in replication — maganda kung gusto mo lang ng pinaka-simpleng caching layer.\n\nAng pinaka-common na pattern dito ay \"cache-aside\": kapag humingi ng data ang application, tinitingnan muna ang cache — kung nandun na (cache hit), ibinabalik agad; kung wala pa (cache miss), kukunin muna sa database, ibabalik sa caller, TAPOS isasave sa cache para sa susunod na request. Ginagamit din ito para sa session storage — para ang mga EC2 servers mo ay \"stateless\" (kahit anong server ang tumamaan ng request ng user, makukuha nila ang session data mula sa shared cache).",
    analogy:
      "ElastiCache is like keeping a small notepad of frequently-asked answers on your desk instead of walking to the filing room (the database) every single time someone asks you the same question. Redis is a well-organized notepad with sections, a backup copy, and a buddy who can take over if you step away (persistence, replication, failover). Memcached is a plain sticky-note pad — fast and simple, but if it falls off the desk (restarts), the notes are just gone, and there's no buddy system.",
    whyItExists:
      "Even a well-tuned database has a floor on latency because it ultimately reads from disk (or does real computation) for many requests, and repeatedly serving the exact same popular data from the primary database wastes capacity that could serve unique requests instead. ElastiCache exists to intercept the repeated, predictable portion of read traffic in memory, protecting the primary database from load spikes and delivering much faster responses for the data that is requested over and over.",
    flow: "Application -> Check ElastiCache -> Hit: return cached value | Miss: query primary database -> return result -> write result into ElastiCache for next time",
    withoutIt: [
      "Every read, even for extremely popular/repeated data, would hit the primary database, increasing load and cost",
      "Response latency for read-heavy workloads would be higher since disk-backed databases are slower than in-memory access",
      "You would need to build your own session storage mechanism to keep a horizontally scaled web tier stateless",
    ],
    bestUseCases: [
      "Caching frequently-read, expensive-to-compute, or expensive-to-query database results (cache-aside pattern)",
      "Storing session state for a horizontally scaled, stateless web/app tier",
      "Real-time leaderboards and counters (Redis sorted sets)",
      "Reducing read load on RDS/Aurora/DynamoDB during traffic spikes",
    ],
    poorUseCases: [
      "Using ElastiCache as your only/primary durable data store — it is a cache/supplement, not a system of record",
      "Data that changes constantly with no tolerance for even brief staleness and no invalidation strategy",
      "Simple applications with low read volume where the operational overhead of a cache isn't justified",
    ],
    alternatives: [
      { need: "In-memory cache specifically API-compatible with and layered directly on DynamoDB", choose: "DynamoDB Accelerator (DAX)" },
      { need: "Durable primary relational data store", choose: "Amazon RDS or Aurora" },
      { need: "Durable primary NoSQL data store", choose: "Amazon DynamoDB" },
    ],
    keyFeatures: [
      "Redis/Valkey engine: rich data structures, persistence, replication, Multi-AZ automatic failover, pub/sub",
      "Memcached engine: simple, multi-threaded, no persistence, no built-in replication/failover, easy horizontal node scaling",
      "Cache-aside (lazy loading) is the most common application-level caching pattern used with ElastiCache",
      "Can offload read traffic from RDS, Aurora, or DynamoDB",
      "Commonly used for session state storage to keep application servers stateless",
    ],
    availability:
      "Redis supports replication with read replicas and Multi-AZ with automatic failover to a replica if the primary node fails, similar in spirit to RDS Multi-AZ. Memcached has no built-in replication or failover — nodes are independent, and losing a node loses the data cached on it (which is acceptable since Memcached is meant purely as a rebuildable cache, not a source of truth).",
    security:
      "ElastiCache clusters run inside a VPC and are secured with security groups; Redis supports encryption at rest and in transit plus Redis AUTH (password) and, on some setups, IAM authentication for access control. Because a cache typically holds a copy of sensitive application data, it should never be placed in a publicly reachable subnet.",
    pricingLogic:
      "You pay for node hours based on node type and the number of nodes/shards in your cluster, plus data transfer. Because ElastiCache instances are billed similarly to compute (per node-hour) rather than per-request, cost scales with cluster size rather than traffic volume — an important contrast to DynamoDB's per-request pricing.",
    examKeywords: [
      "in-memory cache",
      "microsecond/low-latency reads",
      "cache-aside",
      "lazy loading",
      "session store",
      "Redis",
      "Memcached",
      "offload read traffic",
    ],
    examTraps: [
      "Treating ElastiCache as a durable primary database — it is a cache; data can be lost, especially with Memcached which has no persistence.",
      "Picking Memcached when the scenario needs persistence, replication, or automatic failover — those are Redis-only capabilities.",
      "Confusing ElastiCache (a general-purpose cache in front of many kinds of data sources) with DAX (a cache specifically for DynamoDB).",
      "Forgetting that caching introduces potential staleness — a scenario demanding always-perfectly-fresh data needs careful invalidation, or may not be a good caching candidate at all.",
    ],
    architectureDiagram:
      "App servers (stateless)\n     |\n ElastiCache (Redis/Memcached)\n     |  (cache miss)\n     v\n  RDS / Aurora / DynamoDB (source of truth)",
    architectureCaption:
      "Cache-aside pattern: the app checks the cache first and only falls through to the primary database on a miss, then repopulates the cache.",
    mentorTip:
      "See \"reduce database load,\" \"session state for stateless web tier,\" or \"sub-millisecond repeated reads\" -> ElastiCache. Then decide Redis vs Memcached based on whether the scenario needs persistence/replication/failover (Redis) or just wants the simplest possible cache (Memcached).",
    questionIds: [
      "q-amazon-elasticache-1",
      "q-amazon-elasticache-2",
      "q-amazon-elasticache-3",
      "q-amazon-elasticache-4",
      "q-amazon-elasticache-5",
    ],
  },
  {
    id: "amazon-redshift",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "Amazon Redshift",
    shortName: "Redshift",
    tier: 2,
    domains: [3],
    examImportance: "high",
    oneLiner:
      "Amazon Redshift is a fully managed data warehouse built for fast analytical (OLAP) queries across very large historical datasets, using columnar storage and massively parallel processing.",
    englishExplanation:
      "Redshift is designed for online analytical processing (OLAP) — complex aggregate queries (SUM, AVG, GROUP BY, joins across huge fact/dimension tables) run against large volumes of historical data for business intelligence and reporting. This is a fundamentally different workload shape from online transaction processing (OLTP), which RDS and Aurora are optimized for: OLTP means many small, fast read/write transactions (an order being placed, a row being updated), while OLAP means fewer but much heavier read queries scanning millions or billions of rows to produce aggregated insights.\n\nRedshift achieves its analytical speed through columnar storage (data is stored column-by-column rather than row-by-row, so a query that only needs a few columns out of a wide table reads far less data from disk) and massively parallel processing (a query is split across multiple compute nodes that each scan their own slice of data in parallel, then results are combined). This is the opposite optimization from a row-oriented OLTP database, which is why you would never point your live order-processing traffic at Redshift, and why you would never try to run heavy historical BI reporting queries against your production RDS instance without risking degraded performance for real customers.\n\nThe classic decision point on the exam is: RDS/Aurora for transactional workloads, Redshift for data warehousing/BI, and Athena for ad hoc, serverless SQL queries directly against data already sitting in S3 without needing to load it into a warehouse first. If a scenario says \"the company wants to run complex analytical queries across years of historical sales data for a BI dashboard, and query performance on the live transactional database has degraded,\" that is a textbook Redshift signal — the fix is to move analytics OFF the OLTP database and INTO a purpose-built warehouse.",
    taglishExplanation:
      "Si Redshift ay data warehouse — ginawa siya para sa OLAP (online analytical processing): mabibigat na aggregate queries (SUM, GROUP BY, joins) sa napakaraming historical data, para sa BI reporting. Iba ito sa OLTP (online transaction processing) na siyang ginagawa ng RDS/Aurora — maliliit pero madalas na transactions gaya ng pag-order. Mabilis si Redshift dahil sa columnar storage (naka-store per column, hindi per row, kaya kung ilang columns lang ang kailangan ng query, konti lang babasahin) at massively parallel processing (hinahati ang query sa maraming compute nodes na sabay-sabay magbabasa).\n\nSa exam, tandaan mo: RDS/Aurora para sa transactional workloads, Redshift para sa data warehousing/BI, at Athena naman kung ad hoc SQL query lang sa data na nasa S3 na nang hindi kailangan i-load muna sa warehouse. Kung sinabing \"bumagal ang production database dahil sa mabibigat na reporting queries,\" ang tamang sagot ay ilipat ang analytics papunta sa Redshift.",
    analogy:
      "An OLTP database (RDS/Aurora) is like a cashier's till — fast, constant, small transactions (ring up one item, take payment, next customer). Redshift is like the head office's year-end financial analysis team — they don't care about ringing up individual sales, they care about crunching every receipt from the whole year to find patterns, and they're organized completely differently (by category/column across everything, not by individual receipt) to do that job fast.",
    whyItExists:
      "Running heavy analytical queries against a database tuned for many small transactions causes resource contention that slows down the live application, and row-oriented storage is inherently inefficient for queries that only need a few columns across huge tables. Redshift exists to give organizations a separate, purpose-built engine — with a storage layout and query engine optimized for scanning and aggregating huge datasets — without impacting live transactional systems.",
    flow: "OLTP databases / application logs / S3 -> ETL / data pipeline -> Redshift (columnar, MPP) -> BI tool (e.g., QuickSight) -> dashboards and reports",
    withoutIt: [
      "Analytical/BI queries would compete for resources with live transactional traffic on RDS/Aurora, degrading application performance",
      "Row-oriented storage would make wide-table, few-column analytical scans much slower and more expensive at scale",
      "You would need to build and maintain your own MPP query engine to get comparable analytical performance",
    ],
    bestUseCases: [
      "Business intelligence dashboards and reporting across large historical datasets",
      "Complex aggregate/analytical queries joining large fact and dimension tables",
      "Offloading analytics workloads from a transactional (OLTP) database to protect its performance",
    ],
    poorUseCases: [
      "Live transactional workloads (order processing, user logins) — use RDS/Aurora/DynamoDB instead",
      "Simple, occasional ad hoc queries directly on data already in S3 with no need for a persistent warehouse — Athena is simpler and cheaper",
      "Small datasets with no real analytical/aggregation requirement",
    ],
    alternatives: [
      { need: "Transactional relational workload", choose: "Amazon RDS or Aurora" },
      { need: "Ad hoc, serverless SQL directly on S3 data without a warehouse", choose: "Amazon Athena" },
      { need: "Big data processing/transformation pipelines", choose: "Amazon EMR" },
    ],
    keyFeatures: [
      "Columnar storage for efficient scanning of large, wide tables",
      "Massively parallel processing (MPP) across compute nodes",
      "Integrates with BI tools such as Amazon QuickSight",
      "Redshift Spectrum allows querying data directly in S3 without loading it into Redshift first",
      "Supports standard SQL for analytical querying",
    ],
    availability:
      "Redshift can be deployed with multiple nodes in a cluster; data is distributed across nodes, and snapshots (automated and manual) support backup and restore. Compared to OLTP databases, availability conversations for Redshift focus more on backup/restore and multi-node resilience than millisecond failover, since it serves analytical rather than always-on transactional traffic.",
    security:
      "Redshift clusters run inside a VPC with security group-controlled access; encryption at rest via KMS and encryption in transit via SSL are supported. IAM roles attached to a cluster can grant it permission to load data from S3 or interact with other AWS services as part of ETL pipelines.",
    pricingLogic:
      "You pay for compute node hours (based on node type and count in the cluster) and storage. Redshift Serverless (a newer consumption option) bills based on capacity actually used for queries, avoiding the need to manage fixed cluster sizing. Redshift Spectrum charges separately based on the amount of data scanned in S3.",
    examKeywords: [
      "data warehouse",
      "OLAP",
      "columnar storage",
      "massively parallel processing",
      "business intelligence",
      "analytical queries",
      "Redshift Spectrum",
    ],
    examTraps: [
      "Choosing Redshift for a transactional (OLTP) workload — it is not designed for many small, fast read/write transactions.",
      "Choosing Redshift when the scenario is really about simple, occasional ad hoc querying of S3 data — Athena is usually the simpler, cheaper answer there.",
      "Forgetting that running heavy BI queries directly against RDS/Aurora is itself an anti-pattern the exam likes to test — the fix is moving that workload to Redshift.",
    ],
    architectureDiagram:
      "OLTP DB / Logs / S3\n      |\n   ETL pipeline\n      |\n   Redshift (columnar, MPP cluster)\n      |\n  QuickSight / BI dashboards",
    architectureCaption:
      "Analytics workloads are pulled OUT of the transactional database and INTO Redshift so BI reporting never competes with live application traffic.",
    mentorTip:
      "See \"analytics,\" \"data warehouse,\" \"BI dashboard,\" or \"historical sales data\" together with complaints about a slow production database -> Redshift is the fix, not scaling up RDS.",
    questionIds: [
      "q-amazon-redshift-1",
      "q-amazon-redshift-2",
      "q-amazon-redshift-3",
    ],
  },
  {
    id: "amazon-documentdb",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "Amazon DocumentDB",
    shortName: "DocumentDB",
    tier: 2,
    domains: [3],
    examImportance: "medium",
    oneLiner:
      "Amazon DocumentDB is a fully managed, MongoDB-compatible document database for JSON-like document workloads.",
    englishExplanation:
      "DocumentDB stores data as flexible, JSON-like documents rather than rows-and-columns or strict key-value pairs, and it is designed to be compatible with MongoDB APIs and drivers, so applications already built against MongoDB can generally run against DocumentDB with minimal changes. This makes it distinct from DynamoDB in an important way for the exam: DynamoDB is AWS's own native NoSQL key-value/document service with its own API, while DocumentDB exists specifically to offer MongoDB compatibility for teams that already use MongoDB or need MongoDB's specific document query capabilities (like flexible nested-document queries) as a managed service without operating MongoDB themselves.\n\nDocumentDB is also architecturally similar to Aurora under the hood — it uses a distributed, auto-scaling, multi-AZ storage layer separate from compute — so it shares some of the same availability and read-scaling characteristics as Aurora, just exposed through a MongoDB-compatible document API instead of a SQL API. On the exam, the presence of the word \"MongoDB\" in a scenario is close to a direct pointer to DocumentDB; the presence of \"flexible JSON documents\" alone (without mentioning MongoDB) could point to either DocumentDB or DynamoDB, so look for compatibility requirements or existing MongoDB tooling/skills as the deciding factor.",
    taglishExplanation:
      "Si DocumentDB ay document database na MongoDB-compatible — kaya kung may existing application ka na gumagamit ng MongoDB, halos hindi mo na kailangan baguhin ang code para lumipat dito. Iba ito sa DynamoDB: si DynamoDB ay sariling NoSQL service ni AWS na may sariling API, habang si DocumentDB ay ginawa specifically para sa mga gustong mag-migrate mula sa o gumamit ng MongoDB-style na queries pero managed na ng AWS. Sa ilalim, halos parehas ang architecture nito sa Aurora — hiwalay ang storage sa compute, naka-distribute at multi-AZ.\n\nSa exam, kapag nabanggit ang \"MongoDB\" sa scenario, halos direct hint na yan papunta sa DocumentDB. Kapag \"flexible JSON documents\" lang ang sinabi nang walang MongoDB, pwedeng DocumentDB o DynamoDB pareho — tignan mo kung may existing MongoDB skills o tooling na dapat panatilihin.",
    analogy:
      "If DynamoDB is AWS's own home-grown filing system, DocumentDB is like AWS building a fully managed storage facility that still speaks the exact same \"language\" and follows the exact same filing rules as a popular third-party system (MongoDB) you already know how to use — so your existing staff (application code, drivers) don't need retraining to use it.",
    whyItExists:
      "Many teams already have applications and skills built around MongoDB's document model and query API. DocumentDB exists so those teams can get a fully managed, highly available database without operating MongoDB themselves, while keeping the same drivers, queries, and mental model they already use — avoiding a costly application rewrite that a move to a different NoSQL API (like DynamoDB's) would require.",
    flow: "Application (MongoDB driver) -> DocumentDB cluster endpoint -> compute instances -> distributed, multi-AZ storage layer",
    withoutIt: [
      "Teams with MongoDB-based applications would need to self-manage MongoDB on EC2, handling patching, backups, and replication themselves",
      "Migrating a MongoDB application to AWS without DocumentDB might force a costly rewrite to a different data model/API",
    ],
    bestUseCases: [
      "Migrating existing MongoDB workloads to a managed AWS service with minimal code changes",
      "Applications needing flexible, nested JSON document storage with MongoDB-style querying",
      "Content management, catalogs, and profile data with varying/nested attributes per record",
    ],
    poorUseCases: [
      "New applications with no MongoDB requirement — plain DynamoDB is usually simpler and more deeply AWS-native",
      "Workloads needing complex relational joins and ACID guarantees across many tables — use RDS/Aurora",
    ],
    alternatives: [
      { need: "AWS-native key-value/document NoSQL without MongoDB compatibility requirement", choose: "Amazon DynamoDB" },
      { need: "Relational workload with joins/ACID transactions", choose: "Amazon RDS or Aurora" },
      { need: "Cassandra-compatible wide-column workload", choose: "Amazon Keyspaces" },
    ],
    keyFeatures: [
      "MongoDB-compatible API and drivers",
      "Distributed, auto-scaling storage layer similar in architecture to Aurora",
      "Read replicas for read scaling within a cluster",
      "Automated backups and point-in-time recovery",
    ],
    availability:
      "DocumentDB storage is replicated across multiple Availability Zones automatically, and read replicas within a cluster can also serve as failover targets, similar in spirit to Aurora's architecture.",
    security:
      "Runs inside a VPC secured by security groups; supports encryption at rest via KMS and encryption in transit via TLS; IAM is used to control administrative access to the service itself, while database-level authentication is handled through DocumentDB's own user/role system compatible with MongoDB conventions.",
    pricingLogic:
      "You pay for compute instance hours, storage consumed (which scales automatically similar to Aurora), I/O requests, and backup storage beyond the included allotment.",
    examKeywords: [
      "MongoDB-compatible",
      "document database",
      "JSON documents",
      "managed MongoDB alternative",
    ],
    examTraps: [
      "Choosing DynamoDB when the scenario explicitly says \"MongoDB\" — that keyword points to DocumentDB.",
      "Assuming DocumentDB and DynamoDB are interchangeable — they have different APIs, compatibility goals, and underlying architectures.",
      "Forgetting DocumentDB is still NoSQL/document-oriented — it is not a fit for workloads that truly need relational joins and ACID transactions across many tables.",
    ],
    architectureDiagram:
      "App (MongoDB driver)\n  |\n DocumentDB cluster endpoint\n  |\n Compute instances (writer + readers)\n  |\n Distributed multi-AZ storage",
    architectureCaption:
      "DocumentDB mirrors Aurora's separated compute/storage design but speaks MongoDB's document API instead of SQL.",
    mentorTip:
      "Whenever \"MongoDB\" appears anywhere in the scenario text, treat it as a near-direct pointer to DocumentDB, the same way \"Cassandra\" points to Keyspaces.",
    questionIds: [
      "q-amazon-documentdb-1",
      "q-amazon-documentdb-2",
      "q-amazon-documentdb-3",
    ],
  },
  {
    id: "amazon-neptune",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "Amazon Neptune",
    shortName: "Neptune",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon Neptune is a fully managed graph database purpose-built for storing and rapidly querying highly connected data, such as social networks and fraud-detection networks.",
    englishExplanation:
      "Neptune stores data as nodes (entities) and edges (relationships between entities), and it is optimized for traversing those relationships quickly — answering questions like \"who is connected to whom, within how many hops\" — which relational databases handle poorly because deeply nested joins become slow and complex as the number of hops grows. Neptune supports popular graph query languages (such as Gremlin and openCypher, and it also supports the RDF/SPARQL model), letting you express relationship-heavy queries naturally.",
    taglishExplanation:
      "Si Neptune ay graph database — naka-store ang data bilang nodes (mga bagay/entities) at edges (koneksyon sa pagitan nila), at mabilis siyang mag-traverse ng relasyon, gaya ng \"sino-sino ang magkakaugnay, ilang hops lang ang layo.\" Mahirap gawin ito nang mabilis sa relational database dahil bumabagal ang maraming JOIN kapag lumalalim ang relasyon. Ginagamit ito sa social networks, fraud detection, at recommendation engines.",
    analogy:
      "A relational database mapping a social network is like tracing connections using a giant spreadsheet with lots of cross-references — doable for one or two hops, painfully slow for six. Neptune is like an actual wall of pins and strings (a literal graph) where you can visually follow a thread from person to person in one glance, no matter how many hops away.",
    whyItExists:
      "Highly connected data — social graphs, recommendation engines, fraud rings, knowledge graphs — becomes exponentially expensive to query with relational joins as relationship depth grows. Neptune exists to make those relationship-traversal queries fast and natural by storing the data in a graph-native structure instead of forcing it into tables.",
    flow: "Application -> Neptune (Gremlin/openCypher/SPARQL query) -> graph traversal across nodes and edges -> connected results",
    withoutIt: [
      "Multi-hop relationship queries would require deeply nested, slow joins in a relational database",
      "You would need to build and maintain your own graph-traversal logic on top of a non-graph data store",
    ],
    bestUseCases: [
      "Social networking features (friend-of-friend, mutual connections)",
      "Fraud detection by identifying suspicious rings of connected accounts/transactions",
      "Recommendation engines based on relationship proximity (\"customers who are connected to X also like Y\")",
    ],
    poorUseCases: [
      "Simple key-value lookups with no relationship-traversal requirement — DynamoDB is a better, simpler fit",
      "Standard transactional/tabular business data with no graph-shaped query pattern",
    ],
    alternatives: [
      { need: "Simple key-value or document access pattern", choose: "Amazon DynamoDB" },
      { need: "Transactional relational data with joins limited to a few known tables", choose: "Amazon RDS or Aurora" },
    ],
    keyFeatures: [
      "Purpose-built graph storage using nodes and edges",
      "Supports Gremlin, openCypher, and SPARQL query languages",
      "Managed backups and Multi-AZ deployment options for high availability",
    ],
    availability:
      "Neptune supports Multi-AZ deployments with read replicas, similar in spirit to RDS, giving failover and read-scaling options for graph workloads.",
    security:
      "Runs inside a VPC secured by security groups; supports encryption at rest via KMS and encryption in transit via TLS; IAM authentication is available for controlling access to the database.",
    pricingLogic:
      "You pay for instance hours (based on instance class) for the primary and any read replicas, plus storage consumed and I/O, similar to the Aurora/RDS billing model.",
    examKeywords: [
      "graph database",
      "nodes and edges",
      "relationships",
      "social graph",
      "fraud detection",
      "recommendation engine",
    ],
    examTraps: [
      "Picking a relational or key-value database for a clearly relationship-traversal-heavy scenario — that phrasing (\"who is connected to whom,\" \"fraud rings\") points to Neptune.",
      "Overusing Neptune for simple data with no real relationship-traversal need, where DynamoDB or RDS would be simpler and cheaper.",
    ],
    architectureDiagram:
      "Application\n  |\n Neptune (Gremlin/openCypher/SPARQL)\n  |\nNode --edge--> Node --edge--> Node (graph traversal)",
    architectureCaption:
      "Neptune stores and queries connections directly as a graph, avoiding the deep-join penalty relational databases pay for relationship-heavy queries.",
    mentorTip:
      "Recognition-level only: if the scenario is about relationships, connections, or networks of entities (social, fraud, recommendations), think Neptune first among the exam's database options.",
    questionIds: [
      "q-amazon-neptune-1",
      "q-amazon-neptune-2",
    ],
  },
  {
    id: "amazon-keyspaces",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "Amazon Keyspaces",
    shortName: "Keyspaces",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon Keyspaces (for Apache Cassandra) is a fully managed, wide-column, Cassandra-compatible database, mainly used to migrate or run existing Cassandra workloads on AWS without managing Cassandra clusters yourself.",
    englishExplanation:
      "Keyspaces is compatible with Apache Cassandra's Cassandra Query Language (CQL) and wide-column data model, so applications and tools already built for Cassandra can generally run against Keyspaces with minimal changes, while AWS manages the underlying infrastructure, scaling, and availability. Like DocumentDB's relationship to MongoDB, Keyspaces exists specifically for compatibility with an existing open-source ecosystem — the exam signal for Keyspaces is almost always the literal word \"Cassandra\" appearing in the scenario, most often in a migration context (\"the company currently runs a self-managed Cassandra cluster on EC2 and wants a managed alternative with minimal application changes\").",
    taglishExplanation:
      "Si Keyspaces ay managed at Cassandra-compatible na wide-column database — kaya kung may existing Cassandra application ka, halos hindi mo na kailangan baguhin ang code. Parang si DocumentDB para sa MongoDB, si Keyspaces naman ay para sa Cassandra. Sa exam, kapag nabanggit ang \"Cassandra,\" halos direct hint na yan papunta sa Keyspaces — lalo na kung migration scenario (\"self-managed Cassandra cluster papuntang managed AWS service\").",
    analogy:
      "Just as DocumentDB lets MongoDB users move to a managed AWS service without relearning their tools, Keyspaces lets Cassandra users do the same — same CQL query language and wide-column mental model, but AWS now handles the cluster operations behind the scenes.",
    whyItExists:
      "Teams running self-managed Apache Cassandra clusters (often on EC2) take on significant operational burden — node management, repairs, scaling. Keyspaces exists so those teams can migrate to a managed, serverless-scaling service while keeping their existing Cassandra Query Language code and drivers largely unchanged.",
    flow: "Application (Cassandra driver, CQL) -> Amazon Keyspaces -> managed wide-column storage, auto-scaling",
    withoutIt: [
      "Teams would need to self-manage Cassandra clusters on EC2, handling node repairs, scaling, and patching themselves",
      "Migrating away from Cassandra's data model entirely could require a costly application rewrite",
    ],
    bestUseCases: [
      "Migrating an existing self-managed Apache Cassandra workload to a managed AWS service",
      "New workloads where the team already has strong Cassandra/CQL skills and wants that data model",
    ],
    poorUseCases: [
      "New workloads with no Cassandra requirement — plain DynamoDB is usually simpler and more deeply AWS-native",
      "Workloads needing relational joins and ACID transactions — use RDS/Aurora instead",
    ],
    alternatives: [
      { need: "AWS-native key-value/document NoSQL without Cassandra compatibility requirement", choose: "Amazon DynamoDB" },
      { need: "MongoDB-compatible document workload", choose: "Amazon DocumentDB" },
      { need: "Relational workload with joins/ACID transactions", choose: "Amazon RDS or Aurora" },
    ],
    keyFeatures: [
      "Compatible with Apache Cassandra Query Language (CQL) and wide-column data model",
      "Serverless, automatic scaling of throughput and storage",
      "Point-in-time recovery and on-demand backups",
    ],
    availability:
      "Keyspaces automatically replicates data across multiple Availability Zones within a Region for durability and availability, without requiring manual cluster/replication management the way self-hosted Cassandra would.",
    security:
      "Access is controlled through IAM policies; encryption at rest is supported via KMS, and encryption in transit via TLS is supported for client connections.",
    pricingLogic:
      "Supports on-demand (pay-per-request) and provisioned capacity modes, similar in spirit to DynamoDB's pricing models, plus storage consumed.",
    examKeywords: [
      "Cassandra-compatible",
      "CQL",
      "wide-column",
      "managed Cassandra alternative",
    ],
    examTraps: [
      "Choosing DynamoDB when the scenario explicitly says \"Cassandra\" or \"CQL\" — that keyword points to Keyspaces.",
      "Assuming Keyspaces and DynamoDB are interchangeable — they target different compatibility ecosystems even though both are NoSQL.",
    ],
    architectureDiagram:
      "Application (CQL / Cassandra driver)\n  |\n Amazon Keyspaces\n  |\n Managed, auto-scaling wide-column storage (multi-AZ)",
    architectureCaption:
      "Keyspaces speaks Cassandra's own query language while AWS manages scaling, replication, and availability behind the scenes.",
    mentorTip:
      "Recognition-level only: whenever \"Cassandra\" or \"CQL\" appears in a scenario, especially in a migration context, think Keyspaces.",
    questionIds: [
      "q-amazon-keyspaces-1",
      "q-amazon-keyspaces-2",
    ],
  },
];
