import type { Flashcard } from "@/lib/types";

export const integrationFlashcards: Flashcard[] = [
  { id: "fc-amazon-sqs-1", serviceId: "amazon-sqs", domain: 2, category: "Application Integration", front: "What is Amazon SQS?", back: "A managed message queue that decouples producers from consumers so they don't need to talk directly or wait for each other." },
  { id: "fc-amazon-sqs-2", serviceId: "amazon-sqs", domain: 2, category: "Application Integration", front: "What SQS setting prevents two consumers from processing the same message at once?", back: "Visibility timeout." },
  { id: "fc-amazon-sqs-3", serviceId: "amazon-sqs", domain: 2, category: "Application Integration", front: "What holds messages that repeatedly fail processing?", back: "A dead-letter queue (DLQ)." },
  { id: "fc-amazon-sqs-4", serviceId: "amazon-sqs", domain: 2, category: "Application Integration", front: "Standard vs FIFO queues?", back: "Standard: high throughput, best-effort ordering. FIFO: strict ordering and exactly-once processing, lower throughput." },
  { id: "fc-amazon-sqs-5", serviceId: "amazon-sqs", domain: 2, category: "Application Integration", front: "Taglish: Ano ang 'decouple' sa konteksto ng SQS?", back: "Hindi na kailangan maghintayan ang producer at consumer — nilalagay lang ang mensahe sa queue, kukunin na lang ito sa sariling bilis ng consumer." },

  { id: "fc-amazon-sns-1", serviceId: "amazon-sns", domain: 2, category: "Application Integration", front: "What is Amazon SNS?", back: "A managed pub/sub service that pushes one message to many subscribers (fanout)." },
  { id: "fc-amazon-sns-2", serviceId: "amazon-sns", domain: 2, category: "Application Integration", front: "SQS vs SNS — one-liner?", back: "SQS = pull/queue (one consumer per message). SNS = push/fanout (many subscribers per message)." },
  { id: "fc-amazon-sns-3", serviceId: "amazon-sns", domain: 2, category: "Application Integration", front: "What SNS construct do subscribers subscribe to?", back: "A topic." },
  { id: "fc-amazon-sns-4", serviceId: "amazon-sns", domain: 2, category: "Application Integration", front: "Name two types of SNS subscribers.", back: "SQS queues, Lambda functions, email, SMS, HTTP(S) endpoints, and mobile push." },
  { id: "fc-amazon-sns-5", serviceId: "amazon-sns", domain: 2, category: "Application Integration", front: "Taglish: Kailan SNS ang gamitin imbes na SQS?", back: "Kapag kailangan mong ipadala ang isang event sa MARAMING subscribers nang sabay-sabay, hindi lang isa." },

  { id: "fc-sns-sqs-fanout-1", serviceId: "sns-sqs-fanout", domain: 2, category: "Application Integration", front: "What is the SNS + SQS fanout pattern?", back: "One event published to an SNS topic is fanned out to multiple independent SQS queues, each with its own consumer." },
  { id: "fc-sns-sqs-fanout-2", serviceId: "sns-sqs-fanout", domain: 2, category: "Application Integration", front: "Why use fanout instead of sending directly to multiple queues?", back: "The producer only needs to know about one topic — adding a new consumer just means subscribing a new queue, no producer changes needed." },
  { id: "fc-sns-sqs-fanout-3", serviceId: "sns-sqs-fanout", domain: 2, category: "Application Integration", front: "Give a real example of the fanout pattern.", back: "An Order Event published to SNS, fanned out to separate Billing, Inventory, and Analytics SQS queues." },
  { id: "fc-sns-sqs-fanout-4", serviceId: "sns-sqs-fanout", domain: 2, category: "Application Integration", front: "Taglish: Bakit maganda ang fanout pattern?", back: "Kasi independent sa isa't isa ang mga consumer — kung mabagal o may problema ang isa, hindi ito makakaapekto sa iba." },

  { id: "fc-amazon-eventbridge-1", serviceId: "amazon-eventbridge", domain: 2, category: "Application Integration", front: "What is Amazon EventBridge?", back: "A managed event bus for routing events between AWS services, SaaS apps, and your own applications, based on rules." },
  { id: "fc-amazon-eventbridge-2", serviceId: "amazon-eventbridge", domain: 2, category: "Application Integration", front: "EventBridge vs SNS — key distinguishing signal?", back: "EventBridge shines for routing many event TYPES (including SaaS/AWS service events) via rules; SNS is simpler topic-based pub/sub." },
  { id: "fc-amazon-eventbridge-3", serviceId: "amazon-eventbridge", domain: 2, category: "Application Integration", front: "Taglish: Kailan EventBridge ang gamitin?", back: "Kapag maraming klase ng events mula sa ibang AWS services o SaaS apps ang gusto mong i-route base sa rules." },

  { id: "fc-aws-step-functions-1", serviceId: "aws-step-functions", domain: 2, category: "Application Integration", front: "What does AWS Step Functions do?", back: "Orchestrates workflows — sequencing, retries, parallel branches, and waiting — across Lambda and other AWS services." },
  { id: "fc-aws-step-functions-2", serviceId: "aws-step-functions", domain: 2, category: "Application Integration", front: "Why use Step Functions instead of chaining Lambda functions manually?", back: "Built-in retries, error handling, parallel execution, and visual workflow tracking without writing custom orchestration code." },
  { id: "fc-aws-step-functions-3", serviceId: "aws-step-functions", domain: 2, category: "Application Integration", front: "Taglish: Ano ang Step Functions?", back: "Parang flowchart na nagpapatakbo ng maraming steps (kasama ang retries at parallel tasks) nang maayos at maaasahan." },

  { id: "fc-amazon-mq-1", serviceId: "amazon-mq", domain: 2, category: "Application Integration", front: "What is Amazon MQ?", back: "A managed message broker compatible with ActiveMQ/RabbitMQ, for migrating existing broker-based applications." },
  { id: "fc-amazon-mq-2", serviceId: "amazon-mq", domain: 2, category: "Application Integration", front: "When would you pick Amazon MQ over SQS/SNS?", back: "When migrating an existing app that already uses standard messaging protocols (JMS, AMQP, MQTT, STOMP, OpenWire) and needs compatibility, not a rewrite." },
  { id: "fc-amazon-mq-3", serviceId: "amazon-mq", domain: 2, category: "Application Integration", front: "Taglish: Bakit meron pang Amazon MQ kung may SQS/SNS na?", back: "Kasi ang ilang existing applications ay gumagamit na ng standard messaging protocols — mas madali silang i-migrate gamit ang Amazon MQ kaysa i-rewrite papuntang SQS/SNS." },

  { id: "fc-amazon-appflow-1", serviceId: "amazon-appflow", domain: 3, category: "Application Integration", front: "What is Amazon AppFlow for?", back: "Managed data integration between SaaS applications (like Salesforce) and AWS, without custom integration code." },
  { id: "fc-amazon-appflow-2", serviceId: "amazon-appflow", domain: 3, category: "Application Integration", front: "Give an AppFlow use case.", back: "Automatically syncing Salesforce data into S3 or Redshift on a schedule." },
];
