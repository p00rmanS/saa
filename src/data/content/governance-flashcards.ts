import type { Flashcard } from "@/lib/types";

export const governanceFlashcards: Flashcard[] = [
  { id: "fc-amazon-cloudwatch-1", serviceId: "amazon-cloudwatch", domain: 3, category: "Management and Governance", front: "What does CloudWatch provide?", back: "Metrics, logs, alarms, and dashboards for monitoring AWS resources." },
  { id: "fc-amazon-cloudwatch-2", serviceId: "amazon-cloudwatch", domain: 2, category: "Management and Governance", front: "What triggers an Auto Scaling policy based on a metric threshold?", back: "A CloudWatch Alarm." },
  { id: "fc-amazon-cloudwatch-3", serviceId: "amazon-cloudwatch", domain: 3, category: "Management and Governance", front: "What lets you alert on patterns inside application logs?", back: "CloudWatch Logs metric filters combined with alarms." },
  { id: "fc-amazon-cloudwatch-4", serviceId: "amazon-cloudwatch", domain: 3, category: "Management and Governance", front: "Taglish: Ano ang ginagawa ng CloudWatch?", back: "Sinusubaybayan nito ang mga metrics at logs ng iyong AWS resources, at puwede kang bigyan ng alerto kapag lumagpas sa itinakdang threshold." },
  { id: "fc-amazon-cloudwatch-5", serviceId: "amazon-cloudwatch", domain: 3, category: "Management and Governance", front: "CloudWatch's role in the CloudWatch/CloudTrail/Config trio?", back: "Monitoring — metrics, logs, alarms, dashboards." },

  { id: "fc-aws-cloudtrail-1", serviceId: "aws-cloudtrail", domain: 1, category: "Management and Governance", front: "What question does CloudTrail answer?", back: "Who did what, when, and from where — a record of API activity." },
  { id: "fc-aws-cloudtrail-2", serviceId: "aws-cloudtrail", domain: 1, category: "Management and Governance", front: "Where should you look to find who changed an S3 bucket policy?", back: "CloudTrail event history." },
  { id: "fc-aws-cloudtrail-3", serviceId: "aws-cloudtrail", domain: 1, category: "Management and Governance", front: "CloudTrail's role in the CloudWatch/CloudTrail/Config trio?", back: "Auditing — API call/activity history." },
  { id: "fc-aws-cloudtrail-4", serviceId: "aws-cloudtrail", domain: 1, category: "Management and Governance", front: "Taglish: Ano ang tanong na sinasagot ng CloudTrail?", back: "Sino ang gumawa ng aksyon, kailan, at saan galing — parang security camera footage ng lahat ng API calls." },
  { id: "fc-aws-cloudtrail-5", serviceId: "aws-cloudtrail", domain: 1, category: "Management and Governance", front: "Does CloudTrail track resource metrics like CPU?", back: "No — that's CloudWatch's job." },

  { id: "fc-aws-config-1", serviceId: "aws-config", domain: 1, category: "Management and Governance", front: "What does AWS Config track?", back: "Configuration history and compliance state of resources over time." },
  { id: "fc-aws-config-2", serviceId: "aws-config", domain: 1, category: "Management and Governance", front: "Config's role in the CloudWatch/CloudTrail/Config trio?", back: "Compliance — configuration state and history over time." },
  { id: "fc-aws-config-3", serviceId: "aws-config", domain: 1, category: "Management and Governance", front: "How would you catch a public S3 bucket automatically?", back: "An AWS Config rule checking for public S3 buckets." },

  { id: "fc-aws-systems-manager-1", serviceId: "aws-systems-manager", domain: 2, category: "Management and Governance", front: "How do you SSH-free connect to an EC2 instance?", back: "Systems Manager Session Manager." },
  { id: "fc-aws-systems-manager-2", serviceId: "aws-systems-manager", domain: 3, category: "Management and Governance", front: "Where do you securely store config values/secrets referenced by other services?", back: "Systems Manager Parameter Store." },
  { id: "fc-aws-systems-manager-3", serviceId: "aws-systems-manager", domain: 2, category: "Management and Governance", front: "What automates fleet-wide OS patching on a schedule?", back: "Systems Manager Patch Manager with Maintenance Windows." },

  { id: "fc-aws-xray-1", serviceId: "aws-xray", domain: 3, category: "Developer Tools", front: "What does AWS X-Ray provide?", back: "Distributed request tracing across microservices to find latency bottlenecks and errors." },
  { id: "fc-aws-xray-2", serviceId: "aws-xray", domain: 3, category: "Developer Tools", front: "When would you reach for X-Ray?", back: "When you can't tell which of several microservices is causing latency or errors in a request." },
  { id: "fc-aws-xray-3", serviceId: "aws-xray", domain: 3, category: "Developer Tools", front: "Taglish: Bakit kailangan ang X-Ray sa microservices?", back: "Kasi hindi mo alam kung aling service sa maraming service ang nagpapabagal — ipinapakita ito ni X-Ray sa isang visual trace." },

  { id: "fc-aws-trusted-advisor-1", serviceId: "aws-trusted-advisor", domain: 4, category: "Management and Governance", front: "What does Trusted Advisor check?", back: "Cost, security, performance, fault tolerance, and service limits — automated best-practice checks." },
  { id: "fc-aws-trusted-advisor-2", serviceId: "aws-trusted-advisor", domain: 4, category: "Management and Governance", front: "Where would you find idle/underutilized EC2 instances flagged automatically?", back: "AWS Trusted Advisor's cost-optimization checks." },
  { id: "fc-aws-trusted-advisor-3", serviceId: "aws-trusted-advisor", domain: 4, category: "Management and Governance", front: "What's a good first stop for a fast, broad account health check?", back: "AWS Trusted Advisor." },

  { id: "fc-aws-compute-optimizer-1", serviceId: "aws-compute-optimizer", domain: 4, category: "Management and Governance", front: "What does AWS Compute Optimizer do?", back: "Uses machine learning to recommend right-sized EC2, EBS, and Lambda configurations." },
  { id: "fc-aws-compute-optimizer-2", serviceId: "aws-compute-optimizer", domain: 4, category: "Management and Governance", front: "When should you reach for Compute Optimizer?", back: "When you suspect resources are oversized/undersized and want data-driven rightsizing recommendations." },

  { id: "fc-aws-cloudformation-1", serviceId: "aws-cloudformation", domain: 2, category: "Management and Governance", front: "What is AWS CloudFormation?", back: "A service to provision AWS infrastructure from declarative JSON/YAML templates (infrastructure as code)." },
  { id: "fc-aws-cloudformation-2", serviceId: "aws-cloudformation", domain: 2, category: "Management and Governance", front: "What is a deployed collection of CloudFormation resources called?", back: "A stack." },
  { id: "fc-aws-cloudformation-3", serviceId: "aws-cloudformation", domain: 4, category: "Management and Governance", front: "Why does CloudFormation help disaster recovery?", back: "Rebuildable infrastructure-as-code can recreate an environment consistently in a new Region/account." },
  { id: "fc-aws-cloudformation-4", serviceId: "aws-cloudformation", domain: 2, category: "Management and Governance", front: "Taglish: Bakit maganda gumamit ng CloudFormation?", back: "Kasi consistent at paulit-ulit mo magagawa ang parehong infrastructure, hindi manual clicking sa console kada environment." },
  { id: "fc-aws-cloudformation-5", serviceId: "aws-cloudformation", domain: 2, category: "Management and Governance", front: "What happens on a failed CloudFormation deployment by default?", back: "It automatically rolls back to the previous known-good state." },

  { id: "fc-aws-organizations-control-tower-service-catalog-1", serviceId: "aws-organizations-control-tower-service-catalog", domain: 1, category: "Management and Governance", front: "What does AWS Organizations provide?", back: "Centralized multi-account management, consolidated billing, and guardrails via SCPs." },
  { id: "fc-aws-organizations-control-tower-service-catalog-2", serviceId: "aws-organizations-control-tower-service-catalog", domain: 1, category: "Management and Governance", front: "What do SCPs do?", back: "Set the maximum permissions ceiling for accounts/OUs — a guardrail layered above IAM." },
  { id: "fc-aws-organizations-control-tower-service-catalog-3", serviceId: "aws-organizations-control-tower-service-catalog", domain: 1, category: "Management and Governance", front: "What automates setting up a governed multi-account landing zone?", back: "AWS Control Tower." },
  { id: "fc-aws-organizations-control-tower-service-catalog-4", serviceId: "aws-organizations-control-tower-service-catalog", domain: 1, category: "Management and Governance", front: "What lets developers self-service-provision only pre-approved architectures?", back: "AWS Service Catalog." },
  { id: "fc-aws-organizations-control-tower-service-catalog-5", serviceId: "aws-organizations-control-tower-service-catalog", domain: 1, category: "Management and Governance", front: "Taglish: Ano ang pinagkaiba ng Organizations, Control Tower, at Service Catalog?", back: "Organizations = istraktura ng maraming accounts + guardrails (SCPs). Control Tower = automated setup ng landing zone. Service Catalog = self-service na pero paapproved lang na products." },

  { id: "fc-aws-dms-1", serviceId: "aws-dms", domain: 3, category: "Migration and Transfer", front: "What is AWS DMS for?", back: "Migrating databases to/within AWS with minimal downtime, via ongoing replication." },
  { id: "fc-aws-dms-2", serviceId: "aws-dms", domain: 3, category: "Migration and Transfer", front: "Homogeneous vs heterogeneous migration?", back: "Homogeneous = same engine on both sides. Heterogeneous = different engines, usually needs the Schema Conversion Tool." },
  { id: "fc-aws-dms-3", serviceId: "aws-dms", domain: 3, category: "Migration and Transfer", front: "What DMS feature enables minimal-downtime cutover?", back: "Change Data Capture (CDC) — ongoing replication of changes until cutover." },
  { id: "fc-aws-dms-4", serviceId: "aws-dms", domain: 3, category: "Migration and Transfer", front: "What tool pairs with DMS for schema translation between different engines?", back: "AWS Schema Conversion Tool (SCT)." },
  { id: "fc-aws-dms-5", serviceId: "aws-dms", domain: 3, category: "Migration and Transfer", front: "Taglish: Kailan gagamit ng DMS?", back: "Kapag ililipat mo ang database papunta o papalabas ng AWS, gusto mong konti lang ang downtime." },

  { id: "fc-aws-datasync-1", serviceId: "aws-datasync", domain: 3, category: "Migration and Transfer", front: "What is AWS DataSync for?", back: "Fast, automated, online transfer of large file/object datasets between on-premises and AWS (or between AWS storage services)." },
  { id: "fc-aws-datasync-2", serviceId: "aws-datasync", domain: 3, category: "Migration and Transfer", front: "DataSync vs Snow Family — how do you choose?", back: "DataSync: online transfer with good bandwidth. Snow Family: offline/physical when bandwidth is limited or absent." },
  { id: "fc-aws-datasync-3", serviceId: "aws-datasync", domain: 3, category: "Migration and Transfer", front: "Can DataSync move data between two AWS storage services?", back: "Yes — e.g. Amazon EFS to Amazon FSx." },
  { id: "fc-aws-datasync-4", serviceId: "aws-datasync", domain: 4, category: "Migration and Transfer", front: "Does DataSync validate data integrity during transfer?", back: "Yes — it's built in, unlike a plain manual copy script." },
  { id: "fc-aws-datasync-5", serviceId: "aws-datasync", domain: 3, category: "Migration and Transfer", front: "Taglish: Kailan DataSync at kailan Snowball?", back: "DataSync kapag maganda ang internet connection mo. Snowball kapag napakalaki ng data at limitado o walang magandang internet." },

  { id: "fc-aws-snow-family-1", serviceId: "aws-snow-family", domain: 3, category: "Migration and Transfer", front: "What is the Snow Family for?", back: "Physical, offline data transfer or edge computing when network transfer isn't practical." },
  { id: "fc-aws-snow-family-2", serviceId: "aws-snow-family", domain: 4, category: "Migration and Transfer", front: "What Snow Family device includes onboard compute for disconnected environments?", back: "Snowball Edge." },
  { id: "fc-aws-snow-family-3", serviceId: "aws-snow-family", domain: 3, category: "Migration and Transfer", front: "What Snow Family option handles exabyte-scale migrations?", back: "AWS Snowmobile." },

  { id: "fc-aws-transfer-family-1", serviceId: "aws-transfer-family", domain: 3, category: "Migration and Transfer", front: "What does AWS Transfer Family provide?", back: "Managed SFTP/FTPS/FTP endpoints backed by S3 or EFS." },
  { id: "fc-aws-transfer-family-2", serviceId: "aws-transfer-family", domain: 3, category: "Migration and Transfer", front: "When would you use Transfer Family?", back: "When a partner needs SFTP access but you want the data to actually land in S3." },

  { id: "fc-aws-application-migration-service-1", serviceId: "aws-application-migration-service", domain: 2, category: "Migration and Transfer", front: "What is AWS Application Migration Service (MGN)?", back: "Lift-and-shift rehosting of physical/virtual/cloud servers into AWS with minimal changes, via continuous replication." },
  { id: "fc-aws-application-migration-service-2", serviceId: "aws-application-migration-service", domain: 2, category: "Migration and Transfer", front: "When would you use MGN?", back: "Migrating many servers to EC2 quickly with minimal re-architecture." },
];
