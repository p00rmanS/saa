import type { Flashcard } from "@/lib/types";

export const miscFlashcards: Flashcard[] = [
  { id: "fc-high-availability-1", serviceId: "high-availability", domain: 2, category: "Resilience", front: "What's the core principle of high availability?", back: "No single point of failure." },
  { id: "fc-high-availability-2", serviceId: "high-availability", domain: 2, category: "Resilience", front: "Does multi-AZ protect against a Region-wide outage?", back: "No — only multi-Region protects against that." },
  { id: "fc-high-availability-3", serviceId: "high-availability", domain: 2, category: "Resilience", front: "Taglish: Bakit dapat maraming AZ ang gamitin?", back: "Para kung magkaproblema sa isang building/AZ, tuloy-tuloy pa rin ang serbisyo gamit ang ibang AZ." },
  { id: "fc-high-availability-4", serviceId: "high-availability", domain: 2, category: "Resilience", front: "What should you do with a single-AZ answer when a question requires AZ-failure tolerance?", back: "Eliminate it immediately — it violates the requirement." },

  { id: "fc-fault-tolerance-1", serviceId: "fault-tolerance", domain: 2, category: "Resilience", front: "High Availability vs Fault Tolerance — one-line distinction?", back: "High Availability: recovers quickly (brief disruption OK). Fault Tolerance: continues with zero disruption despite a failure." },
  { id: "fc-fault-tolerance-2", serviceId: "fault-tolerance", domain: 2, category: "Resilience", front: "Which typically costs more: HA or fault tolerance?", back: "Fault tolerance — it usually requires active-active redundant capacity running at all times." },
  { id: "fc-fault-tolerance-3", serviceId: "fault-tolerance", domain: 2, category: "Resilience", front: "Taglish: Ano ang pinagkaiba ng High Availability at Fault Tolerance?", back: "High Availability: mabilis lang bumalik pag may problema. Fault Tolerance: hindi talaga mararamdaman ng user ang problema." },

  { id: "fc-disaster-recovery-strategies-1", serviceId: "disaster-recovery-strategies", domain: 2, category: "Resilience", front: "Name the 4 DR strategies, cheapest/slowest to priciest/fastest.", back: "Backup and Restore -> Pilot Light -> Warm Standby -> Multi-site Active-Active." },
  { id: "fc-disaster-recovery-strategies-2", serviceId: "disaster-recovery-strategies", domain: 2, category: "Resilience", front: "What do RTO and RPO measure?", back: "RTO: how long you can be down. RPO: how much data (time) you can afford to lose." },
  { id: "fc-disaster-recovery-strategies-3", serviceId: "disaster-recovery-strategies", domain: 2, category: "Resilience", front: "What's the general relationship between RTO/RPO and cost?", back: "Lower RTO/RPO usually means higher cost." },
  { id: "fc-disaster-recovery-strategies-4", serviceId: "disaster-recovery-strategies", domain: 2, category: "Resilience", front: "Taglish: Ano ang Pilot Light strategy?", back: "Core data/services lang ang laging tumatakbo sa DR Region; ang iba pang parte, i-scale up lang kapag may disaster." },
  { id: "fc-disaster-recovery-strategies-5", serviceId: "disaster-recovery-strategies", domain: 2, category: "Resilience", front: "Which DR strategy gives zero downtime and zero data loss?", back: "Multi-site Active-Active." },

  { id: "fc-aws-cost-thinking-1", serviceId: "aws-cost-thinking", domain: 4, category: "Cost Management", front: "First cost question to ask about any resource?", back: "Is it always running, even when not needed?" },
  { id: "fc-aws-cost-thinking-2", serviceId: "aws-cost-thinking", domain: 4, category: "Cost Management", front: "What can reduce NAT Gateway data-processing charges for supported AWS services?", back: "VPC endpoints." },
  { id: "fc-aws-cost-thinking-3", serviceId: "aws-cost-thinking", domain: 4, category: "Cost Management", front: "Best purchasing option for a steady 24/7, 3-year workload?", back: "Reserved Instances or Savings Plans." },
  { id: "fc-aws-cost-thinking-4", serviceId: "aws-cost-thinking", domain: 4, category: "Cost Management", front: "Taglish: Bakit dapat pag-usapan ang cross-AZ traffic?", back: "Kasi may bayad ang data transfer sa pagitan ng mga AZ — dapat suriin kung talagang kailangan ito." },
  { id: "fc-aws-cost-thinking-5", serviceId: "aws-cost-thinking", domain: 4, category: "Cost Management", front: "What can cold, rarely-accessed S3 data move to for cost savings?", back: "A cheaper storage class (e.g. Glacier)." },

  { id: "fc-aws-budgets-1", serviceId: "aws-budgets", domain: 4, category: "Cost Management", front: "What does AWS Budgets do?", back: "Sends proactive alerts when spend or usage is forecasted to exceed a threshold." },
  { id: "fc-aws-budgets-2", serviceId: "aws-budgets", domain: 4, category: "Cost Management", front: "Can Budgets alert based on forecasted (not just actual) spend?", back: "Yes." },
  { id: "fc-aws-budgets-3", serviceId: "aws-budgets", domain: 4, category: "Cost Management", front: "Taglish: Ano ang gamit ng Budgets?", back: "Bibigyan ka ng alerto bago pa man lumampas ang gastos sa itinakdang limitasyon." },

  { id: "fc-aws-cost-explorer-1", serviceId: "aws-cost-explorer", domain: 4, category: "Cost Management", front: "What does Cost Explorer do?", back: "Visualizes and forecasts historical AWS spend, broken down by service/tag/account." },
  { id: "fc-aws-cost-explorer-2", serviceId: "aws-cost-explorer", domain: 4, category: "Cost Management", front: "Budgets vs Cost Explorer?", back: "Budgets: proactive threshold alerts. Cost Explorer: visualize/forecast historical trends." },
  { id: "fc-aws-cost-explorer-3", serviceId: "aws-cost-explorer", domain: 4, category: "Cost Management", front: "Where would you find which service caused last month's cost spike?", back: "AWS Cost Explorer." },

  { id: "fc-aws-cost-and-usage-report-1", serviceId: "aws-cost-and-usage-report", domain: 4, category: "Cost Management", front: "What is the Cost and Usage Report (CUR)?", back: "The most granular, line-item billing data export, meant for deep analysis or BI tool integration." },
  { id: "fc-aws-cost-and-usage-report-2", serviceId: "aws-cost-and-usage-report", domain: 4, category: "Cost Management", front: "When would you reach for CUR instead of Cost Explorer?", back: "When you need raw, granular billing data to feed into your own custom analysis/BI pipeline." },

  { id: "fc-savings-plans-reserved-spot-1", serviceId: "savings-plans-reserved-spot", domain: 4, category: "Cost Management", front: "Which purchasing option gives the deepest discount but risks interruption?", back: "Spot Instances." },
  { id: "fc-savings-plans-reserved-spot-2", serviceId: "savings-plans-reserved-spot", domain: 4, category: "Cost Management", front: "Savings Plans vs Reserved Instances — key advantage of Savings Plans?", back: "More flexibility across instance families/regions while still getting a committed-use discount." },
  { id: "fc-savings-plans-reserved-spot-3", serviceId: "savings-plans-reserved-spot", domain: 4, category: "Cost Management", front: "Taglish: Kailan gagamit ng Spot Instances?", back: "Kapag interruption-tolerant ang workload — puwedeng maputol at ituloy lang ulit, gaya ng batch jobs." },
  { id: "fc-savings-plans-reserved-spot-4", serviceId: "savings-plans-reserved-spot", domain: 4, category: "Cost Management", front: "Which two options need no long-term commitment?", back: "On-Demand and Spot Instances." },
  { id: "fc-savings-plans-reserved-spot-5", serviceId: "savings-plans-reserved-spot", domain: 4, category: "Cost Management", front: "Can a fleet use more than one purchasing option at once?", back: "Yes — real (and exam) architectures often mix purchasing options matched to each workload's shape." },

  { id: "fc-aws-amplify-1", serviceId: "aws-amplify", domain: 3, category: "Front-End Web and Mobile", front: "What is AWS Amplify for?", back: "Quickly building and hosting full-stack web/mobile applications, with built-in CI/CD." },
  { id: "fc-aws-amplify-2", serviceId: "aws-amplify", domain: 3, category: "Front-End Web and Mobile", front: "Who is Amplify's ideal user?", back: "A small team wanting to quickly build/deploy a frontend connected to AWS backend services." },

  { id: "fc-amazon-api-gateway-1", serviceId: "amazon-api-gateway", domain: 3, category: "Front-End Web and Mobile", front: "What is Amazon API Gateway?", back: "A fully managed front door for REST, HTTP, and WebSocket APIs, commonly fronting Lambda." },
  { id: "fc-amazon-api-gateway-2", serviceId: "amazon-api-gateway", domain: 2, category: "Front-End Web and Mobile", front: "What API Gateway feature protects a backend from too many requests?", back: "Throttling (rate limiting)." },
  { id: "fc-amazon-api-gateway-3", serviceId: "amazon-api-gateway", domain: 1, category: "Front-End Web and Mobile", front: "How can API Gateway authorize requests using Cognito?", back: "Via a Cognito User Pool authorizer, centralizing auth before requests reach Lambda." },
  { id: "fc-amazon-api-gateway-4", serviceId: "amazon-api-gateway", domain: 3, category: "Front-End Web and Mobile", front: "What's the classic serverless web app pattern involving API Gateway?", back: "CloudFront + S3 (frontend) -> API Gateway -> Lambda -> DynamoDB." },
  { id: "fc-amazon-api-gateway-5", serviceId: "amazon-api-gateway", domain: 3, category: "Front-End Web and Mobile", front: "Taglish: Bakit importante ang API Gateway?", back: "Siya ang 'pintuan' ng iyong mga API — nagha-handle ng throttling, security, at pag-route papunta sa Lambda o ibang backend." },

  { id: "fc-aws-device-farm-1", serviceId: "aws-device-farm", domain: 3, category: "Front-End Web and Mobile", front: "What is AWS Device Farm for?", back: "Testing mobile and web apps on real physical devices in the cloud." },
  { id: "fc-aws-device-farm-2", serviceId: "aws-device-farm", domain: 3, category: "Front-End Web and Mobile", front: "Why use Device Farm instead of buying devices?", back: "On-demand access to many real Android/iOS devices without buying/maintaining a physical device lab." },

  { id: "fc-amazon-comprehend-1", serviceId: "amazon-comprehend", domain: 3, category: "Machine Learning", front: "What does Amazon Comprehend do?", back: "Uses NLP to detect sentiment, entities, key phrases, language, and PII in text." },
  { id: "fc-amazon-comprehend-2", serviceId: "amazon-comprehend", domain: 3, category: "Machine Learning", front: "Taglish: Ano ang gawain ng Comprehend?", back: "Binabasa at inuunawa nito ang damdamin (sentiment) at kahulugan ng text — hindi ito nagsasalin o nagpapatugtog ng audio." },

  { id: "fc-amazon-lex-1", serviceId: "amazon-lex", domain: 3, category: "Machine Learning", front: "What is Amazon Lex used for?", back: "Building conversational chatbots and voice interfaces — the same tech behind Alexa." },
  { id: "fc-amazon-lex-2", serviceId: "amazon-lex", domain: 3, category: "Machine Learning", front: "What AWS service commonly fulfills a Lex intent?", back: "AWS Lambda." },

  { id: "fc-amazon-polly-1", serviceId: "amazon-polly", domain: 3, category: "Machine Learning", front: "Polly vs Transcribe direction?", back: "Polly: text -> speech. Transcribe: speech -> text (opposite directions)." },
  { id: "fc-amazon-polly-2", serviceId: "amazon-polly", domain: 3, category: "Machine Learning", front: "What markup language gives fine control over Polly's speech output?", back: "SSML (Speech Synthesis Markup Language)." },

  { id: "fc-amazon-rekognition-1", serviceId: "amazon-rekognition", domain: 3, category: "Machine Learning", front: "What does Amazon Rekognition analyze?", back: "Images and video — for objects, scenes, faces, text, and inappropriate content." },
  { id: "fc-amazon-rekognition-2", serviceId: "amazon-rekognition", domain: 3, category: "Machine Learning", front: "Rekognition vs Textract — which handles scanned forms/invoices?", back: "Textract — Rekognition is for general image/video analysis, not structured document extraction." },

  { id: "fc-amazon-sagemaker-ai-1", serviceId: "amazon-sagemaker-ai", domain: 3, category: "Machine Learning", front: "When should you choose SageMaker AI over a pre-built AI service?", back: "Only when the problem needs a genuinely custom-trained model that no pre-built service (Comprehend, Rekognition, etc.) already solves." },
  { id: "fc-amazon-sagemaker-ai-2", serviceId: "amazon-sagemaker-ai", domain: 3, category: "Machine Learning", front: "Taglish: Bakit hindi laging SageMaker AI ang sagot?", back: "Kasi kung may ready-made na service na (tulad ng Comprehend) na sakto sa problema, sayang lang ang oras at effort na mag-train ng sariling model." },

  { id: "fc-amazon-textract-1", serviceId: "amazon-textract", domain: 3, category: "Machine Learning", front: "What does Amazon Textract extract beyond raw OCR text?", back: "Key-value form pairs and table structure (rows/columns), plus handwriting." },
  { id: "fc-amazon-textract-2", serviceId: "amazon-textract", domain: 3, category: "Machine Learning", front: "'Extract data from scanned invoices/forms' points to which service?", back: "Amazon Textract." },

  { id: "fc-amazon-transcribe-1", serviceId: "amazon-transcribe", domain: 3, category: "Machine Learning", front: "What is Amazon Transcribe for?", back: "Converting spoken audio into text (speech-to-text), with optional speaker labeling." },
  { id: "fc-amazon-transcribe-2", serviceId: "amazon-transcribe", domain: 3, category: "Machine Learning", front: "Can Transcribe label which speaker said what?", back: "Yes — via automatic speaker diarization." },

  { id: "fc-amazon-translate-1", serviceId: "amazon-translate", domain: 3, category: "Machine Learning", front: "What is Amazon Translate for?", back: "Machine translation of text between languages." },
  { id: "fc-amazon-translate-2", serviceId: "amazon-translate", domain: 3, category: "Machine Learning", front: "How do you get translated content spoken aloud?", back: "Chain Amazon Translate (translate the text) with Amazon Polly (convert to speech)." },

  { id: "fc-amazon-elastic-transcoder-1", serviceId: "amazon-elastic-transcoder", domain: 3, category: "Media Services", front: "What is Amazon Elastic Transcoder for?", back: "Converting/transcoding existing video files into different formats and resolutions." },
  { id: "fc-amazon-elastic-transcoder-2", serviceId: "amazon-elastic-transcoder", domain: 3, category: "Media Services", front: "Elastic Transcoder vs Kinesis Video Streams?", back: "Elastic Transcoder converts existing files; Kinesis Video Streams ingests live video streams." },

  { id: "fc-amazon-kinesis-video-streams-1", serviceId: "amazon-kinesis-video-streams", domain: 3, category: "Media Services", front: "What is Amazon Kinesis Video Streams for?", back: "Ingesting, processing, and durably storing live (or batch) video from devices like cameras." },
  { id: "fc-amazon-kinesis-video-streams-2", serviceId: "amazon-kinesis-video-streams", domain: 3, category: "Media Services", front: "Kinesis Video Streams vs Kinesis Data Streams?", back: "Video Streams is video/time-encoded media specific; Data Streams handles generic real-time data records." },

  { id: "fc-aws-cli-1", serviceId: "aws-cli", domain: 4, category: "Management and Governance", front: "What is the AWS CLI for?", back: "Scriptable, text-based command-line access to virtually every AWS service — great for automation." },
  { id: "fc-aws-cli-2", serviceId: "aws-cli", domain: 4, category: "Management and Governance", front: "CLI vs Console — which is better for repeatable, auditable operations?", back: "The CLI (or infrastructure as code) — the Console is better for visual, one-off exploration." },

  { id: "fc-aws-management-console-1", serviceId: "aws-management-console", domain: 4, category: "Management and Governance", front: "What is the AWS Management Console?", back: "The browser-based, visual interface for exploring and managing AWS resources." },
  { id: "fc-aws-management-console-2", serviceId: "aws-management-console", domain: 4, category: "Management and Governance", front: "What browser-based CLI environment is built into the Console?", back: "AWS CloudShell." },

  { id: "fc-aws-health-dashboard-1", serviceId: "aws-health-dashboard", domain: 2, category: "Management and Governance", front: "What does the personalized AWS Health view show that the public Service Health Dashboard doesn't?", back: "Account-specific events — like scheduled maintenance actually affecting your own resources." },
  { id: "fc-aws-health-dashboard-2", serviceId: "aws-health-dashboard", domain: 2, category: "Management and Governance", front: "Health Dashboard vs CloudWatch?", back: "Health Dashboard: AWS-side service health/maintenance. CloudWatch: your own application/infrastructure monitoring." },

  { id: "fc-aws-license-manager-1", serviceId: "aws-license-manager", domain: 4, category: "Management and Governance", front: "What is AWS License Manager for?", back: "Tracking and enforcing software license usage/entitlements, including bring-your-own-license (BYOL)." },
  { id: "fc-aws-license-manager-2", serviceId: "aws-license-manager", domain: 4, category: "Management and Governance", front: "Can License Manager block a non-compliant instance launch?", back: "Yes — it can prevent launches that would exceed a defined license entitlement." },

  { id: "fc-amazon-managed-grafana-1", serviceId: "amazon-managed-grafana", domain: 3, category: "Management and Governance", front: "What is Amazon Managed Grafana for?", back: "Fully managed, Grafana-compatible dashboards for visualizing operational data — no self-hosted Grafana servers." },
  { id: "fc-amazon-managed-grafana-2", serviceId: "amazon-managed-grafana", domain: 3, category: "Management and Governance", front: "Managed Grafana vs Managed Service for Prometheus?", back: "Grafana visualizes; Prometheus stores and queries the underlying metrics — they're commonly paired together." },

  { id: "fc-amazon-managed-service-for-prometheus-1", serviceId: "amazon-managed-service-for-prometheus", domain: 3, category: "Management and Governance", front: "What is Amazon Managed Service for Prometheus for?", back: "Fully managed, Prometheus-compatible metrics storage and querying, commonly for containerized workloads." },
  { id: "fc-amazon-managed-service-for-prometheus-2", serviceId: "amazon-managed-service-for-prometheus", domain: 3, category: "Management and Governance", front: "Taglish: Bakit gagamit ng Managed Service for Prometheus?", back: "Kapag gumagamit ka na ng Prometheus/PromQL, pero ayaw mo nang magpatakbo at mag-maintain ng sarili mong Prometheus server." },

  { id: "fc-aws-well-architected-tool-1", serviceId: "aws-well-architected-tool", domain: 2, category: "Management and Governance", front: "What are the six Well-Architected Framework pillars?", back: "Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability." },
  { id: "fc-aws-well-architected-tool-2", serviceId: "aws-well-architected-tool", domain: 2, category: "Management and Governance", front: "Does the Well-Architected Tool fix architecture problems automatically?", back: "No — it only surfaces risks and recommendations; your team must act on them." },
];
