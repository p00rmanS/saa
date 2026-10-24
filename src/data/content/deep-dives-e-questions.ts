import type { Flashcard, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const deepDiveEQuestions: Question[] = [
  // ---- Storage Gateway ----
  mk(
    "storage-gateway-types", 1, 2, "easy",
    "A company wants to replace its physical tape library for offsite backups without changing its existing backup software. Which solution fits?",
    ["S3 File Gateway", "Tape Gateway", "Cached Volume Gateway", "AWS DataSync"],
    "b",
    "Tape Gateway presents a virtual tape library over iSCSI to existing backup software and stores the tapes in S3 and Glacier.",
    [
      "File Gateway presents file shares, not a tape library.",
      "Tape Gateway emulates tape so backup software works unchanged.",
      "Volume Gateway presents block volumes, not tapes.",
      "DataSync transfers data and does not emulate a tape library.",
    ],
    "\"replace tapes, same backup software\" -> Tape Gateway", ["Tape Gateway", "backup"]
  ),
  mk(
    "storage-gateway-types", 2, 3, "medium",
    "A company's whole 2 TB data set must stay on premises for low-latency access, with asynchronous point-in-time backups to AWS. Which Storage Gateway configuration fits?",
    ["Cached volumes", "Stored volumes", "S3 File Gateway", "Tape Gateway"],
    "b",
    "Stored volumes keep the full data set on premises and asynchronously back it up to S3 as EBS snapshots.",
    [
      "Cached volumes keep primary data in S3 and cache only hot data locally.",
      "Stored volumes keep primary data local with backups in AWS.",
      "File Gateway stores files as S3 objects and does not keep the whole set local by design.",
      "Tape Gateway is for backup software and virtual tapes.",
    ],
    "\"entire data set local + async backup\" -> stored volumes", ["stored volumes", "Volume Gateway"]
  ),
  mk(
    "storage-gateway-types", 3, 3, "hard",
    "On-premises applications need NFS access to files that should also be available in S3 for analytics and lifecycle management. Which solution fits?",
    ["Amazon EFS mounted over the internet", "S3 File Gateway", "Stored Volume Gateway", "AWS Snowball Edge"],
    "b",
    "S3 File Gateway exposes NFS and SMB shares and stores each file as an S3 object.",
    [
      "EFS is not designed to be mounted directly from on premises over the internet.",
      "File Gateway gives NFS locally and S3 objects in the cloud.",
      "Stored volumes are iSCSI block devices, and their data is not accessible as S3 objects.",
      "Snowball is for offline bulk transfer, not ongoing file access.",
    ],
    "\"NFS on premises + objects in S3\" -> S3 File Gateway", ["S3 File Gateway", "NFS"]
  ),

  // ---- Aurora ----
  mk(
    "aurora-features-endpoints", 1, 3, "easy",
    "An application sends heavy read traffic to Aurora and wants connections spread across all replicas automatically, even as replicas are added. What should it use?",
    ["The cluster endpoint", "The reader endpoint", "An instance endpoint for each replica", "The writer's public IP"],
    "b",
    "The reader endpoint load-balances connections across the Aurora Replicas.",
    [
      "The cluster endpoint always points to the writer.",
      "The reader endpoint spreads read connections across replicas.",
      "Instance endpoints are fixed to one instance and need manual management.",
      "A writer IP receives writes and is not a read load balancer.",
    ],
    "\"spread reads across replicas\" -> reader endpoint", ["Aurora", "reader endpoint"]
  ),
  mk(
    "aurora-features-endpoints", 2, 2, "medium",
    "A developer ran a bad UPDATE on an Aurora MySQL cluster 20 minutes ago. The team wants to return the cluster to its state before the change as quickly as possible without restoring a backup to a new cluster. What should they use?",
    ["Point-in-time restore", "Aurora Backtrack", "Aurora cloning", "Aurora Global Database failover"],
    "b",
    "Backtrack rewinds an Aurora MySQL cluster in place to an earlier time within its window, without restoring from backup.",
    [
      "Point-in-time restore creates a new cluster and takes longer.",
      "Backtrack rewinds the existing cluster quickly.",
      "A clone copies the current state, including the bad update.",
      "Failover to another Region does not undo a data change.",
    ],
    "\"rewind without restore\" -> Backtrack (Aurora MySQL)", ["Backtrack", "Aurora MySQL"]
  ),
  mk(
    "aurora-features-endpoints", 3, 4, "hard",
    "A team needs a full-size copy of a 3 TB production Aurora database for testing, created quickly and with minimal extra storage cost. Which feature fits?",
    ["Take a snapshot and restore it", "Aurora cloning", "Create a cross-Region read replica", "Export data to S3 and re-import"],
    "b",
    "Cloning uses copy-on-write over shared storage, so it is fast and only costs extra for data that changes.",
    [
      "Restore copies all the data and takes much longer.",
      "A clone shares pages with the source until they diverge.",
      "A replica keeps replicating, which is not an isolated test copy, and adds cost.",
      "Export and import is slow and duplicates all the data.",
    ],
    "\"quick, cheap copy for testing\" -> Aurora cloning", ["Aurora", "cloning"]
  ),

  // ---- Containers ----
  mk(
    "containers-ecs-eks-fargate-decision", 1, 3, "easy",
    "A small team wants to run containers without managing servers or patching instances, and has no Kubernetes requirement. Which option is the simplest fit?",
    ["ECS on EC2", "ECS on Fargate", "A self-managed Kubernetes cluster on EC2", "EKS with self-managed nodes"],
    "b",
    "ECS on Fargate removes server management and avoids Kubernetes complexity.",
    [
      "EC2 launch type still requires managing instances.",
      "Fargate is serverless compute and ECS is the simpler orchestrator.",
      "A self-managed cluster is the most operational work.",
      "Self-managed nodes still need patching and scaling.",
    ],
    "\"no servers, no Kubernetes\" -> ECS on Fargate", ["ECS", "Fargate"]
  ),
  mk(
    "containers-ecs-eks-fargate-decision", 2, 1, "medium",
    "An ECS task's application code must read objects from one S3 bucket and nothing else. Which is the best way to grant this?",
    ["Attach a broad S3 policy to the EC2 instance role shared by all tasks", "Create a task role with a policy allowing only that bucket", "Embed an IAM user's access keys in the container image", "Make the bucket public"],
    "b",
    "A task role gives the application code its own least-privilege permissions, separate from other tasks and from the execution role.",
    [
      "A shared instance role gives every task the same, broader access.",
      "The task role scopes permissions to this application.",
      "Embedded keys are insecure and hard to rotate.",
      "A public bucket exposes the data to everyone.",
    ],
    "\"permissions for the app code in a container\" -> task role", ["task role", "ECS"]
  ),
  mk(
    "containers-ecs-eks-fargate-decision", 3, 3, "hard",
    "A machine learning team needs GPU instances for containers and also wants Kubernetes for portability across clouds. Which solution fits?",
    ["ECS on Fargate", "EKS on Fargate", "EKS with EC2 GPU worker nodes", "AWS Lambda container images"],
    "c",
    "Kubernetes portability points to EKS, and GPUs require EC2 worker nodes because Fargate does not provide GPUs.",
    [
      "Fargate has no GPU support and ECS is not Kubernetes.",
      "Fargate cannot provide GPUs, even under EKS.",
      "EKS on EC2 supports Kubernetes and GPU instance types.",
      "Lambda does not provide GPUs and is not Kubernetes.",
    ],
    "\"Kubernetes + GPU\" -> EKS on EC2", ["EKS", "GPU"]
  ),

  // ---- CloudWatch ----
  mk(
    "cloudwatch-metrics-alarms-logs", 1, 2, "easy",
    "A team wants to alarm when memory utilisation on EC2 instances exceeds 80 percent, but no memory metric appears in CloudWatch. What is missing?",
    ["Detailed monitoring", "The CloudWatch agent", "A VPC endpoint for CloudWatch", "An alarm in CloudTrail"],
    "b",
    "EC2 does not publish memory metrics by default. The CloudWatch agent collects them as custom metrics.",
    [
      "Detailed monitoring only changes frequency of default metrics.",
      "The agent reports memory and disk usage from inside the instance.",
      "An endpoint affects connectivity, not which metrics exist.",
      "CloudTrail records API calls and has no alarms for memory.",
    ],
    "\"memory or disk on EC2\" -> CloudWatch agent", ["CloudWatch agent", "memory"]
  ),
  mk(
    "cloudwatch-metrics-alarms-logs", 2, 2, "medium",
    "A company needs application logs streamed in near real time to Amazon S3 for long-term storage. Which CloudWatch feature should they use?",
    ["Export the log group to S3 once a day", "A subscription filter delivering to Kinesis Data Firehose", "A metric filter", "Logs Insights queries"],
    "b",
    "A subscription filter streams matching log events in near real time to Firehose, which can deliver to S3.",
    [
      "Export tasks are batch operations and not real time.",
      "Subscription filters stream events continuously to Firehose, Kinesis or Lambda.",
      "Metric filters create metrics and do not move logs.",
      "Logs Insights queries logs in place and does not deliver them.",
    ],
    "\"stream logs to S3 near real time\" -> subscription filter + Firehose", ["subscription filter", "Firehose"]
  ),
  mk(
    "cloudwatch-metrics-alarms-logs", 3, 2, "hard",
    "An EC2 instance occasionally fails its system status check because of underlying hardware problems. The team wants it automatically moved to healthy hardware with the same instance ID and IP. What should they configure?",
    ["A CloudWatch alarm on StatusCheckFailed_System with the recover action", "An Auto Scaling scheduled action", "A CloudTrail trail", "A composite alarm sending email only"],
    "a",
    "The EC2 recover action restarts the instance on new hardware, keeping its instance ID and addresses, when triggered by a system status check alarm.",
    [
      "The recover alarm action is built for this failure.",
      "A scheduled action changes capacity at set times, not on health.",
      "CloudTrail logs API calls and cannot recover instances.",
      "Email alone notifies but does not recover the instance.",
    ],
    "\"system status check failed, same ID\" -> alarm with recover action", ["recover", "status check"]
  ),

  // ---- Secrets Manager vs Parameter Store ----
  mk(
    "secrets-manager-vs-parameter-store", 1, 1, "easy",
    "An application's RDS database password must be rotated automatically every 30 days without redeploying the application. Which service should store it?",
    ["Systems Manager Parameter Store standard parameter", "AWS Secrets Manager", "An S3 object", "A Lambda environment variable"],
    "b",
    "Secrets Manager supports automatic rotation with native integration for RDS credentials.",
    [
      "Parameter Store has no built-in automatic rotation.",
      "Secrets Manager rotates credentials on a schedule via Lambda.",
      "S3 offers no rotation and is not a secret manager.",
      "Environment variables do not rotate and require redeployment.",
    ],
    "\"automatic rotation of DB credentials\" -> Secrets Manager", ["Secrets Manager", "rotation"]
  ),
  mk(
    "secrets-manager-vs-parameter-store", 2, 4, "medium",
    "A company stores thousands of application configuration values, a few of which are sensitive, and wants the lowest cost with encryption for the sensitive ones and no rotation requirement. What should they use?",
    ["Secrets Manager for every value", "Parameter Store with SecureString for sensitive values", "DynamoDB with client-side encryption", "S3 with public access"],
    "b",
    "Parameter Store standard parameters are free and SecureString encrypts sensitive ones with KMS.",
    [
      "Secrets Manager charges per secret, which is costly for thousands of values.",
      "Parameter Store is low cost and supports encrypted SecureString parameters.",
      "DynamoDB adds custom work and cost for a built-in capability.",
      "Public access defeats the purpose of protecting sensitive values.",
    ],
    "\"lowest cost config + some secrets\" -> Parameter Store", ["Parameter Store", "SecureString"]
  ),
  mk(
    "secrets-manager-vs-parameter-store", 3, 2, "hard",
    "A multi-Region application needs the same database credentials available in a disaster recovery Region with minimal operational effort. Which feature helps?",
    ["Parameter Store advanced tier", "Secrets Manager multi-Region secret replication", "Copying the secret to S3 weekly", "A shared IAM user"],
    "b",
    "Secrets Manager can replicate a secret to other Regions and keep replicas in sync.",
    [
      "The advanced tier does not replicate across Regions.",
      "Replication keeps the secret and its rotation consistent across Regions.",
      "Manual copies are error-prone and expose secrets in S3.",
      "A shared IAM user is not a secret replication mechanism and is poor security.",
    ],
    "\"secret in DR Region\" -> Secrets Manager replication", ["Secrets Manager", "replication"]
  ),

  // ---- Direct Connect and VPN ----
  mk(
    "direct-connect-vpn-resilience", 1, 2, "easy",
    "A company needs connectivity from its data center to AWS within two days while a Direct Connect link is being provisioned. What should it use in the meantime?",
    ["Another Direct Connect connection", "AWS Site-to-Site VPN", "VPC peering", "AWS Snowball"],
    "b",
    "Site-to-Site VPN can be established in minutes over the internet, which fits a short deadline.",
    [
      "Direct Connect takes weeks to provision.",
      "A VPN is quick to set up and encrypted.",
      "Peering connects VPCs, not on-premises networks.",
      "Snowball moves data offline and is not network connectivity.",
    ],
    "\"connect quickly\" -> Site-to-Site VPN", ["VPN", "Direct Connect"]
  ),
  mk(
    "direct-connect-vpn-resilience", 2, 1, "medium",
    "A regulated company uses Direct Connect and must encrypt all traffic between its data center and AWS. What should it add?",
    ["Nothing, Direct Connect encrypts traffic by default", "An IPsec VPN over Direct Connect or MACsec on a supported dedicated connection", "A second Direct Connect location", "A public VIF"],
    "b",
    "Direct Connect is private but not encrypted by default. IPsec VPN over it, or MACsec on dedicated connections, adds encryption.",
    [
      "Direct Connect traffic is not encrypted by default.",
      "VPN or MACsec provides the required encryption.",
      "A second location adds resilience, not encryption.",
      "A public VIF reaches public services and does not encrypt traffic.",
    ],
    "\"Direct Connect + encryption\" -> VPN over DX or MACsec", ["Direct Connect", "encryption"]
  ),
  mk(
    "direct-connect-vpn-resilience", 3, 2, "hard",
    "A company needs the highest resilience for its connection to AWS and has a large budget. Which design provides maximum resilience?",
    ["One Direct Connect connection with a VPN backup", "Two connections at one Direct Connect location", "Two connections at each of two different Direct Connect locations", "A single 100 Gbps connection"],
    "c",
    "Maximum resilience uses redundant connections at more than one Direct Connect location, so neither a device nor a location failure interrupts service.",
    [
      "A single connection plus VPN is cost-effective but not maximum resilience.",
      "One location is still a single point of failure.",
      "Two connections at each of two locations protects against device and location failure.",
      "Higher speed does not add redundancy.",
    ],
    "\"maximum resilience\" -> 2 connections at 2 locations", ["Direct Connect", "resilience"]
  ),

  // ---- API Gateway ----
  mk(
    "api-gateway-types-throttling", 1, 3, "easy",
    "A team needs a low-cost, low-latency API in front of Lambda with JWT authorisation and does not need API keys, usage plans or WAF. Which API Gateway type fits?",
    ["REST API", "HTTP API", "WebSocket API", "Private REST API"],
    "b",
    "HTTP APIs are cheaper and faster for simple Lambda or HTTP backends and support JWT authorizers.",
    [
      "REST APIs have more features but cost more and add latency.",
      "HTTP API matches the simple, cost-sensitive requirement.",
      "WebSocket APIs are for persistent two-way connections.",
      "Private APIs restrict access to a VPC and are not the stated need.",
    ],
    "\"cheap, low latency, JWT\" -> HTTP API", ["HTTP API", "API Gateway"]
  ),
  mk(
    "api-gateway-types-throttling", 2, 3, "medium",
    "Clients of a REST API occasionally receive HTTP 429 responses during traffic spikes. What does this indicate?",
    ["The backend timed out", "API Gateway throttled the request because a rate limit was exceeded", "The authorizer rejected the token", "The endpoint is private"],
    "b",
    "429 Too Many Requests means API Gateway throttled the request. A timeout returns 504, and authorizer failures return 401 or 403.",
    [
      "A backend timeout returns 504.",
      "429 indicates throttling against rate or burst limits.",
      "A rejected token gives 401 or 403.",
      "A private endpoint would make the API unreachable rather than returning 429.",
    ],
    "\"429\" -> throttling", ["throttling", "429"]
  ),
  mk(
    "api-gateway-types-throttling", 3, 3, "hard",
    "A request to an API Gateway endpoint triggers a Lambda function that processes a file for about four minutes. Clients receive 504 errors. What is the best fix?",
    ["Increase the Lambda memory", "Make the work asynchronous: return immediately and process via a queue or Step Functions", "Enable API caching", "Use a private endpoint"],
    "b",
    "API Gateway's default integration timeout is 29 seconds, so long jobs should be started asynchronously and completed in the background.",
    [
      "More memory may speed work but will not bring four minutes under 29 seconds reliably.",
      "Asynchronous processing avoids the integration timeout limit.",
      "Caching helps repeat reads and does not fix a long-running operation.",
      "Endpoint type does not change the timeout.",
    ],
    "\"API times out on long job\" -> asynchronous pattern", ["API Gateway", "timeout"]
  ),

  // ---- Cognito ----
  mk(
    "cognito-user-vs-identity-pools", 1, 1, "easy",
    "A mobile app needs customer sign-up, sign-in with MFA and social login, and should receive tokens it can send to its backend API. Which Cognito component fits?",
    ["Identity pool", "User pool", "IAM Identity Center", "AWS Directory Service"],
    "b",
    "A user pool is the user directory that handles sign-up, sign-in, MFA and federation and issues JWT tokens.",
    [
      "Identity pools exchange identities for AWS credentials and do not provide a directory.",
      "User pools provide authentication and tokens.",
      "Identity Center is for workforce access to AWS accounts and apps.",
      "Directory Service provides managed Active Directory, not app user sign-up.",
    ],
    "\"sign-up, sign-in, tokens\" -> user pool", ["Cognito", "user pool"]
  ),
  mk(
    "cognito-user-vs-identity-pools", 2, 1, "medium",
    "A mobile app must let signed-in users upload photos directly to S3 using temporary credentials limited to their own folder, with no keys embedded in the app. What should be used?",
    ["Cognito user pool tokens alone", "A Cognito identity pool with an authenticated IAM role", "An IAM user per customer", "A public bucket"],
    "b",
    "An identity pool exchanges a verified identity for temporary AWS credentials using an IAM role, which can be scoped per user.",
    [
      "User pool tokens prove identity but are not AWS credentials.",
      "Identity pools issue temporary credentials through STS.",
      "Creating IAM users per customer does not scale and requires long-lived keys.",
      "A public bucket allows anyone to read or write.",
    ],
    "\"direct S3 access with temporary credentials\" -> identity pool", ["identity pool", "STS"]
  ),
  mk(
    "cognito-user-vs-identity-pools", 3, 1, "hard",
    "A company wants to protect an API Gateway REST API so only users signed in through its Cognito user pool can call it, without writing custom code. What should they configure?",
    ["A Lambda authorizer that parses the JWT manually", "A Cognito user pool authorizer on the API", "An identity pool unauthenticated role", "API keys distributed to users"],
    "b",
    "API Gateway has a built-in Cognito user pool authorizer that validates tokens issued by the pool.",
    [
      "A Lambda authorizer would work but requires custom code.",
      "The Cognito authorizer validates user pool tokens natively.",
      "Unauthenticated roles allow guest access rather than restricting it.",
      "API keys identify clients for quotas and are not user authentication.",
    ],
    "\"protect API with Cognito, no code\" -> Cognito authorizer", ["Cognito", "API Gateway", "authorizer"]
  ),
];

export const deepDiveEFlashcards: Flashcard[] = [
  fc("storage-gateway-types", 1, 3, "Storage", "Storage Gateway types and protocols?", "S3 File and FSx File gateways: NFS/SMB. Volume Gateway (cached or stored) and Tape Gateway: iSCSI."),
  fc("storage-gateway-types", 2, 3, "Storage", "Cached vs stored volumes?", "Cached: primary data in S3, hot data cached locally. Stored: entire data set local, async EBS snapshots to S3."),
  fc("storage-gateway-types", 3, 2, "Storage", "Storage Gateway vs DataSync vs Snow?", "Gateway: ongoing hybrid access. DataSync: scheduled or one-time transfers over the network. Snow: offline bulk transfer."),

  fc("aurora-features-endpoints", 1, 3, "Database", "Aurora endpoint types?", "Cluster (writer), reader (load-balances replicas), custom (chosen instances), instance (single instance)."),
  fc("aurora-features-endpoints", 2, 2, "Database", "Aurora Backtrack vs point-in-time restore?", "Backtrack rewinds the existing Aurora MySQL cluster in place within a window up to 72 hours. PITR creates a new cluster."),
  fc("aurora-features-endpoints", 3, 2, "Database", "Aurora storage facts?", "Six copies across three AZs, auto-grows to 128 TiB, up to 15 replicas, failover in about 30 seconds."),

  fc("containers-ecs-eks-fargate-decision", 1, 1, "Containers", "Task role vs task execution role?", "Execution role: ECS pulls images, writes logs, fetches secrets. Task role: what your application code uses to call AWS services."),
  fc("containers-ecs-eks-fargate-decision", 2, 3, "Containers", "When must you use EC2 instead of Fargate?", "For GPUs, privileged containers, host-level access or custom kernel settings."),
  fc("containers-ecs-eks-fargate-decision", 3, 3, "Containers", "ECS vs EKS?", "ECS: simple AWS-native orchestrator. EKS: managed Kubernetes for portability and the Kubernetes ecosystem. Fargate runs under either."),

  fc("cloudwatch-metrics-alarms-logs", 1, 2, "Management and Governance", "What EC2 metrics need the CloudWatch agent?", "Memory and disk space usage. EC2 does not publish them by default."),
  fc("cloudwatch-metrics-alarms-logs", 2, 2, "Management and Governance", "Subscription filter vs export to S3?", "Subscription filter streams logs in near real time to Kinesis, Firehose or Lambda. Export is a batch task, not real time."),
  fc("cloudwatch-metrics-alarms-logs", 3, 2, "Management and Governance", "CloudWatch alarm EC2 actions?", "Stop, terminate, reboot and recover. Recover moves an instance with a failed system status check to new hardware."),

  fc("secrets-manager-vs-parameter-store", 1, 1, "Security, Identity, and Compliance", "Secrets Manager vs Parameter Store?", "Secrets Manager: automatic rotation, native RDS support, replication, paid per secret. Parameter Store: free standard tier, config store, no native rotation."),
  fc("secrets-manager-vs-parameter-store", 2, 4, "Security, Identity, and Compliance", "Parameter Store tiers?", "Standard: free, 4 KB. Advanced: 8 KB, parameter policies such as expiration, paid. SecureString uses KMS."),
  fc("secrets-manager-vs-parameter-store", 3, 2, "Security, Identity, and Compliance", "How to get a secret into a DR Region?", "Use Secrets Manager multi-Region secret replication."),

  fc("direct-connect-vpn-resilience", 1, 2, "Networking and Content Delivery", "Direct Connect vs Site-to-Site VPN?", "Direct Connect: dedicated, consistent, weeks to provision, not encrypted by default. VPN: IPsec over internet, minutes to set up, two tunnels per connection."),
  fc("direct-connect-vpn-resilience", 2, 2, "Networking and Content Delivery", "Direct Connect resilience levels?", "High: connections at two locations. Maximum: two connections at each of two locations. VPN is a low-cost backup."),
  fc("direct-connect-vpn-resilience", 3, 1, "Networking and Content Delivery", "Direct Connect VIF types?", "Private (to VPCs), public (to public AWS services) and transit (to a Transit Gateway). Direct Connect Gateway reaches multiple Regions."),

  fc("api-gateway-types-throttling", 1, 3, "Front-End Web and Mobile", "REST vs HTTP vs WebSocket API?", "REST: full features (caching, usage plans, WAF). HTTP: cheaper and faster with fewer features. WebSocket: persistent two-way connections."),
  fc("api-gateway-types-throttling", 2, 3, "Front-End Web and Mobile", "Key API Gateway defaults?", "Throttle 10,000 requests per second with 5,000 burst per Region, cache TTL 300 seconds, integration timeout 29 seconds."),
  fc("api-gateway-types-throttling", 3, 1, "Front-End Web and Mobile", "API Gateway authorizer options?", "IAM (signed requests), Cognito user pool authorizer, Lambda authorizer, and JWT authorizer on HTTP APIs."),

  fc("cognito-user-vs-identity-pools", 1, 1, "Security, Identity, and Compliance", "Cognito user pool vs identity pool?", "User pool: directory, sign-in, tokens. Identity pool: exchanges identities for temporary AWS credentials via STS."),
  fc("cognito-user-vs-identity-pools", 2, 1, "Security, Identity, and Compliance", "How can a mobile app access S3 directly and safely?", "Sign in through a user pool, then use an identity pool to get temporary credentials from a scoped IAM role."),
  fc("cognito-user-vs-identity-pools", 3, 1, "Security, Identity, and Compliance", "Cognito vs IAM Identity Center?", "Cognito: customers and app users. IAM Identity Center: workforce SSO to AWS accounts and business apps."),
];
