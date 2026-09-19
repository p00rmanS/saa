import type { Lesson } from "@/lib/types";

export const integrationLessons: Lesson[] = [
  {
    id: "amazon-sqs",
    moduleId: "phase-6-integration",
    category: "Application Integration",
    title: "Amazon SQS",
    shortName: "SQS",
    tier: 1,
    domains: [2],
    examImportance: "critical",
    oneLiner:
      "Amazon SQS is a fully managed message queue that lets application components send, store, and receive messages without talking to each other directly.",
    englishExplanation:
      "Amazon Simple Queue Service (SQS) is AWS's core messaging queue service. A \"producer\" component pushes a message into a queue, and a \"consumer\" component pulls (polls) that message out and processes it, later deleting it from the queue once done. Because the producer never calls the consumer directly, the two sides do not need to know about each other, do not need to run at the same time, and do not need to run at the same speed. This is called decoupling, and it is the single most important reason SQS exists.\n\nWhen a consumer receives a message, SQS does not delete it immediately — instead it becomes invisible to other consumers for a period called the visibility timeout. If the consumer finishes processing and explicitly deletes the message before the timeout expires, the message is gone for good. If the consumer crashes or times out without deleting it, the message becomes visible again and another consumer will pick it up — this is how SQS gives you automatic retries without you writing retry logic yourself.\n\nSQS comes in two flavors. Standard queues give nearly unlimited throughput but only best-effort ordering and at-least-once delivery (a message could theoretically be delivered more than once, so consumers should be idempotent). FIFO (First-In-First-Out) queues guarantee strict ordering and exactly-once processing within a message group, at the cost of lower throughput. A dead-letter queue (DLQ) is a separate queue you attach to catch messages that failed processing too many times (exceeded the maxReceiveCount), so a single poison-pill message cannot loop forever and block the queue.",
    taglishExplanation:
      "Isipin mo si SQS parang isang paperless na \"order ticket rack\" sa likod ng kusina. Yung waiter (producer) sumusulat ng order at ini-slide sa rack, tapos yung cook (consumer) kung kailan siya ready, doon niya kukunin yung ticket. Hindi kailangan mag-usap in real time yung waiter at cook — basta nasa rack yung order, secure na siya. Kapag kinuha ng cook yung ticket pero hindi na-tapos (nag-crash, nagulat), babalik yan sa rack para may ibang cook na makakuha — automatic retry, walang extra code. Standard queue parang bulk na rack, mabilis pero puwedeng magulo ang pagkakasunod-sunod; FIFO queue parang \"strictly in order\" na rack pero mas mabagal ang bilis.",
    analogy:
      "SQS is like a restaurant's order-ticket queue between the waiter and the kitchen. The waiter (producer) clips the order ticket onto the rack and walks away — no need to hand it directly to a specific cook or wait for one to be free. A cook (consumer) grabs the next ticket when ready, cooks the dish, then removes the ticket from the rack when done. If that cook gets pulled away mid-dish and never finishes, the ticket reappears on the rack (visibility timeout expiring) so another cook can pick it up. If a ticket keeps failing (say, it is unreadable) after several cooks try it, it gets pinned to a separate \"problem tickets\" board (the dead-letter queue) instead of jamming the main rack forever.",
    whyItExists:
      "Before queues, if Service A called Service B directly and B was slow, overloaded, or down, A would fail or block too — a tight coupling that made systems fragile and hard to scale independently. SQS exists so that a sudden burst of work (e.g., thousands of orders at once) can be absorbed into a durable queue instead of overwhelming the downstream service, and so that producers and consumers can be scaled, deployed, and fixed independently of each other.",
    flow: "Producer (e.g., web app) -> SQS Queue -> Consumer (e.g., EC2/Lambda worker) polls -> processes -> deletes message",
    withoutIt: [
      "Producers and consumers would need to call each other directly and be online at the same time (tight coupling)",
      "A traffic spike could overwhelm a downstream service with no buffer to absorb it",
      "You would have to hand-write retry logic, backoff, and failure isolation yourself",
      "One failing message could block or crash the whole processing pipeline",
    ],
    bestUseCases: [
      "Decoupling microservices so one component's slowness or downtime does not cascade to others",
      "Buffering sudden traffic spikes (order processing, image uploads, batch jobs) before a slower backend",
      "Distributing work across a fleet of worker instances that scale based on queue depth",
      "Any workload that can tolerate asynchronous, background-style processing rather than an instant response",
      "FIFO queues specifically for tasks where strict order matters, like sequential financial transactions",
    ],
    poorUseCases: [
      "Real-time, synchronous request/response where the caller needs an immediate answer",
      "Broadcasting one event to many independent subscribers at once (that is SNS/EventBridge territory, or SNS+SQS fanout)",
      "Complex multi-step workflows with branching and retries at the workflow level (that is Step Functions)",
    ],
    alternatives: [
      { need: "Push one event to many independent subscribers (pub/sub)", choose: "Amazon SNS" },
      { need: "Route events by content/pattern from many AWS or SaaS sources", choose: "Amazon EventBridge" },
      { need: "Orchestrate a multi-step workflow with retries and branching", choose: "AWS Step Functions" },
      { need: "A drop-in replacement for an existing RabbitMQ/ActiveMQ broker", choose: "Amazon MQ" },
    ],
    keyFeatures: [
      "Standard queues: nearly unlimited throughput, at-least-once delivery, best-effort ordering",
      "FIFO queues: strict ordering and exactly-once processing per message group",
      "Visibility timeout: hides an in-flight message from other consumers until it is deleted or the timeout expires",
      "Dead-letter queues (DLQ): isolate messages that repeatedly fail processing after a configured max receive count",
      "Long polling: consumers wait briefly for a message to arrive instead of hammering the API with empty responses",
      "Message retention: undelivered messages are kept for a configurable period before expiring",
      "Server-side encryption with KMS for messages at rest",
    ],
    availability:
      "SQS is a regional, fully managed service — AWS replicates queue data across multiple Availability Zones within the Region automatically, so you do not manage servers, clusters, or storage yourself. There is no \"single instance\" of a queue to fail over; it is durable by design.",
    security:
      "Access to a queue (who can send or receive messages) is controlled with IAM policies and optional queue access policies (resource-based policies) for cross-account access. Messages can be encrypted at rest with SQS-managed keys or your own KMS key, and in transit via HTTPS. Consumers should be built to be idempotent since at-least-once delivery on standard queues means a message could rarely be processed twice.",
    pricingLogic:
      "You pay per request (API calls to send, receive, and delete messages), with pricing varying slightly between Standard and FIFO queues. There is no charge for idle queues sitting empty, and no servers to provision or pay for — it scales with usage.",
    examKeywords: [
      "decouple",
      "decoupling",
      "queue",
      "visibility timeout",
      "dead-letter queue (DLQ)",
      "standard vs FIFO",
      "at-least-once delivery",
      "polling",
    ],
    examTraps: [
      "SQS is pull-based (consumers poll) — it does not push messages to consumers; that push behavior is SNS.",
      "A message is not deleted automatically after being received — the consumer must explicitly delete it, or it reappears after the visibility timeout.",
      "Standard queues can deliver a message more than once; do not assume exactly-once unless you specifically chose FIFO.",
      "\"Decouple the application\" in a question is almost always a strong signal for SQS (or SNS/EventBridge for fanout/routing).",
    ],
    architectureDiagram:
      "Producer (App/API)\n      |\n      v\n  [ SQS Queue ]\n      |\n      v\nConsumer (EC2 / Lambda)\n      |\n      v\n  (failed too many times)\n      |\n      v\n[ Dead-Letter Queue ]",
    architectureCaption:
      "Producers and consumers never call each other directly — SQS sits in between as a durable buffer, with a DLQ catching messages that repeatedly fail.",
    mentorTip:
      "Whenever an exam question says \"decouple,\" \"buffer requests,\" \"handle traffic spikes without losing data,\" or \"one component should not need to know about another,\" think SQS first. If the question then adds \"multiple independent systems need the same event,\" that is your cue to escalate to SNS or SNS+SQS fanout instead.",
    questionIds: ["q-amazon-sqs-1", "q-amazon-sqs-2", "q-amazon-sqs-3", "q-amazon-sqs-4", "q-amazon-sqs-5"],
  },
  {
    id: "amazon-sns",
    moduleId: "phase-6-integration",
    category: "Application Integration",
    title: "Amazon SNS",
    shortName: "SNS",
    tier: 1,
    domains: [2],
    examImportance: "critical",
    oneLiner:
      "Amazon SNS is a fully managed pub/sub messaging service that pushes one message out to many subscribers at once.",
    englishExplanation:
      "Amazon Simple Notification Service (SNS) is AWS's publish/subscribe (pub/sub) messaging service. A publisher sends a single message to an SNS \"topic,\" and SNS immediately pushes (fans out) a copy of that message to every subscriber attached to that topic — which could be SQS queues, Lambda functions, HTTP/HTTPS endpoints, email addresses, SMS numbers, or mobile push notifications. This is fundamentally different from SQS: SQS is one queue that one or more competing consumers pull from (only one consumer ends up processing each message), while SNS pushes the same message to every subscriber independently.\n\nThe classic exam distinction is: SQS = pull-based, one-to-one-ish queue where a message is consumed once; SNS = push-based, one-to-many topic where every subscriber gets its own copy. SNS does not store messages for polling — delivery is near-instant, and if a subscriber is not available at that moment, SNS retries delivery according to its retry policy, but it is not a durable queue the way SQS is. That is exactly why SNS is so often paired with SQS: attach SQS queues as subscribers so each downstream system gets a durable, poll-able copy of the message instead of relying purely on push delivery.",
    taglishExplanation:
      "Kung si SQS parang order-ticket rack na isa-isang kinukuha ng cooks, si SNS naman parang isang announcement sa PA system ng buong restaurant. Minsan lang mag-a-announce ang manager (publisher) sa topic, pero LAHAT ng nakikinig — kitchen, cashier, bouncer, delivery rider — sabay-sabay nakakarinig ng parehong announcement. Hindi sila nag-a-uunahan kung sino makakakuha, dahil bawat isa may sariling kopya. Iba ito sa SQS kung saan iisa lang ang kukuha ng ticket.",
    analogy:
      "SNS is like a restaurant's PA system announcement versus SQS's order-ticket rack. When the manager announces \"table 5 needs a refill\" over the PA (publishes to an SNS topic), every staff member listening (every subscriber) hears it at the same time and gets their own copy of the message — the waiter, the busser, and the manager's log all react independently. Compare that to the order-ticket rack (SQS), where only one cook ends up taking and cooking any single ticket.",
    whyItExists:
      "SNS exists because many real systems need to notify multiple, independent downstream systems about the same event without the publisher knowing or caring who is listening. Without pub/sub, the publisher would need to know every subscriber's address and call each one directly, and adding a new subscriber would mean changing the publisher's code — exactly the tight coupling that event-driven architecture tries to avoid.",
    flow: "Publisher -> SNS Topic -> fanned out to multiple Subscribers (SQS queues, Lambda, email, SMS, HTTP endpoints) simultaneously",
    withoutIt: [
      "The publisher would need to know about and call every downstream subscriber directly",
      "Adding a new interested system would require changing the publisher's code",
      "You would lose the instant, push-based multi-subscriber notification behavior and have to poll multiple places",
    ],
    bestUseCases: [
      "Sending the same event to multiple independent systems at once (fanout)",
      "Application alerts and operational notifications (e.g., CloudWatch alarms to email/SMS/Lambda)",
      "Mobile push notifications to iOS/Android devices",
      "Triggering multiple Lambda functions or SQS queues from a single business event",
    ],
    poorUseCases: [
      "A single consumer that needs to reliably pull and retry work at its own pace — use SQS instead",
      "Complex, content-based routing across many different event sources — EventBridge fits better",
      "Cases needing guaranteed durable storage of the message until explicitly processed — pair SNS with SQS instead of relying on SNS alone",
    ],
    alternatives: [
      { need: "One consumer pulling and durably storing work items", choose: "Amazon SQS" },
      { need: "Content-based routing from many AWS/SaaS event sources", choose: "Amazon EventBridge" },
      { need: "Fan out one event to several durable, independently-processed queues", choose: "SNS + SQS Fanout Pattern" },
    ],
    keyFeatures: [
      "Topics: the named channel that publishers send to and subscribers attach to",
      "Multiple subscriber protocols: SQS, Lambda, HTTP/HTTPS, email, SMS, mobile push",
      "Fanout: one publish reaches every current subscriber, each getting an independent copy",
      "Message filtering: subscribers can set filter policies so they only receive messages matching certain attributes",
      "At-least-once delivery with automatic retries per subscriber protocol",
    ],
    availability:
      "SNS is a fully managed, highly available regional service — AWS operates the topic infrastructure across multiple Availability Zones, so there is no broker or server for you to size or fail over.",
    security:
      "Topic access is controlled by IAM policies and topic (resource-based) access policies, useful for cross-account publishing or subscribing. Messages can be encrypted at rest using KMS, and delivery to HTTPS endpoints is encrypted in transit.",
    pricingLogic:
      "You pay per message published and per delivery/notification sent, with different rates depending on the subscriber protocol (e.g., SMS and mobile push are priced differently from SQS/Lambda deliveries). There is no charge for idle topics.",
    examKeywords: [
      "pub/sub",
      "publish/subscribe",
      "topic",
      "fanout",
      "push-based",
      "one-to-many",
      "notification",
    ],
    examTraps: [
      "SNS pushes messages out; it does not let subscribers poll for messages the way SQS does.",
      "SNS alone is not a durable queue — if you need guaranteed processing with retries per consumer, fan out to SQS queues, not raw HTTP endpoints.",
      "Do not confuse SNS (one-to-many fanout) with SQS (queue consumed once) when a question mentions \"multiple systems need to react to the same event.\"",
    ],
    architectureDiagram:
      "Publisher\n    |\n    v\n[ SNS Topic ]\n  /   |    \\\n SQS  Lambda  Email/SMS\n(sub) (sub)   (sub)",
    architectureCaption:
      "One publish to an SNS topic fans out independently to every subscriber — each protocol receives its own copy of the message.",
    mentorTip:
      "If the question says \"notify multiple systems/teams at the same time\" or \"one event, many independent reactions,\" that is SNS. If it also says \"and each of those systems must not lose the message even if it's briefly down,\" that is your cue for the SNS+SQS fanout pattern.",
    questionIds: ["q-amazon-sns-1", "q-amazon-sns-2", "q-amazon-sns-3", "q-amazon-sns-4", "q-amazon-sns-5"],
  },
  {
    id: "sns-sqs-fanout",
    moduleId: "phase-6-integration",
    category: "Application Integration",
    title: "SNS + SQS Fanout Pattern",
    shortName: "SNS+SQS Fanout",
    tier: 1,
    domains: [2],
    examImportance: "critical",
    oneLiner:
      "The fanout pattern publishes one event to an SNS topic which pushes durable copies into multiple SQS queues, so many independent teams can each process the same event at their own pace.",
    englishExplanation:
      "The SNS+SQS fanout pattern combines the two services to get the best of both: SNS's one-to-many push distribution, and SQS's durable, poll-based, retryable processing. A publisher sends one event to an SNS topic. Instead of subscribing Lambda functions or HTTP endpoints directly, you subscribe multiple SQS queues to that topic — for example, a Billing queue, an Inventory queue, and an Analytics queue. SNS delivers an independent copy of the event into each queue, and each downstream team then consumes their own queue on their own schedule, with their own retry and dead-letter-queue behavior, completely isolated from the other teams.\n\nThe key benefit over just sending the event to multiple queues directly from the publisher is decoupling of the publisher from the number and identity of subscribers. If a new team (say, Fraud Detection) needs the same event tomorrow, you just subscribe a new SQS queue to the existing topic — zero changes to the publisher's code. Without fanout, the publisher would need to know about and explicitly send to every queue, and adding a consumer would mean modifying the producer.",
    taglishExplanation:
      "Isipin mo bagong branch manager na kailangan malaman din ang bawat customer order — hindi na kailangan baguhin ang code ng cashier system. Sa fanout pattern, isang beses lang mag-publish ang event sa SNS topic, tapos automatic na pumupunta ito sa maraming SQS queues (Billing, Inventory, Analytics) na parang magkakahiwalay na inbox ng bawat department. Bawat department kinukuha at pinoproseso ang sarili nilang kopya sa sarili nilang bilis, walang epekto sa iba kung may nag-lag o nag-fail. Kung magdadagdag ka ng bagong department bukas, dadagdag ka lang ng bagong queue sa topic — hindi mo na kailangan galawin ang orihinal na publisher.",
    analogy:
      "Think of a restaurant head office announcing a new promo (one publish to an SNS topic). Instead of shouting it once and hoping every branch hears it clearly (unreliable push only), the head office also drops a written memo into each branch's own mailbox (SQS queue subscribed to the topic). Each branch manager reads their memo whenever they get to it, and if one branch is closed for the day, their memo just waits safely in their mailbox — it does not get lost, and it does not block any other branch.",
    whyItExists:
      "Fanout exists to solve the problem where several independent systems all need to react to the same business event, but pushing directly to fragile endpoints (like raw HTTP) risks losing the event if a subscriber is briefly down, and hardcoding queue destinations in the publisher creates tight coupling. By combining SNS's broadcast with SQS's durability, each subscriber gets a private, durable, retryable copy of every event.",
    flow: "Publisher -> SNS Topic -> [SQS Billing Queue, SQS Inventory Queue, SQS Analytics Queue] -> each consumed independently by its own service",
    withoutIt: [
      "The publisher would need to know every destination queue and explicitly send to each one",
      "Adding or removing a downstream consumer would require changing the publisher's code",
      "A subscriber that is temporarily down could miss the event entirely if delivered only via direct push",
    ],
    bestUseCases: [
      "One business event (e.g., \"order placed\") that multiple independent teams/services must process (billing, inventory, analytics, notifications)",
      "Systems that need to add new consumers over time without touching the original publisher",
      "Workloads where each consumer needs its own durable retry/DLQ behavior, isolated from other consumers",
    ],
    poorUseCases: [
      "A single downstream consumer with no fanout need — plain SQS is simpler",
      "Cases needing complex conditional routing logic based on event content across many unrelated sources — consider EventBridge rules instead",
    ],
    alternatives: [
      { need: "Only one consumer needs the event", choose: "Amazon SQS alone" },
      { need: "Complex content-based routing across many AWS/SaaS sources", choose: "Amazon EventBridge" },
      { need: "Push notifications directly to end users/devices with no need for durability", choose: "Amazon SNS alone" },
    ],
    keyFeatures: [
      "One SNS publish, many SQS subscribers, each getting an independent durable copy",
      "Each SQS queue can have its own visibility timeout, retry behavior, and dead-letter queue",
      "New consumers can subscribe to the topic without any change to the publisher",
      "SNS message filtering lets each subscribed queue receive only the subset of messages it cares about",
    ],
    availability:
      "Both SNS and SQS are regional, fully managed, multi-AZ services, so the fanout pattern inherits high availability from both without any additional infrastructure to manage.",
    security:
      "The SNS topic's access policy must explicitly allow SNS to send messages into each subscribed SQS queue (via the queue's access policy), in addition to standard IAM permissions for publishers and consumers. Encryption in transit and at rest (KMS) applies to both the topic and each queue independently.",
    pricingLogic:
      "You pay SNS's per-publish/per-delivery cost for the fanout to each queue, plus SQS's per-request cost for each queue's consumers polling and deleting messages — so cost scales with both the number of subscribers and the message volume.",
    examKeywords: [
      "fanout",
      "SNS to SQS",
      "one event, multiple queues",
      "decoupled multi-consumer",
      "durable multi-subscriber",
    ],
    examTraps: [
      "Sending the same event directly to multiple SQS queues from the publisher works but tightly couples the publisher to every consumer — the exam usually wants you to recognize SNS+SQS fanout as the better-decoupled answer.",
      "Don't forget the SQS queue's access policy must allow the SNS topic to send to it, or fanout delivery silently fails.",
      "Fanout is about durability per consumer — if the question only needs a quick push notification, plain SNS may be sufficient without SQS.",
    ],
    architectureDiagram:
      "Publisher\n    |\n    v\n[ SNS Topic ]\n  /    |     \\\nSQS   SQS    SQS\n(Bill)(Inv) (Analytics)\n  |     |      |\n Consumer Consumer Consumer",
    architectureCaption:
      "One publish fans out through SNS into three independent SQS queues, each consumed and retried on its own by a different downstream service.",
    mentorTip:
      "Exam pattern: scenario mentions ONE event that MULTIPLE independent backend systems must each durably process, possibly at different speeds. That combination — one-to-many AND durable/retryable — is the fingerprint of SNS+SQS fanout, not SNS alone and not SQS alone.",
    questionIds: ["q-sns-sqs-fanout-1", "q-sns-sqs-fanout-2", "q-sns-sqs-fanout-3", "q-sns-sqs-fanout-4", "q-sns-sqs-fanout-5"],
  },
  {
    id: "amazon-eventbridge",
    moduleId: "phase-6-integration",
    category: "Application Integration",
    title: "Amazon EventBridge",
    shortName: "EventBridge",
    tier: 1,
    domains: [2],
    examImportance: "critical",
    oneLiner:
      "Amazon EventBridge is a serverless event bus that routes events from AWS services, SaaS applications, and your own code to the right targets based on rules.",
    englishExplanation:
      "Amazon EventBridge is an event bus service: it receives events (from AWS services, from SaaS partners like Zendesk or Datadog, or from your own applications) onto an \"event bus,\" and then evaluates rules against each event to decide which targets should receive it. A rule can match on event pattern (e.g., \"any EC2 instance state-change event where the state is 'terminated'\") and route matching events to one or more targets — Lambda functions, SQS queues, SNS topics, Step Functions state machines, and dozens of other AWS services.\n\nCompared to SNS, EventBridge is built for content-based routing from a much wider variety of sources, including native integrations with many AWS services (so you do not need to write code to detect an EC2 state change, for example — AWS emits the event automatically) and hundreds of SaaS partner event sources. SNS is a simple broadcast to whoever subscribed to a topic; EventBridge is a smarter router that inspects the event content itself and sends only the events matching each rule's pattern to that rule's targets. EventBridge also supports scheduled/cron-like rules and its own schema registry to help you understand event shapes.",
    taglishExplanation:
      "Kung si SNS parang PA system na sabay-sabay lang nagpaparinig sa lahat ng subscribers, si EventBridge naman parang isang smart na \"sorting office\" o call center dispatcher. Dumarating ang lahat ng klase ng event — mula sa AWS services mismo, sa mga SaaS apps (Zendesk, Datadog), o sa sarili mong app — tapos titignan ng EventBridge ang laman ng event bago ito ipasa sa tamang destinasyon base sa mga \"rules\" na ginawa mo. Halimbawa, \"kapag na-terminate ang isang EC2 instance, papuntahin sa Lambda na ito.\" Hindi lang basta broadcast — may pag-iisip base sa content ng event.",
    analogy:
      "EventBridge is like a smart mailroom dispatcher in a large office building, instead of a simple PA announcement (SNS). Mail (events) arrives from many different sources — internal departments, external vendors, government agencies (AWS services, your own apps, SaaS partners). The dispatcher reads each envelope's details and, based on standing rules (\"anything from Legal marked urgent goes to the General Counsel's desk\"), routes it to the exact right recipient — instead of copying every piece of mail to everyone in the building.",
    whyItExists:
      "EventBridge exists because modern architectures need to react to events from an enormous variety of sources — not just your own code, but AWS service state changes and third-party SaaS tools — and simple broadcast (SNS) does not scale well when you need fine-grained, content-based routing across many different event shapes and destinations. EventBridge centralizes that routing logic into declarative rules instead of hardcoded application code.",
    flow: "Event source (AWS service / SaaS app / custom app) -> Event Bus -> Rule (pattern match) -> Target (Lambda, SQS, SNS, Step Functions, ...)",
    withoutIt: [
      "You would need to write custom polling or webhook code to detect AWS service state changes",
      "Routing logic based on event content would have to live inside application code instead of declarative rules",
      "Integrating each new SaaS event source would require custom, one-off integration work",
    ],
    bestUseCases: [
      "Reacting to AWS service events natively (e.g., EC2 state changes, CodePipeline stage changes) without custom polling",
      "Ingesting and routing events from SaaS partners without writing custom integration code",
      "Building decoupled, event-driven architectures where different event types need to go to different targets",
      "Scheduled/cron-like triggering of Lambda or other targets",
      "Central event bus across multiple accounts or applications",
    ],
    poorUseCases: [
      "Simple, single-purpose one-to-many broadcast with no need for content-based routing — plain SNS is simpler",
      "Pure work-queue distribution to a pool of workers with no routing logic — plain SQS fits better",
    ],
    alternatives: [
      { need: "Simple one-to-many broadcast to a fixed set of subscribers", choose: "Amazon SNS" },
      { need: "Durable work queue for one consumer group", choose: "Amazon SQS" },
      { need: "Multi-step orchestration with retries and branching after the event is received", choose: "AWS Step Functions" },
    ],
    keyFeatures: [
      "Event buses: default bus (AWS service events), custom buses (your own apps), and partner buses (SaaS integrations)",
      "Rules with event pattern matching to filter which events go to which targets",
      "Native integration with many AWS services that emit events automatically, no custom code required",
      "Schedule expressions for cron-like, time-based triggering",
      "Schema registry to discover and validate the shape of events",
      "Can route to numerous target types: Lambda, SQS, SNS, Step Functions, and more",
    ],
    availability:
      "EventBridge is a fully managed, serverless, highly available service operated across multiple Availability Zones in a Region — there is no broker or bus infrastructure for you to provision or scale.",
    security:
      "Resource-based policies on event buses control which accounts or services can put events onto the bus, alongside standard IAM permissions for publishing events and managing rules. Cross-account event routing is supported through bus policies.",
    pricingLogic:
      "You are charged per event published to a custom or partner event bus (events on the default AWS service bus are typically free), plus applicable costs for the targets invoked. There is no charge for idle rules with no matching events.",
    examKeywords: [
      "event bus",
      "rule",
      "event pattern",
      "SaaS integration",
      "content-based routing",
      "event-driven architecture",
      "schedule expression",
    ],
    examTraps: [
      "Do not pick EventBridge just because the word \"event\" appears — if the scenario is a simple one-to-many broadcast with no content-based routing, SNS may be the simpler, correct answer.",
      "EventBridge is not a queue — it does not hold messages for polling the way SQS does; it routes and forwards based on rules.",
      "\"Native AWS service events\" or \"SaaS partner events\" in a scenario is a strong signal for EventBridge over SNS.",
    ],
    architectureDiagram:
      "AWS Service Event   SaaS Event   Custom App Event\n        \\                |               /\n         \\               |              /\n              [ EventBridge Event Bus ]\n              /          |          \\\n         Rule A       Rule B       Rule C\n           |             |            |\n        Lambda      SQS Queue   Step Functions",
    architectureCaption:
      "EventBridge ingests events from many sources onto a bus, then routes each event to the right target based on matching rules.",
    mentorTip:
      "If a scenario mentions reacting to native AWS service changes, integrating a SaaS tool's events, or routing different event types to different destinations based on content, that is EventBridge. If it is just \"notify everyone subscribed,\" that is SNS.",
    questionIds: ["q-amazon-eventbridge-1", "q-amazon-eventbridge-2", "q-amazon-eventbridge-3", "q-amazon-eventbridge-4", "q-amazon-eventbridge-5"],
  },
  {
    id: "aws-step-functions",
    moduleId: "phase-6-integration",
    category: "Application Integration",
    title: "AWS Step Functions",
    shortName: "Step Functions",
    tier: 1,
    domains: [2],
    examImportance: "critical",
    oneLiner:
      "AWS Step Functions orchestrates multiple steps (including Lambda functions and other AWS services) into a visual, reliable workflow with built-in retries, branching, and waiting.",
    englishExplanation:
      "AWS Step Functions lets you define a workflow, called a state machine, as a sequence of steps (\"states\") using a declarative language (Amazon States Language, JSON-based). Each state can invoke a Lambda function, call another AWS service directly, run steps in parallel, wait for a period of time or an external signal, make a decision (a \"Choice\" state that branches based on input), or handle errors and retries — all without you writing the glue code that stitches these steps together.\n\nThe core value is orchestration: instead of one big Lambda function trying to call several other services in sequence and manually handling every failure, retry, and timeout, Step Functions manages state, sequencing, retries (with backoff), and error handling declaratively, and gives you a visual diagram of exactly where an execution is or where it failed. This makes it far easier to build and debug multi-step business processes (like an order fulfillment pipeline: validate payment, reserve inventory, ship, notify) than chaining services together with custom code.",
    taglishExplanation:
      "Isipin mo si Step Functions parang isang flowchart na buhay — hindi lang guide kung paano dapat umandar ang proseso, kundi siya mismo ang nagpapatakbo nito. Halimbawa sa order fulfillment: i-validate muna ang payment, tapos i-reserve ang stock, tapos ipadala, tapos i-notify ang customer. Kung may mabigo sa gitna, may built-in retry logic na — hindi mo na kailangan isulat manually. Puwede rin siyang mag-branch (\"kung out of stock, gawin ito; kung meron, gawin iyon\") o mag-parallel (dalawang bagay sabay-sabay), tapos makikita mo pa visually kung saan na-stuck ang proseso.",
    analogy:
      "Step Functions is like a restaurant's kitchen expediter who holds the master ticket for a whole multi-course order and coordinates every station — appetizer station, grill, dessert — telling each one when to start, waiting for one to finish before triggering the next, retrying a station if a dish comes back wrong, and escalating to the manager if something fails repeatedly. The expediter does not cook anything personally (that is what Lambda/other services do); their job is purely to sequence, branch, retry, and track the overall order from start to finish.",
    whyItExists:
      "Step Functions exists because coordinating multiple services or Lambda functions into a reliable multi-step process is hard to do correctly by hand — you need retries with backoff, timeout handling, parallel execution, conditional branching, and visibility into where a long-running process currently is. Doing this inside application code (e.g., one giant Lambda calling other Lambdas) becomes fragile, hard to debug, and hard to change safely.",
    flow: "Trigger (API call/event) -> Step Functions State Machine -> Task states (Lambda/service calls) -> Choice/Parallel/Wait states -> completion or catch/retry on error",
    withoutIt: [
      "You would hand-write sequencing, retry, and error-handling logic inside application code, spread across multiple functions",
      "Debugging a failed multi-step process would mean digging through logs instead of viewing a visual execution graph",
      "Coordinating parallel branches or long waits reliably would require custom state-tracking (e.g., a database table just to track progress)",
    ],
    bestUseCases: [
      "Multi-step business workflows: order processing, data processing pipelines, approval workflows",
      "Coordinating multiple Lambda functions or AWS service calls in a defined sequence",
      "Workflows needing built-in retry/backoff and structured error handling",
      "Processes with parallel branches, conditional logic, or long human-in-the-loop waits",
      "Orchestrating long-running processes beyond a single Lambda's execution time limit",
    ],
    poorUseCases: [
      "A single, simple, stateless function call with no sequencing or branching needs — a plain Lambda invocation is simpler",
      "High-throughput, low-latency, per-message processing where orchestration overhead is unnecessary — SQS+Lambda may fit better",
    ],
    alternatives: [
      { need: "A single stateless function, no orchestration needed", choose: "AWS Lambda alone" },
      { need: "Simple decoupled point-to-point messaging", choose: "Amazon SQS" },
      { need: "Event routing rather than multi-step orchestration", choose: "Amazon EventBridge" },
    ],
    keyFeatures: [
      "Amazon States Language (JSON) to declaratively define state machines",
      "Task, Choice, Parallel, Wait, Map, Succeed, and Fail state types",
      "Built-in retry and catch behavior per state, with configurable backoff",
      "Visual console showing exactly which state an execution is in or where it failed",
      "Standard workflows (long-running, exactly-once semantics) and Express workflows (high-volume, shorter, at-least-once)",
      "Direct integrations with many AWS services beyond just Lambda",
    ],
    availability:
      "Step Functions is a fully managed, serverless orchestration service that runs across multiple Availability Zones in a Region without you managing any servers or clusters.",
    security:
      "Step Functions uses an IAM role to assume the permissions it needs to invoke Lambda functions and other AWS services on your behalf; access to start or view executions is controlled through IAM policies on the Step Functions API itself.",
    pricingLogic:
      "Standard workflows are billed per state transition; Express workflows are billed by number of requests and duration, similar to Lambda — making Express more cost-effective for high-volume, short-duration workloads and Standard better suited for long-running, auditable workflows.",
    examKeywords: [
      "orchestration",
      "state machine",
      "workflow",
      "Choice state",
      "retry and error handling",
      "visual workflow",
      "coordinate Lambda functions",
    ],
    examTraps: [
      "Step Functions orchestrates other services — it is not itself a queue or event bus, so do not confuse it with SQS/SNS/EventBridge when the scenario is really about sequencing, not just message delivery.",
      "\"Multiple steps that must happen in a specific order, with retries and visibility into failures\" is the Step Functions fingerprint — a single Lambda chaining calls internally is the anti-pattern the exam wants you to avoid.",
      "Standard vs Express workflow choice matters for cost and semantics — long/auditable workflows lean Standard, high-volume/short lean Express.",
    ],
    architectureDiagram:
      "Trigger\n  |\n  v\n[ Step Functions State Machine ]\n  |-> Task: Validate Payment (Lambda)\n  |-> Choice: In stock?\n  |     |-> Yes -> Task: Reserve Inventory\n  |     |-> No  -> Task: Notify Backorder\n  |-> Parallel: Ship + Send Receipt\n  |-> Succeed",
    architectureCaption:
      "Step Functions coordinates each step of a business process — including branching and parallel work — while handling retries and failures declaratively.",
    mentorTip:
      "When a scenario describes several ordered steps calling different services, needing retries, branching logic, or visibility into a long-running process, pick Step Functions. If it is just \"deliver this one message somewhere reliably,\" that is SQS/SNS/EventBridge territory instead.",
    questionIds: ["q-aws-step-functions-1", "q-aws-step-functions-2", "q-aws-step-functions-3", "q-aws-step-functions-4", "q-aws-step-functions-5"],
  },
  {
    id: "amazon-mq",
    moduleId: "phase-6-integration",
    category: "Application Integration",
    title: "Amazon MQ",
    shortName: "Amazon MQ",
    tier: 2,
    domains: [2],
    examImportance: "medium",
    oneLiner:
      "Amazon MQ is a managed message broker service that is compatible with industry-standard protocols like ActiveMQ and RabbitMQ, mainly for migrating existing applications.",
    englishExplanation:
      "Amazon MQ is a managed message broker service supporting Apache ActiveMQ and RabbitMQ engines, along with standard messaging protocols such as JMS, AMQP, MQTT, and STOMP. Unlike SQS and SNS, which use AWS's own proprietary APIs, Amazon MQ speaks the same protocols and APIs that traditional on-premises message brokers already use.\n\nThe main reason Amazon MQ exists is migration: if a company already has an application built against ActiveMQ or RabbitMQ, rewriting it to use SQS/SNS APIs could mean significant code changes. Amazon MQ lets them move that broker to AWS (fully managed, patched, and made highly available by AWS) with little to no application code changes. For brand-new, cloud-native applications with no existing broker dependency, SQS and SNS are generally preferred because they are simpler, more scalable, and have a serverless pricing model.",
    taglishExplanation:
      "Si Amazon MQ ay para sa mga kumpanyang meron nang existing system na gumagamit ng ActiveMQ o RabbitMQ dati sa on-premises, tapos gusto na nilang lumipat sa AWS pero ayaw na nilang i-rewrite lahat ng code nila. Halimbawa, kung ang app mo ay nag-uusap gamit ang JMS o AMQP protocol, puwede mong ilipat yun sa Amazon MQ nang halos walang major code change — parang \"lift and shift\" para sa message broker. Kung bagong project naman at wala kang legacy broker, mas maganda pa rin gamitin ang SQS/SNS dahil mas simple at mas scalable.",
    analogy:
      "Amazon MQ is like moving your entire existing kitchen equipment (from a specific well-known brand your chefs are already trained on) into a new AWS-managed building, instead of forcing your chefs to learn a completely different set of equipment (SQS/SNS's own API) from scratch. It is the migration-friendly option — you get a managed, highly available version of the exact broker technology you already use.",
    whyItExists:
      "Amazon MQ exists because many enterprises have years of investment in applications built on standard messaging protocols and specific broker software, and rewriting all of that to use AWS-native SQS/SNS APIs would be costly and risky. Amazon MQ removes the operational burden of running, patching, and scaling that broker yourself while preserving compatibility with the existing application code.",
    flow: "Existing on-prem app (using JMS/AMQP/MQTT) -> migrated with minimal code change -> Amazon MQ broker (ActiveMQ/RabbitMQ engine) on AWS",
    withoutIt: [
      "You would need to self-host and operate ActiveMQ/RabbitMQ on EC2, handling patching, scaling, and failover yourself",
      "Migrating to AWS-native SQS/SNS could require significant application rewrites for protocol-dependent code",
    ],
    bestUseCases: [
      "Migrating an existing application that already uses ActiveMQ, RabbitMQ, JMS, AMQP, MQTT, or STOMP",
      "Scenarios explicitly requiring broker protocol compatibility rather than AWS-native APIs",
      "Reducing operational overhead of a self-managed broker without rewriting the application",
    ],
    poorUseCases: [
      "New, cloud-native applications with no existing broker dependency — SQS/SNS are simpler and more scalable",
      "Extremely high-throughput, serverless-first workloads where AWS-native scaling behavior is preferred",
    ],
    alternatives: [
      { need: "New cloud-native app, no legacy protocol dependency", choose: "Amazon SQS / Amazon SNS" },
      { need: "Event routing across many sources", choose: "Amazon EventBridge" },
    ],
    keyFeatures: [
      "Supports ActiveMQ and RabbitMQ broker engines",
      "Compatible with JMS, AMQP, MQTT, STOMP, and WebSocket protocols",
      "Managed patching, high availability (active/standby across AZs), and automated backups",
      "Single-instance or highly available multi-AZ broker deployment options",
    ],
    availability:
      "Amazon MQ can be deployed as a single-instance broker or, for high availability, as an active/standby pair across two Availability Zones with automatic failover — you choose based on the workload's tolerance for downtime.",
    security:
      "Access is controlled through broker users/credentials plus network placement in a VPC with security groups; encryption at rest (KMS) and in transit (TLS) are supported.",
    pricingLogic:
      "You pay for the broker instance size/type and hours it runs, plus storage, similar to a managed database — this is different from SQS/SNS's pure pay-per-request serverless model, since Amazon MQ runs on provisioned broker instances.",
    examKeywords: [
      "ActiveMQ",
      "RabbitMQ",
      "managed message broker",
      "migration",
      "JMS / AMQP / MQTT",
    ],
    examTraps: [
      "If the scenario mentions an existing app already using ActiveMQ/RabbitMQ and wanting minimal code changes, that is Amazon MQ, not SQS — SQS/SNS require using AWS's own API, not standard broker protocols.",
      "Amazon MQ runs on provisioned broker instances, so it does not scale as elastically or as cheaply as the fully serverless SQS/SNS for brand-new workloads.",
    ],
    architectureDiagram:
      "Existing App (JMS/AMQP client)\n      |\n      v\n[ Amazon MQ Broker ] (ActiveMQ or RabbitMQ engine)\n      |\n      v\nConsumer App (same protocol, minimal changes)",
    architectureCaption:
      "Amazon MQ preserves the existing broker protocol so a migrating application needs little to no code change.",
    mentorTip:
      "Keyword trigger: \"existing application already uses ActiveMQ/RabbitMQ/JMS\" plus \"minimize code changes\" almost always means Amazon MQ over SQS/SNS.",
    questionIds: ["q-amazon-mq-1", "q-amazon-mq-2", "q-amazon-mq-3"],
  },
  {
    id: "amazon-appflow",
    moduleId: "phase-6-integration",
    category: "Application Integration",
    title: "Amazon AppFlow",
    shortName: "AppFlow",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon AppFlow is a managed service that transfers data between AWS services and SaaS applications (like Salesforce or Slack) without writing custom integration code.",
    englishExplanation:
      "Amazon AppFlow lets you create a \"flow\" that moves data between AWS (e.g., S3, Redshift) and popular SaaS applications (e.g., Salesforce, Slack, ServiceNow, Zendesk) on a schedule, on-demand, or triggered by an event — without writing or maintaining custom API integration code. It handles authentication, pagination, and format conversion for each supported SaaS connector, and can optionally transform or filter data as it flows.",
    taglishExplanation:
      "Si AppFlow ay parang \"ready-made bridge\" sa pagitan ng AWS at mga SaaS tools tulad ng Salesforce o Slack — hindi mo na kailangan magsulat ng sariling integration code para kunin o ipadala ang data pabalik-balik. Halimbawa, gusto mong i-sync ang Salesforce leads papunta sa S3 kada oras — puwede mong i-set up sa AppFlow nang walang custom code, kesa mag-build ka pa ng sariling API integration.",
    analogy:
      "AppFlow is like a pre-built courier service between your restaurant chain's head office (AWS) and outside partner vendors (SaaS apps like Salesforce) — instead of your staff manually driving documents back and forth or building a custom delivery system, you just schedule pickups and drop-offs, and the courier handles the route, paperwork, and format conversion.",
    whyItExists:
      "AppFlow exists because integrating with each SaaS application's own API (authentication, pagination, rate limits, data formats) is repetitive, error-prone custom work that many teams end up rebuilding for every project — AppFlow provides pre-built, managed connectors so teams can focus on using the data, not moving it.",
    flow: "SaaS app (e.g., Salesforce) -> AppFlow Flow (scheduled/on-demand/event-triggered) -> AWS destination (S3, Redshift, etc.) or reverse direction",
    withoutIt: [
      "You would need to build and maintain custom API integration code for each SaaS application",
      "You would have to handle authentication, pagination, and data format conversion manually",
    ],
    bestUseCases: [
      "Syncing SaaS application data (Salesforce, Slack, ServiceNow) into AWS for analytics or storage without custom code",
      "Sending processed AWS data back out to a SaaS application",
    ],
    poorUseCases: [
      "Integrations with SaaS applications that AppFlow does not have a pre-built connector for",
      "Low-level, highly custom transformation logic beyond what AppFlow's built-in mapping supports",
    ],
    alternatives: [
      { need: "Custom event routing across many AWS/SaaS sources", choose: "Amazon EventBridge" },
      { need: "Fully custom integration logic not covered by a pre-built connector", choose: "AWS Lambda with custom API calls" },
    ],
    keyFeatures: [
      "Pre-built connectors for popular SaaS applications and AWS services",
      "Scheduled, on-demand, or event-triggered data flows",
      "Built-in data transformation, filtering, and validation options",
    ],
    availability:
      "AppFlow is a fully managed, serverless service — AWS operates the underlying infrastructure for running flows, so there are no servers for you to provision.",
    security:
      "Connections to SaaS applications are authenticated and stored securely, and data in transit is encrypted; AppFlow can also integrate with PrivateLink for private connectivity to certain destinations.",
    pricingLogic:
      "You are charged per flow run based on the volume of data processed, so cost scales with how much data you move rather than any provisioned capacity.",
    examKeywords: [
      "SaaS integration",
      "no custom integration code",
      "Salesforce/Slack/ServiceNow",
      "data flow",
    ],
    examTraps: [
      "Do not confuse AppFlow (SaaS-to-AWS data transfer) with EventBridge (event routing) — AppFlow is about moving bulk data on a schedule/trigger, not routing individual events by rule.",
      "If the scenario explicitly names a supported SaaS app and says \"without writing custom integration code,\" that phrase points to AppFlow.",
    ],
    architectureDiagram:
      "Salesforce (SaaS)\n      |\n      v\n[ Amazon AppFlow Flow ]\n      |\n      v\nAmazon S3 / Redshift",
    architectureCaption:
      "AppFlow moves data between a SaaS application and AWS storage/analytics services using a pre-built, managed connector.",
    mentorTip:
      "Recognition-level only: see \"Salesforce,\" \"Slack,\" \"ServiceNow,\" or similar SaaS names plus \"move data into S3/Redshift without custom code,\" and pick AppFlow.",
    questionIds: ["q-amazon-appflow-1", "q-amazon-appflow-2", "q-amazon-appflow-3"],
  },
];
