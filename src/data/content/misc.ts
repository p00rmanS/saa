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
    questionIds: ["q-aws-cost-and-usage-report-1", "q-aws-cost-and-usage-report-2"],
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
    questionIds: ["q-aws-amplify-1", "q-aws-amplify-2"],
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
    questionIds: ["q-aws-device-farm-1", "q-aws-device-farm-2"],
  },
  {
    id: "machine-learning-services-overview",
    moduleId: "phase-misc",
    category: "Machine Learning",
    title: "AWS Machine Learning Services (Overview)",
    shortName: "ML Services",
    tier: 3,
    domains: [3],
    examImportance: "medium",
    oneLiner:
      "AWS offers a family of pre-built, pre-trained AI services you call via a simple API for a specific task (language, speech, vision, documents), plus Amazon SageMaker AI for building and training your own custom models when the pre-built services don't fit.",
    englishExplanation:
      "Most of these services follow the same pattern: you send data in, AWS's pre-trained model processes it, and you get a structured result back — no ML expertise or model training required. Amazon Comprehend performs natural language processing tasks like sentiment analysis and entity extraction on text. Amazon Lex powers conversational chatbots and voice interfaces (the same technology behind Alexa). Amazon Polly converts text into lifelike synthesized speech. Amazon Rekognition analyzes images and video for objects, faces, text, and inappropriate content. Amazon Textract extracts text, forms, and tables from scanned documents. Amazon Transcribe converts speech (audio) into text. Amazon Translate translates text between languages. Amazon SageMaker AI is the odd one out: instead of a single pre-built task, it is a full platform for building, training, tuning, and deploying your own custom machine learning models when none of the pre-built services fit your specific problem.\n\nFor the exam at this recognition level, the goal is simply to match a described use case (\"convert speech to text,\" \"extract text from scanned invoices,\" \"analyze sentiment in customer reviews\") to the correct service name, and to recognize SageMaker AI as the answer whenever the scenario specifically requires training a custom model rather than using an existing capability.",
    taglishExplanation:
      "Karamihan sa mga service na ito ay may parehong pattern: nagpapadala ka ng data, may pre-trained na model na ng AWS ang nagpoproseso, at bumabalik sa'yo ang resulta — hindi mo na kailangang alamin kung paano mag-train ng sariling ML model. Comprehend — sentiment/entity analysis sa text. Lex — conversational chatbot (parang teknolohiya sa likod ng Alexa). Polly — text-to-speech. Rekognition — pag-analyze ng litrato/video. Textract — pag-extract ng text/data mula sa scanned documents. Transcribe — speech-to-text. Translate — pagsasalin ng wika. SageMaker AI — kakaiba dahil hindi ito isang specific na tool lang, kundi buong platform para bumuo, mag-train, at mag-deploy ng sarili mong custom ML model kapag hindi kasya ang mga ready-made service. Para sa exam, ang laman lang na kailangan mong malaman dito ay itugma ang use case sa tamang service.",
    analogy:
      "These services are like a toolbox of specialized AI assistants: one reads sentiment in text, one turns speech into text, one speaks text out loud, one looks at images, one reads scanned paperwork, one translates languages, and one lets you build a brand-new custom assistant from scratch when none of the ready-made ones fit the job.",
    whyItExists:
      "Training a custom ML model for tasks like sentiment analysis, speech recognition, or image labeling requires significant data, expertise, and time. These pre-built services exist so developers without ML expertise can add proven AI capabilities to an app through a simple API call, while SageMaker AI remains available for the cases that truly need a custom model.",
    flow: "App sends data (text/image/audio/document) -> the matching AI service processes it with a pre-trained model -> app receives a structured result (sentiment, labels, transcript, translated text, extracted fields)",
    withoutIt: [
      "Teams would need to build, train, and host their own machine learning models from scratch for each task",
      "Adding AI capabilities like sentiment analysis or image recognition would require dedicated ML expertise and much longer development time",
    ],
    bestUseCases: [
      "Adding sentiment analysis or entity extraction to customer feedback (Comprehend)",
      "Building a conversational chatbot or voice interface (Lex)",
      "Converting text to natural-sounding speech for accessibility or IVR systems (Polly)",
      "Moderating or analyzing image/video content at scale (Rekognition)",
      "Extracting structured data from scanned forms, invoices, or IDs (Textract)",
      "Transcribing recorded audio or live calls into text (Transcribe)",
      "Translating content between languages for a global audience (Translate)",
      "Training a fully custom model for a problem none of the above services solve (SageMaker AI)",
    ],
    poorUseCases: [
      "Using SageMaker AI when a pre-built service already solves the exact problem — that adds unnecessary time and ML expertise overhead",
      "Expecting these pre-built services to solve a highly specialized, domain-specific problem outside their trained scope — that is when custom modeling with SageMaker AI becomes necessary",
    ],
    alternatives: [
      { need: "Analyze sentiment/entities in text", choose: "Amazon Comprehend" },
      { need: "Build a conversational chatbot", choose: "Amazon Lex" },
      { need: "Convert text to speech", choose: "Amazon Polly" },
      { need: "Analyze images or video content", choose: "Amazon Rekognition" },
      { need: "Build, train, and deploy a custom ML model", choose: "Amazon SageMaker AI" },
      { need: "Extract text/data from documents or forms", choose: "Amazon Textract" },
      { need: "Convert speech to text", choose: "Amazon Transcribe" },
      { need: "Translate text between languages", choose: "Amazon Translate" },
    ],
    keyFeatures: [
      "Amazon Comprehend: natural language processing — sentiment, entities, key phrases in text",
      "Amazon Lex: build conversational chatbots and voice interfaces",
      "Amazon Polly: convert text into lifelike synthesized speech",
      "Amazon Rekognition: analyze images and video for objects, faces, text, and content moderation",
      "Amazon SageMaker AI: build, train, tune, and deploy your own custom ML models",
      "Amazon Textract: extract text, forms, and tables from scanned documents",
      "Amazon Transcribe: convert speech (audio) into text",
      "Amazon Translate: translate text between languages",
    ],
    availability:
      "These are fully managed AI services with regional availability that can vary by service; you call an API endpoint and AWS handles all underlying scaling and redundancy.",
    security:
      "Access to each service's API is controlled via IAM; since these services may process sensitive text, images, or audio, consider data residency and compliance requirements for whatever content you send to them.",
    pricingLogic:
      "Each service is billed per unit of usage (for example, per character translated, per image analyzed, per minute of audio processed), with no upfront cost — pricing details vary per service and should be checked on the current AWS pricing pages rather than memorized as fixed numbers.",
    examKeywords: [
      "sentiment analysis -> Comprehend",
      "chatbot -> Lex",
      "text-to-speech -> Polly",
      "image/video analysis -> Rekognition",
      "custom ML model -> SageMaker AI",
      "extract text from documents -> Textract",
      "speech-to-text -> Transcribe",
      "translate language -> Translate",
    ],
    examTraps: [
      "These are typically quick, recognition-level, service-to-use-case matching questions — don't overthink the underlying ML theory.",
      "SageMaker AI is the odd one out: choose it specifically when the scenario needs a custom-trained model, not an existing capability.",
    ],
    architectureDiagram:
      "Input (text / image / audio / document)\n  |\nMatching AI service (Comprehend / Lex / Polly / Rekognition / Textract / Transcribe / Translate)\n  |\nStructured output (sentiment / bot response / speech / labels / extracted fields / transcript / translation)\n\n(No existing service fits?) -> Amazon SageMaker AI (build/train/deploy custom model)",
    architectureCaption:
      "Match the described input/task to the matching pre-built AI service; fall back to SageMaker AI only for a genuinely custom model need.",
    mentorTip:
      "Build a one-line mental flashcard per service and drill the matching, not the internals — that is exactly the level this topic is tested at on the SAA-C03.",
    questionIds: ["q-machine-learning-services-overview-1", "q-machine-learning-services-overview-2"],
  },
  {
    id: "media-services-overview",
    moduleId: "phase-misc",
    category: "Media Services",
    title: "AWS Media Services (Overview)",
    shortName: "Media Services",
    tier: 3,
    domains: [3],
    examImportance: "low",
    oneLiner:
      "Amazon Elastic Transcoder converts video files between formats and resolutions, while Amazon Kinesis Video Streams ingests, processes, and stores live video streams — two different, recognition-level media services.",
    englishExplanation:
      "Amazon Elastic Transcoder is a media transcoding service: you give it a source video file and it converts it into the formats and resolutions needed for different devices (phones, tablets, browsers, smart TVs), without you having to run and manage your own transcoding servers. Amazon Kinesis Video Streams is a different kind of service entirely — it is built for ingesting, processing, and durably storing live or batch video streams (for example, from security cameras or IoT devices) so the video can be played back or fed into further processing, including machine learning-based video analysis.",
    taglishExplanation:
      "Si Elastic Transcoder ay parang video conversion plant — binibigay mo ang orihinal na video file at kino-convert nito sa iba't ibang format/resolution para sa iba't ibang device, hindi mo na kailangang magpatakbo ng sarili mong transcoding server. Si Kinesis Video Streams naman ay iba — parang conveyor belt na tumatanggap ng live video stream (halimbawa mula sa security camera o IoT device), pinoproseso, at itinatago ito nang maayos para maibalik o mai-analyze pa.",
    analogy:
      "Elastic Transcoder is like a video conversion shop that takes your master video file and produces copies in every format your customers' devices need. Kinesis Video Streams is like a continuous conveyor belt that catches a live video feed as it happens, safely stores it, and hands it off wherever it needs to go next.",
    whyItExists:
      "Video transcoding across many device formats is computationally heavy and tedious to manage yourself, and reliably capturing and storing continuous live video streams at scale requires purpose-built durability and processing pipelines. These two managed services remove that operational burden.",
    flow: "Elastic Transcoder: source video file -> transcoded into target formats/resolutions -> stored/delivered\nKinesis Video Streams: camera/IoT live video -> ingested and stored -> played back or fed into analytics/ML",
    withoutIt: [
      "Teams would need to build and scale their own custom video transcoding pipelines",
      "Reliably ingesting and storing continuous live video streams at scale would require significant custom infrastructure",
    ],
    bestUseCases: [
      "Elastic Transcoder: converting uploaded video files into multiple formats/resolutions for different devices",
      "Kinesis Video Streams: ingesting live video from cameras or IoT devices for storage, playback, or ML-based analysis",
    ],
    poorUseCases: [
      "Elastic Transcoder is not for ingesting live streaming video — use Kinesis Video Streams (or AWS Elemental MediaLive) for that",
      "Kinesis Video Streams is not a batch file-format converter for existing video files — that is Elastic Transcoder's job",
    ],
    alternatives: [
      { need: "Convert video files between formats/resolutions", choose: "Amazon Elastic Transcoder" },
      { need: "Ingest and store live video streams", choose: "Amazon Kinesis Video Streams" },
    ],
    keyFeatures: [
      "Elastic Transcoder: converts source video into multiple output formats/resolutions",
      "Kinesis Video Streams: ingests, processes, and durably stores live or batch video streams, with playback and ML-analysis integration",
    ],
    availability:
      "Both are fully managed AWS services; you do not provision or scale transcoding or ingestion infrastructure yourself.",
    security:
      "Access to both services is controlled via IAM; stored/streamed media can be encrypted at rest and in transit.",
    pricingLogic:
      "Elastic Transcoder bills per minute of video transcoded; Kinesis Video Streams bills based on data ingested and stored — check current AWS pricing for exact rates rather than assuming a fixed figure.",
    examKeywords: [
      "transcode video -> Elastic Transcoder",
      "ingest live video streams -> Kinesis Video Streams",
    ],
    examTraps: [
      "Don't confuse Kinesis Video Streams (video-specific ingestion) with Kinesis Data Streams (generic real-time data records) — they are different services for different data types.",
    ],
    architectureDiagram:
      "Elastic Transcoder:\nSource video file -> Elastic Transcoder -> multiple output formats/resolutions\n\nKinesis Video Streams:\nCamera/IoT device -> Kinesis Video Streams -> stored/played back/analyzed",
    architectureCaption:
      "Two distinct media services: one converts existing video files, the other ingests and stores live video streams.",
    mentorTip:
      "Recognition-level only: \"convert/transcode a video file\" points to Elastic Transcoder; \"ingest/store a live video feed from a camera or device\" points to Kinesis Video Streams.",
    questionIds: ["q-media-services-overview-1", "q-media-services-overview-2"],
  },
  {
    id: "management-governance-extras",
    moduleId: "phase-misc",
    category: "Management and Governance",
    title: "Management & Governance Extras",
    shortName: "Mgmt & Gov Extras",
    tier: 3,
    domains: [4],
    examImportance: "medium",
    oneLiner:
      "A recognition-level round-up of everyday AWS management and governance tools: the CLI and Management Console as interfaces, the Health Dashboard for service health, License Manager for software license tracking, Managed Grafana and Managed Service for Prometheus for observability, and the Well-Architected Tool for self-service architecture review.",
    englishExplanation:
      "The AWS CLI and the AWS Management Console are the two everyday interfaces to AWS: the CLI lets you script and automate operations from a terminal (and is the natural fit for repeatable, auditable, infrastructure-as-code-friendly workflows), while the Console is the visual, browser-based interface most people start with. The AWS Health Dashboard shows the operational status of AWS services and any planned changes or maintenance that could affect your account, distinct from just \"is a service generally up\" — it can surface account-specific events relevant to your own resources. AWS License Manager helps you track and manage software licenses (including bring-your-own-license scenarios) across your AWS resources, so you stay within your license entitlements. Amazon Managed Grafana provides managed, Grafana-compatible dashboards for visualizing operational data from many sources, without you having to run and patch your own Grafana servers. Amazon Managed Service for Prometheus provides managed, Prometheus-compatible metrics storage and querying for monitoring containerized and other workloads, without you having to operate your own Prometheus infrastructure. The AWS Well-Architected Tool is a free, self-service tool that walks you through reviewing a workload against the six pillars of the AWS Well-Architected Framework (Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability), surfacing risks and recommendations without requiring a live human-led review.",
    taglishExplanation:
      "Ang AWS CLI at Management Console ay ang dalawang pangunahing paraan para makipag-ugnayan sa AWS — ang CLI para sa pag-a-automate/scripting, ang Console naman ang visual, browser-based na interface. Ang Health Dashboard ay nagpapakita ng status ng mga AWS service at ng mga planadong pagbabago/maintenance na baka makaapekto sa account mo. Ang License Manager ay tumutulong mag-track ng software licenses (kasama ang bring-your-own-license) sa mga resources mo. Ang Managed Grafana ay nagbibigay ng managed dashboards na compatible sa Grafana, hindi mo na kailangang magpatakbo ng sarili mong Grafana server. Ang Managed Service for Prometheus naman ay managed storage/query ng metrics na compatible sa Prometheus, karaniwang para sa containerized workloads. At ang Well-Architected Tool ay libreng self-service na tool para susuriin ang architecture mo laban sa anim na pillars ng AWS Well-Architected Framework, at magbibigay ng mga risk at recommendation nang hindi na kailangan ng live na human review.",
    analogy:
      "This lesson is a toolbox of different management gadgets: a keyboard-driven remote control (CLI), a visual dashboard with buttons (Console), a weather report for AWS itself (Health Dashboard), a filing cabinet for software licenses (License Manager), two different observability dashboards for watching your systems (Managed Grafana and Managed Service for Prometheus), and a self-guided checklist for reviewing how well-built your house is against six safety standards (Well-Architected Tool).",
    whyItExists:
      "Running AWS well requires more than just launching resources — you need ways to interact with AWS both visually and programmatically, visibility into AWS's own service health, control over software license compliance, observability into your own workloads, and a structured way to periodically self-assess your architecture against best practices. Each of these tools covers one of those operational needs.",
    flow: "Choose the right tool for the task: automate via AWS CLI -> manage visually via the Console -> check AWS-side incidents/maintenance via Health Dashboard -> track license compliance via License Manager -> visualize metrics via Managed Grafana -> store/query metrics via Managed Service for Prometheus -> periodically self-review architecture via the Well-Architected Tool",
    withoutIt: [
      "Harder to automate and script repeatable AWS operations without the CLI",
      "No visibility into AWS-side planned maintenance or incidents affecting your resources without the Health Dashboard",
      "Manual, error-prone tracking of software license compliance without License Manager",
      "No managed observability stack, requiring you to run and patch your own Grafana/Prometheus infrastructure",
      "No structured way to catch architectural risks early without the Well-Architected Tool",
    ],
    bestUseCases: [
      "Scripting and automating repeatable AWS operations (AWS CLI)",
      "Visual, exploratory management of AWS resources (AWS Management Console)",
      "Checking for AWS service issues or upcoming planned changes affecting your account (AWS Health Dashboard)",
      "Tracking and staying within software license entitlements, including bring-your-own-license (AWS License Manager)",
      "Managed, Grafana-compatible operational dashboards without running your own Grafana servers (Amazon Managed Grafana)",
      "Managed, Prometheus-compatible metrics for monitoring containerized workloads (Amazon Managed Service for Prometheus)",
      "Periodic, structured architecture self-review against AWS best practices (AWS Well-Architected Tool)",
    ],
    poorUseCases: [
      "Relying on the Console alone for large-scale, repeatable automation — the CLI (or infrastructure as code) is a better fit",
      "Treating the Well-Architected Tool's output as a guarantee of a perfect architecture — it surfaces risks and recommendations, it does not fix anything automatically",
    ],
    alternatives: [
      { need: "Script/automate AWS operations", choose: "AWS CLI" },
      { need: "Manage AWS resources visually", choose: "AWS Management Console" },
      { need: "Check AWS service health and planned maintenance", choose: "AWS Health Dashboard" },
      { need: "Track software license usage/compliance", choose: "AWS License Manager" },
      { need: "Managed Grafana-compatible dashboards", choose: "Amazon Managed Grafana" },
      { need: "Managed Prometheus-compatible metrics", choose: "Amazon Managed Service for Prometheus" },
      { need: "Self-assess architecture against AWS best practices", choose: "AWS Well-Architected Tool" },
    ],
    keyFeatures: [
      "AWS CLI: command-line, scriptable access to virtually every AWS service",
      "AWS Management Console: browser-based visual interface for managing AWS resources",
      "AWS Health Dashboard: service health status plus account-specific planned changes/events",
      "AWS License Manager: centralized tracking of software licenses, including bring-your-own-license",
      "Amazon Managed Grafana: managed, Grafana-compatible dashboards across many data sources",
      "Amazon Managed Service for Prometheus: managed, Prometheus-compatible metrics storage and querying",
      "AWS Well-Architected Tool: free, self-service review against the six Well-Architected pillars",
    ],
    availability:
      "The CLI and Console are globally available management interfaces; Health Dashboard, License Manager, and the Well-Architected Tool are account-level services; Managed Grafana and Managed Service for Prometheus are regional managed services with their own built-in resilience.",
    security:
      "IAM permissions govern who can use the CLI, access the Console, view Health Dashboard events, manage licenses, or access Grafana/Prometheus dashboards; License Manager also has compliance implications since exceeding license entitlements can be a legal/contractual issue, not just a technical one.",
    pricingLogic:
      "The CLI, Management Console, Health Dashboard, License Manager, and Well-Architected Tool are free to use. Amazon Managed Grafana and Amazon Managed Service for Prometheus charge based on usage (such as active users/workspaces for Grafana, and metrics ingested/queried for Prometheus) — check current AWS pricing for exact figures.",
    examKeywords: [
      "AWS CLI -> automation/scripting",
      "AWS Health Dashboard -> service health and planned changes",
      "AWS License Manager -> track software licenses",
      "Amazon Managed Grafana -> managed dashboards",
      "Amazon Managed Service for Prometheus -> managed metrics",
      "AWS Well-Architected Tool -> self-service architecture review against six pillars",
    ],
    examTraps: [
      "The Well-Architected Tool does not automatically fix architectural problems — it is a self-service questionnaire that surfaces risks and recommendations for you to act on.",
      "Don't confuse Managed Grafana (visualization/dashboards) with Managed Service for Prometheus (metrics storage/querying) — they are complementary, not interchangeable.",
    ],
    architectureDiagram:
      "Task -> right tool:\nAutomate -> AWS CLI\nManage visually -> AWS Management Console\nCheck AWS service health -> AWS Health Dashboard\nTrack licenses -> AWS License Manager\nVisualize metrics -> Amazon Managed Grafana\nStore/query metrics -> Amazon Managed Service for Prometheus\nSelf-review architecture -> AWS Well-Architected Tool",
    architectureCaption:
      "Match the described management/governance need to the right tool.",
    mentorTip:
      "These are quick recognition-level matches on the exam — build a one-line mental flashcard per tool rather than studying deep configuration detail.",
    questionIds: ["q-management-governance-extras-1", "q-management-governance-extras-2"],
  },
];
