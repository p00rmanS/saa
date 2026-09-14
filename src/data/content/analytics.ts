import type { Lesson } from "@/lib/types";

export const analyticsLessons: Lesson[] = [
  {
    id: "amazon-athena",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "Amazon Athena",
    shortName: "Athena",
    tier: 1,
    domains: [3],
    examImportance: "high",
    oneLiner:
      "Amazon Athena is a serverless query service that lets you run standard SQL directly against data sitting in Amazon S3.",
    englishExplanation:
      "Amazon Athena lets you point SQL queries straight at files already sitting in an S3 bucket — CSV, JSON, Parquet, ORC, Avro, and more — without loading that data into a database first. Under the hood Athena uses Presto/Trino as its query engine, but you never provision, patch, or scale that engine yourself; AWS runs it for you and spins up the compute only for the duration of your query. This is what \"serverless\" means here: there is no cluster to size, no server to keep running when nobody is querying.\n\nAthena works hand-in-hand with the AWS Glue Data Catalog, which stores the schema (table definitions, column names/types, partition info) that tells Athena how to interpret the raw files in S3. You define a table once against a Glue Catalog, and every query after that is regular ANSI SQL — SELECT, JOIN, GROUP BY, and so on — running against objects that are still just files in S3, not a copy of the data anywhere else.\n\nBecause Athena reads directly from S3, query performance and cost are heavily influenced by how the data is stored: partitioning your S3 data (e.g. by date) and using a columnar format like Parquet dramatically reduces how many bytes Athena has to scan, which matters because that scanned-data volume is exactly what you are billed for.",
    taglishExplanation:
      "Si Athena parang may nag-run ka lang ng SQL query, pero yung data mismo naka-upload lang sa S3 bucket — hindi mo na kailangan mag-load ng data papunta sa isang database. Wala kang server na i-manage o cluster na i-provision; bahala na si AWS diyan, tapos babayaran mo lang base sa dami ng data na na-\"scan\" niya para sagutin yung query mo. Kaya kung malaki-laki yung CSV files mo, mas mura at mas mabilis kung i-convert mo muna sila sa Parquet at i-partition by date — mas kaunti lang ang babasahin ni Athena.",
    analogy:
      "Athena is like hiring a researcher who can walk into a giant, already-organized warehouse (your S3 bucket) and answer any question you ask about the boxes on the shelves, without you having to first move all the boxes into a new filing cabinet. You pay the researcher based on how many boxes they had to open to find your answer — so a warehouse that is well-labeled and sorted (partitioned, columnar format) costs you less per question.",
    whyItExists:
      "Before services like Athena, answering an ad-hoc question about data sitting in S3 usually meant standing up an ETL pipeline and a data warehouse or database cluster just to run a handful of queries. Athena removes that entire step for exploratory or occasional analysis — you query the data where it already lives, and you only pay when you actually run a query.",
    flow: "Raw files in S3 -> AWS Glue Data Catalog (table/schema definition) -> Athena SQL query -> Results (also stored back to S3)",
    withoutIt: [
      "You would need to load S3 data into a database or data warehouse before you could run SQL against it",
      "You would need to provision and manage query infrastructure even for occasional, one-off analysis",
      "Ad-hoc questions from analysts would take much longer to answer because of the setup involved",
    ],
    bestUseCases: [
      "Ad-hoc SQL analysis directly on data already stored in S3, such as logs or exported datasets",
      "Querying data lakes without standing up a dedicated database or warehouse cluster",
      "Analyzing AWS service logs (e.g. S3 access logs, CloudTrail logs, VPC Flow Logs) stored in S3",
      "One-off or infrequent reporting where running a full-time cluster would be wasteful",
      "Feeding query results into Amazon QuickSight for visualization",
    ],
    poorUseCases: [
      "High-frequency, low-latency transactional queries — Athena is built for analytical, not OLTP, workloads",
      "Data that changes constantly row-by-row (Athena is best suited to relatively static or append-only files)",
      "Very complex, long-running data processing pipelines that need fine-grained cluster control (consider EMR instead)",
    ],
    alternatives: [
      { need: "Managed cluster-based big data processing (Spark/Hadoop) with full control", choose: "Amazon EMR" },
      { need: "Build and orchestrate ETL jobs that transform and load data", choose: "AWS Glue" },
      { need: "Traditional data warehouse with stored, loaded data and complex joins at scale", choose: "Amazon Redshift" },
      { need: "Real-time streaming ingestion rather than querying data already at rest", choose: "Amazon Kinesis" },
    ],
    keyFeatures: [
      "Serverless — no infrastructure to provision, patch, or scale",
      "Pay-per-query pricing based on the amount of data scanned",
      "Standard ANSI SQL powered by the Presto/Trino engine",
      "Integrates natively with the AWS Glue Data Catalog for schema/table metadata",
      "Supports common open file formats: CSV, JSON, Parquet, ORC, Avro",
      "Query results are written back out to an S3 location you specify",
    ],
    availability:
      "Athena is a fully managed, regional service — AWS handles the availability and scaling of the underlying query engine across the region. Because Athena does not store your data (it reads S3 in place), your actual data durability depends on S3's own durability, not on Athena.",
    security:
      "Access to run Athena queries and to the underlying S3 data is controlled through IAM policies and, at a finer grain, through AWS Lake Formation permissions on the Glue Data Catalog. Query results and any temporary data are written to S3 and can be encrypted with SSE-S3 or SSE-KMS. Because Athena queries data in place, securing the underlying S3 bucket and catalog is what actually protects the data.",
    pricingLogic:
      "You are billed per query based on the amount of data scanned from S3, not on time or provisioned capacity. This means storing data efficiently — compressed, columnar formats like Parquet, and partitioning by commonly filtered columns — directly lowers your bill because Athena has to scan fewer bytes to answer the same question.",
    examKeywords: [
      "serverless SQL over S3",
      "pay per query scanned",
      "no infrastructure to manage",
      "ad-hoc analysis",
      "Glue Data Catalog",
      "Presto engine",
    ],
    examTraps: [
      "Athena does not store or load data — it queries files where they already sit in S3.",
      "Cost is based on data scanned, not on query duration — so format/partitioning choices directly affect price.",
      "Athena is for interactive/ad-hoc SQL, not for building complex multi-step ETL pipelines (that is Glue's job).",
    ],
    architectureDiagram:
      "S3 (raw data files)\n   |\nAWS Glue Data Catalog (schema/tables)\n   |\nAmazon Athena (SQL query)\n   |\nQuery results -> S3 output location -> QuickSight / analyst",
    architectureCaption:
      "Athena queries files directly in S3 using schema metadata from the Glue Data Catalog, and writes results back to S3.",
    mentorTip:
      "If a scenario says \"run SQL queries directly against data in S3 without managing servers, pay only for what you query,\" that phrasing is almost always pointing at Athena.",
    questionIds: [
      "q-amazon-athena-1",
      "q-amazon-athena-2",
      "q-amazon-athena-3",
      "q-amazon-athena-4",
      "q-amazon-athena-5",
    ],
  },
  {
    id: "aws-glue",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "AWS Glue",
    shortName: "Glue",
    tier: 1,
    domains: [3],
    examImportance: "high",
    oneLiner:
      "AWS Glue is a serverless ETL (extract, transform, load) service that discovers, catalogs, and transforms data so it is ready for analytics.",
    englishExplanation:
      "AWS Glue is AWS's managed service for preparing data for analytics — the \"ETL\" (Extract, Transform, Load) step that usually has to happen before data is clean and structured enough to query or load into a warehouse. Instead of you managing servers to run these transformation jobs, Glue runs them on serverless Apache Spark (or Python shell) infrastructure that AWS provisions and tears down automatically.\n\nA central piece of Glue is the Glue Data Catalog, a persistent metadata store that holds table definitions — schema, column types, partitions, and storage location — for data sitting in S3 or other sources. Other services, most notably Athena and Redshift Spectrum, read from this same catalog, so once you catalog your data in Glue, many other AWS analytics tools can immediately understand its structure.\n\nGlue Crawlers are the piece that populates the catalog automatically: point a crawler at a data source (like an S3 path), and it inspects the files, infers the schema, and creates or updates the corresponding table definitions in the Data Catalog — so you do not have to hand-write schema definitions yourself. Glue jobs then use that catalog information to run the actual transformation logic (cleaning, reshaping, joining, converting formats) and write the results somewhere else, such as back to S3 in a query-friendly format like Parquet.",
    taglishExplanation:
      "Si Glue yung \"kusina\" na naglilinis at nag-aayos ng raw data bago mo pa siya i-serve para sa analytics. May Crawler siya na kusang mag-iinspect ng files mo sa S3 at gagawa ng schema para sa Data Catalog — hindi mo na kailangan i-type manually kung ano-ano ang columns. Tapos may Glue Jobs na naman na sila na yung gagawa ng actual na transformation, halimbawa i-convert galing CSV papuntang Parquet, o i-clean yung messy data. Serverless siya, kaya wala kang cluster na babantayan — babayaran mo lang habang tumatakbo yung job.",
    analogy:
      "Glue is like a prep kitchen crew for a restaurant: before the chef (Athena, Redshift) can cook a dish (run a query), someone has to wash, chop, and label all the raw ingredients (crawl and catalog the data), and sometimes actually transform ingredients into a usable form (the ETL job, like turning tomatoes into sauce). Glue is that crew — automated, and you only pay them while they are actually working.",
    whyItExists:
      "Raw data rarely arrives already clean, structured, and cataloged. Before Glue, teams had to build and maintain their own ETL infrastructure — servers, scheduling, schema management — just to get data into a state where analytics tools could use it. Glue automates and manages that pipeline so analytics teams can focus on the analysis, not the plumbing.",
    flow: "Data sources (S3, RDS, etc.) -> Glue Crawler (infers schema) -> Glue Data Catalog -> Glue ETL Job (transform) -> Cleaned data in S3 -> Athena / Redshift / QuickSight",
    withoutIt: [
      "You would need to hand-write and maintain schema definitions for every dataset",
      "You would need to provision and manage your own Spark/ETL cluster infrastructure",
      "Other services like Athena would have no shared, automatically updated catalog of your data's structure",
    ],
    bestUseCases: [
      "Automatically discovering and cataloging the schema of data stored in S3 or other sources",
      "Transforming raw data (e.g. CSV/JSON) into optimized, query-friendly formats like Parquet",
      "Building serverless ETL pipelines that feed a data lake or data warehouse",
      "Providing a shared metadata catalog that Athena, Redshift Spectrum, and EMR can all use",
      "Scheduled or event-driven batch data preparation jobs",
    ],
    poorUseCases: [
      "Real-time, low-latency stream processing — Glue is primarily batch-oriented (consider Kinesis/streaming ETL for that)",
      "Simple one-off queries with no transformation needed — plain Athena directly on existing data may be enough",
      "Workloads that need constant, always-on cluster control for tuning — EMR gives more direct cluster control",
    ],
    alternatives: [
      { need: "Just run SQL queries against already well-structured S3 data", choose: "Amazon Athena" },
      { need: "Full control over a big-data cluster and its configuration", choose: "Amazon EMR" },
      { need: "Real-time streaming ingestion instead of batch ETL", choose: "Amazon Kinesis" },
      { need: "Centralized fine-grained permissions across a data lake's catalog", choose: "AWS Lake Formation" },
    ],
    keyFeatures: [
      "Serverless Spark-based ETL jobs — no cluster provisioning required",
      "Glue Crawlers to automatically infer schema and populate the Data Catalog",
      "Glue Data Catalog shared across Athena, Redshift Spectrum, and EMR",
      "Visual and code-based (Python/Scala) job authoring options",
      "Job scheduling and triggers (time-based or event-based)",
      "Built-in data transformation and format conversion support",
    ],
    availability:
      "Glue is a fully managed, serverless service, so AWS handles the availability and scaling of the underlying job execution infrastructure within the region. Because Glue jobs typically read from and write to durable stores like S3, the durability of the data itself follows the durability guarantees of those underlying stores.",
    security:
      "IAM roles control what a Glue job or crawler is allowed to read and write, and IAM policies control who can create, run, or modify Glue jobs and catalog entries. AWS Lake Formation can layer more granular, table- and column-level permissions on top of the Glue Data Catalog for centralized data lake governance. Data at rest in the sources/targets (typically S3) can be encrypted with SSE-S3 or SSE-KMS.",
    pricingLogic:
      "Glue ETL jobs and crawlers are billed based on the compute resources consumed while running (measured in a Glue-specific processing unit, billed per second with a minimum), plus a separate charge for storing and accessing the Data Catalog itself. There is no charge for idle infrastructure because there is no persistent cluster to keep running.",
    examKeywords: [
      "serverless ETL",
      "Glue Data Catalog",
      "Glue Crawler",
      "schema discovery",
      "transform data lake data",
      "prepare data for analytics",
    ],
    examTraps: [
      "A Crawler discovers/updates schema in the Data Catalog — it does not transform the data itself; that is a Glue Job's role.",
      "The Glue Data Catalog is shared: Athena and Redshift Spectrum can both use tables Glue cataloged, without re-defining them.",
      "Glue is primarily a batch ETL tool — do not pick it for true real-time stream processing scenarios.",
    ],
    architectureDiagram:
      "S3 / RDS / other sources\n   |\nGlue Crawler --> Glue Data Catalog\n                     |\n              Glue ETL Job (Spark)\n                     |\n         Transformed data -> S3 (Parquet)\n                     |\n          Athena / Redshift Spectrum",
    architectureCaption:
      "A Glue Crawler populates the Data Catalog, then a Glue ETL job transforms raw data and writes it back to S3 in an analytics-friendly format.",
    mentorTip:
      "When you see \"automatically discover schema\" think Crawler; when you see \"transform/clean/convert data at scale without managing servers\" think Glue ETL job. They are two different pieces of the same service.",
    questionIds: [
      "q-aws-glue-1",
      "q-aws-glue-2",
      "q-aws-glue-3",
      "q-aws-glue-4",
      "q-aws-glue-5",
    ],
  },
  {
    id: "amazon-kinesis",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "Amazon Kinesis",
    shortName: "Kinesis",
    tier: 1,
    domains: [3],
    examImportance: "high",
    oneLiner:
      "Amazon Kinesis (Data Streams) is a service for ingesting and processing large streams of real-time data, such as clickstreams, logs, and IoT telemetry.",
    englishExplanation:
      "Amazon Kinesis Data Streams lets you continuously collect and process data the moment it is produced, instead of waiting to batch it up later. Producers — could be web servers logging clickstream events, IoT devices sending sensor readings, or applications emitting log lines — write records into a stream, and one or more consumers read those records, typically within seconds of them arriving, to do things like real-time dashboards, anomaly detection, or feeding downstream analytics.\n\nA Kinesis Data Stream is divided into shards, which are the unit of both throughput and parallelism: each shard supports a certain amount of write and read throughput, and adding shards lets you scale a stream's overall capacity. Records written to a stream are retained for a configurable window (by default a short retention period, extendable), which means consumers can re-read recent data, and multiple independent consumer applications can each process the same stream at their own pace.\n\nAt the exam level, the core idea to hold onto is: Kinesis Data Streams is for when you need to ingest and process streaming data yourself, in near real time, with your own consumer application logic (running on EC2, Lambda, or Kinesis Data Analytics) reading from the stream — as opposed to simply delivering the stream to a destination, which is what Amazon Data Firehose does instead.",
    taglishExplanation:
      "Si Kinesis Data Streams ang gagamitin mo kapag kailangan mong \"harangin\" yung data habang dumadaloy siya in real time — halimbawa clickstream sa website, sensor data mula sa IoT devices, o logs. Yung stream, hinahati siya sa shards — mas maraming shards, mas malaki ang kaya niyang throughput. Yung mga consumer application mo (puwedeng Lambda o EC2) ang bahalang bumasa at mag-process ng mga records habang bago pa lang sila. Point ni Kinesis Data Streams: ikaw mismo ang magsusulat ng logic na magpo-process ng data papasok — hindi lang basta pag-deliver sa destination, kasi yun naman trabaho ni Firehose.",
    analogy:
      "Kinesis Data Streams is like a fast-moving conveyor belt at a factory that never stops: items (data records) keep arriving continuously, and you station workers (consumer applications) along the belt to inspect, process, or route each item as it passes — rather than waiting for a full truckload to accumulate before doing anything with it.",
    whyItExists:
      "Many real-world signals — user clicks, application logs, sensor readings — lose value if you wait hours to analyze them in a batch. Kinesis exists to let applications react to data within seconds of it being generated, enabling real-time dashboards, alerting, and streaming analytics instead of only next-day batch reports.",
    flow: "Producers (web/app servers, IoT devices) -> Kinesis Data Stream (shards) -> Consumers (Lambda, EC2, Kinesis Data Analytics) -> Real-time dashboards / downstream storage",
    withoutIt: [
      "Data would need to be collected and processed in batches, delaying insights by hours instead of seconds",
      "You would need to build your own reliable, scalable ingestion pipeline for streaming data",
      "Multiple applications could not easily and independently consume the same real-time data feed",
    ],
    bestUseCases: [
      "Real-time clickstream analysis on a website or mobile app",
      "IoT sensor data ingestion that needs near real-time processing",
      "Real-time log and metric aggregation for monitoring/alerting",
      "Feeding real-time dashboards or fraud-detection systems",
      "Scenarios needing multiple independent consumers reading the same stream",
    ],
    poorUseCases: [
      "Simple delivery of streaming data straight to a destination with no custom processing — Firehose is simpler",
      "Traditional batch ETL of data that is already sitting at rest",
      "Very low, infrequent data volumes where a stream's shard-based capacity model adds unnecessary complexity",
    ],
    alternatives: [
      { need: "Fully managed delivery of streaming data straight to S3/Redshift/OpenSearch, no consumer code", choose: "Amazon Data Firehose" },
      { need: "A team specifically needs Apache Kafka API compatibility", choose: "Amazon MSK" },
      { need: "Run SQL-style analytics directly on a Kinesis stream", choose: "Amazon Kinesis Data Analytics" },
      { need: "Batch processing of data already stored, not live streaming ingestion", choose: "AWS Glue / Amazon EMR" },
    ],
    keyFeatures: [
      "Shard-based architecture controlling throughput and parallel read/write capacity",
      "Configurable data retention window, allowing replay of recent records",
      "Multiple independent consumers can read the same stream concurrently",
      "Integrates with Lambda, Kinesis Data Analytics, and custom consumer apps (KCL)",
      "On-demand or provisioned capacity modes for shard scaling",
    ],
    availability:
      "Kinesis Data Streams replicates data synchronously across multiple Availability Zones within a region, so the service is designed to keep running and retain data even if a single AZ has an issue. Consumers should be built to handle re-processing/idempotency since, like most streaming systems, at-least-once delivery is the practical model to design around.",
    security:
      "IAM policies control which producers can write and which consumers can read from a stream. Data can be encrypted at rest using KMS and in transit via HTTPS endpoints. VPC endpoints can keep traffic between your VPC and Kinesis off the public internet.",
    pricingLogic:
      "In provisioned mode, you pay per shard-hour plus per-million-records charges for data ingested/retrieved; on-demand mode bills based on the data volume ingested and retrieved without you managing shard counts yourself. Extended data retention beyond the default window carries an additional cost.",
    examKeywords: [
      "real-time streaming ingestion",
      "shards",
      "producers and consumers",
      "clickstream",
      "IoT telemetry",
      "near real-time processing",
    ],
    examTraps: [
      "Kinesis Data Streams needs you to write/run consumer logic; it does not automatically deliver data to a destination like Firehose does.",
      "Shards are the throughput/parallelism unit — a scenario needing more read/write capacity usually points to adding shards.",
      "Do not confuse Kinesis Data Streams (custom real-time processing) with Kinesis/Amazon Data Firehose (managed delivery to a destination).",
    ],
    architectureDiagram:
      "Producers (web/app/IoT)\n   |\nKinesis Data Stream\n  (Shard 1 | Shard 2 | Shard 3)\n   |            |            |\nConsumer A   Consumer B   Consumer C\n(Lambda)     (EC2 app)    (Kinesis Data Analytics)",
    architectureCaption:
      "Multiple independent consumers can each read the same Kinesis Data Stream, at their own pace, within the retention window.",
    mentorTip:
      "If the scenario says the company wants to write custom logic to process a stream in real time (not just move it somewhere), that is Kinesis Data Streams. If it just wants the stream delivered to S3/Redshift/OpenSearch with no custom consumer code, that is Firehose.",
    questionIds: [
      "q-amazon-kinesis-1",
      "q-amazon-kinesis-2",
      "q-amazon-kinesis-3",
      "q-amazon-kinesis-4",
      "q-amazon-kinesis-5",
    ],
  },
  {
    id: "amazon-data-firehose",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "Amazon Data Firehose",
    shortName: "Firehose",
    tier: 2,
    domains: [3],
    examImportance: "high",
    oneLiner:
      "Amazon Data Firehose is a fully managed service that captures streaming data and automatically delivers it to destinations like S3, Redshift, or OpenSearch, with no consumer code required.",
    englishExplanation:
      "Amazon Data Firehose (formerly \"Kinesis Data Firehose\") solves a narrower problem than Kinesis Data Streams: instead of giving you a stream that your own applications read from, Firehose takes incoming streaming data and automatically delivers it to a destination you configure — commonly Amazon S3, Amazon Redshift, Amazon OpenSearch Service, or an HTTP endpoint/third-party service. You do not write or run any consumer application; Firehose itself is the consumer, and it handles buffering, batching, optional transformation (via an AWS Lambda function you can attach), and delivery.\n\nBecause Firehose is fully managed end-to-end, there is no concept of shards to provision — it scales automatically to match the incoming data rate. This is the key exam distinction from Kinesis Data Streams: choose Data Streams when you need custom, low-latency, code-driven processing of the stream by your own consumers; choose Firehose when you just need the streaming data reliably landed in a destination like S3 or Redshift with minimal setup.",
    taglishExplanation:
      "Si Firehose parang \"auto-pilot\" na version ng streaming delivery — hindi mo na kailangan gumawa ng sarili mong consumer application. Basta i-configure mo lang kung saan mo gustong dumating yung data (S3, Redshift, OpenSearch), tapos si Firehose na ang bahalang mag-buffer, mag-batch, at mag-deliver nun. Kung gusto mo lang na \"dumating lang yung stream sa destination,\" Firehose. Kung gusto mong may sarili kang code na magpo-process real time habang dumadaan yung data, Kinesis Data Streams naman ang tama.",
    analogy:
      "If Kinesis Data Streams is a conveyor belt where you station your own workers to inspect items, Firehose is a conveyor belt with an automatic sorting machine already built in at the end — you just tell it which bin (S3, Redshift, OpenSearch) each type of item should land in, and it handles getting them there.",
    whyItExists:
      "Many streaming use cases do not need custom real-time processing logic at all — they just need the data to reliably and automatically arrive in a data lake or analytics destination. Building and operating your own consumer application purely to move data from A to B is unnecessary operational overhead, so Firehose exists to remove that consumer entirely.",
    flow: "Producers -> Amazon Data Firehose (buffer/optional Lambda transform) -> Destination (S3 / Redshift / OpenSearch / HTTP endpoint)",
    withoutIt: [
      "You would need to write and operate your own consumer application just to move streaming data to a destination",
      "You would need to manage buffering, batching, and retry logic for delivery yourself",
      "Scaling that custom delivery consumer would become your responsibility",
    ],
    bestUseCases: [
      "Streaming log or clickstream data straight into S3 for later analysis with Athena",
      "Loading streaming data continuously into Amazon Redshift for a data warehouse",
      "Streaming data into Amazon OpenSearch Service for near real-time search/log analytics",
      "Lightweight, near real-time ETL via an attached Lambda transform during delivery",
    ],
    poorUseCases: [
      "Scenarios that need custom, low-latency application logic reading the raw stream (use Kinesis Data Streams)",
      "Cases requiring multiple independent consumers to read the exact same raw stream at different paces",
    ],
    alternatives: [
      { need: "Custom consumer application logic reading a stream in near real time", choose: "Amazon Kinesis Data Streams" },
      { need: "Apache Kafka API compatibility for streaming", choose: "Amazon MSK" },
      { need: "Run interactive SQL over data once it lands in S3", choose: "Amazon Athena" },
    ],
    keyFeatures: [
      "Fully managed, no shard provisioning or consumer application needed",
      "Automatic delivery to S3, Redshift, OpenSearch Service, and HTTP/third-party endpoints",
      "Optional data transformation via an attached AWS Lambda function",
      "Automatic buffering, batching, compression, and retry on delivery",
      "Scales automatically with incoming data volume",
    ],
    availability:
      "Firehose is a fully managed regional service; AWS handles scaling and availability of the delivery pipeline itself. It buffers data (by size or time) before delivering, and retries delivery to the destination on failure, with options to route failed records to an S3 error bucket.",
    security:
      "IAM roles and policies control which sources can put records into a Firehose delivery stream and what the delivery stream itself is permitted to write to in the destination. Data can be encrypted in transit and at rest, including within the destination service (e.g. S3 SSE-KMS).",
    pricingLogic:
      "You are billed based on the volume of data ingested by Firehose (per GB), plus any costs from optional features like data format conversion or attached Lambda transformation invocations, plus normal costs of writing to the destination service itself.",
    examKeywords: [
      "managed delivery of streaming data",
      "no consumer application needed",
      "load streaming data into S3/Redshift/OpenSearch",
      "near real-time ETL",
      "fully managed",
    ],
    examTraps: [
      "Firehose delivers to a destination automatically — it is not something your own application \"reads from\" like a Kinesis Data Stream.",
      "Firehose has no shards to manage; Kinesis Data Streams does. If a question mentions shards, it means Data Streams, not Firehose.",
      "\"Near real-time\" delivery (seconds, due to buffering) is expected with Firehose — it is not the same as the lower-latency custom processing you get from directly consuming a Data Stream.",
    ],
    architectureDiagram:
      "Producers (apps/IoT/logs)\n   |\nAmazon Data Firehose\n   | (optional Lambda transform)\n   v\nS3  /  Redshift  /  OpenSearch Service",
    architectureCaption:
      "Firehose buffers and automatically delivers streaming data to a chosen destination, with no consumer application to build.",
    mentorTip:
      "Whenever a scenario mentions \"automatically load streaming data into S3/Redshift without writing consumer code,\" pick Firehose over Kinesis Data Streams.",
    questionIds: [
      "q-amazon-data-firehose-1",
      "q-amazon-data-firehose-2",
      "q-amazon-data-firehose-3",
    ],
  },
  {
    id: "amazon-emr",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "Amazon EMR",
    shortName: "EMR",
    tier: 2,
    domains: [3],
    examImportance: "medium",
    oneLiner:
      "Amazon EMR is a managed cluster platform for running big-data frameworks like Apache Spark and Hadoop at large scale.",
    englishExplanation:
      "Amazon EMR (Elastic MapReduce) provisions and manages clusters of EC2 instances pre-configured with big-data frameworks — Apache Spark, Hadoop, Hive, Presto, HBase, and others. It targets teams that need real cluster-level control: choosing instance types, tuning cluster configuration, running long or complex distributed processing jobs, or using big-data tools that go beyond what a purely serverless option like Athena or Glue offers.\n\nCompared to Athena (serverless SQL over S3) and Glue (serverless ETL jobs), EMR trades some operational simplicity for more control and flexibility — you can resize clusters, choose Spot Instances for cost savings on transient nodes, and run more varied and complex big-data workloads than a single SQL query or predefined ETL job type. At the SAA exam level, the key recognition point is: when a scenario needs a managed but configurable Hadoop/Spark cluster for large-scale data processing, EMR is the answer; when it just needs simple SQL queries or straightforward ETL with minimal management, Athena or Glue is the better fit.",
    taglishExplanation:
      "Si EMR ang gamitin mo kapag kailangan mo talaga ng cluster — parang binibigyan ka ni AWS ng grupo ng mga EC2 instances na naka-configure na may Spark, Hadoop, Hive, atbp. Mas may control ka dito kumpara kay Athena o Glue — pwede mong piliin instance type, i-resize ang cluster, gumamit ng Spot Instances para mas mura. Pero kasama ng control, may extra management din. Kung simpleng SQL query lang o basic ETL ang kailangan, mas madaling pumili ng Athena/Glue; kung malaking distributed processing job na kailangan ng cluster-level tuning, EMR ang tama.",
    analogy:
      "If Athena and Glue are like ordering food delivery — you just get the result without touching the kitchen — EMR is like renting a fully equipped commercial kitchen with a crew: more control over exactly how the cooking happens, but you are also more involved in running it.",
    whyItExists:
      "Some big-data workloads need the flexibility of a real distributed cluster — custom frameworks, fine-grained tuning, or processing patterns that do not fit a predefined serverless job. EMR exists so teams get that Hadoop/Spark ecosystem power without having to manually build and patch the underlying cluster infrastructure themselves.",
    flow: "Data in S3 / HDFS -> EMR cluster (Spark/Hadoop/Hive jobs on EC2 nodes) -> Processed output back to S3 or a data warehouse",
    withoutIt: [
      "Teams would need to manually build, configure, and patch their own Hadoop/Spark cluster infrastructure",
      "Scaling a self-managed big-data cluster up or down would be a manual, slower process",
      "You would lose the tight integration EMR provides with S3, EC2 Spot, and other AWS services",
    ],
    bestUseCases: [
      "Large-scale distributed data processing with Apache Spark or Hadoop",
      "Complex big-data pipelines needing more control/tuning than serverless ETL provides",
      "Machine learning or data science workloads that rely on the Spark/Hadoop ecosystem",
    ],
    poorUseCases: [
      "Simple, occasional SQL queries against S3 data — Athena is simpler and cheaper for that",
      "Straightforward ETL jobs that fit within Glue's serverless job model",
    ],
    alternatives: [
      { need: "Serverless SQL queries directly on S3 data", choose: "Amazon Athena" },
      { need: "Serverless ETL without managing a cluster", choose: "AWS Glue" },
      { need: "Fully managed data warehouse for structured, loaded data", choose: "Amazon Redshift" },
    ],
    keyFeatures: [
      "Managed clusters running Spark, Hadoop, Hive, Presto, HBase, and more",
      "Flexible instance selection, including Spot Instances for cost savings on transient capacity",
      "Cluster resizing and auto-scaling based on workload demand",
      "Tight integration with S3 (as a persistent data store outside the cluster's lifecycle)",
    ],
    availability:
      "EMR clusters run across EC2 instances that you can spread across multiple Availability Zones (typically within one AZ per cluster for the core setup, unless using more advanced multi-AZ patterns), and the cluster's lifecycle is independent of the durability of your underlying data, since EMR is commonly used with S3 as persistent storage rather than relying only on the cluster's local/HDFS storage.",
    security:
      "IAM roles control what the EMR cluster and its jobs can access (e.g. S3 buckets). EMR clusters run inside a VPC, so security groups and subnet placement (public/private) control network access. Data can be encrypted at rest and in transit, and Kerberos or IAM-based authentication can be layered on for cluster access control.",
    pricingLogic:
      "You pay for the underlying EC2 instances (or Spot Instances for savings) that make up the cluster, plus an additional EMR service fee on top of the EC2 cost, for as long as the cluster is running. Because you control cluster size and can terminate it when done, cost scales with how long and how large the cluster runs.",
    examKeywords: [
      "managed Hadoop/Spark cluster",
      "big data processing",
      "cluster-based analytics",
      "distributed processing",
      "Spot Instances for cost savings",
    ],
    examTraps: [
      "EMR is cluster-based, not serverless like Athena/Glue — a question emphasizing \"no cluster to manage\" points away from EMR.",
      "EMR is the right pick when a scenario needs specific big-data frameworks (Spark/Hadoop/Hive) or heavy cluster tuning, not just simple SQL or basic ETL.",
    ],
    architectureDiagram:
      "S3 (input data)\n   |\nEMR Cluster\n (Master node + Core/Task nodes running Spark/Hadoop)\n   |\nOutput -> S3 / Redshift",
    architectureCaption:
      "An EMR cluster processes large datasets using distributed frameworks, typically reading from and writing back to S3.",
    mentorTip:
      "See \"Hadoop,\" \"Spark,\" or \"need full control of a big-data cluster\" in a scenario -> think EMR, not the serverless Athena/Glue pair.",
    questionIds: [
      "q-amazon-emr-1",
      "q-amazon-emr-2",
      "q-amazon-emr-3",
    ],
  },
  {
    id: "aws-lake-formation",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "AWS Lake Formation",
    shortName: "Lake Formation",
    tier: 2,
    domains: [1, 3],
    examImportance: "medium",
    oneLiner:
      "AWS Lake Formation is a service for building and governing a data lake, providing centralized, fine-grained permissions on top of S3-based data.",
    englishExplanation:
      "AWS Lake Formation helps you set up a data lake on Amazon S3 and, more importantly for the exam, centralizes how you control access to the data in that lake. Instead of managing separate S3 bucket policies and IAM policies for every team and every service (Athena, Redshift Spectrum, EMR, Glue) that touches your data lake, Lake Formation lets you define permissions once — at the database, table, and even column or row level — and have those permissions enforced consistently across all the AWS analytics services that read through it.\n\nLake Formation builds on top of the Glue Data Catalog: it is the same catalog, but Lake Formation adds a governance layer over it, so administrators can grant a specific analyst read access to certain columns of a table without giving them broad S3 bucket permissions. This is the core distinction to remember: S3 + IAM alone gives you access control at the bucket/object level, while Lake Formation gives you fine-grained, data-lake-aware permissions (down to columns/rows) managed centrally.",
    taglishExplanation:
      "Si Lake Formation yung nag-aayos ng \"governance\" sa ibabaw ng data lake mo sa S3. Sa halip na mag-set up ka ng magkakahiwalay na IAM at S3 bucket policies para sa bawat team at service (Athena, Redshift Spectrum, EMR), dito ka na lang mag-de-define ng permissions — kahit column-level o row-level pa yan — tapos automatic na siyang mapa-follow ng lahat ng services na dadaan sa Glue Data Catalog. Malaking tulong ito kapag maraming users/teams na iba-ibang klase ng access ang kailangan sa parehong data lake.",
    analogy:
      "If your data lake is a large shared library, plain S3/IAM permissions are like giving someone a key to an entire room. Lake Formation is like a librarian who can say \"this person may read this specific shelf, and even only certain pages of certain books\" — much finer control, managed from one place instead of separately guarding every door.",
    whyItExists:
      "As data lakes grow and more teams and services need different levels of access to the same underlying S3 data, managing that access purely through S3 bucket policies and per-service IAM roles becomes unwieldy and error-prone. Lake Formation exists to centralize and simplify that governance with fine-grained, table/column/row-level permissions.",
    flow: "S3 (data lake storage) -> Glue Data Catalog (schema) -> Lake Formation (centralized permissions) -> Athena / Redshift Spectrum / EMR (enforced access)",
    withoutIt: [
      "Access control would need to be pieced together from separate S3 bucket policies and per-service IAM permissions",
      "Fine-grained access (column-level or row-level) would be much harder to enforce consistently",
      "Every new analytics service touching the data lake would need its own access setup",
    ],
    bestUseCases: [
      "Centralizing and simplifying permissions management across a multi-service data lake",
      "Enforcing column-level or row-level access control for sensitive data",
      "Governing who can query which parts of data cataloged in Glue via Athena, Redshift Spectrum, or EMR",
    ],
    poorUseCases: [
      "Very small, single-team environments where simple S3/IAM policies are already sufficient",
      "Non-analytical workloads unrelated to a structured data lake",
    ],
    alternatives: [
      { need: "Just needs basic S3 bucket-level access control, nothing fine-grained", choose: "S3 bucket policies + IAM" },
      { need: "Serverless ETL to prepare and catalog the data before governing it", choose: "AWS Glue" },
    ],
    keyFeatures: [
      "Centralized, fine-grained permissions (table, column, row level) on data lake resources",
      "Built on top of the shared Glue Data Catalog",
      "Enforced consistently across Athena, Redshift Spectrum, EMR, and other integrated services",
      "Simplifies onboarding new data sources into a governed data lake",
    ],
    availability:
      "Lake Formation is a managed, regional service; the underlying durability and availability of the data itself still comes from S3, while Lake Formation governs access to that data consistently across the region.",
    security:
      "Lake Formation is fundamentally a security/governance feature: it layers fine-grained permission grants on top of IAM identities, controlling exactly which databases, tables, columns, or rows a principal can access when going through Lake Formation-integrated services.",
    pricingLogic:
      "There is no separate charge just for defining Lake Formation permissions; you pay for the underlying resources it governs and the services that query through it (e.g. Athena query costs, S3 storage), following standard pricing for those services.",
    examKeywords: [
      "centralized data lake permissions",
      "fine-grained access control",
      "column-level and row-level security",
      "data lake governance",
      "built on Glue Data Catalog",
    ],
    examTraps: [
      "Lake Formation is about governance/permissions, not about processing or transforming the data — that is Glue's/EMR's job.",
      "It layers on top of the same Glue Data Catalog used by Athena/Redshift Spectrum, not a separate catalog.",
    ],
    architectureDiagram:
      "S3 (data lake)\n   |\nGlue Data Catalog\n   |\nLake Formation (fine-grained permissions)\n   |\nAthena / Redshift Spectrum / EMR (governed access)",
    architectureCaption:
      "Lake Formation adds a centralized, fine-grained permission layer on top of the Glue Data Catalog, enforced across analytics services.",
    mentorTip:
      "If a scenario mentions needing column-level or row-level access control across multiple analytics services on the same data lake, that is the signal for Lake Formation, not plain IAM/S3 policies.",
    questionIds: [
      "q-aws-lake-formation-1",
      "q-aws-lake-formation-2",
      "q-aws-lake-formation-3",
    ],
  },
  {
    id: "amazon-opensearch-service",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "Amazon OpenSearch Service",
    shortName: "OpenSearch",
    tier: 2,
    domains: [3],
    examImportance: "medium",
    oneLiner:
      "Amazon OpenSearch Service is a managed service for search and log/operational analytics, commonly used to power real-time dashboards over indexed data.",
    englishExplanation:
      "Amazon OpenSearch Service is a managed version of OpenSearch (the open-source fork of Elasticsearch), used heavily for two related purposes: full-text search over large document sets, and near real-time analytics over log and operational data. Data is indexed into OpenSearch so it can be searched and aggregated extremely quickly, and tools like OpenSearch Dashboards let teams build real-time visual dashboards on top of that indexed data.\n\nA common architecture pattern is streaming log data (from application servers, VPC Flow Logs, or a Kinesis/Firehose pipeline) into OpenSearch so operations teams can search and visualize it as it arrives — this is different from Athena, which queries data at rest in S3 with SQL, and different from QuickSight, which visualizes data but does not itself provide the underlying full-text search/indexing engine.",
    taglishExplanation:
      "Si OpenSearch Service yung gamitin mo kapag kailangan mo ng mabilis na full-text search o real-time log analytics — halimbawa mag-search ka ng specific error message sa milyon-milyong log lines, o gusto mo ng live dashboard na nagre-reflect ng nangyayari ngayon. Kadalasan pinapasok dito yung streaming logs galing Kinesis/Firehose, tapos ang OpenSearch Dashboards na ang gagawa ng visualization. Iba ito kay Athena na SQL query sa S3, at iba rin kay QuickSight na visualization tool lang pero walang sariling search/index engine.",
    analogy:
      "OpenSearch Service is like a librarian with a superpowered card catalog: instead of flipping through books page by page (scanning raw files), the librarian has pre-indexed every keyword so you can instantly find every mention of a term across the whole library, and even show you a live chart of how often that term has appeared over time.",
    whyItExists:
      "Full-text search and near real-time log analytics need a purpose-built indexing engine that traditional SQL-over-files tools are not optimized for. OpenSearch Service exists so teams get that search/analytics engine as a managed service instead of operating their own Elasticsearch/OpenSearch cluster.",
    flow: "Logs / application data -> (optionally via Kinesis/Firehose) -> Amazon OpenSearch Service (indexed) -> OpenSearch Dashboards (real-time visualization)",
    withoutIt: [
      "Teams would need to self-manage an Elasticsearch/OpenSearch cluster for search and log analytics",
      "Full-text search across large log/document volumes would be slower without a purpose-built index",
      "Real-time operational dashboards would be harder to build directly on raw log data",
    ],
    bestUseCases: [
      "Full-text search over large volumes of documents or application data",
      "Real-time log analytics and operational dashboards (e.g. monitoring application health)",
      "Security/log analysis use cases needing fast search across indexed events",
    ],
    poorUseCases: [
      "General-purpose relational reporting/BI over structured business data — QuickSight or Redshift fit better",
      "Simple ad-hoc SQL analysis over S3 data with no need for a search index — Athena is simpler",
    ],
    alternatives: [
      { need: "SQL queries directly on data already sitting in S3", choose: "Amazon Athena" },
      { need: "Business intelligence dashboards/visualizations over structured data", choose: "Amazon QuickSight" },
      { need: "Managed delivery of streaming logs into OpenSearch without custom consumer code", choose: "Amazon Data Firehose" },
    ],
    keyFeatures: [
      "Managed OpenSearch (Elasticsearch-compatible) clusters",
      "Full-text search and near real-time indexing",
      "OpenSearch Dashboards for visualization",
      "Common integration point for streaming log pipelines",
    ],
    availability:
      "OpenSearch Service supports deploying domains across multiple Availability Zones for higher availability, with data replicated across nodes so the loss of a single node or AZ does not necessarily mean data loss, depending on how the domain is configured.",
    security:
      "Access is controlled through IAM policies, resource-based access policies on the OpenSearch domain, and optionally fine-grained access control within OpenSearch itself. Domains can be placed inside a VPC to keep traffic off the public internet, and data can be encrypted at rest and in transit.",
    pricingLogic:
      "You pay for the underlying instance types and storage that make up your OpenSearch domain (similar to paying for a managed cluster), plus data transfer, for as long as the domain is running — it is not a pay-per-query serverless model like Athena.",
    examKeywords: [
      "search and log analytics",
      "real-time dashboards",
      "full-text search",
      "OpenSearch Dashboards",
      "Elasticsearch-compatible",
    ],
    examTraps: [
      "OpenSearch Service is cluster/domain-based (you provision capacity), unlike Athena's pure pay-per-query model.",
      "Choose OpenSearch for search/log-analytics-shaped problems, not as a general BI/reporting substitute for QuickSight.",
    ],
    architectureDiagram:
      "App/server logs -> Kinesis/Firehose (optional) -> Amazon OpenSearch Service (indexed)\n                                                              |\n                                                    OpenSearch Dashboards (real-time view)",
    architectureCaption:
      "Streaming or batch log data is indexed into OpenSearch Service, then visualized in near real time via OpenSearch Dashboards.",
    mentorTip:
      "\"Full-text search\" or \"real-time log/operational analytics dashboard\" in a scenario should point you to OpenSearch Service over Athena or QuickSight alone.",
    questionIds: [
      "q-amazon-opensearch-service-1",
      "q-amazon-opensearch-service-2",
      "q-amazon-opensearch-service-3",
    ],
  },
  {
    id: "amazon-msk",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "Amazon MSK",
    shortName: "MSK",
    tier: 2,
    domains: [3],
    examImportance: "medium",
    oneLiner:
      "Amazon MSK (Managed Streaming for Apache Kafka) is a managed service for running Apache Kafka, for teams that specifically need Kafka's API and ecosystem.",
    englishExplanation:
      "Amazon MSK provides a managed Apache Kafka cluster, handling the operational burden of running, patching, and scaling Kafka brokers yourself. Kafka is a widely used open-source streaming platform with its own ecosystem of client libraries, connectors, and tooling, and many organizations already have applications, pipelines, or expertise built around the Kafka API specifically.\n\nAt the SAA exam level, MSK's role is mostly about recognition: when a scenario explicitly requires Apache Kafka (for example, because existing applications are already written against Kafka's client APIs, or the organization has standardized on Kafka tooling), MSK is the AWS-managed way to get that without operating your own Kafka cluster on EC2. If the scenario has no such Kafka-specific requirement, Kinesis Data Streams is usually the more \"AWS-native\" and simpler choice for streaming ingestion.",
    taglishExplanation:
      "Si MSK yung managed version ni Apache Kafka sa AWS. Gamitin mo ito kapag talagang Kafka mismo ang kailangan — halimbawa may existing na applications ka na na naka-code laban sa Kafka APIs, o yung team niyo ay Kafka-focused talaga ang ecosystem. Kung walang ganung specific na Kafka requirement sa scenario, mas simple at mas \"AWS-native\" na option ang Kinesis Data Streams para sa streaming ingestion.",
    analogy:
      "If Kinesis is AWS's own native streaming service, MSK is like AWS renting you a fully maintained version of a specific, well-known third-party tool (Kafka) that some teams already know how to use and have existing tooling built around — you get that same tool, just without having to rack and maintain the servers yourself.",
    whyItExists:
      "Many organizations already have significant investment in Kafka-based tooling, client code, and operational knowledge before moving to AWS. MSK exists so those teams can keep using the Kafka API and ecosystem they already know, without taking on the operational overhead of running Kafka brokers themselves.",
    flow: "Kafka producers (existing apps) -> Amazon MSK (managed Kafka brokers) -> Kafka consumers (existing apps/connectors)",
    withoutIt: [
      "Teams needing Kafka specifically would have to self-manage Kafka brokers on EC2",
      "Patching, scaling, and monitoring Kafka clusters would be entirely the customer's responsibility",
    ],
    bestUseCases: [
      "Migrating existing Kafka-based applications or pipelines to AWS with minimal rework",
      "Teams standardized on the Kafka ecosystem (connectors, client libraries, tooling)",
      "Streaming use cases that specifically require Kafka API compatibility",
    ],
    poorUseCases: [
      "New streaming projects with no existing Kafka dependency — Kinesis Data Streams is usually simpler to adopt",
      "Simple delivery-only pipelines with no custom consumer logic — Firehose is a lighter-weight fit",
    ],
    alternatives: [
      { need: "AWS-native streaming without a Kafka-specific requirement", choose: "Amazon Kinesis Data Streams" },
      { need: "Fully managed delivery of streaming data to a destination", choose: "Amazon Data Firehose" },
    ],
    keyFeatures: [
      "Fully managed Apache Kafka brokers and (optionally) ZooKeeper/KRaft management",
      "Compatible with existing Kafka APIs, client libraries, and connectors",
      "Handles patching, broker replacement, and scaling operations",
    ],
    availability:
      "MSK clusters can be deployed across multiple Availability Zones, with Kafka's own replication mechanisms keeping topic data available even if a broker or AZ has an issue, similar in spirit to running Kafka in a highly available on-premises deployment.",
    security:
      "IAM can be used for cluster-level access control and, with IAM access control enabled, even for topic-level authorization; TLS encrypts data in transit, and data at rest can be encrypted with KMS. Clusters run inside a VPC, so security groups control network reachability.",
    pricingLogic:
      "You pay for the broker instances (by type and count) that make up the MSK cluster, plus storage attached to those brokers, for as long as the cluster runs — similar to paying for a managed cluster rather than a pure pay-per-use model.",
    examKeywords: [
      "managed Apache Kafka",
      "Kafka API compatibility",
      "migrate existing Kafka workloads",
      "streaming with Kafka ecosystem",
    ],
    examTraps: [
      "Only pick MSK when the scenario specifically calls out Kafka — otherwise Kinesis is the simpler AWS-native default.",
      "MSK still involves cluster/broker capacity planning, unlike Firehose's fully hands-off delivery model.",
    ],
    architectureDiagram:
      "Kafka producers\n   |\nAmazon MSK (managed Kafka brokers, multi-AZ)\n   |\nKafka consumers / connectors",
    architectureCaption:
      "MSK runs managed Kafka brokers across multiple AZs, compatible with existing Kafka producer/consumer code.",
    mentorTip:
      "See the word \"Kafka\" explicitly in a scenario -> think MSK. No mention of Kafka -> default to Kinesis Data Streams for custom real-time processing.",
    questionIds: [
      "q-amazon-msk-1",
      "q-amazon-msk-2",
      "q-amazon-msk-3",
    ],
  },
  {
    id: "amazon-quicksight",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "Amazon QuickSight",
    shortName: "QuickSight",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon QuickSight is a managed business intelligence service for building interactive dashboards and visualizations from your data.",
    englishExplanation:
      "Amazon QuickSight (sometimes referred to informally as \"Amazon Quick\" in newer branding contexts) is AWS's managed BI/visualization tool: it connects to data sources like S3, Athena, Redshift, and RDS, and lets business users build interactive charts, dashboards, and reports without standing up separate visualization infrastructure. At the SAA exam level, you mainly need to recognize QuickSight as \"the answer when the scenario needs dashboards/visualizations for business users,\" as opposed to the services that produce or store the underlying data (Athena, Redshift, S3).",
    taglishExplanation:
      "Si QuickSight yung BI/visualization tool ng AWS — dito gagawa ng dashboards at charts galing sa data na nasa S3, Athena, Redshift, o RDS. Kapag sinabi sa scenario na kailangan ng \"business dashboards\" o \"visualize the data for stakeholders,\" QuickSight ang tamang sagot, hindi na yung underlying data source mismo.",
    analogy:
      "If Athena and Redshift are the kitchen producing the data, QuickSight is the plating and presentation — it takes the results and turns them into charts and dashboards that a business user can actually read and act on.",
    whyItExists:
      "Business stakeholders usually need visual dashboards, not raw query results — QuickSight exists to close that last-mile gap between data stored/queried in AWS and a polished, interactive report a non-technical user can consume.",
    flow: "Athena / Redshift / S3 / RDS -> Amazon QuickSight -> Interactive dashboards for business users",
    withoutIt: [
      "Business users would need to interpret raw query results or exported spreadsheets instead of visual dashboards",
      "Teams would need to stand up separate third-party BI tooling",
    ],
    bestUseCases: [
      "Building interactive dashboards for business stakeholders",
      "Visualizing query results from Athena, Redshift, or RDS without extra infrastructure",
    ],
    poorUseCases: [
      "Running the underlying SQL analysis itself (that is Athena's/Redshift's job, not QuickSight's)",
      "Real-time log search/full-text search use cases (OpenSearch Service fits better)",
    ],
    alternatives: [
      { need: "Run the SQL query that QuickSight will later visualize", choose: "Amazon Athena or Amazon Redshift" },
      { need: "Real-time log/search analytics dashboards specifically", choose: "Amazon OpenSearch Service" },
    ],
    keyFeatures: [
      "Connects to S3, Athena, Redshift, RDS, and other data sources",
      "Interactive, shareable dashboards for business users",
      "Serverless, scales automatically with usage",
    ],
    availability:
      "QuickSight is a fully managed service; AWS handles the availability of the dashboarding/visualization layer, while the underlying data's durability depends on its actual source (S3, Redshift, RDS, etc.).",
    security:
      "Access to QuickSight and to specific dashboards/datasets is controlled via QuickSight user/group permissions layered on top of IAM, and QuickSight itself connects to underlying data sources using permissions granted to it.",
    pricingLogic:
      "QuickSight is typically priced per user/session (with different tiers), rather than per query — this is different from the pay-per-scan model of Athena which QuickSight might sit on top of.",
    examKeywords: [
      "business intelligence dashboards",
      "data visualization",
      "interactive reports",
    ],
    examTraps: [
      "QuickSight visualizes data — it is not itself a data processing, storage, or query engine.",
      "Do not confuse QuickSight (BI dashboards) with OpenSearch Dashboards (log/search-focused visualization).",
    ],
    architectureDiagram:
      "Athena / Redshift / S3 / RDS\n   |\nAmazon QuickSight\n   |\nInteractive dashboards (business users)",
    architectureCaption:
      "QuickSight sits at the top of the analytics stack, turning query results from other services into dashboards.",
    mentorTip:
      "If the scenario's ask is specifically about presenting data visually to business users, that is QuickSight — the underlying query/storage service is usually a separate, earlier step in the same scenario.",
    questionIds: [
      "q-amazon-quicksight-1",
      "q-amazon-quicksight-2",
    ],
  },
  {
    id: "aws-data-exchange",
    moduleId: "phase-10-analytics",
    category: "Analytics",
    title: "AWS Data Exchange",
    shortName: "Data Exchange",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "AWS Data Exchange lets you find, subscribe to, and use third-party datasets directly within your AWS environment.",
    englishExplanation:
      "AWS Data Exchange is a marketplace-style service for third-party data: providers publish datasets (financial data, healthcare data, geospatial data, and more), and subscribers can find, subscribe to, and consume that data without building custom data-sharing pipelines with each provider. Subscribed data can be accessed directly (for example, via S3) and used in your own analytics pipelines alongside your internal data. At the exam level, the recognition point is simple: whenever a scenario mentions acquiring or licensing external/third-party datasets to use in AWS, AWS Data Exchange is the service being described.",
    taglishExplanation:
      "Si AWS Data Exchange parang \"marketplace\" ng datasets — may mga third-party providers na naglalagay ng data doon (financial, healthcare, geospatial, atbp.), tapos ikaw naman bilang subscriber, puwede kang mag-subscribe at direktang gamitin yung data sa loob mismo ng AWS environment mo, kasabay ng sarili mong internal data. Kapag may nabanggit sa scenario na \"gustong bumili o mag-subscribe ng external dataset,\" iyan na yung AWS Data Exchange.",
    analogy:
      "AWS Data Exchange is like an app store, but for datasets instead of apps: providers list what they have, you subscribe to what you need, and it shows up ready to use in your own environment instead of you negotiating a custom data feed with every provider individually.",
    whyItExists:
      "Sourcing and integrating third-party data traditionally meant negotiating individual data-sharing agreements and building custom ingestion pipelines per provider. AWS Data Exchange standardizes that discovery, subscription, and delivery process within AWS.",
    flow: "Data provider publishes dataset -> AWS Data Exchange (subscription/marketplace) -> Subscriber consumes data (e.g. via S3) -> Combined with internal data for analytics",
    withoutIt: [
      "You would need to negotiate and build a custom data pipeline with each third-party data provider individually",
      "Discovering available third-party datasets would be harder without a centralized marketplace",
    ],
    bestUseCases: [
      "Subscribing to third-party datasets (financial, healthcare, geospatial, etc.) for use in AWS analytics",
      "Combining external licensed data with internal data for richer analysis",
    ],
    poorUseCases: [
      "Sharing your own internal-only data between your own accounts/teams (that is simpler via S3 sharing or Lake Formation)",
      "Real-time streaming data acquisition (Data Exchange is centered on published datasets, not live streams)",
    ],
    alternatives: [
      { need: "Share internal data across your own accounts with fine-grained permissions", choose: "AWS Lake Formation" },
      { need: "Run analysis on the data once it's in your environment", choose: "Amazon Athena or Amazon Redshift" },
    ],
    keyFeatures: [
      "Marketplace for discovering and subscribing to third-party datasets",
      "Delivers subscribed data in AWS-native formats (e.g. via S3)",
      "Supports both data providers (who publish) and subscribers (who consume)",
    ],
    availability:
      "AWS Data Exchange is a managed AWS service; once subscribed, delivered data typically lands in a durable store like S3, so its durability follows that underlying service.",
    security:
      "Access to subscribed datasets is controlled through your AWS account's subscription and standard IAM permissions on the delivered resources (e.g. S3 objects), so only authorized principals in your account can use the licensed data.",
    pricingLogic:
      "Pricing is typically set by the data provider per dataset/subscription (one-time or recurring), plus any standard AWS costs (like S3 storage) for the delivered data once it lands in your account.",
    examKeywords: [
      "third-party datasets",
      "data marketplace",
      "subscribe to external data",
      "licensed data",
    ],
    examTraps: [
      "AWS Data Exchange is about acquiring external data, not about processing, transforming, or governing your own internal data.",
      "Do not confuse it with Lake Formation, which governs access to data you already own within your own data lake.",
    ],
    architectureDiagram:
      "Third-party provider -> AWS Data Exchange (marketplace)\n                                   |\n                          Subscriber's AWS account (S3)\n                                   |\n                    Combined with internal data -> Athena / Redshift",
    architectureCaption:
      "AWS Data Exchange delivers subscribed third-party datasets into your account so they can be combined with your own data for analysis.",
    mentorTip:
      "Any scenario about licensing or subscribing to external/third-party data for use inside AWS is describing AWS Data Exchange — a low-frequency but easy-to-recognize exam topic.",
    questionIds: [
      "q-aws-data-exchange-1",
      "q-aws-data-exchange-2",
    ],
  },
];
