import type { Flashcard, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const deepDiveIJQuestions: Question[] = [
  // ---- CloudTrail and Config ----
  mk(
    "cloudtrail-config-event-types", 1, 1, "easy",
    "A security team must determine which IAM user deleted an S3 bucket and from which IP address. Which service holds this information?",
    ["AWS Config", "AWS CloudTrail", "Amazon CloudWatch metrics", "AWS Trusted Advisor"],
    "b",
    "CloudTrail records API calls, including the identity, time and source IP address of the caller.",
    [
      "Config records resource configuration and compliance, not who called the API.",
      "CloudTrail records who made each API call and from where.",
      "CloudWatch metrics show performance numbers.",
      "Trusted Advisor gives best-practice recommendations.",
    ],
    "\"who made the API call\" -> CloudTrail", ["CloudTrail", "audit"]
  ),
  mk(
    "cloudtrail-config-event-types", 2, 1, "medium",
    "A company wants an automatic check that every S3 bucket in all accounts blocks public access, with non-compliant buckets fixed automatically. Which combination fits?",
    ["CloudTrail Insights", "AWS Config rules with remediation through Systems Manager Automation", "Amazon Inspector", "VPC Flow Logs"],
    "b",
    "Config rules evaluate resource configuration for compliance, and remediation actions can run Systems Manager Automation documents to fix non-compliant resources.",
    [
      "Insights detects unusual API activity, not bucket configuration.",
      "Config rules plus remediation detect and fix non-compliant configuration.",
      "Inspector scans for software vulnerabilities.",
      "Flow Logs capture network traffic metadata.",
    ],
    "\"compliance rule + auto-remediate\" -> Config rule + SSM Automation", ["Config", "remediation"]
  ),
  mk(
    "cloudtrail-config-event-types", 3, 1, "hard",
    "A company wants to audit all API activity in every account of its organization, keep it for seven years and be able to prove the logs were not altered. Which TWO actions should it take?",
    ["Create an organization trail that delivers to a protected S3 bucket", "Enable CloudTrail log file integrity validation", "Rely on Event history in each account", "Enable VPC Flow Logs in every VPC", "Use CloudWatch alarms on CPU utilisation"],
    "ab",
    "An organization trail captures all accounts, and log file validation provides signed digests that prove logs were not modified. Event history only retains 90 days.",
    [
      "An organization trail from the management account logs every member account to S3 for long retention.",
      "Integrity validation produces digest files that detect tampering.",
      "Event history is limited to 90 days of management events.",
      "Flow Logs record network traffic, not API activity.",
      "CPU alarms are unrelated to API auditing.",
    ],
    "\"all accounts, long retention, tamper-evident\" -> organization trail + validation", ["organization trail", "log validation"]
  ),

  // ---- Security service guide ----
  mk(
    "security-services-decision-guide", 1, 1, "easy",
    "A company wants to detect compromised EC2 instances and unusual API activity without installing agents. Which service fits?",
    ["Amazon Inspector", "Amazon GuardDuty", "Amazon Macie", "AWS Artifact"],
    "b",
    "GuardDuty analyses CloudTrail, VPC Flow Logs and DNS logs to detect threats with no agents.",
    [
      "Inspector scans for software vulnerabilities and exposure.",
      "GuardDuty is the agentless threat detection service.",
      "Macie discovers sensitive data in S3.",
      "Artifact provides compliance reports.",
    ],
    "\"detect threats, no agents\" -> GuardDuty", ["GuardDuty"]
  ),
  mk(
    "security-services-decision-guide", 2, 1, "medium",
    "A compliance team needs to find buckets that contain personally identifiable information across an organization's S3 buckets. Which service should they use?",
    ["Amazon GuardDuty", "Amazon Macie", "Amazon Inspector", "AWS WAF"],
    "b",
    "Macie uses machine learning and pattern matching to discover sensitive data such as PII in S3.",
    [
      "GuardDuty detects threats, not sensitive content.",
      "Macie is the sensitive data discovery service for S3.",
      "Inspector looks for vulnerabilities in compute resources.",
      "WAF filters web requests.",
    ],
    "\"PII in S3\" -> Macie", ["Macie", "PII"]
  ),
  mk(
    "security-services-decision-guide", 3, 1, "hard",
    "A security team gets many findings from GuardDuty, Inspector and Macie across 40 accounts. Which TWO services help them aggregate the findings and investigate a suspicious finding to its root cause?",
    ["AWS Security Hub to aggregate and prioritise findings", "Amazon Detective to investigate related activity", "AWS Shield Advanced", "AWS Artifact", "Amazon Route 53 Resolver"],
    "ab",
    "Security Hub aggregates and prioritises findings from several services, and Detective builds a graph of related activity to find the root cause.",
    [
      "Security Hub provides a central view of findings across accounts.",
      "Detective supports investigation of findings.",
      "Shield Advanced protects against DDoS attacks.",
      "Artifact provides AWS compliance documents.",
      "Resolver handles DNS resolution and does not aggregate findings.",
    ],
    "\"aggregate findings\" -> Security Hub, \"investigate\" -> Detective", ["Security Hub", "Detective"]
  ),

  // ---- WAF and Shield ----
  mk(
    "waf-shield-ddos-resilience", 1, 1, "easy",
    "A public website behind CloudFront is being hit by a single client sending thousands of requests per minute to the login page. Which control best mitigates this?",
    ["A rate-based rule in AWS WAF", "A larger instance type", "An additional NAT gateway", "A new KMS key"],
    "a",
    "A rate-based rule blocks IP addresses that exceed a request threshold within a time window.",
    [
      "Rate-based rules limit abusive request rates per client.",
      "Bigger instances do not stop abusive traffic and add cost.",
      "NAT gateways handle outbound traffic.",
      "KMS keys do not filter requests.",
    ],
    "\"too many requests from one client\" -> WAF rate-based rule", ["WAF", "rate-based"]
  ),
  mk(
    "waf-shield-ddos-resilience", 2, 1, "medium",
    "A company wants access to an AWS response team during large DDoS attacks and protection from scaling cost spikes caused by an attack. What should it use?",
    ["AWS Shield Standard", "AWS Shield Advanced", "Security groups", "AWS Config"],
    "b",
    "Shield Advanced adds access to the Shield Response Team, enhanced detection and cost protection for protected resources.",
    [
      "Shield Standard is automatic but does not include the response team or cost protection.",
      "Shield Advanced provides those paid features.",
      "Security groups are stateful network filters and do not provide DDoS response support.",
      "Config tracks configuration and compliance.",
    ],
    "\"response team + cost protection\" -> Shield Advanced", ["Shield Advanced"]
  ),
  mk(
    "waf-shield-ddos-resilience", 3, 2, "hard",
    "A company wants to harden an internet-facing application against DDoS and web exploits. Which TWO design choices follow AWS best practice?",
    ["Serve the application through CloudFront and attach a WAF web ACL", "Restrict the load balancer so it accepts traffic only from CloudFront", "Expose instance public IP addresses directly for faster access", "Disable Auto Scaling to control cost", "Open all ports in the security group for troubleshooting"],
    "ab",
    "An edge-first design absorbs attacks, and locking down the origin prevents attackers from bypassing CloudFront and WAF.",
    [
      "CloudFront with WAF filters traffic at the edge.",
      "Restricting the origin to CloudFront prevents direct attacks on it.",
      "Exposed instance IPs let attackers bypass the edge.",
      "Auto Scaling helps absorb legitimate surges, so disabling it hurts resilience.",
      "Opening all ports expands the attack surface.",
    ],
    "\"DDoS resilient design\" -> edge-first, hidden origin", ["DDoS", "CloudFront", "WAF"]
  ),

  // ---- Event-driven selection ----
  mk(
    "event-driven-service-selection", 1, 2, "easy",
    "An order event must trigger three independent systems: billing, inventory and email, each processing it at its own pace. Which pattern fits?",
    ["One SQS queue read by all three systems", "An SNS topic with an SQS queue subscribed for each system", "A single Lambda function calling the three systems in sequence", "Kinesis Data Firehose"],
    "b",
    "SNS fans out the message to every subscriber, and a separate SQS queue per system buffers it so each can process at its own pace.",
    [
      "A single queue delivers each message to one consumer, not all three.",
      "SNS to SQS fan-out is the standard pattern.",
      "A sequential function couples the systems and a failure blocks the rest.",
      "Firehose delivers streaming data to destinations like S3.",
    ],
    "\"one event, many independent consumers\" -> SNS to SQS fan-out", ["SNS", "SQS", "fan-out"]
  ),
  mk(
    "event-driven-service-selection", 2, 2, "medium",
    "A company runs applications that use JMS and AMQP with an on-premises message broker and wants to move to AWS without changing application code. Which service fits?",
    ["Amazon SQS", "Amazon MQ", "Amazon SNS", "AWS Step Functions"],
    "b",
    "Amazon MQ is a managed broker supporting standard protocols such as JMS and AMQP, so applications need little or no change.",
    [
      "SQS uses its own API and would require code changes.",
      "Amazon MQ supports the existing protocols.",
      "SNS also uses its own API.",
      "Step Functions orchestrates workflows and is not a broker.",
    ],
    "\"JMS / AMQP, no code change\" -> Amazon MQ", ["Amazon MQ"]
  ),
  mk(
    "event-driven-service-selection", 3, 3, "hard",
    "Clickstream data must be read in real time by several independent applications, in order within each user's events, and a new application must be able to reprocess the last three days. Which service fits?",
    ["Amazon SQS Standard", "Amazon SNS", "Kinesis Data Streams", "Amazon EventBridge"],
    "c",
    "Kinesis Data Streams keeps ordered records per shard for a retention period, supports several consumers and allows replay.",
    [
      "SQS removes messages after processing and does not support replay.",
      "SNS does not retain messages for replay.",
      "Data Streams provides ordering by partition key, multiple consumers and retention for replay.",
      "EventBridge routes events by rules and is not an ordered stream for high-volume replay.",
    ],
    "\"ordered, multiple consumers, replay\" -> Kinesis Data Streams", ["Kinesis Data Streams", "replay"]
  ),

  // ---- Step Functions ----
  mk(
    "step-functions-workflow-types", 1, 2, "easy",
    "A business approval process can wait up to several weeks for a manager's response and needs a full audit history of each step. Which Step Functions workflow type fits?",
    ["Express", "Standard", "Neither, because workflows are limited to 15 minutes", "A Lambda function with a long timeout"],
    "b",
    "Standard workflows can run for up to a year with exactly-once execution and a complete execution history.",
    [
      "Express workflows run for at most five minutes.",
      "Standard supports long-running, auditable workflows.",
      "Step Functions Standard can run far longer than 15 minutes.",
      "Lambda is limited to 15 minutes per invocation.",
    ],
    "\"long-running, auditable\" -> Standard", ["Step Functions", "Standard"]
  ),
  mk(
    "step-functions-workflow-types", 2, 4, "medium",
    "A pipeline processes millions of short IoT messages per hour, each handled in under a minute, and cost per execution matters. Which workflow type is the best fit?",
    ["Standard", "Express", "A single EC2 instance", "AWS Batch"],
    "b",
    "Express workflows are designed for high-volume, short-duration executions and are priced by requests and duration.",
    [
      "Standard is priced per state transition and costs more at very high volume.",
      "Express suits very high-volume short workflows at lower cost.",
      "A single instance would be a scaling and availability risk.",
      "Batch is for batch compute jobs, not message-driven orchestration.",
    ],
    "\"millions of short executions\" -> Express", ["Step Functions", "Express"]
  ),
  mk(
    "step-functions-workflow-types", 3, 2, "hard",
    "A workflow calls three Lambda functions. The second fails occasionally and must be retried with backoff, and if it keeps failing a compensation step must run. Where should this logic be placed?",
    ["Inside each Lambda function's code", "In the state machine using Retry and Catch fields", "In an SQS dead-letter queue only", "In CloudWatch alarms"],
    "b",
    "Retry and Catch in the state machine provide declarative retries with backoff and fallback paths.",
    [
      "Embedding retry logic in functions duplicates it and hides the workflow.",
      "Retry and Catch handle backoff and compensation in one place.",
      "A DLQ stores failed messages and does not run compensation logic.",
      "Alarms notify but do not control workflow behaviour.",
    ],
    "\"retry with backoff, then fallback\" -> Retry and Catch", ["Step Functions", "Retry", "Catch"]
  ),

  // ---- CloudFormation ----
  mk(
    "cloudformation-change-sets-drift-stacksets", 1, 2, "easy",
    "Before updating a production stack, an engineer wants to see which resources would be replaced without applying anything. What should be used?",
    ["A change set", "Drift detection", "A stack policy", "Termination protection"],
    "a",
    "A change set previews the changes an update would make without applying them.",
    [
      "Change sets show additions, modifications and replacements before execution.",
      "Drift detection compares live resources to the template.",
      "A stack policy restricts which resources can be updated.",
      "Termination protection prevents stack deletion.",
    ],
    "\"preview before update\" -> change set", ["change set"]
  ),
  mk(
    "cloudformation-change-sets-drift-stacksets", 2, 1, "medium",
    "A security team wants the same baseline stack deployed automatically to every account in an organizational unit across two Regions. Which feature should they use?",
    ["Nested stacks", "CloudFormation StackSets with service-managed permissions", "Change sets", "Stack exports"],
    "b",
    "StackSets deploy a template to many accounts and Regions, and service-managed permissions with Organizations automatically include new accounts in the OU.",
    [
      "Nested stacks compose templates within one account and Region.",
      "StackSets are built for multi-account and multi-Region deployment.",
      "Change sets preview updates.",
      "Exports share values between stacks in a Region.",
    ],
    "\"same template to many accounts and Regions\" -> StackSets", ["StackSets", "Organizations"]
  ),
  mk(
    "cloudformation-change-sets-drift-stacksets", 3, 2, "hard",
    "A stack that contains an RDS database is deleted by mistake during cleanup, and the team wants to guarantee data is preserved in future. Which TWO measures help?",
    ["Set DeletionPolicy to Snapshot or Retain on the database", "Enable termination protection on the stack", "Disable rollback on failure", "Remove the database from the template", "Turn off drift detection"],
    "ab",
    "DeletionPolicy preserves the data when the stack is deleted, and termination protection prevents accidental stack deletion.",
    [
      "Snapshot or Retain keeps the data when the resource would otherwise be deleted.",
      "Termination protection blocks deletion of the stack.",
      "Rollback behaviour is unrelated to deletion protection.",
      "Removing the database from the template would delete it on the next update.",
      "Drift detection does not protect data.",
    ],
    "\"don't lose the DB when the stack is deleted\" -> DeletionPolicy + termination protection", ["DeletionPolicy", "CloudFormation"]
  ),

  // ---- Systems Manager ----
  mk(
    "systems-manager-capabilities", 1, 1, "easy",
    "Administrators need shell access to EC2 instances in private subnets without opening port 22, without a bastion host and with sessions logged. Which service fits?",
    ["EC2 Instance Connect over the internet", "AWS Systems Manager Session Manager", "A VPN for each administrator", "AWS Direct Connect"],
    "b",
    "Session Manager provides audited shell access over an outbound connection from the SSM Agent, with no inbound ports or bastion.",
    [
      "Instance Connect still relies on SSH connectivity and an open port.",
      "Session Manager needs no inbound ports and can log sessions.",
      "A VPN per administrator is heavy and does not provide session logging by itself.",
      "Direct Connect is a network link and not an access tool.",
    ],
    "\"no open ports, no bastion\" -> Session Manager", ["Session Manager"]
  ),
  mk(
    "systems-manager-capabilities", 2, 2, "medium",
    "A new EC2 instance does not appear in Systems Manager even though the SSM Agent is installed. What is the most likely missing item?",
    ["An IAM instance profile that allows Systems Manager", "A larger instance type", "An Elastic IP address", "A Multi-AZ deployment"],
    "a",
    "Managed nodes need an instance profile with permissions such as AmazonSSMManagedInstanceCore to communicate with Systems Manager.",
    [
      "The instance profile grants the agent permission to register.",
      "Instance size does not affect registration.",
      "A public IP is not required if endpoints or NAT provide connectivity.",
      "Multi-AZ is not relevant to EC2 instance registration.",
    ],
    "\"instance not showing in SSM\" -> instance profile or connectivity", ["SSM Agent", "instance profile"]
  ),
  mk(
    "systems-manager-capabilities", 3, 2, "hard",
    "A company must patch hundreds of Linux and Windows instances monthly during an approved window and report compliance. Which TWO Systems Manager capabilities support this?",
    ["Patch Manager with patch baselines", "Maintenance windows", "Session Manager port forwarding", "Parameter Store", "Distributor"],
    "ab",
    "Patch Manager applies patches according to baselines and reports compliance, and maintenance windows schedule the work.",
    [
      "Patch baselines define which patches to apply and report compliance.",
      "Maintenance windows run tasks at approved times.",
      "Port forwarding provides connectivity and does not patch.",
      "Parameter Store holds configuration values.",
      "Distributor packages and distributes software and is not the patching engine.",
    ],
    "\"patch fleet on a schedule\" -> Patch Manager + maintenance window", ["Patch Manager"]
  ),

  // ---- RDS backup ----
  mk(
    "rds-backup-restore-encryption", 1, 2, "easy",
    "An engineer restores an RDS database to a point in time from automated backups. What is the result?",
    ["The existing instance is overwritten in place", "A new DB instance is created with a new endpoint", "The restore is applied to the read replica only", "The backups are deleted"],
    "b",
    "Restores always create a new DB instance with its own endpoint, so the application must be repointed.",
    [
      "Restores do not overwrite the existing instance.",
      "A new instance and endpoint are created.",
      "Read replicas are not the target of a point-in-time restore.",
      "Backups are retained during restore.",
    ],
    "\"RDS restore\" -> new instance, new endpoint", ["RDS", "restore"]
  ),
  mk(
    "rds-backup-restore-encryption", 2, 1, "medium",
    "A production RDS instance was created without encryption and must now be encrypted. What is the correct procedure?",
    ["Enable encryption in the instance settings", "Take a snapshot, copy it with encryption enabled, and restore from the encrypted copy", "Create an encrypted read replica of the unencrypted instance and promote it", "Enable S3 default encryption"],
    "b",
    "Encryption cannot be enabled on an existing unencrypted RDS instance. Copying a snapshot with encryption and restoring from it produces an encrypted instance.",
    [
      "That setting cannot be changed directly on an existing instance.",
      "Encrypted snapshot copy and restore is the supported path.",
      "A replica of an unencrypted instance cannot be encrypted that way.",
      "S3 settings do not apply to RDS.",
    ],
    "\"encrypt existing RDS\" -> snapshot, encrypted copy, restore", ["RDS", "encryption", "snapshot"]
  ),
  mk(
    "rds-backup-restore-encryption", 3, 4, "hard",
    "A company wants to keep database backups for seven years at the lowest cost and does not need point-in-time recovery for that period. Which approach fits?",
    ["Set the automated backup retention to 35 days and rely on it", "Take manual snapshots (or use AWS Backup with a long retention and cold storage) and delete automated backups as they expire", "Keep a Multi-AZ standby for seven years", "Increase the instance size"],
    "b",
    "Automated backups are limited to 35 days. Long-term retention uses manual snapshots or AWS Backup with lifecycle rules.",
    [
      "35 days is the maximum for automated backups, not seven years.",
      "Manual snapshots or AWS Backup provide long retention, with cold storage reducing cost.",
      "A standby provides availability, not retention.",
      "Instance size has no effect on backup retention.",
    ],
    "\"retain 7 years cheaply\" -> snapshots or AWS Backup lifecycle", ["retention", "AWS Backup"]
  ),

  // ---- Encryption in transit ----
  mk(
    "encryption-in-transit-patterns", 1, 1, "easy",
    "A company serves a website through CloudFront and wants to use an ACM public certificate. In which Region must the certificate be requested?",
    ["The Region of the origin", "us-east-1", "eu-west-1", "Any Region"],
    "b",
    "Certificates used by CloudFront must be in us-east-1.",
    [
      "The origin's Region is irrelevant for CloudFront certificates.",
      "CloudFront requires certificates in us-east-1.",
      "eu-west-1 is not required.",
      "Not every Region works for CloudFront certificates.",
    ],
    "\"CloudFront certificate\" -> us-east-1", ["ACM", "CloudFront"]
  ),
  mk(
    "encryption-in-transit-patterns", 2, 1, "medium",
    "Compliance requires traffic to be encrypted all the way from the client to the application instances, not only to the load balancer. Which design meets this?",
    ["Terminate TLS at the ALB and use HTTP to the targets", "Use an HTTPS listener on the ALB and an HTTPS target group with certificates on the instances", "Use security groups to hide the instances", "Enable S3 SSE"],
    "b",
    "Re-encrypting from the load balancer to the targets with HTTPS provides end-to-end encryption.",
    [
      "HTTP to the targets leaves that hop unencrypted.",
      "HTTPS on both hops encrypts the whole path.",
      "Security groups do not encrypt traffic.",
      "SSE protects stored S3 objects, not network traffic.",
    ],
    "\"encrypted to the instances\" -> HTTPS target group (re-encrypt)", ["TLS", "ALB", "end-to-end"]
  ),
  mk(
    "encryption-in-transit-patterns", 3, 1, "hard",
    "A company wants certificates to renew automatically with no human action and to force all S3 requests to use HTTPS. Which TWO actions achieve this?",
    ["Use ACM with DNS validation and keep the validation record in place", "Add a bucket policy that denies requests where aws:SecureTransport is false", "Use email validation and respond to renewal messages", "Disable TLS on the load balancer", "Allow public access to the bucket"],
    "ab",
    "DNS validation allows ACM to renew automatically, and a SecureTransport condition denies non-TLS requests to S3.",
    [
      "ACM can renew automatically when the DNS validation record remains.",
      "The aws:SecureTransport condition enforces HTTPS.",
      "Email validation depends on a person responding.",
      "Disabling TLS removes encryption.",
      "Public access does not enforce encryption.",
    ],
    "\"auto-renew + HTTPS only\" -> ACM DNS validation + SecureTransport", ["ACM", "SecureTransport"]
  ),

  // ---- Analytics selection ----
  mk(
    "analytics-service-selection-redshift-emr", 1, 3, "easy",
    "An analyst runs occasional SQL queries on Parquet files in S3 and wants no infrastructure to manage and to pay only per query. Which service fits?",
    ["Amazon Redshift provisioned", "Amazon Athena", "Amazon EMR cluster running 24/7", "Amazon OpenSearch Service"],
    "b",
    "Athena is serverless SQL on S3 and charges by data scanned per query.",
    [
      "A provisioned warehouse has ongoing cost even when idle.",
      "Athena has no infrastructure and per-query pricing.",
      "An always-on EMR cluster has idle cost.",
      "OpenSearch is for search and log analytics.",
    ],
    "\"occasional SQL on S3, pay per query\" -> Athena", ["Athena"]
  ),
  mk(
    "analytics-service-selection-redshift-emr", 2, 4, "medium",
    "A nightly Spark job processes data in S3 for two hours. The company wants the lowest cost. Which design fits?",
    ["A permanent EMR cluster on On-Demand instances", "A transient EMR cluster with core nodes On-Demand and task nodes on Spot, terminated after the job", "A Redshift cluster running all day", "An EC2 instance with Spark installed and left running"],
    "b",
    "Transient clusters avoid idle cost, and task nodes can use Spot because they hold no data.",
    [
      "A permanent cluster pays for 22 idle hours a day.",
      "Transient clusters with Spot task nodes minimise cost.",
      "A warehouse running all day is not needed for a nightly Spark job.",
      "A permanently running instance has idle cost and no scalability.",
    ],
    "\"nightly Spark, lowest cost\" -> transient EMR + Spot task nodes", ["EMR", "Spot", "transient"]
  ),
  mk(
    "analytics-service-selection-redshift-emr", 3, 3, "hard",
    "A company has hundreds of analysts running complex, repeated SQL queries with joins and BI dashboards over terabytes of structured data. Which service best meets the performance requirement?",
    ["Amazon Athena", "Amazon Redshift", "AWS Glue", "Amazon QuickSight alone"],
    "b",
    "Redshift is a columnar data warehouse optimised for complex SQL, joins and many concurrent users.",
    [
      "Athena suits ad hoc queries rather than heavy, concurrent BI at consistent performance.",
      "Redshift is built for warehouse workloads with many users and complex queries.",
      "Glue performs ETL and cataloguing.",
      "QuickSight visualises data but needs a query engine behind it.",
    ],
    "\"complex joins, many analysts, BI\" -> Redshift", ["Redshift", "data warehouse"]
  ),

  // ---- Transit Gateway ----
  mk(
    "transit-gateway-hybrid-routing", 1, 3, "easy",
    "A company has 40 VPCs across accounts that all need to reach each other and on-premises through one connection. Which service simplifies this?",
    ["VPC peering between every pair", "AWS Transit Gateway", "Internet gateways", "AWS PrivateLink"],
    "b",
    "Transit Gateway acts as a hub that provides transitive routing between many VPCs and on-premises networks.",
    [
      "A full mesh of 40 VPCs needs 780 peering connections and is not transitive.",
      "A Transit Gateway connects all attachments through one hub.",
      "Internet gateways provide internet access, not VPC interconnection.",
      "PrivateLink exposes individual services, not full network connectivity.",
    ],
    "\"many VPCs + on-premises\" -> Transit Gateway", ["Transit Gateway"]
  ),
  mk(
    "transit-gateway-hybrid-routing", 2, 1, "medium",
    "Using a Transit Gateway, production and development VPCs must both reach a shared-services VPC but must not reach each other. How should this be built?",
    ["Use one TGW route table for all attachments", "Use separate TGW route tables so production and development each only have routes to shared services", "Use security groups only", "Use internet gateways"],
    "b",
    "Separate route tables with controlled association and propagation provide segmentation between attachments.",
    [
      "A single shared route table lets all attachments reach each other.",
      "Separate route tables limit which attachments can communicate.",
      "Security groups alone do not stop routing between VPCs and are harder to manage at scale.",
      "Internet gateways would send traffic over the internet.",
    ],
    "\"isolate prod and dev\" -> separate TGW route tables", ["Transit Gateway", "segmentation"]
  ),
  mk(
    "transit-gateway-hybrid-routing", 3, 4, "hard",
    "A company connects only two VPCs in the same Region and wants the lowest cost and simplest design. Which option fits?",
    ["Transit Gateway", "VPC peering", "Site-to-Site VPN between the VPCs", "Direct Connect"],
    "b",
    "VPC peering has no hourly charge and is simple for a small number of VPCs. Transit Gateway adds per-attachment and per-GB charges.",
    [
      "Transit Gateway costs more for two VPCs.",
      "Peering is the lowest cost and simplest choice here.",
      "A VPN adds cost and complexity.",
      "Direct Connect is for on-premises connectivity.",
    ],
    "\"two VPCs, lowest cost\" -> VPC peering", ["VPC peering", "cost"]
  ),

  // ---- AWS Backup ----
  mk(
    "aws-backup-vault-lock-policies", 1, 1, "easy",
    "A regulated company must ensure backup recovery points cannot be deleted by anyone, including administrators, until retention ends. Which feature meets this?",
    ["Backup Vault Lock in compliance mode", "A bucket policy", "IAM groups", "CloudTrail"],
    "a",
    "Vault Lock provides write-once-read-many protection, and compliance mode cannot be removed after the cooling-off period.",
    [
      "Compliance-mode Vault Lock enforces immutability.",
      "A bucket policy does not apply to backup vaults and can be edited.",
      "IAM groups can be changed by administrators.",
      "CloudTrail records activity and does not prevent deletion.",
    ],
    "\"nobody can delete backups\" -> Vault Lock (compliance)", ["Vault Lock", "WORM"]
  ),
  mk(
    "aws-backup-vault-lock-policies", 2, 4, "medium",
    "To lower the cost of keeping backups for years, an administrator configures a lifecycle that moves recovery points to cold storage after 30 days. What constraint applies?",
    ["Cold storage backups must be retained there for at least 90 days", "Cold storage is more expensive than warm storage", "Cold storage supports every resource type", "Backups cannot be restored from cold storage"],
    "a",
    "Recovery points moved to cold storage must remain there for at least 90 days, and only some resource types support it.",
    [
      "A 90-day minimum applies to cold storage.",
      "Cold storage is cheaper, which is the reason to use it.",
      "Not every resource type supports cold storage.",
      "Backups can be restored from cold storage.",
    ],
    "\"cold storage lifecycle\" -> 90-day minimum", ["AWS Backup", "cold storage"]
  ),
  mk(
    "aws-backup-vault-lock-policies", 3, 1, "hard",
    "A company fears ransomware that could delete both production resources and their backups in the same account. Which TWO measures best protect the backups?",
    ["Copy backups to a vault in a separate, restricted backup account", "Apply Vault Lock to make recovery points immutable", "Keep backups in the production account with the same administrators", "Reduce the retention period", "Disable encryption to speed recovery"],
    "ab",
    "Isolation in a separate account and immutability through Vault Lock protect backups from deletion by a compromised production account.",
    [
      "A separate account limits the blast radius of a compromise.",
      "Vault Lock prevents deletion of recovery points.",
      "The same account and administrators share the same risk.",
      "Shorter retention reduces recoverability.",
      "Disabling encryption weakens security.",
    ],
    "\"ransomware could delete backups\" -> immutable + isolated", ["Vault Lock", "cross-account"]
  ),
];

export const deepDiveIJFlashcards: Flashcard[] = [
  fc("cloudtrail-config-event-types", 1, 1, "Management and Governance", "CloudTrail event types?", "Management events (on by default, 90 days in Event history), data events (off by default, charged) and Insights events (unusual activity)."),
  fc("cloudtrail-config-event-types", 2, 1, "Management and Governance", "CloudTrail vs Config?", "CloudTrail: who made which API call, from where. Config: resource configuration over time and compliance, with rules and remediation."),
  fc("cloudtrail-config-event-types", 3, 1, "Management and Governance", "How to audit every account for years, tamper-evident?", "An organization trail to a protected S3 bucket with log file integrity validation."),

  fc("security-services-decision-guide", 1, 1, "Security, Identity, and Compliance", "GuardDuty vs Inspector vs Macie?", "GuardDuty detects threats from logs. Inspector scans EC2, ECR and Lambda for vulnerabilities. Macie finds sensitive data in S3."),
  fc("security-services-decision-guide", 2, 1, "Security, Identity, and Compliance", "Security Hub vs Detective?", "Security Hub aggregates and prioritises findings and checks standards. Detective investigates findings to a root cause."),
  fc("security-services-decision-guide", 3, 1, "Security, Identity, and Compliance", "Security response sequence?", "Prevent, detect, aggregate, investigate, respond (EventBridge to Lambda or Systems Manager)."),

  fc("waf-shield-ddos-resilience", 1, 1, "Security, Identity, and Compliance", "Shield Standard vs Advanced?", "Standard: automatic, free, layers 3 and 4. Advanced: paid, Shield Response Team, enhanced detection, cost protection, layer 7 with WAF."),
  fc("waf-shield-ddos-resilience", 2, 1, "Security, Identity, and Compliance", "Where can WAF be attached?", "CloudFront, ALB, API Gateway REST API, AppSync and Cognito user pools. Not directly to EC2 or NLB."),
  fc("waf-shield-ddos-resilience", 3, 2, "Security, Identity, and Compliance", "DDoS-resilient architecture?", "CloudFront and Route 53 at the edge, WAF rules, ALB with Auto Scaling, origin restricted to CloudFront, instances in private subnets."),

  fc("event-driven-service-selection", 1, 2, "Application Integration", "SQS vs SNS vs EventBridge?", "SQS: queue, one consumer per message. SNS: pub/sub to many subscribers. EventBridge: event bus with content-based rules and SaaS sources."),
  fc("event-driven-service-selection", 2, 2, "Application Integration", "When Amazon MQ?", "Existing applications using JMS, AMQP, MQTT or STOMP that cannot be changed."),
  fc("event-driven-service-selection", 3, 3, "Application Integration", "When Kinesis Data Streams over SQS?", "Ordered, replayable streams that several consumers read in real time."),

  fc("step-functions-workflow-types", 1, 2, "Application Integration", "Standard vs Express workflows?", "Standard: up to 1 year, exactly-once, full history, priced per transition. Express: up to 5 minutes, very high volume, priced by executions and duration."),
  fc("step-functions-workflow-types", 2, 2, "Application Integration", "Built-in error handling in Step Functions?", "Retry (with backoff) and Catch (fallback path) fields on states."),
  fc("step-functions-workflow-types", 3, 2, "Application Integration", "Human approval in a workflow?", "Use the callback pattern with a task token so the workflow waits for an external response."),

  fc("cloudformation-change-sets-drift-stacksets", 1, 2, "Management and Governance", "Change set vs drift detection?", "Change set previews an update before applying. Drift detection reports resources changed outside CloudFormation and does not fix them."),
  fc("cloudformation-change-sets-drift-stacksets", 2, 2, "Management and Governance", "Deploy one template to many accounts and Regions?", "CloudFormation StackSets, with service-managed permissions through Organizations."),
  fc("cloudformation-change-sets-drift-stacksets", 3, 2, "Management and Governance", "Protect data when a stack is deleted?", "DeletionPolicy: Retain or Snapshot on stateful resources, plus termination protection on the stack."),

  fc("systems-manager-capabilities", 1, 1, "Management and Governance", "Requirements for a managed node?", "SSM Agent, an IAM instance profile (AmazonSSMManagedInstanceCore) and connectivity to the service through internet, NAT or VPC endpoints."),
  fc("systems-manager-capabilities", 2, 1, "Management and Governance", "Why Session Manager?", "Shell access with no inbound ports, no bastion and no SSH keys, with session logging to S3 or CloudWatch."),
  fc("systems-manager-capabilities", 3, 2, "Management and Governance", "Patch Manager essentials?", "Patch baselines choose patches, maintenance windows schedule them, and it reports compliance."),

  fc("rds-backup-restore-encryption", 1, 2, "Databases", "RDS automated backup retention?", "1 to 35 days, enabling point-in-time recovery. 0 disables them. Manual snapshots persist until deleted."),
  fc("rds-backup-restore-encryption", 2, 2, "Databases", "What does an RDS restore produce?", "A new DB instance with a new endpoint. It never overwrites the existing instance."),
  fc("rds-backup-restore-encryption", 3, 1, "Databases", "Encrypting an existing RDS database?", "Snapshot it, copy the snapshot with encryption enabled and restore from the copy. To share an encrypted snapshot, use a customer managed KMS key and share the key."),

  fc("encryption-in-transit-patterns", 1, 1, "Security, Identity, and Compliance", "ACM certificate Region rules?", "CloudFront needs certificates in us-east-1. Load balancer certificates must be in the load balancer's Region."),
  fc("encryption-in-transit-patterns", 2, 1, "Security, Identity, and Compliance", "End-to-end encryption through an ALB?", "Use an HTTPS listener and an HTTPS target group with certificates on the instances (re-encrypt)."),
  fc("encryption-in-transit-patterns", 3, 1, "Security, Identity, and Compliance", "Automatic ACM renewal?", "Use DNS validation and keep the validation record. Email validation needs a person to respond."),

  fc("analytics-service-selection-redshift-emr", 1, 3, "Analytics", "Athena vs Redshift vs EMR?", "Athena: ad hoc serverless SQL on S3. Redshift: columnar warehouse for complex, concurrent queries. EMR: Spark, Hadoop and custom big data processing."),
  fc("analytics-service-selection-redshift-emr", 2, 4, "Analytics", "Cheapest EMR pattern?", "Transient clusters that terminate after the job, data in S3, and Spot instances for task nodes (which hold no data)."),
  fc("analytics-service-selection-redshift-emr", 3, 4, "Analytics", "Redshift cost levers?", "RA3 separates compute and storage, Serverless pays for compute used, concurrency scaling handles bursts, and pausing avoids idle cost."),

  fc("transit-gateway-hybrid-routing", 1, 3, "Networking", "Transit Gateway vs VPC peering?", "TGW: regional hub, transitive routing, segmentation by route tables, per-attachment cost. Peering: one-to-one, non-transitive, no hourly charge."),
  fc("transit-gateway-hybrid-routing", 2, 1, "Networking", "How to isolate environments on a TGW?", "Use separate TGW route tables and control association and propagation."),
  fc("transit-gateway-hybrid-routing", 3, 4, "Networking", "Increasing VPN bandwidth to AWS?", "Use ECMP across multiple VPN tunnels on a Transit Gateway."),

  fc("aws-backup-vault-lock-policies", 1, 1, "Storage", "Vault Lock modes?", "Governance mode: privileged users can remove the lock. Compliance mode: immutable after a cooling-off period of at least three days."),
  fc("aws-backup-vault-lock-policies", 2, 4, "Storage", "AWS Backup cold storage rule?", "Recovery points moved to cold storage must stay at least 90 days, and not all resource types support it."),
  fc("aws-backup-vault-lock-policies", 3, 1, "Storage", "Protecting backups from ransomware?", "Make them immutable (Vault Lock), isolated (copy to a separate backup account) and distributed (cross-Region copy)."),
];
