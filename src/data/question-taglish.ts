import type { Question } from "@/lib/types";

// Taglish versions of answer explanations, keyed by question id. Kept apart from the question
// files so the English text stays the source of truth and Taglish can be added incrementally.
const TAGLISH: Record<string, string> = {
  // Domain 1 hard scenarios
  "q-scenario-drill-domain-1-10": "Ang bucket policy na may Deny kapag false ang aws:SecureTransport ay tumatanggi sa kahit anong request na hindi HTTPS. Mas malakas ang explicit deny kaysa sa kahit anong allow, kaya pati admin ay sakop. Ang default encryption ay para sa data at rest lang, hindi sa connection.",
  "q-scenario-drill-domain-1-11": "Sa cross-account KMS, kailangan ang dalawang panig: papayagan ng key policy sa Account A ang Account B, at papayagan din ng IAM policy sa Account B ang role na gamitin ang key. Hindi puwedeng kopyahin ang KMS key sa ibang account.",
  "q-scenario-drill-domain-1-12": "Gamitin ang SCP na may aws:RequestedRegion para limitahan ang Regions sa buong Organization. I-exempt ang global services gaya ng IAM at CloudFront dahil global endpoint ang tinatawagan nila. Hindi ito kayang gawin ng NACL o pagbura ng VPC.",
  "q-scenario-drill-domain-1-13": "Alisin ang stored keys sa pamamagitan ng IAM role (instance profile) na nagbibigay ng temporary credentials. Para sa SSRF, i-require ang IMDSv2 dahil kailangan ng session token, kaya pumapalpak ang simpleng ninakaw na request sa metadata service.",
  "q-scenario-drill-domain-1-14": "Ang Secrets Manager ay may built-in na automatic rotation para sa RDS, kaya hindi na kailangan ng custom cron job. Ang environment variables at S3 file ay static at hindi nagro-rotate.",
  "q-scenario-drill-domain-1-15": "Gamitin ang gateway VPC endpoint para sa private na daan, tapos bucket policy na nagde-deny maliban kung tugma ang aws:SourceVpce. Kaya kahit valid ang credentials, hindi makakapasok mula sa internet.",
  "q-scenario-drill-domain-1-16": "Hindi mo puwedeng i-encrypt in place ang existing na unencrypted RDS. Mag-snapshot, i-copy ang snapshot na naka-encrypt, tapos mag-restore ng bagong instance mula sa copy.",
  "q-scenario-drill-domain-1-17": "Gamitin ang CloudFront origin access control (OAC) at bucket policy na CloudFront distribution lang ang pinapayagan. Kaya hindi na makaka-bypass ang user papunta sa bucket URL. Walang security group ang S3 bucket.",
  "q-scenario-drill-domain-1-18": "Ang AWS WAF rate-based rule ay nagbibilang ng request kada IP at bina-block ang lumalampas sa limit, nang awtomatiko at walang pagbabago sa application. Ang mas malaking instance ay binabayaran lang ang atake, hindi hinaharang.",
  "q-scenario-drill-domain-1-19": "Para ma-manage ng Systems Manager ang private instances na walang NAT, gumawa ng interface VPC endpoints para sa ssm, ssmmessages at ec2messages, at lagyan ng instance profile na may tamang permissions.",
  "q-scenario-drill-domain-1-20": "Sa third-party cross-account role, ilagay ang unique external ID sa trust policy condition. Ito ang proteksyon laban sa confused-deputy problem, kung saan maloloko ang vendor na gamitin ang role ng ibang customer.",
  "q-scenario-drill-domain-1-21": "Gumamit ng delegated administrator para sa GuardDuty at i-enable ang auto-enable para sa organization members. Sakop na ang mga bagong account at nasa isang lugar ang findings.",
  "q-scenario-drill-domain-1-22": "Ang Amazon Macie ang naghahanap at nag-uuri ng sensitive data gaya ng PII sa S3. Ang Inspector ay para sa vulnerabilities, ang Shield ay para sa DDoS, at ang Artifact ay para sa compliance reports.",
  "q-scenario-drill-domain-1-23": "Ang network ACL ang may explicit deny rule sa subnet level. Allow lang ang security group, kaya hindi nito kayang i-deny ang isang partikular na IP.",
  "q-scenario-drill-domain-1-24": "Para sa mga user ng mobile app, gamitin ang Cognito: user pools para sa sign-in (kasama ang social) at identity pools para sa temporary credentials na limitado sa prefix ng user. Hindi angkop ang milyon-milyong IAM user o shared na embedded keys.",
  // Domain 4 hard scenarios
  "q-scenario-drill-domain-4-10": "Ang Compute Savings Plan ang pinaka-flexible: sumasaklaw sa iba't ibang instance family, Region, at pati Fargate at Lambda. Ang EC2 Instance Savings Plan at Standard RI ay nakatali sa family o attributes.",
  "q-scenario-drill-domain-4-11": "Para sa mas kaunting Spot interruptions, i-diversify ang instance types at AZs sa mixed instances policy para mas malalim ang capacity pools na mapagkukunan. Ang iisang instance type ay konsentrasyon ng panganib.",
  "q-scenario-drill-domain-4-12": "Para sa hindi tiyak na access pattern, ang S3 Intelligent-Tiering ay awtomatikong naglilipat ng objects sa tamang tier ayon sa gamit, at walang retrieval fee. Hindi angkop ang Deep Archive sa madalas basahin.",
  "q-scenario-drill-domain-4-13": "May 90-araw na minimum storage duration ang Glacier Flexible Retrieval. Kapag binura bago niyan, sinisingil pa rin ang natitirang araw, kaya may hindi inaasahang charge.",
  "q-scenario-drill-domain-4-14": "Libre ang gateway VPC endpoints para sa S3 at DynamoDB at hindi na dumadaan sa NAT ang trapiko, kaya nawawala ang NAT data processing cost para doon. Ang dagdag na NAT ay dagdag gastos lang.",
  "q-scenario-drill-domain-4-15": "Kapag steady at predictable ang traffic sa DynamoDB, mas mura ang provisioned capacity (na may auto scaling) kaysa on-demand. Ang on-demand ay para sa hindi tiyak o spiky na traffic.",
  "q-scenario-drill-domain-4-16": "Ang Aurora Serverless v2 ay nag-a-adjust ng capacity ayon sa load, kaya hindi ka nagbabayad sa idle na dev database. Ang malaking always-on Multi-AZ ay kabaligtaran ng kailangan.",
  "q-scenario-drill-domain-4-17": "Libre ang data transfer mula S3 papuntang CloudFront at naka-cache ang paulit-ulit na request, kaya karaniwan ay mas mura at mas mabilis ang CloudFront kaysa direktang serve mula sa S3.",
  "q-scenario-drill-domain-4-18": "Ang Graviton (Arm) instances ay karaniwang mas maganda ang price-performance kung compatible ang software. Subukan muna ang compatibility bago lumipat.",
  "q-scenario-drill-domain-4-19": "Mas mura kada GB ang gp3 kaysa gp2 at may 3,000 IOPS baseline. Ang unattached volumes ay sinisingil pa rin hangga't hindi binubura, kaya mag-snapshot kung kailangan at saka burahin.",
  "q-scenario-drill-domain-4-20": "Ang Cost Anomaly Detection ay gumagamit ng machine learning para makita ang hindi pangkaraniwang gastos at magpadala ng alert, nang hindi kailangan ng fixed na threshold bawat service.",
  "q-scenario-drill-domain-4-21": "Kung weekdays 8am-6pm lang kailangan ang instances, i-schedule ang start at stop (Instance Scheduler o scheduled scaling) para bayad lang sa oras na kailangan. Ang reservation ay 24/7 na commitment para sa kapasidad na madalas idle.",
  "q-scenario-drill-domain-4-22": "Ang 80 TB sa 100 Mbps ay aabot ng mahigit dalawang buwan, lampas sa deadline. Ang Snowball Edge ay offline na paglipat ng malaking data sa loob ng ilang araw.",
  "q-scenario-drill-domain-4-23": "Panatilihin ang parehong service sa dalawang AZ pero gumamit ng zone-aware routing para nasa parehong AZ ang karamihan ng request. Bumababa ang cross-AZ charge nang hindi nawawala ang high availability.",
  "q-scenario-drill-domain-4-24": "Para sa steady na RDS at ElastiCache sa loob ng tatlong taon, bumili ng reserved instances o reserved nodes. Mas mura ito kaysa On-Demand at walang pagbabago sa architecture.",
  // Domain drills
  "q-scenario-drill-domain-1-1": "Gumamit ng roles na may temporary credentials at bucket policy na may aws:PrincipalOrgID, para Organization lang ang makakasulat at walang long-lived keys.",
  "q-scenario-drill-domain-1-2": "Ang SCP deny ay hindi nao-override ng account administrator, kaya ito ang guardrail na hindi kayang lampasan kahit may AdministratorAccess.",
  "q-scenario-drill-domain-1-3": "Gateway endpoint para sa private na S3 access, at endpoint policy para limitahan sa isang bucket. Ang NAT gateway at VPN ay hindi ang tamang daan.",
  "q-scenario-drill-domain-2-1": "Ilagay ang SQS queue sa pagitan ng web at back end para ma-absorb ang spike nang hindi nawawala ang orders, at mag-scale ang workers ayon sa queue depth.",
  "q-scenario-drill-domain-2-2": "Para sa 15 minutong RTO at 1 minutong RPO sa katamtamang gastos, warm standby na may tuloy-tuloy na replication ang tama. Mas matagal ang pilot light at mas mahal ang active-active.",
  "q-scenario-drill-domain-2-3": "At-least-once ang delivery ng standard SQS, kaya puwedeng magka-duplicate. Gawing idempotent ang consumer o gumamit ng FIFO na may deduplication.",
  "q-scenario-drill-domain-3-1": "Read-heavy at paulit-ulit ang query: dagdagan ng read replicas ang read capacity, at i-cache ang paulit-ulit na reads gamit ang ElastiCache.",
  "q-scenario-drill-domain-3-2": "Gamitin ang RDS Proxy para i-pool ang database connections ng maraming maikling Lambda invocations.",
  "q-scenario-drill-domain-3-3": "Ang CloudFront ay nag-ca-cache ng static content sa edge locations malapit sa users, kaya mas mababa ang latency sa paulit-ulit na download.",
  "q-scenario-drill-domain-4-1": "Compute Savings Plan para sa steady na baseline at flexible sa family at Region; On-Demand o Spot para sa variable na dagdag.",
  "q-scenario-drill-domain-4-2": "Ang gateway VPC endpoint para sa S3 ay walang bayad at lumalampas sa NAT, kaya nawawala ang NAT processing charge.",
  "q-scenario-drill-domain-4-3": "Kung alam ang pattern ng pagtanda ng data, lifecycle rules ang gamitin para awtomatikong ilipat sa mas murang class; puwede pang makuha sa loob ng ilang oras ang Glacier classes.",
  // Batch Q lessons
  "q-eks-operations-scaling-networking-irsa-1": "Gamitin ang IRSA o EKS Pod Identity para bawat pod ay may sariling role sa pamamagitan ng service account. Kapag sa node role, lahat ng pod sa node ay magmamana ng access.",
  "q-eks-operations-scaling-networking-irsa-2": "Pods lang ang sine-scale ng HPA. Kailangan ding mag-scale ng nodes, kaya Karpenter o Cluster Autoscaler ang nagdaragdag ng node kapag hindi ma-schedule ang pods.",
  "q-eks-operations-scaling-networking-irsa-3": "Sa VPC CNI, bawat pod ay may VPC IP, kaya maliit na subnet ang unang nauubusan. Gumamit ng mas malalaking subnet o dagdag na secondary CIDR.",
  "q-ai-ml-service-selection-decision-guide-1": "Ang Textract ang kumukuha ng text, form fields at tables mula sa scanned documents. Ang Rekognition ay para sa image at video, Transcribe sa speech, Polly sa text-to-speech.",
  "q-ai-ml-service-selection-decision-guide-2": "Para sa generative AI na kaunti ang imprastraktura, Bedrock: API sa foundation models at knowledge base para sa sarili mong dokumento. Hindi praktikal ang pagsasanay ng model mula sa simula.",
  "q-ai-ml-service-selection-decision-guide-3": "Kapag custom model sa sariling data at walang prebuilt na service, SageMaker ang may managed notebooks, training at deployment.",
  "q-serverless-architecture-patterns-api-queue-events-1": "Mga 29 segundo ang default na timeout ng API Gateway integration, kaya gawing asynchronous: ibalik agad ang job ID, ilagay sa SQS ang trabaho, at hayaang mag-poll o ma-notify ang client.",
  "q-serverless-architecture-patterns-api-queue-events-2": "Para sa isang event na may maraming independent na consumer, SNS fan-out papunta sa hiwalay na SQS queues, kaya hindi nahaharangan ng isang pumalya ang iba.",
  "q-serverless-architecture-patterns-api-queue-events-3": "Para sa poison message: partial batch response para mga pumalyang mensahe lang ang uulitin, at DLQ na may maximum receive count para ilayo ang sirang mensahe.",
  "q-ses-sns-email-notification-selection-1": "Ang SES ang para sa transactional at bulk email ng application sa customers mula sa sarili mong domain, may bounce tracking. Ang SNS email ay para sa notifications sa confirmed subscribers.",
  "q-ses-sns-email-notification-selection-2": "Ang bagong SES account ay nasa sandbox na limitado ang puwedeng padalhan. Humingi ng production access para alisin ang limit.",
  "q-ses-sns-email-notification-selection-3": "Para maprotektahan ang sender reputation, i-publish ang bounce at complaint events sa SNS sa pamamagitan ng configuration set at tanggalin ang mga address na iyon sa listahan.",
  "q-iam-access-denied-troubleshooting-playbook-1": "Kapag admin pero denied pa rin, hanapin ang SCP o explicit deny. Nililimitahan ng SCP ang account kahit admin, kaya Region-restricting SCP ang malamang.",
  "q-iam-access-denied-troubleshooting-playbook-2": "Sa cross-account, kailangang pumayag ang dalawang panig: identity policy ng caller at bucket policy sa account ng may-ari na nagtitiwala sa caller.",
  "q-iam-access-denied-troubleshooting-playbook-3": "Ang IAM Access Analyzer ay makakabuo ng least-privilege policy mula sa aktuwal na aktibidad sa CloudTrail.",
  "q-performance-bottleneck-diagnosis-playbook-1": "Kapag naubos ang CPU credits ng burstable T instance, bumabagal ito sa baseline. Para sa tuloy-tuloy na load, fixed-performance family o unlimited mode.",
  "q-performance-bottleneck-diagnosis-playbook-2": "Ang throttling kahit mababa ang kabuuang gamit ay hot partition key. Pagandahin ang key distribution o magdagdag ng DAX para sa read-heavy na keys.",
  "q-performance-bottleneck-diagnosis-playbook-3": "Per prefix ang request rate ng S3, kaya ikalat ang keys sa maraming prefix para tumaas ang kabuuang throughput.",
};

export function withTaglish(questions: Question[]): Question[] {
  return questions.map((q) => (TAGLISH[q.id] ? { ...q, taglishExplanation: TAGLISH[q.id] } : q));
}
