import type { Flashcard, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const deepDiveKLQuestions: Question[] = [
  // ---- IAM conditions and ABAC ----
  mk(
    "iam-policy-conditions-abac", 1, 1, "easy",
    "A company wants to allow IAM users to act only on EC2 instances that carry the same Project tag as the user, without writing a new policy for every project. Which approach fits?",
    ["Role-based access control with one role per project", "Attribute-based access control using aws:PrincipalTag and aws:ResourceTag in one policy", "An SCP per project", "A bucket policy"],
    "b",
    "ABAC compares tags on the principal and the resource in a single policy, so new projects are covered by tagging.",
    [
      "One role per project requires new roles and policies as projects are added.",
      "ABAC matches principal and resource tags, scaling without new policies.",
      "SCPs set guardrails and do not grant permissions per project.",
      "Bucket policies apply to S3 and not to EC2 instances.",
    ],
    "\"scale permissions as projects grow, tags\" -> ABAC", ["ABAC", "tags"]
  ),
  mk(
    "iam-policy-conditions-abac", 2, 1, "medium",
    "A security team must make sure that no API call can be made outside eu-west-1 and us-east-1, whatever the user's other permissions. Which policy element does this use?",
    ["A Deny statement with a condition on aws:RequestedRegion", "An Allow statement with the Principal element", "A permissions boundary with no conditions", "A NACL on every subnet"],
    "a",
    "A Deny with aws:RequestedRegion conditions blocks requests to other Regions. It is commonly applied as an SCP.",
    [
      "A Deny with the RequestedRegion key restricts the Regions of requests.",
      "A Principal element says who the statement applies to, not where requests go.",
      "A boundary without conditions does not restrict Regions.",
      "NACLs filter network traffic, not API calls.",
    ],
    "\"restrict to approved Regions\" -> aws:RequestedRegion", ["aws:RequestedRegion"]
  ),
  mk(
    "iam-policy-conditions-abac", 3, 1, "hard",
    "A bucket in an organization must be readable only by principals from accounts in that organization, without listing each account ID, and only over HTTPS. Which TWO conditions in the bucket policy achieve this?",
    ["aws:PrincipalOrgID equals the organization ID", "aws:SecureTransport equals true", "aws:SourceIp equals 0.0.0.0/0", "aws:username equals admin", "aws:MultiFactorAuthAge less than 0"],
    "ab",
    "PrincipalOrgID limits access to the organization, and SecureTransport requires TLS.",
    [
      "PrincipalOrgID matches any account in the organization.",
      "SecureTransport true restricts the statement to HTTPS requests.",
      "0.0.0.0/0 matches every address and restricts nothing.",
      "A single username is not an organization-wide control.",
      "A negative MFA age is not a valid, useful restriction here.",
    ],
    "\"any account in my organization + HTTPS\" -> PrincipalOrgID + SecureTransport", ["PrincipalOrgID", "SecureTransport"]
  ),

  // ---- S3 features ----
  mk(
    "s3-events-access-points-static-hosting", 1, 2, "easy",
    "A company wants a Lambda function to run each time an image is uploaded to an S3 bucket. Which feature fits?",
    ["S3 Event Notifications to Lambda", "S3 Inventory", "S3 Transfer Acceleration", "S3 Requester Pays"],
    "a",
    "Event Notifications invoke Lambda, SNS, SQS or EventBridge when objects are created or removed.",
    [
      "Event Notifications trigger processing on object events.",
      "Inventory produces scheduled reports.",
      "Transfer Acceleration speeds up uploads.",
      "Requester Pays shifts request and transfer costs.",
    ],
    "\"run code on upload\" -> S3 Event Notifications", ["S3 events", "Lambda"]
  ),
  mk(
    "s3-events-access-points-static-hosting", 2, 1, "medium",
    "A company hosts a static site from S3 and now requires HTTPS with a custom domain while keeping the bucket private. What should it do?",
    ["Use the S3 website endpoint with HTTPS", "Put CloudFront in front of the bucket with Origin Access Control and an ACM certificate", "Enable S3 versioning", "Use a NAT gateway"],
    "b",
    "The S3 website endpoint is HTTP only. CloudFront with OAC and an ACM certificate gives HTTPS and keeps the bucket private.",
    [
      "The website endpoint does not support HTTPS.",
      "CloudFront with OAC and ACM provides HTTPS and private origin access.",
      "Versioning is unrelated to HTTPS.",
      "A NAT gateway provides outbound access from private subnets.",
    ],
    "\"S3 static site + HTTPS + private bucket\" -> CloudFront OAC + ACM", ["CloudFront", "OAC", "static website"]
  ),
  mk(
    "s3-events-access-points-static-hosting", 3, 2, "hard",
    "A team must restore 40 million archived objects from Glacier, and listing the bucket would take too long. Which TWO services should they combine?",
    ["S3 Inventory to produce the object manifest", "S3 Batch Operations to run the restore across the manifest", "A Lambda function that calls ListObjects repeatedly", "S3 Transfer Acceleration", "Amazon Athena only"],
    "ab",
    "Inventory provides a cheap list of objects, and Batch Operations performs the restore at scale with tracking and reports.",
    [
      "Inventory delivers scheduled object lists without listing the bucket.",
      "Batch Operations executes an action on every object in a manifest.",
      "Repeated listing is slow and costly for 40 million objects.",
      "Transfer Acceleration speeds up transfers, not restores.",
      "Athena can query the inventory but does not perform the restore.",
    ],
    "\"bulk action on millions of objects\" -> Inventory + Batch Operations", ["Inventory", "Batch Operations"]
  ),

  // ---- Hybrid DNS ----
  mk(
    "route-53-resolver-hybrid-dns", 1, 3, "easy",
    "On-premises servers must resolve the private DNS names of resources in a VPC over a Direct Connect link. What should be created?",
    ["A Route 53 Resolver inbound endpoint", "A Route 53 Resolver outbound endpoint", "A public hosted zone", "An internet gateway"],
    "a",
    "An inbound endpoint gives the on-premises DNS servers an address in the VPC to forward queries to.",
    [
      "Inbound endpoints accept queries coming into the VPC resolver.",
      "Outbound endpoints send queries out of the VPC.",
      "A public hosted zone is for internet-visible names.",
      "An internet gateway is unrelated to private name resolution.",
    ],
    "\"on-premises resolves AWS private names\" -> inbound endpoint", ["Resolver", "inbound endpoint"]
  ),
  mk(
    "route-53-resolver-hybrid-dns", 2, 3, "medium",
    "Instances in a VPC must resolve corp.example.com, which is served by on-premises DNS servers. What is the correct configuration?",
    ["An outbound resolver endpoint with a forwarding rule for corp.example.com", "An inbound endpoint with a forwarding rule", "A private hosted zone copy of every on-premises record", "Edit /etc/hosts on every instance"],
    "a",
    "Outbound endpoints with forwarding rules send queries for specified domains to on-premises DNS.",
    [
      "Outbound endpoints with rules forward selected domains to your DNS servers.",
      "Inbound endpoints receive queries and are not used for forwarding from the VPC.",
      "Copying records creates a manual synchronisation burden.",
      "Editing hosts files does not scale and is error-prone.",
    ],
    "\"VPC resolves on-premises names\" -> outbound endpoint + rule", ["Resolver", "outbound endpoint"]
  ),
  mk(
    "route-53-resolver-hybrid-dns", 3, 1, "hard",
    "A security team wants to block DNS lookups from VPC workloads to known malicious domains and keep a record of all queries. Which TWO capabilities should they use?",
    ["Route 53 Resolver DNS Firewall", "Resolver query logging", "Security groups with domain name rules", "Network ACL domain filters", "AWS Shield Advanced"],
    "ab",
    "DNS Firewall filters outbound DNS queries by domain lists, and query logging records them for analysis.",
    [
      "DNS Firewall blocks queries to listed domains.",
      "Query logging records DNS queries to CloudWatch Logs, S3 or Firehose.",
      "Security groups filter by IP, protocol and port, not domain name.",
      "NACLs also work on addresses and ports, not domain names.",
      "Shield Advanced protects against DDoS attacks.",
    ],
    "\"block malicious domains + log DNS\" -> DNS Firewall + query logging", ["DNS Firewall", "query logging"]
  ),

  // ---- VPC endpoints ----
  mk(
    "vpc-endpoint-types-and-policies", 1, 4, "easy",
    "EC2 instances in private subnets send large volumes of data to S3 through a NAT gateway and the data processing charge is high. What is the cheapest fix?",
    ["Add an S3 gateway endpoint and update the route tables", "Add a second NAT gateway", "Use an interface endpoint for S3 only", "Move instances to public subnets"],
    "a",
    "A gateway endpoint for S3 has no hourly or data charge and removes NAT gateway processing for that traffic.",
    [
      "A gateway endpoint is free and keeps S3 traffic off the NAT gateway.",
      "A second NAT gateway adds cost and does not reduce processing charges.",
      "An interface endpoint has hourly and per-GB charges, and a free gateway endpoint is available for in-VPC access.",
      "Public subnets weaken security and still incur charges.",
    ],
    "\"S3 via NAT is expensive\" -> gateway endpoint", ["gateway endpoint", "NAT"]
  ),
  mk(
    "vpc-endpoint-types-and-policies", 2, 1, "medium",
    "On-premises applications connected over Direct Connect must reach Amazon S3 privately without using the public internet. Which endpoint type supports this?",
    ["Gateway endpoint", "Interface endpoint (PrivateLink)", "NAT gateway", "Egress-only internet gateway"],
    "b",
    "Gateway endpoints cannot be used from on premises. Interface endpoints are reachable over VPN and Direct Connect.",
    [
      "Gateway endpoints work only through the VPC's route tables.",
      "Interface endpoints have private IPs reachable from on premises.",
      "A NAT gateway provides outbound internet access from private subnets.",
      "An egress-only gateway is for outbound IPv6 internet traffic.",
    ],
    "\"on-premises to S3 privately\" -> interface endpoint", ["interface endpoint", "Direct Connect"]
  ),
  mk(
    "vpc-endpoint-types-and-policies", 3, 1, "hard",
    "A company wants a data bucket to be accessible only from workloads in one VPC through its S3 endpoint, and wants the endpoint itself to allow access only to the company's own buckets. Which TWO controls should be configured?",
    ["A bucket policy that denies requests where aws:SourceVpce is not the endpoint ID", "An endpoint policy that allows only the company's buckets", "A security group on the bucket", "A NACL rule for S3", "Disable the endpoint policy so the default applies"],
    "ab",
    "The bucket policy forces access through the endpoint, and the endpoint policy limits what the endpoint can reach.",
    [
      "aws:SourceVpce in a deny condition enforces use of the endpoint.",
      "An endpoint policy restricts which buckets can be reached through it.",
      "S3 buckets do not have security groups.",
      "NACLs do not understand S3 resources.",
      "The default endpoint policy allows all access, which defeats the requirement.",
    ],
    "\"only via endpoint, only my buckets\" -> bucket policy SourceVpce + endpoint policy", ["endpoint policy", "aws:SourceVpce"]
  ),

  // ---- Lambda ----
  mk(
    "lambda-event-sources-versions-aliases", 1, 2, "easy",
    "A team wants to release a new Lambda version to 10 percent of traffic first and roll back instantly if errors appear. Which feature fits?",
    ["An alias with weighted routing between two versions", "Pointing clients at $LATEST", "Provisioned concurrency", "A Lambda layer"],
    "a",
    "Aliases can split traffic between two published versions, and repointing the alias gives instant rollback.",
    [
      "Weighted alias routing provides canary releases and quick rollback.",
      "$LATEST is mutable and has no controlled traffic split.",
      "Provisioned concurrency reduces cold starts.",
      "Layers share libraries between functions.",
    ],
    "\"canary release for Lambda\" -> alias weighted routing", ["alias", "canary"]
  ),
  mk(
    "lambda-event-sources-versions-aliases", 2, 2, "medium",
    "A function processes messages from an SQS queue in batches, and one bad message currently causes the whole batch to be retried. How can only the failed messages be retried?",
    ["Enable partial batch response (report batch item failures)", "Increase the function timeout", "Use a smaller memory size", "Switch to a FIFO queue only"],
    "a",
    "Partial batch response lets the function report which items failed so only those return to the queue.",
    [
      "Reporting batch item failures retries only the failed messages.",
      "A longer timeout does not change which messages are retried.",
      "Memory size does not affect retry scope.",
      "A FIFO queue changes ordering, not partial retry behaviour.",
    ],
    "\"retry only failed messages in a batch\" -> partial batch response", ["SQS", "partial batch response"]
  ),
  mk(
    "lambda-event-sources-versions-aliases", 3, 2, "hard",
    "A function is triggered asynchronously by S3 events and occasionally fails. The team wants failed events kept for later analysis without losing them. Which TWO configurations help?",
    ["An on-failure destination such as an SQS queue", "A dead-letter queue on the function", "Setting the invocation type to synchronous", "Increasing the batch window", "Removing the retry attempts"],
    "ab",
    "For asynchronous invocations, an on-failure destination or a DLQ captures events that could not be processed.",
    [
      "Destinations route failed asynchronous events to SQS, SNS, Lambda or EventBridge.",
      "A DLQ stores events that failed after all retries.",
      "S3 event invocations are asynchronous by design and cannot be changed to synchronous.",
      "Batch window applies to event source mappings, not S3 events.",
      "Removing retries increases the chance of losing events.",
    ],
    "\"async failures kept\" -> destinations or DLQ", ["destinations", "DLQ"]
  ),

  // ---- DynamoDB modeling ----
  mk(
    "dynamodb-data-modeling-access-patterns", 1, 3, "easy",
    "An application needs all orders for a given customer within a date range. Which key design supports this with a single efficient Query?",
    ["Partition key CustomerId and sort key OrderDate", "Partition key OrderDate only", "A Scan with a filter on CustomerId", "Partition key Status"],
    "a",
    "A composite key of CustomerId and OrderDate allows a Query for one customer and a date range.",
    [
      "CustomerId plus OrderDate fits the access pattern exactly.",
      "OrderDate alone would not find one customer's orders efficiently.",
      "A Scan reads the whole table before filtering.",
      "Status is low cardinality and does not target a customer.",
    ],
    "\"items for one entity in a date range\" -> PK entity, SK date, Query", ["partition key", "sort key", "Query"]
  ),
  mk(
    "dynamodb-data-modeling-access-patterns", 2, 3, "medium",
    "A table needs an additional access pattern on an attribute that was not planned, the table already exists and has data, and eventual consistency is acceptable. What should be added?",
    ["A local secondary index", "A global secondary index", "A second table with manual copying only", "A Scan on every request"],
    "b",
    "A GSI can be added to an existing table at any time. An LSI must be created with the table.",
    [
      "LSIs can only be created when the table is created.",
      "GSIs can be added later and support new access patterns.",
      "Manual copying adds complexity and consistency risk.",
      "Scanning is slow and expensive at scale.",
    ],
    "\"new access pattern on existing table\" -> GSI", ["GSI", "LSI"]
  ),
  mk(
    "dynamodb-data-modeling-access-patterns", 3, 4, "hard",
    "A read-heavy DynamoDB workload runs a Scan with a filter every few seconds on a 500 GB table and consumes huge read capacity. Which TWO changes reduce cost most?",
    ["Replace the Scan with a Query on an appropriate key or index", "Use eventually consistent reads where acceptable", "Increase provisioned write capacity", "Use a larger item size", "Disable TTL"],
    "ab",
    "Queries read only matching items, and eventually consistent reads cost half of strongly consistent reads.",
    [
      "A Scan reads the entire table before filtering, so a Query on a key or index is far cheaper.",
      "Eventually consistent reads use half the capacity of strongly consistent reads.",
      "Write capacity does not reduce read costs.",
      "Larger items increase read cost.",
      "TTL removes expired data and does not increase read cost.",
    ],
    "\"Scan is expensive\" -> Query + eventually consistent reads", ["Scan", "Query", "RCU"]
  ),

  // ---- RDS operations ----
  mk(
    "rds-storage-performance-insights-maintenance", 1, 3, "easy",
    "A transactional database needs sustained, very high IOPS with low latency. Which RDS storage type fits?",
    ["gp2", "Provisioned IOPS (io1 or io2)", "Magnetic", "S3"],
    "b",
    "Provisioned IOPS SSD storage is designed for I/O-intensive workloads that need consistent high performance.",
    [
      "gp2 performance is tied to volume size and burst behaviour.",
      "Provisioned IOPS delivers consistent high IOPS and low latency.",
      "Magnetic is legacy and slow.",
      "S3 is object storage and not used as RDS storage.",
    ],
    "\"sustained high IOPS\" -> Provisioned IOPS", ["Provisioned IOPS", "RDS"]
  ),
  mk(
    "rds-storage-performance-insights-maintenance", 2, 3, "medium",
    "A database is slow and the team needs to find which SQL statements and wait events are responsible. Which feature shows this?",
    ["Enhanced Monitoring", "RDS Performance Insights (now CloudWatch Database Insights)", "CloudTrail", "AWS Config"],
    "b",
    "Performance Insights breaks database load down by wait events, SQL statements, hosts and users.",
    [
      "Enhanced Monitoring shows operating system metrics.",
      "Performance Insights identifies the queries and waits behind the load.",
      "CloudTrail records API calls.",
      "Config records resource configuration.",
    ],
    "\"which query is slow\" -> Performance Insights", ["Performance Insights"]
  ),
  mk(
    "rds-storage-performance-insights-maintenance", 3, 2, "hard",
    "A production RDS database must be patched during its maintenance window with the least possible downtime. Which design achieves this?",
    ["Single-AZ instance with no standby", "Multi-AZ deployment, where the standby is patched first and then a failover occurs", "Stop the database for the whole window", "Use a read replica as the only copy"],
    "b",
    "In Multi-AZ, RDS patches the standby, fails over and then patches the former primary, so downtime is brief.",
    [
      "A single-AZ instance is unavailable while it is patched.",
      "Multi-AZ shortens the outage to a brief failover.",
      "Stopping the database maximises downtime.",
      "A read replica is not a failover target with automatic patch sequencing.",
    ],
    "\"patch with minimal downtime\" -> Multi-AZ", ["Multi-AZ", "maintenance"]
  ),

  // ---- Beanstalk ----
  mk(
    "elastic-beanstalk-deployment-policies", 1, 2, "easy",
    "A production Elastic Beanstalk application must keep full capacity during a deployment and must be able to roll back quickly. Which policy fits best?",
    ["All at once", "Rolling", "Immutable", "Delete and recreate the environment"],
    "c",
    "Immutable launches new instances in a separate group, keeps existing capacity and allows simple rollback by terminating the new group.",
    [
      "All at once updates every instance together and can cause downtime.",
      "Rolling reduces capacity while each batch updates.",
      "Immutable keeps full capacity and rolls back easily.",
      "Recreating the environment causes downtime.",
    ],
    "\"full capacity + easy rollback\" -> immutable", ["Beanstalk", "immutable"]
  ),
  mk(
    "elastic-beanstalk-deployment-policies", 2, 2, "medium",
    "A team wants to test a new Beanstalk version with 10 percent of users before completing the release. Which deployment option fits?",
    ["All at once", "Traffic splitting", "Rolling", "A larger instance type"],
    "b",
    "Traffic splitting sends a defined percentage of traffic to the new version as a canary evaluation.",
    [
      "All at once releases to everyone immediately.",
      "Traffic splitting provides percentage-based canary testing.",
      "Rolling updates batches of instances but does not send a controlled traffic percentage.",
      "Instance size is unrelated.",
    ],
    "\"canary test on a share of users\" -> traffic splitting", ["traffic splitting"]
  ),
  mk(
    "elastic-beanstalk-deployment-policies", 3, 2, "hard",
    "A team created an RDS database inside its Elastic Beanstalk environment, and a cleanup of the environment deleted the production data. What is the correct design?",
    ["Keep the database inside the environment", "Create the RDS database outside the environment and connect to it by endpoint", "Store data on the instances", "Use instance store"],
    "b",
    "A database inside the environment is tied to its lifecycle. Production databases should be created separately.",
    [
      "A database inside the environment is deleted with it.",
      "An external RDS database survives environment changes.",
      "Instance storage is lost when instances are replaced.",
      "Instance store is ephemeral.",
    ],
    "\"DB deleted with Beanstalk environment\" -> decouple the database", ["Beanstalk", "RDS"]
  ),

  // ---- DR implementation ----
  mk(
    "dr-implementation-patterns-on-aws", 1, 2, "easy",
    "A workload can tolerate several hours of downtime and several hours of data loss, and cost must be minimal. Which DR strategy fits?",
    ["Multi-site active-active", "Warm standby", "Backup and restore", "Pilot light with full servers running"],
    "c",
    "Backup and restore has the lowest cost and the longest recovery time, which matches a tolerance of hours.",
    [
      "Active-active is the most expensive and fastest.",
      "Warm standby keeps a working scaled-down copy running, which costs more than needed.",
      "Backup and restore keeps only backups and suits hours-level RTO and RPO.",
      "Running full servers contradicts the minimal cost requirement.",
    ],
    "\"hours of tolerance, minimal cost\" -> backup and restore", ["backup and restore", "RTO", "RPO"]
  ),
  mk(
    "dr-implementation-patterns-on-aws", 2, 2, "medium",
    "A company needs an RTO of about 15 minutes and an RPO of seconds for its database, and wants to pay for as little standing compute as possible. Which design fits?",
    ["Pilot light: Aurora Global Database secondary live, application servers defined but scaled to zero", "Backup and restore only", "Single-AZ database with nightly snapshots", "Active-active with full capacity in two Regions"],
    "a",
    "A continuously replicated database gives an RPO of seconds, and starting application servers on failover meets a 15-minute RTO at low standing cost.",
    [
      "Pilot light keeps data live and compute off until needed.",
      "Backup and restore has an RTO of hours and an RPO tied to backup age.",
      "Nightly snapshots mean up to a day of data loss.",
      "Active-active exceeds the requirement and costs far more.",
    ],
    "\"RPO seconds, RTO 15 min, low cost\" -> pilot light", ["pilot light", "Aurora Global Database"]
  ),
  mk(
    "dr-implementation-patterns-on-aws", 3, 2, "hard",
    "A DR drill fails because the recovery Region cannot launch the required number of instances and a KMS-encrypted AMI cannot be used. Which TWO preparations were missing?",
    ["Service quota increases in the recovery Region", "A KMS key and encrypted AMI copy available in the recovery Region", "A larger primary database", "More Availability Zones in the primary Region", "A longer DNS TTL"],
    "ab",
    "Quotas are per Region and encrypted resources need keys and copies available in the recovery Region.",
    [
      "Quotas are not copied between Regions and must be raised in advance.",
      "Encrypted AMIs and snapshots need to be copied and usable with keys in the target Region.",
      "A larger primary database does not help the recovery Region.",
      "More primary AZs do not address a Regional recovery gap.",
      "A longer TTL slows DNS changes.",
    ],
    "\"drill failed in recovery Region\" -> quotas and keys", ["quotas", "KMS", "DR"]
  ),

  // ---- Cost playbook ----
  mk(
    "cost-optimization-playbook-by-workload", 1, 4, "easy",
    "A company plans to buy a three-year Savings Plan for a fleet that Compute Optimizer shows is heavily oversized. What should they do first?",
    ["Buy the Savings Plan immediately", "Right-size the instances, then commit to the reduced steady baseline", "Switch everything to Spot", "Disable monitoring"],
    "b",
    "Right-sizing first avoids committing to waste. The commitment should cover the reduced steady usage.",
    [
      "Committing before right-sizing locks in unnecessary spend.",
      "Right-size, then commit to the baseline that remains.",
      "Spot is unsuitable for every workload and is not the first step.",
      "Disabling monitoring removes the data needed for optimisation.",
    ],
    "\"oversized fleet + commitment\" -> right-size first", ["right-sizing", "Savings Plans"]
  ),
  mk(
    "cost-optimization-playbook-by-workload", 2, 4, "medium",
    "A development environment is used only on weekdays from 08:00 to 18:00 but runs all the time. What is the simplest way to cut cost?",
    ["Reserved Instances for 24/7 usage", "Schedule the instances to stop outside working hours", "Increase instance size", "Add more AZs"],
    "b",
    "Stopping non-production resources outside working hours removes more than half of the compute hours with no architecture change.",
    [
      "Reserved Instances discount 24/7 usage and do not remove idle hours.",
      "Scheduling stops paying for compute while it is idle.",
      "Larger instances cost more.",
      "More AZs add cost.",
    ],
    "\"dev environment only used in office hours\" -> schedule stop/start", ["scheduling", "non-production"]
  ),
  mk(
    "cost-optimization-playbook-by-workload", 3, 4, "hard",
    "A cost review finds unattached EBS volumes, snapshots of deleted instances, an idle load balancer and unassociated Elastic IPs. Which TWO statements are correct?",
    ["These idle resources still incur charges and should be removed after confirming they are unused", "Trusted Advisor and Cost Explorer can help find such waste", "They are free until attached", "Deleting them reduces durability of running workloads", "Only Reserved Instances can reduce this cost"],
    "ab",
    "Idle resources generate cost, and AWS tools help identify them. Removing confirmed unused resources reduces spend.",
    [
      "Unattached volumes, snapshots, idle load balancers and public IPv4 addresses are charged.",
      "Trusted Advisor checks and Cost Explorer reports surface idle resources.",
      "They are not free while unattached.",
      "Deleting unused resources does not affect running workloads if they are truly unused.",
      "Reservations do not remove the cost of idle resources.",
    ],
    "\"idle resources\" -> find with Trusted Advisor, then delete", ["Trusted Advisor", "idle resources"]
  ),

  // ---- Organizations / Control Tower ----
  mk(
    "organizations-scp-control-tower-design", 1, 1, "easy",
    "A company wants to prevent every member account, including account administrators, from disabling AWS CloudTrail. What should it use?",
    ["IAM policies in each account", "A service control policy that denies cloudtrail:StopLogging and related actions", "A NACL", "AWS Shield"],
    "b",
    "An SCP applied at the root or OU sets a permission ceiling that member account administrators cannot override.",
    [
      "Administrators of each account could edit IAM policies in their own account.",
      "An SCP deny blocks the actions in all affected accounts.",
      "NACLs filter network traffic, not API actions.",
      "Shield protects against DDoS attacks.",
    ],
    "\"nobody in any account can do X\" -> SCP deny", ["SCP", "Organizations"]
  ),
  mk(
    "organizations-scp-control-tower-design", 2, 1, "medium",
    "A company wants to set up a secure multi-account environment quickly, with central log and audit accounts, single sign-on and a way to create new accounts with baselines. Which service fits?",
    ["AWS Control Tower", "AWS Config alone", "AWS Backup", "Amazon Inspector"],
    "a",
    "Control Tower automates a landing zone with log archive and audit accounts, IAM Identity Center and Account Factory.",
    [
      "Control Tower sets up and governs the multi-account environment.",
      "Config evaluates configuration and does not build a landing zone.",
      "Backup protects data and does not set up accounts.",
      "Inspector scans for vulnerabilities.",
    ],
    "\"landing zone, Account Factory\" -> Control Tower", ["Control Tower", "landing zone"]
  ),
  mk(
    "organizations-scp-control-tower-design", 3, 1, "hard",
    "Which TWO statements about service control policies are correct?",
    ["They set the maximum permissions available to accounts and do not grant permissions themselves", "They do not apply to the management account", "They override resource-based policies by granting additional access", "They apply only to the root user of each account", "They can be attached only to individual IAM users"],
    "ab",
    "SCPs are guardrails that limit permissions, they never grant access, and the management account is not restricted by them.",
    [
      "SCPs define the ceiling, and identity or resource policies must still allow actions.",
      "The management account is exempt from SCPs.",
      "SCPs never add permissions.",
      "SCPs apply to all principals in affected member accounts, not only the root user.",
      "SCPs attach to the root, OUs or accounts, not individual IAM users.",
    ],
    "SCP = ceiling, not a grant, and not on the management account", ["SCP"]
  ),

  // ---- EC2 networking ----
  mk(
    "ec2-networking-eni-eip-efa", 1, 2, "easy",
    "A legacy application has a licence tied to a MAC address and clients that connect to a fixed private IP. How can it fail over to a standby instance in the same AZ?",
    ["Launch a new instance and hope the IP matches", "Detach the secondary ENI from the failed instance and attach it to the standby", "Use an auto-assigned public IP", "Use Route 53 weighted records"],
    "b",
    "An ENI keeps its MAC address, private IP and security groups, so attaching it to a standby moves the identity.",
    [
      "A new instance gets a different address and MAC.",
      "Moving the ENI preserves its MAC, private IP and security groups.",
      "Auto-assigned public IPs change on stop and start.",
      "DNS routing does not preserve a MAC-address licence.",
    ],
    "\"MAC licence, fixed IP, failover\" -> move the ENI", ["ENI", "failover"]
  ),
  mk(
    "ec2-networking-eni-eip-efa", 2, 3, "medium",
    "A tightly coupled HPC simulation using MPI needs the lowest inter-node latency and OS-bypass networking. Which combination fits?",
    ["Standard ENA only in separate AZs", "Elastic Fabric Adapter with instances in a cluster placement group", "Elastic IPs on every instance", "NAT gateway"],
    "b",
    "EFA provides OS-bypass networking for MPI workloads and works best with instances in a cluster placement group.",
    [
      "Separate AZs add latency and do not provide OS-bypass.",
      "EFA with a cluster placement group is designed for tightly coupled HPC.",
      "Elastic IPs provide public addresses, not performance.",
      "NAT gateways handle outbound internet access.",
    ],
    "\"MPI, tightly coupled HPC\" -> EFA + cluster placement group", ["EFA", "HPC"]
  ),
  mk(
    "ec2-networking-eni-eip-efa", 3, 4, "hard",
    "A team keeps 40 Elastic IP addresses that are not associated with any running instance. What is true?",
    ["They are free while unassociated", "They incur hourly public IPv4 charges and should be released if not needed", "They are automatically released after 24 hours", "They reduce data transfer cost"],
    "b",
    "Public IPv4 addresses, including Elastic IPs, are charged per hour, so unused ones waste money.",
    [
      "Public IPv4 addresses are charged, associated or not.",
      "Releasing unneeded addresses removes the charge.",
      "They are not released automatically.",
      "They do not affect data transfer cost.",
    ],
    "\"idle Elastic IPs\" -> release them, they cost money", ["Elastic IP", "cost"]
  ),
];

export const deepDiveKLFlashcards: Flashcard[] = [
  fc("iam-policy-conditions-abac", 1, 1, "Security, Identity, and Compliance", "How are conditions combined?", "Several condition operators in one block are ANDed. Multiple values for one key are ORed."),
  fc("iam-policy-conditions-abac", 2, 1, "Security, Identity, and Compliance", "What is ABAC?", "Attribute-based access control: one policy compares tags on the principal (aws:PrincipalTag) with tags on the resource (aws:ResourceTag), so new projects need only tagging."),
  fc("iam-policy-conditions-abac", 3, 1, "Security, Identity, and Compliance", "Useful global condition keys?", "aws:RequestedRegion, aws:SourceIp, aws:MultiFactorAuthPresent, aws:SecureTransport, aws:PrincipalOrgID, aws:SourceVpce."),

  fc("s3-events-access-points-static-hosting", 1, 2, "Storage", "S3 event destinations?", "SNS, SQS, Lambda or EventBridge, with prefix and suffix filters. Delivery is at least once."),
  fc("s3-events-access-points-static-hosting", 2, 1, "Storage", "HTTPS for an S3 static site?", "The S3 website endpoint is HTTP only. Use CloudFront with Origin Access Control and an ACM certificate."),
  fc("s3-events-access-points-static-hosting", 3, 3, "Storage", "Inventory vs Batch Operations?", "Inventory lists objects on a schedule. Batch Operations runs an action (copy, tag, restore, Lambda) on every object in a manifest."),

  fc("route-53-resolver-hybrid-dns", 1, 3, "Networking and Content Delivery", "Inbound vs outbound Resolver endpoint?", "Inbound: on-premises resolves AWS private names. Outbound: VPC resolves on-premises names via forwarding rules."),
  fc("route-53-resolver-hybrid-dns", 2, 3, "Networking and Content Delivery", "Private hosted zone requirements?", "Associate it with the VPC and enable DNS support and DNS hostnames on the VPC."),
  fc("route-53-resolver-hybrid-dns", 3, 1, "Networking and Content Delivery", "Filtering DNS by domain?", "Route 53 Resolver DNS Firewall, with query logging to record the queries. Security groups and NACLs do not filter by domain."),

  fc("vpc-endpoint-types-and-policies", 1, 4, "Networking and Content Delivery", "Gateway vs interface endpoint?", "Gateway: S3 and DynamoDB only, route table target, free, not reachable from on premises. Interface: ENI with private IP, many services, security groups, hourly and per-GB charge."),
  fc("vpc-endpoint-types-and-policies", 2, 1, "Networking and Content Delivery", "Locking down an S3 data path?", "Endpoint policy allowing only your buckets, plus a bucket policy denying requests whose aws:SourceVpce is not the endpoint."),
  fc("vpc-endpoint-types-and-policies", 3, 3, "Networking and Content Delivery", "PrivateLink publishing a service?", "Provider puts an NLB or GWLB in front and creates an endpoint service. Consumers create interface endpoints. One-way, works with overlapping CIDRs."),

  fc("lambda-event-sources-versions-aliases", 1, 2, "Compute", "Lambda invocation types?", "Synchronous (caller handles errors), asynchronous (Lambda retries, destinations or DLQ), and event source mappings (polled batches from SQS, Kinesis, DynamoDB Streams, MSK)."),
  fc("lambda-event-sources-versions-aliases", 2, 2, "Compute", "Versions and aliases?", "A version is an immutable snapshot ($LATEST is mutable). An alias points to a version and can split traffic between two versions for canary releases and rollback."),
  fc("lambda-event-sources-versions-aliases", 3, 3, "Compute", "Lambda memory and CPU?", "Memory ranges from 128 MB to 10 GB and CPU scales with memory, so more memory can shorten runtime."),

  fc("dynamodb-data-modeling-access-patterns", 1, 3, "Database", "Query vs Scan?", "Query reads items for one partition key (and sort key condition) efficiently. Scan reads the whole table and filters afterwards."),
  fc("dynamodb-data-modeling-access-patterns", 2, 3, "Database", "GSI vs LSI?", "GSI: any time, own key and capacity, eventually consistent only. LSI: created with the table, same partition key, shared capacity, strongly consistent option, 10 GB per partition key value."),
  fc("dynamodb-data-modeling-access-patterns", 3, 3, "Database", "DynamoDB limits to remember?", "Item size 400 KB, Streams retain 24 hours, point-in-time recovery 35 days. Store large objects in S3."),

  fc("rds-storage-performance-insights-maintenance", 1, 3, "Database", "RDS storage choice?", "gp3 for most workloads (IOPS set independently of size), Provisioned IOPS (io1 or io2) for sustained high IOPS. Autoscaling grows storage but never shrinks it."),
  fc("rds-storage-performance-insights-maintenance", 2, 3, "Database", "Performance Insights vs Enhanced Monitoring?", "Performance Insights (now part of CloudWatch Database Insights): database load by wait event and SQL. Enhanced Monitoring: operating system metrics at fine granularity."),
  fc("rds-storage-performance-insights-maintenance", 3, 2, "Database", "Patching with minimal downtime?", "Multi-AZ: the standby is patched first, then a failover occurs. Single-AZ is unavailable during patching."),

  fc("elastic-beanstalk-deployment-policies", 1, 2, "Compute", "Beanstalk deployment policies?", "All at once, rolling, rolling with additional batch, immutable, traffic splitting, plus blue/green by swapping environment URLs."),
  fc("elastic-beanstalk-deployment-policies", 2, 2, "Compute", "Safest deployment with fast rollback?", "Immutable (new instances in a new Auto Scaling group) or blue/green. Both keep the old version available for rollback."),
  fc("elastic-beanstalk-deployment-policies", 3, 2, "Compute", "Where should a production database live?", "Outside the Beanstalk environment, for example in RDS, because a database in the environment is deleted with it."),

  fc("dr-implementation-patterns-on-aws", 1, 2, "Resilience", "DR strategies and recovery times?", "Backup and restore: hours. Pilot light: tens of minutes. Warm standby: minutes. Multi-site active-active: near zero. Cost rises in the same order."),
  fc("dr-implementation-patterns-on-aws", 2, 2, "Resilience", "Three parts of any DR design?", "Data replication, standby infrastructure (AMIs, templates, quotas) and traffic failover (Route 53 or Global Accelerator)."),
  fc("dr-implementation-patterns-on-aws", 3, 2, "Resilience", "Why do DR drills fail?", "Missing quotas, keys, secrets or AMI copies in the recovery Region. Test regularly and plan failback."),

  fc("cost-optimization-playbook-by-workload", 1, 4, "AWS Cost Management", "Cost ladder?", "Eliminate idle, right-size, commit to the steady baseline, use Spot for interruptible work, tier and schedule, then optimise network and monitor."),
  fc("cost-optimization-playbook-by-workload", 2, 4, "AWS Cost Management", "Cheapest way to run a dev environment used in office hours?", "Schedule it to stop outside working hours. Commitments do not remove idle hours."),
  fc("cost-optimization-playbook-by-workload", 3, 4, "AWS Cost Management", "Hidden charges to remember?", "Unattached EBS volumes, old snapshots, idle load balancers, and all public IPv4 addresses including idle Elastic IPs."),

  fc("organizations-scp-control-tower-design", 1, 1, "Security, Identity, and Compliance", "SCP facts?", "SCPs set the maximum permissions, inherit down the OU tree, never grant access and do not apply to the management account or service-linked roles."),
  fc("organizations-scp-control-tower-design", 2, 1, "Security, Identity, and Compliance", "Control Tower control types?", "Preventive (implemented with SCPs), detective (AWS Config rules) and proactive (CloudFormation hooks)."),
  fc("organizations-scp-control-tower-design", 3, 1, "Security, Identity, and Compliance", "Why use delegated administrators?", "To run services like GuardDuty, Security Hub and Config from a security account instead of using the management account for workloads and tooling."),

  fc("ec2-networking-eni-eip-efa", 1, 2, "Compute", "Why move an ENI to a standby?", "It carries the MAC address, private IP and security groups, so the standby takes over the identity. ENIs cannot cross AZs."),
  fc("ec2-networking-eni-eip-efa", 2, 3, "Compute", "ENA vs EFA?", "ENA is enhanced networking on Nitro instances. EFA adds OS-bypass for tightly coupled HPC and ML, used with cluster placement groups."),
  fc("ec2-networking-eni-eip-efa", 3, 4, "Compute", "Elastic IP vs auto-assigned public IP?", "An Elastic IP stays yours and can be remapped. An auto-assigned public IP is released when the instance stops. Public IPv4 addresses are charged hourly."),
];
