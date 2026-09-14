import type { GlossaryTerm } from "@/lib/types";

export const glossary: GlossaryTerm[] = [
  {
    id: "region",
    term: "Region",
    definition:
      "A physical geographic area containing multiple isolated data centers (Availability Zones). You choose a Region for most AWS resources.",
    taglish: "Isang siyudad kung saan may mga AWS data centers — pinipili mo ito kapag naglalagay ng resources.",
  },
  {
    id: "availability-zone",
    term: "Availability Zone",
    definition:
      "One or more discrete data centers within a Region, with independent power, cooling, and networking, isolated from failures in other AZs.",
    taglish: "Hiwalay na 'building' sa loob ng isang Region — may sariling power at network, kaya kung magkaproblema sa isa, tuloy-tuloy pa rin ang iba.",
  },
  {
    id: "edge-location",
    term: "Edge Location",
    definition:
      "A site, much more numerous than Regions, used by services like CloudFront and Route 53 to serve content and resolve DNS closer to end users.",
    taglish: "Maliit na sangay na malapit sa users, ginagamit para mas mabilis ang CloudFront at Route 53.",
  },
  {
    id: "vpc",
    term: "VPC",
    definition:
      "Virtual Private Cloud — your own logically isolated virtual network within AWS, where you control IP ranges, subnets, and routing.",
    taglish: "Sarili mong pribadong network sa loob ng AWS.",
  },
  {
    id: "subnet",
    term: "Subnet",
    definition:
      "A range of IP addresses within a VPC, scoped to a single Availability Zone, marked as public (has a route to an Internet Gateway) or private.",
    taglish: "Isang bahagi ng VPC na naka-assign sa isang AZ — puwedeng public o private.",
  },
  {
    id: "cidr",
    term: "CIDR",
    definition:
      "Classless Inter-Domain Routing — the notation (e.g. 10.0.0.0/16) used to define the size and range of IP addresses in a VPC or subnet.",
    taglish: "Ang paraan ng pagsulat kung gaano kalaki ang range ng IP addresses (hal. 10.0.0.0/16).",
  },
  {
    id: "route-table",
    term: "Route Table",
    definition:
      "A set of rules (routes) that determine where network traffic from a subnet is directed.",
    taglish: "Listahan ng mga direksyon kung saan pupunta ang traffic mula sa isang subnet.",
  },
  {
    id: "stateful",
    term: "Stateful",
    definition:
      "A system or firewall rule that remembers prior interactions — e.g. a Security Group automatically allows return traffic for an approved request.",
    taglish: "Naaalala ng system ang naunang koneksyon — kaya automatic na pinapayagan ang sagot sa isang request.",
  },
  {
    id: "stateless",
    term: "Stateless",
    definition:
      "A system or firewall rule that does not remember prior interactions — e.g. a NACL evaluates inbound and outbound traffic independently.",
    taglish: "Hindi naaalala ng system ang naunang koneksyon — kailangan hiwalay na payagan ang papasok at palabas na traffic.",
  },
  {
    id: "horizontal-scaling",
    term: "Horizontal Scaling",
    definition:
      "Adding more instances/nodes to handle increased load, rather than making a single instance bigger.",
    taglish: "Magdagdag ng dami ng servers, hindi paglakihin ang isa lang.",
  },
  {
    id: "vertical-scaling",
    term: "Vertical Scaling",
    definition:
      "Increasing the size/capacity of a single instance (bigger CPU, more memory) rather than adding more instances.",
    taglish: "Palakihin ang laki ng iisang server, hindi magdagdag ng bilang.",
  },
  {
    id: "high-availability-term",
    term: "High Availability",
    definition:
      "An architecture designed to recover quickly from failure, minimizing (but not always fully eliminating) downtime.",
    taglish: "Mabilis bumalik kapag may nag-fail, kahit may konting downtime.",
  },
  {
    id: "fault-tolerance-term",
    term: "Fault Tolerance",
    definition:
      "An architecture that continues operating with zero disruption even when a component fails — a stricter bar than high availability.",
    taglish: "Tuloy-tuloy pa rin gumagana kahit may nag-fail na parte — hindi na kailangan ng downtime.",
  },
  {
    id: "rto",
    term: "RTO (Recovery Time Objective)",
    definition: "The maximum acceptable length of time a system can be down after a disaster before it must be restored.",
    taglish: "Ang pinakamatagal na puwedeng maging down ang system bago ito maibalik.",
  },
  {
    id: "rpo",
    term: "RPO (Recovery Point Objective)",
    definition: "The maximum acceptable amount of data loss, measured in time, after a disaster.",
    taglish: "Ang pinakamaraming data na puwedeng mawala, sinusukat sa oras.",
  },
  {
    id: "eventual-consistency",
    term: "Eventual Consistency",
    definition:
      "A consistency model where, after a write, all reads will EVENTUALLY reflect that write, but not necessarily immediately.",
    taglish: "Pagkatapos ng pag-save, hindi agad makikita sa lahat ng dako ang bagong datos — pero eventually, makikita rin.",
  },
  {
    id: "synchronous",
    term: "Synchronous",
    definition: "A request that waits for a response before continuing — the caller is blocked until the operation completes.",
    taglish: "Naghihintay muna ang caller ng sagot bago magpatuloy.",
  },
  {
    id: "asynchronous",
    term: "Asynchronous",
    definition: "A request that does not wait for a response — the caller continues immediately while the operation happens independently.",
    taglish: "Hindi na naghihintay ang caller — tumutuloy agad habang tumatakbo ang operation nang hiwalay.",
  },
  {
    id: "serverless",
    term: "Serverless",
    definition:
      "A model where AWS manages the underlying servers entirely — you write code or define resource needs, and pay only for actual usage.",
    taglish: "Hindi ka na nangangasiwa ng server — si AWS na ang bahala, bayad ka lang sa aktwal na ginamit.",
  },
  {
    id: "microservices",
    term: "Microservices",
    definition: "An architecture style where an application is built as a collection of small, independently deployable services.",
    taglish: "Hinahati ang isang malaking application sa maliliit na independiyenteng services.",
  },
  {
    id: "decoupling",
    term: "Decoupling",
    definition: "Designing components so they don't depend directly on each other's availability or timing, often via a queue or event bus.",
    taglish: "Ginagawang hindi direktang umaasa sa isa't isa ang mga components, madalas sa pamamagitan ng queue o event bus.",
  },
  {
    id: "idempotency",
    term: "Idempotency",
    definition: "A property where performing the same operation multiple times produces the same result as performing it once.",
    taglish: "Kahit ilang beses mong ulitin ang parehong operation, pareho pa rin ang resulta.",
  },
  {
    id: "caching",
    term: "Caching",
    definition: "Temporarily storing a copy of data somewhere faster to access, to reduce latency and load on the original source.",
    taglish: "Pansamantalang pag-imbak ng datos sa mas mabilis na lugar para hindi na paulit-ulit tumama sa orihinal na source.",
  },
  {
    id: "replication",
    term: "Replication",
    definition: "Copying data from one location to another (e.g. across AZs or Regions) to improve durability or availability.",
    taglish: "Pagkopya ng datos mula sa isang lugar papunta sa iba, para mas maging matatag o available.",
  },
  {
    id: "sharding",
    term: "Sharding",
    definition: "Splitting a large dataset across multiple smaller partitions (shards) to distribute load and enable horizontal scaling.",
    taglish: "Paghahati ng malaking datos sa maliliit na bahagi para maipamahagi ang load.",
  },
  {
    id: "encryption-at-rest",
    term: "Encryption at Rest",
    definition: "Encrypting data while it is stored (on disk, in a database, in an object store), typically using KMS-managed keys.",
    taglish: "Pag-encrypt ng datos habang naka-imbak, hindi habang dumadaan sa network.",
  },
  {
    id: "encryption-in-transit",
    term: "Encryption in Transit",
    definition: "Encrypting data while it moves across a network, typically via TLS/HTTPS.",
    taglish: "Pag-encrypt ng datos habang dumadaan ito sa network, gamit ang TLS/HTTPS.",
  },
  {
    id: "least-privilege",
    term: "Least Privilege",
    definition: "Granting only the exact permissions required to perform a task, nothing more.",
    taglish: "Bigyan lang ng eksaktong kailangan na pahintulot, wag sobra.",
  },
  {
    id: "immutable-infrastructure",
    term: "Immutable Infrastructure",
    definition:
      "An approach where servers/resources are never modified after deployment — instead, a new version is deployed and the old one is replaced.",
    taglish: "Sa halip na baguhin ang existing na server, gumagawa ka na lang ng bago at papalitan ang luma.",
  },
];
