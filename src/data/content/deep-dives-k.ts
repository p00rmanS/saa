import type { Lesson } from "@/lib/types";

export const deepDivesK: Lesson[] = [
  {
    id: "iam-policy-conditions-abac",
    moduleId: "phase-1-iam",
    category: "Security, Identity, and Compliance",
    title: "Reading IAM Policies: Elements, Conditions, Variables and ABAC",
    shortName: "IAM policy JSON",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "Every IAM policy is a list of statements, and conditions and tags let one small policy express rules that would otherwise need hundreds.",
    englishExplanation:
      "An IAM policy is a JSON document with a Version (use 2012-10-17) and a list of Statement objects. Each statement has an Effect (Allow or Deny), an Action (or NotAction), a Resource (or NotResource) and optionally a Condition. Resource-based policies, such as bucket policies and role trust policies, add a Principal that says who the statement applies to. Identity-based policies, attached to users, groups or roles, do not have a Principal because the principal is whoever the policy is attached to. Policies can be AWS managed (maintained by AWS, such as ReadOnlyAccess), customer managed (reusable and versioned by you) or inline (embedded in one identity, used for strict one-to-one relationships).\n\nConditions narrow when a statement applies. A condition pairs an operator (StringEquals, StringLike, ArnLike, IpAddress, Bool, NumericLessThan, DateGreaterThan and others) with a condition key and values. Several conditions in one block must all be true (AND), while several values for one key are an OR. Global condition keys work across services: aws:SourceIp restricts by caller address, aws:RequestedRegion restricts the Region of a request, aws:MultiFactorAuthPresent requires MFA, aws:SecureTransport requires TLS, aws:PrincipalOrgID limits a resource policy to accounts in an organization, and aws:SourceVpce or aws:SourceVpc limits access to traffic through a VPC endpoint or VPC. Set operators ForAllValues and ForAnyValue handle multi-valued keys. Policy variables such as ${aws:username} let one policy give each user their own S3 prefix.\n\nAttribute-based access control (ABAC) uses tags as the attributes. You tag principals (for example Project=Orion) and resources (Project=Orion), and a single policy allows an action when aws:PrincipalTag/Project equals aws:ResourceTag/Project. This scales better than role-based access control, because new projects and resources are covered by tagging rather than by writing new policies, and it follows the principle of least privilege. The policy must also control who can change the tags, otherwise users could grant themselves access. IAM Access Analyzer can validate policies and generate least-privilege policies from CloudTrail activity.",
    taglishExplanation:
      "Ang IAM policy ay JSON na may Version at listahan ng Statement. Bawat statement ay may Effect (Allow o Deny), Action, Resource, at puwedeng may Condition. Ang resource-based policy ay may Principal; ang identity-based ay wala dahil ang principal ay kung sino ang pinagkabitan. Ang Condition ay may operator, key, at values: ang maraming condition ay AND, ang maraming value sa isang key ay OR. Mga karaniwang key: aws:SourceIp, aws:RequestedRegion, aws:MultiFactorAuthPresent, aws:SecureTransport, aws:PrincipalOrgID, at aws:SourceVpce. Ang ABAC ay gumagamit ng tags: parehong tag ng principal at resource ang pinagtutugma ng isang policy, kaya hindi na kailangang magsulat ng bagong policy para sa bawat proyekto.",
    analogy:
      "A building access system. A statement is one rule on the door controller: who (principal), what they may do (action), which doors (resource) and the fine print (condition), such as 'only on weekdays, only with a badge and a PIN'. ABAC is giving every employee a coloured wristband and every room a colour: one rule, 'wristband colour must match the room colour', replaces a rule per room.",
    whyItExists:
      "Fine-grained permissions would explode into thousands of policies if every case needed its own. Conditions, variables and tags let a few policies stay accurate as the organisation grows.",
    flow: "Request -> authentication -> evaluate policies: match Effect, Action, Resource, then Condition keys from the request context -> allow only if some policy allows and none denies",
    withoutIt: [
      "You could not restrict access by Region, network, MFA or time",
      "Each new project would need new, hand-written policies",
      "Resource policies could not be limited to your organization's accounts",
    ],
    bestUseCases: [
      "Deny actions outside approved Regions using aws:RequestedRegion",
      "Require MFA for sensitive actions with aws:MultiFactorAuthPresent",
      "Allow S3 access to a per-user prefix using ${aws:username}",
      "ABAC with PrincipalTag and ResourceTag for project-based access",
      "aws:PrincipalOrgID in a bucket policy to allow any account in the organization",
    ],
    poorUseCases: [
      "Writing a separate role and policy for every project when ABAC would do",
      "Allowing users to edit the tags that ABAC depends on",
      "Using NotAction with Allow without understanding that it permits everything else",
      "Embedding secrets or account numbers that change in inline policies",
    ],
    alternatives: [
      { need: "Cap permissions regardless of policies", choose: "Permissions boundaries or SCPs" },
      { need: "Generate a least-privilege policy from real activity", choose: "IAM Access Analyzer policy generation" },
      { need: "Temporary access for another account", choose: "IAM roles with STS" },
      { need: "Manage SSO assignments across accounts", choose: "IAM Identity Center permission sets" },
    ],
    keyFeatures: [
      "Policy elements: Version, Statement, Effect, Action, Resource, Principal, Condition",
      "AWS managed, customer managed and inline policies",
      "Condition operators and global keys such as aws:SourceIp, aws:RequestedRegion, aws:PrincipalOrgID, aws:SourceVpce",
      "AND across conditions, OR across values of one key",
      "Policy variables such as ${aws:username}",
      "ABAC: aws:PrincipalTag matched to aws:ResourceTag",
      "Access Analyzer policy validation and generation",
    ],
    availability:
      "IAM is a global, highly available control plane. Overly complex policies are an operational risk, so test them with the IAM policy simulator.",
    security:
      "Prefer explicit conditions, deny what must never happen, protect tag-editing permissions in ABAC and review unused permissions with Access Analyzer and last-accessed data.",
    pricingLogic:
      "IAM is free. The cost of complicated policy sets is the effort to audit and debug them, which ABAC and conditions reduce.",
    examKeywords: [
      "condition key",
      "restrict to a Region",
      "require MFA",
      "attribute-based access control",
      "tags",
      "PrincipalOrgID",
      "policy variable",
      "least privilege",
    ],
    examTraps: [
      "Identity-based policies have no Principal element. Resource-based policies do.",
      "Multiple condition operators are ANDed. Multiple values for one key are ORed.",
      "ABAC requires tagging discipline and control over who can modify tags.",
      "An explicit Deny in any applicable policy overrides every Allow.",
    ],
    architectureDiagram: `Policy (ABAC):
 Allow ec2:StartInstances, ec2:StopInstances on *
 Condition: StringEquals { aws:ResourceTag/Project : \${aws:PrincipalTag/Project} }

 Alice  (tag Project=Orion) --> instance (Project=Orion)   ALLOWED
 Alice  (tag Project=Orion) --> instance (Project=Atlas)   DENIED (no matching allow)`,
    architectureCaption: "One policy, matched tags, many projects.",
    mentorTip:
      "When a question asks how to scale permissions as projects grow, think tags and ABAC. When it asks to restrict by Region, network or MFA, think condition keys.",
    questionIds: [
      "q-iam-policy-conditions-abac-1",
      "q-iam-policy-conditions-abac-2",
      "q-iam-policy-conditions-abac-3",
    ],
  },
  {
    id: "s3-events-access-points-static-hosting",
    moduleId: "phase-3-storage",
    category: "Storage",
    title: "S3 Features: Event Notifications, Access Points, Static Hosting and Batch Operations",
    shortName: "S3 features deep dive",
    tier: 2,
    domains: [1, 2, 3],
    examImportance: "high",
    oneLiner:
      "S3 can trigger work when objects change, host a website, give each application its own access path and run bulk operations on millions of objects.",
    englishExplanation:
      "S3 Event Notifications send a message when something happens to an object, such as ObjectCreated, ObjectRemoved, ObjectRestore or replication events. The destinations are SNS, SQS, Lambda or EventBridge. Sending events to EventBridge provides richer filtering, many targets and archive and replay. Notifications are normally delivered within seconds, and delivery is at least once, so consumers should be idempotent. A typical pattern is an upload that triggers a Lambda function to generate a thumbnail or start a processing workflow. Filter by prefix and suffix to avoid recursive triggers, for example processing only uploads under incoming/ and writing results to a different prefix or bucket.\n\nStatic website hosting serves a bucket as a website with an index document and an error document. The website endpoint supports HTTP only and requires the content to be publicly readable, so the usual secure design puts CloudFront in front of a private bucket with Origin Access Control and a certificate from ACM for HTTPS and a custom domain. CORS configuration on a bucket lets browsers on another origin read its objects. S3 Access Points give each application or team its own named endpoint with its own policy and optional restriction to a VPC, which avoids one giant bucket policy, and Multi-Region Access Points provide a single global endpoint that routes requests to the closest bucket among replicated buckets. S3 Object Lambda transforms data as it is retrieved, for example redacting fields for a particular consumer.\n\nFor large-scale management, S3 Inventory produces scheduled reports of objects and their metadata, in CSV, ORC or Parquet, which are far cheaper than listing a huge bucket. S3 Batch Operations runs an action across all objects in a manifest, such as copying, tagging, invoking Lambda, restoring from Glacier or applying Object Lock retention, with progress tracking and a completion report. S3 Storage Lens gives organization-wide usage and activity metrics.",
    taglishExplanation:
      "Ang S3 Event Notifications ay nagpapadala ng mensahe kapag may nangyari sa object, tulad ng ObjectCreated o ObjectRemoved, papunta sa SNS, SQS, Lambda, o EventBridge. Karaniwang segundo lang ang delivery at at-least-once, kaya dapat idempotent ang consumer. Gumamit ng prefix at suffix filter para iwasan ang recursive na trigger. Ang static website hosting ay HTTP lang at kailangang public ang content, kaya mas ligtas na ilagay ang CloudFront sa harap ng private bucket gamit ang OAC at ACM certificate. Ang Access Points ay may sariling endpoint at policy kada application. Ang Multi-Region Access Points ay isang global endpoint. Ang S3 Inventory at Batch Operations ay para sa malakihang pamamahala ng objects.",
    analogy:
      "A warehouse with a doorbell, side doors and a forklift crew. Event notifications ring a bell to tell the right team when a parcel arrives. Access points are separate side doors, each with its own guard and rules for one department. Inventory is the daily stock list, and Batch Operations is the forklift crew that moves, labels or retrieves thousands of parcels from a single instruction sheet.",
    whyItExists:
      "Objects rarely just sit still. Applications need to react to uploads, serve content safely, give different teams different access and manage billions of objects without writing custom scripts.",
    flow: "Upload -> S3 event (prefix/suffix filter) -> SNS / SQS / Lambda / EventBridge -> processing ; Access Point policy + bucket policy both must allow ; Inventory -> manifest -> Batch Operations job",
    withoutIt: [
      "You would poll buckets to find new objects",
      "A single bucket policy would grow unmanageable as teams were added",
      "Bulk changes to millions of objects would need custom listing and scripting",
    ],
    bestUseCases: [
      "Lambda triggered by uploads to a prefix for image processing",
      "EventBridge for S3 events that must fan out to several targets with filtering and replay",
      "CloudFront with Origin Access Control in front of a private bucket for a static site",
      "Access Points per application with VPC-only access for a shared data lake bucket",
      "Inventory plus Batch Operations to restore or re-tag millions of objects",
    ],
    poorUseCases: [
      "Writing results back to the same prefix that triggers the function",
      "Using the S3 website endpoint when HTTPS is required",
      "Listing a billion-object bucket repeatedly instead of using Inventory",
      "Relying on event delivery being exactly once",
    ],
    alternatives: [
      { need: "Serve a static site with HTTPS and a custom domain", choose: "CloudFront with OAC and ACM" },
      { need: "Full web app hosting with build pipeline", choose: "AWS Amplify" },
      { need: "Cross-Region copies of objects", choose: "S3 Replication" },
      { need: "Org-wide storage analytics", choose: "S3 Storage Lens" },
    ],
    keyFeatures: [
      "Event Notifications to SNS, SQS, Lambda or EventBridge with prefix and suffix filters",
      "Static website hosting: index and error documents, HTTP-only endpoint",
      "CORS configuration for cross-origin browser access",
      "Access Points with their own policies and VPC restriction",
      "Multi-Region Access Points for a global endpoint",
      "S3 Object Lambda to transform data on retrieval",
      "Inventory reports and Batch Operations jobs",
    ],
    availability:
      "Event delivery is at least once and not ordered, so design for duplicates. Multi-Region Access Points route to healthy buckets and support failover with replication.",
    security:
      "Access points and the bucket policy are evaluated together, so delegate access control to access points by allowing access via them in the bucket policy. Keep website content private behind CloudFront where possible.",
    pricingLogic:
      "Notifications are free of charge, with downstream services billed normally. Inventory and Batch Operations are charged per object processed, and listing very large buckets costs requests.",
    examKeywords: [
      "trigger a Lambda on upload",
      "static website",
      "access point",
      "global endpoint",
      "bulk operation on millions of objects",
      "inventory",
      "CORS",
      "prefix filter",
    ],
    examTraps: [
      "The S3 website endpoint is HTTP only. HTTPS needs CloudFront.",
      "S3 events are at least once and can arrive more than once or out of order.",
      "Writing output to the triggering prefix can cause an infinite loop.",
      "Access points do not replace the bucket policy. Both must allow the request.",
    ],
    architectureDiagram: `Upload to s3://media/incoming/  --event (prefix incoming/)-->  [Lambda: thumbnail] --> s3://media/thumbs/
                                  \\--> [EventBridge] --> Step Functions / SNS (archive + replay)
App A --> [Access Point A (VPC only)] --\\
App B --> [Access Point B (read only)] ---> [Bucket policy delegates to access points]
Inventory (daily) --> manifest --> [Batch Operations: restore / tag / copy]`,
    architectureCaption: "React to changes, separate access paths and manage objects in bulk.",
    mentorTip:
      "Three separate needs, three features: react to changes (events), separate access paths (access points), act on millions of objects (Inventory plus Batch Operations).",
    questionIds: [
      "q-s3-events-access-points-static-hosting-1",
      "q-s3-events-access-points-static-hosting-2",
      "q-s3-events-access-points-static-hosting-3",
    ],
  },
  {
    id: "route-53-resolver-hybrid-dns",
    moduleId: "phase-4-networking",
    category: "Networking and Content Delivery",
    title: "Hybrid DNS: Route 53 Resolver, Private Hosted Zones and DNS Firewall",
    shortName: "Hybrid DNS",
    tier: 2,
    domains: [3, 1],
    examImportance: "medium",
    oneLiner:
      "Route 53 Resolver answers DNS inside your VPCs, and inbound and outbound endpoints let AWS and your data center resolve each other's private names.",
    englishExplanation:
      "Every VPC has an Amazon-provided DNS resolver (the Route 53 Resolver) reachable at the VPC base address plus two. It resolves public names, the private DNS names of instances and the records of any private hosted zones associated with the VPC. A private hosted zone holds DNS records that are visible only inside the VPCs you associate with it, such as db.internal.example.com. For it to work the VPC must have DNS support and DNS hostnames enabled. A private hosted zone can be associated with VPCs in other accounts and Regions.\n\nHybrid DNS solves name resolution between your VPCs and your on-premises network, which cannot query the VPC resolver directly. An inbound resolver endpoint gives your on-premises DNS servers IP addresses in your VPC to forward queries to, so on-premises systems can resolve AWS private names. An outbound resolver endpoint, with forwarding rules, lets resources in the VPC send queries for specific domains, such as corp.example.com, to your on-premises DNS servers. Endpoints are network interfaces placed in at least two AZs for resilience, and rules can be shared across accounts with Resource Access Manager and associated with many VPCs, which fits a hub-and-spoke network connected through Transit Gateway.\n\nTwo more capabilities appear in scenarios. Route 53 Resolver DNS Firewall filters outbound DNS queries from a VPC against allow and deny lists of domains, blocking malware domains or data exfiltration through DNS. Resolver query logging records the DNS queries made by resources in a VPC to CloudWatch Logs, S3 or Data Firehose for investigation. These complement security groups and network firewalls, which do not see DNS names.",
    taglishExplanation:
      "May Amazon-provided DNS resolver ang bawat VPC (Route 53 Resolver) na nasa base address ng VPC plus two. Nare-resolve nito ang public names, private DNS names ng instances, at records sa private hosted zones na naka-associate sa VPC. Para gumana, naka-enable dapat ang DNS support at DNS hostnames. Para sa hybrid: ang inbound endpoint ay nagbibigay sa on-premises DNS ng IP sa VPC na pagpapasahan ng query, kaya naso-solve ng on-premises ang AWS private names. Ang outbound endpoint na may forwarding rules ay nagpapasa ng query para sa partikular na domain, tulad ng corp.example.com, papunta sa on-premises DNS. Ang DNS Firewall ay nagfi-filter ng outbound DNS queries, at ang query logging ay nagtatala nito.",
    analogy:
      "A company phone directory that exists in two buildings. Each building has its own receptionist (the VPC resolver and the on-premises DNS server). An inbound endpoint is a direct line from the office receptionist to ours, and an outbound endpoint with rules is our receptionist forwarding 'anything for the head office' to theirs. DNS Firewall is the switchboard blocking calls to known scam numbers.",
    whyItExists:
      "Hybrid environments need consistent name resolution in both directions, and DNS is also a path for malware and data exfiltration that network-level controls do not inspect.",
    flow: "VPC instance -> Route 53 Resolver -> private hosted zone / public DNS ; on-premises name: outbound endpoint + rule -> on-premises DNS ; on-premises asks for AWS name: on-premises DNS -> inbound endpoint -> Resolver",
    withoutIt: [
      "On-premises systems could not resolve private AWS names",
      "VPC workloads could not resolve on-premises names without custom DNS servers",
      "Malicious domain lookups would pass unchecked",
    ],
    bestUseCases: [
      "Private hosted zones for internal service names across several VPCs",
      "Inbound endpoint so data center servers resolve AWS private names over VPN or Direct Connect",
      "Outbound endpoint with forwarding rules for corporate domains",
      "Rules shared with RAM across accounts in a Transit Gateway hub design",
      "DNS Firewall and query logging for security monitoring",
    ],
    poorUseCases: [
      "Running your own DNS servers on EC2 when Resolver endpoints would do",
      "Forgetting to enable DNS support and DNS hostnames, so private zones fail to resolve",
      "Using only one AZ for resolver endpoints",
      "Expecting a private hosted zone to resolve from the internet",
    ],
    alternatives: [
      { need: "Public DNS for internet-facing names", choose: "Route 53 public hosted zone" },
      { need: "Block outbound traffic by IP and protocol", choose: "AWS Network Firewall or security groups" },
      { need: "Managed Active Directory with DNS", choose: "AWS Directory Service" },
      { need: "Route traffic by health, latency or location", choose: "Route 53 routing policies" },
    ],
    keyFeatures: [
      "VPC resolver at the base address plus two, enableDnsSupport and enableDnsHostnames",
      "Private hosted zones associated with VPCs, including across accounts and Regions",
      "Inbound resolver endpoints for on-premises to AWS queries",
      "Outbound resolver endpoints and forwarding rules for AWS to on-premises queries",
      "Endpoints use network interfaces in at least two AZs",
      "Rules sharable with Resource Access Manager",
      "DNS Firewall and Resolver query logging",
    ],
    availability:
      "Deploy endpoints in at least two AZs. The VPC resolver itself is managed and highly available.",
    security:
      "Restrict endpoint security groups to DNS traffic from known networks, use DNS Firewall to block malicious domains and log queries for investigations.",
    pricingLogic:
      "Resolver endpoints are charged per network interface per hour plus per query, private hosted zones per zone per month, and DNS Firewall per rule group and per query.",
    examKeywords: [
      "resolve private names from on-premises",
      "forward queries to on-premises DNS",
      "private hosted zone",
      "inbound endpoint",
      "outbound endpoint",
      "DNS Firewall",
      "hybrid DNS",
    ],
    examTraps: [
      "Inbound is on-premises asking AWS. Outbound is AWS asking on-premises. Do not reverse them.",
      "Private hosted zones need DNS support and DNS hostnames enabled on the VPC.",
      "Security groups and NACLs do not filter by domain name. DNS Firewall does.",
      "Resolver endpoints should span at least two AZs for resilience.",
    ],
    architectureDiagram: `On-premises DNS --(via VPN/DX)--> [Inbound endpoint] --> Route 53 Resolver --> private hosted zone (db.internal)
VPC workload  --> Route 53 Resolver --(rule: corp.example.com)--> [Outbound endpoint] --> On-premises DNS
DNS Firewall blocks known-bad domains; query logs --> CloudWatch / S3`,
    architectureCaption: "Names resolve in both directions, and DNS is filtered and logged.",
    mentorTip:
      "Say the direction out loud: who is asking and who is answering. On-premises asking AWS means inbound, AWS asking on-premises means outbound.",
    questionIds: [
      "q-route-53-resolver-hybrid-dns-1",
      "q-route-53-resolver-hybrid-dns-2",
      "q-route-53-resolver-hybrid-dns-3",
    ],
  },
  {
    id: "vpc-endpoint-types-and-policies",
    moduleId: "phase-4-networking",
    category: "Networking and Content Delivery",
    title: "VPC Endpoints Compared: Gateway, Interface, Gateway Load Balancer and Endpoint Policies",
    shortName: "VPC endpoint types",
    tier: 1,
    domains: [1, 4, 3],
    examImportance: "high",
    oneLiner:
      "Endpoints let workloads reach AWS services privately. Gateway endpoints are free route table entries for S3 and DynamoDB, interface endpoints are network interfaces for almost everything else.",
    englishExplanation:
      "A VPC endpoint connects a VPC to a service without an internet gateway, NAT device or public IP address. There are three types. A gateway endpoint supports only Amazon S3 and Amazon DynamoDB. It is a target in a route table, using a prefix list for the service, has no hourly or data charge and is highly available by design, but it cannot be used from on premises, from a peered VPC or through a Transit Gateway, because it works through your own route tables. An interface endpoint, powered by AWS PrivateLink, places an elastic network interface with a private IP address in your subnets and supports a large number of AWS services as well as your own services and partner services. It is protected by security groups, can use private DNS so the normal service name resolves to the private address, is reachable from on premises over VPN or Direct Connect and from peered or Transit Gateway-connected networks, and is charged per hour per AZ plus per GB. A Gateway Load Balancer endpoint steers traffic to a fleet of security appliances.\n\nEndpoint policies add a resource-level control. An endpoint policy is an IAM-style policy attached to the endpoint that limits which principals, actions and resources can be used through it, for example allowing only requests to a specific S3 bucket. The default policy allows everything. Combine it with a bucket policy that denies requests not arriving through the endpoint using aws:SourceVpce to build a closed data path that cannot be bypassed from the internet.\n\nPrivateLink also lets you publish your own service. A provider puts a Network Load Balancer (or Gateway Load Balancer) in front of the service and creates an endpoint service, and consumers in other VPCs and accounts create interface endpoints to it. Traffic is one way, from consumer to provider, works with overlapping CIDR blocks and never touches the internet. Cost-wise, gateway endpoints for S3 and DynamoDB are free and remove NAT gateway data processing charges for that traffic.",
    taglishExplanation:
      "Ang VPC endpoint ay nagkokonekta ng VPC sa service nang walang internet gateway, NAT, o public IP. Tatlo ang uri. Ang gateway endpoint ay para lang sa S3 at DynamoDB, target ito sa route table, libre, pero hindi magagamit mula on-premises, peered VPC, o Transit Gateway. Ang interface endpoint (PrivateLink) ay may ENI na may private IP sa subnet mo, may security group, may private DNS, abot mula on-premises, at may singil kada oras at kada GB. Ang GWLB endpoint ay para sa security appliances. Ang endpoint policy ay nililimitahan kung sino at anong resource ang puwedeng gamitin. Puwede ring i-publish ang sariling service gamit ang PrivateLink at NLB, na gumagana kahit overlapping ang CIDR.",
    analogy:
      "Private entrances to a government building. A gateway endpoint is a free staff door built into your own corridor for two departments only (S3 and DynamoDB). An interface endpoint is a staffed reception desk placed in your office for any department, with its own sign-in sheet (security group) and a phone number that works from other offices (on premises). An endpoint policy is the guest list the receptionist checks.",
    whyItExists:
      "Sending traffic to AWS services over the internet or through NAT adds cost and exposure. Endpoints keep traffic on the AWS network and let you enforce who can use the path.",
    flow: "Workload -> route table prefix list -> gateway endpoint -> S3/DynamoDB ; workload -> private DNS -> interface endpoint ENI -> PrivateLink -> service ; endpoint policy and resource policy both evaluated",
    withoutIt: [
      "Private subnets would need NAT gateways and pay per GB for AWS service traffic",
      "Traffic to AWS APIs would cross the internet",
      "Data could be exfiltrated to buckets outside your control",
    ],
    bestUseCases: [
      "Gateway endpoints for S3 and DynamoDB from private subnets to avoid NAT charges",
      "Interface endpoints for Systems Manager, ECR, CloudWatch and other services in isolated subnets",
      "Endpoint policies that allow only your own buckets",
      "Bucket policy with aws:SourceVpce to require access through the endpoint",
      "PrivateLink to expose a service to many accounts with overlapping CIDRs",
    ],
    poorUseCases: [
      "Expecting a gateway endpoint to work from on premises or a peered VPC",
      "Leaving the default allow-all endpoint policy where exfiltration is a concern",
      "Interface endpoints for large S3 traffic when a free gateway endpoint suffices from inside the VPC",
      "Using PrivateLink when full bidirectional network connectivity is needed",
    ],
    alternatives: [
      { need: "Full network connectivity between VPCs", choose: "VPC peering or Transit Gateway" },
      { need: "Outbound internet access", choose: "NAT gateway" },
      { need: "Insert security appliances in the traffic path", choose: "Gateway Load Balancer endpoints" },
      { need: "On-premises access to S3 privately", choose: "S3 interface endpoint over Direct Connect or VPN" },
    ],
    keyFeatures: [
      "Gateway endpoints: S3 and DynamoDB only, route table target, free, not reachable from on premises or peered VPCs",
      "Interface endpoints (PrivateLink): ENI with private IP, security groups, private DNS, many services, hourly and per-GB charge",
      "Gateway Load Balancer endpoints for appliance fleets",
      "Endpoint policies restrict principals, actions and resources",
      "aws:SourceVpce in resource policies enforces use of the endpoint",
      "Endpoint services let providers publish a service behind an NLB or GWLB",
      "Works with overlapping CIDRs and one-way connectivity",
    ],
    availability:
      "Gateway endpoints are highly available by design. For interface endpoints, create an endpoint network interface in each AZ you use.",
    security:
      "Use endpoint policies and resource policies together, apply security groups to interface endpoints and keep sensitive subnets free of internet routes.",
    pricingLogic:
      "Gateway endpoints are free. Interface endpoints cost per hour per AZ and per GB processed, and can still beat NAT for heavy AWS API traffic.",
    examKeywords: [
      "private access to S3",
      "avoid NAT gateway charges",
      "PrivateLink",
      "endpoint policy",
      "overlapping CIDR",
      "access from on premises",
      "aws:SourceVpce",
    ],
    examTraps: [
      "Gateway endpoints exist only for S3 and DynamoDB, and they are free.",
      "Gateway endpoints are not reachable from on premises. Use an interface endpoint for that.",
      "Interface endpoints and gateway endpoints are different mechanisms: ENI versus route table entry.",
      "PrivateLink is one-way from consumer to provider and does not need non-overlapping CIDRs.",
    ],
    architectureDiagram: `Private subnet --route: pl-s3 --> [Gateway endpoint] --> S3        (free, VPC only)
Private subnet --> [Interface endpoint ENI 10.0.3.5, SG, private DNS] --> SSM / ECR / CloudWatch
On-premises --VPN/DX--> [Interface endpoint] --> service
Provider: [NLB] --> [Endpoint service] <-- consumer accounts create interface endpoints`,
    architectureCaption: "Pick the endpoint type by the service, the source network and the cost.",
    mentorTip:
      "Ask two questions: is the service S3 or DynamoDB and the caller inside the VPC (gateway endpoint), or is it anything else or from on premises (interface endpoint)?",
    questionIds: [
      "q-vpc-endpoint-types-and-policies-1",
      "q-vpc-endpoint-types-and-policies-2",
      "q-vpc-endpoint-types-and-policies-3",
    ],
  },
  {
    id: "lambda-event-sources-versions-aliases",
    moduleId: "phase-2-compute",
    category: "Compute",
    title: "Lambda in Depth: Event Sources, Versions, Aliases, Layers and Destinations",
    shortName: "Lambda in depth",
    tier: 1,
    domains: [2, 3],
    examImportance: "high",
    oneLiner:
      "How a function is invoked decides how it scales and retries, and versions and aliases let you release and roll back safely.",
    englishExplanation:
      "Lambda functions are invoked in three ways, and the exam relies on knowing which applies. Synchronous invocation, used by API Gateway, an Application Load Balancer, a function URL and direct calls, waits for the result and the caller handles errors and retries. Asynchronous invocation, used by S3 events, SNS and EventBridge, places the event in an internal queue, returns immediately and retries failures automatically, with configurable maximum age and retry count, and can send results to destinations or a dead-letter queue. Event source mappings are poll-based: Lambda reads from SQS, Kinesis, DynamoDB Streams or MSK and invokes the function with batches. You control batch size and batching window, and for streams you can bisect a failing batch and report partial batch failures so only the failed items are retried. A failing record in a stream can block its shard until it succeeds or expires, so configure failure handling.\n\nVersions and aliases manage releases. Publishing a version creates an immutable snapshot of code and configuration, while $LATEST is the mutable working copy. An alias is a named pointer to a version, such as prod, that clients invoke by name. Aliases support weighted routing between two versions, so you can send 10 percent of traffic to a new version as a canary and shift gradually, with an instant rollback by repointing the alias. Layers package libraries or custom runtimes shared by many functions, up to five per function. Environment variables hold configuration and can be encrypted with KMS, and secrets belong in Secrets Manager or Parameter Store rather than plain variables.\n\nOther features come up often. Function URLs give a function a dedicated HTTPS endpoint with IAM or no authentication. Destinations route the outcome of asynchronous invocations to SQS, SNS, another Lambda or EventBridge, for both success and failure. SnapStart reduces cold-start time for supported runtimes by resuming from a snapshot. Memory ranges from 128 MB to 10 GB and CPU scales with memory, so increasing memory can reduce duration and sometimes cost. Functions can run on Graviton processors, use container images up to 10 GB and have an execution role for permissions, while resource-based policies grant other services and accounts permission to invoke.",
    taglishExplanation:
      "May tatlong paraan ng pag-invoke sa Lambda. Synchronous (API Gateway, ALB, function URL): naghihintay ang caller sa resulta at siya ang bahala sa retry. Asynchronous (S3, SNS, EventBridge): may internal queue, otomatikong nagre-retry, at puwedeng gumamit ng destinations o DLQ. Event source mapping (SQS, Kinesis, DynamoDB Streams, MSK): poll-based, may batch size, batch window, bisect on error, at partial batch response. Ang version ay immutable na snapshot at ang $LATEST ay mutable. Ang alias ay pangalan na tumuturo sa version, at puwedeng weighted para sa canary at madaling rollback. May layers para sa shared na libraries. Ang CPU ay proporsyonal sa memory.",
    analogy:
      "A restaurant order system. Synchronous calls are a customer waiting at the counter for their meal. Asynchronous calls are orders dropped in a ticket box that the kitchen retries if a dish burns. Event source mappings are the kitchen going to the pass to pick up tickets in batches. Versions are numbered, frozen recipe cards, and an alias is the menu item 'Today's special' that you can point at a new recipe card for a few diners first.",
    whyItExists:
      "Serverless code is triggered by many kinds of events with different delivery guarantees, and teams need a safe way to release changes without downtime.",
    flow: "Event -> (sync | async queue | polled batch) -> function version via alias -> result, or retry / destination / DLQ on failure",
    withoutIt: [
      "Failures would need custom retry and routing code per function",
      "A bad deployment would have no instant rollback",
      "Shared libraries would be copied into every function package",
    ],
    bestUseCases: [
      "Event source mapping from SQS with batching and partial batch failures",
      "Aliases with weighted routing for canary releases and quick rollback",
      "Destinations or a DLQ for asynchronous failures",
      "Layers for shared dependencies",
      "Function URLs for a simple HTTPS endpoint without API Gateway",
    ],
    poorUseCases: [
      "Relying on Lambda to retry synchronous failures for you",
      "Pointing production clients at $LATEST",
      "Plain-text secrets in environment variables",
      "Stream processing with no failure handling, where one poison record blocks a shard",
    ],
    alternatives: [
      { need: "Full API management with usage plans", choose: "Amazon API Gateway" },
      { need: "Long-running or containerised services", choose: "AWS Fargate" },
      { need: "Orchestrate several functions", choose: "AWS Step Functions" },
      { need: "Buffer events before processing", choose: "Amazon SQS" },
    ],
    keyFeatures: [
      "Invocation types: synchronous, asynchronous, event source mappings",
      "Async retries, maximum event age, destinations and DLQs",
      "Batch size, batching window, bisect on error, partial batch response",
      "Versions (immutable) and aliases (pointers with weighted routing)",
      "Layers, environment variables with KMS, function URLs",
      "SnapStart for faster cold starts on supported runtimes",
      "Memory 128 MB to 10 GB with proportional CPU, container images up to 10 GB",
    ],
    availability:
      "Lambda runs across multiple AZs automatically. Choose failure handling that matches the source: DLQ or destinations for async, bisect and partial batch for streams.",
    security:
      "Use least-privilege execution roles, resource policies to restrict who can invoke, KMS for environment variables and secrets managers for credentials.",
    pricingLogic:
      "You pay per request and per GB-second. Right-sizing memory can lower the total because a faster run costs fewer GB-seconds. Provisioned concurrency and SnapStart-related features have separate charges.",
    examKeywords: [
      "event source mapping",
      "partial batch response",
      "canary release",
      "alias",
      "dead-letter queue",
      "destinations",
      "layers",
      "SnapStart",
    ],
    examTraps: [
      "Synchronous callers must handle errors and retries themselves. Only asynchronous invocations are retried by Lambda.",
      "A version is immutable. $LATEST is not.",
      "An alias can split traffic between two versions, which is the basis for canary releases.",
      "CPU is allocated in proportion to memory, so more memory can mean faster execution.",
    ],
    architectureDiagram: `API Gateway --sync--> [alias: prod] --90%--> [version 7]
                                        \\--10%--> [version 8] (canary)
S3 / SNS / EventBridge --async queue (retries)--> function --on failure--> [SQS / DLQ destination]
SQS / Kinesis --event source mapping (batches)--> function (partial batch response)`,
    architectureCaption: "Invocation style sets the retry behaviour, aliases set the release behaviour.",
    mentorTip:
      "First classify the trigger: sync, async or polled. That tells you who retries and what failure handling to configure.",
    questionIds: [
      "q-lambda-event-sources-versions-aliases-1",
      "q-lambda-event-sources-versions-aliases-2",
      "q-lambda-event-sources-versions-aliases-3",
    ],
  },
  {
    id: "dynamodb-data-modeling-access-patterns",
    moduleId: "phase-5-databases",
    category: "Database",
    title: "DynamoDB Data Modeling: Keys, Indexes, Query vs Scan and Consistency",
    shortName: "DynamoDB modeling",
    tier: 1,
    domains: [3, 4],
    examImportance: "critical",
    oneLiner:
      "In DynamoDB you design the table around the questions you will ask, because efficient reads go through keys and indexes, not scans.",
    englishExplanation:
      "DynamoDB modeling starts from access patterns, not from entities. List the queries the application must answer, then choose keys so each is a fast key lookup. The partition key determines where an item is stored, so it needs high cardinality and evenly spread traffic to avoid hot partitions. An optional sort key orders items within a partition and enables range queries, so a table keyed on CustomerId and OrderDate can fetch one customer's orders in a date range with a single Query. A Query reads items with one partition key value (and optionally a sort key condition) and consumes capacity only for what it reads. A Scan reads the entire table and applies filters afterwards, so it is slow and expensive on large tables and should be avoided for regular access.\n\nSecondary indexes support additional patterns. A global secondary index (GSI) has its own partition and sort key, can be created at any time, has its own provisioned capacity and offers only eventually consistent reads. A local secondary index (LSI) shares the table's partition key with a different sort key, must be created with the table, shares its capacity, supports strongly consistent reads and limits each partition key value to 10 GB of data. Projection controls which attributes are copied into the index, which affects storage and read cost. Many designs put several entity types in one table (single-table design) with generic key names, trading simplicity of the model for fewer round trips.\n\nOther points matter for the exam. Reads are eventually consistent by default and cost half of a strongly consistent read, which is available on the table and LSIs but not GSIs. Item size is limited to 400 KB, so large objects belong in S3 with a pointer in the item. Conditional writes provide optimistic locking, transactions provide all-or-nothing writes across items at about twice the capacity cost, TTL deletes expired items at no charge for the delete, Streams capture changes for 24 hours, point-in-time recovery restores to any second in the last 35 days, and the Standard-IA table class lowers storage cost for rarely read tables. Write sharding spreads a hot key across several suffixed key values.",
    taglishExplanation:
      "Sa DynamoDB, magsimula sa access patterns, hindi sa entities. Ilista ang mga query, tapos pumili ng keys para ang bawat isa ay mabilis na key lookup. Ang partition key ay dapat mataas ang cardinality at pantay ang traffic para iwasan ang hot partition. Ang sort key ay nag-oorder sa loob ng partition at nagpapahintulot ng range query. Ang Query ay nagbabasa lang ng items sa isang partition key; ang Scan ay binabasa ang buong table at saka nagfi-filter, kaya mabagal at mahal. Ang GSI ay may sariling key, puwedeng idagdag anumang oras, eventually consistent lang. Ang LSI ay iisang partition key, kailangang gawin kasabay ng table, at may 10 GB limit kada partition key value. Ang item ay hanggang 400 KB lang.",
    analogy:
      "A filing room where drawers are labelled by customer (partition key) and folders inside are sorted by date (sort key). Fetching 'all of Maria's June orders' is one pull of a drawer. A Scan is emptying every drawer and reading every sheet to find them. A GSI is a second index card catalogue sorted a different way, kept up to date a moment behind the main drawers.",
    whyItExists:
      "DynamoDB achieves predictable single-digit-millisecond performance at any scale by locating data through keys. That only works if the data model matches the access patterns.",
    flow: "Access patterns -> choose partition and sort keys -> add GSIs for other patterns -> Query by key (not Scan) -> consider consistency, item size and hot keys",
    withoutIt: [
      "Queries would fall back to scans that read and pay for the whole table",
      "A skewed key would throttle one partition while others sit idle",
      "Every new query pattern would need a table redesign",
    ],
    bestUseCases: [
      "Composite keys such as CustomerId plus OrderDate for time-range queries",
      "GSIs for alternate lookups such as order status",
      "Write sharding for a hot partition key",
      "S3 for large objects with a pointer in the item",
      "TTL for expiring sessions and temporary data",
    ],
    poorUseCases: [
      "Regular Scans of large tables",
      "A low-cardinality partition key such as status or country",
      "Ad hoc relational queries and joins (use RDS or Aurora)",
      "Relying on a strongly consistent read from a GSI",
    ],
    alternatives: [
      { need: "Relational queries and joins", choose: "Amazon Aurora or RDS" },
      { need: "Microsecond reads on hot items", choose: "DynamoDB Accelerator (DAX)" },
      { need: "Ad hoc analytics on DynamoDB data", choose: "Export to S3 and query with Athena" },
      { need: "Graph relationships", choose: "Amazon Neptune" },
    ],
    keyFeatures: [
      "Partition key and optional sort key, composite primary key",
      "Query by key condition, Scan reads the whole table",
      "GSI: any time, own capacity, eventually consistent only",
      "LSI: created with the table, shared capacity, strongly consistent option, 10 GB per partition key value",
      "Eventually consistent reads by default, strongly consistent costs double",
      "Item size limit 400 KB, TTL, Streams (24 hours), PITR (35 days)",
      "Transactions, conditional writes, Standard-IA table class",
    ],
    availability:
      "Data is stored across three AZs in a Region. Global Tables add multi-Region replication. Adaptive capacity helps with uneven access but does not remove the need for a good key.",
    security:
      "Use IAM with fine-grained conditions (for example LeadingKeys) to restrict access to items, encrypt with KMS and use VPC gateway endpoints for private access.",
    pricingLogic:
      "On-demand charges per request and provisioned mode per capacity unit. Scans, strongly consistent reads, GSIs and transactions all raise consumed capacity, so efficient keys directly lower cost.",
    examKeywords: [
      "partition key",
      "sort key",
      "hot partition",
      "Query vs Scan",
      "global secondary index",
      "strongly consistent",
      "400 KB",
      "access pattern",
    ],
    examTraps: [
      "A Scan reads the whole table. A Query uses the key. Choose Query for efficient reads.",
      "A GSI cannot serve strongly consistent reads. An LSI can.",
      "An LSI must be created when the table is created, and a GSI can be added later.",
      "Large objects do not fit in an item (400 KB limit). Store them in S3.",
    ],
    architectureDiagram: `Table Orders: PK = CustomerId, SK = OrderDate
  Query(CustomerId = 42, OrderDate between June 1 and June 30)   -> one partition, cheap
GSI byStatus: PK = Status, SK = OrderDate  -> "all PENDING orders" (eventually consistent)
Hot key? write sharding: CustomerId#0..9`,
    architectureCaption: "Design keys for the questions, then add indexes for the other questions.",
    mentorTip:
      "Whenever a DynamoDB question mentions slow or costly reads, look for a Scan that should be a Query, or a missing index.",
    questionIds: [
      "q-dynamodb-data-modeling-access-patterns-1",
      "q-dynamodb-data-modeling-access-patterns-2",
      "q-dynamodb-data-modeling-access-patterns-3",
    ],
  },
];
