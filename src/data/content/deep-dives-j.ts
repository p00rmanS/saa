import type { Lesson } from "@/lib/types";

export const deepDivesJ: Lesson[] = [
  {
    id: "systems-manager-capabilities",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "Systems Manager: Session Manager, Patch Manager, Run Command and Automation",
    shortName: "Systems Manager features",
    tier: 1,
    domains: [1, 2, 4],
    examImportance: "high",
    oneLiner:
      "Systems Manager is the operations toolbox for your fleet: shell access without open ports, patching, remote commands, automation runbooks and parameters.",
    englishExplanation:
      "AWS Systems Manager works through the SSM Agent running on managed nodes, which can be EC2 instances, on-premises servers and edge devices. An instance becomes a managed node when the agent is installed (it is preinstalled on many Amazon-provided AMIs), the instance has an IAM instance profile that allows Systems Manager (the AmazonSSMManagedInstanceCore managed policy) and it can reach the service endpoints through the internet, a NAT gateway or VPC endpoints. On-premises servers register through hybrid activations.\n\nThe capabilities map to common tasks. Session Manager gives an interactive shell or port forwarding over an outbound HTTPS connection with no inbound ports, no bastion host and no SSH keys, and can log sessions to S3 or CloudWatch Logs. Run Command executes a command or script on many instances at once, targeted by tags. Patch Manager applies operating system patches using patch baselines and maintenance windows, and reports compliance. State Manager keeps instances in a desired configuration over time. Automation runs runbooks, such as creating an AMI or remediating an AWS Config finding, across resources and accounts. Parameter Store holds configuration values and secrets, and Inventory collects software and configuration details. Fleet Manager and Distributor help manage nodes and distribute software packages.\n\nThe exam favours Systems Manager when the question asks for a way to manage or patch a fleet without opening SSH or RDP ports, to run commands at scale, to automate remediation, or to manage both cloud and on-premises servers consistently.",
    taglishExplanation:
      "Gumagana ang Systems Manager sa pamamagitan ng SSM Agent sa managed nodes: EC2, on-premises server, at edge device. Para maging managed node, kailangang naka-install ang agent, may IAM instance profile na may AmazonSSMManagedInstanceCore, at maabot ng instance ang service endpoints. Ang Session Manager ay nagbibigay ng shell nang walang inbound port, walang bastion, at walang SSH key, at puwedeng i-log. Ang Run Command ay nagpapatakbo ng command sa maraming instance. Ang Patch Manager ay nagpa-patch gamit ang baselines at maintenance windows. Ang State Manager ay nagpapanatili ng desired configuration. Ang Automation ay nagpapatakbo ng runbooks, tulad ng pag-remediate ng Config finding. Ang Parameter Store ay para sa configuration at secrets.",
    analogy:
      "A facilities manager with a master toolkit and a staff radio. Each building (instance) has a radio receiver (the SSM Agent) and an authorised badge (the instance profile). The manager can talk to one building without opening any extra doors (Session Manager), send the same instruction to every building (Run Command), schedule the repair crew on a timetable (Patch Manager) and run a standard checklist when an alarm sounds (Automation).",
    whyItExists:
      "Managing servers over SSH and RDP means open ports, shared keys and manual patching. A managed, audited control plane reduces the attack surface and the operational effort.",
    flow: "SSM Agent on node (instance profile) -> outbound HTTPS to Systems Manager -> Session / Run Command / Patch / Automation executed on the node, results logged",
    withoutIt: [
      "Administrators would need open SSH or RDP ports and long-lived keys",
      "Patching would be manual and inconsistent",
      "Remediating findings across many accounts would require custom scripts",
    ],
    bestUseCases: [
      "Session Manager instead of bastion hosts and SSH",
      "Patch Manager with maintenance windows to patch fleets and report compliance",
      "Run Command to run a script across tagged instances",
      "Automation to remediate AWS Config non-compliance or build golden AMIs",
      "Hybrid activations to manage on-premises servers with the same tools",
    ],
    poorUseCases: [
      "Expecting Systems Manager to manage an instance with no agent or instance profile",
      "Opening port 22 to the world when Session Manager would do",
      "Using Systems Manager as a replacement for configuration-heavy pipelines such as a full CI/CD system",
    ],
    alternatives: [
      { need: "Store and rotate database credentials automatically", choose: "AWS Secrets Manager" },
      { need: "Check resource configuration against rules", choose: "AWS Config" },
      { need: "Define and provision infrastructure", choose: "AWS CloudFormation" },
      { need: "Detect software vulnerabilities", choose: "Amazon Inspector" },
    ],
    keyFeatures: [
      "SSM Agent, instance profile with AmazonSSMManagedInstanceCore, network path to endpoints",
      "Session Manager: shell and port forwarding with no inbound ports, logging to S3 or CloudWatch",
      "Run Command, Patch Manager (baselines and maintenance windows), State Manager",
      "Automation runbooks, Inventory, Parameter Store, Fleet Manager, Distributor",
      "Hybrid activations for on-premises servers",
      "Works across accounts and Regions with Organizations",
      "Most capabilities have no extra charge, with some such as advanced parameters and OpsCenter charged",
    ],
    availability:
      "Systems Manager is a managed Regional service. Use VPC endpoints so managed nodes in private subnets keep working without internet access.",
    security:
      "Control who can start sessions with IAM, log session activity, and remove inbound administrative ports. Restrict Run Command and Automation with least-privilege roles.",
    pricingLogic:
      "Session Manager, Run Command, Patch Manager and State Manager are free for managed nodes. Advanced-tier on-premises instances, advanced parameters and some features carry charges.",
    examKeywords: [
      "no inbound ports",
      "patch compliance",
      "maintenance window",
      "run a command on many instances",
      "hybrid servers",
      "runbook",
      "SSM Agent",
      "remediate",
    ],
    examTraps: [
      "A managed node needs the agent, an instance profile and connectivity to the service. A missing instance profile is the classic reason an instance does not appear.",
      "Session Manager removes the need for a bastion host and open SSH or RDP ports.",
      "Patch Manager patches according to a baseline during a maintenance window. Inspector only finds vulnerabilities.",
      "Config detects non-compliance. Systems Manager Automation is the usual remediation tool.",
    ],
    architectureDiagram: `Admin --> [Systems Manager: Session / Run Command / Patch / Automation]
                          ^ outbound HTTPS only (no inbound ports)
[EC2 private subnet + SSM Agent + instance profile] --(VPC endpoints)-->
[On-premises server + hybrid activation]
Logs: S3 / CloudWatch Logs`,
    architectureCaption: "Fleet management with no inbound administrative ports.",
    mentorTip:
      "If a question says manage or patch servers securely at scale, with no bastion or open ports, the answer is Systems Manager.",
    questionIds: [
      "q-systems-manager-capabilities-1",
      "q-systems-manager-capabilities-2",
      "q-systems-manager-capabilities-3",
    ],
  },
  {
    id: "rds-backup-restore-encryption",
    moduleId: "phase-5-databases",
    category: "Databases",
    title: "RDS Backups, Snapshots, Restores and Encryption",
    shortName: "RDS backup & restore",
    tier: 1,
    domains: [1, 2, 4],
    examImportance: "high",
    oneLiner:
      "RDS gives you automated backups for point-in-time recovery and manual snapshots you keep, and every restore creates a new instance.",
    englishExplanation:
      "RDS automated backups take a daily snapshot of the instance and store transaction logs, which lets you restore to any second within the retention period. Retention is 1 to 35 days, and setting it to 0 turns automated backups off. They are deleted with the instance (unless you choose to retain them) and cannot be kept indefinitely. Manual snapshots are taken on demand, persist until you delete them, and survive deletion of the instance, so they are used for long-term retention and for taking a snapshot before a risky change. When you delete an instance you can create a final snapshot.\n\nA restore never overwrites the existing instance. Both point-in-time recovery and snapshot restore create a new DB instance with a new endpoint, so the application must be pointed at it. Snapshots can be copied to another Region for disaster recovery and shared with other accounts. Backup storage up to the size of your provisioned database storage is included at no extra charge, and storage beyond that is billed, so shorter retention and removing unneeded manual snapshots lowers cost. Aurora backs up continuously to S3 and supports point-in-time restore within the retention period as well.\n\nEncryption at rest is chosen when the instance is created, using KMS, and covers the storage, automated backups, read replicas and snapshots. You cannot turn encryption on for an existing unencrypted instance directly. Instead you take a snapshot, copy it with encryption enabled and restore from the encrypted copy. A read replica of an encrypted instance is encrypted, and a snapshot of an encrypted instance is encrypted. To share an encrypted snapshot with another account you must share the customer managed KMS key as well, and snapshots encrypted with the default AWS managed key cannot be shared. Use SSL/TLS for encryption in transit.",
    taglishExplanation:
      "Ang automated backups ng RDS ay may araw-araw na snapshot at transaction logs, kaya puwedeng mag-restore sa kahit anong segundo sa loob ng retention period na 1 hanggang 35 araw; ang 0 ay nag-o-off ng automated backups. Ang manual snapshot ay nananatili hanggang burahin mo, kahit ma-delete ang instance. Ang restore ay hindi nag-o-overwrite: laging bagong DB instance na may bagong endpoint. Puwedeng kopyahin ang snapshot sa ibang Region o ibahagi sa ibang account. Ang encryption ay pinipili sa paggawa ng instance gamit ang KMS. Para i-encrypt ang kasalukuyang hindi encrypted: snapshot, copy na may encryption, restore. Para ibahagi ang encrypted snapshot, kailangang ibahagi rin ang customer managed KMS key.",
    analogy:
      "A document archive with a daily photocopy and a minute-by-minute change log. You can ask for the file as it was at 14:32 last Tuesday and receive it as a new folder in a new drawer, never by overwriting the current file. Manual snapshots are sealed copies in a safe that stay even if the original cabinet is thrown away.",
    whyItExists:
      "Databases need protection against deletion, corruption and bad changes, with recovery to a precise moment. Managed backups provide this without custom scripts.",
    flow: "Daily snapshot + transaction logs -> point-in-time restore -> NEW instance (new endpoint) -> repoint application ; manual snapshot -> copy to another Region / share -> restore",
    withoutIt: [
      "A bad deployment or accidental delete could cause permanent data loss",
      "Recovery would depend on hand-written dump scripts",
      "Cross-Region and cross-account copies would need custom tooling",
    ],
    bestUseCases: [
      "Automated backups with 7 to 35 days of retention for point-in-time recovery",
      "Manual snapshots before schema changes and for long-term retention",
      "Cross-Region snapshot copy for disaster recovery",
      "Snapshot, encrypted copy and restore to encrypt an existing database",
      "Aurora continuous backup for fine-grained recovery",
    ],
    poorUseCases: [
      "Expecting a restore to replace the existing instance in place",
      "Relying only on automated backups for multi-year retention",
      "Sharing a snapshot encrypted with the default AWS managed key",
      "Keeping many unneeded manual snapshots, which costs storage",
    ],
    alternatives: [
      { need: "Policy-based backup across many services", choose: "AWS Backup" },
      { need: "Fast failover for availability", choose: "RDS Multi-AZ" },
      { need: "Rewind an Aurora MySQL cluster without restoring", choose: "Aurora Backtrack" },
      { need: "Cross-Region disaster recovery with low RPO", choose: "Aurora Global Database or cross-Region replica" },
    ],
    keyFeatures: [
      "Automated backups: daily snapshot plus transaction logs, retention 1 to 35 days, point-in-time recovery",
      "Manual snapshots persist until deleted and survive instance deletion",
      "Restores create a new instance with a new endpoint",
      "Copy snapshots across Regions and share with other accounts",
      "Backup storage free up to the size of provisioned database storage",
      "Encryption with KMS chosen at creation, covers backups, replicas and snapshots",
      "To encrypt an existing database: snapshot, encrypted copy, restore",
    ],
    availability:
      "Backups protect against data loss, not against downtime. Multi-AZ protects availability, and cross-Region copies protect against Regional loss.",
    security:
      "Encrypt databases and snapshots with a customer managed KMS key when you need cross-account sharing or control. Restrict who can copy, share and delete snapshots.",
    pricingLogic:
      "Included backup storage equals the provisioned storage. Extra backup storage, manual snapshots and cross-Region copies are billed, so tune retention to the recovery requirement.",
    examKeywords: [
      "point-in-time recovery",
      "restore to a new instance",
      "retention period",
      "encrypt an existing database",
      "share encrypted snapshot",
      "cross-Region snapshot",
      "final snapshot",
    ],
    examTraps: [
      "A restore creates a new instance. It does not replace the old one, and the endpoint changes.",
      "Automated backups are deleted with the instance. Manual snapshots are not.",
      "You cannot enable encryption on an existing unencrypted instance directly.",
      "To share an encrypted snapshot, use a customer managed key and share the key too.",
    ],
    architectureDiagram: `[RDS instance (encrypted, KMS)] --daily snapshot + logs--> automated backups (1-35 days)
        |-- manual snapshot --> copy to eu-west-1 --> share with account B (CMK shared)
Restore (point in time or snapshot) --> NEW instance, NEW endpoint --> repoint app`,
    architectureCaption: "Backups give recovery to a moment, and every restore produces a new instance.",
    mentorTip:
      "Three reflexes: restore means new instance, encryption can only be set at creation (or via encrypted copy), and sharing encrypted snapshots needs a customer managed key.",
    questionIds: [
      "q-rds-backup-restore-encryption-1",
      "q-rds-backup-restore-encryption-2",
      "q-rds-backup-restore-encryption-3",
    ],
  },
  {
    id: "encryption-in-transit-patterns",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "Encrypting Data in Transit: TLS Termination, ACM and Private Connectivity",
    shortName: "Encryption in transit",
    tier: 1,
    domains: [1],
    examImportance: "high",
    oneLiner:
      "Decide where TLS ends, use ACM to issue and renew certificates, and encrypt every network hop that crosses a trust boundary.",
    englishExplanation:
      "Encrypting data in transit means protecting it as it moves, typically with TLS between clients and servers, IPsec for VPNs and MACsec on some Direct Connect links. The first design decision is where TLS terminates. With an Application Load Balancer or CloudFront you attach a certificate to the listener or distribution, which offloads the cryptographic work from your servers and lets the load balancer inspect HTTP. If the traffic between the load balancer and the instances must also be encrypted, for example for compliance, you re-encrypt by configuring an HTTPS target group and a certificate on the instances, which is end-to-end encryption. A Network Load Balancer can terminate TLS or pass TCP traffic through to the targets, which keeps TLS end-to-end without the load balancer seeing the content.\n\nAWS Certificate Manager (ACM) provisions public TLS certificates for free for use with integrated services such as Elastic Load Balancing, CloudFront and API Gateway, and renews them automatically as long as validation remains in place. DNS validation, using a CNAME record that you leave in Route 53 or your DNS, is preferred over email validation because renewals need no human action. For CloudFront the certificate must be in us-east-1, and for a load balancer it must be in the same Region as the load balancer. ACM Private CA issues private certificates for internal use. ACM-issued public certificates are tied to integrated AWS services, so a certificate you must install on an EC2 instance directly is usually imported from another source or uses an export option where available.\n\nOther controls enforce encryption. CloudFront can redirect HTTP to HTTPS or require HTTPS between viewers and the edge and between the edge and the origin. An S3 bucket policy can deny requests where aws:SecureTransport is false. RDS can require SSL connections through a parameter setting. Site-to-Site VPN uses IPsec, and VPN over Direct Connect adds encryption to a private link. Always choose current TLS versions and security policies.",
    taglishExplanation:
      "Ang encryption in transit ay proteksyon habang gumagalaw ang data: TLS sa pagitan ng client at server, IPsec para sa VPN, at MACsec sa ilang Direct Connect. Unang desisyon: saan magtatapos ang TLS. Sa ALB o CloudFront, ikakabit mo ang certificate para ma-offload ang crypto sa mga server. Kung kailangan ding naka-encrypt ang ALB papunta sa instance, mag-re-encrypt (end-to-end). Ang NLB ay puwedeng mag-terminate ng TLS o mag-pass-through. Ang ACM ay nagbibigay ng libreng public certificates para sa integrated services at awtomatikong nagre-renew, mas mainam ang DNS validation. Ang certificate para sa CloudFront ay nasa us-east-1. Pwede ring i-enforce ang HTTPS sa CloudFront, S3 (aws:SecureTransport), at RDS.",
    analogy:
      "Armoured transport for valuables. TLS termination is deciding where the armoured van's contents are unloaded: at the bank's front desk (the load balancer), or all the way to the vault (end to end). ACM is the service that issues and automatically renews the van's licence, so it never lapses. VPN and MACsec are armoured tunnels for the road between buildings.",
    whyItExists:
      "Data crossing networks can be intercepted or altered. Standard encryption protocols and managed certificates make confidentiality and integrity the default without operational burden.",
    flow: "Client --HTTPS--> CloudFront / ALB (ACM certificate, TLS terminates) --HTTPS (re-encrypt)--> instances ; NLB TCP pass-through keeps TLS to the target",
    withoutIt: [
      "Credentials and personal data could be read in transit",
      "Certificates would expire and cause outages without automated renewal",
      "Internal hops would be left in clear text",
    ],
    bestUseCases: [
      "ACM public certificates with ALB, CloudFront and API Gateway, using DNS validation for automatic renewal",
      "End-to-end encryption by re-encrypting from the load balancer to the targets",
      "NLB TCP listeners for TLS pass-through when the load balancer must not see content",
      "ACM Private CA for internal services",
      "VPN or MACsec for hybrid links, and HTTPS-only policies for CloudFront and S3",
    ],
    poorUseCases: [
      "Using a CloudFront certificate from a Region other than us-east-1",
      "Email validation for certificates that must renew automatically with no human involvement",
      "Leaving the load balancer to instance hop unencrypted when compliance requires end-to-end encryption",
      "Assuming Direct Connect traffic is encrypted by default",
    ],
    alternatives: [
      { need: "Keys that encrypt data at rest", choose: "AWS KMS" },
      { need: "Encrypted private link to on-premises", choose: "Site-to-Site VPN or VPN over Direct Connect" },
      { need: "Private certificates for internal workloads", choose: "ACM Private CA" },
      { need: "Block unencrypted S3 requests", choose: "Bucket policy with aws:SecureTransport" },
    ],
    keyFeatures: [
      "TLS termination at ALB, NLB or CloudFront, with re-encryption for end-to-end",
      "NLB can terminate TLS or pass TCP through",
      "ACM: free public certificates for integrated services, automatic renewal",
      "DNS validation preferred for automatic renewal",
      "CloudFront certificates must be in us-east-1, load balancer certificates in the load balancer's Region",
      "CloudFront viewer and origin protocol policies, S3 aws:SecureTransport, RDS SSL requirement",
      "IPsec for VPN, MACsec for supported Direct Connect connections",
    ],
    availability:
      "Automatic certificate renewal prevents expiry outages. Keep the DNS validation record in place so renewals continue to work.",
    security:
      "Use modern TLS policies, redirect HTTP to HTTPS, and enforce encryption with policies at each service rather than relying on clients.",
    pricingLogic:
      "ACM public certificates for integrated services are free. ACM Private CA has a monthly charge per CA and per certificate. Terminating TLS at the load balancer reduces compute load on instances.",
    examKeywords: [
      "TLS termination",
      "end-to-end encryption",
      "certificate renewal",
      "ACM",
      "HTTPS only",
      "us-east-1 certificate",
      "SecureTransport",
      "re-encrypt",
    ],
    examTraps: [
      "The ACM certificate for CloudFront must be in us-east-1, regardless of the origin's Region.",
      "Offloading TLS at the ALB leaves the hop to the instances unencrypted unless you re-encrypt.",
      "Direct Connect is private but not encrypted by default.",
      "DNS validation allows automatic renewal. Email validation depends on a person responding.",
    ],
    architectureDiagram: `Client --TLS--> [CloudFront (ACM cert, us-east-1)] --HTTPS--> [ALB (ACM cert)] --HTTPS--> [Instances (re-encrypt)]
S3: deny if aws:SecureTransport = false     RDS: require SSL
On-premises --IPsec VPN / MACsec--> AWS`,
    architectureCaption: "Encrypt every hop, and let ACM renew the certificates.",
    mentorTip:
      "Trace the data path hop by hop and ask whether each hop is encrypted. The missing hop is usually the answer.",
    questionIds: [
      "q-encryption-in-transit-patterns-1",
      "q-encryption-in-transit-patterns-2",
      "q-encryption-in-transit-patterns-3",
    ],
  },
  {
    id: "analytics-service-selection-redshift-emr",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "Choosing Between Athena, Redshift, EMR, Glue and OpenSearch",
    shortName: "Analytics service choice",
    tier: 1,
    domains: [3, 4],
    examImportance: "high",
    oneLiner:
      "Ad hoc SQL on S3 is Athena, a high-performance warehouse is Redshift, big data frameworks are EMR, ETL is Glue and search is OpenSearch.",
    englishExplanation:
      "Five analytics services overlap enough to be confused. Amazon Athena runs serverless SQL queries directly on data in S3 and charges by data scanned, which suits ad hoc and occasional queries with no infrastructure. Amazon Redshift is a columnar data warehouse for fast, complex SQL and joins over structured data at scale, with consistent performance for many users and dashboards. Redshift Spectrum lets a warehouse query data in S3, and Redshift Serverless removes cluster management and charges for the compute used. Amazon EMR is a managed big data platform for frameworks such as Spark, Hadoop, Hive and Presto, used when you need custom processing code, machine learning pipelines or open-source tools. AWS Glue is serverless ETL and a data catalog for preparing data. Amazon OpenSearch Service handles full-text search and log analytics.\n\nCost and sizing details appear in questions. EMR clusters have a primary node, core nodes that store data in HDFS and task nodes that only compute. Transient clusters, which start, run a job and terminate, avoid paying for idle capacity, and task nodes can run on Spot Instances because losing them does not lose data. Storing data in S3 with EMRFS separates storage from compute so clusters can be disposable. For Redshift, RA3 nodes separate compute from managed storage, concurrency scaling handles bursts of queries, snapshots can be copied to another Region and a paused or serverless setup avoids idle cost. Columnar storage and compression make Redshift and Parquet scans cheap, and partitioning reduces what Athena reads.\n\nChoose by the need. Occasional SQL on files in S3 with no servers is Athena. Many analysts running repeated complex queries and BI dashboards is Redshift. Spark or Hadoop jobs with custom code is EMR. Cleaning and converting data is Glue. Searching logs and text is OpenSearch. Dashboards on top use QuickSight.",
    taglishExplanation:
      "Magkakahawig ang limang analytics service. Ang Athena ay serverless SQL sa data sa S3, bayad per data scanned, bagay sa ad hoc na query. Ang Redshift ay columnar data warehouse para sa mabilis at komplikadong SQL at joins, maraming user at dashboard. Ang EMR ay managed big data platform para sa Spark, Hadoop, Hive, at Presto kapag may custom processing code. Ang Glue ay serverless ETL at data catalog. Ang OpenSearch ay para sa full-text search at log analytics. Sa gastos: transient na EMR cluster na nagtatapos pagkatapos ng job, task nodes sa Spot, at data sa S3 para disposable ang cluster. Sa Redshift, RA3, concurrency scaling, at Serverless.",
    analogy:
      "A set of kitchens. Athena is a food truck that cooks one order on demand from the pantry (S3) and charges per order. Redshift is a restaurant kitchen optimised for serving many complex dishes fast, every day. EMR is a rented industrial kitchen where chefs bring their own recipes and equipment, and which you can close the moment the banquet ends. Glue is the prep station that washes and chops ingredients. OpenSearch is the index at the back that finds any ingredient by name instantly.",
    whyItExists:
      "Analytics workloads differ in frequency, scale and tooling. Separate services let you pay for the pattern you have instead of a single system sized for the worst case.",
    flow: "Data in S3 -> Glue (catalog, ETL) -> Athena (ad hoc) / Redshift (warehouse) / EMR (frameworks) -> QuickSight dashboards ; logs and text -> OpenSearch",
    withoutIt: [
      "You would run and size your own Hadoop or warehouse cluster for every need",
      "Occasional queries would pay for always-on infrastructure",
      "Search and BI would be forced into the wrong engine",
    ],
    bestUseCases: [
      "Athena for infrequent ad hoc queries on partitioned Parquet in S3",
      "Redshift for a consolidated warehouse with BI dashboards and complex joins",
      "Redshift Serverless for intermittent warehouse workloads",
      "EMR transient clusters with Spot task nodes for batch Spark jobs",
      "OpenSearch for log search and full-text queries",
    ],
    poorUseCases: [
      "Redshift provisioned and always on for a handful of occasional queries",
      "Athena as a replacement for a heavily used enterprise warehouse with strict latency needs",
      "A long-running EMR cluster left idle between jobs",
      "EMR when a simple SQL query on S3 would do",
    ],
    alternatives: [
      { need: "Serverless ETL and catalog", choose: "AWS Glue" },
      { need: "Dashboards and visualisation", choose: "Amazon QuickSight" },
      { need: "Central governed lake permissions", choose: "AWS Lake Formation" },
      { need: "Streaming ingestion", choose: "Amazon Kinesis or MSK" },
    ],
    keyFeatures: [
      "Athena: serverless SQL on S3, priced per data scanned",
      "Redshift: columnar warehouse, RA3 managed storage, Spectrum, concurrency scaling, Serverless, cross-Region snapshots",
      "EMR: Spark, Hadoop, Hive, Presto, primary, core and task nodes, transient clusters, Spot task nodes",
      "Glue: serverless ETL, crawlers and the Data Catalog",
      "OpenSearch: search and log analytics",
      "S3 as the shared storage layer",
      "QuickSight for dashboards",
    ],
    availability:
      "Athena and Glue are serverless and managed. Redshift can use Multi-AZ deployments and snapshots, and EMR should store data in S3 so a failed cluster loses nothing.",
    security:
      "Use Lake Formation or IAM for access, encrypt with KMS, place Redshift and EMR in private subnets and use VPC endpoints for S3.",
    pricingLogic:
      "Athena charges per TB scanned, Redshift per node hour or per compute used in Serverless, EMR per instance hour plus the service fee, and Glue per DPU hour. Idle capacity is the main waste to avoid.",
    examKeywords: [
      "ad hoc SQL on S3",
      "data warehouse",
      "Spark and Hadoop",
      "transient cluster",
      "Spot task nodes",
      "BI dashboards",
      "serverless",
      "log analytics",
    ],
    examTraps: [
      "Athena is serverless and priced by data scanned. It is not a warehouse for heavy concurrent BI.",
      "EMR task nodes do not store data, so they are safe to run on Spot.",
      "Storing EMR data in S3 lets you terminate clusters between jobs.",
      "Redshift is columnar and OLAP. It is not a transactional database.",
    ],
    architectureDiagram: `S3 data lake --> [Glue ETL + Catalog] --> [Athena: ad hoc SQL]
                              |--> [Redshift: warehouse + Spectrum] --> [QuickSight]
                              +--> [EMR transient: primary + core + Spot task nodes]
Logs --> [OpenSearch]`,
    architectureCaption: "One storage layer, with the engine chosen by workload.",
    mentorTip:
      "Ask how often, how complex and how much code. Occasional and simple is Athena, constant and complex SQL is Redshift, custom frameworks is EMR.",
    questionIds: [
      "q-analytics-service-selection-redshift-emr-1",
      "q-analytics-service-selection-redshift-emr-2",
      "q-analytics-service-selection-redshift-emr-3",
    ],
  },
  {
    id: "transit-gateway-hybrid-routing",
    moduleId: "phase-4-networking",
    category: "Networking",
    title: "Transit Gateway: Hub-and-Spoke Routing, Segmentation and Hybrid Connectivity",
    shortName: "Transit Gateway design",
    tier: 1,
    domains: [3, 4, 1],
    examImportance: "high",
    oneLiner:
      "A Transit Gateway is a regional router that connects many VPCs and on-premises networks through one hub, with route tables that control who can talk to whom.",
    englishExplanation:
      "As the number of VPCs grows, full-mesh VPC peering becomes unmanageable because every pair needs its own connection and peering is not transitive. AWS Transit Gateway (TGW) is a regional network hub. You create attachments for VPCs, Site-to-Site VPN connections, Direct Connect gateways, peering with other Transit Gateways and Connect attachments for SD-WAN appliances, and traffic flows between attachments through the hub. Each attachment is associated with a TGW route table, and routes are either propagated automatically from the attachment or added statically. Because association and propagation are controlled per route table, you can build segmentation: for example a shared-services route table reachable by all, and separate production and development route tables that cannot reach each other.\n\nTGW supports equal-cost multipath (ECMP) across multiple VPN tunnels to aggregate bandwidth beyond a single tunnel, inter-Region peering to connect Transit Gateways in different Regions over the AWS backbone, and Resource Access Manager sharing so one hub can serve many accounts. A Direct Connect gateway connected to a Transit Gateway through a transit virtual interface lets one dedicated connection reach VPCs across accounts. VPC attachments use a subnet in each AZ you want served. CIDR blocks of attached networks must not overlap.\n\nCost and choice matter. TGW charges per attachment per hour and per GB processed, whereas VPC peering has no hourly charge and only standard data transfer, so for two or three VPCs peering is cheaper and simpler. For many VPCs, shared on-premises connectivity and segmentation, Transit Gateway is the better design. For exposing a single service to many consumers, even with overlapping addresses, use PrivateLink instead.",
    taglishExplanation:
      "Habang dumarami ang VPC, nagiging mahirap ang full-mesh na VPC peering dahil bawat pares ay may sariling koneksyon at hindi transitive ang peering. Ang Transit Gateway ay regional na hub. Gagawa ka ng attachments para sa VPC, Site-to-Site VPN, Direct Connect gateway, peering sa ibang TGW, at Connect. Bawat attachment ay naka-associate sa TGW route table, at ang routes ay propagated o static, kaya puwede kang mag-segment: shared-services na maabot ng lahat, at hiwalay na production at development na hindi nagkikita. May ECMP para sa VPN, inter-Region peering, at RAM para sa pagbabahagi. May bayad kada attachment kada oras at per GB. Para sa dalawa o tatlong VPC lang, mas mura ang peering.",
    analogy:
      "An airport hub. Instead of running a direct flight between every pair of cities (peering), every city connects to the hub, and the hub's routing rules decide which flights can connect. Separate terminals (route tables) keep some passengers from ever meeting others, such as keeping production and development apart.",
    whyItExists:
      "Large organisations have dozens or hundreds of VPCs and on-premises sites. A central, scalable router simplifies connectivity and gives one place to enforce segmentation.",
    flow: "VPC / VPN / Direct Connect attachments -> TGW route tables (association + propagation) -> traffic forwarded to the destination attachment ; route tables in each VPC point remote CIDRs to the TGW",
    withoutIt: [
      "A mesh of peering connections would be needed, growing as n squared",
      "Each VPC would need its own VPN connection to on-premises",
      "Segmentation between environments would need per-pair controls",
    ],
    bestUseCases: [
      "Hub-and-spoke connectivity across many VPCs and accounts",
      "A single VPN or Direct Connect path to on-premises shared by all VPCs",
      "Separate route tables to isolate production and development",
      "ECMP over multiple VPN tunnels for more bandwidth",
      "Inter-Region TGW peering for a global network",
    ],
    poorUseCases: [
      "Two or three VPCs, where peering is simpler and cheaper",
      "Exposing one service to consumers with overlapping CIDRs (use PrivateLink)",
      "Overlapping CIDR blocks between attached VPCs",
      "Assuming attachments can reach each other without route table entries",
    ],
    alternatives: [
      { need: "Few VPCs, lowest cost", choose: "VPC peering" },
      { need: "One service to many consumers, overlapping CIDRs allowed", choose: "AWS PrivateLink" },
      { need: "Dedicated private link to on-premises", choose: "AWS Direct Connect" },
      { need: "Encrypted link over the internet", choose: "AWS Site-to-Site VPN" },
    ],
    keyFeatures: [
      "Regional hub with attachments: VPC, VPN, Direct Connect gateway, TGW peering, Connect",
      "Route tables with association and propagation for segmentation",
      "ECMP across VPN tunnels, inter-Region peering",
      "Sharing across accounts with Resource Access Manager",
      "Non-overlapping CIDRs required",
      "Charged per attachment hour and per GB processed",
      "Transit virtual interface from Direct Connect gateway to TGW",
    ],
    availability:
      "Transit Gateway is highly available within a Region. Attach VPCs through subnets in multiple AZs and use redundant VPN or Direct Connect connections for hybrid links.",
    security:
      "Use separate route tables to restrict reachability, security groups and network ACLs in each VPC, and flow logs for visibility. Insert inspection by routing traffic through a security VPC.",
    pricingLogic:
      "Per-attachment hourly fees plus per-GB data processing make TGW more expensive than peering for small networks, but cheaper to operate for large ones.",
    examKeywords: [
      "hub and spoke",
      "many VPCs",
      "transitive routing",
      "segmentation",
      "ECMP",
      "centralised egress",
      "Direct Connect gateway",
      "route table propagation",
    ],
    examTraps: [
      "VPC peering is not transitive. A Transit Gateway provides transitive routing between attachments.",
      "Attachments do not automatically reach each other. Route table association and propagation decide that.",
      "For two VPCs, peering is cheaper than a Transit Gateway.",
      "Overlapping CIDRs cannot be routed through a Transit Gateway.",
    ],
    architectureDiagram: `[VPC Prod] --\\                         /-- [Direct Connect gateway] -- On-premises
[VPC Dev ] ---+--> [Transit Gateway] -+--- [Site-to-Site VPN (ECMP)]
[VPC Shared]-/   route tables: Prod RT (Shared, on-prem) | Dev RT (Shared) | Prod and Dev isolated`,
    architectureCaption: "One hub, with route tables that control which attachments can talk.",
    mentorTip:
      "Count the networks. Two or three means peering, many or hybrid or segmented means Transit Gateway, one service means PrivateLink.",
    questionIds: [
      "q-transit-gateway-hybrid-routing-1",
      "q-transit-gateway-hybrid-routing-2",
      "q-transit-gateway-hybrid-routing-3",
    ],
  },
  {
    id: "aws-backup-vault-lock-policies",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "AWS Backup: Plans, Lifecycle, Vault Lock and Cross-Account Copies",
    shortName: "AWS Backup in depth",
    tier: 1,
    domains: [1, 2, 4],
    examImportance: "high",
    oneLiner:
      "AWS Backup applies one policy to back up many services, tiers old backups to cheap cold storage, and can make backups immutable and copy them to another Region or account.",
    englishExplanation:
      "AWS Backup centralises backup across services such as EBS, EC2, RDS, Aurora, DynamoDB, EFS, FSx, S3 and Storage Gateway volumes. A backup plan defines rules: a schedule, a backup window, a lifecycle and a target vault. Resources are assigned to a plan by tags or resource IDs, so tagging a new resource with Backup=daily brings it under protection automatically. A backup vault stores recovery points and is encrypted with a KMS key. AWS Organizations backup policies can apply plans across accounts, and the service gives centralised monitoring and compliance reporting.\n\nThe lifecycle controls cost. A rule can move a recovery point to cold storage after a number of days and delete it after a retention period, which suits long retention because cold storage costs less. Recovery points moved to cold storage must stay there for a minimum of 90 days, so the retention must be at least that long after the transition, and not every resource type supports cold storage. Continuous backup enables point-in-time restore for supported resources such as RDS and S3 within a retention window of up to 35 days.\n\nSeveral features address security and resilience. Backup Vault Lock makes a vault write-once, read-many so that nobody, including administrators, can delete recovery points or shorten retention. In governance mode privileged users can still remove the lock, while in compliance mode the lock becomes immutable after a cooling-off period of at least three days. Cross-Region copy protects against a Regional failure, and cross-account copy, ideally to a separate, restricted backup account, protects against a compromised or deleted production account. Restore testing validates that recovery points really restore. Use Backup when the requirement is a single, policy-based, auditable approach rather than separate scripts per service.",
    taglishExplanation:
      "Ang AWS Backup ay nagse-centralize ng backup para sa EBS, EC2, RDS, Aurora, DynamoDB, EFS, FSx, S3 at iba pa. Ang backup plan ay may schedule, backup window, lifecycle, at target vault, at ina-assign ang resources gamit ang tags. Ang vault ay naka-encrypt gamit ang KMS. Sa lifecycle: puwedeng ilipat sa cold storage pagkatapos ng ilang araw para mas mura, pero kailangang manatili doon nang kahit 90 araw. Ang Backup Vault Lock ay ginagawang WORM ang vault: sa governance mode, puwede pang alisin ng may pribilehiyo; sa compliance mode, hindi na mababago pagkatapos ng cooling-off na hindi bababa sa tatlong araw. May cross-Region at cross-account copy para sa proteksyon.",
    analogy:
      "A central records office with a filing policy. New documents are tagged and automatically filed on schedule, old files move to the cheap off-site warehouse after a set time, a locked vault (Vault Lock) that even the manager cannot open early protects the originals, and copies are mailed to a different city and a separate company for safekeeping.",
    whyItExists:
      "Backups scattered across services with different tools are inconsistent and hard to prove to auditors. A single policy engine makes protection uniform, cost-aware and verifiable, including protection against ransomware and deletion.",
    flow: "Tag resource -> backup plan rule (schedule) -> recovery point in vault (KMS) -> lifecycle to cold storage -> copy to another Region and account -> Vault Lock prevents deletion",
    withoutIt: [
      "Each service would have separate, inconsistent backup scripts",
      "An attacker or a mistake could delete backups along with production",
      "Long-term retention would stay on expensive storage",
    ],
    bestUseCases: [
      "Tag-based backup plans across EBS, RDS, DynamoDB and EFS",
      "Lifecycle to cold storage for long-term retention",
      "Vault Lock in compliance mode for regulatory WORM retention",
      "Cross-account copy to an isolated backup account and cross-Region copy for DR",
      "Organizations backup policies for consistent protection across accounts",
    ],
    poorUseCases: [
      "Relying on production-account backups alone against account compromise",
      "Moving to cold storage with a total retention shorter than 90 days after the move",
      "Using Backup as a high availability mechanism (it restores, it does not fail over)",
      "Compliance-mode Vault Lock without certainty about retention requirements",
    ],
    alternatives: [
      { need: "Service-native database backups", choose: "RDS automated backups and snapshots" },
      { need: "Continuous replication of servers for DR", choose: "AWS Elastic Disaster Recovery" },
      { need: "Immutable objects in S3", choose: "S3 Object Lock" },
      { need: "Scheduled EBS snapshots only", choose: "Amazon Data Lifecycle Manager" },
    ],
    keyFeatures: [
      "Backup plans: schedule, window, lifecycle, target vault",
      "Assign resources by tag or ID, Organizations backup policies",
      "Vaults encrypted with KMS, recovery points",
      "Lifecycle to cold storage (minimum 90 days there) and expiry",
      "Continuous backup and point-in-time restore for supported resources",
      "Backup Vault Lock: governance and compliance modes, at least three days cooling-off for compliance",
      "Cross-Region and cross-account copy, restore testing, audit reports",
    ],
    availability:
      "Backups protect data durability and enable recovery. Cross-Region copies protect against Regional loss, and recovery time depends on the restore size, so combine with high availability design for low RTO.",
    security:
      "Use a dedicated backup account, customer managed KMS keys, Vault Lock and restrictive vault access policies so backups survive a compromise of the workload account.",
    pricingLogic:
      "You pay for backup storage by tier (warm and cold), restores, and cross-Region data transfer. Cold storage lowers the cost of long retention, and removing unneeded recovery points reduces spend.",
    examKeywords: [
      "centralised backup",
      "backup policy across accounts",
      "WORM",
      "Vault Lock",
      "cold storage",
      "cross-account copy",
      "ransomware protection",
      "tag-based backup",
    ],
    examTraps: [
      "Cold storage requires at least 90 days there, so short retention does not benefit.",
      "Vault Lock in compliance mode cannot be removed after the cooling-off period. Governance mode can.",
      "Backup is not a failover mechanism. It provides recovery, not high availability.",
      "To survive account compromise, copy backups to a separate account.",
    ],
    architectureDiagram: `[Resources tagged Backup=daily] --> [Backup plan: daily 02:00, cold after 30d, delete after 400d]
        --> [Vault A (KMS, Vault Lock compliance)] --copy--> [Vault B: other Region]
                                                    --copy--> [Vault C: separate backup account]`,
    architectureCaption: "One policy, immutable vaults and copies outside the workload account.",
    mentorTip:
      "For ransomware and compliance questions, think three layers: immutable (Vault Lock), isolated (separate account) and distributed (another Region).",
    questionIds: [
      "q-aws-backup-vault-lock-policies-1",
      "q-aws-backup-vault-lock-policies-2",
      "q-aws-backup-vault-lock-policies-3",
    ],
  },
];
