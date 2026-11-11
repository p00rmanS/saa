import type { Flashcard, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const deepDiveQQuestions: Question[] = [
  // ---- EKS operations ----
  mk(
    "eks-operations-scaling-networking-irsa", 1, 1, "medium",
    "Pods in an EKS cluster need to read from one S3 bucket, and the security team does not want every pod on a node to inherit that access through the node's IAM role. What should they use?",
    [
      "Attach the S3 policy to the node IAM role",
      "IAM roles for service accounts (IRSA) or EKS Pod Identity, scoped to the pod's service account",
      "Store access keys in a Kubernetes secret",
      "Make the bucket public",
    ],
    "b",
    "IRSA and EKS Pod Identity give each pod a role through its service account, so only the intended pods receive the permissions.",
    [
      "Every pod on the node would inherit the permissions.",
      "Pod-level roles meet least privilege.",
      "Stored access keys are long-lived credentials that can leak.",
      "A public bucket is the opposite of the requirement.",
    ],
    "Per-pod permissions -> IRSA or Pod Identity", ["IRSA", "Pod Identity"]
  ),
  mk(
    "eks-operations-scaling-networking-irsa", 2, 3, "medium",
    "An EKS workload's traffic grows and the Horizontal Pod Autoscaler adds pods, but new pods stay Pending because the cluster has no free capacity. Which addition fixes this?",
    [
      "A larger load balancer",
      "Karpenter or the Cluster Autoscaler to add nodes when pods cannot be scheduled",
      "More Route 53 records",
      "An additional NAT gateway",
    ],
    "b",
    "HPA scales pods, but nodes must also scale. Karpenter or the Cluster Autoscaler launches nodes when pods are unschedulable.",
    [
      "Load balancer size does not create node capacity.",
      "Node autoscaling provides capacity for pending pods.",
      "DNS records do not add compute.",
      "A NAT gateway does not add nodes.",
    ],
    "Pending pods -> scale nodes", ["Karpenter", "Cluster Autoscaler"]
  ),
  mk(
    "eks-operations-scaling-networking-irsa", 3, 3, "hard",
    "A large EKS cluster using the VPC CNI fails to schedule new pods even though CPU and memory are available. Nodes report no more IP addresses. What is the most likely cause and fix?",
    [
      "The control plane is overloaded, so upgrade the Kubernetes version",
      "The subnets are too small for the number of pod IP addresses, so use larger subnets or add secondary CIDR ranges",
      "Security groups block all pods",
      "The load balancer controller is missing",
    ],
    "b",
    "With the VPC CNI each pod receives a VPC IP address, so small subnets run out of addresses before CPU or memory run out.",
    [
      "The control plane does not assign pod IP addresses.",
      "IP exhaustion in small subnets matches the symptom and larger or additional CIDR ranges fix it.",
      "Blocked traffic does not stop scheduling.",
      "The controller creates load balancers, not pod IPs.",
    ],
    "VPC CNI uses VPC IPs, so plan subnet size", ["VPC CNI", "IP exhaustion"]
  ),

  // ---- AI/ML selection ----
  mk(
    "ai-ml-service-selection-decision-guide", 1, 3, "easy",
    "A company wants to extract text, form fields and tables from scanned invoices without building a model. Which service fits?",
    ["Amazon Rekognition", "Amazon Textract", "Amazon Transcribe", "Amazon Polly"],
    "b",
    "Textract extracts text, forms and tables from scanned documents.",
    [
      "Rekognition analyses images and video for objects and faces.",
      "Textract is designed for document text and structured data.",
      "Transcribe converts speech to text.",
      "Polly converts text to speech.",
    ],
    "Scanned forms and tables -> Textract", ["Textract"]
  ),
  mk(
    "ai-ml-service-selection-decision-guide", 2, 3, "medium",
    "A company wants to add document summarisation and question answering over its internal documents, with the least infrastructure to manage. Which service should it consider first?",
    [
      "Train a language model from scratch on EC2 instances",
      "Amazon Bedrock with a foundation model and a knowledge base",
      "Amazon Polly",
      "Amazon Forecast",
    ],
    "b",
    "Bedrock offers managed access to foundation models through an API and supports knowledge bases that ground answers in your documents.",
    [
      "Training from scratch needs large infrastructure and expertise.",
      "Bedrock is the managed generative AI option.",
      "Polly produces speech from text.",
      "Forecast does time-series forecasting and is closed to new customers.",
    ],
    "Generative AI, least management -> Bedrock", ["Bedrock", "generative AI"]
  ),
  mk(
    "ai-ml-service-selection-decision-guide", 3, 3, "medium",
    "A data science team must train a custom model on proprietary data that no prebuilt AI service covers, and needs managed notebooks, training and deployment. Which service fits?",
    ["Amazon Comprehend", "Amazon SageMaker", "Amazon Lex", "Amazon Translate"],
    "b",
    "SageMaker provides managed tooling for building, training and deploying custom models.",
    [
      "Comprehend is a prebuilt text analysis service.",
      "SageMaker supports custom model development end to end.",
      "Lex builds conversational interfaces.",
      "Translate translates text between languages.",
    ],
    "Custom model -> SageMaker", ["SageMaker"]
  ),

  // ---- Serverless patterns ----
  mk(
    "serverless-architecture-patterns-api-queue-events", 1, 2, "medium",
    "A web API accepts requests for a report that takes about ten minutes to generate. Calls through API Gateway time out. What is the best design?",
    [
      "Increase the Lambda memory only",
      "Return a job ID immediately, place the work on an SQS queue for a worker, and let the client poll or receive a notification",
      "Run the report in the API Gateway integration synchronously",
      "Use a larger load balancer",
    ],
    "b",
    "API Gateway integrations time out after about 29 seconds by default, so long work should be asynchronous with a queue and a way to fetch the result.",
    [
      "Memory does not change the integration timeout.",
      "An asynchronous design with a queue avoids the timeout.",
      "A ten-minute synchronous call exceeds the default timeout.",
      "A load balancer does not remove the timeout in this design.",
    ],
    "Long job behind an API -> asynchronous with a queue", ["asynchronous", "SQS", "API Gateway"]
  ),
  mk(
    "serverless-architecture-patterns-api-queue-events", 2, 2, "hard",
    "An order event must trigger inventory, billing and email processing independently, and one failing consumer must not block the others. Which design meets this?",
    [
      "One Lambda function that calls all three in sequence",
      "Publish to an SNS topic with a separate SQS queue and consumer for each process",
      "A single shared SQS queue read by all three processors",
      "A cron job that polls a database table",
    ],
    "b",
    "SNS fan-out to separate queues lets each consumer process the event independently with its own retries and DLQ.",
    [
      "A single sequence couples the processes and one failure blocks the rest.",
      "SNS to SQS fan-out isolates the consumers.",
      "Competing consumers on one queue would each take different messages, not all see the event.",
      "Polling adds delay and operational work.",
    ],
    "One event, many independent consumers -> SNS fan-out to SQS", ["fan-out", "SNS", "SQS"]
  ),
  mk(
    "serverless-architecture-patterns-api-queue-events", 3, 2, "hard",
    "A Lambda function reads batches of 10 messages from SQS. One malformed message keeps failing and the entire batch is retried repeatedly. Which two changes best help? (Select TWO.)",
    [
      "Enable partial batch response so only failed messages are retried",
      "Configure a dead-letter queue with a maximum receive count",
      "Increase the function timeout to the maximum",
      "Switch the queue to SNS",
      "Disable the event source mapping",
    ],
    "ab",
    "Partial batch response retries only the failed messages, and a DLQ with a max receive count moves a poison message aside after repeated failures.",
    [
      "Correct. Only failed items return to the queue.",
      "Correct. A DLQ isolates the poison message.",
      "A longer timeout does not fix a malformed message.",
      "SNS does not provide queue semantics for this case.",
      "Disabling the mapping stops all processing.",
    ],
    "Poison message -> partial batch response and DLQ", ["DLQ", "partial batch response"]
  ),

  // ---- SES vs SNS ----
  mk(
    "ses-sns-email-notification-selection", 1, 2, "medium",
    "An online store must send order receipts and password-reset emails to customers from its own domain, and track bounces. Which service fits?",
    ["Amazon SNS email subscriptions", "Amazon SES", "Amazon SQS", "AWS Step Functions"],
    "b",
    "SES sends transactional and bulk email from your verified domain and publishes bounce and complaint events.",
    [
      "SNS email is for notifications to confirmed subscribers, not custom customer mail.",
      "SES is built for application email to customers.",
      "SQS queues messages and does not send email.",
      "Step Functions orchestrates workflows.",
    ],
    "App email to customers -> SES", ["SES", "transactional email"]
  ),
  mk(
    "ses-sns-email-notification-selection", 2, 2, "medium",
    "A new AWS account can send email through SES only to verified addresses. What is the reason and the fix?",
    [
      "The account is in the SES sandbox, so request production access",
      "Email is disabled in the Region, so switch to SNS",
      "SES requires a VPN",
      "The IAM user lacks MFA",
    ],
    "a",
    "New SES accounts start in a sandbox with sending limits and recipient restrictions until you request production access.",
    [
      "The sandbox explains the symptom, and production access lifts it.",
      "SES is not disabled by Region in this way.",
      "No VPN is required.",
      "MFA does not control SES sending limits.",
    ],
    "SES only sends to verified addresses -> sandbox", ["SES sandbox"]
  ),
  mk(
    "ses-sns-email-notification-selection", 3, 2, "hard",
    "A marketing sender notices a rising complaint rate and risks losing its sending reputation. What should it implement?",
    [
      "Publish bounce and complaint events through an SES configuration set to SNS and remove those addresses from the list",
      "Switch to a larger EC2 mail server",
      "Send more messages to dilute the rate",
      "Disable DKIM",
    ],
    "a",
    "Handling bounces and complaints by suppressing bad addresses protects sender reputation.",
    [
      "Event notifications plus list cleaning address the cause.",
      "Self-run mail servers add work and do not fix reputation.",
      "Sending more to bad addresses worsens it.",
      "DKIM improves trust, and disabling it would hurt.",
    ],
    "Protect reputation -> handle bounces and complaints", ["bounce", "complaint"]
  ),

  // ---- Access denied playbook ----
  mk(
    "iam-access-denied-troubleshooting-playbook", 1, 1, "hard",
    "A user has AdministratorAccess in the account, yet cannot call ec2:RunInstances in eu-west-3. No policy on the user mentions that Region. What is the most likely cause?",
    [
      "A permission boundary is missing",
      "An SCP on the account's OU denies actions outside approved Regions",
      "The user needs MFA to call EC2",
      "EC2 is a global service",
    ],
    "b",
    "SCPs limit what the account can do even for administrators, and a Region-restricting SCP produces exactly this symptom.",
    [
      "A missing boundary does not deny anything.",
      "An SCP deny on the Region overrides the account's allows.",
      "MFA is not a built-in requirement for EC2 calls.",
      "EC2 is a Regional service.",
    ],
    "Admin still denied -> look for an SCP or explicit deny", ["SCP", "explicit deny"]
  ),
  mk(
    "iam-access-denied-troubleshooting-playbook", 2, 1, "hard",
    "A role in Account B has an identity policy allowing s3:GetObject on a bucket in Account A, but requests are denied. What is missing?",
    [
      "A bucket policy in Account A that allows the role or Account B",
      "A larger EC2 instance",
      "An S3 Transfer Acceleration setting",
      "A second identity policy in Account B",
    ],
    "a",
    "Cross-account access needs both the caller's identity policy and a resource policy in the owner's account that trusts the caller.",
    [
      "The resource owner's account must allow the access too.",
      "Instance size is unrelated.",
      "Transfer Acceleration affects speed, not permissions.",
      "Another identity policy does not satisfy the owner's side.",
    ],
    "Cross-account = both sides must allow", ["cross-account", "bucket policy"]
  ),
  mk(
    "iam-access-denied-troubleshooting-playbook", 3, 1, "hard",
    "A team wants to replace broad permissions with a policy that matches what an application role actually uses, based on its history. Which tool helps most?",
    [
      "IAM Access Analyzer policy generation from CloudTrail activity",
      "AWS Budgets",
      "Amazon Inspector",
      "AWS Compute Optimizer",
    ],
    "a",
    "Access Analyzer can generate a least-privilege policy based on the access activity recorded in CloudTrail.",
    [
      "Access Analyzer generates a policy from observed activity.",
      "Budgets tracks cost.",
      "Inspector scans for vulnerabilities.",
      "Compute Optimizer recommends compute sizing.",
    ],
    "Right-size permissions from usage -> Access Analyzer", ["Access Analyzer", "CloudTrail"]
  ),

  // ---- Performance playbook ----
  mk(
    "performance-bottleneck-diagnosis-playbook", 1, 3, "medium",
    "A web app on a t3 instance is fast at first but slows to a crawl during a long period of constant load, and CPUCreditBalance is near zero. What is the best fix?",
    [
      "Move to a fixed-performance instance family or enable unlimited mode, sized for the sustained load",
      "Add a larger EBS volume",
      "Enable S3 Transfer Acceleration",
      "Add an Elastic IP",
    ],
    "a",
    "Burstable instances throttle to baseline when credits run out, so sustained load needs a fixed-performance family or unlimited mode.",
    [
      "Credit exhaustion is the bottleneck and a suitable family or unlimited mode addresses it.",
      "Volume size does not affect CPU credits.",
      "Transfer Acceleration is for S3 uploads.",
      "An Elastic IP does not change CPU.",
    ],
    "T instance slows under sustained load -> CPU credits", ["CPU credits", "burstable"]
  ),
  mk(
    "performance-bottleneck-diagnosis-playbook", 2, 3, "hard",
    "A DynamoDB table is throttling reads even though consumed capacity is well below provisioned capacity overall. Most requests hit a small set of keys. What is the likely issue and a good response?",
    [
      "A hot partition key, so improve key design or add DAX for the read-heavy keys",
      "The table needs more indexes on every attribute",
      "The AWS Region is too far away",
      "The items are too small",
    ],
    "a",
    "Concentrated access on a few keys creates a hot partition even when total capacity looks sufficient. Better key distribution or DAX caching helps.",
    [
      "A hot key explains throttling at low overall usage, and DAX or better keys address it.",
      "More indexes add cost and do not fix hot keys.",
      "Region distance affects latency, not throttling.",
      "Small items are not the cause.",
    ],
    "Throttling at low total usage -> hot key", ["hot partition", "DAX"]
  ),
  mk(
    "performance-bottleneck-diagnosis-playbook", 3, 3, "hard",
    "An application uploads millions of small objects per second to a single S3 prefix and sees slowdowns. What should the team do?",
    [
      "Spread the keys across multiple prefixes to increase aggregate request rate",
      "Move the bucket to Glacier",
      "Enable versioning",
      "Use a larger instance",
    ],
    "a",
    "S3 request rate limits apply per prefix, so distributing keys across prefixes raises the aggregate throughput.",
    [
      "Using multiple prefixes scales request rate.",
      "Glacier is archival and slower.",
      "Versioning does not increase request throughput.",
      "A bigger instance does not change the per-prefix limit.",
    ],
    "S3 limits are per prefix", ["prefix", "request rate"]
  ),
];

export const deepDiveQQFlashcards: Flashcard[] = [
  fc("eks-operations-scaling-networking-irsa", 1, 1, "Containers", "How do you give an EKS pod its own IAM permissions?", "IAM roles for service accounts (IRSA) or EKS Pod Identity, instead of the shared node role."),
  fc("eks-operations-scaling-networking-irsa", 2, 3, "Containers", "HPA vs Karpenter?", "HPA scales pods. Karpenter (or Cluster Autoscaler) scales nodes so pods have somewhere to run."),
  fc("eks-operations-scaling-networking-irsa", 3, 3, "Containers", "Why can an EKS cluster run out of pod IPs?", "The VPC CNI gives each pod a VPC IP, so small subnets are exhausted. Use larger subnets or secondary CIDRs."),
  fc("ai-ml-service-selection-decision-guide", 1, 3, "Machine Learning", "Textract vs Rekognition?", "Textract extracts text, forms and tables from documents. Rekognition analyses images and video."),
  fc("ai-ml-service-selection-decision-guide", 2, 3, "Machine Learning", "When to use Bedrock?", "For generative AI through a managed API to foundation models, with knowledge bases and guardrails."),
  fc("ai-ml-service-selection-decision-guide", 3, 3, "Machine Learning", "When to use SageMaker?", "To build, train and deploy a custom model that no prebuilt service covers."),
  fc("serverless-architecture-patterns-api-queue-events", 1, 2, "Serverless", "A job takes minutes behind API Gateway. Design?", "Make it asynchronous: return a job ID, queue the work, and let the client poll or be notified."),
  fc("serverless-architecture-patterns-api-queue-events", 2, 2, "Serverless", "One event, several independent consumers?", "SNS topic fanning out to separate SQS queues or Lambda functions."),
  fc("serverless-architecture-patterns-api-queue-events", 3, 2, "Serverless", "Poison message in an SQS batch?", "Use partial batch response and a dead-letter queue with a maximum receive count."),
  fc("ses-sns-email-notification-selection", 1, 2, "Application Integration", "SES vs SNS for email?", "SES sends application email to customers. SNS notifies subscribers and services about events."),
  fc("ses-sns-email-notification-selection", 2, 2, "Application Integration", "Why can a new SES account email only verified addresses?", "It starts in the sandbox. Request production access to lift limits."),
  fc("ses-sns-email-notification-selection", 3, 2, "Application Integration", "How do you protect SES sender reputation?", "Handle bounces and complaints through configuration set events and remove bad addresses."),
  fc("iam-access-denied-troubleshooting-playbook", 1, 1, "Security, Identity, and Compliance", "Admin user still gets AccessDenied. Look for?", "An explicit deny or an SCP (or boundary or session policy) limiting the action."),
  fc("iam-access-denied-troubleshooting-playbook", 2, 1, "Security, Identity, and Compliance", "Cross-account access rule?", "Both sides must allow: the caller's identity policy and the owner's resource or trust policy."),
  fc("iam-access-denied-troubleshooting-playbook", 3, 1, "Security, Identity, and Compliance", "How do you generate a least-privilege policy?", "IAM Access Analyzer policy generation from CloudTrail activity."),
  fc("performance-bottleneck-diagnosis-playbook", 1, 3, "Management and Governance", "T instance slows under sustained load?", "CPU credits are exhausted. Use a fixed-performance family or unlimited mode."),
  fc("performance-bottleneck-diagnosis-playbook", 2, 3, "Management and Governance", "DynamoDB throttles at low total usage?", "A hot partition key. Improve key distribution or add DAX."),
  fc("performance-bottleneck-diagnosis-playbook", 3, 3, "Management and Governance", "S3 request limit scope?", "Per prefix. Spread keys across prefixes to raise aggregate rate."),
];
