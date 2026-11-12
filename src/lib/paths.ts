import { modules } from "@/data/modules";
import { allLessons } from "@/data";
import type { ExamDomainId, Lesson } from "@/lib/types";

export interface StudyPath {
  id: string;
  title: string;
  audience: string;
  summary: string;
  lessons: Lesson[];
}

const moduleOrder = new Map(modules.map((m, i) => [m.id, i]));
const lessonOrder = new Map<string, number>();
modules.forEach((m) => m.lessonIds.forEach((id, i) => lessonOrder.set(id, i)));

/** Course order: module sequence, then the lesson's position inside its module. */
function inCourseOrder(lessons: Lesson[]): Lesson[] {
  return [...lessons].sort(
    (a, b) =>
      (moduleOrder.get(a.moduleId) ?? 99) - (moduleOrder.get(b.moduleId) ?? 99) ||
      (lessonOrder.get(a.id) ?? 0) - (lessonOrder.get(b.id) ?? 0)
  );
}

const isScenarioDrill = (l: Lesson) => l.id.startsWith("scenario-drill-");
const isCoreImportance = (l: Lesson) => l.examImportance === "critical";

export const DOMAIN_NAMES: Record<ExamDomainId, string> = {
  1: "Secure Architectures",
  2: "Resilient Architectures",
  3: "High-Performing Architectures",
  4: "Cost-Optimized Architectures",
};

export function domainPath(domain: ExamDomainId): StudyPath {
  return {
    id: `domain-${domain}`,
    title: `Domain ${domain}: ${DOMAIN_NAMES[domain]}`,
    audience: "You know what you are weak in and want to close one domain at a time.",
    summary: `Every lesson tagged to this domain, ending with its scenario drill.`,
    lessons: inCourseOrder(allLessons.filter((l) => l.domains.includes(domain) && !isScenarioDrill(l))).concat(
      allLessons.filter((l) => l.id === `scenario-drill-domain-${domain}`)
    ),
  };
}

/**
 * Lessons that double as Cloud Practitioner (CLF-C02) refreshers, grouped by the four CCP domains.
 * Ids that no longer exist are skipped, so the list can be edited without breaking the build.
 */
const CCP_REFRESHER_IDS = [
  // Domain 1: cloud concepts
  "cloud-computing-fundamentals-ccp",
  "aws-global-infrastructure",
  "regions-edge-local-zones-wavelength-outposts",
  "cloud-adoption-framework-ccp",
  "well-architected-framework-pillars",
  "aws-well-architected-tool",
  // Domain 2: security and compliance
  "aws-account-first-steps-root-user-mfa",
  "shared-responsibility-account-security",
  "ccp-security-compliance-refresher",
  "iam-core",
  "iam-identity-center",
  "aws-kms",
  "aws-secrets-manager",
  "aws-waf",
  "aws-shield",
  "amazon-guardduty",
  "amazon-inspector",
  "amazon-macie",
  "aws-security-hub",
  "aws-artifact",
  "aws-audit-manager",
  "aws-cloudtrail",
  "aws-config",
  // Domain 3: cloud technology and services
  "aws-service-map-quick-reference",
  "aws-management-console",
  "aws-cli",
  "amazon-ec2",
  "aws-lambda",
  "amazon-ecs",
  "amazon-eks",
  "amazon-s3",
  "amazon-ebs",
  "amazon-efs",
  "amazon-rds",
  "amazon-aurora",
  "amazon-dynamodb",
  "amazon-vpc",
  "amazon-route-53",
  "amazon-cloudfront",
  "elastic-load-balancing",
  "ec2-auto-scaling",
  "amazon-sqs",
  "amazon-sns",
  "amazon-cloudwatch",
  "aws-cloudformation",
  "aws-direct-connect",
  "aws-site-to-site-vpn",
  "amazon-redshift",
  "amazon-athena",
  "amazon-sagemaker-ai",
  // Domain 4: billing, pricing and support
  "aws-pricing-fundamentals-free-tier-tco",
  "ccp-billing-pricing-support-refresher",
  "aws-cost-thinking",
  "aws-budgets",
  "aws-cost-explorer",
  "aws-cost-and-usage-report",
  "savings-plans-reserved-spot",
  "cost-allocation-tags-consolidated-billing",
  "aws-organizations-control-tower-service-catalog",
  "aws-trusted-advisor",
  "support-plans-trusted-advisor-health",
  "aws-health-dashboard",
  // Bridge to the associate exam
  "ccp-to-saa-bridge-how-to-think",
];

const ccpLessonIdSet = new Set(CCP_REFRESHER_IDS);
export const isCcpRefresher = (lessonId: string) => ccpLessonIdSet.has(lessonId);

export const studyPaths: StudyPath[] = [
  {
    id: "ccp-refresher",
    title: "Cloud Practitioner (CCP) refresher",
    audience: "You passed or studied CLF-C02 a while ago and the basics have faded. Start here before the associate material.",
    summary:
      "The four CCP domains in order (cloud concepts, security, technology, billing and support), at refresher depth, ending with the bridge to SAA-C03 thinking.",
    lessons: CCP_REFRESHER_IDS.map((id) => allLessons.find((l) => l.id === id)).filter((l): l is Lesson => Boolean(l)),
  },
  {
    id: "foundations",
    title: "Foundations first",
    audience: "New to AWS, or new to the cloud. Start here.",
    summary: "Orientation, then the core tier-1 services that nearly every exam question builds on.",
    lessons: inCourseOrder(
      allLessons.filter((l) => l.tier === 1 && !isScenarioDrill(l) && l.examImportance !== "low")
    ),
  },
  {
    id: "exam-essentials",
    title: "Exam essentials",
    audience: "Some AWS experience and a test date in a few weeks.",
    summary: "Only the lessons rated critical for the exam, in course order, then the four scenario drills. The fastest route to a passing baseline.",
    lessons: inCourseOrder(allLessons.filter((l) => isCoreImportance(l) && !isScenarioDrill(l))).concat(
      allLessons.filter(isScenarioDrill)
    ),
  },
  {
    id: "decision-guides",
    title: "Decision and trade-off guides",
    audience: "You know the services but pick the wrong one between two close options.",
    summary: "The comparison and decision-guide lessons that teach which service wins under which constraint.",
    lessons: inCourseOrder(
      allLessons.filter((l) => /decision|vs |versus|compar|strateg|choos/i.test(`${l.id} ${l.title}`))
    ),
  },
  ...([1, 2, 3, 4] as ExamDomainId[]).map(domainPath),
  {
    id: "everything",
    title: "Complete course",
    audience: "You want every topic covered before the exam.",
    summary: "All lessons in course order. Nothing skipped.",
    lessons: inCourseOrder(allLessons),
  },
];
