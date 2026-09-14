import type { Lesson } from "@/lib/types";

export const securityLessons: Lesson[] = [
  // ===================== TIER 1 =====================
  {
    id: "aws-kms",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "AWS KMS",
    shortName: "KMS",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "AWS Key Management Service (KMS) lets you create, control, and audit the encryption keys used to protect data across almost every AWS service.",
    englishExplanation:
      "AWS KMS is a managed service for creating and controlling cryptographic keys (called KMS keys, formerly \"CMKs\"). The key material lives inside FIPS-validated hardware security modules that AWS operates — for AWS-managed and customer-managed keys, the plaintext key never leaves KMS unencrypted, not even to you. You interact with the key through API calls (Encrypt, Decrypt, GenerateDataKey), and every one of those calls is logged to CloudTrail, which is exactly what auditors want to see.\n\nKMS does not usually encrypt your actual data directly — it uses envelope encryption. When S3, EBS, or RDS needs to encrypt a large object or volume, the service asks KMS to generate a data key. KMS returns two copies: a plaintext copy (used immediately to encrypt the data locally, then thrown away from memory) and an encrypted copy (which gets stored alongside the ciphertext). To decrypt later, the service sends that encrypted data key back to KMS, which unwraps it using the KMS key that never left the service. This is why KMS can \"encrypt\" terabytes of S3 objects efficiently without ever touching the bulk data itself.\n\nAccess to a KMS key is governed primarily by its key policy — a resource-based policy attached directly to the key, separate from any IAM policy on the caller. Both the key policy and the caller's IAM policy must allow the action; either one denying, or simply not granting, blocks access. This dual-gate model is one of the most exam-tested nuances in the security domain. AWS also offers three key types: AWS owned keys (you never see or manage them), AWS managed keys (created automatically for a service, e.g. aws/s3, rotated by AWS), and customer managed keys (you control the key policy, rotation, and deletion schedule — required whenever a question mentions \"full control over the encryption key\").",
    taglishExplanation:
      "Isipin mo si KMS parang yung vault ng bangko na may master key. Hindi mo kailangang gawa ng sarili mong encryption system — si KMS na ang bahala mag-ingat ng key sa loob ng hardware na secure talaga. Kapag mag-eencrypt ka ng malaking file (halimbawa sa S3), hindi diretsong ginagamit ang KMS key sa buong file — gumagawa muna ng \"data key\" na siyang gagamitin sa actual na file, tapos ang data key mismo ang ienencrypt gamit ang KMS key. Iyan yung tinatawag na envelope encryption. Para makapag-access ka ng key, dalawang gate ang kailangan mong daanan: yung key policy (nasa key mismo) at yung IAM policy mo — kailangan pareho silang pumayag, hindi lang isa.",
    analogy:
      "Think of KMS as a bank's central vault holding one enormous master key. The bank never lets that master key leave the vault. Instead, for every safe-deposit box (your data), they hand you a small box key that has itself been locked inside another lockbox — and only the vault's master key can open that lockbox. You can carry the wrapped lockbox around freely; without the vault, it is useless.",
    whyItExists:
      "Before KMS, teams had to build and operate their own key management infrastructure: dedicated HSMs, custom rotation schedules, access control logic, and audit logging — all easy to get wrong and expensive to run correctly. KMS centralizes that responsibility into a managed, auditable service that integrates natively with nearly every AWS data service, so \"encrypt this at rest\" becomes a checkbox instead of a project.",
    flow: "Application/Service -> KMS GenerateDataKey -> encrypt data locally with plaintext data key -> store encrypted data key + ciphertext together -> later, KMS Decrypt (checked against key policy + IAM policy) unwraps the data key",
    withoutIt: [
      "You would need to design, deploy, and patch your own key management and HSM infrastructure",
      "No centralized, automatic audit trail of every encrypt/decrypt operation",
      "Key rotation would be a manual, error-prone process instead of a managed setting",
      "Harder to prove compliance (PCI-DSS, HIPAA) without a clear, auditable key lifecycle",
      "Every team might invent its own encryption approach, leading to inconsistent security posture",
    ],
    bestUseCases: [
      "Encrypting data at rest for S3, EBS, RDS, Redshift, DynamoDB, and Lambda environment variables",
      "Application-level envelope encryption using the AWS Encryption SDK",
      "Meeting compliance requirements that demand customer control over key policy, rotation, and deletion",
      "Sharing encrypted resources across AWS accounts via a cross-account key policy",
      "Auditing exactly who used which key, and when, through CloudTrail",
    ],
    poorUseCases: [
      "Requirements for dedicated, single-tenant hardware isolation — that is AWS CloudHSM",
      "Storing an entire secret value (like a DB password) — KMS protects keys, not the secret itself; use Secrets Manager",
      "Workloads needing direct control of the raw key material outside any AWS-brokered service",
    ],
    alternatives: [
      { need: "Dedicated, single-tenant hardware security modules for strict compliance", choose: "AWS CloudHSM" },
      { need: "Store and auto-rotate an actual secret value (password, API key)", choose: "AWS Secrets Manager" },
      { need: "Free public TLS certificates instead of encryption keys", choose: "AWS Certificate Manager" },
    ],
    keyFeatures: [
      "Symmetric and asymmetric KMS keys",
      "Optional automatic annual rotation for customer managed keys",
      "Key policies plus temporary grants for fine-grained, delegated access",
      "Multi-Region keys for replicating the same key material across Regions",
      "Deep native integration with roughly 100 AWS services for at-rest encryption",
      "Every API call logged to CloudTrail for audit and compliance",
    ],
    availability:
      "KMS is a regional service — a KMS key's material stays within the Region it was created in unless you explicitly create a multi-Region key set. Within a Region, KMS is a fully managed, highly available service spread across multiple Availability Zones, so you never provision or patch anything yourself.",
    security:
      "Access control is the heart of KMS: every key has a key policy (a resource-based policy attached to the key itself) that is evaluated together with the caller's IAM policy — both must allow the action, or access is denied. This is different from most AWS resources, where IAM alone is often sufficient. Grants provide a way to delegate temporary, fine-grained permissions (e.g., to a service acting on your behalf) without editing the key policy. For customer managed keys, you also control the key's deletion — KMS enforces a mandatory waiting period (you choose the number of days) before a key is actually destroyed, precisely to prevent accidental, irreversible data loss. Every cryptographic operation (Encrypt, Decrypt, GenerateDataKey, etc.) is recorded in CloudTrail, giving you a complete, tamper-evident audit trail of who used which key and when — a common compliance requirement. Because the plaintext key material for AWS-managed and customer-managed keys never leaves the KMS HSM boundary unencrypted, KMS itself cannot be used to exfiltrate raw key material.",
    pricingLogic:
      "You pay a monthly fee per customer managed key, plus a small per-request charge for API calls like Encrypt, Decrypt, and GenerateDataKey. AWS managed keys (the ones AWS creates automatically for services like S3) have no monthly key fee, only request charges when used heavily. There is no charge for AWS owned keys.",
    examKeywords: [
      "envelope encryption",
      "data key",
      "key policy",
      "customer managed key",
      "automatic key rotation",
      "encryption at rest",
      "grants",
    ],
    examTraps: [
      "A KMS key does not leave its Region by default — do not assume it replicates globally unless the question mentions multi-Region keys.",
      "Both the key policy AND the caller's IAM policy must allow the action — a permissive IAM policy alone is not enough.",
      "KMS does not encrypt a huge file directly with the KMS key itself — it uses a data key (envelope encryption); watch for scenario questions testing this distinction.",
      "An AWS managed key gives you less control than a customer managed key — if the scenario needs custom rotation timing or a custom key policy, it needs a customer managed key.",
    ],
    architectureDiagram:
      "Application\n     |\n  GenerateDataKey\n     |\n   AWS KMS  --(wraps/unwraps data key using KMS key)\n     |\n plaintext data key -> encrypts object locally\n     |\n  S3 / EBS / RDS  (stores ciphertext + encrypted data key)",
    architectureCaption:
      "Envelope encryption: KMS never touches the bulk data — it only wraps and unwraps the small data key that does the real work.",
    mentorTip:
      "Whenever a scenario mentions encrypting large volumes of data efficiently, or asks how S3/EBS default encryption actually works under the hood, think \"envelope encryption\" and \"data key,\" not \"KMS key encrypts the file directly.\"",
    questionIds: ["q-aws-kms-1", "q-aws-kms-2", "q-aws-kms-3", "q-aws-kms-4", "q-aws-kms-5"],
  },

  {
    id: "aws-secrets-manager",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "AWS Secrets Manager",
    shortName: "Secrets Manager",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "AWS Secrets Manager securely stores, retrieves, and automatically rotates secrets like database credentials and API keys so you never hardcode them.",
    englishExplanation:
      "AWS Secrets Manager exists to solve one of the most common (and most dangerous) mistakes in application development: hardcoding a database password, API key, or other credential directly into source code or a config file. Once a secret is checked into version control, it is effectively compromised forever — even if you delete it later, it lives in git history. Secrets Manager gives applications a safer pattern: store the secret once, encrypted with KMS, and have the application call the Secrets Manager API at runtime to retrieve it, using an IAM role instead of a hardcoded credential to authenticate that call.\n\nThe feature that most distinguishes Secrets Manager from simply storing a string somewhere is automatic rotation. For supported services — most notably Amazon RDS, Aurora, DocumentDB, and Redshift — Secrets Manager can rotate the actual database password on a schedule you define, using a Lambda function it manages, and update the stored secret value at the same time, with zero application downtime if the app always fetches the current secret rather than caching it forever. This directly addresses the security best practice of regularly rotating credentials without turning it into an manual, error-prone chore.\n\nSecrets Manager encrypts every secret with a KMS key (AWS managed or customer managed) and controls access through IAM policies and resource policies on the secret, so you can grant one application read access to one secret without exposing every other secret in the account.",
    taglishExplanation:
      "Yung Secrets Manager, sagot ito sa pinaka-common na security mistake: pag-hardcode ng password o API key diretso sa code. Kapag na-push mo yun sa git, forever na siyang naka-record kahit i-delete mo pa. Sa halip, ise-save mo yung secret sa Secrets Manager, tapos yung application mo ang kukuha nito sa runtime gamit ang IAM role — walang naka-hardcode na password kahit saan. Bonus pa, may automatic rotation siya lalo na sa RDS/Aurora — parang may robot na nagpapalit ng password mo on schedule, at kasabay nire-refresh yung naka-store na value, kaya hindi nagbabreak yung app mo.",
    analogy:
      "Secrets Manager is like a hotel's electronic key system instead of handing out a physical master key to every employee. Each staff member's badge is checked against the system at the door (IAM role), and management can silently reprogram every lock (rotate the credential) on a schedule without ever having to collect and redistribute physical keys.",
    whyItExists:
      "Applications have always needed credentials to talk to databases and third-party APIs, and for years the default (bad) practice was hardcoding those credentials in config files or environment variables checked into source control. Secrets Manager exists to give developers an equally convenient — but actually secure — alternative, with built-in rotation so credentials do not sit unchanged for years.",
    flow: "Application -> assumes IAM role -> calls Secrets Manager GetSecretValue -> Secrets Manager decrypts secret via KMS -> returns credential at runtime (never stored in code)",
    withoutIt: [
      "Developers are tempted to hardcode credentials directly into source code or config files",
      "Rotating a database password becomes a risky, manual, multi-step process",
      "No centralized place to control or audit who can read which credential",
      "Leaked credentials in git history become a permanent liability",
      "Harder to meet compliance requirements around credential rotation",
    ],
    bestUseCases: [
      "Storing RDS/Aurora database credentials with automatic rotation enabled",
      "Storing third-party API keys and tokens used by an application",
      "Centralizing secrets across multiple applications with fine-grained IAM access per secret",
      "Retrieving credentials at runtime via SDK/IAM role instead of environment files",
      "Meeting audit requirements for periodic credential rotation without manual work",
    ],
    poorUseCases: [
      "Simple, non-sensitive application configuration values (use Parameter Store, which is cheaper for that)",
      "Storing the encryption key itself rather than a secret value (that is KMS's job)",
      "One-off values that never need rotation and have no security sensitivity",
    ],
    alternatives: [
      { need: "Store plain configuration values or cheaper low-sensitivity parameters", choose: "AWS Systems Manager Parameter Store" },
      { need: "Manage the encryption key protecting the secret, not the secret itself", choose: "AWS KMS" },
      { need: "Free TLS certificates rather than application secrets", choose: "AWS Certificate Manager" },
    ],
    keyFeatures: [
      "Automatic rotation on a schedule, with native Lambda rotation templates for RDS/Aurora/DocumentDB/Redshift",
      "Encryption at rest via AWS KMS",
      "Fine-grained IAM and resource-based access policies per secret",
      "Versioning of secret values so an in-progress rotation does not break current callers",
      "Cross-region replication of secrets for multi-region applications",
      "Native SDK integration so applications fetch secrets at runtime instead of hardcoding them",
    ],
    availability:
      "Secrets Manager is a regional, managed, highly available service; you can replicate secrets to other Regions for multi-region applications or disaster recovery scenarios without maintaining your own replication logic.",
    security:
      "Never store secrets in code, environment files checked into source control, or AMIs — that is precisely the anti-pattern Secrets Manager replaces. Every secret is encrypted at rest with a KMS key, and access is controlled through IAM policies (who can call GetSecretValue) plus optional resource policies on the secret for cross-account access. Automatic rotation reduces the blast radius of a leaked credential, since old values stop working on a schedule instead of remaining valid indefinitely. Applications should authenticate to Secrets Manager using an IAM role (e.g., an EC2 instance profile or Lambda execution role) rather than long-lived IAM user access keys, so there is no separate credential needed just to fetch the credential. CloudTrail logs every access to a secret, which is important for detecting anomalous or unauthorized retrieval.",
    pricingLogic:
      "You pay per secret stored per month, plus a small charge per 10,000 API calls (such as GetSecretValue). This is more expensive than Parameter Store, which is why low-sensitivity configuration values are usually kept in Parameter Store instead.",
    examKeywords: [
      "automatic rotation",
      "never hardcode credentials",
      "database credentials",
      "IAM role at runtime",
      "GetSecretValue",
      "KMS encryption",
    ],
    examTraps: [
      "If a question says \"database credentials must rotate automatically,\" Secrets Manager is almost always the intended answer over Parameter Store.",
      "Parameter Store SecureString can encrypt values too, but it does not natively rotate RDS credentials the way Secrets Manager does — cost and rotation are the deciding factors between the two.",
      "Hardcoding credentials in an AMI, container image, or environment variable file is always the wrong answer when Secrets Manager is an option.",
    ],
    architectureDiagram:
      "EC2 / Lambda (IAM Role)\n        |\n  GetSecretValue\n        |\nAWS Secrets Manager --(encrypted with)--> KMS\n        |\n  rotation Lambda (scheduled)\n        |\n   Amazon RDS / Aurora (password updated)",
    architectureCaption:
      "Secrets Manager brokers credential access at runtime and can rotate the underlying RDS password on a schedule using a managed Lambda function.",
    mentorTip:
      "\"Never store secrets in code\" is basically a direct exam quote — any answer choice that hardcodes a password or key is wrong the moment Secrets Manager (or even Parameter Store) is available as an alternative.",
    questionIds: [
      "q-aws-secrets-manager-1",
      "q-aws-secrets-manager-2",
      "q-aws-secrets-manager-3",
      "q-aws-secrets-manager-4",
      "q-aws-secrets-manager-5",
    ],
  },

  {
    id: "aws-waf",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "AWS WAF",
    shortName: "WAF",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "AWS WAF is a web application firewall that filters HTTP/HTTPS traffic at Layer 7, protecting against attacks like SQL injection and cross-site scripting.",
    englishExplanation:
      "AWS WAF operates at Layer 7 (the application layer), which means it inspects the actual content of HTTP and HTTPS requests — URIs, headers, query strings, and body — rather than just IP addresses and ports the way a network firewall or security group would. This lets WAF recognize and block common web application attack patterns: SQL injection attempts hidden in a query string, cross-site scripting (XSS) payloads in a form field, or a request carrying a known-bad signature.\n\nYou configure WAF using Web ACLs (Access Control Lists) made up of rules. Rules can be simple (block requests from a specific country or IP range), pattern-based (block requests matching AWS Managed Rules for SQLi/XSS), or rate-based (automatically block an IP that exceeds a request-rate threshold in a rolling window — a very common defense against basic HTTP flood attacks and credential-stuffing bots). AWS also publishes Managed Rule Groups maintained by AWS and by AWS Marketplace security vendors, so you do not have to write every SQLi/XSS signature yourself.\n\nWAF attaches directly to the edge or entry point of your application: Amazon CloudFront distributions, Application Load Balancers, Amazon API Gateway REST APIs, and AWS AppSync. It does not run on EC2 instances itself — it sits in front of these services and evaluates every request before it reaches your application, which is why it is described as protecting the application layer rather than the network layer.",
    taglishExplanation:
      "Si WAF, parang security guard sa harap ng application mo na binabasa yung laman ng bawat request — hindi lang kung saan galing (IP), kundi kung ano talaga ang laman ng URL, header, o form data. Kaya kayang niyang mahuli ang SQL injection o XSS na nakatago sa loob ng request. Gumagamit ka ng \"Web ACL\" na may mga rules — puwedeng i-block ang traffic mula sa isang bansa, i-block ang mga kilalang attack pattern (gamit ang AWS Managed Rules), o mag-set ng rate-based rule na mag-a-automatic block sa IP na sobrang dami ng requests sa maikling panahon. Nakakabit siya sa CloudFront, ALB, o API Gateway — hindi siya tumatakbo sa loob ng EC2 mo.",
    analogy:
      "If a security group is like a bouncer checking ID at the door (who you are and where you came from), WAF is like a bouncer who also reads every note you're carrying before letting you in — looking for anything that reads like a forged instruction (SQL injection) or a hidden trick (XSS), not just your ID.",
    whyItExists:
      "Network-layer controls like security groups and NACLs cannot see inside an HTTP request's content — they only see IP addresses, ports, and protocols. But most real-world web attacks (SQLi, XSS, bad bots, credential stuffing) are carried inside otherwise \"allowed\" HTTP traffic on port 443. WAF exists to close that visibility gap by inspecting requests at the application layer, right at the edge, before they ever reach your servers.",
    flow: "Client request -> CloudFront / ALB / API Gateway -> AWS WAF evaluates Web ACL rules -> allow, block, or count -> forwarded to origin only if allowed",
    withoutIt: [
      "SQL injection and XSS payloads could reach your application layer unfiltered",
      "You would need to build and maintain custom application-level filtering logic yourself",
      "No easy way to rate-limit abusive clients before they reach your backend",
      "Geo-blocking traffic from specific countries would require custom application logic",
      "Harder to respond quickly to a newly discovered attack pattern across your whole fleet",
    ],
    bestUseCases: [
      "Protecting a public web application or API behind CloudFront, ALB, or API Gateway from common exploits",
      "Blocking traffic from specific countries or known malicious IP ranges",
      "Rate-limiting clients to blunt basic HTTP flood or credential-stuffing attempts",
      "Quickly virtually-patching a known application vulnerability while a real code fix is developed",
      "Centrally applying the same rule set across many applications via AWS Firewall Manager",
    ],
    poorUseCases: [
      "Filtering traffic at the network/transport layer (IP, port, protocol) — that is a security group, NACL, or Network Firewall's job",
      "Volumetric, network-layer DDoS mitigation — that is primarily AWS Shield's role (WAF complements it at L7)",
      "Protecting non-HTTP protocols entirely outside its supported integrations",
    ],
    alternatives: [
      { need: "Network- and transport-layer (L3/L4) DDoS protection", choose: "AWS Shield" },
      { need: "Stateful network-layer filtering for an entire VPC", choose: "AWS Network Firewall" },
      { need: "Centralized WAF/firewall policy across many accounts", choose: "AWS Firewall Manager" },
    ],
    keyFeatures: [
      "Web ACLs made of custom rules, rate-based rules, and AWS/Marketplace managed rule groups",
      "Attaches to CloudFront, Application Load Balancer, API Gateway, and AppSync",
      "SQL injection and cross-site scripting managed protections out of the box",
      "Geo-match rules to allow or block traffic by country",
      "Rate-based rules to auto-block IPs exceeding a request threshold",
      "Full request logging for forensic analysis and tuning of rules",
    ],
    availability:
      "WAF is deployed at the edge/entry point you attach it to; when paired with CloudFront it inherits CloudFront's global edge presence, and when paired with a regional ALB or API Gateway it operates within that Region.",
    security:
      "WAF is itself a security control, but it must be configured correctly to matter: rules only protect what they are written to catch, and an empty or misconfigured Web ACL provides no protection. AWS Managed Rule groups (updated by AWS as new threats emerge) are the recommended baseline for SQLi/XSS rather than trying to write every signature yourself. Rate-based rules are a key defense against application-layer floods and brute-force/credential-stuffing attempts. WAF logs (sent to Kinesis Data Firehose, S3, or CloudWatch Logs) feed directly into detection tools like GuardDuty and Security Hub, so WAF is often one input into a broader detection-and-response pipeline rather than a standalone silver bullet.",
    pricingLogic:
      "You pay a monthly fee per Web ACL, a monthly fee per rule, and a charge per million requests inspected. There is no cost based on whether traffic is allowed or blocked — only on the volume evaluated.",
    examKeywords: [
      "Layer 7",
      "SQL injection",
      "cross-site scripting (XSS)",
      "Web ACL",
      "rate-based rule",
      "CloudFront / ALB / API Gateway",
    ],
    examTraps: [
      "WAF is Layer 7 (application) — do not confuse it with Shield or Network Firewall, which operate more at the network/transport layer.",
      "WAF does not run \"on\" an EC2 instance; it attaches to CloudFront, ALB, API Gateway, or AppSync in front of your resources.",
      "A security group cannot block a SQL injection payload — if a scenario mentions inspecting request content for attack patterns, that is WAF, not a security group or NACL.",
    ],
    architectureDiagram:
      "Internet\n   |\nAWS WAF (Web ACL: managed rules, rate-based rules, geo rules)\n   |\nCloudFront / ALB / API Gateway\n   |\nApplication (EC2 / Lambda / containers)",
    architectureCaption:
      "WAF evaluates every request against its Web ACL before it ever reaches the origin.",
    mentorTip:
      "Keyword-spot for \"SQL injection,\" \"cross-site scripting,\" or \"filter malicious web requests\" — that combination almost always means AWS WAF, not a security group, NACL, or Shield.",
    questionIds: ["q-aws-waf-1", "q-aws-waf-2", "q-aws-waf-3", "q-aws-waf-4", "q-aws-waf-5"],
  },

  {
    id: "aws-shield",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "AWS Shield",
    shortName: "Shield",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "AWS Shield protects AWS resources against Distributed Denial of Service (DDoS) attacks, with a free Standard tier for everyone and a paid Advanced tier for deeper protection.",
    englishExplanation:
      "AWS Shield Standard is automatically active on every AWS account at no extra cost. It defends against the most common, frequently occurring network and transport layer (Layer 3/4) DDoS attacks — things like SYN floods and UDP reflection attacks — for resources like Elastic Load Balancers, CloudFront distributions, and Route 53. You do not configure anything to get this baseline protection; it is always on.\n\nAWS Shield Advanced is a paid, opt-in service that adds substantially more capability. It provides enhanced detection and mitigation for larger and more sophisticated attacks, near real-time visibility into attacks in progress through CloudWatch metrics, and — critically for the exam — access to the AWS DDoS Response Team (DRT), a group of AWS experts you can engage during an active attack for help crafting mitigations (such as WAF rules). Shield Advanced also includes cost protection, reimbursing scaling charges incurred as a direct result of a DDoS attack on protected resources, which is otherwise a real financial risk during a large-scale attack.\n\nShield works alongside, not instead of, WAF: Shield focuses on network/transport-layer volumetric attacks, while WAF focuses on filtering malicious application-layer (Layer 7) requests. A well-protected internet-facing architecture typically uses both together, often centrally managed via AWS Firewall Manager across multiple accounts.",
    taglishExplanation:
      "Si Shield Standard, laging naka-on 'yan sa lahat ng AWS account, libre, at automatic — proteksyon laban sa mga common na DDoS attack sa network layer, tulad ng SYN flood. Si Shield Advanced naman, bayad ito at kailangan mo i-enable — mas malalim na proteksyon, may real-time visibility sa attack, at pwede kang humingi ng tulong sa AWS DDoS Response Team (DRT) habang on-going ang attack. May cost protection pa siya — kapag lumaki ang bill mo dahil sa auto-scaling na dulot ng DDoS attack, puwede kang mag-claim ng reimbursement. Tandaan: Shield ay para sa network/transport layer (L3/L4) DDoS, samantalang WAF ay para sa application layer (L7) filtering — magkasama sila ginagamit.",
    analogy:
      "Shield Standard is like the basic flood barriers every building in a city already has by code — free, automatic, and good enough for ordinary storms. Shield Advanced is like paying for a dedicated emergency response team on standby, real-time monitoring sensors, and insurance that reimburses you for damage if a genuinely severe storm hits.",
    whyItExists:
      "Publicly reachable AWS resources (load balancers, CloudFront distributions, Route 53 hosted zones) are constantly exposed to background DDoS noise from across the internet. Shield exists so customers don't have to build their own DDoS mitigation infrastructure — AWS absorbs and mitigates common attacks automatically, and offers a paid tier for organizations that need guaranteed expert support and financial protection during larger, targeted attacks.",
    flow: "Attack traffic -> AWS edge network -> Shield Standard (always-on mitigation) -> [if Shield Advanced] enhanced detection + DRT engagement + WAF rule assistance -> legitimate traffic reaches ELB/CloudFront/Route 53",
    withoutIt: [
      "Every customer would need to build and pay for their own DDoS mitigation infrastructure",
      "No baseline protection against common volumetric attacks on ELB, CloudFront, or Route 53",
      "No expert team to call during a large, active, sophisticated attack",
      "No protection against surprise scaling costs incurred because of an attack",
    ],
    bestUseCases: [
      "Every public-facing AWS workload benefits from Shield Standard automatically, at no action required",
      "Shield Advanced for business-critical, internet-facing applications with high DDoS risk (finance, gaming, media)",
      "Organizations that need guaranteed access to AWS's DDoS Response Team during an incident",
      "Workloads where unexpected auto-scaling costs from a DDoS attack would be a real financial concern",
    ],
    poorUseCases: [
      "Relying on Shield alone to filter application-layer attacks like SQL injection — that is WAF's job",
      "Assuming Shield Standard alone is sufficient for a business with strict, guaranteed DDoS SLAs — that requires Shield Advanced",
    ],
    alternatives: [
      { need: "Filter malicious application-layer (Layer 7) HTTP requests", choose: "AWS WAF" },
      { need: "Stateful, VPC-level network traffic filtering", choose: "AWS Network Firewall" },
      { need: "Centralized DDoS/WAF policy management across many accounts", choose: "AWS Firewall Manager" },
    ],
    keyFeatures: [
      "Shield Standard: automatic, free, always-on protection against common L3/L4 DDoS attacks",
      "Shield Advanced: enhanced detection for larger/more sophisticated attacks",
      "Access to the AWS DDoS Response Team (DRT) with Shield Advanced",
      "Cost protection against scaling charges caused by a DDoS attack (Shield Advanced)",
      "Near real-time attack visibility via CloudWatch metrics (Shield Advanced)",
      "Integrates with WAF and Firewall Manager for a layered defense",
    ],
    availability:
      "Shield Standard is globally applied automatically wherever it is relevant (CloudFront, Route 53, ELB). Shield Advanced is a subscription applied to specific protected resources you designate, and is available where those resources run.",
    security:
      "Shield's role is availability protection — keeping resources reachable under attack — which is itself a security property (protecting against denial-of-service). It does not replace WAF, GuardDuty, or IAM controls; it complements them by handling the network/transport-layer volumetric side of the threat landscape, while WAF handles content-based application-layer threats. Combining Shield Advanced with WAF rate-based rules and Firewall Manager gives centralized, layered protection across an organization's accounts.",
    pricingLogic:
      "Shield Standard costs nothing and requires no configuration. Shield Advanced has a significant monthly subscription commitment (typically organization-wide, with a required term) plus usage-based data transfer fees on protected resources — it is priced as an enterprise-grade protection service, not a casual add-on. Do not memorize an exact figure — the exam tests the conceptual difference, not the price.",
    examKeywords: [
      "DDoS",
      "Shield Standard (free, automatic)",
      "Shield Advanced (paid)",
      "DDoS Response Team (DRT)",
      "cost protection",
      "Layer 3/4",
    ],
    examTraps: [
      "Do not confuse Shield (network/transport-layer DDoS) with WAF (application-layer content filtering) — a scenario about SQL injection needs WAF, not Shield.",
      "Shield Standard is always on for everyone — a question implying you must \"enable basic DDoS protection\" is really just describing what already exists by default.",
      "The DDoS Response Team and cost protection are Shield Advanced features, not Shield Standard.",
    ],
    architectureDiagram:
      "Internet (DDoS traffic + legitimate traffic)\n        |\n  AWS Shield (Standard: always on)\n        |\n  [Shield Advanced: DRT + cost protection + enhanced detection]\n        |\nRoute 53 / CloudFront / ELB\n        |\n  Application",
    architectureCaption:
      "Shield sits at the edge, absorbing and mitigating DDoS traffic before it can exhaust your application's capacity.",
    mentorTip:
      "If the question mentions volumetric flood attacks, SYN floods, or \"protect against DDoS,\" think Shield. If it mentions SQL injection or filtering request content, think WAF. If it mentions guaranteed expert help and cost reimbursement during an attack, that is specifically Shield Advanced.",
    questionIds: ["q-aws-shield-1", "q-aws-shield-2", "q-aws-shield-3", "q-aws-shield-4", "q-aws-shield-5"],
  },

  {
    id: "amazon-cognito",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "Amazon Cognito",
    shortName: "Cognito",
    tier: 1,
    domains: [1, 2],
    examImportance: "critical",
    oneLiner:
      "Amazon Cognito provides authentication, authorization, and user management specifically for your web and mobile application's end users — not for AWS console/API access.",
    englishExplanation:
      "Amazon Cognito exists to solve authentication for the customers of your application (a shopping app's shoppers, a mobile game's players) — a completely different problem from IAM, which manages who can access AWS resources and the AWS Management Console. This distinction is one of the most important and most tested ideas in the entire security domain: Cognito is not the same as IAM workforce/admin access. IAM users and roles are for people and systems operating your AWS account; Cognito is for the end users of the application you built on AWS.\n\nCognito has two main building blocks that are frequently confused. A User Pool is a user directory: it handles sign-up, sign-in, password policies, MFA, and can federate with social identity providers (Google, Facebook, Apple) or enterprise SAML/OIDC providers. After a successful sign-in, a User Pool issues JSON Web Tokens (JWTs) that your application (or API Gateway, or an ALB) can validate. An Identity Pool (Federated Identities) goes a step further: it exchanges a verified identity — from a User Pool, a social login, or even an anonymous guest — for temporary AWS credentials via STS, so the app user can directly and securely call AWS services like S3 or DynamoDB with scoped-down permissions, without any AWS credentials ever being embedded in the mobile app.\n\nA common real exam pattern is: \"a mobile app needs to let users sign up and sign in, and then upload a photo directly to an S3 bucket using their own scoped permissions.\" That is a User Pool for authentication feeding into an Identity Pool for temporary, scoped AWS credentials — never IAM users created per end user, and never long-lived access keys hardcoded into the app.",
    taglishExplanation:
      "Si Cognito, para ito sa mga end user ng application mo — yung mga customer o mobile app users mo — hindi para sa mga tao na nag-a-access ng AWS console o API (iyon ang trabaho ng IAM). Malaking difference ito na madalas pinagkakamalian: Cognito ay hindi kapareho ng IAM workforce access. May dalawang bahagi si Cognito: User Pool, na parang directory ng users mo (sign-up, sign-in, MFA, pwede pang mag-login gamit ang Google/Facebook), at Identity Pool, na siyang nagbibigay ng temporary AWS credentials (via STS) para makagamit nang diretso ang app user ng mga AWS service tulad ng S3, nang hindi kailangang mag-hardcode ng AWS keys sa mobile app.",
    analogy:
      "Think of a User Pool as the membership desk of a gym that verifies who you are and issues you a membership card (a token). An Identity Pool is like handing that verified member a temporary, scoped keycard that opens exactly the lockers (AWS resources) they are allowed to use — a completely different card from the master keys the gym's own staff (IAM users/roles) carry.",
    whyItExists:
      "Before Cognito, developers building consumer-facing apps had to write their own user sign-up/sign-in systems, manage password storage and hashing securely, build social login integrations from scratch, and figure out how to let a mobile app safely call AWS services without embedding permanent AWS credentials in the app binary (a serious, common vulnerability). Cognito exists to provide this entire layer as a managed service.",
    flow: "App user -> Cognito User Pool sign-up/sign-in -> JWT token issued -> exchanged with Cognito Identity Pool -> temporary AWS credentials via STS -> scoped access to S3/DynamoDB/API Gateway",
    withoutIt: [
      "Developers must build and secure their own user directory, password storage, and MFA from scratch",
      "Mobile apps might embed long-lived AWS credentials directly in the app, a serious security risk",
      "No easy, managed way to federate sign-in with Google/Facebook/enterprise identity providers",
      "Harder to give app users temporary, least-privilege access to specific AWS resources",
      "No standard token-based mechanism for API Gateway or ALB to authenticate app users",
    ],
    bestUseCases: [
      "Sign-up/sign-in for a mobile or web application's own end users",
      "Federating consumer sign-in with Google, Facebook, Apple, or SAML/OIDC enterprise identity providers",
      "Issuing temporary, scoped AWS credentials to a mobile app so it can call S3/DynamoDB directly and securely",
      "Authenticating requests to Amazon API Gateway or an Application Load Balancer using a Cognito authorizer",
      "Adding MFA and password policies to a consumer-facing application without building it yourself",
    ],
    poorUseCases: [
      "Managing access for your own AWS administrators, developers, or operations staff — use IAM (and IAM Identity Center) instead",
      "Granting console access to employees — that is not what Cognito is for",
      "Machine-to-machine AWS API access between your own backend services — use IAM roles",
    ],
    alternatives: [
      { need: "Manage human access to the AWS console/API for your own workforce", choose: "IAM users/roles or IAM Identity Center" },
      { need: "Single sign-on across multiple AWS accounts for employees", choose: "AWS IAM Identity Center" },
      { need: "Machine-to-machine credentials between your own AWS resources", choose: "IAM roles (no Cognito needed)" },
    ],
    keyFeatures: [
      "User Pools: managed user directory with sign-up, sign-in, MFA, and password policies",
      "Identity Pools: exchange a verified identity for temporary AWS credentials via STS",
      "Social identity federation (Google, Facebook, Apple) and enterprise SAML/OIDC federation",
      "JWT-based tokens usable by API Gateway and Application Load Balancer authorizers",
      "Customizable sign-up/sign-in UI (Hosted UI) to speed up implementation",
      "Fine-grained, scoped IAM roles per authenticated or guest identity via Identity Pools",
    ],
    availability:
      "Cognito is a regional, fully managed service; User Pools and Identity Pools are created per Region and scale automatically to handle large numbers of application users without capacity planning on your part.",
    security:
      "Cognito's core security value is keeping AWS credentials out of client applications entirely — an app never embeds a long-lived access key; instead it exchanges a short-lived, verified identity for temporary STS credentials scoped by an IAM role tied to the Identity Pool. User Pools support MFA and strong password policies, and tokens are short-lived JWTs that can be validated by API Gateway or an ALB without a round trip to Cognito for every request. It is critical not to conflate Cognito user pool identities with IAM principals for workforce access — Cognito users should never be granted direct IAM console access, and IAM users should not be created per end customer (that does not scale and is not what IAM is designed for).",
    pricingLogic:
      "Cognito has a free tier of monthly active users (MAUs) in User Pools, then charges per MAU beyond that threshold; advanced security features (like compromised credential detection) and SAML/OIDC federation may add cost. Identity Pool credential vending itself has no separate significant charge beyond the underlying STS/AWS service usage.",
    examKeywords: [
      "end users of your application",
      "User Pool vs Identity Pool",
      "temporary AWS credentials",
      "social identity federation",
      "not IAM workforce access",
      "JWT",
    ],
    examTraps: [
      "Cognito is for application end users, not for your own AWS administrators — a question about employee console access should point to IAM Identity Center, not Cognito.",
      "A User Pool authenticates users and issues tokens; it does NOT by itself grant AWS resource access — that requires an Identity Pool to vend temporary credentials.",
      "Never assume a mobile app should embed IAM access keys — the correct pattern is always Cognito Identity Pool -> temporary STS credentials.",
    ],
    architectureDiagram:
      "Mobile/Web App\n     |\nCognito User Pool (sign-up/sign-in, MFA) --> JWT token\n     |\nCognito Identity Pool (exchanges token)\n     |\n  AWS STS (temporary credentials)\n     |\n  Amazon S3 / DynamoDB (scoped access)",
    architectureCaption:
      "User Pool handles who the user is; Identity Pool turns that identity into scoped, temporary AWS access — two distinct steps.",
    mentorTip:
      "If a question mentions \"mobile app users signing in\" plus \"access AWS resources directly and securely,\" the answer chain is User Pool then Identity Pool then STS — and any option that mentions creating IAM users for app customers or embedding access keys in the app is a trap.",
    questionIds: [
      "q-amazon-cognito-1",
      "q-amazon-cognito-2",
      "q-amazon-cognito-3",
      "q-amazon-cognito-4",
      "q-amazon-cognito-5",
    ],
  },

  // ===================== TIER 2 =====================
  {
    id: "aws-certificate-manager",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "AWS Certificate Manager",
    shortName: "ACM",
    tier: 2,
    domains: [1],
    examImportance: "high",
    oneLiner:
      "AWS Certificate Manager (ACM) provisions and manages free public TLS/SSL certificates for supported AWS services, with automatic renewal.",
    englishExplanation:
      "ACM lets you request a public TLS certificate for your domain at no cost, then attach it to services like CloudFront, an Application/Network Load Balancer, or API Gateway to enable HTTPS. Instead of buying a certificate from a third-party certificate authority, manually installing it, and remembering to renew it before it expires (a classic source of embarrassing production outages), ACM handles domain validation and automatically renews the certificate before it expires, as long as the certificate stays attached to a supported, in-use resource and domain validation stays intact.\n\nThe key limitation to remember is that ACM certificates cannot be exported or installed directly on an EC2 instance's own web server — they only work when attached to the specific AWS services that integrate with ACM (CloudFront, ELB types, API Gateway, and a few others). If you need a certificate installed directly inside an EC2 instance's OS-level web server (e.g., Apache/Nginx config), you need a certificate from a traditional CA (or AWS Private CA for private/internal certificates), not a public ACM certificate.",
    taglishExplanation:
      "Si ACM, libreng TLS/SSL certificate para sa domain mo, na kayang i-attach mo sa CloudFront, ALB/NLB, o API Gateway para magkaroon ng HTTPS. Ang ganda pa, automatic ang renewal — hindi mo na kailangang alalahanin na mag-expire ang certificate mo (common cause ng downtime 'yan). Pero tandaan: hindi mo pwedeng i-download at i-install ang ACM certificate diretso sa loob ng EC2 instance mo — gumagana lang siya kapag naka-attach sa mga supported AWS service.",
    analogy:
      "ACM is like a free, auto-renewing ID badge system tied to specific building entrances (CloudFront, ALB, API Gateway) — the badge renews itself automatically as long as you keep using it at one of those doors, but you can't take the badge home and use it on your own private door (an EC2 instance's own web server).",
    whyItExists:
      "Manually purchasing, installing, and renewing TLS certificates is tedious and a frequent cause of outages when someone forgets a renewal date. ACM exists to remove that operational burden entirely for services that terminate TLS at the AWS edge or load balancer layer.",
    flow: "Request certificate in ACM -> validate domain ownership (DNS or email) -> attach certificate to CloudFront/ALB/API Gateway -> ACM auto-renews before expiry",
    withoutIt: [
      "You would need to buy certificates from a third-party CA and track renewal dates manually",
      "A missed renewal could cause an unexpected HTTPS outage",
      "More manual work to rotate certificates across many load balancers or distributions",
    ],
    bestUseCases: [
      "Enabling HTTPS on a CloudFront distribution or Application/Network Load Balancer for free",
      "Securing a custom domain on API Gateway",
      "Any workload wanting automatic certificate renewal without manual operations",
    ],
    poorUseCases: [
      "Installing a certificate directly on an EC2 instance's own web server (Apache/Nginx) — ACM public certs are not exportable for that",
      "Fully private, internal-only PKI hierarchies — that is a fit for AWS Private CA instead",
    ],
    alternatives: [
      { need: "Install a certificate directly on an EC2 instance's OS-level web server", choose: "A third-party CA certificate (or AWS Private CA for internal PKI)" },
      { need: "Fully private certificate authority for internal services", choose: "AWS Private Certificate Authority" },
    ],
    keyFeatures: [
      "Free public TLS/SSL certificates for supported AWS services",
      "Automatic domain validation and automatic renewal",
      "Integrates with CloudFront, ELB (ALB/NLB/CLB), and API Gateway",
      "Supports wildcard and multi-domain (SAN) certificates",
    ],
    availability:
      "ACM certificates are regional except for CloudFront, which requires the certificate to be requested in the us-east-1 Region regardless of where the distribution's origin lives — a frequently tested detail.",
    security:
      "ACM certificates enable HTTPS/TLS in transit, protecting data from eavesdropping and tampering between clients and your AWS edge/load balancer. Automatic renewal removes the human error risk of an expired certificate silently disabling HTTPS or causing a security warning to users. Private keys for ACM-managed certificates are managed by AWS and are not exportable, which is a security benefit (no key sprawl) but the reason they cannot be installed outside supported AWS integrations.",
    pricingLogic:
      "Public certificates issued by ACM for use with integrated AWS services are free; you pay nothing for issuance or renewal. AWS Private CA (a related but separate service) does have its own cost if you need private certificates.",
    examKeywords: [
      "free TLS certificate",
      "automatic renewal",
      "CloudFront requires us-east-1",
      "cannot export private key",
      "HTTPS on ALB/CloudFront",
    ],
    examTraps: [
      "For CloudFront, the ACM certificate must be requested in us-east-1 no matter which Region the rest of the application runs in.",
      "You cannot export an ACM public certificate to install it on an EC2 instance's own web server.",
      "ACM does not provision certificates for arbitrary on-premises servers — it is scoped to specific AWS integrations.",
    ],
    architectureDiagram:
      "ACM (certificate + auto-renewal)\n     |\n  attached to\n     |\nCloudFront (us-east-1 cert) / ALB / API Gateway\n     |\n  HTTPS to clients",
    architectureCaption:
      "ACM issues and renews the certificate; the AWS edge/load balancer service terminates TLS using it.",
    mentorTip:
      "If a question says a certificate is needed for CloudFront, immediately check whether it says the cert was requested in us-east-1 — that regional requirement is a classic distractor.",
    questionIds: ["q-aws-certificate-manager-1", "q-aws-certificate-manager-2", "q-aws-certificate-manager-3"],
  },

  {
    id: "amazon-guardduty",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "Amazon GuardDuty",
    shortName: "GuardDuty",
    tier: 2,
    domains: [1],
    examImportance: "high",
    oneLiner:
      "Amazon GuardDuty is an intelligent, continuous threat detection service that analyzes AWS telemetry to find malicious or unauthorized activity — with no agents to install.",
    englishExplanation:
      "GuardDuty continuously analyzes data sources you already generate — VPC Flow Logs, DNS query logs, and CloudTrail management and S3 data events — using machine learning, anomaly detection, and threat intelligence feeds (including known malicious IP lists) to identify suspicious behavior. Examples include an EC2 instance suddenly communicating with a known cryptocurrency-mining pool, unusual API calls consistent with compromised credentials, or reconnaissance-like behavior from an unfamiliar location.\n\nBecause GuardDuty works entirely from log and network metadata that AWS services already produce, there is nothing to install or manage on your EC2 instances — no agents, no sensors. You simply enable it, and within minutes it starts analyzing existing account activity and producing findings, each with a severity rating, that you can act on directly, route to EventBridge for automated response, or aggregate into AWS Security Hub alongside findings from other tools.",
    taglishExplanation:
      "Si GuardDuty, parang CCTV analyst na 24/7 nanonood ng mga logs mo (VPC Flow Logs, DNS logs, CloudTrail) at gumagamit ng machine learning para mahuli ang kakaibang behavior — halimbawa, bigla na lang nag-communicate ang EC2 instance mo sa known na malicious na server, o may mga API call na parang galing sa nakawan na credentials. Ang maganda dito, walang kailangang i-install na agent — gumagana lang siya sa mga log na meron ka na, at pagka-enable mo, agad na siyang mag-a-analyze.",
    analogy:
      "GuardDuty is like a security analyst who does not need to walk the building and inspect every room (no agents on your servers) — instead, they watch the building's existing security camera feeds, door logs, and network traffic recordings, and flag anything unusual.",
    whyItExists:
      "Manually reviewing VPC Flow Logs, DNS logs, and CloudTrail events for signs of compromise is impractical at scale — there is too much data, and threat patterns evolve constantly. GuardDuty exists to automate that analysis using AWS's own threat intelligence and machine learning, without requiring you to deploy or maintain any monitoring agents.",
    flow: "VPC Flow Logs / DNS logs / CloudTrail events -> GuardDuty analysis (ML + threat intel) -> findings generated -> EventBridge automated response and/or Security Hub aggregation",
    withoutIt: [
      "You would need to manually analyze massive volumes of flow logs and CloudTrail events for threats",
      "Slower detection of compromised credentials or malware-infected instances",
      "No built-in machine-learning-based anomaly detection across accounts",
    ],
    bestUseCases: [
      "Continuous, account-wide threat detection without deploying any agents",
      "Detecting compromised EC2 instances or IAM credentials automatically",
      "Feeding automated remediation workflows via EventBridge when a finding appears",
    ],
    poorUseCases: [
      "Scanning for software vulnerabilities inside EC2/container images — that is Amazon Inspector's job",
      "Discovering sensitive data inside S3 buckets — that is Amazon Macie's job",
    ],
    alternatives: [
      { need: "Find software vulnerabilities in EC2/ECR/Lambda", choose: "Amazon Inspector" },
      { need: "Discover and classify sensitive data (PII) in S3", choose: "Amazon Macie" },
      { need: "Centralize findings from GuardDuty, Inspector, Macie, etc.", choose: "AWS Security Hub" },
    ],
    keyFeatures: [
      "No agents required — analyzes VPC Flow Logs, DNS logs, and CloudTrail",
      "Machine learning and integrated threat intelligence feeds",
      "Findings with severity levels, viewable in-console or via EventBridge/Security Hub",
      "Can detect threats across multiple accounts when centrally managed",
    ],
    availability:
      "GuardDuty is a regional service enabled per Region, and supports delegated administration across an AWS Organization so a security team can view findings from all member accounts centrally.",
    security:
      "GuardDuty is a detective control — it does not block anything by itself, it detects and alerts. Its findings are most valuable when wired into an automated response (e.g., an EventBridge rule that triggers a Lambda function to isolate a compromised instance) or aggregated in Security Hub for a unified security view. It is a foundational, low-effort service to enable in almost every AWS account given it requires no agent installation.",
    pricingLogic:
      "GuardDuty pricing is based on the volume of the logs and events it analyzes (VPC Flow Logs, DNS logs, CloudTrail events), not a flat per-instance fee, and it offers a free trial period when first enabled.",
    examKeywords: [
      "no agents required",
      "VPC Flow Logs / DNS logs / CloudTrail",
      "threat detection",
      "machine learning",
      "findings",
    ],
    examTraps: [
      "GuardDuty detects threats; it does not scan for vulnerabilities (that's Inspector) or classify sensitive data (that's Macie) — these three are commonly confused.",
      "GuardDuty requires no agents — if an option says you must install an agent on EC2 for it to work, that option is wrong.",
    ],
    architectureDiagram:
      "VPC Flow Logs + DNS Logs + CloudTrail\n         |\n   Amazon GuardDuty (ML + threat intel)\n         |\n     Findings\n     /       \\\nEventBridge   Security Hub\n(auto response)  (aggregation)",
    architectureCaption:
      "GuardDuty turns existing logs into actionable, severity-rated findings without any agent deployment.",
    mentorTip:
      "\"No agents required\" plus \"analyzes CloudTrail/VPC Flow Logs/DNS logs\" is the GuardDuty fingerprint — memorize that phrase to instantly separate it from Inspector and Macie.",
    questionIds: ["q-amazon-guardduty-1", "q-amazon-guardduty-2", "q-amazon-guardduty-3"],
  },

  {
    id: "amazon-inspector",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "Amazon Inspector",
    shortName: "Inspector",
    tier: 2,
    domains: [1],
    examImportance: "high",
    oneLiner:
      "Amazon Inspector automatically and continuously scans EC2 instances, container images in ECR, and Lambda functions for software vulnerabilities and unintended network exposure.",
    englishExplanation:
      "Amazon Inspector performs automated vulnerability assessment: it scans EC2 instances (via the SSM agent) for known Common Vulnerabilities and Exposures (CVEs) in installed software packages and for network reachability issues (such as a port unexpectedly reachable from the internet), scans container images pushed to Amazon ECR for CVEs, and scans Lambda function code and its dependencies for known vulnerabilities. Rather than running a one-time scan, Inspector continuously monitors, so newly discovered vulnerabilities are flagged automatically even if the underlying resource hasn't changed — because Inspector re-evaluates whenever its vulnerability intelligence database updates.\n\nFindings come with a risk score to help you prioritize remediation, and integrate with Security Hub and EventBridge just like GuardDuty findings do.",
    taglishExplanation:
      "Si Inspector, automatic na sina-scan niya ang EC2 instances, container images sa ECR, at Lambda functions para maghanap ng known vulnerabilities (CVEs) sa mga naka-install na software, o kung may port na hindi dapat bukas sa internet. Hindi lang siya isang beses mag-scan — tuloy-tuloy siyang nagmo-monitor, kaya kahit hindi mo ginalaw ang server mo, kapag may bagong natuklasang vulnerability, ma-flag agad ito.",
    analogy:
      "Inspector is like a building inspector who doesn't just check your building once when it opens — they keep coming back automatically every time new safety codes are published, checking whether your specific fixtures (installed software versions) are now known to be unsafe.",
    whyItExists:
      "New software vulnerabilities are disclosed constantly, and manually tracking which of your EC2 instances, containers, or Lambda functions run vulnerable package versions does not scale. Inspector automates that continuous vulnerability assessment so teams find out about exposure quickly instead of after an incident.",
    flow: "EC2 (via SSM agent) / ECR image push / Lambda deployment -> Amazon Inspector continuous scan -> vulnerability findings with risk score -> Security Hub / EventBridge",
    withoutIt: [
      "Vulnerabilities in installed packages or container images could go unnoticed for a long time",
      "No automated re-scanning when new CVEs are published against existing resources",
      "Manual vulnerability management does not scale across a large fleet",
    ],
    bestUseCases: [
      "Continuous vulnerability scanning of EC2 fleets, ECR container images, and Lambda functions",
      "Prioritizing patching work using Inspector's risk scoring",
      "Feeding vulnerability findings into a centralized Security Hub view",
    ],
    poorUseCases: [
      "Detecting active threats or anomalous behavior in real time — that is GuardDuty's job",
      "Discovering sensitive data inside storage — that is Amazon Macie's job",
    ],
    alternatives: [
      { need: "Detect active malicious behavior/anomalies", choose: "Amazon GuardDuty" },
      { need: "Discover sensitive data in S3", choose: "Amazon Macie" },
    ],
    keyFeatures: [
      "Continuous, automated vulnerability scanning (not one-time)",
      "Covers EC2, Amazon ECR container images, and AWS Lambda functions",
      "Risk scores to prioritize remediation",
      "Network reachability analysis for EC2 (e.g., unintended internet exposure)",
    ],
    availability:
      "Inspector is a regional service that can be enabled account-wide and, like GuardDuty, supports centralized management across an AWS Organization for a consolidated vulnerability view.",
    security:
      "Inspector is a preventive/detective control focused on reducing the attack surface before an attacker exploits it — by finding known vulnerabilities and unintended exposure early. It requires the SSM agent running on EC2 instances to perform host-level scanning, which is a small but real prerequisite to remember.",
    pricingLogic:
      "Inspector pricing is usage-based, generally per instance scanned per month, per image scanned, and per Lambda function scanned, rather than a flat account fee.",
    examKeywords: [
      "vulnerability assessment",
      "CVE scanning",
      "EC2 / ECR / Lambda",
      "continuous scanning",
      "network reachability",
    ],
    examTraps: [
      "Inspector finds vulnerabilities; it does not detect active attacks in progress — that distinction versus GuardDuty is heavily tested.",
      "Inspector needs the SSM agent on EC2 instances to scan them at the host level.",
    ],
    architectureDiagram:
      "EC2 (SSM agent) -----\\\nECR images -------------> Amazon Inspector -> Findings (risk score) -> Security Hub\nLambda functions ------/",
    architectureCaption:
      "Inspector continuously re-scans EC2, ECR, and Lambda as new vulnerabilities are discovered.",
    mentorTip:
      "Pair the trio in your head: GuardDuty = detects active threats, Inspector = finds vulnerabilities before they're exploited, Macie = finds sensitive data. Nail that split and most confusion-based questions fall apart.",
    questionIds: ["q-amazon-inspector-1", "q-amazon-inspector-2", "q-amazon-inspector-3"],
  },

  {
    id: "amazon-macie",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "Amazon Macie",
    shortName: "Macie",
    tier: 2,
    domains: [1],
    examImportance: "high",
    oneLiner:
      "Amazon Macie uses machine learning to automatically discover, classify, and alert on sensitive data — especially personally identifiable information (PII) — stored in Amazon S3.",
    englishExplanation:
      "Macie is purpose-built to answer a very specific and increasingly regulated question: \"do we have sensitive data sitting in S3 buckets we don't realize, and is it properly protected?\" It uses machine learning and pattern matching to scan S3 objects and identify PII (names, addresses, financial account numbers, credentials, etc.) as well as other sensitive data types, and it also evaluates bucket-level security posture (such as public accessibility or lack of encryption) as part of its findings.\n\nMacie's output is a set of findings that flag both the presence of sensitive data and risky bucket configurations, which is especially relevant for compliance frameworks (GDPR, HIPAA, PCI-DSS) that require organizations to know exactly where regulated data lives and demonstrate it is properly access-controlled and encrypted.",
    taglishExplanation:
      "Si Macie, gumagamit ng machine learning para hanapin at i-classify ang sensitive data — lalo na PII (personal information) tulad ng pangalan, address, o credit card number — na naka-store sa S3. Tinitingnan din niya kung secure ba ang configuration ng bucket, halimbawa kung public ba ito o hindi naka-encrypt. Sobrang useful ito para sa compliance requirements tulad ng GDPR o HIPAA, kung saan kailangan mong malaman kung saan talaga naka-store ang sensitive data mo.",
    analogy:
      "Macie is like hiring someone to go through every filing cabinet in a warehouse (S3 buckets) and flag which folders contain sensitive documents like passports or bank statements — and also note which cabinets were left unlocked.",
    whyItExists:
      "As organizations accumulate huge volumes of data in S3, it becomes easy to lose track of exactly which buckets or objects contain regulated, sensitive data — creating compliance and breach risk. Macie automates the discovery and classification work that would otherwise require manually auditing every object.",
    flow: "S3 buckets -> Macie scans objects (ML + pattern matching) -> identifies PII/sensitive data + risky bucket configuration -> findings sent to console / Security Hub / EventBridge",
    withoutIt: [
      "Sensitive data could sit undiscovered in S3 buckets, unprotected and unaccounted for",
      "Manual data classification across large S3 estates does not scale",
      "Harder to prove compliance with data protection regulations",
    ],
    bestUseCases: [
      "Discovering where PII or other sensitive data lives across many S3 buckets",
      "Supporting compliance audits (GDPR, HIPAA, PCI-DSS) that require data location visibility",
      "Identifying S3 buckets that are both sensitive and misconfigured (e.g., public)",
    ],
    poorUseCases: [
      "Scanning EC2/Lambda/container images for software vulnerabilities — that is Inspector's job",
      "Detecting active malicious network behavior — that is GuardDuty's job",
    ],
    alternatives: [
      { need: "Find vulnerabilities in compute resources", choose: "Amazon Inspector" },
      { need: "Detect active threats/anomalies", choose: "Amazon GuardDuty" },
    ],
    keyFeatures: [
      "Machine-learning-based PII and sensitive data discovery, scoped to Amazon S3",
      "Evaluates bucket security posture (public access, encryption) alongside data sensitivity",
      "Findings integrate with Security Hub and EventBridge",
      "Helps demonstrate compliance with data protection regulations",
    ],
    availability:
      "Macie is a regional service and, like GuardDuty and Inspector, supports organization-wide delegated administration so a central security team can see findings across all member accounts.",
    security:
      "Macie is a detective control focused specifically on data sensitivity and S3 exposure risk — it complements GuardDuty (threats) and Inspector (vulnerabilities) by covering the \"do we know what sensitive data we have and is it exposed\" gap, which is a distinct and often compliance-driven concern.",
    pricingLogic:
      "Macie pricing is usage-based, driven mainly by the volume of S3 data evaluated (bucket inventory) and the amount of data actually processed/scanned for sensitive content.",
    examKeywords: [
      "PII discovery",
      "sensitive data classification",
      "machine learning",
      "Amazon S3",
      "compliance (GDPR/HIPAA)",
    ],
    examTraps: [
      "Macie is scoped to S3 and sensitive data discovery — it is not a general vulnerability scanner (Inspector) or threat detector (GuardDuty).",
      "A question about \"finding out where our customers' PII is stored\" points specifically to Macie, not GuardDuty or Inspector.",
    ],
    architectureDiagram:
      "Amazon S3 buckets\n      |\n  Amazon Macie (ML scan for PII + bucket posture)\n      |\n   Findings -> Security Hub / EventBridge",
    architectureCaption:
      "Macie's scope is narrow but specific: sensitive data discovery and exposure risk inside S3.",
    mentorTip:
      "See the letters \"PII\" or \"sensitive data\" plus \"S3\" in a question and Macie should come to mind almost instantly — it is the most narrowly scoped of the GuardDuty/Inspector/Macie trio.",
    questionIds: ["q-amazon-macie-1", "q-amazon-macie-2", "q-amazon-macie-3"],
  },

  {
    id: "aws-security-hub",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "AWS Security Hub",
    shortName: "Security Hub",
    tier: 2,
    domains: [1],
    examImportance: "high",
    oneLiner:
      "AWS Security Hub centrally aggregates, normalizes, and prioritizes security findings from GuardDuty, Inspector, Macie, and other tools, and checks your accounts against compliance standards.",
    englishExplanation:
      "Security Hub solves the \"too many dashboards\" problem: instead of separately checking GuardDuty for threats, Inspector for vulnerabilities, Macie for sensitive data, and various partner security tools, Security Hub ingests all of their findings into one normalized format (AWS Security Finding Format) and presents them in a single, prioritized view. It also runs its own automated checks against compliance standards and best-practice frameworks (such as the AWS Foundational Security Best Practices standard, and CIS benchmarks), continuously evaluating your account's configuration against those controls.\n\nSecurity Hub itself does not generate the deep threat/vulnerability/data-classification analysis — that is still done by GuardDuty, Inspector, and Macie respectively. Security Hub's job is aggregation, normalization, prioritization, and compliance scoring, plus the ability to route everything into a single EventBridge pipeline for automated response, and to support cross-account, cross-region visibility for a security team managing an entire AWS Organization.",
    taglishExplanation:
      "Si Security Hub, parang central dashboard na nagtitipon ng lahat ng findings mula sa GuardDuty, Inspector, Macie, at iba pang security tools, tapos pinagsama at pinag-prioritize niya para hindi ka na kailangang mag-check ng maraming magkakahiwalay na dashboard. May sarili pa siyang automated checks laban sa compliance standards tulad ng CIS benchmarks. Ang Security Hub mismo hindi siya gumagawa ng deep analysis — trabaho pa rin 'yan ng GuardDuty/Inspector/Macie — ang Security Hub ang nagtitipon at nagbibigay ng iisang view.",
    analogy:
      "Security Hub is like a hospital's central monitoring station that pulls readings from every specialist machine (heart monitor, blood pressure cuff, oxygen sensor) into one screen, prioritized by urgency — it does not replace the individual sensors, it just gives the doctor one place to look.",
    whyItExists:
      "As organizations enable more specialized security tools, each producing its own findings in its own format and console, security teams need a single pane of glass to avoid missing critical issues buried across multiple dashboards. Security Hub exists to normalize and centralize that information, plus provide ongoing, automated compliance posture checks.",
    flow: "GuardDuty + Inspector + Macie + partner tools -> findings normalized into AWS Security Finding Format -> AWS Security Hub (aggregation + compliance checks) -> single dashboard + EventBridge for automated response",
    withoutIt: [
      "Security teams must check multiple separate consoles/dashboards for findings",
      "No single, normalized view of security posture across accounts",
      "Manual, ad hoc compliance checks against frameworks like CIS benchmarks",
    ],
    bestUseCases: [
      "Centralizing findings from GuardDuty, Inspector, Macie, and third-party tools into one view",
      "Continuously checking accounts against compliance standards (CIS, AWS Foundational Security Best Practices)",
      "Feeding a single, unified EventBridge pipeline for automated security response across the organization",
    ],
    poorUseCases: [
      "Expecting Security Hub itself to perform deep threat detection, vulnerability scanning, or data classification — those remain the job of the underlying tools",
    ],
    alternatives: [
      { need: "Deep threat detection", choose: "Amazon GuardDuty (feeds into Security Hub)" },
      { need: "Root-cause investigation of a specific finding", choose: "Amazon Detective" },
    ],
    keyFeatures: [
      "Aggregates and normalizes findings from GuardDuty, Inspector, Macie, and partner products",
      "Automated compliance checks against standards like CIS and AWS Foundational Security Best Practices",
      "Cross-account, cross-region visibility for AWS Organizations",
      "Single EventBridge integration point for automated remediation across all sources",
    ],
    availability:
      "Security Hub operates per Region and supports a delegated administrator account to aggregate findings across an entire AWS Organization into one central view.",
    security:
      "Security Hub's value is operational: it reduces the chance that a critical finding gets missed because it was buried in a tool-specific console, and it gives continuous, automated visibility into compliance drift. It is typically the top of the detection stack — GuardDuty/Inspector/Macie/partner tools generate findings, and Security Hub is where a security team actually works from day to day.",
    pricingLogic:
      "Security Hub charges based on the number of security checks performed and the number of findings ingested per month, not a flat subscription — cost scales with the size of the environment and how many checks/findings it processes.",
    examKeywords: [
      "centralized aggregation",
      "single pane of glass",
      "compliance standards / CIS benchmarks",
      "AWS Security Finding Format",
    ],
    examTraps: [
      "Security Hub aggregates and prioritizes findings — it is not itself the detection engine for threats (GuardDuty), vulnerabilities (Inspector), or sensitive data (Macie).",
      "If a scenario asks for a single dashboard across many security tools and accounts, Security Hub is the answer, not a specific point tool.",
    ],
    architectureDiagram:
      "GuardDuty | Inspector | Macie | Partner tools\n        \\      |      /\n          AWS Security Hub\n     (normalize + prioritize + compliance checks)\n              |\n     Single dashboard + EventBridge",
    architectureCaption:
      "Security Hub does not replace GuardDuty/Inspector/Macie — it centralizes what they already produce.",
    mentorTip:
      "Whenever a question says \"single dashboard\" or \"consolidate findings from multiple security services,\" that phrase is Security Hub's signature — do not pick a point-detection tool instead.",
    questionIds: ["q-aws-security-hub-1", "q-aws-security-hub-2", "q-aws-security-hub-3"],
  },

  {
    id: "aws-network-firewall-and-firewall-manager",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "AWS Network Firewall & Firewall Manager",
    shortName: "Network Firewall / FW Manager",
    tier: 2,
    domains: [1],
    examImportance: "high",
    oneLiner:
      "AWS Network Firewall provides stateful, VPC-level network traffic filtering, while AWS Firewall Manager centrally manages firewall/WAF/Shield policies across many AWS accounts.",
    englishExplanation:
      "AWS Network Firewall is a managed, stateful network firewall you deploy inside a VPC to filter traffic at the network and transport layer (with some application-layer awareness, such as domain name filtering) — beyond what security groups and NACLs can do. It supports custom rules, intrusion detection/prevention style rule groups (based on the open-source Suricata rule format), and is typically used to inspect traffic flowing between VPCs, to the internet, or to on-premises networks, especially in centralized inspection VPC architectures.\n\nAWS Firewall Manager is a different but complementary service: it is a management layer for centrally deploying and enforcing security policies — including WAF rules, Shield Advanced protections, Network Firewall policies, and security group rules — consistently across every account and resource in an AWS Organization. Instead of a security team configuring WAF or Network Firewall separately in every account, Firewall Manager pushes one policy everywhere, including automatically to new accounts and resources as they're created, which is essential at organizational scale.",
    taglishExplanation:
      "Si Network Firewall, isang stateful firewall na nilalagay mo sa loob ng VPC para mag-filter ng traffic sa network/transport layer, mas malalim pa kaysa security group o NACL — may kasama pa siyang rules tulad ng domain filtering at intrusion detection style rules. Si Firewall Manager naman, ibang klase — ito yung central management layer na nagpapatupad ng iisang security policy (WAF, Shield Advanced, Network Firewall, security groups) sa lahat ng account sa loob ng iyong AWS Organization, kahit pa bagong account ang gagawin — automatic na naaaplay ang policy.",
    analogy:
      "Network Firewall is like a checkpoint gate placed at key roads inside a large campus, inspecting every vehicle's cargo. Firewall Manager is like the campus security office that writes one policy for all checkpoints across every building on every campus the company owns, so no building is ever left with an outdated or missing rule.",
    whyItExists:
      "Security groups and NACLs are limited to basic IP/port/protocol filtering per resource or subnet, with no deep packet inspection, no domain-based filtering, and no IDS/IPS-style rules. Network Firewall exists to add that deeper, centralized network-layer inspection capability inside a VPC. Separately, as organizations grow to dozens or hundreds of accounts, manually keeping WAF/Shield/Network Firewall/security group configuration consistent everywhere becomes unmanageable — Firewall Manager exists to enforce one policy everywhere automatically.",
    flow: "VPC traffic -> AWS Network Firewall (stateful rules, IDS/IPS-style, domain filtering) -> allowed/denied\n\nAcross accounts: Firewall Manager -> pushes WAF/Shield/Network Firewall/security group policy -> every account/resource in the AWS Organization, including new ones",
    withoutIt: [
      "Only basic IP/port/protocol filtering available via security groups and NACLs, with no deep packet inspection",
      "No centralized way to guarantee every account in an Organization has the same firewall/WAF baseline",
      "New accounts could be created without the required security policies applied",
    ],
    bestUseCases: [
      "Centralized traffic inspection between VPCs, to the internet, or to on-premises in a hub-and-spoke architecture",
      "Domain-based filtering or IDS/IPS-style rules at the VPC network layer",
      "Enforcing one consistent WAF/Shield/Network Firewall/security-group policy across an entire AWS Organization automatically, including future accounts",
    ],
    poorUseCases: [
      "Simple, single-VPC use cases where security groups and NACLs are already sufficient — Network Firewall adds cost/complexity not always needed",
      "Application-layer HTTP content filtering only — that is WAF's specialty, though Firewall Manager can deploy WAF too",
    ],
    alternatives: [
      { need: "Application-layer (L7) HTTP filtering only", choose: "AWS WAF" },
      { need: "Basic per-instance/subnet IP and port filtering", choose: "Security Groups and Network ACLs" },
    ],
    keyFeatures: [
      "Network Firewall: stateful rules, Suricata-compatible IDS/IPS rule groups, domain-name filtering",
      "Firewall Manager: centrally deploys WAF, Shield Advanced, Network Firewall, and security group policies org-wide",
      "Firewall Manager automatically applies policy to new accounts/resources as they appear",
      "Both integrate with AWS Organizations for centralized security governance",
    ],
    availability:
      "AWS Network Firewall is deployed per VPC/AZ using firewall endpoints for high availability within a Region. Firewall Manager operates across the entire AWS Organization, spanning all member accounts and Regions where policies are defined.",
    security:
      "Network Firewall adds a deeper layer of network-level defense than security groups/NACLs alone, useful for centralized traffic inspection points (e.g., an inspection VPC in a hub-and-spoke topology). Firewall Manager's security value is consistency and governance at scale — the biggest real-world security failures often come from one forgotten account or resource missing a control, and Firewall Manager's automatic policy application to new resources directly closes that gap.",
    pricingLogic:
      "AWS Network Firewall charges for each firewall endpoint deployed per hour plus data processed. AWS Firewall Manager itself has a per-policy monthly charge, on top of the cost of the underlying services (WAF, Shield Advanced, Network Firewall) it deploys and manages.",
    examKeywords: [
      "stateful VPC firewall",
      "centralized inspection VPC",
      "Firewall Manager: organization-wide policy",
      "applies automatically to new accounts",
    ],
    examTraps: [
      "Do not confuse Network Firewall (a VPC-level network firewall you deploy) with Firewall Manager (a cross-account policy management/enforcement service) — they solve different problems and are often both correct-sounding distractors for each other.",
      "Firewall Manager does not do the filtering itself; it deploys and enforces policies made of WAF, Shield Advanced, Network Firewall, or security groups.",
    ],
    architectureDiagram:
      "Spoke VPC A --\\\nSpoke VPC B ---> Transit Gateway -> Inspection VPC (AWS Network Firewall) -> Internet/On-prem\nSpoke VPC C --/\n\nAWS Organization\n   |\nFirewall Manager -> pushes WAF/Shield/NetworkFirewall/SG policy -> Account 1, Account 2, Account N (incl. new accounts)",
    architectureCaption:
      "Network Firewall inspects traffic inside the network path; Firewall Manager ensures every account enforces the same security policy.",
    mentorTip:
      "Say the two names out loud with their jobs attached: \"Network Firewall filters traffic, Firewall Manager manages policy across accounts.\" If a question mentions \"new accounts automatically protected,\" that is Firewall Manager, not Network Firewall.",
    questionIds: [
      "q-aws-network-firewall-and-firewall-manager-1",
      "q-aws-network-firewall-and-firewall-manager-2",
      "q-aws-network-firewall-and-firewall-manager-3",
    ],
  },

  // ===================== TIER 3 =====================
  {
    id: "amazon-detective",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "Amazon Detective",
    shortName: "Detective",
    tier: 3,
    domains: [1],
    examImportance: "medium",
    oneLiner:
      "Amazon Detective helps you investigate the root cause of a security finding by automatically visualizing relationships between resources, users, and events.",
    englishExplanation:
      "Once GuardDuty (or another tool) raises a finding — say, an EC2 instance appears compromised — Detective is the next step: it automatically collects and organizes log data from CloudTrail, VPC Flow Logs, and GuardDuty into a graph model, letting a security analyst visually explore connections (which IAM principal called what API, which instance talked to which IP, over what time range) to understand the full scope and root cause of an incident far faster than manually cross-referencing raw logs.",
    taglishExplanation:
      "Kapag may finding na si GuardDuty (halimbawa, may kompromisong EC2 instance), si Detective ang gagamitin mo para mag-investigate — automatic niyang inoorganize ang data mula sa CloudTrail, VPC Flow Logs, at GuardDuty into visual graphs, para makita mo agad kung sino ang gumawa ng ano, kailan, at saan konektado — mas mabilis kaysa manual na pag-cross-check ng raw logs.",
    analogy:
      "If GuardDuty is the smoke alarm going off, Detective is the fire investigator who arrives afterward with a diagram connecting every room, door, and person's movements to figure out exactly how the fire started and spread.",
    whyItExists:
      "A finding tells you something is wrong, but not always the full story — investigating manually across CloudTrail, VPC Flow Logs, and GuardDuty data is slow and error-prone. Detective exists to automate that correlation and present it visually, cutting investigation time significantly.",
    flow: "GuardDuty finding -> Amazon Detective ingests CloudTrail/VPC Flow Logs/GuardDuty data -> builds behavior graph -> analyst investigates root cause visually",
    withoutIt: [
      "Security analysts must manually correlate CloudTrail, VPC Flow Logs, and GuardDuty findings",
      "Root-cause investigation after a security incident takes much longer",
    ],
    bestUseCases: [
      "Investigating the root cause and scope of a GuardDuty finding",
      "Visualizing relationships between IAM principals, resources, and network activity during incident response",
    ],
    poorUseCases: [
      "Generating the original detection/finding — that's GuardDuty's (or Inspector's/Macie's) job, Detective works after a finding exists",
      "Ongoing compliance checks — that is Security Hub's role",
    ],
    alternatives: [
      { need: "Generate the initial threat finding", choose: "Amazon GuardDuty" },
      { need: "Centralized findings dashboard and compliance checks", choose: "AWS Security Hub" },
    ],
    keyFeatures: [
      "Automatic, visual behavior graphs built from CloudTrail, VPC Flow Logs, and GuardDuty data",
      "Speeds up root-cause and scope analysis for security incidents",
    ],
    availability:
      "Detective is a regional service that can be enabled to automatically ingest data from member accounts across an AWS Organization for centralized investigation.",
    security:
      "Detective is purely an investigative/forensic tool used after a finding exists — it does not block or prevent anything itself, but it materially shortens incident response time, which limits the damage and cost of a real security incident.",
    pricingLogic:
      "Detective pricing is usage-based on the volume of data ingested for analysis (CloudTrail, VPC Flow Logs, GuardDuty findings) per account, with a free trial period when first enabled.",
    examKeywords: ["root cause investigation", "behavior graph", "after a GuardDuty finding"],
    examTraps: [
      "Detective does not generate findings on its own — it investigates findings that GuardDuty (or similar) already raised.",
    ],
    architectureDiagram:
      "GuardDuty finding\n     |\nAmazon Detective (graph: CloudTrail + VPC Flow Logs + findings)\n     |\nAnalyst investigates root cause",
    architectureCaption: "Detective turns raw logs tied to a finding into an explorable relationship graph.",
    mentorTip:
      "If the scenario says \"after receiving a GuardDuty finding, the security team needs to investigate the root cause,\" that is almost verbatim Detective's use case.",
    questionIds: ["q-amazon-detective-1", "q-amazon-detective-2"],
  },

  {
    id: "aws-cloudhsm",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "AWS CloudHSM",
    shortName: "CloudHSM",
    tier: 3,
    domains: [1],
    examImportance: "medium",
    oneLiner:
      "AWS CloudHSM provides dedicated, single-tenant hardware security modules for customers with strict compliance requirements that KMS's shared, managed model cannot satisfy.",
    englishExplanation:
      "CloudHSM gives you a dedicated hardware security module in the cloud that only you have access to — unlike KMS, where the underlying HSMs are shared, managed infrastructure operated by AWS. With CloudHSM, you manage the HSM cluster, including administering it and generating/managing keys yourself using industry-standard APIs (PKCS#11, JCE, CNG), which is required by some compliance regimes that mandate single-tenant, customer-controlled cryptographic hardware.",
    taglishExplanation:
      "Kung si KMS ay parang shared na vault na pinapatakbo ng AWS, si CloudHSM naman ay parang sarili mong pribadong vault na ikaw mismo ang may hawak at nagmamanage — dedicated hardware na ikaw lang ang may access, kailangan ng ibang compliance requirement na strict talaga sa single-tenant hardware.",
    analogy:
      "If KMS is renting a safe-deposit box inside a shared bank vault, CloudHSM is renting your own private vault room that no one else's boxes ever touch, and you keep the only key.",
    whyItExists:
      "Some regulatory or compliance frameworks require cryptographic keys to be generated and stored in hardware that is not shared with any other tenant. KMS's shared, AWS-managed HSM fleet cannot satisfy that specific single-tenant requirement, so CloudHSM exists to provide dedicated hardware while still living inside AWS's infrastructure.",
    flow: "Application -> PKCS#11/JCE/CNG client -> CloudHSM cluster (dedicated HSM instances you manage) -> cryptographic operations",
    withoutIt: [
      "Customers needing dedicated, single-tenant HSMs would have to run their own physical HSM hardware on-premises",
    ],
    bestUseCases: [
      "Strict compliance mandates requiring dedicated, single-tenant hardware for key storage",
      "Workloads needing direct control over the HSM using standard cryptographic APIs (PKCS#11, JCE, CNG)",
    ],
    poorUseCases: [
      "General-purpose encryption of S3/EBS/RDS where KMS's managed model is sufficient and far simpler",
      "Teams that do not want to manage HSM administration themselves",
    ],
    alternatives: [
      { need: "Managed, shared-tenant encryption key service with less operational overhead", choose: "AWS KMS" },
    ],
    keyFeatures: [
      "Dedicated, single-tenant HSM instances inside a cluster you control",
      "Supports standard cryptographic APIs: PKCS#11, JCE, Microsoft CNG",
      "You are responsible for HSM administration and key management, not AWS",
    ],
    availability:
      "CloudHSM clusters can span multiple Availability Zones within a Region for high availability, since you are responsible for the resiliency of your own cluster.",
    security:
      "CloudHSM's entire value proposition is security through isolation: dedicated, single-tenant hardware that AWS cannot access, satisfying strict compliance mandates that KMS's shared model cannot meet. The tradeoff is that you take on more operational responsibility for managing the HSM cluster and its keys yourself.",
    pricingLogic:
      "CloudHSM charges per HSM instance per hour, which makes it considerably more expensive than KMS — appropriate when compliance requires it, not as a default choice.",
    examKeywords: ["dedicated single-tenant HSM", "strict compliance", "PKCS#11", "you manage the HSM"],
    examTraps: [
      "Do not pick CloudHSM by default for \"we need encryption\" — it is specifically for dedicated/single-tenant hardware compliance requirements; KMS is the default, simpler choice otherwise.",
    ],
    architectureDiagram: "Application\n   |\nPKCS#11 / JCE / CNG\n   |\nCloudHSM Cluster (dedicated HSMs, multi-AZ)",
    architectureCaption: "You administer the HSM cluster yourself; AWS only manages the underlying infrastructure it runs on.",
    mentorTip:
      "\"Dedicated hardware,\" \"single-tenant,\" or \"we manage our own HSM\" in a question is the CloudHSM signal — otherwise, KMS is almost always the right, simpler answer.",
    questionIds: ["q-aws-cloudhsm-1", "q-aws-cloudhsm-2"],
  },

  {
    id: "aws-directory-service",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "AWS Directory Service",
    shortName: "Directory Service",
    tier: 3,
    domains: [1],
    examImportance: "medium",
    oneLiner:
      "AWS Directory Service provides managed Microsoft Active Directory options in AWS, including AD Connector for proxying to an existing on-premises directory.",
    englishExplanation:
      "AWS Directory Service offers a few flavors for hybrid identity needs: AWS Managed Microsoft AD runs an actual, managed Active Directory domain in AWS (useful when applications need real AD/LDAP/Kerberos features); AD Connector is a lightweight proxy that redirects authentication requests to an existing on-premises Active Directory without duplicating user data into AWS at all; and Simple AD provides a basic, standalone directory for simpler needs without full AD compatibility. The right choice depends on whether you need a full, AWS-hosted AD domain or just a bridge to an existing on-premises directory.",
    taglishExplanation:
      "Si Directory Service, para ito sa mga hybrid identity scenario — halimbawa may existing Active Directory ka na sa on-premises, at gusto mong gamitin iyon sa AWS. Ang AD Connector ay parang proxy lang — dinidiretso niya ang authentication request pabalik sa on-prem AD mo, walang duplicate na data sa AWS. Ang Managed Microsoft AD naman, tunay na AD domain na talaga, pero pinapatakbo at pinapanatili ng AWS.",
    analogy:
      "AD Connector is like a receptionist at a satellite office who calls the headquarters directory every time someone needs verification, instead of keeping a local copy of the employee database. AWS Managed Microsoft AD is like opening a full branch office with its own complete directory.",
    whyItExists:
      "Many enterprises already run Active Directory on-premises and don't want to rebuild or duplicate that identity infrastructure in AWS. Directory Service exists to bridge or replicate that AD environment into AWS depending on the need, supporting hybrid identity scenarios cleanly.",
    flow: "On-premises Active Directory -> AD Connector (proxy, no data copied) -> AWS resources authenticate against existing on-prem AD\n\nor: AWS Managed Microsoft AD -> full AD domain hosted and managed in AWS",
    withoutIt: [
      "Hybrid identity integration between on-premises AD and AWS would require custom-built federation solutions",
    ],
    bestUseCases: [
      "Bridging AWS authentication to an existing on-premises Active Directory without duplicating data (AD Connector)",
      "Running a full, managed AD domain natively in AWS for applications needing real AD/LDAP/Kerberos (Managed Microsoft AD)",
    ],
    poorUseCases: [
      "Simple application-level end-user authentication for a web/mobile app — that is Cognito's job, not Directory Service",
    ],
    alternatives: [
      { need: "Authenticate web/mobile application end users, not enterprise directory identities", choose: "Amazon Cognito" },
      { need: "Single sign-on for AWS accounts using an existing identity source", choose: "AWS IAM Identity Center" },
    ],
    keyFeatures: [
      "AWS Managed Microsoft AD: a real, managed AD domain running in AWS",
      "AD Connector: a proxy to an existing on-premises AD with no data replication",
      "Simple AD: a lightweight, standalone directory for basic needs",
    ],
    availability:
      "Directory Service deployments span multiple Availability Zones within a Region for resiliency; AD Connector's actual authentication still depends on connectivity back to the on-premises directory.",
    security:
      "Directory Service enables centralized, consistent identity management across hybrid environments instead of maintaining separate, potentially inconsistent credentials in AWS versus on-premises. AD Connector's \"no data copied to AWS\" property is itself a security/compliance advantage for organizations that must keep directory data on-premises.",
    pricingLogic:
      "Pricing varies by the option chosen (Managed Microsoft AD, AD Connector, Simple AD) and is generally based on directory size/edition and hours running, rather than a single flat fee.",
    examKeywords: ["hybrid identity", "AD Connector (proxy, no data copied)", "Managed Microsoft AD"],
    examTraps: [
      "AD Connector does not copy or store on-premises user data in AWS — it is purely a redirect/proxy.",
      "Do not confuse Directory Service (enterprise/AD identity) with Cognito (application end-user identity) — they solve different problems.",
    ],
    architectureDiagram: "On-Prem AD <---VPN/Direct Connect---> AD Connector -> AWS resources authenticate",
    architectureCaption: "AD Connector proxies authentication back to the existing on-premises directory without duplicating data.",
    mentorTip:
      "\"Existing on-premises Active Directory\" plus \"do not want to duplicate user data\" is the AD Connector fingerprint.",
    questionIds: ["q-aws-directory-service-1", "q-aws-directory-service-2"],
  },

  {
    id: "aws-resource-access-manager",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "AWS Resource Access Manager (RAM)",
    shortName: "RAM",
    tier: 3,
    domains: [1],
    examImportance: "medium",
    oneLiner:
      "AWS Resource Access Manager (RAM) lets you securely share specific AWS resources — like subnets or Transit Gateways — across accounts without duplicating them.",
    englishExplanation:
      "RAM allows one AWS account (or an AWS Organization) to share resources it owns — such as a VPC subnet, a Transit Gateway, a License Manager configuration, or a Route 53 Resolver rule — directly with other AWS accounts, so those accounts can use the resource as if it were their own, without AWS copying or recreating it. This avoids resource duplication and the operational overhead of managing multiple copies of the same infrastructure across accounts, which is especially valuable in multi-account architectures built around AWS Organizations.",
    taglishExplanation:
      "Si RAM, nagpapahintulot sa isang account na i-share ang sarili niyang resources — halimbawa isang subnet o Transit Gateway — sa ibang AWS accounts, nang hindi kailangang gumawa ng duplicate. Kapag maraming accounts ka sa loob ng isang Organization, malaking tulong ito para hindi paulit-ulit gagawa ng parehong infrastructure sa bawat account.",
    analogy:
      "RAM is like a landlord letting several different tenants (accounts) share one common parking garage (a subnet or Transit Gateway) that the landlord owns, instead of building a separate garage for every tenant.",
    whyItExists:
      "In multi-account AWS environments, teams often need to share centralized infrastructure like networking components across many accounts. Before RAM, achieving this required workarounds like duplicating resources or complex cross-account VPC peering. RAM exists to make secure, native cross-account sharing straightforward.",
    flow: "Resource owner account -> creates a Resource Share in RAM -> specifies resource + target accounts/OU -> consumer accounts use the shared resource directly",
    withoutIt: [
      "Teams would need to duplicate infrastructure like subnets or Transit Gateways in every account",
      "More complex, harder-to-manage cross-account networking workarounds",
    ],
    bestUseCases: [
      "Sharing a centralized Transit Gateway or VPC subnet across many accounts in an AWS Organization",
      "Sharing License Manager configurations or Route 53 Resolver rules across accounts",
    ],
    poorUseCases: [
      "Sharing data objects like S3 files — RAM shares infrastructure/service resources, not arbitrary data",
    ],
    alternatives: [
      { need: "Share data objects, not infrastructure resources", choose: "S3 bucket policies / cross-account IAM" },
    ],
    keyFeatures: [
      "Native cross-account sharing of supported resource types without duplication",
      "Integrates with AWS Organizations to share with specific accounts or entire OUs",
      "Centralized management of who can use a shared resource",
    ],
    availability:
      "RAM shares are defined per Region for regional resources, and rely on the availability of the underlying shared resource itself.",
    security:
      "RAM lets the resource owner retain control of the resource while granting scoped access to specific accounts, which is safer and more auditable than looser workarounds. Access to the shared resource is still governed by IAM permissions in the consuming account, layered on top of the RAM share itself.",
    pricingLogic:
      "RAM itself does not add a separate charge for sharing; you pay only for the usage of the underlying shared resource as normal.",
    examKeywords: ["share resources across accounts", "no duplication", "Transit Gateway / subnet sharing"],
    examTraps: [
      "RAM shares specific supported resource types (like subnets, Transit Gateways) — it is not a general mechanism for sharing any AWS resource or data object.",
    ],
    architectureDiagram: "Account A (owns Transit Gateway)\n   |\nRAM Resource Share\n   |\nAccount B, Account C (use the same Transit Gateway directly)",
    architectureCaption: "RAM shares the actual resource — no copies are created in the consuming accounts.",
    mentorTip:
      "\"Share a Transit Gateway/subnet across multiple accounts without duplicating it\" is RAM's textbook exam scenario.",
    questionIds: ["q-aws-resource-access-manager-1", "q-aws-resource-access-manager-2"],
  },

  {
    id: "aws-artifact",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "AWS Artifact",
    shortName: "Artifact",
    tier: 3,
    domains: [1],
    examImportance: "medium",
    oneLiner:
      "AWS Artifact is a self-service portal for on-demand access to AWS's compliance reports and agreements — it is a documentation service, not a technical security control.",
    englishExplanation:
      "AWS Artifact gives you on-demand, self-service access to AWS's compliance documentation: audit reports (like SOC reports), certifications (like ISO certifications), and agreements (like the Business Associate Addendum for HIPAA or the Nondisclosure Agreement needed to view certain sensitive reports). It exists so customers and their auditors can quickly download the exact evidence needed to demonstrate that AWS's infrastructure meets a given compliance framework, without emailing AWS support and waiting for documents. Artifact does not scan, protect, or configure anything in your account — it is purely a compliance documentation library.",
    taglishExplanation:
      "Si AWS Artifact, hindi ito technical security tool — parang self-service na library lang siya kung saan makukuha mo ang compliance reports at agreements ng AWS (tulad ng SOC reports o ISO certifications). Kapag may auditor kang kailangang bigyan ng ebidensya na compliant ang AWS infrastructure, dito ka kukuha, hindi na kailangang mag-email pa ng AWS support.",
    analogy:
      "AWS Artifact is like a company's public records office where you can instantly download official certifications and audit reports on demand, instead of requesting them by mail and waiting.",
    whyItExists:
      "Compliance audits require documented proof of a cloud provider's controls. Before Artifact, obtaining these documents was a slower, manual request process. Artifact exists to make that evidence instantly, self-service available to any customer who needs it for their own compliance obligations.",
    flow: "Customer/auditor -> AWS Artifact console -> browse/download reports (SOC, ISO, PCI) and agreements (BAA, NDA)",
    withoutIt: [
      "Obtaining AWS compliance evidence would require manual requests and waiting on AWS",
    ],
    bestUseCases: [
      "Downloading SOC/ISO/PCI compliance reports to satisfy an auditor",
      "Accepting agreements like the HIPAA Business Associate Addendum needed for regulated workloads",
    ],
    poorUseCases: [
      "Expecting Artifact to actively scan, monitor, or protect your AWS account — it provides documents only",
    ],
    alternatives: [
      { need: "Actively assess your own account's security/compliance configuration", choose: "AWS Security Hub" },
    ],
    keyFeatures: [
      "On-demand download of AWS audit reports (e.g., SOC) and certifications (e.g., ISO)",
      "Self-service acceptance of agreements like the HIPAA BAA",
      "No cost to use",
    ],
    availability:
      "Artifact is a global, account-level console feature — it is not a regional technical service since it only serves documentation.",
    security:
      "Artifact itself is not a security control — it does not encrypt, detect, or block anything. Its role is enabling compliance: proving to auditors and regulators that AWS's own infrastructure and operations meet specific standards, which underpins the AWS shared responsibility model's \"security of the cloud\" side.",
    pricingLogic: "AWS Artifact is free to use for all AWS customers.",
    examKeywords: ["compliance reports", "SOC / ISO / PCI reports", "not a technical control", "BAA agreement"],
    examTraps: [
      "A question asking how to obtain proof of AWS's compliance certifications for an auditor points to Artifact — do not confuse it with Security Hub, which assesses your own account, not AWS's infrastructure.",
    ],
    architectureDiagram: "Customer/Auditor\n     |\nAWS Artifact console\n     |\nSOC / ISO / PCI reports, BAA/NDA agreements (download)",
    architectureCaption: "Artifact is a document library, not a scanning or monitoring service.",
    mentorTip:
      "If the scenario is about proving AWS's own compliance certifications to an external auditor, think Artifact — it is a documentation source, not a security service.",
    questionIds: ["q-aws-artifact-1", "q-aws-artifact-2"],
  },
];
