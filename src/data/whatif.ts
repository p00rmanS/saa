import type { WhatIfScenario } from "@/lib/types";

export const whatIfScenarios: WhatIfScenario[] = [
  {
    id: "web-app-failure-chain",
    title: "What Happens If... (Web Application Failure Chain)",
    baseDiagram: "ALB\n |\nEC2\n |\nRDS",
    steps: [
      {
        question: "What happens if the EC2 instance fails?",
        teaches: [
          "A single instance is a single point of failure — the application goes down entirely",
          "Fix: run multiple instances behind the ALB",
          "Fix: use an Auto Scaling group so a failed instance is automatically replaced",
        ],
      },
      {
        question: "What happens if the database's Availability Zone fails?",
        teaches: [
          "Without Multi-AZ, the database becomes unavailable until manually recovered",
          "Fix: enable RDS Multi-AZ so a standby in another AZ takes over automatically",
        ],
      },
      {
        question: "What happens if the entire Region fails?",
        teaches: [
          "Multi-AZ alone does not protect against a Region-wide event",
          "Fix: adopt a disaster recovery strategy (Pilot Light, Warm Standby, or Multi-site Active-Active) in a second Region",
        ],
      },
    ],
  },
  {
    id: "traffic-spike-chain",
    title: "What Happens If... (Sudden Traffic Spike)",
    baseDiagram: "Route 53\n |\nSingle EC2 Instance (fixed size)",
    steps: [
      {
        question: "What happens if traffic suddenly triples overnight?",
        teaches: [
          "A single fixed-size instance becomes overloaded — latency spikes, requests start failing",
          "Fix: add a load balancer and an Auto Scaling group so capacity grows with demand",
        ],
      },
      {
        question: "What happens if the spike is a predictable daily pattern instead?",
        teaches: [
          "Reactive scaling alone may lag slightly behind a sharp, predictable spike",
          "Fix: add scheduled scaling to pre-warm capacity just before the known spike, combined with target tracking for anything unexpected",
        ],
      },
    ],
  },
  {
    id: "queue-consumer-failure-chain",
    title: "What Happens If... (A Queue Consumer Fails)",
    baseDiagram: "Producer\n |\nSQS Queue\n |\nWorker (consumer)",
    steps: [
      {
        question: "What happens if the worker crashes while processing a message?",
        teaches: [
          "Because the message was never deleted, it becomes visible again after the visibility timeout expires and another worker picks it up",
          "This is why SQS is naturally resilient to a single worker failure",
        ],
      },
      {
        question: "What happens if a message keeps failing processing over and over?",
        teaches: [
          "Without a dead-letter queue, it would be retried indefinitely, potentially blocking visibility into a real problem",
          "Fix: configure a dead-letter queue with a maxReceiveCount so repeatedly-failing messages are set aside for investigation",
        ],
      },
    ],
  },
];
