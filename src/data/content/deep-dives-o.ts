import type { Lesson } from "@/lib/types";

export const deepDivesO: Lesson[] = [
  {
    id: "vpc-sharing-ram-multi-account-networking",
    moduleId: "phase-4-networking",
    category: "Networking and Content Delivery",
    title: "Multi-Account Networking: VPC Sharing and Resource Access Manager",
    shortName: "VPC sharing & RAM",
    tier: 2,
    domains: [1, 3, 4],
    examImportance: "medium",
    oneLiner:
      "Instead of connecting dozens of VPCs, a central account can own one VPC and share its subnets with other accounts in the organization.",
    englishExplanation:
      "In a multi-account design every workload account often gets its own VPC, which then needs peering or Transit Gateway attachments, NAT gateways and endpoints repeated in each one. VPC sharing offers an alternative. The owner account creates the VPC and its subnets, then uses AWS Resource Access Manager (RAM) to share individual subnets with other accounts in the same AWS Organization, or with specific accounts or organizational units. Participant accounts can launch resources such as EC2 instances, RDS databases, Lambda functions and load balancers into the shared subnets as if they were their own, while the instances in different accounts communicate over private IPs inside the same VPC with no peering needed.\n\nThe responsibilities are split cleanly. The owner manages the VPC, subnets, route tables, network ACLs, internet and NAT gateways and VPC endpoints. Participants manage only their own resources and their own security groups, and they cannot modify or delete other accounts' resources or the shared network configuration. Participants cannot see other participants' resources by default except for basic details such as the network interfaces in shared subnets, and each account is billed for its own resources. Sharing must be enabled for the organization in RAM, and subnets are shared, not the VPC as a whole. Because a subnet belongs to an AZ, think about AZ naming: RAM shares the AZ by its AZ ID, since the name that maps to a physical zone can differ between accounts.\n\nRAM shares more than subnets. You can share Transit Gateways, Route 53 Resolver rules, License Manager configurations, and other resources, which avoids duplicating them in every account. The design trade-off is isolation. Separate VPCs per account give a stronger blast radius boundary and the freedom for each team to design its own network, while a shared VPC reduces cost and operational overhead because there are fewer NAT gateways, endpoints and connections, and it simplifies IP address planning. Use shared VPCs where a central network team should control the network for many application teams, and separate VPCs with Transit Gateway where teams need autonomy.",
    taglishExplanation:
      "Sa multi-account design, kadalasan may sariling VPC ang bawat account at kailangan ng peering o Transit Gateway. Ang VPC sharing ay alternatibo: ang owner account ang gumagawa ng VPC at subnets, tapos gamit ang AWS Resource Access Manager (RAM) ay ibabahagi ang mga subnet sa ibang account sa parehong Organization. Puwedeng mag-launch ang participant ng EC2, RDS, Lambda, at load balancer sa shared na subnet, at nag-uusap sila sa private IP sa loob ng iisang VPC. Ang owner ang may hawak ng VPC, route tables, NACLs, gateways, at endpoints; ang participant ay sarili niyang resources at security groups lang. Subnet ang ibinabahagi, hindi ang buong VPC. Mas mura at mas simple pero mas mahina ang isolation.",
    analogy:
      "A shared office building. The landlord (owner account) builds the floors, corridors, security doors and the mailroom. Tenants (participant accounts) rent rooms on specific floors and arrange their own furniture and desk locks. Everyone uses the same corridors, so no one builds private bridges between separate buildings, but tenants cannot rewire the building.",
    whyItExists:
      "Peering meshes, duplicated NAT gateways and endpoints and overlapping IP ranges become expensive and hard to manage when many accounts each have a VPC. Sharing lets a central team provide networking as a service.",
    flow: "Network account creates VPC and subnets -> shares subnets with the organization via RAM -> workload accounts launch resources into shared subnets -> traffic stays private inside one VPC",
    withoutIt: [
      "Every account would need its own NAT gateways, endpoints and VPN or Direct Connect connections",
      "Peering or Transit Gateway attachments would multiply",
      "IP address planning across many VPCs would be harder",
    ],
    bestUseCases: [
      "A central networking account providing shared subnets to application accounts",
      "Reducing NAT gateway and endpoint cost by sharing them across accounts",
      "Environments where a network team enforces standard routing and ACLs",
      "Sharing Transit Gateways or Resolver rules with RAM across an organization",
    ],
    poorUseCases: [
      "Teams that need strong network isolation or their own network design",
      "Accounts outside the organization that cannot be added to the share",
      "Expecting participants to change route tables or NACLs",
      "Assuming AZ names match across accounts",
    ],
    alternatives: [
      { need: "Connect separate VPCs across many accounts", choose: "AWS Transit Gateway" },
      { need: "Connect two VPCs simply", choose: "VPC peering" },
      { need: "Expose one service privately", choose: "AWS PrivateLink" },
      { need: "Share other resources across accounts", choose: "AWS Resource Access Manager" },
    ],
    keyFeatures: [
      "Subnets shared through AWS RAM with accounts or OUs in the same organization",
      "Owner manages VPC, route tables, NACLs, gateways and endpoints",
      "Participants manage their own resources and security groups",
      "Resources in different accounts talk over private IPs in one VPC",
      "AZ IDs identify zones consistently across accounts",
      "RAM also shares Transit Gateways, Resolver rules and License Manager configurations",
      "Reduces peering, NAT and endpoint duplication",
    ],
    availability:
      "The shared VPC spans the AZs of its subnets, so share subnets in multiple AZs and place resources across them.",
    security:
      "Security groups remain per account, and participants cannot alter shared network controls. Use network ACLs and endpoint policies centrally and flow logs for visibility.",
    pricingLogic:
      "Participants pay for their own resources. Data transfer between participants in the same AZ in a shared VPC avoids the cross-VPC charges that peering or Transit Gateway can incur.",
    examKeywords: [
      "share subnets",
      "Resource Access Manager",
      "central networking account",
      "participant accounts",
      "reduce NAT gateway cost across accounts",
      "AZ ID",
    ],
    examTraps: [
      "VPC sharing shares subnets, not the whole VPC.",
      "Only the owner controls route tables, NACLs and gateways. Participants control their own security groups.",
      "Sharing works within an AWS Organization when RAM sharing is enabled.",
      "AZ names map differently per account. Use AZ IDs to line up zones.",
    ],
    architectureDiagram: `Network account (owner): VPC 10.0.0.0/16, subnets A/B/C, NAT, endpoints
    --RAM share (subnets A,B)--> Account Prod : launches EC2/RDS in subnet A
    --RAM share (subnets B,C)--> Account Dev  : launches Lambda/ECS in subnet B
All resources talk over private IPs in the same VPC. Each account keeps its own security groups.`,
    architectureCaption: "One shared network, many accounts, clean ownership split.",
    mentorTip:
      "If a question wants many accounts to use the same network with the lowest duplication and a central team in control, think VPC sharing with RAM. If it wants autonomy and isolation, think separate VPCs with Transit Gateway.",
    questionIds: [
      "q-vpc-sharing-ram-multi-account-networking-1",
      "q-vpc-sharing-ram-multi-account-networking-2",
      "q-vpc-sharing-ram-multi-account-networking-3",
    ],
  },
  {
    id: "golden-ami-image-builder-pipelines",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "Golden AMIs: EC2 Image Builder, Distribution and Lifecycle",
    shortName: "Image Builder & AMI lifecycle",
    tier: 2,
    domains: [2, 1, 4],
    examImportance: "medium",
    oneLiner:
      "A golden AMI pipeline builds, tests, patches and distributes machine images automatically so every new instance starts secure and identical.",
    englishExplanation:
      "A golden AMI is a pre-built image with the operating system, patches, agents and your application dependencies baked in. Launching from it makes Auto Scaling faster and more consistent than installing software with user data at every launch, and it supports immutable infrastructure, where you replace instances with new ones instead of patching in place. The risk is staleness: an image built once and never updated carries old vulnerabilities, so the build needs to be automated.\n\nEC2 Image Builder is the managed service for that. You define an image recipe, which is a base image (an AWS-provided or marketplace AMI) plus components, the build and test steps such as installing packages, running hardening scripts and executing validation tests. A pipeline runs the recipe on a schedule or when the base image updates, launches a temporary build instance, applies the components, runs the tests, creates the AMI and distributes it. Distribution settings copy the image to other Regions, share it with other accounts or an organization, apply launch permissions and encrypt it with the right KMS keys. Image Builder can also produce container images. Integration with Amazon Inspector can scan the output, and EventBridge or SNS can notify downstream pipelines when a new image is ready.\n\nAMI lifecycle management matters for cost and security. An EBS-backed AMI is backed by snapshots, which keep costing money until the AMI is deregistered and the snapshots are deleted. Amazon Data Lifecycle Manager can create, copy, deprecate and delete AMIs on a schedule, and Image Builder lifecycle policies can retire old images. Use launch templates to reference the latest AMI, version them and combine them with Auto Scaling instance refresh to roll the new image across a group, replacing instances gradually. AMIs are Regional, so copy them for disaster recovery in another Region, and remember that an encrypted AMI shared with another account also needs the KMS key shared.",
    taglishExplanation:
      "Ang golden AMI ay pre-built na image na may OS, patches, agents, at dependencies na nakabake na, kaya mas mabilis at pare-pareho ang Auto Scaling kaysa mag-install sa user data. Ang panganib ay maluma ito, kaya awtomatiko dapat ang build. Ang EC2 Image Builder ay may recipe (base image plus components para sa build at test), at pipeline na tumatakbo ayon sa schedule o kapag nag-update ang base image, gumagawa ng AMI, at nagdi-distribute sa ibang Region at account. Sa lifecycle: ang EBS-backed AMI ay may snapshots na may gastos hangga't hindi dine-deregister at binubura, kaya gamitin ang Data Lifecycle Manager. Gumamit ng launch template at ASG instance refresh para i-roll out ang bagong image.",
    analogy:
      "A bakery's master dough recipe. A pipeline is the automated kitchen that remakes the dough each week with fresh flour, tests a sample loaf and ships tubs to every branch. Old tubs are collected and thrown away on a schedule so shelves are not cluttered, and each branch swaps its dough gradually rather than all at once.",
    whyItExists:
      "Patching running servers is slow and inconsistent. Automated image pipelines make secure, tested, identical instances the default and allow safe rollouts and rollbacks.",
    flow: "Base image + components -> Image Builder pipeline (scheduled) -> build instance -> test -> AMI -> distribute to Regions and accounts -> launch template -> ASG instance refresh",
    withoutIt: [
      "Instances would install software at boot, slowing scale-out and varying between launches",
      "Images would go stale and carry unpatched vulnerabilities",
      "Old AMIs and snapshots would accumulate cost",
    ],
    bestUseCases: [
      "Monthly pipeline that rebuilds hardened AMIs from the latest base image",
      "Distributing approved AMIs to all organization accounts and DR Regions",
      "Immutable deployments with launch templates and instance refresh",
      "Lifecycle policies to deprecate and delete old AMIs and snapshots",
    ],
    poorUseCases: [
      "Installing the full stack with user data on every launch for large fleets",
      "Hand-built AMIs that nobody updates",
      "Sharing an encrypted AMI without sharing the KMS key",
      "Keeping every historical AMI forever",
    ],
    alternatives: [
      { need: "Patch running instances on a schedule", choose: "Systems Manager Patch Manager" },
      { need: "Scan images and instances for vulnerabilities", choose: "Amazon Inspector" },
      { need: "Automate AMI and snapshot creation and cleanup", choose: "Amazon Data Lifecycle Manager" },
      { need: "Containers instead of VM images", choose: "Amazon ECR with image scanning" },
    ],
    keyFeatures: [
      "Image recipes: base image plus build and test components",
      "Pipelines on a schedule or on base image updates, with test steps",
      "Distribution to Regions, accounts and organizations with encryption settings",
      "Container image support and integration with Inspector",
      "Launch templates and Auto Scaling instance refresh for rollout",
      "AMIs are Regional and backed by snapshots in S3",
      "Data Lifecycle Manager for AMI and snapshot retention",
    ],
    availability:
      "Copying AMIs to other Regions lets you launch there during disaster recovery. Instance refresh replaces instances gradually to maintain capacity.",
    security:
      "Harden the image once in the pipeline, scan it, remove secrets and share it only with intended accounts. Encrypted AMIs require access to the KMS key.",
    pricingLogic:
      "Image Builder itself has no charge. You pay for build instances, snapshot storage and any scans. Deleting unused AMIs and snapshots avoids paying for them.",
    examKeywords: [
      "golden AMI",
      "Image Builder",
      "automate image creation",
      "distribute AMI to other Regions",
      "instance refresh",
      "immutable infrastructure",
      "deprecate old AMIs",
    ],
    examTraps: [
      "Deregistering an AMI does not delete its snapshots. Delete them to stop the cost.",
      "AMIs are Regional. Copy them to use in another Region.",
      "An encrypted AMI shared across accounts needs the KMS key shared as well.",
      "Baking an AMI is for repeatable launches. Patch Manager patches running instances.",
    ],
    architectureDiagram: `Base AMI + [components: install, harden, test] --> [Image Builder pipeline (monthly)]
   --> AMI v42 --> copy to eu-west-1, share with org
   --> Launch template v42 --> ASG instance refresh (replace gradually)
   DLM: deprecate AMIs > 90 days, delete snapshots`,
    architectureCaption: "Automated, tested, distributed images and a gradual rollout.",
    mentorTip:
      "When a question wants faster, consistent, secure launches, the answer is a golden AMI built by an automated pipeline, not a long user data script.",
    questionIds: [
      "q-golden-ami-image-builder-pipelines-1",
      "q-golden-ami-image-builder-pipelines-2",
      "q-golden-ami-image-builder-pipelines-3",
    ],
  },
  {
    id: "ecs-networking-scaling-service-connect",
    moduleId: "phase-7-containers",
    category: "Containers",
    title: "ECS Operations: Network Modes, Auto Scaling, Capacity Providers and Deployments",
    shortName: "ECS operations",
    tier: 2,
    domains: [2, 3, 4],
    examImportance: "medium",
    oneLiner:
      "How an ECS task gets its network, how the service scales, where the capacity comes from and how a new version rolls out are four separate settings.",
    englishExplanation:
      "ECS task networking has three modes on EC2 and one on Fargate. With awsvpc, the mode Fargate requires and the recommended one for EC2, each task gets its own elastic network interface with a private IP and its own security group, so you can apply security groups per task and register tasks with a load balancer by IP target type. In bridge mode, tasks share the host's Docker network, and with dynamic port mapping an ALB can route to several tasks on one instance using different host ports. In host mode, the task uses the instance's network directly and ports can collide.\n\nA service keeps a desired number of tasks running, and service auto scaling adjusts that number with target tracking (for example average CPU or memory, or ALB request count per target), step scaling or scheduled actions. Capacity providers decide where tasks run. The Fargate and Fargate Spot capacity providers run tasks serverlessly, and Fargate Spot gives a discount for interruptible tasks. An Auto Scaling group capacity provider with managed scaling lets ECS scale the underlying EC2 instances to fit the tasks, so cluster capacity follows service demand. A strategy can mix providers, for example a base of Fargate tasks plus Fargate Spot above it. For EC2 launch type, placement strategies (spread across AZs or instances, binpack to fill instances and save cost, random) and constraints control where tasks land.\n\nFor communication between services, ECS Service Connect provides service discovery and traffic management with a managed proxy, so services call each other by name with built-in retries and metrics, and AWS Cloud Map supplies DNS-based discovery. For deployments, the rolling update type replaces tasks in batches governed by minimum healthy and maximum percent settings, the deployment circuit breaker rolls back automatically when new tasks fail to become healthy, and blue/green deployments through AWS CodeDeploy shift traffic between target groups with optional canary or linear steps. ECS Exec lets you open a shell in a running container for troubleshooting through Systems Manager, and task roles and execution roles keep permissions separate.",
    taglishExplanation:
      "May tatlong network mode ang ECS sa EC2 at isa sa Fargate. Ang awsvpc (kailangan sa Fargate, inirerekomenda sa EC2) ay may sariling ENI at security group ang bawat task, kaya IP target type sa load balancer. Sa bridge mode, ibinabahagi ang Docker network ng host at puwedeng dynamic port mapping sa ALB. Ang service auto scaling ay target tracking (CPU, memory, ALB request count), step, o scheduled. Ang capacity providers ang nagpapasya kung saan tatakbo ang task: Fargate, Fargate Spot, o ASG capacity provider na may managed scaling. Ang Service Connect ay service discovery at traffic management gamit ang managed proxy. Sa deployment: rolling update, deployment circuit breaker para awtomatikong rollback, at blue/green gamit ang CodeDeploy.",
    analogy:
      "Running a fleet of food stalls. The network mode decides whether each stall has its own phone line and lock (awsvpc) or shares the market's. Service auto scaling opens more stalls at lunch. Capacity providers decide whether stalls are set up in your own hall (EC2), in rented pop-up space (Fargate) or in cheap temporary space that may be reclaimed (Fargate Spot). Service Connect is the market directory that lets stalls find each other by name, and a circuit breaker closes a new stall automatically if its first customers are all unhappy.",
    whyItExists:
      "Container platforms need network isolation, elastic capacity, cost control and safe releases, and ECS exposes each as a separate, composable setting.",
    flow: "Task definition (network mode) -> service (desired count, auto scaling) -> capacity provider strategy -> tasks placed -> ALB / Service Connect routes traffic -> deployment with circuit breaker or blue/green",
    withoutIt: [
      "Tasks would share network identity and security rules",
      "Cluster instances would be sized by hand",
      "A bad deployment could take the whole service down with no automatic rollback",
    ],
    bestUseCases: [
      "awsvpc networking with per-task security groups",
      "Target tracking on ALB request count per target for web services",
      "Capacity provider strategy with a Fargate base and Fargate Spot above it",
      "ASG capacity provider with managed scaling for EC2-based clusters",
      "Deployment circuit breaker for automatic rollback and CodeDeploy for canary releases",
    ],
    poorUseCases: [
      "Host mode for many tasks of the same service on one instance (port collisions)",
      "Fargate Spot for tasks that cannot tolerate interruption",
      "Hand-scaled EC2 clusters when managed scaling would work",
      "Rolling updates with no health checks or rollback settings",
    ],
    alternatives: [
      { need: "Run Kubernetes workloads", choose: "Amazon EKS" },
      { need: "Simple web service from an image", choose: "AWS App Runner" },
      { need: "Short event-driven code", choose: "AWS Lambda" },
      { need: "Queued batch jobs", choose: "AWS Batch" },
    ],
    keyFeatures: [
      "Network modes: awsvpc (task ENI and security group), bridge (dynamic port mapping), host",
      "Service auto scaling: target tracking, step and scheduled",
      "Capacity providers: Fargate, Fargate Spot, ASG with managed scaling, with base and weight",
      "Placement strategies: spread, binpack, random (EC2 launch type)",
      "Service Connect and Cloud Map for service discovery",
      "Rolling updates with minimum healthy percent and maximum percent, deployment circuit breaker, CodeDeploy blue/green",
      "ECS Exec, task role vs task execution role",
    ],
    availability:
      "Spread tasks across AZs, use health checks and the circuit breaker, and run enough tasks that losing an AZ leaves capacity.",
    security:
      "Use awsvpc with per-task security groups, least-privilege task roles, private subnets and secrets from Secrets Manager.",
    pricingLogic:
      "Fargate Spot and binpack placement lower cost. Managed scaling prevents paying for idle EC2 capacity, and right-sizing task CPU and memory avoids waste.",
    examKeywords: [
      "awsvpc",
      "per-task security group",
      "capacity provider",
      "Fargate Spot",
      "binpack",
      "service auto scaling",
      "deployment circuit breaker",
      "Service Connect",
    ],
    examTraps: [
      "Fargate requires the awsvpc network mode.",
      "The task execution role pulls images and writes logs. The task role is for application code.",
      "Binpack saves cost by filling instances. Spread improves availability across AZs.",
      "Fargate Spot tasks can be interrupted with a two-minute warning.",
    ],
    architectureDiagram: `ALB (target type: IP) --> [ECS service, awsvpc: each task has ENI + SG]
   capacity provider strategy: Fargate base=2, Fargate Spot weight=4
   service auto scaling: target tracking ALBRequestCountPerTarget
   deployment: rolling + circuit breaker (auto rollback)   |   or CodeDeploy blue/green`,
    architectureCaption: "Network, scaling, capacity and release are four independent settings.",
    mentorTip:
      "When you see per-task security groups, the answer is awsvpc. When you see cheaper capacity for interruptible tasks, the answer is Fargate Spot or Spot-backed capacity providers.",
    questionIds: [
      "q-ecs-networking-scaling-service-connect-1",
      "q-ecs-networking-scaling-service-connect-2",
      "q-ecs-networking-scaling-service-connect-3",
    ],
  },
  {
    id: "tagging-governance-tag-policies-resource-groups",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "Tagging Governance: Tag Policies, Enforcement and Resource Groups",
    shortName: "Tagging governance",
    tier: 2,
    domains: [4, 1],
    examImportance: "medium",
    oneLiner:
      "Tags only help if they are consistent, so use tag policies to standardise them, IAM and SCP conditions to require them and Resource Groups to act on them.",
    englishExplanation:
      "Tags drive cost allocation, access control (attribute-based access control), automation and operations, but they only work when every resource carries the right keys with the right values. Inconsistent tags, such as Environment, environment and Env, break reports and policies. AWS Organizations tag policies define the allowed tag keys, the exact capitalisation and the allowed values for selected resource types, and check compliance across accounts. A tag policy reports non-compliant resources and, when enforcement is enabled for a resource type, can prevent non-compliant tagging operations. It standardises tags, but it does not by itself force a resource to have a tag.\n\nTo require tags at creation, use identity-based policies or service control policies with condition keys. The aws:RequestTag/key condition checks the tag in a creation request, for example denying ec2:RunInstances unless a CostCenter tag is supplied, and aws:TagKeys controls which keys can be set. The aws:ResourceTag/key and aws:PrincipalTag/key conditions support ABAC. AWS Config managed rules such as required-tags evaluate existing resources and can trigger remediation, and CloudFormation can propagate stack-level tags to resources it creates, which is an easy way to keep templates consistent. Service Catalog can apply TagOptions and AWS Control Tower can include tagging controls.\n\nResource Groups let you group resources by tags or by CloudFormation stack and then manage them together: view them as a unit, apply Systems Manager automation to the group and see a consolidated view. The Tag Editor finds resources across Regions by tag and lets you add or change tags in bulk, including finding untagged resources. For cost, remember that tags must be activated as cost allocation tags in the Billing console before they appear in Cost Explorer and the Cost and Usage Report, tags are not applied retroactively to past costs, and the AWS-generated tags are separate from user-defined ones. A practical strategy is a small mandatory set, such as Owner, CostCenter, Environment and Application, enforced at creation, standardised by a tag policy and reported by Config.",
    taglishExplanation:
      "Ang tags ay para sa cost allocation, access control (ABAC), automation, at operations, pero gumagana lang kapag pare-pareho ang keys at values. Ang tag policies sa Organizations ay nagde-define ng allowed na tag keys, capitalisation, at values, at nagre-report ng non-compliant; kapag naka-enable ang enforcement, puwede nitong pigilan ang maling tagging. Pero hindi nito pinipilit na magkaroon ng tag ang resource. Para i-require ang tag sa creation, gamitin ang IAM o SCP na may aws:RequestTag at aws:TagKeys. Ang Config rule na required-tags ay nagche-check ng umiiral na resources. Ang Resource Groups ay naggugrupo ayon sa tags o CloudFormation stack, at ang Tag Editor ay naghahanap at nag-e-edit ng tags nang bulk. Tandaan: i-activate ang cost allocation tags at hindi ito retroactive.",
    analogy:
      "A library's labelling system. The tag policy is the style guide that says every book label must use exactly these categories and spellings. The creation rule is the librarian who refuses to shelve a book without a label. The Config check is the audit that walks the shelves and flags unlabelled books. Resource Groups are themed shelves, and the Tag Editor is the stamp that lets you relabel many books at once.",
    whyItExists:
      "Without enforced tagging, cost reports have unowned spend, ABAC policies miss resources and automation cannot find what it should act on.",
    flow: "Tag policy defines keys and values -> IAM or SCP requires tags at creation -> Config checks existing resources -> Resource Groups and Tag Editor act on tags -> activate cost allocation tags",
    withoutIt: [
      "Cost reports would show large untagged spend",
      "ABAC policies would not match resources reliably",
      "Operations automation could not target the right resources",
    ],
    bestUseCases: [
      "Organization-wide tag policy for Environment, Owner and CostCenter",
      "SCP or IAM policy denying resource creation without required tags",
      "Config required-tags rule with remediation",
      "Resource Groups for an application's resources by tag or stack",
      "Tag Editor to find and fix untagged resources across Regions",
    ],
    poorUseCases: [
      "Expecting a tag policy alone to require tags on every new resource",
      "Many optional, inconsistent tag keys",
      "Assuming tagging an old resource changes past cost reports",
      "Using tags for secrets or sensitive data",
    ],
    alternatives: [
      { need: "View and analyse costs by tag", choose: "AWS Cost Explorer with cost allocation tags" },
      { need: "Group costs by custom business rules", choose: "AWS Cost Categories" },
      { need: "Evaluate configuration compliance", choose: "AWS Config" },
      { need: "Access control from tags", choose: "ABAC with IAM policy conditions" },
    ],
    keyFeatures: [
      "Tag policies: allowed keys, capitalisation, values and optional enforcement",
      "aws:RequestTag and aws:TagKeys conditions to require or restrict tags at creation",
      "Config required-tags rule and remediation",
      "CloudFormation stack tags propagate to resources",
      "Resource Groups by tag or stack, Tag Editor for bulk edits",
      "Cost allocation tags must be activated and are not retroactive",
      "Mandatory minimal tag set",
    ],
    availability:
      "Tagging has no effect on availability, but consistent tags speed up incident response by identifying owners and environments.",
    security:
      "Restrict who can change tags that ABAC relies on, because changing a tag can change access. Do not store sensitive data in tags.",
    pricingLogic:
      "Tags and tag policies are free. Their value is attribution: they make chargeback, budgets and optimisation possible.",
    examKeywords: [
      "tag policy",
      "enforce tagging",
      "aws:RequestTag",
      "required-tags",
      "Resource Groups",
      "Tag Editor",
      "cost allocation tags",
      "untagged resources",
    ],
    examTraps: [
      "A tag policy standardises tags. It does not require every resource to have a tag.",
      "To require a tag at creation, use an IAM or SCP condition on aws:RequestTag.",
      "Cost allocation tags must be activated, and they are not retroactive.",
      "Config required-tags finds non-compliant existing resources, but it does not block creation.",
    ],
    architectureDiagram: `Organizations tag policy: Environment in {prod, dev, test}, CostCenter required values
SCP: Deny ec2:RunInstances unless aws:RequestTag/CostCenter exists
Config: required-tags --> non-compliant --> remediation
Resource Group (tag: Application=checkout) --> view + Systems Manager actions
Billing: activate CostCenter as cost allocation tag --> Cost Explorer / CUR`,
    architectureCaption: "Standardise, require, audit, group and report.",
    mentorTip:
      "Split the problem in three: standardise (tag policy), require (aws:RequestTag in IAM or SCP) and audit (Config). The exam often asks for one of them specifically.",
    questionIds: [
      "q-tagging-governance-tag-policies-resource-groups-1",
      "q-tagging-governance-tag-policies-resource-groups-2",
      "q-tagging-governance-tag-policies-resource-groups-3",
    ],
  },
];
