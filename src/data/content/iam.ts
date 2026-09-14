import type { Lesson } from "@/lib/types";

export const iamLessons: Lesson[] = [
  {
    id: "iam-core",
    moduleId: "phase-1-iam",
    category: "Security, Identity, and Compliance",
    title: "AWS Identity and Access Management (IAM)",
    shortName: "IAM",
    tier: 1,
    domains: [1],
    examImportance: "critical",
    oneLiner:
      "IAM controls WHO can do WHAT to WHICH AWS resources — it is the foundation of every security decision in AWS.",
    englishExplanation:
      "IAM is the service that answers three questions for every single API call made to AWS: who is making this request, what are they trying to do, and are they allowed to do it. Every other security service in this course builds on top of IAM.\n\nThe root user is created when you open an AWS account and has unrestricted access to everything, including closing the account — it should be locked away with MFA and never used for daily work. Instead, you create IAM users (for people) or, much more commonly in real architecture, IAM roles (temporary identities that applications, EC2 instances, Lambda functions, or even users from another AWS account can 'assume' to get temporary credentials).\n\nPermissions are granted through policies — JSON documents that say which actions are Allowed or Denied on which resources. An identity-based policy is attached to a user/group/role (\"this role can read from this S3 bucket\"). A resource-based policy is attached to the resource itself (\"this S3 bucket allows this other AWS account to read it\") — this is the key mechanism for cross-account access without creating IAM users in your account for outsiders. AWS Security Token Service (STS) is what actually issues the short-lived, temporary credentials behind every role assumption.\n\nThe golden rule underneath all of this is least privilege: grant only the permissions required to do the job, nothing more — because every unnecessary permission is a bigger blast radius if that identity is ever compromised.",
    taglishExplanation:
      "Si IAM ang nagsasabi kung SINO ang gumagawa ng request sa AWS, ANO ang gusto niyang gawin, at PAYAG BA ang AWS na gawin niya iyon. Ang root user ay parang \"master key\" ng buong bahay — dapat naka-lock lang ito (gamit ang MFA) at hindi ginagamit sa araw-araw. Sa halip, gumagawa tayo ng IAM users (para sa tao) o mas madalas, IAM roles (parang \"pansamantalang ID badge\" na maaaring gamitin ng isang application o EC2 instance para makakuha ng pahintulot nang hindi nag-iimbak ng permanenteng password). Ang policies naman ay parang \"listahan ng mga pinapayagang gawin\" — at ang pinakaimportanteng rule dito ay least privilege: bigyan lang ng eksaktong kailangan, wag sobra.",
    analogy:
      "IAM is like a hotel's key-card system. The root user is the master key that opens every room, the elevator override, and the safe — you lock that in the manager's office. Guests (IAM users) get key cards scoped only to their own room and the gym (least privilege). Contractors who need temporary access to fix the AC (a role assumed by an external system) get a key card that expires automatically after their shift (temporary credentials via STS) instead of a permanent one.",
    whyItExists:
      "Without IAM, every AWS resource would either be fully public or require sharing a single powerful set of credentials across every person and application — making it impossible to audit who did what, and catastrophic if any single credential leaked.",
    flow:
      "Request arrives at AWS -> IAM authenticates who is calling (user, role, or federated identity) -> IAM evaluates all applicable policies -> Allow or Deny decision -> action proceeds or is rejected",
    withoutIt: [
      "Every application and person would need to share one powerful credential",
      "There would be no way to audit or limit what a specific person or application can do",
      "A single leaked credential would compromise the entire AWS account",
    ],
    bestUseCases: [
      "Granting an EC2 instance or Lambda function permission to call other AWS services (via an IAM role, never hardcoded keys)",
      "Giving a human user only the permissions their job requires (least privilege)",
      "Allowing a trusted external AWS account to access a specific resource (cross-account role or resource policy)",
      "Enforcing MFA for sensitive actions",
      "Federating existing corporate identities (via IAM Identity Center / SAML / OIDC) instead of creating separate IAM users",
    ],
    poorUseCases: [
      "Using the root user for daily operations",
      "Hardcoding long-lived IAM user access keys inside application code or on an EC2 instance instead of using a role",
      "Granting broad admin (\"*\") permissions out of convenience",
    ],
    alternatives: [
      { need: "Sign-in for your own web/mobile app's customers", choose: "Amazon Cognito (not IAM)" },
      { need: "Centralized workforce access across many AWS accounts", choose: "IAM Identity Center" },
      { need: "Company-wide guardrails across many accounts", choose: "AWS Organizations + Service Control Policies" },
    ],
    keyFeatures: [
      "Users, Groups, Roles, and Policies as the core building blocks",
      "Identity-based policies vs resource-based policies",
      "AWS STS for temporary, short-lived credentials",
      "Cross-account access via roles instead of shared long-lived credentials",
      "MFA (multi-factor authentication) for an extra verification layer",
      "IAM Access Analyzer / policy simulation tools for validating least privilege (conceptually)",
    ],
    availability:
      "IAM is a global service — identities and policies are not scoped to a single Region. Every IAM action is evaluated in real time for every API call across all Regions.",
    security:
      "IAM IS the security control plane: least privilege, MFA on privileged accounts, roles instead of long-lived keys, and regularly reviewing who has access to what are the core practices tested throughout the exam's Security domain.",
    pricingLogic:
      "IAM itself has no additional charge — you pay only for the underlying AWS resources your identities access.",
    examKeywords: [
      "least privilege",
      "IAM role",
      "temporary credentials",
      "cross-account access",
      "resource-based policy",
      "MFA",
      "root user",
    ],
    examTraps: [
      "Thinking IAM roles and IAM users are interchangeable — roles are assumed and produce temporary credentials, users have long-lived credentials.",
      "Choosing to hardcode access keys on an EC2 instance instead of attaching an IAM role.",
      "Confusing an identity-based policy (attached to the user/role) with a resource-based policy (attached to the resource, and the mechanism that enables cross-account access).",
    ],
    architectureDiagram:
      "EC2 Instance\n   | (assumes)\nIAM Role -> STS issues temporary credentials\n   |\nRole's attached policy allows: s3:GetObject on specific bucket\n   |\nEC2 can now read from that S3 bucket only",
    architectureCaption:
      "The exam-favorite pattern: never put access keys on an instance — attach a role instead.",
    mentorTip:
      "Any time a question mentions an EC2 instance, Lambda function, or ECS task needing to call another AWS service, the correct answer almost always involves an IAM role — not access keys, not the root user.",
    questionIds: [
      "q-iam-core-1",
      "q-iam-core-2",
      "q-iam-core-3",
      "q-iam-core-4",
      "q-iam-core-5",
    ],
  },
  {
    id: "iam-identity-center",
    moduleId: "phase-1-iam",
    category: "Security, Identity, and Compliance",
    title: "AWS IAM Identity Center & Federation",
    shortName: "IAM Identity Center",
    tier: 1,
    domains: [1],
    examImportance: "high",
    oneLiner:
      "IAM Identity Center gives your workforce single sign-on access across many AWS accounts, instead of creating an IAM user in every account.",
    englishExplanation:
      "As a company grows, it usually ends up with many AWS accounts (one for production, one for dev, one per team) managed under AWS Organizations. Creating a separate IAM user for every employee in every account quickly becomes unmanageable and insecure.\n\nIAM Identity Center (formerly AWS SSO) solves this by giving each workforce user a single set of credentials that can be granted temporary, role-based access across many accounts, typically synced from an existing identity source like Microsoft Active Directory or a third-party identity provider via SAML 2.0. Federation is the general concept behind this: trusting an external identity provider so users don't need a separate AWS-specific identity at all.\n\nUnder the hood, when a federated or Identity Center user 'logs into' an AWS account, they are not creating a permanent IAM user — AWS STS issues them temporary credentials scoped to a role, which is why this pattern is both more convenient and more secure than distributing long-lived IAM user credentials.",
    taglishExplanation:
      "Kapag maraming AWS accounts na ang isang kumpanya (production, dev, per-team), nakakahirap na gumawa ng hiwalay na IAM user sa bawat account para sa bawat empleyado. Ang IAM Identity Center ay parang \"iisang badge\" na pwede mong gamitin para makapasok sa iba't ibang \"gusali\" (accounts), depende sa role na ibinigay sa iyo — madalas ito naka-sync na sa existing na company directory (Active Directory) para hindi na kailangan gumawa ng bagong password.",
    analogy:
      "IAM Identity Center is like a single employee badge that works across every building your company owns, instead of needing a different badge for every building. The badge itself doesn't grant access — it's checked against what that employee's role is allowed to do in each building.",
    whyItExists:
      "Without centralized federation, a company with dozens of AWS accounts and hundreds of employees would need to manage IAM users individually per account — a massive operational and security burden (orphaned accounts, inconsistent permissions, password reuse).",
    flow:
      "Employee signs in once via corporate identity provider -> IAM Identity Center -> selects an AWS account + role -> STS issues temporary credentials -> employee works in that account with scoped permissions",
    withoutIt: [
      "You would need to create and manage a separate IAM user per employee per AWS account",
      "Offboarding an employee would require revoking access in every account individually",
      "Password/credential sprawl across dozens of accounts would increase security risk",
    ],
    bestUseCases: [
      "Multi-account organizations wanting single sign-on for their workforce",
      "Companies that already have Active Directory or a SAML/OIDC identity provider",
      "Centralizing permission sets across many AWS accounts managed by AWS Organizations",
    ],
    poorUseCases: [
      "A single-account, single-user hobby project — plain IAM users/roles are simpler",
      "Authenticating external customers of your own application — use Cognito instead",
    ],
    alternatives: [
      { need: "Sign-in for your application's end customers", choose: "Amazon Cognito" },
      { need: "A single account with a handful of users", choose: "Plain IAM users/groups may be sufficient" },
      { need: "Organization-wide policy guardrails (not sign-in)", choose: "AWS Organizations + SCPs" },
    ],
    keyFeatures: [
      "Single sign-on across multiple AWS accounts managed by AWS Organizations",
      "Integrates with existing identity providers (Active Directory, Okta, Azure AD, etc.) via SAML 2.0",
      "Permission sets define what a user/group can do once signed into a given account",
      "Issues temporary credentials via STS under the hood — no long-lived IAM user credentials",
    ],
    availability:
      "A global, account-wide capability tied to your AWS Organizations management account; it centrally governs access across all member accounts.",
    security:
      "This is a core Domain 1 topic: federation and centralized identity reduce the number of long-lived credentials in existence, which directly reduces security risk. Combine with least-privilege permission sets and MFA at the identity provider.",
    pricingLogic:
      "IAM Identity Center itself has no direct charge for the core SSO/federation capability; you pay for the underlying AWS resources accessed.",
    examKeywords: [
      "single sign-on",
      "federation",
      "multi-account",
      "SAML",
      "workforce identity",
      "AWS Organizations",
    ],
    examTraps: [
      "Confusing IAM Identity Center (workforce/admin access across accounts) with Amazon Cognito (your application's end-user sign-in) — these solve different problems.",
      "Assuming federated users get long-lived credentials — they always get temporary STS credentials.",
    ],
    architectureDiagram:
      "Corporate Identity Provider (Active Directory / Okta)\n   |  (SAML federation)\nIAM Identity Center\n   |\n  / | \\\nAccount A   Account B   Account C\n(role X)    (role Y)    (role Z)",
    mentorTip:
      "If the scenario says 'workforce' or 'employees need access to multiple AWS accounts,' think IAM Identity Center. If it says 'our app's users need to sign in,' think Cognito.",
    questionIds: [
      "q-iam-identity-center-1",
      "q-iam-identity-center-2",
      "q-iam-identity-center-3",
      "q-iam-identity-center-4",
      "q-iam-identity-center-5",
    ],
  },
];
