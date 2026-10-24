import type { Lesson } from "@/lib/types";

export const deepDivesD: Lesson[] = [
  {
    id: "auto-scaling-policies-lifecycle-hooks",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "Auto Scaling Policies and Lifecycle Hooks",
    shortName: "ASG policies",
    tier: 1,
    domains: [2, 3, 4],
    examImportance: "high",
    oneLiner:
      "An Auto Scaling group changes its size by a policy you choose: track a target, step through thresholds, follow a schedule, or predict the load.",
    englishExplanation:
      "An Auto Scaling group keeps between a minimum and maximum number of instances, aims for a desired capacity, and spreads them across AZs. It replaces instances that fail EC2 or load balancer health checks, so enabling ELB health checks matters when the application can hang while the instance still looks healthy. How it grows and shrinks is set by scaling policies.\n\nTarget tracking is the simplest and usually the best answer: you pick a metric and a target, for example average CPU at 50 percent or requests per target at 1,000, and the group adds or removes instances to hold it, like a thermostat. Step scaling reacts to CloudWatch alarms and adds a different number of instances depending on how far the metric is past the threshold. Simple scaling is the older form that waits for a cooldown (300 seconds by default) after each action. Scheduled scaling changes capacity at known times, such as before a daily sale. Predictive scaling uses machine learning on historical load to scale ahead of recurring patterns. For queue-driven workers, a custom metric such as SQS backlog per instance scales better than CPU.\n\nLifecycle hooks pause an instance during launch (Pending:Wait) or termination (Terminating:Wait) so you can run custom actions: install software, register with a service, or copy logs off before it disappears. The default wait is one hour. Warm pools keep pre-initialised instances ready to cut start-up time. When scaling in, the default termination policy first balances across AZs, then removes the instance with the oldest launch template or configuration, so rolling out a new AMI naturally retires old instances. Scale-in protection can shield specific instances.",
    taglishExplanation:
      "Ang Auto Scaling group ay may minimum, maximum at desired capacity, at ikinakalat ang instances sa mga AZ. Pinapalitan nito ang instance na bumagsak sa health check, kaya i-enable ang ELB health check kung puwedeng mag-hang ang app. Sa scaling policies: ang target tracking ang pinakamadali at madalas tama, pipili ka ng metric at target, tulad ng CPU na 50 percent. Ang step scaling ay iba-iba ang dagdag depende kung gaano kalayo sa threshold. Ang scheduled ay para sa alam mong oras, at ang predictive ay gumagamit ng machine learning. Ang lifecycle hook ay pumipigil muna sa instance habang nagla-launch o nate-terminate para makapagpatakbo ka ng sarili mong aksyon. Para sa queue workers, mas maganda ang backlog per instance kaysa CPU.",
    analogy:
      "A restaurant manager deciding how many waiters are on shift. Target tracking is 'keep each waiter at about five tables'. Step scaling is 'if the queue at the door is three times too long, call in three extra people'. Scheduled is 'Friday night always needs more staff'. Predictive is the manager who has seen enough Fridays to call people in early. A lifecycle hook is the briefing every new waiter gets before stepping onto the floor.",
    whyItExists:
      "Fixed capacity is either too small at peak or wasteful off peak. Different workloads have different shapes, so one scaling rule cannot fit them all, and some instances need setup or teardown work around launch and termination.",
    flow: "CloudWatch metric -> scaling policy decides new desired capacity -> group launches or terminates instances across AZs -> (optional lifecycle hook waits) -> ELB health check passes -> instance serves traffic",
    withoutIt: [
      "You would over-provision for peak and pay for idle capacity",
      "A failed instance would stay failed until someone replaced it",
      "Predictable events like sales would need manual capacity changes",
    ],
    bestUseCases: [
      "Target tracking for web tiers behind an ALB, using requests per target or CPU",
      "Scheduled scaling for known daily or weekly peaks",
      "Predictive scaling for steady, repeating patterns",
      "Backlog-per-instance custom metric for SQS worker fleets",
      "Lifecycle hooks to run configuration or drain tasks around launch and termination",
    ],
    poorUseCases: [
      "Simple scaling with long cooldowns for fast-changing traffic",
      "EC2-only health checks for an app that can hang while the instance stays running",
      "Scaling on CPU for workers whose load is a queue backlog",
      "Relying on scaling alone for stateful servers that cannot be removed safely",
    ],
    alternatives: [
      { need: "Scale a DynamoDB table or Aurora replicas", choose: "Application Auto Scaling" },
      { need: "Scale containers on ECS", choose: "ECS Service Auto Scaling" },
      { need: "Fully managed scaling with no instances", choose: "AWS Lambda or Fargate" },
      { need: "Recommend right-sized instances", choose: "AWS Compute Optimizer" },
    ],
    keyFeatures: [
      "Minimum, desired and maximum capacity across multiple AZs",
      "Target tracking, step, simple, scheduled and predictive scaling",
      "Default cooldown 300 seconds for simple scaling",
      "EC2 and ELB health checks with a health check grace period",
      "Lifecycle hooks: Pending:Wait and Terminating:Wait, default one hour",
      "Warm pools, instance refresh, scale-in protection",
      "Default termination: balance AZs, then oldest launch template, then closest to next billing hour",
    ],
    availability:
      "Spread the group across at least two AZs. If an AZ fails, the group launches replacements in the remaining AZs and rebalances when the AZ recovers.",
    security:
      "Instances launch with the IAM instance profile and security groups in the launch template. Bake patched AMIs so new instances start from a known state.",
    pricingLogic:
      "Auto Scaling is free. You pay for the instances and CloudWatch alarms. Mixing On-Demand and Spot in the group lowers cost further.",
    examKeywords: [
      "maintain average CPU",
      "scale ahead of known peak",
      "queue backlog",
      "run script before termination",
      "health check",
      "cooldown",
      "oldest launch configuration",
    ],
    examTraps: [
      "Target tracking is preferred over step scaling when the question says 'keep a metric at a value'.",
      "ELB health checks must be enabled on the group for the ASG to replace instances the load balancer marks unhealthy.",
      "Lifecycle hooks pause the instance, they do not scale it. The default timeout is one hour.",
      "For SQS workers, scale on backlog per instance, not CPU.",
    ],
    architectureDiagram: `CloudWatch alarm / target tracking / schedule
               |
        [Auto Scaling group min=2 desired=4 max=10]
        /            |             \\
   [AZ-a EC2]    [AZ-b EC2]     [AZ-c EC2]  <- ALB health checks
        hook: Pending:Wait -> configure -> InService`,
    architectureCaption: "Policies set desired capacity, and the group places and replaces instances across AZs.",
    mentorTip:
      "Match the verb: 'keep at 50 percent' is target tracking, 'every Friday' is scheduled, 'recurring pattern' is predictive, 'before it terminates' is a lifecycle hook.",
    questionIds: [
      "q-auto-scaling-policies-lifecycle-hooks-1",
      "q-auto-scaling-policies-lifecycle-hooks-2",
      "q-auto-scaling-policies-lifecycle-hooks-3",
    ],
  },
  {
    id: "alb-vs-nlb-features",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "ALB vs NLB: Routing, Stickiness and Draining",
    shortName: "ALB vs NLB",
    tier: 1,
    domains: [2, 3],
    examImportance: "high",
    oneLiner:
      "ALB understands HTTP and routes by content. NLB moves raw TCP, UDP and TLS at extreme speed with static IPs.",
    englishExplanation:
      "An Application Load Balancer works at layer 7. It routes by host name, path, header, query string or method using listener rules, can send traffic to instances, IPs, containers or Lambda functions, and can redirect, return fixed responses or authenticate users with Cognito or an OIDC provider. It terminates HTTPS, supports WebSockets and gRPC, integrates with AWS WAF, and passes the client IP in the X-Forwarded-For header. Sticky sessions use a cookie to keep a user on one target.\n\nA Network Load Balancer works at layer 4. It handles TCP, UDP and TLS with millions of requests per second and very low latency, gives each AZ a static IP (and optionally an Elastic IP), and preserves the client source IP. That static address makes it the choice when partners must allow-list your IPs, and it is the front end for PrivateLink endpoint services. It can also forward to an ALB when you want static IPs in front of HTTP routing.\n\nSome behaviours apply to both. Deregistration delay (default 300 seconds) lets in-flight requests finish before a target is removed, which is connection draining. Health checks decide which targets receive traffic. Cross-zone load balancing spreads requests evenly across all registered targets in all AZs: it is on by default and free for ALB, and off by default for NLB, where enabling it incurs inter-AZ data charges. If a scenario needs to keep every request from one user on the same server, think stickiness, but also ask whether storing session state in ElastiCache or DynamoDB would be more resilient.",
    taglishExplanation:
      "Ang ALB ay layer 7: nagro-route ito ayon sa host, path, header, o query string gamit ang listener rules, at puwedeng tumarget ng instance, IP, container, o Lambda. Kaya rin nitong mag-redirect o mag-authenticate gamit ang Cognito. Ang IP ng client ay nasa X-Forwarded-For header. Ang NLB ay layer 4: TCP, UDP, at TLS, milyon-milyong request kada segundo, mababang latency, at may static IP kada AZ, kaya ito ang pipiliin kapag kailangang i-allow-list ng partner ang IP mo. Pareho silang may deregistration delay na default 300 segundo para matapos ang in-flight requests. Ang cross-zone ay naka-on at libre sa ALB, pero naka-off sa NLB at may bayad kapag in-on. Ang sticky sessions ay gumagamit ng cookie sa ALB.",
    analogy:
      "An ALB is a receptionist who reads each visitor's request and says 'sales is on floor two, support is on floor three'. An NLB is a fast turnstile that sends people straight through to the next free lane without reading anything, and always at the same fixed street address.",
    whyItExists:
      "Web applications want content-aware routing and TLS handling, while other protocols and extreme-scale or fixed-IP needs want a simple, very fast forwarder. Two load balancer types serve each need properly.",
    flow: "Client -> load balancer listener -> rule or target group -> health-checked target (instance, IP, Lambda) ; draining waits 300s before deregistered targets are removed",
    withoutIt: [
      "You would run and scale your own proxies such as HAProxy or Nginx",
      "Path-based microservice routing would need separate hostnames or custom software",
      "Partners could not rely on fixed IPs for firewall rules",
    ],
    bestUseCases: [
      "ALB for microservices routed by path or host, and for HTTP APIs and websites",
      "ALB with WAF and Cognito authentication for public web apps",
      "NLB for TCP or UDP services such as gaming, IoT and custom protocols",
      "NLB when static or Elastic IPs must be allow-listed",
      "NLB as the front for a PrivateLink endpoint service",
    ],
    poorUseCases: [
      "ALB when you need UDP or a fixed IP without adding Global Accelerator",
      "NLB when you need path-based routing or HTTP header inspection",
      "Sticky sessions as the only way to keep user state, since losing the target loses the session",
      "Either one to inspect traffic with third-party appliances (use Gateway Load Balancer)",
    ],
    alternatives: [
      { need: "Inline third-party firewall fleet", choose: "Gateway Load Balancer" },
      { need: "Static anycast IPs across Regions", choose: "AWS Global Accelerator" },
      { need: "Centralised HTTP caching", choose: "Amazon CloudFront" },
      { need: "Route 53 weighted or failover across Regions", choose: "Route 53 routing policies" },
    ],
    keyFeatures: [
      "ALB: layer 7, host, path, header, query and method rules, redirects, fixed responses, Cognito and OIDC auth, WAF, Lambda targets",
      "NLB: layer 4, TCP, UDP, TLS, static IP per AZ, source IP preserved, ultra-low latency",
      "Sticky sessions: ALB duration-based or application cookies",
      "Deregistration delay default 300 seconds",
      "Cross-zone: default on for ALB, off for NLB (charges apply)",
      "Target types: instance, IP, Lambda (ALB), ALB (NLB)",
      "SSL/TLS termination with ACM certificates and SNI for multiple certificates",
    ],
    availability:
      "Both are Regional and span multiple AZs. Register targets in at least two AZs and keep cross-zone settings in mind so one AZ's targets are not overloaded.",
    security:
      "ALB can attach security groups and WAF. NLB also supports security groups now. Enforce TLS with modern policies and use ACM-managed certificates.",
    pricingLogic:
      "You pay per hour plus Load Balancer Capacity Units based on the highest of new connections, active connections, processed bytes or rule evaluations. NLB cross-zone traffic adds inter-AZ data transfer charges.",
    examKeywords: [
      "path-based routing",
      "host-based routing",
      "static IP",
      "millions of requests per second",
      "UDP",
      "sticky sessions",
      "connection draining",
      "X-Forwarded-For",
    ],
    examTraps: [
      "Static IPs and UDP point to NLB, not ALB.",
      "ALB sees the client IP in X-Forwarded-For. NLB preserves the source IP directly.",
      "Cross-zone load balancing is free and on by default for ALB, but off by default and charged for NLB.",
      "Connection draining is called deregistration delay on current load balancers.",
    ],
    architectureDiagram: `            +--> /api/*   -> [Target group: API (ECS)]
Client -> [ALB] --+--> /img/*   -> [Target group: Lambda]
            +--> default  -> [Target group: web EC2]

Partner -> static IP -> [NLB TCP/TLS] -> [Target group: custom TCP service]`,
    architectureCaption: "ALB reads the request to choose a target group. NLB forwards connections without reading them.",
    mentorTip:
      "Decide by protocol and addressing: HTTP routing means ALB, TCP or UDP or fixed IP means NLB, inspection appliance means GWLB.",
    questionIds: [
      "q-alb-vs-nlb-features-1",
      "q-alb-vs-nlb-features-2",
      "q-alb-vs-nlb-features-3",
    ],
  },
  {
    id: "sqs-fifo-dlq-visibility",
    moduleId: "phase-6-integration",
    category: "Application Integration",
    title: "SQS Standard vs FIFO, Visibility Timeout and Dead-Letter Queues",
    shortName: "SQS in depth",
    tier: 1,
    domains: [2, 3],
    examImportance: "critical",
    oneLiner:
      "SQS Standard maximises throughput with at-least-once delivery, FIFO guarantees order and no duplicates, and visibility timeout plus dead-letter queues keep failures from vanishing or looping forever.",
    englishExplanation:
      "A standard queue offers nearly unlimited throughput, at-least-once delivery and best-effort ordering. That means a message can occasionally arrive twice or out of order, so consumers must be idempotent. A FIFO queue (name ends in .fifo) delivers each message exactly once in strict order within a message group ID, at 300 messages per second per API action, or 3,000 with batching, with higher limits in high-throughput mode. Choose FIFO when order and no duplicates matter, such as financial transactions, and Standard when scale matters more.\n\nWhen a consumer receives a message it stays in the queue but becomes invisible for the visibility timeout (30 seconds by default, up to 12 hours). If the consumer finishes, it deletes the message. If it crashes or is too slow, the message reappears and another consumer retries. If processing legitimately takes longer than the timeout, raise the timeout, or the same message will be processed twice. Short polling returns immediately even if empty. Long polling waits up to 20 seconds for a message, which reduces empty responses and cost, and is almost always the right choice.\n\nA dead-letter queue captures messages that keep failing: after a message has been received more than the maxReceiveCount without being deleted, SQS moves it to the DLQ for inspection and redrive. A FIFO queue needs a FIFO DLQ. Other settings: retention from 1 minute to 14 days (4 days by default), a delivery delay of up to 15 minutes, and a 256 KB message size limit, extendable via the Extended Client Library that stores large payloads in S3. A good pattern is an Auto Scaling group of workers scaled on queue backlog per instance.",
    taglishExplanation:
      "Ang standard queue ay halos walang limit ang throughput, at-least-once ang delivery, at best-effort ang order, kaya puwedeng dumating nang dalawang beses o hindi sunod-sunod. Kailangan idempotent ang consumer. Ang FIFO naman ay exactly-once at sunod-sunod sa loob ng message group ID, pero mas mababa ang throughput, 300 kada segundo o 3,000 kapag may batching. Kapag kinuha ng consumer ang message, hindi ito nabubura kundi nagiging invisible sa loob ng visibility timeout, default 30 segundo. Kung hindi ito nabura, babalik ito. Ang dead-letter queue ay kinukuha ang mga message na paulit-ulit na pumapalya pagkalampas ng maxReceiveCount. Gamitin ang long polling, hanggang 20 segundo, para bawas ang empty responses at gastos.",
    analogy:
      "A post-office sorting tray. A standard tray lets many clerks grab letters fast, and now and then two clerks reach for the same one. A FIFO tray is a single numbered line for each customer. When a clerk picks up a letter it is turned face-down (visibility timeout). If the clerk delivers it, it is thrown away. If the clerk walks off, it flips back up. A letter that gets picked up and dropped five times goes into the 'problem mail' bin (DLQ).",
    whyItExists:
      "Decoupling producers and consumers needs a buffer that survives consumer failures, absorbs bursts, and offers a choice between maximum throughput and strict ordering. Visibility timeout and DLQs make retries safe and failures visible.",
    flow: "Producer -> SQS queue -> consumer receives (message invisible) -> success: delete  |  failure or timeout: reappears -> after maxReceiveCount: move to DLQ",
    withoutIt: [
      "A traffic burst would overwhelm the backend directly",
      "A crashed worker would lose its in-flight work",
      "Poison messages could loop forever and block processing",
    ],
    bestUseCases: [
      "Standard queue to buffer web requests for background workers at large scale",
      "FIFO queue for ordered financial or inventory updates",
      "DLQ with alarms to catch and analyse failing messages",
      "Long polling to cut cost and latency",
      "ASG scaling on backlog per instance",
    ],
    poorUseCases: [
      "Standard queue when duplicates or out-of-order delivery would corrupt data and consumers are not idempotent",
      "FIFO when you need hundreds of thousands of messages per second",
      "A visibility timeout shorter than the real processing time",
      "SQS for one-to-many fan-out (use SNS, or SNS to SQS)",
    ],
    alternatives: [
      { need: "Publish to many subscribers at once", choose: "Amazon SNS (fan-out to SQS)" },
      { need: "Replayable high-volume stream with multiple consumers", choose: "Kinesis Data Streams" },
      { need: "Route events by rule between AWS services", choose: "Amazon EventBridge" },
      { need: "Existing JMS or AMQP broker applications", choose: "Amazon MQ" },
    ],
    keyFeatures: [
      "Standard: nearly unlimited throughput, at-least-once, best-effort order",
      "FIFO: exactly-once processing, strict order per message group, 300/s (3,000/s batched) per API action",
      "Visibility timeout: default 30 seconds, maximum 12 hours",
      "Long polling up to 20 seconds, short polling by default if not set",
      "Retention 1 minute to 14 days, default 4 days",
      "Dead-letter queue with maxReceiveCount and redrive",
      "Delay queues up to 15 minutes, message up to 256 KB, large payloads through S3",
    ],
    availability:
      "SQS stores messages redundantly across multiple AZs and scales without capacity planning. Availability depends on consumers being able to retry safely.",
    security:
      "Use SSE-KMS or SQS-managed encryption, queue policies for cross-account or SNS-to-SQS delivery, and VPC endpoints for private access.",
    pricingLogic:
      "You pay per request, with each 64 KB chunk counted as one request. Long polling and batching reduce request count. FIFO costs slightly more per request than Standard.",
    examKeywords: [
      "decouple",
      "exactly-once",
      "order must be preserved",
      "messages reappear",
      "poison message",
      "dead-letter queue",
      "visibility timeout",
      "long polling",
    ],
    examTraps: [
      "Standard queues can deliver a message more than once. FIFO is the answer to 'exactly once and ordered'.",
      "If a message is processed twice because work takes longer than 30 seconds, raise the visibility timeout.",
      "A FIFO queue's DLQ must also be FIFO.",
      "SQS is a pull model. If the question needs push to many subscribers, that is SNS.",
    ],
    architectureDiagram: `Producers --> [SQS queue] --poll--> [Worker ASG scaled on backlog per instance]
                  |   (invisible for visibility timeout)
                  | receive count > maxReceiveCount
                  v
             [Dead-letter queue] --> alarm / redrive`,
    architectureCaption: "Workers pull, hide, process and delete. Repeated failures end up in the DLQ.",
    mentorTip:
      "Three levers solve most SQS questions: FIFO for order, visibility timeout for slow work, DLQ for poison messages.",
    questionIds: [
      "q-sqs-fifo-dlq-visibility-1",
      "q-sqs-fifo-dlq-visibility-2",
      "q-sqs-fifo-dlq-visibility-3",
    ],
  },
  {
    id: "elasticache-redis-vs-memcached",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "ElastiCache Redis vs Memcached and Caching Strategies",
    shortName: "Redis vs Memcached",
    tier: 1,
    domains: [3, 2],
    examImportance: "high",
    oneLiner:
      "Redis is a feature-rich, durable, replicated in-memory store. Memcached is a simple, multi-threaded cache. The exam usually wants Redis unless the question says simple.",
    englishExplanation:
      "ElastiCache puts an in-memory cache in front of a database to cut read latency and database load. Redis supports rich data types (strings, hashes, lists, sets, sorted sets), persistence, replication to read replicas, Multi-AZ with automatic failover, backup and restore, pub/sub, and encryption with AUTH. Cluster mode shards data across node groups to scale writes and memory, and Global Datastore replicates across Regions. Sorted sets make Redis the classic leaderboard engine, and it is a common session store.\n\nMemcached is deliberately simple. It is multi-threaded, shards data across nodes to scale horizontally, and holds only key and value strings. It has no replication, no persistence and no backups, so a lost node means lost cache. It fits when you want the simplest possible object cache, need to use many CPU cores in a single node, or do not care about durability.\n\nHow you populate the cache matters too. Lazy loading (cache-aside) loads data into the cache only on a miss: the application checks the cache, falls back to the database, then stores the result. It only caches what is requested, but a miss costs three round trips and data can go stale. Write-through updates the cache whenever the database is written, so data is fresh but the cache may fill with unread data. A TTL on each key bounds staleness, and the two strategies are often combined. Compared with DAX, ElastiCache is general-purpose and needs application logic, while DAX is a DynamoDB-specific drop-in.",
    taglishExplanation:
      "Ang ElastiCache ay in-memory cache sa harap ng database para bumilis ang read at gumaan ang load. Ang Redis ay maraming data type, may persistence, replication, Multi-AZ na may automatic failover, backup, at pub/sub, kaya ito ang karaniwang sagot, lalo na sa leaderboard at session store. Ang Memcached ay simple at multi-threaded, may sharding pero walang replication, persistence, o backup, kaya kapag nawala ang node, nawala ang cache. Sa strategy: ang lazy loading ay nagkakarga lang sa cache kapag miss, kaya laging fresh ang kailangan pero puwedeng luma. Ang write-through ay ina-update ang cache tuwing nagsusulat sa database, kaya fresh pero puwedeng mapuno ng hindi nababasang data. Gumamit ng TTL para limitahan ang staleness.",
    analogy:
      "A cafe keeping popular sandwiches on the counter so the kitchen is not asked for each one. Redis is a heated display case with labels, a second case in another room as a backup, and a log of what was inside. Memcached is a bare table by the till: very fast, but if the table is cleared, the sandwiches are gone. Lazy loading is making a sandwich only when a customer asks and leaving the extra on the counter.",
    whyItExists:
      "Databases are slower and more expensive per read than memory, and the same hot items are requested again and again. A cache absorbs those reads, giving microsecond to sub-millisecond responses and letting the database handle writes.",
    flow: "App -> check cache -> hit: return  |  miss: read database -> write to cache with TTL -> return",
    withoutIt: [
      "Every read would hit the database, raising latency and cost",
      "Read-heavy peaks could overload the database",
      "Leaderboards and session data would need slower, more complex solutions",
    ],
    bestUseCases: [
      "Redis for session stores, leaderboards, rate limiting and pub/sub",
      "Redis with Multi-AZ and replicas for a resilient cache layer",
      "Memcached for a simple, horizontally scaled object cache",
      "Lazy loading with TTL for read-heavy catalogue data",
      "Write-through for data that must always be fresh in cache",
    ],
    poorUseCases: [
      "Memcached when you need persistence, backups or failover",
      "A cache as the system of record for data you cannot lose",
      "Caching rarely repeated, highly unique queries",
      "ElastiCache in front of DynamoDB when DAX would need no code changes",
    ],
    alternatives: [
      { need: "Drop-in microsecond cache for DynamoDB", choose: "DynamoDB Accelerator (DAX)" },
      { need: "Durable in-memory primary database", choose: "Amazon MemoryDB" },
      { need: "Cache static HTTP content near users", choose: "Amazon CloudFront" },
      { need: "Reduce database read load with relational replicas", choose: "RDS or Aurora read replicas" },
    ],
    keyFeatures: [
      "Redis: data structures, persistence, replication, Multi-AZ failover, backup and restore, pub/sub",
      "Redis cluster mode for sharding, Global Datastore for cross-Region",
      "Memcached: multi-threaded, sharding only, no replication or persistence",
      "Encryption at rest and in transit, Redis AUTH and IAM authentication",
      "Lazy loading (cache-aside) vs write-through",
      "TTL controls staleness",
      "Runs in your VPC, accessed by private endpoint",
    ],
    availability:
      "Redis replication groups with Multi-AZ fail over automatically, typically within a minute. Memcached nodes are independent, so a node failure loses that node's data and the application must handle misses.",
    security:
      "Place the cluster in private subnets with security groups. Enable in-transit and at-rest encryption, and use Redis AUTH or IAM authentication for access control.",
    pricingLogic:
      "You pay per node-hour by node type, plus backup storage and data transfer. Reserved nodes lower the cost of steady clusters.",
    examKeywords: [
      "leaderboard",
      "session store",
      "sorted sets",
      "pub/sub",
      "multi-threaded",
      "cache-aside",
      "reduce database load",
      "Multi-AZ failover",
    ],
    examTraps: [
      "Memcached has no replication, persistence or backup. Any question needing those is Redis.",
      "Lazy loading can serve stale data until TTL or invalidation. Write-through avoids that at the price of caching unread data.",
      "ElastiCache requires application changes to use it. DAX for DynamoDB does not.",
      "A cache is not durable storage. Do not choose it as the only copy of data.",
    ],
    architectureDiagram: `App --> [ElastiCache Redis primary AZ-a] --replicate--> [Replica AZ-b]
 |            hit
 | miss
 +----------> [RDS / Aurora]  --> store result in cache (TTL 300s)`,
    architectureCaption: "Cache-aside: the app checks Redis first and falls back to the database on a miss.",
    mentorTip:
      "If the question lists any of replication, persistence, backups, failover, sorted sets or pub/sub, the answer is Redis. Only 'simplest' or 'multi-threaded' points to Memcached.",
    questionIds: [
      "q-elasticache-redis-vs-memcached-1",
      "q-elasticache-redis-vs-memcached-2",
      "q-elasticache-redis-vs-memcached-3",
    ],
  },
  {
    id: "kms-envelope-encryption-key-types",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "KMS Key Types and Envelope Encryption",
    shortName: "KMS in depth",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "KMS keeps master keys inside AWS and uses envelope encryption, so large data is encrypted locally with a data key that KMS itself protects.",
    englishExplanation:
      "AWS KMS creates and controls cryptographic keys. The keys it creates never leave KMS unencrypted, and every use is logged in CloudTrail. There are three ownership categories. AWS owned keys are used invisibly by services and cost nothing. AWS managed keys (aws/s3, aws/ebs and similar) are created in your account for a service, rotate automatically every year, and you cannot edit their policy or schedule deletion. Customer managed keys are created and controlled by you, with your own key policy, optional automatic rotation, grants, and the ability to disable or schedule deletion after a waiting period of 7 to 30 days. Keys are Regional unless you create a multi-Region key.\n\nKMS can directly encrypt only up to 4 KB, so large data uses envelope encryption. The application calls GenerateDataKey and receives a plaintext data key and the same key encrypted under a KMS key. It encrypts the data locally with the plaintext key, discards the plaintext key, and stores the encrypted data key alongside the ciphertext. To decrypt, it asks KMS to decrypt the data key, then decrypts the data locally. This is what S3, EBS and RDS do behind the scenes, and it keeps bulk data from travelling to KMS.\n\nAccess to a key needs the key policy to allow it, either directly or by enabling IAM policies. For cross-account use, the key policy must allow the other account, and that account's principals must be granted kms:Decrypt or similar in IAM. Symmetric keys use AES-256 and are the default, and asymmetric keys (RSA, ECC) support public-key encryption and signing. If you need single-tenant hardware, a KMS custom key store can be backed by CloudHSM.",
    taglishExplanation:
      "Ang KMS ay gumagawa at nagkokontrol ng keys, at hindi lumalabas ang key sa KMS nang hindi naka-encrypt. Tatlo ang uri: AWS owned na invisible at libre, AWS managed na ginawa para sa service at nag-ro-rotate bawat taon pero hindi mo mae-edit ang policy, at customer managed na ikaw ang may kontrol sa policy, rotation, at pagbura na may waiting period na 7 hanggang 30 araw. Hanggang 4 KB lang ang kayang i-encrypt ng KMS nang direkta, kaya envelope encryption ang gamit: GenerateDataKey ang tatawagin, makukuha ang plaintext at encrypted na data key, ie-encrypt mo ang data nang lokal, itatapon ang plaintext key, at itatabi ang encrypted key. Kailangang pumayag ang key policy, at sa cross-account, kailangan pareho ang key policy at IAM ng kabilang account.",
    analogy:
      "A bank vault holding one master key that never leaves the building. To lock a huge shipment, you ask the bank for a single-use padlock key. The bank hands you the key and also a sealed copy locked with the master key. You lock the shipment with your padlock, throw away the loose key, and keep the sealed copy with the goods. To open it, the bank unseals the copy for you.",
    whyItExists:
      "Encrypting everything by sending it to a central service would be slow and dangerous. Envelope encryption keeps master keys protected and auditable while letting each service encrypt big data quickly where it lives.",
    flow: "GenerateDataKey -> plaintext key + encrypted key -> encrypt data locally -> store ciphertext + encrypted key -> later: Decrypt encrypted key via KMS -> decrypt data locally",
    withoutIt: [
      "Applications would manage master keys themselves and risk leaking them",
      "There would be no central audit of who used which key",
      "Large datasets could not be encrypted efficiently with a protected master key",
    ],
    bestUseCases: [
      "Customer managed keys when you need control of key policy, rotation and deletion",
      "AWS managed keys for simple default encryption of a service",
      "Multi-Region keys for DR and global applications that decrypt in multiple Regions",
      "Envelope encryption in custom applications through the encryption SDK",
      "CloudHSM-backed custom key store for single-tenant hardware requirements",
    ],
    poorUseCases: [
      "Calling KMS Encrypt directly for megabytes of data",
      "AWS managed keys when you must restrict or audit with a custom key policy",
      "Deleting a key without understanding that data encrypted under it becomes unrecoverable",
      "Assuming a key in one Region can decrypt in another without a multi-Region key",
    ],
    alternatives: [
      { need: "Dedicated single-tenant HSM you control", choose: "AWS CloudHSM" },
      { need: "Store and rotate secrets such as DB passwords", choose: "AWS Secrets Manager" },
      { need: "Store configuration and plain parameters", choose: "SSM Parameter Store" },
      { need: "Manage TLS certificates", choose: "AWS Certificate Manager" },
    ],
    keyFeatures: [
      "Key types: AWS owned, AWS managed, customer managed",
      "Symmetric (AES-256) and asymmetric (RSA, ECC) keys",
      "Direct encrypt limit 4 KB. Use GenerateDataKey for larger data",
      "Automatic rotation for customer managed keys, yearly for AWS managed keys",
      "Key policy is required. IAM policies work only if the key policy allows them",
      "Deletion waiting period 7 to 30 days. Multi-Region keys",
      "Grants for temporary delegated access, and CloudTrail logging of every use",
    ],
    availability:
      "KMS is Regional and highly available. Multi-Region keys let you decrypt in a second Region. A disabled or deleted key makes its ciphertext unreadable, which is an availability risk as well as a security control.",
    security:
      "Separate key administrators from key users in the key policy. Use conditions such as kms:ViaService and encryption context to limit use, and monitor key usage in CloudTrail.",
    pricingLogic:
      "Customer managed keys cost a monthly fee per key plus per-request charges. AWS managed keys have no monthly fee but you pay for requests. Bucket Keys in S3 reduce request cost.",
    examKeywords: [
      "envelope encryption",
      "GenerateDataKey",
      "customer managed key",
      "automatic rotation",
      "cross-account key use",
      "audit key usage",
      "multi-Region key",
      "4 KB",
    ],
    examTraps: [
      "You cannot edit the policy of an AWS managed key. If the scenario needs a custom policy, it is a customer managed key.",
      "KMS keys are Regional. Cross-Region decryption needs a multi-Region key or re-encryption.",
      "Deleting a key is irreversible after the waiting period. Disable it first if unsure.",
      "Direct KMS Encrypt handles only 4 KB, which is why envelope encryption exists.",
    ],
    architectureDiagram: `App --GenerateDataKey--> [KMS key]
 |   <-- plaintext data key + encrypted data key
 | encrypt data locally with plaintext key, then discard it
 v
[Ciphertext + encrypted data key stored in S3/EBS]
 later: Decrypt(encrypted data key) -> KMS -> plaintext key -> decrypt data`,
    architectureCaption: "Only the small data key travels to KMS. The bulk data is encrypted locally.",
    mentorTip:
      "If a question says 'control the key policy or rotation', customer managed. If it says 'large data', think envelope encryption. If it says 'another Region', multi-Region key.",
    questionIds: [
      "q-kms-envelope-encryption-key-types-1",
      "q-kms-envelope-encryption-key-types-2",
      "q-kms-envelope-encryption-key-types-3",
    ],
  },
  {
    id: "s3-replication-performance",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "S3 Replication and Performance",
    shortName: "S3 replication & speed",
    tier: 2,
    domains: [2, 3],
    examImportance: "high",
    oneLiner:
      "S3 can copy objects to another bucket automatically, and you speed up large or distant transfers with multipart uploads, parallel requests and Transfer Acceleration.",
    englishExplanation:
      "S3 replication copies objects asynchronously from a source bucket to a destination bucket. Cross-Region Replication (CRR) targets another Region, for compliance, lower latency for distant users or disaster recovery. Same-Region Replication (SRR) copies within a Region, for example to aggregate logs or keep a separate-account copy. Both buckets need versioning enabled, S3 needs an IAM role to write to the destination, and the buckets can be in different accounts. Only objects created after the rule is enabled are replicated. Existing objects need S3 Batch Replication. Replication is not chained: if A replicates to B and B to C, objects from A do not reach C. Delete markers can be replicated optionally, but permanent version deletions are not. Replication Time Control adds a 15-minute service level objective with metrics for those who need it.\n\nFor performance, S3 scales to at least 3,500 write and 5,500 read requests per second per prefix, so spreading keys over several prefixes multiplies throughput. Multipart upload splits large objects into parts uploaded in parallel and retried independently. It is recommended above 100 MB and required above 5 GB. Byte-range fetches download parts of an object in parallel or retrieve only a header. Transfer Acceleration routes uploads through the nearest CloudFront edge location and then over the AWS backbone to the bucket, which helps when uploaders are far from the bucket's Region.\n\nTwo more features come up. Requester Pays makes the person downloading pay the request and transfer costs, useful for sharing large public data sets, and requires authenticated requesters. S3 Event Notifications send events for object creation or deletion to SNS, SQS, Lambda or EventBridge to trigger processing.",
    taglishExplanation:
      "Ang S3 replication ay awtomatikong kumokopya ng object mula source papunta destination bucket nang asynchronous. Ang CRR ay sa ibang Region, para sa compliance, mas mababang latency, o DR. Ang SRR ay sa parehong Region. Kailangang naka-enable ang versioning sa dalawang bucket at may IAM role ang S3. Bagong object lang ang kokopyahin pagkatapos i-enable, kaya para sa luma, gamitin ang S3 Batch Replication. Hindi ito chained: A papuntang B at B papuntang C, hindi aabot sa C ang galing sa A. Para sa bilis: multipart upload para sa malalaking file, required sa higit 5 GB. Ang Transfer Acceleration ay dumadaan sa pinakamalapit na edge location. Ang Requester Pays ay ang nagda-download ang magbabayad ng gastos.",
    analogy:
      "A publisher with a warehouse in one country that automatically ships a copy of each new book to a warehouse overseas (replication). Books already on the shelf before the standing order started need a one-off shipment. For giant orders, the publisher packs them into many boxes sent in parallel (multipart), and a distant customer drops off at the nearest depot where a fast courier takes over (Transfer Acceleration).",
    whyItExists:
      "Single-bucket storage cannot meet compliance rules for geographic copies or give distant users good latency, and uploading huge files in one stream is slow and fragile.",
    flow: "Object written to source bucket (versioning on) -> replication rule matches -> IAM role copies to destination bucket (CRR or SRR) ; big uploads: split into parts -> upload in parallel -> S3 assembles",
    withoutIt: [
      "You would script your own copy jobs for cross-Region or cross-account copies",
      "A large upload that fails would restart from zero",
      "Distant uploaders would suffer slow transfers over the public internet",
    ],
    bestUseCases: [
      "CRR for compliance copies in another Region and disaster recovery",
      "SRR to aggregate logs from several buckets or to keep a copy in a separate account",
      "Multipart upload for large files, with parallelism and resumability",
      "Transfer Acceleration for global uploaders to a single bucket",
      "Prefix design to increase request throughput",
    ],
    poorUseCases: [
      "Expecting replication of objects that existed before the rule",
      "Chaining replication from A to B to C",
      "Transfer Acceleration when uploaders are already close to the bucket Region",
      "Using replication as a backup against deletion, since delete markers can replicate",
    ],
    alternatives: [
      { need: "Policy-based backup with vault locks", choose: "AWS Backup" },
      { need: "Multi-Region access through one endpoint", choose: "S3 Multi-Region Access Points" },
      { need: "Move bulk data offline", choose: "AWS Snow Family" },
      { need: "Sync on-premises files to S3 on a schedule", choose: "AWS DataSync" },
    ],
    keyFeatures: [
      "CRR and SRR, asynchronous, require versioning on both buckets",
      "Cross-account replication with an IAM role, optional ownership override",
      "Replicates new objects only. Use S3 Batch Replication for existing",
      "Not transitive. Delete markers optionally replicated",
      "Replication Time Control: 15-minute objective with metrics",
      "3,500 PUT and 5,500 GET requests per second per prefix",
      "Multipart: recommended above 100 MB, required above 5 GB. Transfer Acceleration via edge locations",
    ],
    availability:
      "Replication gives you an independent copy, in another Region for CRR. It improves recovery options but is asynchronous, so a failure can lose very recent objects unless RTC is used.",
    security:
      "Replicas can use a different KMS key or owner. Encrypted objects (SSE-KMS) need explicit replication configuration and permissions on both keys.",
    pricingLogic:
      "You pay for storage in both buckets, replication PUT requests, and inter-Region transfer for CRR. Transfer Acceleration adds a per-GB fee that applies only when it is faster.",
    examKeywords: [
      "cross-Region replication",
      "versioning required",
      "existing objects",
      "compliance copy in another Region",
      "global uploads",
      "large file upload",
      "multipart",
      "Requester Pays",
    ],
    examTraps: [
      "Replication applies only to objects uploaded after the rule is created. Existing objects need Batch Replication.",
      "Versioning must be enabled on both source and destination buckets.",
      "Replication is not transitive across a chain of buckets.",
      "Replication is not a backup against deletion. Pair versioning with Object Lock or AWS Backup for that.",
    ],
    architectureDiagram: `[Source bucket us-east-1, versioned] --CRR--> [Destination bucket eu-west-1, versioned]
        ^                                                    (different account allowed)
        | Transfer Acceleration (nearest edge) + multipart in parallel
   Uploader in Asia`,
    architectureCaption: "Replication copies new objects across Regions, and acceleration plus multipart speeds distant uploads.",
    mentorTip:
      "For every replication question, check three things: is versioning on, are the objects new, and is the goal replication or backup?",
    questionIds: [
      "q-s3-replication-performance-1",
      "q-s3-replication-performance-2",
      "q-s3-replication-performance-3",
    ],
  },
  {
    id: "vpc-nat-egress-only-ipv6",
    moduleId: "phase-4-networking",
    category: "Networking and Content Delivery",
    title: "NAT Gateway, Egress-Only Gateway and IPv6 in a VPC",
    shortName: "NAT & IPv6",
    tier: 2,
    domains: [1, 2],
    examImportance: "high",
    oneLiner:
      "Private subnets reach the internet outbound-only through a NAT gateway for IPv4 and an egress-only internet gateway for IPv6, and you reach private servers with Session Manager instead of open ports.",
    englishExplanation:
      "Instances in a private subnet have no route to an internet gateway, so they cannot be reached from the internet. To let them download patches or call APIs, you add a route to a NAT gateway placed in a public subnet. The NAT gateway has an Elastic IP, is managed and scales automatically from 5 Gbps up to 100 Gbps, and is resilient inside one AZ only. For high availability, create one NAT gateway per AZ and route each AZ's private subnets to its own, which also avoids cross-AZ charges. A NAT instance is the old do-it-yourself option: you manage it, must disable the source and destination check, and it is a bottleneck and single point of failure. NAT gateways do not support security groups on themselves, though NACLs on their subnet apply.\n\nIPv6 changes the picture. IPv6 addresses in a VPC are globally unique and there is no NAT in the IPv4 sense. To allow outbound-only IPv6 traffic from private subnets, you use an egress-only internet gateway, which is stateful and blocks inbound connections initiated from the internet. A regular internet gateway would allow inbound IPv6 too. A dual-stack VPC has both IPv4 and IPv6 CIDRs, and the NAT gateway only handles IPv4 (with NAT64 and DNS64 available for IPv6-only clients reaching IPv4).\n\nFor administrative access to private instances, avoid exposing SSH or RDP. A bastion host in a public subnet works but needs open inbound ports and patching. AWS Systems Manager Session Manager gives shell access over an outbound HTTPS connection through the SSM agent, needs no inbound ports, no bastion and no keys, and logs sessions to CloudWatch or S3. Use VPC endpoints for SSM if the subnets have no NAT path.",
    taglishExplanation:
      "Ang instance sa private subnet ay walang route papunta sa internet gateway, kaya hindi ito maaabot mula sa internet. Para makapag-download ng patches, maglagay ng route papunta sa NAT gateway na nasa public subnet. May Elastic IP ito, awtomatikong nag-i-scale hanggang 100 Gbps, pero resilient lang sa loob ng isang AZ, kaya gumawa ng isa kada AZ. Ang NAT instance ay luma at ikaw ang mag-aasikaso. Sa IPv6, walang NAT: ang egress-only internet gateway ang gamit para outbound lang at hinaharang ang inbound mula sa internet. Para sa admin access, huwag mag-open ng SSH. Gamitin ang Session Manager na walang inbound port, walang bastion, at naka-log ang session.",
    analogy:
      "A staff-only office with no front door facing the street. The NAT gateway is a receptionist who makes outgoing phone calls on staff's behalf, so the outside world only ever sees the receptionist's number and cannot call a desk directly. The egress-only gateway is a one-way door for IPv6: people can walk out and come back with an answer, but strangers cannot walk in. Session Manager is a secure intercom instead of leaving a back door unlocked.",
    whyItExists:
      "Servers should not be directly reachable from the internet, yet they still need updates and outbound API access. NAT and egress-only gateways give that outbound path while keeping the inbound door shut.",
    flow: "Private instance -> route table -> NAT gateway (public subnet, Elastic IP) -> internet gateway -> internet ; IPv6: private instance -> egress-only internet gateway -> internet",
    withoutIt: [
      "Private instances could not patch themselves or call external APIs",
      "You would have to place servers in public subnets and expose them",
      "Admins would need open SSH ports to reach private servers",
    ],
    bestUseCases: [
      "A NAT gateway per AZ for resilient outbound IPv4 from private subnets",
      "An egress-only internet gateway for outbound-only IPv6",
      "Session Manager instead of bastion hosts for admin access",
      "VPC endpoints for AWS services to avoid NAT data charges",
      "Dual-stack VPCs to adopt IPv6 gradually",
    ],
    poorUseCases: [
      "One NAT gateway for all AZs when availability matters",
      "NAT gateway to allow inbound internet connections to private servers",
      "A NAT instance for new designs",
      "Sending heavy S3 or DynamoDB traffic through a NAT gateway when a gateway endpoint would be free",
    ],
    alternatives: [
      { need: "Private access to S3 or DynamoDB without NAT", choose: "Gateway VPC endpoint" },
      { need: "Private access to other AWS services", choose: "Interface VPC endpoint (PrivateLink)" },
      { need: "Shell access to private instances", choose: "SSM Session Manager" },
      { need: "Inbound access from the internet to a service", choose: "Load balancer in a public subnet" },
    ],
    keyFeatures: [
      "NAT gateway: managed, public subnet, Elastic IP, 5 to 100 Gbps, AZ-scoped",
      "One NAT gateway per AZ for high availability and to avoid cross-AZ traffic",
      "NAT instance: self-managed, requires source/destination check disabled",
      "Egress-only internet gateway: IPv6 outbound only, stateful",
      "IPv6 addresses are globally unique and have no NAT",
      "Dual-stack VPC: IPv4 and IPv6 CIDRs together",
      "Session Manager: no inbound ports, IAM-controlled, session logging",
    ],
    availability:
      "A NAT gateway is redundant within its AZ but not across AZs. Deploy one per AZ and route each AZ's private subnets to the local one.",
    security:
      "Private subnets plus NAT keep servers unreachable from the internet. Session Manager removes SSH key and inbound port risks, and sessions can be recorded and restricted by IAM.",
    pricingLogic:
      "A NAT gateway charges per hour and per GB processed, which can be a surprising cost for heavy traffic. Gateway endpoints for S3 and DynamoDB are free. The egress-only internet gateway has no hourly charge.",
    examKeywords: [
      "private subnet outbound internet access",
      "NAT gateway",
      "egress-only internet gateway",
      "IPv6 outbound only",
      "bastion host",
      "Session Manager",
      "high availability NAT",
    ],
    examTraps: [
      "NAT gateway is for IPv4. For IPv6 outbound-only, use an egress-only internet gateway.",
      "A NAT gateway lives in a public subnet and needs a route to an internet gateway.",
      "One NAT gateway is a single AZ resource. Per-AZ gateways are the highly available answer.",
      "If you see 'no inbound ports' and 'audit shell sessions', the answer is Session Manager, not a bastion host.",
    ],
    architectureDiagram: `AZ-a: [Private subnet] -> [NAT GW a (public subnet)] -> [Internet gateway] -> Internet
AZ-b: [Private subnet] -> [NAT GW b (public subnet)] -> [Internet gateway]
IPv6: [Private subnet] -> [Egress-only internet gateway] -> Internet (inbound blocked)
Admin: Session Manager (HTTPS out via SSM agent, no inbound ports)`,
    architectureCaption: "Outbound-only paths per AZ, and admin access without opening any inbound ports.",
    mentorTip:
      "IPv4 outbound from private: NAT gateway, one per AZ. IPv6 outbound from private: egress-only gateway. Admin access without open ports: Session Manager.",
    questionIds: [
      "q-vpc-nat-egress-only-ipv6-1",
      "q-vpc-nat-egress-only-ipv6-2",
      "q-vpc-nat-egress-only-ipv6-3",
    ],
  },
];
