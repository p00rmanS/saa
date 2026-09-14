import type { Flashcard } from "@/lib/types";

export const computeFlashcards: Flashcard[] = [
  // amazon-ec2
  { id: "fc-amazon-ec2-1", serviceId: "amazon-ec2", domain: 3, category: "Compute", front: "What is Amazon EC2?", back: "A virtual server (VM) where you control the OS, runtime, and installed software." },
  { id: "fc-amazon-ec2-2", serviceId: "amazon-ec2", domain: 3, category: "Compute", front: "Is an EC2 instance highly available by default?", back: "No — it runs in a single AZ. High availability requires multiple instances across multiple AZs behind a load balancer." },
  { id: "fc-amazon-ec2-3", serviceId: "amazon-ec2", domain: 4, category: "Compute", front: "Which EC2 purchasing option is cheapest for interruptible workloads?", back: "Spot Instances." },
  { id: "fc-amazon-ec2-4", serviceId: "amazon-ec2", domain: 4, category: "Compute", front: "Which EC2 purchasing option is best for a known, steady 3-year workload?", back: "Reserved Instances or Savings Plans." },
  { id: "fc-amazon-ec2-5", serviceId: "amazon-ec2", domain: 3, category: "Compute", front: "Taglish: Bakit dapat i-treat ang EC2 instances as \"disposable\"?", back: "Kasi kahit mamatay ang isang instance, dapat may kapalit agad — kaya inilalagay ang importanteng data sa EBS, S3, o database, hindi sa loob lang ng instance." },

  // ec2-auto-scaling
  { id: "fc-ec2-auto-scaling-1", serviceId: "ec2-auto-scaling", domain: 2, category: "Compute", front: "What are the two core jobs of an Auto Scaling group?", back: "Elasticity (match capacity to demand) and self-healing (replace unhealthy instances)." },
  { id: "fc-ec2-auto-scaling-2", serviceId: "ec2-auto-scaling", domain: 2, category: "Compute", front: "What defines a new instance's AMI, instance type, and IAM role in an ASG?", back: "The launch template." },
  { id: "fc-ec2-auto-scaling-3", serviceId: "ec2-auto-scaling", domain: 4, category: "Compute", front: "What's the recommended default scaling policy type?", back: "Target tracking scaling." },
  { id: "fc-ec2-auto-scaling-4", serviceId: "ec2-auto-scaling", domain: 2, category: "Compute", front: "Does an ASG use EC2 or ELB health checks by default?", back: "EC2 status checks by default — ELB health checks must be explicitly enabled." },
  { id: "fc-ec2-auto-scaling-5", serviceId: "ec2-auto-scaling", domain: 2, category: "Compute", front: "Taglish: Ano ang ginagawa ng Auto Scaling kapag namatay ang isang instance?", back: "Automatic siyang gagawa ng bagong instance mula sa launch template para mapanatili ang desired capacity." },

  // elastic-load-balancing
  { id: "fc-elastic-load-balancing-1", serviceId: "elastic-load-balancing", domain: 3, category: "Compute", front: "ALB operates at which layer?", back: "Layer 7 (HTTP/HTTPS) — supports path/host-based content routing." },
  { id: "fc-elastic-load-balancing-2", serviceId: "elastic-load-balancing", domain: 3, category: "Compute", front: "NLB operates at which layer, and what's its standout feature?", back: "Layer 4 (TCP/UDP/TLS) — extreme performance and a static IP per AZ." },
  { id: "fc-elastic-load-balancing-3", serviceId: "elastic-load-balancing", domain: 3, category: "Compute", front: "What is Gateway Load Balancer for?", back: "Transparently inserting third-party network appliances (firewalls, IDS/IPS) in front of traffic, using GENEVE." },
  { id: "fc-elastic-load-balancing-4", serviceId: "elastic-load-balancing", domain: 3, category: "Compute", front: "\"Needs a static IP address\" points to which load balancer?", back: "Network Load Balancer (NLB)." },
  { id: "fc-elastic-load-balancing-5", serviceId: "elastic-load-balancing", domain: 3, category: "Compute", front: "Taglish: ALB vs NLB vs GWLB, paano mo maiiba agad?", back: "ALB = 'path/host routing' (web). NLB = 'static IP / extreme performance' (raw TCP/UDP). GWLB = 'firewall/appliance/inspection'." },

  // aws-lambda
  { id: "fc-aws-lambda-1", serviceId: "aws-lambda", domain: 3, category: "Serverless", front: "How is Lambda billed?", back: "Per request plus GB-seconds (memory x duration). Nothing when idle." },
  { id: "fc-aws-lambda-2", serviceId: "aws-lambda", domain: 3, category: "Serverless", front: "What is a Lambda cold start?", back: "The extra latency the first time (or after idling) a function runs, while AWS initializes the execution environment." },
  { id: "fc-aws-lambda-3", serviceId: "aws-lambda", domain: 3, category: "Serverless", front: "How do you avoid Lambda cold starts for a latency-sensitive API?", back: "Use provisioned concurrency to keep environments pre-warmed." },
  { id: "fc-aws-lambda-4", serviceId: "aws-lambda", domain: 3, category: "Serverless", front: "What is Lambda's maximum execution duration signal for?", back: "It rules Lambda out for long-running tasks — consider Fargate, EC2, or Batch instead." },
  { id: "fc-aws-lambda-5", serviceId: "aws-lambda", domain: 3, category: "Serverless", front: "Taglish: Bakit sabihing 'least operational overhead' ay malapit sa Lambda?", back: "Kasi wala kang seserbisyuhang server — basta code lang ang inaalala mo, AWS na ang bahala sa scaling at infrastructure." },

  // aws-fargate
  { id: "fc-aws-fargate-1", serviceId: "aws-fargate", domain: 3, category: "Serverless", front: "What does Fargate remove from ECS/EKS operations?", back: "The need to provision, patch, or scale EC2 instances underneath your containers." },
  { id: "fc-aws-fargate-2", serviceId: "aws-fargate", domain: 3, category: "Serverless", front: "How is Fargate billed?", back: "Per vCPU and memory requested by each task, per second." },
  { id: "fc-aws-fargate-3", serviceId: "aws-fargate", domain: 3, category: "Serverless", front: "What's the discount option for interruption-tolerant Fargate workloads?", back: "Fargate Spot." },
  { id: "fc-aws-fargate-4", serviceId: "aws-fargate", domain: 3, category: "Serverless", front: "Can you SSH into the host running a Fargate task?", back: "No — Fargate does not expose the underlying host." },
  { id: "fc-aws-fargate-5", serviceId: "aws-fargate", domain: 3, category: "Serverless", front: "Taglish: Fargate vs EC2 launch type — ano ang pinagkaiba?", back: "Sa EC2 launch type, ikaw pa rin ang nagma-manage ng mga instance. Sa Fargate, wala nang instance na aalagaan — resources lang ng container ang binabayaran." },

  // amazon-ecs
  { id: "fc-amazon-ecs-1", serviceId: "amazon-ecs", domain: 3, category: "Containers", front: "Is Amazon ECS Kubernetes?", back: "No — ECS is AWS's own proprietary container orchestration API, not Kubernetes." },
  { id: "fc-amazon-ecs-2", serviceId: "amazon-ecs", domain: 3, category: "Containers", front: "What defines a container's image, CPU/memory, and IAM role in ECS?", back: "A task definition." },
  { id: "fc-amazon-ecs-3", serviceId: "amazon-ecs", domain: 3, category: "Containers", front: "What are ECS's two launch types?", back: "EC2 launch type and Fargate launch type." },
  { id: "fc-amazon-ecs-4", serviceId: "amazon-ecs", domain: 3, category: "Containers", front: "When should you pick ECS over EKS?", back: "When the team wants simple AWS-native orchestration and does not need Kubernetes tooling or multi-cloud portability." },
  { id: "fc-amazon-ecs-5", serviceId: "amazon-ecs", domain: 3, category: "Containers", front: "Taglish: Bakit mas simple ang ECS kumpara sa EKS?", back: "Kasi AWS-native ang ECS — walang Kubernetes na dapat pang matutunan, direkta na sa AWS console/API pwede." },

  // amazon-eks
  { id: "fc-amazon-eks-1", serviceId: "amazon-eks", domain: 3, category: "Containers", front: "What does EKS manage for you?", back: "The Kubernetes control plane (API server, etcd, scheduler), across multiple AZs." },
  { id: "fc-amazon-eks-2", serviceId: "amazon-eks", domain: 3, category: "Containers", front: "What lets an individual Kubernetes pod on EKS assume a specific least-privilege IAM role?", back: "IAM Roles for Service Accounts (IRSA)." },
  { id: "fc-amazon-eks-3", serviceId: "amazon-eks", domain: 3, category: "Containers", front: "What are EKS's worker node options?", back: "Self-managed EC2, EKS Managed Node Groups (EC2), or Fargate." },
  { id: "fc-amazon-eks-4", serviceId: "amazon-eks", domain: 2, category: "Containers", front: "When should you pick EKS over ECS?", back: "When you need real Kubernetes APIs/tooling, Helm charts, or multi-cloud portability." },
  { id: "fc-amazon-eks-5", serviceId: "amazon-eks", domain: 3, category: "Containers", front: "Does managing the EKS control plane also mean AWS manages your worker nodes?", back: "No — unless you use Fargate, you still manage the worker nodes yourself." },

  // aws-elastic-beanstalk
  { id: "fc-aws-elastic-beanstalk-1", serviceId: "aws-elastic-beanstalk", domain: 3, category: "Compute", front: "What is Elastic Beanstalk?", back: "A PaaS that automatically provisions EC2, Auto Scaling, and a load balancer from just your uploaded application code." },
  { id: "fc-aws-elastic-beanstalk-2", serviceId: "aws-elastic-beanstalk", domain: 3, category: "Compute", front: "Is Elastic Beanstalk serverless?", back: "No — it runs on EC2 instances underneath, which you can still access." },
  { id: "fc-aws-elastic-beanstalk-3", serviceId: "aws-elastic-beanstalk", domain: 3, category: "Compute", front: "Taglish: Sino best-fit sa Elastic Beanstalk?", back: "Yung team na gustong mabilis mag-deploy ng web app, pero gusto pa rin nilang ma-access ang underlying EC2 kung kailangan." },

  // aws-batch
  { id: "fc-aws-batch-1", serviceId: "aws-batch", domain: 3, category: "Compute", front: "What workload type is AWS Batch designed for?", back: "Queued batch computing jobs (simulations, rendering, ETL) — not live user traffic." },
  { id: "fc-aws-batch-2", serviceId: "aws-batch", domain: 3, category: "Compute", front: "What does an AWS Batch compute environment do?", back: "Dynamically provisions EC2, Spot, or Fargate capacity to run queued jobs." },
  { id: "fc-aws-batch-3", serviceId: "aws-batch", domain: 4, category: "Compute", front: "How does Batch keep costs low for large job volumes?", back: "It integrates well with Spot Instances since failed/interrupted jobs are simply retried." },

  // amazon-ecr
  { id: "fc-amazon-ecr-1", serviceId: "amazon-ecr", domain: 1, category: "Containers", front: "What is Amazon ECR?", back: "A fully managed container image registry." },
  { id: "fc-amazon-ecr-2", serviceId: "amazon-ecr", domain: 3, category: "Containers", front: "Which services typically pull images from ECR?", back: "ECS and EKS (and Fargate, as a launch type of either)." },
  { id: "fc-amazon-ecr-3", serviceId: "amazon-ecr", domain: 1, category: "Containers", front: "What ECR feature helps catch vulnerabilities before deployment?", back: "Built-in image scanning." },

  // tier 3
  { id: "fc-aws-outposts-1", serviceId: "aws-outposts", domain: 3, category: "Compute", front: "What does AWS Outposts provide?", back: "AWS infrastructure and APIs physically installed in your own data center." },
  { id: "fc-aws-outposts-2", serviceId: "aws-outposts", domain: 3, category: "Compute", front: "When would you pick Outposts?", back: "When low latency or data-residency rules require AWS services to run physically on-premises." },

  { id: "fc-aws-serverless-application-repository-1", serviceId: "aws-serverless-application-repository", domain: 3, category: "Compute", front: "What is the AWS Serverless Application Repository?", back: "A catalog for discovering and deploying pre-built, reusable serverless applications." },
  { id: "fc-aws-serverless-application-repository-2", serviceId: "aws-serverless-application-repository", domain: 3, category: "Compute", front: "SAR mostly saves you time on what?", back: "Writing serverless (often Lambda-based) applications from scratch." },

  { id: "fc-vmware-cloud-on-aws-1", serviceId: "vmware-cloud-on-aws", domain: 3, category: "Compute", front: "What is VMware Cloud on AWS for?", back: "Running existing VMware vSphere workloads on AWS with minimal re-architecture." },
  { id: "fc-vmware-cloud-on-aws-2", serviceId: "vmware-cloud-on-aws", domain: 3, category: "Compute", front: "Who is the ideal customer for VMware Cloud on AWS?", back: "Companies heavily invested in VMware tooling wanting a low-effort migration to AWS." },

  { id: "fc-aws-wavelength-1", serviceId: "aws-wavelength", domain: 3, category: "Compute", front: "What problem does AWS Wavelength solve?", back: "Ultra-low latency for applications reaching mobile devices over 5G carrier networks." },
  { id: "fc-aws-wavelength-2", serviceId: "aws-wavelength", domain: 3, category: "Compute", front: "Give an example use case for AWS Wavelength.", back: "Mobile AR/VR gaming needing single-digit millisecond latency." },

  { id: "fc-amazon-ecs-anywhere-1", serviceId: "amazon-ecs-anywhere", domain: 3, category: "Containers", front: "What is Amazon ECS Anywhere?", back: "Run ECS-managed containers on your own on-premises infrastructure, using the same ECS APIs." },
  { id: "fc-amazon-ecs-anywhere-2", serviceId: "amazon-ecs-anywhere", domain: 3, category: "Containers", front: "Why choose ECS Anywhere over plain on-prem Docker?", back: "You keep using the same ECS console/API/tooling you already use in AWS." },

  { id: "fc-amazon-eks-anywhere-1", serviceId: "amazon-eks-anywhere", domain: 3, category: "Containers", front: "What is Amazon EKS Anywhere?", back: "Deploy and operate Kubernetes clusters on your own infrastructure using EKS tooling." },
  { id: "fc-amazon-eks-anywhere-2", serviceId: "amazon-eks-anywhere", domain: 3, category: "Containers", front: "When is EKS Anywhere the right choice?", back: "When workloads must stay fully on-premises for compliance, but you still want EKS-consistent tooling." },

  { id: "fc-amazon-eks-distro-1", serviceId: "amazon-eks-distro", domain: 3, category: "Containers", front: "What is Amazon EKS Distro?", back: "The open-source Kubernetes distribution behind EKS, usable independently, without AWS managing anything." },
  { id: "fc-amazon-eks-distro-2", serviceId: "amazon-eks-distro", domain: 3, category: "Containers", front: "EKS Distro vs EKS Anywhere — what's the difference?", back: "EKS Distro is just the Kubernetes build itself (fully self-managed); EKS Anywhere adds AWS-supported deployment/management tooling on top of it for on-prem clusters." },
];
