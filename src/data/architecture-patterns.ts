import type { ArchitecturePattern } from "@/lib/types";

export const architecturePatterns: ArchitecturePattern[] = [
  {
    id: "three-tier-web-app",
    title: "Classic Three-Tier Web Application",
    description:
      "The default answer for 'build a reliable, scalable web application' — a presentation layer, an application layer, and a data layer, each independently scalable and each spread across multiple AZs.",
    diagram:
      "Route 53\n   |\nCloudFront\n   |\nApplication Load Balancer\n   |\nAuto Scaling EC2 (multi-AZ)\n   |\nRDS Multi-AZ",
    decisions: [
      "Route 53 for DNS, optionally with health-check-based failover",
      "CloudFront in front of the ALB/static assets for caching and lower latency",
      "ALB for Layer 7 routing and health checks across the EC2 fleet",
      "Auto Scaling group spanning 2+ AZs so no single instance or AZ is a point of failure",
      "RDS Multi-AZ for automatic database failover, with Read Replicas added if read traffic grows",
    ],
    relatedLessonIds: ["amazon-route-53", "amazon-cloudfront", "elastic-load-balancing", "ec2-auto-scaling", "amazon-rds"],
  },
  {
    id: "serverless-web-app",
    title: "Serverless Web Application",
    description:
      "The default answer for 'build a web application with the least operational overhead' — no servers to patch anywhere in the stack.",
    diagram:
      "CloudFront\n   |\nS3 (static frontend)\n   |\nAPI Gateway\n   |\nLambda\n   |\nDynamoDB",
    decisions: [
      "S3 + CloudFront serve the static frontend (HTML/CSS/JS) with global low latency",
      "API Gateway is the managed front door for the backend API, handling throttling and auth",
      "Lambda runs the business logic with automatic scaling and zero idle cost",
      "DynamoDB provides a serverless, low-latency data store matching Lambda's operational model",
      "Cognito is commonly added for user authentication in front of API Gateway",
    ],
    relatedLessonIds: ["amazon-cloudfront", "amazon-s3", "amazon-api-gateway", "aws-lambda", "amazon-dynamodb", "amazon-cognito"],
  },
  {
    id: "event-driven-order-processing",
    title: "Event-Driven Order Processing",
    description:
      "The default answer for 'the order intake system must never be blocked by a slow downstream process' — decoupling via a queue between the API and the workers.",
    diagram:
      "API Gateway\n   |\nLambda (intake)\n   |\nSQS\n   |\nWorkers (Lambda/ECS)\n   |\nDynamoDB",
    decisions: [
      "API Gateway + Lambda accept the order quickly and place it on a queue instead of processing it inline",
      "SQS decouples intake from processing — a slow or failed worker never blocks new orders from being accepted",
      "Workers (Lambda for lightweight processing, or ECS/Fargate for heavier processing) pull from the queue at their own pace",
      "A dead-letter queue captures orders that repeatedly fail processing, for later investigation",
      "DynamoDB stores the processed order state",
    ],
    relatedLessonIds: ["amazon-api-gateway", "aws-lambda", "amazon-sqs", "amazon-dynamodb"],
  },
  {
    id: "highly-available-architecture",
    title: "Highly Available Architecture",
    description:
      "A checklist-style pattern for any question emphasizing 'must remain available' — every layer has redundancy and a way to detect and route around failure.",
    diagram:
      "Route 53 (health checks + failover)\n   |\nMulti-AZ Load Balancer\n   |\nAuto Scaling EC2 (multi-AZ)\n   |\nRDS Multi-AZ + automated backups",
    decisions: [
      "Multiple Availability Zones at every layer — compute, load balancer, and database",
      "A load balancer distributing traffic and removing unhealthy targets automatically",
      "Auto Scaling replacing failed instances automatically",
      "A Multi-AZ database for automatic failover",
      "Automated backups (and cross-Region replication for stricter requirements) for durability",
      "Route 53 health checks and failover routing for an additional layer of resilience",
    ],
    relatedLessonIds: ["high-availability", "amazon-route-53", "elastic-load-balancing", "ec2-auto-scaling", "amazon-rds"],
  },
  {
    id: "hybrid-architecture",
    title: "Hybrid Architecture",
    description:
      "The default answer for 'connect our on-premises data center to AWS' — choosing between VPN and Direct Connect, and extending storage/identity as needed.",
    diagram:
      "On-Premises Data Center\n   |\nSite-to-Site VPN or Direct Connect\n   |\nVPC (private subnets)\n   |\nStorage Gateway / DataSync (as needed)",
    decisions: [
      "Site-to-Site VPN for fast, encrypted, lower-cost connectivity when performance can be variable",
      "Direct Connect for consistent, dedicated bandwidth when performance predictability matters more than setup speed",
      "AWS Directory Service or AD Connector to extend existing on-premises identity into AWS",
      "Storage Gateway or DataSync to bridge on-premises storage with S3/EFS/FSx as needed",
    ],
    relatedLessonIds: ["aws-site-to-site-vpn", "aws-direct-connect", "aws-storage-gateway", "aws-datasync", "aws-directory-service"],
  },
  {
    id: "highly-available-restaurant-booking",
    title: "Scenario Project — Highly Available Restaurant Booking Website",
    description:
      "Requirements: a web application with multiple AZs, a relational database, high availability, static images, and automatic scaling.",
    diagram:
      "Route 53\n   |\nCloudFront\n   |\nApplication Load Balancer\n   |\nAuto Scaling EC2\n   |\nRDS Multi-AZ\n   |\nS3 (static images)",
    decisions: [
      "Multi-AZ EC2 behind an ALB with Auto Scaling handles the availability and scaling requirements",
      "RDS Multi-AZ provides the relational database with automatic failover",
      "S3 stores static images, served efficiently through CloudFront",
      "Route 53 provides the DNS entry point, optionally with health-check-based failover",
    ],
    relatedLessonIds: ["amazon-route-53", "amazon-cloudfront", "elastic-load-balancing", "ec2-auto-scaling", "amazon-rds", "amazon-s3"],
  },
  {
    id: "serverless-appointment-app",
    title: "Scenario Project — Serverless Appointment App",
    description:
      "A fully serverless booking app: CloudFront + S3 for the frontend, API Gateway + Lambda + DynamoDB for the backend, Cognito for auth, plus SQS for async tasks and CloudWatch for monitoring.",
    diagram:
      "CloudFront\n   |\nS3\n   |\nAPI Gateway (Cognito authorizer)\n   |\nLambda\n   |\nDynamoDB\n   |\nSQS (async tasks: reminders, notifications)",
    decisions: [
      "Cognito authenticates users before API Gateway allows requests through",
      "SQS decouples any slower async task (like sending reminder emails) from the main booking request path",
      "CloudWatch provides metrics/alarms/logs across every layer for operational visibility",
      "IAM roles scope exactly what each Lambda function can access",
    ],
    relatedLessonIds: ["amazon-cloudfront", "amazon-s3", "amazon-api-gateway", "aws-lambda", "amazon-dynamodb", "amazon-cognito", "amazon-sqs", "amazon-cloudwatch", "iam-core"],
  },
  {
    id: "video-processing-pipeline",
    title: "Scenario Project — Video Processing Pipeline",
    description:
      "S3 upload triggers an event, which queues a processing job; the processing step itself can be Lambda (short jobs), Fargate (medium jobs), or Batch (long/HPC-style jobs), writing results back to S3.",
    diagram:
      "S3 Upload\n   |\nEvent Notification\n   |\nSQS\n   |\nProcessing (Lambda / Fargate / Batch, by job size)\n   |\nS3 Output",
    decisions: [
      "S3 event notifications trigger processing automatically on upload, no polling needed",
      "SQS buffers jobs so a burst of uploads doesn't overwhelm the processing layer",
      "Lambda fits quick transformations under its duration limit; Fargate fits medium, containerized jobs; AWS Batch fits long-running or HPC-style transcoding jobs",
      "Results land back in S3, optionally triggering a further downstream step (e.g. a notification via SNS)",
    ],
    relatedLessonIds: ["amazon-s3", "amazon-sqs", "aws-lambda", "aws-fargate", "aws-batch"],
  },
];
