# AWS Certified Solutions Architect – Associate (SAA-C03)
## Codex Project Specification for a Udemy/Coursera-Style Learning Platform

> **Purpose:** Build a complete interactive web-based training platform for the **AWS Certified Solutions Architect – Associate (SAA-C03)** exam.
>
> The platform should feel like a premium combination of **Udemy + Coursera + AWS Skill Builder**, but with a highly practical mentor-led teaching style:
>
> - simple explanations first
> - realistic architecture examples
> - exam-focused decision making
> - Taglish explanations
> - memorable analogies
> - service-by-service teaching
> - “why this service?” and “why not the alternative?”
> - architecture diagrams
> - labs
> - quizzes
> - flashcards
> - progress tracking
> - mock exams
> - scenario-based reasoning
>
> **Important:** Do not imitate any instructor word-for-word or copy proprietary course material. The teaching style can be **concise, exam-focused, visual, practical, and mentor-like**, similar to a strong AWS certification instructor.

---

# 1. Project Goal

Create a web application that can take a learner from:

**AWS beginner → architecture thinker → SAA-C03 exam-ready candidate**

The learner should not simply memorize AWS service definitions.

The learner should understand:

1. What the service is.
2. Why AWS created it.
3. What problem it solves.
4. What happens when you use it.
5. What happens if you do not use it.
6. When it is the best choice.
7. When it is the wrong choice.
8. What similar AWS services could be alternatives.
9. How pricing affects the architecture.
10. How availability, durability, scalability, security, and performance affect the decision.
11. How the service appears in SAA-style scenario questions.
12. How it connects to other AWS services in a real architecture.

---

# 2. Certification Source of Truth

Use the current **AWS Certified Solutions Architect – Associate SAA-C03 Exam Guide** as the primary curriculum source.

The platform must align to the four official exam domains:

| Domain | Weight |
|---|---:|
| Design Secure Architectures | 30% |
| Design Resilient Architectures | 26% |
| Design High-Performing Architectures | 24% |
| Design Cost-Optimized Architectures | 20% |

The training should reflect these weightings.

Do not make every section the same length.

Security and resiliency should receive more depth because they represent the largest portions of the scored exam.

---

# 3. Target Learner

Primary learner profile:

- knows basic AWS or has passed AWS Cloud Practitioner
- has some IT/networking background
- wants to become an AWS Solutions Architect
- does not want overly academic explanations
- wants to understand AWS from the ground up
- learns well from analogies and realistic examples
- benefits from English + Taglish explanation
- wants to know how to eliminate wrong answers in AWS exam scenarios

Assume the learner may know terms such as:

- VPC
- subnet
- IP address
- DNS
- database
- server
- storage
- API

But never assume deep architecture knowledge.

---

# 4. Teaching Philosophy

Every topic must follow this progression:

**Simple idea → analogy → technical explanation → architecture use case → alternatives → exam trap → practice**

Example:

> **Amazon S3**
>
> Simple idea: Storage for objects/files.
>
> Analogy: Parang malaking warehouse na ang bawat box may sariling label/key.
>
> Technical: S3 is object storage accessed by API, designed for massive scale and high durability.
>
> Use case: Static website assets, backups, logs, data lakes.
>
> Alternative: EBS if an EC2 instance needs block storage.
>
> Exam trap: Do not choose EBS for millions of independent objects that need global-scale object access.
>
> Practice: “A company needs durable storage for 20 TB of images accessed by multiple applications…”

---

# 5. Language Style

Each lesson should have three explanation modes.

## Mode A — Simple English

Explain the idea as if teaching a smart beginner.

Avoid unnecessary jargon.

If jargon is required, explain it immediately.

Example:

> A load balancer receives traffic first and distributes that traffic to multiple servers.

---

## Mode B — Taglish

Use natural Taglish.

Example:

> Isipin mo may restaurant ka na may 10 servers. Hindi puwedeng lahat ng customers pumunta sa isang server lang. Si Load Balancer parang host sa entrance — siya ang nagdi-distribute ng guests para hindi ma-overload ang isang server.

---

## Mode C — Architect Mode

Explain the same concept using professional AWS architecture terminology.

Example:

> An Application Load Balancer distributes Layer 7 HTTP/HTTPS requests across registered targets in multiple Availability Zones and supports host-based and path-based routing.

---

# 6. Required Lesson Structure

Every AWS service lesson must contain all sections below.

## 6.1 Service Name

Example:

`Amazon EC2`

---

## 6.2 One-Sentence Definition

One clean sentence.

---

## 6.3 Explain It Like I Am New

2–5 short paragraphs.

---

## 6.4 Taglish Explanation

Explain naturally and clearly.

---

## 6.5 Real-Life Analogy

Examples:

- restaurant
- hotel
- airport
- warehouse
- school
- shopping mall
- delivery company
- bank
- apartment building
- highway system

Do not force the same analogy for every service.

---

## 6.6 Why Does This Service Exist?

Answer:

> “What problem would we have if AWS did not provide this?”

---

## 6.7 What Happens When You Use It?

Describe the actual flow.

For example:

User → Route 53 → CloudFront → ALB → EC2 → RDS

---

## 6.8 What Happens If You Do Not Use It?

Example:

Without Auto Scaling:

- traffic spikes can overload servers
- manual provisioning may be required
- application availability may decrease

---

## 6.9 Best Use Cases

Include 3–7 realistic use cases.

---

## 6.10 Poor Use Cases

Teach where the service should NOT be used.

---

## 6.11 Closest Alternatives

Include a comparison table.

Example:

| Need | Choose |
|---|---|
| Virtual server | EC2 |
| Run code without managing server | Lambda |
| Containers without managing EC2 | Fargate |
| Kubernetes | EKS |

---

## 6.12 Key Features

Only include features that matter for architecture or the SAA exam.

---

## 6.13 Availability / Durability / Scalability

For every major service explain:

- regional or global?
- AZ-scoped or multi-AZ?
- stateful or stateless?
- horizontally scalable?
- automatically scalable?
- durability implications
- failover options

---

## 6.14 Security

Explain:

- IAM
- encryption
- network access
- resource policies
- security groups when applicable
- KMS when applicable
- Secrets Manager when applicable

---

## 6.15 Pricing Logic

Do not require memorizing exact prices.

Teach the pricing model.

Examples:

- per second/hour
- requests
- storage GB-month
- data transfer
- provisioned capacity
- serverless consumption
- NAT processing charges
- cross-AZ traffic

---

## 6.16 Exam Keywords

Show words that should trigger the learner to consider the service.

Example:

**SQS keywords**
- decouple
- buffer
- asynchronous
- queue
- retry
- producer/consumer

---

## 6.17 Common Exam Traps

Example:

> Multi-AZ is mainly for availability.
>
> Read replicas are mainly for read scaling.

---

## 6.18 Architecture Example

Always include at least one architecture.

ASCII example:

```text
Users
  |
Route 53
  |
CloudFront
  |
ALB
 / \
EC2 EC2
 \ /
RDS Multi-AZ
```

---

## 6.19 Mentor Advice

A short section:

> **Mentor Tip:** If the question emphasizes “minimum operational overhead,” prefer managed or serverless services when they satisfy the requirements.

---

## 6.20 Checkpoint Quiz

3–5 questions.

---

## 6.21 Scenario Question

At least one SAA-style architecture scenario.

Explain why every answer is right or wrong.

---

# 7. Course Structure

The site should contain the following learning path.

---

# PHASE 0 — Orientation

## Module 0.1 — What a Solutions Architect Actually Does

Teach:

- gather business requirements
- translate requirements into architecture
- design for security
- design for reliability
- design for performance
- design for cost
- consider operations
- compare tradeoffs

Explain:

> The SAA exam usually does not ask “What is EC2?”
>
> It asks: “Given these requirements, which architecture is BEST?”

---

## Module 0.2 — How to Read AWS Scenario Questions

Teach how to identify:

- requirement
- constraint
- key architecture signal
- distractors
- operational overhead
- cost
- availability
- performance
- data access pattern

Question parsing framework:

```text
1. What does the company need?
2. What constraint matters most?
3. What AWS services match?
4. Which answer violates a requirement?
5. Which remaining answer is MOST appropriate?
```

---

## Module 0.3 — AWS Global Infrastructure

Topics:

- Regions
- Availability Zones
- edge locations
- regional services
- global services
- high availability
- multi-AZ
- multi-Region

Analogy:

> Region = city  
> Availability Zone = separate buildings in that city  
> Multi-Region = separate cities

---

# PHASE 1 — AWS Foundations for Architecture

## Module 1 — IAM and Identity

Teach:

- root user
- IAM users
- groups
- roles
- policies
- identity-based policies
- resource-based policies
- STS
- temporary credentials
- cross-account access
- MFA
- least privilege
- IAM Identity Center
- AWS Organizations
- SCPs
- Control Tower
- federation

Major comparisons:

```text
IAM User vs IAM Role
Identity Policy vs Resource Policy
IAM vs IAM Identity Center
IAM Permission vs SCP
```

---

# PHASE 2 — Compute

## Module 2 — Amazon EC2

Teach deeply:

- instance families
- instance size
- AMIs
- user data
- metadata
- public/private IP
- ENI
- placement strategies
- stop/start/reboot/terminate
- hibernation
- instance store
- EBS attachment
- CPU credits if relevant conceptually
- horizontal vs vertical scaling

Purchasing options:

- On-Demand
- Reserved Instances
- Savings Plans
- Spot Instances

Architecture decisions:

```text
steady workload → consider commitment discounts
interruptible workload → Spot
unknown workload → On-Demand
```

---

## Module 3 — Auto Scaling

Teach:

- Auto Scaling Groups
- min / desired / max
- scaling policies
- target tracking
- health checks
- replacement
- launch templates

Real example:

E-commerce traffic:

```text
Normal:
2 EC2

Black Friday:
2 → 20 EC2

After traffic:
20 → 2 EC2
```

---

## Module 4 — Elastic Load Balancing

Teach:

### ALB
- HTTP/HTTPS
- Layer 7
- host routing
- path routing
- containers/microservices

### NLB
- TCP/UDP/TLS
- Layer 4
- extreme performance
- static IP use cases

### Gateway Load Balancer
- virtual network appliances

Comparison table is mandatory.

---

## Module 5 — AWS Lambda

Teach:

- serverless
- event-driven
- execution model
- triggers
- concurrency
- memory/CPU relationship
- timeout concept
- cold starts conceptually
- permissions
- VPC considerations
- stateless architecture

Compare:

```text
EC2 vs Lambda vs Fargate
```

---

## Module 6 — Elastic Beanstalk

Teach:

- managed application platform
- infrastructure automation
- EC2 + ALB + ASG underneath
- when developers want less infrastructure management

---

## Module 7 — AWS Batch

Teach realistic batch-processing architecture.

---

## Module 8 — AWS Outposts

Teach hybrid workloads requiring AWS infrastructure on premises.

---

# PHASE 3 — Storage

## Module 9 — Amazon S3

This must be one of the largest modules.

Teach:

- buckets
- objects
- keys
- prefixes
- object size concepts
- versioning
- lifecycle rules
- replication
- event notifications
- encryption
- bucket policies
- IAM
- presigned URLs
- static website hosting concept
- multipart upload
- performance concepts
- S3 Transfer Acceleration concept
- storage classes

Storage classes:

- S3 Standard
- S3 Intelligent-Tiering
- S3 Standard-IA
- S3 One Zone-IA
- S3 Glacier Instant Retrieval
- S3 Glacier Flexible Retrieval
- S3 Glacier Deep Archive

Decision practice:

> How often is the data accessed?

---

## Module 10 — Amazon EBS

Teach:

- block storage
- EC2 relationship
- snapshots
- encryption
- volume types
- IOPS vs throughput
- gp3
- io-class use cases
- HDD concepts

Compare:

```text
S3 vs EBS vs EFS
```

---

## Module 11 — Amazon EFS

Teach:

- shared Linux file system
- multiple EC2 instances
- multi-AZ architecture
- elastic capacity

---

## Module 12 — Amazon FSx

Teach the role of FSx family solutions and where managed specialized file systems fit.

---

## Module 13 — S3 Glacier / Archive Strategy

Teach:

- archive access patterns
- retrieval time tradeoffs
- lifecycle rules
- compliance/retention scenarios

---

## Module 14 — AWS Storage Gateway

Teach hybrid cloud storage patterns.

---

## Module 15 — AWS Backup

Teach centralized backup policies and multi-service backup strategy.

---

# PHASE 4 — Networking

## Module 16 — Amazon VPC

This must be a major module.

Teach:

- VPC
- CIDR
- public subnet
- private subnet
- route tables
- internet gateway
- NAT gateway
- security groups
- NACLs
- ENI
- elastic IP
- VPC endpoints
- flow logs concept
- DNS behavior conceptually

Architecture lab:

```text
Internet
   |
Internet Gateway
   |
Public Subnet
   |
ALB
   |
Private Subnet
   |
EC2
   |
Private DB Subnet
   |
RDS
```

---

## Module 17 — Security Groups vs NACLs

Comparison table:

| Feature | Security Group | NACL |
|---|---|---|
| Level | ENI / instance | subnet |
| Stateful | Yes | No |
| Allow rules | Yes | Yes |
| Deny rules | No | Yes |

Use visuals.

---

## Module 18 — NAT Gateway

Teach:

- private subnet outbound internet
- not for inbound internet access
- AZ architecture
- cost implications
- NAT gateway vs public IP
- VPC endpoints as cost/security alternative when accessing supported AWS services

---

## Module 19 — Route 53

Teach:

- DNS
- hosted zones
- routing policies
- health checks
- failover

Routing policies:

- simple
- weighted
- latency-based
- failover
- geolocation
- geoproximity concept if relevant
- multivalue

---

## Module 20 — CloudFront

Teach:

- CDN
- edge locations
- caching
- origin
- S3 origin
- ALB origin
- signed access conceptually
- HTTPS
- WAF integration

Compare:

```text
CloudFront vs Global Accelerator
```

---

## Module 21 — AWS Global Accelerator

Teach:

- global traffic routing
- static anycast IP concept
- TCP/UDP applications
- AWS global network

---

## Module 22 — Direct Connect

Teach:

- dedicated private network connection
- hybrid architectures
- consistent bandwidth
- not automatically encrypted

---

## Module 23 — Site-to-Site VPN

Teach:

- encrypted tunnel over internet
- faster setup
- lower cost than dedicated connection
- variable internet performance

Compare:

```text
VPN vs Direct Connect
```

---

## Module 24 — Transit Gateway

Teach:

> Hub-and-spoke networking for many VPCs and networks.

Compare with VPC peering.

---

## Module 25 — AWS PrivateLink

Teach private service access without exposing traffic to the public internet.

---

# PHASE 5 — Databases

## Module 26 — Database Decision Framework

Start with:

```text
Do I need relational?
Do I need NoSQL?
Do I need cache?
Do I need analytics?
Do I need graph?
Do I need document?
```

---

## Module 27 — Amazon RDS

Teach:

- managed relational database
- backups
- maintenance
- Multi-AZ
- read replicas
- storage scaling concept
- RDS Proxy
- database engines conceptually

Critical exam distinction:

```text
Multi-AZ = availability
Read Replica = read scalability
```

---

## Module 28 — Amazon Aurora

Teach:

- cloud-optimized relational database
- compatibility
- replication
- read scaling
- high availability
- Aurora Serverless

Compare:

```text
RDS vs Aurora
```

---

## Module 29 — DynamoDB

Teach deeply:

- NoSQL
- key-value/document
- partition key
- sort key
- access patterns
- capacity modes
- indexes conceptually
- TTL
- streams
- backups
- global tables
- low-latency workloads

Use realistic examples:

- shopping cart
- game leaderboard
- session store
- IoT metadata

---

## Module 30 — ElastiCache

Teach:

- Redis/Valkey style cache concepts
- Memcached concept
- session caching
- DB query offload
- low latency

---

## Module 31 — Amazon Redshift

Teach:

- data warehouse
- analytics
- OLAP
- columnar-style analytics concepts

---

## Module 32 — Amazon DocumentDB

Teach document workloads and how they differ from DynamoDB and relational databases.

---

## Module 33 — Amazon Neptune

Teach graph database use cases.

---

## Module 34 — Amazon Keyspaces

Teach Cassandra-compatible managed workloads conceptually.

---

# PHASE 6 — Application Integration and Decoupling

## Module 35 — Amazon SQS

Teach deeply:

- queue
- producers
- consumers
- polling
- visibility timeout
- retries
- dead-letter queue
- standard queues
- FIFO queues
- decoupling

Analogy:

> Restaurant order ticket queue.

---

## Module 36 — Amazon SNS

Teach:

- pub/sub
- one-to-many
- topics
- multiple subscribers

Compare:

```text
SQS = pull / queue
SNS = push / fanout
```

---

## Module 37 — SNS + SQS Fanout

Architecture:

```text
Order Event
   |
  SNS
 / | \
SQS SQS SQS
 |   |   |
Billing Inventory Analytics
```

---

## Module 38 — Amazon EventBridge

Teach:

- event bus
- event routing
- rules
- SaaS/AWS events
- decoupled event-driven systems

Compare:

```text
SNS vs EventBridge
```

---

## Module 39 — AWS Step Functions

Teach workflow orchestration:

- sequence
- retries
- choices
- parallel work
- waiting
- Lambda/service integration

---

## Module 40 — Amazon MQ

Teach managed message broker use cases, especially migration/compatibility scenarios.

---

## Module 41 — Amazon AppFlow

Teach managed SaaS-to-AWS data integration conceptually.

---

# PHASE 7 — Containers

## Module 42 — Container Fundamentals

Teach:

```text
VM = includes guest OS
Container = application + dependencies
```

---

## Module 43 — Amazon ECR

Teach container image registry.

---

## Module 44 — Amazon ECS

Teach:

- tasks
- services
- clusters
- EC2 launch type concept
- Fargate

---

## Module 45 — AWS Fargate

Teach:

> Run containers without managing servers.

Compare:

```text
ECS on EC2
ECS on Fargate
Lambda
```

---

## Module 46 — Amazon EKS

Teach:

- managed Kubernetes
- when Kubernetes compatibility is required
- why EKS can have more operational complexity than simpler managed options

---

# PHASE 8 — Security

## Module 47 — AWS KMS

Teach:

- encryption keys
- managed key service
- envelope encryption concept
- key policies
- integrations

---

## Module 48 — AWS Secrets Manager

Teach:

- passwords
- database credentials
- API secrets
- secret rotation concept

Do NOT recommend storing secrets in code.

---

## Module 49 — AWS Certificate Manager

Teach TLS certificates for supported AWS services.

---

## Module 50 — AWS WAF

Teach application-layer filtering.

Examples:

- SQL injection
- malicious request patterns
- IP rules

---

## Module 51 — AWS Shield

Teach DDoS protection.

Explain Standard vs Advanced conceptually.

---

## Module 52 — Amazon GuardDuty

Teach threat detection using AWS telemetry.

---

## Module 53 — Amazon Inspector

Teach vulnerability/exposure assessment use cases.

---

## Module 54 — Amazon Macie

Teach sensitive-data discovery in S3.

---

## Module 55 — AWS Security Hub

Teach centralized security posture findings.

---

## Module 56 — Amazon Detective

Teach investigation and security analysis relationships.

---

## Module 57 — AWS Network Firewall / Firewall Manager

Explain where centralized or VPC-level network protections fit.

---

## Module 58 — AWS CloudHSM

Teach dedicated hardware key management scenarios.

Compare with KMS at a high level.

---

## Module 59 — Amazon Cognito

Teach:

- application users
- sign-up/sign-in
- authentication for web/mobile users

Important:

> Cognito is not the same as IAM workforce/admin access.

---

# PHASE 9 — Monitoring, Governance, and Operations

## Module 60 — Amazon CloudWatch

Teach:

- metrics
- logs
- alarms
- dashboards
- events integration concepts

---

## Module 61 — AWS CloudTrail

Teach:

> Who did what, when, and from where?

Compare:

```text
CloudWatch = monitoring
CloudTrail = API/audit history
```

---

## Module 62 — AWS Config

Teach configuration history and compliance evaluation.

---

## Module 63 — AWS Systems Manager

Teach:

- operational management
- parameter concepts
- patch/command capabilities conceptually
- fleet management use cases

---

## Module 64 — AWS X-Ray

Teach distributed request tracing.

---

## Module 65 — AWS Trusted Advisor

Teach best-practice recommendations.

---

## Module 66 — AWS Compute Optimizer

Teach rightsizing recommendations.

---

## Module 67 — AWS CloudFormation

Teach infrastructure as code.

Important architecture idea:

> Rebuildable infrastructure improves consistency and disaster recovery.

---

## Module 68 — AWS Organizations / Control Tower / Service Catalog

Teach multi-account governance.

---

# PHASE 10 — Analytics and Data Processing

## Module 69 — Amazon Athena

Teach:

> Query data in S3 using SQL without managing servers.

---

## Module 70 — AWS Glue

Teach:

- ETL
- data catalog
- transformation

---

## Module 71 — Amazon Kinesis

Teach streaming data.

Architecture example:

```text
Applications
   |
Kinesis
   |
Processors
   |
S3 / analytics
```

---

## Module 72 — Amazon Data Firehose

Teach managed delivery of streaming data to supported destinations.

---

## Module 73 — Amazon EMR

Teach big data processing.

---

## Module 74 — AWS Lake Formation

Teach data lake governance.

---

## Module 75 — Amazon OpenSearch Service

Teach search/log analytics use cases.

---

## Module 76 — Amazon MSK

Teach managed Apache Kafka scenarios.

---

## Module 77 — Amazon Quick / Visualization Concepts

Teach managed business intelligence / visualization concepts at exam-relevant depth.

---

# PHASE 11 — Migration and Hybrid

## Module 78 — AWS DMS

Teach database migration:

- homogeneous
- heterogeneous
- minimal downtime concept

---

## Module 79 — AWS DataSync

Teach online high-speed file/object data movement.

---

## Module 80 — AWS Snow Family

Teach physical/offline transfer scenarios.

---

## Module 81 — AWS Transfer Family

Teach managed SFTP/FTPS/FTP-style transfer workflows.

---

## Module 82 — AWS Application Migration Service

Teach lift-and-shift server migration conceptually.

---

# PHASE 12 — Resilience and Disaster Recovery

## Module 83 — High Availability

Teach:

- single AZ
- multi-AZ
- multi-Region
- redundant architecture
- no single point of failure

---

## Module 84 — Fault Tolerance

Explain difference:

```text
High Availability:
system recovers quickly

Fault Tolerance:
system continues despite component failure
```

---

## Module 85 — Disaster Recovery Strategies

Teach:

1. Backup and Restore
2. Pilot Light
3. Warm Standby
4. Multi-site / Active-Active

Teach the relationship between:

- RTO
- RPO
- cost

Example:

```text
Lower RTO/RPO → usually higher cost
```

---

# PHASE 13 — Cost Optimization

## Module 86 — AWS Cost Thinking

Teach learners to ask:

- is this always running?
- can it scale down?
- can serverless be used?
- can cold data move to cheaper storage?
- is cross-AZ traffic unnecessary?
- is NAT Gateway data processing avoidable?
- can Savings Plans or Reserved Instances help?
- can Spot be used safely?

---

## Module 87 — AWS Budgets

Teach alerts and budgeting.

---

## Module 88 — Cost Explorer

Teach historical spend analysis.

---

## Module 89 — Cost and Usage Report

Teach detailed billing data conceptually.

---

## Module 90 — Savings Plans / Reserved / Spot

Build a clear comparison.

---

# PHASE 14 — Architecture Patterns

## Module 91 — Classic Three-Tier Web Application

Architecture:

```text
Route 53
   |
CloudFront
   |
ALB
   |
Auto Scaling EC2
   |
RDS Multi-AZ
```

Explain every decision.

---

## Module 92 — Serverless Web Application

```text
CloudFront
   |
S3
   |
API Gateway
   |
Lambda
   |
DynamoDB
```

---

## Module 93 — Event-Driven Order Processing

```text
API Gateway
   |
Lambda
   |
SQS
   |
Workers
   |
DynamoDB
```

---

## Module 94 — Highly Available Architecture

Include:

- multiple AZs
- load balancer
- Auto Scaling
- Multi-AZ database
- backups
- Route 53 health/failover

---

## Module 95 — Hybrid Architecture

Include:

- on-premises
- VPN or Direct Connect
- AWS VPC
- Storage Gateway/DataSync if appropriate

---

# PHASE 15 — Exam Mastery

## Module 96 — Keyword Recognition

Examples:

```text
"decouple" → SQS
"fanout" → SNS + SQS
"static content worldwide" → CloudFront
"shared Linux file system" → EFS
"block storage for EC2" → EBS
"object storage" → S3
"serverless NoSQL" → DynamoDB
"managed relational database" → RDS/Aurora
"audit API activity" → CloudTrail
"metrics and alarms" → CloudWatch
"protect web app from SQL injection" → WAF
"DDoS" → Shield
"sensitive data in S3" → Macie
"private subnet internet access" → NAT Gateway
```

---

## Module 97 — How to Eliminate Distractors

Teach patterns:

### Requirement mismatch

If the question says:

> “No server management”

EC2-heavy options may be weaker than serverless/managed alternatives.

### Availability mismatch

If it requires surviving AZ failure:

Single-AZ architecture is wrong.

### Storage mismatch

If multiple Linux EC2 instances need shared files:

EBS is usually not the correct shared-file answer.

### Network mismatch

If traffic must stay private:

Public internet architecture may be wrong when a private AWS connectivity option exists.

---

## Module 98 — Timed Mini Exams

- 10-question test
- 20-question test
- 30-question test

---

## Module 99 — Full Mock Exam

Simulate:

- 65 questions
- 130 minutes
- multiple choice
- multiple response

After submission:

- total score
- domain score
- weak services
- weak architecture principles
- recommended lessons to review

---

# 8. Official Exam Domain Curriculum Map

The application must have a separate “Exam Domains” view.

---

## Domain 1 — Design Secure Architectures (30%)

### 1.1 Secure access to AWS resources

Cover:

- IAM
- IAM Identity Center
- roles
- policies
- STS
- federation
- least privilege
- root account security
- MFA
- AWS Organizations
- SCPs
- Control Tower
- resource policies
- multi-account architecture

### 1.2 Secure workloads and applications

Cover:

- VPC
- security groups
- NACLs
- routing
- private/public subnets
- NAT
- endpoints
- WAF
- Shield
- Secrets Manager
- GuardDuty
- Cognito
- VPN
- Direct Connect

### 1.3 Data security

Cover:

- encryption at rest
- encryption in transit
- KMS
- ACM
- backups
- lifecycle policies
- data governance
- retention
- replication

---

## Domain 2 — Design Resilient Architectures (26%)

### 2.1 Scalable and loosely coupled architectures

Cover:

- SQS
- SNS
- EventBridge
- Step Functions
- Lambda
- API Gateway
- ECS
- EKS
- Fargate
- ALB
- caching
- microservices
- horizontal scaling
- serverless
- read replicas

### 2.2 Highly available / fault tolerant architectures

Cover:

- Regions
- Availability Zones
- Route 53
- load balancing
- Auto Scaling
- Multi-AZ
- RPO/RTO
- DR strategies
- failover
- backups
- replication
- immutable infrastructure

---

## Domain 3 — Design High-Performing Architectures (24%)

### 3.1 Storage

- S3
- EBS
- EFS
- FSx
- hybrid storage

### 3.2 Compute

- EC2
- Lambda
- Fargate
- Batch
- Auto Scaling
- ECS
- EKS

### 3.3 Databases

- RDS
- Aurora
- DynamoDB
- ElastiCache
- read replicas
- database proxies
- capacity planning

### 3.4 Networking

- CloudFront
- Global Accelerator
- ALB/NLB
- VPN
- Direct Connect
- PrivateLink

### 3.5 Data ingestion/transformation

- Kinesis
- Data Firehose
- Glue
- DataSync
- Storage Gateway
- Athena
- EMR
- Lake Formation

---

## Domain 4 — Design Cost-Optimized Architectures (20%)

### 4.1 Storage cost

- S3 storage classes
- lifecycle policies
- archival
- EBS type selection
- EFS/FSx decisions
- DataSync
- transfer strategies

### 4.2 Compute cost

- Spot
- Reserved Instances
- Savings Plans
- Auto Scaling
- Lambda
- Fargate
- instance family/size selection

### 4.3 Database cost

- DynamoDB vs RDS
- serverless options
- read scaling
- retention
- backups
- capacity planning

### 4.4 Network cost

- NAT gateway costs
- VPC endpoints
- cross-AZ transfer
- VPN vs Direct Connect
- CloudFront caching
- bandwidth planning

---

# 9. In-Scope AWS Services

The website should create a service page for every service below.

## Analytics

- Amazon Athena
- AWS Data Exchange
- Amazon Data Firehose
- Amazon EMR
- AWS Glue
- Amazon Kinesis
- AWS Lake Formation
- Amazon Managed Streaming for Apache Kafka (Amazon MSK)
- Amazon OpenSearch Service
- Amazon Quick
- Amazon Redshift

## Application Integration

- Amazon AppFlow
- Amazon EventBridge
- Amazon MQ
- Amazon SNS
- Amazon SQS
- AWS Step Functions

## AWS Cost Management

- AWS Budgets
- AWS Cost and Usage Report
- AWS Cost Explorer
- Savings Plans

## Compute

- AWS Batch
- Amazon EC2
- Amazon EC2 Auto Scaling
- AWS Elastic Beanstalk
- AWS Outposts
- AWS Serverless Application Repository
- VMware Cloud on AWS
- AWS Wavelength

## Containers

- Amazon ECR
- Amazon ECS
- Amazon ECS Anywhere
- Amazon EKS
- Amazon EKS Anywhere
- Amazon EKS Distro

## Database

- Amazon Aurora
- Amazon Aurora Serverless
- Amazon DocumentDB
- Amazon DynamoDB
- Amazon ElastiCache
- Amazon Keyspaces
- Amazon Neptune
- Amazon RDS
- Amazon Redshift

## Developer Tools

- AWS X-Ray

## Front-End Web and Mobile

- AWS Amplify
- Amazon API Gateway
- AWS Device Farm

## Machine Learning

- Amazon Comprehend
- Amazon Lex
- Amazon Polly
- Amazon Rekognition
- Amazon SageMaker AI
- Amazon Textract
- Amazon Transcribe
- Amazon Translate

## Management and Governance

- AWS Auto Scaling
- AWS CLI
- AWS CloudFormation
- AWS CloudTrail
- Amazon CloudWatch
- AWS Compute Optimizer
- AWS Config
- AWS Control Tower
- AWS Health Dashboard
- AWS License Manager
- Amazon Managed Grafana
- Amazon Managed Service for Prometheus
- AWS Management Console
- AWS Organizations
- AWS Service Catalog
- AWS Systems Manager
- AWS Trusted Advisor
- AWS Well-Architected Tool

## Media Services

- Amazon Elastic Transcoder
- Amazon Kinesis Video Streams

## Migration and Transfer

- AWS Application Migration Service
- AWS DataSync
- AWS DMS
- AWS Snow Family
- AWS Transfer Family

## Networking and Content Delivery

- AWS Client VPN
- Amazon CloudFront
- AWS Direct Connect
- Elastic Load Balancing
- AWS Global Accelerator
- AWS PrivateLink
- Amazon Route 53
- AWS Site-to-Site VPN
- AWS Transit Gateway
- Amazon VPC

## Security, Identity, and Compliance

- AWS Artifact
- AWS Certificate Manager
- AWS CloudHSM
- Amazon Cognito
- Amazon Detective
- AWS Directory Service
- AWS Firewall Manager
- Amazon GuardDuty
- AWS IAM Identity Center
- Amazon Inspector
- AWS KMS
- Amazon Macie
- AWS Network Firewall
- AWS Resource Access Manager
- AWS Secrets Manager
- AWS Security Hub
- AWS Shield
- AWS WAF
- IAM

## Serverless

- AWS Fargate
- AWS Lambda

## Storage

- AWS Backup
- Amazon EBS
- Amazon EFS
- Amazon FSx
- Amazon S3
- Amazon S3 Glacier
- AWS Storage Gateway

---

# 10. Service Priority Tiers

Not all services need equal lesson depth.

## Tier 1 — Must Know Deeply

Give the longest lessons, diagrams, quizzes, comparisons, and scenarios to:

- IAM
- IAM Identity Center
- AWS Organizations
- EC2
- Auto Scaling
- ELB
- Lambda
- S3
- EBS
- EFS
- VPC
- Route 53
- CloudFront
- NAT Gateway
- VPC endpoints / PrivateLink
- RDS
- Aurora
- DynamoDB
- ElastiCache
- SQS
- SNS
- EventBridge
- Step Functions
- ECS
- Fargate
- EKS
- KMS
- Secrets Manager
- WAF
- Shield
- CloudWatch
- CloudTrail
- CloudFormation
- Direct Connect
- VPN
- Transit Gateway
- DataSync
- DMS
- Glue
- Kinesis
- Athena
- Backup
- disaster recovery strategies
- cost optimization

## Tier 2 — Important

Medium-depth lessons:

- FSx
- Storage Gateway
- Cognito
- GuardDuty
- Inspector
- Macie
- Security Hub
- Network Firewall
- Control Tower
- Systems Manager
- X-Ray
- Redshift
- OpenSearch
- MSK
- EMR
- Lake Formation
- AppFlow
- Amazon MQ
- Transfer Family
- Snow Family
- Application Migration Service

## Tier 3 — Recognition Level

Teach enough to recognize the use case and eliminate distractors:

- Wavelength
- VMware Cloud on AWS
- ECS Anywhere
- EKS Anywhere
- EKS Distro
- Device Farm
- specialized ML services
- media services
- License Manager
- Managed Grafana
- Managed Prometheus
- Service Catalog
- Health Dashboard
- Artifact
- Directory Service
- RAM
- Quick
- Data Exchange

---

# 11. Interactive UI Requirements

The website should have a premium dark/light UI.

Main navigation:

```text
Dashboard
Learn
Services
Architectures
Labs
Quizzes
Flashcards
Exam Domains
Mock Exams
Weak Areas
Progress
Glossary
Settings
```

---

# 12. Dashboard

Display:

- current course progress
- completed modules
- study streak
- questions answered
- accuracy
- weakest domain
- strongest domain
- “Continue Learning”
- recommended review
- mock exam readiness

Example:

```text
SAA-C03 Readiness: 68%

Secure Architectures: 74%
Resilient Architectures: 61%
High Performing: 66%
Cost Optimized: 70%
```

---

# 13. Lesson Player

Layout:

```text
--------------------------------
Sidebar       | Lesson
Modules       | Title
              |
              | Explanation
              | Analogy
              | Diagram
              | Taglish
              | Comparison
              | Quiz
--------------------------------
```

Features:

- previous lesson
- next lesson
- mark complete
- bookmark
- notes
- difficulty badge
- exam importance badge

---

# 14. Architecture Diagram Component

Create reusable architecture diagrams.

Preferred implementation:

- React Flow, SVG, Mermaid, or custom diagram renderer

AWS-style boxes:

```text
Region
 ├─ AZ A
 │   ├─ Public Subnet
 │   │    └─ ALB
 │   └─ Private Subnet
 │        └─ EC2
 └─ AZ B
     ├─ Public Subnet
     │    └─ ALB
     └─ Private Subnet
          └─ EC2
```

Allow:

- step-by-step reveal
- hover explanation
- clickable services
- “Why this service?” tooltip

---

# 15. Architecture Builder

Create an optional practice environment.

The learner receives a scenario:

> Build a highly available web application.

Available components:

- Route 53
- CloudFront
- ALB
- EC2
- ASG
- RDS
- S3
- DynamoDB
- Lambda
- SQS

User drags components into architecture.

System evaluates:

- availability
- security
- cost
- performance
- architecture mistakes

Example feedback:

> Your database is deployed in only one Availability Zone. This creates a single point of failure.

---

# 16. Comparison Engine

Create dedicated comparison pages.

Required comparisons:

```text
S3 vs EBS vs EFS
RDS vs Aurora vs DynamoDB
Multi-AZ vs Read Replica
ALB vs NLB vs Gateway Load Balancer
SQS vs SNS vs EventBridge
EC2 vs Lambda vs Fargate
ECS vs EKS
CloudFront vs Global Accelerator
VPN vs Direct Connect
Security Group vs NACL
KMS vs CloudHSM
IAM vs Cognito
CloudWatch vs CloudTrail vs Config
Reserved Instances vs Savings Plans vs Spot
NAT Gateway vs VPC Endpoint
VPC Peering vs Transit Gateway
S3 Standard vs IA vs Glacier
```

Each comparison should include:

- primary use
- scope
- availability
- scalability
- operational overhead
- cost logic
- exam keywords
- when NOT to use

---

# 17. Quiz Engine

Question types:

### Multiple Choice

One correct answer.

### Multiple Response

Two or more correct answers.

### Architecture Scenario

Long scenario similar to the SAA exam.

### Service Identification

Example:

> Which service provides managed DNS?

### Comparison

Example:

> Which solution provides read scaling for an RDS database?

---

# 18. Question Explanation Format

Every question must explain:

```text
Correct Answer:
Why it is correct

Wrong Answer A:
Why it is wrong

Wrong Answer B:
Why it is wrong

Wrong Answer C:
Why it is wrong

Exam Keyword:
What clue should have led to the answer?

Mentor Tip:
How to recognize this next time
```

Never only say:

> “B is correct.”

---

# 19. Difficulty Levels

Each question should have:

```text
Easy
Medium
Hard
Exam-Level
```

---

# 20. Flashcard System

Flashcards should include:

Front:

> What is the main difference between RDS Multi-AZ and Read Replicas?

Back:

> Multi-AZ primarily improves availability.  
> Read replicas primarily improve read scalability.

Allow:

- Know it
- Review soon
- Difficult

Use spaced repetition.

---

# 21. Labs

Labs should be practical but safe.

Suggested labs:

1. Launch EC2
2. Create VPC
3. Public/private subnet
4. Security groups
5. S3 bucket
6. S3 lifecycle
7. Static S3 content
8. Create RDS
9. DynamoDB table
10. Lambda
11. API Gateway
12. SQS queue
13. SNS topic
14. CloudWatch alarm
15. IAM role
16. Auto Scaling Group
17. Application Load Balancer
18. Route 53 concept simulation
19. CloudFormation deployment
20. Serverless architecture mini project

Each lab includes:

```text
Goal
Architecture
Estimated time
Prerequisites
Steps
Expected result
Cleanup
Why this matters for the exam
Common errors
```

Always include cleanup instructions because AWS resources may cost money.

---

# 22. Scenario-Based Projects

## Project 1 — Highly Available Restaurant Booking Website

Requirements:

- web application
- multiple AZs
- relational database
- high availability
- static images
- automatic scaling

Expected architecture:

```text
Route 53
   |
CloudFront
   |
ALB
   |
Auto Scaling EC2
   |
RDS Multi-AZ
   |
S3
```

---

## Project 2 — Serverless Appointment App

```text
CloudFront
   |
S3
   |
API Gateway
   |
Lambda
   |
DynamoDB
```

Add:

- Cognito
- CloudWatch
- IAM
- SQS for async tasks

---

## Project 3 — Video Processing Pipeline

```text
S3 Upload
   |
Event
   |
SQS
   |
Processing
   |
S3 Output
```

Explain where Lambda, containers, or Batch could fit depending on processing length and compute requirements.

---

# 23. “What Happens If?” Learning Mode

Create a special interactive feature.

Example architecture:

```text
ALB
 |
EC2
 |
RDS
```

Ask:

> What happens if the EC2 instance fails?

Then teach:

- single instance = outage risk
- use multiple instances
- use Auto Scaling
- distribute with ALB

Next:

> What happens if the database AZ fails?

Teach Multi-AZ.

Next:

> What happens if the entire Region fails?

Teach cross-Region DR.

This mode teaches architecture through failure.

---

# 24. “Why Not This?” Mode

One of the most important SAA training features.

Example:

Scenario:

> Multiple EC2 instances need shared Linux file storage.

Choices:

- EBS
- EFS
- S3
- instance store

Teach:

> Why EFS fits.
>
> Why EBS is usually not the best shared filesystem answer.
>
> Why S3 is object storage rather than a mounted POSIX-style shared filesystem.

---

# 25. Exam Strategy System

Teach the learner to recognize AWS wording.

Examples:

### “Least operational overhead”

Prefer:

- managed services
- serverless
- automated options

### “Most cost-effective”

Do not automatically choose the cheapest individual service.

Choose the solution that satisfies all requirements at the lowest reasonable total cost.

### “Highly available”

Look for:

- multiple AZs
- failover
- load balancing
- redundancy

### “Decouple”

Think:

- SQS
- SNS
- EventBridge

### “Global users”

Consider:

- CloudFront
- Route 53
- Global Accelerator
- multi-Region design

---

# 26. Glossary

Create searchable definitions for:

- Region
- Availability Zone
- edge location
- VPC
- subnet
- CIDR
- route table
- stateful
- stateless
- horizontal scaling
- vertical scaling
- high availability
- fault tolerance
- RTO
- RPO
- eventual consistency concept
- synchronous
- asynchronous
- serverless
- microservices
- decoupling
- idempotency concept
- caching
- replication
- sharding concept
- encryption at rest
- encryption in transit

Every glossary term should include a Taglish explanation.

---

# 27. Search

Global search should find:

- services
- lessons
- glossary
- questions
- architecture patterns

Example:

Search:

`read replica`

Results:

```text
Amazon RDS
Aurora
Database Scaling
Multi-AZ vs Read Replica
Practice Question #143
```

---

# 28. Progress Model

Track:

```ts
type Progress = {
  lessonId: string
  completed: boolean
  quizScore?: number
  attempts: number
  lastReviewed?: string
  confidence?: 1 | 2 | 3 | 4 | 5
}
```

---

# 29. Question Data Model

```ts
type Question = {
  id: string
  domain: 1 | 2 | 3 | 4
  difficulty: "easy" | "medium" | "hard" | "exam"
  type: "single" | "multiple"
  scenario: string
  options: {
    id: string
    text: string
  }[]
  correctAnswers: string[]
  explanation: string
  optionExplanations: Record<string, string>
  keywords: string[]
  services: string[]
}
```

---

# 30. Lesson Data Model

```ts
type Lesson = {
  id: string
  moduleId: string
  title: string
  service?: string
  difficulty: string
  examImportance: "low" | "medium" | "high" | "critical"
  englishExplanation: string
  taglishExplanation: string
  analogy: string
  useCases: string[]
  poorUseCases: string[]
  features: string[]
  alternatives: string[]
  examKeywords: string[]
  examTraps: string[]
  mentorTip: string
}
```

---

# 31. Recommended Tech Stack

Use:

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Lucide icons
Supabase or local-first storage
Mermaid or React Flow
Recharts for progress
```

Alternative:

```text
React + Vite
```

if a simpler static deployment is desired.

---

# 32. Page Structure

```text
/
├── dashboard
├── course
│   ├── modules
│   └── lessons
├── services
├── architectures
├── comparisons
├── labs
├── quizzes
├── flashcards
├── exam-domains
├── mock-exams
├── progress
├── weak-areas
├── glossary
└── settings
```

---

# 33. Design Style

Look and feel:

- premium learning platform
- clean AWS-inspired design
- not an AWS clone
- responsive
- dark mode
- light mode
- mobile-friendly
- side navigation
- progress rings
- lesson completion badges
- architecture cards
- exam difficulty badges

Use visual hierarchy.

Do not overload the screen.

---

# 34. Service Card Design

Example:

```text
Amazon S3

Object Storage

Exam Importance:
★★★★★

Domains:
Security
High Performance
Cost Optimization

Keywords:
object
bucket
durability
lifecycle
archive

[Learn]
[Compare]
[Practice]
```

---

# 35. Mentor Mode

Add a toggle:

```text
MENTOR MODE
```

When enabled, lessons display extra callouts.

Example:

> **Mentor Tip**
>
> The exam rarely wants you to manage infrastructure manually when a managed AWS service clearly satisfies the requirement.

Another:

> **Watch the wording**
>
> “Read-heavy database” often points toward caching or read replicas.

---

# 36. Taglish Mode

Toggle:

```text
English
Taglish
Both
```

Example:

English:

> An Availability Zone is an isolated location within an AWS Region.

Taglish:

> Ang Availability Zone ay hiwalay na location sa loob ng isang Region. Parang may several independent buildings sa same city para kapag nagkaproblema ang isang building, puwedeng gumana pa rin ang iba.

---

# 37. Beginner Mode

When enabled:

- explain acronyms
- show more analogies
- show prerequisites
- simplify architecture diagrams

---

# 38. Exam Mode

When enabled:

- reduce long teaching text
- emphasize:
  - keywords
  - service comparison
  - exam traps
  - practice questions

---

# 39. Accuracy Rules

This section is mandatory.

## Never hallucinate AWS facts.

When uncertain:

- mark the fact for verification
- consult official AWS documentation
- do not invent limits, prices, quotas, SLA values, feature behavior, or regional availability

Never teach exact numerical limits unless verified.

Prefer:

> “The exact quota depends on the service and can change.”

rather than inventing a number.

---

# 40. Information Freshness

AWS changes constantly.

Separate information into:

### Stable architecture concepts

Examples:

- SQS decouples applications
- ALB works at Layer 7
- NLB works at Layer 4
- S3 is object storage

### Changeable product details

Examples:

- service quotas
- supported Regions
- exact pricing
- newly released features

Changeable information should be stored in a way that can be updated later.

---

# 41. Exam Guide Boundary

The app should prioritize services listed as in scope.

Do NOT spend major course time on services explicitly identified as out of scope unless used only as brief contextual comparison.

The course should not become an “all AWS services” encyclopedia.

The goal is:

**Pass SAA-C03 while becoming a better architecture thinker.**

---

# 42. Course Completion Requirements

A learner reaches “Exam Ready” when:

```text
90% lessons completed
80%+ domain quiz average
80%+ architecture scenario average
2 full mock exams completed
75%+ mock average
no domain below 70%
```

These thresholds are internal study recommendations, not official AWS passing rules.

---

# 43. Readiness Dashboard

Example:

```text
AWS SAA-C03 Readiness

Overall: 82%

Security              █████████ 88%
Resiliency            ████████  79%
Performance           ████████  81%
Cost Optimization     ███████   76%

Weak Areas:
- NAT Gateway cost optimization
- RDS Proxy
- Direct Connect vs VPN
- S3 storage classes

Recommended next:
Review Module 18
```

---

# 44. Daily Study Plan Generator

Allow user to select:

```text
7 days
14 days
30 days
45 days
60 days
90 days
```

Example 30-day plan:

```text
Days 1–3
AWS Foundations + IAM

Days 4–7
EC2 + Load Balancing + Auto Scaling

Days 8–10
S3 + EBS + EFS

Days 11–14
VPC + networking

Days 15–18
RDS + Aurora + DynamoDB

Days 19–21
SQS + SNS + Lambda + EventBridge

Days 22–24
Security

Days 25–26
Resilience + DR

Days 27–28
Cost optimization

Day 29
Practice exam

Day 30
Weak-area review + final mock
```

---

# 45. Final “Architect Brain” Checklist

Before choosing any architecture, teach the learner to ask:

```text
1. What is the workload?
2. Is it stateful or stateless?
3. What availability is required?
4. How much traffic?
5. What type of storage?
6. What type of database?
7. What are the security requirements?
8. Does it need to scale?
9. Does it need global access?
10. What happens during failure?
11. What is the RTO?
12. What is the RPO?
13. What operational work can AWS manage?
14. What is the cheapest solution that still meets the requirements?
```

---

# 46. Core Architecture Decision Framework

Every scenario should be evaluated through:

```text
SECURITY
RELIABILITY
PERFORMANCE
COST
OPERATIONS
```

This should visually appear throughout the app.

---

# 47. Minimum Seed Content

Before considering the website “usable,” generate at minimum:

- 100+ lessons
- 100+ service/topic cards
- 300+ flashcards
- 500+ practice questions
- 50+ architecture scenarios
- 20+ guided labs
- 20+ service comparison pages
- 4 domain exams
- 2 full 65-question mock exams
- 1 architecture builder
- 1 glossary
- 1 study plan generator

Use generated placeholders only when clearly labeled during development. Production content should be reviewed for technical accuracy.

---

# 48. Content Generation Rules

When Codex generates lesson content:

1. Start simple.
2. Explain jargon.
3. Add analogy.
4. Add Taglish.
5. Add a realistic architecture.
6. Add “when to use.”
7. Add “when not to use.”
8. Compare alternatives.
9. Add exam keywords.
10. Add exam trap.
11. Add mentor tip.
12. Add a mini quiz.
13. Add at least one scenario question.
14. Never fabricate AWS details.
15. Prefer official AWS documentation for verification.

---

# 49. Example Finished Lesson

## Amazon SQS

### What is it?

Amazon SQS is a managed message queue that lets application components communicate asynchronously.

### Simple Explanation

Imagine an online store.

When a customer places an order, the website does not need to wait for the warehouse system to finish processing the shipment.

Instead, the website places an order message in a queue.

A worker processes the message later.

### Taglish

Parang restaurant order ticket system.

Kapag nag-order ang customer, hindi kailangan hintayin ng cashier na matapos muna ng kitchen ang food bago tumanggap ng next customer.

Nilalagay muna ang order sa queue.

Then ang kitchen workers kukuha ng order isa-isa.

### Why Use It?

Without a queue:

```text
Website → Worker
```

If the worker crashes, the request can fail.

With SQS:

```text
Website
   |
  SQS
   |
Worker
```

The message waits until a worker can process it.

### Best Use Cases

- order processing
- image processing
- background tasks
- asynchronous jobs
- traffic buffering
- microservice decoupling

### Exam Keywords

```text
decouple
queue
buffer
asynchronous
retry
producer
consumer
```

### Alternative

SNS is better when one event must be pushed to many subscribers.

### Exam Trap

Do not automatically choose SNS when the requirement says workers should pull tasks from a queue.

### Mentor Tip

When AWS says:

> “The application must continue accepting requests even when the backend is temporarily unavailable.”

Think about a queue such as SQS.

---

# 50. Build Order for Codex

Implement in this order.

## Phase A — Foundation

1. Next.js project
2. Tailwind
3. shadcn/ui
4. navigation
5. layout
6. dark/light mode

## Phase B — Course

7. modules
8. lesson pages
9. completion tracking
10. bookmarks

## Phase C — Learning

11. quizzes
12. explanations
13. flashcards
14. progress

## Phase D — Architecture

15. diagrams
16. comparisons
17. architecture scenarios

## Phase E — Exam

18. domain quizzes
19. timed exams
20. mock exam
21. analytics

## Phase F — Advanced

22. study planner
23. weak-area engine
24. architecture builder
25. mentor mode

---

# 51. Definition of Done

The project is complete when the learner can:

- start from AWS fundamentals
- learn services one by one
- understand what each service solves
- understand what happens without it
- compare alternatives
- read realistic architectures
- practice labs
- answer scenario questions
- take full mock exams
- identify weak areas
- follow a study plan
- switch between English and Taglish
- study in beginner mode or exam mode
- confidently reason through SAA-C03 architecture scenarios

---

# 52. Final Product Vision

The finished product should feel like:

> **“A personal AWS Solutions Architect mentor inside an interactive learning platform.”**

The learner should not finish the course saying:

> “I memorized AWS services.”

The learner should finish saying:

> “I understand why I would choose this AWS service, what tradeoff I am making, and what architecture best fits the requirement.”

That is the standard for this project.
