import type { Flashcard, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const deepDiveDQuestions: Question[] = [
  // ---- Auto Scaling ----
  mk(
    "auto-scaling-policies-lifecycle-hooks", 1, 3, "easy",
    "A web tier behind an ALB should keep average CPU utilisation near 50 percent as traffic changes, with the least configuration effort. Which scaling policy fits?",
    ["Simple scaling with a 300-second cooldown", "Target tracking scaling on average CPU at 50 percent", "Scheduled scaling every hour", "Manual changes to desired capacity"],
    "b",
    "Target tracking works like a thermostat: you set the metric target and the group adds or removes instances to hold it.",
    [
      "Simple scaling reacts slowly because of cooldowns and needs alarms you configure.",
      "Target tracking maintains a metric at a target with minimal setup.",
      "Schedules do not respond to actual load.",
      "Manual changes are not automatic.",
    ],
    "\"keep metric at X\" -> target tracking", ["Auto Scaling", "target tracking"]
  ),
  mk(
    "auto-scaling-policies-lifecycle-hooks", 2, 2, "medium",
    "An application must copy logs from an instance to S3 before Auto Scaling terminates it during scale-in. What should be configured?",
    ["A scheduled action", "A lifecycle hook on the Terminating:Wait transition", "Scale-in protection on all instances", "A longer health check grace period"],
    "b",
    "A termination lifecycle hook pauses the instance in Terminating:Wait so a script can run before it is removed.",
    [
      "Scheduled actions change capacity, not termination behaviour.",
      "The hook holds the instance so cleanup can finish.",
      "Protection would stop it from ever scaling in.",
      "Grace period relates to health checks after launch.",
    ],
    "\"run action before terminating\" -> lifecycle hook", ["lifecycle hook", "termination"]
  ),
  mk(
    "auto-scaling-policies-lifecycle-hooks", 3, 3, "hard",
    "A fleet of workers processes jobs from an SQS queue. CPU stays low even when thousands of messages are waiting. What is the best metric to scale on?",
    ["Average CPU utilisation", "Network in", "A custom metric: queue backlog per instance", "Instance status checks"],
    "c",
    "For queue workers, the number of messages waiting divided by running instances reflects demand far better than CPU.",
    [
      "CPU stays low in this scenario, so it will not trigger scaling.",
      "Network traffic does not measure queue backlog.",
      "Backlog per instance directly tracks workload per worker.",
      "Status checks measure instance health, not demand.",
    ],
    "\"queue workers\" -> backlog per instance", ["SQS", "Auto Scaling", "custom metric"]
  ),

  // ---- ALB vs NLB ----
  mk(
    "alb-vs-nlb-features", 1, 3, "easy",
    "A company hosts several microservices behind one domain and wants requests for /orders to go to one service and /billing to another. Which load balancer fits?",
    ["Network Load Balancer", "Application Load Balancer with path-based listener rules", "Gateway Load Balancer", "Classic Load Balancer with sticky sessions"],
    "b",
    "ALB operates at layer 7 and routes by path, host, header or query string.",
    [
      "NLB works at layer 4 and cannot route by URL path.",
      "ALB listener rules can send paths to different target groups.",
      "GWLB inserts appliances and does not route applications.",
      "Stickiness does not route by path.",
    ],
    "\"path-based routing\" -> ALB", ["ALB", "path routing"]
  ),
  mk(
    "alb-vs-nlb-features", 2, 1, "medium",
    "A partner requires that the company's service be reachable at fixed IP addresses that they can add to their firewall allow-list, over TCP. Which solution works?",
    ["Application Load Balancer alone", "Network Load Balancer with Elastic IPs", "Route 53 simple record to instance names", "Gateway Load Balancer"],
    "b",
    "NLB provides a static IP per AZ and supports Elastic IPs, which suits allow-listing for TCP services.",
    [
      "ALB addresses change and are not static.",
      "NLB offers static and Elastic IPs per AZ.",
      "Instance addresses change and DNS names do not give fixed IPs.",
      "GWLB is for appliance insertion.",
    ],
    "\"static IP / allow-list\" -> NLB", ["NLB", "static IP"]
  ),
  mk(
    "alb-vs-nlb-features", 3, 2, "hard",
    "During a deployment, some in-flight requests are cut when an instance is removed from an ALB target group. Which setting lets in-flight requests complete?",
    ["Cross-zone load balancing", "Deregistration delay", "Sticky sessions", "Health check interval"],
    "b",
    "Deregistration delay (connection draining) keeps a deregistering target alive for in-flight requests, 300 seconds by default.",
    [
      "Cross-zone affects distribution across AZs, not draining.",
      "Deregistration delay gives requests time to finish.",
      "Stickiness binds users to targets but does not protect in-flight requests on removal.",
      "Health checks decide health, not draining behaviour.",
    ],
    "\"in-flight requests when removing target\" -> deregistration delay", ["deregistration delay", "draining"]
  ),

  // ---- SQS ----
  mk(
    "sqs-fifo-dlq-visibility", 1, 2, "easy",
    "An order-processing system must process each message exactly once and in the order sent for a given customer. Which queue type should be used?",
    ["SQS Standard queue", "SQS FIFO queue with the customer ID as message group ID", "SNS topic", "Kinesis Data Firehose"],
    "b",
    "FIFO queues give exactly-once processing and strict ordering within a message group.",
    [
      "Standard queues allow duplicates and best-effort ordering.",
      "FIFO with a message group ID per customer preserves order per customer.",
      "SNS is pub/sub and does not guarantee per-customer ordered processing.",
      "Firehose delivers streams to destinations, not ordered message queues.",
    ],
    "\"exactly once + ordered\" -> SQS FIFO", ["SQS FIFO", "message group"]
  ),
  mk(
    "sqs-fifo-dlq-visibility", 2, 3, "medium",
    "Messages that take about two minutes to process are being handled twice by different workers. The queue uses default settings. What should be changed?",
    ["Reduce the retention period", "Increase the visibility timeout above the processing time", "Switch to short polling", "Enable a delay queue"],
    "b",
    "The default visibility timeout is 30 seconds. If processing takes longer, the message reappears and another worker picks it up.",
    [
      "Retention controls how long messages are kept, not duplicate delivery.",
      "A timeout longer than processing keeps the message hidden until deletion.",
      "Short polling affects empty responses, not duplicates.",
      "Delay queues postpone first delivery only.",
    ],
    "\"processed twice because slow\" -> raise visibility timeout", ["visibility timeout"]
  ),
  mk(
    "sqs-fifo-dlq-visibility", 3, 2, "hard",
    "A malformed message keeps failing and being retried, blocking worker capacity. The team wants failing messages isolated automatically after five attempts for later analysis. What should they configure?",
    ["Delay queue of five minutes", "A dead-letter queue with maxReceiveCount of 5", "A shorter retention period", "Long polling with a 20-second wait"],
    "b",
    "A DLQ with maxReceiveCount moves a message after it has been received that many times without deletion.",
    [
      "A delay does not isolate failing messages.",
      "The redrive policy sends repeatedly failing messages to the DLQ.",
      "Short retention would just delete messages eventually.",
      "Long polling affects polling efficiency, not failure handling.",
    ],
    "\"poison message after N attempts\" -> DLQ", ["DLQ", "maxReceiveCount"]
  ),

  // ---- ElastiCache ----
  mk(
    "elasticache-redis-vs-memcached", 1, 3, "easy",
    "A gaming company needs a real-time leaderboard with ranking operations, replication and automatic failover. Which engine fits?",
    ["ElastiCache for Memcached", "ElastiCache for Redis", "Amazon S3", "Amazon Athena"],
    "b",
    "Redis sorted sets support ranking, and Redis offers replication and Multi-AZ failover.",
    [
      "Memcached lacks sorted sets, replication and failover.",
      "Redis provides sorted sets and replicated, highly available deployments.",
      "S3 is object storage, not a real-time ranking engine.",
      "Athena runs queries over S3 and is not a low-latency store.",
    ],
    "\"leaderboard / sorted sets / failover\" -> Redis", ["Redis", "leaderboard"]
  ),
  mk(
    "elasticache-redis-vs-memcached", 2, 3, "medium",
    "A team caches product data using the pattern: check the cache, on a miss read the database and then store the result in the cache. What is this pattern called and what is its drawback?",
    ["Write-through, cache may fill with unread data", "Lazy loading, data can become stale until it expires", "Read replica, replication lag", "Write-behind, data loss on failure"],
    "b",
    "Lazy loading (cache-aside) only caches data on demand, so cached items can be stale until TTL or invalidation.",
    [
      "Write-through updates the cache on every write, which is a different pattern.",
      "This describes lazy loading and its staleness risk.",
      "Read replicas are a database feature.",
      "Write-behind is not the described flow.",
    ],
    "\"check cache, miss, load DB, populate cache\" -> lazy loading", ["lazy loading", "cache-aside"]
  ),
  mk(
    "elasticache-redis-vs-memcached", 3, 2, "hard",
    "A company needs an in-memory session store that survives a node failure and can be restored from backups. Which TWO features point to choosing Redis over Memcached?",
    ["Multi-AZ with automatic failover", "Backup and restore", "Multi-threaded architecture", "Simple key-value strings only"],
    "ab",
    "Redis offers replication with failover and backup and restore. Memcached has neither.",
    [
      "Redis replication groups can fail over automatically.",
      "Redis supports snapshots for backup and restore.",
      "Multi-threading is a Memcached characteristic and does not provide durability.",
      "Simplicity is a Memcached trait and does not meet the resilience requirement.",
    ],
    "\"survive node failure + backup\" -> Redis", ["Redis", "Multi-AZ", "backup"]
  ),

  // ---- KMS ----
  mk(
    "kms-envelope-encryption-key-types", 1, 1, "easy",
    "A company needs to define its own key policy, enable rotation and be able to schedule deletion of the key used to encrypt its data. Which key type should it use?",
    ["AWS owned key", "AWS managed key", "Customer managed key", "A key stored in the application code"],
    "c",
    "Customer managed keys give full control over policy, rotation and lifecycle.",
    [
      "AWS owned keys are invisible and not configurable by you.",
      "AWS managed keys cannot have their policy edited or be deleted by you.",
      "Customer managed keys are the configurable option.",
      "Keys in code are insecure and not a KMS key type.",
    ],
    "\"control key policy / rotation / deletion\" -> customer managed key", ["KMS", "customer managed key"]
  ),
  mk(
    "kms-envelope-encryption-key-types", 2, 1, "medium",
    "An application needs to encrypt 500 MB files using a KMS key. Which approach is correct?",
    ["Call KMS Encrypt directly with the file", "Call GenerateDataKey, encrypt the file locally with the data key and store the encrypted data key with it", "Split the file into 4 KB parts and send each to KMS", "Use an IAM policy to encrypt the file"],
    "b",
    "KMS can encrypt only 4 KB directly, so large data uses envelope encryption with a data key.",
    [
      "Direct Encrypt has a 4 KB limit.",
      "Envelope encryption encrypts locally and protects the data key with KMS.",
      "This is impractical, slow and costly.",
      "IAM policies grant permissions and do not encrypt data.",
    ],
    "\"large data with KMS\" -> envelope encryption", ["envelope encryption", "GenerateDataKey"]
  ),
  mk(
    "kms-envelope-encryption-key-types", 3, 2, "hard",
    "A company encrypts data in us-east-1 with a KMS key and wants the same key material available to decrypt that data in eu-west-1 during disaster recovery without re-encrypting. What should they use?",
    ["The same key ID, since KMS keys are global", "A multi-Region KMS key with a replica in eu-west-1", "An AWS managed key in each Region", "An IAM role that crosses Regions"],
    "b",
    "Standard KMS keys are Regional. Multi-Region keys share key material across replicas so ciphertext can be decrypted in another Region.",
    [
      "Standard KMS keys are Regional, not global.",
      "A multi-Region key and its replica are interoperable.",
      "Separate AWS managed keys have different key material.",
      "IAM roles do not move key material across Regions.",
    ],
    "\"decrypt in another Region\" -> multi-Region key", ["multi-Region key", "KMS"]
  ),

  // ---- S3 replication ----
  mk(
    "s3-replication-performance", 1, 2, "easy",
    "A company enables Cross-Region Replication on a bucket that already contains millions of objects. After a day, only new uploads appear in the destination. Why?",
    ["Replication is delayed by 24 hours", "Replication only applies to objects created after the rule is enabled", "Versioning is not allowed with replication", "The destination bucket must be in the same Region"],
    "b",
    "S3 replication copies only new objects after the rule is created. Existing objects need S3 Batch Replication.",
    [
      "There is no fixed 24-hour delay.",
      "Existing objects are not replicated automatically.",
      "Versioning is actually required on both buckets.",
      "Cross-Region replication is specifically for another Region.",
    ],
    "\"existing objects not replicated\" -> Batch Replication", ["S3 replication", "Batch Replication"]
  ),
  mk(
    "s3-replication-performance", 2, 3, "medium",
    "Users in Asia upload large video files to a bucket in us-east-1 and experience slow transfers over the public internet. Which TWO changes improve upload performance? (Select TWO.)",
    ["Enable S3 Transfer Acceleration", "Use multipart upload with parallel parts", "Enable S3 Versioning", "Use S3 One Zone-IA"],
    "ab",
    "Transfer Acceleration routes uploads through the nearest edge location, and multipart upload sends parts in parallel with independent retries.",
    [
      "Acceleration uses the AWS backbone from the nearest edge location.",
      "Multipart upload parallelises and makes large uploads resilient.",
      "Versioning protects objects but does not speed uploads.",
      "A storage class affects cost and durability, not upload speed.",
    ],
    "\"slow long-distance uploads\" -> Transfer Acceleration + multipart", ["Transfer Acceleration", "multipart"]
  ),
  mk(
    "s3-replication-performance", 3, 2, "hard",
    "Bucket A replicates to bucket B, and bucket B replicates to bucket C. An object is uploaded to bucket A. Where does the object end up?",
    ["A, B and C", "A and B only", "A and C only", "A only"],
    "b",
    "Replication is not transitive. Objects replicated into B by replication are not replicated again to C.",
    [
      "Chained replication does not forward replicated objects.",
      "The object reaches B but is not re-replicated to C.",
      "The object does not skip B.",
      "The replication rule from A to B does copy it.",
    ],
    "\"A to B to C\" -> not transitive", ["S3 replication", "not transitive"]
  ),

  // ---- NAT / IPv6 ----
  mk(
    "vpc-nat-egress-only-ipv6", 1, 2, "easy",
    "A company runs private subnets in three AZs and wants outbound IPv4 internet access that survives the failure of one AZ. What is the best design?",
    ["One NAT gateway in one AZ for all private subnets", "One NAT gateway in each AZ, with each AZ's private subnets routed to its local NAT gateway", "A NAT instance in a private subnet", "An internet gateway attached to the private subnets"],
    "b",
    "A NAT gateway is resilient only within its AZ, so one per AZ with local routing keeps outbound access if another AZ fails.",
    [
      "A single NAT gateway is a single AZ dependency.",
      "Per-AZ NAT gateways give independence and avoid cross-AZ traffic.",
      "NAT instances must be in a public subnet and are self-managed.",
      "Routing private subnets to an internet gateway would make them public.",
    ],
    "\"HA NAT\" -> one NAT gateway per AZ", ["NAT gateway", "high availability"]
  ),
  mk(
    "vpc-nat-egress-only-ipv6", 2, 1, "medium",
    "Instances in a private subnet use IPv6 addresses and must initiate outbound connections to the internet, but the internet must not be able to initiate connections to them. What should be used?",
    ["NAT gateway", "Egress-only internet gateway", "Internet gateway with a security group", "VPC peering"],
    "b",
    "An egress-only internet gateway allows outbound IPv6 traffic and blocks inbound connections initiated from the internet.",
    [
      "NAT gateways handle IPv4, not IPv6.",
      "The egress-only gateway is built for outbound-only IPv6.",
      "A regular internet gateway allows inbound IPv6 initiation unless blocked elsewhere.",
      "Peering connects VPCs and gives no internet access.",
    ],
    "\"IPv6 outbound only\" -> egress-only internet gateway", ["egress-only", "IPv6"]
  ),
  mk(
    "vpc-nat-egress-only-ipv6", 3, 1, "hard",
    "A security team wants administrators to get shell access to private EC2 instances with no inbound ports open, no bastion host, and a log of every session. Which solution fits?",
    ["A bastion host with a hardened AMI", "AWS Systems Manager Session Manager", "Open SSH to the administrators' IP range", "A NAT gateway with port forwarding"],
    "b",
    "Session Manager provides IAM-controlled shell access over an outbound connection from the SSM agent and can log sessions.",
    [
      "A bastion needs open inbound ports and ongoing maintenance.",
      "Session Manager needs no inbound ports and supports session logging.",
      "Opening SSH leaves inbound ports exposed.",
      "NAT gateways do not support inbound port forwarding.",
    ],
    "\"no inbound ports + audit sessions\" -> Session Manager", ["Session Manager", "bastion"]
  ),
];

export const deepDiveDFlashcards: Flashcard[] = [
  fc("auto-scaling-policies-lifecycle-hooks", 1, 3, "Compute", "Which ASG policy keeps a metric at a target?", "Target tracking scaling, like a thermostat. Step scaling reacts in tiers to alarms, scheduled handles known times, predictive uses ML on history."),
  fc("auto-scaling-policies-lifecycle-hooks", 2, 2, "Compute", "What do ASG lifecycle hooks do?", "Pause an instance in Pending:Wait or Terminating:Wait so custom actions can run. Default wait is one hour."),
  fc("auto-scaling-policies-lifecycle-hooks", 3, 3, "Compute", "Best scaling metric for SQS workers?", "A custom backlog-per-instance metric (messages in queue divided by running instances), not CPU."),

  fc("alb-vs-nlb-features", 1, 3, "Compute", "ALB vs NLB in one line?", "ALB: layer 7, content routing, WAF. NLB: layer 4 TCP/UDP/TLS, extreme performance, static IP per AZ."),
  fc("alb-vs-nlb-features", 2, 2, "Compute", "Cross-zone load balancing defaults?", "ALB: on by default and free. NLB: off by default, and enabling it adds inter-AZ data charges."),
  fc("alb-vs-nlb-features", 3, 2, "Compute", "What is deregistration delay?", "Connection draining: the time (default 300 seconds) a deregistering target keeps serving in-flight requests."),

  fc("sqs-fifo-dlq-visibility", 1, 2, "Application Integration", "Standard vs FIFO SQS?", "Standard: near-unlimited throughput, at-least-once, best-effort order. FIFO: exactly-once, strict order per message group, 300/s (3,000/s batched)."),
  fc("sqs-fifo-dlq-visibility", 2, 3, "Application Integration", "Default visibility timeout and its range?", "30 seconds by default, up to 12 hours. Set it longer than your processing time to avoid duplicate processing."),
  fc("sqs-fifo-dlq-visibility", 3, 2, "Application Integration", "What triggers a message to move to a DLQ?", "It is received more than maxReceiveCount times without being deleted. A FIFO queue needs a FIFO DLQ."),

  fc("elasticache-redis-vs-memcached", 1, 3, "Database", "Redis vs Memcached?", "Redis: rich data types, persistence, replication, Multi-AZ failover, backup. Memcached: simple, multi-threaded, sharding only, no durability."),
  fc("elasticache-redis-vs-memcached", 2, 3, "Database", "Lazy loading vs write-through?", "Lazy loading caches on a miss, so data can be stale. Write-through updates the cache on every write, so it is fresh but may hold unread data."),
  fc("elasticache-redis-vs-memcached", 3, 3, "Database", "ElastiCache vs DAX?", "ElastiCache is general purpose and needs application cache logic. DAX is a DynamoDB-specific drop-in cache."),

  fc("kms-envelope-encryption-key-types", 1, 1, "Security, Identity, and Compliance", "KMS key ownership types?", "AWS owned (invisible), AWS managed (service-created, auto-rotated, policy not editable), customer managed (you control policy, rotation, deletion)."),
  fc("kms-envelope-encryption-key-types", 2, 1, "Security, Identity, and Compliance", "Why envelope encryption?", "KMS Encrypt handles only 4 KB. GenerateDataKey returns a data key to encrypt bulk data locally, and the encrypted data key is stored with the data."),
  fc("kms-envelope-encryption-key-types", 3, 2, "Security, Identity, and Compliance", "KMS key deletion waiting period?", "7 to 30 days. After that, data encrypted under the key is unrecoverable, so disable the key first if unsure."),

  fc("s3-replication-performance", 1, 2, "Storage", "S3 replication prerequisites and limits?", "Versioning on both buckets, an IAM role, new objects only (use Batch Replication for existing), and not transitive across chained buckets."),
  fc("s3-replication-performance", 2, 3, "Storage", "S3 request rate per prefix?", "At least 3,500 PUT/COPY/POST/DELETE and 5,500 GET/HEAD requests per second per prefix."),
  fc("s3-replication-performance", 3, 3, "Storage", "Multipart upload thresholds?", "Recommended above 100 MB, required above 5 GB, up to 10,000 parts, parts uploaded in parallel and retried independently."),

  fc("vpc-nat-egress-only-ipv6", 1, 2, "Networking and Content Delivery", "How to make NAT highly available?", "One NAT gateway per AZ, with each AZ's private subnets routing to their local gateway."),
  fc("vpc-nat-egress-only-ipv6", 2, 1, "Networking and Content Delivery", "IPv6 outbound-only from private subnets?", "Use an egress-only internet gateway. NAT gateways handle IPv4 only."),
  fc("vpc-nat-egress-only-ipv6", 3, 1, "Networking and Content Delivery", "Why Session Manager over a bastion host?", "No inbound ports, no keys, IAM-controlled, and sessions can be logged to CloudWatch or S3."),
];
