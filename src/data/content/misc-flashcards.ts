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

  { id: "fc-machine-learning-services-overview-1", serviceId: "machine-learning-services-overview", domain: 3, category: "Machine Learning", front: "Match: Rekognition, Polly, Transcribe, Translate, Comprehend, Textract, Lex, SageMaker AI.", back: "Rekognition=image/video analysis. Polly=text-to-speech. Transcribe=speech-to-text. Translate=language translation. Comprehend=NLP/sentiment. Textract=extract text from documents. Lex=chatbots. SageMaker AI=build/train/deploy custom ML models." },
  { id: "fc-machine-learning-services-overview-2", serviceId: "machine-learning-services-overview", domain: 3, category: "Machine Learning", front: "Taglish: Paano mo maiiba ang Polly sa Transcribe?", back: "Polly: text papuntang audio (text-to-speech). Transcribe: audio papuntang text (speech-to-text) — magkabaligtad sila." },

  { id: "fc-media-services-overview-1", serviceId: "media-services-overview", domain: 3, category: "Media Services", front: "Elastic Transcoder vs Kinesis Video Streams?", back: "Elastic Transcoder: converts/transcodes media files. Kinesis Video Streams: ingests/processes live video streams." },
  { id: "fc-media-services-overview-2", serviceId: "media-services-overview", domain: 3, category: "Media Services", front: "Which service fits ingesting live camera feeds from thousands of devices?", back: "Amazon Kinesis Video Streams." },

  { id: "fc-management-governance-extras-1", serviceId: "management-governance-extras", domain: 4, category: "Management and Governance", front: "What is the AWS Well-Architected Tool for?", back: "A self-service review of your architecture against AWS's best-practice pillars." },
  { id: "fc-management-governance-extras-2", serviceId: "management-governance-extras", domain: 4, category: "Management and Governance", front: "What is Amazon Managed Grafana / Managed Prometheus for?", back: "Managed dashboards (Grafana) and managed metrics (Prometheus) without self-hosting either." },
  { id: "fc-management-governance-extras-3", serviceId: "management-governance-extras", domain: 4, category: "Management and Governance", front: "What shows AWS service health and planned maintenance events?", back: "AWS Health Dashboard." },
  { id: "fc-management-governance-extras-4", serviceId: "management-governance-extras", domain: 4, category: "Management and Governance", front: "What tracks software license usage/compliance across AWS?", back: "AWS License Manager." },
];
