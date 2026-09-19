import type { Lesson } from "@/lib/types";

export const miscLessons: Lesson[] = [
  {
    id: "high-availability",
    moduleId: "phase-12-resilience",
    category: "Resilience",
    title: "High Availability",
    shortName: "HA",
    tier: 1,
    domains: [2],
    examImportance: "critical",
    oneLiner:
      "High Availability (HA) is an architecture goal: keep a system usable and minimize downtime by removing single points of failure, so that when something breaks, the system recovers quickly with little or no manual intervention.",
    englishExplanation:
      "High Availability is not a single AWS service — it is a design principle you apply across your architecture. The core idea is redundancy: if one component can fail, you run more than one of it, in more than one location, so that a failure in one place does not take down the whole system. The three levels you constantly weigh on the exam are single-AZ (everything in one Availability Zone — the cheapest but the most fragile, because a single data-center-level event takes you down), multi-AZ (resources duplicated across two or more AZs in the same Region — the standard \"production-ready\" baseline for most SAA-C03 answers), and multi-Region (full duplication across geographically separate AWS Regions — the most resilient and most expensive, protecting against a Region-wide event, which is rare but not impossible).\n\nThe guiding rule the exam wants you to internalize is \"no single point of failure.\" Any resource that exists exactly once — one EC2 instance, one NAT Gateway, one AZ's worth of subnets, one on-premises link — is a risk. Resilient AWS architectures push redundancy into every layer: an Application Load Balancer spreading traffic across EC2 instances in multiple AZs, an Auto Scaling group replacing unhealthy instances automatically, RDS Multi-AZ keeping a synchronously-replicated standby database ready to take over, Route 53 health checks routing traffic away from unhealthy endpoints, and S3/DynamoDB being multi-AZ by design out of the box.\n\nIt is important to be precise about what HA promises: it minimizes downtime and speeds up recovery, but it does not promise zero downtime. A Multi-AZ RDS failover, for example, still takes a short amount of time (the connection has to fail over to the standby) — that brief interruption is expected and acceptable under a High Availability design. AWS often expresses this idea using an SLA percentage (like \"99.9% availability\"), which represents an allowed amount of downtime per year/month, not a guarantee that nothing will ever break.\n\nOn the exam, watch for the tension between HA and cost: multi-AZ costs more than single-AZ, and multi-Region costs more than multi-AZ, because you are paying for redundant, mostly-idle capacity. Choosing the right level of HA means matching the business's actual downtime tolerance (often expressed as an RTO — see the Disaster Recovery Strategies lesson) to the appropriate architecture, not always picking the most redundant option available.",
    taglishExplanation:
      "High Availability ay hindi isang product na binibili mo sa AWS — isang paraan ito ng pag-iisip kapag nagdidisenyo ka ng system. Ang punto: kung may isang piraso na puwedeng masira (isang EC2 instance, isang AZ, isang NAT Gateway), dapat may kapalit agad na tatakbo kapag nangyari yun, kaya minimal lang ang downtime. May tatlong level: single-AZ (lahat nasa isang lokasyon lang, mura pero delikado), multi-AZ (duplicated sa dalawa o higit pang AZ sa parehong Region — ito yung \"standard\" na sagot sa exam kapag production-grade ang tanong), at multi-Region (duplicated sa magkaibang Region — pinakamatibay pero pinakamahal). Tandaan: hindi ibig sabihin ng \"highly available\" na zero downtime — puwede pa ring magkaroon ng ilang segundo o minutong pagka-antala habang nagfa-failover, basta mabilis lang bumalik. Ang exam gusto nilang alam mo ang trade-off: mas mataas na HA, mas mataas din ang gastos, kaya dapat batay sa aktwal na pangangailangan ng business ang piliin mong architecture.",
    analogy:
      "High Availability is like a house with a backup generator. When the power (an AZ) goes out, the lights flicker for a moment, the generator kicks in automatically, and life continues — there was a brief interruption, but you did not have to manually run out and fix anything, and you were never left in the dark for long. Compare that to a house with no generator at all (single-AZ): one outage, and you are stuck until the utility company personally comes to fix it.",
    whyItExists:
      "Hardware fails, network links get cut, entire data centers occasionally have power or cooling incidents, and even AWS Availability Zones have had real-world outages. If every AWS customer ran everything in a single location with no redundancy, routine failures would cause constant, unnecessary outages. AWS built Regions and AZs specifically so customers could architect around failure — HA exists as a design discipline to make use of that physical redundancy AWS already provides.",
    flow: "Users -> Route 53 (DNS + health checks) -> Application Load Balancer (spans AZ-a and AZ-b) -> EC2 Auto Scaling Group (instances in AZ-a and AZ-b) -> RDS Multi-AZ (primary in AZ-a, standby in AZ-b)",
    withoutIt: [
      "A single instance, single-AZ failure takes your entire application offline",
      "You have no automatic recovery path — someone has to notice the outage and manually fix it, which can take hours",
      "Maintenance (patching, scaling) requires visible downtime because there is no redundant capacity to absorb traffic during the work",
      "Customer trust and SLA commitments suffer from frequent, avoidable outages",
    ],
    bestUseCases: [
      "Customer-facing production applications where downtime directly costs revenue or trust",
      "Any workload with a defined uptime SLA that must be met",
      "Databases and stateful backends serving live traffic (RDS Multi-AZ, DynamoDB's built-in multi-AZ design)",
      "Systems where brief, automatic failover is an acceptable trade for much lower cost than full fault tolerance",
    ],
    poorUseCases: [
      "Throwaway dev/test sandboxes or short-lived proof-of-concept environments, where the extra cost of multi-AZ redundancy is not justified",
      "Batch/offline jobs that can simply be re-run later if a single instance fails, where availability at every moment does not matter",
    ],
    alternatives: [
      { need: "Lowest cost, some downtime risk is acceptable", choose: "Single-AZ deployment" },
      { need: "Production-grade resilience within one Region", choose: "Multi-AZ architecture (ALB + ASG + RDS Multi-AZ)" },
      { need: "Protection against a full Region-level event", choose: "Multi-Region architecture" },
      { need: "Zero visible disruption even during a component failure", choose: "Fault Tolerance (see next lesson) rather than HA alone" },
    ],
    keyFeatures: [
      "Multi-AZ deployment as the standard \"production-ready\" baseline pattern",
      "Elastic Load Balancing distributing traffic across healthy targets in multiple AZs",
      "Auto Scaling groups replacing unhealthy or terminated instances automatically",
      "Route 53 DNS health checks and failover routing to reroute away from unhealthy endpoints",
      "RDS Multi-AZ synchronous standby with automatic failover",
      "Services that are multi-AZ by default with no extra configuration (S3, DynamoDB)",
    ],
    availability:
      "Availability is measured by how much of the time a system is reachable and functioning. AWS Regions are made of multiple physically separate Availability Zones connected by low-latency links; HA architectures deliberately spread resources across at least two AZs so that the loss of one AZ does not equal the loss of the whole application. Multi-Region designs go further, protecting against the (much rarer) case of a Region-wide event.",
    security:
      "High Availability is primarily an architecture/resilience concern, but it intersects with security: redundant resources (a NAT Gateway per AZ, security groups replicated consistently across AZs, IAM roles instead of hardcoded credentials on any single instance) must be configured consistently everywhere, or you risk one AZ silently being less secure or misconfigured than the other.",
    pricingLogic:
      "HA generally costs more than a single-AZ design because you are paying for duplicated, partly-idle capacity (a second NAT Gateway, a standby RDS instance, extra EC2 capacity spread across AZs) as insurance against failure. Multi-Region HA costs more still, since you duplicate the entire stack in a second Region plus pay for cross-Region data transfer. The exam frequently expects you to balance \"most available\" against \"most cost-effective that still meets the stated requirement.\"",
    examKeywords: [
      "no single point of failure",
      "highly available",
      "Multi-AZ",
      "minimize downtime",
      "automatic recovery",
      "SLA / uptime percentage",
    ],
    examTraps: [
      "\"Highly available\" does not mean zero downtime — a brief failover interruption is normal and expected.",
      "Do not assume \"highly available\" automatically implies multi-Region; most HA answers on the exam are multi-AZ within one Region unless the scenario specifically requires surviving a Region-level event.",
      "A single EC2 instance, even a large/powerful one, is never highly available by itself — HA comes from redundancy, not instance size.",
    ],
    architectureDiagram:
      "Users\n  |\nRoute 53 (health checks)\n  |\nApplication Load Balancer\n  /              \\\nEC2 (AZ-a)      EC2 (AZ-b)\n  \\              /\n   RDS Multi-AZ (primary/standby)",
    architectureCaption:
      "A standard highly available web tier: load balancer and compute spread across two AZs, with a Multi-AZ database ready to fail over.",
    mentorTip:
      "Whenever a scenario says \"the application must remain available if an Availability Zone fails\" or \"minimize downtime,\" your first instinct should be: is this single-AZ right now? If yes, the fix is almost always \"spread it across at least two AZs.\" Save the multi-Region answer for scenarios that explicitly mention surviving a Region-wide disaster.",
    questionIds: [
      "q-high-availability-1",
      "q-high-availability-2",
      "q-high-availability-3",
      "q-high-availability-4",
      "q-high-availability-5",
    ],
  },
  {
    id: "fault-tolerance",
    moduleId: "phase-12-resilience",
    category: "Resilience",
    title: "Fault Tolerance",
    shortName: "FT",
    tier: 1,
    domains: [2],
    examImportance: "critical",
    oneLiner:
      "Fault Tolerance means a system keeps operating with no observable disruption even while a component has actually failed — a stronger guarantee than High Availability, which only promises a fast recovery.",
    englishExplanation:
      "Fault Tolerance (FT) and High Availability (HA) are the pair the exam loves to test against each other, and the exact wording matters: High Availability means the system recovers quickly when something fails — there may be a short, visible interruption (a failover event) before things are back to normal. Fault Tolerance means the system continues operating with no interruption at all, because there was already enough redundant, active capacity absorbing the failure the moment it happened — end users never notice.\n\nConcrete AWS examples make the difference click. An RDS Multi-AZ database is Highly Available: when the primary fails, RDS automatically fails over to the standby, but there is a real (if brief) connection interruption while that happens — that is HA, not full FT. Compare that to a fleet of stateless EC2 instances behind an Application Load Balancer, spread across three AZs, sized so that losing any single instance (or even a whole AZ) still leaves enough healthy capacity to serve 100% of traffic without any dropped requests — that is Fault Tolerant, because the failure is absorbed invisibly by the extra active capacity. Amazon S3 is another good example: it is engineered to be fault tolerant for storage durability — losing a device or even an AZ does not interrupt your ability to read/write objects, because the redundancy is already active across multiple AZs simultaneously, not sitting in standby.\n\nThe key architectural difference is standby vs. active-active redundancy. HA very often relies on a passive standby that must be activated (a failover step) when the primary dies — there is a brief gap while that switch happens. True FT relies on multiple active components sharing the load simultaneously, sized with enough headroom that losing one of them changes nothing observable, because the remaining active components were already handling requests and simply absorb a bit more.\n\nThis distinction directly drives cost and design decisions: achieving true fault tolerance is more expensive than achieving high availability, because you must keep enough extra active capacity running at all times (not just a cheaper passive standby) to absorb a failure with zero impact. Most production workloads on the exam only need to be Highly Available — full Fault Tolerance is usually reserved for the small set of components where even a few seconds of disruption is unacceptable.",
    taglishExplanation:
      "Ito yung pinaka-madalas ikumpara sa exam: High Availability = mabilis bumalik pagkatapos magkaproblema (pero may pansamantalang pagka-antala, kahit ilang segundo lang). Fault Tolerance = tuloy-tuloy pa rin ang takbo kahit may nasira, walang napansin ang user, dahil may sapat nang extra active capacity na sumasagot habang nangyayari yun. Halimbawa: RDS Multi-AZ ay HA lang — may failover na mararamdaman (konting downtime). Pero kung may tatlong EC2 instances sa likod ng load balancer, kalat sa tatlong AZ, at sapat ang laki para kahit mawala yung isa ay hindi mapansin ng user — yun ang Fault Tolerant, dahil active na lahat sabay-sabay, hindi lang standby. Mas mahal ang totoong fault tolerance kaysa HA dahil kailangan mong panatilihing tumatakbo ang extra capacity lagi, hindi lang naka-standby.",
    analogy:
      "High Availability is like having a spare tire in your trunk: when a tire blows out, you have to stop, swap it in, and lose a few minutes — but you get back on the road quickly. Fault Tolerance is like a car with two independent engines where losing one engine mid-drive does not even slow the car down; the driver may never notice anything happened at all.",
    whyItExists:
      "Some failures are cheap to tolerate with a brief pause — a website that reconnects in a second or two is usually fine. But some workloads (real-time trading, live payment processing, critical storage durability) cannot afford any observable gap at all. Fault Tolerance exists as a stronger, costlier design tier for exactly those cases, so architects have a precise vocabulary for \"recovers quickly\" versus \"never visibly breaks.\"",
    flow: "Requests -> Load Balancer -> N active instances across multiple AZs, sized with headroom -> loss of any one instance/AZ absorbed silently by remaining active capacity -> zero dropped requests",
    withoutIt: [
      "Every component failure becomes a visible, if brief, interruption to users",
      "Workloads that truly cannot tolerate any disruption (critical real-time systems) would experience unacceptable blips",
      "You would have to over-provision blindly instead of consciously deciding which components need FT versus just HA",
    ],
    bestUseCases: [
      "Storage layers where even a momentary write/read failure is unacceptable (S3's underlying design)",
      "Stateless web/API tiers sized with N+1 (or more) active capacity across multiple AZs so any single failure is fully absorbed",
      "Critical real-time or payment-processing paths where a visible blip has direct financial or safety consequences",
    ],
    poorUseCases: [
      "Internal or non-critical services where a brief HA-style failover is perfectly acceptable and full FT would be needless extra cost",
      "Early-stage or low-traffic applications where the cost of always-on redundant active capacity outweighs the very low probability of a failure mattering that much",
    ],
    alternatives: [
      { need: "Fast recovery after a failure, brief interruption acceptable", choose: "High Availability (Multi-AZ with failover)" },
      { need: "Zero observable disruption even during a component failure", choose: "Fault Tolerance (active-active redundancy with headroom)" },
      { need: "Protecting against a full Region outage specifically", choose: "Multi-Region architecture (can be HA or FT depending on design)" },
    ],
    keyFeatures: [
      "Active-active redundancy (all components serving traffic simultaneously) rather than passive standby",
      "Deliberate spare capacity (headroom) so losing one component does not saturate the rest",
      "No failover step required — the surviving components were already handling live traffic",
      "Commonly built into the design of durable storage services like S3",
    ],
    availability:
      "Fault Tolerant systems are, by definition, also highly available (uptime is preserved), but the reverse is not true — a Highly Available system is not automatically fault tolerant, because it may still have a brief failover gap. On the exam, treat FT as a strict, stronger subset of HA: all FT systems are HA, not all HA systems are FT.",
    security:
      "Fault tolerant designs must keep security posture identical across every active component (consistent security groups, IAM roles, encryption settings) since all of them are serving live traffic at the same time — an inconsistency in even one active node is immediately exposed to real users, unlike a passive standby that is not yet serving traffic.",
    pricingLogic:
      "Fault tolerance costs more than high availability because you must keep genuinely extra active capacity running around the clock (not a cheaper passive standby) so that losing a piece of it never saturates what remains. This is a direct cost-vs-resilience trade-off the exam expects you to reason about rather than always picking the most fault-tolerant option.",
    examKeywords: [
      "continues operating with no interruption",
      "no observable impact",
      "zero downtime during failure",
      "active-active redundancy",
      "fault tolerant vs highly available",
    ],
    examTraps: [
      "The single biggest trap: assuming \"highly available\" and \"fault tolerant\" are interchangeable. If the scenario says \"a brief failover is acceptable,\" that is HA. If it says \"must continue without any interruption,\" that is FT.",
      "RDS Multi-AZ is commonly mis-labeled as fault tolerant on quick reads — it is HA (failover involved), not true FT.",
      "Building for FT everywhere by default is usually the wrong exam answer when the scenario only requires HA — it signals unnecessary cost.",
    ],
    architectureDiagram:
      "Requests\n  |\nLoad Balancer\n  |----------------|----------------|\nEC2 (AZ-a)      EC2 (AZ-b)      EC2 (AZ-c)\n(all active, sized with headroom -- losing any one node changes nothing visible)",
    architectureCaption:
      "Fault tolerant compute tier: every node is already active and serving traffic; losing one still leaves full capacity to serve all requests.",
    mentorTip:
      "Drill this sentence until it's automatic: \"High Availability = recovers quickly (some disruption). Fault Tolerance = continues operating (no disruption).\" Almost every exam question that pits these two words against each other is testing exactly that sentence.",
    questionIds: [
      "q-fault-tolerance-1",
      "q-fault-tolerance-2",
      "q-fault-tolerance-3",
      "q-fault-tolerance-4",
      "q-fault-tolerance-5",
    ],
  },
  {
    id: "disaster-recovery-strategies",
    moduleId: "phase-12-resilience",
    category: "Resilience",
    title: "Disaster Recovery Strategies",
    shortName: "DR Strategies",
    tier: 1,
    domains: [2],
    examImportance: "critical",
    oneLiner:
      "Disaster Recovery (DR) strategies are four increasingly expensive patterns — Backup & Restore, Pilot Light, Warm Standby, and Multi-site Active-Active — for recovering a workload in another location, chosen based on how much data loss (RPO) and downtime (RTO) the business can tolerate.",
    englishExplanation:
      "Before comparing the four strategies, you must be fluent in two terms. RTO (Recovery Time Objective) is how long the business can tolerate being down — the maximum acceptable time between a disaster happening and the system being usable again. RPO (Recovery Point Objective) is how much data the business can tolerate losing, measured as time — the maximum acceptable gap between your last good backup/replication point and the moment of the disaster. A stricter (lower) RTO or RPO is harder and more expensive to achieve, because it demands more infrastructure and more frequent replication already running before the disaster happens.\n\nThe four standard AWS DR strategies sit on a spectrum from cheapest/slowest to most expensive/fastest. Backup & Restore is the cheapest: you regularly back up data (snapshots, AMIs, S3 exports) to another Region, and only when disaster strikes do you provision infrastructure and restore from those backups — this gives the highest RTO (hours, since you are building from scratch) and an RPO tied to how often you back up. Pilot Light keeps only the most critical core (typically a database) running at minimal size in the DR Region at all times, with the rest of the stack (app/web servers) defined but switched off; when disaster strikes, you scale up and switch on the surrounding layers around that already-running core, which is faster than Backup & Restore because the hardest part (a warmed-up, replicating database) is already alive. Warm Standby runs a scaled-down but fully functional copy of the entire production stack in the DR Region continuously — every layer exists and works, just at lower capacity — so failover means scaling that already-running copy up to full size rather than building it from nothing, giving a much lower RTO. Multi-site Active-Active runs full production capacity simultaneously in two or more Regions, actively serving live traffic in both places (not just standing by) — this gives the lowest possible RTO/RPO, close to zero, because there is no meaningful failover step at all: traffic is simply already flowing to a healthy Region.\n\nThe cost curve tracks the recovery curve almost perfectly: Backup & Restore is the cheapest because almost nothing runs in the DR Region until disaster strikes; Multi-site Active-Active is the most expensive because you are paying for full duplicate production capacity, always on, in more than one Region. Pilot Light and Warm Standby sit in between, trading a bit more always-on cost for a faster recovery.\n\nOn the exam, the scenario will describe a required RTO/RPO (sometimes in numbers, sometimes in words like \"minutes\" or \"near-zero downtime\") and possibly a budget constraint, and you must pick the cheapest strategy that still meets the stated requirement — not automatically the most resilient one.",
    taglishExplanation:
      "Dalawang term muna dapat sanay ka: RTO (Recovery Time Objective) — gaano katagal puwedeng down bago dapat bumalik online; RPO (Recovery Point Objective) — gaano karaming datos ang puwedeng mawala, sinusukat sa oras mula sa huling backup papunta sa oras ng disaster. Mas mababa/mahigpit ang RTO/RPO, mas mahal, dahil kailangan mas maraming infrastructure na tumatakbo na bago pa man mangyari ang disaster. Apat na strategy, mula pinakamura hanggang pinakamahal: (1) Backup & Restore — nag-ba-backup ka lang sa ibang Region, tapos kapag may disaster, doon ka pa magbu-build ng infrastructure — pinakamura pero pinakamatagal (oras); (2) Pilot Light — yung pinaka-critical na bahagi (karaniwang database) laging naka-on nang maliit sa DR Region, ang natitira naka-off, gigising lang kapag kailangan — mas mabilis dahil ang pinakamahirap na parte gising na; (3) Warm Standby — buong copy ng system tumatakbo pero pinaliit ang laki, tuloy-tuloy tumatakbo, kapag disaster, palakihin mo lang — mas mabilis pa; (4) Multi-site Active-Active — dalawang Region parehong buhay at tumatanggap ng trapiko nang sabay-sabay — halos zero downtime pero pinakamahal dahil doble ang buong production capacity mo. Ang exam gusto nila alam mo pumili ng pinakamurang strategy na kaya pa ring i-meet ang required RTO/RPO — hindi laging yung pinaka-sopistikado.",
    analogy:
      "Think of evacuation readiness for a house fire. Backup & Restore is keeping your important documents scanned and stored offsite — after a fire, you still have to rebuild the house from scratch using those documents, which takes a while. Pilot Light is like keeping the pilot light of a furnace lit in a second house you own but do not live in — the hardest part to restart (ignition) is already alive, so you can move in faster. Warm Standby is having a second, smaller house already furnished and ready to move into immediately, just not as big as your main house. Multi-site Active-Active is literally living in two full-sized houses at once, so losing one changes nothing about your day.",
    whyItExists:
      "Regions, though extremely reliable, are not immune to rare large-scale disruptions, and some businesses have contractual, regulatory, or reputational reasons they cannot accept even hours of downtime or any meaningful data loss. AWS formalized these four strategies so architects have a shared vocabulary and a clear cost/speed spectrum to choose from, matched precisely to what the business actually needs rather than guessing.",
    flow: "Define RTO/RPO requirement -> pick the cheapest strategy that meets it -> replicate data continuously to the DR Region -> (Backup & Restore: restore on demand | Pilot Light: scale up the core | Warm Standby: scale up the running copy | Multi-site: already serving, just reroute traffic)",
    withoutIt: [
      "A Region-level disruption could mean extended, unplanned downtime with no clear recovery plan",
      "Data loss could be far larger than the business can tolerate, with no defined RPO to design against",
      "Recovery efforts during an actual disaster become improvised and slow instead of rehearsed and predictable",
      "Compliance or contractual SLA obligations around uptime/data protection may be violated",
    ],
    bestUseCases: [
      "Backup & Restore: cost-sensitive workloads where hours of downtime and some data loss are acceptable",
      "Pilot Light: workloads with a critical, hard-to-quickly-recreate core (like a database) but where surrounding layers can be built up on demand",
      "Warm Standby: workloads needing a materially faster recovery than Pilot Light and willing to pay for an always-on, scaled-down full copy",
      "Multi-site Active-Active: mission-critical systems where even minutes of downtime or data loss is unacceptable and cost is a secondary concern",
    ],
    poorUseCases: [
      "Using Multi-site Active-Active for a non-critical internal tool — the ongoing cost of duplicate full production capacity is rarely justified",
      "Using pure Backup & Restore for a system with a strict near-zero RTO requirement — it cannot meet that promise no matter how good the backups are",
    ],
    alternatives: [
      { need: "Lowest cost, hours of downtime and some data loss acceptable", choose: "Backup & Restore" },
      { need: "Faster recovery than Backup & Restore, only the core needs to stay warm", choose: "Pilot Light" },
      { need: "Fast recovery, willing to pay for a smaller always-on full copy", choose: "Warm Standby" },
      { need: "Near-zero RTO/RPO, cost is secondary to continuity", choose: "Multi-site Active-Active" },
    ],
    keyFeatures: [
      "RTO and RPO as the two numbers that drive every DR decision",
      "Cross-Region data replication (snapshots, database replication, S3 Cross-Region Replication) underpinning all four strategies",
      "Route 53 (or Global Accelerator) failover routing to redirect traffic to the DR Region",
      "Infrastructure as Code (CloudFormation) to stand up Pilot Light/Backup & Restore environments quickly and consistently",
      "AWS Elastic Disaster Recovery as a managed service that can implement several of these patterns for you",
    ],
    availability:
      "Each strategy corresponds to a different level of multi-Region availability: Backup & Restore has effectively no standing availability in the DR Region until invoked; Multi-site Active-Active has full standing availability in more than one Region simultaneously. Choosing among them is choosing how much standing multi-Region availability you are willing to pay for continuously.",
    security:
      "Whatever DR strategy you choose, the DR Region must maintain the same security posture as production — matching IAM policies, encryption settings, and network controls — so that a stressful disaster event does not also become a security incident because the \"backup\" environment was configured more loosely.",
    pricingLogic:
      "Cost rises with how much infrastructure is kept running before a disaster: Backup & Restore mainly costs storage for backups; Pilot Light adds a small always-on core; Warm Standby adds a full, scaled-down always-on environment; Multi-site Active-Active costs roughly as much as running full production twice (or more), plus cross-Region data transfer. Always match the strategy to the required RTO/RPO rather than defaulting to the most expensive option.",
    examKeywords: [
      "RTO",
      "RPO",
      "Backup and Restore",
      "Pilot Light",
      "Warm Standby",
      "Multi-site active-active",
      "cross-region replication",
    ],
    examTraps: [
      "Confusing RTO (time to recover) with RPO (data loss tolerance) — they answer different questions.",
      "Assuming a stricter RTO/RPO always means you must jump straight to Multi-site Active-Active — check whether Warm Standby or Pilot Light already satisfies the stated number before picking the most expensive option.",
      "\"Active-active\" sounds attractive but is not automatically the correct answer if the scenario emphasizes cost sensitivity alongside a lenient RTO/RPO.",
    ],
    architectureDiagram:
      "Cost / Complexity  low -----------------------------------------> high\nBackup & Restore -> Pilot Light -> Warm Standby -> Multi-site Active-Active\nRTO/RPO            high (hours) -----------------------------------> low (near-zero)",
    architectureCaption:
      "The four DR strategies form a spectrum: cost rises as RTO/RPO shrinks. Pick the cheapest strategy that still meets the stated requirement.",
    mentorTip:
      "When a scenario gives you an RTO/RPO number (or words like \"a few minutes\" vs \"a few hours\"), map it directly onto this spectrum before looking at the answer choices — you will usually be able to eliminate at least two options immediately as either too slow or needlessly expensive.",
    questionIds: [
      "q-disaster-recovery-strategies-1",
      "q-disaster-recovery-strategies-2",
      "q-disaster-recovery-strategies-3",
      "q-disaster-recovery-strategies-4",
      "q-disaster-recovery-strategies-5",
    ],
  },
  {
    id: "aws-cost-thinking",
    moduleId: "phase-13-cost",
    category: "AWS Cost Management",
    title: "AWS Cost Optimization Thinking",
    shortName: "Cost Thinking",
    tier: 1,
    domains: [4],
    examImportance: "high",
    oneLiner:
      "AWS cost optimization is less about memorizing a service and more about running a mental checklist against any architecture: is it always on, can it scale down, can it go serverless, can cold data move to cheaper storage, and are you paying for avoidable network or NAT charges?",
    englishExplanation:
      "Domain 4 (Cost-Optimized Architectures) does not usually test a single service in isolation — it tests whether you can look at a described architecture and spot the waste. The mental checklist AWS wants you running is: Is it always running? A server or database that only needs to be up during business hours but runs 24/7 is wasting money; scheduled scaling, stopping non-production environments overnight, or moving to a usage-based model fixes this. Can it scale down as well as up? Static, peak-sized capacity that never shrinks during quiet periods is a common giveaway that Auto Scaling (or a serverless alternative) is missing. Can serverless be used? Lambda, Fargate, DynamoDB on-demand, and Aurora Serverless charge for actual usage instead of idle capacity, which is usually cheaper for spiky or unpredictable workloads (though not always for very high, constant, sustained throughput). Can cold data move to cheaper storage? Data that is rarely accessed but still sitting in S3 Standard, or old EBS snapshots nobody restores, are classic lifecycle-policy opportunities to move data to S3 Infrequent Access or Glacier tiers.\n\nThe checklist continues into networking: Is cross-AZ traffic unnecessary? Data transferred between Availability Zones (and especially between Regions) is billed, so chatty services split unnecessarily across AZs/Regions can rack up avoidable transfer charges — sometimes the fix is simply keeping tightly-coupled components in the same AZ where resilience requirements allow it. Is NAT Gateway data processing avoidable? Traffic from a private subnet to other AWS services (like S3 or DynamoDB) routed through a NAT Gateway is billed for data processing even though it never truly needed to leave AWS's network — a VPC Gateway or Interface Endpoint routes that traffic privately and can eliminate the charge entirely.\n\nFinally, the checklist asks about purchasing model: for steady-state, predictable workloads, are you using Savings Plans or Reserved Instances instead of paying full On-Demand rates? For flexible, interruption-tolerant workloads, could Spot Instances dramatically cut compute cost? Running through this checklist systematically — usage pattern, scaling behavior, serverless fit, storage tier, network path, and purchasing model — is exactly the reasoning the exam expects for \"which change would MOST reduce cost\" style questions.",
    taglishExplanation:
      "Sa Domain 4, hindi laging tanong ng \"anong service ba ito\" — mas madalas tanong na \"saan ba nagsasayang ng pera ang architecture na ito.\" Checklist na dapat laging tinatanong sa sarili: Tumatakbo ba ito 24/7 kahit hindi naman kailangan lagi (dapat i-schedule na lang i-off kapag walang gamit)? Kaya ba itong bumaba ang laki kapag tahimik, hindi lang tumataas kapag busy (Auto Scaling o serverless)? Puwede bang gamitin ang serverless (Lambda, Fargate, DynamoDB on-demand) para bayad ka lang sa aktwal na ginamit? Puwede bang ilipat sa mas murang storage class ang datos na bihira nang ginagamit (S3 lifecycle papuntang IA o Glacier)? May cross-AZ traffic ba na hindi naman kailangan (may bayad yan)? Dumadaan ba sa NAT Gateway ang traffic papunta sa ibang AWS service gaya ng S3 kahit puwede namang gumamit ng VPC Endpoint na walang bayad sa data processing? At sa purchasing model: kung steady at predictable ang workload, may Savings Plan/Reserved Instance ka na ba imbes na puro On-Demand? Kung flexible at pwedeng ma-interrupt, gumagamit ka ba ng Spot? Yan yung buong checklist na dapat automatic na sa isip mo pagdating sa cost optimization questions.",
    analogy:
      "This checklist is like a household energy audit. Before spending on anything new, you ask: is the aircon running even when nobody's home (always-on waste)? Can we downsize appliances during off-peak hours (scaling down)? Would a pay-per-use service (like a laundromat instead of owning a washer) actually be cheaper for how rarely we use it (serverless)? Should old boxes in the garage move to a cheaper offsite storage unit instead of the expensive spare room (storage tiering)? Are we paying extra fees just because of an inefficient route to get something delivered (network/NAT charges)? Should we commit to an annual plan for the services we know we'll always need (Savings Plans/RI)?",
    whyItExists:
      "Cloud computing's pay-as-you-go model removes the natural spending brake that used to exist with physical hardware (you could only overspend up to what you'd physically purchased). Without active review, it is easy to leave resources running idle, over-provisioned, or on the wrong pricing model, quietly inflating the bill. This checklist exists as the practical, repeatable version of the AWS Well-Architected Framework's Cost Optimization pillar.",
    flow: "Review architecture -> check usage pattern (always-on vs scheduled) -> check scaling behavior (static vs elastic) -> check compute model (server-based vs serverless) -> check storage tier (hot vs cold data placement) -> check network path (cross-AZ / NAT Gateway) -> check purchasing model (On-Demand vs Savings Plans/RI vs Spot) -> apply the cheapest fix that still meets requirements",
    withoutIt: [
      "Idle or over-provisioned resources quietly inflate the monthly bill with no one noticing",
      "Teams keep paying On-Demand rates for perfectly predictable, steady-state workloads that qualify for a discount",
      "Avoidable data transfer and NAT Gateway processing charges accumulate unnoticed",
      "Cold, rarely-accessed data sits in expensive storage tiers indefinitely",
    ],
    bestUseCases: [
      "Reviewing an existing architecture during a cost optimization or FinOps exercise",
      "Answering exam questions that ask which single change would most reduce cost without breaking a stated requirement",
      "Architecture design reviews before launch, to catch waste before it accumulates",
    ],
    poorUseCases: [
      "Applying aggressive cost-cutting to an early prototype or proof-of-concept where speed of iteration matters far more than cost efficiency",
      "Cutting cost by removing redundancy, backups, or encryption the requirements actually call for — cost optimization must respect the other stated constraints, not override them",
    ],
    alternatives: [
      { need: "Reduce idle EC2 cost for predictable off-hours", choose: "Scheduled scaling / stop non-prod instances outside business hours" },
      { need: "Reduce cost for spiky, event-driven workloads", choose: "Move to serverless (Lambda, Fargate, DynamoDB on-demand)" },
      { need: "Reduce storage cost for cold, rarely-accessed data", choose: "S3 Lifecycle rules to Infrequent Access / Glacier" },
      { need: "Avoid NAT Gateway data processing charges for AWS service traffic", choose: "VPC Gateway or Interface Endpoints" },
      { need: "Discount for steady-state, predictable usage", choose: "Savings Plans or Reserved Instances" },
      { need: "Discount for flexible, interruption-tolerant workloads", choose: "Spot Instances" },
    ],
    keyFeatures: [
      "Usage pattern review — always-on vs scheduled/on-demand",
      "Scaling review — static peak-sized capacity vs elastic Auto Scaling",
      "Compute model review — server-based vs serverless fit",
      "Storage tiering review — hot data vs cold/archival data placement",
      "Network cost review — cross-AZ traffic and NAT Gateway data processing charges",
      "Purchasing model review — On-Demand vs Savings Plans/Reserved Instances vs Spot",
    ],
    availability:
      "Cost optimization decisions must not silently remove availability or resilience the requirements call for — for example, never suggest collapsing a Multi-AZ database to single-AZ purely to save money unless the scenario explicitly says downtime/data-loss risk is acceptable.",
    security:
      "Cost cuts should never come at the expense of required security controls — disabling encryption, deleting backups, or opening overly broad network access to save a small amount of money is never the correct exam answer, even if it technically reduces cost.",
    pricingLogic:
      "This lesson is itself about pricing logic: AWS bills for compute time, storage volume and tier, data transferred, and API/request volume — cost optimization means matching each of those dimensions to actual usage instead of paying for unused headroom, the wrong storage tier, or an unnecessary network hop.",
    examKeywords: [
      "most cost-effective",
      "minimize cost",
      "reduce operational overhead and cost",
      "least cost while meeting requirements",
      "optimize spend",
    ],
    examTraps: [
      "The cheapest-sounding option is not correct if it violates a stated requirement (durability, RTO, compliance) elsewhere in the scenario.",
      "Serverless is usually — but not always — cheaper; for very high, constant, sustained throughput, provisioned/reserved compute can sometimes be more cost-effective. Read the workload shape carefully.",
      "NAT Gateway data processing charges are a frequently tested, easy-to-miss cost leak — traffic to AWS services from a private subnet should usually go through a VPC endpoint instead.",
    ],
    architectureDiagram:
      "Architecture under review\n  |\n  v\nChecklist: always-on? / scales down? / serverless fit? / cold data tiered? / avoidable cross-AZ or NAT cost? / right purchasing model?\n  |\n  v\nApply cheapest fix that still satisfies stated requirements",
    architectureCaption:
      "The cost-optimization checklist applied to any architecture before choosing a change.",
    mentorTip:
      "When a Domain 4 question asks \"which change would most reduce cost,\" run this exact checklist top to bottom in your head — the correct answer is almost always the first checklist item the described architecture is clearly failing.",
    questionIds: [
      "q-aws-cost-thinking-1",
      "q-aws-cost-thinking-2",
      "q-aws-cost-thinking-3",
      "q-aws-cost-thinking-4",
      "q-aws-cost-thinking-5",
    ],
  },
  {
    id: "aws-budgets",
    moduleId: "phase-13-cost",
    category: "AWS Cost Management",
    title: "AWS Budgets",
    shortName: "Budgets",
    tier: 2,
    domains: [4],
    examImportance: "medium",
    oneLiner:
      "AWS Budgets lets you set custom cost or usage thresholds and get proactively alerted — by email or SNS — before you overspend, rather than finding out after the bill arrives.",
    englishExplanation:
      "AWS Budgets is a proactive control: you define a budget (a cost amount, a usage amount, or coverage/utilization of Reserved Instances or Savings Plans) and a threshold, and AWS notifies you when actual or forecasted spend crosses that threshold. This is different from just looking at a dashboard after the fact — Budgets is designed to warn you before or as you approach a limit, so teams can react (investigate, throttle usage, or adjust) before the month closes.\n\nBudgets can also trigger automated Budget Actions, such as applying a restrictive IAM policy or Service Control Policy when a threshold is breached, turning a passive alert into an actual guardrail. This makes Budgets useful not just for visibility but for governance — for example, capping what a sandbox or training account is allowed to spend before someone has to intervene manually.",
    taglishExplanation:
      "AWS Budgets ay parang budget alarm sa banking app mo — nagse-set ka ng limit, at kapag malapit ka na o nalagpasan mo na yung limit (actual man o forecasted), agad kang mababalitaan sa email o SNS. Hindi ito katulad ng paggamit ng Cost Explorer kung saan tumitingin ka lang paminsan-minsan — proactive itong nagbabantay at nagsasabi sa'yo bago pa man dumating ang malaking resibo sa dulo ng buwan. Puwede pa itong mag-trigger ng automated na aksyon (Budget Actions), gaya ng pag-apply ng mas mahigpit na IAM policy, kapag nalagpasan na ang threshold.",
    analogy:
      "AWS Budgets is like setting a spending alert on your banking app: you tell it \"notify me if I spend more than X this month,\" and it pings you the moment you cross that line — or even earlier, if it forecasts you're on track to cross it — instead of you finding out only when the statement arrives.",
    whyItExists:
      "Without proactive alerting, cost overruns are typically discovered only after the invoice is generated, by which point the money is already spent. AWS Budgets exists to shift that discovery earlier, giving teams a chance to react in near real time instead of after the fact.",
    flow: "Set a cost/usage budget and threshold -> AWS Budgets monitors actual and forecasted spend -> threshold breached -> notification via email/SNS (optionally a Budget Action is triggered, e.g. applying a restrictive policy)",
    withoutIt: [
      "Cost overruns are discovered only after the invoice arrives, too late to react",
      "No proactive spending guardrails for sandbox, training, or per-team/per-project accounts",
      "Teams lose accountability for staying within an agreed spending target",
    ],
    bestUseCases: [
      "Setting spending caps per team, project, or cost-allocation tag with automatic alerts",
      "Getting notified when Reserved Instance or Savings Plan utilization/coverage drops below a target",
      "Enforcing hard spending guardrails on sandbox/training accounts via Budget Actions",
    ],
    poorUseCases: [
      "Deep historical trend analysis and visualization — that is Cost Explorer's job",
      "Extracting granular, per-resource line-item billing data for BI tools — that is the Cost and Usage Report's job",
    ],
    alternatives: [
      { need: "Proactive threshold alerts before overspending", choose: "AWS Budgets" },
      { need: "Visualize and analyze historical spend trends", choose: "AWS Cost Explorer" },
      { need: "Most granular line-item billing data export", choose: "AWS Cost and Usage Report" },
    ],
    keyFeatures: [
      "Cost budgets, usage budgets, and RI/Savings Plans utilization or coverage budgets",
      "Alerts based on actual spend or AWS's forecasted spend",
      "Notifications via email or Amazon SNS",
      "Budget Actions to automatically apply an IAM/SCP restriction when a threshold is crossed",
      "Works at the individual account or consolidated (AWS Organizations) billing level",
    ],
    availability:
      "AWS Budgets is a managed, account/Organization-level billing feature with no infrastructure to provision or scale yourself.",
    security:
      "IAM permissions control who can create, view, or modify budgets; when used with AWS Organizations, budgets can be centrally governed across many linked accounts for consistent cost control.",
    pricingLogic:
      "AWS Budgets includes a free allotment of budgets per account, with a small charge for additional budgets beyond that allotment — check the current AWS pricing page for exact figures rather than assuming a fixed number.",
    examKeywords: [
      "proactive cost alert",
      "notify before exceeding budget",
      "threshold-based alert",
      "forecasted spend",
    ],
    examTraps: [
      "Budgets alerts you — it does not by itself enforce a spending cap unless you specifically configure a Budget Action.",
      "Do not confuse Budgets (alerting) with Cost Explorer (visualization/analysis) or Cost and Usage Report (granular raw data export) — they solve different problems.",
    ],
    architectureDiagram:
      "Define budget + threshold\n  |\nAWS Budgets monitors actual/forecasted spend\n  |\nThreshold crossed -> Email/SNS alert -> (optional) Budget Action applies restrictive policy",
    architectureCaption:
      "AWS Budgets watches spend against a threshold and can trigger both a notification and an automated guardrail action.",
    mentorTip:
      "If the scenario says \"want to be notified before/when spending exceeds a certain amount,\" that phrase alone should point you straight to AWS Budgets.",
    questionIds: ["q-aws-budgets-1", "q-aws-budgets-2", "q-aws-budgets-3"],
  },
  {
    id: "aws-cost-explorer",
    moduleId: "phase-13-cost",
    category: "AWS Cost Management",
    title: "AWS Cost Explorer",
    shortName: "Cost Explorer",
    tier: 2,
    domains: [4],
    examImportance: "medium",
    oneLiner:
      "AWS Cost Explorer is a visualization and analysis tool for exploring historical AWS spend and usage trends, and for forecasting future costs.",
    englishExplanation:
      "Cost Explorer answers the question \"where is my money going, and why did it change?\" It provides prebuilt and customizable reports that let you filter and group historical cost and usage data by dimensions like service, linked account, Region, or cost-allocation tag, at daily or monthly granularity, so you can visually spot spend spikes and trends over time.\n\nBeyond looking backward, Cost Explorer also forecasts future spend based on historical patterns, and it surfaces Reserved Instance and Savings Plans recommendations — showing you where committing to a purchase would save money based on your actual, observed usage pattern.",
    taglishExplanation:
      "Cost Explorer ay parang dashboard na may mga graph na nagpapakita kung saan napunta ang pera mo noong nakaraang mga buwan — puwede mong i-breakdown ayon sa service, account, Region, o tag. Kapaki-pakinabang siya para sagutin ang \"bakit tumaas ang bill namin ngayong buwan?\" Meron din siyang forecasting para sa susunod na gastusin, at nagre-recommend pa ng Reserved Instances/Savings Plans batay sa aktwal na usage pattern mo.",
    analogy:
      "Cost Explorer is like the spending-breakdown graphs in a banking app that show you exactly how much went to groceries, bills, and entertainment each month, with a trend line — instead of just a lump-sum total, you can see and understand where the money actually went.",
    whyItExists:
      "Raw billing data is hard to interpret at a glance. Cost Explorer exists to turn that raw data into visual, explorable reports so teams can identify cost drivers and trends without needing to build their own analysis tooling first.",
    flow: "Enable Cost Explorer -> explore prebuilt or custom reports, filtered/grouped by dimension -> identify spend drivers and trends -> review forecast and RI/Savings Plans recommendations -> act on findings",
    withoutIt: [
      "No easy way to visually identify which service, team, or resource is driving a cost increase",
      "Forecasting future spend requires manual analysis of raw billing data",
      "Missed opportunities to right-size purchasing commitments based on actual usage patterns",
    ],
    bestUseCases: [
      "Monthly or ad-hoc cost reviews to understand spend trends",
      "Investigating a sudden cost spike to find its root cause",
      "Evaluating Savings Plans/Reserved Instance recommendations before committing",
    ],
    poorUseCases: [
      "Setting proactive alerts before a threshold is crossed — that is AWS Budgets' job",
      "Extracting the most granular, per-resource billing line items for external BI ingestion — that is the Cost and Usage Report's job",
    ],
    alternatives: [
      { need: "Visualize and analyze historical cost trends", choose: "AWS Cost Explorer" },
      { need: "Proactive alerting on a spending threshold", choose: "AWS Budgets" },
      { need: "Most granular exportable billing data", choose: "AWS Cost and Usage Report" },
    ],
    keyFeatures: [
      "Prebuilt reports plus fully custom reports filtered/grouped by service, account, Region, or tag",
      "Daily or monthly granularity",
      "Cost and usage forecasting based on historical trends",
      "Reserved Instance and Savings Plans purchase recommendations",
    ],
    availability:
      "A managed billing console/API feature tied to your account or AWS Organizations consolidated billing — no infrastructure to manage.",
    security:
      "Access is controlled through IAM billing permissions; in an Organization, member account visibility into consolidated cost data can be restricted appropriately.",
    pricingLogic:
      "Basic use of Cost Explorer in the console has no separate charge; programmatic API access to Cost Explorer data can incur a small per-request charge — check current AWS pricing for exact details.",
    examKeywords: [
      "visualize cost trends",
      "analyze historical spend",
      "forecast future cost",
      "identify cost drivers",
    ],
    examTraps: [
      "Cost Explorer is for visualization and analysis, not for setting alerts (that's Budgets) and not for raw, granular data export (that's CUR).",
      "Don't assume Cost Explorer replaces detailed per-resource billing detail needed for chargeback/showback reporting — that level of granularity comes from CUR.",
    ],
    architectureDiagram:
      "Enable Cost Explorer\n  |\nFilter/group historical cost & usage data\n  |\nSpot trends & spikes -> review forecast -> review RI/Savings Plans recommendations",
    architectureCaption:
      "Cost Explorer turns raw billing history into explorable, visual reports and forward-looking recommendations.",
    mentorTip:
      "If the scenario says \"visualize\" or \"understand trends in\" or \"forecast\" AWS spend, that phrasing points to Cost Explorer — not Budgets (alerts) or CUR (raw export).",
    questionIds: ["q-aws-cost-explorer-1", "q-aws-cost-explorer-2", "q-aws-cost-explorer-3"],
  },
  {
    id: "aws-cost-and-usage-report",
    moduleId: "phase-13-cost",
    category: "AWS Cost Management",
    title: "AWS Cost and Usage Report",
    shortName: "CUR",
    tier: 3,
    domains: [4],
    examImportance: "low",
    oneLiner:
      "The AWS Cost and Usage Report (CUR) is the most detailed, granular billing data AWS provides — a data export for deep, custom analysis or integration with BI tools, not a dashboard.",
    englishExplanation:
      "CUR delivers the most comprehensive line-item cost and usage data AWS offers, down to hourly, per-resource granularity, as data files (CSV or Parquet) delivered automatically to an S3 bucket you own. From there, teams typically query it with Amazon Athena, load it into Amazon Redshift, or visualize it with Amazon QuickSight, or feed it into a third-party FinOps/BI platform for custom chargeback and cost-allocation reporting that goes far beyond what Cost Explorer's prebuilt views can show.",
    taglishExplanation:
      "Ang CUR ang pinaka-detalyadong billing data na kayang ibigay ng AWS — parang buong resibo, per-linya, per-resource, per-oras pa nga minsan, hindi lang summary. Ipinapadala ito bilang mga file (CSV/Parquet) sa S3 bucket mo, tapos doon mo na ito ini-query gamit ang Athena o ibinubuhos sa Redshift/QuickSight o sa ibang BI tool para sa mas malalim na cost analysis o chargeback report.",
    analogy:
      "If Cost Explorer is the summary page of your bank statement, CUR is the full, itemized transaction ledger with every single line item — the raw material for anyone who needs to build their own detailed reports rather than rely on a prebuilt summary.",
    whyItExists:
      "Some organizations need cost data at a finer grain, or in a raw form, than any dashboard can provide — for custom chargeback models, compliance reporting, or feeding an existing BI/FinOps pipeline. CUR exists to be that raw, complete data source.",
    flow: "AWS meters usage and cost -> CUR generates detailed line-item reports -> delivered automatically to an S3 bucket -> queried with Athena / loaded into Redshift / visualized in QuickSight or a BI tool",
    withoutIt: [
      "No way to get resource-level, hourly-granularity billing detail for custom analysis",
      "Limited to Cost Explorer's prebuilt dimensions and views instead of arbitrary custom queries",
      "Harder to build accurate per-team or per-project chargeback/showback reports",
    ],
    bestUseCases: [
      "FinOps teams needing the most granular, per-resource billing detail available",
      "Feeding cost data into a custom BI pipeline (Athena, Redshift, QuickSight, or third-party tools)",
    ],
    poorUseCases: [
      "A quick visual check of spend trends — Cost Explorer is far simpler for that",
      "Simple threshold-based alerting — that is what AWS Budgets is for",
    ],
    alternatives: [
      { need: "Quick visual trend analysis", choose: "AWS Cost Explorer" },
      { need: "Proactive spend threshold alerts", choose: "AWS Budgets" },
      { need: "Raw, granular, per-resource billing export for BI", choose: "AWS Cost and Usage Report" },
    ],
    keyFeatures: [
      "Most granular cost and usage data AWS offers, down to the resource level",
      "Delivered as CSV or Parquet files to an S3 bucket you control",
      "Integrates cleanly with Athena, Redshift, and QuickSight",
      "Customizable report time granularity and content",
    ],
    availability:
      "Delivered on a schedule to S3, which is inherently durable and multi-AZ; you control retention and lifecycle of the report files yourself.",
    security:
      "Because CUR contains detailed billing information, the destination S3 bucket and any downstream query tools should be locked down with appropriate IAM policies and bucket policies.",
    pricingLogic:
      "CUR generation itself has no separate service fee; you pay for the S3 storage of the report files and for any compute used to query them (e.g. Athena query charges, Redshift cluster cost).",
    examKeywords: [
      "most detailed billing data",
      "granular cost and usage export",
      "integrate billing data with BI tools",
    ],
    examTraps: [
      "Don't choose CUR when the scenario only needs a simple dashboard or a threshold alert — it is overkill and the wrong tool for that job.",
      "Remember CUR data lands in S3, so S3 storage cost and access permissions are part of the picture.",
    ],
    architectureDiagram:
      "AWS usage & billing\n  |\nCost and Usage Report (hourly, per-resource)\n  |\nS3 bucket\n  |\nAthena / Redshift / QuickSight / BI tool",
    architectureCaption:
      "CUR delivers the rawest, most granular billing data to S3 for custom querying and analysis.",
    mentorTip:
      "\"Most detailed/granular\" is the exam's signal word for CUR — if the question just wants a dashboard or an alert, look elsewhere.",
    questionIds: ["q-aws-cost-and-usage-report-1", "q-aws-cost-and-usage-report-2", "q-aws-cost-and-usage-report-3"],
  },
  {
    id: "savings-plans-reserved-spot",
    moduleId: "phase-13-cost",
    category: "AWS Cost Management",
    title: "Savings Plans vs Reserved Instances vs Spot",
    shortName: "SP vs RI vs Spot",
    tier: 1,
    domains: [4],
    examImportance: "critical",
    oneLiner:
      "AWS offers four purchasing models for compute — On-Demand, Reserved Instances, Savings Plans, and Spot — each trading commitment and flexibility for a different level of discount, and picking the right one for a workload's shape is one of the most heavily tested cost topics on the exam.",
    englishExplanation:
      "On-Demand is the baseline: you pay by the second/hour with zero commitment, at the highest rate, in exchange for total flexibility to start or stop anytime — the right default for unpredictable or short-term workloads where you cannot forecast usage in advance.\n\nReserved Instances (RIs) trade a 1-year or 3-year commitment for a discount off On-Demand pricing, in exchange for locking in specifics like instance family and Region (Standard RIs are cheaper but less flexible about changing instance attributes; Convertible RIs cost a bit more but allow you to change the instance family during the term). RIs make sense for workloads you are confident will run steadily for the length of the commitment.\n\nSavings Plans are a more flexible alternative to RIs: instead of committing to a specific instance type, you commit to a certain dollar-per-hour spend for one or three years, and the discount automatically applies across a wide range of usage — Compute Savings Plans apply broadly across instance families, Regions, and even different compute services (EC2, Fargate, Lambda), while EC2 Instance Savings Plans are narrower (tied to a specific instance family in a Region) but offer a bigger discount in exchange for that narrower scope. Savings Plans are generally the more modern, more flexible recommendation over RIs for steady-state compute spend.\n\nSpot Instances offer by far the deepest discount of all, because you are bidding on AWS's genuinely spare, unused compute capacity — the trade-off is that AWS can reclaim that capacity with only a short interruption notice when it is needed elsewhere. Spot is ideal for fault-tolerant, flexible, or stateless workloads that can handle being interrupted and resumed — batch processing, big data analysis, CI/CD build fleets, and stateless horizontally-scaled web tiers designed to lose and regain instances gracefully. Spot is the wrong choice for critical, stateful, or always-must-be-running workloads.",
    taglishExplanation:
      "Isipin mo itong parang mga klase ng phone plan. On-Demand ay parang prepaid load — walang commitment, pero mahal per minuto, perfect kung hindi mo alam kung gaano karami ang gagamitin mo. Reserved Instances ay parang postpaid plan na committed ka sa 1 o 3 taon para sa mas mababang rate, pero naka-lock ka sa specific na instance family/Region (Standard RI mas mura pero rigid; Convertible RI mas flexible pero konting mas mahal). Savings Plans ay mas flexible na bersyon — committed ka sa halaga bawat oras (dollar/hour) imbes na sa specific na instance, kaya awtomatikong nalalapat ang discount kahit magbago ang instance family, Region, o kahit lumipat ka papuntang Fargate/Lambda (kung Compute Savings Plan). Spot ay parang standby fare sa eroplano — sobrang mura dahil ginagamit mo lang yung sobrang kapasidad ng AWS, pero puwede kang ma-bump (i-reclaim) kapag kailangan na ito ng AWS sa ibang customer — bagay lang ito sa mga workload na kayang ma-interrupt (batch jobs, CI/CD, stateless web tiers).",
    analogy:
      "On-Demand is a prepaid phone plan with no contract — flexible, but the most expensive per minute. Reserved Instances and Savings Plans are like postpaid plans where you commit to a term for a much better rate — RIs lock in a specific device/plan, while Savings Plans let the discount flex across whatever you actually use. Spot Instances are like a standby airline fare: dramatically cheaper, but you might get bumped from the flight if a paying full-fare customer needs the seat.",
    whyItExists:
      "Different workloads have very different levels of predictability, and a single flat On-Demand price would either overcharge steady, forecastable workloads or fail to make use of AWS's genuinely idle spare capacity. These purchasing models exist so customers can trade certainty/flexibility for discount in a way that matches how predictable (or interruptible) their workload actually is.",
    flow: "Assess workload pattern -> steady-state & predictable? use Reserved Instances or Savings Plans -> flexible & interruption-tolerant? use Spot -> unpredictable or short-term? stay On-Demand",
    withoutIt: [
      "Every workload would pay the same flat On-Demand rate regardless of how predictable or interruptible it actually is",
      "No incentive or mechanism to reward long-term committed usage with a lower rate",
      "AWS's genuinely spare capacity would go unused instead of being offered at a steep discount via Spot",
    ],
    bestUseCases: [
      "Steady-state, always-on production workloads with predictable long-term usage — Reserved Instances or Savings Plans",
      "Workloads spread across changing instance families, Regions, or even compute services — Compute Savings Plans specifically, for maximum flexibility",
      "Flexible, fault-tolerant, interruption-tolerant batch, big data, or CI/CD workloads — Spot Instances for the deepest discount",
      "Unpredictable, short-term, or spiky workloads you cannot commit to in advance — On-Demand",
    ],
    poorUseCases: [
      "Using Spot for stateful, critical, always-must-be-running workloads that cannot tolerate interruption",
      "Committing to Reserved Instances for a workload whose long-term shape is genuinely uncertain, risking wasted, unused commitment",
      "Staying on On-Demand indefinitely for a long-running, steady-state production workload — this wastes money compared to a committed option",
    ],
    alternatives: [
      { need: "No commitment, maximum flexibility", choose: "On-Demand" },
      { need: "Discount for a specific, steady-state instance family/Region", choose: "Reserved Instances (Standard)" },
      { need: "Discount for a steady-state workload but flexibility to change instance family during the term", choose: "Reserved Instances (Convertible)" },
      { need: "Discount that flexibly applies across instance families, Regions, and compute services", choose: "Compute Savings Plans" },
      { need: "Deepest possible discount, workload can tolerate interruption", choose: "Spot Instances" },
    ],
    keyFeatures: [
      "On-Demand: pay per second/hour, zero commitment, highest rate",
      "Reserved Instances: 1- or 3-year commitment, Standard (cheaper, rigid) or Convertible (flexible, smaller discount)",
      "Savings Plans: dollar/hour commitment for 1 or 3 years; Compute Savings Plans span instance families/Regions/services, EC2 Instance Savings Plans are narrower but discount more",
      "Spot Instances: deepest discount, reclaimable with a short interruption notice, best combined with Spot Fleet or Auto Scaling for resilience to interruption",
    ],
    availability:
      "The purchasing model does not change the underlying resilience of a resource — but Spot specifically introduces an availability risk of its own (interruption), which architects must design around by diversifying instance types/AZs or mixing Spot with On-Demand/Reserved capacity.",
    security:
      "Purchasing model choice has no direct effect on the security configuration of the underlying resources — the same IAM, security group, and encryption practices apply regardless of On-Demand, Reserved, Savings Plan, or Spot.",
    pricingLogic:
      "Reserved Instances and Savings Plans can offer a significant discount versus On-Demand, generally larger for longer commitment terms and more upfront payment. Spot offers the deepest discount of all because it uses AWS's genuinely spare capacity, at the cost of potential reclamation. Exact discount percentages change over time and by instance type/Region, so never memorize or invent a specific number — focus on the relative ordering: On-Demand (most expensive, most flexible) > Reserved Instances/Savings Plans (discounted, committed) > Spot (deepest discount, least guaranteed).",
    examKeywords: [
      "steady-state workload -> Reserved Instances / Savings Plans",
      "interruption-tolerant / flexible workload -> Spot",
      "no commitment -> On-Demand",
      "flexible across instance family and Region -> Compute Savings Plans",
      "commitment to a dollar amount per hour -> Savings Plans",
    ],
    examTraps: [
      "Spot is never the right answer for a workload described as critical, stateful, or unable to tolerate interruption.",
      "Reserved Instances lock in more specifics (instance family/Region) than Savings Plans — if the scenario emphasizes needing flexibility to change instance types, Savings Plans usually beats RIs.",
      "\"Deepest discount\" phrasing points to Spot; \"predictable, steady-state, still need flexibility across services\" points to Compute Savings Plans, not Reserved Instances.",
    ],
    architectureDiagram:
      "Flexible & expensive                                    Committed & cheapest\nOn-Demand  ->  Reserved Instances / Savings Plans  ->  Spot Instances\n(no commitment)   (1-3yr commitment, steady-state)     (deepest discount, reclaimable)",
    architectureCaption:
      "The compute purchasing spectrum: trade commitment/interruption risk for a bigger discount.",
    mentorTip:
      "Ask yourself two questions for any purchasing-model exam question: (1) is the workload's usage steady/predictable, or spiky/unpredictable? (2) can it tolerate sudden interruption? Those two answers alone will point you to the correct model almost every time.",
    questionIds: [
      "q-savings-plans-reserved-spot-1",
      "q-savings-plans-reserved-spot-2",
      "q-savings-plans-reserved-spot-3",
      "q-savings-plans-reserved-spot-4",
      "q-savings-plans-reserved-spot-5",
    ],
  },
  {
    id: "aws-amplify",
    moduleId: "phase-misc",
    category: "Front-End Web and Mobile",
    title: "AWS Amplify",
    shortName: "Amplify",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "AWS Amplify is a set of tools and services (libraries, CLI, hosting) that let frontend and mobile developers quickly build, connect, and deploy full-stack web and mobile applications backed by AWS services.",
    englishExplanation:
      "Amplify bundles together the common pieces a full-stack app needs — authentication (backed by Amazon Cognito), APIs (backed by AWS AppSync or API Gateway), and file storage (backed by Amazon S3) — behind simple frontend libraries and a CLI, so a developer can provision a working backend and wire it into their app without manually configuring each service individually. Amplify Hosting adds managed CI/CD and hosting for the frontend itself, including support for modern web frameworks.",
    taglishExplanation:
      "Si Amplify ay parang all-in-one starter kit para sa mga frontend/mobile developer — imbes na mano-manong i-configure at i-connect ang Cognito para sa login, AppSync/API Gateway para sa API, at S3 para sa storage, ginagawa lahat ito ni Amplify gamit ang CLI at libraries nito. May Amplify Hosting din para sa CI/CD at pag-deploy ng frontend mismo.",
    analogy:
      "Amplify is like a pre-wired starter kit for a full-stack app: instead of buying and wiring each backend component (auth, API, storage) separately, you get a kit where the common connections are already made for you, so you can focus on building the app itself.",
    whyItExists:
      "Manually provisioning and wiring together Cognito, an API layer, and S3 for every new app is repetitive, undifferentiated work for frontend/mobile teams who mainly want to build features, not backend plumbing. Amplify exists to remove that setup overhead.",
    flow: "Developer uses Amplify CLI/Studio -> provisions backend (Auth via Cognito, API via AppSync/API Gateway, Storage via S3) -> Amplify Hosting builds and deploys the frontend with CI/CD",
    withoutIt: [
      "Developers must manually provision and glue together Cognito, an API layer, and S3 for common app patterns",
      "Slower time to market for small teams without dedicated backend/infrastructure expertise",
    ],
    bestUseCases: [
      "Startups and small teams building full-stack web/mobile apps quickly",
      "Frontend developers who want a working backend without deep AWS infrastructure expertise",
    ],
    poorUseCases: [
      "Complex, custom enterprise backends that need fine-grained control over each service's configuration — better to provision API Gateway, Lambda, and DynamoDB directly",
    ],
    alternatives: [
      { need: "Fine-grained, fully custom backend control", choose: "Provision API Gateway, Lambda, and DynamoDB directly" },
    ],
    keyFeatures: [
      "Amplify Libraries for Auth, API, Storage, and Analytics in frontend/mobile code",
      "Amplify Hosting with CI/CD for web app builds and deployment",
      "Amplify Studio, a visual interface for building backend data models and UI",
    ],
    availability:
      "Amplify Hosting serves content through a managed, globally distributed setup; the underlying backend services (Cognito, AppSync/API Gateway, S3) carry their own standard managed availability.",
    security:
      "Authentication and authorization are handled through Amazon Cognito; backend resources use IAM roles scoped by Amplify to the permissions the app actually needs.",
    pricingLogic:
      "There is no separate large licensing fee for Amplify itself — you pay for the underlying resources it provisions and uses (Cognito, AppSync/API Gateway, S3, and hosting build minutes/bandwidth).",
    examKeywords: [
      "quickly build full-stack app",
      "frontend and mobile app development",
      "CI/CD for web apps",
    ],
    examTraps: [
      "Amplify is a development toolchain/framework, not a single infrastructure primitive — expect recognition-level questions (\"which service helps build/deploy full-stack apps quickly\") rather than deep configuration detail.",
    ],
    architectureDiagram:
      "Developer (Amplify CLI/Studio)\n  |\nAmplify provisions: Cognito (Auth) + AppSync/API Gateway (API) + S3 (Storage)\n  |\nAmplify Hosting builds & deploys the frontend (CI/CD)",
    architectureCaption:
      "Amplify wires together common backend services and adds managed hosting/CI/CD for the frontend.",
    mentorTip:
      "If a scenario mentions a small team wanting to build and deploy a mobile or web app quickly without managing infrastructure themselves, Amplify is a strong recognition-level answer.",
    questionIds: ["q-aws-amplify-1", "q-aws-amplify-2", "q-aws-amplify-3"],
  },
  {
    id: "amazon-api-gateway",
    moduleId: "phase-misc",
    category: "Front-End Web and Mobile",
    title: "Amazon API Gateway",
    shortName: "API Gateway",
    tier: 1,
    domains: [2, 3],
    examImportance: "critical",
    oneLiner:
      "Amazon API Gateway is a fully managed \"front door\" for APIs — REST, HTTP, and WebSocket — that handles throttling, authorization, caching, and routing to backends like Lambda, and is the central connective piece in the classic serverless web app pattern.",
    englishExplanation:
      "API Gateway sits between clients (browsers, mobile apps, other services) and your backend logic, and it comes in three API types. REST APIs are the original, most feature-rich type, supporting request/response transformation (mapping templates), request validation, API keys and usage plans, and response caching. HTTP APIs are a newer, leaner option: lower latency and lower cost for simpler proxy-style integrations (very commonly paired with Lambda), but with a smaller feature set than REST APIs. WebSocket APIs support persistent, bidirectional, real-time connections — useful for chat apps, live dashboards, or multiplayer/collaborative features where the server needs to push data to clients without the client re-polling.\n\nThrottling is a core built-in protection: API Gateway enforces rate and burst limits at the account and stage/method level, and you can layer API keys with usage plans on top to give different clients (or tiers of clients) their own individual rate and quota limits — this protects backend services like Lambda or a database from being overwhelmed by a traffic spike or an abusive client.\n\nAuthorization integrates directly into the request path before it ever reaches your backend code: you can use a Cognito User Pool authorizer to validate a signed-in user's token, a Lambda authorizer (custom, token-based) for your own custom auth logic, IAM authorization for AWS-signed requests, or resource policies to restrict which accounts/VPCs/IP ranges can call the API at all. This means your backend Lambda function does not need to reimplement authentication itself.\n\nCaching is available at the stage level: API Gateway can cache backend responses for a configurable TTL, dramatically cutting both latency and backend load for endpoints that are read frequently but change infrequently, at the cost of a per-hour charge based on the cache size you provision.\n\nAPI Gateway's most important architectural role on the exam is as the middle layer of the classic serverless web application pattern: a static frontend (HTML/CSS/JS) is hosted in S3 and distributed globally via CloudFront; when the frontend needs dynamic data, it calls API Gateway, which triggers a Lambda function, which reads or writes DynamoDB (or another backend) and returns a response back up the chain. This pattern requires no servers to manage anywhere in the stack, scales automatically, and is one of the single most frequently referenced architecture patterns across the whole exam.",
    taglishExplanation:
      "Si API Gateway ang \"front door\" ng mga API mo — dito dumadaan ang lahat ng request bago pumasok sa backend logic (kadalasang Lambda). May tatlong klase: REST API (pinaka-kumpleto ang features — request validation, API keys, usage plans, caching), HTTP API (mas bago, mas mura at mas mabilis, pero mas simple ang features, sikat na pairing sa Lambda), at WebSocket API (para sa real-time, dalawang-daan na komunikasyon gaya ng chat apps o live dashboards). Throttling — proteksyon ito laban sa pagbaha ng request: may rate/burst limits sa account/stage level, at puwede kang gumamit ng API keys + usage plans para magbigay ng sariling limit bawat klyente. Authorization — dito rin isinasama ang pagve-verify kung sino ang tumatawag, gamit ang Cognito authorizer, Lambda authorizer (custom), o IAM — kaya hindi na kailangan ulitin ng backend Lambda mo ang auth logic. Caching — puwede mo i-cache ang sagot sa stage level para bumilis at bumaba ang load sa backend. Ang pinaka-importante: sentro ito ng classic serverless web app pattern — CloudFront -> S3 (static frontend) -> API Gateway -> Lambda -> DynamoDB — walang server na kailangang i-manage sa buong stack na yan.",
    analogy:
      "API Gateway is like the front desk and security checkpoint of an office building. Every visitor (request) checks in there first: the guard checks ID (authorization via Cognito/Lambda authorizer), limits how many people can rush in at once (throttling), and sometimes already has a photocopied answer ready at the desk so visitors don't even need to go upstairs (caching) — only then does a visitor get routed to the right department inside (Lambda/backend).",
    whyItExists:
      "Before API Gateway, teams building an API had to build and maintain their own layer for rate limiting, authentication, request validation, versioning, and monitoring — usually on top of raw EC2/load balancers. API Gateway exists to absorb all of that undifferentiated heavy lifting as a fully managed service, so teams can focus on business logic in Lambda (or any backend) instead of API plumbing.",
    flow: "User -> CloudFront (CDN) -> S3 (static frontend) -> API Gateway (REST/HTTP/WebSocket) -> AWS Lambda -> DynamoDB",
    withoutIt: [
      "Teams must build and operate their own throttling, authentication, and API management layer on EC2/ALB themselves",
      "No unified, managed place to apply API keys, usage plans, request validation, or response caching",
      "Harder to version, secure, and monitor APIs consistently across many backend services",
    ],
    bestUseCases: [
      "Serverless REST/HTTP backends fronting AWS Lambda",
      "Real-time applications needing persistent bidirectional connections (chat, live dashboards) via WebSocket APIs",
      "Exposing multiple internal microservices behind one unified, managed, secured API layer",
      "APIs needing per-client throttling/quotas via API keys and usage plans",
    ],
    poorUseCases: [
      "Very simple internal service-to-service calls where a load balancer alone is sufficient and API-management features are not needed",
      "Extremely high-throughput, latency-sensitive internal traffic at massive scale, where the added hop and per-request cost of API Gateway is not justified compared to a direct ALB/NLB path",
    ],
    alternatives: [
      { need: "Cheapest, simplest way to expose Lambda as an HTTP endpoint", choose: "API Gateway HTTP API" },
      { need: "Full REST feature set (request validation, API keys, usage plans, caching)", choose: "API Gateway REST API" },
      { need: "Real-time, bidirectional communication", choose: "API Gateway WebSocket API" },
      { need: "Plain internal load balancing without API-management features", choose: "Application Load Balancer" },
      { need: "GraphQL API instead of REST/HTTP", choose: "AWS AppSync" },
    ],
    keyFeatures: [
      "Three API types: REST, HTTP, and WebSocket",
      "Throttling via account/stage/method limits, plus API keys and usage plans for per-client quotas",
      "Authorization via Cognito User Pool authorizers, Lambda (custom) authorizers, IAM, or resource policies",
      "Stage-level response caching to reduce latency and backend load",
      "Request/response transformation (mapping templates) and request validation (REST APIs)",
      "Stage-based deployments (dev/test/prod) with canary release support",
      "Native CloudWatch integration for logging, metrics, and monitoring",
      "Custom domain names for a branded API endpoint",
    ],
    availability:
      "API Gateway is a fully managed, regionally resilient service — AWS handles the underlying scaling and multi-AZ redundancy for you, so you never provision or patch servers for it directly.",
    security:
      "Requests can be authorized via Cognito User Pools, custom Lambda authorizers, or IAM/resource policies before ever reaching your backend; throttling itself also serves a security purpose by limiting abuse; API Gateway can integrate with AWS WAF for additional protection and supports mutual TLS for client certificate verification.",
    pricingLogic:
      "You pay per API call (request) plus data transfer, with HTTP APIs generally cheaper than REST APIs for equivalent traffic. Response caching adds an hourly charge based on the cache size you provision. There is no idle/always-on server cost, since the service itself is fully managed and scales with usage.",
    examKeywords: [
      "API front door",
      "throttling",
      "usage plans and API keys",
      "Lambda authorizer",
      "Cognito authorizer",
      "WebSocket API",
      "serverless REST API",
      "CloudFront -> S3 -> API Gateway -> Lambda -> DynamoDB",
    ],
    examTraps: [
      "HTTP APIs are not a strict superset of REST APIs — REST APIs have more features (usage plans, API keys, request validation, caching); HTTP APIs are cheaper/faster but leaner.",
      "API Gateway itself does not store application data — it is the front door only; business logic and data still live in Lambda/DynamoDB or another backend.",
      "Throttling protects backend availability from overload; it is not the same mechanism as authentication/authorization, and both are usually needed together.",
    ],
    architectureDiagram:
      "User\n  |\nCloudFront (CDN)\n  |\nS3 (static frontend)\n  |\nAPI Gateway (REST/HTTP/WebSocket)\n  |\nAWS Lambda\n  |\nDynamoDB",
    architectureCaption:
      "The classic serverless web app pattern: static frontend from S3 via CloudFront, dynamic calls routed through API Gateway to Lambda, backed by DynamoDB.",
    mentorTip:
      "Because this pattern (CloudFront -> S3 -> API Gateway -> Lambda -> DynamoDB) appears constantly across the exam, memorize it as a single mental unit — recognizing any two or three pieces of it in a scenario should immediately suggest the rest.",
    questionIds: [
      "q-amazon-api-gateway-1",
      "q-amazon-api-gateway-2",
      "q-amazon-api-gateway-3",
      "q-amazon-api-gateway-4",
      "q-amazon-api-gateway-5",
    ],
  },
  {
    id: "aws-device-farm",
    moduleId: "phase-misc",
    category: "Front-End Web and Mobile",
    title: "AWS Device Farm",
    shortName: "Device Farm",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "AWS Device Farm lets you test mobile and web applications on real, physical devices hosted in the cloud, instead of only on emulators or a limited in-house device lab.",
    englishExplanation:
      "Device Farm gives you on-demand access to a large lab of real phones, tablets, and browsers across many manufacturers and OS versions. You upload your app build, choose the devices/OS versions to test against, and run automated tests (using common frameworks like Appium, Espresso, or XCTest) or interact with a device remotely and manually — Device Farm returns logs, screenshots, and performance data from each run.",
    taglishExplanation:
      "Si Device Farm ay parang nag-rent ka ng totoong mga phone at tablet sa iba't ibang brand at OS version para subukan ang app mo, imbes na bibili ka mismo ng lahat ng device na iyon. Nag-a-upload ka ng app build, pinipili mo kung anong mga device/OS ang susubukan, at nagpapatakbo ng automated tests o direktang kino-control ang device nang manual — babalik sa'yo ang logs, screenshots, at performance data.",
    analogy:
      "Device Farm is like renting time on a huge wall of real phones and tablets at an electronics store, instead of buying every single model yourself just to check that your app works correctly on each one.",
    whyItExists:
      "The number of mobile device models and OS versions in real use is huge, and maintaining an in-house lab covering all of them is expensive and quickly goes out of date. Device Farm exists to give teams on-demand access to a broad, always-current real-device lab without owning any of the hardware.",
    flow: "Upload app build -> select real devices/OS versions -> Device Farm runs automated or manual tests -> review logs, screenshots, and performance results",
    withoutIt: [
      "Teams must buy and maintain their own physical device lab, with limited device/OS coverage",
      "Compatibility issues on specific real devices may only be discovered after release",
    ],
    bestUseCases: [
      "Testing mobile app compatibility across many real devices and OS versions before release",
      "Browser compatibility testing for web apps across real device/browser combinations",
    ],
    poorUseCases: [
      "Backend load or performance testing of server-side infrastructure — that is not what Device Farm tests",
      "Acting as a full CI/CD pipeline by itself — it integrates with one, but is not a pipeline orchestrator",
    ],
    alternatives: [
      { need: "Test an app on many real physical devices", choose: "AWS Device Farm" },
      { need: "Quick local emulator/simulator-only testing", choose: "Local emulator/simulator tools" },
    ],
    keyFeatures: [
      "On-demand access to a large lab of real phones, tablets, and browsers",
      "Supports common automated test frameworks (Appium, Espresso, XCTest, and others)",
      "Remote manual/interactive access to real devices",
      "Detailed logs, screenshots, and performance metrics per test run",
    ],
    availability:
      "A managed service — AWS handles device availability and lab infrastructure; you consume it on demand without owning any hardware.",
    security:
      "App builds and test artifacts are handled within your AWS account under your IAM permissions; devices are reset between test runs to avoid data leakage between customers.",
    pricingLogic:
      "Device Farm is typically billed per device-minute of testing, or through a metered plan — check current AWS pricing for exact rates rather than assuming a fixed figure.",
    examKeywords: [
      "test on real devices",
      "mobile app compatibility testing",
      "cloud-based device lab",
    ],
    examTraps: [
      "Don't confuse Device Farm with a general-purpose CI/CD or backend load-testing tool — its specific purpose is real-device compatibility testing for mobile/web apps.",
    ],
    architectureDiagram:
      "Developer uploads app build\n  |\nAWS Device Farm (real device lab)\n  |\nAutomated tests / manual interactive session\n  |\nLogs, screenshots, performance results",
    architectureCaption:
      "Device Farm runs your app against real devices in the cloud and returns detailed test results.",
    mentorTip:
      "Recognition-level only: if a scenario mentions testing a mobile or web app against many real physical devices/OS versions in the cloud, that is Device Farm.",
    questionIds: ["q-aws-device-farm-1", "q-aws-device-farm-2", "q-aws-device-farm-3"],
  },
  {
    id: "amazon-comprehend",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "Amazon Comprehend",
    shortName: "Comprehend",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon Comprehend uses natural language processing (NLP) to detect sentiment, entities, key phrases, language, and PII in text — without you training any model.",
    englishExplanation:
      "Comprehend reads text you send it and returns structured insight: overall sentiment (positive/negative/neutral/mixed), named entities (people, places, organizations, dates), key phrases, the detected language, and even PII detection. It is fully pre-trained — you call an API with raw text and get JSON back within moments. Comprehend Medical, a specialized variant, extracts medical information from clinical text, but for the SAA-C03 the general service is what to recognize.",
    taglishExplanation:
      "Si Comprehend ay parang tagabasa na sanay na sanay sa pag-unawa ng damdamin at kahulugan ng text. Padadalhan mo lang ng text (halimbawa customer review), at ibabalik nito kung positive, negative, o neutral ang sentiment, kung sino/ano ang mga entity (pangalan, lugar, petsa), at kung anong wika ginamit — hindi mo na kailangang mag-train ng sarili mong model.",
    analogy:
      "Comprehend is like handing a stack of customer letters to an assistant who instantly tells you the mood of each letter, who and what is mentioned, and what language it's written in — without you training that assistant yourself.",
    whyItExists:
      "Building a custom NLP model to detect sentiment or extract entities from text requires labeled training data, ML expertise, and ongoing maintenance. Comprehend exists so any application can add this capability through a simple API call.",
    flow: "Text (reviews, support tickets, documents) -> Amazon Comprehend API -> structured JSON output (sentiment, entities, key phrases, language, PII)",
    withoutIt: [
      "Teams would need to train and maintain their own NLP models for sentiment/entity extraction",
      "Analyzing large volumes of unstructured text for insight would require significant manual effort or custom ML work",
    ],
    bestUseCases: [
      "Analyzing sentiment in customer reviews, support tickets, or social media mentions at scale",
      "Extracting entities (names, dates, organizations) from unstructured documents",
      "Detecting personally identifiable information (PII) in text before storage or sharing",
    ],
    poorUseCases: [
      "Converting speech to text — that is Amazon Transcribe's job, not Comprehend's",
      "Training a fully custom NLP model for a highly specialized domain — that calls for SageMaker AI",
    ],
    alternatives: [
      { need: "Analyze sentiment/entities in text", choose: "Amazon Comprehend" },
      { need: "Build a custom NLP model from scratch", choose: "Amazon SageMaker AI" },
    ],
    keyFeatures: [
      "Sentiment analysis (positive/negative/neutral/mixed)",
      "Entity recognition (people, places, organizations, dates, quantities)",
      "Key phrase extraction and dominant language detection",
      "PII detection and redaction",
    ],
    availability:
      "A fully managed, regionally available API service; AWS handles all scaling of the underlying model infrastructure.",
    security:
      "API calls are authorized via IAM; sensitive text sent to Comprehend should be evaluated for data residency and compliance requirements.",
    pricingLogic:
      "Billed per unit of text processed (typically per 100-character unit), with no upfront cost — check current AWS pricing for exact rates.",
    examKeywords: [
      "sentiment analysis -> Comprehend",
      "extract entities from text -> Comprehend",
      "detect PII in text -> Comprehend",
    ],
    examTraps: [
      "Don't confuse Comprehend (understands existing text) with Lex (builds conversational interfaces) or Translate (translates between languages) — each targets a different NLP task.",
    ],
    architectureDiagram:
      "Unstructured text (reviews / tickets / documents)\n  |\nAmazon Comprehend\n  |\nSentiment + entities + key phrases + language + PII flags",
    architectureCaption: "Comprehend turns raw text into structured, actionable insight.",
    mentorTip: "If the scenario says 'understand/analyze the meaning or sentiment of text,' think Comprehend.",
    questionIds: ["q-amazon-comprehend-1", "q-amazon-comprehend-2", "q-amazon-comprehend-3"],
  },
  {
    id: "amazon-lex",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "Amazon Lex",
    shortName: "Lex",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon Lex builds conversational chatbots and voice interfaces using the same natural-language-understanding technology behind Alexa.",
    englishExplanation:
      "Lex takes user input (text or voice) and understands intent — what the user is trying to accomplish — then maps it to a Lambda function or backend logic that fulfills the request. You define 'intents' (e.g., 'BookHotel'), sample utterances users might say, and 'slots' (parameters like check-in date), and Lex handles the conversational flow, including asking follow-up questions for missing information.",
    taglishExplanation:
      "Si Lex ang gamit mo kung gusto mong gumawa ng chatbot o voice assistant — kapareho ng teknolohiya sa likod ng Alexa. Nagde-define ka ng mga 'intent' (halimbawa 'MagBookHotel'), mga halimbawang sasabihin ng user, at mga 'slot' na kailangang malaman (petsa ng check-in). Ang Lex na ang bahalang mag-unawa ng sinasabi ng user at magtanong kung may kulang.",
    analogy:
      "Lex is like a trained receptionist who understands what a caller wants even if they phrase it differently each time, asks for any missing details, and then routes the request to the right department (your backend logic) to get it done.",
    whyItExists:
      "Building a natural-language chatbot from scratch requires speech recognition, intent classification, and dialogue management — all nontrivial ML problems. Lex packages all of this so developers can define intents and let Lex handle the conversational understanding.",
    flow: "User speaks/types a request -> Lex identifies intent and required slots -> Lex asks for any missing information -> fulfillment (often via AWS Lambda) -> response returned to user",
    withoutIt: [
      "Teams would need to build their own speech recognition and natural-language-understanding pipeline",
      "Handling varied phrasing and multi-turn conversations would require significant custom dialogue-management code",
    ],
    bestUseCases: [
      "Building a customer service chatbot for a website or app",
      "Creating a voice-activated interface for an IVR (interactive voice response) phone system",
    ],
    poorUseCases: [
      "Converting a block of text to speech — that is Amazon Polly's job",
      "One-way translation of text between languages — that is Amazon Translate's job",
    ],
    alternatives: [
      { need: "Build a conversational chatbot/voice bot", choose: "Amazon Lex" },
      { need: "Convert text into speech", choose: "Amazon Polly" },
    ],
    keyFeatures: [
      "Automatic speech recognition (ASR) and natural language understanding (NLU)",
      "Intent and slot-based conversation design",
      "Built-in integration with AWS Lambda for fulfillment",
      "Multi-channel support (voice, chat, messaging platforms)",
    ],
    availability:
      "A fully managed, regionally available service; AWS scales the underlying speech/NLU models automatically.",
    security:
      "Access controlled via IAM; conversations can carry sensitive user input, so apply the same data-handling care as any user-facing input channel.",
    pricingLogic:
      "Billed per text or speech request processed — check current AWS pricing for exact per-request rates.",
    examKeywords: [
      "conversational chatbot -> Lex",
      "voice interface / IVR -> Lex",
      "same technology as Alexa -> Lex",
    ],
    examTraps: [
      "Lex is for understanding and responding to conversation, not converting text to speech (that's Polly) or translating languages (that's Translate) — don't mix these up.",
    ],
    architectureDiagram:
      "User (voice/text) -> Amazon Lex (intent + slot recognition) -> AWS Lambda (fulfillment logic) -> Response back to user",
    architectureCaption: "Lex handles the conversational understanding; Lambda typically handles the actual fulfillment logic.",
    mentorTip: "'Chatbot' or 'voice bot' in a scenario almost always means Lex.",
    questionIds: ["q-amazon-lex-1", "q-amazon-lex-2", "q-amazon-lex-3"],
  },
  {
    id: "amazon-polly",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "Amazon Polly",
    shortName: "Polly",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner: "Amazon Polly converts written text into lifelike, natural-sounding speech (text-to-speech).",
    englishExplanation:
      "Polly takes text as input and returns an audio stream or file of that text spoken aloud, using deep-learning-based voices across many languages and accents. It supports SSML (Speech Synthesis Markup Language) for fine control over pronunciation, pauses, and emphasis, and offers both standard and more realistic 'Neural' voices.",
    taglishExplanation:
      "Si Polly ay simpleng text-to-speech — binibigay mo ang text, at ibabalik nito ang audio ng pagbigkas nito sa natural na paraan, may iba't ibang wika at accent. May 'Neural' voices pa para mas makatotohanan ang tunog.",
    analogy:
      "Polly is like a highly skilled voice actor who instantly reads any script you hand over out loud, in a natural-sounding voice, in whatever language or accent you choose.",
    whyItExists:
      "Building natural-sounding speech synthesis from scratch requires deep learning models trained on large voice datasets. Polly exists so any application can add spoken audio output through a simple API call.",
    flow: "Text (with optional SSML markup) -> Amazon Polly -> synthesized speech audio (stream or file)",
    withoutIt: [
      "Applications would have no easy way to convert text content into natural spoken audio",
      "Accessibility features that read content aloud would require expensive custom voice-synthesis development",
    ],
    bestUseCases: [
      "Reading content aloud for accessibility (screen-reader-like experiences)",
      "Voice responses in an IVR system or virtual assistant",
      "Generating narrated audio for e-learning or video content",
    ],
    poorUseCases: [
      "Converting spoken audio into text — that is Amazon Transcribe's job, the opposite direction",
      "Understanding the meaning/intent of speech — that is Amazon Lex's job",
    ],
    alternatives: [
      { need: "Convert text to speech", choose: "Amazon Polly" },
      { need: "Convert speech to text", choose: "Amazon Transcribe" },
    ],
    keyFeatures: [
      "Deep-learning-based, lifelike voices across many languages/accents",
      "SSML support for pronunciation, pauses, and emphasis control",
      "Standard and higher-fidelity Neural voice engines",
      "Streaming or file-based audio output",
    ],
    availability: "A fully managed, regionally available API service with automatic scaling.",
    security:
      "API access controlled via IAM; generated audio can be encrypted in transit and at rest like any other stored media.",
    pricingLogic:
      "Billed per character of text converted to speech, with Neural voices priced higher than standard voices — check current AWS pricing for exact rates.",
    examKeywords: ["text-to-speech -> Polly", "natural-sounding voice output -> Polly"],
    examTraps: [
      "Remember the direction: Polly is text -> speech. Transcribe is speech -> text. Mixing these two up is the most common exam trap for this pair.",
    ],
    architectureDiagram: "Text + SSML markup\n  |\nAmazon Polly\n  |\nSynthesized speech audio (stream/file)",
    architectureCaption: "Polly turns written text into natural-sounding spoken audio.",
    mentorTip: "Text going IN, audio coming OUT = Polly. Keep that direction fixed in memory.",
    questionIds: ["q-amazon-polly-1", "q-amazon-polly-2", "q-amazon-polly-3"],
  },
  {
    id: "amazon-rekognition",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "Amazon Rekognition",
    shortName: "Rekognition",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon Rekognition analyzes images and video to detect objects, scenes, faces, text, and inappropriate content, using pre-trained computer vision models.",
    englishExplanation:
      "Rekognition accepts an image or video (from S3 or a live stream) and returns labels for detected objects/scenes, facial analysis (attributes, comparison, and recognition against a stored collection), text found in the image, and content moderation flags for unsafe content. It also supports custom labels for detecting objects specific to your own use case when the built-in labels aren't enough.",
    taglishExplanation:
      "Si Rekognition ay parang taong may matalim na paningin — binibigay mo ang litrato o video, at kaya nitong tukuyin ang mga bagay, tao/mukha, text na nakasulat, at kahit content na hindi angkop ipakita (content moderation). May Custom Labels pa kung gusto mong turuan itong kumilala ng sarili mong specific na bagay.",
    analogy:
      "Rekognition is like handing a photo or video clip to someone with expert visual analysis skills, who instantly tells you what objects and people are in it, reads any visible text, and flags anything inappropriate.",
    whyItExists:
      "Building custom computer-vision models for object detection, facial analysis, or content moderation requires large labeled image datasets and deep ML expertise. Rekognition exists so applications can add these capabilities through a simple API call.",
    flow: "Image/video (from S3 or live stream) -> Amazon Rekognition -> labels, facial analysis, text detection, or moderation flags",
    withoutIt: [
      "Teams would need to train and host their own computer vision models for image/video analysis",
      "Detecting inappropriate content or specific faces at scale would require significant custom ML infrastructure",
    ],
    bestUseCases: [
      "Moderating user-uploaded images/video for inappropriate content at scale",
      "Facial verification for identity checks (comparing a live photo to a stored ID photo)",
      "Searchable media libraries tagged automatically by detected objects/scenes",
    ],
    poorUseCases: [
      "Extracting structured text/data from scanned forms or invoices — that is Amazon Textract's more specialized job",
      "Analyzing the sentiment of written text — that is Amazon Comprehend's job",
    ],
    alternatives: [
      { need: "Analyze images/video for objects, faces, or moderation", choose: "Amazon Rekognition" },
      { need: "Extract structured text/data from documents", choose: "Amazon Textract" },
    ],
    keyFeatures: [
      "Object and scene detection with confidence scores",
      "Facial analysis, comparison, and recognition against a stored face collection",
      "Text detection within images",
      "Content moderation and Custom Labels for domain-specific objects",
    ],
    availability:
      "A fully managed, regionally available API service with automatic scaling for image/video processing.",
    security:
      "Access controlled via IAM; facial recognition features carry privacy/compliance implications that should be reviewed against applicable regulations before use.",
    pricingLogic:
      "Billed per image analyzed or per minute of video processed, with different rates per feature (labels vs. facial analysis vs. moderation) — check current AWS pricing for exact rates.",
    examKeywords: [
      "image/video analysis -> Rekognition",
      "facial recognition/comparison -> Rekognition",
      "content moderation for images -> Rekognition",
    ],
    examTraps: [
      "Don't confuse Rekognition (visual content: images/video) with Textract (structured text/data extraction from documents) — a scanned invoice question points to Textract, not Rekognition.",
    ],
    architectureDiagram:
      "Image/video (S3 or live stream)\n  |\nAmazon Rekognition\n  |\nLabels + faces + text-in-image + moderation flags",
    architectureCaption: "Rekognition applies computer vision to images and video without you training a model.",
    mentorTip: "'Photo/video' + 'detect/recognize/moderate' = Rekognition. 'Scanned document' + 'extract' = Textract.",
    questionIds: ["q-amazon-rekognition-1", "q-amazon-rekognition-2", "q-amazon-rekognition-3"],
  },
  {
    id: "amazon-sagemaker-ai",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "Amazon SageMaker AI",
    shortName: "SageMaker AI",
    tier: 3,
    domains: [3],
    examImportance: "medium",
    oneLiner:
      "Amazon SageMaker AI is a full platform for building, training, tuning, and deploying your own custom machine learning models, for the cases none of AWS's pre-built AI services fit.",
    englishExplanation:
      "Unlike Comprehend, Lex, Polly, Rekognition, Textract, Transcribe, and Translate — which are single-purpose, pre-trained services — SageMaker AI is a general-purpose platform: it provides managed Jupyter notebooks for experimentation, managed training infrastructure (including distributed training and Spot-instance-based cost savings), model tuning, and managed hosting/endpoints for deploying a trained model into production. You use SageMaker AI when your problem is specific enough that no existing pre-built AWS AI service already solves it.",
    taglishExplanation:
      "Kung ang ibang ML service ng AWS ay parang mga ready-made na kagamitan, si SageMaker AI naman ay ang buong pabrika — dito ka gagawa, magte-train, at magde-deploy ng sarili mong ML model kapag wala talagang existing service na bagay sa specific na problema mo. May managed notebooks, managed training, at managed hosting/endpoints ito.",
    analogy:
      "If Comprehend, Rekognition, and the rest are ready-made specialist tools, SageMaker AI is the fully equipped workshop where you build, test, and manufacture a brand-new custom tool from scratch when none of the ready-made ones fit the job.",
    whyItExists:
      "Not every ML problem fits one of the pre-built, single-purpose AWS AI services. SageMaker AI exists to give data scientists and ML engineers a fully managed environment for the entire custom model lifecycle — without having to provision and manage their own training/hosting infrastructure.",
    flow: "Prepare/label training data -> build & experiment in a SageMaker notebook -> train the model on managed training infrastructure -> tune hyperparameters -> deploy to a managed SageMaker endpoint -> serve real-time or batch predictions",
    withoutIt: [
      "Teams would need to provision, manage, and scale their own ML training and hosting infrastructure",
      "Building a reproducible ML pipeline (data prep, training, tuning, deployment) would require significant custom engineering",
    ],
    bestUseCases: [
      "Training a genuinely custom model for a problem specific to the business (e.g., custom fraud-detection scoring, custom demand forecasting)",
      "Needing full control over model architecture, training data, and deployment — beyond what a pre-built AI service offers",
    ],
    poorUseCases: [
      "Common, well-defined tasks like sentiment analysis, text-to-speech, or document text extraction — using SageMaker AI here means unnecessary time and ML expertise overhead versus a pre-built service",
      "Quick prototyping when a pre-built API already solves the exact problem",
    ],
    alternatives: [
      { need: "Solve a common, well-defined AI task (sentiment, speech, vision, translation)", choose: "The matching pre-built AI service (Comprehend/Polly/Rekognition/Translate/etc.)" },
      { need: "Build/train/deploy a genuinely custom ML model", choose: "Amazon SageMaker AI" },
    ],
    keyFeatures: [
      "Managed Jupyter notebooks for ML experimentation",
      "Managed, scalable model training (including distributed and Spot-based training)",
      "Automatic model tuning (hyperparameter optimization)",
      "Managed real-time and batch inference endpoints for deployment",
    ],
    availability:
      "A fully managed platform; training and hosting infrastructure scale on demand within your chosen instance types and regions.",
    security:
      "IAM controls access to notebooks, training jobs, and endpoints; training data and models can be encrypted at rest and accessed only within your VPC when configured for private networking.",
    pricingLogic:
      "Billed based on the compute resources consumed for notebooks, training jobs, and hosting endpoints — you pay only while these resources are running, similar to EC2-style compute billing.",
    examKeywords: ["build/train a custom ML model -> SageMaker AI", "no existing service fits the ML need -> SageMaker AI"],
    examTraps: [
      "The exam trap is choosing SageMaker AI when a simpler, pre-built AI service already solves the described problem — always check whether Comprehend/Lex/Polly/Rekognition/Textract/Transcribe/Translate already covers the exact use case first.",
    ],
    architectureDiagram:
      "Training data -> SageMaker notebook (experiment) -> SageMaker training job -> tuned model -> SageMaker endpoint -> real-time/batch predictions",
    architectureCaption: "SageMaker AI covers the full custom-model lifecycle when no pre-built AI service fits.",
    mentorTip: "SageMaker AI is the answer only when the scenario explicitly needs a custom-trained model — otherwise, look for the matching pre-built service first.",
    questionIds: ["q-amazon-sagemaker-ai-1", "q-amazon-sagemaker-ai-2", "q-amazon-sagemaker-ai-3"],
  },
  {
    id: "amazon-textract",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "Amazon Textract",
    shortName: "Textract",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon Textract automatically extracts text, handwriting, forms, and tables from scanned documents — going beyond simple optical character recognition (OCR).",
    englishExplanation:
      "Textract doesn't just read raw text like basic OCR — it understands document structure: it can identify form fields and their values (key-value pairs), extract table data preserving rows/columns, and detect handwriting alongside printed text. You send it a scanned image or PDF (often from S3), and it returns structured, machine-readable data instead of a flat block of text.",
    taglishExplanation:
      "Si Textract ay parang sobrang husay na tagabasa ng dokumento — hindi lang basic OCR, kundi naiintindihan din nito ang istruktura: alam nitong ito ay 'field' at ang katapat na 'value,' o ito ay talahanayan/table. Padadalhan mo ng scanned na dokumento (mula sa S3), at ibabalik nito ang organized/structured na data, hindi lang plain text.",
    analogy:
      "If basic OCR is like someone who can only read the words on a page out loud, Textract is like an assistant who reads a form and hands you back a neatly organized spreadsheet of exactly which field had which value, and which numbers belonged to which row and column.",
    whyItExists:
      "Manually keying data from scanned forms, invoices, and IDs is slow and error-prone, and basic OCR alone loses the document's structure (which text belongs to which field or table cell). Textract exists to automate structured data extraction from scanned documents at scale.",
    flow: "Scanned document/PDF (often in S3) -> Amazon Textract -> structured output: raw text, key-value form pairs, and table data",
    withoutIt: [
      "Teams would need manual data entry to digitize scanned forms, invoices, or IDs",
      "Basic OCR alone would lose the structural relationship between form fields, labels, and table cells",
    ],
    bestUseCases: [
      "Automating data entry from scanned invoices, receipts, or tax forms",
      "Extracting structured table data from scanned reports",
      "Processing identity documents (IDs, passports) for verification workflows",
    ],
    poorUseCases: [
      "Analyzing sentiment or meaning within already-digital text — that is Amazon Comprehend's job",
      "Detecting objects, scenes, or faces in general photos — that is Amazon Rekognition's job",
    ],
    alternatives: [
      { need: "Extract structured text/data from scanned documents", choose: "Amazon Textract" },
      { need: "Analyze general images for objects/faces", choose: "Amazon Rekognition" },
    ],
    keyFeatures: [
      "Key-value pair extraction from forms",
      "Table extraction preserving row/column structure",
      "Handwriting and printed text recognition",
      "Integration with S3 for batch document processing",
    ],
    availability:
      "A fully managed, regionally available API service with automatic scaling for document processing volume.",
    security:
      "Access controlled via IAM; documents often contain sensitive personal or financial data, so encryption at rest/in transit and least-privilege access are especially important.",
    pricingLogic:
      "Billed per page processed, with different rates for basic text detection versus forms/table analysis — check current AWS pricing for exact rates.",
    examKeywords: [
      "extract text/data from scanned forms -> Textract",
      "extract tables from documents -> Textract",
      "OCR plus structure -> Textract",
    ],
    examTraps: [
      "If a scenario only needs plain text from an image with no structure (no forms/tables), Rekognition's basic text detection could technically apply — but 'forms,' 'tables,' or 'key-value pairs' point specifically to Textract.",
    ],
    architectureDiagram: "Scanned document/PDF (S3)\n  |\nAmazon Textract\n  |\nRaw text + key-value form pairs + table data",
    architectureCaption: "Textract extracts structured data, not just raw text, from scanned documents.",
    mentorTip: "'Scanned form/invoice' + 'extract structured data' = Textract, every time.",
    questionIds: ["q-amazon-textract-1", "q-amazon-textract-2", "q-amazon-textract-3"],
  },
  {
    id: "amazon-transcribe",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "Amazon Transcribe",
    shortName: "Transcribe",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon Transcribe converts spoken audio into written text (speech-to-text), including support for real-time streaming and multiple speakers.",
    englishExplanation:
      "Transcribe takes an audio file or live audio stream and returns a text transcript, with optional speaker labeling (identifying who said what), custom vocabulary for domain-specific terms, and automatic punctuation. Amazon Transcribe Medical is a specialized variant for medical dictation and conversation, but the general service is what matters for the SAA-C03.",
    taglishExplanation:
      "Si Transcribe ay ang kabaligtaran ng Polly — binibigay mo ang audio (recorded o live stream), at ibabalik nito ang text ng sinabi. Kaya rin nitong tukuyin kung sinong speaker ang nagsalita, at tumatanggap ng custom vocabulary para sa mga specific na termino ng industriya mo.",
    analogy:
      "Transcribe is like a professional stenographer who listens to a recording or live call and instantly types out exactly what was said, even noting which speaker said which part.",
    whyItExists:
      "Manually transcribing audio recordings or live calls into text is slow and labor-intensive. Transcribe exists so applications can automatically convert spoken audio into searchable, analyzable text.",
    flow: "Audio file or live audio stream -> Amazon Transcribe -> text transcript (with optional speaker labels and punctuation)",
    withoutIt: [
      "Teams would need manual transcription of recorded audio or live calls",
      "Searching, analyzing, or archiving spoken content as text would require significant manual effort",
    ],
    bestUseCases: [
      "Transcribing customer service call recordings for analysis or compliance archiving",
      "Generating live captions for video streams or meetings",
      "Creating searchable text transcripts of podcasts or recorded meetings",
    ],
    poorUseCases: [
      "Converting text back into spoken audio — that is Amazon Polly's job, the opposite direction",
      "Understanding the intent/meaning behind a conversation to trigger an action — that is Amazon Lex's job",
    ],
    alternatives: [
      { need: "Convert speech to text", choose: "Amazon Transcribe" },
      { need: "Convert text to speech", choose: "Amazon Polly" },
    ],
    keyFeatures: [
      "Batch and real-time streaming transcription",
      "Automatic speaker diarization (labeling who spoke when)",
      "Custom vocabulary support for domain-specific terms",
      "Automatic punctuation and formatting",
    ],
    availability:
      "A fully managed, regionally available API service supporting both batch and real-time streaming transcription.",
    security:
      "Access controlled via IAM; transcribed audio content (which may include sensitive conversations) should be handled with the same data-protection care as its source recordings.",
    pricingLogic:
      "Billed per second (or minute) of audio processed, with streaming transcription typically priced differently from batch — check current AWS pricing for exact rates.",
    examKeywords: ["speech-to-text -> Transcribe", "call recording transcription -> Transcribe", "live captioning -> Transcribe"],
    examTraps: [
      "Remember the direction: Transcribe is speech -> text. Polly is text -> speech. This exact pair is a favorite recognition-level exam trap.",
    ],
    architectureDiagram: "Audio file / live stream\n  |\nAmazon Transcribe\n  |\nText transcript (+ speaker labels, punctuation)",
    architectureCaption: "Transcribe turns spoken audio into a written transcript.",
    mentorTip: "Audio going IN, text coming OUT = Transcribe. Keep that direction fixed opposite of Polly.",
    questionIds: ["q-amazon-transcribe-1", "q-amazon-transcribe-2", "q-amazon-transcribe-3"],
  },
  {
    id: "amazon-translate",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "Amazon Translate",
    shortName: "Translate",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner: "Amazon Translate provides fast, fluent machine translation of text between languages using neural machine translation.",
    englishExplanation:
      "Translate accepts text in a source language and returns it translated into a target language, supporting dozens of languages and both real-time (synchronous) and batch (asynchronous, for large document sets) translation. It uses neural machine translation, which produces more natural, context-aware translations than older rule-based approaches.",
    taglishExplanation:
      "Si Translate ay simpleng tagasalin ng wika — ibinibigay mo ang text sa isang wika, at ibabalik nito ito nang naisalin sa target na wika. May real-time translation ito para sa maliliit na text, at batch translation naman para sa maraming dokumento nang sabay-sabay.",
    analogy:
      "Translate is like having a professional interpreter instantly rewrite any document or message into another language, keeping the meaning natural rather than a stiff word-for-word conversion.",
    whyItExists:
      "Building a high-quality machine translation model requires massive multilingual training data and ongoing model improvement. Translate exists so applications can add fluent, near-instant translation between languages through a simple API call.",
    flow: "Text in source language -> Amazon Translate -> translated text in target language",
    withoutIt: [
      "Applications serving a global audience would need a third-party or custom translation solution",
      "Localizing large volumes of content into multiple languages would be slow and costly to do manually",
    ],
    bestUseCases: [
      "Translating user-generated content or support tickets for a global user base",
      "Localizing application content or documentation into multiple languages at scale",
      "Real-time translation of chat messages between users speaking different languages",
    ],
    poorUseCases: [
      "Understanding the sentiment or intent of text — that is Amazon Comprehend's or Lex's job, not Translate's",
      "Converting text to spoken audio — that is Amazon Polly's job",
    ],
    alternatives: [
      { need: "Translate text between languages", choose: "Amazon Translate" },
      { need: "Analyze sentiment/meaning of text", choose: "Amazon Comprehend" },
    ],
    keyFeatures: [
      "Neural machine translation across dozens of language pairs",
      "Real-time (synchronous) translation for short text",
      "Batch (asynchronous) translation for large document sets",
      "Custom terminology support for domain-specific vocabulary",
    ],
    availability:
      "A fully managed, regionally available API service with automatic scaling for both real-time and batch translation workloads.",
    security:
      "Access controlled via IAM; translated content should follow the same data-handling and residency considerations as the original source text.",
    pricingLogic:
      "Billed per character of text translated, with batch translation of large volumes typically following the same per-character model — check current AWS pricing for exact rates.",
    examKeywords: ["translate text between languages -> Translate", "localize content for global users -> Translate"],
    examTraps: [
      "Translate only changes language — it does not analyze meaning (Comprehend) or generate speech (Polly). A scenario needing both translation and voice output requires chaining Translate with Polly.",
    ],
    architectureDiagram: "Text (source language)\n  |\nAmazon Translate\n  |\nText (target language)\n\n(Need spoken output too?) -> chain with Amazon Polly",
    architectureCaption: "Translate converts text between languages; chain with Polly for translated speech.",
    mentorTip: "'Translate between languages' = Translate. If the scenario also wants it spoken aloud, that's Translate + Polly together.",
    questionIds: ["q-amazon-translate-1", "q-amazon-translate-2", "q-amazon-translate-3"],
  },
  {
    id: "amazon-elastic-transcoder",
    moduleId: "phase-misc",
    category: "Media Services",
    title: "Amazon Elastic Transcoder",
    shortName: "Elastic Transcoder",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon Elastic Transcoder converts (transcodes) video and audio files from their source format into the formats and resolutions needed for different devices.",
    englishExplanation:
      "You upload a source media file (commonly to S3), define one or more output 'presets' (format, resolution, bitrate) matching the devices you need to support (phones, tablets, browsers, smart TVs), and Elastic Transcoder converts the file into each target format without you running your own transcoding servers.",
    taglishExplanation:
      "Si Elastic Transcoder ay parang video conversion shop — nag-a-upload ka ng orihinal na video file, pinipili mo ang mga output format/resolution na kailangan mo para sa iba't ibang device, at kino-convert nito ang file nang hindi mo kailangang magpatakbo ng sarili mong transcoding server.",
    analogy:
      "Elastic Transcoder is like a print shop that takes your one master photo and produces perfectly sized prints for every frame size a customer might want — except here it's video files and device formats instead of photo prints.",
    whyItExists:
      "Different devices and players require different video formats, resolutions, and bitrates, and running your own fleet of transcoding servers to handle this is expensive and operationally heavy. Elastic Transcoder exists to remove that operational burden.",
    flow: "Source video/audio file (S3) -> Elastic Transcoder job with output presets -> transcoded files in target formats/resolutions (S3)",
    withoutIt: [
      "Teams would need to build and scale their own custom video transcoding pipeline",
      "Supporting many device formats/resolutions would require significant custom infrastructure and maintenance",
    ],
    bestUseCases: [
      "Converting uploaded video files into multiple formats/resolutions for web, mobile, and smart-TV playback",
      "Batch-converting a media library into a new standard format",
    ],
    poorUseCases: [
      "Ingesting or processing live, real-time video streams — that is Amazon Kinesis Video Streams' job, not Elastic Transcoder's",
      "Analyzing video content for objects or moderation — that is Amazon Rekognition's job",
    ],
    alternatives: [
      { need: "Convert video files between formats/resolutions", choose: "Amazon Elastic Transcoder" },
      { need: "Ingest and store live video streams", choose: "Amazon Kinesis Video Streams" },
    ],
    keyFeatures: [
      "Converts source media into multiple output formats/resolutions/bitrates in one job",
      "Predefined and custom transcoding presets",
      "Reads from and writes to Amazon S3",
      "Pay only for the media actually transcoded",
    ],
    availability:
      "A fully managed, regionally available service; AWS handles the underlying transcoding compute infrastructure and its scaling.",
    security:
      "Access controlled via IAM; source and output files stored in S3 can use standard S3 encryption and bucket policies.",
    pricingLogic:
      "Billed per minute of output media transcoded, with pricing varying by output resolution/definition (SD vs HD vs 4K) — check current AWS pricing for exact rates.",
    examKeywords: ["transcode/convert video files -> Elastic Transcoder", "batch video format conversion -> Elastic Transcoder"],
    examTraps: [
      "Don't confuse Elastic Transcoder (batch conversion of existing files) with Kinesis Video Streams (ingesting live video) — 'convert/transcode a file' points here; 'ingest a live camera feed' points to Kinesis Video Streams.",
    ],
    architectureDiagram:
      "Source video file (S3)\n  |\nAmazon Elastic Transcoder (output presets)\n  |\nTranscoded files: multiple formats/resolutions (S3)",
    architectureCaption: "Elastic Transcoder batch-converts existing media files into the formats each device needs.",
    mentorTip: "'Convert/transcode an existing video file' = Elastic Transcoder. 'Ingest a live video feed' = Kinesis Video Streams.",
    questionIds: ["q-amazon-elastic-transcoder-1", "q-amazon-elastic-transcoder-2", "q-amazon-elastic-transcoder-3"],
  },
  {
    id: "amazon-kinesis-video-streams",
    moduleId: "phase-misc",
    category: "Media Services",
    title: "Amazon Kinesis Video Streams",
    shortName: "Kinesis Video Streams",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon Kinesis Video Streams securely ingests, processes, and durably stores live or batch video (and other time-encoded media) from devices like cameras, for playback or further analysis.",
    englishExplanation:
      "Kinesis Video Streams is built for capturing streaming video (and audio, RADAR, LIDAR, or other time-encoded data) from thousands of connected devices — such as security cameras, doorbells, or IoT sensors — durably storing it, and making it available for playback, batch processing, or feeding into machine-learning-based analysis (including integration with Rekognition Video). It is a different tool from Kinesis Data Streams, which handles generic real-time data records rather than video specifically.",
    taglishExplanation:
      "Si Kinesis Video Streams ay parang conveyor belt na kumukuha ng live video feed mula sa libu-libong device (security camera, IoT sensor), maayos itong itinatago, at magagamit mo ito para sa playback o para pang-analysis (kasama na ang pag-integrate sa Rekognition Video). Iba ito sa Kinesis Data Streams na para sa generic real-time data records, hindi specifically video.",
    analogy:
      "Kinesis Video Streams is like a bank of continuously running security-camera recorders that capture, store, and organize footage from every camera in a large building network, ready for you to review or analyze later.",
    whyItExists:
      "Reliably capturing and durably storing continuous live video streams from many devices at scale requires purpose-built ingestion and storage infrastructure. Kinesis Video Streams exists to remove that operational burden and provide a foundation for video analytics.",
    flow: "Camera/IoT device streams live video -> Kinesis Video Streams ingests and durably stores it -> video played back, batch-processed, or fed into ML-based analysis (e.g., Rekognition Video)",
    withoutIt: [
      "Reliably ingesting and storing continuous live video from many devices at scale would require significant custom infrastructure",
      "Feeding live video into machine-learning-based analysis pipelines would be far more complex to build from scratch",
    ],
    bestUseCases: [
      "Ingesting live video from security cameras or doorbell devices at scale",
      "Building a pipeline that feeds live video into ML-based analysis (e.g., detecting objects or people)",
      "Storing time-encoded sensor data (RADAR, LIDAR) alongside video for autonomous-vehicle or robotics use cases",
    ],
    poorUseCases: [
      "Converting existing video files between formats — that is Amazon Elastic Transcoder's job, not Kinesis Video Streams'",
      "Processing generic real-time data records (like clickstreams or IoT telemetry) unrelated to video — that is Kinesis Data Streams' job",
    ],
    alternatives: [
      { need: "Ingest and store live video streams", choose: "Amazon Kinesis Video Streams" },
      { need: "Process generic real-time data records", choose: "Amazon Kinesis Data Streams" },
    ],
    keyFeatures: [
      "Ingests live or batch video (and other time-encoded media) from many devices at once",
      "Durable storage with configurable retention",
      "Playback via a built-in HLS-based streaming API",
      "Integrates with Rekognition Video and other ML services for analysis",
    ],
    availability:
      "A fully managed, regionally available service that scales automatically to handle many concurrent device streams.",
    security:
      "Access controlled via IAM; streams can be encrypted at rest and in transit, which matters given the sensitivity of video/surveillance data.",
    pricingLogic:
      "Billed based on data ingested, stored, and retrieved (played back or consumed for processing) — check current AWS pricing for exact rates.",
    examKeywords: ["ingest live video from cameras/IoT -> Kinesis Video Streams", "video analytics pipeline -> Kinesis Video Streams"],
    examTraps: [
      "Don't confuse Kinesis Video Streams (video-specific ingestion) with Kinesis Data Streams (generic real-time data records) — the exam tests this distinction directly.",
    ],
    architectureDiagram:
      "Cameras/IoT devices (live video)\n  |\nAmazon Kinesis Video Streams\n  |\nDurable storage -> playback / Rekognition Video analysis",
    architectureCaption: "Kinesis Video Streams ingests and stores live video for playback or ML-based analysis.",
    mentorTip: "'Live video/camera feed ingestion' = Kinesis Video Streams. 'Generic real-time data records' = Kinesis Data Streams.",
    questionIds: ["q-amazon-kinesis-video-streams-1", "q-amazon-kinesis-video-streams-2", "q-amazon-kinesis-video-streams-3"],
  },
  {
    id: "aws-cli",
    moduleId: "phase-misc",
    category: "Management and Governance",
    title: "AWS CLI",
    shortName: "AWS CLI",
    tier: 3,
    domains: [4],
    examImportance: "low",
    oneLiner:
      "The AWS Command Line Interface (CLI) lets you control AWS services by typing commands in a terminal, making AWS operations scriptable and automatable.",
    englishExplanation:
      "The AWS CLI is a unified tool that lets you interact with virtually every AWS service using text commands instead of clicking through the Management Console. Because commands can be saved in scripts, the CLI is the natural choice for repeatable, auditable operations, and it underpins many infrastructure-as-code and CI/CD workflows that need to call AWS programmatically without a human clicking buttons.",
    taglishExplanation:
      "Ang AWS CLI ay parang remote control gamit ang keyboard — sa halip na mag-click sa Console, nagta-type ka ng command para kontrolin ang AWS services mo. Dahil puwede itong isulat sa script, perfect ito para sa mga paulit-ulit na gawain na gusto mong i-automate.",
    analogy:
      "The CLI is like giving instructions to AWS by typing exact commands instead of clicking around a control panel — slower to learn at first, but far faster and more repeatable once you know the commands, especially when you need to do the same thing hundreds of times.",
    whyItExists:
      "Manually clicking through the Console does not scale for repeatable, auditable, or automated operations. The CLI exists to give developers and operators a scriptable, programmatic way to manage AWS resources.",
    flow: "Write/run a CLI command (or script of commands) -> CLI calls the underlying AWS API -> AWS service performs the requested action -> CLI returns the result",
    withoutIt: [
      "Every AWS operation would require manually clicking through the Management Console",
      "Automating repeatable tasks (backups, deployments, cleanup) would be far harder without a scriptable interface",
    ],
    bestUseCases: [
      "Scripting repeatable AWS operations (deployments, backups, resource cleanup)",
      "Integrating AWS actions into CI/CD pipelines or automation scripts",
      "Quickly querying or modifying resources without leaving the terminal",
    ],
    poorUseCases: [
      "One-off, exploratory browsing of resources when you're unfamiliar with what exists — the Console's visual browsing is often faster for that",
      "Complex, stateful infrastructure provisioning better suited to CloudFormation or another infrastructure-as-code tool",
    ],
    alternatives: [
      { need: "Script/automate AWS operations", choose: "AWS CLI" },
      { need: "Visually browse and manage AWS resources", choose: "AWS Management Console" },
    ],
    keyFeatures: [
      "Text-based commands covering virtually every AWS service and API action",
      "Scriptable — commands can be chained or saved as reusable scripts",
      "Supports named profiles for multiple AWS accounts/credentials",
      "Cross-platform (Windows, macOS, Linux)",
    ],
    availability:
      "A client-side tool you install locally (or use via CloudShell); it calls the same underlying AWS APIs available in every Region.",
    security:
      "CLI actions are authorized by the IAM credentials/profile configured on the machine running it — the same least-privilege principles apply as anywhere else in AWS.",
    pricingLogic:
      "The CLI itself is free; you are only billed for the AWS resources/actions it triggers, exactly as if you'd performed them another way.",
    examKeywords: ["scriptable AWS access -> CLI", "automate repeatable operations -> CLI"],
    examTraps: [
      "The CLI is just an interface — it doesn't change what a service costs or how it behaves; don't assume 'using the CLI' by itself makes something cheaper or more scalable.",
    ],
    architectureDiagram: "Terminal command (or script)\n  |\nAWS CLI\n  |\nAWS API\n  |\nAWS service performs the action",
    architectureCaption: "The CLI is a scriptable interface to the same AWS APIs behind the Console.",
    mentorTip: "'Automate/script a repeatable AWS task' points to the CLI (or infrastructure as code); 'click around visually' points to the Console.",
    questionIds: ["q-aws-cli-1", "q-aws-cli-2", "q-aws-cli-3"],
  },
  {
    id: "aws-management-console",
    moduleId: "phase-misc",
    category: "Management and Governance",
    title: "AWS Management Console",
    shortName: "Console",
    tier: 3,
    domains: [4],
    examImportance: "low",
    oneLiner: "The AWS Management Console is the web-based, visual interface for browsing, configuring, and managing AWS resources.",
    englishExplanation:
      "The Console is the browser-based dashboard most people use when they first start with AWS: point-and-click navigation across every AWS service, visual resource configuration, and built-in dashboards and wizards. It is ideal for exploration, one-off configuration changes, and visually understanding relationships between resources, but it doesn't scale well for repeatable or bulk operations the way scripting does.",
    taglishExplanation:
      "Ang Management Console ay ang visual, browser-based na paraan ng pamamahala sa AWS — dito ka mag-cli-click para tingnan o baguhin ang mga resources mo. Maganda ito para sa unang pagsubok, exploratory browsing, at mabilis na one-off na pagbabago, pero hindi ito ang pinakamainam para sa paulit-ulit o maramihang operasyon.",
    analogy:
      "The Console is like a car's dashboard with visual dials and buttons you can see and click, versus the CLI which is like giving verbal driving instructions — both drive the same car (AWS), but one is visual and exploratory, the other is scriptable and repeatable.",
    whyItExists:
      "Not every AWS interaction needs to be scripted — many tasks benefit from visual exploration, dashboards, and point-and-click configuration, especially for people new to a service or doing a one-off change. The Console exists to serve that need.",
    flow: "Log in to the Console -> navigate to a service -> visually configure/view resources -> changes take effect via the same underlying AWS APIs",
    withoutIt: [
      "New users would have no visual, beginner-friendly way to explore AWS services",
      "Understanding relationships between resources (e.g., which subnet belongs to which VPC) would be harder without a visual interface",
    ],
    bestUseCases: [
      "Exploring an unfamiliar AWS service for the first time",
      "One-off configuration changes or troubleshooting",
      "Visually reviewing dashboards, billing, or resource relationships",
    ],
    poorUseCases: [
      "Automating a repeatable operation across many resources — script it with the CLI or infrastructure as code instead",
      "Auditable, version-controlled infrastructure changes — that calls for infrastructure as code (e.g., CloudFormation), not manual console clicks",
    ],
    alternatives: [
      { need: "Visually browse and manage AWS resources", choose: "AWS Management Console" },
      { need: "Script/automate AWS operations", choose: "AWS CLI" },
    ],
    keyFeatures: [
      "Point-and-click, browser-based access to every AWS service",
      "Built-in dashboards, wizards, and visual resource relationship views",
      "Integrated billing, IAM, and support dashboards",
      "Includes AWS CloudShell, a browser-based CLI environment",
    ],
    availability:
      "A web-based interface accessible from any browser; it calls the same underlying AWS APIs available in every Region.",
    security:
      "Console access is authorized by IAM (including MFA); the same least-privilege access-control principles apply as any other AWS interface.",
    pricingLogic:
      "The Console itself is free; you are only billed for the AWS resources/actions it triggers, exactly as if you'd performed them another way.",
    examKeywords: ["visual/browser-based AWS management -> Console", "point-and-click resource management -> Console"],
    examTraps: [
      "The Console being 'easy to use' doesn't make it the right tool for large-scale or repeatable operations — the exam favors automation (CLI/CloudFormation) for those scenarios.",
    ],
    architectureDiagram: "Browser -> AWS Management Console -> AWS API -> AWS service performs the action",
    architectureCaption: "The Console is a visual interface to the same AWS APIs behind the CLI.",
    mentorTip: "Console = visual and exploratory. CLI/CloudFormation = scriptable and repeatable. Match the scenario's need to the right one.",
    questionIds: ["q-aws-management-console-1", "q-aws-management-console-2", "q-aws-management-console-3"],
  },
  {
    id: "aws-health-dashboard",
    moduleId: "phase-misc",
    category: "Management and Governance",
    title: "AWS Health Dashboard",
    shortName: "Health Dashboard",
    tier: 3,
    domains: [2],
    examImportance: "low",
    oneLiner:
      "The AWS Health Dashboard shows the operational status of AWS services and any planned changes, maintenance, or issues specifically affecting your own account's resources.",
    englishExplanation:
      "The AWS Health Dashboard has two views: the Service Health Dashboard (public, general status of AWS services) and the personalized AWS Health view (private, account-specific events like scheduled maintenance on your EC2 instances, or an issue affecting resources you actually use). The personalized view is what makes Health more useful operationally than just checking whether a service is generally 'up' — it tells you if something actually affects you.",
    taglishExplanation:
      "Ang Health Dashboard ay may dalawang bersyon: yung pangkalahatang status ng mga AWS service (public), at yung personalized na view na nagpapakita kung may issue o planadong maintenance na direktang makaka-apekto sa mga resources ng account mo mismo — mas mahalaga ito kesa sa basta pangkalahatang status lang.",
    analogy:
      "The Health Dashboard is like a weather report that goes beyond 'is it raining somewhere in the country' and tells you specifically whether it's about to rain on your own house's roof.",
    whyItExists:
      "Knowing AWS is 'generally healthy' isn't enough operationally — teams need to know whether an issue or planned change specifically affects the resources they run. The Health Dashboard exists to surface that account-specific visibility.",
    flow: "AWS detects a service issue or schedules maintenance -> Health Dashboard surfaces it publicly (general) and personally (if it affects your account's resources) -> your team reacts/plans around it",
    withoutIt: [
      "Teams would have no proactive, account-specific warning of AWS-side issues or planned maintenance affecting their resources",
      "Outages or scheduled changes might be discovered only after they cause an impact",
    ],
    bestUseCases: [
      "Checking whether an ongoing AWS-side issue affects your specific account's resources",
      "Planning around scheduled maintenance events (e.g., an EC2 instance retirement notice)",
    ],
    poorUseCases: [
      "Monitoring your own application's health/metrics — that is Amazon CloudWatch's job, not the Health Dashboard's",
      "Tracking software license compliance — that is AWS License Manager's job",
    ],
    alternatives: [
      { need: "Check AWS service health and planned maintenance", choose: "AWS Health Dashboard" },
      { need: "Monitor your own application/infrastructure metrics", choose: "Amazon CloudWatch" },
    ],
    keyFeatures: [
      "Public Service Health Dashboard for general AWS service status",
      "Personalized AWS Health view scoped to your account's actual resources",
      "Proactive notifications for scheduled changes (e.g., instance retirements)",
      "Can integrate with EventBridge for automated responses to Health events",
    ],
    availability:
      "An account-level, cross-Region view; the personalized view reflects only the Regions/resources your account actually uses.",
    security:
      "Access to the personalized Health view is controlled via IAM, since it can reveal details about your account's specific resources.",
    pricingLogic:
      "The basic AWS Health Dashboard is free; AWS Health also offers an optional paid tier (Business/Enterprise support-linked) with additional proactive and organizational features.",
    examKeywords: ["AWS service health -> Health Dashboard", "account-specific planned maintenance -> Health Dashboard"],
    examTraps: [
      "Don't confuse the Health Dashboard (AWS-side service health/maintenance) with CloudWatch (your own application/infrastructure monitoring) — they answer different questions.",
    ],
    architectureDiagram:
      "AWS-side issue or planned maintenance\n  |\nAWS Health Dashboard\n  |\nPublic status (general) + personalized view (your account's affected resources)",
    architectureCaption: "Health Dashboard tells you not just that AWS has an issue, but whether it affects you.",
    mentorTip: "'Is this AWS issue affecting MY resources specifically?' = Health Dashboard. 'Is MY application healthy?' = CloudWatch.",
    questionIds: ["q-aws-health-dashboard-1", "q-aws-health-dashboard-2", "q-aws-health-dashboard-3"],
  },
  {
    id: "aws-license-manager",
    moduleId: "phase-misc",
    category: "Management and Governance",
    title: "AWS License Manager",
    shortName: "License Manager",
    tier: 3,
    domains: [4],
    examImportance: "low",
    oneLiner:
      "AWS License Manager helps you track, manage, and enforce software license usage across your AWS (and on-premises) resources, including bring-your-own-license (BYOL) scenarios.",
    englishExplanation:
      "Many commercial software products (databases, operating systems) are licensed by metrics like per-core or per-instance counts, and exceeding your entitlement can be a legal/contractual compliance problem, not just a technical one. License Manager lets you define licensing rules (e.g., 'this software allows N cores total'), tracks consumption as EC2 instances or on-premises servers launch, and can even prevent launches that would violate the rule.",
    taglishExplanation:
      "Marami sa mga commercial software (database, OS) ay may license na naka-base sa bilang ng core o instance, at kapag lumampas ka dito, puwedeng maging legal o contractual na problema, hindi lang technical. Ang License Manager ay tumutulong mag-track ng paggamit ng license sa mga resources mo, kasama ang mga bring-your-own-license (BYOL) scenario, at puwede pa nga itong pumigil sa paglunsad ng bagong instance kung lalabag ito sa itinakdang limitasyon.",
    analogy:
      "License Manager is like a librarian who keeps count of exactly how many copies of a licensed book are checked out at once, and stops handing out a new copy the moment you'd exceed what you're allowed to have in circulation.",
    whyItExists:
      "Manually tracking software license entitlements across a growing fleet of EC2 instances or on-premises servers is error-prone, and unintentionally exceeding license terms creates legal and cost exposure. License Manager exists to automate that tracking and enforcement.",
    flow: "Define a licensing rule (e.g., BYOL limit) -> License Manager tracks consumption as instances/servers launch -> alerts (or blocks) launches that would exceed the entitlement",
    withoutIt: [
      "Software license compliance would rely on manual, error-prone tracking across a growing fleet",
      "Teams could unintentionally exceed license entitlements, creating legal/contractual exposure",
    ],
    bestUseCases: [
      "Tracking and enforcing BYOL entitlements for commercial software running on EC2",
      "Centralizing license visibility across multiple AWS accounts or on-premises servers",
    ],
    poorUseCases: [
      "Tracking AWS's own service costs/usage — that is Cost Explorer's or Budgets' job, not License Manager's",
      "Monitoring AWS service health — that is the Health Dashboard's job",
    ],
    alternatives: [
      { need: "Track/enforce software license compliance", choose: "AWS License Manager" },
      { need: "Track AWS spend/usage", choose: "AWS Cost Explorer" },
    ],
    keyFeatures: [
      "Define custom licensing rules based on cores, instances, or vCPUs",
      "Tracks license consumption automatically as resources launch",
      "Can prevent non-compliant instance launches",
      "Supports both AWS-purchased and bring-your-own-license (BYOL) software",
    ],
    availability:
      "An account/organization-level management service; it can track resources across multiple accounts when integrated with AWS Organizations.",
    security:
      "IAM controls who can define or modify licensing rules; License Manager itself doesn't store the software, only tracks its licensed usage.",
    pricingLogic:
      "AWS License Manager is free to use for tracking your own license rules; you continue to pay for the underlying software licenses and AWS resources as usual.",
    examKeywords: ["track software license compliance -> License Manager", "bring-your-own-license (BYOL) tracking -> License Manager"],
    examTraps: [
      "License Manager tracks and can enforce licensing rules, but it does not itself grant or sell you software licenses — you still need to actually own/purchase the license entitlement it's tracking.",
    ],
    architectureDiagram:
      "Licensing rule defined (e.g., BYOL core limit)\n  |\nAWS License Manager\n  |\nTracks consumption across EC2/on-prem -> alerts or blocks over-limit launches",
    architectureCaption: "License Manager keeps software license usage within entitlements automatically.",
    mentorTip: "'BYOL' or 'track/enforce software license compliance' in a scenario = License Manager.",
    questionIds: ["q-aws-license-manager-1", "q-aws-license-manager-2", "q-aws-license-manager-3"],
  },
  {
    id: "amazon-managed-grafana",
    moduleId: "phase-misc",
    category: "Management and Governance",
    title: "Amazon Managed Grafana",
    shortName: "Managed Grafana",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon Managed Grafana provides fully managed, Grafana-compatible dashboards for visualizing operational data from many sources, without you having to run and patch your own Grafana servers.",
    englishExplanation:
      "Grafana is a popular open-source tool for building visual dashboards from metrics, logs, and traces across many data sources (CloudWatch, Prometheus, and others). Amazon Managed Grafana gives you that same dashboarding experience as a fully managed AWS service — AWS handles provisioning, scaling, patching, and availability, and integrates with IAM Identity Center and other AWS services for authentication and data source access.",
    taglishExplanation:
      "Ang Grafana ay popular na open-source na tool para sa paggawa ng visual dashboards mula sa maraming pinagmumulan ng data (CloudWatch, Prometheus, at iba pa). Ang Amazon Managed Grafana ay nagbibigay ng parehong karanasan pero fully managed na — hindi mo na kailangang mag-patch o mag-provision ng sarili mong Grafana server.",
    analogy:
      "Managed Grafana is like getting a professionally maintained, always-updated dashboard wall for your operations room, instead of building and maintaining that dashboard hardware and software yourself.",
    whyItExists:
      "Running your own Grafana servers means patching, scaling, and securing that infrastructure yourself. Managed Grafana exists so teams get the same visualization capability without that operational overhead.",
    flow: "Data sources (CloudWatch, Prometheus, and others) -> Amazon Managed Grafana workspace -> visual dashboards for teams to monitor operations",
    withoutIt: [
      "Teams would need to provision, patch, and scale their own Grafana servers",
      "Centralizing visualization across many data sources would require more custom integration work",
    ],
    bestUseCases: [
      "Building unified operational dashboards pulling from CloudWatch, Prometheus, and other data sources",
      "Giving teams a single visualization layer across multiple AWS accounts/Regions",
    ],
    poorUseCases: [
      "Storing and querying the underlying metrics data itself — that is CloudWatch's or Managed Service for Prometheus' job; Grafana visualizes, it doesn't natively store metrics",
      "Simple, single-source dashboards that CloudWatch's own dashboards already cover adequately",
    ],
    alternatives: [
      { need: "Managed, Grafana-compatible dashboards", choose: "Amazon Managed Grafana" },
      { need: "Managed, Prometheus-compatible metrics storage", choose: "Amazon Managed Service for Prometheus" },
    ],
    keyFeatures: [
      "Fully managed Grafana workspaces with automatic patching/scaling",
      "Supports many data sources: CloudWatch, Prometheus, and others",
      "Integrates with IAM Identity Center for authentication",
      "Supports dashboards spanning multiple AWS accounts/Regions",
    ],
    availability:
      "A fully managed, regional service; AWS handles the availability and scaling of the underlying Grafana workspace infrastructure.",
    security:
      "Access controlled via IAM Identity Center integration and workspace-level permissions; data source access is scoped per workspace.",
    pricingLogic:
      "Billed based on active users/editors per workspace per month — check current AWS pricing for exact rates.",
    examKeywords: ["managed Grafana dashboards -> Amazon Managed Grafana", "visualize metrics from many sources -> Managed Grafana"],
    examTraps: [
      "Don't confuse Managed Grafana (visualization/dashboards) with Managed Service for Prometheus (metrics storage/querying) — Grafana typically visualizes data that Prometheus (or CloudWatch) stores.",
    ],
    architectureDiagram:
      "CloudWatch / Prometheus / other data sources\n  |\nAmazon Managed Grafana workspace\n  |\nVisual dashboards for operations teams",
    architectureCaption: "Managed Grafana visualizes metrics without you hosting Grafana yourself.",
    mentorTip: "'Managed dashboards/visualization' = Managed Grafana. 'Managed metrics storage/querying' = Managed Service for Prometheus.",
    questionIds: ["q-amazon-managed-grafana-1", "q-amazon-managed-grafana-2", "q-amazon-managed-grafana-3"],
  },
  {
    id: "amazon-managed-service-for-prometheus",
    moduleId: "phase-misc",
    category: "Management and Governance",
    title: "Amazon Managed Service for Prometheus",
    shortName: "Managed Prometheus",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon Managed Service for Prometheus provides fully managed, Prometheus-compatible storage and querying of metrics, commonly used for monitoring containerized workloads.",
    englishExplanation:
      "Prometheus is a popular open-source metrics collection and querying system, widely used in Kubernetes/container environments. Amazon Managed Service for Prometheus gives you a fully managed, highly available, and scalable Prometheus-compatible backend — you keep using the same Prometheus query language (PromQL) and existing exporters/instrumentation, but AWS handles the underlying storage, scaling, and availability instead of you operating Prometheus servers yourself.",
    taglishExplanation:
      "Ang Prometheus ay popular na open-source na sistema para sa pag-collect at pag-query ng metrics, karaniwang ginagamit sa mga Kubernetes/container environment. Ang Amazon Managed Service for Prometheus ay nagbibigay ng parehong Prometheus-compatible na backend pero fully managed na — gamit mo pa rin ang PromQL at existing instrumentation mo, pero hindi mo na kailangang patakbuhin ang sarili mong Prometheus server.",
    analogy:
      "Managed Service for Prometheus is like outsourcing the record-keeping ledger behind your monitoring system to a fully staffed accounting office that never goes down, while you keep using the exact same ledger format (PromQL) you're already used to.",
    whyItExists:
      "Running your own scalable, highly-available Prometheus infrastructure is operationally demanding, especially at scale with many containerized workloads. Managed Service for Prometheus exists so teams get Prometheus's monitoring model without operating that infrastructure themselves.",
    flow: "Containerized/other workloads emit metrics -> Amazon Managed Service for Prometheus ingests and stores them -> queried via PromQL, often visualized in Amazon Managed Grafana",
    withoutIt: [
      "Teams would need to provision, scale, and operate their own Prometheus infrastructure",
      "Reliably storing and querying metrics at scale for containerized workloads would require more custom operational effort",
    ],
    bestUseCases: [
      "Monitoring containerized workloads (e.g., on EKS/ECS) using existing Prometheus-based instrumentation",
      "Migrating an existing self-managed Prometheus setup to a managed backend without changing tooling",
    ],
    poorUseCases: [
      "Visualizing the metrics once collected — that is Amazon Managed Grafana's (or another dashboard tool's) job, not Managed Service for Prometheus' job",
      "General AWS-native metrics that CloudWatch already collects natively without any Prometheus instrumentation in place",
    ],
    alternatives: [
      { need: "Managed, Prometheus-compatible metrics storage/querying", choose: "Amazon Managed Service for Prometheus" },
      { need: "Managed dashboards/visualization", choose: "Amazon Managed Grafana" },
    ],
    keyFeatures: [
      "Fully managed, highly available Prometheus-compatible metrics storage",
      "Compatible with existing PromQL queries and Prometheus exporters",
      "Scales automatically with workload metric volume",
      "Commonly paired with Amazon Managed Grafana for visualization",
    ],
    availability:
      "A fully managed, regional service designed for high availability and automatic scaling of metrics ingestion/storage.",
    security: "Access controlled via IAM; metrics ingestion and query endpoints can be secured within your VPC.",
    pricingLogic:
      "Billed based on metrics samples ingested, stored, and queried — check current AWS pricing for exact rates.",
    examKeywords: [
      "managed Prometheus-compatible metrics -> Managed Service for Prometheus",
      "monitor containerized workloads with existing Prometheus tooling -> Managed Service for Prometheus",
    ],
    examTraps: [
      "Managed Service for Prometheus stores/queries metrics; it does not itself provide the visual dashboard — that's Grafana's role (Managed Grafana is the natural pairing).",
    ],
    architectureDiagram:
      "Containerized workloads (EKS/ECS) with Prometheus exporters\n  |\nAmazon Managed Service for Prometheus\n  |\nPromQL queries -> visualized in Amazon Managed Grafana",
    architectureCaption: "Managed Service for Prometheus stores metrics; Managed Grafana typically visualizes them.",
    mentorTip: "'Existing Prometheus/PromQL tooling, now managed' = Managed Service for Prometheus.",
    questionIds: ["q-amazon-managed-service-for-prometheus-1", "q-amazon-managed-service-for-prometheus-2", "q-amazon-managed-service-for-prometheus-3"],
  },
  {
    id: "aws-well-architected-tool",
    moduleId: "phase-misc",
    category: "Management and Governance",
    title: "AWS Well-Architected Tool",
    shortName: "Well-Architected Tool",
    tier: 3,
    domains: [2],
    examImportance: "medium",
    oneLiner:
      "The AWS Well-Architected Tool is a free, self-service tool that reviews a workload against the AWS Well-Architected Framework's six pillars and surfaces risks and recommendations.",
    englishExplanation:
      "The Well-Architected Framework defines six pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability. The Well-Architected Tool walks you through a structured questionnaire about your workload's design, then highlights 'high' and 'medium' risk areas against each pillar along with specific improvement recommendations — all without requiring a live, human-led Well-Architected review.",
    taglishExplanation:
      "Ang Well-Architected Framework ay may anim na pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, at Sustainability. Ang Well-Architected Tool ay gumagabay sa'yo sa isang structured questionnaire tungkol sa disenyo ng workload mo, at ipapakita nito ang mga risk area kasama ang mga rekomendasyon — lahat nang hindi na kailangan ng live, human-led na review.",
    analogy:
      "The Well-Architected Tool is like a self-guided home inspection checklist covering six different safety standards — it won't fix problems for you, but it tells you exactly which areas need attention and why.",
    whyItExists:
      "Manually and consistently reviewing every workload against best practices across six different dimensions is time-consuming without a structured framework. The Well-Architected Tool exists to make that review structured, repeatable, and self-service.",
    flow: "Define a workload in the tool -> answer the pillar-based questionnaire -> tool highlights high/medium risks per pillar -> team acts on the recommendations -> periodically re-review as the workload evolves",
    withoutIt: [
      "Architecture reviews would be ad hoc and inconsistent across teams/workloads",
      "Risks across the six Well-Architected pillars might go unnoticed until they cause an actual incident or cost overrun",
    ],
    bestUseCases: [
      "Periodically self-reviewing a workload's architecture against AWS best practices",
      "Onboarding a new team to a consistent architecture review process before a launch",
    ],
    poorUseCases: [
      "Expecting the tool to automatically fix or redesign your architecture — it only surfaces risks and recommendations for humans to act on",
      "Real-time monitoring of a running workload's health — that is CloudWatch's job, not the Well-Architected Tool's",
    ],
    alternatives: [
      { need: "Self-assess architecture against AWS best practices", choose: "AWS Well-Architected Tool" },
      { need: "Get automated cost/performance recommendations on existing resources", choose: "AWS Trusted Advisor" },
    ],
    keyFeatures: [
      "Structured questionnaire across the six Well-Architected pillars",
      "Identifies high- and medium-risk issues per pillar",
      "Provides specific, actionable improvement recommendations",
      "Supports saving and re-reviewing a workload over time to track improvement",
    ],
    availability: "A free, account-level tool; you can define and review any number of workloads across your account(s).",
    security:
      "IAM controls who can view or edit a workload's Well-Architected review, since it can reveal architectural details and identified risks.",
    pricingLogic:
      "The AWS Well-Architected Tool itself is completely free to use; you only pay for any AWS resources you subsequently change based on its recommendations.",
    examKeywords: ["self-service architecture review -> Well-Architected Tool", "six pillars framework -> Well-Architected Tool"],
    examTraps: [
      "The Well-Architected Tool surfaces risks and recommendations — it does not automatically remediate them. Don't confuse it with Trusted Advisor, which gives automated checks against your live resources rather than a design questionnaire.",
    ],
    architectureDiagram:
      "Workload definition\n  |\nAWS Well-Architected Tool (six-pillar questionnaire)\n  |\nHigh/medium risks + recommendations per pillar -> team takes action",
    architectureCaption: "The Well-Architected Tool structures a self-review against AWS's six best-practice pillars.",
    mentorTip: "'Self-service architecture review against best-practice pillars' = Well-Architected Tool. 'Automated checks against live resources' = Trusted Advisor.",
    questionIds: ["q-aws-well-architected-tool-1", "q-aws-well-architected-tool-2", "q-aws-well-architected-tool-3"],
  },
];
