import type { Flashcard } from "@/lib/types";

export const databaseFlashcards: Flashcard[] = [
  { id: "fc-database-decision-framework-1", serviceId: "database-decision-framework", domain: 3, category: "Database", front: "First question to ask when choosing a database?", back: "Relational (joins, ACID) or NoSQL (scale, flexible schema)?" },
  { id: "fc-database-decision-framework-2", serviceId: "database-decision-framework", domain: 3, category: "Database", front: "Which database type fits relationship-heavy queries like 'friends of friends'?", back: "A graph database (Amazon Neptune)." },
  { id: "fc-database-decision-framework-3", serviceId: "database-decision-framework", domain: 3, category: "Database", front: "Which database type fits large-scale historical analytics/BI?", back: "A data warehouse (Amazon Redshift)." },
  { id: "fc-database-decision-framework-4", serviceId: "database-decision-framework", domain: 3, category: "Database", front: "Which database type fits massive-scale, low-latency, key-based access?", back: "Key-value NoSQL (DynamoDB)." },
  { id: "fc-database-decision-framework-5", serviceId: "database-decision-framework", domain: 3, category: "Database", front: "Taglish: Bakit importante magtanong muna bago pumili ng database?", back: "Kasi iba-iba ang pinaka-mahusay na AWS database service depende sa klase ng workload — relational, NoSQL, cache, warehouse, o graph." },

  { id: "fc-amazon-rds-1", serviceId: "amazon-rds", domain: 2, category: "Database", front: "Multi-AZ vs Read Replica — the #1 exam distinction?", back: "Multi-AZ = availability (automatic failover). Read Replica = read scaling." },
  { id: "fc-amazon-rds-2", serviceId: "amazon-rds", domain: 3, category: "Database", front: "What is RDS Proxy for?", back: "Managing/pooling database connections, especially helpful for Lambda/serverless clients." },
  { id: "fc-amazon-rds-3", serviceId: "amazon-rds", domain: 2, category: "Database", front: "Does RDS Multi-AZ change the application's connection endpoint on failover?", back: "No — the same DNS endpoint is used, RDS handles the failover transparently." },
  { id: "fc-amazon-rds-4", serviceId: "amazon-rds", domain: 3, category: "Database", front: "What does AWS manage for you in RDS?", back: "Patching, backups, and OS/database engine maintenance." },
  { id: "fc-amazon-rds-5", serviceId: "amazon-rds", domain: 2, category: "Database", front: "Taglish: Multi-AZ ba ang gamit kapag read-heavy ang app?", back: "Hindi — Read Replica ang gamit para sa read scaling. Multi-AZ ay para sa availability lang." },

  { id: "fc-amazon-aurora-1", serviceId: "amazon-aurora", domain: 3, category: "Database", front: "What database engines is Aurora compatible with?", back: "MySQL and PostgreSQL." },
  { id: "fc-amazon-aurora-2", serviceId: "amazon-aurora", domain: 2, category: "Database", front: "What do Aurora Replicas provide?", back: "Both read scaling and automatic failover targets." },
  { id: "fc-amazon-aurora-3", serviceId: "amazon-aurora", domain: 3, category: "Database", front: "Why might a team choose Aurora over standard RDS?", back: "Higher availability and better read-scaling, with minimal application changes since it's MySQL/PostgreSQL-compatible." },
  { id: "fc-amazon-aurora-4", serviceId: "amazon-aurora", domain: 4, category: "Database", front: "What's the on-demand-capacity version of Aurora called?", back: "Aurora Serverless." },
  { id: "fc-amazon-aurora-5", serviceId: "amazon-aurora", domain: 3, category: "Database", front: "Taglish: Bakit mas gusto ang Aurora kaysa plain RDS sa maraming cases?", back: "Mas mataas ang availability at read-scaling ng Aurora, pero MySQL/PostgreSQL-compatible pa rin kaya konti lang babaguhin sa app." },

  { id: "fc-amazon-aurora-serverless-1", serviceId: "amazon-aurora-serverless", domain: 3, category: "Database", front: "What's Aurora Serverless's defining feature?", back: "Database capacity automatically scales with demand, down to near-zero when idle." },
  { id: "fc-amazon-aurora-serverless-2", serviceId: "amazon-aurora-serverless", domain: 4, category: "Database", front: "Best-fit workload pattern for Aurora Serverless?", back: "Infrequent, unpredictable, or highly variable database usage (e.g. dev/test, spiky multi-tenant apps)." },
  { id: "fc-amazon-aurora-serverless-3", serviceId: "amazon-aurora-serverless", domain: 4, category: "Database", front: "Taglish: Kailan hindi maganda ang Aurora Serverless?", back: "Kapag steady at 24/7 ang usage — mas mura ang provisioned/Reserved capacity sa ganung kaso." },

  { id: "fc-amazon-dynamodb-1", serviceId: "amazon-dynamodb", domain: 3, category: "Database", front: "What is DynamoDB?", back: "A fully managed, serverless key-value/document NoSQL database with single-digit-millisecond latency." },
  { id: "fc-amazon-dynamodb-2", serviceId: "amazon-dynamodb", domain: 2, category: "Database", front: "What does the partition key control?", back: "Which physical partition an item is stored on." },
  { id: "fc-amazon-dynamodb-3", serviceId: "amazon-dynamodb", domain: 2, category: "Database", front: "What feature gives DynamoDB managed multi-Region replication?", back: "Global Tables." },
  { id: "fc-amazon-dynamodb-4", serviceId: "amazon-dynamodb", domain: 3, category: "Database", front: "What DynamoDB feature automatically expires old items?", back: "TTL (Time to Live)." },
  { id: "fc-amazon-dynamodb-5", serviceId: "amazon-dynamodb", domain: 3, category: "Database", front: "Taglish: Bakit maganda ang DynamoDB para sa shopping cart o leaderboard?", back: "Kasi kaya niyang mag-handle ng malaking scale nang mabilis (single-digit millisecond) gamit lang ang simpleng key-based access." },

  { id: "fc-amazon-elasticache-1", serviceId: "amazon-elasticache", domain: 3, category: "Database", front: "What is ElastiCache used for?", back: "Managed in-memory caching to reduce latency and offload the database (Redis/Valkey or Memcached)." },
  { id: "fc-amazon-elasticache-2", serviceId: "amazon-elasticache", domain: 3, category: "Database", front: "Redis vs Memcached in ElastiCache — quick distinction?", back: "Redis/Valkey: richer data structures + persistence. Memcached: simpler, multi-threaded, no persistence." },
  { id: "fc-amazon-elasticache-3", serviceId: "amazon-elasticache", domain: 3, category: "Database", front: "What pattern uses ElastiCache to offload a database?", back: "Cache-aside: check the cache first, fall back to the database on a miss, then populate the cache." },
  { id: "fc-amazon-elasticache-4", serviceId: "amazon-elasticache", domain: 3, category: "Database", front: "Give a classic ElastiCache use case.", back: "Session storage for a web application, or caching frequently-read, rarely-changing data." },
  { id: "fc-amazon-elasticache-5", serviceId: "amazon-elasticache", domain: 3, category: "Database", front: "Taglish: Paano nakakatulong ang ElastiCache sa isang overloaded database?", back: "Sa halip na tumama sa database ang paulit-ulit na parehong query, sa cache na lang kukunin — bawas nang bawas ang trapiko papunta sa database." },

  { id: "fc-amazon-redshift-1", serviceId: "amazon-redshift", domain: 3, category: "Database", front: "What is Amazon Redshift?", back: "AWS's managed data warehouse for large-scale analytical (OLAP) queries." },
  { id: "fc-amazon-redshift-2", serviceId: "amazon-redshift", domain: 3, category: "Database", front: "Redshift vs RDS — when do you pick Redshift?", back: "When the workload is analytics/BI over large historical datasets, not live transactional (OLTP) traffic." },
  { id: "fc-amazon-redshift-3", serviceId: "amazon-redshift", domain: 3, category: "Database", front: "Taglish: Bakit hindi maganda si Redshift para sa live na order processing?", back: "Kasi built si Redshift para sa malalaking analytical queries, hindi para sa mabilis, madalas na transactional writes." },

  { id: "fc-amazon-documentdb-1", serviceId: "amazon-documentdb", domain: 3, category: "Database", front: "What is Amazon DocumentDB compatible with?", back: "MongoDB." },
  { id: "fc-amazon-documentdb-2", serviceId: "amazon-documentdb", domain: 3, category: "Database", front: "DocumentDB vs DynamoDB — key difference?", back: "DocumentDB is MongoDB-API-compatible for flexible JSON documents; DynamoDB has its own key-value/document API and scaling model." },
  { id: "fc-amazon-documentdb-3", serviceId: "amazon-documentdb", domain: 3, category: "Database", front: "Best use case for DocumentDB?", back: "Migrating an existing MongoDB application to a managed AWS service with minimal code changes." },

  { id: "fc-amazon-neptune-1", serviceId: "amazon-neptune", domain: 3, category: "Database", front: "What is Amazon Neptune?", back: "A managed graph database." },
  { id: "fc-amazon-neptune-2", serviceId: "amazon-neptune", domain: 3, category: "Database", front: "Give two use cases for Neptune.", back: "Fraud detection and recommendation engines — both rely on relationship/connection patterns." },

  { id: "fc-amazon-keyspaces-1", serviceId: "amazon-keyspaces", domain: 3, category: "Database", front: "What is Amazon Keyspaces compatible with?", back: "Apache Cassandra." },
  { id: "fc-amazon-keyspaces-2", serviceId: "amazon-keyspaces", domain: 3, category: "Database", front: "When would you choose Keyspaces?", back: "When migrating an existing Cassandra workload to a managed AWS service with minimal rewrite." },
];
