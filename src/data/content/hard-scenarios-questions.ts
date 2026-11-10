import type { Question } from "@/lib/types";
import { mk } from "./deep-dives-questions";

const D1 = "scenario-drill-domain-1";
const D4 = "scenario-drill-domain-4";

// Hard, multi-constraint scenario questions for Domain 1 (Secure) and Domain 4 (Cost-Optimized).
// Question numbers start at 10 so they never collide with the three drill-lesson questions.
// They are bank-only (kind "exam"), so they feed domain practice and mock exams rather than a lesson page.
export const hardScenarioQuestions: Question[] = ([
  // ================= Domain 1: Secure Architectures =================
  mk(
    D1, 10, 1, "hard",
    "A company must guarantee that no one can upload to or read from a sensitive S3 bucket over an unencrypted connection, even administrators with full S3 permissions. Which change enforces this?",
    [
      "Enable default encryption with SSE-S3 on the bucket",
      "Add a bucket policy statement that denies all s3:* actions when aws:SecureTransport is false",
      "Enable S3 Versioning and MFA delete",
      "Turn on S3 server access logging",
    ],
    "b",
    "A bucket policy Deny with the aws:SecureTransport condition rejects any request not made over HTTPS, and an explicit deny overrides every allow, including administrators'.",
    [
      "Default encryption protects data at rest, not the connection used to send it.",
      "An explicit deny on non-TLS requests enforces encryption in transit for everyone.",
      "Versioning and MFA delete protect against deletion and overwrites, not transport security.",
      "Logging records requests but does not block any.",
    ],
    "\"in transit\" + \"no exceptions\" -> deny on aws:SecureTransport", ["aws:SecureTransport", "bucket policy"]
  ),
  mk(
    D1, 11, 1, "hard",
    "Account A owns a KMS customer managed key. A role in Account B must use it to decrypt objects. Which TWO steps are required? (Select TWO.)",
    [
      "Allow Account B (or its role) in the key policy of the key in Account A",
      "Copy the key to Account B",
      "Add an IAM policy in Account B that lets the role call the KMS actions on that key ARN",
      "Make the key an AWS managed key",
      "Enable automatic rotation on the key",
    ],
    "ac",
    "Cross-account KMS use needs both sides: the key policy must trust the other account, and the other account's IAM policy must grant the role permission to use the key.",
    [
      "Correct. The key policy is the primary access control for a KMS key.",
      "KMS keys cannot be copied between accounts.",
      "Correct. The caller's own account must also allow the action.",
      "AWS managed keys cannot be shared with other accounts, so this would make it impossible.",
      "Rotation does not grant access.",
    ],
    "Cross-account KMS = key policy AND caller IAM policy", ["KMS", "key policy", "cross-account"]
  ),
  mk(
    D1, 12, 1, "hard",
    "A company wants to stop all member accounts in an Organization from using any Region other than eu-west-1 and eu-central-1, but global services such as IAM must keep working. What should they do?",
    [
      "Attach an SCP that denies all actions when aws:RequestedRegion is not in the approved list, with global service actions exempted",
      "Attach an IAM policy to every user denying other Regions",
      "Delete the VPCs in all other Regions",
      "Use a Network ACL to block traffic to other Regions",
    ],
    "a",
    "An SCP using the aws:RequestedRegion condition restricts Regions across accounts. Global services such as IAM, Organizations and CloudFront have to be exempted because their API calls are served from a global endpoint.",
    [
      "An SCP applies to every principal in the member accounts and can exempt global services.",
      "Per-user policies are hard to maintain and administrators can change them.",
      "Deleting VPCs does not stop API calls or services that do not use a VPC.",
      "Network ACLs filter subnet traffic, not AWS API access.",
    ],
    "Limit Regions org-wide -> SCP + aws:RequestedRegion", ["SCP", "aws:RequestedRegion"]
  ),
  mk(
    D1, 13, 1, "hard",
    "An application on EC2 reads from DynamoDB. Developers currently store long-lived access keys in a config file on the instance. The security team wants to remove stored credentials and also protect against SSRF attacks that steal instance credentials. Which TWO actions do this? (Select TWO.)",
    [
      "Attach an IAM role to the instance through an instance profile",
      "Rotate the access keys every 90 days",
      "Require IMDSv2 on the instance metadata service",
      "Store the access keys in an S3 bucket",
      "Move the keys into environment variables",
    ],
    "ac",
    "A role gives the instance temporary credentials with no stored keys, and requiring IMDSv2 (session-token based) makes simple SSRF requests to the metadata service fail.",
    [
      "Correct. Roles provide temporary credentials automatically.",
      "Rotation still leaves long-lived keys on the instance.",
      "Correct. IMDSv2 needs a session token, which blocks basic SSRF credential theft.",
      "Keys in S3 are still long-lived credentials and add exposure.",
      "Environment variables are still stored credentials.",
    ],
    "No stored keys + SSRF -> instance role + IMDSv2", ["instance profile", "IMDSv2"]
  ),
  mk(
    D1, 14, 1, "hard",
    "A Lambda function connects to an RDS database. The password must never appear in code or configuration and must rotate automatically every 30 days without application changes to the rotation logic. Which service meets this with the least effort?",
    [
      "AWS Systems Manager Parameter Store standard parameters with a custom cron job",
      "AWS Secrets Manager with automatic rotation configured for the RDS secret",
      "Environment variables encrypted with the default Lambda key",
      "A password file in an encrypted S3 bucket",
    ],
    "b",
    "Secrets Manager stores secrets, integrates with RDS and can rotate credentials on a schedule using managed rotation, so the function simply fetches the current secret.",
    [
      "Parameter Store does not rotate secrets by itself, so a custom job would be needed.",
      "Secrets Manager provides built-in rotation for supported databases.",
      "Environment variables are static and do not rotate.",
      "An S3 file is not a rotation mechanism and needs custom code.",
    ],
    "\"rotate automatically\" -> Secrets Manager", ["Secrets Manager", "rotation"]
  ),
  mk(
    D1, 15, 1, "hard",
    "Data in an S3 bucket must be reachable only from instances in a specific VPC, and never over the internet, even with valid credentials. Which combination works?",
    [
      "A gateway VPC endpoint for S3 and a bucket policy that denies requests unless aws:SourceVpce matches the endpoint",
      "A NAT gateway and a security group on the bucket",
      "A public bucket with a hard-to-guess name",
      "S3 Transfer Acceleration with a VPC attachment",
    ],
    "a",
    "A gateway endpoint gives private access and a bucket policy condition on aws:SourceVpce rejects everything else, including requests from the internet with valid credentials.",
    [
      "The endpoint plus the policy condition restrict access to that VPC path.",
      "S3 buckets do not have security groups, and a NAT gateway uses the internet path.",
      "A public bucket is the opposite of the requirement.",
      "Transfer Acceleration is for faster long-distance uploads and cannot be attached to a VPC.",
    ],
    "Only from my VPC -> endpoint + aws:SourceVpce deny", ["aws:SourceVpce", "gateway endpoint"]
  ),
  mk(
    D1, 16, 1, "hard",
    "A company has an existing unencrypted RDS for MySQL database and now requires encryption at rest. What is the correct approach?",
    [
      "Modify the instance and enable encryption in place",
      "Take a snapshot, copy it with encryption enabled, and restore a new encrypted instance from the copy",
      "Enable encryption on the S3 bucket that stores the backups",
      "Attach an encrypted EBS volume to the RDS instance",
    ],
    "b",
    "Encryption can only be chosen when an RDS instance is created. To encrypt an existing database, copy a snapshot with encryption on and restore from it, then switch the application over.",
    [
      "Existing unencrypted instances cannot be encrypted in place.",
      "Snapshot copy with encryption, then restore, is the supported method.",
      "Backup bucket encryption does not encrypt the database storage.",
      "You cannot attach your own EBS volumes to RDS.",
    ],
    "Encrypt an existing RDS -> snapshot, copy encrypted, restore", ["RDS encryption", "snapshot"]
  ),
  mk(
    D1, 17, 1, "hard",
    "A content site serves private files from an S3 bucket through CloudFront. Users must not be able to bypass CloudFront and access the bucket URL directly. Which solution do you use?",
    [
      "Make the bucket public and enable CloudFront logging",
      "Use CloudFront origin access control (OAC) and a bucket policy that allows only the CloudFront distribution",
      "Use a security group on the bucket to allow only CloudFront IP ranges",
      "Enable S3 Transfer Acceleration",
    ],
    "b",
    "OAC lets CloudFront sign requests to a private bucket, and the bucket policy allows only that distribution, so direct bucket access is denied.",
    [
      "A public bucket allows direct access, which is what must be prevented.",
      "OAC plus a bucket policy locks the origin to CloudFront.",
      "S3 buckets do not use security groups.",
      "Transfer Acceleration is unrelated to origin access.",
    ],
    "Private S3 origin behind CloudFront -> OAC", ["OAC", "CloudFront"]
  ),
  mk(
    D1, 18, 1, "hard",
    "An online store is hit by a flood of requests from a few IP addresses that overloads the application, while other traffic is legitimate. The company wants an automatic, low-effort block without changing the application. Which is best?",
    [
      "An AWS WAF rate-based rule that blocks IPs exceeding a request threshold, attached to the ALB or CloudFront",
      "A larger EC2 instance type",
      "Remove the load balancer",
      "Turn on VPC Flow Logs",
    ],
    "a",
    "A WAF rate-based rule counts requests per IP and blocks sources that exceed the limit, protecting the application layer automatically.",
    [
      "A rate-based rule is designed for this and needs no application change.",
      "A bigger instance absorbs the attack at higher cost but does not block it.",
      "Removing the load balancer removes availability and protection.",
      "Flow logs only record traffic, they do not block it.",
    ],
    "Flood from few IPs -> WAF rate-based rule", ["WAF", "rate-based rule"]
  ),
  mk(
    D1, 19, 1, "hard",
    "Instances in private subnets with no internet access must be patched and managed with AWS Systems Manager. There is no NAT gateway and none will be added. What is needed?",
    [
      "Interface VPC endpoints for ssm, ssmmessages and ec2messages, and an instance profile with Systems Manager permissions",
      "A VPN connection to the Systems Manager console",
      "A public IP address on every instance",
      "An S3 gateway endpoint only",
    ],
    "a",
    "The SSM agent needs to reach the Systems Manager endpoints. Interface endpoints for ssm, ssmmessages and ec2messages provide private access, and the instance role grants the permissions.",
    [
      "These interface endpoints and the role let managed instances work privately.",
      "A VPN to a console does not give the agent a path to the service.",
      "Public IPs would require an internet route and weaken security.",
      "An S3 endpoint alone does not reach the Systems Manager service endpoints.",
    ],
    "Patch private instances with no NAT -> SSM interface endpoints", ["Systems Manager", "interface endpoint"]
  ),
  mk(
    D1, 20, 1, "hard",
    "A SaaS vendor needs read access to resources in the customer's AWS account. The customer wants to prevent the confused-deputy problem, where another vendor customer could trick the vendor into using the role. What should the role's trust policy include?",
    [
      "A condition requiring a unique external ID supplied by the vendor",
      "An IAM user created for the vendor with long-lived keys",
      "A wildcard principal with a source IP condition",
      "A resource policy on the vendor's S3 bucket",
    ],
    "a",
    "An external ID in the trust policy condition ensures the vendor can assume the role only on behalf of the right customer, which prevents the confused-deputy problem.",
    [
      "The external ID is the standard mitigation for third-party cross-account roles.",
      "Long-lived keys are less secure and do not address confused deputy.",
      "A wildcard principal is far too broad.",
      "The vendor's bucket policy has no bearing on the customer's role.",
    ],
    "Third-party cross-account role -> external ID", ["external ID", "confused deputy"]
  ),
  mk(
    D1, 21, 1, "hard",
    "A security team wants threat detection enabled in every account of an Organization, including accounts created in the future, with findings visible in one place and no per-account setup. Which approach fits?",
    [
      "Enable GuardDuty in each account manually when created",
      "Designate a delegated administrator account for GuardDuty and enable auto-enable for organization members",
      "Run Amazon Inspector in one account only",
      "Use CloudWatch Logs in each account",
    ],
    "b",
    "GuardDuty supports a delegated administrator and automatic enablement for organization members, so new accounts are covered and findings are aggregated centrally.",
    [
      "Manual enablement is easy to miss for new accounts.",
      "Delegated administration with auto-enable covers current and future accounts.",
      "Inspector scans for vulnerabilities and does not replace threat detection.",
      "Logs alone do not provide managed threat detection.",
    ],
    "Org-wide detection, new accounts included -> delegated admin + auto-enable", ["GuardDuty", "Organizations"]
  ),
  mk(
    D1, 22, 1, "hard",
    "A company must identify which S3 buckets contain personally identifiable information and be alerted when new sensitive data appears. Which service does this with the least custom work?",
    ["Amazon Macie", "Amazon Inspector", "AWS Shield", "AWS Artifact"],
    "a",
    "Macie uses machine learning and pattern matching to discover and classify sensitive data such as PII in S3 and reports findings.",
    [
      "Macie discovers sensitive data in S3.",
      "Inspector scans compute resources and images for vulnerabilities.",
      "Shield protects against DDoS attacks.",
      "Artifact provides compliance reports and agreements.",
    ],
    "Find PII in S3 -> Macie", ["Macie", "PII"]
  ),
  mk(
    D1, 23, 1, "hard",
    "Web servers are subject to repeated attacks from one known malicious IP address. The team wants to block that IP at the subnet level. Which control can explicitly deny it?",
    [
      "A security group rule denying the IP",
      "A network ACL with a deny rule for the IP",
      "An IAM policy denying the IP",
      "A Route 53 health check",
    ],
    "b",
    "Network ACLs support explicit deny rules and are evaluated at the subnet boundary. Security groups can only allow traffic.",
    [
      "Security groups have allow rules only, so they cannot deny a specific IP.",
      "A network ACL deny rule blocks the address for the subnet.",
      "IAM policies control API access, not network traffic.",
      "Health checks only report endpoint health.",
    ],
    "Block one IP -> NACL deny", ["network ACL", "deny"]
  ),
  mk(
    D1, 24, 1, "hard",
    "A mobile app needs to let millions of end users sign in with social identity providers and then upload their own photos directly to an S3 bucket, each user only to their own folder. Which design fits?",
    [
      "Create an IAM user for each end user",
      "Use Amazon Cognito user pools for sign-in and identity pools to issue temporary credentials scoped to the user's prefix",
      "Share one set of IAM keys embedded in the app",
      "Use IAM Identity Center for all customers",
    ],
    "b",
    "Cognito handles customer-facing sign-in, including social providers, and identity pools exchange tokens for temporary AWS credentials that a policy can scope to each user's S3 prefix.",
    [
      "Millions of IAM users is not scalable or appropriate.",
      "Cognito user pools plus identity pools fit app users and scoped temporary access.",
      "Embedded shared keys can be extracted from the app.",
      "IAM Identity Center is designed for workforce access, not consumer apps.",
    ],
    "Customer app sign-in + temporary AWS access -> Cognito", ["Cognito", "identity pool"]
  ),

  // ================= Domain 4: Cost-Optimized Architectures =================
  mk(
    D4, 10, 4, "hard",
    "A company runs EC2 instances of several families today and plans to move some workloads to Fargate and Lambda over the next year. It wants to commit to save money without being locked to an instance family or service. Which commitment fits?",
    [
      "EC2 Instance Savings Plan for one family",
      "Compute Savings Plan",
      "Standard Reserved Instances",
      "Dedicated Hosts",
    ],
    "b",
    "Compute Savings Plans apply across instance families, Regions and operating systems, and also cover Fargate and Lambda usage, giving the most flexibility.",
    [
      "An EC2 Instance Savings Plan is tied to a family in a Region.",
      "A Compute Savings Plan is the most flexible and covers Fargate and Lambda.",
      "Standard RIs are tied to attributes of the instance type.",
      "Dedicated Hosts are for licensing or compliance, not flexible savings.",
    ],
    "Flexible across EC2, Fargate, Lambda -> Compute Savings Plan", ["Savings Plans", "flexible"]
  ),
  mk(
    D4, 11, 4, "hard",
    "A fault-tolerant processing fleet in an Auto Scaling group runs on Spot Instances but is often interrupted because the chosen instance type runs out of capacity. How can the company keep the savings and reduce interruptions?",
    [
      "Use a mixed instances policy with several instance types and sizes and the price-capacity-optimized allocation strategy",
      "Switch the whole fleet to Dedicated Hosts",
      "Use a single larger instance type",
      "Increase the maximum price to the On-Demand price only",
    ],
    "a",
    "Diversifying across multiple instance types and Availability Zones lets Auto Scaling draw from deeper Spot capacity pools, and capacity-aware allocation reduces interruptions.",
    [
      "Diversification across pools is the recommended Spot practice.",
      "Dedicated Hosts remove the Spot discount.",
      "One instance type concentrates the risk in a single capacity pool.",
      "Spot pricing no longer depends on a bid, so raising a maximum price does not add capacity.",
    ],
    "Fewer Spot interruptions -> diversify instance types and AZs", ["Spot", "mixed instances"]
  ),
  mk(
    D4, 12, 4, "hard",
    "Log files in S3 have unpredictable access patterns: some are read repeatedly for weeks, others never again. The team wants to lower cost automatically without retrieval delays or managing rules. Which is best?",
    [
      "S3 Glacier Deep Archive for all objects",
      "S3 Intelligent-Tiering",
      "S3 One Zone-IA for all objects",
      "Delete objects after seven days",
    ],
    "b",
    "Intelligent-Tiering moves objects between access tiers automatically based on usage and has no retrieval fees, which suits unknown or changing patterns.",
    [
      "Deep Archive has long retrieval times and is wrong for objects read often.",
      "Intelligent-Tiering adapts to unpredictable access with no retrieval delays in the frequent and infrequent tiers.",
      "One Zone-IA charges retrieval fees and reduces durability for objects read repeatedly.",
      "Deleting breaks the requirement to keep reading logs.",
    ],
    "Unpredictable access -> Intelligent-Tiering", ["Intelligent-Tiering"]
  ),
  mk(
    D4, 13, 4, "hard",
    "Backups moved to S3 Glacier Flexible Retrieval are deleted after 30 days, and the bill shows unexpected charges. What is the most likely cause?",
    [
      "Glacier does not support deletion",
      "Minimum storage duration charges: objects deleted before 90 days are billed for the remainder",
      "Glacier charges for every upload",
      "Data transfer into Glacier is billed at the internet rate",
    ],
    "b",
    "Glacier Flexible Retrieval has a 90-day minimum storage duration. Deleting earlier still incurs charges for the remaining days.",
    [
      "Objects can be deleted at any time.",
      "Early deletion fees apply for the unmet minimum duration.",
      "Uploads are not billed per object in that way.",
      "Data into AWS from the internet is generally free.",
    ],
    "Short-lived data in Glacier -> early deletion charges", ["minimum storage duration", "Glacier"]
  ),
  mk(
    D4, 14, 4, "hard",
    "Private-subnet servers in three Availability Zones send large volumes of data to DynamoDB and S3 through NAT gateways, and the NAT bill is the largest line item. What is the most cost-effective change?",
    [
      "Add more NAT gateways",
      "Create gateway VPC endpoints for S3 and DynamoDB and update the route tables",
      "Move the servers to public subnets",
      "Replace NAT gateways with a Site-to-Site VPN",
    ],
    "b",
    "Gateway endpoints for S3 and DynamoDB are free and keep that traffic off the NAT gateways, which removes the NAT data processing cost for it.",
    [
      "More gateways add hourly cost and do not reduce processing charges.",
      "Gateway endpoints have no charge and bypass NAT for these services.",
      "Public subnets reduce security and still use an internet path.",
      "A VPN does not reach S3 or DynamoDB and adds cost.",
    ],
    "High NAT bill + S3/DynamoDB -> gateway endpoints", ["gateway endpoint", "NAT gateway"]
  ),
  mk(
    D4, 15, 4, "hard",
    "A workload has a steady, predictable read and write rate to a DynamoDB table around the clock. Which capacity mode is usually cheapest?",
    [
      "On-demand capacity",
      "Provisioned capacity with auto scaling, optionally with reserved capacity",
      "Scan the table more often",
      "Create a global table",
    ],
    "b",
    "For steady, predictable traffic, provisioned capacity costs less than on-demand per request, and reserved capacity can lower it further.",
    [
      "On-demand costs more per request and suits unknown or spiky traffic.",
      "Provisioned capacity matches steady usage at the lowest price.",
      "Scans consume capacity and increase cost.",
      "Global tables add replication cost and are for multi-Region needs.",
    ],
    "Predictable DynamoDB traffic -> provisioned", ["DynamoDB", "provisioned"]
  ),
  mk(
    D4, 16, 4, "hard",
    "A development database is used only a few hours a day with unpredictable bursts, and the team wants to avoid paying for idle capacity. Which option fits best?",
    [
      "Aurora Serverless v2, which scales capacity with load",
      "A large provisioned RDS instance in Multi-AZ",
      "A Dedicated Host running a database",
      "An always-on Redshift cluster",
    ],
    "a",
    "Aurora Serverless v2 scales capacity up and down with demand, so a bursty development database does not pay for idle capacity.",
    [
      "Serverless v2 adjusts capacity in fine increments.",
      "A large always-on Multi-AZ instance is the opposite of what is needed.",
      "A Dedicated Host is expensive and unnecessary.",
      "Redshift is a data warehouse and is not suited to this OLTP use.",
    ],
    "Bursty dev database -> Aurora Serverless v2", ["Aurora Serverless"]
  ),
  mk(
    D4, 17, 4, "hard",
    "A website serves large static downloads directly from S3 to users worldwide, and data transfer out is expensive. Which change usually lowers cost and improves speed?",
    [
      "Put CloudFront in front of the bucket",
      "Move the bucket to another Region",
      "Disable versioning",
      "Use S3 Standard-IA for the files",
    ],
    "a",
    "Data transfer from S3 to CloudFront is free, CloudFront serves repeat requests from cache and its data transfer out pricing is typically lower than serving directly from S3.",
    [
      "CloudFront caches content and reduces origin transfer and egress cost.",
      "Moving Regions does not remove egress charges.",
      "Versioning affects storage, not transfer.",
      "Standard-IA adds retrieval fees for frequently downloaded files.",
    ],
    "Expensive egress for static content -> CloudFront", ["CloudFront", "data transfer"]
  ),
  mk(
    D4, 18, 4, "hard",
    "A batch application on x86 EC2 instances runs steadily and its code is portable. The team wants a lower price for the same performance without changing the architecture. Which change helps most?",
    [
      "Migrate to Graviton-based instances after testing compatibility",
      "Move to a bigger instance family",
      "Switch to Dedicated Hosts",
      "Disable detailed monitoring",
    ],
    "a",
    "Graviton (Arm-based) instances usually offer better price-performance than comparable x86 instances for compatible workloads.",
    [
      "Graviton generally gives better price-performance when the software supports Arm.",
      "A bigger family raises cost.",
      "Dedicated Hosts cost more.",
      "Monitoring is a small cost and does not change compute price.",
    ],
    "Cheaper for same performance -> Graviton", ["Graviton", "price-performance"]
  ),
  mk(
    D4, 19, 4, "hard",
    "Many EBS gp2 volumes are in use, and the company also finds volumes that are not attached to any instance. Which TWO actions reduce cost? (Select TWO.)",
    [
      "Migrate eligible gp2 volumes to gp3",
      "Delete unattached volumes after taking a snapshot if the data may be needed",
      "Convert all volumes to io2 Block Express",
      "Increase the size of all volumes",
      "Enable Multi-Attach on every volume",
    ],
    "ab",
    "gp3 is generally cheaper per GB than gp2 with a baseline of 3,000 IOPS, and unattached volumes still cost money, so snapshot and delete the ones no longer needed.",
    [
      "Correct. gp3 gives lower cost per GB and a higher baseline than gp2.",
      "Correct. Unattached volumes are billed until deleted.",
      "io2 Block Express is a premium tier and costs more.",
      "Larger volumes cost more.",
      "Multi-Attach does not reduce cost.",
    ],
    "EBS savings -> gp3 and delete unattached volumes", ["gp3", "unattached volumes"]
  ),
  mk(
    D4, 20, 4, "hard",
    "A team wants to learn immediately when spending in any account spikes unexpectedly, without defining a fixed threshold for each service. Which feature fits?",
    [
      "AWS Cost Anomaly Detection",
      "AWS Pricing Calculator",
      "AWS Trusted Advisor free checks",
      "S3 Storage Lens",
    ],
    "a",
    "Cost Anomaly Detection uses machine learning to identify unusual spend and sends alerts, without needing a fixed threshold.",
    [
      "Anomaly Detection flags unexpected spend automatically.",
      "Pricing Calculator estimates future cost.",
      "Trusted Advisor checks best practices, not spend spikes.",
      "Storage Lens reports S3 usage and activity.",
    ],
    "Unexpected spend spike alert -> Cost Anomaly Detection", ["Cost Anomaly Detection"]
  ),
  mk(
    D4, 21, 4, "hard",
    "Non-production EC2 instances run 24/7 but are only needed on weekdays from 8am to 6pm. Which approach saves the most with the least effort?",
    [
      "Buy a three-year reservation for them",
      "Start and stop them on a schedule, for example with Instance Scheduler or scheduled scaling",
      "Resize them to the largest type",
      "Move them to a different Region",
    ],
    "b",
    "Stopping instances outside working hours removes about two thirds of the compute hours, and a scheduler automates it.",
    [
      "A reservation commits to 24/7 cost for capacity that is mostly idle.",
      "Scheduling matches paid hours to needed hours.",
      "A larger type increases cost.",
      "Moving Regions does not cut idle hours.",
    ],
    "Needed only part of the time -> schedule start/stop", ["Instance Scheduler"]
  ),
  mk(
    D4, 22, 4, "hard",
    "A company must move 80 TB of data to AWS from a site with a 100 Mbps internet link, and a deadline of three weeks. What is the most appropriate approach?",
    [
      "Upload over the internet connection",
      "Use an AWS Snowball Edge device shipped to the site",
      "Buy a larger EC2 instance",
      "Use S3 Transfer Acceleration over the same link",
    ],
    "b",
    "At 100 Mbps, 80 TB would take well over two months, far beyond the deadline. Snowball Edge moves large data offline within days.",
    [
      "The link is too slow for the deadline.",
      "Snowball Edge transfers bulk data offline and meets the time limit.",
      "Compute size does not change link speed.",
      "Transfer Acceleration cannot exceed the capacity of the site's link.",
    ],
    "Tens of TB + slow link + deadline -> Snowball", ["Snowball", "bulk transfer"]
  ),
  mk(
    D4, 23, 4, "hard",
    "A chatty microservice pair exchanges terabytes per month across two Availability Zones and cross-AZ transfer charges are high. The company still needs high availability. What is the best balance?",
    [
      "Keep each service in both AZs and use zone-aware routing so requests prefer the same AZ when healthy",
      "Move everything to one AZ",
      "Move one service to another Region",
      "Disable the load balancer",
    ],
    "a",
    "Zone-aware routing keeps most traffic inside an AZ to cut cross-AZ charges while the deployment across AZs preserves high availability on failure.",
    [
      "Keeping both AZs and preferring local traffic balances cost and availability.",
      "One AZ cuts the charge but loses high availability.",
      "Cross-Region transfer costs more than cross-AZ.",
      "Removing the load balancer breaks distribution and health checks.",
    ],
    "Cross-AZ cost vs HA -> zone-aware routing, stay multi-AZ", ["cross-AZ", "data transfer"]
  ),
  mk(
    D4, 24, 4, "hard",
    "A steady production database runs on RDS and ElastiCache around the clock for the next three years. Which action reduces cost without changing the architecture?",
    [
      "Purchase reserved instances or reserved nodes for the database and cache",
      "Switch to On-Demand during peaks only",
      "Disable Multi-AZ in production",
      "Move the data to S3 Glacier",
    ],
    "a",
    "Reserved instances for RDS and reserved nodes for ElastiCache give a discount for a one- or three-year commitment on steady usage.",
    [
      "Reservations suit steady, long-running databases.",
      "On-Demand is the most expensive way to run steady usage.",
      "Disabling Multi-AZ reduces availability and changes the architecture.",
      "Glacier is archival and cannot serve a live database.",
    ],
    "Steady RDS/ElastiCache -> reserved instances/nodes", ["reserved instances", "RDS"]
  ),
] as Question[]).map((q) => ({ ...q, kind: "exam" as const }));
