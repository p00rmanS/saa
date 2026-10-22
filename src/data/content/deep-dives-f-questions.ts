import type { Flashcard, Question } from "@/lib/types";
import { mk, fc } from "./deep-dives-questions";

export const deepDiveFQuestions: Question[] = [
  // ---- AppSync ----
  mk(
    "aws-appsync", 1, 3, "easy",
    "A mobile app needs to fetch exactly the fields it wants from several data sources in one request and receive real-time updates. Which service fits?",
    ["Amazon API Gateway REST API", "AWS AppSync", "Amazon SNS", "Elastic Load Balancing"],
    "b",
    "AppSync is the managed GraphQL service, with resolvers to several data sources and real-time subscriptions.",
    [
      "REST APIs return fixed resource representations and need multiple calls to aggregate data.",
      "GraphQL queries and subscriptions are AppSync's purpose.",
      "SNS delivers notifications but does not query data sources.",
      "A load balancer distributes traffic and does not provide a GraphQL layer.",
    ],
    "\"GraphQL / subscriptions\" -> AppSync", ["AppSync", "GraphQL"]
  ),
  mk(
    "aws-appsync", 2, 3, "medium",
    "A team builds a field-service mobile app that must keep working without connectivity and synchronise changes later. Which combination supports this with a managed backend?",
    ["API Gateway with Lambda only", "AppSync with Amplify DataStore", "SQS with EC2 workers", "CloudFront with S3"],
    "b",
    "AppSync with Amplify DataStore provides offline data access and sync with conflict resolution.",
    [
      "That has no built-in offline sync.",
      "DataStore stores data locally and syncs through AppSync.",
      "SQS is a message queue, not a client sync mechanism.",
      "CloudFront with S3 serves content and does not sync app data.",
    ],
    "\"offline sync\" -> AppSync + DataStore", ["AppSync", "offline"]
  ),
  mk(
    "aws-appsync", 3, 3, "hard",
    "A company needs a REST API with usage plans, API keys and per-client throttling for external developers. Which service is appropriate?",
    ["AWS AppSync", "Amazon API Gateway", "Amazon Pinpoint", "AWS Step Functions"],
    "b",
    "API Gateway REST APIs provide usage plans, API keys and throttling. AppSync is for GraphQL.",
    [
      "AppSync is GraphQL oriented and does not provide REST usage plans.",
      "API Gateway offers usage plans and throttling for external consumers.",
      "Pinpoint is for customer engagement campaigns.",
      "Step Functions orchestrates workflows and is not an API front door.",
    ],
    "\"REST + usage plans\" -> API Gateway", ["API Gateway", "usage plans"]
  ),

  // ---- Data Pipeline ----
  mk(
    "aws-data-pipeline", 1, 3, "easy",
    "Which service lets you define scheduled workflows that move and process data between AWS services and on-premises sources using data nodes, activities and preconditions?",
    ["AWS Data Pipeline", "Amazon Kinesis Data Streams", "AWS Lake Formation", "Amazon QuickSight"],
    "a",
    "Data Pipeline defines scheduled data movement and processing with data nodes, activities, resources and preconditions.",
    [
      "That vocabulary describes Data Pipeline.",
      "Kinesis streams real-time data and has no scheduling activities.",
      "Lake Formation builds and secures data lakes.",
      "QuickSight is a visualisation service.",
    ],
    "\"data nodes, activities, preconditions\" -> Data Pipeline", ["Data Pipeline"]
  ),
  mk(
    "aws-data-pipeline", 2, 3, "medium",
    "A company wants a new serverless ETL job that crawls S3 data, catalogues it and converts CSV to Parquet. Which service is the better choice than Data Pipeline?",
    ["Amazon SQS", "AWS Glue", "AWS Snowball", "Amazon Route 53"],
    "b",
    "Glue is the serverless ETL and data catalog service and supersedes Data Pipeline for new work.",
    [
      "SQS is a message queue and does not transform data.",
      "Glue provides crawlers, a Data Catalog and ETL jobs without servers.",
      "Snowball transfers data offline.",
      "Route 53 is DNS.",
    ],
    "\"serverless ETL, catalog\" -> Glue", ["Glue", "ETL"]
  ),
  mk(
    "aws-data-pipeline", 3, 3, "hard",
    "A multi-step data workflow requires branching, parallel steps and error handling across Lambda functions and AWS services. Which service is most appropriate?",
    ["AWS Data Pipeline", "AWS Step Functions", "Amazon SNS", "AWS DataSync"],
    "b",
    "Step Functions orchestrates workflows with branching, parallelism, retries and error handling.",
    [
      "Data Pipeline is a legacy scheduler and closed to new customers.",
      "Step Functions is designed for workflow orchestration.",
      "SNS delivers notifications and does not orchestrate steps.",
      "DataSync transfers data between storage systems.",
    ],
    "\"workflow with branching and error handling\" -> Step Functions", ["Step Functions"]
  ),

  // ---- QLDB ----
  mk(
    "amazon-qldb", 1, 1, "easy",
    "A company needs a database that keeps an immutable, cryptographically verifiable history of all changes, owned and controlled by a single trusted organisation. Which database type is described?",
    ["A ledger database such as Amazon QLDB", "A graph database such as Amazon Neptune", "A time series database", "A data warehouse such as Amazon Redshift"],
    "a",
    "A ledger database keeps an append-only, hash-chained journal with a central trusted owner, which is what QLDB provided.",
    [
      "Ledger databases provide immutable, verifiable history.",
      "Graph databases model relationships.",
      "Time series databases optimise timestamped measurements.",
      "Data warehouses support analytics, not tamper-evident history.",
    ],
    "\"immutable verifiable history, central authority\" -> QLDB", ["QLDB", "ledger"]
  ),
  mk(
    "amazon-qldb", 2, 1, "medium",
    "A consortium of several untrusted organisations needs to share a ledger without any single party controlling it. Which is the best fit?",
    ["Amazon QLDB", "Amazon Managed Blockchain", "Amazon DynamoDB", "Amazon RDS Multi-AZ"],
    "b",
    "Decentralised multi-party scenarios point to blockchain. QLDB has a central trusted authority.",
    [
      "QLDB is owned by one trusted authority.",
      "Managed Blockchain supports networks where several parties share control.",
      "DynamoDB is a key-value database without a shared-trust ledger model.",
      "Multi-AZ is a high availability feature and not a ledger.",
    ],
    "\"multiple untrusted parties\" -> blockchain", ["blockchain", "QLDB"]
  ),
  mk(
    "amazon-qldb", 3, 1, "hard",
    "A team needs immutable storage for compliance records stored as files, ensuring nobody can delete or overwrite them for seven years. Which feature is the most direct fit?",
    ["Amazon QLDB", "S3 Object Lock in Compliance mode", "DynamoDB Streams", "EBS snapshots"],
    "b",
    "Files that must be immutable for a retention period map to S3 Object Lock in Compliance mode.",
    [
      "QLDB stores ledger data in a journal, not files.",
      "Object Lock provides WORM protection for objects.",
      "Streams capture changes in DynamoDB and do not provide immutability.",
      "Snapshots can be deleted by authorised users.",
    ],
    "\"immutable files for N years\" -> S3 Object Lock", ["Object Lock", "WORM"]
  ),

  // ---- Timestream / columnar ----
  mk(
    "amazon-timestream", 1, 3, "easy",
    "A company collects millions of timestamped sensor readings per minute and queries them over time windows. Which database type fits best?",
    ["Relational database", "Time series database such as Amazon Timestream", "Graph database", "Ledger database"],
    "b",
    "Timestamped measurements queried over time windows are the time series use case.",
    [
      "A relational database handles this poorly at high volume.",
      "Timestream is purpose-built for time series data.",
      "Graph databases model relationships.",
      "Ledger databases provide immutable history rather than time-window analytics.",
    ],
    "\"timestamped sensor data\" -> time series database", ["Timestream", "time series"]
  ),
  mk(
    "amazon-timestream", 2, 4, "medium",
    "A team runs frequent Athena queries over large CSV files in S3 that read only three of fifty columns, and costs are high. What reduces scanned data and cost?",
    ["Convert the data to Parquet", "Add more CSV files", "Move the files to S3 Glacier", "Enable S3 versioning"],
    "a",
    "Parquet is columnar and compressed, so Athena reads only the needed columns and scans far less data.",
    [
      "Columnar formats cut scan volume and cost.",
      "More CSV files increase scanning.",
      "Glacier is not directly queryable by Athena in this way.",
      "Versioning protects objects but does not reduce scans.",
    ],
    "\"few columns, high Athena cost\" -> Parquet", ["Parquet", "Athena", "columnar"]
  ),
  mk(
    "amazon-timestream", 3, 4, "hard",
    "A data warehouse workload runs large aggregations over a few columns of billions of rows. Which characteristic of Amazon Redshift makes this efficient?",
    ["It is a row-oriented transactional database", "It stores data in columns with compression", "It stores data in memory only", "It is a key-value store"],
    "b",
    "Redshift is a columnar data warehouse, so analytic queries read only the required columns and benefit from compression.",
    [
      "Row-oriented transactional engines are slower for wide analytic scans.",
      "Columnar storage underpins Redshift's analytic performance.",
      "Redshift stores data on disk with caching, not memory only.",
      "Key-value stores are not designed for large aggregations.",
    ],
    "\"large aggregations over few columns\" -> columnar (Redshift)", ["Redshift", "columnar"]
  ),

  // ---- Pinpoint ----
  mk(
    "amazon-pinpoint", 1, 3, "easy",
    "A marketing team wants to send targeted campaigns to user segments across email, SMS and push notifications and measure engagement. Which service fits?",
    ["Amazon SNS", "Amazon Pinpoint", "Amazon SQS", "AWS Config"],
    "b",
    "Pinpoint provides segments, multichannel campaigns, journeys and engagement analytics.",
    [
      "SNS delivers notifications without segmentation or campaign analytics.",
      "Pinpoint is the customer engagement service.",
      "SQS is a message queue.",
      "Config tracks resource configuration.",
    ],
    "\"targeted campaigns, segments\" -> Pinpoint", ["Pinpoint", "campaign"]
  ),
  mk(
    "amazon-pinpoint", 2, 3, "medium",
    "An operations team needs to alert engineers by email and SMS when a CloudWatch alarm fires. Which service is the simplest fit?",
    ["Amazon Pinpoint campaigns", "Amazon SNS topic with subscriptions", "AWS Data Pipeline", "Amazon Kendra"],
    "b",
    "SNS delivers application and operational notifications to subscribers with simple pub/sub.",
    [
      "Pinpoint is for marketing engagement and is excessive here.",
      "SNS topics fan out alarm notifications to email and SMS subscribers.",
      "Data Pipeline moves data on a schedule.",
      "Kendra is enterprise search.",
    ],
    "\"alarm notifications\" -> SNS", ["SNS", "notifications"]
  ),
  mk(
    "amazon-pinpoint", 3, 3, "hard",
    "A company only needs to send large volumes of transactional and bulk email, with no segmentation or other channels. Which service is the most direct fit?",
    ["Amazon SES", "Amazon Pinpoint journeys", "AWS AppSync", "Amazon Lex"],
    "a",
    "SES is the email sending service for bulk and transactional email.",
    [
      "SES is built for sending email at scale.",
      "Journeys add multichannel orchestration that is not needed.",
      "AppSync is a GraphQL service.",
      "Lex builds conversational bots.",
    ],
    "\"just send email at scale\" -> SES", ["SES", "email"]
  ),

  // ---- Forecast ----
  mk(
    "amazon-forecast", 1, 3, "easy",
    "A retailer wants to predict future product demand from years of historical sales data without hiring ML engineers. Which service is purpose built for this?",
    ["Amazon Forecast", "Amazon Rekognition", "Amazon Polly", "Amazon Transcribe"],
    "a",
    "Forecast generates time-series demand predictions from historical data using managed machine learning.",
    [
      "Forecast is the managed forecasting service.",
      "Rekognition analyses images and video.",
      "Polly converts text to speech.",
      "Transcribe converts speech to text.",
    ],
    "\"predict demand from history\" -> Forecast", ["Forecast", "demand"]
  ),
  mk(
    "amazon-forecast", 2, 3, "medium",
    "A data science team wants full control to build, train and tune custom machine learning models. Which service is the better fit than Forecast?",
    ["Amazon SageMaker", "Amazon Comprehend", "Amazon Translate", "AWS Glue DataBrew"],
    "a",
    "SageMaker is the platform for building, training and deploying custom models.",
    [
      "SageMaker supports custom model development end to end.",
      "Comprehend is a managed NLP service.",
      "Translate is a managed translation service.",
      "DataBrew prepares data visually and does not train custom models.",
    ],
    "\"build and tune custom models\" -> SageMaker", ["SageMaker"]
  ),
  mk(
    "amazon-forecast", 3, 4, "hard",
    "A planner wants forecasts that show a cautious (P10) and an optimistic (P90) outlook so they can balance over-stocking against stock-outs. What feature provides this?",
    ["Probabilistic forecasts at multiple quantiles", "A single point estimate only", "Cross-Region replication", "Automatic scaling policies"],
    "a",
    "Forecast produces probabilistic forecasts at quantiles such as P10, P50 and P90.",
    [
      "Quantile forecasts express uncertainty ranges.",
      "A single estimate does not show a range.",
      "Replication is unrelated to forecast output.",
      "Scaling policies relate to compute capacity.",
    ],
    "\"P10 / P50 / P90\" -> Forecast quantiles", ["Forecast", "quantiles"]
  ),

  // ---- Fraud Detector ----
  mk(
    "amazon-fraud-detector", 1, 1, "easy",
    "An e-commerce company wants to score each new account sign-up and payment for fraud in real time using models trained on its own labelled history. Which service fits?",
    ["Amazon GuardDuty", "Amazon Fraud Detector", "AWS WAF", "Amazon Macie"],
    "b",
    "Fraud Detector trains models on your labelled events and scores new events through a real-time API.",
    [
      "GuardDuty detects threats in AWS accounts and workloads.",
      "Fraud Detector is purpose-built for online fraud scoring.",
      "WAF filters web requests with rules.",
      "Macie discovers sensitive data in S3.",
    ],
    "\"online payment fraud, fake accounts\" -> Fraud Detector", ["Fraud Detector"]
  ),
  mk(
    "amazon-fraud-detector", 2, 1, "medium",
    "A security team wants to detect compromised EC2 instances and unusual API calls in their AWS account. Which service should they use?",
    ["Amazon Fraud Detector", "Amazon GuardDuty", "Amazon Forecast", "AWS Audit Manager"],
    "b",
    "GuardDuty analyses CloudTrail, VPC flow logs and DNS logs to detect threats against AWS resources.",
    [
      "Fraud Detector scores fraud in your own application events.",
      "GuardDuty is the threat detection service for AWS accounts.",
      "Forecast predicts time series values.",
      "Audit Manager collects compliance evidence.",
    ],
    "\"threats to AWS account\" -> GuardDuty", ["GuardDuty"]
  ),
  mk(
    "amazon-fraud-detector", 3, 1, "hard",
    "A detector should approve low-risk transactions, send medium-risk ones for manual review and block high-risk ones. What does Fraud Detector combine to produce these outcomes?",
    ["A model score and business rules in a detector", "Only security group rules", "Only IAM policies", "A CloudFront distribution"],
    "a",
    "A detector combines model risk scores with rules to return outcomes such as approve, review or block.",
    [
      "Detectors evaluate model scores against rules.",
      "Security groups control network traffic.",
      "IAM policies control permissions.",
      "CloudFront is a CDN.",
    ],
    "\"model score + rules -> outcome\" -> detector", ["Fraud Detector", "rules"]
  ),

  // ---- Kendra ----
  mk(
    "amazon-kendra", 1, 3, "easy",
    "Employees want to ask natural-language questions across documents stored in S3, SharePoint and Confluence and get direct answers. Which service fits?",
    ["Amazon Kendra", "Amazon Athena", "Amazon Redshift", "AWS Glue"],
    "a",
    "Kendra is an ML-powered enterprise search service with connectors and natural-language question answering.",
    [
      "Kendra answers questions over many document repositories.",
      "Athena runs SQL over S3 data.",
      "Redshift is a data warehouse.",
      "Glue performs ETL and cataloguing.",
    ],
    "\"natural-language questions over documents\" -> Kendra", ["Kendra", "search"]
  ),
  mk(
    "amazon-kendra", 2, 3, "medium",
    "A team needs to search and analyse application logs and build custom dashboards, tuning relevance themselves. Which service is more appropriate than Kendra?",
    ["Amazon OpenSearch Service", "Amazon Kendra", "Amazon Lex", "Amazon Textract"],
    "a",
    "OpenSearch is a search and analytics engine suited to log analytics and custom search that you tune.",
    [
      "OpenSearch supports log analytics and custom tuning.",
      "Kendra is a managed document question-answering service.",
      "Lex builds conversational interfaces.",
      "Textract extracts text from documents.",
    ],
    "\"log analytics, custom search\" -> OpenSearch", ["OpenSearch"]
  ),
  mk(
    "amazon-kendra", 3, 1, "hard",
    "A company worries that an internal search tool might reveal confidential documents to users who should not see them. Which Kendra capability addresses this?",
    ["Document-level access control that respects source permissions", "Cross-Region replication", "Spot capacity", "Reserved Instances"],
    "a",
    "Kendra can filter results by the user's access to each document, honouring source ACLs.",
    [
      "Access-controlled results protect confidential content.",
      "Replication does not control who sees results.",
      "Spot capacity is a pricing option.",
      "Reserved Instances are a pricing option.",
    ],
    "\"search must respect permissions\" -> Kendra access control", ["Kendra", "access control"]
  ),

  // ---- Proton ----
  mk(
    "aws-proton", 1, 2, "easy",
    "A platform team wants to publish approved, versioned infrastructure and deployment templates so developers can self-serve containers and serverless apps consistently. Which service fits?",
    ["AWS Proton", "AWS Config", "Amazon Inspector", "AWS Snowball"],
    "a",
    "Proton lets platform teams define environment and service templates that developers deploy through self-service.",
    [
      "Proton is built for template-driven self-service deployment.",
      "Config evaluates resource configuration.",
      "Inspector scans for vulnerabilities.",
      "Snowball transfers data offline.",
    ],
    "\"platform team, templates, self-service\" -> Proton", ["Proton"]
  ),
  mk(
    "aws-proton", 2, 1, "medium",
    "An administrator wants to give end users a curated catalog of approved products, such as pre-configured EC2 stacks, that they can launch themselves. Which service is the closest fit?",
    ["AWS Service Catalog", "Amazon Detective", "AWS Artifact", "Amazon Macie"],
    "a",
    "Service Catalog provides approved products that users launch within governance constraints.",
    [
      "Service Catalog is the catalog of approved products.",
      "Detective investigates security findings.",
      "Artifact provides compliance reports.",
      "Macie finds sensitive data.",
    ],
    "\"curated catalog of approved products\" -> Service Catalog", ["Service Catalog"]
  ),
  mk(
    "aws-proton", 3, 2, "hard",
    "Proton templates are described using which underlying infrastructure as code technologies?",
    ["AWS CloudFormation or Terraform", "AWS CLI scripts only", "Amazon S3 lifecycle rules", "AWS Direct Connect"],
    "a",
    "Proton templates are defined using CloudFormation or Terraform.",
    [
      "Proton builds on those IaC tools.",
      "CLI scripts are not Proton's template format.",
      "Lifecycle rules manage S3 objects.",
      "Direct Connect is a network service.",
    ],
    "Proton templates = CloudFormation or Terraform", ["Proton", "CloudFormation"]
  ),

  // ---- Application Discovery Service ----
  mk(
    "aws-application-discovery-service", 1, 4, "easy",
    "Before migrating a data center, a company wants an inventory of servers with utilisation data and network dependencies. Which service collects this?",
    ["AWS Application Discovery Service", "AWS DataSync", "AWS Snowball", "AWS Transfer Family"],
    "a",
    "Application Discovery Service gathers configuration, utilisation and dependency data from on-premises servers.",
    [
      "It is the discovery and assessment service for migrations.",
      "DataSync transfers files.",
      "Snowball moves data offline.",
      "Transfer Family offers SFTP endpoints.",
    ],
    "\"inventory servers + dependencies\" -> Application Discovery Service", ["Application Discovery Service"]
  ),
  mk(
    "aws-application-discovery-service", 2, 4, "medium",
    "A company needs to capture running processes and network connections between servers to identify dependencies. Which discovery method provides this?",
    ["The Discovery Agent installed on servers", "Only the VMware agentless connector", "AWS Config", "Amazon Inspector"],
    "a",
    "The Discovery Agent collects process and network connection data. The agentless connector gathers VM configuration and performance data only.",
    [
      "The agent provides richer data including dependencies.",
      "The agentless connector does not capture in-guest network dependencies.",
      "Config records AWS resource configuration, not on-premises processes.",
      "Inspector scans for vulnerabilities.",
    ],
    "\"dependencies between servers\" -> Discovery Agent", ["Discovery Agent"]
  ),
  mk(
    "aws-application-discovery-service", 3, 4, "hard",
    "Which service then provides a single place to group discovered servers into applications and track migration progress across tools?",
    ["AWS Migration Hub", "AWS CloudTrail", "Amazon Athena", "AWS Backup"],
    "a",
    "Migration Hub groups servers into applications and tracks migration status from multiple tools.",
    [
      "Migration Hub is the central tracking service.",
      "CloudTrail records API activity.",
      "Athena queries data in S3.",
      "Backup protects data and resources.",
    ],
    "\"track migration across tools\" -> Migration Hub", ["Migration Hub"]
  ),

  // ---- Migration Hub / strategies ----
  mk(
    "aws-migration-hub", 1, 4, "easy",
    "A company must migrate dozens of servers as quickly as possible with no code changes. Which migration strategy fits?",
    ["Refactor", "Rehost (lift and shift)", "Repurchase", "Retire"],
    "b",
    "Rehosting moves servers as they are, which is the fastest approach with no code changes.",
    [
      "Refactoring redesigns the application and takes the most effort.",
      "Rehost is lift and shift.",
      "Repurchase replaces the application with SaaS.",
      "Retire switches the application off.",
    ],
    "\"fastest, no code changes\" -> rehost", ["rehost", "lift and shift"]
  ),
  mk(
    "aws-migration-hub", 2, 4, "medium",
    "During discovery, a company finds that several applications have had no users for a year. What is the most cost-effective action?",
    ["Rehost them to AWS", "Retire them", "Refactor them to serverless", "Replatform them to RDS"],
    "b",
    "Retiring unused applications avoids migration and running costs entirely.",
    [
      "Rehosting would pay to move and run something nobody uses.",
      "Retire removes cost and effort.",
      "Refactoring is the most expensive option for no value.",
      "Replatforming still costs effort for an unused system.",
    ],
    "\"nobody uses it\" -> retire", ["retire", "migration"]
  ),
  mk(
    "aws-migration-hub", 3, 4, "hard",
    "A company wants to reduce database administration effort when migrating, with only minor changes: move a self-managed MySQL database to Amazon RDS for MySQL. Which strategy is this?",
    ["Rehost", "Replatform", "Repurchase", "Retain"],
    "b",
    "Replatforming makes a small optimisation, such as moving to a managed database, without redesigning the application.",
    [
      "Rehosting keeps the database on a server as it was.",
      "Moving to a managed service with minor change is replatforming.",
      "Repurchase replaces the application with a SaaS product.",
      "Retain leaves it on premises.",
    ],
    "\"move DB to RDS, minor change\" -> replatform", ["replatform", "RDS"]
  ),

  // ---- Audit Manager ----
  mk(
    "aws-audit-manager", 1, 1, "easy",
    "A company needs to automate evidence collection for PCI DSS and HIPAA audits across its AWS accounts. Which service fits?",
    ["AWS Audit Manager", "Amazon GuardDuty", "AWS Shield", "Amazon Inspector"],
    "a",
    "Audit Manager continuously collects evidence mapped to compliance frameworks.",
    [
      "Audit Manager automates audit evidence collection.",
      "GuardDuty detects threats.",
      "Shield protects against DDoS.",
      "Inspector scans for vulnerabilities.",
    ],
    "\"automate audit evidence\" -> Audit Manager", ["Audit Manager", "compliance"]
  ),
  mk(
    "aws-audit-manager", 2, 1, "medium",
    "An auditor asks for AWS's own SOC reports and ISO certifications. Where should the company obtain them?",
    ["AWS Audit Manager", "AWS Artifact", "AWS Config", "AWS CloudTrail"],
    "b",
    "AWS Artifact provides on-demand access to AWS's compliance reports and agreements.",
    [
      "Audit Manager gathers evidence about the customer's own usage.",
      "Artifact hosts AWS's compliance documents.",
      "Config evaluates the customer's resource configuration.",
      "CloudTrail records API calls.",
    ],
    "\"AWS's own compliance reports\" -> Artifact", ["Artifact"]
  ),
  mk(
    "aws-audit-manager", 3, 1, "hard",
    "Which statement about AWS Audit Manager is correct?",
    ["It automatically remediates non-compliant resources", "It collects and organises evidence but does not make an account compliant", "It replaces AWS Config", "It guarantees passing an audit"],
    "b",
    "Audit Manager gathers evidence mapped to controls. It does not remediate or guarantee compliance.",
    [
      "Remediation is done with Config rules or Systems Manager.",
      "It assists audit preparation by collecting evidence.",
      "It uses Config as an evidence source rather than replacing it.",
      "No tool guarantees passing an audit.",
    ],
    "Audit Manager = evidence, not remediation", ["Audit Manager"]
  ),

  // ---- App2Container ----
  mk(
    "aws-app2container", 1, 2, "easy",
    "A company has a Java application on a server and wants to run it on Amazon ECS in a container without changing its code. Which tool helps?",
    ["AWS App2Container", "AWS DataSync", "AWS Snowball", "Amazon Lex"],
    "a",
    "App2Container analyses running Java and .NET applications and creates container images and deployment artifacts.",
    [
      "App2Container containerises existing apps without code changes.",
      "DataSync transfers data.",
      "Snowball moves data offline.",
      "Lex builds chatbots.",
    ],
    "\"containerize existing Java app, no code changes\" -> App2Container", ["App2Container", "containers"]
  ),
  mk(
    "aws-app2container", 2, 3, "medium",
    "After containerising a legacy application, where should its persistent data live so containers stay replaceable?",
    ["On the container's local disk", "In managed storage such as EFS, RDS or S3", "In the container image", "In environment variables"],
    "b",
    "State belongs in managed storage so any container can be replaced or scaled without losing data.",
    [
      "Local container disk is lost when a task is replaced.",
      "EFS, RDS or S3 persist independently of containers.",
      "Images are immutable templates, not data stores.",
      "Environment variables are for configuration, not data.",
    ],
    "\"stateful data and containers\" -> managed storage", ["containers", "state"]
  ),
  mk(
    "aws-app2container", 3, 2, "hard",
    "A company runs a VMware environment and cannot change its applications at all, and wants to move them with minimal effort. Which option fits better than containerisation?",
    ["VMware Cloud on AWS", "Rewriting as microservices", "AWS Lambda", "Amazon Lex"],
    "a",
    "When applications cannot change, running VMware workloads unchanged on VMware Cloud on AWS is the lowest effort path.",
    [
      "VMware Cloud on AWS relocates VMware workloads with minimal change.",
      "A rewrite is the highest effort.",
      "Lambda requires code changes.",
      "Lex is unrelated.",
    ],
    "\"VMware, no app changes\" -> VMware Cloud on AWS", ["VMware Cloud on AWS"]
  ),
];

export const deepDiveFFlashcards: Flashcard[] = [
  fc("aws-appsync", 1, 3, "Front-End Web and Mobile", "When is AppSync the answer?", "GraphQL APIs, real-time subscriptions, offline sync, or aggregating several data sources in one call."),
  fc("aws-appsync", 2, 3, "Front-End Web and Mobile", "AppSync vs API Gateway?", "AppSync: managed GraphQL with subscriptions. API Gateway: REST/HTTP APIs with usage plans, throttling and caching."),
  fc("aws-appsync", 3, 3, "Front-End Web and Mobile", "AppSync data sources?", "DynamoDB, Aurora (Data API), OpenSearch, Lambda and HTTP endpoints, connected by resolvers."),

  fc("aws-data-pipeline", 1, 3, "Analytics", "What is AWS Data Pipeline?", "A legacy scheduled data movement and ETL orchestration service using data nodes, activities and preconditions. Closed to new customers."),
  fc("aws-data-pipeline", 2, 3, "Analytics", "Modern replacements for Data Pipeline?", "Glue for serverless ETL, Step Functions for workflows, EventBridge Scheduler for scheduled triggers."),
  fc("aws-data-pipeline", 3, 3, "Analytics", "Data Pipeline building blocks?", "Data nodes, activities, resources (EC2 or EMR) and preconditions."),

  fc("amazon-qldb", 1, 1, "Databases", "QLDB vs blockchain?", "QLDB has one central trusted authority and an immutable verifiable journal. Managed Blockchain is for multiple untrusted parties."),
  fc("amazon-qldb", 2, 1, "Databases", "How does a ledger database prove history is intact?", "Each journal block is hash-chained with SHA-256 so any change is detectable, and you can verify a digest."),
  fc("amazon-qldb", 3, 1, "Databases", "QLDB status today?", "AWS announced end of support in 2025 and recommends Aurora PostgreSQL for ledger-style needs. It is still in the exam guide v1.1."),

  fc("amazon-timestream", 1, 3, "Databases", "When to choose a time series database?", "Timestamped measurements arriving continuously and queried over time windows, such as IoT and metrics. Timestream is AWS's service."),
  fc("amazon-timestream", 2, 4, "Databases", "Why Parquet instead of CSV for Athena?", "Parquet is columnar and compressed, so queries read only needed columns and scan less data, lowering cost."),
  fc("amazon-timestream", 3, 3, "Databases", "Row vs columnar stores?", "Row stores (RDS, Aurora) suit OLTP on whole records. Columnar stores (Redshift, Parquet) suit analytic scans over few columns."),

  fc("amazon-pinpoint", 1, 3, "Front-End Web and Mobile", "Pinpoint vs SNS vs SES?", "Pinpoint: segmented multichannel campaigns with analytics. SNS: simple pub/sub notifications. SES: bulk and transactional email."),
  fc("amazon-pinpoint", 2, 3, "Front-End Web and Mobile", "Pinpoint channels?", "Email, SMS, push, voice and in-app messages."),
  fc("amazon-pinpoint", 3, 3, "Front-End Web and Mobile", "Pinpoint status today?", "AWS announced end of support for engagement features, with messaging moving to SES and End User Messaging. Still in the exam guide."),

  fc("amazon-forecast", 1, 3, "Machine Learning", "What does Amazon Forecast do?", "Managed ML time-series forecasting, such as demand, with probabilistic forecasts at quantiles like P10, P50 and P90."),
  fc("amazon-forecast", 2, 3, "Machine Learning", "Forecast vs SageMaker?", "Forecast: purpose-built, no ML expertise. SageMaker: build and tune custom models."),
  fc("amazon-forecast", 3, 4, "Machine Learning", "Typical Forecast use cases?", "Retail demand planning, inventory and supply chain, capacity and staffing, financial forecasting."),

  fc("amazon-fraud-detector", 1, 1, "Machine Learning", "What does Fraud Detector do?", "Trains ML models on your labelled events and combines scores with rules to approve, review or block online activity in real time."),
  fc("amazon-fraud-detector", 2, 1, "Machine Learning", "Fraud Detector vs GuardDuty vs WAF?", "Fraud Detector: fraud in your app events. GuardDuty: threats to AWS accounts and workloads. WAF: filters web requests by rules."),
  fc("amazon-fraud-detector", 3, 1, "Machine Learning", "Fraud Detector example uses?", "Payment fraud, fake account sign-ups, account takeover and promotion abuse."),

  fc("amazon-kendra", 1, 3, "Machine Learning", "What is Amazon Kendra?", "Managed ML enterprise search that answers natural-language questions across connected repositories."),
  fc("amazon-kendra", 2, 3, "Machine Learning", "Kendra vs OpenSearch?", "Kendra: ready-made natural-language document search. OpenSearch: search and log analytics engine you tune."),
  fc("amazon-kendra", 3, 1, "Machine Learning", "Does Kendra respect permissions?", "Yes. It supports document-level access control based on source permissions."),

  fc("aws-proton", 1, 2, "Management and Governance", "What is AWS Proton for?", "Platform teams publish versioned environment and service templates (CloudFormation or Terraform) that developers deploy through self-service."),
  fc("aws-proton", 2, 1, "Management and Governance", "Proton vs Service Catalog?", "Proton: templates with deployment pipelines for services. Service Catalog: curated catalog of approved products users can launch."),
  fc("aws-proton", 3, 2, "Management and Governance", "Proton status today?", "AWS announced its retirement. The concept is still in the exam guide v1.1."),

  fc("aws-application-discovery-service", 1, 4, "Migration and Transfer", "Two ways Application Discovery Service collects data?", "Agentless Discovery Connector (VMware vCenter VMs) and Discovery Agent (installed on servers, also captures processes and network dependencies)."),
  fc("aws-application-discovery-service", 2, 4, "Migration and Transfer", "Migration toolchain order?", "Discover (Application Discovery Service), track (Migration Hub), then migrate with Application Migration Service for servers or DMS for databases."),
  fc("aws-application-discovery-service", 3, 2, "Migration and Transfer", "Why dependency data matters?", "Moving a server without the systems it talks to causes outages, so dependencies shape migration waves."),

  fc("aws-migration-hub", 1, 4, "Migration and Transfer", "The migration strategies (Rs)?", "Rehost, replatform, refactor, repurchase, retain, retire and relocate."),
  fc("aws-migration-hub", 2, 4, "Migration and Transfer", "Rehost vs replatform vs refactor?", "Rehost: lift and shift. Replatform: small optimisation like moving to RDS. Refactor: redesign to cloud native for the most benefit."),
  fc("aws-migration-hub", 3, 4, "Migration and Transfer", "Does Migration Hub move data?", "No. It tracks migrations. Application Migration Service and DMS perform the migration. Migration Hub itself is free."),

  fc("aws-audit-manager", 1, 1, "Security, Identity, and Compliance", "What does Audit Manager do?", "Continuously collects evidence from CloudTrail, Config, Security Hub and API calls, maps it to frameworks and produces audit reports."),
  fc("aws-audit-manager", 2, 1, "Security, Identity, and Compliance", "Audit Manager vs Artifact vs Config?", "Audit Manager: your audit evidence. Artifact: AWS's compliance reports. Config: resource configuration rules."),
  fc("aws-audit-manager", 3, 1, "Security, Identity, and Compliance", "Does Audit Manager fix compliance gaps?", "No. It collects and organises evidence only. Remediation uses Config rules or Systems Manager."),

  fc("aws-app2container", 1, 2, "Containers", "What does App2Container do?", "Analyses Java and ASP.NET apps and creates container images plus ECS or EKS deployment artifacts with no code changes."),
  fc("aws-app2container", 2, 3, "Containers", "Where should state live after containerising?", "In managed storage (EFS, RDS, S3) so containers remain replaceable."),
  fc("aws-app2container", 3, 2, "Containers", "App cannot change and runs on VMware?", "Consider VMware Cloud on AWS or Application Migration Service rehosting instead of containerising."),
];
