import type { Flashcard } from "@/lib/types";

export const securityFlashcards: Flashcard[] = [
  { id: "fc-aws-kms-1", serviceId: "aws-kms", domain: 1, category: "Security, Identity, and Compliance", front: "What is AWS KMS?", back: "A managed service for creating and controlling encryption keys, integrated with services like S3, EBS, and RDS." },
  { id: "fc-aws-kms-2", serviceId: "aws-kms", domain: 1, category: "Security, Identity, and Compliance", front: "What controls who can use/manage a KMS key?", back: "The key policy." },
  { id: "fc-aws-kms-3", serviceId: "aws-kms", domain: 1, category: "Security, Identity, and Compliance", front: "What technique does KMS use to efficiently encrypt large data?", back: "Envelope encryption — a data key (encrypted by the KMS key) encrypts the actual data." },
  { id: "fc-aws-kms-4", serviceId: "aws-kms", domain: 1, category: "Security, Identity, and Compliance", front: "KMS vs CloudHSM?", back: "KMS: shared, managed, low overhead. CloudHSM: dedicated single-tenant hardware for strict compliance." },
  { id: "fc-aws-kms-5", serviceId: "aws-kms", domain: 1, category: "Security, Identity, and Compliance", front: "Taglish: Bakit gamitin ang KMS?", back: "Para may sentralisadong pamamahala ng encryption keys, na direktang naka-integrate sa S3, EBS, RDS at iba pa." },

  { id: "fc-aws-secrets-manager-1", serviceId: "aws-secrets-manager", domain: 1, category: "Security, Identity, and Compliance", front: "What is Secrets Manager for?", back: "Storing and automatically rotating database credentials, API keys, and other secrets." },
  { id: "fc-aws-secrets-manager-2", serviceId: "aws-secrets-manager", domain: 1, category: "Security, Identity, and Compliance", front: "Where should you NEVER store a secret?", back: "Hardcoded in application source code." },
  { id: "fc-aws-secrets-manager-3", serviceId: "aws-secrets-manager", domain: 1, category: "Security, Identity, and Compliance", front: "What underlying service encrypts Secrets Manager secrets?", back: "AWS KMS." },
  { id: "fc-aws-secrets-manager-4", serviceId: "aws-secrets-manager", domain: 1, category: "Security, Identity, and Compliance", front: "Taglish: Ano ang pinaka-importanteng rule sa Secrets Manager?", back: "Huwag kailanman ilagay ang password/secret diretso sa code — sa Secrets Manager ito i-store, kukunin na lang sa runtime." },

  { id: "fc-aws-waf-1", serviceId: "aws-waf", domain: 1, category: "Security, Identity, and Compliance", front: "What layer does WAF operate at?", back: "Layer 7 — HTTP/HTTPS application traffic." },
  { id: "fc-aws-waf-2", serviceId: "aws-waf", domain: 1, category: "Security, Identity, and Compliance", front: "What can WAF attach to?", back: "CloudFront, Application Load Balancer, and API Gateway." },
  { id: "fc-aws-waf-3", serviceId: "aws-waf", domain: 1, category: "Security, Identity, and Compliance", front: "What does a WAF rate-based rule do?", back: "Blocks/limits requests exceeding a rate threshold from a single IP." },
  { id: "fc-aws-waf-4", serviceId: "aws-waf", domain: 1, category: "Security, Identity, and Compliance", front: "Taglish: Ano ang ginagawa ng WAF?", back: "Sinasala nito ang HTTP traffic laban sa SQL injection, XSS, at iba pang malicious na patterns." },

  { id: "fc-aws-shield-1", serviceId: "aws-shield", domain: 1, category: "Security, Identity, and Compliance", front: "What does AWS Shield protect against?", back: "DDoS (Distributed Denial of Service) attacks." },
  { id: "fc-aws-shield-2", serviceId: "aws-shield", domain: 1, category: "Security, Identity, and Compliance", front: "Shield Standard vs Advanced?", back: "Standard: free, automatic, baseline protection for everyone. Advanced: paid, enhanced protection + DRT access + cost protection." },
  { id: "fc-aws-shield-3", serviceId: "aws-shield", domain: 1, category: "Security, Identity, and Compliance", front: "Taglish: Kailan mo kailangan ang Shield Advanced?", back: "Kapag madalas at malala ang DDoS attacks, at kailangan mo ng direct access sa AWS DDoS Response Team." },

  { id: "fc-amazon-cognito-1", serviceId: "amazon-cognito", domain: 1, category: "Security, Identity, and Compliance", front: "What is Amazon Cognito for?", back: "Sign-up/sign-in authentication for your web or mobile app's end users." },
  { id: "fc-amazon-cognito-2", serviceId: "amazon-cognito", domain: 1, category: "Security, Identity, and Compliance", front: "User Pools vs Identity Pools?", back: "User Pools: authenticate users. Identity Pools: exchange that identity for temporary AWS credentials." },
  { id: "fc-amazon-cognito-3", serviceId: "amazon-cognito", domain: 1, category: "Security, Identity, and Compliance", front: "Cognito vs IAM Identity Center?", back: "Cognito = your app's customers. IAM Identity Center = your company's workforce across AWS accounts." },
  { id: "fc-amazon-cognito-4", serviceId: "amazon-cognito", domain: 1, category: "Security, Identity, and Compliance", front: "Taglish: Sino best-fit sa Cognito?", back: "Yung app na may end users na kailangang mag-sign up/sign in, hindi mga empleyado ng kumpanya." },
  { id: "fc-amazon-cognito-5", serviceId: "amazon-cognito", domain: 1, category: "Security, Identity, and Compliance", front: "Does Cognito support social login (Google/Facebook)?", back: "Yes, via federated identity providers on User Pools." },

  { id: "fc-aws-certificate-manager-1", serviceId: "aws-certificate-manager", domain: 1, category: "Security, Identity, and Compliance", front: "What does ACM provide?", back: "Free TLS/SSL certificates for supported AWS services, with automatic renewal." },
  { id: "fc-aws-certificate-manager-2", serviceId: "aws-certificate-manager", domain: 1, category: "Security, Identity, and Compliance", front: "Which services can use an ACM certificate directly?", back: "ALB, CloudFront, and API Gateway (among others)." },
  { id: "fc-aws-certificate-manager-3", serviceId: "aws-certificate-manager", domain: 1, category: "Security, Identity, and Compliance", front: "Taglish: Bakit maganda ang ACM?", back: "Libre at automatic mag-renew ang mga TLS certificates, hindi mo na kailangan bilhin o i-renew manually." },

  { id: "fc-amazon-guardduty-1", serviceId: "amazon-guardduty", domain: 1, category: "Security, Identity, and Compliance", front: "What does GuardDuty do?", back: "Continuously monitors for malicious activity and unauthorized behavior using AWS telemetry (VPC Flow Logs, DNS logs, CloudTrail)." },
  { id: "fc-amazon-guardduty-2", serviceId: "amazon-guardduty", domain: 1, category: "Security, Identity, and Compliance", front: "Does GuardDuty need agents installed?", back: "No — it's agentless, analyzing existing data sources." },
  { id: "fc-amazon-guardduty-3", serviceId: "amazon-guardduty", domain: 1, category: "Security, Identity, and Compliance", front: "Taglish: Ano ang ginagawa ng GuardDuty?", back: "Automatic nitong napapansin ang kakaibang behavior, gaya ng instance na biglang kumakausap ng known-malicious IP." },

  { id: "fc-amazon-inspector-1", serviceId: "amazon-inspector", domain: 1, category: "Security, Identity, and Compliance", front: "What does Amazon Inspector do?", back: "Automated vulnerability and exposure assessment for EC2, ECR container images, and Lambda." },
  { id: "fc-amazon-inspector-2", serviceId: "amazon-inspector", domain: 1, category: "Security, Identity, and Compliance", front: "Inspector vs GuardDuty?", back: "Inspector finds known vulnerabilities (CVEs) in resources. GuardDuty detects active malicious behavior." },
  { id: "fc-amazon-inspector-3", serviceId: "amazon-inspector", domain: 1, category: "Security, Identity, and Compliance", front: "Taglish: Kailan gagamitin ang Inspector?", back: "Kapag gusto mong malaman kung may known vulnerabilities ang iyong EC2, container images, o Lambda functions." },

  { id: "fc-amazon-macie-1", serviceId: "amazon-macie", domain: 1, category: "Security, Identity, and Compliance", front: "What does Amazon Macie do?", back: "Uses machine learning to discover and classify sensitive data (like PII) stored in S3." },
  { id: "fc-amazon-macie-2", serviceId: "amazon-macie", domain: 1, category: "Security, Identity, and Compliance", front: "Give a Macie use case.", back: "Proving for an audit that no S3 bucket accidentally exposes patient health records." },
  { id: "fc-amazon-macie-3", serviceId: "amazon-macie", domain: 1, category: "Security, Identity, and Compliance", front: "Taglish: Ano ang ginagawa ng Macie?", back: "Hinahanap nito ang sensitive data (gaya ng PII) sa loob ng S3 buckets gamit ang machine learning." },

  { id: "fc-aws-security-hub-1", serviceId: "aws-security-hub", domain: 1, category: "Security, Identity, and Compliance", front: "What does Security Hub do?", back: "Centrally aggregates security findings from GuardDuty, Inspector, Macie, and other sources into one view." },
  { id: "fc-aws-security-hub-2", serviceId: "aws-security-hub", domain: 1, category: "Security, Identity, and Compliance", front: "Can Security Hub aggregate across multiple AWS accounts?", back: "Yes, via AWS Organizations integration." },
  { id: "fc-aws-security-hub-3", serviceId: "aws-security-hub", domain: 1, category: "Security, Identity, and Compliance", front: "Taglish: Bakit maganda ang Security Hub?", back: "Isang lugar na lang ang titingnan mo para sa findings mula sa GuardDuty, Inspector, Macie, at iba pa." },

  { id: "fc-aws-network-firewall-and-firewall-manager-1", serviceId: "aws-network-firewall-and-firewall-manager", domain: 1, category: "Security, Identity, and Compliance", front: "AWS Network Firewall vs WAF?", back: "Network Firewall: stateful VPC-level filtering, any protocol. WAF: Layer 7 HTTP/HTTPS filtering only." },
  { id: "fc-aws-network-firewall-and-firewall-manager-2", serviceId: "aws-network-firewall-and-firewall-manager", domain: 1, category: "Security, Identity, and Compliance", front: "What does AWS Firewall Manager do?", back: "Centrally manages firewall/WAF/security group policies across many AWS accounts." },
  { id: "fc-aws-network-firewall-and-firewall-manager-3", serviceId: "aws-network-firewall-and-firewall-manager", domain: 1, category: "Security, Identity, and Compliance", front: "Taglish: Kailan gagamit ng Network Firewall imbes na WAF?", back: "Kapag non-HTTP traffic ang kailangan mong i-inspect sa VPC level, hindi lang HTTP requests." },

  { id: "fc-amazon-detective-1", serviceId: "amazon-detective", domain: 1, category: "Security, Identity, and Compliance", front: "What is Amazon Detective for?", back: "Investigating and visualizing the root cause of security findings after something like GuardDuty flags an issue." },
  { id: "fc-amazon-detective-2", serviceId: "amazon-detective", domain: 1, category: "Security, Identity, and Compliance", front: "Detective vs GuardDuty?", back: "GuardDuty detects the finding. Detective helps investigate and visualize what happened around it." },

  { id: "fc-aws-cloudhsm-1", serviceId: "aws-cloudhsm", domain: 1, category: "Security, Identity, and Compliance", front: "What does CloudHSM provide?", back: "Dedicated, single-tenant hardware security modules for key management, for strict compliance needs." },
  { id: "fc-aws-cloudhsm-2", serviceId: "aws-cloudhsm", domain: 1, category: "Security, Identity, and Compliance", front: "Does CloudHSM have more or less operational overhead than KMS?", back: "More — you manage more of the HSM cluster yourself compared to KMS's fully managed model." },

  { id: "fc-aws-directory-service-1", serviceId: "aws-directory-service", domain: 1, category: "Security, Identity, and Compliance", front: "What is AWS Directory Service for?", back: "Managed Microsoft Active Directory or AD Connector for hybrid identity scenarios." },
  { id: "fc-aws-directory-service-2", serviceId: "aws-directory-service", domain: 1, category: "Security, Identity, and Compliance", front: "What lets AWS authenticate against an existing on-prem AD without migrating users?", back: "AD Connector." },

  { id: "fc-aws-resource-access-manager-1", serviceId: "aws-resource-access-manager", domain: 1, category: "Security, Identity, and Compliance", front: "What does AWS RAM do?", back: "Securely shares AWS resources (like subnets or Transit Gateways) across accounts without duplicating them." },
  { id: "fc-aws-resource-access-manager-2", serviceId: "aws-resource-access-manager", domain: 1, category: "Security, Identity, and Compliance", front: "Give a RAM use case.", back: "Sharing one central Transit Gateway across many AWS accounts instead of creating separate ones." },

  { id: "fc-aws-artifact-1", serviceId: "aws-artifact", domain: 1, category: "Security, Identity, and Compliance", front: "What is AWS Artifact for?", back: "On-demand, self-service access to AWS's compliance reports and agreements (e.g. SOC, ISO)." },
  { id: "fc-aws-artifact-2", serviceId: "aws-artifact", domain: 1, category: "Security, Identity, and Compliance", front: "Is AWS Artifact a technical security control?", back: "No — it's a compliance-documentation portal, not a scanning or protection service." },
];
