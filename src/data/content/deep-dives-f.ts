import type { Lesson } from "@/lib/types";

// In-scope services from the official SAA-C03 exam guide (v1.1) that previously had no dedicated lesson.
// Several of these services have since been closed to new customers or have announced end of support.
// The exam guide still lists them, so each lesson teaches the concept and names the modern alternative.

export const deepDivesF: Lesson[] = [
  {
    id: "aws-appsync",
    moduleId: "phase-misc",
    category: "Front-End Web and Mobile",
    title: "AWS AppSync",
    shortName: "AppSync",
    tier: 2,
    domains: [3, 2],
    examImportance: "medium",
    oneLiner:
      "AppSync is a managed GraphQL service that lets an app ask for exactly the data it needs from several backends, with real-time updates and offline sync.",
    englishExplanation:
      "GraphQL lets a client send one query describing exactly the fields it wants, rather than calling several REST endpoints and discarding what it does not need. AWS AppSync runs a GraphQL API for you. You define a schema, and resolvers connect each field to a data source: DynamoDB, Aurora through the Data API, OpenSearch Service, a Lambda function, or any HTTP endpoint. Because one query can pull data from several sources, mobile and web apps make fewer round trips.\n\nAppSync adds features that are awkward to build yourself. Subscriptions push changes to connected clients in real time over WebSockets, which suits chat, live dashboards and collaborative apps. Offline data sync, used through Amplify DataStore, lets a mobile app keep working without connectivity and reconcile changes later with conflict resolution. Authorisation can use API keys, IAM, Cognito user pools, OpenID Connect or a Lambda authorizer, with fine-grained control per field. Caching can reduce backend load.\n\nThe exam distinction is AppSync versus API Gateway. Choose AppSync when the question mentions GraphQL, real-time subscriptions, offline synchronisation or aggregating data from several sources in one call. Choose API Gateway for REST or HTTP APIs, request throttling and usage plans, and when the backend is Lambda or HTTP services exposed as resources. AppSync is also listed under Serverless in the exam guide because there are no servers to manage.",
    taglishExplanation:
      "Sa GraphQL, isang query lang ang ipapadala ng client na naglalarawan ng eksaktong field na kailangan, kaya hindi na kailangang tumawag ng maraming REST endpoint. Ang AppSync ang managed GraphQL service ng AWS. Magdedefine ka ng schema, at ikokonekta ng resolvers ang bawat field sa data source: DynamoDB, Aurora, OpenSearch, Lambda, o HTTP. May subscriptions din na nagtutulak ng real-time na update sa mga client gamit ang WebSocket, at offline sync para sa mobile app. Kapag GraphQL, real-time, o offline sync ang nabanggit sa tanong, AppSync. Kapag REST at throttling o usage plans, API Gateway.",
    analogy:
      "A waiter who takes your whole order in one go and fetches the starter from the kitchen, the drink from the bar and the dessert from the pastry counter, instead of making you walk to each counter. If you ask to be told when your table is ready, the waiter comes and finds you (a subscription).",
    whyItExists:
      "Mobile and web apps need data from many services and want live updates. Building GraphQL servers, WebSocket infrastructure and offline sync from scratch is a lot of work, so AWS offers it as a managed service.",
    flow: "Client -> AppSync GraphQL query/mutation/subscription -> resolvers -> DynamoDB / Aurora / OpenSearch / Lambda / HTTP -> response (and pushed updates over WebSocket)",
    withoutIt: [
      "Apps would make many REST calls and over-fetch data",
      "You would run your own GraphQL server and WebSocket layer",
      "Offline-first mobile behaviour would need custom sync logic",
    ],
    bestUseCases: [
      "Mobile and web apps that aggregate data from several sources in one request",
      "Real-time features such as chat, live scores and collaborative editing",
      "Offline-capable mobile apps using Amplify DataStore",
      "A single GraphQL front end over DynamoDB, Lambda and OpenSearch",
    ],
    poorUseCases: [
      "Plain REST APIs that need usage plans and API keys for monetisation (use API Gateway)",
      "Simple request-response APIs where GraphQL adds complexity",
      "Bulk data pipelines (use Kinesis or Glue)",
    ],
    alternatives: [
      { need: "REST or HTTP API with throttling and usage plans", choose: "Amazon API Gateway" },
      { need: "Mobile app backend scaffolding including auth and storage", choose: "AWS Amplify" },
      { need: "Message fan-out to subscribers", choose: "Amazon SNS" },
      { need: "User sign-in for the API", choose: "Amazon Cognito" },
    ],
    keyFeatures: [
      "Managed GraphQL API with schema and resolvers",
      "Data sources: DynamoDB, Aurora (Data API), OpenSearch, Lambda, HTTP",
      "Real-time subscriptions over WebSockets",
      "Offline data sync with Amplify DataStore and conflict resolution",
      "Auth: API key, IAM, Cognito, OIDC, Lambda authorizer",
      "Optional caching",
      "Serverless, scales automatically",
    ],
    availability:
      "AppSync is a managed Regional service that spans multiple AZs. Availability of the whole API also depends on the data sources behind it.",
    security:
      "Combine Cognito or IAM authorisation with field-level access control, use WAF for protection and encrypt data in transit with TLS.",
    pricingLogic:
      "You pay per query and mutation operation, per real-time update delivered and per minute of connection, plus optional caching.",
    examKeywords: [
      "GraphQL",
      "real-time subscriptions",
      "offline data synchronisation",
      "fetch only the fields needed",
      "aggregate multiple data sources",
    ],
    examTraps: [
      "GraphQL in the question means AppSync, not API Gateway.",
      "API Gateway WebSocket APIs exist, but AppSync is the managed choice when subscriptions pair with GraphQL and offline sync.",
      "AppSync is not a messaging service. It delivers data updates, not general pub/sub like SNS.",
    ],
    architectureDiagram: `Mobile / web app --GraphQL--> [AppSync]
                               |-- resolver --> DynamoDB
                               |-- resolver --> Lambda --> other services
                               +-- resolver --> OpenSearch
   subscription: AppSync --WebSocket--> connected clients (live updates)`,
    architectureCaption: "One GraphQL endpoint fronting several data sources, with live updates pushed to clients.",
    mentorTip: "Three trigger words: GraphQL, subscriptions, offline sync. Any of them points to AppSync.",
    questionIds: ["q-aws-appsync-1", "q-aws-appsync-2", "q-aws-appsync-3"],
  },
  {
    id: "aws-data-pipeline",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "AWS Data Pipeline",
    shortName: "Data Pipeline",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Data Pipeline is an older service for scheduling regular data movement and processing between AWS storage, compute and on-premises sources.",
    englishExplanation:
      "AWS Data Pipeline lets you define a workflow that runs on a schedule: copy data from S3 or a database, run a processing activity on EC2 or EMR, and write the result somewhere else. You describe data nodes (sources and destinations), activities (what work to do), resources (the EC2 or EMR capacity that runs it) and preconditions (conditions that must be true before work starts, such as a file existing). It retries failed activities, can send notifications, and a Task Runner on the compute resource polls the service for work.\n\nThe service is no longer available to new customers (existing customers can keep using it), because newer services cover its jobs better. For serverless ETL use AWS Glue. For multi-step workflows with branching and error handling use AWS Step Functions. For scheduled event triggers use Amazon EventBridge Scheduler. For Apache Airflow users there is Amazon MWAA, although the exam guide lists MWAA as out of scope. The exam guide still names Data Pipeline, so you should recognise it as the scheduled data movement and ETL orchestration service that predates Glue and Step Functions.",
    taglishExplanation:
      "Ang Data Pipeline ay luma nang service para sa naka-iskedyul na paglipat at pagproseso ng data. Magde-define ka ng data nodes (source at destination), activities (ang trabaho), resources (EC2 o EMR na tatakbo nito), at preconditions (kondisyong dapat totoo bago magsimula, gaya ng pagkakaroon ng file). Nagre-retry ito ng bumagsak na activity. Hindi na ito available sa mga bagong customer. Para sa serverless ETL, Glue. Para sa workflow na may branching, Step Functions. Para sa naka-iskedyul na trigger, EventBridge Scheduler. Alamin lang itong kilalanin sa exam.",
    analogy:
      "A factory shift timetable written on paper: at 2 a.m. fetch the day's deliveries, run them through the sorting line, and file the results. It works, but modern factories use automated scheduling systems instead.",
    whyItExists:
      "Before managed ETL and workflow services, teams needed a scheduler that could move data between systems and run processing jobs with retries.",
    flow: "Schedule -> precondition check -> activity runs on EC2/EMR -> output data node -> notify on success or failure",
    withoutIt: [
      "Teams would write cron jobs and custom retry logic",
      "Data movement between services would have no central dependency tracking",
    ],
    bestUseCases: [
      "Recognising legacy scheduled ETL that still runs on Data Pipeline",
      "Understanding the history behind Glue and Step Functions",
    ],
    poorUseCases: [
      "New ETL projects (use Glue)",
      "Multi-step serverless orchestration (use Step Functions)",
      "Real-time streaming (use Kinesis)",
    ],
    alternatives: [
      { need: "Serverless ETL and data catalog", choose: "AWS Glue" },
      { need: "Workflow orchestration with branching and retries", choose: "AWS Step Functions" },
      { need: "Cron-style triggers", choose: "Amazon EventBridge Scheduler" },
      { need: "Process big data with Spark or Hadoop", choose: "Amazon EMR" },
    ],
    keyFeatures: [
      "Scheduled data movement and transformation",
      "Data nodes, activities, resources and preconditions",
      "Runs on EC2 or EMR you configure",
      "Automatic retries and notifications",
      "Closed to new customers",
    ],
    availability:
      "The service retries failed activities, but the compute resources it launches are your responsibility to size and place across AZs.",
    security:
      "IAM roles define what the pipeline and its resources can access. Encrypt data in the underlying storage services.",
    pricingLogic:
      "You paid per pipeline according to activity frequency, plus the EC2 or EMR resources used.",
    examKeywords: ["scheduled data movement", "legacy ETL", "preconditions", "data nodes", "predates Glue"],
    examTraps: [
      "If a modern serverless ETL is wanted, the answer is Glue, not Data Pipeline.",
      "Data Pipeline is not for real-time streaming. That is Kinesis.",
    ],
    architectureDiagram: `[Schedule] -> [Precondition: file exists in S3] -> [Activity on EMR/EC2] -> [S3 / Redshift]
                          retries on failure, SNS notification`,
    architectureCaption: "A scheduled, dependency-aware batch workflow.",
    mentorTip: "Know Data Pipeline as the predecessor. On the exam, modern answers are Glue for ETL and Step Functions for workflows.",
    questionIds: ["q-aws-data-pipeline-1", "q-aws-data-pipeline-2", "q-aws-data-pipeline-3"],
  },
  {
    id: "amazon-qldb",
    moduleId: "phase-5-databases",
    category: "Databases",
    title: "Amazon QLDB (Quantum Ledger Database)",
    shortName: "QLDB",
    tier: 3,
    domains: [1, 3],
    examImportance: "low",
    oneLiner:
      "QLDB is a ledger database with an immutable, cryptographically verifiable history of every change, owned by one trusted authority.",
    englishExplanation:
      "A ledger database records every change to your data in a journal that can never be edited or deleted, and lets you cryptographically prove that the history has not been tampered with. Amazon QLDB did this as a fully managed, serverless service. Each change is appended to a journal, and each block is chained with SHA-256 hashes so that any alteration is detectable. You query current data and the full history with PartiQL, a SQL-compatible language.\n\nThe key exam distinction is QLDB versus blockchain. QLDB has a central, trusted authority that owns the ledger, which is simpler and faster when you do not need multiple untrusted parties to agree. Amazon Managed Blockchain, which is out of scope for the exam, is for decentralised networks where several parties share control. Typical QLDB use cases were financial transaction history, supply chain records, vehicle registration and claims history, where an auditable, tamper-evident record matters.\n\nA current-day caution: AWS ended support for QLDB on July 31, 2025, so the service is retired. AWS recommends migrating ledger-style workloads to Amazon Aurora PostgreSQL, using audit tooling such as pgAudit. The exam guide version 1.1 still lists QLDB, so learn what it is and when it fits, and know that Aurora PostgreSQL is the modern direction.",
    taglishExplanation:
      "Ang ledger database ay nagtatala ng bawat pagbabago sa journal na hindi na puwedeng baguhin o burahin, at puwede mong patunayan sa pamamagitan ng cryptography na hindi ito nabago. Ganito ang QLDB: bawat block ay naka-chain gamit ang SHA-256, at nagku-query ka gamit ang PartiQL. Ang pagkakaiba nito sa blockchain: may isang pinagkakatiwalaang may-ari ang ledger sa QLDB, samantalang ang Managed Blockchain ay para sa maraming partido na walang tiwala sa isa't isa. Paalala: itinigil na ng AWS ang suporta sa QLDB noong July 31, 2025, at Aurora PostgreSQL ang inirerekomenda. Nasa exam guide pa rin ito, kaya alamin ang konsepto.",
    analogy:
      "A bank passbook where every line is written in permanent ink and each page carries a stamp that depends on all previous pages, so ripping out or rewriting a line is obvious. One bank owns the passbook, unlike a public notice board that many strangers write on.",
    whyItExists:
      "Many applications need an authoritative, auditable history: who changed what and when. Building tamper-evidence into an ordinary database is hard, so a ledger database provides it natively.",
    flow: "Write -> appended to immutable journal (hash-chained) -> current state view and full history queryable via PartiQL -> request digest to verify history",
    withoutIt: [
      "Audit tables in a normal database can be altered by administrators without detection",
      "You would build your own hash chaining and verification",
    ],
    bestUseCases: [
      "Recognising scenarios needing an immutable, verifiable record with a central owner",
      "Financial, insurance claims and supply chain audit trails",
    ],
    poorUseCases: [
      "Decentralised multi-party consensus (Managed Blockchain, out of scope)",
      "General transactional or analytic workloads",
      "New builds, since the service is retired",
    ],
    alternatives: [
      { need: "Modern ledger-style audit tables with SQL", choose: "Amazon Aurora PostgreSQL" },
      { need: "Decentralised blockchain network", choose: "Amazon Managed Blockchain (out of scope)" },
      { need: "Immutable object storage", choose: "S3 Object Lock" },
      { need: "Audit of API activity", choose: "AWS CloudTrail with log file validation" },
    ],
    keyFeatures: [
      "Append-only journal that cannot be edited or deleted",
      "SHA-256 hash chaining with cryptographic verification",
      "PartiQL query language",
      "Serverless, fully managed",
      "Central trust model, not decentralised",
      "Retired: support ended July 31, 2025",
    ],
    availability:
      "Data was replicated across multiple AZs in a Region by the service. The service is retired, so any remaining ledgers must be migrated.",
    security:
      "Data was encrypted at rest and in transit, with IAM controlling access to ledgers and journal exports.",
    pricingLogic:
      "You paid for read and write I/O and for journal and indexed storage, with no servers to size.",
    examKeywords: [
      "immutable",
      "cryptographically verifiable",
      "ledger",
      "central trusted authority",
      "complete history of changes",
    ],
    examTraps: [
      "QLDB has a central authority. Decentralised multi-party scenarios point to blockchain, not QLDB.",
      "Immutable files in object storage point to S3 Object Lock, not QLDB.",
    ],
    architectureDiagram: `App --PartiQL--> [QLDB ledger]
                  |-- current state tables
                  +-- immutable journal (hash chain) --> verify digest / export to S3`,
    architectureCaption: "Every change is appended to a journal that can be cryptographically verified.",
    mentorTip: "Ledger plus central owner equals QLDB. Ledger plus many untrusted parties equals blockchain.",
    questionIds: ["q-amazon-qldb-1", "q-amazon-qldb-2", "q-amazon-qldb-3"],
  },
  {
    id: "amazon-timestream",
    moduleId: "phase-5-databases",
    category: "Databases",
    title: "Time Series and Columnar Databases: Timestream and Redshift",
    shortName: "Time series & columnar",
    tier: 2,
    domains: [3, 4],
    examImportance: "medium",
    oneLiner:
      "Time series databases store timestamped measurements efficiently, and columnar databases store data by column so analytic scans are fast and cheap.",
    englishExplanation:
      "The exam guide asks you to choose cost-effective database types such as time series format and columnar format. A time series database is optimised for data where every row has a timestamp, such as IoT sensor readings, application metrics and stock ticks. Amazon Timestream is AWS's serverless time series database. It keeps recent data in a fast memory store and moves older data automatically to a cheaper magnetic store according to retention policies you set, and it supports SQL with time-oriented functions such as interpolation and smoothing. Note that Timestream for LiveAnalytics has been closed to new customers since June 20, 2025, and AWS points new projects to Timestream for InfluxDB, but the concept is what the exam tests.\n\nA columnar database stores each column together on disk instead of each row. Analytic queries usually read a few columns across millions of rows, so reading only those columns is far faster and compresses well. Amazon Redshift is the columnar data warehouse, and file formats such as Parquet and ORC bring the same idea to S3 data lakes, which cuts Athena scan costs. Row-oriented databases such as RDS and Aurora suit transactional workloads that read and write whole rows.\n\nThe decision rule is access pattern. Many small reads and writes of whole records is relational or key-value. Timestamped measurements arriving continuously and queried over time windows is time series. Large analytic aggregations over a few columns is columnar. Related exam answers include DynamoDB for key-value, Neptune for graph, DocumentDB for documents and Keyspaces for wide-column Cassandra workloads.",
    taglishExplanation:
      "Hinihingi ng exam guide na pumili ka ng cost-effective na database type, tulad ng time series at columnar. Ang time series database ay para sa data na may timestamp ang bawat row, gaya ng IoT sensor at metrics. Ang Timestream ay serverless na time series DB ng AWS: ang bagong data ay nasa memory store at awtomatikong lilipat sa mas murang magnetic store ayon sa retention policy. Ang columnar database ay iniimbak ang data kada column, kaya mabilis at mura ang analytic query na ilang column lang ang binabasa. Ang Redshift ay columnar, at ang Parquet at ORC ay nagdadala ng parehong ideya sa S3. Ang pagpili ay base sa access pattern.",
    analogy:
      "A time series database is a lab notebook with one line per timed reading and an automatic filing system that moves old pages to the archive room. A columnar database is a spreadsheet stored as separate sheets per column, so adding up one column never touches the others.",
    whyItExists:
      "General-purpose databases waste time and money on metrics-style and analytic workloads. Specialised storage formats make those queries faster and cheaper.",
    flow: "Sensors/apps write timestamped records -> Timestream memory store -> automatic move to magnetic store by retention -> SQL time-window queries ; analytics: load to Redshift or Parquet in S3 -> query only needed columns",
    withoutIt: [
      "Metrics would bloat a relational database and slow its transactional work",
      "Analytic queries would read full rows when they only need a few columns",
    ],
    bestUseCases: [
      "Timestream for IoT telemetry, DevOps metrics and application monitoring data",
      "Redshift for large aggregations and reporting",
      "Parquet or ORC in S3 with Athena to reduce scanned bytes",
      "Retention policies that tier old time series data to cheaper storage",
    ],
    poorUseCases: [
      "Timestream for transactional records that update individual rows",
      "Redshift for high-rate single-row OLTP",
      "Row-oriented CSV in S3 for heavy repeated Athena queries",
    ],
    alternatives: [
      { need: "Key-value access at scale", choose: "Amazon DynamoDB" },
      { need: "Relationships between entities", choose: "Amazon Neptune" },
      { need: "Metrics and alarms on AWS resources", choose: "Amazon CloudWatch" },
      { need: "Serverless SQL over S3 data", choose: "Amazon Athena with Parquet" },
    ],
    keyFeatures: [
      "Timestream: serverless time series database with memory and magnetic tiers",
      "Retention policies automate tiering",
      "SQL with time-series functions",
      "Redshift: columnar MPP data warehouse with compression",
      "Parquet and ORC: columnar file formats for S3 data lakes",
      "Row stores for OLTP, column stores for OLAP",
    ],
    availability:
      "Timestream is a managed service that replicates across AZs. Redshift can use Multi-AZ and cross-Region snapshots.",
    security:
      "Encrypt with KMS and control access with IAM. Use VPC endpoints for private access.",
    pricingLogic:
      "Timestream charges for writes, queries and storage by tier. Columnar formats cut scan-based charges such as Athena's per-TB pricing.",
    examKeywords: [
      "time series",
      "IoT sensor data",
      "timestamp",
      "columnar",
      "analytic scans",
      "Parquet",
      "retention tiering",
    ],
    examTraps: [
      "Time series is not the same as key-value. Timestamped measurements queried over windows point to Timestream.",
      "CSV to Parquet reduces Athena cost because of column pruning and compression.",
      "Redshift is columnar. RDS and Aurora are row oriented.",
    ],
    architectureDiagram: `IoT devices --> [Kinesis / IoT rules] --> [Timestream: memory store -> magnetic store]
                                              |
  Data lake: S3 (Parquet, columnar) --> Athena / Redshift Spectrum --> QuickSight`,
    architectureCaption: "Pick the storage shape that matches the query shape.",
    mentorTip: "Ask: what is the dominant query? Whole records, time windows, or column aggregates? That picks the database type.",
    questionIds: ["q-amazon-timestream-1", "q-amazon-timestream-2", "q-amazon-timestream-3"],
  },
  {
    id: "amazon-pinpoint",
    moduleId: "phase-misc",
    category: "Front-End Web and Mobile",
    title: "Amazon Pinpoint",
    shortName: "Pinpoint",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Pinpoint sends targeted marketing and transactional messages by email, SMS, push and voice, with audience segments, campaigns and analytics.",
    englishExplanation:
      "Amazon Pinpoint is a customer engagement service. You import or collect user endpoints (an email address, phone number or device token plus attributes), group them into segments such as users who have not opened the app in 30 days, and send campaigns or multi-step journeys across channels: email, SMS, push notifications, voice and in-app messages. It tracks delivery, opens and conversions, and supports A/B testing and scheduled or event-triggered sends.\n\nThe exam contrast is with SNS and SES. Amazon SNS is simple pub/sub and notification delivery for applications and developers, without audience segmentation or campaign analytics. Amazon SES is a bulk and transactional email sending service. Pinpoint adds the marketing layer on top: segmentation, campaigns, journeys and analytics. When a question says targeted campaigns, segments or engagement analytics, think Pinpoint.\n\nAs with some other services in the exam guide, Pinpoint is being retired: it stopped accepting new customers on May 20, 2025 and AWS ends support on October 30, 2026. Email moves to Amazon SES, SMS, voice and push to AWS End User Messaging, and campaigns and journeys to Amazon Connect proactive engagement. Learn the concept for the exam, but do not start a new build on it.",
    taglishExplanation:
      "Ang Pinpoint ay customer engagement service. Mag-iimport ka ng endpoints (email, numero, device token), ipapangkat sa segments, at magpapadala ng campaign o journey sa email, SMS, push, voice, o in-app. Sinusubaybayan nito ang delivery, opens, at conversions, at may A/B testing. Kontrast: ang SNS ay simpleng pub/sub at notification, walang segmentation. Ang SES ay email sending. Kapag targeted campaigns, segments, at engagement analytics ang nasa tanong, Pinpoint. Ititigil ng AWS ang suporta sa Pinpoint sa October 30, 2026 at hindi na ito tumatanggap ng bagong customer mula May 20, 2025, kaya alamin ang konsepto pero huwag magsimula ng bagong proyekto dito.",
    analogy:
      "SNS is a megaphone that announces to whoever is listening. SES is the postal service. Pinpoint is a marketing department that knows who its customers are, writes personalised letters to the right groups, and measures who responded.",
    whyItExists:
      "Marketing and product teams need to reach the right users with the right message on the right channel and measure results, which plain notification services do not provide.",
    flow: "Endpoints and events -> segments -> campaign or journey -> email/SMS/push/voice -> delivery and engagement analytics",
    withoutIt: [
      "Teams would stitch together separate email, SMS and push providers",
      "Audience targeting and campaign measurement would be manual",
    ],
    bestUseCases: [
      "Recognising campaign and segmentation scenarios across channels",
      "Re-engagement push notifications for lapsed app users",
    ],
    poorUseCases: [
      "Simple system alerts to an operations team (use SNS)",
      "Pure bulk email sending without segmentation (use SES)",
    ],
    alternatives: [
      { need: "Simple pub/sub and alerts", choose: "Amazon SNS" },
      { need: "Bulk and transactional email", choose: "Amazon SES" },
      { need: "Mobile app backend with analytics", choose: "AWS Amplify" },
      { need: "Direct SMS and push at scale", choose: "AWS End User Messaging" },
      { need: "Campaigns and customer journeys", choose: "Amazon Connect proactive engagement" },
    ],
    keyFeatures: [
      "Endpoints and segments",
      "Campaigns and multi-step journeys",
      "Channels: email, SMS, push, voice, in-app",
      "A/B testing and engagement analytics",
      "Event-triggered and scheduled messages",
      "Closed to new customers since May 20, 2025, support ends October 30, 2026",
    ],
    availability: "A managed Regional service. Delivery depends on the channel providers and carriers.",
    security: "IAM controls access and message content can include personal data, so respect opt-outs and encrypt data at rest.",
    pricingLogic: "You paid per monthly targeted user plus per message sent on each channel.",
    examKeywords: ["targeted campaigns", "segments", "multichannel", "engagement analytics", "push notifications", "journeys"],
    examTraps: [
      "SNS delivers notifications but has no segmentation or campaign analytics.",
      "SES sends email only. Multichannel campaigns are Pinpoint.",
    ],
    architectureDiagram: `App events -> [Pinpoint endpoints] -> [Segment: inactive 30 days]
                                   |
                         [Campaign / Journey] -> email | SMS | push | voice
                                   |
                           analytics: delivered, opened, converted`,
    architectureCaption: "Audience, message and measurement in one service.",
    mentorTip: "Marketing words (segments, campaigns, journeys) mean Pinpoint. Developer words (topics, subscriptions) mean SNS.",
    questionIds: ["q-amazon-pinpoint-1", "q-amazon-pinpoint-2", "q-amazon-pinpoint-3"],
  },
  {
    id: "amazon-forecast",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "Amazon Forecast",
    shortName: "Forecast",
    tier: 3,
    domains: [3, 4],
    examImportance: "low",
    oneLiner:
      "Forecast uses machine learning to predict future values of a time series, such as product demand, from your historical data, with no ML expertise needed.",
    englishExplanation:
      "Amazon Forecast was a managed time-series forecasting service. You supplied historical data, such as daily sales per product, optionally with related data like price, promotions or weather and item metadata like category. Forecast trained models automatically (AutoML would pick the best algorithm), produced a predictor, and generated forecasts at different quantiles such as P10, P50 and P90, so planners could trade off the cost of over-stocking against running out.\n\nTypical scenarios are retail demand planning, inventory and supply chain, workforce and capacity planning, and financial forecasting. The exam pattern is recognition: when a company wants to predict future demand from historical time-series data without building an ML team, Forecast is the purpose-built service. Contrast it with SageMaker, which is the platform for building custom models, and with Personalize, which recommends items but is out of scope.\n\nAWS has stopped accepting new customers for Forecast and points to SageMaker Canvas and other tools. The exam guide version 1.1 still lists it, so know what it does and which modern service replaces it for new projects.",
    taglishExplanation:
      "Ang Forecast ay managed na time-series forecasting service. Magbibigay ka ng historical data gaya ng arawang benta, at puwede ring related data tulad ng presyo o promo. Awtomatiko itong magte-train ng model at magbibigay ng forecast sa iba't ibang quantile, P10, P50, P90. Gamit ito sa retail demand, inventory, at capacity planning. Sa exam: kapag gustong hulaan ang demand mula sa historical time-series nang walang ML team, Forecast. Ang SageMaker naman ay para sa custom model. Hindi na tumatanggap ng bagong customer ang AWS para dito at SageMaker Canvas ang itinuturo, pero nasa exam guide pa rin.",
    analogy:
      "A seasoned shop manager who has watched years of sales, notices that umbrellas sell more when it rains, and tells you how many to order for next month, with a confident estimate and a cautious one.",
    whyItExists:
      "Accurate forecasts normally need data scientists and tuning. A managed service lets business teams get ML-quality forecasts from their own history.",
    flow: "Historical time series (+ related data) -> import dataset -> train predictor (AutoML) -> generate forecast -> query P10/P50/P90",
    withoutIt: [
      "Teams would build and tune forecasting models by hand or rely on spreadsheets",
      "Over-stocking and stock-outs would be harder to balance",
    ],
    bestUseCases: [
      "Retail demand forecasting",
      "Inventory and supply chain planning",
      "Capacity and staffing predictions",
    ],
    poorUseCases: [
      "Custom model research (use SageMaker)",
      "Item recommendations (Personalize, out of scope)",
      "Anomaly detection in streams",
    ],
    alternatives: [
      { need: "Build and train custom ML models", choose: "Amazon SageMaker" },
      { need: "No-code ML forecasting for analysts", choose: "SageMaker Canvas" },
      { need: "Business intelligence on forecast output", choose: "Amazon QuickSight" },
      { need: "Detect fraud with ML", choose: "Amazon Fraud Detector" },
    ],
    keyFeatures: [
      "Managed time-series forecasting with AutoML",
      "Optional related time series and item metadata",
      "Probabilistic forecasts at several quantiles",
      "Data from S3, outputs back to S3",
      "Closed to new customers, still in the exam guide",
    ],
    availability: "A managed Regional service. Datasets are stored in S3 and the service handles training infrastructure.",
    security: "Encrypt data with KMS and restrict access with IAM roles. Keep source data in private S3 buckets.",
    pricingLogic: "You paid for data stored, training hours and forecasts generated.",
    examKeywords: ["forecast demand", "time-series prediction", "historical sales", "no ML expertise", "inventory planning"],
    examTraps: [
      "Custom model building is SageMaker. Purpose-built forecasting with no ML expertise is Forecast.",
      "Recommendations are not forecasts. Personalize is out of scope.",
    ],
    architectureDiagram: `[S3: historical sales + price] -> [Forecast dataset group] -> [Predictor (AutoML)]
                                                              |
                                                        [Forecast P10/P50/P90] -> S3 -> QuickSight`,
    architectureCaption: "From history to a probabilistic forecast, without writing ML code.",
    mentorTip: "Forecast demand from time-series history means Amazon Forecast. Custom models mean SageMaker.",
    questionIds: ["q-amazon-forecast-1", "q-amazon-forecast-2", "q-amazon-forecast-3"],
  },
  {
    id: "amazon-fraud-detector",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "Amazon Fraud Detector",
    shortName: "Fraud Detector",
    tier: 3,
    domains: [1, 3],
    examImportance: "low",
    oneLiner:
      "Fraud Detector uses machine learning trained on your own historical events, plus rules, to score online activity for fraud in real time.",
    englishExplanation:
      "Amazon Fraud Detector is a managed service for detecting online fraud such as fake account sign-ups, payment fraud and account takeover. You send historical events labelled as fraudulent or legitimate, such as sign-ups or transactions with attributes like IP address, email and amount. The service trains a model on your data, and you combine the model's risk score with business rules in a detector. Your application then calls the real-time prediction API for each new event and receives an outcome such as approve, review or block.\n\nThe key idea is that it learns from your own fraud history and uses the machine learning expertise AWS built from fraud detection at Amazon, so you do not need data scientists. Contrast it with GuardDuty, which detects threats against AWS accounts and workloads, with WAF, which blocks web exploits, and with SageMaker, which is for building custom models. If the scenario is online payment fraud or fake accounts in your own application, Fraud Detector is the purpose-built service.\n\nAWS stopped onboarding new customers on November 7, 2025 and suggests alternatives such as Amazon SageMaker, AutoGluon and AWS WAF Fraud Control. Existing customers can keep using it, and the exam guide still lists it, so know the concept.",
    taglishExplanation:
      "Ang Fraud Detector ay managed service para madetect ang online fraud tulad ng pekeng account at payment fraud. Magpapadala ka ng historical events na may label na fraud o hindi, at magte-train ito ng model sa data mo. Pagsasamahin mo ang risk score at business rules sa isang detector, at tatawag ang application mo ng real-time prediction API para sa bawat bagong event, na magbibigay ng approve, review, o block. Hindi ito GuardDuty, na para sa threats sa AWS account, at hindi rin WAF, na para sa web exploits. Para sa custom model, SageMaker.",
    analogy:
      "A shop security guard who has studied thousands of past shoplifting cases at your store and now flags suspicious customers at the door, while you decide whether to ask them to leave, check their bag, or let them in.",
    whyItExists:
      "Fraud patterns are specific to each business and change over time, and building an accurate real-time model requires scarce ML skills. A managed service makes that accessible.",
    flow: "Historical labelled events -> train model -> detector (model + rules) -> app sends new event -> risk score and outcome (approve / review / block)",
    withoutIt: [
      "Teams would rely on static rules that fraudsters learn to evade",
      "A custom model pipeline would need data scientists and infrastructure",
    ],
    bestUseCases: [
      "Online payment fraud scoring at checkout",
      "Fake account registration detection",
      "Account takeover and promotion abuse detection",
    ],
    poorUseCases: [
      "Threat detection on AWS accounts (use GuardDuty)",
      "Blocking SQL injection or bots (use WAF)",
      "Custom unrelated ML tasks (use SageMaker)",
    ],
    alternatives: [
      { need: "Threat detection in AWS accounts and workloads", choose: "Amazon GuardDuty" },
      { need: "Block web exploits and bots", choose: "AWS WAF" },
      { need: "Custom ML models", choose: "Amazon SageMaker" },
      { need: "Detect sensitive data in S3", choose: "Amazon Macie" },
    ],
    keyFeatures: [
      "Models trained on your labelled historical events",
      "Rules combined with model scores in detectors",
      "Real-time prediction API with outcomes",
      "No ML expertise required",
      "Closed to new customers, still in the exam guide",
    ],
    availability: "A managed Regional service with a real-time prediction API.",
    security: "Data is encrypted at rest and in transit. Restrict access with IAM and avoid sending unnecessary personal data.",
    pricingLogic: "You paid for model training hours, hosting and predictions made.",
    examKeywords: ["online payment fraud", "fake accounts", "account takeover", "real-time fraud scoring", "trained on historical events"],
    examTraps: [
      "Fraud inside your own application points to Fraud Detector. Threats against AWS resources point to GuardDuty.",
      "WAF filters web requests by rules. It does not learn from your fraud history.",
    ],
    architectureDiagram: `[Historical events labelled fraud / legit] -> [Train model]
[App: new sign-up or payment] -> [Detector: model score + rules] -> approve | review | block`,
    architectureCaption: "Model plus rules, called in real time from the application.",
    mentorTip: "Fraud in the company's own application equals Fraud Detector. Threats to the AWS account equal GuardDuty.",
    questionIds: ["q-amazon-fraud-detector-1", "q-amazon-fraud-detector-2", "q-amazon-fraud-detector-3"],
  },
  {
    id: "amazon-kendra",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "Amazon Kendra",
    shortName: "Kendra",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Kendra is a managed intelligent search service that answers natural-language questions across documents in many company repositories.",
    englishExplanation:
      "Amazon Kendra is an enterprise search service powered by machine learning. You create an index and connect data sources such as S3, SharePoint, Confluence, Salesforce, RDS or file shares through built-in connectors. Employees then ask questions in natural language, such as how many vacation days a new hire gets, and Kendra returns direct answers, relevant passages and ranked documents rather than just a list of keyword matches. It respects document-level access control so users only see what they are allowed to see.\n\nThe contrast is with Amazon OpenSearch Service. OpenSearch is a search and analytics engine that you design, tune and operate, well suited to log analytics and custom search applications. Kendra is a managed, ready-to-use enterprise search experience with natural-language understanding and no ML expertise required. Another related service is Amazon Lex, which builds conversational bots, and Kendra can serve as the document knowledge source behind such a bot.\n\nWhen the exam describes an internal knowledge portal where employees ask questions in plain language over many document stores, Kendra is the intended answer.",
    taglishExplanation:
      "Ang Kendra ay managed na intelligent search service na pinapagana ng machine learning. Gagawa ka ng index at ikokonekta ang data sources tulad ng S3, SharePoint, Confluence, o RDS gamit ang connectors. Magtatanong ang empleyado sa natural na wika at magbibigay ang Kendra ng direktang sagot at mga kaugnay na dokumento, at iginagalang ang document-level access control. Kontrast sa OpenSearch: ang OpenSearch ay engine na ikaw ang magdidisenyo at magpapatakbo, magandang pang-log analytics. Ang Kendra ay handa nang enterprise search na may natural-language understanding.",
    analogy:
      "A knowledgeable librarian who has read every book, memo and wiki page in the company and answers your question directly, instead of handing you a stack of papers containing your keywords.",
    whyItExists:
      "Company knowledge is scattered across systems and keyword search often fails. Employees want answers, and building semantic search from scratch is expensive.",
    flow: "Connect data sources -> Kendra index -> user asks natural-language question -> ranked answers and passages (filtered by user permissions)",
    withoutIt: [
      "Employees would search each repository separately with keyword search",
      "Teams would build and tune their own semantic search pipeline",
    ],
    bestUseCases: [
      "An internal knowledge base or HR help portal with natural-language questions",
      "Customer support search over manuals and tickets",
      "A document source for a chatbot",
    ],
    poorUseCases: [
      "Log analytics and dashboards (use OpenSearch)",
      "Simple structured queries on a database",
      "Full-text search where you need to tune scoring yourself",
    ],
    alternatives: [
      { need: "Self-managed search and log analytics", choose: "Amazon OpenSearch Service" },
      { need: "Conversational chatbot interface", choose: "Amazon Lex" },
      { need: "Extract text from scanned documents", choose: "Amazon Textract" },
      { need: "Understand sentiment and entities in text", choose: "Amazon Comprehend" },
    ],
    keyFeatures: [
      "Natural-language question answering",
      "Connectors for S3, SharePoint, Confluence, Salesforce, RDS and more",
      "Document-level access control",
      "Managed index with no ML expertise needed",
      "Incremental learning from feedback",
    ],
    availability: "A managed Regional service. Index capacity editions determine scale.",
    security: "Respects source ACLs, supports encryption with KMS and integrates with IAM Identity Center for user context.",
    pricingLogic: "You pay for index capacity per hour by edition plus connector document scanning.",
    examKeywords: ["intelligent search", "natural-language questions", "enterprise documents", "SharePoint connector", "knowledge portal"],
    examTraps: [
      "OpenSearch is a search engine you operate. Kendra is the ML-powered managed enterprise search.",
      "Kendra searches documents. Textract extracts text from images, Comprehend analyses text.",
    ],
    architectureDiagram: `[S3] [SharePoint] [Confluence] [RDS] --connectors--> [Kendra index]
Employee: "What is the parental leave policy?" -> answer + source passages (ACL filtered)`,
    architectureCaption: "One natural-language search over many repositories.",
    mentorTip: "Natural-language questions over company documents equals Kendra. Tunable search or logs equals OpenSearch.",
    questionIds: ["q-amazon-kendra-1", "q-amazon-kendra-2", "q-amazon-kendra-3"],
  },
  {
    id: "aws-proton",
    moduleId: "phase-9-monitoring",
    category: "Management and Governance",
    title: "AWS Proton",
    shortName: "Proton",
    tier: 3,
    domains: [2, 1],
    examImportance: "low",
    oneLiner:
      "Proton lets a platform team publish approved infrastructure and deployment templates so developers can self-serve consistent environments and services.",
    englishExplanation:
      "AWS Proton is for platform engineering at scale. A platform team defines environment templates (for example a shared VPC and cluster) and service templates (for example a container service with a CI/CD pipeline) using CloudFormation or Terraform. They publish versioned templates in Proton. Developers then pick a template, supply parameters and deploy a service without writing infrastructure code or bypassing company standards. When the platform team releases a new template version, Proton shows which services are out of date and can help roll the update out.\n\nThis addresses the governance problem of many teams creating slightly different infrastructure. It sits alongside AWS Service Catalog, which also offers approved products, and CloudFormation, which provisions the resources. The exam role of Proton is to recognise it as the service for standardising and versioning infrastructure and deployment templates for containers and serverless applications across many developers.\n\nAWS ended support for Proton on October 7, 2026 (new customers could not sign up after October 7, 2025), so for new work consider CloudFormation with Git sync, Service Catalog or third-party platform tooling. Stacks that Proton deployed keep running. The exam guide still names it.",
    taglishExplanation:
      "Ang Proton ay para sa platform engineering. Magde-define ang platform team ng environment templates at service templates gamit ang CloudFormation o Terraform, at ilalathala ang mga ito na may version. Pipili ang developer ng template, maglalagay ng parameters, at magde-deploy nang hindi nagsusulat ng infrastructure code at nang hindi lumalabag sa standard ng kumpanya. Kapag may bagong bersyon, makikita kung aling service ang luma na. Katabi nito ang Service Catalog. Itinigil na ng AWS ang suporta sa Proton noong October 7, 2026, pero nasa exam guide pa rin.",
    analogy:
      "A franchise head office that publishes approved shop-fitting blueprints. Each new branch manager picks a blueprint and customises the allowed options, and head office can see which branches still use the old version.",
    whyItExists:
      "As teams multiply, unmanaged infrastructure drifts and standards erode. Platform teams need a way to offer self-service within guardrails.",
    flow: "Platform team publishes versioned templates -> developer selects template and parameters -> Proton provisions via CloudFormation/Terraform and CI/CD -> template updates tracked",
    withoutIt: [
      "Each team would hand-roll infrastructure with inconsistent security and tagging",
      "Rolling out a new standard would require chasing every team",
    ],
    bestUseCases: [
      "Standardised container and serverless service deployment across many teams",
      "Versioned golden-path templates with centrally managed updates",
    ],
    poorUseCases: [
      "A single small application with one team",
      "Provisioning individual resources directly (use CloudFormation)",
    ],
    alternatives: [
      { need: "Catalog of approved products end users can launch", choose: "AWS Service Catalog" },
      { need: "Infrastructure as code provisioning", choose: "AWS CloudFormation" },
      { need: "Multi-account guardrails", choose: "AWS Control Tower" },
      { need: "Run containers without servers", choose: "AWS Fargate" },
    ],
    keyFeatures: [
      "Environment and service templates",
      "Built on CloudFormation or Terraform",
      "Versioned templates with update tracking",
      "Integrated CI/CD pipelines",
      "Support ended October 7, 2026",
    ],
    availability: "A managed Regional service. Resilience of deployed workloads depends on the templates chosen.",
    security: "Templates enforce approved networking and IAM patterns, reducing configuration drift. Control who can publish templates.",
    pricingLogic: "Proton had no additional charge. You paid for the resources it provisioned.",
    examKeywords: ["platform team", "standardised templates", "self-service deployment", "versioned infrastructure templates", "golden path"],
    examTraps: [
      "Service Catalog offers approved products to launch. Proton focuses on environment and service templates with deployment pipelines.",
      "Proton does not replace CloudFormation. It builds on it.",
    ],
    architectureDiagram: `Platform team --> [Proton templates v1, v2 ...]
Developer --> choose template + parameters --> [Proton] --> CloudFormation/Terraform --> running service
Proton shows services still on an older template version`,
    architectureCaption: "Platform team defines the standard. Developers self-serve inside it.",
    mentorTip: "Platform team plus self-service plus versioned templates equals Proton. A catalog of products for end users equals Service Catalog.",
    questionIds: ["q-aws-proton-1", "q-aws-proton-2", "q-aws-proton-3"],
  },
  {
    id: "aws-application-discovery-service",
    moduleId: "phase-11-migration",
    category: "Migration and Transfer",
    title: "AWS Application Discovery Service",
    shortName: "Application Discovery",
    tier: 2,
    domains: [4, 2],
    examImportance: "medium",
    oneLiner:
      "Application Discovery Service inventories on-premises servers, their utilisation and their dependencies so you can plan a migration with facts.",
    englishExplanation:
      "Before moving servers to AWS you need to know what you have: how many servers, their CPU, memory and disk use, and which servers talk to each other. AWS Application Discovery Service collects that information from your data center. There are two collection methods. The Agentless Discovery Connector is a virtual appliance deployed in VMware vCenter that gathers configuration and performance data of VMs without touching each guest. The Discovery Agent is installed on each physical or virtual server, whether on VMware, other hypervisors or bare metal, and collects richer data, including running processes and network connections that reveal dependencies between servers.\n\nThe data is stored in the Application Discovery Service and shown in AWS Migration Hub, where you can group servers into applications. You can export it as CSV to size and cost target EC2 instances, and a common use is building a business case and a right-sized target. The dependency information is especially valuable because moving a server without the systems it talks to causes outages.\n\nIn the migration toolchain, Application Discovery Service finds and assesses, Migration Hub tracks progress, and migration tools such as Application Migration Service and Database Migration Service do the actual moving.",
    taglishExplanation:
      "Bago maglipat ng servers sa AWS, kailangan mong malaman kung ano ang meron ka: ilang server, gaano kalaki ang gamit nila, at sino ang nakikipag-usap kanino. Kinokolekta ito ng Application Discovery Service. May dalawang paraan: ang Agentless Discovery Connector na virtual appliance sa VMware vCenter, at ang Discovery Agent na ini-install sa bawat server at nakakakuha ng mas detalyadong data tulad ng processes at network connections para sa dependencies. Makikita ang data sa Migration Hub at puwede ring i-export bilang CSV para i-size ang EC2. Ang paglipat mismo ay gawa ng Application Migration Service at DMS.",
    analogy:
      "A building survey before a house move: counting the furniture, measuring the rooms, and noting which appliances are plugged into which sockets, so nothing is left behind or broken.",
    whyItExists:
      "Undocumented dependencies are the main reason migrations fail. Facts about servers and traffic make migration plans and cost estimates reliable.",
    flow: "Connector or agents collect data -> Application Discovery Service -> Migration Hub groups into applications -> export for sizing and TCO -> migrate with MGN / DMS",
    withoutIt: [
      "Migration planning would rely on outdated spreadsheets",
      "Hidden server dependencies would cause outages after cut-over",
      "Instances would be over- or under-sized in AWS",
    ],
    bestUseCases: [
      "Inventorying a large data center before migration",
      "Mapping network dependencies between servers",
      "Right-sizing target EC2 instances from observed utilisation",
    ],
    poorUseCases: [
      "Actually replicating servers to AWS (use Application Migration Service)",
      "Migrating databases (use DMS)",
      "Continuous monitoring of AWS workloads (use CloudWatch)",
    ],
    alternatives: [
      { need: "Replicate and cut over servers", choose: "AWS Application Migration Service" },
      { need: "Track migration status centrally", choose: "AWS Migration Hub" },
      { need: "Migrate databases", choose: "AWS Database Migration Service" },
      { need: "Right-size running AWS workloads", choose: "AWS Compute Optimizer" },
    ],
    keyFeatures: [
      "Agentless Discovery Connector for VMware vCenter",
      "Discovery Agent for servers with process and network dependency data",
      "Data in Migration Hub with application grouping",
      "CSV export for sizing and TCO",
      "No additional charge for the discovery service itself",
    ],
    availability: "A managed service. Data collection depends on connectivity from the data center to AWS.",
    security: "Agents and connectors send data over encrypted channels, and IAM controls access. Review what data is collected from sensitive servers.",
    pricingLogic: "Application Discovery Service itself is free. You pay for any storage or AWS services you use with its data.",
    examKeywords: ["inventory on-premises servers", "server dependencies", "utilisation data", "agentless", "plan migration"],
    examTraps: [
      "Discovery finds and assesses. It does not move servers. That is Application Migration Service.",
      "The agentless connector works for VMware only. Other environments need the agent.",
    ],
    architectureDiagram: `On premises:  [VMware vCenter] <-- Agentless Connector
              [Servers + Discovery Agent: processes, connections]
                         |
              [Application Discovery Service] --> [Migration Hub: applications] --> CSV / TCO
                                                         |
                                            migrate with MGN and DMS`,
    architectureCaption: "Discovery first, then migrate.",
    mentorTip: "Discover (ADS), track (Migration Hub), move (MGN for servers, DMS for databases). Learn the sequence.",
    questionIds: ["q-aws-application-discovery-service-1", "q-aws-application-discovery-service-2", "q-aws-application-discovery-service-3"],
  },
  {
    id: "aws-migration-hub",
    moduleId: "phase-11-migration",
    category: "Migration and Transfer",
    title: "AWS Migration Hub and Migration Strategies",
    shortName: "Migration Hub",
    tier: 2,
    domains: [4, 2],
    examImportance: "medium",
    oneLiner:
      "Migration Hub is the single place to track a migration across tools, and the migration strategies (the Rs) decide how each application should move.",
    englishExplanation:
      "AWS Migration Hub gives one view of a migration that uses several tools. It receives discovery data from Application Discovery Service and status from migration tools such as Application Migration Service and Database Migration Service. You group servers into applications and watch each application move through discovery, assessment, migration and completion. You choose a home Region where the data is stored. Migration Hub itself has no charge.\n\nChoosing how to migrate each workload is as important as tracking it. The common strategies are often called the Rs. Rehost, also called lift and shift, moves servers as they are, for example with Application Migration Service, and is fastest. Replatform makes a small optimisation, such as moving a database to RDS. Refactor or re-architect redesigns the application to be cloud native, such as moving to serverless or microservices, and gives the most benefit for the most effort. Repurchase replaces the application with a SaaS product. Retain keeps it on premises for now. Retire switches it off because it is no longer needed. Relocate moves workloads such as VMware to VMware Cloud on AWS with minimal change.\n\nOn the exam, match the strategy to the constraint: fastest with no code changes is rehost, reduce database administration with little change is replatform, no longer used is retire, and a commercial application replaced by SaaS is repurchase.",
    taglishExplanation:
      "Ang Migration Hub ay iisang view ng migration na gumagamit ng maraming tool. Tumatanggap ito ng discovery data mula sa Application Discovery Service at status mula sa Application Migration Service at DMS. Ipapangkat mo ang servers sa applications at susubaybayan ang progreso. Libre ang Migration Hub. Mahalaga rin ang migration strategies: Rehost (lift and shift) ang pinakamabilis, Replatform ay maliit na optimization tulad ng database papuntang RDS, Refactor ay muling pagdidisenyo para maging cloud native, Repurchase ay palitan ng SaaS, Retain ay iwanan muna sa on-premises, Retire ay patayin, at Relocate ay ilipat nang halos walang pagbabago, tulad ng VMware papuntang VMware Cloud on AWS.",
    analogy:
      "A project dashboard for a house move that shows each room's status, plus a decision guide for each item: take it as is (rehost), refurbish slightly (replatform), rebuild (refactor), buy new (repurchase), leave it behind for now (retain), or throw it out (retire).",
    whyItExists:
      "Large migrations involve many tools, teams and applications. Without a central view and a clear strategy per workload, progress and cost are hard to control.",
    flow: "Discover (ADS) -> group into applications (Migration Hub) -> pick strategy per application -> migrate (MGN, DMS, others) -> track status in Migration Hub",
    withoutIt: [
      "Status would be scattered across spreadsheets and tool consoles",
      "Teams would apply one strategy to every workload regardless of fit",
    ],
    bestUseCases: [
      "Tracking a multi-application migration across several tools",
      "Rehost for fastest migration of servers with no code changes",
      "Replatform to managed databases for reduced operations",
      "Retire to eliminate unused workloads before moving anything",
    ],
    poorUseCases: [
      "Migration Hub as the tool that moves data (it tracks, other services migrate)",
      "Refactoring everything when a deadline demands rehost",
    ],
    alternatives: [
      { need: "Replicate and cut over servers", choose: "AWS Application Migration Service" },
      { need: "Move databases with minimal downtime", choose: "AWS Database Migration Service" },
      { need: "Run VMware workloads unchanged", choose: "VMware Cloud on AWS" },
      { need: "Inventory servers first", choose: "AWS Application Discovery Service" },
    ],
    keyFeatures: [
      "Central tracking across migration tools",
      "Group servers into applications",
      "Home Region for storing migration data",
      "No additional charge",
      "Strategies: rehost, replatform, refactor, repurchase, retain, retire, relocate",
    ],
    availability: "A managed service. It tracks status and does not affect the availability of migrated workloads.",
    security: "Use IAM to control who can view or change migration data, and keep the home Region consistent for compliance.",
    pricingLogic: "Migration Hub is free. You pay for the migration tools and AWS resources used.",
    examKeywords: ["track migration progress", "lift and shift", "rehost", "replatform", "refactor", "retire", "repurchase"],
    examTraps: [
      "Migration Hub tracks. It does not perform the migration.",
      "Lift and shift is rehost. Moving a database to RDS with no redesign is replatform.",
      "Retire is the cheapest migration. Do not migrate applications nobody uses.",
    ],
    architectureDiagram: `[Application Discovery Service] --\\
[Application Migration Service] ---+--> [Migration Hub: applications and status]
[Database Migration Service] -----/
Strategy per app: rehost | replatform | refactor | repurchase | retain | retire | relocate`,
    architectureCaption: "One tracking view above many migration tools.",
    mentorTip: "Read the constraint: fastest means rehost, less admin means replatform, best long-term benefit means refactor, unused means retire.",
    questionIds: ["q-aws-migration-hub-1", "q-aws-migration-hub-2", "q-aws-migration-hub-3"],
  },
  {
    id: "aws-audit-manager",
    moduleId: "phase-8-security",
    category: "Security, Identity, and Compliance",
    title: "AWS Audit Manager",
    shortName: "Audit Manager",
    tier: 2,
    domains: [1],
    examImportance: "medium",
    oneLiner:
      "Audit Manager continuously collects evidence from your AWS usage and maps it to compliance frameworks so audits need less manual work.",
    englishExplanation:
      "Preparing for an audit usually means gathering screenshots, logs and configuration records by hand. AWS Audit Manager automates the evidence collection. You choose a prebuilt framework, such as PCI DSS, HIPAA, SOC 2, GDPR, NIST 800-53 or CIS, or build a custom one from controls. You create an assessment scoped to your accounts and services, and Audit Manager continuously collects evidence from sources such as AWS CloudTrail, AWS Config, AWS Security Hub and API calls, and tags it to the relevant controls. You can add manual evidence for controls that cannot be automated, delegate control reviews to the right people, and generate an assessment report stored in S3 for your auditors.\n\nIt is important to know what it is not. Audit Manager does not make you compliant and does not fix findings. It gathers and organises evidence. AWS Config evaluates whether resources match rules, Security Hub aggregates security findings and checks, CloudTrail records API activity, and AWS Artifact gives you AWS's own compliance reports and agreements. Audit Manager draws on these to produce audit-ready evidence.\n\nExam wording to look for is continuous auditing, automate evidence collection, map to a compliance framework, and audit-ready reports.",
    taglishExplanation:
      "Madalas, ang paghahanda sa audit ay manu-manong pagkuha ng screenshot, log, at configuration records. Awtomatiko itong ginagawa ng Audit Manager. Pipili ka ng prebuilt framework tulad ng PCI DSS, HIPAA, SOC 2, GDPR, o NIST 800-53, gagawa ng assessment, at tuloy-tuloy na kokolektahin ang evidence mula sa CloudTrail, Config, Security Hub, at API calls. Puwede kang magdagdag ng manual evidence at gumawa ng assessment report sa S3 para sa auditors. Hindi nito ginagawang compliant ang account mo at hindi rin nito inaayos ang findings. Config ang nag-e-evaluate ng resources, at Artifact ang nagbibigay ng compliance reports ng AWS.",
    analogy:
      "A diligent clerk who, throughout the year, files every relevant receipt and record into the correct audit folder, so on audit day you hand the auditor an organised binder instead of searching through drawers.",
    whyItExists:
      "Compliance audits are recurring and evidence collection is time-consuming and error-prone. Continuous, automated collection lowers effort and improves accuracy.",
    flow: "Choose framework -> create assessment (scope accounts and services) -> evidence collected from CloudTrail, Config, Security Hub, API calls -> review and add manual evidence -> assessment report to S3",
    withoutIt: [
      "Teams would gather audit evidence manually before each audit",
      "Evidence would be inconsistent and hard to map to controls",
    ],
    bestUseCases: [
      "Preparing for PCI DSS, HIPAA, SOC 2 or GDPR audits",
      "Continuous compliance evidence across many accounts with Organizations",
      "Delegating control reviews to compliance and security teams",
    ],
    poorUseCases: [
      "Remediating non-compliant resources (use Config remediation or Systems Manager)",
      "Real-time threat detection (use GuardDuty)",
      "Downloading AWS's own compliance reports (use AWS Artifact)",
    ],
    alternatives: [
      { need: "Evaluate resource configuration against rules", choose: "AWS Config" },
      { need: "Aggregate security findings and standards checks", choose: "AWS Security Hub" },
      { need: "AWS's own compliance reports and agreements", choose: "AWS Artifact" },
      { need: "Record API activity", choose: "AWS CloudTrail" },
    ],
    keyFeatures: [
      "Prebuilt frameworks: PCI DSS, HIPAA, SOC 2, GDPR, NIST, CIS and more",
      "Custom frameworks and controls",
      "Automated evidence from CloudTrail, Config, Security Hub and API calls",
      "Manual evidence upload and control delegation",
      "Assessment reports delivered to S3",
      "Multi-account support through Organizations",
    ],
    availability: "A managed Regional service. It collects evidence and does not affect workload availability.",
    security: "Evidence can be sensitive, so encrypt the report bucket, restrict access with IAM and use KMS for assessment data.",
    pricingLogic: "You pay per evidence item collected, with a tiered rate, plus storage in S3 for reports.",
    examKeywords: ["continuous audit", "automate evidence collection", "compliance framework", "audit-ready report", "PCI DSS", "HIPAA"],
    examTraps: [
      "Audit Manager collects evidence. It does not remediate or certify compliance.",
      "AWS Artifact provides AWS's own compliance documents, not your account's evidence.",
      "Config evaluates resource rules, while Audit Manager organises evidence for audits.",
    ],
    architectureDiagram: `[CloudTrail] [Config] [Security Hub] [API calls]
        \\        |          |         /
         +----> [Audit Manager assessment: framework controls] --> evidence folders
                            |
                  assessment report --> S3 --> auditors`,
    architectureCaption: "Automated evidence mapped to framework controls.",
    mentorTip: "Four sentence completions: Config checks rules, Security Hub aggregates findings, Artifact gives AWS reports, Audit Manager assembles audit evidence.",
    questionIds: ["q-aws-audit-manager-1", "q-aws-audit-manager-2", "q-aws-audit-manager-3"],
  },
  {
    id: "aws-app2container",
    moduleId: "phase-7-containers",
    category: "Containers",
    title: "Migrating Applications into Containers (App2Container)",
    shortName: "App2Container",
    tier: 2,
    domains: [2, 3],
    examImportance: "medium",
    oneLiner:
      "App2Container analyses a running Java or .NET application and packages it into a container image with deployment artifacts, without rewriting the code.",
    englishExplanation:
      "The exam guide expects you to know how to migrate applications into containers and when to use containers. AWS App2Container is a command-line tool that takes an existing Java or ASP.NET application running on a server, in a VM or on EC2, inspects it to find its processes and dependencies, and creates a container image from it. It then generates the artifacts to run it on Amazon ECS or Amazon EKS, including task or Kubernetes definitions, CloudFormation templates and a CI/CD pipeline, and pushes the image to Amazon ECR. No source code changes are required, which makes it a replatform step rather than a rewrite.\n\nThe broader decision is when containers fit. Containers suit applications that you want to deploy consistently, scale horizontally and pack densely, and they are a natural stepping stone from servers toward microservices. They are less suited to applications that rely on state kept on the local disk, need a GUI, or require kernel-level access. Stateful data should move to managed storage such as EFS, RDS or S3 so containers stay replaceable.\n\nThe usual path is containerise the existing app with App2Container, push to ECR, run on ECS or EKS with Fargate or EC2, put an ALB in front, and later break the monolith into services. If the application cannot be changed at all and runs on VMware, VMware Cloud on AWS or Application Migration Service rehosting may be better. AWS stopped accepting new App2Container customers on November 7, 2025 and points to AWS Transform for .NET modernization, so treat it as a concept to recognise for the exam rather than a tool to start with.",
    taglishExplanation:
      "Inaasahan ng exam guide na alam mo kung paano maglipat ng application sa containers at kailan gagamit ng containers. Ang App2Container ay command-line tool na sumusuri sa tumatakbong Java o ASP.NET application, hinahanap ang processes at dependencies nito, at gumagawa ng container image nang hindi binabago ang code. Gumagawa rin ito ng artifacts para sa ECS o EKS, tulad ng task definition, CloudFormation template, at CI/CD pipeline, at ipinu-push ang image sa ECR. Bagay ang containers sa app na gusto mong i-deploy nang pare-pareho at i-scale pahalang. Ilipat ang state sa EFS, RDS, o S3 para madaling mapalitan ang container.",
    analogy:
      "Packing a fully furnished room into a standard shipping container exactly as it is, labelled and ready for any cargo ship, rather than rebuilding the room's furniture to fit.",
    whyItExists:
      "Many organisations have valuable Java and .NET applications that they want to modernise gradually. Containerising without code changes is a low-risk first step toward microservices and managed orchestration.",
    flow: "Existing Java/.NET app -> App2Container analyze -> containerize -> image to ECR -> deploy to ECS or EKS (Fargate or EC2) -> ALB in front",
    withoutIt: [
      "Teams would write Dockerfiles and deployment configuration by hand for each legacy app",
      "Dependencies could be missed and cause failures after migration",
    ],
    bestUseCases: [
      "Containerising existing Java or ASP.NET applications without code changes",
      "A first step toward microservices and horizontal scaling",
      "Consistent deployment through ECR and ECS or EKS",
    ],
    poorUseCases: [
      "Applications that need a GUI or special kernel access",
      "Stateful apps that keep critical data on local disk without moving it to managed storage",
      "Non-Java, non-.NET applications for which the tool has no support",
    ],
    alternatives: [
      { need: "Move servers as-is without containers", choose: "AWS Application Migration Service" },
      { need: "Run VMware workloads unchanged", choose: "VMware Cloud on AWS" },
      { need: "Simple web app deployment without containers", choose: "AWS Elastic Beanstalk" },
      { need: "Run containers without servers", choose: "AWS Fargate" },
    ],
    keyFeatures: [
      "Analyses running Java and ASP.NET applications",
      "Creates container images without code changes",
      "Generates ECS or EKS deployment artifacts and CI/CD pipeline",
      "Pushes images to Amazon ECR",
      "Works for apps on-premises, in VMs or on EC2",
    ],
    availability: "Resilience comes from the target platform: multiple tasks across AZs behind a load balancer on ECS or EKS.",
    security: "Scan images in ECR, run tasks with least-privilege task roles and keep secrets in Secrets Manager rather than in images.",
    pricingLogic: "App2Container itself had no charge. You pay for ECR storage and the ECS, EKS and compute resources used.",
    examKeywords: ["containerize existing application", "no code changes", "Java and .NET", "migrate to ECS or EKS", "modernise gradually"],
    examTraps: [
      "Containerising with App2Container is replatforming. A full rewrite is refactoring.",
      "State should move out of the container. Keeping data on local container disk is not resilient.",
    ],
    architectureDiagram: `[Java / .NET app on server or EC2]
        | App2Container: analyze + containerize
        v
   [ECR image] --> [ECS / EKS on Fargate] <-- [ALB]
   state moved to EFS / RDS / S3 (containers stay replaceable)`,
    architectureCaption: "Package first, rearchitect later.",
    mentorTip: "No code changes plus Java or .NET plus containers equals App2Container. Servers as-is without containers equals Application Migration Service.",
    questionIds: ["q-aws-app2container-1", "q-aws-app2container-2", "q-aws-app2container-3"],
  },
];
