import type { Flashcard, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const deepDiveMNQuestions: Question[] = [
  // ---- Storage decision guide ----
  mk(
    "storage-service-decision-guide", 1, 3, "easy",
    "A company migrates Windows applications that need SMB file shares with Active Directory integration and NTFS permissions. Which storage service fits?",
    ["Amazon EFS", "Amazon FSx for Windows File Server", "Amazon S3", "Amazon EBS"],
    "b",
    "FSx for Windows File Server provides SMB shares with Active Directory integration and NTFS permissions.",
    [
      "EFS is an NFS file system for Linux.",
      "FSx for Windows is built for SMB, AD and NTFS.",
      "S3 is object storage and does not provide SMB file shares.",
      "EBS is block storage attached to one instance.",
    ],
    "\"SMB + Active Directory\" -> FSx for Windows", ["FSx", "SMB"]
  ),
  mk(
    "storage-service-decision-guide", 2, 3, "medium",
    "A Linux web fleet across three Availability Zones must read and write the same shared content with POSIX permissions, and capacity should grow automatically. Which service fits?",
    ["Amazon EBS gp3", "Amazon EFS", "EC2 instance store", "Amazon S3 Glacier"],
    "b",
    "EFS is a managed NFS file system that many Linux instances across AZs can mount, and it scales automatically.",
    [
      "EBS volumes attach to one instance in one AZ.",
      "EFS is shared, multi-AZ and elastic.",
      "Instance store is local and ephemeral.",
      "Glacier is archival object storage.",
    ],
    "\"shared Linux file system across AZs\" -> EFS", ["EFS", "shared storage"]
  ),
  mk(
    "storage-service-decision-guide", 3, 3, "hard",
    "A machine learning team needs a very high-throughput parallel file system for training that reads its dataset from S3 and writes results back. Which service fits best?",
    ["Amazon FSx for Lustre", "Amazon EFS One Zone-IA", "AWS Storage Gateway tape", "Amazon EBS st1"],
    "a",
    "FSx for Lustre is a high-performance parallel file system for HPC and ML that integrates with S3.",
    [
      "Lustre is designed for high-throughput, S3-linked workloads.",
      "EFS One Zone-IA is a cost-optimised tier, not a high-performance parallel file system.",
      "Tape Gateway is for backup software and virtual tapes.",
      "st1 is throughput-optimised HDD for a single instance.",
    ],
    "\"HPC / ML parallel file system linked to S3\" -> FSx for Lustre", ["FSx for Lustre", "HPC"]
  ),

  // ---- Compute decision guide ----
  mk(
    "compute-service-decision-guide", 1, 3, "easy",
    "A job runs for about 40 minutes each time it is triggered by an event, and the team wants no servers to manage. Which option fits?",
    ["AWS Lambda", "AWS Fargate task", "A Lambda function with a 40-minute timeout", "AWS Outposts"],
    "b",
    "Lambda is limited to 15 minutes. A Fargate task can run longer without servers to manage.",
    [
      "A Lambda function cannot run for 40 minutes.",
      "Fargate runs containers for as long as needed with no servers to manage.",
      "The maximum Lambda timeout is 15 minutes.",
      "Outposts is for on-premises AWS infrastructure.",
    ],
    "\"longer than 15 minutes, no servers\" -> Fargate", ["Fargate", "Lambda limit"]
  ),
  mk(
    "compute-service-decision-guide", 2, 4, "medium",
    "A developer wants to deploy a web application from a code repository quickly with a load balancer and Auto Scaling, without assembling the infrastructure, while keeping access to the underlying EC2 instances. Which service fits?",
    ["AWS Elastic Beanstalk", "AWS Lambda", "AWS Batch", "AWS Wavelength"],
    "a",
    "Beanstalk provisions and manages the environment for a web application while leaving the resources under your control.",
    [
      "Beanstalk deploys the application and creates EC2, load balancing and Auto Scaling for you.",
      "Lambda does not use EC2 instances you can access.",
      "Batch runs queued batch jobs.",
      "Wavelength is for low-latency compute at telecom edge locations.",
    ],
    "\"deploy web app quickly, keep control of resources\" -> Beanstalk", ["Elastic Beanstalk"]
  ),
  mk(
    "compute-service-decision-guide", 3, 4, "hard",
    "Thousands of independent image-processing jobs are queued nightly, and the company wants the lowest cost with minimal scheduling code. Which TWO choices fit?",
    ["AWS Batch to manage the queue and compute", "Spot Instances as the compute environment", "A single large On-Demand instance running all jobs serially", "Amazon RDS Proxy", "AWS Direct Connect"],
    "ab",
    "Batch manages job queues and scales compute, and Spot lowers cost for interruptible, restartable jobs.",
    [
      "Batch schedules and runs queued batch jobs.",
      "Spot capacity is the cheapest option for restartable work.",
      "A single instance has no scale and risks long runtimes.",
      "RDS Proxy pools database connections.",
      "Direct Connect is a network link.",
    ],
    "\"queued independent jobs, lowest cost\" -> Batch + Spot", ["AWS Batch", "Spot"]
  ),

  // ---- Identity decision guide ----
  mk(
    "identity-service-decision-guide", 1, 1, "easy",
    "On-premises servers must call AWS APIs, and the security team wants to avoid creating long-lived access keys for them. Which service fits?",
    ["IAM Roles Anywhere using X.509 certificates", "An IAM user with access keys stored on each server", "Amazon Cognito user pools", "AWS Shield"],
    "a",
    "IAM Roles Anywhere exchanges a certificate issued by your CA for temporary AWS credentials for workloads outside AWS.",
    [
      "Roles Anywhere provides temporary credentials to non-AWS workloads.",
      "Long-lived access keys are exactly what the team wants to avoid.",
      "Cognito is for application end users.",
      "Shield is DDoS protection.",
    ],
    "\"servers outside AWS, no long-lived keys\" -> IAM Roles Anywhere", ["Roles Anywhere"]
  ),
  mk(
    "identity-service-decision-guide", 2, 1, "medium",
    "A company wants to reuse its on-premises Active Directory for AWS sign-in without storing any directory data in AWS. Which Directory Service option fits?",
    ["AWS Managed Microsoft AD", "AD Connector", "Simple AD", "Amazon Cognito"],
    "b",
    "AD Connector proxies authentication requests to the on-premises directory and does not cache or store directory data in AWS.",
    [
      "Managed Microsoft AD hosts a real directory in AWS.",
      "AD Connector forwards requests to the on-premises AD.",
      "Simple AD is a separate Samba-based directory.",
      "Cognito is for application end users.",
    ],
    "\"reuse on-premises AD, no data in AWS\" -> AD Connector", ["AD Connector"]
  ),
  mk(
    "identity-service-decision-guide", 3, 1, "hard",
    "A company has 3,000 employees who need single sign-on to 40 AWS accounts using their corporate identity provider. Which TWO choices fit?",
    ["AWS IAM Identity Center with permission sets", "AWS Organizations to organise the accounts", "An IAM user for each employee in every account", "Amazon Cognito identity pools only", "Shared administrator credentials"],
    "ab",
    "Identity Center provides workforce SSO and assigns permission sets across accounts managed through Organizations.",
    [
      "Identity Center connects to an IdP and assigns access to many accounts.",
      "Organizations provides the account structure Identity Center uses.",
      "Per-account IAM users do not scale and create long-lived credentials.",
      "Cognito is aimed at application customers, not workforce access to AWS accounts.",
      "Shared credentials are insecure and unauditable.",
    ],
    "\"workforce SSO to many accounts\" -> Identity Center + Organizations", ["IAM Identity Center"]
  ),

  // ---- Caching decision ----
  mk(
    "caching-and-edge-decision-guide", 1, 3, "easy",
    "A gaming application uses UDP and needs static IP addresses with fast failover between Regions. Which service fits?",
    ["Amazon CloudFront", "AWS Global Accelerator", "Amazon API Gateway", "Amazon ElastiCache"],
    "b",
    "Global Accelerator provides static anycast IPs and routes TCP and UDP traffic over the AWS backbone with health-based failover.",
    [
      "CloudFront caches HTTP and HTTPS content.",
      "Global Accelerator supports TCP and UDP with static IPs and fast failover.",
      "API Gateway fronts HTTP APIs.",
      "ElastiCache is an in-memory cache.",
    ],
    "\"UDP, static IPs, fast failover\" -> Global Accelerator", ["Global Accelerator"]
  ),
  mk(
    "caching-and-edge-decision-guide", 2, 3, "medium",
    "A team needs microsecond read latency for hot DynamoDB items without changing application caching logic. Which service fits?",
    ["Amazon ElastiCache for Redis", "DynamoDB Accelerator (DAX)", "Amazon MemoryDB", "Amazon CloudFront"],
    "b",
    "DAX is a drop-in, write-through cache for DynamoDB that needs no cache management code.",
    [
      "ElastiCache requires application logic to populate and invalidate it.",
      "DAX is purpose built for DynamoDB and needs only the DAX client.",
      "MemoryDB is a durable in-memory database, not a DynamoDB cache.",
      "CloudFront caches HTTP content at the edge.",
    ],
    "\"DynamoDB microsecond reads, no code changes\" -> DAX", ["DAX"]
  ),
  mk(
    "caching-and-edge-decision-guide", 3, 3, "hard",
    "An application needs a Redis-compatible, in-memory primary database that stores data durably across AZs so it can be the system of record. Which service fits?",
    ["Amazon ElastiCache for Redis as a cache in front of RDS", "Amazon MemoryDB", "Amazon DynamoDB Accelerator", "Amazon CloudFront"],
    "b",
    "MemoryDB is a durable, Redis-compatible in-memory database that can serve as a primary datastore.",
    [
      "ElastiCache is a cache in front of another database and is not intended as the system of record.",
      "MemoryDB stores data durably with a multi-AZ transaction log.",
      "DAX accelerates DynamoDB only.",
      "CloudFront is a CDN.",
    ],
    "\"in-memory AND durable primary database\" -> MemoryDB", ["MemoryDB"]
  ),

  // ---- Spot and reserved ----
  mk(
    "spot-reserved-capacity-strategies", 1, 4, "easy",
    "A fleet uses Spot Instances of a single instance type in one AZ and keeps being interrupted. What is the best way to improve reliability?",
    ["Diversify across several instance types and AZs with an allocation strategy such as price-capacity-optimized", "Switch to the lowest-price allocation strategy", "Request only larger instances", "Disable interruption handling"],
    "a",
    "Diversification across pools reduces the chance that a capacity shortage affects the whole fleet.",
    [
      "Many instance types and AZs spread interruption risk across pools.",
      "Lowest-price tends to select pools more likely to be interrupted.",
      "Larger instances in the same single pool do not diversify risk.",
      "Handling interruption notices is part of reliable Spot usage.",
    ],
    "\"Spot interrupted a lot\" -> diversify types and AZs", ["Spot", "diversification"]
  ),
  mk(
    "spot-reserved-capacity-strategies", 2, 4, "medium",
    "A company expects to change instance families over three years and may want to exchange its commitment, accepting a smaller discount. Which option fits?",
    ["Standard Reserved Instances", "Convertible Reserved Instances", "Spot Instances", "Dedicated Hosts"],
    "b",
    "Convertible RIs can be exchanged for different families, operating systems or tenancies, with a smaller discount than Standard RIs.",
    [
      "Standard RIs offer the largest discount but less flexibility.",
      "Convertible RIs allow exchange for other configurations.",
      "Spot has no commitment and can be interrupted.",
      "Dedicated Hosts are for licensing and compliance needs.",
    ],
    "\"may change instance family\" -> Convertible RI or Compute Savings Plan", ["Convertible RI"]
  ),
  mk(
    "spot-reserved-capacity-strategies", 3, 2, "hard",
    "A retailer needs to be certain that 200 specific instances can launch in one AZ on Black Friday, but does not want a long commitment. Which TWO statements describe a correct approach?",
    ["Use On-Demand Capacity Reservations for the event period", "Combine the reservations with a Savings Plan or regional RI to reduce the price", "A regional Reserved Instance alone guarantees the capacity", "Spot Instances guarantee capacity", "Savings Plans reserve capacity"],
    "ab",
    "Capacity Reservations guarantee capacity without a term, and savings products provide the discount since reservations have no discount themselves.",
    [
      "Capacity Reservations reserve capacity in an AZ and can be released when no longer needed.",
      "Savings Plans or regional RIs can discount the usage that fills the reservation.",
      "A regional RI gives a discount but does not reserve capacity.",
      "Spot capacity can be reclaimed, so it guarantees nothing.",
      "Savings Plans are a pricing commitment and do not reserve capacity.",
    ],
    "\"guaranteed capacity + discount\" -> Capacity Reservation + Savings Plan", ["Capacity Reservation", "Savings Plans"]
  ),

  // ---- Support plans ----
  mk(
    "support-plans-trusted-advisor-health", 1, 4, "easy",
    "A company on the free Basic support plan wants the full set of Trusted Advisor checks, including idle resource cost checks. What must it do?",
    ["Nothing, all checks are free", "Move to a Business-level support plan or higher", "Enable CloudTrail", "Create a second AWS account"],
    "b",
    "The full Trusted Advisor check set requires Business-level support or higher. Basic includes only a limited core set.",
    [
      "Basic includes only a limited set of checks.",
      "Business-level and higher plans unlock the full set.",
      "CloudTrail does not change Trusted Advisor access.",
      "A second account does not unlock checks.",
    ],
    "\"full Trusted Advisor checks\" -> Business level or above", ["Trusted Advisor", "support plan"]
  ),
  mk(
    "support-plans-trusted-advisor-health", 2, 2, "medium",
    "An operations team wants to be notified automatically when AWS plans to retire the hardware under one of its EC2 instances. Which service provides this?",
    ["AWS Trusted Advisor", "AWS Health Dashboard with EventBridge notifications", "AWS Config", "Amazon Inspector"],
    "b",
    "The account health view of the AWS Health Dashboard reports events affecting your resources and can notify through EventBridge.",
    [
      "Trusted Advisor reports on account configuration best practices.",
      "Health Dashboard reports AWS-side events for your resources and integrates with EventBridge.",
      "Config records resource configuration changes.",
      "Inspector scans for vulnerabilities.",
    ],
    "\"AWS event affecting my instance\" -> Health Dashboard + EventBridge", ["Health Dashboard"]
  ),
  mk(
    "support-plans-trusted-advisor-health", 3, 4, "hard",
    "Which statements about AWS support are correct? (Select TWO.)",
    ["Trusted Advisor core checks, such as service limits and some security checks, are available on Basic support", "A designated Technical Account Manager is an Enterprise-level benefit", "Basic support includes 24x7 phone access to cloud support engineers", "Business-level support does not include Trusted Advisor", "The Health Dashboard only shows your own bill"],
    "ab",
    "Basic includes core Trusted Advisor checks, and a designated TAM is part of Enterprise-level support. Phone access to engineers needs a paid plan.",
    [
      "Core checks are available without a paid plan.",
      "A designated TAM comes with the Enterprise level.",
      "Basic support does not include technical phone support.",
      "Business-level support unlocks the full Trusted Advisor set.",
      "The Health Dashboard shows service and account health events, not billing.",
    ],
    "\"TAM\" -> Enterprise level; \"core checks\" -> Basic", ["support plan", "TAM"]
  ),

  // ---- EventBridge ----
  mk(
    "eventbridge-pipes-scheduler-event-bus", 1, 2, "easy",
    "A team must send a reminder to each user at a specific time chosen by that user, for millions of users, without running its own scheduler. Which service fits?",
    ["EventBridge Scheduler", "Amazon SQS standard queue", "AWS Batch", "Amazon Kinesis"],
    "a",
    "Scheduler creates one-time and recurring schedules at massive scale that invoke targets directly.",
    [
      "Scheduler supports millions of one-time and recurring schedules with time zones.",
      "SQS buffers messages and does not schedule invocations at arbitrary times.",
      "Batch runs queued compute jobs.",
      "Kinesis streams data.",
    ],
    "\"per-user timer at scale\" -> EventBridge Scheduler", ["Scheduler"]
  ),
  mk(
    "eventbridge-pipes-scheduler-event-bus", 2, 3, "medium",
    "A team reads records from a DynamoDB stream, filters them, enriches them with a Lambda call and sends them to Step Functions, and wants to avoid writing glue code. Which feature fits?",
    ["EventBridge Pipes", "An EventBridge custom bus with ten rules", "SNS fan-out", "Kinesis Data Firehose"],
    "a",
    "Pipes connect one source to one target with optional filtering and enrichment.",
    [
      "Pipes are point-to-point integrations with filter and enrichment steps.",
      "A bus routes events to many targets by rule and does not poll a DynamoDB stream with enrichment in one managed flow.",
      "SNS fans out messages and does not enrich them.",
      "Firehose delivers streaming data to destinations.",
    ],
    "\"one source to one target with filter and enrichment\" -> Pipes", ["Pipes"]
  ),
  mk(
    "eventbridge-pipes-scheduler-event-bus", 3, 2, "hard",
    "After fixing a bug in a consumer, a team wants to reprocess events that were published to an EventBridge bus over the last three days. Which TWO capabilities help?",
    ["Archive events on the bus", "Replay the archive to the bus or targets", "Delete the rules and recreate them", "Use SNS message retention", "Increase Lambda memory"],
    "ab",
    "EventBridge can archive events and replay them later to reprocess them.",
    [
      "An archive stores events matching a pattern.",
      "Replay sends archived events back through the bus.",
      "Recreating rules does not restore past events.",
      "SNS does not retain delivered messages for replay.",
      "Memory does not recover lost events.",
    ],
    "\"reprocess past events\" -> archive and replay", ["EventBridge", "archive", "replay"]
  ),

  // ---- CloudWatch observability ----
  mk(
    "cloudwatch-observability-synthetics-rum-insights", 1, 2, "easy",
    "A team wants to know that the login flow is broken before customers report it, even at 3 a.m. when there are no users. Which feature fits?",
    ["CloudWatch RUM", "CloudWatch Synthetics canaries", "VPC Flow Logs", "AWS CloudTrail"],
    "b",
    "Synthetics canaries run scripted tests on a schedule and alarm when a flow fails, regardless of real traffic.",
    [
      "RUM only reports on real user sessions and sees nothing at 3 a.m. with no users.",
      "Canaries proactively test endpoints and user flows.",
      "Flow Logs record network traffic metadata.",
      "CloudTrail records API activity.",
    ],
    "\"detect outage before customers, no traffic\" -> Synthetics", ["Synthetics", "canary"]
  ),
  mk(
    "cloudwatch-observability-synthetics-rum-insights", 2, 3, "medium",
    "A web team wants page load times and JavaScript errors from real users' browsers, broken down by country and browser. Which feature fits?",
    ["CloudWatch RUM", "CloudWatch Synthetics", "AWS X-Ray", "Container Insights"],
    "a",
    "RUM collects performance and error data from real users' browsers.",
    [
      "RUM provides real-user monitoring for web applications.",
      "Synthetics runs scripted tests and does not reflect real user sessions.",
      "X-Ray traces requests through services on the backend.",
      "Container Insights monitors containers.",
    ],
    "\"real user page load times by country\" -> RUM", ["RUM"]
  ),
  mk(
    "cloudwatch-observability-synthetics-rum-insights", 3, 2, "hard",
    "A metric has a strong daily and weekly cycle, and a fixed threshold alarm produces many false alarms. What should be used?",
    ["A CloudWatch anomaly detection alarm", "A lower fixed threshold", "A higher fixed threshold only", "A CloudTrail trail"],
    "a",
    "Anomaly detection models the metric's normal pattern and alarms on deviations from it.",
    [
      "Anomaly detection adapts to cyclical behaviour.",
      "A lower fixed threshold would create more false alarms.",
      "A single higher threshold may miss real problems at quiet times.",
      "CloudTrail does not evaluate metrics.",
    ],
    "\"cyclical metric, false alarms\" -> anomaly detection", ["anomaly detection"]
  ),

  // ---- RDS options ----
  mk(
    "rds-custom-blue-green-aurora-io-optimized", 1, 2, "easy",
    "A team wants to test a major PostgreSQL version upgrade on a copy of production and then switch over with minimal downtime and unchanged endpoints. Which feature fits?",
    ["RDS Blue/Green Deployments", "A manual snapshot restore with a new endpoint", "RDS Custom", "Aurora Backtrack"],
    "a",
    "Blue/Green creates a synchronised staging copy, and a switchover promotes it quickly while keeping endpoints.",
    [
      "Blue/Green supports testing changes on a copy and a fast switchover.",
      "A snapshot restore creates a new endpoint and does not stay synchronised.",
      "RDS Custom provides OS-level access and is not a deployment tool.",
      "Backtrack rewinds an Aurora MySQL cluster in place.",
    ],
    "\"test upgrade on a copy then switch over\" -> Blue/Green Deployments", ["Blue/Green"]
  ),
  mk(
    "rds-custom-blue-green-aurora-io-optimized", 2, 3, "medium",
    "A packaged Oracle application requires access to the database host's operating system, but the company wants AWS to automate backups and monitoring. Which service fits?",
    ["Amazon RDS for Oracle (standard)", "Amazon RDS Custom for Oracle", "Amazon DynamoDB", "Amazon Redshift"],
    "b",
    "RDS Custom provides access to the underlying instance and database for customisation while automating management tasks.",
    [
      "Standard RDS does not allow OS-level access.",
      "RDS Custom is designed for customisation needs of Oracle and SQL Server.",
      "DynamoDB is a NoSQL database.",
      "Redshift is a data warehouse.",
    ],
    "\"OS access on a managed database\" -> RDS Custom", ["RDS Custom"]
  ),
  mk(
    "rds-custom-blue-green-aurora-io-optimized", 3, 4, "hard",
    "An Aurora database's I/O charges make up more than 40 percent of its monthly cost. What could reduce and stabilise the bill?",
    ["Aurora I/O-Optimized configuration", "A smaller instance class only", "Disabling backups", "Moving to a single AZ"],
    "a",
    "Aurora I/O-Optimized removes per-I/O charges for a higher compute and storage price, which pays off when I/O is a large share of cost.",
    [
      "I/O-Optimized suits I/O-heavy workloads whose I/O charges dominate the bill.",
      "A smaller instance class does not address I/O charges.",
      "Disabling backups risks data and does not affect I/O cost.",
      "A single AZ reduces resilience and does not lower I/O charges.",
    ],
    "\"I/O charges are a big share of Aurora cost\" -> I/O-Optimized", ["Aurora I/O-Optimized"]
  ),

  // ---- Streaming ETL ----
  mk(
    "streaming-etl-flink-glue-databrew", 1, 3, "easy",
    "A company needs continuous, windowed aggregations on a Kinesis data stream, such as counting events per minute, with results written to S3. Which service fits?",
    ["Amazon Managed Service for Apache Flink", "AWS Glue crawlers", "AWS DataBrew", "Amazon Athena"],
    "a",
    "Managed Service for Apache Flink performs real-time stateful analytics on streams.",
    [
      "Flink supports windowed aggregations on streaming data.",
      "Crawlers populate the Data Catalog.",
      "DataBrew is for visual data preparation.",
      "Athena queries data at rest in S3.",
    ],
    "\"real-time windowed analytics on a stream\" -> Managed Service for Apache Flink", ["Flink", "streaming"]
  ),
  mk(
    "streaming-etl-flink-glue-databrew", 2, 3, "medium",
    "An analyst with no coding experience wants to profile and clean a dataset visually and reuse the steps later. Which service fits?",
    ["AWS Glue DataBrew", "Amazon EMR", "AWS Lambda", "Amazon Kinesis Data Streams"],
    "a",
    "DataBrew is a visual, no-code data preparation service with profiling and reusable recipes.",
    [
      "DataBrew is built for no-code data preparation.",
      "EMR is a cluster platform for big data frameworks that needs engineering skills.",
      "Lambda requires code.",
      "Kinesis streams data.",
    ],
    "\"no-code data cleaning\" -> DataBrew", ["DataBrew"]
  ),
  mk(
    "streaming-etl-flink-glue-databrew", 3, 4, "hard",
    "A nightly Glue ETL job reprocesses all files each run and produces duplicates. How can it process only new data?",
    ["Enable job bookmarks", "Increase the number of DPUs", "Switch to a Glue crawler", "Use Lake Formation permissions"],
    "a",
    "Job bookmarks track data already processed so reruns handle only new data.",
    [
      "Bookmarks persist state about processed data.",
      "More DPUs speed up work but do not prevent reprocessing.",
      "Crawlers discover schemas and do not control ETL state.",
      "Lake Formation controls permissions.",
    ],
    "\"ETL reprocessing the same data\" -> job bookmarks", ["Glue", "job bookmarks"]
  ),

  // ---- IMDSv2 ----
  mk(
    "ec2-imdsv2-user-data-instance-hardening", 1, 1, "easy",
    "A web application on EC2 has a server-side request forgery flaw that could be used to steal the instance role's credentials from the metadata service. What mitigates this?",
    ["Require IMDSv2 on the instance", "Open port 22 to the world", "Store the credentials in user data", "Use a larger instance type"],
    "a",
    "IMDSv2 requires a session token obtained with a PUT request, which blocks simple SSRF requests.",
    [
      "Requiring IMDSv2 reduces the risk of credential theft via SSRF.",
      "Opening SSH widens exposure.",
      "User data is not a secure place for credentials.",
      "Instance size is unrelated.",
    ],
    "\"SSRF steals instance credentials\" -> require IMDSv2", ["IMDSv2", "SSRF"]
  ),
  mk(
    "ec2-imdsv2-user-data-instance-hardening", 2, 1, "medium",
    "A launch script in user data contains a database password. What should the team do instead?",
    ["Keep the password in user data but encrypt the instance", "Store the secret in Secrets Manager and retrieve it at runtime using the instance role", "Place the password in the AMI name", "Email the password to administrators"],
    "b",
    "User data is readable and unencrypted. Secrets Manager with an instance role provides secure runtime retrieval.",
    [
      "User data remains readable regardless of volume encryption.",
      "Secrets Manager with the role gives controlled access and rotation.",
      "AMI names are visible and not secret.",
      "Email is not a secure channel.",
    ],
    "\"secret in user data\" -> Secrets Manager at runtime", ["user data", "Secrets Manager"]
  ),
  mk(
    "ec2-imdsv2-user-data-instance-hardening", 3, 1, "hard",
    "Which TWO statements about EC2 user data are correct?",
    ["It is limited to 16 KB", "By default it runs only at first boot of the instance", "It is encrypted at rest and invisible to other users", "It can safely hold production secrets", "It runs on every reboot by default"],
    "ab",
    "User data is limited to 16 KB and by default runs at first launch. It is not encrypted and should not contain secrets.",
    [
      "The size limit is 16 KB.",
      "By default it executes on the first boot.",
      "It is not encrypted and can be read.",
      "Secrets in user data are exposed.",
      "Default behaviour is first boot only.",
    ],
    "user data: 16 KB, first boot, not secret", ["user data"]
  ),

  // ---- Network troubleshooting ----
  mk(
    "network-troubleshooting-reachability-lattice", 1, 1, "easy",
    "An engineer cannot connect from instance A to instance B and wants to find out which security group, NACL or route blocks the path without sending traffic. Which tool fits?",
    ["VPC Reachability Analyzer", "VPC Traffic Mirroring", "AWS Shield", "Amazon Macie"],
    "a",
    "Reachability Analyzer analyses the configuration of the path and identifies the blocking component without sending packets.",
    [
      "Reachability Analyzer evaluates the configured path.",
      "Traffic Mirroring copies live packets.",
      "Shield protects against DDoS.",
      "Macie finds sensitive data in S3.",
    ],
    "\"why is it blocked, no traffic\" -> Reachability Analyzer", ["Reachability Analyzer"]
  ),
  mk(
    "network-troubleshooting-reachability-lattice", 2, 1, "medium",
    "A security team wants to verify that database subnets can never be reached from the internet and find any path that violates that rule. Which tool fits?",
    ["Network Access Analyzer", "Amazon Inspector", "AWS CloudHSM", "Route 53 health checks"],
    "a",
    "Network Access Analyzer checks network access against your intended access rules and reports violating paths.",
    [
      "Network Access Analyzer finds unintended access paths.",
      "Inspector scans compute for vulnerabilities.",
      "CloudHSM stores keys.",
      "Health checks monitor endpoint availability.",
    ],
    "\"find unintended network paths\" -> Network Access Analyzer", ["Network Access Analyzer"]
  ),
  mk(
    "network-troubleshooting-reachability-lattice", 3, 3, "hard",
    "A company runs hundreds of microservices across many VPCs and accounts and wants consistent service-to-service routing, IAM-based authorization and observability without building peering or Transit Gateway routes for each pair. Which service fits?",
    ["Amazon VPC Lattice", "VPC peering", "AWS Direct Connect", "NAT gateway"],
    "a",
    "VPC Lattice provides application-layer service networking with routing, auth policies and monitoring across VPCs and accounts.",
    [
      "VPC Lattice connects and secures services at the application layer.",
      "Peering is network-level, one-to-one and non-transitive.",
      "Direct Connect connects on-premises networks.",
      "NAT gateways provide outbound internet access.",
    ],
    "\"service-to-service across VPCs with auth policies\" -> VPC Lattice", ["VPC Lattice"]
  ),

  // ---- S3 Express One Zone ----
  mk(
    "s3-express-one-zone-mountpoint-performance", 1, 3, "easy",
    "A machine learning training job in one AZ needs single-digit millisecond access to its dataset and can recreate the data if needed. Which S3 option fits?",
    ["S3 Express One Zone with the bucket in the same AZ", "S3 Glacier Deep Archive", "S3 Standard-IA", "S3 Intelligent-Tiering archive tier"],
    "a",
    "Express One Zone provides consistent single-digit millisecond latency in a single AZ, ideal when compute is co-located and the data can be recreated.",
    [
      "Express One Zone is designed for latency-sensitive workloads in one AZ.",
      "Deep Archive retrieval takes hours.",
      "Standard-IA has higher latency than Express One Zone and is for infrequent access.",
      "Archive tiers are for rarely accessed data.",
    ],
    "\"single-digit millisecond, one AZ\" -> S3 Express One Zone", ["S3 Express One Zone"]
  ),
  mk(
    "s3-express-one-zone-mountpoint-performance", 2, 3, "medium",
    "A Linux application expects to read files from a directory, and the data lives in S3. The team wants high read throughput without rewriting the application. Which tool fits?",
    ["Mountpoint for Amazon S3", "S3 Batch Operations", "Amazon Athena", "AWS Direct Connect"],
    "a",
    "Mountpoint mounts a bucket as a local file system on Linux for high-throughput reads and sequential writes.",
    [
      "Mountpoint gives file-style access to S3 objects.",
      "Batch Operations performs bulk actions on objects.",
      "Athena runs SQL queries over data.",
      "Direct Connect is a network link.",
    ],
    "\"mount S3 as a file system\" -> Mountpoint for S3", ["Mountpoint"]
  ),
  mk(
    "s3-express-one-zone-mountpoint-performance", 3, 3, "hard",
    "Which statement about Amazon S3 consistency is correct?",
    ["S3 provides eventual consistency for overwrites and deletes", "S3 provides strong read-after-write consistency for PUTs, overwrites, deletes and list operations", "S3 provides strong consistency only for new objects", "S3 requires a special setting to enable strong consistency"],
    "b",
    "Since December 2020 S3 provides strong read-after-write consistency for all object operations and listings at no extra cost.",
    [
      "Eventual consistency for overwrites and deletes is outdated.",
      "S3 is strongly consistent for writes, overwrites, deletes and lists.",
      "Strong consistency applies to overwrites and deletes as well as new objects.",
      "No setting is needed. It applies by default.",
    ],
    "S3 = strongly consistent", ["S3 consistency"]
  ),
];

export const deepDiveMNFlashcards: Flashcard[] = [
  fc("storage-service-decision-guide", 1, 3, "Storage", "Object vs block vs file storage?", "Object: S3 (key-based, HTTP API). Block: EBS or instance store (disk for one instance). File: EFS (NFS, Linux) and FSx (Windows SMB, Lustre, ONTAP, OpenZFS)."),
  fc("storage-service-decision-guide", 2, 3, "Storage", "Four FSx file system types?", "Windows File Server (SMB, AD), Lustre (HPC/ML, S3-linked), NetApp ONTAP (NFS, SMB, iSCSI), OpenZFS (low-latency NFS with ZFS features)."),
  fc("storage-service-decision-guide", 3, 3, "Storage", "Is S3 eventually consistent?", "No. Since December 2020 S3 provides strong read-after-write consistency for PUTs, overwrites, deletes and list operations."),

  fc("compute-service-decision-guide", 1, 3, "Compute", "Compute ladder, most to least control?", "EC2, containers on EC2, containers on Fargate, Beanstalk or App Runner, Lambda. Choose the most managed service that meets the requirements."),
  fc("compute-service-decision-guide", 2, 3, "Compute", "Lambda limit that forces another service?", "A 15-minute maximum duration. Longer work goes to Fargate, ECS, Batch or EC2."),
  fc("compute-service-decision-guide", 3, 4, "Compute", "Best fit for thousands of queued independent jobs?", "AWS Batch, often with Spot Instances for the lowest cost."),

  fc("identity-service-decision-guide", 1, 1, "Security, Identity, and Compliance", "Which identity service for which population?", "AWS workloads: IAM roles. Employees: IAM Identity Center. Customers: Cognito. Existing AD: Directory Service. Non-AWS servers: IAM Roles Anywhere."),
  fc("identity-service-decision-guide", 2, 1, "Security, Identity, and Compliance", "Directory Service options?", "Managed Microsoft AD (real AD in AWS, trust with on-premises), AD Connector (proxy to on-premises AD, stores no data) and Simple AD (basic Samba-based)."),
  fc("identity-service-decision-guide", 3, 1, "Security, Identity, and Compliance", "IAM Roles Anywhere?", "Exchanges an X.509 certificate from your CA for temporary AWS credentials, so workloads outside AWS avoid long-lived access keys."),

  fc("caching-and-edge-decision-guide", 1, 3, "Networking and Content Delivery", "CloudFront vs Global Accelerator?", "CloudFront caches HTTP content at the edge. Global Accelerator does not cache. It gives static anycast IPs and routes TCP and UDP to the best healthy endpoint."),
  fc("caching-and-edge-decision-guide", 2, 3, "Networking and Content Delivery", "DAX vs ElastiCache vs MemoryDB?", "DAX: drop-in DynamoDB cache. ElastiCache: general cache needing app logic. MemoryDB: durable in-memory primary database."),
  fc("caching-and-edge-decision-guide", 3, 3, "Networking and Content Delivery", "API Gateway cache default TTL?", "300 seconds, which reduces backend calls for repeated requests."),

  fc("spot-reserved-capacity-strategies", 1, 4, "AWS Cost Management", "Reliable Spot usage?", "Diversify across many instance types and AZs, use price-capacity-optimized allocation, handle the two-minute interruption notice, and use an On-Demand base in a mixed instances Auto Scaling group."),
  fc("spot-reserved-capacity-strategies", 2, 4, "AWS Cost Management", "Standard vs Convertible RI?", "Standard: bigger discount, can be sold on the RI Marketplace. Convertible: smaller discount, exchangeable for other configurations, not resellable."),
  fc("spot-reserved-capacity-strategies", 3, 2, "AWS Cost Management", "Which options reserve capacity?", "Zonal Reserved Instances and On-Demand Capacity Reservations. Regional RIs and Savings Plans give a discount but do not reserve capacity."),

  fc("support-plans-trusted-advisor-health", 1, 4, "Management and Governance", "Trusted Advisor checks by plan?", "Core checks (service limits, some security) on Basic. The full set requires Business-level support or higher."),
  fc("support-plans-trusted-advisor-health", 2, 2, "Management and Governance", "Health Dashboard vs Trusted Advisor?", "Health Dashboard: AWS service status and events affecting your resources (with EventBridge). Trusted Advisor: best-practice checks on your account."),
  fc("support-plans-trusted-advisor-health", 3, 4, "Management and Governance", "Support plan names?", "Classic: Basic, Developer, Business, Enterprise On-Ramp, Enterprise. From December 2025: Basic plus Business Support+, Enterprise Support and Unified Operations. Classic plans continue until January 1, 2027."),

  fc("eventbridge-pipes-scheduler-event-bus", 1, 2, "Application Integration", "Bus vs Pipes vs Scheduler?", "Bus: route events to many targets by rule. Pipes: one source to one target with filter and enrichment. Scheduler: one-time and recurring schedules at scale."),
  fc("eventbridge-pipes-scheduler-event-bus", 2, 2, "Application Integration", "Reprocessing EventBridge events?", "Archive events on the bus and replay the archive later."),
  fc("eventbridge-pipes-scheduler-event-bus", 3, 3, "Application Integration", "EventBridge API destinations?", "Let a rule call an HTTPS endpoint outside AWS with managed authentication and rate limiting."),

  fc("cloudwatch-observability-synthetics-rum-insights", 1, 2, "Management and Governance", "Synthetics vs RUM?", "Synthetics: scripted canaries that proactively test endpoints and flows on a schedule. RUM: passive real-user performance and error data from browsers."),
  fc("cloudwatch-observability-synthetics-rum-insights", 2, 3, "Management and Governance", "Logs Insights?", "Query log groups in place to filter, aggregate and visualise. Metric filters turn log patterns into metrics."),
  fc("cloudwatch-observability-synthetics-rum-insights", 3, 2, "Management and Governance", "Alarm for cyclical metrics?", "CloudWatch anomaly detection, which models normal patterns instead of using a fixed threshold."),

  fc("rds-custom-blue-green-aurora-io-optimized", 1, 2, "Database", "RDS Blue/Green Deployments?", "A synchronised green staging copy of production for testing changes, then a switchover typically under a minute with endpoints preserved."),
  fc("rds-custom-blue-green-aurora-io-optimized", 2, 3, "Database", "When RDS Custom?", "Oracle or SQL Server applications that need OS-level access and customisation while AWS still automates backups and monitoring."),
  fc("rds-custom-blue-green-aurora-io-optimized", 3, 4, "Database", "Aurora I/O-Optimized vs Standard?", "I/O-Optimized has no per-I/O charges and a higher compute and storage price, suited when I/O is more than about 25 percent of Aurora spend."),

  fc("streaming-etl-flink-glue-databrew", 1, 3, "Analytics", "Flink vs Glue vs DataBrew vs Firehose?", "Flink: real-time stream analytics. Glue: serverless ETL and catalogue. DataBrew: no-code data preparation. Firehose: simple delivery of streams to destinations."),
  fc("streaming-etl-flink-glue-databrew", 2, 3, "Analytics", "Kinesis Data Analytics today?", "It is now Amazon Managed Service for Apache Flink, supporting Java, Python, Scala and SQL."),
  fc("streaming-etl-flink-glue-databrew", 3, 4, "Analytics", "Glue job bookmarks?", "They track data already processed so reruns handle only new data and avoid duplicates."),

  fc("ec2-imdsv2-user-data-instance-hardening", 1, 1, "Compute", "IMDSv1 vs IMDSv2?", "IMDSv1 answers simple GET requests. IMDSv2 needs a token from a PUT request in a header, which blocks typical SSRF abuse. Require it with HttpTokens set to required."),
  fc("ec2-imdsv2-user-data-instance-hardening", 2, 1, "Compute", "User data facts?", "Runs at first boot by default, up to 16 KB, not encrypted. Never put secrets in it. Use Secrets Manager or Parameter Store at runtime."),
  fc("ec2-imdsv2-user-data-instance-hardening", 3, 1, "Compute", "Basic EC2 hardening?", "Instance profiles instead of keys, IMDSv2, Session Manager, EBS encryption by default, Patch Manager, Inspector, least-privilege roles."),

  fc("network-troubleshooting-reachability-lattice", 1, 1, "Networking and Content Delivery", "Reachability Analyzer?", "Analyses the configuration of a path between source and destination and shows which component blocks it. It sends no packets."),
  fc("network-troubleshooting-reachability-lattice", 2, 1, "Networking and Content Delivery", "Flow Logs vs Traffic Mirroring?", "Flow Logs record metadata of accepted and rejected traffic. Traffic Mirroring copies actual packets to an inspection appliance."),
  fc("network-troubleshooting-reachability-lattice", 3, 3, "Networking and Content Delivery", "VPC Lattice?", "Application-layer service networking across VPCs and accounts with routing, IAM auth policies and observability, without per-pair peering or routes."),

  fc("s3-express-one-zone-mountpoint-performance", 1, 3, "Storage", "S3 Express One Zone?", "High-performance storage class in a single AZ you choose, using directory buckets with single-digit millisecond latency. Co-locate compute in the same AZ."),
  fc("s3-express-one-zone-mountpoint-performance", 2, 3, "Storage", "Mountpoint for Amazon S3?", "Mounts a bucket as a local file system on Linux for high-throughput reads and sequential writes. Not a full POSIX file system."),
  fc("s3-express-one-zone-mountpoint-performance", 3, 3, "Storage", "S3 consistency model?", "Strong read-after-write consistency for all object operations and listings."),
];
