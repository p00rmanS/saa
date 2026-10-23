import type { Flashcard, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const deepDiveCQuestions: Question[] = [
  // ---- Instance store and AMIs ----
  mk(
    "ec2-instance-store-and-amis", 1, 3, "easy",
    "An application needs the lowest possible latency and highest IOPS for temporary scratch data that is recreated on every run. Which storage option is the best fit?",
    ["Amazon EFS", "EC2 instance store", "Amazon S3", "An EBS gp3 volume with provisioned IOPS"],
    "b",
    "Instance store is physically attached to the host and offers the highest IOPS and lowest latency at no extra charge, which suits disposable scratch data.",
    [
      "EFS is network storage with higher latency and extra cost.",
      "Local disks on the host give the best performance for temporary data.",
      "S3 is object storage accessed over HTTP and is not a low-latency disk.",
      "gp3 is fast but network-attached and billed for provisioned IOPS, so it costs more than instance store for throwaway data.",
    ],
    "\"temporary / highest IOPS\" -> instance store", ["instance store", "ephemeral"]
  ),
  mk(
    "ec2-instance-store-and-amis", 2, 2, "medium",
    "An engineer stops an EC2 instance for maintenance and later starts it again. Which data is lost?",
    ["Data on the EBS root volume", "Data on an attached EBS data volume", "Data on the instance store volumes", "The instance's AMI"],
    "c",
    "Instance store data survives a reboot but is lost when the instance is stopped, hibernated or terminated.",
    [
      "EBS volumes persist across stop and start.",
      "EBS data volumes persist as well.",
      "Instance store is ephemeral and is wiped on stop.",
      "The AMI is an independent image and is not affected.",
    ],
    "\"stop and start\" wipes instance store", ["instance store", "stop"]
  ),
  mk(
    "ec2-instance-store-and-amis", 3, 2, "hard",
    "A company runs a web fleet in us-east-1 from a custom AMI and wants to be able to launch the same fleet in eu-west-1 during a disaster. What should they do?",
    ["Nothing, because AMIs are global", "Copy the AMI to eu-west-1 and reference the new AMI ID in the launch template there", "Share the AMI with the eu-west-1 Region", "Move the instance store volumes to eu-west-1"],
    "b",
    "AMIs are Regional. Copying creates a new AMI with a new ID in the destination Region.",
    [
      "AMIs are not global and cannot be launched directly in another Region.",
      "A copy in the target Region is required and has its own ID.",
      "Sharing is for accounts, not Regions.",
      "Instance store volumes cannot be moved between Regions.",
    ],
    "\"launch in another Region\" -> copy the AMI", ["AMI", "copy", "DR"]
  ),

  // ---- GWLB ----
  mk(
    "gateway-load-balancer", 1, 1, "easy",
    "A company must send all VPC traffic through its existing third-party virtual firewall appliances, and the appliance fleet must scale and survive failures. Which service should they use?",
    ["Application Load Balancer", "Network Load Balancer", "Gateway Load Balancer", "AWS WAF"],
    "c",
    "Gateway Load Balancer is built to insert and scale third-party virtual appliances transparently in the traffic path.",
    [
      "ALB balances HTTP traffic to application servers.",
      "NLB balances TCP and UDP to servers but does not steer traffic through appliances transparently.",
      "GWLB deploys, scales and health-checks inline appliance fleets.",
      "WAF filters HTTP requests and is not a general appliance platform.",
    ],
    "\"third-party appliance inline\" -> Gateway Load Balancer", ["GWLB", "appliance"]
  ),
  mk(
    "gateway-load-balancer", 2, 1, "medium",
    "Which protocol does a Gateway Load Balancer use to send traffic to appliances, preserving the original packet?",
    ["IPsec", "GENEVE on port 6081", "VXLAN on port 4789", "HTTP/2 on port 443"],
    "b",
    "GWLB encapsulates traffic using GENEVE on UDP port 6081 so appliances receive the original packet.",
    [
      "IPsec is a VPN protocol.",
      "GENEVE on 6081 is the encapsulation GWLB uses.",
      "VXLAN is used by VPC Traffic Mirroring, not GWLB.",
      "HTTP/2 is an application protocol and not used for this.",
    ],
    "GWLB = GENEVE 6081", ["GENEVE", "GWLB"]
  ),
  mk(
    "gateway-load-balancer", 3, 1, "hard",
    "A company wants centralised traffic inspection for many application VPCs but does not want to manage any appliance instances and prefers an AWS-managed stateful firewall. Which service is the better fit than GWLB?",
    ["AWS Network Firewall", "Amazon GuardDuty", "Security groups only", "Amazon Inspector"],
    "a",
    "AWS Network Firewall is a managed network firewall service that requires no appliance fleet to run.",
    [
      "Network Firewall is the managed alternative to running third-party appliances behind GWLB.",
      "GuardDuty detects threats but does not filter traffic.",
      "Security groups lack deep inspection and centralised rule management.",
      "Inspector scans workloads for vulnerabilities and does not inspect traffic.",
    ],
    "\"managed firewall, no appliances\" -> Network Firewall", ["Network Firewall", "GWLB"]
  ),

  // ---- Lambda concurrency and VPC ----
  mk(
    "lambda-concurrency-and-vpc", 1, 2, "easy",
    "A Lambda function writes to a relational database that can handle at most 50 concurrent connections. How can the team prevent the function from exceeding that load?",
    ["Enable provisioned concurrency of 50", "Set reserved concurrency to 50 for the function", "Increase the function memory", "Move the function into a public subnet"],
    "b",
    "Reserved concurrency caps the maximum simultaneous executions of a function, protecting downstream resources.",
    [
      "Provisioned concurrency pre-warms environments but does not cap scaling.",
      "Reserved concurrency sets a ceiling and a guarantee for the function.",
      "Memory affects speed and cost, not concurrency.",
      "Subnet type does not limit executions.",
    ],
    "\"protect the database\" -> reserved concurrency", ["reserved concurrency"]
  ),
  mk(
    "lambda-concurrency-and-vpc", 2, 3, "medium",
    "A user-facing API backed by Lambda has unacceptable latency on the first requests after idle periods. What reduces this latency?",
    ["Reserved concurrency", "Provisioned concurrency", "A larger /tmp size", "A longer function timeout"],
    "b",
    "Provisioned concurrency keeps execution environments initialised so requests avoid cold starts.",
    [
      "Reserved concurrency guarantees capacity but does not pre-initialise environments.",
      "Provisioned concurrency removes cold-start delay.",
      "/tmp size is unrelated to start latency.",
      "A longer timeout does not speed up initialisation.",
    ],
    "\"cold start latency\" -> provisioned concurrency", ["cold start", "provisioned concurrency"]
  ),
  mk(
    "lambda-concurrency-and-vpc", 3, 1, "hard",
    "A Lambda function in private subnets reads from RDS but now must call a public third-party API and also reach S3 privately. Which TWO changes are needed?",
    ["Add a NAT gateway in a public subnet and route the private subnets to it", "Create a gateway VPC endpoint for S3", "Move the function to a public subnet with a public IP", "Attach an internet gateway to the private subnets"],
    "ab",
    "A VPC function needs a NAT gateway to reach the internet and a VPC endpoint for private access to S3.",
    [
      "A NAT gateway in a public subnet provides outbound internet access for private subnets.",
      "A gateway endpoint gives private access to S3 without traversing the internet.",
      "Lambda functions do not receive public IPs, so a public subnet alone does not give internet access.",
      "Private subnets by definition route through a NAT, not directly to an internet gateway.",
    ],
    "\"Lambda in VPC + internet\" -> NAT gateway", ["Lambda", "VPC", "NAT"]
  ),

  // ---- EFS ----
  mk(
    "efs-performance-throughput-storage-classes", 1, 3, "easy",
    "A fleet of Linux instances in three Availability Zones must read and write the same set of files concurrently. Which storage service fits?",
    ["Amazon EBS", "Amazon EFS", "EC2 instance store", "Amazon FSx for Windows File Server"],
    "b",
    "EFS is a managed NFS file system that many Linux instances across AZs can mount at once.",
    [
      "EBS attaches to one instance in one AZ (apart from limited Multi-Attach).",
      "EFS provides shared POSIX file storage across AZs.",
      "Instance store is local to one host and ephemeral.",
      "FSx for Windows uses SMB and targets Windows workloads.",
    ],
    "\"shared Linux file system across AZs\" -> EFS", ["EFS", "shared"]
  ),
  mk(
    "efs-performance-throughput-storage-classes", 2, 4, "medium",
    "A company's EFS file system holds mostly files that have not been touched for 60 days. How can they reduce cost with the least effort?",
    ["Delete the files", "Enable EFS lifecycle management to move cold files to Infrequent Access", "Migrate everything to EBS", "Switch to Max I/O performance mode"],
    "b",
    "Lifecycle management automatically moves files not accessed for a set period to lower-cost storage classes.",
    [
      "Deleting loses data the company still needs.",
      "Lifecycle management tiers cold files to IA automatically.",
      "EBS is more expensive and not shareable across AZs.",
      "Performance mode affects speed, not storage cost.",
    ],
    "\"cold files on EFS\" -> lifecycle to IA", ["EFS", "lifecycle", "IA"]
  ),
  mk(
    "efs-performance-throughput-storage-classes", 3, 3, "hard",
    "A media-processing job runs thousands of parallel clients against one EFS file system and needs the highest aggregate throughput and IOPS, accepting slightly higher latency per operation. Which performance mode matches this description?",
    ["General Purpose", "Max I/O", "Provisioned only", "Bursting only"],
    "b",
    "Max I/O is designed for highly parallel workloads needing higher aggregate throughput and IOPS at the cost of somewhat higher latency.",
    [
      "General Purpose has the lowest latency but lower aggregate scale limits.",
      "Max I/O trades per-operation latency for scale across many clients.",
      "Provisioned is a throughput mode, not a performance mode.",
      "Bursting is also a throughput mode, not a performance mode.",
    ],
    "\"thousands of parallel clients\" -> Max I/O", ["EFS", "Max I/O"]
  ),

  // ---- Kinesis ----
  mk(
    "kinesis-data-streams-vs-firehose", 1, 3, "easy",
    "A company wants clickstream events delivered into an S3 bucket in Parquet format with no custom consumer code and minimal administration. Which service should they use?",
    ["Kinesis Data Streams with a custom consumer", "Amazon Data Firehose", "Amazon SQS", "AWS Glue crawler"],
    "b",
    "Firehose delivers streaming data to S3, can convert to Parquet, and needs no consumer code or shard management.",
    [
      "Data Streams would require writing and running a consumer.",
      "Firehose is fully managed delivery with format conversion.",
      "SQS is a message queue, not a streaming delivery service.",
      "A Glue crawler catalogues existing data and does not ingest streams.",
    ],
    "\"deliver stream to S3, no code\" -> Firehose", ["Firehose", "S3"]
  ),
  mk(
    "kinesis-data-streams-vs-firehose", 2, 3, "medium",
    "Three separate applications must each process every record of the same event stream independently, and new applications may need to reprocess the last seven days of events. Which service supports this?",
    ["Amazon Data Firehose", "Kinesis Data Streams with extended retention", "Amazon SNS", "Amazon S3 Event Notifications"],
    "b",
    "Data Streams retains records for a configurable period and lets multiple consumers read independently and replay.",
    [
      "Firehose has no replay and delivers to a destination only.",
      "Streams supports multiple consumers and retention of up to 365 days.",
      "SNS does not retain messages for replay.",
      "S3 notifications are not a stream with replay.",
    ],
    "\"replay + multiple consumers\" -> Kinesis Data Streams", ["Kinesis Data Streams", "retention"]
  ),
  mk(
    "kinesis-data-streams-vs-firehose", 3, 3, "hard",
    "A stream uses a provisioned shard count and one customer ID produces most of the records, causing write throttling on one shard while others are idle. What is the best fix?",
    ["Add Firehose in front of the stream", "Use a partition key with higher cardinality so records spread across shards", "Increase retention to 365 days", "Enable enhanced fan-out"],
    "b",
    "A hot partition key concentrates records on one shard. Choosing a key that distributes evenly spreads the load.",
    [
      "Firehose does not change how a Streams shard receives writes.",
      "A higher-cardinality key distributes records across shards.",
      "Retention affects storage duration, not write throughput.",
      "Enhanced fan-out improves read throughput for consumers, not writes.",
    ],
    "\"one shard throttled\" -> hot partition key", ["shard", "partition key"]
  ),

  // ---- Elastic DR ----
  mk(
    "aws-elastic-disaster-recovery", 1, 2, "easy",
    "A company wants to protect on-premises servers with continuous replication to AWS, an RPO of seconds and an RTO of minutes, while keeping standing costs low. Which service fits?",
    ["AWS Backup", "AWS Elastic Disaster Recovery", "AWS Snowball", "Amazon S3 Cross-Region Replication"],
    "b",
    "Elastic Disaster Recovery continuously replicates servers to a low-cost staging area and launches recovery instances on demand.",
    [
      "Backup takes periodic recovery points with slower restores.",
      "DRS delivers seconds of RPO and minutes of RTO at low standing cost.",
      "Snowball is for bulk offline data transfer.",
      "CRR replicates S3 objects, not whole servers.",
    ],
    "\"continuous replication, RPO seconds, on-premises servers\" -> Elastic Disaster Recovery", ["Elastic Disaster Recovery", "RPO"]
  ),
  mk(
    "aws-elastic-disaster-recovery", 2, 2, "medium",
    "Which DR strategy does AWS Elastic Disaster Recovery most closely resemble, given its minimal always-on resources and fast scale-up during recovery?",
    ["Backup and restore", "Pilot light", "Warm standby", "Multi-site active-active"],
    "b",
    "DRS keeps only a small staging footprint running and launches full capacity when needed, which matches pilot light.",
    [
      "Backup and restore has much longer recovery time.",
      "Pilot light keeps minimal core resources and scales up on failover.",
      "Warm standby runs a scaled-down but complete environment all the time.",
      "Active-active runs full capacity in multiple places simultaneously.",
    ],
    "\"minimal standing resources, scale on failover\" -> pilot light", ["pilot light", "DR"]
  ),
  mk(
    "aws-elastic-disaster-recovery", 3, 2, "hard",
    "After a ransomware attack, the company discovers that replicated data on its recovery servers is encrypted. What DRS capability helps them?",
    ["Failback to the original servers immediately", "Point-in-time recovery to a state before the attack", "Increase the staging area volume size", "Switch to AWS Snowball Edge"],
    "b",
    "Point-in-time recovery lets you launch instances from an earlier state, before the corruption was replicated.",
    [
      "Failing back would copy the encrypted data back to the source.",
      "Point-in-time recovery restores from a clean earlier moment.",
      "Larger volumes do not undo corruption.",
      "Snowball is a transfer device and not a recovery tool.",
    ],
    "\"corruption replicated\" -> point-in-time recovery", ["point-in-time", "ransomware"]
  ),
];

export const deepDiveCFlashcards: Flashcard[] = [
  fc("ec2-instance-store-and-amis", 1, 3, "Compute", "When is instance store data lost?", "On stop, hibernate, terminate or host failure. It survives a reboot."),
  fc("ec2-instance-store-and-amis", 2, 2, "Compute", "Are AMIs global?", "No. They are Regional. Copy the AMI to another Region and use the new AMI ID there."),
  fc("ec2-instance-store-and-amis", 3, 1, "Compute", "Sharing an encrypted AMI: extra step?", "You must also share the customer managed KMS key that encrypted its snapshots."),

  fc("gateway-load-balancer", 1, 1, "Compute", "What does Gateway Load Balancer do?", "Transparently passes traffic through a scalable fleet of third-party virtual appliances (firewall, IPS, DPI), then back on its way."),
  fc("gateway-load-balancer", 2, 1, "Compute", "GWLB protocol and port?", "GENEVE encapsulation on UDP port 6081."),
  fc("gateway-load-balancer", 3, 1, "Compute", "How do app VPCs reach a GWLB?", "Through Gateway Load Balancer endpoints (PrivateLink), with route tables steering traffic to the endpoint."),

  fc("lambda-concurrency-and-vpc", 1, 2, "Compute", "Reserved vs provisioned concurrency?", "Reserved: guarantees and caps concurrency, free. Provisioned: pre-initialised environments that remove cold starts, billed."),
  fc("lambda-concurrency-and-vpc", 2, 3, "Compute", "What happens when Lambda hits its concurrency limit?", "Synchronous calls get a 429 throttle error. Asynchronous invocations are queued and retried for up to six hours."),
  fc("lambda-concurrency-and-vpc", 3, 1, "Compute", "Internet access for a Lambda function in a VPC?", "None by default, even in a public subnet. Use a NAT gateway for the internet or VPC endpoints for AWS services."),

  fc("efs-performance-throughput-storage-classes", 1, 3, "Storage", "EFS performance modes?", "General Purpose (default, lowest latency) and Max I/O (higher aggregate scale, higher latency)."),
  fc("efs-performance-throughput-storage-classes", 2, 4, "Storage", "EFS throughput modes?", "Elastic (recommended, automatic), Provisioned (fixed), Bursting (scales with stored size)."),
  fc("efs-performance-throughput-storage-classes", 3, 3, "Storage", "EFS vs FSx for Windows?", "EFS: Linux, NFS. FSx for Windows File Server: Windows, SMB, Active Directory."),

  fc("kinesis-data-streams-vs-firehose", 1, 3, "Analytics", "Kinesis Data Streams shard limits?", "Write: 1 MB/s or 1,000 records/s per shard. Read: 2 MB/s per shard."),
  fc("kinesis-data-streams-vs-firehose", 2, 3, "Analytics", "Which supports replay: Streams or Firehose?", "Only Data Streams, with retention of 24 hours up to 365 days. Firehose does not retain for replay."),
  fc("kinesis-data-streams-vs-firehose", 3, 3, "Analytics", "Why is Firehose only near real time?", "It buffers by size or time before delivering. The interval is configurable (default 300 seconds, typically 60 to 900 seconds for S3), so it is near real time, not real time."),

  fc("aws-elastic-disaster-recovery", 1, 2, "Resilience", "Elastic Disaster Recovery RPO and RTO?", "RPO typically seconds, RTO typically minutes, with a low-cost staging area."),
  fc("aws-elastic-disaster-recovery", 2, 2, "Resilience", "Elastic DR vs AWS Backup vs Application Migration Service?", "DRS: continuous replication for DR. Backup: periodic recovery points. MGN: same replication technology used to migrate permanently."),
  fc("aws-elastic-disaster-recovery", 3, 2, "Resilience", "How does DRS help after ransomware?", "Point-in-time recovery launches instances from a state before the corruption was replicated."),
];
