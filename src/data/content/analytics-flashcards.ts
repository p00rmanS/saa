import type { Flashcard } from "@/lib/types";

export const analyticsFlashcards: Flashcard[] = [
  { id: "fc-amazon-athena-1", serviceId: "amazon-athena", domain: 3, category: "Analytics", front: "What is Amazon Athena?", back: "A serverless service to run SQL queries directly over data stored in S3, with no infrastructure to manage." },
  { id: "fc-amazon-athena-2", serviceId: "amazon-athena", domain: 3, category: "Analytics", front: "How is Athena billed?", back: "Per query, based on the amount of data scanned." },
  { id: "fc-amazon-athena-3", serviceId: "amazon-athena", domain: 4, category: "Analytics", front: "How can you reduce Athena query cost?", back: "Reduce the data scanned — e.g. by partitioning data and using columnar formats like Parquet." },
  { id: "fc-amazon-athena-4", serviceId: "amazon-athena", domain: 3, category: "Analytics", front: "Taglish: Bakit maganda ang Athena?", back: "Kaya mo nang mag-run ng SQL queries diretso sa S3 data, walang kailangang i-set up na database o server." },
  { id: "fc-amazon-athena-5", serviceId: "amazon-athena", domain: 3, category: "Analytics", front: "Exam keyword for Athena?", back: "\"Query data in S3 using SQL without managing servers.\"" },

  { id: "fc-aws-glue-1", serviceId: "aws-glue", domain: 3, category: "Analytics", front: "What is AWS Glue?", back: "A serverless ETL (extract, transform, load) service, including a Data Catalog and crawlers." },
  { id: "fc-aws-glue-2", serviceId: "aws-glue", domain: 3, category: "Analytics", front: "What does the Glue Data Catalog store?", back: "Metadata about your data's schema and location, used by Athena, Redshift Spectrum, and other services." },
  { id: "fc-aws-glue-3", serviceId: "aws-glue", domain: 3, category: "Analytics", front: "What does a Glue crawler do?", back: "Scans data sources and automatically infers/updates schema in the Data Catalog." },
  { id: "fc-aws-glue-4", serviceId: "aws-glue", domain: 3, category: "Analytics", front: "Taglish: Ano ang ginagawa ng Glue?", back: "Kinukuha, tino-transform, at inilalagay ng Glue ang data mula sa isang lugar papunta sa iba, kasabay ng pag-catalog ng schema." },
  { id: "fc-aws-glue-5", serviceId: "aws-glue", domain: 3, category: "Analytics", front: "Which service commonly uses Glue's Data Catalog to know a table's schema?", back: "Amazon Athena." },

  { id: "fc-amazon-kinesis-1", serviceId: "amazon-kinesis", domain: 3, category: "Analytics", front: "What is Amazon Kinesis for?", back: "Real-time ingestion and processing of streaming data (e.g. clickstreams, IoT, logs)." },
  { id: "fc-amazon-kinesis-2", serviceId: "amazon-kinesis", domain: 3, category: "Analytics", front: "What are Kinesis Data Streams organized into?", back: "Shards, which producers write to and consumers read from." },
  { id: "fc-amazon-kinesis-3", serviceId: "amazon-kinesis", domain: 3, category: "Analytics", front: "Give a Kinesis use case.", back: "Ingesting real-time clickstream data from a website for live analytics." },
  { id: "fc-amazon-kinesis-4", serviceId: "amazon-kinesis", domain: 3, category: "Analytics", front: "Taglish: Kailan gagamit ng Kinesis?", back: "Kapag real-time streaming data ang pinoproseso mo — hindi batch, kundi tuluy-tuloy na dumadaloy na data." },
  { id: "fc-amazon-kinesis-5", serviceId: "amazon-kinesis", domain: 3, category: "Analytics", front: "Kinesis Data Streams vs Data Firehose?", back: "Data Streams: you write custom consumer code. Data Firehose: fully managed delivery to a destination, no consumer code needed." },

  { id: "fc-amazon-data-firehose-1", serviceId: "amazon-data-firehose", domain: 3, category: "Analytics", front: "What is Amazon Data Firehose?", back: "Managed delivery of streaming data to destinations like S3, Redshift, or OpenSearch — no consumer code required." },
  { id: "fc-amazon-data-firehose-2", serviceId: "amazon-data-firehose", domain: 3, category: "Analytics", front: "Data Firehose vs Kinesis Data Streams — the key distinction?", back: "Firehose is fully managed delivery (no consumer code); Data Streams requires you to write custom consumers." },
  { id: "fc-amazon-data-firehose-3", serviceId: "amazon-data-firehose", domain: 3, category: "Analytics", front: "Taglish: Ano ang Data Firehose?", back: "Automatic na inilalabas ng Firehose ang streaming data papunta sa destination (gaya ng S3), hindi mo na kailangan sumulat ng consumer code." },

  { id: "fc-amazon-emr-1", serviceId: "amazon-emr", domain: 3, category: "Analytics", front: "What is Amazon EMR?", back: "Managed big-data processing using frameworks like Hadoop and Spark on a cluster." },
  { id: "fc-amazon-emr-2", serviceId: "amazon-emr", domain: 3, category: "Analytics", front: "When would you choose EMR over Athena/Glue?", back: "When you need cluster-based processing with frameworks like Spark/Hadoop for large, complex big-data jobs." },
  { id: "fc-amazon-emr-3", serviceId: "amazon-emr", domain: 3, category: "Analytics", front: "Taglish: Kailan EMR ang piliin?", back: "Kapag kailangan mo ng malaking processing power gamit ang Hadoop/Spark cluster, hindi lang simpleng SQL query." },

  { id: "fc-aws-lake-formation-1", serviceId: "aws-lake-formation", domain: 1, category: "Analytics", front: "What is AWS Lake Formation for?", back: "Centralized, fine-grained governance and permissions for data lakes built on S3." },
  { id: "fc-aws-lake-formation-2", serviceId: "aws-lake-formation", domain: 3, category: "Analytics", front: "Give a Lake Formation use case.", back: "Enforcing row/column-level access control on data lake tables queried by multiple teams." },
  { id: "fc-aws-lake-formation-3", serviceId: "aws-lake-formation", domain: 1, category: "Analytics", front: "Taglish: Ano ang idinadagdag ng Lake Formation sa S3-based data lake?", back: "Sentralisadong pamamahala ng permissions — sino ang puwedeng makakita ng aling data, hanggang column-level pa." },

  { id: "fc-amazon-opensearch-service-1", serviceId: "amazon-opensearch-service", domain: 3, category: "Analytics", front: "What is Amazon OpenSearch Service for?", back: "Search and log analytics, with real-time dashboards." },
  { id: "fc-amazon-opensearch-service-2", serviceId: "amazon-opensearch-service", domain: 3, category: "Analytics", front: "Give an OpenSearch use case.", back: "Full-text search for an e-commerce catalog, or centralized log analytics dashboards." },
  { id: "fc-amazon-opensearch-service-3", serviceId: "amazon-opensearch-service", domain: 3, category: "Analytics", front: "Taglish: Kailan OpenSearch ang gamitin?", back: "Kapag kailangan mo ng mabilis na full-text search o real-time log analytics dashboard." },

  { id: "fc-amazon-msk-1", serviceId: "amazon-msk", domain: 3, category: "Analytics", front: "What is Amazon MSK?", back: "Managed Apache Kafka, for teams that specifically need Kafka compatibility." },
  { id: "fc-amazon-msk-2", serviceId: "amazon-msk", domain: 3, category: "Analytics", front: "MSK vs Kinesis — when do you pick MSK?", back: "When you need actual Kafka API compatibility (existing tooling, client libraries, or team expertise)." },
  { id: "fc-amazon-msk-3", serviceId: "amazon-msk", domain: 3, category: "Analytics", front: "Taglish: Bakit meron pang MSK kung may Kinesis na?", back: "Kasi may mga teams na existing na gumagamit ng Kafka — mas madali silang lumipat sa MSK kaysa mag-rewrite papuntang Kinesis." },

  { id: "fc-amazon-quicksight-1", serviceId: "amazon-quicksight", domain: 3, category: "Analytics", front: "What is Amazon QuickSight for?", back: "Managed business intelligence (BI) and data visualization/dashboards." },
  { id: "fc-amazon-quicksight-2", serviceId: "amazon-quicksight", domain: 3, category: "Analytics", front: "Give a QuickSight use case.", back: "Building interactive executive dashboards over data in Redshift, S3, or Athena." },

  { id: "fc-aws-data-exchange-1", serviceId: "aws-data-exchange", domain: 3, category: "Analytics", front: "What is AWS Data Exchange for?", back: "Finding, subscribing to, and using third-party data sets directly within AWS." },
  { id: "fc-aws-data-exchange-2", serviceId: "aws-data-exchange", domain: 3, category: "Analytics", front: "Give a Data Exchange use case.", back: "Subscribing to a third-party market-data feed and analyzing it alongside your own data in S3/Athena." },
];
