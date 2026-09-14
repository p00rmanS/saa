import type { Module } from "@/lib/types";
import { allLessons } from "./index";

interface PhaseMeta {
  phase: string;
  phaseOrder: number;
  title: string;
  description: string;
}

const PHASE_META: Record<string, PhaseMeta> = {
  "phase-0-orientation": {
    phase: "Phase 0 — Orientation",
    phaseOrder: 0,
    title: "Orientation",
    description:
      "How a Solutions Architect thinks, how to read SAA-style scenario questions, and how AWS's global infrastructure is organized.",
  },
  "phase-1-iam": {
    phase: "Phase 1 — AWS Foundations for Architecture",
    phaseOrder: 1,
    title: "IAM and Identity",
    description: "Who can do what, to which resources — the foundation of every security decision in AWS.",
  },
  "phase-2-compute": {
    phase: "Phase 2 — Compute",
    phaseOrder: 2,
    title: "Compute & Serverless",
    description: "EC2, Auto Scaling, load balancing, Lambda, Fargate, and the rest of AWS's compute spectrum.",
  },
  "phase-3-storage": {
    phase: "Phase 3 — Storage",
    phaseOrder: 3,
    title: "Storage",
    description: "S3, EBS, EFS, FSx, Glacier, Storage Gateway, and AWS Backup.",
  },
  "phase-4-networking": {
    phase: "Phase 4 — Networking",
    phaseOrder: 4,
    title: "Networking",
    description: "VPC, security groups, NAT, Route 53, CloudFront, and hybrid connectivity.",
  },
  "phase-5-databases": {
    phase: "Phase 5 — Databases",
    phaseOrder: 5,
    title: "Databases",
    description: "Choosing the right database, then RDS, Aurora, DynamoDB, ElastiCache, and more.",
  },
  "phase-6-integration": {
    phase: "Phase 6 — Application Integration and Decoupling",
    phaseOrder: 6,
    title: "Application Integration",
    description: "SQS, SNS, EventBridge, Step Functions, and decoupled architecture patterns.",
  },
  "phase-7-containers": {
    phase: "Phase 7 — Containers",
    phaseOrder: 7,
    title: "Containers",
    description: "ECR, ECS, EKS, and Fargate — running containers on AWS.",
  },
  "phase-8-security": {
    phase: "Phase 8 — Security",
    phaseOrder: 8,
    title: "Security",
    description: "Encryption, secrets, network protection, and threat detection — the largest exam domain.",
  },
  "phase-9-monitoring": {
    phase: "Phase 9 — Monitoring, Governance, and Operations",
    phaseOrder: 9,
    title: "Monitoring & Governance",
    description: "CloudWatch, CloudTrail, Config, Systems Manager, CloudFormation, and multi-account governance.",
  },
  "phase-10-analytics": {
    phase: "Phase 10 — Analytics and Data Processing",
    phaseOrder: 10,
    title: "Analytics",
    description: "Athena, Glue, Kinesis, and the rest of AWS's data processing toolkit.",
  },
  "phase-11-migration": {
    phase: "Phase 11 — Migration and Hybrid",
    phaseOrder: 11,
    title: "Migration & Hybrid",
    description: "Moving databases, files, and servers into AWS.",
  },
  "phase-12-resilience": {
    phase: "Phase 12 — Resilience and Disaster Recovery",
    phaseOrder: 12,
    title: "Resilience & DR",
    description: "High availability, fault tolerance, and disaster recovery strategy.",
  },
  "phase-13-cost": {
    phase: "Phase 13 — Cost Optimization",
    phaseOrder: 13,
    title: "Cost Optimization",
    description: "How to think about AWS cost, and the tools that track and control it.",
  },
  "phase-misc": {
    phase: "Phase 14 — Front-End, ML, Media & Extras",
    phaseOrder: 14,
    title: "Front-End, ML, Media & Extras",
    description: "API Gateway, Amplify, and recognition-level coverage of ML, media, and remaining management services.",
  },
  "phase-15-exam-mastery": {
    phase: "Phase 15 — Exam Mastery",
    phaseOrder: 15,
    title: "Exam Mastery",
    description: "Keyword recognition, distractor elimination, and timed practice to build real exam speed.",
  },
};

function buildModules(): Module[] {
  const grouped = new Map<string, string[]>();
  for (const lesson of allLessons) {
    const list = grouped.get(lesson.moduleId) ?? [];
    list.push(lesson.id);
    grouped.set(lesson.moduleId, list);
  }

  const modules: Module[] = [];
  for (const [moduleId, lessonIds] of grouped.entries()) {
    const meta = PHASE_META[moduleId];
    if (!meta) continue;
    modules.push({
      id: moduleId,
      phase: meta.phase,
      phaseOrder: meta.phaseOrder,
      title: meta.title,
      description: meta.description,
      lessonIds,
    });
  }

  return modules.sort((a, b) => a.phaseOrder - b.phaseOrder);
}

export const modules: Module[] = buildModules();

export function moduleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function moduleForLesson(lessonId: string): Module | undefined {
  return modules.find((m) => m.lessonIds.includes(lessonId));
}
