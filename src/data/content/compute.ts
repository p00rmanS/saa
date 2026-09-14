import type { Lesson } from "@/lib/types";

export const computeLessons: Lesson[] = [
  // ============================================================
  // TIER 1
  // ============================================================
  {
    id: "amazon-ec2",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "Amazon EC2",
    shortName: "EC2",
    tier: 1,
    domains: [2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "Amazon EC2 gives you resizable virtual servers in the cloud that you fully control.",
    englishExplanation:
      "Amazon EC2 (Elastic Compute Cloud) is a virtual machine you rent from AWS. You choose the operating system, the CPU/memory size (the \"instance type\"), the storage attached to it, and the network it lives in. Unlike a physical server sitting in an office, an EC2 instance can be launched in minutes and terminated the moment you no longer need it.\n\nBecause you have full control of the operating system, EC2 is the most flexible AWS compute option — but that flexibility comes with responsibility. You patch the OS, you manage the runtime, and you decide how it scales. This is the classic trade-off the exam keeps testing: control and flexibility (EC2) versus less operational work (Lambda, Fargate, managed services).\n\nEC2 instances live inside a VPC subnet, get a private IP always, and a public IP only if you ask for one. They can be resized (vertical scaling) or you can run more of them behind a load balancer (horizontal scaling) — the second approach is what modern, resilient AWS architectures prefer.",
    taglishExplanation:
      "Isipin mo si EC2 parang nagre-rent ka ng computer sa AWS data center. Ikaw pa rin ang bahala mag-install ng OS updates, mag-configure ng security, at mag-decide kung gaano kalaki ang \"laki\" ng server (instance type). Kung malaki ang trapiko, puwede kang magdagdag ng mas malakas na server (vertical scaling) o magdagdag ng dami ng servers (horizontal scaling) — mas gusto ng AWS ang horizontal dahil kapag namatay ang isa, may iba pa.",
    analogy:
      "EC2 is like renting an apartment unit instead of buying a house. AWS owns the building (data center) and the physical infrastructure, but once you move in, you decorate it, you maintain the inside, and you decide who else can enter (security groups, keys). If you need more space, you can rent a bigger unit (resize) or rent more units (add more instances).",
    whyItExists:
      "Before EC2, companies had to buy, rack, cable, and maintain physical servers months before they even launched a product, and capacity was fixed for years. EC2 removes that upfront cost and lead time — you can launch a server in minutes and pay only while it runs.",
    flow: "User -> Route 53 -> ALB -> EC2 (Auto Scaling Group, multi-AZ) -> RDS",
    withoutIt: [
      "You would need to buy and manage physical servers, which take weeks to procure",
      "Capacity would be fixed — you could not scale up quickly for a traffic spike",
      "You would be responsible for the physical hardware failing, not just the software",
    ],
    bestUseCases: [
      "Custom applications that need full OS-level control",
      "Lift-and-shift migrations of existing on-premises servers",
      "Workloads with specific licensing, kernel, or driver requirements",
      "Long-running applications where you want to manage the runtime yourself",
      "Steady-state workloads that benefit from Reserved Instance/Savings Plan pricing",
    ],
    poorUseCases: [
      "Short, bursty, event-driven tasks — Lambda usually has less operational overhead",
      "Teams that explicitly want \"no server management\" — prefer Fargate or managed services",
      "Workloads that only need to run for seconds at a time (idle EC2 still costs money)",
    ],
    alternatives: [
      { need: "Run code without managing a server", choose: "AWS Lambda" },
      { need: "Run containers without managing EC2 instances", choose: "AWS Fargate" },
      { need: "Managed Kubernetes control plane", choose: "Amazon EKS" },
      { need: "Fully managed relational database instead of self-hosting on EC2", choose: "Amazon RDS" },
    ],
    keyFeatures: [
      "Multiple instance families optimized for compute, memory, storage, or GPU workloads",
      "On-Demand, Reserved Instances, Savings Plans, and Spot purchasing options",
      "Amazon Machine Images (AMIs) to launch pre-configured instances repeatably",
      "User data scripts for bootstrapping at launch",
      "Elastic Network Interfaces (ENIs) and instance metadata service",
      "Stop/start/reboot/terminate lifecycle plus hibernation for supported instances",
    ],
    availability:
      "An EC2 instance itself runs in a single Availability Zone — if that AZ has a problem, that specific instance is affected. High availability is achieved architecturally, not by the instance itself: run multiple instances across multiple AZs behind a load balancer, and use an Auto Scaling group to replace unhealthy instances automatically. EC2 is stateful by default (anything on the local/instance-store disk is lost on stop/terminate), so resilient architectures treat instances as replaceable and keep state in EBS, S3, or a database instead.",
    security:
      "Access to the instance's OS is controlled by key pairs (SSH/RDP) — never hardcode credentials on the box. Network access is controlled by security groups (stateful, instance-level firewall) and subnet placement (public vs private). Permissions to call other AWS services should be granted through an IAM role attached to the instance, never long-lived access keys stored on disk. EBS volumes and AMIs can be encrypted with KMS.",
    pricingLogic:
      "On-Demand pricing is billed per second/hour while the instance is running, based on instance type and Region. Reserved Instances and Savings Plans trade a 1- or 3-year commitment for a lower rate on steady-state workloads. Spot Instances offer the deepest discount for interruptible workloads because AWS can reclaim the capacity with short notice. You also pay separately for attached EBS storage and data transfer.",
    examKeywords: [
      "virtual server",
      "instance type",
      "AMI",
      "user data",
      "full control of the OS",
      "lift and shift",
    ],
    examTraps: [
      "An idle EC2 instance still costs money — it is not \"pay only when code runs\" like Lambda.",
      "EC2 is AZ-scoped by default; do not assume a single instance is highly available.",
      "\"Least operational overhead\" wording usually points away from self-managed EC2 toward serverless or managed services.",
    ],
    architectureDiagram:
      "Users\n  |\nRoute 53\n  |\nApplication Load Balancer\n /          \\\nEC2 (AZ-a)   EC2 (AZ-b)\n \\          /\n   RDS Multi-AZ",
    architectureCaption:
      "A resilient EC2 tier never relies on one instance: an Auto Scaling group spreads instances across AZs behind a load balancer.",
    mentorTip:
      "If a question says \"the company wants full control over the operating system and installed software,\" that is your signal for EC2 over Lambda/Fargate — but still check whether it also says \"minimum operational overhead,\" which would push you back toward a managed option.",
    questionIds: ["q-amazon-ec2-1", "q-amazon-ec2-2", "q-amazon-ec2-3", "q-amazon-ec2-4", "q-amazon-ec2-5"],
  },

  {
    id: "ec2-auto-scaling",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "Amazon EC2 Auto Scaling",
    shortName: "Auto Scaling",
    tier: 1,
    domains: [2, 4],
    examImportance: "critical",
    oneLiner:
      "EC2 Auto Scaling automatically launches or terminates EC2 instances so your fleet always matches demand, and replaces unhealthy instances on its own.",
    englishExplanation:
      "An Auto Scaling group (ASG) is a logical collection of EC2 instances that AWS keeps at a size you define — between a minimum and a maximum, targeting a desired capacity. Instances are launched from a launch template (instance type, AMI, security groups, IAM role, user data), so every new instance is identical to the ones before it.\n\nASG does two jobs at once: elasticity and self-healing. For elasticity, scaling policies watch a metric (usually a CloudWatch metric like average CPU utilization or ALB request count per target) and add or remove instances to keep that metric near a target — this is target tracking scaling, the option AWS usually recommends because you just say \"keep CPU near 50%\" and AWS works out the rest. Step scaling and scheduled scaling exist for more specific patterns (e.g., scale up every day at 8am before a known traffic spike).\n\nFor self-healing, the ASG continuously checks instance health (EC2 status checks, and ELB health checks if attached to a load balancer) and automatically terminates and replaces any instance that fails. This means an Auto Scaling group, not a single EC2 instance, is really the unit of resilience in a well-designed AWS architecture — instances are treated as disposable, and state is kept outside them.",
    taglishExplanation:
      "Auto Scaling ang \"nagbabantay\" sa dami ng servers mo. Kapag tumaas ang trapiko (halimbawa CPU usage), automatic magdadagdag ito ng bagong EC2 instances gamit ang launch template mo. Kapag bumaba naman ang trapiko, automatic din siyang mag-tanggal ng mga hindi na kailangan para di ka overspend. Bonus pa, kapag namatay o nag-fail ang health check ng isang instance, papalitan agad ito ng ASG ng bago — parang may automatic na \"replacement crew\" laging naka-standby.",
    analogy:
      "Think of a call center manager who watches the number of incoming calls in real time. If calls spike, the manager quickly brings in more agents from a pool of identically trained staff (the launch template). If calls die down, extra agents are sent home to save cost. If an agent falls sick mid-shift, the manager immediately calls in a replacement so service never actually stops.",
    whyItExists:
      "Manually watching dashboards and launching/terminating EC2 instances does not scale (pun intended) and reacts too slowly to real traffic spikes, and humans also forget to remove unhealthy instances. Auto Scaling automates both the elasticity and the self-healing so applications stay available and cost-efficient without a human in the loop.",
    flow: "CloudWatch Alarm (metric threshold) -> Scaling Policy -> Auto Scaling Group -> Launch Template -> New EC2 Instance -> Registered with Target Group / ALB",
    withoutIt: [
      "Engineers would have to manually launch instances during traffic spikes, reacting too slowly",
      "Unhealthy instances would keep serving broken traffic until someone notices and fixes them",
      "You would either over-provision (waste money) or under-provision (outages) most of the time",
    ],
    bestUseCases: [
      "Web/application tiers with variable or unpredictable traffic",
      "Fleets that need automatic replacement of failed instances for high availability",
      "Cost optimization by scaling in during off-peak hours and scaling out for known peak times",
      "Combining with Spot Instances for fault-tolerant, cost-optimized batch or stateless workloads",
    ],
    poorUseCases: [
      "Single, stateful legacy applications that cannot run more than one identical copy",
      "Workloads where instances must retain unique local state that cannot survive replacement",
      "Extremely short-lived, event-driven tasks — a Lambda function has less to manage than an ASG",
    ],
    alternatives: [
      { need: "Auto scaling for containers instead of raw EC2 instances", choose: "ECS Service Auto Scaling / Fargate" },
      { need: "Scaling that happens per-request with zero idle capacity", choose: "AWS Lambda" },
      { need: "Scale a managed database's read capacity", choose: "RDS Read Replicas / Aurora Auto Scaling" },
    ],
    keyFeatures: [
      "Launch templates define exactly what a new instance looks like",
      "Min / Max / Desired capacity settings define the size boundaries",
      "Target tracking, step scaling, scheduled scaling, and predictive scaling policies",
      "Multi-AZ distribution for high availability",
      "Integrates with ELB health checks, not just EC2 status checks",
      "Lifecycle hooks to run custom actions before an instance goes into/out of service",
      "Warm pools to keep pre-initialized instances ready for faster scale-out",
      "Mixed instances policy — combine instance types and On-Demand/Spot in one ASG",
    ],
    availability:
      "An Auto Scaling group should always span multiple Availability Zones so that the loss of one AZ does not take down the whole fleet — the ASG will keep trying to maintain desired capacity by launching replacement instances in the healthy AZs.",
    security:
      "The launch template's IAM instance profile controls what the new instances can do — always use the least-privilege role rather than long-lived credentials. Security groups defined in the launch template apply to every instance the ASG creates, keeping the fleet consistently configured.",
    pricingLogic:
      "There is no extra charge for the Auto Scaling group itself — you pay only for the underlying EC2 instances (and their EBS storage) it launches, at whatever purchasing option (On-Demand, Reserved, Spot) you configured.",
    examKeywords: [
      "desired capacity",
      "launch template",
      "target tracking",
      "scaling policy",
      "self-healing",
      "multi-AZ",
    ],
    examTraps: [
      "An Auto Scaling group is not a load balancer — it usually works together with one, but they are separate services.",
      "By default the ASG uses EC2 status checks; you must explicitly enable ELB health checks to replace instances that are unhealthy from the load balancer's point of view but pass basic EC2 checks.",
      "Scaling in does not automatically wait for in-flight requests to finish unless you configure connection draining (deregistration delay) on the target group.",
    ],
    architectureDiagram:
      "CloudWatch Alarm (CPU > 70%)\n        |\n  Scaling Policy\n        |\nAuto Scaling Group (min:2 max:6 desired:2)\n   /        |        \\\nEC2(AZ-a) EC2(AZ-b) EC2(AZ-c, new)\n        |\n  Application Load Balancer",
    architectureCaption:
      "The ASG watches a CloudWatch alarm and launches new instances from the launch template, spread across AZs, registering them behind the load balancer.",
    mentorTip:
      "When a question mentions \"automatically replace unhealthy instances\" or \"maintain a minimum number of running instances,\" that is Auto Scaling, not the load balancer. The load balancer distributes traffic; the ASG decides how many instances exist.",
    questionIds: ["q-ec2-auto-scaling-1", "q-ec2-auto-scaling-2", "q-ec2-auto-scaling-3", "q-ec2-auto-scaling-4", "q-ec2-auto-scaling-5"],
  },

  {
    id: "elastic-load-balancing",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "Elastic Load Balancing (ALB, NLB, Gateway Load Balancer)",
    shortName: "ELB",
    tier: 1,
    domains: [2, 3],
    examImportance: "critical",
    oneLiner:
      "Elastic Load Balancing automatically distributes incoming traffic across multiple targets, and AWS offers different load balancer types for different layers of the network stack.",
    englishExplanation:
      "Elastic Load Balancing (ELB) is the umbrella name for AWS's managed load balancers. Instead of picking one load balancer and moving on, the exam expects you to know that AWS gives you three current types, each solving a different problem, plus the older Classic Load Balancer you should recognize as legacy.\n\nApplication Load Balancer (ALB) operates at Layer 7 (HTTP/HTTPS). Because it understands the actual web request, it can route based on URL path, hostname, HTTP header, query string, or method — this is called content-based routing, and it lets one ALB serve many microservices or applications. ALB also supports WebSockets, HTTP/2, gRPC, and can send traffic directly to Lambda functions as targets, not just EC2 or IP addresses. Use ALB whenever the traffic is genuinely HTTP/HTTPS and you need smart, content-aware routing.\n\nNetwork Load Balancer (NLB) operates at Layer 4 (TCP/UDP/TLS). It does not look at the content of the request — it just forwards connections — which makes it extremely fast and able to handle very high, volatile throughput with ultra-low latency. NLB also gives you a static IP (or Elastic IP) per Availability Zone, which ALB cannot do, and it preserves the client's source IP address by default. Use NLB when you need raw performance, non-HTTP protocols, or a fixed IP that firewall rules or legacy clients require.\n\nGateway Load Balancer (GWLB) is a different kind of animal entirely: it operates at Layer 3/4 and is built for deploying and scaling third-party virtual network appliances — firewalls, intrusion detection/prevention systems, deep packet inspection — transparently in front of your traffic. It combines a transparent gateway with load balancing, using the GENEVE protocol on port 6081, and is typically consumed through Gateway Load Balancer Endpoints (GWLBe) placed in a VPC so traffic can be inspected without the application even being aware an appliance is in the path. The exam clue is any mention of \"third-party firewall/appliance\" or \"traffic inspection\" — that is GWLB, not ALB or NLB.",
    taglishExplanation:
      "Tatlo ang \"klase\" ng load balancer na dapat mong kabisaduhin. Kung web traffic (HTTP/HTTPS) at kailangan mong mag-route base sa URL path o hostname (parang traffic cop na tumitingin sa laman ng request), ALB ang gamitin — Layer 7 siya. Kung kailangan mo ng sobrang bilis, static IP, o hindi HTTP ang protocol (raw TCP/UDP), NLB ang sagot — Layer 4 siya at mabilis dahil hindi na siya \"nagbabasa\" ng laman ng request. Kung ang kailangan mo naman ay maglagay ng third-party firewall o appliance sa gitna ng traffic para i-inspect ito nang hindi napapansin ng application, Gateway Load Balancer (GWLB) ang gamitin. Sa exam, hanapin mo ang keyword: \"path-based routing\" = ALB, \"extreme performance / static IP\" = NLB, \"firewall appliance / traffic inspection\" = GWLB.",
    analogy:
      "ALB is like a smart receptionist who reads your request and directs you to the right department based on what you actually said (\"billing? third floor\"). NLB is like a subway turnstile — it does not care what you are carrying, it just passes you through as fast as possible at massive scale. GWLB is like a mandatory security checkpoint installed transparently along a hallway — everyone passes through it and gets inspected without needing to know it is even there.",
    whyItExists:
      "A single server (or even a single instance's IP) is a single point of failure and a scaling bottleneck. Load balancers exist to spread traffic across many healthy targets, hide the number/identity of the backend instances from clients, and give you one stable endpoint (DNS name) even as the backend fleet grows, shrinks, or gets replaced.",
    flow: "Client -> Route 53 -> Load Balancer (ALB/NLB/GWLB) -> Target Group -> EC2 / IP / Lambda / Appliance",
    withoutIt: [
      "Clients would need to know every backend IP directly, and that list changes as instances scale",
      "One overloaded or failed server could take down the whole application",
      "You could not do zero-downtime deployments by shifting traffic between target groups",
    ],
    bestUseCases: [
      "ALB: web applications, microservices, container-based apps needing path/host-based routing",
      "NLB: gaming, IoT, financial systems, or any workload needing extreme throughput, low latency, or a static IP",
      "GWLB: inserting third-party firewalls, IDS/IPS, or deep packet inspection appliances transparently",
      "Any architecture needing multi-AZ high availability with automatic health checks and failover",
    ],
    poorUseCases: [
      "Using NLB when you actually need content-based (path/host) routing — it cannot read HTTP content",
      "Using ALB when you need a fixed IP address per AZ for firewall allow-listing — use NLB instead",
      "Using GWLB for ordinary application load balancing — it is purpose-built for appliance insertion, not general web traffic",
    ],
    alternatives: [
      { need: "Global DNS-level routing/failover across Regions", choose: "Amazon Route 53" },
      { need: "Content delivery/caching at the edge", choose: "Amazon CloudFront" },
      { need: "API-specific features like throttling, API keys, request validation", choose: "Amazon API Gateway" },
    ],
    keyFeatures: [
      "ALB: path-based, host-based, header-based routing; supports Lambda targets; HTTP/2 and WebSocket",
      "NLB: static/Elastic IP per AZ, preserves source IP, handles sudden traffic spikes at very high throughput",
      "GWLB: GENEVE protocol on port 6081, paired with Gateway Load Balancer Endpoints for transparent inspection",
      "All types: cross-zone load balancing, health checks, integration with Auto Scaling groups and target groups",
      "Target groups can point to EC2 instances, IP addresses, Lambda functions (ALB only), or appliances (GWLB)",
      "TLS termination supported on ALB and NLB (TLS listener)",
    ],
    availability:
      "All ELB types are Regional services that span multiple Availability Zones by design — you enable at least two AZs when you create one, and it automatically routes only to healthy targets, removing unhealthy ones from rotation based on health checks.",
    security:
      "ALB and NLB (in most configurations) sit behind security groups that you control on the load balancer itself and/or the targets; GWLB traffic security is handled by the appliance it fronts. TLS certificates can be attached via AWS Certificate Manager. For ALB, AWS WAF can be attached directly to inspect and filter HTTP traffic.",
    pricingLogic:
      "You pay an hourly rate for the load balancer plus a usage-based dimension: Load Balancer Capacity Units (LCU) for ALB/NLB, which factor in new connections, active connections, bandwidth, and (for ALB) rule evaluations. GWLB pricing is based on hourly rate plus GWLBe data processed.",
    examKeywords: [
      "Layer 7 vs Layer 4",
      "path-based routing",
      "host-based routing",
      "static IP per AZ",
      "preserve source IP",
      "GENEVE",
      "third-party appliance",
      "traffic inspection",
    ],
    examTraps: [
      "\"Needs a static IP address\" almost always means NLB, not ALB — ALB only gives you a DNS name.",
      "\"Route based on URL path/hostname\" is ALB territory; NLB cannot see HTTP content at all.",
      "Seeing \"firewall\", \"IDS/IPS\", or \"deep packet inspection appliance\" in a question is the signal for Gateway Load Balancer, a trap many candidates miss by defaulting to ALB/NLB.",
      "Classic Load Balancer (CLB) still appears as a distractor — treat it as legacy/deprecated-in-spirit and prefer ALB/NLB in new designs.",
    ],
    architectureDiagram:
      "                Client\n                  |\n              Route 53\n         /        |         \\\n       ALB        NLB       GWLB\n     (Layer 7)  (Layer 4)  (L3/L4 + GENEVE)\n       |            |            |\n  Target Group  Target Group  GWLB Endpoint\n   (path-based)  (static IP)   -> Firewall Appliance -> back to VPC",
    architectureCaption:
      "Three load balancer types solve three different problems: content routing (ALB), raw performance/static IP (NLB), and transparent appliance insertion (GWLB).",
    mentorTip:
      "Build yourself a 3-word trigger map: ALB = \"path/host routing\", NLB = \"static IP / extreme performance / non-HTTP\", GWLB = \"firewall/appliance/inspection\". Ninety percent of ELB exam questions are solved just by matching the scenario to one of those three phrases.",
    questionIds: ["q-elastic-load-balancing-1", "q-elastic-load-balancing-2", "q-elastic-load-balancing-3", "q-elastic-load-balancing-4", "q-elastic-load-balancing-5"],
  },

  {
    id: "aws-lambda",
    moduleId: "phase-2-compute",
    category: "Serverless",
    title: "AWS Lambda",
    shortName: "Lambda",
    tier: 1,
    domains: [2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "AWS Lambda runs your code in response to events without you provisioning or managing any servers, and you only pay while the code actually executes.",
    englishExplanation:
      "AWS Lambda is a serverless, event-driven compute service. You upload a function (code plus its dependencies), and AWS runs it in response to triggers — an API Gateway request, an S3 upload, a DynamoDB stream, an SQS message, an EventBridge schedule, and dozens of other event sources. You never provision, patch, or scale a server; AWS handles all of that behind the scenes, spinning up as many parallel executions as needed.\n\nBilling is by the millisecond of execution time and the memory allocated, plus the number of invocations. If nothing triggers your function, you pay nothing at all — this is fundamentally different from EC2, where an idle instance still costs money. Each Lambda function also has a maximum execution duration (currently 15 minutes), so it's built for tasks that finish relatively quickly, not long-running processes.\n\nA key exam concept is the cold start: the first time a function runs (or after it has been idle), AWS needs to initialize the execution environment, which adds latency. Frequent, back-to-back invocations reuse a \"warm\" environment and skip that overhead. Lambda also has a concurrency model — by default it scales out automatically to handle concurrent invocations, but you can configure reserved concurrency (guarantee/limit capacity for a function) and provisioned concurrency (keep environments pre-initialized to avoid cold starts for latency-sensitive workloads).",
    taglishExplanation:
      "Sa Lambda, hindi mo na kailangang mag-alala sa server — basta i-upload mo lang ang code mo, at tatakbo ito kapag may nag-trigger (halimbawa may na-upload sa S3, may request sa API Gateway, o may bagong laman sa DynamoDB). Bayad ka lang habang tumatakbo ang code — kung walang trigger, wala kang bayad, kaibahan siya sa EC2 na kahit idle, may bayad pa rin. May tinatawag na \"cold start\" — kapag matagal nang hindi tumatakbo ang function, may konting delay sa unang pagpapatakbo dahil kailangan mag-initialize muna ng environment. Meron ding max na tagal ng pagtakbo ng isang Lambda invocation (kasalukuyang 15 minutes), kaya hindi ito para sa matagalang batch jobs.",
    analogy:
      "Lambda is like calling a taxi instead of owning a car. You do not maintain the vehicle, park it, or pay for it when you are not using it — you just call one when you need a ride (an event happens), pay for the trip, and it's gone when you're done. If ten people need rides at once, more taxis simply show up (automatic scaling) instead of one taxi trying to serve everyone.",
    whyItExists:
      "Many workloads are event-driven and bursty — a file gets uploaded, an API call comes in, a schedule fires — and running a full-time EC2 instance just to wait for those moments wastes money and operational effort. Lambda removes both the idle cost and the server management, letting developers focus purely on code.",
    flow: "Event Source (S3 / API Gateway / EventBridge / SQS) -> Lambda Function -> Downstream Service (DynamoDB / SNS / another Lambda)",
    withoutIt: [
      "You would need an always-on server (EC2) just waiting for occasional events, wasting money",
      "You would be responsible for patching, scaling, and managing that server yourself",
      "Building fine-grained, per-function scaling would require much more custom infrastructure",
    ],
    bestUseCases: [
      "Event-driven processing: S3 uploads, DynamoDB Streams, Kinesis, SQS/SNS messages",
      "Backend for APIs via API Gateway, especially with unpredictable or spiky traffic",
      "Scheduled/cron-style automation tasks via Amazon EventBridge",
      "Lightweight data transformation/ETL steps and glue code between services",
      "Short-lived microservices where minimizing operational overhead is a priority",
    ],
    poorUseCases: [
      "Long-running processes that exceed the maximum function timeout",
      "Applications requiring a persistent, stateful, always-warm connection or custom OS/kernel access",
      "Very high, sustained, steady-state compute where EC2 Reserved/Savings Plans pricing would be cheaper",
    ],
    alternatives: [
      { need: "Full control of the operating system", choose: "Amazon EC2" },
      { need: "Long-running or GPU-heavy containerized workloads without managing servers", choose: "AWS Fargate" },
      { need: "Batch/HPC-style jobs with flexible runtime and custom compute environments", choose: "AWS Batch" },
    ],
    keyFeatures: [
      "Automatic scaling per-request with no capacity planning required",
      "Pay-per-use billing measured in milliseconds and memory allocated",
      "Broad set of event source integrations across the AWS ecosystem",
      "Configurable memory (which also scales CPU/network proportionally) and timeout",
      "Reserved concurrency and provisioned concurrency for predictable performance",
      "Support for container images as the deployment package, in addition to zip archives",
      "Lambda Layers for sharing common code/dependencies across functions",
    ],
    availability:
      "Lambda automatically runs your function across multiple Availability Zones within a Region without any configuration on your part — you do not choose or manage the underlying servers or AZs.",
    security:
      "Each Lambda function runs with an IAM execution role that defines exactly what AWS resources it can access — always scope this role to least privilege. Functions can be placed inside a VPC to reach private resources (like an RDS database), at the cost of some additional networking setup. Environment variables can hold configuration and can be encrypted with KMS.",
    pricingLogic:
      "You pay per request (number of invocations) plus GB-seconds (memory allocated multiplied by execution duration, rounded to the nearest millisecond). There is a perpetual free tier of monthly requests and compute time. Provisioned concurrency has its own separate charge because it keeps environments warm even when idle.",
    examKeywords: [
      "serverless",
      "event-driven",
      "pay per invocation",
      "no server management",
      "cold start",
      "concurrency",
      "least operational overhead",
    ],
    examTraps: [
      "\"Least operational overhead\" combined with short/event-driven logic almost always points to Lambda over EC2 or even Fargate.",
      "Lambda has a maximum execution duration — a workload that runs for hours is not a fit and points to EC2, Fargate, or Batch instead.",
      "Cold starts can matter for latency-sensitive APIs — provisioned concurrency (not just \"more memory\") is the fix, not switching purchasing options like Reserved Instances (which don't apply to Lambda at all).",
    ],
    architectureDiagram:
      "S3 Bucket (upload)\n     |\n  Event Notification\n     |\n AWS Lambda Function\n     |\n  DynamoDB Table",
    architectureCaption:
      "A classic serverless pattern: an S3 upload event triggers a Lambda function that processes the file and writes results to DynamoDB — no server ever provisioned.",
    mentorTip:
      "Whenever a scenario says a task is short, event-driven, and the company wants to avoid managing servers or capacity, default your thinking to Lambda first, then check if anything (long duration, need for full OS access, needs GPU, needs to run continuously) rules it out.",
    questionIds: ["q-aws-lambda-1", "q-aws-lambda-2", "q-aws-lambda-3", "q-aws-lambda-4", "q-aws-lambda-5"],
  },

  {
    id: "aws-fargate",
    moduleId: "phase-2-compute",
    category: "Serverless",
    title: "AWS Fargate",
    shortName: "Fargate",
    tier: 1,
    domains: [2, 3, 4],
    examImportance: "critical",
    oneLiner:
      "AWS Fargate is a serverless compute engine for containers that runs your ECS or EKS tasks without you provisioning or managing any EC2 instances.",
    englishExplanation:
      "Normally, running containers on ECS or EKS means you also manage a fleet of EC2 instances underneath them (the \"EC2 launch type\") — you patch the instances' OS, size the fleet, and worry about bin-packing containers efficiently onto them. Fargate removes that entire layer: you define your container's CPU and memory needs in the task definition, and AWS runs the container on infrastructure it manages completely, without you ever seeing or touching an EC2 instance.\n\nThis makes Fargate the \"serverless\" launch type for both Amazon ECS and Amazon EKS. Each task (or pod, in EKS terms) gets its own isolated compute environment, which also improves security isolation compared to multiple containers sharing one EC2 host. The trade-off is less control — you cannot SSH into the underlying host, install custom host-level agents, or use certain networking/storage options that require direct EC2 access.\n\nFargate is billed based on the vCPU and memory resources requested by each task, from the moment the image starts downloading until the task stops — no charge for idle EC2 capacity sitting around waiting for containers, unlike the EC2 launch type where you pay for the instances whether or not they are fully utilized.",
    taglishExplanation:
      "Kapag ECS o EKS na may EC2 launch type, ikaw pa rin ang nagme-manage ng mga EC2 instances sa ilalim — parang may sasakyan kang kailangan pang paggasolinahan at ipa-service. Sa Fargate, wala ka nang instance na aalagaan — sasabihin mo lang kung gaano kalaki (CPU/memory) ang kailangan ng container mo, at bahala na si AWS mag-provide ng compute para dun. Bayad ka lang base sa resources na ginamit ng container, hindi sa buong EC2 instance na baka hindi naman fully utilized.",
    analogy:
      "Running containers with the EC2 launch type is like owning a fleet of delivery vans that you maintain, fuel, and park yourself, even on days with few deliveries. Fargate is like using a courier service where you just say \"deliver this package, this size, this weight\" and pay only for that specific delivery — no vehicle to own or maintain at all.",
    whyItExists:
      "Container orchestration solved the problem of packaging and running applications consistently, but teams still had to manage the EC2 fleet underneath — sizing it, patching it, and making sure containers were packed efficiently. Fargate removes that operational layer entirely so teams can focus on containers, not servers.",
    flow: "Developer pushes image -> Amazon ECR -> ECS/EKS Task Definition (Fargate launch type) -> Fargate runs the task -> Load Balancer routes traffic to the task",
    withoutIt: [
      "You would need to size, launch, and patch an EC2 fleet to host your containers",
      "You would risk wasted capacity from imperfect bin-packing of containers onto instances",
      "Isolating workloads from each other at the host level would require more manual design",
    ],
    bestUseCases: [
      "Containerized applications where the team wants zero EC2 management",
      "Workloads with variable or unpredictable container counts",
      "Multi-tenant or security-sensitive workloads that benefit from per-task isolation",
      "Batch or event-driven containerized jobs that should not require standing infrastructure",
    ],
    poorUseCases: [
      "Workloads needing direct access to the underlying host, custom kernel modules, or host-level daemons",
      "Extremely cost-sensitive, high-density workloads where efficient bin-packing on owned EC2 Reserved capacity is cheaper",
      "GPU workloads or specialized hardware needs not supported by Fargate",
    ],
    alternatives: [
      { need: "Full control over the EC2 instances running your containers", choose: "ECS or EKS with the EC2 launch type" },
      { need: "Run code directly without any container packaging", choose: "AWS Lambda" },
      { need: "On-premises container orchestration control plane in AWS", choose: "Amazon ECS Anywhere / EKS Anywhere" },
    ],
    keyFeatures: [
      "No EC2 instances to provision, patch, or scale",
      "Works as a launch type for both Amazon ECS and Amazon EKS",
      "Per-task/per-pod resource isolation (its own kernel-level boundary)",
      "Billing based on vCPU and memory requested per task, by the second",
      "Integrates with Application Load Balancer/Network Load Balancer for traffic distribution",
      "Supports Fargate Spot for interruptible, cost-optimized workloads",
    ],
    availability:
      "Fargate tasks can be spread across multiple Availability Zones the same way EC2-backed tasks can, by configuring the service to launch tasks into multiple subnets/AZs — high availability is a design choice at the service/task level, not automatic just because Fargate is serverless.",
    security:
      "Each Fargate task runs in its own isolated compute boundary, which reduces the \"noisy neighbor\" and container-escape blast radius compared to packing many containers on one EC2 host. IAM task roles (not instance roles) grant the container's permissions, and security groups can be applied per task via awsvpc networking mode.",
    pricingLogic:
      "You are billed per second for the vCPU and memory you configure for each task/pod, from image pull/start until the task stops. There is no separate EC2 instance charge. Fargate Spot offers a discount for workloads that can tolerate interruption.",
    examKeywords: [
      "serverless containers",
      "no EC2 to manage",
      "task definition",
      "per-task isolation",
      "Fargate launch type",
    ],
    examTraps: [
      "\"Run containers without managing servers\" is the textbook Fargate clue — do not default to the EC2 launch type when that phrase appears.",
      "Fargate is a launch type, not a separate orchestrator — it still runs on top of ECS or EKS, which manage the scheduling and desired state.",
      "Fargate does not give you SSH/host access — a requirement for host-level customization rules it out.",
    ],
    architectureDiagram:
      "Amazon ECR (container image)\n        |\nECS Service (Fargate launch type)\n   /            \\\nTask (AZ-a)   Task (AZ-b)\n   \\            /\n  Application Load Balancer",
    architectureCaption:
      "Fargate runs the ECS tasks directly — there is no EC2 instance layer visible or managed by the customer in this diagram.",
    mentorTip:
      "If the scenario is \"containers\" plus \"we don't want to manage servers/instances,\" that combination is Fargate. If it says \"containers\" plus \"we need control over the host or specific instance types,\" that's the EC2 launch type instead.",
    questionIds: ["q-aws-fargate-1", "q-aws-fargate-2", "q-aws-fargate-3", "q-aws-fargate-4", "q-aws-fargate-5"],
  },

  {
    id: "amazon-ecs",
    moduleId: "phase-7-containers",
    category: "Containers",
    title: "Amazon ECS",
    shortName: "ECS",
    tier: 1,
    domains: [2, 3],
    examImportance: "critical",
    oneLiner:
      "Amazon Elastic Container Service (ECS) is AWS's own container orchestration service for running and scaling Docker containers without needing Kubernetes.",
    englishExplanation:
      "Amazon ECS lets you define containerized applications as task definitions (which image, how much CPU/memory, networking, IAM role) and run them as tasks or long-running services inside a cluster. ECS handles scheduling containers onto compute, restarting failed tasks, and integrating with load balancers, service discovery, and auto scaling — all using AWS's own orchestration engine rather than Kubernetes.\n\nECS supports two launch types: the EC2 launch type, where you manage the underlying EC2 instances (the \"container instances\") that host the containers, and the Fargate launch type, where AWS runs the containers without you managing any servers at all. Because ECS is a native AWS service, it integrates very tightly and simply with IAM, CloudWatch, ALB/NLB, and other AWS services — generally with a gentler learning curve than Kubernetes-based EKS.\n\nA typical exam distinction: choose ECS when the team wants AWS-native container orchestration without the complexity of Kubernetes; choose EKS when the team specifically needs Kubernetes (perhaps due to existing Kubernetes tooling, multi-cloud portability, or team expertise).",
    taglishExplanation:
      "Si ECS ang \"sariling\" container orchestrator ng AWS — hindi siya Kubernetes, pero ginagawa niya ang parehong trabaho: pinapatakbo, sinusubaybayan, at ino-orchestrate ang mga containers mo. May dalawang paraan mag-run: EC2 launch type (ikaw pa rin ang nagma-manage ng mga EC2 instances sa likod) o Fargate launch type (wala ka nang instance na aalagaan). Kapag sinabing gusto ng team ang simple, AWS-native na container solution na walang Kubernetes complexity, ECS ang sagot.",
    analogy:
      "ECS is like a restaurant's own in-house scheduling system for its kitchen staff — built specifically for that restaurant, simple to configure, and tightly integrated with everything else the restaurant already uses. It gets the job done without needing an industry-standard scheduling framework (Kubernetes) that a chain of many different restaurants (multi-cloud) might prefer instead.",
    whyItExists:
      "Before container orchestration, teams manually placed containers on servers, tracked their health, and wired up networking and load balancing by hand. ECS automates all of that using AWS-native building blocks, letting teams run containerized applications reliably at scale without adopting the operational complexity of a full Kubernetes control plane.",
    flow: "Developer pushes image -> Amazon ECR -> ECS Task Definition -> ECS Service (EC2 or Fargate launch type) -> ALB/NLB -> Clients",
    withoutIt: [
      "You would need to build your own scheduler to place containers on hosts and monitor their health",
      "Rolling deployments, service discovery, and load balancer integration would need custom tooling",
      "Scaling containers up/down in response to load would require manual scripting",
    ],
    bestUseCases: [
      "Teams wanting AWS-native container orchestration without adopting Kubernetes",
      "Microservices architectures needing service discovery and load-balanced deployments",
      "Batch or scheduled containerized jobs",
      "Migrating existing Docker workloads into a managed, scalable environment",
    ],
    poorUseCases: [
      "Teams that specifically require Kubernetes APIs/tooling or multi-cloud portability — use EKS instead",
      "Workloads better suited to a single function invocation rather than a container — use Lambda instead",
    ],
    alternatives: [
      { need: "Kubernetes-native orchestration", choose: "Amazon EKS" },
      { need: "No servers to manage at all for the containers", choose: "AWS Fargate (as an ECS launch type)" },
      { need: "Run containers on customer-owned, on-premises infrastructure", choose: "Amazon ECS Anywhere" },
    ],
    keyFeatures: [
      "Task definitions describe container image, CPU/memory, networking mode, and IAM role",
      "Services keep a desired number of tasks running and integrate with load balancers",
      "EC2 and Fargate launch types for different operational models",
      "Service Auto Scaling based on CloudWatch metrics",
      "Native integration with ALB/NLB, CloudWatch Logs, IAM, and Amazon ECR",
      "Service discovery via AWS Cloud Map for internal service-to-service communication",
    ],
    availability:
      "ECS services can run tasks across multiple Availability Zones by spreading tasks across subnets in different AZs, and ECS automatically replaces failed tasks to keep the desired count running.",
    security:
      "IAM task roles scope permissions per task rather than per EC2 instance, so different services on the same cluster can have different least-privilege permissions. Security groups (in awsvpc networking mode) can be applied per task.",
    pricingLogic:
      "ECS itself has no additional charge — you pay for the underlying compute (EC2 instances or Fargate vCPU/memory) that runs your tasks, plus any load balancer, storage, and data transfer costs.",
    examKeywords: [
      "container orchestration",
      "task definition",
      "AWS-native",
      "EC2 launch type",
      "Fargate launch type",
      "no Kubernetes needed",
    ],
    examTraps: [
      "ECS and EKS are both container orchestrators, but ECS is AWS-proprietary while EKS runs actual Kubernetes — a question mentioning \"Kubernetes\" or \"kubectl\" always points to EKS.",
      "Choosing the EC2 launch type still means you manage the underlying instances — do not assume ECS is automatically \"serverless\" unless Fargate is specified.",
    ],
    architectureDiagram:
      "Amazon ECR\n    |\nECS Task Definition\n    |\nECS Service (cluster)\n  /        \\\nTask       Task\n  \\        /\nApplication Load Balancer",
    architectureCaption:
      "An ECS service keeps the desired number of tasks running and registers them behind a load balancer, whether tasks run on EC2 or Fargate.",
    mentorTip:
      "If a question just says \"containers\" with no mention of Kubernetes and emphasizes simplicity or tight AWS integration, ECS is usually the intended answer over EKS.",
    questionIds: ["q-amazon-ecs-1", "q-amazon-ecs-2", "q-amazon-ecs-3", "q-amazon-ecs-4", "q-amazon-ecs-5"],
  },

  {
    id: "amazon-eks",
    moduleId: "phase-7-containers",
    category: "Containers",
    title: "Amazon EKS",
    shortName: "EKS",
    tier: 1,
    domains: [2, 3],
    examImportance: "critical",
    oneLiner:
      "Amazon Elastic Kubernetes Service (EKS) is a managed control plane for running real, standard Kubernetes on AWS.",
    englishExplanation:
      "Amazon EKS runs the Kubernetes control plane (API server, etcd, scheduler) for you, managed and scaled by AWS across multiple Availability Zones, so you do not have to install or operate that control plane yourself. You still define and manage your workloads using standard Kubernetes objects (Deployments, Services, Pods) and standard tools like kubectl and eksctl — this is the key difference from ECS, which uses AWS's own proprietary API instead of Kubernetes.\n\nWorker nodes (where your pods actually run) can be EC2 instances that you manage yourself, EC2 instances managed via EKS Managed Node Groups (AWS handles provisioning/updating the nodes but they are still your EC2 instances), or Fargate (no EC2 instances to manage at all, similar to ECS+Fargate).\n\nTeams choose EKS specifically when they need Kubernetes: existing Kubernetes expertise or tooling, a desire for multi-cloud/hybrid portability (since Kubernetes itself is cloud-agnostic), or dependency on the broad Kubernetes ecosystem (Helm charts, custom operators, CNCF projects). IAM Roles for Service Accounts (IRSA) lets individual Kubernetes pods assume specific IAM roles, following least privilege even inside a shared cluster.",
    taglishExplanation:
      "Si EKS ang managed Kubernetes ng AWS — ibig sabihin, totoong Kubernetes ito (parehong kubectl commands, parehong YAML manifests), pero si AWS na ang nagpapatakbo at nagme-manage ng control plane (ang \"utak\" ng cluster) para sa'yo. Kailangan mo pa rin mag-manage ng worker nodes maliban kung Fargate ang gamit mo. Piliin mo si EKS kung existing na sa Kubernetes ang team mo, kailangan ng portability sa ibang cloud, o gusto niyo gamitin ang malawak na Kubernetes ecosystem (Helm, operators, atbp).",
    analogy:
      "If ECS is the restaurant's in-house scheduling system, EKS is like adopting an industry-standard franchise operations manual (Kubernetes) that works the same way whether the restaurant is in Manila, Singapore, or anywhere else — AWS just runs the corporate office (control plane) for you so you don't have to staff it yourself, but the day-to-day recipes and procedures (Kubernetes manifests) stay portable.",
    whyItExists:
      "Kubernetes became the industry-standard way to orchestrate containers, but operating its control plane reliably (high availability, upgrades, security patching of etcd and the API server) is genuinely hard. EKS exists so teams get real, standards-compliant Kubernetes without taking on the burden of running the control plane themselves.",
    flow: "kubectl / CI-CD -> EKS Control Plane (managed by AWS) -> Worker Nodes (EC2 Managed Node Group or Fargate) -> Pods -> Load Balancer",
    withoutIt: [
      "You would need to install, patch, and scale your own highly-available Kubernetes control plane on EC2",
      "You would be fully responsible for etcd backups, API server security, and version upgrades",
      "Achieving AWS-grade reliability for the control plane yourself would take significant expertise",
    ],
    bestUseCases: [
      "Teams already standardized on Kubernetes tooling, manifests, or Helm charts",
      "Organizations wanting multi-cloud or hybrid portability for their workloads",
      "Complex microservice platforms that benefit from the broad Kubernetes/CNCF ecosystem",
      "Teams needing fine-grained per-pod IAM permissions via IAM Roles for Service Accounts",
    ],
    poorUseCases: [
      "Small teams with no Kubernetes experience who just want simple AWS-native container orchestration — ECS is simpler",
      "Workloads that fit a single function invocation better than a long-running pod — Lambda is simpler",
    ],
    alternatives: [
      { need: "Simpler, AWS-proprietary container orchestration", choose: "Amazon ECS" },
      { need: "Run Kubernetes worker nodes without managing EC2", choose: "EKS with Fargate" },
      { need: "Run Kubernetes fully on customer-owned infrastructure", choose: "Amazon EKS Anywhere" },
    ],
    keyFeatures: [
      "AWS-managed, multi-AZ Kubernetes control plane (API server, etcd, scheduler)",
      "Standard Kubernetes API — use kubectl, Helm, and the CNCF ecosystem unmodified",
      "EC2 self-managed nodes, EKS Managed Node Groups, or Fargate for worker compute",
      "IAM Roles for Service Accounts (IRSA) for pod-level least-privilege permissions",
      "Integrates with VPC networking (each pod can get its own VPC IP via the VPC CNI)",
      "Add-ons for logging, monitoring, and networking maintained/updated by AWS",
    ],
    availability:
      "The EKS control plane is automatically deployed across multiple Availability Zones by AWS for resilience. Worker node high availability is your responsibility to configure — spread node groups across multiple AZs and use pod anti-affinity/replica counts appropriately.",
    security:
      "IAM Roles for Service Accounts lets you assign least-privilege IAM permissions to individual pods rather than the whole node, which is a major security improvement over giving every pod on a node the same instance role. Kubernetes RBAC controls in-cluster permissions separately from IAM.",
    pricingLogic:
      "You pay an hourly charge per EKS cluster for the managed control plane, plus the cost of whatever worker compute you choose (EC2 instances or Fargate vCPU/memory), plus any load balancers and data transfer.",
    examKeywords: [
      "managed Kubernetes",
      "control plane",
      "kubectl",
      "worker nodes",
      "multi-cloud portability",
      "IRSA",
    ],
    examTraps: [
      "Any mention of \"Kubernetes\", \"kubectl\", \"pods\", or \"Helm\" in a scenario is a strong signal for EKS over ECS.",
      "EKS still requires you to manage worker nodes unless you explicitly use Fargate — the control plane being managed does not mean the whole cluster is hands-off.",
      "EKS is not automatically cheaper or simpler than ECS — its main justification is the need for actual Kubernetes compatibility/portability.",
    ],
    architectureDiagram:
      "kubectl / CI-CD\n     |\nEKS Control Plane (AWS-managed, multi-AZ)\n     |\nManaged Node Group (EC2) or Fargate\n  /        \\\nPod         Pod\n  \\        /\nLoad Balancer",
    architectureCaption:
      "AWS manages the Kubernetes control plane; you manage (or delegate to Fargate) the worker nodes where pods actually run.",
    mentorTip:
      "Do not pick EKS just because a question mentions \"containers\" — pick it specifically when Kubernetes itself (the API, the tooling, or portability) is called out. Otherwise ECS is usually the simpler, equally valid, and often intended answer.",
    questionIds: ["q-amazon-eks-1", "q-amazon-eks-2", "q-amazon-eks-3", "q-amazon-eks-4", "q-amazon-eks-5"],
  },

  // ============================================================
  // TIER 2
  // ============================================================
  {
    id: "aws-elastic-beanstalk",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "AWS Elastic Beanstalk",
    shortName: "Beanstalk",
    tier: 2,
    domains: [3],
    examImportance: "high",
    oneLiner:
      "AWS Elastic Beanstalk is a platform-as-a-service that automatically provisions and manages the infrastructure (EC2, load balancer, Auto Scaling, RDS) needed to run your application from just your code.",
    englishExplanation:
      "Elastic Beanstalk sits between raw EC2 (full control, full responsibility) and fully abstracted services like Lambda. You upload your application code (in a supported language/platform, or a Docker container), and Beanstalk automatically provisions an environment behind the scenes: EC2 instances, an Auto Scaling group, a load balancer, and optionally a database — all wired together following AWS best practices.\n\nUnlike Lambda or Fargate, Beanstalk does not hide the underlying resources from you: you can still see and access the EC2 instances, security groups, and load balancer it creates, and tweak their configuration if needed. This makes it a good fit for teams that want to deploy quickly without hand-building infrastructure, but still want the option to reach into the underlying resources when necessary.",
    taglishExplanation:
      "Isipin mo si Elastic Beanstalk parang \"paketeng\" deployment — i-upload mo lang ang code mo, at automatic nang gagawa si AWS ng buong environment (EC2, load balancer, Auto Scaling, kahit RDS) para dito. Hindi tulad ng Lambda na tago talaga ang infrastructure, dito makikita at ma-a-access mo pa rin ang mga EC2 instances at load balancer kung kailangan mong i-adjust ang settings.",
    analogy:
      "Elastic Beanstalk is like ordering a fully-furnished starter apartment: the builder (AWS) sets up the walls, plumbing, and furniture (EC2, load balancer, Auto Scaling) following a sensible default plan, but you can still open the walls and rearrange things yourself later if you need to.",
    whyItExists:
      "Manually wiring together EC2, an Auto Scaling group, a load balancer, and monitoring for every new application is repetitive and error-prone. Elastic Beanstalk automates that setup so developers can deploy an application quickly while still keeping access to the underlying resources for customization.",
    flow: "Developer uploads code/container -> Elastic Beanstalk -> Provisions EC2 + ASG + ELB (+ RDS optional) -> Application running",
    withoutIt: [
      "Developers would need to manually provision EC2, ASG, and a load balancer for every new app",
      "Applying AWS best-practice architecture would depend on individual engineer knowledge",
      "Routine tasks like health monitoring and version rollbacks would need custom tooling",
    ],
    bestUseCases: [
      "Teams that want fast deployment of web applications without hand-building infrastructure",
      "Standard web app stacks (Java, .NET, Node.js, Python, PHP, Ruby, Go, Docker) with common patterns",
      "Developers who want visibility/access into the underlying EC2 resources when needed",
    ],
    poorUseCases: [
      "Teams wanting zero visibility into infrastructure — Lambda/Fargate abstract it away more completely",
      "Highly customized architectures that don't fit Beanstalk's opinionated environment structure",
      "Workloads better modeled as independent microservices with fine container-level orchestration (ECS/EKS)",
    ],
    alternatives: [
      { need: "Full custom infrastructure control", choose: "Amazon EC2 directly" },
      { need: "No visible servers at all", choose: "AWS Lambda or AWS Fargate" },
      { need: "Infrastructure as declarative templates instead of a PaaS wrapper", choose: "AWS CloudFormation" },
    ],
    keyFeatures: [
      "Supports multiple platforms (Java, .NET, PHP, Node.js, Python, Ruby, Go, Docker)",
      "Automatically provisions EC2, Auto Scaling, and Elastic Load Balancing",
      "Environment health monitoring dashboard built in",
      "Deployment policies (all-at-once, rolling, rolling with additional batch, immutable, blue/green via swap)",
      "You retain access to the underlying resources for manual tuning",
    ],
    availability:
      "Because Beanstalk provisions a standard EC2 + Auto Scaling Group + load balancer architecture, it inherits the same multi-AZ high-availability patterns as a manually built EC2 architecture, as long as the environment is configured for it (e.g., a load-balanced environment across multiple AZs).",
    security:
      "IAM roles are assigned to the underlying EC2 instances just as with any EC2 deployment; security groups control network access. Beanstalk itself does not weaken or replace those controls — it just automates their creation with sensible defaults.",
    pricingLogic:
      "There is no additional charge for Elastic Beanstalk itself — you pay only for the underlying resources it creates (EC2, load balancer, RDS if used, storage, data transfer).",
    examKeywords: [
      "platform as a service",
      "upload code, not infrastructure",
      "fast deployment",
      "still have access to underlying resources",
    ],
    examTraps: [
      "Beanstalk is not serverless — it still runs on EC2 instances underneath, unlike Lambda.",
      "Beanstalk is free itself, but the resources it provisions are billed normally — do not assume it is a flat-rate service.",
    ],
    architectureDiagram:
      "Developer\n    |\nElastic Beanstalk (uploads app version)\n    |\nAuto Scaling Group behind ELB\n  /       \\\nEC2       EC2\n    |\n  RDS (optional)",
    architectureCaption:
      "Beanstalk automatically wires together the standard EC2 + ASG + ELB architecture from just an application upload.",
    mentorTip:
      "When a scenario says \"the team just wants to upload their code and have AWS handle the infrastructure, but still wants some access to tweak servers if needed,\" think Elastic Beanstalk rather than Lambda or a fully manual EC2 build.",
    questionIds: ["q-aws-elastic-beanstalk-1", "q-aws-elastic-beanstalk-2", "q-aws-elastic-beanstalk-3"],
  },

  {
    id: "aws-batch",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "AWS Batch",
    shortName: "Batch",
    tier: 2,
    domains: [3],
    examImportance: "medium",
    oneLiner:
      "AWS Batch runs batch computing jobs at any scale by automatically provisioning the right amount and type of compute, without you managing job schedulers or a compute cluster yourself.",
    englishExplanation:
      "AWS Batch is built for workloads that process a queue of jobs — things like scientific simulations, financial risk modeling, video/image rendering, or large data transformations — rather than serving live user traffic. You define job definitions (what to run, resource requirements), submit jobs to job queues, and Batch figures out when and where to run them using compute environments that it provisions dynamically (EC2, Spot Instances, or Fargate).\n\nBatch handles the undifferentiated heavy lifting of a traditional HPC job scheduler: queuing, dependency management between jobs, retrying failed jobs, and scaling compute capacity up when there is a backlog of jobs and down to zero when the queue is empty. It integrates with Spot Instances well because interrupted batch jobs can typically just be retried.",
    taglishExplanation:
      "Si AWS Batch ay para sa mga \"pila ng trabaho\" (batch jobs) — hindi ito para sa live na web traffic, kundi para sa mga malalaking computation na parang video rendering, scientific simulations, o data processing na puwedeng patakbuhin sa background. Ikaw magsa-submit ng jobs sa queue, at si Batch na ang bahalang mag-decide kung anong compute (EC2, Spot, o Fargate) at kailan ito patatakbuhin, pati na rin ang pag-retry kung may mag-fail.",
    analogy:
      "AWS Batch is like a laundromat manager who takes in a pile of laundry orders (jobs), decides how many washing machines to turn on based on how much laundry is waiting, and automatically restarts a load if a machine hiccups — without the customer needing to manage any machines themselves.",
    whyItExists:
      "Before AWS Batch, teams running large batch/HPC workloads had to build and operate their own job schedulers and manage clusters of compute that were often idle between job bursts. AWS Batch automates the scheduling and dynamically right-sizes compute so teams pay only for what jobs actually need, when they need it.",
    flow: "Job Definition -> Submit to Job Queue -> AWS Batch provisions Compute Environment (EC2/Spot/Fargate) -> Job runs -> Results stored (e.g., S3)",
    withoutIt: [
      "You would need to build and operate your own job scheduler and compute cluster",
      "Idle compute between job bursts would waste money if capacity is kept running just in case",
      "Retrying failed jobs and managing dependencies between jobs would be manual work",
    ],
    bestUseCases: [
      "Large-scale scientific, engineering, or financial batch computations",
      "Media processing/rendering pipelines that run as discrete jobs",
      "ETL and data processing pipelines that run periodically rather than continuously",
    ],
    poorUseCases: [
      "Interactive, low-latency, user-facing applications — Batch is designed for asynchronous jobs, not live requests",
      "Simple, short single tasks better suited to a direct Lambda invocation",
    ],
    alternatives: [
      { need: "Event-driven short function execution instead of a job queue", choose: "AWS Lambda" },
      { need: "Manage the compute cluster/scheduler yourself for full control", choose: "Amazon EC2 with a self-managed scheduler" },
    ],
    keyFeatures: [
      "Job queues, job definitions, and dynamically provisioned compute environments",
      "Supports EC2 (including Spot for cost savings), and Fargate compute types",
      "Automatic retries and job dependency management",
      "Scales compute environments down to zero when there is no work",
    ],
    availability:
      "AWS Batch provisions compute environments across the Availability Zones you configure, and can retry failed jobs on new capacity if an underlying instance or Spot capacity is interrupted.",
    security:
      "Jobs run with IAM roles that scope their permissions, and compute environments follow the same VPC/security group model as the underlying EC2 or Fargate resources they use.",
    pricingLogic:
      "There is no separate charge for AWS Batch itself — you pay only for the underlying compute resources (EC2, Spot, or Fargate) that your jobs consume while running.",
    examKeywords: [
      "batch computing",
      "job queue",
      "dynamically provisions compute",
      "HPC",
      "no cluster management",
    ],
    examTraps: [
      "AWS Batch is for asynchronous job processing, not real-time request/response — do not confuse it with API-serving compute.",
      "Batch is not a separate compute type — it orchestrates EC2/Spot/Fargate underneath, similar in spirit to how ECS orchestrates containers.",
    ],
    architectureDiagram:
      "Job submitted\n    |\nJob Queue\n    |\nAWS Batch (Compute Environment: EC2/Spot/Fargate)\n    |\nJob runs -> Output to S3",
    architectureCaption:
      "AWS Batch scales compute environments to match the job queue, then scales back to zero when the queue is empty.",
    mentorTip:
      "Look for words like \"batch processing\", \"large-scale computation\", or \"HPC\" combined with \"minimize operational overhead of managing a compute cluster\" — that combination points to AWS Batch.",
    questionIds: ["q-aws-batch-1", "q-aws-batch-2", "q-aws-batch-3"],
  },

  {
    id: "amazon-ecr",
    moduleId: "phase-7-containers",
    category: "Containers",
    title: "Amazon ECR",
    shortName: "ECR",
    tier: 2,
    domains: [1, 3],
    examImportance: "high",
    oneLiner:
      "Amazon Elastic Container Registry (ECR) is a fully managed Docker/OCI container image registry, tightly integrated with ECS, EKS, and Lambda.",
    englishExplanation:
      "Amazon ECR stores, versions, and serves container images the way Amazon S3 stores objects — but purpose-built for Docker/OCI images, with the registry APIs container tooling expects. You push images from your build pipeline, and ECS, EKS, Fargate, or Lambda (which also supports container images as a packaging format) can pull them directly, with IAM controlling who can push or pull.\n\nECR offers both private repositories (scoped to your account, access controlled with IAM/resource policies) and a public option (ECR Public, for openly sharing images). Built-in features like image scanning (checking for known OS/package vulnerabilities) and lifecycle policies (automatically expiring old, untagged images) help keep a registry secure and tidy without manual housekeeping.",
    taglishExplanation:
      "Si ECR ay parang S3 pero para sa container images — dito mo isto-store ang mga Docker images mo, at direkta itong ma-pull ng ECS, EKS, o Lambda. May IAM permissions na kumokontrol kung sino puwedeng mag-push o mag-pull. May built-in image scanning din para ma-detect ang mga known vulnerabilities, at lifecycle policies para awtomatikong mabura ang mga lumang images na hindi na kailangan.",
    analogy:
      "ECR is like a secure, version-controlled warehouse specifically built for shipping containers (Docker images) — trucks (ECS/EKS/Lambda) can pick up exactly the version they need, security guards (IAM) check who is allowed in or out, and old, unused containers get cleared out automatically by policy.",
    whyItExists:
      "Container-based deployments need a reliable, access-controlled place to store and version images that integrates natively with AWS compute and IAM. Running your own private Docker registry means patching and securing it yourself; ECR removes that operational burden.",
    flow: "docker build -> docker push -> Amazon ECR repository -> ECS/EKS/Lambda pulls image -> Container runs",
    withoutIt: [
      "You would need to host and secure your own container registry",
      "Coordinating IAM-based access control to images would require custom tooling",
      "Vulnerability scanning and image lifecycle cleanup would be manual processes",
    ],
    bestUseCases: [
      "Storing and versioning container images used by ECS, EKS, or Lambda container-image functions",
      "CI/CD pipelines that build and push new image versions on every deployment",
      "Teams needing built-in vulnerability scanning for container images before deployment",
    ],
    poorUseCases: [
      "Storing arbitrary, non-container binary artifacts — that's a better fit for S3 or CodeArtifact",
      "Fully public, community-scale image distribution beyond what ECR Public is meant for",
    ],
    alternatives: [
      { need: "Store general-purpose file artifacts, not container images", choose: "Amazon S3" },
      { need: "Public, community-oriented image hosting outside AWS", choose: "Docker Hub (third-party)" },
    ],
    keyFeatures: [
      "Private and public (ECR Public) repositories",
      "IAM-based and resource-policy-based access control per repository",
      "Image vulnerability scanning (basic and enhanced scanning)",
      "Lifecycle policies to automatically expire old/untagged images",
      "Native integration with ECS, EKS, Fargate, and Lambda container images",
    ],
    availability:
      "ECR is a Regional, managed service that stores images redundantly, similar in durability approach to S3, without you managing any registry infrastructure.",
    security:
      "Access is controlled through IAM policies and repository policies; images can be scanned for known vulnerabilities before deployment, and encryption at rest is supported (including with customer-managed KMS keys).",
    pricingLogic:
      "You pay for the storage consumed by your images and for data transfer when images are pulled out to another Region or the internet; pulls within the same Region to AWS compute are typically not separately charged for data transfer.",
    examKeywords: [
      "container registry",
      "push/pull images",
      "image scanning",
      "lifecycle policy",
      "integrates with ECS/EKS",
    ],
    examTraps: [
      "ECR stores images, it does not run them — ECS/EKS/Fargate/Lambda are the compute services that actually run what ECR stores.",
      "Do not confuse ECR (registry) with ECS (orchestrator) just because the acronyms look similar.",
    ],
    architectureDiagram:
      "CI/CD Pipeline\n    |\ndocker push\n    |\nAmazon ECR Repository\n    |\nECS / EKS / Lambda pulls image",
    architectureCaption:
      "ECR is the image storage/versioning layer that sits between your build pipeline and the compute services that run the containers.",
    mentorTip:
      "If a question is about where container images are stored, versioned, or scanned, the answer is ECR. If it's about where containers actually run, the answer is ECS, EKS, or Fargate.",
    questionIds: ["q-amazon-ecr-1", "q-amazon-ecr-2", "q-amazon-ecr-3"],
  },

  // ============================================================
  // TIER 3
  // ============================================================
  {
    id: "aws-outposts",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "AWS Outposts",
    shortName: "Outposts",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "AWS Outposts brings actual AWS hardware and services into your own on-premises data center, fully managed by AWS.",
    englishExplanation:
      "AWS Outposts is a physical rack of AWS-designed compute and storage hardware that AWS installs inside your own data center or co-location facility. It runs a subset of AWS services (like EC2 and EBS) locally, using the same APIs and tools you already use in the cloud, while staying connected back to an AWS Region for management and additional services. This is for workloads that need to physically stay on-premises — for low latency to local systems, local data processing/residency requirements, or migrating a facility gradually — while still feeling like native AWS.",
    taglishExplanation:
      "Si AWS Outposts ay literal na hardware rack ng AWS na ini-install nila sa loob mismo ng data center mo. Kaya kahit local ang server, parehong AWS APIs at tools pa rin ang gamit mo. Para ito sa mga workload na kailangang physically nasa on-premises — halimbawa dahil sa latency papunta sa local systems, o may regulatory requirement na doon lang dapat naka-store ang data.",
    analogy:
      "Outposts is like AWS shipping and installing one of its own data-center racks directly inside your building, wired back to the mothership, so you get the AWS experience without your workload ever leaving your own walls.",
    whyItExists:
      "Some workloads cannot fully move to the cloud due to latency to on-premises systems, data residency/regulatory requirements, or local processing needs — Outposts extends AWS's operating model to those workloads without forcing a full migration.",
    flow: "AWS Region <-> (managed connection) <-> AWS Outposts rack (on customer premises) -> Local EC2/EBS/other supported services",
    withoutIt: [
      "You would need to run a separate, non-AWS on-premises stack with different tools and APIs",
      "Hybrid architectures would require translating between two different operating models",
    ],
    bestUseCases: [
      "Low-latency workloads that must stay physically close to on-premises equipment or users",
      "Data residency or local regulatory requirements that require on-premises processing/storage",
    ],
    poorUseCases: [
      "Workloads with no on-premises latency or data residency constraint — a normal AWS Region is simpler and cheaper",
      "Teams unwilling to host and maintain physical AWS-owned hardware on-site",
    ],
    alternatives: [
      { need: "Fully cloud-hosted compute with no on-premises hardware", choose: "Standard AWS Region (EC2, etc.)" },
      { need: "Run Kubernetes on-premises without an Outposts rack", choose: "Amazon EKS Anywhere" },
    ],
    keyFeatures: [
      "Physical AWS-managed rack installed in the customer's own facility",
      "Runs supported AWS services locally using the same APIs as the cloud",
      "Connected back to a parent AWS Region for management and extended services",
    ],
    availability:
      "An Outposts rack is tied to a single physical location, so availability depends on that site's power/network and the connection back to the parent Region — it is not a substitute for multi-AZ resilience.",
    security:
      "The same IAM and security model used in AWS applies to resources running on Outposts, and AWS manages and patches the underlying hardware/software stack.",
    pricingLogic:
      "Outposts is billed as a capacity commitment for the physical rack/hardware, in addition to normal usage-based pricing for the services running on it.",
    examKeywords: ["on-premises", "hybrid", "low latency to local systems", "data residency"],
    examTraps: [
      "Outposts is physical AWS hardware on-site — do not confuse it with a purely virtual/VPN hybrid connection like Direct Connect or VPN alone.",
    ],
    architectureDiagram: "Customer Data Center\n[ AWS Outposts Rack: EC2, EBS ]\n        |\n   AWS Region (management, extended services)",
    architectureCaption: "Outposts extends real AWS infrastructure physically into the customer's own facility.",
    mentorTip:
      "When a scenario insists a workload must run physically on-premises (not just \"connected to\" AWS) while still using AWS APIs, think Outposts.",
    questionIds: ["q-aws-outposts-1", "q-aws-outposts-2"],
  },

  {
    id: "aws-serverless-application-repository",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "AWS Serverless Application Repository",
    shortName: "SAR",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "The AWS Serverless Application Repository (SAR) is a managed catalog of ready-to-deploy serverless applications that you can quickly bring into your own AWS account.",
    englishExplanation:
      "SAR is a repository where developers publish reusable serverless applications (built with the AWS Serverless Application Model, SAM) — things like a pre-built Slack-notification Lambda, an image-resizing pipeline, or a common utility. Instead of writing that component from scratch, you can search the repository, review the app, and deploy it directly into your own account with a few clicks or a CLI command, then customize it as needed.",
    taglishExplanation:
      "Si SAR ay parang \"app store\" ng mga ready-made serverless applications na ginawa gamit ang SAM. Sa halip na gawin mula zero ang common na component (halimbawa image resizer o Slack notifier), maghahanap ka lang sa repository, tapos i-deploy mo diretso sa sarili mong account, at puwede mo pang i-customize.",
    analogy:
      "SAR is like an app store for backend building blocks — instead of coding a common serverless feature from scratch, you browse a catalog, install the one you need into your own AWS account, and tweak it if necessary.",
    whyItExists:
      "Many serverless applications solve common, repeated problems. SAR exists so developers can share and reuse proven serverless components instead of everyone rebuilding the same utilities independently.",
    flow: "Browse Serverless Application Repository -> Select application -> Deploy into own AWS account (via SAM/CloudFormation) -> Customize as needed",
    withoutIt: [
      "Developers would rebuild common serverless utilities from scratch every time",
      "Sharing reusable serverless components across teams/accounts would require manual copy-pasting",
    ],
    bestUseCases: [
      "Quickly bootstrapping common serverless components (notifications, transformations, utilities)",
      "Publishing and sharing your own reusable serverless applications across teams or publicly",
    ],
    poorUseCases: [
      "Highly custom business logic unique to your application — SAR is for reusable, generic components",
    ],
    alternatives: [
      { need: "Define custom serverless infrastructure from scratch", choose: "AWS SAM or AWS CloudFormation directly" },
    ],
    keyFeatures: [
      "Catalog of publicly and privately shared SAM-based serverless applications",
      "One-click/CLI deployment into your own AWS account",
      "Supports publishing your own applications for others to reuse",
    ],
    availability:
      "SAR itself is a managed AWS service; the applications you deploy from it inherit the availability characteristics of the underlying resources (typically Lambda and related serverless services) they create.",
    security:
      "Deployed applications get their own IAM roles/permissions as defined in their SAM template — always review a third-party application's permissions before deploying it into your account.",
    pricingLogic:
      "There is no charge for SAR itself — you pay only for the underlying AWS resources (e.g., Lambda invocations) that the deployed application consumes.",
    examKeywords: ["serverless application catalog", "SAM", "reusable serverless components"],
    examTraps: [
      "SAR is a distribution/catalog mechanism, not a compute service itself — the actual compute is typically Lambda underneath.",
    ],
    architectureDiagram: "Serverless Application Repository\n        |\n  Deploy (SAM/CloudFormation)\n        |\nYour AWS Account (Lambda, API Gateway, etc.)",
    architectureCaption: "SAR deploys a packaged SAM application directly into your own account's resources.",
    mentorTip:
      "If a question describes reusing or sharing a pre-built serverless application/component across teams or publicly, that's SAR.",
    questionIds: ["q-aws-serverless-application-repository-1", "q-aws-serverless-application-repository-2"],
  },

  {
    id: "vmware-cloud-on-aws",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "VMware Cloud on AWS",
    shortName: "VMware Cloud on AWS",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "VMware Cloud on AWS lets you run your existing VMware vSphere-based workloads on dedicated AWS infrastructure, without re-architecting them.",
    englishExplanation:
      "VMware Cloud on AWS runs the actual VMware software-defined data center stack (vSphere, vSAN, NSX) on dedicated AWS bare-metal infrastructure. This lets organizations already heavily invested in VMware move workloads to AWS using the same tools, skills, and operational processes they already have, instead of converting every VM to a native AWS service first. It is commonly used as a stepping stone for migration or as a permanent hybrid-cloud extension of an on-premises VMware environment.",
    taglishExplanation:
      "Kung matagal nang gumagamit ang company ng VMware (vSphere) sa sarili nilang data center, puwede nilang patakbuhin yun mismong environment sa AWS gamit ang VMware Cloud on AWS — parehong tools at skills pa rin, walang kailangang i-convert agad sa native AWS services. Madalas itong gamitin bilang \"tulay\" papuntang cloud, o bilang permanenteng hybrid extension.",
    analogy:
      "It's like shipping your entire existing office setup — same furniture, same filing system — into a new AWS-owned building, instead of buying all-new furniture (re-architecting to native AWS services) before you can move in.",
    whyItExists:
      "Rewriting or re-architecting every VMware-based workload to use native AWS services before migrating is slow and risky. VMware Cloud on AWS lets organizations get the benefits of AWS infrastructure (elasticity, global reach, reduced data center footprint) while keeping their existing VMware operational model intact.",
    flow: "On-premises vSphere environment -> Extend/migrate to VMware Cloud on AWS (dedicated AWS hardware) -> Managed with existing VMware tools",
    withoutIt: [
      "Migrating VMware workloads to AWS would require converting each one to native AWS services first",
      "Teams would need to relearn new tooling instead of using their existing VMware skill set",
    ],
    bestUseCases: [
      "Large-scale VMware environments migrating to AWS without immediate re-architecture",
      "Hybrid cloud strategies extending an existing on-premises VMware footprint into AWS",
    ],
    poorUseCases: [
      "Greenfield applications with no existing VMware dependency — native AWS services are usually simpler and cheaper",
    ],
    alternatives: [
      { need: "Fully re-architect to native AWS compute instead of keeping VMware", choose: "Amazon EC2 / ECS / EKS" },
    ],
    keyFeatures: [
      "Runs actual VMware vSphere, vSAN, and NSX software on dedicated AWS infrastructure",
      "Compatible with existing VMware management tools and operational processes",
      "Supports hybrid connectivity back to on-premises VMware environments",
    ],
    availability:
      "Availability depends on how the VMware Cloud on AWS software-defined data center is deployed across AWS Availability Zones, following VMware's own high-availability constructs (e.g., vSphere HA) on top of AWS infrastructure.",
    security:
      "Security follows the familiar VMware security model (NSX for networking/segmentation, vSphere access controls) layered on top of AWS's underlying infrastructure security.",
    pricingLogic:
      "Billed based on the dedicated AWS infrastructure (hosts) consumed by the VMware software-defined data center, typically via subscription/commitment terms.",
    examKeywords: ["VMware", "vSphere", "lift-and-shift VMware", "hybrid cloud extension"],
    examTraps: [
      "This is not the same as a normal EC2 lift-and-shift — it specifically preserves the VMware hypervisor/tooling layer, which plain EC2 migration does not.",
    ],
    architectureDiagram: "On-Premises vSphere\n        |\n  Hybrid Connectivity\n        |\nVMware Cloud on AWS (dedicated AWS hardware)",
    architectureCaption: "VMware Cloud on AWS extends an existing VMware environment onto dedicated AWS infrastructure.",
    mentorTip:
      "If a scenario says the company wants to move to AWS \"without re-architecting\" their existing VMware environment, that phrase is the signal for VMware Cloud on AWS.",
    questionIds: ["q-vmware-cloud-on-aws-1", "q-vmware-cloud-on-aws-2"],
  },

  {
    id: "aws-wavelength",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "AWS Wavelength",
    shortName: "Wavelength",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "AWS Wavelength embeds AWS compute and storage infrastructure inside telecommunications providers' 5G networks, for applications that need ultra-low latency to mobile devices.",
    englishExplanation:
      "AWS Wavelength places AWS infrastructure (Wavelength Zones) directly within a telecom carrier's 5G network, at the edge closest to mobile end users. Application traffic from 5G-connected devices reaches your workload without ever leaving the telecom provider's network to travel back to a distant AWS Region, dramatically cutting latency. You use the same AWS APIs and tools you already know, and a Wavelength Zone is associated with a parent Region for extending resources like VPCs into it.",
    taglishExplanation:
      "Si Wavelength ay parang \"paglalagay\" ng AWS infrastructure mismo sa loob ng 5G network ng isang telecom provider, malapit talaga sa mobile users. Kaya sobrang bilis ang latency dahil hindi na kailangang bumiyahe pabalik ang traffic sa malayong AWS Region — doon na mismo sa network ng telco naprocess. Parehas pa rin ang mga AWS tools na ginagamit mo.",
    analogy:
      "Wavelength is like setting up a small AWS branch office literally inside the phone company's own building, so a mobile app's requests never have to leave the telecom network to reach AWS compute — cutting travel time to almost nothing.",
    whyItExists:
      "Some applications — augmented/virtual reality, real-time gaming, connected vehicles, live video analytics — need latency low enough that even the trip to the nearest AWS Region is too slow over a mobile network. Wavelength brings compute directly into the mobile carrier's network to eliminate that extra hop.",
    flow: "5G Mobile Device -> Carrier 5G Network -> AWS Wavelength Zone (embedded compute) -> (optional) back to parent AWS Region",
    withoutIt: [
      "Mobile application traffic would need to travel from the carrier network back to a distant AWS Region, adding latency",
      "Ultra-low-latency mobile use cases (AR/VR, real-time gaming, connected vehicles) would be harder to achieve",
    ],
    bestUseCases: [
      "Mobile applications needing single-digit-millisecond latency, like AR/VR or real-time gaming",
      "Connected vehicle or live video/analytics applications served over 5G networks",
    ],
    poorUseCases: [
      "Typical web/mobile applications with no extreme latency requirement — a standard Region is simpler",
    ],
    alternatives: [
      { need: "Low latency at the edge but not specifically tied to a telecom 5G network", choose: "AWS Local Zones or Amazon CloudFront" },
    ],
    keyFeatures: [
      "Wavelength Zones embedded within telecom providers' 5G networks",
      "Same AWS APIs/tools as the parent Region",
      "Extends VPCs and select AWS services to the network edge",
    ],
    availability:
      "A Wavelength Zone is tied to a specific carrier network location and is an extension of a parent Region, so its availability is scoped to that edge location rather than being independently multi-AZ.",
    security:
      "The same IAM, VPC, and security group models apply to resources running in a Wavelength Zone as in the parent Region.",
    pricingLogic:
      "Resources in a Wavelength Zone are billed similarly to their parent-Region equivalents (e.g., EC2 instance pricing), often with data transfer priced based on the carrier network path.",
    examKeywords: ["5G", "ultra-low latency", "mobile edge computing", "carrier network"],
    examTraps: [
      "Wavelength is specific to telecom 5G networks — do not confuse it with AWS Local Zones, which extend AWS to metro areas generally, not specifically inside carrier 5G infrastructure.",
    ],
    architectureDiagram: "Mobile Device (5G)\n     |\nCarrier 5G Network\n     |\nAWS Wavelength Zone (compute)\n     |\nParent AWS Region",
    architectureCaption: "Wavelength keeps compute inside the carrier network, avoiding the round trip to a distant Region.",
    mentorTip:
      "If the scenario mentions 5G networks plus ultra-low latency for mobile users, that combination is the Wavelength trigger.",
    questionIds: ["q-aws-wavelength-1", "q-aws-wavelength-2"],
  },

  {
    id: "amazon-ecs-anywhere",
    moduleId: "phase-7-containers",
    category: "Containers",
    title: "Amazon ECS Anywhere",
    shortName: "ECS Anywhere",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon ECS Anywhere lets you use the ECS control plane in AWS to schedule and manage containers that actually run on your own on-premises or edge infrastructure.",
    englishExplanation:
      "ECS Anywhere extends the familiar ECS orchestration experience (task definitions, services, the ECS console/API) to infrastructure you own outside of AWS — on-premises servers or edge devices. AWS still manages the ECS control plane, but the containers execute on your own hardware, which you register using the ECS agent and AWS Systems Manager. This is useful for organizations that need to keep some workloads on-premises (regulatory, latency, or existing hardware investment reasons) while still standardizing operations around ECS.",
    taglishExplanation:
      "Si ECS Anywhere ay parehong ECS pa rin, pero ang mga containers mismo ay tumatakbo sa sarili mong on-premises o edge hardware, hindi sa AWS. Si AWS pa rin ang nagmamanage ng control plane, pero ang pisikal na machine kung saan tumatakbo ang container ay sa'yo. Gamitin ito kung may workload kang kailangang manatili on-premises pero gusto mo pa ring gamitin ang parehong ECS tools at workflow.",
    analogy:
      "ECS Anywhere is like using the same restaurant scheduling software (ECS control plane) to manage staff shifts, except some of those staff work out of a satellite kitchen (your on-premises hardware) instead of the main location.",
    whyItExists:
      "Some workloads must stay physically on-premises, but teams still want a single, consistent container orchestration workflow instead of maintaining separate tools for cloud and on-premises containers. ECS Anywhere unifies that experience under ECS.",
    flow: "ECS Control Plane (AWS) -> ECS Agent + SSM on customer hardware -> Containers run on-premises/edge",
    withoutIt: [
      "You would need a separate orchestration tool for on-premises containers, disconnected from your AWS-based ECS workflow",
    ],
    bestUseCases: [
      "Organizations needing some containers to run on-premises for latency or regulatory reasons, while standardizing on ECS tooling",
      "Edge computing scenarios where compute must be physically close to local equipment",
    ],
    poorUseCases: [
      "Workloads with no on-premises requirement — plain ECS with EC2 or Fargate is simpler",
    ],
    alternatives: [
      { need: "Run Kubernetes (not ECS) on customer-owned infrastructure", choose: "Amazon EKS Anywhere" },
      { need: "Physical AWS hardware installed on-premises", choose: "AWS Outposts" },
    ],
    keyFeatures: [
      "Uses the same ECS API, console, and task definitions as cloud-based ECS",
      "Requires the ECS agent and AWS Systems Manager on registered on-premises servers",
      "Unifies container operations across cloud and on-premises infrastructure",
    ],
    availability:
      "Availability of workloads running via ECS Anywhere depends entirely on the customer's own on-premises infrastructure and network connectivity back to AWS — AWS only manages the control plane, not the physical resilience of your hardware.",
    security:
      "Registered on-premises instances communicate with AWS via Systems Manager, and IAM still governs permissions for the ECS control plane actions.",
    pricingLogic:
      "You pay a per-instance-hour fee for infrastructure registered with ECS Anywhere, in addition to whatever your own hardware/hosting already costs — there is no EC2 or Fargate compute charge since AWS isn't providing the compute.",
    examKeywords: ["on-premises containers", "ECS control plane", "hybrid container orchestration"],
    examTraps: [
      "ECS Anywhere still uses AWS's ECS control plane — it is not a fully disconnected, offline solution.",
    ],
    architectureDiagram: "ECS Control Plane (AWS)\n        |\n  ECS Agent + SSM\n        |\nCustomer On-Premises Server (container runs here)",
    architectureCaption: "The control plane stays in AWS; the containers run on infrastructure you own.",
    mentorTip:
      "\"ECS workflow, but containers must run on our own on-premises hardware\" is the exact phrase pattern for ECS Anywhere.",
    questionIds: ["q-amazon-ecs-anywhere-1", "q-amazon-ecs-anywhere-2"],
  },

  {
    id: "amazon-eks-anywhere",
    moduleId: "phase-7-containers",
    category: "Containers",
    title: "Amazon EKS Anywhere",
    shortName: "EKS Anywhere",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon EKS Anywhere is a deployment option that lets you create and operate Kubernetes clusters on your own on-premises or edge infrastructure, using the same tooling AWS uses for EKS.",
    englishExplanation:
      "EKS Anywhere is built on Amazon EKS Distro (the same open-source Kubernetes components AWS uses to run EKS in the cloud), packaged with tooling and validated reference architectures so you can run a consistent, supported Kubernetes cluster entirely outside AWS — on your own data center hardware or edge devices, including in environments with no connectivity back to an AWS Region at all. This differs from EKS itself, where AWS manages the control plane; with EKS Anywhere, you (or your infrastructure) run and manage the whole cluster.",
    taglishExplanation:
      "Si EKS Anywhere ay para talaga sa mga gustong mag-run ng Kubernetes cluster sa sarili nilang on-premises o edge hardware — hindi na kailangang konektado sa AWS Region. Gamit dito ang parehong open-source components (EKS Distro) na ginagamit ng AWS mismo sa cloud na EKS, kaya consistent ang experience, pero ikaw na mismo (o ang infra mo) ang nagmamanage ng buong cluster, kasama na ang control plane.",
    analogy:
      "If EKS is renting a fully-staffed Kubernetes control room from AWS, EKS Anywhere is being handed the exact same blueprints and equipment so you can build and run an identical control room yourself, wherever you want — even somewhere with no connection back to AWS at all.",
    whyItExists:
      "Some organizations need Kubernetes clusters completely on-premises or air-gapped (no AWS Region connectivity), but still want consistency with AWS's Kubernetes distribution and tooling rather than adopting a completely different Kubernetes stack.",
    flow: "EKS Distro (open-source components) -> EKS Anywhere tooling -> Cluster deployed and operated on customer-owned infrastructure",
    withoutIt: [
      "Teams needing fully on-premises/air-gapped Kubernetes would need to adopt a different Kubernetes distribution disconnected from AWS's ecosystem",
    ],
    bestUseCases: [
      "Fully on-premises or air-gapped environments needing Kubernetes with no AWS Region connectivity",
      "Organizations wanting consistency with AWS's Kubernetes distribution across cloud and on-premises clusters",
    ],
    poorUseCases: [
      "Teams fine with an AWS-managed control plane — plain Amazon EKS is simpler and less operational burden",
    ],
    alternatives: [
      { need: "AWS-managed Kubernetes control plane in the cloud", choose: "Amazon EKS" },
      { need: "Run ECS (not Kubernetes) on customer-owned infrastructure", choose: "Amazon ECS Anywhere" },
    ],
    keyFeatures: [
      "Built on the open-source Amazon EKS Distro",
      "Works fully disconnected from AWS Regions, including air-gapped environments",
      "Validated reference architectures and tooling for consistent cluster setup",
    ],
    availability:
      "Because the entire cluster (including the control plane) runs on customer-owned infrastructure, availability is entirely the customer's responsibility to design for, unlike managed EKS in AWS.",
    security:
      "Security relies on standard Kubernetes RBAC and whatever network/host security the customer applies to their own infrastructure — there is no AWS IAM-managed control plane involved.",
    pricingLogic:
      "EKS Anywhere software/tooling has its own support subscription option; the underlying infrastructure it runs on is whatever the customer already owns/operates, so there is no AWS compute charge for the cluster itself.",
    examKeywords: ["on-premises Kubernetes", "air-gapped", "EKS Distro", "self-managed control plane"],
    examTraps: [
      "Do not confuse EKS Anywhere (customer manages the whole cluster on their own hardware) with EKS (AWS manages the control plane in the cloud).",
    ],
    architectureDiagram: "EKS Distro (open-source)\n        |\nEKS Anywhere tooling\n        |\nCustomer Infrastructure (full cluster incl. control plane)",
    architectureCaption: "The entire Kubernetes cluster, including the control plane, runs on infrastructure the customer owns.",
    mentorTip:
      "\"Kubernetes cluster must run fully on-premises / air-gapped, no connection to AWS\" is the signal for EKS Anywhere, not EKS.",
    questionIds: ["q-amazon-eks-anywhere-1", "q-amazon-eks-anywhere-2"],
  },

  {
    id: "amazon-eks-distro",
    moduleId: "phase-7-containers",
    category: "Containers",
    title: "Amazon EKS Distro",
    shortName: "EKS Distro",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon EKS Distro (EKS-D) is the open-source distribution of the same Kubernetes components AWS uses to build Amazon EKS, free for anyone to download and run anywhere.",
    englishExplanation:
      "EKS Distro packages the exact versions of Kubernetes and its dependencies that AWS tests and uses internally for Amazon EKS, and makes them available as a free, open-source distribution. Anyone can download and run EKS Distro on their own infrastructure, with no requirement to use AWS at all. It is the foundation that EKS Anywhere builds tooling and support on top of — EKS Distro is the raw, validated Kubernetes components; EKS Anywhere adds the cluster-management tooling and optional AWS support around it.",
    taglishExplanation:
      "Si EKS Distro ay yung mismong open-source na Kubernetes components na ginagamit ng AWS sa likod ng EKS — pero pwede mo itong i-download at patakbuhin kahit saan, kahit walang AWS account. Ito ang \"pundasyon\" na ginagamit ng EKS Anywhere para dagdagan ng management tooling at opsyonal na AWS support.",
    analogy:
      "If EKS Anywhere is a fully-packaged furniture kit with instructions and a support hotline, EKS Distro is just the raw, high-quality lumber (the tested Kubernetes components) that anyone is free to take and build with themselves, with no kit or support included.",
    whyItExists:
      "AWS already validates and tests specific versions of Kubernetes components to run EKS reliably. EKS Distro exists to share that same tested, consistent set of components with the broader community for free, so anyone can build reliable Kubernetes clusters without AWS having to keep that validation work proprietary.",
    flow: "AWS validates Kubernetes component versions internally -> Released as EKS Distro (open source) -> Anyone downloads and runs it anywhere",
    withoutIt: [
      "Teams wanting AWS's validated Kubernetes component versions outside of AWS would have no official free source for them",
    ],
    bestUseCases: [
      "Teams or vendors wanting to build their own Kubernetes tooling/products on top of AWS-tested Kubernetes components",
      "Organizations wanting the same Kubernetes versions AWS uses internally, without any AWS dependency at all",
    ],
    poorUseCases: [
      "Teams wanting a managed, supported experience out of the box — that's EKS Anywhere or EKS, not raw EKS Distro",
    ],
    alternatives: [
      { need: "A managed, supported way to run Kubernetes on your own infrastructure", choose: "Amazon EKS Anywhere" },
      { need: "A fully AWS-managed Kubernetes control plane", choose: "Amazon EKS" },
    ],
    keyFeatures: [
      "Free, open-source distribution of the exact Kubernetes components used by Amazon EKS",
      "No AWS account or connectivity required to use it",
      "Serves as the foundation underneath Amazon EKS Anywhere",
    ],
    availability:
      "As a software distribution rather than a managed service, availability is entirely determined by however you choose to deploy and operate it yourself.",
    security:
      "Security is entirely the responsibility of whoever deploys EKS Distro — there is no AWS-managed control plane, IAM integration, or support included by default.",
    pricingLogic:
      "EKS Distro itself is free and open source; you only incur costs for whatever infrastructure you run it on.",
    examKeywords: ["open-source Kubernetes distribution", "same components as EKS", "no AWS required"],
    examTraps: [
      "EKS Distro is just the software components — it is not a managed service, and it has no built-in AWS support unless paired with EKS Anywhere's subscription.",
    ],
    architectureDiagram: "AWS-tested Kubernetes components\n        |\nAmazon EKS Distro (open source, free)\n        |\nRun anywhere (any infrastructure, no AWS required)",
    architectureCaption: "EKS Distro is the raw, open-source foundation shared between EKS in the cloud and EKS Anywhere on-premises.",
    mentorTip:
      "If a question asks about a free, open-source Kubernetes distribution with no AWS dependency, that's EKS Distro; if it mentions AWS tooling/support for on-premises clusters, that's EKS Anywhere.",
    questionIds: ["q-amazon-eks-distro-1", "q-amazon-eks-distro-2"],
  },
];
