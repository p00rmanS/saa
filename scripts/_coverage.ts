import { allLessons } from "../src/data";
const services: Record<string, string[]> = {
  "Data Pipeline": ["data pipeline"], "AppSync": ["appsync"], "QLDB": ["qldb", "quantum ledger"], "Pinpoint": ["pinpoint"],
  "Forecast": ["amazon forecast"], "Fraud Detector": ["fraud detector"], "Kendra": ["kendra"], "Proton": ["aws proton"],
  "Application Discovery Service": ["application discovery"], "Migration Hub": ["migration hub"], "Audit Manager": ["audit manager"],
  "Firewall Manager": ["firewall manager"], "Service Catalog": ["service catalog"], "Control Tower": ["control tower"],
  "Timestream": ["timestream"], "App2Container": ["app2container"], "Elastic Beanstalk": ["beanstalk"], "OpenSearch": ["opensearch"],
  "Elastic Transcoder": ["transcoder"], "X-Ray": ["x-ray"], "Snow Family": ["snowball", "snow family"], "Transfer Family": ["transfer family"],
  "CloudHSM": ["cloudhsm"], "Directory Service": ["directory service"], "Macie": ["macie"], "Detective": ["detective"], "RAM": ["resource access manager"],
};
const titles = allLessons.map((l) => `${l.id} ${l.title} ${l.shortName ?? ""}`.toLowerCase());
console.log("== SERVICES: dedicated lesson by id/title? ==");
for (const [name, keys] of Object.entries(services)) {
  const dedicated = allLessons.filter((l, i) => keys.some((k) => titles[i].includes(k))).map((l) => l.id);
  const mentions = allLessons.filter((l) => keys.some((k) => JSON.stringify(l).toLowerCase().includes(k))).length;
  console.log(name.padEnd(30), dedicated.length ? "LESSON: " + dedicated.join(",") : "no dedicated lesson", "| mentioned in", mentions, "lessons");
}
const concepts: Record<string, string[]> = {
  "shared responsibility": ["shared responsibility"], "root user / MFA": ["root user"], "least privilege": ["least privilege"],
  "stateless vs stateful": ["stateless"], "microservices": ["microservice"], "horizontal vs vertical scaling": ["vertical scaling", "scale up"],
  "multi-tier architecture": ["multi-tier", "three-tier", "3-tier"], "event-driven": ["event-driven"], "immutable infrastructure": ["immutable"],
  "distributed design patterns": ["circuit breaker", "retry", "idempotent"], "service quotas": ["service quota"], "throttling strategy": ["throttl"],
  "purpose-built": ["purpose-built"], "legacy apps": ["legacy"], "heterogeneous migration": ["heterogeneous"], "schema conversion tool": ["schema conversion"],
  "time series db": ["time series", "time-series"], "columnar": ["columnar"], "hibernation": ["hibernat"], "instance families": ["memory optimized", "compute optimized"],
  "cost allocation tags": ["cost allocation tag"], "consolidated billing": ["consolidated billing"], "data transfer costs": ["data transfer"],
  "Region/AZ transfer cost": ["cross-az", "inter-az"], "csv to parquet": ["parquet"], "ingestion frequency": ["batch", "frequency"],
  "transfer time calc": ["bandwidth"], "storage auto scaling": ["auto scaling"], "route tables": ["route table"], "subnet tiers / CIDR": ["cidr"],
  "RTO/RPO": ["rpo"], "data classification": ["classification", "classify"], "certificate renewal": ["renew"], "key rotation": ["rotation"],
  "edge computing": ["edge"], "data retention": ["retention"], "App migration to containers": ["migrate applications into containers", "app2container"],
  "ECS capacity providers": ["capacity provider"], "EC2 instance types": ["instance type"], "Lambda memory sizing": ["memory"],
};
console.log("\n== CONCEPTS: number of lessons mentioning ==");
for (const [name, keys] of Object.entries(concepts)) {
  const n = allLessons.filter((l) => keys.some((k) => JSON.stringify(l).toLowerCase().includes(k))).length;
  console.log(name.padEnd(34), n);
}
