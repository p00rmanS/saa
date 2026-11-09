import type { Flashcard, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const ccpRefresherQuestions: Question[] = [
  // ---- Cloud fundamentals ----
  mk(
    "cloud-computing-fundamentals-ccp", 1, 4, "easy",
    "A startup wants to avoid buying servers for a product that may or may not succeed, and prefers to pay only for what it uses. Which cloud benefit is this?",
    [
      "Trading upfront capital expense for variable expense",
      "Increasing hardware ownership",
      "Eliminating the need for any security work",
      "Guaranteeing zero downtime",
    ],
    "a",
    "Cloud lets you replace a large upfront purchase (CapEx) with a variable, pay-for-use bill (OpEx).",
    [
      "This is the first of the six advantages.",
      "The cloud reduces ownership, it does not increase it.",
      "Security remains a shared responsibility.",
      "No provider guarantees zero downtime.",
    ],
    "CapEx to OpEx", ["CapEx", "OpEx"]
  ),
  mk(
    "cloud-computing-fundamentals-ccp", 2, 3, "medium",
    "A web shop automatically adds servers during a sale and removes them afterwards so it never pays for idle capacity. Which term describes this?",
    ["Fault tolerance", "Elasticity", "Durability", "Data residency"],
    "b",
    "Elasticity is automatically matching capacity to demand, adding and removing resources as load changes.",
    [
      "Fault tolerance is continuing to work when a component fails.",
      "Elasticity is automatic scale out and in with demand.",
      "Durability is about not losing stored data.",
      "Data residency is where data is stored.",
    ],
    "Automatic add and remove -> elasticity", ["elasticity"]
  ),
  mk(
    "cloud-computing-fundamentals-ccp", 3, 3, "medium",
    "A company runs virtual machines on Amazon EC2 and is responsible for patching the guest operating system. Which service model is this?",
    ["SaaS", "PaaS", "IaaS", "Function as a Service only"],
    "c",
    "With IaaS you manage the operating system and everything above it, while the provider manages the physical infrastructure.",
    [
      "SaaS delivers a finished application and you manage nothing underneath.",
      "PaaS hides the operating system so you manage only the app and data.",
      "EC2 is IaaS: you manage the OS and up.",
      "Serverless functions do not involve patching a guest OS.",
    ],
    "You patch the OS -> IaaS", ["IaaS", "EC2"]
  ),

  // ---- First steps ----
  mk(
    "aws-account-first-steps-root-user-mfa", 1, 1, "easy",
    "A company has just created an AWS account. What is the best way to protect the root user?",
    [
      "Create access keys for the root user and store them in a script",
      "Enable MFA on the root user and use it only for the few tasks that require it",
      "Share the root password with the whole team",
      "Disable the root user in IAM",
    ],
    "b",
    "Enable multi-factor authentication, avoid access keys and use the root user rarely.",
    [
      "Root access keys are a serious risk and should not be created.",
      "MFA plus rare use is the recommended practice.",
      "Sharing a powerful credential defeats accountability.",
      "The root user cannot be disabled in IAM.",
    ],
    "Root user -> MFA, no keys, rare use", ["root user", "MFA"]
  ),
  mk(
    "aws-account-first-steps-root-user-mfa", 2, 1, "medium",
    "Which task can only be performed by the account root user? (Select TWO.)",
    [
      "Closing the AWS account",
      "Launching an EC2 instance",
      "Changing the AWS Support plan",
      "Creating an S3 bucket",
      "Creating an IAM role",
    ],
    "ac",
    "Closing the account and changing the support plan are among the tasks that require the root user. Normal service tasks use IAM identities.",
    [
      "Correct. Closing the account needs the root user.",
      "Any authorised IAM identity can launch instances.",
      "Correct. Changing the support plan needs the root user.",
      "IAM identities can create buckets.",
      "IAM administrators can create roles.",
    ],
    "Few root-only tasks: close account, change support plan", ["root user"]
  ),
  mk(
    "aws-account-first-steps-root-user-mfa", 3, 1, "medium",
    "A developer wants to run AWS CLI commands from a browser without installing anything or configuring access keys. Which service helps?",
    ["AWS CloudShell", "AWS Outposts", "AWS Snowball", "AWS Direct Connect"],
    "a",
    "CloudShell is a browser-based shell that is already authenticated with the credentials you used to sign in to the console.",
    [
      "CloudShell provides a ready CLI environment in the console.",
      "Outposts is AWS infrastructure on premises.",
      "Snowball is an offline data transfer device.",
      "Direct Connect is a private network link.",
    ],
    "Browser shell with CLI -> CloudShell", ["CloudShell", "CLI"]
  ),

  // ---- Pricing ----
  mk(
    "aws-pricing-fundamentals-free-tier-tco", 1, 4, "easy",
    "A company wants to estimate the monthly cost of a new architecture before building it. Which tool should it use?",
    ["AWS Cost Explorer", "AWS Pricing Calculator", "AWS CloudTrail", "AWS Config"],
    "b",
    "The AWS Pricing Calculator models the cost of a planned workload. Cost Explorer analyses existing spend.",
    [
      "Cost Explorer reviews past and current usage.",
      "Pricing Calculator estimates cost before you build.",
      "CloudTrail records API activity.",
      "Config tracks resource configuration.",
    ],
    "Estimate before building -> Pricing Calculator", ["Pricing Calculator"]
  ),
  mk(
    "aws-pricing-fundamentals-free-tier-tco", 2, 4, "medium",
    "Which data transfer is generally free of charge on AWS?",
    [
      "Data transferred out to the internet",
      "Data transferred between two AWS Regions",
      "Data transferred in to AWS from the internet",
      "Data transferred out of AWS to a corporate data centre",
    ],
    "c",
    "Inbound data from the internet is generally free. Outbound to the internet and between Regions is charged.",
    [
      "Outbound internet transfer is charged.",
      "Cross-Region transfer is charged.",
      "Inbound data transfer is generally free.",
      "Outbound transfer to a data centre is charged, although Direct Connect has its own lower rate.",
    ],
    "In is free, out is charged", ["data transfer"]
  ),
  mk(
    "aws-pricing-fundamentals-free-tier-tco", 3, 4, "medium",
    "A company wants a business case comparing the full cost of staying on premises, including hardware, power, space and staff, with moving to AWS. What is this analysis called?",
    ["Total cost of ownership (TCO)", "Consolidated billing", "Reserved capacity planning", "Cost allocation tagging"],
    "a",
    "TCO compares the full cost of running on premises with running on AWS, and AWS Migration Evaluator helps build it.",
    [
      "TCO includes all direct and indirect costs.",
      "Consolidated billing combines accounts into one bill.",
      "Capacity planning is about commitments, not the business comparison.",
      "Tagging attributes cost to owners.",
    ],
    "On-premises vs AWS full cost -> TCO", ["TCO", "Migration Evaluator"]
  ),

  // ---- CAF ----
  mk(
    "cloud-adoption-framework-ccp", 1, 4, "medium",
    "A company finds that its staff lack cloud skills and that the culture resists change. Which AWS CAF perspective addresses this?",
    ["Platform", "People", "Security", "Operations"],
    "b",
    "The People perspective covers skills, culture and organisational change.",
    [
      "Platform covers building the cloud environment.",
      "People focuses on skills, culture and change.",
      "Security covers protecting data and workloads.",
      "Operations covers running services.",
    ],
    "Skills and culture -> People", ["CAF", "People perspective"]
  ),
  mk(
    "cloud-adoption-framework-ccp", 2, 4, "medium",
    "A company moves an application to AWS unchanged, using the same operating system and software on EC2 instances, to finish quickly. Which migration strategy is this?",
    ["Refactor", "Repurchase", "Rehost", "Retire"],
    "c",
    "Rehost, often called lift and shift, moves the application as it is with no changes.",
    [
      "Refactor re-architects the application to be cloud native.",
      "Repurchase replaces it with a different product, typically SaaS.",
      "Rehost is lift and shift.",
      "Retire switches the application off.",
    ],
    "Lift and shift -> rehost", ["rehost", "lift and shift"]
  ),
  mk(
    "cloud-adoption-framework-ccp", 3, 4, "medium",
    "Which statement about the AWS Cloud Adoption Framework is correct?",
    [
      "It is a service that automatically migrates servers",
      "It groups guidance into six perspectives to help plan cloud adoption",
      "It reviews the design of a single workload against six pillars",
      "It replaces the shared responsibility model",
    ],
    "b",
    "CAF is a planning framework with six perspectives. The Well-Architected Framework reviews a workload against pillars.",
    [
      "CAF is guidance, not a migration service.",
      "Six perspectives: Business, People, Governance, Platform, Security, Operations.",
      "That describes the Well-Architected Framework.",
      "CAF does not replace the shared responsibility model.",
    ],
    "CAF = programme planning, Well-Architected = workload review", ["CAF"]
  ),

  // ---- Regions and extensions ----
  mk(
    "regions-edge-local-zones-wavelength-outposts", 1, 1, "easy",
    "A company must keep customer data within a specific country because of legal requirements. What should it consider first when choosing a Region?",
    ["The lowest price", "Compliance and data residency", "The newest services", "The number of edge locations"],
    "b",
    "Legal and data residency requirements come first, since data stays in the chosen Region unless it is moved.",
    [
      "Price matters only among Regions that meet the legal rules.",
      "Compliance and data residency are the first filter.",
      "New services are a secondary factor.",
      "Edge locations do not decide where data is stored.",
    ],
    "Law first, then latency, services, price", ["data residency"]
  ),
  mk(
    "regions-edge-local-zones-wavelength-outposts", 2, 2, "medium",
    "A factory must run AWS services on its own premises for single-digit millisecond access to local machines, with AWS managing the hardware. Which option fits?",
    ["AWS Wavelength", "AWS Local Zones", "AWS Outposts", "Amazon CloudFront"],
    "c",
    "Outposts delivers AWS-managed infrastructure and services into your own facility.",
    [
      "Wavelength is inside telecom 5G networks.",
      "Local Zones are AWS-operated metro-area extensions, not on your premises.",
      "Outposts runs AWS on site.",
      "CloudFront caches content at edge locations.",
    ],
    "Run AWS on site -> Outposts", ["Outposts"]
  ),
  mk(
    "regions-edge-local-zones-wavelength-outposts", 3, 3, "medium",
    "A mobile game needs the lowest possible latency for players on a carrier's 5G network. Which AWS offering is designed for this?",
    ["AWS Wavelength", "AWS Snowball", "AWS Backup", "AWS Direct Connect"],
    "a",
    "Wavelength embeds AWS compute and storage in telecom providers' 5G networks for ultra-low latency to mobile devices.",
    [
      "Wavelength is for 5G edge applications.",
      "Snowball moves data offline.",
      "Backup protects data.",
      "Direct Connect links a data centre to AWS.",
    ],
    "5G mobile -> Wavelength", ["Wavelength", "5G"]
  ),

  // ---- Service map ----
  mk(
    "aws-service-map-quick-reference", 1, 3, "easy",
    "A team needs to record which user called which AWS API and when, for auditing. Which service does this?",
    ["Amazon CloudWatch", "AWS CloudTrail", "AWS Config", "Amazon Inspector"],
    "b",
    "CloudTrail records API calls and account activity. CloudWatch collects metrics and logs.",
    [
      "CloudWatch monitors metrics, logs and alarms.",
      "CloudTrail logs who did what through the API.",
      "Config tracks resource configuration changes.",
      "Inspector scans for vulnerabilities.",
    ],
    "Who called the API -> CloudTrail", ["CloudTrail"]
  ),
  mk(
    "aws-service-map-quick-reference", 2, 2, "medium",
    "An application must send one notification to many subscribers at the same time, such as email, SMS and several queues. Which service fits?",
    ["Amazon SQS", "Amazon SNS", "AWS Step Functions", "Amazon EBS"],
    "b",
    "SNS is publish-subscribe and delivers one message to many subscribers. SQS is a queue for a consumer group.",
    [
      "SQS holds messages for consumers to pull.",
      "SNS fans out to many subscribers.",
      "Step Functions orchestrates workflows.",
      "EBS is block storage.",
    ],
    "One to many -> SNS", ["SNS", "fan-out"]
  ),
  mk(
    "aws-service-map-quick-reference", 3, 3, "medium",
    "Several Linux EC2 instances in different Availability Zones need to read and write the same files at the same time. Which storage fits?",
    ["Amazon EBS", "Amazon EFS", "EC2 instance store", "Amazon S3 Glacier"],
    "b",
    "EFS is a shared, elastic Linux file system that many instances across AZs can mount at once.",
    [
      "EBS attaches to one instance in one AZ at a time.",
      "EFS is shared file storage across instances and AZs.",
      "Instance store is local and not shared.",
      "Glacier is archive storage.",
    ],
    "Shared Linux files -> EFS", ["EFS"]
  ),
];

export const ccpRefresherFlashcards: Flashcard[] = [
  fc("cloud-computing-fundamentals-ccp", 1, 4, "Orientation", "Name the six advantages of cloud computing.", "Variable instead of upfront expense, economies of scale, stop guessing capacity, speed and agility, no data centre upkeep, go global in minutes."),
  fc("cloud-computing-fundamentals-ccp", 2, 3, "Orientation", "Elasticity vs scalability?", "Scalability is the ability to grow to handle more load. Elasticity is automatically adding and removing capacity to match demand."),
  fc("cloud-computing-fundamentals-ccp", 3, 3, "Orientation", "IaaS, PaaS, SaaS: what do you manage?", "IaaS: OS and up (EC2). PaaS: app and data (Elastic Beanstalk). SaaS: just use the application."),
  fc("aws-account-first-steps-root-user-mfa", 1, 1, "Orientation", "How do you protect the root user?", "Enable MFA, create no access keys, use a strong password and use it only for the few tasks that require it."),
  fc("aws-account-first-steps-root-user-mfa", 2, 1, "Orientation", "Two tasks only the root user can do?", "Close the AWS account and change the AWS Support plan."),
  fc("aws-account-first-steps-root-user-mfa", 3, 1, "Orientation", "What is AWS CloudShell?", "A browser-based shell with the CLI preinstalled, authenticated as the console user."),
  fc("aws-pricing-fundamentals-free-tier-tco", 1, 4, "Orientation", "Pricing Calculator vs Cost Explorer?", "Pricing Calculator estimates a planned workload. Cost Explorer analyses and forecasts actual spend."),
  fc("aws-pricing-fundamentals-free-tier-tco", 2, 4, "Orientation", "Which data transfer is free?", "Data into AWS from the internet. Data out to the internet and between Regions is charged."),
  fc("aws-pricing-fundamentals-free-tier-tco", 3, 4, "Orientation", "What is TCO?", "Total cost of ownership: the full cost of running on premises, including hardware, power, space and staff, compared with AWS."),
  fc("cloud-adoption-framework-ccp", 1, 4, "Orientation", "Six CAF perspectives?", "Business, People, Governance (business) and Platform, Security, Operations (technical)."),
  fc("cloud-adoption-framework-ccp", 2, 4, "Orientation", "The seven Rs of migration?", "Retire, retain, rehost, relocate, repurchase, replatform, refactor."),
  fc("cloud-adoption-framework-ccp", 3, 4, "Orientation", "CAF vs Well-Architected?", "CAF plans the adoption programme. Well-Architected reviews a workload against six pillars."),
  fc("regions-edge-local-zones-wavelength-outposts", 1, 1, "Orientation", "Four factors for choosing a Region?", "Compliance and data residency, latency, service availability, price."),
  fc("regions-edge-local-zones-wavelength-outposts", 2, 2, "Orientation", "Outposts in one line?", "AWS-managed infrastructure and services running in your own data centre."),
  fc("regions-edge-local-zones-wavelength-outposts", 3, 3, "Orientation", "Wavelength vs Local Zones?", "Wavelength sits inside telecom 5G networks. Local Zones extend a Region into a metro area."),
  fc("aws-service-map-quick-reference", 1, 3, "Orientation", "CloudWatch vs CloudTrail?", "CloudWatch: metrics, logs, alarms. CloudTrail: who called which API."),
  fc("aws-service-map-quick-reference", 2, 2, "Orientation", "SQS vs SNS?", "SQS is a queue consumers pull from. SNS publishes one message to many subscribers."),
  fc("aws-service-map-quick-reference", 3, 3, "Orientation", "EBS vs EFS?", "EBS is block storage for one instance in one AZ. EFS is shared Linux file storage across instances and AZs."),
];
