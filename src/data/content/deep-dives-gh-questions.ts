import type { Flashcard, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const deepDiveGHQuestions: Question[] = [
  // ---- Shared responsibility ----
  mk(
    "shared-responsibility-account-security", 1, 1, "easy",
    "Under the AWS shared responsibility model, who is responsible for patching the guest operating system on an Amazon EC2 instance?",
    ["AWS", "The customer", "Both equally, through automatic updates", "The AWS Marketplace publisher"],
    "b",
    "For EC2, AWS manages the host and virtualisation, and the customer manages the guest OS, patches and applications.",
    [
      "AWS patches the infrastructure under the instance, not the guest OS.",
      "The guest OS on EC2 is the customer's responsibility.",
      "There is no automatic guest OS patching unless the customer configures it.",
      "A Marketplace publisher does not patch customer instances by default.",
    ],
    "\"patch guest OS on EC2\" -> customer", ["shared responsibility", "EC2"]
  ),
  mk(
    "shared-responsibility-account-security", 2, 1, "medium",
    "A company uses Amazon RDS. Which task remains the customer's responsibility?",
    ["Patching the database engine software", "Patching the underlying host operating system", "Managing database users, data and security group rules", "Replacing failed physical disks"],
    "c",
    "With RDS, AWS manages the OS and engine patching and hardware. The customer manages data, access and network rules.",
    [
      "AWS patches the engine for RDS during maintenance windows.",
      "The host OS is managed by AWS.",
      "Access control, data and security groups remain the customer's job.",
      "Hardware replacement is AWS's responsibility.",
    ],
    "\"RDS: customer manages data and access\"", ["RDS", "shared responsibility"]
  ),
  mk(
    "shared-responsibility-account-security", 3, 1, "hard",
    "A new AWS account is created. Which TWO actions follow best practice for the root user?",
    ["Enable MFA on the root user", "Create access keys for the root user for automation", "Avoid using the root user for daily tasks and use IAM roles or users instead", "Share the root password with the operations team"],
    "ac",
    "Root should be protected with MFA and reserved for the few tasks that require it. Daily work uses IAM identities.",
    [
      "MFA is a core protection for the root user.",
      "Root access keys are a security risk and should not be created.",
      "Daily operations should use least-privilege IAM identities.",
      "Sharing the root password defeats accountability and security.",
    ],
    "\"root user best practice\" -> MFA, no keys, rarely use", ["root user", "MFA"]
  ),

  // ---- Well-Architected ----
  mk(
    "well-architected-framework-pillars", 1, 1, "easy",
    "Which is NOT one of the six pillars of the AWS Well-Architected Framework?",
    ["Operational Excellence", "Reliability", "Compliance Automation", "Sustainability"],
    "c",
    "The six pillars are Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization and Sustainability.",
    [
      "Operational Excellence is a pillar.",
      "Reliability is a pillar.",
      "Compliance Automation is not a pillar.",
      "Sustainability is the sixth pillar.",
    ],
    "six pillars: OpEx, Security, Reliability, Performance, Cost, Sustainability", ["Well-Architected", "pillars"]
  ),
  mk(
    "well-architected-framework-pillars", 2, 2, "medium",
    "Which Well-Architected pillar corresponds to the exam domain 'Design Resilient Architectures'?",
    ["Security", "Reliability", "Performance Efficiency", "Cost Optimization"],
    "b",
    "Resilient architectures map to the Reliability pillar: recovering from failure and meeting demand.",
    [
      "Security corresponds to the secure architectures domain.",
      "Reliability is the resilience pillar.",
      "Performance Efficiency maps to high-performing architectures.",
      "Cost Optimization maps to cost-optimized architectures.",
    ],
    "resilient = Reliability", ["Reliability", "resilient"]
  ),
  mk(
    "well-architected-framework-pillars", 3, 2, "hard",
    "A team wants a free, structured review of an existing workload against best practices that produces an improvement plan and lets them save milestones. Which service should they use?",
    ["AWS Trusted Advisor", "AWS Well-Architected Tool", "AWS Config", "AWS Audit Manager"],
    "b",
    "The Well-Architected Tool reviews workloads against the pillars and provides improvement plans and milestones.",
    [
      "Trusted Advisor checks account-level best practices automatically.",
      "The Tool supports workload reviews, improvement plans and milestones.",
      "Config evaluates resource configuration rules.",
      "Audit Manager collects compliance evidence.",
    ],
    "\"review workload, improvement plan, milestones\" -> Well-Architected Tool", ["Well-Architected Tool"]
  ),

  // ---- Scaling and tiers ----
  mk(
    "scaling-statelessness-multi-tier", 1, 2, "easy",
    "A web application stores user sessions in memory on each web server and cannot scale out behind a load balancer without users being logged out. What is the best fix?",
    ["Use a larger instance type", "Store sessions in a shared store such as ElastiCache or DynamoDB", "Disable the load balancer health checks", "Move to a single AZ"],
    "b",
    "Externalising session state makes web servers stateless so any instance can serve any request.",
    [
      "A larger instance is vertical scaling and leaves a single point of failure.",
      "A shared session store enables horizontal scaling.",
      "Health checks are unrelated to session state.",
      "A single AZ reduces resilience and does not fix sessions.",
    ],
    "\"sessions lost when scaling out\" -> externalise session state", ["stateless", "session"]
  ),
  mk(
    "scaling-statelessness-multi-tier", 2, 1, "medium",
    "In a three-tier architecture, how should the database tier be placed and secured?",
    ["Public subnet with a security group open to the internet", "Private or isolated subnet whose security group accepts traffic only from the application tier", "Public subnet with a network ACL only", "The same subnet as the web servers with a shared security group"],
    "b",
    "The data tier belongs in private or isolated subnets and should accept traffic only from the application tier's security group.",
    [
      "Public exposure of a database is a major risk.",
      "Security group chaining limits access to the app tier.",
      "A public subnet with only a NACL still exposes the tier.",
      "Sharing a subnet and group removes tier isolation.",
    ],
    "\"database tier\" -> isolated subnet, SG chained from app tier", ["three-tier", "security group"]
  ),
  mk(
    "scaling-statelessness-multi-tier", 3, 2, "hard",
    "A team must increase capacity of a stateful monolith that only runs on one server and has no load balancer. Which TWO steps move it toward a scalable design?",
    ["Move user sessions and uploaded files to shared services such as ElastiCache and S3", "Place multiple instances behind an Application Load Balancer in an Auto Scaling group", "Switch to a larger single instance permanently", "Add sticky sessions and keep state on the server"],
    "ab",
    "Making the app stateless and then scaling it horizontally behind a load balancer removes the single point of failure and capacity ceiling.",
    [
      "Externalised state makes instances interchangeable.",
      "A load balancer with Auto Scaling provides horizontal scaling and health replacement.",
      "A larger single instance keeps the ceiling and single point of failure.",
      "Sticky sessions keep state on the server and weaken resilience.",
    ],
    "\"scale a stateful monolith\" -> externalise state, then scale out", ["horizontal scaling", "stateless"]
  ),

  // ---- Microservices and patterns ----
  mk(
    "microservices-event-driven-resilience-patterns", 1, 2, "easy",
    "A payment service occasionally receives the same message twice from SQS because Standard queues deliver at least once. What property must the consumer have to process duplicates safely?",
    ["Idempotency", "Statefulness", "Stickiness", "Immutability"],
    "a",
    "Idempotent operations produce the same result when repeated, so duplicate messages do no harm.",
    [
      "Idempotency makes retries and duplicates safe.",
      "Statefulness does not prevent duplicate effects.",
      "Stickiness relates to load balancers.",
      "Immutability relates to infrastructure deployment.",
    ],
    "\"duplicate delivery\" -> idempotent consumer", ["idempotent", "SQS"]
  ),
  mk(
    "microservices-event-driven-resilience-patterns", 2, 2, "medium",
    "A deployment process SSH-es into production servers to apply patches, causing configuration drift. Which approach follows immutable infrastructure?",
    ["Patch faster with a script", "Bake a new AMI, launch new instances from it and terminate the old ones", "Disable patching", "Use a bigger instance"],
    "b",
    "Immutable infrastructure replaces servers with new images instead of modifying running ones.",
    [
      "Scripted in-place patching still modifies servers and allows drift.",
      "Replacing instances from a new image is the immutable approach.",
      "Not patching leaves vulnerabilities.",
      "Instance size is unrelated to drift.",
    ],
    "\"drift, patch servers\" -> immutable: new AMI", ["immutable infrastructure", "AMI"]
  ),
  mk(
    "microservices-event-driven-resilience-patterns", 3, 2, "hard",
    "An order service calls inventory, payment and shipping synchronously and fails whenever one is slow. Which TWO changes make the design loosely coupled and resilient?",
    ["Publish an order event to EventBridge or SNS and let each service consume it asynchronously", "Use SQS queues with dead-letter queues and retries with backoff for each consumer", "Increase the HTTP timeout to 10 minutes on every call", "Merge all services into one larger monolith"],
    "ab",
    "Asynchronous events and queues decouple services, and retries with backoff plus DLQs handle partial failure.",
    [
      "Events let consumers react without the producer waiting.",
      "Queues buffer work, and DLQs capture poison messages.",
      "Long timeouts keep callers blocked and increase failure impact.",
      "A monolith removes independent scaling and fault isolation.",
    ],
    "\"synchronous chain failing\" -> events, queues, retries, DLQ", ["loose coupling", "event-driven"]
  ),

  // ---- EC2 families ----
  mk(
    "ec2-instance-families-hibernation", 1, 3, "easy",
    "A workload runs an in-memory database that needs a large amount of RAM relative to CPU. Which instance family is the best fit?",
    ["Compute optimized (C)", "Memory optimized (R or X)", "Storage optimized (I)", "Burstable (T)"],
    "b",
    "Memory optimised families provide a high memory to CPU ratio for in-memory databases and caches.",
    [
      "Compute optimised instances have a high CPU to memory ratio.",
      "R and X families are built for memory-bound workloads.",
      "Storage optimised instances target local disk throughput.",
      "Burstable instances suit low average CPU, not large memory needs.",
    ],
    "\"in-memory database\" -> memory optimized", ["memory optimized", "instance family"]
  ),
  mk(
    "ec2-instance-families-hibernation", 2, 4, "medium",
    "A development team's EC2 instances take 20 minutes to warm up their applications each morning. They want to stop paying for compute overnight but resume exactly where they left off. What should they use?",
    ["Terminate and relaunch each morning", "EC2 hibernation with an encrypted root volume", "Reserved Instances", "Spot Instances"],
    "b",
    "Hibernation saves RAM to the encrypted EBS root volume so the instance resumes with its in-memory state and no compute charge while hibernated.",
    [
      "Termination loses the warmed state and requires the full startup again.",
      "Hibernation preserves RAM contents on stop.",
      "Reserved Instances reduce cost for commitments but do not preserve state.",
      "Spot can be interrupted and does not preserve warm state by itself.",
    ],
    "\"resume where it left off, no compute charge\" -> hibernation", ["hibernation", "EC2"]
  ),
  mk(
    "ec2-instance-families-hibernation", 3, 4, "hard",
    "A Linux web application is compatible with Arm and the team wants better price performance without changing the application logic. Which choice fits?",
    ["Graviton-based instances such as the m7g family", "Larger Intel instances", "A bare metal instance", "Dedicated Hosts"],
    "a",
    "Graviton (Arm) instances usually offer better price performance for compatible Linux workloads.",
    [
      "Graviton instances target improved price performance.",
      "Larger Intel instances cost more and do not address price performance.",
      "Bare metal is for specialised needs and costs more.",
      "Dedicated Hosts are for licensing and compliance, not price performance.",
    ],
    "\"better price performance, Arm compatible\" -> Graviton", ["Graviton"]
  ),

  // ---- Cost tags and billing ----
  mk(
    "cost-allocation-tags-consolidated-billing", 1, 4, "easy",
    "A finance team wants to see AWS costs grouped by project in Cost Explorer. What must be done after tagging resources with Project?",
    ["Nothing, tags automatically appear", "Activate Project as a cost allocation tag in the Billing console", "Create a new AWS account per project", "Enable VPC Flow Logs"],
    "b",
    "User-defined tags must be activated as cost allocation tags before they appear in cost reports.",
    [
      "Tags do not appear in cost tools until activated.",
      "Activation makes the tag a dimension in Cost Explorer and the CUR.",
      "Separate accounts are optional and not required for tag-based grouping.",
      "Flow Logs capture network traffic and not cost grouping.",
    ],
    "\"group costs by tag\" -> activate cost allocation tag", ["cost allocation tags"]
  ),
  mk(
    "cost-allocation-tags-consolidated-billing", 2, 4, "medium",
    "A company has ten AWS accounts, some with unused Reserved Instance capacity. How can the organisation get one bill, combined volume discounts and share Reserved Instance benefits?",
    ["Use AWS Organizations consolidated billing", "Use IAM groups", "Use AWS Budgets", "Use AWS Config"],
    "a",
    "Consolidated billing in Organizations combines usage for volume tiers and shares RI and Savings Plans discounts across accounts.",
    [
      "Consolidated billing is the Organizations feature for this.",
      "IAM groups manage permissions, not billing.",
      "Budgets alert on cost thresholds and do not consolidate billing.",
      "Config tracks configuration, not billing.",
    ],
    "\"one bill, share RI across accounts\" -> consolidated billing", ["consolidated billing", "Organizations"]
  ),
  mk(
    "cost-allocation-tags-consolidated-billing", 3, 4, "hard",
    "A team needs the most detailed cost and usage data, including tags, delivered to S3 so analysts can query it with Athena. Which should they use?",
    ["AWS Cost and Usage Report", "AWS Budgets", "AWS Trusted Advisor", "Cost Explorer's default graphs only"],
    "a",
    "The Cost and Usage Report is the most detailed data set and is delivered to S3 for analysis.",
    [
      "CUR provides granular, tag-aware data for Athena queries.",
      "Budgets sends alerts on thresholds.",
      "Trusted Advisor provides recommendations, not detailed billing data.",
      "Default graphs are less detailed and not delivered to S3.",
    ],
    "\"most detailed cost data to S3\" -> Cost and Usage Report", ["CUR", "Athena"]
  ),

  // ---- Data transfer costs ----
  mk(
    "data-transfer-cost-optimization", 1, 4, "easy",
    "EC2 instances in private subnets read large volumes of data from S3 through a NAT gateway, and data processing charges are high. What is the most cost-effective fix?",
    ["Use a larger NAT gateway", "Add an S3 gateway VPC endpoint", "Move the instances to a public subnet with public IPs", "Enable S3 Transfer Acceleration"],
    "b",
    "A gateway endpoint for S3 is free and removes NAT gateway processing charges for that traffic.",
    [
      "NAT gateways charge per GB processed regardless of size.",
      "Gateway endpoints are free and keep traffic on the AWS network.",
      "Public IPs weaken security and may incur other charges.",
      "Transfer Acceleration adds cost and is for distant uploads.",
    ],
    "\"S3 via NAT is expensive\" -> gateway endpoint", ["gateway endpoint", "NAT gateway"]
  ),
  mk(
    "data-transfer-cost-optimization", 2, 4, "medium",
    "Which data transfer is free of charge in AWS?",
    ["Data transferred out to the internet", "Data transferred in from the internet", "Data between two Regions", "Data between AZs in the same Region over private IPs in both directions"],
    "b",
    "Data transfer into AWS from the internet is free. Out to the internet, cross-Region and cross-AZ traffic are charged.",
    [
      "Outbound internet transfer is charged per GB.",
      "Inbound transfer is free.",
      "Cross-Region transfer is charged.",
      "Cross-AZ transfer is charged in each direction.",
    ],
    "\"data in is free\"", ["data transfer", "pricing"]
  ),
  mk(
    "data-transfer-cost-optimization", 3, 4, "hard",
    "A website serves large downloads from S3 directly to users worldwide and egress cost is high. Which change reduces cost and origin load?",
    ["Place Amazon CloudFront in front of the S3 bucket", "Move the bucket to One Zone-IA", "Enable S3 versioning", "Use a NAT gateway for downloads"],
    "a",
    "CloudFront reduces egress cost, caches content at the edge and lowers origin requests. S3 to CloudFront transfer is free.",
    [
      "CloudFront offers lower egress rates and caching.",
      "A storage class does not change data transfer out pricing.",
      "Versioning does not affect egress.",
      "NAT gateways are for outbound traffic from private subnets, not serving downloads.",
    ],
    "\"high egress cost for downloads\" -> CloudFront", ["CloudFront", "egress"]
  ),

  // ---- DB migration ----
  mk(
    "database-migration-homogeneous-heterogeneous", 1, 3, "easy",
    "A company is migrating an Oracle database to Amazon Aurora PostgreSQL. Which tools are needed?",
    ["Only DMS", "AWS Schema Conversion Tool (or DMS Schema Conversion) to convert the schema and DMS to move the data", "Only AWS DataSync", "Only AWS Snowball"],
    "b",
    "A heterogeneous migration needs schema and code conversion, then data migration with DMS.",
    [
      "DMS alone does not convert incompatible schema objects.",
      "SCT converts the schema and DMS moves the data.",
      "DataSync moves files, not database data.",
      "Snowball is a transfer device and does not convert schemas.",
    ],
    "\"different engines\" -> SCT + DMS", ["SCT", "DMS", "heterogeneous"]
  ),
  mk(
    "database-migration-homogeneous-heterogeneous", 2, 3, "medium",
    "A production MySQL database must be migrated to RDS MySQL with minimal downtime. Which DMS task type supports this?",
    ["Full load only", "Full load plus change data capture (CDC)", "CDC only before any data is loaded", "A one-time snapshot"],
    "b",
    "Full load plus CDC copies existing data and continuously applies ongoing changes until cut-over.",
    [
      "Full load only leaves a gap during which changes are missed.",
      "Full load plus CDC keeps the target in sync for near-zero downtime.",
      "CDC without the initial data leaves the target incomplete.",
      "A snapshot is a point-in-time copy and requires downtime for changes.",
    ],
    "\"minimal downtime\" -> full load + CDC", ["CDC", "DMS"]
  ),
  mk(
    "database-migration-homogeneous-heterogeneous", 3, 4, "hard",
    "A 60 TB on-premises database must be migrated over a slow 100 Mbps link. Which approach is the most practical?",
    ["Replicate everything over the network with DMS only", "Use AWS Snowball Edge to move the bulk data, then DMS CDC for changes", "Email dump files", "Use an AWS Client VPN"],
    "b",
    "Shipping the bulk data on Snowball Edge avoids weeks of transfer, and DMS replicates changes that occurred meanwhile.",
    [
      "At 100 Mbps, 60 TB would take many weeks.",
      "Snowball Edge plus DMS CDC handles bulk and ongoing changes.",
      "Email is not feasible for this volume.",
      "A VPN does not increase available bandwidth.",
    ],
    "\"very large DB, slow link\" -> Snowball Edge + DMS", ["Snowball Edge", "DMS"]
  ),

  // ---- Ingestion and transfer ----
  mk(
    "data-ingestion-transfer-sizing", 1, 3, "easy",
    "A company has 300 TB of data to move to AWS and only a 1 Gbps internet link that is shared with production. Which option is most practical?",
    ["Upload over the internet", "AWS Snowball Edge devices", "S3 Transfer Acceleration", "AWS Client VPN"],
    "b",
    "300 TB over 1 Gbps would take over four weeks even at full utilisation, so offline transfer with Snow devices is more practical.",
    [
      "A shared 1 Gbps link would take weeks and disrupt production.",
      "Snow devices move data physically at scale.",
      "Acceleration improves latency but not a bandwidth-limited link.",
      "A VPN does not add bandwidth.",
    ],
    "\"hundreds of TB, limited bandwidth\" -> Snow Family", ["Snow Family", "bandwidth"]
  ),
  mk(
    "data-ingestion-transfer-sizing", 2, 3, "medium",
    "A partner sends daily files using SFTP and the company wants them to land in S3 without running any servers. Which service fits?",
    ["AWS DataSync", "AWS Transfer Family", "AWS Storage Gateway", "Amazon Kinesis Data Firehose"],
    "b",
    "Transfer Family provides managed SFTP, FTPS and FTP endpoints that write to S3 or EFS.",
    [
      "DataSync transfers data between storage systems but does not expose an SFTP endpoint to partners.",
      "Transfer Family is the managed SFTP service.",
      "Storage Gateway provides hybrid file access, not partner SFTP.",
      "Firehose delivers streaming records to destinations.",
    ],
    "\"partners use SFTP into S3\" -> Transfer Family", ["Transfer Family", "SFTP"]
  ),
  mk(
    "data-ingestion-transfer-sizing", 3, 3, "hard",
    "Clickstream events must be delivered to S3 within a minute or two, converted to Parquet, with no custom consumer code. Which service meets this?",
    ["Kinesis Data Streams with a custom Lambda consumer", "Amazon Data Firehose with record format conversion", "AWS Data Pipeline", "AWS DataSync"],
    "b",
    "Firehose delivers streaming data to S3 in near real time and can convert formats such as JSON to Parquet.",
    [
      "Data Streams would require writing and operating consumer code.",
      "Firehose is managed delivery with format conversion.",
      "Data Pipeline is a legacy scheduler and not for streaming.",
      "DataSync transfers files and is not a streaming service.",
    ],
    "\"near real time to S3, Parquet, no code\" -> Firehose", ["Firehose", "Parquet"]
  ),

  // ---- Data lake ----
  mk(
    "data-lake-architecture-security", 1, 1, "easy",
    "A company wants to give analysts access to only certain columns of a table in its S3 data lake, consistently across Athena and Redshift Spectrum. Which service should manage this?",
    ["S3 bucket policies", "AWS Lake Formation", "Security groups", "AWS Shield"],
    "b",
    "Lake Formation provides central, fine-grained permissions at database, table, column and row level across analytics engines.",
    [
      "Bucket policies cannot grant column-level access.",
      "Lake Formation centralises fine-grained access control.",
      "Security groups control network traffic.",
      "Shield protects against DDoS.",
    ],
    "\"column-level access on data lake\" -> Lake Formation", ["Lake Formation"]
  ),
  mk(
    "data-lake-architecture-security", 2, 3, "medium",
    "Athena queries over large CSV files in S3 are slow and expensive. Which TWO changes reduce cost and improve performance?",
    ["Convert the data to Parquet", "Partition the data by date", "Store each record in a separate small file", "Disable compression"],
    "ab",
    "Columnar formats and partitions reduce the amount of data scanned, which lowers Athena cost and time.",
    [
      "Parquet is columnar and compressed.",
      "Partitioning lets queries skip irrelevant data.",
      "Many small files add overhead and hurt performance.",
      "Compression reduces scanned bytes, so disabling it increases cost.",
    ],
    "\"reduce Athena cost\" -> Parquet + partitions", ["Athena", "Parquet", "partition"]
  ),
  mk(
    "data-lake-architecture-security", 3, 3, "hard",
    "Which component populates the AWS Glue Data Catalog by scanning S3 data to infer schemas?",
    ["A Glue crawler", "Amazon QuickSight", "AWS Lake Formation permissions", "Amazon Macie"],
    "a",
    "Glue crawlers scan data stores and create or update table definitions in the Data Catalog.",
    [
      "Crawlers infer schemas and register tables.",
      "QuickSight visualises data.",
      "Lake Formation permissions control access and do not infer schemas.",
      "Macie finds sensitive data.",
    ],
    "\"infer schema, populate catalog\" -> Glue crawler", ["Glue crawler", "Data Catalog"]
  ),

  // ---- Availability, quotas, legacy ----
  mk(
    "availability-metrics-quotas-legacy-reliability", 1, 2, "easy",
    "Approximately how much downtime per year does 99.99 percent availability allow?",
    ["About 3.65 days", "About 8.8 hours", "About 53 minutes", "About 5 seconds"],
    "c",
    "99.99 percent availability allows roughly 52 to 53 minutes of downtime per year.",
    [
      "That corresponds to 99 percent.",
      "That corresponds to 99.9 percent.",
      "That corresponds to 99.99 percent.",
      "That is far less than any common availability target allows.",
    ],
    "99.99% = about 53 minutes per year", ["availability", "nines"]
  ),
  mk(
    "availability-metrics-quotas-legacy-reliability", 2, 2, "medium",
    "A disaster recovery plan will launch 400 instances in a standby Region during failover. What should the architect do in advance?",
    ["Nothing, quotas are copied from the primary Region", "Check and request service quota increases in the standby Region", "Disable Auto Scaling", "Use only On-Demand Capacity Reservations in the primary Region"],
    "b",
    "Service quotas are per Region, so the standby Region may not allow the needed capacity until increases are requested.",
    [
      "Quotas are not copied between Regions.",
      "Pre-raising quotas ensures the failover can launch capacity.",
      "Disabling Auto Scaling would reduce recovery automation.",
      "Reservations in the primary Region do not help the standby Region.",
    ],
    "\"DR Region capacity\" -> raise quotas in advance", ["service quotas", "DR"]
  ),
  mk(
    "availability-metrics-quotas-legacy-reliability", 3, 2, "hard",
    "A legacy application runs on a single EC2 instance, cannot be modified and uses a self-managed database on the same server. Which TWO changes improve reliability without modifying the application?",
    ["Put the instance in an Auto Scaling group with minimum and maximum of one behind a load balancer", "Migrate the database to RDS Multi-AZ and keep the endpoint the same via DNS", "Rewrite the application as microservices", "Disable health checks"],
    "ab",
    "Auto Scaling replaces a failed instance and RDS Multi-AZ provides database failover, both without application code changes.",
    [
      "An ASG of one with a load balancer gives automatic replacement.",
      "RDS Multi-AZ adds managed database failover.",
      "A rewrite changes the application, which is not allowed.",
      "Disabling health checks removes failure detection.",
    ],
    "\"legacy, cannot change\" -> infrastructure-level redundancy", ["legacy", "Multi-AZ", "Auto Scaling"]
  ),

  // ---- Network CIDR ----
  mk(
    "network-cidr-subnets-routing", 1, 1, "easy",
    "A subnet is configured with a route 0.0.0.0/0 to an internet gateway. How is this subnet classified?",
    ["Private subnet", "Public subnet", "Isolated subnet", "VPN-only subnet"],
    "b",
    "A subnet whose route table sends 0.0.0.0/0 to an internet gateway is a public subnet.",
    [
      "A private subnet routes outbound traffic through a NAT gateway.",
      "A route to an internet gateway defines a public subnet.",
      "An isolated subnet has no route to the internet.",
      "VPN routes target a virtual private gateway, not an internet gateway.",
    ],
    "\"IGW route\" -> public subnet", ["public subnet", "route table"]
  ),
  mk(
    "network-cidr-subnets-routing", 2, 3, "medium",
    "How many usable IPv4 addresses does a /24 subnet provide in AWS?",
    ["256", "254", "251", "250"],
    "c",
    "A /24 has 256 addresses and AWS reserves five in every subnet, leaving 251.",
    [
      "256 is the total before reservations.",
      "254 is the traditional usable count without AWS reservations.",
      "AWS reserves five addresses per subnet, leaving 251.",
      "250 miscounts the reserved addresses.",
    ],
    "/24 in AWS = 251 usable", ["CIDR", "subnet"]
  ),
  mk(
    "network-cidr-subnets-routing", 3, 1, "hard",
    "A route table has routes for 10.0.0.0/16 (local), 10.0.5.0/24 to a virtual private gateway and 0.0.0.0/0 to a NAT gateway. Where does traffic to 10.0.5.20 go?",
    ["The local VPC", "The virtual private gateway", "The NAT gateway", "It is dropped"],
    "b",
    "The most specific matching route wins. 10.0.5.0/24 is more specific than the local /16 and 0.0.0.0/0, so traffic goes to the virtual private gateway.",
    [
      "The local route is less specific than the /24 route.",
      "The /24 route to the virtual private gateway is the longest match.",
      "The default route is the least specific.",
      "A route exists, so traffic is not dropped.",
    ],
    "\"most specific route wins\"", ["route table", "longest prefix"]
  ),
];

export const deepDiveGHFlashcards: Flashcard[] = [
  fc("shared-responsibility-account-security", 1, 1, "Orientation", "Shared responsibility in one line?", "AWS secures the cloud (hardware, infrastructure, managed service software). You secure what you put in it (data, IAM, encryption, network config, guest OS on EC2)."),
  fc("shared-responsibility-account-security", 2, 1, "Orientation", "Root user best practices?", "Enable MFA, create no access keys, use a strong password, and use it only for the few tasks that require root."),
  fc("shared-responsibility-account-security", 3, 1, "Orientation", "Who patches what: EC2, RDS, S3?", "EC2: customer patches guest OS. RDS: AWS patches OS and engine. S3: AWS manages the platform, you manage data and access."),

  fc("well-architected-framework-pillars", 1, 1, "Orientation", "The six Well-Architected pillars?", "Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability."),
  fc("well-architected-framework-pillars", 2, 2, "Orientation", "Exam domains vs pillars?", "Secure = Security. Resilient = Reliability. High-performing = Performance Efficiency. Cost-optimized = Cost Optimization."),
  fc("well-architected-framework-pillars", 3, 2, "Orientation", "Well-Architected Tool vs Trusted Advisor?", "The Tool reviews a workload against pillars and gives an improvement plan. Trusted Advisor checks account-level best practices automatically."),

  fc("scaling-statelessness-multi-tier", 1, 2, "Resilience", "Horizontal vs vertical scaling?", "Horizontal: more instances behind a load balancer, needs stateless design. Vertical: bigger instance, usually a restart, has a ceiling and a single point of failure."),
  fc("scaling-statelessness-multi-tier", 2, 2, "Resilience", "Where does state go in a stateless design?", "Sessions in ElastiCache or DynamoDB, files in S3 or EFS, configuration in Parameter Store, logs in CloudWatch."),
  fc("scaling-statelessness-multi-tier", 3, 1, "Resilience", "Three-tier subnet layout?", "Load balancer in public subnets, app servers in private subnets, databases in isolated subnets, with security groups chained between tiers."),

  fc("microservices-event-driven-resilience-patterns", 1, 2, "Resilience", "Why must consumers be idempotent?", "Queues deliver at least once and retries repeat work, so repeating an operation must have the same effect as doing it once."),
  fc("microservices-event-driven-resilience-patterns", 2, 2, "Resilience", "Resilience patterns for distributed systems?", "Retries with exponential backoff and jitter, timeouts, idempotency, dead-letter queues, circuit breakers, throttling, saga pattern."),
  fc("microservices-event-driven-resilience-patterns", 3, 2, "Resilience", "What is immutable infrastructure?", "Never modify running servers. Build a new image, launch new instances and terminate the old ones, often with blue/green deployment."),

  fc("ec2-instance-families-hibernation", 1, 3, "Compute", "EC2 families at a glance?", "General purpose M/T, compute C, memory R/X, storage I/D, accelerated P/G/Inf/Trn. A trailing g means Graviton (Arm)."),
  fc("ec2-instance-families-hibernation", 2, 4, "Compute", "How does EC2 hibernation work?", "RAM is saved to the encrypted EBS root volume and the instance stops. You pay for EBS and Elastic IP, not compute. Resume restores processes."),
  fc("ec2-instance-families-hibernation", 3, 4, "Compute", "When are T instances a poor fit?", "Sustained high CPU, because CPU credits run out. They suit spiky workloads with low average CPU."),

  fc("cost-allocation-tags-consolidated-billing", 1, 4, "Cost Management", "How do tags show up in cost reports?", "Activate them as cost allocation tags in the Billing console. They are not retroactive."),
  fc("cost-allocation-tags-consolidated-billing", 2, 4, "Cost Management", "What does consolidated billing give you?", "One bill for all Organizations accounts, combined usage for volume tiers, and shared Reserved Instance and Savings Plans discounts, at no extra cost."),
  fc("cost-allocation-tags-consolidated-billing", 3, 4, "Cost Management", "Cost Explorer vs Budgets vs CUR?", "Cost Explorer visualises and forecasts. Budgets alerts on thresholds. Cost and Usage Report is the most detailed dataset, delivered to S3."),

  fc("data-transfer-cost-optimization", 1, 4, "Cost Management", "AWS data transfer pricing pattern?", "Inbound from the internet is free. Outbound, cross-AZ and cross-Region are charged. Same-AZ private IP traffic is free."),
  fc("data-transfer-cost-optimization", 2, 4, "Cost Management", "Cheapest private path to S3 from a VPC?", "A gateway VPC endpoint, which is free. A NAT gateway charges per GB processed."),
  fc("data-transfer-cost-optimization", 3, 4, "Cost Management", "How does CloudFront cut cost?", "Lower egress rates than direct, edge caching that reduces origin requests, and free S3 to CloudFront transfer."),

  fc("database-migration-homogeneous-heterogeneous", 1, 3, "Migration and Transfer", "Homogeneous vs heterogeneous migration?", "Homogeneous: same engine, move data. Heterogeneous: different engines, convert schema with SCT, then move data with DMS."),
  fc("database-migration-homogeneous-heterogeneous", 2, 3, "Migration and Transfer", "DMS task types?", "Full load, change data capture (CDC), or full load plus CDC for near-zero downtime."),
  fc("database-migration-homogeneous-heterogeneous", 3, 4, "Migration and Transfer", "Very large database, slow link?", "Use Snowball Edge to move the bulk data and DMS CDC to replicate later changes."),

  fc("data-ingestion-transfer-sizing", 1, 3, "Migration and Transfer", "Transfer time rule of thumb?", "Time = size / bandwidth. 1 TB over 100 Mbps is about 22 hours. If it would take a week or more, consider Snow Family."),
  fc("data-ingestion-transfer-sizing", 2, 3, "Migration and Transfer", "DataSync vs Transfer Family vs Storage Gateway?", "DataSync: scheduled or one-time transfers. Transfer Family: managed SFTP/FTPS/FTP into S3 or EFS. Storage Gateway: ongoing hybrid access with local cache."),
  fc("data-ingestion-transfer-sizing", 3, 3, "Migration and Transfer", "Streaming ingestion choices?", "Kinesis Data Streams or MSK for custom real-time processing and replay. Firehose for near-real-time delivery to S3 or Redshift with optional format conversion."),

  fc("data-lake-architecture-security", 1, 3, "Analytics", "Data lake layers?", "Store in S3, catalogue with Glue, govern with Lake Formation, query with Athena or Redshift Spectrum, visualise with QuickSight."),
  fc("data-lake-architecture-security", 2, 1, "Analytics", "Why Lake Formation?", "Central fine-grained permissions at table, column, row and cell level across Athena, Redshift Spectrum, EMR and Glue, plus cross-account sharing."),
  fc("data-lake-architecture-security", 3, 3, "Analytics", "How to cut Athena cost?", "Reduce data scanned: convert to Parquet or ORC, partition by common filters like date, and compress."),

  fc("availability-metrics-quotas-legacy-reliability", 1, 2, "Resilience", "Downtime per year by availability?", "99% about 3.65 days, 99.9% about 8.8 hours, 99.99% about 53 minutes, 99.999% about 5 minutes."),
  fc("availability-metrics-quotas-legacy-reliability", 2, 2, "Resilience", "Service quotas and DR?", "Quotas are per Region and per account and are not copied to the standby Region. Request increases in advance."),
  fc("availability-metrics-quotas-legacy-reliability", 3, 2, "Resilience", "Making an unchangeable legacy app reliable?", "ASG with min=max=1, EC2 auto recovery, load balancer or Route 53 failover, RDS Multi-AZ, EFS/FSx, AWS Backup, Elastic Disaster Recovery."),

  fc("network-cidr-subnets-routing", 1, 1, "Networking and Content Delivery", "What makes a subnet public?", "Its route table sends 0.0.0.0/0 to an internet gateway. Private uses a NAT gateway. Isolated has no route out."),
  fc("network-cidr-subnets-routing", 2, 3, "Networking and Content Delivery", "Usable addresses in a subnet?", "AWS reserves 5 per subnet, so a /24 has 251 usable. VPC CIDR ranges from /16 to /28."),
  fc("network-cidr-subnets-routing", 3, 1, "Networking and Content Delivery", "How are route conflicts resolved?", "The most specific matching route wins. The local VPC route always exists, and security groups are stateful while NACLs are stateless."),
];
