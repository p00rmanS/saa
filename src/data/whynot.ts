import type { WhyNotScenario } from "@/lib/types";

export const whyNotScenarios: WhyNotScenario[] = [
  {
    id: "shared-linux-filesystem",
    scenario: "Multiple EC2 instances need shared Linux file storage, accessed simultaneously by all of them.",
    choices: ["Amazon EBS", "Amazon EFS", "Amazon S3", "Instance store"],
    correctChoice: "Amazon EFS",
    reasoning: {
      "Amazon EBS": "Wrong — EBS attaches to only one instance at a time (with rare multi-attach exceptions for specific use cases). It cannot serve as general shared storage for many instances writing simultaneously.",
      "Amazon EFS": "Correct — EFS is a POSIX-compliant, elastic file system designed to be mounted by many Linux instances at once.",
      "Amazon S3": "Wrong — S3 is object storage accessed via API, not a mounted POSIX-style file system that applications can read/write to like a local directory.",
      "Instance store": "Wrong — instance store is temporary, local-only storage tied to a single instance's lifecycle, and is lost on stop/termination.",
    },
  },
  {
    id: "static-ip-load-balancer",
    scenario: "A partner's firewall requires allow-listing a fixed IP address per Availability Zone for your load balancer.",
    choices: ["Application Load Balancer", "Network Load Balancer", "Classic Load Balancer", "Gateway Load Balancer"],
    correctChoice: "Network Load Balancer",
    reasoning: {
      "Application Load Balancer": "Wrong — ALB only exposes a DNS name; it does not provide a static IP per AZ.",
      "Network Load Balancer": "Correct — NLB supports a static (or Elastic) IP address per Availability Zone.",
      "Classic Load Balancer": "Wrong — CLB also does not provide static IPs, and is a legacy option in general.",
      "Gateway Load Balancer": "Wrong — GWLB is designed for transparent appliance insertion, not for exposing a static IP to normal clients.",
    },
  },
  {
    id: "read-heavy-database-scaling",
    scenario: "An RDS database is being overwhelmed by read traffic from a reporting dashboard, and the team needs to scale reads without affecting write performance.",
    choices: ["Enable Multi-AZ", "Add Read Replicas", "Increase the primary instance's storage size", "Disable automated backups"],
    correctChoice: "Add Read Replicas",
    reasoning: {
      "Enable Multi-AZ": "Wrong — Multi-AZ is for availability/failover, not read scaling. The standby isn't directly queryable.",
      "Add Read Replicas": "Correct — Read Replicas offload read traffic to independently queryable copies, exactly addressing this bottleneck.",
      "Increase the primary instance's storage size": "Wrong — storage size doesn't address read throughput bottlenecks caused by query volume.",
      "Disable automated backups": "Wrong — this reduces durability protection and does nothing to address read scaling.",
    },
  },
  {
    id: "decouple-order-intake",
    scenario: "A retailer wants their order-intake API to keep accepting orders even if the downstream inventory system is temporarily slow or unavailable.",
    choices: ["Call the inventory system synchronously with a longer timeout", "Place orders on an SQS queue for the inventory system to process asynchronously", "Increase the inventory system's EC2 instance size", "Remove the inventory system entirely"],
    correctChoice: "Place orders on an SQS queue for the inventory system to process asynchronously",
    reasoning: {
      "Call the inventory system synchronously with a longer timeout": "Wrong — a longer timeout still blocks the order-intake API when the downstream system is slow, just for longer.",
      "Place orders on an SQS queue for the inventory system to process asynchronously": "Correct — this is the textbook decoupling pattern: the API accepts the order and returns immediately, and the queue absorbs any downstream slowness.",
      "Increase the inventory system's EC2 instance size": "Wrong — a bigger instance doesn't fix a fundamentally synchronous, tightly-coupled design; it also doesn't help if the outage is unrelated to instance size.",
      "Remove the inventory system entirely": "Wrong — the requirement was to tolerate slowness, not eliminate the dependency.",
    },
  },
  {
    id: "private-traffic-must-stay-private",
    scenario: "A company requires that traffic between their on-premises data center and their EC2 workloads never traverse the public internet.",
    choices: ["Configure a Site-to-Site VPN with default routing", "Use AWS Direct Connect with a private virtual interface", "Assign public IPs to the EC2 instances and rely on security groups", "Use an Internet Gateway with a restrictive NACL"],
    correctChoice: "Use AWS Direct Connect with a private virtual interface",
    reasoning: {
      "Configure a Site-to-Site VPN with default routing": "Wrong (or at least not the strongest fit) — while encrypted, Site-to-Site VPN traffic still physically traverses the public internet, which may conflict with a strict 'never touch the public internet' requirement.",
      "Use AWS Direct Connect with a private virtual interface": "Correct — Direct Connect with a private VIF provides a dedicated, private path to your VPC that does not traverse the public internet at all.",
      "Assign public IPs to the EC2 instances and rely on security groups": "Wrong — this explicitly exposes instances to the public internet, the opposite of the requirement, security groups notwithstanding.",
      "Use an Internet Gateway with a restrictive NACL": "Wrong — any Internet Gateway path means traffic is reachable via the public internet, regardless of NACL rules layered on top.",
    },
  },
];
