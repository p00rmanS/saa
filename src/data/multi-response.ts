import type { Question } from "@/lib/types";

// The official exam guide says multiple-response questions have five or more options with two or more
// correct. These questions were written with four, so each gets one extra plausible-but-wrong option.
// The audit fails if any multiple-response question ends up with fewer than five options.

interface FifthOption {
  text: string;
  why: string;
}

const FIFTH_OPTIONS: Record<string, FifthOption> = {
  "q-role-of-a-solutions-architect-4": { text: "It uses a managed service instead of self-managed software", why: "Managed services are often the preferred answer, so this is not a reason to reject an option." },
  "q-reading-scenario-questions-4": { text: "Pick the option that mentions the most AWS services", why: "The number of services in an option says nothing about whether it meets the requirement." },
  "q-aws-global-infrastructure-4": { text: "Amazon VPC", why: "A VPC is a Regional resource that spans the Availability Zones of one Region." },
  "q-iam-core-4": { text: "Its permissions can be limited by identity-based IAM policies", why: "IAM policies cannot restrict the root user. Only SCPs in Organizations can limit it." },
  "q-iam-identity-center-4": { text: "Each user needs a separate IAM user in every account", why: "Identity Center issues temporary access through permission sets, so per-account IAM users are not required." },
  "q-amazon-ec2-4": { text: "Spot Instances can never be interrupted by AWS", why: "AWS can reclaim Spot capacity with a two-minute warning." },
  "q-ec2-auto-scaling-4": { text: "Automatically resizing each instance to a larger type", why: "Auto Scaling changes the number of instances, which is horizontal scaling, not instance size." },
  "q-elastic-load-balancing-4": { text: "An NLB operates only at Layer 7", why: "An NLB works at Layer 4. The ALB is the Layer 7 load balancer." },
  "q-aws-lambda-4": { text: "An EC2 instance reboot with no event source configured", why: "A reboot does not invoke a function unless an event source is configured, and EC2 reboots are not a native trigger." },
  "q-aws-fargate-4": { text: "It provides SSH access to the underlying host", why: "Fargate does not expose the host, which is part of why it is serverless." },
  "q-amazon-ecs-4": { text: "Lightsail launch type", why: "ECS launch types are EC2 and Fargate, and Lightsail is a separate service." },
  "q-amazon-eks-4": { text: "Amazon S3 bucket nodes", why: "S3 is object storage and cannot run Kubernetes pods." },
  "q-database-decision-framework-4": { text: "Which Availability Zone name sorts first alphabetically?", why: "AZ naming has no bearing on database selection." },
  "q-amazon-rds-4": { text: "The standby in a Multi-AZ instance deployment serves read traffic", why: "The standby is for failover only. Read replicas serve reads." },
  "q-amazon-aurora-4": { text: "Storage must be provisioned in fixed sizes in advance", why: "Aurora storage grows automatically as data grows." },
  "q-amazon-dynamodb-4": { text: "Dedicated Host", why: "Dedicated Host is an EC2 tenancy option, not a DynamoDB capacity mode." },
  "q-amazon-elasticache-4": { text: "Hosting a static website directly from the cache", why: "ElastiCache is an in-memory cache, not a web host. Use S3 and CloudFront for static sites." },
  "q-aws-kms-4": { text: "KMS keys can be exported in plaintext on request", why: "KMS keys never leave the service unencrypted." },
  "q-aws-secrets-manager-4": { text: "It stores secrets larger than 1 GB", why: "A secret can be up to 64 KB, so it is not for large objects." },
  "q-aws-waf-4": { text: "Amazon EC2 instances directly", why: "WAF attaches to supported front-end services such as CloudFront, ALB and API Gateway, not directly to EC2." },
  "q-aws-shield-4": { text: "Shield Standard requires a monthly fee", why: "Shield Standard is automatic and included at no additional charge." },
  "q-amazon-cognito-4": { text: "IAM Identity Center is built for millions of consumer sign-ups", why: "Consumer-scale sign-up and sign-in is the Cognito use case." },
  "q-amazon-cloudwatch-4": { text: "Recording which IAM user made each API call", why: "That is CloudTrail, not CloudWatch." },
  "q-aws-cloudtrail-4": { text: "Operating system logs from inside EC2 instances", why: "OS and application logs are collected by the CloudWatch agent, not CloudTrail." },
  "q-aws-cloudformation-4": { text: "A stack cannot be updated after it is created", why: "Stacks can be updated with change sets or direct updates." },
  "q-aws-organizations-control-tower-service-catalog-4": { text: "It provisions resources only through the AWS CLI", why: "Service Catalog products can be launched from the console, CLI and API." },
  "q-aws-dms-4": { text: "It automatically converts application source code", why: "DMS moves data, and SCT converts schema and some database code, not application logic." },
  "q-aws-datasync-4": { text: "Amazon CloudWatch Logs to AWS Shield", why: "These are not storage systems DataSync can transfer between." },
  "q-high-availability-4": { text: "Placing all instances in one AZ to simplify networking", why: "A single AZ is a single point of failure." },
  "q-fault-tolerance-4": { text: "High availability guarantees zero interruption during failures", why: "High availability minimises downtime but may allow a brief interruption. Fault tolerance aims for none." },
  "q-disaster-recovery-strategies-4": { text: "Warm Standby runs no resources until a disaster occurs", why: "Warm Standby keeps a scaled-down but running environment." },
  "q-aws-cost-thinking-4": { text: "Can we choose the largest instance type to be safe?", why: "Over-provisioning increases cost, so it is the opposite of right-sizing." },
  "q-savings-plans-reserved-spot-4": { text: "Convertible Reserved Instances", why: "Convertible RIs still carry a one- or three-year commitment." },
  "q-amazon-api-gateway-4": { text: "Batch file transfer APIs", why: "API Gateway supports REST, HTTP and WebSocket APIs." },
  "q-s3-security-encryption-3": { text: "Disable all bucket policies so IAM alone decides access", why: "Removing the bucket policy removes the HTTPS and VPC endpoint conditions the requirement needs." },
  "q-vpc-peering-3": { text: "Create a VPN connection between the two VPCs", why: "Peering already provides the private path. A VPN is unnecessary and does not fix routes or security groups." },
  "q-rds-proxy-aurora-global-database-3": { text: "Automatic conversion of the database engine", why: "RDS Proxy pools connections and does not convert engines." },
  "q-lambda-concurrency-and-vpc-3": { text: "Increase the function timeout to 15 minutes", why: "A longer timeout does not give a VPC function internet or S3 access." },
  "q-elasticache-redis-vs-memcached-3": { text: "Support for the Memcached protocol", why: "That is a Memcached feature and does not provide failover or backups." },
  "q-s3-replication-performance-2": { text: "Enable S3 Object Lock", why: "Object Lock provides immutability and has no effect on upload speed." },
  "q-shared-responsibility-account-security-3": { text: "Use the root user to launch every EC2 instance", why: "Daily work should use IAM identities, not root." },
  "q-scaling-statelessness-multi-tier-3": { text: "Disable health checks to avoid false failures", why: "Health checks are how the load balancer and Auto Scaling detect and replace failed instances." },
  "q-microservices-event-driven-resilience-patterns-3": { text: "Remove retries so failures surface immediately", why: "Retries with backoff and idempotency are core resilience patterns." },
  "q-data-lake-architecture-security-2": { text: "Move the data to EBS volumes attached to Athena", why: "Athena queries data in S3 and does not use EBS volumes." },
  "q-availability-metrics-quotas-legacy-reliability-3": { text: "Remove the load balancer to reduce moving parts", why: "A load balancer and health checks improve failure detection and recovery." },
  "q-keyword-recognition-4": { text: "\"managed Kubernetes\" -> AWS Elastic Beanstalk", why: "Managed Kubernetes is Amazon EKS. Elastic Beanstalk deploys applications." },
  "q-eliminating-distractors-4": { text: "Using Direct Connect when a private dedicated connection is required", why: "That matches the requirement, so it is not a mismatch distractor." },
};

export function withFifthOptions(questions: Question[]): Question[] {
  return questions.map((q) => {
    const extra = FIFTH_OPTIONS[q.id];
    if (!extra || q.type !== "multiple" || q.options.length >= 5) return q;
    const id = "e";
    return {
      ...q,
      options: [...q.options, { id, text: extra.text }],
      optionExplanations: { ...q.optionExplanations, [id]: `Incorrect. ${extra.why}` },
    };
  });
}
