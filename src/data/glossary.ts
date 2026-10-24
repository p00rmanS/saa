import type { GlossaryTerm } from "@/lib/types";

export const glossary: GlossaryTerm[] = [
  {
    id: "region",
    term: "Region",
    definition:
      "A physical geographic area containing multiple isolated data centers (Availability Zones). You choose a Region for most AWS resources.",
    taglish: "Isang siyudad kung saan may mga AWS data centers — pinipili mo ito kapag naglalagay ng resources.",
  },
  {
    id: "availability-zone",
    term: "Availability Zone",
    definition:
      "One or more discrete data centers within a Region, with independent power, cooling, and networking, isolated from failures in other AZs.",
    taglish: "Hiwalay na 'building' sa loob ng isang Region — may sariling power at network, kaya kung magkaproblema sa isa, tuloy-tuloy pa rin ang iba.",
  },
  {
    id: "edge-location",
    term: "Edge Location",
    definition:
      "A site, much more numerous than Regions, used by services like CloudFront and Route 53 to serve content and resolve DNS closer to end users.",
    taglish: "Maliit na sangay na malapit sa users, ginagamit para mas mabilis ang CloudFront at Route 53.",
  },
  {
    id: "vpc",
    term: "VPC",
    definition:
      "Virtual Private Cloud — your own logically isolated virtual network within AWS, where you control IP ranges, subnets, and routing.",
    taglish: "Sarili mong pribadong network sa loob ng AWS.",
  },
  {
    id: "subnet",
    term: "Subnet",
    definition:
      "A range of IP addresses within a VPC, scoped to a single Availability Zone, marked as public (has a route to an Internet Gateway) or private.",
    taglish: "Isang bahagi ng VPC na naka-assign sa isang AZ — puwedeng public o private.",
  },
  {
    id: "cidr",
    term: "CIDR",
    definition:
      "Classless Inter-Domain Routing — the notation (e.g. 10.0.0.0/16) used to define the size and range of IP addresses in a VPC or subnet.",
    taglish: "Ang paraan ng pagsulat kung gaano kalaki ang range ng IP addresses (hal. 10.0.0.0/16).",
  },
  {
    id: "route-table",
    term: "Route Table",
    definition:
      "A set of rules (routes) that determine where network traffic from a subnet is directed.",
    taglish: "Listahan ng mga direksyon kung saan pupunta ang traffic mula sa isang subnet.",
  },
  {
    id: "stateful",
    term: "Stateful",
    definition:
      "A system or firewall rule that remembers prior interactions — e.g. a Security Group automatically allows return traffic for an approved request.",
    taglish: "Naaalala ng system ang naunang koneksyon — kaya automatic na pinapayagan ang sagot sa isang request.",
  },
  {
    id: "stateless",
    term: "Stateless",
    definition:
      "A system or firewall rule that does not remember prior interactions — e.g. a NACL evaluates inbound and outbound traffic independently.",
    taglish: "Hindi naaalala ng system ang naunang koneksyon — kailangan hiwalay na payagan ang papasok at palabas na traffic.",
  },
  {
    id: "horizontal-scaling",
    term: "Horizontal Scaling",
    definition:
      "Adding more instances/nodes to handle increased load, rather than making a single instance bigger.",
    taglish: "Magdagdag ng dami ng servers, hindi paglakihin ang isa lang.",
  },
  {
    id: "vertical-scaling",
    term: "Vertical Scaling",
    definition:
      "Increasing the size/capacity of a single instance (bigger CPU, more memory) rather than adding more instances.",
    taglish: "Palakihin ang laki ng iisang server, hindi magdagdag ng bilang.",
  },
  {
    id: "high-availability-term",
    term: "High Availability",
    definition:
      "An architecture designed to recover quickly from failure, minimizing (but not always fully eliminating) downtime.",
    taglish: "Mabilis bumalik kapag may nag-fail, kahit may konting downtime.",
  },
  {
    id: "fault-tolerance-term",
    term: "Fault Tolerance",
    definition:
      "An architecture that continues operating with zero disruption even when a component fails — a stricter bar than high availability.",
    taglish: "Tuloy-tuloy pa rin gumagana kahit may nag-fail na parte — hindi na kailangan ng downtime.",
  },
  {
    id: "rto",
    term: "RTO (Recovery Time Objective)",
    definition: "The maximum acceptable length of time a system can be down after a disaster before it must be restored.",
    taglish: "Ang pinakamatagal na puwedeng maging down ang system bago ito maibalik.",
  },
  {
    id: "rpo",
    term: "RPO (Recovery Point Objective)",
    definition: "The maximum acceptable amount of data loss, measured in time, after a disaster.",
    taglish: "Ang pinakamaraming data na puwedeng mawala, sinusukat sa oras.",
  },
  {
    id: "eventual-consistency",
    term: "Eventual Consistency",
    definition:
      "A consistency model where, after a write, all reads will EVENTUALLY reflect that write, but not necessarily immediately.",
    taglish: "Pagkatapos ng pag-save, hindi agad makikita sa lahat ng dako ang bagong datos — pero eventually, makikita rin.",
  },
  {
    id: "synchronous",
    term: "Synchronous",
    definition: "A request that waits for a response before continuing — the caller is blocked until the operation completes.",
    taglish: "Naghihintay muna ang caller ng sagot bago magpatuloy.",
  },
  {
    id: "asynchronous",
    term: "Asynchronous",
    definition: "A request that does not wait for a response — the caller continues immediately while the operation happens independently.",
    taglish: "Hindi na naghihintay ang caller — tumutuloy agad habang tumatakbo ang operation nang hiwalay.",
  },
  {
    id: "serverless",
    term: "Serverless",
    definition:
      "A model where AWS manages the underlying servers entirely — you write code or define resource needs, and pay only for actual usage.",
    taglish: "Hindi ka na nangangasiwa ng server — si AWS na ang bahala, bayad ka lang sa aktwal na ginamit.",
  },
  {
    id: "microservices",
    term: "Microservices",
    definition: "An architecture style where an application is built as a collection of small, independently deployable services.",
    taglish: "Hinahati ang isang malaking application sa maliliit na independiyenteng services.",
  },
  {
    id: "decoupling",
    term: "Decoupling",
    definition: "Designing components so they don't depend directly on each other's availability or timing, often via a queue or event bus.",
    taglish: "Ginagawang hindi direktang umaasa sa isa't isa ang mga components, madalas sa pamamagitan ng queue o event bus.",
  },
  {
    id: "idempotency",
    term: "Idempotency",
    definition: "A property where performing the same operation multiple times produces the same result as performing it once.",
    taglish: "Kahit ilang beses mong ulitin ang parehong operation, pareho pa rin ang resulta.",
  },
  {
    id: "caching",
    term: "Caching",
    definition: "Temporarily storing a copy of data somewhere faster to access, to reduce latency and load on the original source.",
    taglish: "Pansamantalang pag-imbak ng datos sa mas mabilis na lugar para hindi na paulit-ulit tumama sa orihinal na source.",
  },
  {
    id: "replication",
    term: "Replication",
    definition: "Copying data from one location to another (e.g. across AZs or Regions) to improve durability or availability.",
    taglish: "Pagkopya ng datos mula sa isang lugar papunta sa iba, para mas maging matatag o available.",
  },
  {
    id: "sharding",
    term: "Sharding",
    definition: "Splitting a large dataset across multiple smaller partitions (shards) to distribute load and enable horizontal scaling.",
    taglish: "Paghahati ng malaking datos sa maliliit na bahagi para maipamahagi ang load.",
  },
  {
    id: "encryption-at-rest",
    term: "Encryption at Rest",
    definition: "Encrypting data while it is stored (on disk, in a database, in an object store), typically using KMS-managed keys.",
    taglish: "Pag-encrypt ng datos habang naka-imbak, hindi habang dumadaan sa network.",
  },
  {
    id: "encryption-in-transit",
    term: "Encryption in Transit",
    definition: "Encrypting data while it moves across a network, typically via TLS/HTTPS.",
    taglish: "Pag-encrypt ng datos habang dumadaan ito sa network, gamit ang TLS/HTTPS.",
  },
  {
    id: "least-privilege",
    term: "Least Privilege",
    definition: "Granting only the exact permissions required to perform a task, nothing more.",
    taglish: "Bigyan lang ng eksaktong kailangan na pahintulot, wag sobra.",
  },
  {
    id: "immutable-infrastructure",
    term: "Immutable Infrastructure",
    definition:
      "An approach where servers/resources are never modified after deployment — instead, a new version is deployed and the old one is replaced.",
    taglish: "Sa halip na baguhin ang existing na server, gumagawa ka na lang ng bago at papalitan ang luma.",
  },
  {
    id: "shared-responsibility-model",
    term: "Shared Responsibility Model",
    definition:
      "AWS secures the underlying cloud infrastructure (\"security OF the cloud\" — hardware, data centers, host OS, network); you are responsible for what you configure inside it (\"security IN the cloud\" — data, IAM permissions, OS patching on EC2, security group rules, encryption settings).",
    taglish: "Ang AWS ang bahala sa seguridad ng mismong imprastraktura (data centers, hardware). Ikaw naman ang bahala sa kung paano mo ito ina-ayos — mga permission, encryption, at settings mo.",
  },
  {
    id: "durability",
    term: "Durability",
    definition:
      "The likelihood that stored data survives over time without being lost or corrupted (e.g. S3's 99.999999999% / \"11 nines\" durability) — a different guarantee from availability, which is about whether the data can be reached right now.",
    taglish: "Kung gaano katiyak na hindi mawawala o masisira ang naka-store mong datos sa paglipas ng panahon — iba ito sa availability, na tungkol sa kung ma-a-access mo ba ito ngayon din.",
  },
  {
    id: "elasticity",
    term: "Elasticity",
    definition:
      "The ability of a system to automatically grow AND shrink its resources to match actual demand in real time — scalability is the capacity to grow at all; elasticity specifically includes shrinking back down when demand drops.",
    taglish: "Kakayahan ng system na automatic na lumaki at lumiit depende sa aktwal na pangangailangan — hindi lang ito basta \"kayang lumaki\" (scalability), kasama rin ang awtomatikong pagliit pagbaba ng gamit.",
  },
  {
    id: "blast-radius",
    term: "Blast Radius",
    definition:
      "How much of a system would be affected if a single component, credential, or account were compromised or failed — good architecture and security design aims to keep the blast radius as small as possible.",
    taglish: "Kung gaano kalawak ang maapektuhan kapag may isang bahagi, credential, o account na na-compromise o nasira — layunin ng magandang disenyo na paliitin ito hangga't maaari.",
  },
  {
    id: "latency",
    term: "Latency",
    definition:
      "The time it takes for a single request to travel to a system and get a response. Lower is better, and it is affected by distance, so edge locations and nearby Regions reduce it.",
    taglish: "Gaano katagal bago makabalik ang sagot sa isang request. Mas mababa, mas mabilis. Naaapektuhan ito ng layo, kaya nakakatulong ang edge locations at kalapit na Region.",
  },
  {
    id: "throughput",
    term: "Throughput",
    definition:
      "The amount of work or data a system processes per unit of time, such as requests per second or MB per second. A system can have high throughput and still have high latency.",
    taglish: "Dami ng trabaho o data na naproseso kada oras, tulad ng request kada segundo o MB kada segundo. Puwedeng mataas ang throughput pero mataas din ang latency.",
  },
  {
    id: "iops",
    term: "IOPS",
    definition:
      "Input/output operations per second, a measure of how many read and write operations a storage volume or database can perform. Provisioned IOPS volumes such as io2 are for workloads that need consistently high IOPS.",
    taglish: "Bilang ng read at write na kaya ng storage kada segundo. Ang Provisioned IOPS tulad ng io2 ay para sa workload na laging nangangailangan ng mataas na IOPS.",
  },
  {
    id: "egress",
    term: "Egress",
    definition:
      "Data leaving a network or service, for example traffic going from AWS to the internet or to another Region. Data coming in (ingress) from the internet is generally free while egress is charged.",
    taglish: "Data na lumalabas sa isang network o service, halimbawa mula AWS papunta sa internet o ibang Region. Libre ang pumapasok mula internet, may bayad ang lumalabas.",
  },
  {
    id: "multi-az",
    term: "Multi-AZ",
    definition:
      "Running or replicating a resource across more than one Availability Zone so that the failure of one AZ does not take the workload down. It is a high availability technique, not a scaling technique.",
    taglish: "Pagpapatakbo o pagkopya ng resource sa higit sa isang Availability Zone para hindi mamatay ang workload kapag may AZ na bumagsak. Para ito sa availability, hindi sa performance.",
  },
  {
    id: "failover",
    term: "Failover",
    definition:
      "Automatically or manually switching traffic or workload from a failed component to a standby so service continues. Failback is switching back to the original once it has recovered.",
    taglish: "Paglipat ng traffic o workload mula sa nasirang bahagi papunta sa standby para tuloy ang serbisyo. Ang failback ay ang pagbalik sa orihinal kapag naayos na.",
  },
  {
    id: "disaster-recovery",
    term: "Disaster Recovery (DR)",
    definition:
      "The plan and technology for restoring a workload after a major failure such as the loss of a Region. The four AWS strategies from cheapest and slowest to costliest and fastest are backup and restore, pilot light, warm standby and multi-site active-active.",
    taglish: "Plano at teknolohiya para ibalik ang workload pagkatapos ng malaking pagkasira, tulad ng pagkawala ng buong Region. Apat ang strategy: backup and restore, pilot light, warm standby, at multi-site active-active.",
  },
  {
    id: "pilot-light",
    term: "Pilot Light",
    definition:
      "A disaster recovery strategy where only the core pieces (such as the replicated database) run in the recovery Region, and the rest of the environment is switched on and scaled up during a disaster.",
    taglish: "DR strategy kung saan ang pinakamahalagang bahagi lang (tulad ng replicated database) ang tumatakbo sa recovery Region, at saka lang bubuksan at palalakihin ang iba kapag may disaster.",
  },
  {
    id: "warm-standby",
    term: "Warm Standby",
    definition:
      "A disaster recovery strategy that keeps a scaled-down but fully functional copy of the workload running in another Region, which is scaled up when a failover happens.",
    taglish: "DR strategy na may maliit pero kumpletong kopya ng workload na tumatakbo sa ibang Region, na palalakihin kapag nag-failover.",
  },
  {
    id: "active-active",
    term: "Active-Active",
    definition:
      "A design where multiple Regions or sites serve live traffic at the same time, so the loss of one has little or no impact. It gives the lowest RTO and RPO and the highest cost and complexity.",
    taglish: "Disenyo kung saan sabay-sabay na naglilingkod ang maraming Region o site ng live na traffic. Pinakamababa ang RTO at RPO pero pinakamahal at pinakakomplikado.",
  },
  {
    id: "dead-letter-queue",
    term: "Dead-Letter Queue (DLQ)",
    definition:
      "A queue that receives messages that could not be processed successfully after a set number of attempts, so failures can be inspected and retried without blocking the main queue.",
    taglish: "Queue na tumatanggap ng mga mensaheng hindi nagtagumpay pagkatapos ng ilang beses na subok, para masuri at ma-retry nang hindi hinaharangan ang pangunahing queue.",
  },
  {
    id: "fan-out",
    term: "Fan-Out",
    definition:
      "Delivering one message to many consumers in parallel, for example publishing to an SNS topic that has several SQS queues subscribed.",
    taglish: "Pagpapadala ng isang mensahe sa maraming consumer nang sabay, halimbawa isang SNS topic na may ilang SQS queue na naka-subscribe.",
  },
  {
    id: "pub-sub",
    term: "Publish/Subscribe (Pub/Sub)",
    definition:
      "A messaging pattern where publishers send messages to a topic and every subscriber to that topic receives a copy, without publishers knowing who the subscribers are.",
    taglish: "Pattern kung saan nagpapadala ang publisher sa isang topic at bawat subscriber ay nakakatanggap ng kopya, nang hindi kilala ng publisher ang mga subscriber.",
  },
  {
    id: "event-driven",
    term: "Event-Driven Architecture",
    definition:
      "A design where components communicate by producing and reacting to events instead of calling each other directly, which keeps them loosely coupled and independently scalable.",
    taglish: "Disenyo kung saan nag-uusap ang mga component sa pamamagitan ng events sa halip na direktang pagtawag, kaya loosely coupled at puwedeng i-scale nang hiwalay.",
  },
  {
    id: "orchestration",
    term: "Orchestration vs Choreography",
    definition:
      "Orchestration uses a central coordinator (such as Step Functions) to direct each step of a workflow. Choreography has each service react to events from others with no central controller.",
    taglish: "Ang orchestration ay may sentrong coordinator (tulad ng Step Functions) na nagdidirekta ng bawat hakbang. Sa choreography, bawat service ay tumutugon sa events ng iba nang walang sentrong controller.",
  },
  {
    id: "cold-start",
    term: "Cold Start",
    definition:
      "The extra delay when a serverless function runs in a new execution environment that must be initialised first. Provisioned concurrency keeps environments ready to avoid it.",
    taglish: "Dagdag na antala kapag tumatakbo ang serverless function sa bagong execution environment na kailangan pang i-initialize. Iniiwasan ito ng provisioned concurrency.",
  },
  {
    id: "cdn",
    term: "Content Delivery Network (CDN)",
    definition:
      "A global network of edge locations that cache content close to users to reduce latency and load on the origin. Amazon CloudFront is the AWS CDN.",
    taglish: "Pandaigdigang network ng edge locations na nagka-cache ng content malapit sa user para bumilis at gumaan ang origin. Ang CloudFront ang CDN ng AWS.",
  },
  {
    id: "ttl",
    term: "TTL (Time to Live)",
    definition:
      "How long a cached item, DNS record or item in a table is considered valid before it expires or must be refreshed. Short TTLs mean fresher data and faster DNS changes, long TTLs mean less load.",
    taglish: "Gaano katagal itinuturing na valid ang isang cached na item o DNS record bago mag-expire. Maikling TTL ay mas sariwa, mahabang TTL ay mas magaan sa load.",
  },
  {
    id: "hot-partition",
    term: "Hot Partition",
    definition:
      "A single partition or shard that receives a disproportionate share of traffic because many requests use the same key, causing throttling even when total capacity looks sufficient.",
    taglish: "Isang partition o shard na sobrang dami ng natatanggap na traffic dahil iisang key ang gamit ng maraming request, kaya nagka-throttle kahit sapat ang kabuuang capacity.",
  },
  {
    id: "oltp-olap",
    term: "OLTP vs OLAP",
    definition:
      "OLTP workloads are many small, fast transactions that read and write individual records (RDS, Aurora, DynamoDB). OLAP workloads are large analytic queries that scan many rows (Redshift, Athena).",
    taglish: "Ang OLTP ay maraming maliliit at mabilis na transaction sa indibidwal na record. Ang OLAP ay malalaking analytic query na nag-i-scan ng maraming row.",
  },
  {
    id: "data-lake",
    term: "Data Lake",
    definition:
      "A central repository, usually in Amazon S3, that stores raw data in its original format at any scale so many different analytics tools can use it.",
    taglish: "Sentrong imbakan, kadalasan sa S3, ng raw data sa orihinal na anyo kahit gaano kalaki, para magamit ng iba't ibang analytics tool.",
  },
  {
    id: "etl",
    term: "ETL (Extract, Transform, Load)",
    definition:
      "Pulling data from sources, converting it into a useful shape or format, and loading it into a destination. AWS Glue is the serverless ETL service.",
    taglish: "Pagkuha ng data mula sa source, pag-convert sa kapaki-pakinabang na hugis o format, at pag-load sa destination. Ang AWS Glue ang serverless ETL.",
  },
  {
    id: "columnar-storage",
    term: "Columnar Storage",
    definition:
      "Storing data by column rather than by row, which makes analytic queries that read a few columns faster and cheaper. Redshift and the Parquet format use it.",
    taglish: "Pag-iimbak ng data kada column sa halip na kada row, kaya mas mabilis at mura ang analytic query na ilang column lang ang binabasa. Gumagamit nito ang Redshift at Parquet.",
  },
  {
    id: "throttling",
    term: "Throttling",
    definition:
      "Deliberately limiting the rate of requests a service will accept, returning an error such as HTTP 429 when the limit is exceeded, to protect the service from overload.",
    taglish: "Sadyang paglimita sa dami ng request na tatanggapin ng service, at pagbalik ng error tulad ng HTTP 429 kapag lumampas, para protektahan ito sa overload.",
  },
  {
    id: "exponential-backoff",
    term: "Exponential Backoff",
    definition:
      "A retry strategy that waits progressively longer between attempts (often with random jitter) so that many clients retrying do not overwhelm a service that is recovering.",
    taglish: "Retry strategy na paunti-unting pinahahaba ang paghihintay sa pagitan ng subok (kadalasan may random jitter) para hindi ma-overwhelm ang service na nagre-recover.",
  },
  {
    id: "service-quota",
    term: "Service Quota",
    definition:
      "A limit on how many resources or how much activity an account can use in a Region, such as the number of vCPUs. Many can be increased on request, and quotas are not copied between Regions.",
    taglish: "Limit sa dami ng resources o aktibidad na magagamit ng account sa isang Region, tulad ng bilang ng vCPU. Marami ang puwedeng itaas kapag nag-request, at hindi kinokopya ang quota sa ibang Region.",
  },
  {
    id: "resource-tag",
    term: "Tag",
    definition:
      "A key-value label attached to an AWS resource, used to organise, search, control access (ABAC) and allocate costs. Cost allocation tags must be activated in the Billing console.",
    taglish: "Key-value na label sa AWS resource, para mag-organize, maghanap, kontrolin ang access (ABAC), at maglaan ng gastos. Kailangang i-activate sa Billing console ang cost allocation tags.",
  },
  {
    id: "consolidated-billing",
    term: "Consolidated Billing",
    definition:
      "An AWS Organizations feature that combines the charges of all member accounts into one bill, pools usage for volume discounts and can share Reserved Instance and Savings Plans discounts.",
    taglish: "Feature ng Organizations na pinagsasama ang singil ng lahat ng member account sa isang bill, pinagsasama ang usage para sa volume discount, at puwedeng pagbahaginan ng RI at Savings Plans.",
  },
  {
    id: "point-in-time-recovery",
    term: "Point-in-Time Recovery (PITR)",
    definition:
      "Restoring a database to any moment within a retention window by combining backups with transaction logs. A restore creates a new database rather than overwriting the original.",
    taglish: "Pag-restore ng database sa kahit anong sandali sa loob ng retention window gamit ang backups at transaction logs. Gumagawa ito ng bagong database, hindi ino-overwrite ang orihinal.",
  },
  {
    id: "nat",
    term: "NAT (Network Address Translation)",
    definition:
      "Lets resources in a private subnet start connections to the internet while preventing the internet from starting connections to them. On AWS, a NAT gateway provides this for IPv4.",
    taglish: "Nagpapahintulot sa resources sa private subnet na magsimula ng koneksyon sa internet, pero hindi nito pinapayagang magsimula ang internet ng koneksyon papasok. Ang NAT gateway ang gumagawa nito sa IPv4.",
  },
  {
    id: "bastion-host",
    term: "Bastion Host",
    definition:
      "A hardened server in a public subnet used as a gateway for administrators to reach private instances over SSH or RDP. Systems Manager Session Manager is a safer alternative with no inbound ports.",
    taglish: "Matibay na server sa public subnet na ginagamit ng admin para maabot ang private instances sa SSH o RDP. Mas ligtas na alternatibo ang Session Manager na walang inbound port.",
  },
  {
    id: "presigned-url",
    term: "Presigned URL",
    definition:
      "A time-limited URL that grants temporary access to a private S3 object using the permissions of whoever created it, without making the bucket public.",
    taglish: "URL na may limitadong oras na nagbibigay ng pansamantalang access sa private na S3 object gamit ang permission ng gumawa nito, nang hindi ginagawang public ang bucket.",
  },
  {
    id: "iam-principal",
    term: "Principal",
    definition:
      "The entity that makes a request to AWS: an IAM user, role, federated user, application or AWS service. Resource-based policies name principals to say who may access the resource.",
    taglish: "Ang entity na gumagawa ng request sa AWS: IAM user, role, federated user, application o AWS service. Sa resource-based policy, pinapangalanan ang principal para sabihin kung sino ang puwedeng mag-access.",
  },
  {
    id: "sts-temporary-credentials",
    term: "Temporary Security Credentials",
    definition:
      "Short-lived access keys and session tokens issued by AWS STS when a role is assumed or a user federates. They expire automatically, which is safer than long-lived access keys.",
    taglish: "Maiikling access key at session token na ibinibigay ng STS kapag nag-assume ng role o nag-federate. Awtomatikong nag-e-expire, kaya mas ligtas kaysa sa long-lived na access keys.",
  },
  {
    id: "federation",
    term: "Federation",
    definition:
      "Letting users sign in with an identity from another system, such as a corporate directory or social provider, and receive temporary AWS access, instead of creating separate IAM users for them.",
    taglish: "Pagpapahintulot sa user na mag-sign in gamit ang identity mula sa ibang sistema, tulad ng corporate directory o social provider, at makatanggap ng pansamantalang AWS access, sa halip na gumawa ng hiwalay na IAM user.",
  },
  {
    id: "envelope-encryption",
    term: "Envelope Encryption",
    definition:
      "Encrypting data with a data key and then encrypting that data key with a master key in KMS, so large data never has to travel to KMS and the master key stays protected.",
    taglish: "Pag-encrypt ng data gamit ang data key, tapos pag-encrypt ng data key gamit ang master key sa KMS, kaya hindi na kailangang pumunta sa KMS ang malaking data.",
  },
  {
    id: "worm",
    term: "WORM (Write Once, Read Many)",
    definition:
      "Storage that lets data be written once and then prevents it from being changed or deleted for a set period. S3 Object Lock and AWS Backup Vault Lock provide it.",
    taglish: "Storage na isang beses lang puwedeng sulatan at pagkatapos ay hindi na mababago o mabubura sa takdang panahon. Ibinibigay ito ng S3 Object Lock at AWS Backup Vault Lock.",
  },
  {
    id: "infrastructure-as-code",
    term: "Infrastructure as Code (IaC)",
    definition:
      "Defining infrastructure in version-controlled templates that are deployed automatically, so environments are repeatable and reviewable. AWS CloudFormation is the native AWS service.",
    taglish: "Pagde-define ng infrastructure sa mga template na may version control at awtomatikong dine-deploy, kaya paulit-ulit at nare-review ang environment. Ang CloudFormation ang native na AWS service.",
  },
  {
    id: "configuration-drift",
    term: "Configuration Drift",
    definition:
      "When the real configuration of a resource differs from its intended or templated configuration because of manual changes. CloudFormation drift detection and AWS Config can reveal it.",
    taglish: "Kapag iba na ang aktwal na configuration ng resource sa dapat nitong configuration dahil sa manual na pagbabago. Nakikita ito ng CloudFormation drift detection at AWS Config.",
  },
  {
    id: "golden-ami",
    term: "Golden AMI",
    definition:
      "A pre-built machine image with the operating system, patches and agents already installed, so Auto Scaling launches identical, ready-to-serve instances quickly.",
    taglish: "Pre-built na machine image na may OS, patches, at agents na naka-install na, kaya mabilis at pare-pareho ang bagong instance na nilalabas ng Auto Scaling.",
  },
];
