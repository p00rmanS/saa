import type { Lesson } from "@/lib/types";

export const deepDivesQ: Lesson[] = [
  {
    id: "eks-operations-scaling-networking-irsa",
    moduleId: "phase-7-containers",
    category: "Containers",
    title: "EKS Operations: Node Options, Pod Networking, Pod-Level IAM and Scaling",
    shortName: "EKS operations",
    tier: 2,
    domains: [1, 2, 3],
    examImportance: "medium",
    oneLiner:
      "AWS runs the Kubernetes control plane, and you choose how nodes are provided, how pods get IP addresses and permissions, and how pods and nodes scale.",
    englishExplanation:
      "Amazon EKS runs the Kubernetes control plane across multiple Availability Zones for you. You decide where the worker nodes come from. Managed node groups create and update EC2 nodes through an Auto Scaling group and are the usual default. Self-managed nodes give full control of the AMI and configuration at the price of more work. Fargate profiles run pods on Fargate so there are no nodes to manage, with a per-pod isolation and some limits on features such as daemon sets and privileged containers. EKS Auto Mode goes further by letting AWS manage compute, storage and load balancing for the cluster.\n\nNetworking uses the Amazon VPC CNI plugin, which gives each pod a real IP address from the VPC subnet, so pods can talk to other VPC resources directly and security groups can apply to pods. The consequence is that large clusters can run short of IP addresses, so plan subnet sizes. The AWS Load Balancer Controller creates an Application Load Balancer for a Kubernetes Ingress and a Network Load Balancer for a Service of type LoadBalancer, and target IP mode sends traffic straight to pods. Storage is provided by CSI drivers: the EBS CSI driver for block volumes and the EFS CSI driver for shared file systems.\n\nFor permissions, giving the node role broad access means every pod on the node inherits it. Instead use IAM roles for service accounts (IRSA), which uses the cluster's OIDC provider, or EKS Pod Identity, so each pod gets only the role of its service account. Scaling has two layers. The Horizontal Pod Autoscaler changes the number of pod replicas based on metrics such as CPU. The Cluster Autoscaler or Karpenter then adds or removes nodes so the pods have somewhere to run, and Karpenter launches right-sized nodes just in time and can consolidate or replace underused nodes to save cost. Control plane logs can be sent to CloudWatch Logs and Container Insights shows pod and node metrics. Spread pods across AZs with topology constraints, and use pod disruption budgets to keep availability during upgrades.",
    taglishExplanation:
      "Ang EKS ang nagpapatakbo ng Kubernetes control plane sa maraming AZ. Ikaw ang pipili ng pinagmumulan ng nodes: managed node groups (EC2 na ina-update sa pamamagitan ng Auto Scaling group, karaniwang default), self-managed nodes (buong kontrol pero mas maraming trabaho), Fargate profiles (walang nodes na papatakbuhin), at EKS Auto Mode kung saan AWS na ang bahala sa compute, storage at load balancing. Sa networking, ang VPC CNI ay nagbibigay ng totoong VPC IP sa bawat pod, kaya puwedeng security group sa pod pero puwedeng maubusan ng IP kung maliit ang subnet. Ang AWS Load Balancer Controller ang gumagawa ng ALB (Ingress) o NLB (Service). Para sa permissions, huwag ibigay sa node role; gamitin ang IRSA o EKS Pod Identity para bawat pod ay may sariling role. Sa scaling: HPA para sa dami ng pod, at Cluster Autoscaler o Karpenter para sa nodes. Ang Karpenter ay naglulunsad ng tamang laki ng node nang just in time.",
    analogy:
      "A hotel chain. AWS runs the head office (control plane). You choose whether guests stay in rooms you rent in bulk (managed nodes), rooms you furnish yourself (self-managed), or single suites booked per guest (Fargate). Each guest gets a key card for only their own room (pod-level IAM), not the master key on the floor (node role). More guests mean more rooms are opened just in time (Karpenter).",
    whyItExists:
      "Kubernetes needs compute, networking, identity and scaling decisions that differ from other AWS services, and exam scenarios test whether you map them to the right AWS mechanism.",
    flow: "Pod scheduled -> VPC CNI assigns a VPC IP -> service account role gives pod-level IAM -> HPA adds pods -> Karpenter or Cluster Autoscaler adds nodes -> load balancer controller routes traffic",
    withoutIt: [
      "Every pod would share the node's broad IAM permissions",
      "Pods would run out of capacity without node autoscaling",
      "Services would need manual load balancer management",
    ],
    bestUseCases: [
      "Teams already standardised on Kubernetes that want a managed control plane",
      "Pod-level least privilege using IRSA or Pod Identity",
      "Cost-efficient node provisioning with Karpenter",
      "Mixing managed node groups for steady load and Fargate for bursty jobs",
    ],
    poorUseCases: [
      "Simple container apps with no Kubernetes need, where ECS or App Runner is simpler",
      "Giving the node IAM role broad permissions for all pods",
      "Small subnets for large clusters using the VPC CNI",
    ],
    alternatives: [
      { need: "Simpler AWS-native container orchestration", choose: "Amazon ECS" },
      { need: "No servers to manage for pods", choose: "EKS on Fargate" },
      { need: "Run a web app from a container image with minimal setup", choose: "AWS App Runner" },
    ],
    keyFeatures: [
      "Managed control plane across multiple AZs",
      "Managed node groups, self-managed nodes, Fargate profiles and Auto Mode",
      "VPC CNI gives pods VPC IP addresses",
      "AWS Load Balancer Controller for ALB and NLB",
      "IRSA and EKS Pod Identity for pod-level IAM",
      "HPA for pods, Cluster Autoscaler or Karpenter for nodes",
      "EBS and EFS CSI drivers",
    ],
    availability:
      "The control plane is highly available by design. Spread pods and nodes across AZs and use pod disruption budgets during node upgrades.",
    security:
      "Use IRSA or Pod Identity instead of the node role, restrict the API endpoint, use security groups for pods, scan images in ECR and encrypt secrets with KMS.",
    pricingLogic:
      "You pay a per-cluster control plane fee plus the compute (EC2 or Fargate) and storage you use. Karpenter and right-sizing reduce node cost.",
    examKeywords: [
      "Kubernetes",
      "IRSA",
      "pod-level permissions",
      "Karpenter",
      "Cluster Autoscaler",
      "Fargate profile",
      "VPC CNI",
    ],
    examTraps: [
      "Pods share the node role unless you use IRSA or Pod Identity for per-pod permissions.",
      "HPA scales pods, not nodes. Node scaling needs Cluster Autoscaler or Karpenter.",
      "EKS manages the control plane, not your worker nodes (unless you use Fargate or Auto Mode).",
      "With the VPC CNI each pod uses a VPC IP, so small subnets limit cluster size.",
    ],
    architectureDiagram: `ALB (Ingress, target IP) --> pods (VPC CNI: VPC IPs) on managed nodes / Fargate
pod --> service account --> IAM role (IRSA / Pod Identity) --> S3, DynamoDB
HPA adds pods --> Karpenter adds right-sized nodes --> across 3 AZs`,
    architectureCaption: "Compute, network, identity and scaling are separate EKS decisions.",
    mentorTip:
      "If the question says least privilege per pod, choose IRSA or Pod Identity. If it says scale nodes, choose Karpenter or Cluster Autoscaler, not HPA.",
    questionIds: [
      "q-eks-operations-scaling-networking-irsa-1",
      "q-eks-operations-scaling-networking-irsa-2",
      "q-eks-operations-scaling-networking-irsa-3",
    ],
  },
  {
    id: "ai-ml-service-selection-decision-guide",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "AI and ML Service Selection: Prebuilt Services, SageMaker and Amazon Bedrock",
    shortName: "AI/ML decision guide",
    tier: 2,
    domains: [3, 4],
    examImportance: "medium",
    oneLiner:
      "Use a prebuilt AI service for a standard task, SageMaker for a custom model, and Amazon Bedrock for generative AI through a managed API.",
    englishExplanation:
      "The associate exam does not expect you to build models, but it does expect you to match a need to the right AI service. Start with the task. For images and video, Amazon Rekognition detects objects, faces, text and unsafe content. For extracting text, forms and tables from scanned documents, Amazon Textract goes beyond plain OCR. For understanding text, Amazon Comprehend finds sentiment, entities, key phrases and personally identifiable information. Amazon Transcribe turns speech into text, Amazon Polly turns text into speech, Amazon Translate translates text and Amazon Lex builds conversational chatbots and voice bots using the same technology as Alexa. Amazon Kendra provides intelligent enterprise search across documents.\n\nWhen you need a model trained on your own data for a task no prebuilt service covers, use Amazon SageMaker, which provides managed notebooks, training, tuning, deployment and monitoring. It gives the most control and needs the most ML skill. For generative AI, such as drafting text, summarising documents, answering questions or generating images, Amazon Bedrock gives API access to foundation models from several providers without managing infrastructure, with features to customise models, ground answers in your documents through knowledge bases and apply guardrails. Choose it when the requirement is generative and you want the least operational work.\n\nSome services have been retired for new customers, so recognise them but do not choose them for new designs: Amazon Forecast and Amazon Fraud Detector are closed to new customers. As a decision rule, prefer the most managed service that fits. A prebuilt service needs no ML expertise, Bedrock needs prompt and application work, and SageMaker needs data science. Keep data governance in mind as well: encrypt data with KMS, restrict access with IAM and use VPC endpoints so traffic to the services stays private. Cost follows usage: per image, per page, per character or per token, or per hour for SageMaker instances.",
    taglishExplanation:
      "Hindi hinihingi ng exam na gumawa ka ng model, pero dapat mong itugma ang pangangailangan sa tamang AI service. Para sa image at video: Rekognition. Para sa pagkuha ng text, forms at tables mula sa scanned documents: Textract. Para sa pag-unawa ng text (sentiment, entities, PII): Comprehend. Transcribe ay speech-to-text, Polly ay text-to-speech, Translate ay pagsasalin, Lex ay chatbot at voice bot, Kendra ay intelligent na enterprise search. Kapag kailangan ng sariling model na sinanay sa sarili mong data, SageMaker ang gamitin: pinakamarami ang kontrol pero pinakamahirap. Para sa generative AI (pagsulat, buod, tanong-sagot, image generation), gamitin ang Amazon Bedrock: API access sa foundation models na walang imprastrakturang papatakbuhin. Ang Forecast at Fraud Detector ay sarado na sa bagong customer. Piliin ang pinaka-managed na pasok sa pangangailangan.",
    analogy:
      "Hiring help. A prebuilt service is a specialist you call for one job (a translator, a bookkeeper). SageMaker is training your own employee from scratch. Bedrock is a versatile assistant you instruct in plain language, available on demand.",
    whyItExists:
      "Most teams need AI features, not an ML research team. Layering services from prebuilt to custom lets them pick the least effort that meets the need.",
    flow: "Identify the task -> standard task? use a prebuilt service -> generative task? use Bedrock -> custom model? use SageMaker",
    withoutIt: [
      "Teams would train models for tasks that a prebuilt API already solves",
      "Generative features would need self-hosted models and GPUs",
    ],
    bestUseCases: [
      "Rekognition for image moderation, Textract for invoice extraction",
      "Comprehend for sentiment and PII detection",
      "Transcribe plus Translate for subtitles",
      "Bedrock for summarisation and question answering over company documents",
      "SageMaker for a custom prediction model",
    ],
    poorUseCases: [
      "Training a custom model for plain OCR",
      "Using SageMaker when a prebuilt API meets the need",
      "Choosing retired services such as Forecast or Fraud Detector for new work",
    ],
    alternatives: [
      { need: "Extract text and tables from documents", choose: "Amazon Textract" },
      { need: "Detect objects or faces in images", choose: "Amazon Rekognition" },
      { need: "Build and train a custom model", choose: "Amazon SageMaker" },
      { need: "Generative AI via managed API", choose: "Amazon Bedrock" },
    ],
    keyFeatures: [
      "Rekognition, Textract, Comprehend, Transcribe, Polly, Translate, Lex, Kendra",
      "SageMaker for custom models",
      "Bedrock for foundation models, knowledge bases and guardrails",
      "Pay per use: per image, page, character, token or instance hour",
      "KMS, IAM and VPC endpoints for data protection",
    ],
    availability:
      "These are managed Regional services. Check Region availability, since some models and features are not in every Region.",
    security:
      "Control access with IAM, encrypt with KMS, use VPC endpoints and review data handling terms for the service you choose.",
    pricingLogic:
      "Prebuilt APIs charge per request or unit processed. Bedrock charges per token or provisioned throughput. SageMaker charges for instance hours and storage.",
    examKeywords: [
      "extract text from scanned documents",
      "sentiment analysis",
      "speech to text",
      "chatbot",
      "generative AI",
      "custom model",
      "no ML expertise",
    ],
    examTraps: [
      "Textract extracts structured data from documents. Rekognition analyses images and video.",
      "Comprehend analyses text meaning. Transcribe converts audio to text.",
      "If no ML expertise is available, choose a prebuilt service or Bedrock before SageMaker.",
      "Forecast and Fraud Detector are closed to new customers.",
    ],
    architectureDiagram: `Standard task  --> prebuilt service (Rekognition, Textract, Comprehend, Transcribe, Polly, Translate, Lex, Kendra)
Generative task --> Amazon Bedrock (foundation models, knowledge bases, guardrails)
Custom model   --> Amazon SageMaker (train, tune, deploy)`,
    architectureCaption: "Pick the most managed option that fits the task.",
    mentorTip:
      "Name the input and the output. Image in, labels out is Rekognition. Scanned form in, fields out is Textract. Audio in, text out is Transcribe.",
    questionIds: [
      "q-ai-ml-service-selection-decision-guide-1",
      "q-ai-ml-service-selection-decision-guide-2",
      "q-ai-ml-service-selection-decision-guide-3",
    ],
  },
  {
    id: "serverless-architecture-patterns-api-queue-events",
    moduleId: "phase-2-compute",
    category: "Serverless",
    title: "Serverless Architecture Patterns: API, Queue, Fan-out and Orchestration",
    shortName: "Serverless patterns",
    tier: 2,
    domains: [2, 3, 4],
    examImportance: "high",
    oneLiner:
      "A handful of serverless shapes, built from API Gateway, Lambda, queues, topics, events and Step Functions, cover most exam scenarios.",
    englishExplanation:
      "Pattern one is the serverless three-tier web application: static content in S3 behind CloudFront, API Gateway as the front door, Lambda as the logic and DynamoDB (or Aurora Serverless) as the data tier, with Cognito for sign-in. It scales automatically and costs almost nothing when idle. Pattern two decouples slow or spiky work: API Gateway or a producer puts a message on SQS and Lambda processes it from the queue at its own pace. Configure a dead-letter queue for repeated failures, set the batch size, and use partial batch response so one bad message does not return the whole batch. Pattern three is fan-out: publish once to SNS and have several SQS queues or Lambda functions subscribe, so each consumer processes the event independently. Pattern four reacts to events: S3 upload or EventBridge rules trigger Lambda for thumbnails, validation or routing.\n\nPattern five orchestrates a multi-step workflow with AWS Step Functions instead of chaining Lambda functions: it handles sequencing, retries, parallel branches, waits and human approval, and keeps state outside your code. Use Express workflows for high-volume short work and Standard workflows for long-running, auditable processes. Know the limits that shape designs: a Lambda function runs up to 15 minutes, and API Gateway integrations time out after about 29 seconds by default, so long jobs should be asynchronous and return a job ID or use a callback. Lambda scales quickly and can overwhelm a relational database, so use RDS Proxy or reserved concurrency to protect it.\n\nSome practical rules: make consumers idempotent because SQS standard queues and many triggers are at least once; keep functions small and stateless; store state in DynamoDB, S3 or Step Functions; set timeouts shorter than the queue visibility timeout; and use least-privilege execution roles per function. For cost, serverless suits spiky or low-volume traffic, while a steady, high-volume workload may be cheaper on provisioned containers or instances.",
    taglishExplanation:
      "Una, ang serverless three-tier web app: S3 at CloudFront para sa static, API Gateway bilang pintuan, Lambda para sa logic, DynamoDB (o Aurora Serverless) para sa data, at Cognito para sa sign-in. Awtomatikong nag-i-scale at halos walang gastos kapag idle. Pangalawa, decoupling: ilagay sa SQS ang mensahe at pinoproseso ng Lambda sa sarili nitong bilis; maglagay ng dead-letter queue at partial batch response. Pangatlo, fan-out: isang publish sa SNS, maraming SQS o Lambda ang sumasagot nang hiwalay. Pang-apat, event-driven: S3 upload o EventBridge rule ang nagti-trigger ng Lambda. Panglima, orchestration gamit ang Step Functions para sa sunud-sunod na hakbang, retry, parallel at approval. Tandaan ang limits: Lambda hanggang 15 minuto; API Gateway mga 29 segundo by default, kaya gawing asynchronous ang mahahabang trabaho. Gawing idempotent ang consumers, at protektahan ang database gamit ang RDS Proxy.",
    analogy:
      "A restaurant kitchen with tickets. The waiter (API Gateway) takes orders and pins tickets on a rail (SQS). Cooks (Lambda) pick them up when ready. A bell (SNS) announces a finished dish to several stations at once, and the head chef (Step Functions) sequences a multi-course meal.",
    whyItExists:
      "Serverless building blocks scale automatically and bill per use, but each has limits, so composing them correctly is a core architecture skill.",
    flow: "Client -> CloudFront/API Gateway -> Lambda -> DynamoDB; or producer -> SQS -> Lambda; or event -> SNS -> many subscribers; or Step Functions sequencing Lambda tasks",
    withoutIt: [
      "Spikes would hit slow back ends directly",
      "Lambda chains would hide failures and retries in code",
      "Long jobs would time out behind API Gateway",
    ],
    bestUseCases: [
      "Spiky or unpredictable web and mobile back ends",
      "Asynchronous processing with a queue and DLQ",
      "Fan-out of one event to several consumers",
      "Multi-step workflows with retries and approvals",
    ],
    poorUseCases: [
      "Jobs that run longer than 15 minutes inside one Lambda",
      "Synchronous API calls that take minutes",
      "Steady high-volume workloads where provisioned capacity is cheaper",
    ],
    alternatives: [
      { need: "Long-running or steady container workloads", choose: "Amazon ECS or EKS on Fargate" },
      { need: "Ordered, deduplicated messages", choose: "SQS FIFO queue" },
      { need: "Routing events by content from many sources", choose: "Amazon EventBridge" },
    ],
    keyFeatures: [
      "Serverless three-tier: S3, CloudFront, API Gateway, Lambda, DynamoDB, Cognito",
      "Queue decoupling with DLQ, batch size and partial batch response",
      "SNS to SQS fan-out",
      "Event triggers from S3 and EventBridge",
      "Step Functions Standard and Express workflows",
      "Limits: Lambda 15 minutes, API Gateway about 29 seconds by default",
      "RDS Proxy and reserved concurrency to protect databases",
    ],
    availability:
      "Lambda, API Gateway, SQS, SNS and DynamoDB run across multiple AZs automatically. Use DLQs and retries for failure handling.",
    security:
      "Per-function least-privilege roles, Cognito or IAM authorisers on the API, KMS encryption for queues and tables, and WAF on API Gateway or CloudFront.",
    pricingLogic:
      "Pay per request and duration with no idle cost. Right-size Lambda memory, batch queue processing and use Express workflows for high-volume short work to control cost.",
    examKeywords: [
      "serverless",
      "decouple",
      "fan-out",
      "dead-letter queue",
      "orchestrate",
      "asynchronous",
      "15 minutes",
    ],
    examTraps: [
      "A synchronous API Gateway call that takes minutes will time out. Make it asynchronous.",
      "Chaining Lambda functions directly hides failures. Use Step Functions or a queue.",
      "SQS standard and Lambda triggers are at least once, so duplicates are possible.",
      "Lambda scaling can exhaust database connections. Use RDS Proxy.",
    ],
    architectureDiagram: `Web: CloudFront --> S3 (static)      API: Client --> API Gateway --> Lambda --> DynamoDB
Queue: producer --> SQS (+DLQ) --> Lambda      Fan-out: SNS --> SQS A / SQS B / Lambda
Workflow: Step Functions: validate --> charge --> ship (retries, parallel, wait)`,
    architectureCaption: "Five reusable serverless shapes.",
    mentorTip:
      "Long, spiky, or must not lose work usually means put a queue in front. Several independent consumers means SNS fan-out. Multi-step with retries means Step Functions.",
    questionIds: [
      "q-serverless-architecture-patterns-api-queue-events-1",
      "q-serverless-architecture-patterns-api-queue-events-2",
      "q-serverless-architecture-patterns-api-queue-events-3",
    ],
  },
  {
    id: "ses-sns-email-notification-selection",
    moduleId: "phase-6-integration",
    category: "Application Integration",
    title: "Email and Notifications: SES vs SNS and Handling Bounces",
    shortName: "SES vs SNS",
    tier: 3,
    domains: [2, 3],
    examImportance: "low",
    oneLiner:
      "Use SNS to notify subscribers about system events and Amazon SES to send real email to customers at scale, with bounces and complaints handled.",
    englishExplanation:
      "Amazon Simple Email Service (SES) is a scalable service for sending and receiving email. You send through an SMTP interface or an API, for transactional mail such as receipts and password resets or for marketing campaigns. A new account starts in a sandbox that limits who you can send to, and you request production access to lift it. You verify your sending domain or address and configure DKIM, SPF and DMARC so mailbox providers trust your messages. Protecting your sender reputation matters: you must handle bounces (invalid addresses) and complaints (recipients marking spam) by publishing SES event notifications to SNS, CloudWatch or Firehose through a configuration set and removing bad addresses from your list. Dedicated IP addresses are optional for high volume senders. SES can also receive email and route it to S3, SNS or Lambda.\n\nAmazon SNS is a publish and subscribe service for notifications to many subscribers: email, SMS, HTTP endpoints, Lambda and SQS. SNS email is intended for notifications to operators or subscribers who confirmed their subscription, not for bulk customer marketing or custom-branded mail. A good rule: use SNS when a system event should reach a set of subscribers or other services, use SES when your application needs to send individual or bulk email to customers.\n\nWatch for retired and moved services. Amazon Pinpoint reached the end of its support period on 30 October 2026, so for email use SES, and for SMS, push and voice use AWS End User Messaging. Keep the exam focus on the choice: SES for email sending, SNS for fan-out notifications, SQS for queueing work, and Cognito or SES for sending verification emails depending on the case.",
    taglishExplanation:
      "Ang Amazon SES ay para sa pagpapadala at pagtanggap ng email nang malakihan, sa pamamagitan ng SMTP o API, para sa transactional (resibo, reset password) o marketing. Ang bagong account ay nasa sandbox; humingi ng production access. I-verify ang domain at i-set ang DKIM, SPF, DMARC. Asikasuhin ang bounces at complaints sa pamamagitan ng event notifications papuntang SNS, CloudWatch o Firehose, at tanggalin ang masamang address para hindi masira ang sender reputation. Ang SNS ay pub/sub para sa notifications sa maraming subscriber (email, SMS, HTTP, Lambda, SQS), hindi para sa bulk marketing sa customers. Panuntunan: SNS para sa system events sa subscribers, SES para sa email ng application sa customers. Ang Pinpoint ay natapos ang support noong 30 October 2026: SES para sa email at AWS End User Messaging para sa SMS at push.",
    analogy:
      "SNS is the office loudspeaker that announces something to everyone who tuned in. SES is the mail room that sends personal and bulk letters to customers, keeps track of returned mail and protects the company's reputation with the post office.",
    whyItExists:
      "Applications must reach customers by email reliably without running mail servers, while system events must reach subscribers and other services.",
    flow: "App -> SES (verified domain, DKIM) -> recipient; bounces and complaints -> SNS or CloudWatch -> remove from list",
    withoutIt: [
      "You would run and maintain your own mail servers",
      "Spam complaints could damage your sender reputation unnoticed",
    ],
    bestUseCases: [
      "Transactional email such as receipts and password resets",
      "Bulk campaigns with tracking through configuration sets",
      "Receiving email and routing it to S3 or Lambda",
      "SNS notifications to operators about alarms",
    ],
    poorUseCases: [
      "Using SNS email for bulk customer marketing",
      "Sending without verifying the domain or handling bounces",
      "Choosing Pinpoint for new designs",
    ],
    alternatives: [
      { need: "Notify many subscribers or services about an event", choose: "Amazon SNS" },
      { need: "Queue work for consumers", choose: "Amazon SQS" },
      { need: "SMS, push and voice messaging", choose: "AWS End User Messaging" },
    ],
    keyFeatures: [
      "SMTP interface and API for sending",
      "Sandbox until production access is granted",
      "Domain verification with DKIM, SPF and DMARC",
      "Bounce and complaint events through configuration sets",
      "Optional dedicated IP addresses",
      "Receiving rules to S3, SNS or Lambda",
    ],
    availability:
      "SES is a managed Regional service. For resilience, send from more than one Region if email delivery is critical.",
    security:
      "Verify identities, use IAM policies for sending, encrypt stored mail and rely on DKIM, SPF and DMARC for authenticity.",
    pricingLogic:
      "SES charges per email sent and per attachment data, with low per-message cost. Dedicated IPs add a monthly fee.",
    examKeywords: [
      "send email",
      "transactional email",
      "bounces and complaints",
      "SMTP",
      "notify subscribers",
      "SMS",
    ],
    examTraps: [
      "SNS is not a bulk customer email service. SES is.",
      "A new SES account is in a sandbox until you request production access.",
      "Bounce and complaint handling protects sender reputation.",
      "Pinpoint's support period ended on 30 October 2026.",
    ],
    architectureDiagram: `App --> SES --> customers' mailboxes
SES events (bounce, complaint, delivery) --> SNS / CloudWatch / Firehose --> clean the list
CloudWatch alarm --> SNS --> operators (email, SMS) and Lambda`,
    architectureCaption: "SES talks to customers. SNS talks to subscribers and systems.",
    mentorTip:
      "Audience decides: customers means SES, operators and other services means SNS.",
    questionIds: [
      "q-ses-sns-email-notification-selection-1",
      "q-ses-sns-email-notification-selection-2",
      "q-ses-sns-email-notification-selection-3",
    ],
  },
  {
    id: "iam-access-denied-troubleshooting-playbook",
    moduleId: "phase-1-iam",
    category: "Security, Identity, and Compliance",
    title: "Access Denied Playbook: Why Can't I Do That?",
    shortName: "Access denied playbook",
    tier: 2,
    domains: [1],
    examImportance: "high",
    oneLiner:
      "When a request is denied, check the layers in order: explicit denies, SCPs, boundaries, identity policies, resource policies, then service-specific controls such as KMS and VPC endpoints.",
    englishExplanation:
      "Most IAM exam questions are really troubleshooting questions. Start from how AWS decides. By default everything is denied. A request is allowed only if some policy allows it and nothing denies it. An explicit deny anywhere always wins. Then check the layers that can limit permissions: a service control policy (SCP) on the account or OU, a permission boundary on the user or role, and a session policy if the credentials came from assuming a role with one. All of these must allow the action, because each one only sets the maximum. After that, the identity policy of the principal or the resource policy on the target must grant the permission.\n\nSame-account and cross-account requests differ. In the same account, either an identity policy or a resource policy that names the principal can be enough. For cross-account access, both sides must allow: the resource owner's resource policy or role trust policy must trust the other account, and the caller's own identity policy must allow the action. Do not forget service-specific layers. For S3, check Block Public Access, bucket policy conditions such as aws:SourceVpce or aws:SecureTransport and object ownership. For encrypted data, the caller also needs permission on the KMS key through the key policy. For access from a VPC, an endpoint policy can deny it. For temporary credentials, check that they have not expired and that the session was created with the expected role.\n\nUse the right tools. CloudTrail shows the denied API call and its error code, and the encoded authorization failure message can be decoded with the STS decode-authorization-message action. The IAM policy simulator tests whether a policy would allow an action. IAM Access Analyzer validates policies, finds external access, uses last-accessed data to suggest removing unused permissions and can generate a least-privilege policy from CloudTrail activity. The IAM credential report lists users and the age and use of their credentials. A good method is to read the exact error, identify the principal, the action and the resource, then walk the layers from deny to allow.",
    taglishExplanation:
      "Karamihan ng IAM question ay troubleshooting. Default ay deny lahat. Papayagan lang ang request kung may policy na nagpapahintulot at walang nagde-deny; ang explicit deny ay laging panalo. Tingnan ang mga layer na naglilimita: SCP sa account o OU, permission boundary sa user o role, at session policy. Lahat ng iyan ay dapat pumayag dahil maximum lang ang itinatakda nila. Pagkatapos, ang identity policy ng principal o ang resource policy ng target ang dapat magbigay ng permission. Sa cross-account, kailangang pumayag ang dalawang panig: ang resource policy o trust policy ng may-ari at ang identity policy ng caller. Huwag kalimutan ang service-specific: sa S3, Block Public Access at bucket policy conditions; sa encrypted data, permission sa KMS key; sa VPC, endpoint policy. Mga tool: CloudTrail (nakikita ang denied call), decode-authorization-message, policy simulator, Access Analyzer (policy validation, unused access, generate policy), at credential report.",
    analogy:
      "Getting into a secure building. The security desk (SCP) must let your company in, your badge type (boundary) must allow the floor, your own badge (identity policy) must open the door, and the door's own list (resource policy) must include you. One guard saying no (explicit deny) ends it, and if the room contains a locked cabinet (KMS key), you need its key too.",
    whyItExists:
      "Permissions come from several overlapping layers, so you need a repeatable order to find which one blocks a request.",
    flow: "Read the error -> identify principal, action, resource -> explicit deny? -> SCP -> boundary -> session policy -> identity or resource policy -> KMS, S3, endpoint layers -> verify with CloudTrail and simulator",
    withoutIt: [
      "Teams would guess at policy changes and grant overly broad access",
      "Explicit denies and SCPs would be overlooked",
    ],
    bestUseCases: [
      "Diagnosing AccessDenied errors in exam scenarios",
      "Using Access Analyzer to remove unused permissions",
      "Generating least-privilege policies from CloudTrail activity",
    ],
    poorUseCases: [
      "Fixing denies by granting administrator access",
      "Editing only the identity policy for a cross-account request",
    ],
    alternatives: [
      { need: "Test whether a policy allows an action", choose: "IAM policy simulator" },
      { need: "Find who made the denied call", choose: "AWS CloudTrail" },
      { need: "Find external or unused access", choose: "IAM Access Analyzer" },
    ],
    keyFeatures: [
      "Default deny, explicit deny always wins",
      "SCPs, permission boundaries and session policies only limit",
      "Cross-account needs both sides to allow",
      "KMS key policy, S3 Block Public Access, endpoint policies as extra layers",
      "Policy simulator, CloudTrail, decode-authorization-message",
      "Access Analyzer: validation, external access, unused access, policy generation",
      "Credential report",
    ],
    availability: "Not applicable. This is a troubleshooting lesson.",
    security:
      "Fix denies with the narrowest allow. Avoid wildcards, review unused access and keep SCP guardrails in place.",
    pricingLogic:
      "IAM and the policy simulator are free. Access Analyzer external access analysis is free, and unused access analysis is a paid feature.",
    examKeywords: [
      "AccessDenied",
      "explicit deny",
      "SCP",
      "permission boundary",
      "cross-account",
      "policy simulator",
      "Access Analyzer",
    ],
    examTraps: [
      "An SCP or permission boundary never grants permission. It only limits.",
      "For cross-account access, an identity policy alone is not enough.",
      "An explicit deny in any applicable policy overrides every allow.",
      "Encrypted object access also needs permission on the KMS key.",
    ],
    architectureDiagram: `Request --> explicit deny? --> SCP allows? --> boundary allows? --> session policy allows?
        --> identity policy OR resource policy allows? (cross-account: BOTH)
        --> KMS key policy / S3 Block Public Access / endpoint policy --> ALLOWED`,
    architectureCaption: "Walk the layers from the strongest block to the allow.",
    mentorTip:
      "In a troubleshooting question, first look for an explicit deny or an SCP, because those override everything else and are easy to miss.",
    questionIds: [
      "q-iam-access-denied-troubleshooting-playbook-1",
      "q-iam-access-denied-troubleshooting-playbook-2",
      "q-iam-access-denied-troubleshooting-playbook-3",
    ],
  },
  {
    id: "performance-bottleneck-diagnosis-playbook",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "Performance Bottleneck Playbook: Find the Slow Layer Before You Fix It",
    shortName: "Performance playbook",
    tier: 2,
    domains: [3, 2],
    examImportance: "high",
    oneLiner:
      "Slow systems have one limiting layer, such as CPU credits, EBS throughput, database connections or throttling, and each layer has a telltale metric and a standard fix.",
    englishExplanation:
      "Performance questions give symptoms and ask for the smallest correct change. Work from the user request downwards and find the layer that is saturated. At the edge, static content that is slow for distant users points to CloudFront caching. At the load balancer, rising target response time means the back end is slow, while 5xx errors from the load balancer itself suggest no healthy targets or capacity limits. At the compute layer, a burstable T-family instance that slows after sustained load has run out of CPU credits, so use a fixed-performance family or unlimited mode. Memory pressure needs a larger or memory-optimised instance, and an Auto Scaling group that reacts too late needs a better scaling policy or a warm pool.\n\nAt the storage layer, an EBS volume that hits its IOPS or throughput limit shows high queue length. gp2 volumes depend on a burst bucket, and gp3 gives a steady baseline you can raise, while io2 suits sustained high IOPS. An instance also has its own limit for EBS bandwidth. For S3, request rates are measured per prefix, so spread heavily accessed keys across prefixes and use multipart upload and byte-range fetches for large objects. For shared files, EFS throughput modes decide the ceiling.\n\nAt the database layer, too many connections, especially from Lambda, call for RDS Proxy. Slow queries are found with Performance Insights or CloudWatch Database Insights, then fixed with indexes, a larger instance, read replicas for read-heavy load or an in-memory cache such as ElastiCache. A high cache miss ratio means the cache is sized or keyed badly. For DynamoDB, throttled requests point to insufficient capacity or a hot partition key, so improve key design, use adaptive capacity, on-demand mode, or add DAX for read-heavy access. At the network layer, use placement groups and enhanced networking for low-latency node-to-node traffic and Global Accelerator or CloudFront for global users. For Lambda, cold starts are reduced with provisioned concurrency or SnapStart, and throttling is controlled with concurrency limits. Always confirm with CloudWatch metrics before changing anything.",
    taglishExplanation:
      "Ang performance questions ay nagbibigay ng sintomas at hinihingi ang pinakamaliit na tamang pagbabago. Hanapin ang layer na saturated, mula sa user pababa. Sa edge: mabagal para sa malalayong user ay CloudFront cache. Sa load balancer: tumataas na target response time ay mabagal ang back end; 5xx mula mismo sa LB ay walang healthy target o limit sa capacity. Sa compute: ang burstable T instance na bumagal pagkatapos ng tuloy-tuloy na load ay naubusan ng CPU credits, kaya gumamit ng fixed-performance o unlimited mode. Sa storage: ang EBS na umabot sa IOPS o throughput limit ay mataas ang queue length; gp3 ang steady na baseline na puwedeng taasan, io2 para sa tuloy-tuloy na mataas na IOPS. Sa S3, per prefix ang request rate. Sa database: maraming connection, lalo na mula sa Lambda, ay RDS Proxy; mabagal na query ay Performance Insights, index, read replicas, at ElastiCache. Sa DynamoDB: throttling ay kulang na capacity o hot partition key, kaya DAX o mas magandang key design. Laging kumpirmahin sa CloudWatch bago baguhin.",
    analogy:
      "A doctor reading vital signs. Slow overall could be heart, lungs or blood sugar, and each has its own reading. You do not give medicine for all three. You check the numbers, find the one that is off and treat that.",
    whyItExists:
      "Adding capacity everywhere is wasteful. Finding the saturated layer lets you apply the smallest change that works.",
    flow: "Symptom -> locate the layer with metrics -> match to the known limit -> apply the standard fix -> re-measure",
    withoutIt: [
      "You would scale the wrong layer and still be slow",
      "Costs would rise with no benefit",
    ],
    bestUseCases: [
      "Choosing the right fix in performance scenarios",
      "Pairing each layer with the CloudWatch metric that proves the bottleneck",
    ],
    poorUseCases: [
      "Making every instance larger without measuring",
      "Adding read replicas for a write bottleneck",
    ],
    alternatives: [
      { need: "Find slow database queries", choose: "Performance Insights or CloudWatch Database Insights" },
      { need: "Trace latency across services", choose: "AWS X-Ray" },
      { need: "Recommend right-sized instances", choose: "AWS Compute Optimizer" },
    ],
    keyFeatures: [
      "Edge: CloudFront caching, Global Accelerator",
      "Compute: CPU credits on T instances, scaling policy, warm pools",
      "Storage: EBS IOPS and throughput limits, gp3 vs io2, S3 per-prefix rates",
      "Database: RDS Proxy, Performance Insights, read replicas, ElastiCache",
      "DynamoDB: capacity, hot partitions, adaptive capacity, DAX",
      "Lambda: provisioned concurrency, SnapStart, concurrency limits",
    ],
    availability:
      "Performance fixes often also help availability, for example replicas and multi-AZ caching, but confirm which problem you are solving.",
    security: "Not applicable. This is a diagnosis lesson.",
    pricingLogic:
      "Targeted fixes cost less than blanket upsizing. Caching and right-sizing usually reduce both latency and cost.",
    examKeywords: [
      "throttling",
      "CPU credits",
      "hot partition",
      "connection exhaustion",
      "cache miss",
      "burst balance",
      "IOPS limit",
    ],
    examTraps: [
      "Read replicas do not fix a write-heavy bottleneck.",
      "A T-family instance that slows under sustained load has exhausted CPU credits.",
      "DynamoDB throttling can come from a hot key even when total capacity looks sufficient.",
      "S3 request limits are per prefix, not per bucket.",
    ],
    architectureDiagram: `User -> CloudFront (cache?) -> ALB (target response time?) -> EC2/Lambda (CPU credits, concurrency?)
   -> EBS/EFS/S3 (IOPS, throughput, prefix?) -> RDS (connections, slow queries?) / DynamoDB (throttles?)
   Check CloudWatch at each hop, fix the saturated layer only.`,
    architectureCaption: "Walk the request path and find the saturated layer.",
    mentorTip:
      "Match symptom to layer first. The words in the question, such as burst, credits, connections or hot key, usually name the layer.",
    questionIds: [
      "q-performance-bottleneck-diagnosis-playbook-1",
      "q-performance-bottleneck-diagnosis-playbook-2",
      "q-performance-bottleneck-diagnosis-playbook-3",
    ],
  },
];
