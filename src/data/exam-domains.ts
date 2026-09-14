import type { ExamDomain } from "@/lib/types";

export const examDomains: ExamDomain[] = [
  {
    id: 1,
    title: "Design Secure Architectures",
    weight: 30,
    subtopics: [
      {
        title: "Secure access to AWS resources",
        services: [
          "iam-core",
          "iam-identity-center",
          "aws-organizations-control-tower-service-catalog",
        ],
      },
      {
        title: "Secure workloads and applications",
        services: [
          "amazon-vpc",
          "security-groups-vs-nacls",
          "nat-gateway",
          "vpc-endpoints-privatelink",
          "aws-waf",
          "aws-shield",
          "aws-secrets-manager",
          "amazon-guardduty",
          "amazon-cognito",
          "aws-site-to-site-vpn",
          "aws-direct-connect",
        ],
      },
      {
        title: "Data security",
        services: [
          "aws-kms",
          "aws-certificate-manager",
          "aws-backup",
          "s3-glacier",
          "aws-lake-formation",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Design Resilient Architectures",
    weight: 26,
    subtopics: [
      {
        title: "Scalable and loosely coupled architectures",
        services: [
          "amazon-sqs",
          "amazon-sns",
          "amazon-eventbridge",
          "aws-step-functions",
          "aws-lambda",
          "amazon-api-gateway",
          "amazon-ecs",
          "amazon-eks",
          "aws-fargate",
          "elastic-load-balancing",
          "amazon-elasticache",
        ],
      },
      {
        title: "Highly available and fault-tolerant architectures",
        services: [
          "aws-global-infrastructure",
          "amazon-route-53",
          "elastic-load-balancing",
          "ec2-auto-scaling",
          "high-availability",
          "fault-tolerance",
          "disaster-recovery-strategies",
          "aws-backup",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Design High-Performing Architectures",
    weight: 24,
    subtopics: [
      {
        title: "Storage",
        services: ["amazon-s3", "amazon-ebs", "amazon-efs", "amazon-fsx", "aws-storage-gateway"],
      },
      {
        title: "Compute",
        services: ["amazon-ec2", "aws-lambda", "aws-fargate", "aws-batch", "ec2-auto-scaling", "amazon-ecs", "amazon-eks"],
      },
      {
        title: "Databases",
        services: ["amazon-rds", "amazon-aurora", "amazon-dynamodb", "amazon-elasticache", "database-decision-framework"],
      },
      {
        title: "Networking",
        services: ["amazon-cloudfront", "aws-global-accelerator", "elastic-load-balancing", "aws-site-to-site-vpn", "aws-direct-connect", "vpc-endpoints-privatelink"],
      },
      {
        title: "Data ingestion and transformation",
        services: ["amazon-kinesis", "amazon-data-firehose", "aws-glue", "aws-datasync", "aws-storage-gateway", "amazon-athena", "amazon-emr", "aws-lake-formation"],
      },
    ],
  },
  {
    id: 4,
    title: "Design Cost-Optimized Architectures",
    weight: 20,
    subtopics: [
      {
        title: "Storage cost",
        services: ["amazon-s3", "s3-glacier", "amazon-ebs", "amazon-fsx", "aws-datasync"],
      },
      {
        title: "Compute cost",
        services: ["savings-plans-reserved-spot", "ec2-auto-scaling", "aws-lambda", "aws-fargate"],
      },
      {
        title: "Database cost",
        services: ["amazon-dynamodb", "amazon-rds", "amazon-aurora-serverless"],
      },
      {
        title: "Network cost",
        services: ["nat-gateway", "vpc-endpoints-privatelink", "aws-site-to-site-vpn", "aws-direct-connect", "amazon-cloudfront"],
      },
      {
        title: "Cost visibility and control",
        services: ["aws-cost-thinking", "aws-budgets", "aws-cost-explorer", "aws-cost-and-usage-report"],
      },
    ],
  },
];

export function examDomainById(id: 1 | 2 | 3 | 4): ExamDomain {
  const domain = examDomains.find((d) => d.id === id);
  if (!domain) throw new Error(`Unknown exam domain ${id}`);
  return domain;
}
