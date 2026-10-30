import type { Flashcard, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const deepDiveOPQuestions: Question[] = [
  // ---- VPC sharing and RAM ----
  mk(
    "vpc-sharing-ram-multi-account-networking", 1, 3, "medium",
    "A central network team wants application accounts in the same AWS Organization to launch resources into subnets the team manages, without VPC peering or Transit Gateway. Which approach meets this?",
    [
      "Create a VPC peering connection from every application account",
      "Share the VPC subnets with the application accounts using AWS Resource Access Manager",
      "Copy the VPC into each account with CloudFormation StackSets",
      "Give each application account an IAM user in the network account",
    ],
    "b",
    "VPC sharing through RAM lets participant accounts launch resources into subnets owned by the network account, communicating over private IPs inside one VPC.",
    [
      "Peering connects separate VPCs and is the thing the team wants to avoid.",
      "RAM subnet sharing places resources from many accounts into one VPC.",
      "Copying creates separate VPCs that would need connecting.",
      "Users in the network account would not place other accounts' resources in its subnets, and sharing IAM users is poor practice.",
    ],
    "\"Many accounts, one network\" -> share subnets with RAM", ["RAM", "shared subnets"]
  ),
  mk(
    "vpc-sharing-ram-multi-account-networking", 2, 3, "hard",
    "In a shared VPC, which responsibilities belong to the participant accounts? (Select TWO.)",
    [
      "Managing their own security groups",
      "Modifying the VPC route tables",
      "Managing and paying for their own resources launched in the shared subnets",
      "Editing the network ACLs on the shared subnets",
      "Creating and deleting the shared subnets",
    ],
    "ac",
    "Participants manage and pay for their own resources and security groups. The owner manages the VPC, subnets, route tables, network ACLs and gateways.",
    [
      "Correct. Security groups are controlled per account.",
      "Route tables are owned by the VPC owner.",
      "Correct. Each participant owns and pays for its resources.",
      "Network ACLs are controlled by the owner.",
      "Subnets are created and shared by the owner.",
    ],
    "Owner owns the network, participants own their resources", ["participant", "owner"]
  ),
  mk(
    "vpc-sharing-ram-multi-account-networking", 3, 1, "hard",
    "Two accounts share a subnet, but the instances in each account refer to the AZ by a different name, and a team wants the workloads in the same physical zone for low latency. What should they use?",
    [
      "The AZ name, because names are identical in every account",
      "The AZ ID, which identifies the physical zone consistently across accounts",
      "A cluster placement group across accounts",
      "A Local Zone",
    ],
    "b",
    "AZ names are mapped per account, so two accounts' us-east-1a can be different zones. AZ IDs are the same everywhere.",
    [
      "Names are randomised per account to spread load.",
      "AZ IDs give a consistent identifier across accounts.",
      "Placement groups work within an account and AZ and do not solve naming.",
      "A Local Zone is a different kind of infrastructure extension.",
    ],
    "Compare zones across accounts with AZ IDs", ["AZ ID"]
  ),

  // ---- Golden AMI / Image Builder ----
  mk(
    "golden-ami-image-builder-pipelines", 1, 2, "medium",
    "A security team requires that every new EC2 instance launches from a hardened, patched image rebuilt monthly, with the least operational effort and automatic tests. Which solution fits?",
    [
      "An EC2 Image Builder pipeline with a hardening recipe and test components on a monthly schedule",
      "A long user data script that patches the OS on every launch",
      "A bastion host that engineers use to patch each new instance",
      "Manually build an AMI every month from an administrator's laptop",
    ],
    "a",
    "Image Builder automates building, testing and distributing images on a schedule.",
    [
      "Image Builder is the managed pipeline for golden AMIs.",
      "User data at every launch slows scale-out and varies between launches.",
      "Manual patching through a bastion is slow and inconsistent.",
      "A manual process is error-prone and not automated.",
    ],
    "\"Automate image creation\" -> Image Builder", ["Image Builder"]
  ),
  mk(
    "golden-ami-image-builder-pipelines", 2, 4, "medium",
    "A team deregisters hundreds of old AMIs, but the storage bill does not fall. What is the most likely reason?",
    [
      "AMIs are billed per Region and cannot be removed",
      "The snapshots that back the AMIs still exist and are still billed",
      "Deregistering an AMI moves it to Glacier",
      "The AMIs are protected by the Savings Plan",
    ],
    "b",
    "EBS-backed AMIs are backed by snapshots. Deregistering the AMI does not delete the snapshots, so they keep costing money until deleted.",
    [
      "AMIs themselves are not billed. Their snapshots are.",
      "The snapshots remain and are billed.",
      "Deregistering does not archive anything.",
      "Savings Plans do not cover snapshot storage.",
    ],
    "Delete the snapshots as well, for example with Data Lifecycle Manager", ["snapshot", "DLM"]
  ),
  mk(
    "golden-ami-image-builder-pipelines", 3, 2, "hard",
    "A company shares an encrypted AMI with a second account, but launches there fail with a permissions error. The AMI launch permission was granted. What is missing?",
    [
      "The second account must enable EBS encryption by default",
      "The KMS key used to encrypt the AMI snapshots must also be shared with the second account",
      "The AMI must be copied to Amazon S3 first",
      "A VPC peering connection between the accounts",
    ],
    "b",
    "An encrypted AMI needs the second account to be allowed to use the KMS key that encrypts its snapshots, in addition to the launch permission.",
    [
      "Default encryption does not grant access to the source key.",
      "Key access is required to launch from an encrypted image.",
      "AMIs are not copied to S3 for sharing.",
      "Networking has no role in AMI launch permissions.",
    ],
    "Encrypted AMI shared -> share the KMS key too", ["KMS", "AMI sharing"]
  ),

  // ---- ECS operations ----
  mk(
    "ecs-networking-scaling-service-connect", 1, 1, "medium",
    "A company runs ECS tasks and needs a different security group for each task, with the database allowing traffic only from the task's security group. Which network mode should they use?",
    ["host", "bridge", "awsvpc", "none"],
    "c",
    "In awsvpc mode every task gets its own elastic network interface and security group.",
    [
      "Host mode uses the instance's network directly.",
      "Bridge mode shares the host's Docker network.",
      "awsvpc gives each task its own ENI and security group.",
      "None disables external networking.",
    ],
    "Per-task security group -> awsvpc", ["awsvpc"]
  ),
  mk(
    "ecs-networking-scaling-service-connect", 2, 4, "hard",
    "A batch-like ECS service must always keep two tasks running reliably, but anything above that can tolerate interruption, and the company wants the lowest cost. Which capacity provider strategy fits?",
    [
      "Fargate Spot only",
      "A base of two tasks on Fargate and additional tasks weighted to Fargate Spot",
      "On-Demand EC2 only with host networking",
      "Fargate only with a large desired count",
    ],
    "b",
    "A base on Fargate guarantees stable minimum capacity, and weighting extra tasks to Fargate Spot captures the discount where interruption is acceptable.",
    [
      "Spot-only could lose all tasks at once.",
      "Mixing a Fargate base with Fargate Spot meets both requirements.",
      "On-Demand EC2 with host mode is neither the cheapest nor needed.",
      "Fargate only pays full price for the interruptible tasks.",
    ],
    "Base for reliability, Spot weight for cost", ["capacity provider", "Fargate Spot"]
  ),
  mk(
    "ecs-networking-scaling-service-connect", 3, 2, "hard",
    "A new version of an ECS service sometimes fails its health checks. The team wants the deployment to stop and return to the previous version automatically, with no extra tooling. What should they enable?",
    [
      "A scheduled scaling action",
      "The ECS deployment circuit breaker with rollback",
      "ECS Exec",
      "A placement strategy of binpack",
    ],
    "b",
    "The deployment circuit breaker detects when tasks fail to reach a steady state and can automatically roll back to the last good deployment.",
    [
      "Scheduled scaling changes task count on a schedule.",
      "The circuit breaker with rollback does exactly this.",
      "ECS Exec opens a shell for troubleshooting.",
      "Binpack affects task placement and cost.",
    ],
    "Auto rollback of failed rolling update -> circuit breaker", ["deployment circuit breaker"]
  ),

  // ---- Tagging governance ----
  mk(
    "tagging-governance-tag-policies-resource-groups", 1, 4, "medium",
    "A company wants to prevent anyone in member accounts from launching EC2 instances unless a CostCenter tag is supplied at creation. Which is the most direct way?",
    [
      "An Organizations tag policy defining the CostCenter key",
      "An SCP that denies ec2:RunInstances when the aws:RequestTag/CostCenter condition key is absent",
      "A Cost Explorer report grouped by CostCenter",
      "An AWS Config rule that reports untagged instances",
    ],
    "b",
    "Requiring a tag at creation needs a deny with a request tag condition, for example in an SCP or IAM policy.",
    [
      "A tag policy standardises tag values but does not require a tag to be present.",
      "An SCP or IAM condition on aws:RequestTag can block untagged creation.",
      "A report shows cost after the fact.",
      "Config reports non-compliance after creation but does not block it.",
    ],
    "Require at creation -> aws:RequestTag condition", ["aws:RequestTag", "SCP"]
  ),
  mk(
    "tagging-governance-tag-policies-resource-groups", 2, 4, "medium",
    "Finance activates a new CostCenter tag in the Billing console today and expects reports to show last month's spend by CostCenter. What will happen?",
    [
      "Last month's costs will be backfilled automatically",
      "The tag will appear only for usage after activation, because cost allocation tags are not retroactive",
      "The tag will show in Cost Explorer for the last 12 months",
      "The Billing console will reject the activation",
    ],
    "b",
    "Cost allocation tags only apply to usage after they are activated and do not retroactively update past cost data.",
    [
      "Costs are not backfilled for new cost allocation tags.",
      "Data appears from the activation point onward.",
      "No historical backfill occurs.",
      "Activation is allowed for existing tag keys.",
    ],
    "Activate cost allocation tags early", ["cost allocation tags"]
  ),
  mk(
    "tagging-governance-tag-policies-resource-groups", 3, 1, "hard",
    "A team uses tags to grant access with attribute-based access control. Which risk should the security team address?",
    [
      "Tags cost extra per key, so too many tags raise the bill",
      "Anyone allowed to change the tag can change which resources they can access",
      "Tags are visible only in the account that created them",
      "Tags cannot be used in IAM policy conditions",
    ],
    "b",
    "When access depends on tags, the permission to edit those tags is effectively a permission to change access, so it must be tightly controlled.",
    [
      "Tags are free.",
      "Editing a tag that drives ABAC can grant or remove access, so restrict tag changes.",
      "Tags are not limited to the creating account in that way.",
      "IAM conditions such as aws:ResourceTag support tags.",
    ],
    "ABAC makes tag editing a sensitive permission", ["ABAC", "aws:ResourceTag"]
  ),

  // ---- Domain 1 drill ----
  mk(
    "scenario-drill-domain-1", 1, 1, "hard",
    "A company has a central logging account. Workloads in 40 member accounts must write logs to an S3 bucket there, the company wants no long-lived credentials and the bucket must only accept writes from accounts in the Organization. Which design meets all requirements?",
    [
      "Create an IAM user in the logging account for each member account and store the keys in each workload",
      "Use a bucket policy that allows the workload roles and restricts access with the aws:PrincipalOrgID condition",
      "Make the bucket public and rely on obscure bucket names",
      "Share one set of access keys through Systems Manager Parameter Store",
    ],
    "b",
    "A bucket policy with aws:PrincipalOrgID limits access to principals in the Organization and roles use temporary credentials.",
    [
      "Long-lived keys violate the requirement.",
      "Org condition plus roles meets both constraints.",
      "A public bucket allows everyone.",
      "Shared access keys are long-lived and shared.",
    ],
    "Org-wide access without keys -> roles + aws:PrincipalOrgID", ["PrincipalOrgID"]
  ),
  mk(
    "scenario-drill-domain-1", 2, 1, "hard",
    "A security team must make sure that no account in an OU can ever disable CloudTrail, even if an account administrator grants themselves AdministratorAccess. What should they use?",
    [
      "An IAM permission boundary on every administrator",
      "A service control policy attached to the OU denying cloudtrail:StopLogging and cloudtrail:DeleteTrail",
      "A CloudWatch alarm on CloudTrail changes",
      "An identity policy attached to each administrator denying the actions",
    ],
    "b",
    "SCPs set the maximum permissions for accounts and apply even to account administrators, so a deny in an SCP cannot be overridden by the account.",
    [
      "Boundaries are set per identity and an administrator can change them if permitted.",
      "An SCP deny applies to every principal in the account.",
      "An alarm detects but does not prevent the action.",
      "Identity policies can be edited or removed by administrators.",
    ],
    "Cannot be overridden by the account -> SCP deny", ["SCP"]
  ),
  mk(
    "scenario-drill-domain-1", 3, 1, "hard",
    "EC2 instances in private subnets must reach S3 without traffic leaving the AWS network, and the company wants to cap the access to one specific bucket. Which TWO actions together meet this? (Select TWO.)",
    [
      "Create a gateway VPC endpoint for S3 and associate it with the private route tables",
      "Add a NAT gateway and an internet gateway",
      "Attach an endpoint policy that allows only the specific bucket",
      "Use a Site-to-Site VPN to S3",
      "Enable S3 Transfer Acceleration",
    ],
    "ac",
    "A gateway endpoint keeps S3 traffic on the AWS network, and an endpoint policy restricts which buckets can be reached through it.",
    [
      "Correct. The gateway endpoint gives private S3 access.",
      "A NAT gateway sends traffic through the internet gateway path.",
      "Correct. The endpoint policy limits access to the named bucket.",
      "A VPN does not connect to S3.",
      "Transfer Acceleration is for long-distance uploads and does not keep traffic private.",
    ],
    "Private S3 + one bucket -> gateway endpoint + endpoint policy", ["gateway endpoint", "endpoint policy"]
  ),

  // ---- Domain 2 drill ----
  mk(
    "scenario-drill-domain-2", 1, 2, "hard",
    "An order system receives traffic spikes ten times above normal for ten minutes. The web tier accepts orders and a back-end tier processes them slowly. Orders must not be lost and the back end should not be overwhelmed. Which design meets this with the least operational overhead?",
    [
      "Scale the web tier and call the back end synchronously",
      "Put the orders into an SQS queue and let an Auto Scaling group of workers process them from the queue",
      "Store the orders in memory on the web servers and process them later",
      "Use a larger instance for the back end only",
    ],
    "b",
    "A queue decouples the tiers, absorbs the spike durably and lets workers scale based on queue depth.",
    [
      "Synchronous calls pass the spike straight to the back end.",
      "SQS buffers and workers scale on demand.",
      "In-memory storage loses orders if a server fails.",
      "A bigger instance is a fixed ceiling and still tightly coupled.",
    ],
    "Spike + slow back end + no loss -> queue", ["SQS", "decouple"]
  ),
  mk(
    "scenario-drill-domain-2", 2, 2, "hard",
    "A workload must recover within 15 minutes with at most 1 minute of data loss in another Region, and the company wants to pay as little as possible while meeting those targets. Which strategy fits best?",
    [
      "Backup and restore from S3 snapshots",
      "Pilot light with cross-Region database replication and pre-provisioned but stopped compute",
      "Warm standby running at reduced capacity with continuous replication",
      "Multi-site active-active in both Regions",
    ],
    "c",
    "A one-minute RPO needs continuous replication and a 15-minute RTO is best met by warm standby, which is cheaper than active-active. Pilot light usually needs more time to scale up.",
    [
      "Restoring from backups takes longer than 15 minutes and loses more data.",
      "Pilot light has to start and scale the compute, which risks missing a 15-minute RTO.",
      "Warm standby is already running and scales quickly at moderate cost.",
      "Active-active meets the targets but costs more than needed.",
    ],
    "Minutes RTO/RPO at moderate cost -> warm standby", ["RTO", "RPO", "warm standby"]
  ),
  mk(
    "scenario-drill-domain-2", 3, 2, "hard",
    "A standard SQS queue is processed by several consumers, and customers occasionally get duplicate emails. What is the correct fix with minimal change?",
    [
      "Replace the queue with SNS",
      "Make the consumer idempotent, for example by tracking message IDs, or move to an SQS FIFO queue with deduplication",
      "Increase the visibility timeout to zero",
      "Add more consumers",
    ],
    "b",
    "Standard queues deliver at least once, so duplicates are possible. Idempotent consumers or FIFO deduplication prevent duplicate effects.",
    [
      "SNS fan-out does not remove duplicates.",
      "Idempotency or FIFO deduplication addresses it.",
      "A zero visibility timeout makes duplicates more likely.",
      "More consumers do not prevent duplicate processing.",
    ],
    "At-least-once delivery -> idempotent consumers", ["idempotent", "FIFO"]
  ),

  // ---- Domain 3 drill ----
  mk(
    "scenario-drill-domain-3", 1, 3, "hard",
    "A read-heavy relational application hits its database CPU limit during peak hours, and most queries repeat the same reads. The company wants to improve performance without major code changes. Which combination is most appropriate? (Select TWO.)",
    [
      "Add read replicas and direct read traffic to them",
      "Move the data to Amazon Glacier",
      "Add an in-memory cache such as ElastiCache in front of the database for repeated reads",
      "Switch to a larger Network ACL",
      "Disable Multi-AZ",
    ],
    "ac",
    "Read replicas offload reads, and caching removes repeated reads from the database entirely.",
    [
      "Correct. Replicas scale read capacity.",
      "Glacier is archival, not for live queries.",
      "Correct. Caching reduces database load for repeated queries.",
      "Network ACLs do not affect database CPU.",
      "Disabling Multi-AZ reduces availability and does not improve performance.",
    ],
    "Read-heavy and repetitive -> replicas and cache", ["read replica", "ElastiCache"]
  ),
  mk(
    "scenario-drill-domain-3", 2, 3, "hard",
    "A Lambda function opens a database connection for every invocation, and during traffic spikes the RDS database runs out of connections. What is the best fix?",
    [
      "Increase the database instance size only",
      "Use RDS Proxy to pool and share connections",
      "Reduce Lambda memory",
      "Move the database to a public subnet",
    ],
    "b",
    "RDS Proxy pools connections so that many short-lived Lambda invocations share a smaller set of database connections.",
    [
      "A larger instance raises the limit a little but does not fix per-invocation connections.",
      "RDS Proxy is designed for exactly this.",
      "Memory does not control connection counts.",
      "Subnet placement does not affect connection exhaustion.",
    ],
    "Lambda + connection spikes -> RDS Proxy", ["RDS Proxy"]
  ),
  mk(
    "scenario-drill-domain-3", 3, 3, "hard",
    "A global audience downloads large static files and the company wants lower latency for repeat downloads while the origin stays in one Region. Which service fits?",
    [
      "AWS Global Accelerator",
      "Amazon CloudFront",
      "AWS Direct Connect",
      "Amazon Route 53 latency records only",
    ],
    "b",
    "CloudFront caches static content at edge locations close to users, lowering latency for repeat downloads.",
    [
      "Global Accelerator improves network path to endpoints but does not cache.",
      "CloudFront caches content at the edge.",
      "Direct Connect is a private link from a data centre.",
      "Latency records choose a Region but do not cache content.",
    ],
    "Static content, global users -> CloudFront", ["CloudFront", "cache"]
  ),

  // ---- Domain 4 drill ----
  mk(
    "scenario-drill-domain-4", 1, 4, "hard",
    "A company runs a steady baseline of 20 EC2 instances 24/7 on several instance families, with changing Regions over the next year, and a variable number of extra instances during campaigns. It wants the broadest discount with flexibility for the baseline. Which is best?",
    [
      "Standard Reserved Instances for one instance family",
      "A Compute Savings Plan for the baseline and On-Demand or Spot for the extra capacity",
      "Dedicated Hosts for all instances",
      "On-Demand for everything",
    ],
    "b",
    "Compute Savings Plans apply across instance families, Regions and even Fargate and Lambda, and the variable part can stay On-Demand or use Spot.",
    [
      "Standard RIs are limited to a family and Region and are less flexible.",
      "A Compute Savings Plan gives flexible discount for the baseline.",
      "Dedicated Hosts cost more and are for licensing or compliance needs.",
      "On-Demand pays full price for a steady workload.",
    ],
    "Flexible commitment across families and Regions -> Compute Savings Plan", ["Savings Plans"]
  ),
  mk(
    "scenario-drill-domain-4", 2, 4, "hard",
    "Instances in private subnets download large volumes of data from S3 through a NAT gateway, and the NAT data processing charge is high. What is the cheapest fix?",
    [
      "Add a second NAT gateway",
      "Create a gateway VPC endpoint for S3 and add it to the private route tables",
      "Move the instances to public subnets with public IPs",
      "Use a larger NAT gateway",
    ],
    "b",
    "A gateway endpoint for S3 has no hourly or data processing charge and routes the traffic privately, bypassing the NAT gateway.",
    [
      "A second NAT gateway adds cost.",
      "A gateway endpoint removes the NAT processing charge for S3 traffic.",
      "Public subnets weaken security and are not required.",
      "NAT gateways are not sized that way and a larger one would not cut processing fees.",
    ],
    "S3 or DynamoDB traffic through NAT -> gateway endpoint", ["gateway endpoint", "NAT gateway"]
  ),
  mk(
    "scenario-drill-domain-4", 3, 4, "hard",
    "Data in an S3 bucket is accessed heavily for 30 days, rarely for the next 60 and almost never after that, but it must remain retrievable within hours. Access is predictable. Which solution has the lowest cost with the least management?",
    [
      "Keep everything in S3 Standard",
      "A lifecycle rule moving objects to S3 Standard-IA after 30 days and to a Glacier storage class after 90 days",
      "S3 One Zone-IA from the start",
      "Delete the data after 30 days",
    ],
    "b",
    "With a known ageing pattern, lifecycle rules move data to cheaper classes automatically, and Glacier classes still allow retrieval within hours.",
    [
      "Standard costs more for data that is rarely read.",
      "A lifecycle rule matches the known pattern and meets the retrieval requirement.",
      "One Zone-IA reduces durability and does not suit heavily accessed data at first.",
      "Deleting breaks the retrieval requirement.",
    ],
    "Known ageing pattern -> lifecycle rules", ["lifecycle"]
  ),
];

export const deepDiveOPFlashcards: Flashcard[] = [
  fc("vpc-sharing-ram-multi-account-networking", 1, 3, "Networking and Content Delivery", "What does VPC sharing share?", "Subnets, not the whole VPC. The owner shares them via AWS RAM with accounts in the same Organization."),
  fc("vpc-sharing-ram-multi-account-networking", 2, 3, "Networking and Content Delivery", "Who controls what in a shared VPC?", "Owner: VPC, subnets, route tables, NACLs, gateways, endpoints. Participants: their own resources and security groups."),
  fc("vpc-sharing-ram-multi-account-networking", 3, 1, "Networking and Content Delivery", "Why use AZ IDs with multiple accounts?", "AZ names map to different physical zones per account, while AZ IDs are consistent across accounts."),
  fc("golden-ami-image-builder-pipelines", 1, 2, "Compute", "What is EC2 Image Builder?", "A managed pipeline that builds, tests, patches and distributes AMIs or container images from a recipe on a schedule."),
  fc("golden-ami-image-builder-pipelines", 2, 4, "Compute", "Deregistering an AMI: what is left behind?", "The backing EBS snapshots, which still cost money until you delete them."),
  fc("golden-ami-image-builder-pipelines", 3, 2, "Compute", "Sharing an encrypted AMI across accounts needs what besides launch permission?", "Access to the KMS key that encrypts its snapshots."),
  fc("ecs-networking-scaling-service-connect", 1, 1, "Containers", "Which ECS network mode gives each task its own security group?", "awsvpc. It gives each task an ENI and is required for Fargate."),
  fc("ecs-networking-scaling-service-connect", 2, 4, "Containers", "How do you mix reliable and cheap ECS capacity?", "Capacity provider strategy: a base on Fargate and extra weight on Fargate Spot."),
  fc("ecs-networking-scaling-service-connect", 3, 2, "Containers", "How does ECS roll back a bad deployment automatically?", "Enable the deployment circuit breaker with rollback."),
  fc("tagging-governance-tag-policies-resource-groups", 1, 4, "Management and Governance", "Tag policy vs requiring a tag at creation?", "A tag policy standardises keys and values. Requiring a tag at creation needs an IAM or SCP condition on aws:RequestTag."),
  fc("tagging-governance-tag-policies-resource-groups", 2, 4, "Management and Governance", "Are cost allocation tags retroactive?", "No. Activate them in Billing and they apply only to usage after activation."),
  fc("tagging-governance-tag-policies-resource-groups", 3, 1, "Management and Governance", "What is the ABAC tagging risk?", "Whoever can edit the tags can change access, so restrict tag editing permissions."),
  fc("scenario-drill-domain-1", 1, 1, "Exam Mastery", "Org-only access to a bucket without keys?", "Roles with temporary credentials plus a bucket policy using aws:PrincipalOrgID."),
  fc("scenario-drill-domain-1", 2, 1, "Exam Mastery", "Guardrail even admins cannot override?", "A service control policy deny at the OU or account."),
  fc("scenario-drill-domain-1", 3, 1, "Exam Mastery", "Private S3 access limited to one bucket?", "Gateway VPC endpoint with an endpoint policy naming the bucket."),
  fc("scenario-drill-domain-2", 1, 2, "Exam Mastery", "Spiky traffic, slow back end, no lost orders?", "Put an SQS queue between the tiers and scale workers on queue depth."),
  fc("scenario-drill-domain-2", 2, 2, "Exam Mastery", "Minutes of RTO and RPO at moderate cost?", "Warm standby with continuous replication."),
  fc("scenario-drill-domain-2", 3, 2, "Exam Mastery", "Duplicate messages from a standard queue?", "Standard queues are at-least-once. Make consumers idempotent or use FIFO deduplication."),
  fc("scenario-drill-domain-3", 1, 3, "Exam Mastery", "Read-heavy database at its CPU limit?", "Add read replicas and cache repeated reads with ElastiCache."),
  fc("scenario-drill-domain-3", 2, 3, "Exam Mastery", "Lambda exhausts database connections?", "Use RDS Proxy to pool connections."),
  fc("scenario-drill-domain-3", 3, 3, "Exam Mastery", "Faster global delivery of static files?", "Amazon CloudFront caches content at edge locations."),
  fc("scenario-drill-domain-4", 1, 4, "Exam Mastery", "Flexible discount for a steady baseline?", "A Compute Savings Plan for the baseline, On-Demand or Spot for the variable part."),
  fc("scenario-drill-domain-4", 2, 4, "Exam Mastery", "High NAT charges for S3 traffic?", "Use a gateway VPC endpoint for S3 and route private subnets to it."),
  fc("scenario-drill-domain-4", 3, 4, "Exam Mastery", "Known ageing access pattern in S3?", "Use lifecycle rules to move data to cheaper classes automatically."),
];
