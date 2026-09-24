export type IrctcAsset = {
  id: string;
  name: string;
  category: string;
  sensitivity: string;
  criticality: string;
  justification: string;
};

export type CrownJewel = {
  id: string;
  name: string;
  whyItMatters: string;
  primaryThreat: string;
  businessImpact: string;
};

export type Vulnerability = {
  id: string;
  title: string;
  type: string;
  affectedAssets: string[];
  sourceEvidence: string;
  attackScenario: string;
  prevention: string[];
  detection: string[];
  mitigation: string[];
};

export type AttackScenario = {
  id: string;
  title: string;
  vulnerability: string;
  attack: string;
  potentialBusinessImpact: string;
};

const NS = "Not specified in source";

export const irctcAssessment = {
  title: "IRCTC Cyber Security Gap Assessment",
  framing: "CYBER SECURITY GAP ASSESSMENT",
  disclaimer:
    "Interactive portfolio visualization of a cyber security gap assessment. Attack paths are labeled SIMULATED VISUALIZATION.",
  metrics: [
    { label: "ASSETS", value: "13" },
    { label: "CROWN JEWELS", value: "5" },
    { label: "VULNERABILITIES", value: "10" },
    { label: "ATTACK SCENARIOS", value: "10" },
  ] as const,
  flow: [
    "ASSETS",
    "CROWN JEWELS",
    "VULNERABILITIES",
    "ATTACK SCENARIOS",
    "PREVENTION",
    "DETECTION",
    "MITIGATION",
    "RISK",
  ] as const,
  reportPath: "/assets/irctc-gap-assessment.pdf",
  sourceNote:
    "Lists below come from the portfolio brief. Per-item metadata fields marked Not specified in source where the authoritative DOCX was unavailable on the build worker.",
  assets: [
    {
      id: "prs",
      name: "Passenger Reservation System",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
    {
      id: "oracle",
      name: "Oracle Database (Passenger & PNR Records)",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
    {
      id: "website",
      name: "IRCTC Website",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
    {
      id: "mobile",
      name: "Android & iOS Mobile Apps",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
    {
      id: "api",
      name: "API Gateway",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
    {
      id: "payment",
      name: "Payment Gateway Integration",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
    {
      id: "aadhaar",
      name: "Aadhaar Verification Service",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
    {
      id: "ad",
      name: "Active Directory & Privileged Accounts",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
    {
      id: "backups",
      name: "Passenger Database Backups",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
    {
      id: "legacy",
      name: "Legacy Booking / Ticketing Applications",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
    {
      id: "ghe",
      name: "GitHub Enterprise",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
    {
      id: "vendor",
      name: "Third-Party Vendor Access to Production",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
    {
      id: "support",
      name: "Customer Support Portal",
      category: NS,
      sensitivity: NS,
      criticality: NS,
      justification: NS,
    },
  ] as IrctcAsset[],
  crownJewels: [
    {
      id: "cj-oracle",
      name: "Oracle Database",
      whyItMatters: NS,
      primaryThreat: NS,
      businessImpact: NS,
    },
    {
      id: "cj-prs",
      name: "Passenger Reservation System",
      whyItMatters: NS,
      primaryThreat: NS,
      businessImpact: NS,
    },
    {
      id: "cj-api",
      name: "API Gateway",
      whyItMatters: NS,
      primaryThreat: NS,
      businessImpact: NS,
    },
    {
      id: "cj-payment",
      name: "Payment Gateway Integration",
      whyItMatters: NS,
      primaryThreat: NS,
      businessImpact: NS,
    },
    {
      id: "cj-ad",
      name: "Active Directory & Privileged Accounts",
      whyItMatters: NS,
      primaryThreat: NS,
      businessImpact: NS,
    },
  ] as CrownJewel[],
  vulnerabilities: [
    {
      id: "v1",
      title: "Booking bots bypass CAPTCHA protections",
      type: NS,
      affectedAssets: ["Passenger Reservation System", "IRCTC Website"],
      sourceEvidence: NS,
      attackScenario: "BOT ATTACK",
      prevention: [NS],
      detection: [NS],
      mitigation: [NS],
    },
    {
      id: "v2",
      title: "Some APIs lack proper authentication",
      type: "API ABUSE",
      affectedAssets: ["API Gateway"],
      sourceEvidence: NS,
      attackScenario: "API ATTACK",
      // Brief-supplied illustrative PDM for API ABUSE
      prevention: [
        "OAuth2 / JWT authentication and authorization",
        "API security testing",
      ],
      detection: [
        "API gateway logs",
        "anomaly detection",
        "SIEM correlation",
      ],
      mitigation: [
        "revoke exposed keys",
        "gateway controls",
        "patch and retest",
      ],
    },
    {
      id: "v3",
      title: "Legacy applications run on unsupported software",
      type: NS,
      affectedAssets: ["Legacy Booking / Ticketing Applications"],
      sourceEvidence: NS,
      attackScenario: "LEGACY APPLICATION EXPLOITATION",
      prevention: [NS],
      detection: [NS],
      mitigation: [NS],
    },
    {
      id: "v4",
      title: "Third-party vendors have direct standing production access",
      type: NS,
      affectedAssets: ["Third-Party Vendor Access to Production"],
      sourceEvidence: NS,
      attackScenario: "SUPPLY CHAIN ATTACK",
      prevention: [NS],
      detection: [NS],
      mitigation: [NS],
    },
    {
      id: "v5",
      title: "Passenger database backups are stored on shared servers",
      type: NS,
      affectedAssets: ["Passenger Database Backups"],
      sourceEvidence: NS,
      attackScenario: "DATA EXFILTRATION",
      prevention: [NS],
      detection: [NS],
      mitigation: [NS],
    },
    {
      id: "v6",
      title:
        "Customer support has broad unrestricted access to booking history",
      type: NS,
      affectedAssets: ["Customer Support Portal"],
      sourceEvidence: NS,
      attackScenario: "INSIDER / ACCOUNT ABUSE",
      prevention: [NS],
      detection: [NS],
      mitigation: [NS],
    },
    {
      id: "v7",
      title: "Privileged account passwords have not been rotated",
      type: NS,
      affectedAssets: ["Active Directory & Privileged Accounts"],
      sourceEvidence: NS,
      attackScenario: "CREDENTIAL COMPROMISE",
      prevention: [NS],
      detection: [NS],
      mitigation: [NS],
    },
    {
      id: "v8",
      title: "Production servers expose unnecessary network services",
      type: NS,
      affectedAssets: [NS],
      sourceEvidence: NS,
      attackScenario: "NETWORK / INFRASTRUCTURE ATTACK",
      prevention: [NS],
      detection: [NS],
      mitigation: [NS],
    },
    {
      id: "v9",
      title: "Vulnerability assessments across the environment are overdue",
      type: NS,
      affectedAssets: [NS],
      sourceEvidence: NS,
      attackScenario: "SYSTEMIC RISK",
      prevention: [NS],
      detection: [NS],
      mitigation: [NS],
    },
    {
      id: "v10",
      title:
        "Reservation system lacks adequate capacity / anti-automation controls",
      type: NS,
      affectedAssets: ["Passenger Reservation System"],
      sourceEvidence: NS,
      attackScenario: "DENIAL OF SERVICE",
      prevention: [NS],
      detection: [NS],
      mitigation: [NS],
    },
  ] as Vulnerability[],
  attackScenarios: [
    {
      id: "a1",
      title: "BOT ATTACK",
      vulnerability: "Booking bots bypass CAPTCHA protections",
      attack: "Automated booking abuse (SIMULATED VISUALIZATION)",
      potentialBusinessImpact: NS,
    },
    {
      id: "a2",
      title: "API ATTACK",
      vulnerability: "Some APIs lack proper authentication",
      attack: "Unauthorized API consumption (SIMULATED VISUALIZATION)",
      potentialBusinessImpact: NS,
    },
    {
      id: "a3",
      title: "LEGACY APPLICATION EXPLOITATION",
      vulnerability: "Legacy applications run on unsupported software",
      attack: "Exploit unsupported stack (SIMULATED VISUALIZATION)",
      potentialBusinessImpact: NS,
    },
    {
      id: "a4",
      title: "SUPPLY CHAIN ATTACK",
      vulnerability: "Third-party vendors have direct standing production access",
      attack: "Vendor access abuse (SIMULATED VISUALIZATION)",
      potentialBusinessImpact: NS,
    },
    {
      id: "a5",
      title: "DATA EXFILTRATION",
      vulnerability: "Passenger database backups are stored on shared servers",
      attack: "Backup access abuse (SIMULATED VISUALIZATION)",
      potentialBusinessImpact: NS,
    },
    {
      id: "a6",
      title: "INSIDER / ACCOUNT ABUSE",
      vulnerability:
        "Customer support has broad unrestricted access to booking history",
      attack: "Excessive support access abuse (SIMULATED VISUALIZATION)",
      potentialBusinessImpact: NS,
    },
    {
      id: "a7",
      title: "CREDENTIAL COMPROMISE",
      vulnerability: "Privileged account passwords have not been rotated",
      attack: "Stale privileged credential use (SIMULATED VISUALIZATION)",
      potentialBusinessImpact: NS,
    },
    {
      id: "a8",
      title: "NETWORK / INFRASTRUCTURE ATTACK",
      vulnerability: "Production servers expose unnecessary network services",
      attack: "Exposed service abuse (SIMULATED VISUALIZATION)",
      potentialBusinessImpact: NS,
    },
    {
      id: "a9",
      title: "SYSTEMIC RISK",
      vulnerability: "Vulnerability assessments across the environment are overdue",
      attack: "Unpatched exposure accumulation (SIMULATED VISUALIZATION)",
      potentialBusinessImpact: NS,
    },
    {
      id: "a10",
      title: "DENIAL OF SERVICE",
      vulnerability:
        "Reservation system lacks adequate capacity / anti-automation controls",
      attack: "Capacity / automation abuse (SIMULATED VISUALIZATION)",
      potentialBusinessImpact: NS,
    },
  ] as AttackScenario[],
  risk: {
    likelihood: NS,
    impact: NS,
    riskStatement: NS,
  },
};
