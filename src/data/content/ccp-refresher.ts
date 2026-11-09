import type { Lesson } from "@/lib/types";

export const ccpRefresherLessons: Lesson[] = [
  {
    id: "cloud-computing-fundamentals-ccp",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "Cloud Computing Fundamentals: Models, Benefits and Vocabulary",
    shortName: "Cloud fundamentals",
    tier: 1,
    domains: [3, 4],
    examImportance: "high",
    oneLiner:
      "The plain-language base under every AWS question: what the cloud is, the service and deployment models, and the words the exam uses for its benefits.",
    englishExplanation:
      "Cloud computing is renting IT resources over the internet and paying only for what you use, instead of buying and running your own data centre. That changes cost from capital expense (CapEx), a large upfront purchase, to operating expense (OpEx), a variable bill. AWS describes six advantages: trade upfront expense for variable expense, benefit from massive economies of scale (lower prices because AWS aggregates huge usage), stop guessing capacity, increase speed and agility, stop spending money running and maintaining data centres, and go global in minutes.\n\nThree service models describe how much you manage. Infrastructure as a Service (IaaS) gives you virtual machines, storage and networks, and you manage the operating system and up (Amazon EC2). Platform as a Service (PaaS) hides the servers and operating system so you manage only your application and data (AWS Elastic Beanstalk). Software as a Service (SaaS) is a finished application you just use (a hosted email or CRM product). Serverless is a related idea where you run code or store data with no servers to manage and pay per use (Lambda, S3, DynamoDB).\n\nThree deployment models describe where it runs. Public cloud means everything runs on a provider such as AWS. On-premises (private cloud) means you run it in your own data centre. Hybrid combines both and connects them, for example with Direct Connect or a VPN, often as a step during migration or when data must stay on site. Know the vocabulary precisely because exam options differ by one word. Scalability is the ability to handle a growing load, elasticity is automatically adding and removing capacity to match demand, agility is how fast you can try and change things, high availability means staying up with minimal downtime (usually by using multiple Availability Zones), and fault tolerance means continuing to work with no interruption when a component fails.",
    taglishExplanation:
      "Ang cloud computing ay pag-upa ng IT resources sa internet at magbayad lang sa nagamit, imbes na bumili at magpatakbo ng sariling data center. Ang gastos ay lumilipat mula CapEx (malaking upfront) papuntang OpEx (variable). Anim ang advantage: variable na gastos, economies of scale, hindi na manghuhula ng capacity, bilis at agility, hindi na gagastos sa pagpapatakbo ng data center, at global sa ilang minuto. Tatlong service model: IaaS (EC2, ikaw ang bahala sa OS pataas), PaaS (Elastic Beanstalk, app at data lang ang hawak mo), SaaS (tapos nang app). Tatlong deployment model: public cloud, on-premises, at hybrid (pinagsama at konektado). Tandaan ang pagkakaiba: scalability (kaya ang lumalaking load), elasticity (awtomatikong dagdag at bawas), high availability (halos laging up, multi-AZ), fault tolerance (tuloy kahit may nasira).",
    analogy:
      "Electricity versus owning a generator. Buying a generator is a big upfront cost you must size, fuel and repair (on-premises, CapEx). Plugging into the grid means you pay per kilowatt-hour for exactly what you used (cloud, OpEx), and the grid already has more capacity than you will ever need.",
    whyItExists:
      "Organisations were wasting money and time guessing capacity and running hardware that is not their core business. The cloud model moves that undifferentiated work to the provider.",
    flow: "Need capacity -> request it in minutes -> pay per use -> scale up or down automatically -> release it when finished",
    withoutIt: [
      "You would buy hardware for peak demand and leave it idle most of the time",
      "New projects would wait weeks for servers",
      "Expanding to another country would need a new data centre",
    ],
    bestUseCases: [
      "Variable or unpredictable workloads",
      "Startups and experiments that need low upfront cost",
      "Global applications that need to be close to users",
      "Hybrid setups during gradual migration",
    ],
    poorUseCases: [
      "Workloads with strict rules that forbid any off-site data and no hybrid option",
      "Very stable workloads that never change, where on-premises hardware is already paid for",
    ],
    alternatives: [],
    keyFeatures: [
      "Six advantages of cloud computing",
      "IaaS, PaaS and SaaS service models, plus serverless",
      "Public cloud, on-premises and hybrid deployment models",
      "CapEx versus OpEx",
      "Scalability, elasticity, agility, high availability and fault tolerance",
      "Pay-as-you-go pricing",
    ],
    availability:
      "High availability comes from using several Availability Zones. Fault tolerance goes further and tolerates a failure with no interruption at all.",
    security:
      "Security is shared: AWS secures the cloud itself and you secure what you put in it. See the shared responsibility lesson.",
    pricingLogic:
      "You pay for what you consume, so costs follow usage. Economies of scale are how AWS keeps unit prices falling over time.",
    examKeywords: [
      "CapEx to OpEx",
      "economies of scale",
      "stop guessing capacity",
      "IaaS PaaS SaaS",
      "hybrid",
      "elasticity",
      "agility",
    ],
    examTraps: [
      "Elasticity is automatic matching of capacity to demand. Scalability is only the ability to grow.",
      "High availability is minimal downtime. Fault tolerance is zero interruption on failure.",
      "Using EC2 is IaaS, so you patch the guest operating system.",
      "Moving from CapEx to OpEx means variable cost, not no cost.",
    ],
    architectureDiagram: `On-premises (you manage all)   IaaS: EC2 (you: OS, apps, data)
PaaS: Elastic Beanstalk (you: app, data)   SaaS: finished app (you: use it)
Hybrid = on-premises + AWS, connected by VPN or Direct Connect`,
    architectureCaption: "The more managed the model, the less you operate.",
    mentorTip:
      "When two answers look right, find the one word that differs: elasticity versus scalability, availability versus fault tolerance, CapEx versus OpEx.",
    questionIds: [
      "q-cloud-computing-fundamentals-ccp-1",
      "q-cloud-computing-fundamentals-ccp-2",
      "q-cloud-computing-fundamentals-ccp-3",
    ],
  },
  {
    id: "aws-account-first-steps-root-user-mfa",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "Your First Steps in an AWS Account: Root User, MFA and Safe Defaults",
    shortName: "Account first steps",
    tier: 1,
    domains: [1, 4],
    examImportance: "high",
    oneLiner:
      "The checklist for a brand-new account: lock the root user, create everyday identities, turn on alerts and learn the three ways to reach AWS.",
    englishExplanation:
      "When you create an AWS account, you sign in with an email address and password as the root user. The root user has unrestricted access to everything, including closing the account and changing the support plan, and its permissions cannot be limited with IAM policies. So treat it as a break-glass identity. Enable multi-factor authentication (MFA) on it, do not create access keys for it, use a strong unique password and use it only for the few tasks that require it, such as changing account settings or closing the account.\n\nFor daily work, create other identities. For one person experimenting, an IAM user with MFA and least-privilege permissions works. For companies, the recommended approach is AWS IAM Identity Center with a workforce identity provider, which gives people temporary credentials through a sign-in portal instead of long-lived keys. Give applications IAM roles, not stored access keys. Apply least privilege, which means granting only the permissions needed, and add more when a need is proven.\n\nThere are three ways to use AWS. The AWS Management Console is the web interface. The AWS Command Line Interface (CLI) runs commands from a terminal and can be scripted, and AWS CloudShell gives you a browser-based shell already authenticated to your account. The AWS SDKs let application code call AWS in languages such as Python, Java and JavaScript. All three call the same AWS APIs. For repeatable setups use infrastructure as code with CloudFormation instead of clicking.\n\nFinally, protect the bill. Set a budget with alerts in AWS Budgets, enable billing alerts and review the Free Tier usage page so nothing runs unnoticed. Turn on CloudTrail to record who did what, and create alternate contacts for billing, operations and security so the right people get notices.",
    taglishExplanation:
      "Kapag gumawa ka ng AWS account, sign in ka bilang root user gamit ang email at password. Walang limitasyon ang root user at hindi ito mapipigilan ng IAM policy, kaya break-glass lang ito: i-enable ang MFA, huwag gumawa ng access keys, at gamitin lang sa mga gawaing kailangan talaga. Para sa araw-araw, gumawa ng ibang identity: IAM user na may MFA at least privilege, o mas mainam para sa kompanya ang IAM Identity Center na nagbibigay ng temporary credentials. Ang mga application ay dapat gumamit ng IAM roles, hindi stored keys. Tatlong paraan ng pag-access: Management Console (web), CLI (terminal, puwedeng i-script, kasama ang CloudShell), at SDK (sa code). Lahat ay tumatawag sa parehong API. Protektahan din ang bill gamit ang AWS Budgets, at i-on ang CloudTrail.",
    analogy:
      "The root user is the master key to the whole building, kept in a safe. Daily staff get badges for their own floors (IAM users and roles), and the master key is only used when the building itself must change.",
    whyItExists:
      "Compromised root credentials would let an attacker do anything and run up unlimited cost. A clear starting checklist prevents the most common early mistakes.",
    flow: "Create account -> secure root with MFA -> create Identity Center or IAM identities -> set budgets and CloudTrail -> work through console, CLI or SDK",
    withoutIt: [
      "Everyone would share the root login",
      "A leaked password would give full control",
      "Surprise bills would go unnoticed until the invoice",
    ],
    bestUseCases: [
      "Setting up any new personal or company account",
      "Training teams on safe daily access",
      "Scripting repeatable tasks with the CLI or an SDK",
    ],
    poorUseCases: [
      "Using the root user for daily work",
      "Creating long-lived access keys for people or for the root user",
      "Embedding access keys in application code",
    ],
    alternatives: [],
    keyFeatures: [
      "Root user: full access, protect with MFA, no access keys, use rarely",
      "IAM Identity Center for people, IAM roles for applications",
      "Least privilege",
      "Console, CLI, CloudShell and SDKs all use the same APIs",
      "AWS Budgets alerts and CloudTrail from day one",
      "Alternate contacts for billing, operations and security",
    ],
    availability:
      "Keep a recovery path for the root user, such as a registered MFA device and a secured mailbox, so a lost device does not lock you out of the account.",
    security:
      "MFA on the root user, no root access keys, temporary credentials instead of long-lived keys and CloudTrail for an audit trail.",
    pricingLogic:
      "IAM, Identity Center and the CLI have no extra charge. Budgets lets you set cost alerts so a runaway resource is caught early.",
    examKeywords: [
      "root user",
      "MFA",
      "least privilege",
      "IAM Identity Center",
      "CloudShell",
      "access keys",
      "AWS Budgets",
    ],
    examTraps: [
      "IAM policies cannot restrict the root user. Use an SCP in an organization to limit member account root users.",
      "An application on EC2 should use an instance profile role, not stored access keys.",
      "Tasks that only the root user can do include closing the account and changing the support plan.",
      "Console, CLI and SDK are not different permission systems. They all call the same API.",
    ],
    architectureDiagram: `Root user (MFA, rarely used)
   +--> IAM Identity Center --> people (temporary credentials)
   +--> IAM roles --> applications and AWS services
Console / CLI / CloudShell / SDK --> same AWS APIs
Budgets + CloudTrail watching cost and activity`,
    architectureCaption: "Root is for emergencies. Daily work uses other identities.",
    mentorTip:
      "If the question says the best way to protect the root user, the answer is MFA and not using it daily, never access keys.",
    questionIds: [
      "q-aws-account-first-steps-root-user-mfa-1",
      "q-aws-account-first-steps-root-user-mfa-2",
      "q-aws-account-first-steps-root-user-mfa-3",
    ],
  },
  {
    id: "aws-pricing-fundamentals-free-tier-tco",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "How AWS Pricing Works: Pay-as-you-go, Free Tier, TCO and Calculators",
    shortName: "Pricing fundamentals",
    tier: 1,
    domains: [4],
    examImportance: "high",
    oneLiner:
      "AWS charges for compute, storage and data leaving AWS. The three pricing principles, the Free Tier and the estimation tools explain most pricing questions.",
    englishExplanation:
      "AWS pricing follows three ideas. Pay as you go: you are charged for what you use, with no long-term contract by default. Pay less when you reserve: commitments such as Savings Plans and Reserved Instances reduce the rate in exchange for a one- or three-year commitment. Pay less as you use more: tiered pricing lowers the per-unit price at higher volumes, for example S3 storage, and volume discounts also come with consolidated billing across accounts in an organization.\n\nThe main cost drivers are compute (time the resources run), storage (amount and class) and data transfer. Data transfer into AWS from the internet is generally free, and so is traffic between services inside the same Availability Zone over private addresses in many cases, while data transferred out to the internet and between Regions is charged, and cross-AZ transfer has a cost too. Some services have no charge themselves and you pay only for the resources they create, such as IAM, Auto Scaling, CloudFormation and VPC itself.\n\nThe AWS Free Tier lets you try services at no cost. There are three kinds: always free offers that do not expire, short trials that start when you first use a service, and the new-account offer. Accounts created before 15 July 2025 stay on the legacy model with 12 months of free usage on many services. Accounts created on or after that date choose a free plan or a paid plan: the free plan gives credits (up to $200) and lasts up to six months or until the credits run out, so check the current terms on the Free Tier page before relying on it.\n\nTo estimate and review cost, use the AWS Pricing Calculator to model a workload before you build it, AWS Cost Explorer to analyse past spend and forecast, AWS Budgets to alert and act on thresholds, and the Cost and Usage Report for the most detailed data. Total cost of ownership (TCO) compares the full cost of running on-premises, including hardware, power, space and staff, with running on AWS, and AWS Migration Evaluator helps build that business case.",
    taglishExplanation:
      "Tatlong prinsipyo ang pricing ng AWS: pay as you go (bayad sa nagamit, walang kontrata), pay less when you reserve (Savings Plans at Reserved Instances kapalit ng 1 o 3 taong commitment), at pay less as you use more (tiered pricing at volume discount, kasama ang consolidated billing). Ang pangunahing gastos ay compute, storage at data transfer. Libre ang data papasok mula internet, pero may bayad ang palabas sa internet at sa pagitan ng Regions. May Free Tier: always free, trials, at ang offer para sa bagong account (para sa account na ginawa sa o pagkatapos ng 15 July 2025, may free plan na credits hanggang $200 at hanggang anim na buwan; ang mas luma ay legacy na 12 buwan). Para sa estimate gamitin ang Pricing Calculator, Cost Explorer para sa nakaraan, Budgets para sa alerts, at TCO para ikumpara ang on-premises at AWS.",
    analogy:
      "A utility bill with a loyalty scheme. You pay for the units you use, you get a lower rate if you commit to a yearly contract, and the more you consume the cheaper each extra unit becomes. Filling the tank is free, but driving out of town costs.",
    whyItExists:
      "Customers need predictable ways to estimate, compare and control cost when capacity is rented by the hour or second.",
    flow: "Estimate with Pricing Calculator -> build -> track in Cost Explorer -> alert with Budgets -> commit steady usage with Savings Plans",
    withoutIt: [
      "Cost would be a surprise at the end of the month",
      "On-premises comparisons would ignore hidden costs",
      "Steady usage would pay full On-Demand rates",
    ],
    bestUseCases: [
      "Estimating a new architecture before building it",
      "Building a business case for migration with TCO",
      "Reducing steady workload cost with commitments",
      "Setting budget alerts to catch runaway spend",
    ],
    poorUseCases: [
      "Assuming everything is free after the Free Tier",
      "Ignoring data transfer when estimating",
      "Committing before right-sizing",
    ],
    alternatives: [],
    keyFeatures: [
      "Three pricing principles: pay as you go, pay less when you reserve, pay less as you use more",
      "Cost drivers: compute, storage, data transfer out",
      "Free Tier: always free, trials, new-account offer",
      "Pricing Calculator, Cost Explorer, Budgets, Cost and Usage Report",
      "TCO and Migration Evaluator",
      "Consolidated billing and volume discounts",
    ],
    availability: "Not applicable. This is a pricing concepts lesson.",
    security:
      "Use IAM and organization policies to control who can create expensive resources, and budgets with alerts to catch misuse.",
    pricingLogic:
      "Inbound data is generally free. Outbound to the internet and between Regions is charged. Pay for compute time, storage amount and requests, and commit to save on steady usage.",
    examKeywords: [
      "pay as you go",
      "Pricing Calculator",
      "TCO",
      "Free Tier",
      "volume discount",
      "consolidated billing",
      "data transfer out",
    ],
    examTraps: [
      "Pricing Calculator estimates future cost. Cost Explorer analyses past and current cost.",
      "Data into AWS is generally free. Data out to the internet is charged.",
      "A Free Tier offer type differs: always free never expires, trials expire after a period or usage.",
      "Savings Plans and Reserved Instances lower the rate but require a commitment.",
    ],
    architectureDiagram: `Estimate (Pricing Calculator / TCO) -> Build -> Track (Cost Explorer, CUR)
   -> Alert (Budgets) -> Optimise (right-size, Savings Plans, Spot)`,
    architectureCaption: "Estimate, track, alert and optimise.",
    mentorTip:
      "Match the tool to the time: Pricing Calculator for before, Cost Explorer for after, Budgets for warnings.",
    questionIds: [
      "q-aws-pricing-fundamentals-free-tier-tco-1",
      "q-aws-pricing-fundamentals-free-tier-tco-2",
      "q-aws-pricing-fundamentals-free-tier-tco-3",
    ],
  },
  {
    id: "cloud-adoption-framework-ccp",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "AWS Cloud Adoption Framework and Moving to the Cloud",
    shortName: "CAF & adoption",
    tier: 2,
    domains: [4, 1],
    examImportance: "medium",
    oneLiner:
      "The Cloud Adoption Framework organises the non-technical and technical work of moving to the cloud into six perspectives.",
    englishExplanation:
      "Moving to the cloud is as much about people and process as it is about technology. The AWS Cloud Adoption Framework (AWS CAF) gives a structure for planning it by grouping guidance into six perspectives. Three focus on business capabilities and three on technical ones. Business covers aligning cloud investment to outcomes and is aimed at finance and business managers. People covers skills, culture and organisational change. Governance covers managing risk and coordinating the programme. Platform covers building the cloud environment and modernising workloads. Security covers protecting data and workloads, including confidentiality, integrity and availability. Operations covers running services at the level the business needs.\n\nA team uses the perspectives to find gaps in skills and processes and turn them into workstreams. AWS CAF is a planning framework, not a service you switch on. Related ideas include the AWS Well-Architected Framework, which reviews a specific workload against six pillars, and the AWS Migration Acceleration Program, which gives funding, tools and partner help for large migrations.\n\nWhen choosing how to move each application, remember the migration strategies, often called the seven Rs: retire (switch off what is not needed), retain (leave as is for now), rehost (lift and shift with no changes), relocate (move in bulk, for example VMware, with little change), repurchase (replace with a different product, usually SaaS), replatform (small optimisations such as moving a database to a managed service) and refactor (re-architect to be cloud native). Rehost is fastest and refactor offers the most long-term benefit but takes the most effort. Tools such as AWS Application Discovery Service and Migration Hub help inventory and track the move, and AWS Migration Evaluator builds the cost case.",
    taglishExplanation:
      "Ang paglipat sa cloud ay tungkol din sa tao at proseso. Ang AWS Cloud Adoption Framework (CAF) ay may anim na perspective: Business, People, Governance (business capabilities) at Platform, Security, Operations (technical capabilities). Business ay pag-align ng investment sa resulta, People ay skills at kultura, Governance ay risk at koordinasyon, Platform ay pagbuo ng cloud environment, Security ay proteksyon ng data, Operations ay pagpapatakbo ng serbisyo. Ang CAF ay planning framework, hindi service. Para sa migration may 7 Rs: retire, retain, rehost (lift and shift), relocate, repurchase, replatform, refactor. Pinakamabilis ang rehost, pinakamalaki ang benepisyo ng refactor pero pinakamahirap.",
    analogy:
      "Planning a house move, not just a truck. The truck is the technology, but you also need the budget, who packs what, the rules for the new place, a safe lock and someone to keep the lights on. The framework is the checklist that covers all of it.",
    whyItExists:
      "Many cloud projects stall for non-technical reasons such as skills gaps, unclear ownership or weak governance, so a framework helps teams plan the whole programme.",
    flow: "Assess with six perspectives -> find gaps -> plan workstreams -> choose a migration strategy per application -> migrate and operate",
    withoutIt: [
      "Projects would focus only on technology and miss skills and governance",
      "Every application would be migrated the same way regardless of fit",
      "Business owners would lack a shared language with the technical team",
    ],
    bestUseCases: [
      "Planning an enterprise cloud adoption programme",
      "Running a readiness assessment to find skills and process gaps",
      "Choosing a migration strategy for each application",
    ],
    poorUseCases: [
      "Treating CAF as a tool that migrates workloads",
      "Using CAF to review the design of one specific workload (use Well-Architected)",
    ],
    alternatives: [],
    keyFeatures: [
      "Six perspectives: Business, People, Governance, Platform, Security, Operations",
      "Business, People and Governance are business capabilities. Platform, Security and Operations are technical capabilities",
      "Seven Rs of migration",
      "Application Discovery Service, Migration Hub and Migration Evaluator support planning",
      "AWS Migration Acceleration Program for funding and help",
    ],
    availability: "Not applicable. This is a planning framework lesson.",
    security:
      "The Security perspective addresses confidentiality, integrity and availability of data and workloads across the adoption.",
    pricingLogic:
      "CAF itself is free guidance. The Business perspective links cloud spend to outcomes and the migration programme can offset some costs.",
    examKeywords: [
      "Cloud Adoption Framework",
      "perspectives",
      "rehost",
      "refactor",
      "repurchase",
      "Migration Acceleration Program",
      "readiness assessment",
    ],
    examTraps: [
      "CAF plans the adoption programme. Well-Architected reviews a workload design.",
      "Rehost means lift and shift with no code changes. Refactor re-architects.",
      "Repurchase usually means moving to a SaaS product.",
      "The People perspective is about skills and culture, not hiring tools.",
    ],
    architectureDiagram: `CAF perspectives:  Business | People | Governance   (business capabilities)
                   Platform | Security | Operations   (technical capabilities)
Per application: Retire | Retain | Rehost | Relocate | Repurchase | Replatform | Refactor`,
    architectureCaption: "Plan the programme with perspectives, then pick a strategy per application.",
    mentorTip:
      "Skills and training gaps point to the People perspective. Cost and value point to Business. Risk and compliance programme management point to Governance.",
    questionIds: [
      "q-cloud-adoption-framework-ccp-1",
      "q-cloud-adoption-framework-ccp-2",
      "q-cloud-adoption-framework-ccp-3",
    ],
  },
  {
    id: "regions-edge-local-zones-wavelength-outposts",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "Choosing Regions and Extending AWS: Edge, Local Zones, Wavelength and Outposts",
    shortName: "Regions & extensions",
    tier: 1,
    domains: [2, 3, 1],
    examImportance: "medium",
    oneLiner:
      "Pick a Region by compliance, latency, services and price, and use Local Zones, Wavelength or Outposts when workloads must sit closer to users or on site.",
    englishExplanation:
      "Four factors guide the choice of a Region. First is compliance and data residency: some laws require that data stays in a country or area, and data does not leave a Region unless you move it. Second is latency: pick the Region closest to your users. Third is service availability: new services and features launch in some Regions first. Fourth is price: costs differ between Regions. Once you have chosen, spread across several Availability Zones in the Region for availability, and across Regions for disaster recovery.\n\nBeyond Regions, AWS offers other ways to place infrastructure. Edge locations, used by CloudFront, Route 53 and Global Accelerator, cache content and answer requests close to users and are many more than Regions. Local Zones extend a Region into a metropolitan area so that latency-sensitive workloads, such as media production or real-time gaming, can run single-digit milliseconds from the users while still using the parent Region's services. AWS Wavelength embeds AWS compute and storage inside telecom providers' 5G networks to give ultra-low latency to mobile devices. AWS Outposts brings AWS infrastructure and services into your own data centre or facility, for workloads that need low latency to on-site systems or must keep data local, and AWS runs and maintains the hardware as a managed service.\n\nSome Regions are opt-in and must be enabled before use. AWS GovCloud (US) is a separate partition for US government workloads, and AWS China Regions operate separately with their own accounts. Remember that Region names are codes such as us-east-1, and that most services are Regional, meaning resources in one Region are not automatically in another. A few services are global, such as IAM and Route 53, and CloudFront is served from the global edge network.",
    taglishExplanation:
      "Apat ang batayan sa pagpili ng Region: compliance at data residency (hindi lumalabas ang data sa Region kung hindi mo ililipat), latency (pinakamalapit sa users), service availability (may bagong service na unang lumalabas sa ilang Region), at presyo. Sa loob ng Region, gumamit ng maraming AZ para sa availability at maraming Region para sa disaster recovery. May iba pang paraan: Edge locations (CloudFront, Route 53, Global Accelerator) na mas marami kaysa Regions; Local Zones na nagpapalawak ng Region sa isang metro area para sa latency-sensitive; Wavelength na nasa loob ng 5G network ng telecom; at Outposts na AWS infrastructure sa sarili mong data center. Tandaan: ang IAM at Route 53 ay global, ang karamihan ay Regional.",
    analogy:
      "A restaurant chain. A Region is a city branch with several kitchens (AZs). Edge locations are many small pickup counters that hand out ready food. A Local Zone is a satellite kitchen in a busy neighbourhood. Wavelength is a counter inside the phone company's building, and Outposts is the chain installing a kitchen inside your own office.",
    whyItExists:
      "Some workloads cannot tolerate the latency of a distant Region or must keep data on site, so AWS offers placement options that bring its services closer.",
    flow: "Check compliance -> pick closest Region with the needed services -> spread across AZs -> add edge, Local Zone, Wavelength or Outposts only when latency or locality demands it",
    withoutIt: [
      "Users far from a Region would see higher latency",
      "On-site and ultra-low latency workloads could not use AWS services",
      "Data residency rules would be hard to satisfy",
    ],
    bestUseCases: [
      "Choosing a Region near users that meets data residency rules",
      "Local Zones for metro-area real-time workloads",
      "Wavelength for 5G mobile applications",
      "Outposts for on-site processing and local data residency",
      "Edge locations to cache content globally",
    ],
    poorUseCases: [
      "Choosing a Region only by price when residency rules apply",
      "Using Outposts when a standard Region is fast enough",
      "Expecting resources to appear in other Regions automatically",
    ],
    alternatives: [
      { need: "Cache content close to users", choose: "Amazon CloudFront" },
      { need: "Private link from your data centre to AWS", choose: "AWS Direct Connect" },
      { need: "Run AWS services in your own facility", choose: "AWS Outposts" },
    ],
    keyFeatures: [
      "Region choice factors: compliance, latency, service availability, price",
      "Regions contain multiple Availability Zones",
      "Edge locations for caching and DNS",
      "Local Zones: metro-area extension of a Region",
      "Wavelength: AWS inside telecom 5G networks",
      "Outposts: AWS-managed infrastructure on site",
      "Global services such as IAM and Route 53",
    ],
    availability:
      "Use several AZs in a Region for high availability and a second Region for disaster recovery. Local Zones and Outposts depend on a parent Region.",
    security:
      "Data stays in the chosen Region unless you replicate it. Use this for data residency, and control cross-Region copies with policies.",
    pricingLogic:
      "Prices vary by Region. Data transfer between Regions is charged. Outposts is priced as a managed hardware service rather than per hour of virtual capacity alone.",
    examKeywords: [
      "data residency",
      "Local Zone",
      "Wavelength",
      "Outposts",
      "edge location",
      "lowest latency",
      "5G",
    ],
    examTraps: [
      "Compliance and data residency come first when choosing a Region, before price.",
      "Wavelength is for 5G mobile, Local Zones are for metro-area latency, Outposts is on-site.",
      "Edge locations are not Regions and you do not launch EC2 there.",
      "IAM is global but most resources are Regional.",
    ],
    architectureDiagram: `Region (us-east-1)  --> AZ a | AZ b | AZ c
   +--> Local Zone (metro area)   +--> Wavelength Zone (inside 5G network)
   +--> Outposts (your data centre)   Edge locations (CloudFront, Route 53) worldwide`,
    architectureCaption: "Choose a Region first, then extend only if needed.",
    mentorTip:
      "Keywords decide: data must stay on site means Outposts, 5G mobile means Wavelength, single metro low latency means Local Zone.",
    questionIds: [
      "q-regions-edge-local-zones-wavelength-outposts-1",
      "q-regions-edge-local-zones-wavelength-outposts-2",
      "q-regions-edge-local-zones-wavelength-outposts-3",
    ],
  },
  {
    id: "aws-service-map-quick-reference",
    moduleId: "phase-0-orientation",
    category: "Orientation",
    title: "AWS Service Map: One-Line Refresher for the Core Services",
    shortName: "Service map",
    tier: 1,
    domains: [1, 2, 3, 4],
    examImportance: "high",
    oneLiner:
      "A quick reference that says in one line what each core AWS service does, so you can recognise the right one the moment a question names it.",
    englishExplanation:
      "Use this lesson as a refresher before the deeper ones. Compute: EC2 gives virtual servers, Lambda runs code without servers, ECS and EKS run containers, Fargate runs containers without managing servers, Elastic Beanstalk deploys web apps for you and Auto Scaling adds or removes capacity. Storage: S3 is object storage, EBS is block storage for one EC2 instance, EFS is a shared Linux file system, FSx provides managed file systems including Windows, and S3 Glacier is archive storage.\n\nDatabases: RDS is managed relational databases, Aurora is the AWS-built high-performance relational engine, DynamoDB is a serverless key-value database, ElastiCache is an in-memory cache, Redshift is a data warehouse, and Neptune is a graph database. Networking: VPC is your private network, subnets split it, route tables and gateways control traffic, security groups and network ACLs filter it, Route 53 is DNS, CloudFront is a content delivery network, Direct Connect is a dedicated private link and Elastic Load Balancing spreads traffic.\n\nSecurity and identity: IAM controls who can do what, KMS manages encryption keys, Secrets Manager stores secrets, GuardDuty detects threats, Inspector scans for vulnerabilities, Macie finds sensitive data in S3, Shield and WAF protect against DDoS and web attacks, and Artifact provides compliance reports. Integration: SQS is a queue, SNS is publish-subscribe notifications, EventBridge routes events, Step Functions orchestrates workflows and API Gateway publishes APIs. Management and monitoring: CloudWatch collects metrics, logs and alarms, CloudTrail records API activity, Config tracks resource configuration, Systems Manager operates fleets, CloudFormation provisions infrastructure from templates, Organizations manages many accounts and Trusted Advisor gives best-practice checks. Analytics and migration: Athena queries data in S3 with SQL, Glue prepares data, Kinesis streams data, DMS migrates databases, and Snowball moves large data offline.",
    taglishExplanation:
      "Gamitin ito bilang mabilis na refresher. Compute: EC2 (virtual server), Lambda (code na walang server), ECS/EKS (containers), Fargate (container na walang server na papatakbuhin), Elastic Beanstalk, Auto Scaling. Storage: S3 (object), EBS (block para sa isang EC2), EFS (shared Linux file), FSx (managed file system), Glacier (archive). Database: RDS, Aurora, DynamoDB, ElastiCache, Redshift, Neptune. Networking: VPC, Route 53, CloudFront, Direct Connect, ELB. Security: IAM, KMS, Secrets Manager, GuardDuty, Inspector, Macie, Shield, WAF, Artifact. Integration: SQS, SNS, EventBridge, Step Functions, API Gateway. Management: CloudWatch, CloudTrail, Config, Systems Manager, CloudFormation, Organizations, Trusted Advisor. Analytics at migration: Athena, Glue, Kinesis, DMS, Snowball.",
    analogy:
      "A map legend. You do not need every street memorised to read the map, but knowing what each symbol means lets you read any region of it quickly.",
    whyItExists:
      "Exam scenarios name services by purpose. Recognising each service from a one-line description saves time and prevents mixing up look-alikes.",
    flow: "Read the scenario -> identify the category (compute, storage, database, network, security) -> match the one-line purpose -> open the deep lesson if unsure",
    withoutIt: [
      "Look-alike services would blur together",
      "You would spend exam time recalling basics instead of reasoning",
    ],
    bestUseCases: [
      "A quick review the night before the exam",
      "Refreshing basics before the advanced lessons",
      "Self-testing: cover the description and name the service",
    ],
    poorUseCases: [
      "Using it instead of the deep lessons for design decisions",
      "Memorising names without knowing when each fits",
    ],
    alternatives: [],
    keyFeatures: [
      "Compute, storage, database and networking one-liners",
      "Security, integration, management and analytics one-liners",
      "Look-alike pairs: SQS versus SNS, EBS versus EFS, Shield versus WAF, CloudWatch versus CloudTrail",
    ],
    availability: "Not applicable. This is a reference lesson.",
    security: "Not applicable. This is a reference lesson.",
    pricingLogic: "Not applicable. This is a reference lesson.",
    examKeywords: [
      "which service",
      "managed",
      "serverless",
      "object storage",
      "block storage",
      "queue versus topic",
    ],
    examTraps: [
      "CloudWatch monitors metrics and logs. CloudTrail records who called which API.",
      "SQS queues messages for one consumer group. SNS pushes to many subscribers.",
      "Shield is DDoS protection. WAF filters web requests by rules.",
      "EBS attaches to one instance in one AZ. EFS is shared across instances.",
    ],
    architectureDiagram: `Compute: EC2 Lambda ECS EKS Fargate   Storage: S3 EBS EFS FSx Glacier
Database: RDS Aurora DynamoDB ElastiCache Redshift   Network: VPC Route 53 CloudFront ELB
Security: IAM KMS GuardDuty Shield WAF   Integration: SQS SNS EventBridge Step Functions`,
    architectureCaption: "One-line recognition for the core services.",
    mentorTip:
      "For each pair of look-alikes, write the one difference on a flashcard. Those pairs are where the distractors hide.",
    questionIds: [
      "q-aws-service-map-quick-reference-1",
      "q-aws-service-map-quick-reference-2",
      "q-aws-service-map-quick-reference-3",
    ],
  },
];
