import type { Lesson } from "@/lib/types";

export const deepDivesH: Lesson[] = [
  {
    id: "data-transfer-cost-optimization",
    moduleId: "phase-13-cost",
    category: "Cost Management",
    title: "Data Transfer Costs and Network Cost Optimization",
    shortName: "Data transfer costs",
    tier: 1,
    domains: [4, 3],
    examImportance: "high",
    oneLiner:
      "Data coming in is free, data moving out or across boundaries costs money, so keep traffic inside the AZ, use endpoints and cache at the edge.",
    englishExplanation:
      "AWS network pricing follows a few patterns that the exam tests repeatedly. Data transfer into AWS from the internet is free. Data going out to the internet is charged per GB, with cheaper tiers at higher volume. Traffic between resources in the same AZ using private IP addresses is free. Traffic between AZs in the same Region is charged in each direction, a small per-GB amount that adds up for chatty architectures. Traffic between Regions is charged per GB. Some paths are free, for example S3 to EC2 in the same Region, and S3 to CloudFront.\n\nTo reduce cost, shorten and simplify the path. Use private IPs rather than public or Elastic IPs for traffic inside the VPC, because traffic that leaves via a public address can be charged. Place tightly coupled components in the same AZ when availability permits, or accept the cross-AZ cost where resilience demands it. Use gateway VPC endpoints for S3 and DynamoDB, which are free, instead of sending that traffic through a NAT gateway that charges per GB processed. Interface endpoints (PrivateLink) have an hourly and per-GB charge but can still be cheaper than NAT for heavy AWS service traffic. Serve content through CloudFront, whose outbound rates are usually lower than direct egress and which reduces requests to the origin.\n\nOther levers include Direct Connect, which has lower data transfer out rates than the internet for steady large flows, compressing data before transfer, and choosing a single shared NAT gateway for a non-production environment (saving hourly cost, at the price of AZ resilience) versus one per AZ for production. Regional design matters too: keep data and compute in the same Region and replicate across Regions only when required. Use VPC Flow Logs, Cost Explorer and the Cost and Usage Report to find where data transfer charges come from.",
    taglishExplanation:
      "May ilang pattern ang presyo ng network sa AWS. Libre ang data na pumapasok sa AWS mula sa internet. May bayad kada GB ang lumalabas sa internet. Libre ang traffic sa parehong AZ gamit ang private IP. May bayad ang traffic sa pagitan ng AZ sa parehong Region, sa bawat direksyon, at may bayad din ang pagitan ng Region. Libre ang S3 papuntang EC2 sa parehong Region at S3 papuntang CloudFront. Para makatipid: gumamit ng private IP, gumamit ng gateway VPC endpoint para sa S3 at DynamoDB (libre) sa halip na NAT gateway na may bayad kada GB, gumamit ng CloudFront, at isaalang-alang ang Direct Connect para sa steady na malaking daloy. Para sa non-production, puwedeng isang NAT gateway lang.",
    analogy:
      "Toll roads. Entering the city is free, leaving it costs a toll, and driving between districts of the same city costs a small fee each way. Using a free local shortcut (a gateway endpoint) or a bus that carries many people at once (CloudFront) cuts the toll bill without changing where anyone goes.",
    whyItExists:
      "Network charges often become a surprising share of an AWS bill. Understanding the pricing boundaries lets architects avoid expensive paths without sacrificing resilience.",
    flow: "Identify traffic path (same AZ, cross-AZ, cross-Region, internet) -> pick cheapest path that meets requirements -> endpoints, CloudFront, private IPs -> verify with Cost Explorer and CUR",
    withoutIt: [
      "NAT gateway data processing charges would multiply for heavy S3 access",
      "Chatty cross-AZ traffic would add unexpected charges",
      "Content would be served directly from origins at higher egress cost",
    ],
    bestUseCases: [
      "Gateway endpoints for S3 and DynamoDB from private subnets",
      "CloudFront in front of S3 or an ALB to lower egress and origin load",
      "Private IP communication within a VPC",
      "Direct Connect for steady, large data transfer out",
      "Shared NAT gateway in non-production, per-AZ NAT in production",
    ],
    poorUseCases: [
      "Routing S3 traffic through a NAT gateway when a gateway endpoint is available",
      "Cross-Region replication of everything without a requirement",
      "Using public IPs for traffic between instances in the same VPC",
    ],
    alternatives: [
      { need: "Free private access to S3 or DynamoDB", choose: "Gateway VPC endpoint" },
      { need: "Private access to other AWS services", choose: "Interface VPC endpoint (PrivateLink)" },
      { need: "Cut internet egress for content", choose: "Amazon CloudFront" },
      { need: "Dedicated lower-cost steady transfer", choose: "AWS Direct Connect" },
    ],
    keyFeatures: [
      "Inbound from the internet is free",
      "Outbound to the internet charged per GB with volume tiers",
      "Same-AZ private IP traffic is free",
      "Cross-AZ and cross-Region traffic is charged",
      "S3 to CloudFront and same-Region S3 to EC2 are free",
      "NAT gateway charges hourly plus per GB processed",
      "Gateway endpoints are free, interface endpoints are charged",
    ],
    availability:
      "Cost choices can trade against resilience. A single NAT gateway or single-AZ placement saves money but adds a point of failure, so apply it to non-production.",
    security:
      "Endpoints keep traffic off the internet and let you attach endpoint policies, so cost savings and security usually align.",
    pricingLogic:
      "Think in boundaries: AZ, Region, internet. Each boundary crossed adds a charge, and the cheapest design crosses as few as the requirements allow. Check current prices for exact rates.",
    examKeywords: [
      "reduce data transfer costs",
      "NAT gateway cost",
      "gateway endpoint",
      "cross-AZ traffic",
      "egress",
      "CloudFront",
      "private IP",
    ],
    examTraps: [
      "A gateway endpoint for S3 is free, while a NAT gateway charges per GB processed.",
      "Gateway endpoints exist only for S3 and DynamoDB. Other services use interface endpoints.",
      "Data in is free, data out is charged. A question about ingestion cost rarely hinges on transfer charges.",
      "Cross-AZ traffic is charged even inside one Region.",
    ],
    architectureDiagram: `Private subnet EC2 --> [Gateway endpoint] --> S3         (free, no NAT charge)
Private subnet EC2 --> [NAT gateway] --> internet     (hourly + per-GB)
Users --> [CloudFront] --> origin (S3 to CloudFront transfer free)`,
    architectureCaption: "Same job, very different bills, depending on the path.",
    mentorTip:
      "When you see 'reduce network cost', trace the path and cross out the paid boundaries: NAT, cross-AZ, cross-Region, internet egress.",
    questionIds: [
      "q-data-transfer-cost-optimization-1",
      "q-data-transfer-cost-optimization-2",
      "q-data-transfer-cost-optimization-3",
    ],
  },
  {
    id: "database-migration-homogeneous-heterogeneous",
    moduleId: "phase-11-migration",
    category: "Migration and Transfer",
    title: "Database Migration: Homogeneous, Heterogeneous, DMS and the Schema Conversion Tool",
    shortName: "DB migration",
    tier: 1,
    domains: [3, 4],
    examImportance: "high",
    oneLiner:
      "Same-engine migrations only need data moved, different-engine migrations also need the schema converted, and DMS keeps the target in sync until you cut over.",
    englishExplanation:
      "A homogeneous migration keeps the same database engine, for example Oracle to Oracle on RDS or MySQL to Aurora MySQL. Often native tools such as dump and restore, replication or snapshots work, and AWS Database Migration Service (DMS) can move the data. A heterogeneous migration changes engine, for example Oracle to Aurora PostgreSQL or SQL Server to MySQL. The data types, stored procedures and schema differ, so you need two steps: convert the schema and code with the AWS Schema Conversion Tool (SCT) or DMS Schema Conversion, which also reports what cannot be converted automatically, and then move the data with DMS.\n\nDMS has a replication instance (an EC2 instance that runs the work), source and target endpoints, and a task. A task can do a full load of existing data, change data capture (CDC) that continuously replicates ongoing changes, or both. Full load plus CDC is the pattern for near-zero downtime: copy everything, keep applying changes, then cut the application over when the target is caught up. DMS supports many sources and targets, including targets such as S3, DynamoDB, Kinesis, Redshift and OpenSearch, which also makes it useful for loading data lakes. A Multi-AZ replication instance adds resilience, and data validation can check that rows match. The source usually needs logging enabled, such as binary logs for MySQL, so CDC can read changes.\n\nFor very large databases on slow links, SCT and DMS can be combined with an AWS Snowball Edge device: extract data to the device, ship it to AWS, then let DMS replicate the changes that arrived in the meantime. Babelfish for Aurora PostgreSQL lets applications written for SQL Server talk to Aurora PostgreSQL with fewer changes. The exam asks you to identify whether SCT is needed (only when engines differ) and how to minimise downtime (full load plus CDC).",
    taglishExplanation:
      "Ang homogeneous migration ay parehong engine, halimbawa Oracle papuntang Oracle sa RDS, kaya data lang ang inililipat gamit ang native tools o DMS. Ang heterogeneous ay magkaibang engine, halimbawa Oracle papuntang Aurora PostgreSQL, kaya kailangan munang i-convert ang schema at code gamit ang Schema Conversion Tool (SCT), tapos ilipat ang data gamit ang DMS. May replication instance, endpoints, at task ang DMS. Ang task ay puwedeng full load, change data capture (CDC), o pareho. Ang full load plus CDC ang pattern para sa halos walang downtime. Para sa napakalaking database sa mabagal na koneksyon, puwedeng gamitin ang Snowball Edge.",
    analogy:
      "Moving house. A homogeneous move is relocating to another house with identical wiring, so you just carry the furniture. A heterogeneous move is going to a country with different sockets and plumbing: first an electrician redraws the wiring plans (SCT), then the movers carry the furniture (DMS), and a courier keeps forwarding new mail until you have fully settled in (CDC).",
    whyItExists:
      "Organisations want to move to managed or open-source engines to cut licence cost and administration, and they need to do it without long outages.",
    flow: "Assess (SCT report) -> convert schema -> DMS full load -> CDC keeps target in sync -> validate -> cut over application",
    withoutIt: [
      "Cut-over would need a long downtime window while data is copied",
      "Schema and stored procedure conversion would be manual and error-prone",
      "Teams would not know how much of a heterogeneous migration is automatable",
    ],
    bestUseCases: [
      "Oracle or SQL Server to Aurora PostgreSQL or MySQL to reduce licence cost",
      "On-premises MySQL to RDS MySQL with DMS full load plus CDC",
      "Loading a data lake or Redshift from operational databases through DMS",
      "Snowball Edge plus DMS for very large databases on limited bandwidth",
    ],
    poorUseCases: [
      "SCT for a same-engine migration where the schema is already compatible",
      "DMS as a long-term replication product without monitoring",
      "Heterogeneous migration without checking the SCT assessment report",
    ],
    alternatives: [
      { need: "Move servers rather than databases", choose: "AWS Application Migration Service" },
      { need: "Move files and objects", choose: "AWS DataSync" },
      { need: "Run SQL Server apps against PostgreSQL with fewer changes", choose: "Babelfish for Aurora PostgreSQL" },
      { need: "Offline bulk transfer", choose: "AWS Snow Family" },
    ],
    keyFeatures: [
      "Homogeneous: same engine. Heterogeneous: different engines",
      "SCT and DMS Schema Conversion convert schema and code and report gaps",
      "DMS: replication instance, endpoints and tasks",
      "Task types: full load, CDC, full load plus CDC",
      "Multi-AZ replication instance, data validation",
      "Targets include RDS, Aurora, S3, DynamoDB, Kinesis, Redshift, OpenSearch",
      "Source logging required for CDC",
    ],
    availability:
      "The source stays online during migration. A Multi-AZ replication instance protects the migration task from instance failure.",
    security:
      "Use TLS for endpoints, encrypt with KMS, place the replication instance in a VPC with restrictive security groups and use least-privilege credentials for source and target.",
    pricingLogic:
      "DMS charges for the replication instance hours and storage. SCT is free to download. Cost drops when you finish and stop the instance.",
    examKeywords: [
      "heterogeneous migration",
      "homogeneous migration",
      "Schema Conversion Tool",
      "change data capture",
      "minimal downtime",
      "Oracle to Aurora PostgreSQL",
      "replication instance",
    ],
    examTraps: [
      "SCT is needed only when engines differ. A same-engine migration may not need it.",
      "DMS moves data. SCT converts schema and code. A heterogeneous migration needs both.",
      "Minimal downtime means full load plus CDC, not a one-time dump.",
      "CDC requires the source database to expose change logs, such as binary logs.",
    ],
    architectureDiagram: `Source (Oracle) --SCT--> converted schema --> Target (Aurora PostgreSQL)
Source --DMS full load--> Target
Source --DMS CDC (ongoing changes)--> Target  --> cut over when caught up`,
    architectureCaption: "Convert the schema first, copy the data, then keep it in sync until cut-over.",
    mentorTip:
      "Two checks: do the engines differ (then SCT) and is downtime tight (then CDC). Those two answers decide almost every question.",
    questionIds: [
      "q-database-migration-homogeneous-heterogeneous-1",
      "q-database-migration-homogeneous-heterogeneous-2",
      "q-database-migration-homogeneous-heterogeneous-3",
    ],
  },
  {
    id: "data-ingestion-transfer-sizing",
    moduleId: "phase-11-migration",
    category: "Migration and Transfer",
    title: "Choosing How to Ingest and Transfer Data: Size, Speed and Frequency",
    shortName: "Ingestion & transfer",
    tier: 1,
    domains: [3, 4],
    examImportance: "high",
    oneLiner:
      "Do the arithmetic first: size divided by bandwidth tells you whether to use the network, a transfer service or a Snow device.",
    englishExplanation:
      "The exam guide asks you to size and speed-match data transfer, choose ingestion patterns by frequency, and select the lowest-cost transfer method. Start with arithmetic. Transfer time is size divided by usable bandwidth. One terabyte over a 100 Mbps link takes about 22 hours at full utilisation, and 100 TB over 1 Gbps takes more than nine days, and real links are rarely fully available. As a rule of thumb, if the transfer would take about a week or more, or the link is too slow or too busy, ship the data on an AWS Snow Family device. Snowcone is small and portable, and Snowball Edge devices hold tens of terabytes up to a couple of hundred terabytes each and can run compute at the edge. Snow also suits sites with no network.\n\nFor transfers over the network, match the service to the pattern. AWS DataSync automates and accelerates one-time or scheduled transfers from NFS, SMB, HDFS or object storage into S3, EFS or FSx, with bandwidth throttling, verification and a managed agent. AWS Transfer Family offers managed SFTP, FTPS and FTP endpoints into S3 or EFS for partners who already use those protocols. Storage Gateway provides ongoing hybrid access with a local cache. Direct Connect provides a dedicated, consistent link for continuous large flows, and S3 Transfer Acceleration with multipart upload speeds long-distance uploads. Amazon AppFlow moves data from SaaS applications such as Salesforce into S3 or Redshift.\n\nChoose by frequency and latency. Streaming data that must be processed continuously goes to Kinesis Data Streams or MSK. Data that only needs to land in S3 or Redshift in near real time goes through Data Firehose. Periodic batch loads use DataSync, Glue jobs or scheduled exports. Transform on the way with Glue or Firehose format conversion, for example CSV to Parquet. Secure the ingestion point with IAM, TLS, VPC endpoints, bucket policies and encryption, and keep the cheapest adequate path: inbound data from the internet is free, but Snow devices and Direct Connect have their own charges.",
    taglishExplanation:
      "Magsimula sa kalkulasyon: oras ng transfer = laki ÷ bandwidth. Ang 1 TB sa 100 Mbps ay mga 22 oras kung buong gamit, at ang 100 TB sa 1 Gbps ay mahigit siyam na araw. Rule of thumb: kung aabot ng mga isang linggo o higit pa, gumamit ng Snow Family. Para sa network transfer: ang DataSync para sa one-time o naka-iskedyul na paglipat papuntang S3, EFS, o FSx; ang Transfer Family para sa SFTP, FTPS, o FTP ng partners; ang Storage Gateway para sa tuloy-tuloy na hybrid access; ang Direct Connect para sa tuloy-tuloy na malaking daloy; at ang AppFlow para sa SaaS. Para sa streaming: Kinesis o MSK. Para sa near real-time na paghahatid sa S3, Firehose.",
    analogy:
      "Moving a library. A few boxes go by car on the highway (the network). A whole building of books goes on a lorry that drives it there (Snow). A weekly delivery of new books from a publisher uses a scheduled courier (DataSync), and a live news feed that must be read as it arrives goes on a conveyor belt (Kinesis).",
    whyItExists:
      "Moving data to the cloud is limited by physics and cost. Different services exist so that large, continuous, scheduled and streaming transfers can each use the right tool.",
    flow: "Measure size and bandwidth -> compute time -> choose Snow (too slow), DataSync / Transfer Family / Gateway / Direct Connect (network) -> streaming or batch -> transform -> land in S3 / Redshift",
    withoutIt: [
      "Large transfers would run for weeks and saturate the business network",
      "Teams would write custom scripts for scheduled copies and integrity checks",
      "Streaming and batch data would be handled with the wrong tools",
    ],
    bestUseCases: [
      "Snowball Edge for hundreds of terabytes over a limited link",
      "DataSync for scheduled migration of NFS or SMB data to S3 or EFS",
      "Transfer Family for partners who must keep using SFTP",
      "Firehose for near-real-time delivery of logs to S3 with Parquet conversion",
      "AppFlow for scheduled SaaS data into a data lake",
    ],
    poorUseCases: [
      "Uploading hundreds of terabytes over a small internet link",
      "Storage Gateway as a one-time migration tool",
      "Kinesis Data Streams when no custom consumer is needed (Firehose is simpler)",
      "Transfer Family when nobody needs file transfer protocols",
    ],
    alternatives: [
      { need: "Continuous dedicated high-bandwidth link", choose: "AWS Direct Connect" },
      { need: "Ongoing hybrid file, volume or tape access", choose: "AWS Storage Gateway" },
      { need: "Replayable real-time streams", choose: "Amazon Kinesis Data Streams" },
      { need: "SaaS to AWS data flows without code", choose: "Amazon AppFlow" },
    ],
    keyFeatures: [
      "Transfer time = data size divided by usable bandwidth",
      "Snow Family: offline transfer and edge compute",
      "DataSync: scheduled or one-time transfer with verification and throttling",
      "Transfer Family: managed SFTP, FTPS, FTP, AS2 into S3 or EFS",
      "Storage Gateway, Direct Connect, Transfer Acceleration, multipart upload",
      "Kinesis and MSK for streaming, Firehose for managed delivery",
      "Glue and Firehose for format conversion such as CSV to Parquet",
    ],
    availability:
      "Network transfers should be resumable and verified. Snow devices are shipped in a tamper-evident case, and DataSync retries failed transfers.",
    security:
      "Encrypt in transit with TLS and at rest with KMS. Snow devices encrypt data automatically, and ingestion endpoints should be reachable only through intended networks, using VPC endpoints and bucket policies.",
    pricingLogic:
      "Inbound transfer from the internet is free, but Snow devices have per-job fees, DataSync charges per GB, Direct Connect charges per port hour, and Transfer Family charges per endpoint hour. Choose the cheapest adequate path.",
    examKeywords: [
      "limited bandwidth",
      "terabytes",
      "one-time migration",
      "scheduled transfer",
      "SFTP",
      "near real time",
      "convert CSV to Parquet",
      "lowest cost transfer",
    ],
    examTraps: [
      "Compute the transfer time. If it takes more than about a week, Snow is usually the answer.",
      "Firehose is near real time and has no replay. Data Streams supports custom consumers and replay.",
      "Storage Gateway is for ongoing hybrid access. A one-time bulk migration is DataSync or Snow.",
      "Transfer Family is the answer when partners require SFTP into S3 with no servers to run.",
    ],
    architectureDiagram: `Size / bandwidth too slow? --yes--> [Snowball Edge] --> S3
                         \\--no--> NFS/SMB: [DataSync] --> S3 / EFS / FSx
                                  Partners: [Transfer Family SFTP] --> S3
                                  Ongoing: [Storage Gateway] / [Direct Connect]
Streaming: [Kinesis / MSK] ; near real time to S3: [Firehose -> Parquet]`,
    architectureCaption: "Arithmetic and pattern pick the service.",
    mentorTip:
      "Write the numbers in the margin: size, bandwidth, hours. Then match the pattern: one-time, scheduled, ongoing or streaming.",
    questionIds: [
      "q-data-ingestion-transfer-sizing-1",
      "q-data-ingestion-transfer-sizing-2",
      "q-data-ingestion-transfer-sizing-3",
    ],
  },
  {
    id: "data-lake-architecture-security",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "Building and Securing a Data Lake: S3, Glue, Lake Formation, Athena and QuickSight",
    shortName: "Data lake design",
    tier: 1,
    domains: [3, 1],
    examImportance: "high",
    oneLiner:
      "A data lake stores raw data cheaply in S3, catalogues it with Glue, governs access with Lake Formation, queries it with Athena and visualises it in QuickSight.",
    englishExplanation:
      "A data lake keeps data in its original form, structured or not, in Amazon S3 because S3 is durable, scalable and inexpensive. A common layout uses zones: raw (landed as-is), curated or processed (cleaned and converted to columnar formats), and consumption-ready data for analytics. AWS Glue crawlers scan the data and populate the Glue Data Catalog with table definitions, and Glue ETL jobs transform data, for example converting CSV to partitioned Parquet. Partitioning by a column such as date and using columnar compressed formats cuts the amount of data each query scans, which lowers Athena cost and time.\n\nAWS Lake Formation builds and secures the lake. It registers S3 locations, ingests data and, most importantly, centralises permissions: you grant users and roles access to databases, tables, columns and even rows and cells, instead of managing complex S3 and IAM policies separately. Lake Formation tags let you grant access by classification. It integrates with Athena, Redshift Spectrum, EMR and Glue, so the same permissions apply across engines, and it supports sharing data across accounts. Amazon Macie can scan S3 for sensitive data, encryption with KMS protects data at rest, and CloudTrail logs access.\n\nAnalytics engines sit on top. Amazon Athena runs serverless SQL directly on S3 and charges by data scanned. Redshift Spectrum lets a Redshift warehouse query S3. EMR handles large Spark and Hadoop processing. Amazon QuickSight provides dashboards and visualisation, with SPICE as its in-memory engine for fast interactive queries, row-level security and ML insights. Choose direct query for the freshest data and SPICE for speed and scale.",
    taglishExplanation:
      "Ang data lake ay nag-iimbak ng data sa orihinal nitong anyo sa S3, na matibay, scalable, at mura. Karaniwang may zones: raw, curated, at consumption. Ang Glue crawler ay nag-i-scan ng data at pinupunan ang Glue Data Catalog, at ang Glue ETL jobs ay nagta-transform, tulad ng CSV papuntang partitioned Parquet para bumaba ang scanned data at gastos sa Athena. Ang Lake Formation ang nagse-centralize ng permissions hanggang column, row, at cell level, at gumagana ito sa Athena, Redshift Spectrum, EMR, at Glue. Ang Athena ay serverless SQL sa S3 na sinisingil ayon sa na-scan na data. Ang QuickSight ay para sa dashboards, na may SPICE.",
    analogy:
      "A warehouse (S3) with an index card catalogue (Glue Data Catalog) at the entrance, a security desk (Lake Formation) that decides which aisles, shelves and even individual boxes each visitor can open, and reading rooms (Athena, EMR, QuickSight) where people analyse what they borrowed.",
    whyItExists:
      "Data lives in many systems and formats. A lake lets organisations keep all of it, secure it centrally and analyse it with the tool that fits each question.",
    flow: "Ingest to S3 raw zone -> Glue crawler and ETL -> curated Parquet partitions -> Data Catalog -> Lake Formation permissions -> Athena / Redshift Spectrum / EMR -> QuickSight",
    withoutIt: [
      "Each team would copy data into its own silo with inconsistent permissions",
      "Queries would scan entire raw files, raising cost",
      "Fine-grained access to columns and rows would need custom code",
    ],
    bestUseCases: [
      "S3 data lake with Glue Data Catalog and Athena for serverless analytics",
      "Lake Formation column-level and row-level access for sensitive fields",
      "Parquet with date partitions to reduce scan cost",
      "QuickSight dashboards on SPICE for fast interactive reporting",
      "Cross-account data sharing through Lake Formation",
    ],
    poorUseCases: [
      "Managing fine-grained lake access only through S3 bucket policies",
      "Leaving data as many small CSV files and querying it repeatedly",
      "Using a data lake for low-latency transactional lookups",
    ],
    alternatives: [
      { need: "Petabyte data warehouse with fast joins", choose: "Amazon Redshift" },
      { need: "Big data processing with Spark or Hadoop", choose: "Amazon EMR" },
      { need: "Find sensitive data in S3", choose: "Amazon Macie" },
      { need: "Search and log analytics", choose: "Amazon OpenSearch Service" },
    ],
    keyFeatures: [
      "S3 storage zones: raw, curated, consumption",
      "Glue crawlers, Data Catalog and ETL jobs",
      "Partitioning and columnar formats (Parquet, ORC)",
      "Lake Formation: central permissions to table, column, row and cell level, LF-tags, cross-account sharing",
      "Athena: serverless SQL on S3 priced by data scanned",
      "Redshift Spectrum, EMR and Glue use the same catalog and permissions",
      "QuickSight: dashboards, SPICE, row-level security, ML insights",
    ],
    availability:
      "S3 provides high durability and availability. Athena and Glue are serverless and managed, so the lake scales without capacity planning.",
    security:
      "Encrypt S3 with KMS, block public access, use Lake Formation for fine-grained access, Macie to find sensitive data and CloudTrail for auditing access.",
    pricingLogic:
      "S3 storage is cheap. Athena charges per TB scanned, so partitioning and Parquet reduce cost. Glue charges per DPU-hour, and QuickSight per user or session.",
    examKeywords: [
      "data lake",
      "Glue Data Catalog",
      "column-level security",
      "serverless SQL on S3",
      "Parquet",
      "partition",
      "SPICE",
      "dashboards",
    ],
    examTraps: [
      "Lake Formation handles fine-grained lake permissions. S3 bucket policies alone cannot grant column-level access.",
      "Athena cost depends on data scanned, so columnar formats and partitions are the main cost lever.",
      "Glue crawlers populate the catalog. They do not enforce permissions.",
      "QuickSight SPICE is in-memory for speed. Direct query reads the source live.",
    ],
    architectureDiagram: `Sources --> [S3 raw] --Glue ETL--> [S3 curated: Parquet, partitioned] --> [Glue Data Catalog]
                                                   |
                          [Lake Formation permissions: table/column/row]
                                                   |
                    [Athena] [Redshift Spectrum] [EMR] --> [QuickSight dashboards (SPICE)]`,
    architectureCaption: "Storage, catalog, governance, query and visualisation as separate layers.",
    mentorTip:
      "Name each layer of the lake: store (S3), catalogue (Glue), govern (Lake Formation), query (Athena), visualise (QuickSight). Questions usually test one layer.",
    questionIds: [
      "q-data-lake-architecture-security-1",
      "q-data-lake-architecture-security-2",
      "q-data-lake-architecture-security-3",
    ],
  },
  {
    id: "availability-metrics-quotas-legacy-reliability",
    moduleId: "phase-12-resilience",
    category: "Resilience",
    title: "Availability Metrics, Service Quotas and Making Legacy Apps Reliable",
    shortName: "HA metrics & legacy",
    tier: 1,
    domains: [2],
    examImportance: "high",
    oneLiner:
      "Turn business needs into numbers (availability, RTO, RPO), remove single points of failure, and use AWS services that raise reliability even when the application cannot change.",
    englishExplanation:
      "Resilient design starts with metrics. Availability is the percentage of time a workload is working. 99 percent allows about 3.65 days of downtime a year, 99.9 percent about 8.8 hours, 99.99 percent about 53 minutes and 99.999 percent about 5 minutes. Components in series multiply, so two components at 99.9 percent give about 99.8 percent overall, while redundant components in parallel raise availability because both must fail at once. Recovery time objective (RTO) is how long you can be down and recovery point objective (RPO) is how much data you can lose, and these drive the disaster recovery choice: backup and restore, pilot light, warm standby or active-active. Other useful measures are mean time to recovery, error rate and latency percentiles, which you can monitor with CloudWatch and X-Ray.\n\nMitigate single points of failure by running multiple instances across AZs, using Multi-AZ databases, load balancers, and managed services that are redundant by design, and by automating recovery. Plan for quotas too. Service quotas are limits per Region and per account, such as the number of EC2 vCPUs, Elastic IPs or API request rates, and some are adjustable. A standby Region has its own quotas, which are not copied from the primary. If a disaster recovery plan needs to launch hundreds of instances in another Region, request quota increases in advance and verify them with the Service Quotas console. Throttling limits on APIs also apply during failover, so design retries with backoff.\n\nThe guide also asks how to improve reliability for legacy applications that cannot be changed. Options include placing the single server in an Auto Scaling group with minimum and maximum of one so a failed instance is replaced automatically, enabling EC2 automatic recovery with a CloudWatch alarm, putting a load balancer or Route 53 failover in front, moving the database to RDS Multi-AZ (the endpoint stays the same), using EFS or FSx for shared storage, protecting data with AWS Backup, using Elastic Disaster Recovery for server replication, and using a Network Load Balancer or Elastic IP when clients hardcode addresses.",
    taglishExplanation:
      "Nagsisimula ang resilient design sa mga sukat. Ang availability ay porsyento ng oras na gumagana ang workload: 99% ay mga 3.65 araw na downtime kada taon, 99.9% ay mga 8.8 oras, 99.99% ay mga 53 minuto. Ang mga component na serye ay pinaparami ang availability, samantalang ang redundant na parallel ay tumataas ang availability. Ang RTO ay gaano katagal puwedeng down, at ang RPO ay gaano karaming data ang puwedeng mawala, at ito ang magdidikta ng DR strategy. May service quotas din na per Region at per account, at hindi kinokopya sa standby Region, kaya mag-request nang maaga. Para sa legacy na hindi puwedeng baguhin: Auto Scaling group na min at max 1, EC2 auto recovery, load balancer o Route 53 failover, RDS Multi-AZ, EFS, at AWS Backup.",
    analogy:
      "A hospital planning for blackouts. It states how long a department may be offline (RTO) and how many records it can afford to lose (RPO), then adds backup generators in parallel. It also checks that the backup site actually has enough beds and permits ready before the day it is needed (quotas), and adds automatic transfer switches to old equipment that cannot be rewired (legacy reliability).",
    whyItExists:
      "Without numbers, 'highly available' is a wish. Metrics connect business impact to design choices and justify cost. Quotas and legacy constraints are where plans often fail in practice.",
    flow: "Business impact -> availability, RTO, RPO targets -> remove single points of failure -> choose DR strategy -> pre-raise quotas in standby Region -> test failover",
    withoutIt: [
      "Teams would over- or under-invest in resilience with no target",
      "A failover could stall because the standby Region cannot launch enough capacity",
      "Legacy servers would remain single points of failure",
    ],
    bestUseCases: [
      "Translating an availability target into downtime per year",
      "Choosing a DR strategy from RTO and RPO",
      "Pre-requesting quota increases in the standby Region",
      "ASG min=max=1 plus load balancer for a legacy single-server app",
      "RDS Multi-AZ for a legacy database with no application change",
    ],
    poorUseCases: [
      "Assuming the standby Region has the same quotas as the primary",
      "Chaining many 99.9 percent components and expecting 99.99 percent overall",
      "Leaving a single instance without automatic recovery",
    ],
    alternatives: [
      { need: "Replicate legacy servers to AWS for DR", choose: "AWS Elastic Disaster Recovery" },
      { need: "Automate backup policies", choose: "AWS Backup" },
      { need: "Static IPs for clients that hardcode addresses", choose: "Network Load Balancer or Elastic IP" },
      { need: "View and request quota increases", choose: "Service Quotas console" },
    ],
    keyFeatures: [
      "Availability targets and downtime per year (99%, 99.9%, 99.99%, 99.999%)",
      "Serial components multiply, parallel redundancy raises availability",
      "RTO, RPO, MTTR, error rate and latency percentiles",
      "Service quotas are Regional and per account, some adjustable",
      "Standby Region quotas must be raised in advance",
      "EC2 auto recovery, ASG with min=max=1, RDS Multi-AZ, Route 53 failover",
      "AWS Backup and Elastic Disaster Recovery for legacy protection",
    ],
    availability:
      "Design to the targets: multiple AZs for high availability, multiple Regions for disaster recovery, with automated failure detection and recovery.",
    security:
      "Keep backups encrypted and in a separate account or Region where appropriate, and protect DR automation with least privilege.",
    pricingLogic:
      "Each extra nine multiplies cost. Choose the weakest strategy that meets RTO and RPO, and use non-production relaxations to save money.",
    examKeywords: [
      "99.99% availability",
      "RTO and RPO",
      "single point of failure",
      "service quotas",
      "legacy application cannot be changed",
      "automatic recovery",
      "standby Region",
    ],
    examTraps: [
      "Quotas are per Region. A DR Region may not allow the capacity the plan needs until you request it.",
      "Serial dependencies lower overall availability, so adding a component can reduce it.",
      "For an unchangeable legacy app, choose infrastructure-level fixes such as Multi-AZ, ASG replacement and load balancing.",
      "RTO is about time to recover. RPO is about data loss. They are not interchangeable.",
    ],
    architectureDiagram: `Targets: availability 99.99% (about 53 min/yr), RTO 15 min, RPO 1 min
Legacy single server:  [ALB] -> [ASG min=1 max=1, auto-replace] -> [RDS Multi-AZ] + [EFS]
                       Route 53 failover -> standby Region (quotas pre-raised) + AWS Backup / Elastic DR`,
    architectureCaption: "Numbers first, then infrastructure fixes that need no code changes.",
    mentorTip:
      "Convert nines to minutes, then match RTO and RPO to a DR tier. For legacy, ask which AWS service can add redundancy without touching the application.",
    questionIds: [
      "q-availability-metrics-quotas-legacy-reliability-1",
      "q-availability-metrics-quotas-legacy-reliability-2",
      "q-availability-metrics-quotas-legacy-reliability-3",
    ],
  },
  {
    id: "network-cidr-subnets-routing",
    moduleId: "phase-4-networking",
    category: "Networking",
    title: "Network Design: CIDR Planning, Subnet Tiers and Route Tables",
    shortName: "CIDR & routing",
    tier: 1,
    domains: [1, 3],
    examImportance: "high",
    oneLiner:
      "Plan non-overlapping address space, split it into public, private and isolated subnets across AZs, and let route tables decide what is reachable.",
    englishExplanation:
      "A VPC is defined by an IPv4 CIDR block between /16 (65,536 addresses) and /28 (16 addresses), usually from the private ranges 10.0.0.0/8, 172.16.0.0/12 or 192.168.0.0/16. Plan carefully, because VPCs that must be peered, attached to a Transit Gateway or connected to on-premises networks cannot have overlapping ranges, and a VPC can add secondary CIDR blocks later. A subnet lives in a single AZ, so a resilient design creates matching subnets in at least two AZs. AWS reserves five addresses in every subnet, so a /24 gives 251 usable addresses.\n\nSubnet tiers express segmentation. A public subnet has a route to an internet gateway, and its resources can be reached from the internet if they have public addresses and security groups allow it. A private subnet has no inbound path from the internet and reaches out through a NAT gateway. An isolated subnet has no route to the internet at all, which suits databases, and reaches AWS services only through VPC endpoints. Typical layout is load balancers in public subnets, application servers in private subnets and databases in isolated subnets.\n\nRoute tables decide where traffic goes. Every route table has an automatic local route for the VPC CIDR. The most specific matching route wins, so a /24 route beats a /16 or the default 0.0.0.0/0. A subnet is associated with one route table, and unassociated subnets use the main route table, so best practice is to keep the main table private and give public subnets their own table with a 0.0.0.0/0 route to the internet gateway. Private subnets route 0.0.0.0/0 to a NAT gateway and may route on-premises ranges to a virtual private gateway or Transit Gateway, and S3 or DynamoDB traffic to gateway endpoints. IPv6 uses ::/0 and an egress-only gateway for outbound-only. Remember that security groups are stateful allow lists attached to resources, while network ACLs are stateless numbered rules on subnets that must allow return traffic on ephemeral ports (1024 to 65535 is a safe range).",
    taglishExplanation:
      "Ang VPC ay may IPv4 CIDR block mula /16 hanggang /28, kadalasan sa private ranges 10.0.0.0/8, 172.16.0.0/12, o 192.168.0.0/16. Magplano nang mabuti dahil hindi puwedeng mag-overlap ang range ng mga VPC na ipe-peer, ikokonekta sa Transit Gateway, o sa on-premises. Ang subnet ay nasa isang AZ lang, kaya gumawa ng magkatugmang subnet sa kahit dalawang AZ. Limang address ang nire-reserve ng AWS kada subnet, kaya 251 ang gamit sa /24. Public subnet ay may route papuntang internet gateway, private ay lumalabas gamit ang NAT, at isolated ay walang route palabas. Ang route table ay may local route; ang pinaka-specific na route ang nananalo.",
    analogy:
      "Planning a neighbourhood. The overall land (the VPC CIDR) is divided into streets (subnets) in each district (AZ). Some streets face the main road (public), some are behind the gates with a single service entrance (private), and some are sealed courtyards (isolated). Road signs (route tables) tell each street where traffic may go, and the most specific sign wins.",
    whyItExists:
      "IP plans and routes are hard to change later. Careful design prevents overlaps, limits exposure and enables hybrid and multi-VPC connectivity.",
    flow: "Choose CIDR -> create subnets per tier per AZ -> attach route tables (local, IGW, NAT, TGW, endpoints) -> security groups and NACLs -> test reachability",
    withoutIt: [
      "Overlapping CIDRs would block peering and VPN connectivity later",
      "Databases could end up in subnets with a path to the internet",
      "Troubleshooting reachability would be guesswork",
    ],
    bestUseCases: [
      "A /16 VPC split into /24 subnets for each tier and AZ",
      "Isolated data subnets with VPC endpoints for AWS services",
      "Custom route tables for public subnets and a private main table",
      "Transit Gateway routes for hybrid connectivity",
    ],
    poorUseCases: [
      "Using the same 10.0.0.0/16 for every VPC in a growing organisation",
      "Putting every resource in public subnets for convenience",
      "Relying on the main route table for a public subnet",
    ],
    alternatives: [
      { need: "Connect VPCs with overlapping CIDRs for one service", choose: "AWS PrivateLink" },
      { need: "Hub and spoke across many VPCs", choose: "AWS Transit Gateway" },
      { need: "Outbound-only IPv6", choose: "Egress-only internet gateway" },
      { need: "Private access to AWS services", choose: "VPC endpoints" },
    ],
    keyFeatures: [
      "VPC CIDR /16 to /28, RFC 1918 ranges, secondary CIDR blocks",
      "Subnets are AZ-scoped, five reserved addresses each",
      "Public, private and isolated subnet tiers",
      "Local route plus most specific match wins",
      "One route table per subnet, main route table as default",
      "Targets: internet gateway, NAT gateway, virtual private gateway, Transit Gateway, endpoints, peering",
      "Security groups stateful, NACLs stateless with ephemeral port ranges",
    ],
    availability:
      "Create subnets in at least two AZs for every tier so load balancers and Auto Scaling groups can spread across them.",
    security:
      "Tiered subnets, security group chaining and restrictive NACLs limit blast radius. Isolated subnets keep data stores unreachable from the internet.",
    pricingLogic:
      "Addressing is free, but NAT gateways, endpoints, Transit Gateway attachments and cross-AZ traffic are charged, so topology choices affect cost.",
    examKeywords: [
      "CIDR block",
      "public subnet",
      "private subnet",
      "route table",
      "overlapping IP ranges",
      "most specific route",
      "ephemeral ports",
      "five reserved addresses",
    ],
    examTraps: [
      "A subnet is public because its route table has a route to an internet gateway, not because of its name.",
      "A /24 subnet has 251 usable addresses, because AWS reserves five.",
      "Overlapping CIDRs prevent peering, Transit Gateway routing and VPN connectivity.",
      "NACLs are stateless. Return traffic needs an explicit allow on ephemeral ports.",
    ],
    architectureDiagram: `VPC 10.0.0.0/16
 AZ-a: public 10.0.0.0/24 | private 10.0.10.0/24 | isolated 10.0.20.0/24
 AZ-b: public 10.0.1.0/24 | private 10.0.11.0/24 | isolated 10.0.21.0/24
 Public RT : 10.0.0.0/16 local, 0.0.0.0/0 -> IGW
 Private RT: 10.0.0.0/16 local, 0.0.0.0/0 -> NAT GW, 192.168.0.0/16 -> TGW
 Isolated RT: local only, S3 -> gateway endpoint`,
    architectureCaption: "Three tiers per AZ, each with its own route table.",
    mentorTip:
      "To judge any subnet, read its route table: IGW route means public, NAT route means private, local-only means isolated.",
    questionIds: [
      "q-network-cidr-subnets-routing-1",
      "q-network-cidr-subnets-routing-2",
      "q-network-cidr-subnets-routing-3",
    ],
  },
];
