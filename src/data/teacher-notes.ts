import type { Lesson, TeacherNotes } from "@/lib/types";

// Teacher's notes are added on top of the original lessons without changing them: a plain-language
// walkthrough, the same idea in Taglish, and a few pro tips. Lessons without an entry simply omit the section.
const NOTES: Record<string, TeacherNotes> = {
  "iam-core": {
    english:
      "Let's slow down on IAM, because it is the first thing every other service depends on. Think of three questions: who is asking (the principal), what are they trying to do (the action) and on what (the resource). A policy is just a sentence that answers those questions with Allow or Deny. Start by deciding who needs access, then give the smallest permission that lets them finish the job.",
    taglish:
      "Dahan-dahan tayo sa IAM kasi ito ang pundasyon ng lahat. Tatlong tanong: sino ang humihingi (principal), ano ang gagawin (action), at saan (resource). Ang policy ay pangungusap na sumasagot niyan ng Allow o Deny. Alamin muna kung sino ang kailangang may access, tapos ibigay ang pinakamaliit na permission na sapat para matapos ang trabaho.",
    proTips: [
      "Roles beat users for anything that is not a human with a long-lived login. If a question mentions EC2, Lambda or another account, the answer is almost always a role.",
      "An explicit Deny always wins. When you see 'cannot access even though it is allowed', hunt for a Deny.",
      "Say least privilege out loud when you read an answer that uses wildcards for everything. That option is usually the distractor.",
    ],
  },
  "amazon-ec2": {
    english:
      "EC2 is a virtual server you rent by the second. Before you launch one, answer four things: what image (AMI), what size (instance type), what storage (EBS or instance store) and what network (VPC, subnet, security group). The instance type is a family and a size, such as m for general purpose or c for compute, so match the family to the bottleneck: CPU, memory, storage or GPU.",
    taglish:
      "Ang EC2 ay virtual server na inuupahan kada segundo. Bago mag-launch, sagutin ang apat: anong image (AMI), anong laki (instance type), anong storage (EBS o instance store), at anong network (VPC, subnet, security group). Ang instance type ay family at size, kaya itugma ang family sa bottleneck: CPU, memory, storage, o GPU.",
    proTips: [
      "Purchasing option is its own question: steady means Savings Plans or Reserved, interruptible means Spot, short and unpredictable means On-Demand.",
      "Instance store is fast but disappears when the instance stops, so never put data you must keep there.",
      "A bigger instance is scaling up. More instances behind a load balancer is scaling out, and the exam usually prefers scaling out for availability.",
    ],
  },
  "amazon-s3": {
    english:
      "Picture S3 as a limitless set of buckets holding objects, each reached by a key. You do not manage disks or servers, and the data is spread across multiple Availability Zones for durability. Most of your decisions are about access (who can read it), storage class (how often will you read it) and protection (versioning, encryption, replication).",
    taglish:
      "Isipin ang S3 bilang walang-hanggang mga bucket na may objects na may key. Walang disk o server na papatakbuhin, at kumakalat ang data sa maraming AZ para sa durability. Ang mga desisyon mo ay tungkol sa access (sino ang makakabasa), storage class (gaano kadalas babasahin), at proteksyon (versioning, encryption, replication).",
    proTips: [
      "Block Public Access is your safety net. If a scenario says data must never be public, think Block Public Access plus a bucket policy.",
      "Unknown access pattern means Intelligent-Tiering. Known ageing pattern means lifecycle rules.",
      "S3 is object storage. If the question needs a file system or a boot disk, it is not S3.",
    ],
  },
  "amazon-vpc": {
    english:
      "A VPC is your own private network inside AWS. Build it in layers: choose a CIDR range, split it into subnets across Availability Zones, then decide the traffic rules with route tables. A subnet is public only because its route table sends internet traffic to an internet gateway. Private subnets reach the internet, if at all, through a NAT gateway.",
    taglish:
      "Ang VPC ay sarili mong private network sa AWS. Magtayo nang patong-patong: pumili ng CIDR range, hatiin sa subnets sa iba't ibang AZ, tapos ang route tables ang magpapasya ng daloy. Public ang subnet dahil lang sa route table nito na papunta sa internet gateway. Ang private subnet ay lumalabas sa internet, kung kailangan, sa pamamagitan ng NAT gateway.",
    proTips: [
      "Draw it: internet gateway on the VPC, route to it in the public route table, NAT gateway in a public subnet for private subnets.",
      "Spread subnets across at least two AZs. Questions about high availability almost always include this.",
      "Security groups are stateful and attached to the resource. NACLs are stateless and attached to the subnet.",
    ],
  },
  "elastic-load-balancing": {
    english:
      "A load balancer gives clients one address and spreads their requests across healthy targets. Choose by what you are balancing: the Application Load Balancer works at layer 7 for HTTP and HTTPS and can route by path or host, the Network Load Balancer works at layer 4 for extreme performance and static IP addresses, and the Gateway Load Balancer fronts virtual appliances such as firewalls.",
    taglish:
      "Ang load balancer ay nagbibigay sa clients ng isang address at ipinamamahagi ang requests sa healthy na targets. Pumili ayon sa balanse: ALB sa layer 7 para sa HTTP/HTTPS na may path o host routing; NLB sa layer 4 para sa mataas na performance at static IP; Gateway Load Balancer para sa virtual appliances gaya ng firewall.",
    proTips: [
      "Path-based or host-based routing means ALB. Static IP or TCP and UDP at huge scale means NLB.",
      "Health checks are what make a load balancer useful for availability. Targets that fail are removed automatically.",
      "Pair it with Auto Scaling: the load balancer spreads traffic, the group adds or removes capacity.",
    ],
  },
  "ec2-auto-scaling": {
    english:
      "Auto Scaling keeps the right number of instances running. You describe the minimum, desired and maximum, a launch template that says what to launch and one or more policies that say when to scale. Target tracking is the easiest policy: you set a target such as 50 percent average CPU and Auto Scaling does the arithmetic.",
    taglish:
      "Pinapanatili ng Auto Scaling ang tamang dami ng instance. Ilalarawan mo ang minimum, desired, at maximum, ang launch template na nagsasabi kung ano ang ilulunsad, at ang policy kung kailan mag-scale. Pinakamadali ang target tracking: magtakda ng target gaya ng 50 percent CPU at ito na ang bahala sa kalkulasyon.",
    proTips: [
      "Scale on a metric that reflects demand, such as requests per target or queue depth, not just CPU, when the question gives you a choice.",
      "Spread the group across multiple AZs and put it behind a load balancer for resilience.",
      "A replaced unhealthy instance is self-healing. That is why Auto Scaling shows up in availability answers.",
    ],
  },
  "amazon-rds": {
    english:
      "RDS gives you a managed relational database: AWS handles backups, patching and failover, and you handle schema, queries and access. Remember the two helpers and what each is for. Multi-AZ keeps a standby copy in another AZ for availability and automatic failover. Read replicas copy data to extra instances to scale reads and can live in another Region.",
    taglish:
      "Ang RDS ay managed na relational database: AWS ang sa backups, patching, at failover; ikaw ang sa schema, queries, at access. Tandaan ang dalawang katulong: Multi-AZ ay standby copy sa ibang AZ para sa availability at awtomatikong failover; read replicas ay kopya para mag-scale ng reads at puwedeng nasa ibang Region.",
    proTips: [
      "Multi-AZ is for availability, read replicas are for performance. In standard Multi-AZ the standby does not serve reads.",
      "Encryption must be chosen at creation. To encrypt an existing database, snapshot, copy encrypted and restore.",
      "Many connections from Lambda or many app servers point to RDS Proxy.",
    ],
  },
  "amazon-aurora": {
    english:
      "Aurora is a MySQL and PostgreSQL compatible database built by AWS, with storage that grows automatically and keeps six copies of your data across three Availability Zones. Compared with standard RDS, you get faster failover, up to 15 read replicas and optional features such as Global Database for cross-Region reads and Serverless v2 for variable load.",
    taglish:
      "Ang Aurora ay MySQL at PostgreSQL compatible na database na gawa ng AWS, na kusang lumalaki ang storage at may anim na kopya ng data sa tatlong AZ. Kumpara sa karaniwang RDS: mas mabilis ang failover, hanggang 15 read replicas, at may Global Database para sa cross-Region reads at Serverless v2 para sa variable na load.",
    proTips: [
      "High performance relational plus MySQL or PostgreSQL compatibility with minimal admin is Aurora.",
      "Use the reader endpoint to spread reads across replicas and the cluster endpoint for writes.",
      "Variable or unpredictable load points to Aurora Serverless v2.",
    ],
  },
  "amazon-dynamodb": {
    english:
      "DynamoDB is a serverless key-value and document database that gives single-digit millisecond reads at almost any scale. Everything starts with the key design: a partition key, and optionally a sort key, decides how data is spread and how you can query it. Pick keys that spread traffic evenly, because a hot key throttles even when total capacity looks fine.",
    taglish:
      "Ang DynamoDB ay serverless na key-value at document database na may single-digit millisecond na reads kahit gaano kalaki. Nagsisimula ang lahat sa key design: ang partition key (at sort key kung kailangan) ang nagpapasya kung paano kumakalat ang data at paano mo ito mi-query. Pumili ng key na pantay ang trapiko dahil ang hot key ay nagti-throttle kahit sapat ang kabuuang capacity.",
    proTips: [
      "Steady traffic suits provisioned capacity with auto scaling. Spiky or unknown traffic suits on-demand.",
      "Microsecond reads for a read-heavy table means DAX. Cross-Region active-active means global tables.",
      "DynamoDB is not for complex joins or ad-hoc SQL analytics. Think Aurora or Athena for those.",
    ],
  },
  "aws-lambda": {
    english:
      "Lambda runs your code in response to an event and you pay only for the time it runs. You never see a server, but you do inherit its limits: up to 15 minutes per run, memory you choose between 128 MB and 10 GB, and a concurrency quota. Think of Lambda as the glue that reacts to something happening, such as a file arriving in S3, a message in SQS or an API request.",
    taglish:
      "Pinapatakbo ng Lambda ang code mo bilang tugon sa event at nagbabayad ka lang sa oras na tumakbo. Wala kang nakikitang server pero may limitasyon: hanggang 15 minuto kada takbo, memory na 128 MB hanggang 10 GB, at concurrency quota. Isipin ang Lambda bilang pandikit na tumutugon sa nangyayari, gaya ng file sa S3, mensahe sa SQS, o API request.",
    proTips: [
      "Longer than 15 minutes means a container or batch service, not Lambda.",
      "Lambda in a VPC needs a route out (NAT or endpoints) to reach the internet or AWS APIs.",
      "Lots of Lambda calls to a relational database means RDS Proxy, so you do not exhaust connections.",
    ],
  },
  "amazon-sqs": {
    english:
      "SQS is a queue that sits between a producer and a consumer so they do not have to run at the same speed or at the same time. Messages wait until a consumer processes and deletes them. The two big decisions are standard versus FIFO (best-effort ordering with at-least-once delivery versus strict ordering with exactly-once processing) and what to do with messages that keep failing, which is a dead-letter queue.",
    taglish:
      "Ang SQS ay queue sa pagitan ng producer at consumer para hindi sila kailangang magkasabay ng bilis o oras. Naghihintay ang mensahe hanggang maproseso at mabura ng consumer. Dalawang desisyon: standard o FIFO (best-effort ordering at at-least-once, o mahigpit na ordering na may exactly-once processing) at ano ang gagawin sa mga paulit-ulit na pumapalya, na dead-letter queue.",
    proTips: [
      "Decouple and absorb spikes means SQS. Scale consumers on queue depth.",
      "Standard queues can deliver duplicates, so make consumers idempotent.",
      "Set the visibility timeout longer than your processing time to avoid double processing.",
    ],
  },
  "amazon-sns": {
    english:
      "SNS is publish and subscribe. A publisher sends one message to a topic and every subscriber receives it: email, SMS, HTTP endpoints, Lambda or SQS queues. It pushes, while SQS waits to be pulled. The classic pattern combines them: SNS fans out to several SQS queues so each consumer gets its own copy and processes at its own pace.",
    taglish:
      "Ang SNS ay publish at subscribe. Nagpapadala ang publisher ng isang mensahe sa topic at lahat ng subscriber ay tatanggap: email, SMS, HTTP, Lambda, o SQS. Nagtutulak ito, samantalang ang SQS ay hinihila. Ang klasikong pattern: SNS fan-out sa ilang SQS queue para bawat consumer ay may sariling kopya.",
    proTips: [
      "One event, many independent consumers means SNS fan-out to SQS.",
      "SNS is not a durable queue. Use SQS behind it if consumers must not lose messages.",
      "Message filtering lets each subscriber receive only the messages it cares about.",
    ],
  },
  "amazon-cloudfront": {
    english:
      "CloudFront is a content delivery network. Copies of your content are cached at edge locations close to users, so repeat requests are served fast and your origin does less work. The origin can be S3, an ALB or any HTTP server. It also lets you add HTTPS, WAF, signed URLs and geo restriction at the edge.",
    taglish:
      "Ang CloudFront ay content delivery network. Naka-cache ang kopya ng content sa edge locations na malapit sa users, kaya mabilis ang paulit-ulit na request at mas kaunti ang trabaho ng origin. Puwedeng S3, ALB, o kahit anong HTTP server ang origin. Puwede ring magdagdag ng HTTPS, WAF, signed URLs, at geo restriction.",
    proTips: [
      "Private S3 origin behind CloudFront means origin access control, so users cannot bypass it.",
      "Dynamic or non-HTTP traffic that needs a better network path points to Global Accelerator, not CloudFront.",
      "Longer TTL means fewer origin hits but staler content. Invalidate when you must.",
    ],
  },
  "amazon-route-53": {
    english:
      "Route 53 is DNS plus health checks. The part the exam cares about is the routing policy, which decides how a name is answered. Simple returns one answer, weighted splits traffic, latency picks the Region with the lowest latency, failover switches to a backup when a health check fails, geolocation answers by the user's location and multivalue returns several healthy answers.",
    taglish:
      "Ang Route 53 ay DNS at health checks. Ang mahalaga sa exam ay ang routing policy: simple (isang sagot), weighted (hati ng trapiko), latency (pinakamababang latency), failover (lilipat sa backup kapag pumalya ang health check), geolocation (ayon sa lokasyon ng user), at multivalue (ilang healthy na sagot).",
    proTips: [
      "Failover routing needs a health check. Without one it cannot know to fail over.",
      "Use an alias record for AWS resources at the zone apex, because a CNAME cannot be used there.",
      "Latency routing is about speed. Geolocation is about legal or content rules by location.",
    ],
  },
  "amazon-ebs": {
    english:
      "EBS is a network disk for one EC2 instance in one Availability Zone. Pick the type by what you need: gp3 for general purpose with a steady baseline, io2 for sustained high IOPS and st1 or sc1 for cheap throughput on large sequential work. Snapshots are incremental backups stored in S3 that you can copy to another AZ or Region.",
    taglish:
      "Ang EBS ay network disk para sa isang EC2 instance sa isang AZ. Pumili ng type ayon sa kailangan: gp3 para sa pangkalahatan na may steady baseline, io2 para sa tuloy-tuloy na mataas na IOPS, at st1 o sc1 para sa murang throughput sa malalaking sequential. Ang snapshots ay incremental backups sa S3 na puwedeng kopyahin sa ibang AZ o Region.",
    proTips: [
      "To move a volume to another AZ, snapshot it and create a new volume in the target AZ.",
      "Unattached volumes and old snapshots still cost money. Clean them up.",
      "Shared file access from many instances is EFS, not EBS.",
    ],
  },
  "amazon-efs": {
    english:
      "EFS is a shared file system for Linux that many instances in several Availability Zones can mount at the same time. It grows and shrinks as you add and remove files, so you do not size it. Use it when instances need the same files, such as web content, home directories or shared build artifacts.",
    taglish:
      "Ang EFS ay shared na file system para sa Linux na puwedeng i-mount ng maraming instance sa iba't ibang AZ nang sabay. Kusang lumalaki at lumiliit, kaya hindi mo ito sine-size. Gamitin kapag kailangan ng parehong files ng maraming instance, gaya ng web content, home directories, o shared build artifacts.",
    proTips: [
      "Shared POSIX files across instances means EFS. SMB and Active Directory means FSx for Windows.",
      "Use lifecycle management to move rarely used files to a cheaper storage class.",
      "Mount through mount targets in each AZ, and secure with security groups.",
    ],
  },
  "aws-kms": {
    english:
      "KMS creates and manages the keys that protect your data, and the keys never leave KMS in plain text. Most of the time you use envelope encryption: KMS protects a data key, and the data key encrypts your data. You choose who can use a key through the key policy, and you get an audit trail of every use in CloudTrail.",
    taglish:
      "Ang KMS ay gumagawa at nagma-manage ng keys na nagpoprotekta sa data mo, at hindi lumalabas ang key nang plain text. Karaniwan ay envelope encryption: pinoprotektahan ng KMS ang data key, at ang data key ang nag-e-encrypt ng data. Ang key policy ang nagpapasya kung sino ang puwedeng gumamit, at may audit trail sa CloudTrail.",
    proTips: [
      "Control and audit of keys points to customer managed keys. AWS managed keys do not let you edit the key policy.",
      "Cross-account KMS needs the key policy and the caller's IAM policy to allow it.",
      "A dedicated hardware module you control is CloudHSM, not KMS.",
    ],
  },
  "amazon-cloudwatch": {
    english:
      "CloudWatch is how you see what your systems are doing. Metrics are numbers over time, logs are text records, alarms watch a metric and take action, and dashboards put it all in one place. Alarms can notify through SNS, trigger Auto Scaling or run an automated action. Remember it watches performance. It does not tell you who made an API call.",
    taglish:
      "Ang CloudWatch ang paraan para makita ang ginagawa ng sistema mo. Ang metrics ay numero sa paglipas ng oras, logs ay text records, alarms ay nagbabantay ng metric at kumikilos, at dashboards ang pinagsama-sama. Puwedeng mag-notify via SNS, mag-trigger ng Auto Scaling, o magpatakbo ng automated action. Performance ang binabantayan nito; hindi nito sinasabi kung sino ang tumawag ng API.",
    proTips: [
      "Memory and disk metrics for EC2 are not collected by default. You need the CloudWatch agent.",
      "Alarm then SNS is the standard way to notify. Alarm then Auto Scaling is the standard way to react.",
      "Who called the API is CloudTrail. What changed in configuration is Config.",
    ],
  },
  "aws-cloudtrail": {
    english:
      "CloudTrail records API calls made in your account: who called what, when and from where. It answers the audit question. Turn on an organization trail that delivers to S3 with log file validation so the records cannot be quietly changed, and send events to CloudWatch Logs if you want alerts on specific actions.",
    taglish:
      "Nire-record ng CloudTrail ang mga API call sa account mo: sino ang tumawag ng ano, kailan, at saan galing. Ito ang sagot sa audit question. Mag-on ng organization trail papuntang S3 na may log file validation para hindi mabago nang tahimik, at ipadala sa CloudWatch Logs kung gusto ng alert sa partikular na aksyon.",
    proTips: [
      "Who deleted the resource is CloudTrail. How is the resource configured over time is Config.",
      "Protect the log bucket and use an organization trail so member accounts cannot turn it off.",
      "Management events are on by default. Data events such as S3 object access must be enabled.",
    ],
  },
  "aws-cloudformation": {
    english:
      "CloudFormation lets you describe your infrastructure in a template and create it as a stack. The big benefit is repeatability: the same template gives the same result in every account and Region, and you can review changes before applying them with change sets. If a stack update fails, it rolls back, and when you delete the stack the resources go with it.",
    taglish:
      "Sa CloudFormation, ide-describe mo ang infrastructure sa template at gagawin ito bilang stack. Ang malaking benepisyo ay repeatability: parehong template, parehong resulta sa bawat account at Region, at puwedeng suriin ang pagbabago gamit ang change sets bago i-apply. Kapag pumalya ang update, nagro-rollback, at kapag binura ang stack, kasama ang resources.",
    proTips: [
      "Repeatable, version-controlled infrastructure means CloudFormation (or CDK).",
      "Use a DeletionPolicy of Retain or Snapshot for data you cannot afford to lose with the stack.",
      "Detect manual changes outside the template with drift detection.",
    ],
  },
  "security-groups-vs-nacls": {
    english:
      "Two firewalls, two jobs. A security group sits on the resource, is stateful and only allows traffic: if you allow a request in, the reply is allowed out automatically. A network ACL sits on the subnet, is stateless and has both allow and deny rules, so you must allow the return traffic yourself. Most of your rules belong in security groups.",
    taglish:
      "Dalawang firewall, dalawang trabaho. Ang security group ay nasa resource, stateful at allow lang: kapag pinayagan ang request papasok, awtomatikong pinapayagan ang sagot palabas. Ang NACL ay nasa subnet, stateless, at may allow at deny kaya kailangan mong payagan ang return traffic. Karamihan ng rules ay nasa security groups.",
    proTips: [
      "Need to block one IP address? A NACL deny rule. A security group cannot deny.",
      "Reference a security group as the source of another instead of using IP ranges.",
      "Default NACL allows all. A custom NACL denies everything until you add rules.",
    ],
  },
  "nat-gateway": {
    english:
      "A NAT gateway lets instances in private subnets start connections to the internet, for example to download updates, while the internet cannot start connections to them. Put it in a public subnet, point the private route table at it and, for resilience, create one per Availability Zone. It is managed, scales automatically and charges per hour and per GB processed.",
    taglish:
      "Ang NAT gateway ay nagpapahintulot sa instances sa private subnet na magsimula ng koneksyon sa internet, gaya ng pag-download ng updates, pero hindi puwedeng magsimula ang internet papunta sa kanila. Ilagay sa public subnet, ituro ang route table ng private subnet dito, at gumawa ng isa kada AZ para sa resilience. Managed ito at sinisingil kada oras at kada GB.",
    proTips: [
      "Traffic to S3 or DynamoDB through NAT is wasted cost. Use gateway VPC endpoints instead.",
      "IPv6 outbound only uses an egress-only internet gateway, not NAT.",
      "A NAT gateway in one AZ is a single point of failure for the private subnets using it.",
    ],
  },
  "vpc-endpoints-privatelink": {
    english:
      "Endpoints let your VPC reach AWS services without going over the public internet. A gateway endpoint is for S3 and DynamoDB, is free and works through route tables. An interface endpoint is an elastic network interface powered by PrivateLink for many other services and for your own services, and it has an hourly and data charge. Endpoint policies add another control layer.",
    taglish:
      "Pinapayagan ng endpoints ang VPC na maabot ang AWS services nang hindi dumadaan sa public internet. Ang gateway endpoint ay para sa S3 at DynamoDB, libre, at gumagana sa route tables. Ang interface endpoint ay network interface na gumagamit ng PrivateLink para sa maraming service at sa sarili mong service, may bayad kada oras at data. Ang endpoint policy ay dagdag na control.",
    proTips: [
      "S3 or DynamoDB privately and cheaply is a gateway endpoint. Anything else privately is an interface endpoint.",
      "Exposing your service privately to other VPCs or accounts is PrivateLink.",
      "Combine an endpoint policy with a bucket policy condition on the endpoint to lock data to your VPC.",
    ],
  },
  "aws-organizations-control-tower-service-catalog": {
    english:
      "Organizations lets you manage many accounts as one: group them into organizational units, attach service control policies as guardrails, and get consolidated billing. Control Tower builds on it to set up a well-governed multi-account landing zone with guardrails and a baseline. Service Catalog gives teams an approved menu of products they can launch without broad permissions.",
    taglish:
      "Sa Organizations, ma-ma-manage mo ang maraming account bilang isa: i-group sa OUs, mag-attach ng SCP bilang guardrail, at consolidated billing. Ang Control Tower ay nagtatayo ng well-governed na multi-account landing zone na may guardrails at baseline. Ang Service Catalog ay nagbibigay ng aprubadong menu ng products na puwedeng i-launch ng teams nang hindi nangangailangan ng malawak na permissions.",
    proTips: [
      "An SCP never grants permissions. It sets the maximum an account can be given.",
      "Setting up a secure multi-account environment quickly with best practices points to Control Tower.",
      "Standardised, approved infrastructure that teams self-serve points to Service Catalog.",
    ],
  },
  "amazon-ecs": {
    english:
      "ECS is AWS's own container orchestrator. You describe a task (the containers, CPU, memory, role) in a task definition, then run tasks directly or keep a number of them running with a service. The big choice is the launch type: Fargate runs containers with no servers to manage, while EC2 gives you control of the instances and can cost less at steady high utilisation.",
    taglish:
      "Ang ECS ay container orchestrator ng AWS. Ide-describe mo ang task (containers, CPU, memory, role) sa task definition, tapos tatakbuhin nang direkta o panatilihin ang dami gamit ang service. Ang malaking pasya ay ang launch type: Fargate na walang server na papatakbuhin, o EC2 na ikaw ang may kontrol sa instances at puwedeng mas mura sa steady na mataas na gamit.",
    proTips: [
      "No servers to manage for containers means Fargate.",
      "The task role is for your application. The task execution role pulls images and writes logs.",
      "Need Kubernetes specifically? That is EKS. Otherwise ECS is simpler.",
    ],
  },
  "aws-fargate": {
    english:
      "Fargate is the serverless way to run containers on ECS or EKS. You specify CPU and memory per task, and AWS provides the compute, so there are no instances to patch or scale. Each task runs isolated with its own network interface. You pay for the resources the task requests for as long as it runs.",
    taglish:
      "Ang Fargate ay serverless na paraan ng pagpapatakbo ng containers sa ECS o EKS. Itatakda mo ang CPU at memory kada task at AWS ang nagbibigay ng compute, kaya walang instance na ipa-patch o i-scale. Bawat task ay hiwalay at may sariling network interface. Nagbabayad ka sa resources na hiningi ng task habang tumatakbo ito.",
    proTips: [
      "Least operational overhead for containers is Fargate.",
      "Fargate Spot gives a discount for interruptible tasks.",
      "Workloads needing GPUs or special host access may require EC2 instead.",
    ],
  },
  "amazon-api-gateway": {
    english:
      "API Gateway is the front door for your APIs. It receives requests and forwards them to a backend such as Lambda, an HTTP service or another AWS service, while handling authorisation, throttling, caching and monitoring for you. Choose the type by need: REST APIs have the most features, HTTP APIs are cheaper and simpler, and WebSocket APIs keep a two-way connection open.",
    taglish:
      "Ang API Gateway ang pintuan ng mga API mo. Tumatanggap ito ng requests at ipinapasa sa backend gaya ng Lambda, HTTP service, o ibang AWS service, habang inaasikaso ang authorization, throttling, caching, at monitoring. Pumili ayon sa kailangan: REST API para sa pinakamaraming feature, HTTP API para sa mas mura at simple, at WebSocket para sa two-way na koneksyon.",
    proTips: [
      "Throttling and API keys protect the backend from abuse. Caching reduces backend load.",
      "A long job behind API Gateway needs an asynchronous design because of the integration timeout.",
      "Authorise with Cognito user pools, IAM or a Lambda authorizer depending on who the callers are.",
    ],
  },
  "amazon-kinesis": {
    english:
      "Kinesis is for streaming data that arrives continuously. Kinesis Data Streams holds records for consumers you write, in shards that each take a fixed amount of data. Firehose is the no-code way to load a stream into S3, Redshift or OpenSearch. Pick Streams when you need custom processing or replay, and Firehose when you only need delivery.",
    taglish:
      "Ang Kinesis ay para sa streaming data na tuloy-tuloy ang dating. Ang Data Streams ay nag-iimbak ng records para sa consumers na ikaw ang gagawa, sa shards na may takdang kapasidad. Ang Firehose ay no-code na paraan para i-load ang stream sa S3, Redshift o OpenSearch. Streams kung custom processing o replay ang kailangan; Firehose kung delivery lang.",
    proTips: [
      "Real-time custom processing with several consumers is Data Streams. Simple delivery to S3 is Firehose.",
      "Each shard takes 1 MB per second or 1,000 records per second in, so shard count sets throughput.",
      "Ordering is guaranteed per partition key within a shard.",
    ],
  },
  "disaster-recovery-strategies": {
    english:
      "Start with two numbers. RTO is how long you can be down and RPO is how much data you can afford to lose. Then pick the cheapest strategy that meets them: backup and restore is cheapest and slowest, pilot light keeps a minimal core running, warm standby runs a scaled-down copy and multi-site active-active runs full capacity in two places. Each step costs more and recovers faster.",
    taglish:
      "Magsimula sa dalawang numero: RTO ay gaano katagal puwedeng down, RPO ay gaano karaming data ang puwedeng mawala. Tapos piliin ang pinakamurang strategy na pasok: backup and restore (pinakamura at pinakamabagal), pilot light (minimal na core na tumatakbo), warm standby (maliit na kopyang tumatakbo), at multi-site active-active (buong capacity sa dalawang lugar). Bawat hakbang ay mas mahal at mas mabilis mag-recover.",
    proTips: [
      "Minutes of RTO and RPO usually means warm standby or active-active. Hours is pilot light. Days is backup and restore.",
      "Test the plan. An untested recovery plan is a guess.",
      "Replicate data across Regions with the right service, such as Aurora Global Database, DynamoDB global tables or S3 replication.",
    ],
  },
  "high-availability": {
    english:
      "High availability means the system keeps working when parts fail, by removing single points of failure. Do it in layers: run more than one of everything, spread across Availability Zones, put a load balancer in front, use health checks to remove failed parts and keep state out of the instances so any instance can be replaced. A Region failure is a different, rarer problem solved with a multi-Region design.",
    taglish:
      "Ang high availability ay tuloy-tuloy ang sistema kahit may pumalya, sa pagtanggal ng single points of failure. Gawin nang patong-patong: higit sa isa ang bawat bahagi, kalat sa maraming AZ, may load balancer sa harap, health checks para alisin ang pumalya, at nasa labas ng instance ang state para mapalitan ang kahit anong instance. Ang pagbagsak ng buong Region ay mas bihira at multi-Region ang solusyon.",
    proTips: [
      "Multi-AZ answers protect against an AZ failure. Multi-Region answers protect against a Region failure.",
      "Look for the single point of failure in the diagram, such as one NAT gateway or one instance.",
      "High availability is not the same as fault tolerance. Fault tolerance means no interruption at all.",
    ],
  },
  "savings-plans-reserved-spot": {
    english:
      "Match the purchase option to the shape of the usage. Steady, predictable usage earns a discount when you commit: Savings Plans for flexibility across instance families and services, Reserved Instances for specific capacity. Flexible, interruptible work belongs on Spot at up to a large discount. Unknown or short usage stays On-Demand. Right-size first, because committing to oversized capacity just locks in waste.",
    taglish:
      "Itugma ang purchase option sa hugis ng gamit. Ang steady at predictable ay may discount kapag nag-commit: Savings Plans para sa flexibility sa instance family at services, Reserved Instances para sa partikular na capacity. Ang flexible at interruptible ay sa Spot na malaki ang discount. Ang hindi tiyak o maikli ay On-Demand. I-right-size muna bago mag-commit dahil ang pag-commit sa sobrang laki ay nakakulong na aksaya.",
    proTips: [
      "Flexibility across families, Regions or Fargate and Lambda points to a Compute Savings Plan.",
      "Spot suits fault-tolerant and stateless work, with diversified instance types to reduce interruptions.",
      "Commit to the steady baseline only, and let On-Demand or Spot cover the variable part.",
    ],
  },
  "s3-glacier": {
    english:
      "The Glacier storage classes are for data you rarely read. They get cheaper to store as retrieval gets slower: Glacier Instant Retrieval gives millisecond access, Flexible Retrieval takes minutes to hours and Deep Archive takes hours and is the cheapest. Each has a minimum storage duration, so deleting early still charges for the remaining days, and retrievals have their own fees.",
    taglish:
      "Ang Glacier storage classes ay para sa data na bihirang basahin. Mas mura ang storage habang mas mabagal ang retrieval: Instant Retrieval (millisecond), Flexible Retrieval (minuto hanggang oras), at Deep Archive (oras, pinakamura). Bawat isa ay may minimum storage duration, kaya kapag binura nang maaga, sinisingil pa rin ang natitirang araw, at may bayad ang retrieval.",
    proTips: [
      "Archive that must still return in milliseconds is Glacier Instant Retrieval.",
      "Compliance records kept for years and almost never read points to Deep Archive.",
      "Move data automatically with lifecycle rules instead of by hand.",
    ],
  },
};

export function withTeacherNotes(lessons: Lesson[]): Lesson[] {
  return lessons.map((l) => (NOTES[l.id] ? { ...l, teacherNotes: NOTES[l.id] } : l));
}

export const teacherNoteIds = Object.keys(NOTES);
