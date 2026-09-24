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
  criteriaMet: string;
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
  attackType: string;
  likelyAttacker: string;
  attackGoal: string;
  possibleAttack: string;
  prevention: string[];
  detection: string[];
  mitigation: string[];
  likelihood: string;
  impact: string;
  riskStatement: string;
  treatmentStrategy: string;
  treatmentJustification: string;
  treatmentActions: string[];
};

export type AttackScenario = {
  id: string;
  title: string;
  vulnerability: string;
  attack: string;
  attackType: string;
  potentialBusinessImpact: string;
};

export const irctcAssessment = {
  title: "IRCTC Cyber Security Gap Assessment",
  framing: "CYBER SECURITY GAP ASSESSMENT",
  disclaimer:
    "Interactive portfolio visualization of a cyber security gap assessment (IIIT-B Cybersecurity Cohort 58, August 2026 — Scenario 3: IRCTC Online Reservation Platform). Attack paths are labeled SIMULATED VISUALIZATION.",
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
    "Content below is drawn from the Cyber Security Gap Assessment document. Rating scales: Sensitivity (Public→Restricted), Criticality (Low→Critical), Likelihood (Rare→Almost Certain), Impact (Negligible→Severe).",
  ratingScales: {
    sensitivity: "Public → Internal → Confidential → Restricted",
    criticality: "Low → Medium → High → Critical",
    likelihood: "Rare → Unlikely → Possible → Likely → Almost Certain",
    impact: "Negligible → Minor → Moderate → Major → Severe",
  },
  crownJewelCriteria: [
    "C1 — Stores or processes highly sensitive PII, financial, or national-ID data",
    "C2 — Required for a core business function; compromise stops primary operations",
    "C3 — High regulatory or legal exposure if compromised",
    "C4 — Directly named as an active, known weakness in the scenario clues",
    "C5 — Single point of failure that enables broad or lateral compromise",
  ] as const,
  assets: [
    {
      id: "prs",
      name: "Passenger Reservation System (PRS)",
      category: "Software / Application",
      sensitivity: "Restricted",
      criticality: "Critical",
      justification:
        "Core engine processing all bookings, cancellations, and seat allocation nationwide; any downtime halts ticket sales countrywide, especially damaging during Tatkal/festive periods.",
    },
    {
      id: "oracle",
      name: "Oracle Database (Passenger & PNR Records)",
      category: "Software / Data",
      sensitivity: "Restricted",
      criticality: "Critical",
      justification:
        "Central store of PNR records and passenger PII (name, ID, contact, travel history, Aadhaar linkage) for millions of users; breach exposes mass PII and violates data-protection obligations.",
    },
    {
      id: "website",
      name: "IRCTC Website",
      category: "Software / Application",
      sensitivity: "Confidential",
      criticality: "Critical",
      justification:
        "Primary public booking channel carrying the highest transaction volume; outages or bot abuse during Tatkal cause nationwide public and political fallout.",
    },
    {
      id: "mobile",
      name: "Android & iOS Mobile Apps",
      category: "Software / Application",
      sensitivity: "Confidential",
      criticality: "High",
      justification:
        "Second major booking channel used by the majority of retail passengers; compromise or unavailability directly hits ticket sales and customer trust.",
    },
    {
      id: "api",
      name: "API Gateway",
      category: "Software / Infrastructure",
      sensitivity: "Restricted",
      criticality: "Critical",
      justification:
        "Single control point for website, app, and third-party vendor traffic; scenario confirms some APIs lack proper authentication, making it a high-value target.",
    },
    {
      id: "payment",
      name: "Payment Gateway Integration",
      category: "Software / Financial",
      sensitivity: "Restricted",
      criticality: "Critical",
      justification:
        "Processes all online payments via partner banks; compromise enables large-scale financial fraud and breaks regulatory payment-security expectations.",
    },
    {
      id: "aadhaar",
      name: "Aadhaar Verification Service",
      category: "Software / Data",
      sensitivity: "Restricted",
      criticality: "Critical",
      justification:
        "Integrates with national Aadhaar e-KYC for identity verification; leakage or misuse of Aadhaar data carries severe legal penalties and reputational damage.",
    },
    {
      id: "ad",
      name: "Active Directory & Privileged Accounts",
      category: "Software / Identity Infrastructure",
      sensitivity: "Restricted",
      criticality: "Critical",
      justification:
        "Central identity store for ~900 IT staff, developers and vendors; scenario confirms privileged passwords are never rotated, making full-network compromise easy.",
    },
    {
      id: "backups",
      name: "Passenger Database Backups",
      category: "Data",
      sensitivity: "Restricted",
      criticality: "Critical",
      justification:
        "Full copies of passenger PII/PNR data; scenario confirms backups sit on shared servers with weaker isolation than production, creating an easy exfiltration path.",
    },
    {
      id: "legacy",
      name: "Legacy Booking / Ticketing Applications",
      category: "Software",
      sensitivity: "Confidential",
      criticality: "High",
      justification:
        "Older applications running on unsupported software per scenario; absence of vendor patches leaves known, unremediated vulnerabilities exploitable by attackers.",
    },
    {
      id: "ghe",
      name: "GitHub Enterprise (Source Code Repository)",
      category: "Software / Intellectual Property",
      sensitivity: "Restricted",
      criticality: "High",
      justification:
        "Houses proprietary source code for booking/payment systems and potentially embedded configuration or secrets; compromise enables supply-chain or targeted exploit development.",
    },
    {
      id: "vendor",
      name: "Third-Party Vendor Access to Production",
      category: "Process / Access",
      sensitivity: "Restricted",
      criticality: "Critical",
      justification:
        "Scenario confirms vendors directly maintain production systems; broad, unmonitored vendor access is a direct path for supply-chain compromise or insider misuse.",
    },
    {
      id: "support",
      name: "Customer Support Portal (Booking History Access)",
      category: "Software / Application",
      sensitivity: "Restricted",
      criticality: "High",
      justification:
        "Support staff can view full passenger booking history; broad access without need-to-know controls creates insider misuse and data-leakage risk.",
    },
  ] as IrctcAsset[],
  crownJewels: [
    {
      id: "cj-oracle",
      name: "Oracle Database (Passenger & PNR Records)",
      criteriaMet: "C1, C2, C3, C4, C5",
      whyItMatters:
        "Meets all five crown-jewel criteria; central store of passenger PII and PNR records.",
      primaryThreat: "Data breach / mass exfiltration of PII and PNR records",
      businessImpact:
        "Leak of millions of passenger records; Digital Personal Data Protection Act penalties; identity-theft/fraud against citizens; severe reputational damage to the Ministry of Railways.",
    },
    {
      id: "cj-prs",
      name: "Passenger Reservation System (PRS)",
      criteriaMet: "C2, C4, C5",
      whyItMatters:
        "Required for core booking operations; single point of failure for nationwide ticket sales.",
      primaryThreat:
        "Bot-driven overload / denial of service leading to booking outage",
      businessImpact:
        "Total booking outage nationwide during peak (Tatkal) demand; direct revenue loss; public and political backlash against Indian Railways.",
    },
    {
      id: "cj-api",
      name: "API Gateway",
      criteriaMet: "C2, C4, C5",
      whyItMatters:
        "Single control point across channels; scenario names authentication weakness.",
      primaryThreat:
        "API abuse, authentication bypass, automation/bot attacks",
      businessImpact:
        "Unauthorized bookings, bulk data scraping and fraud; cascading outage across every channel (web, app, vendors) that depends on the gateway.",
    },
    {
      id: "cj-payment",
      name: "Payment Gateway Integration",
      criteriaMet: "C1, C2, C3, C4",
      whyItMatters:
        "Processes financial transactions and carries regulatory exposure.",
      primaryThreat: "Payment fraud / interception of financial data",
      businessImpact:
        "Direct monetary loss to passengers and IRCTC; regulatory/RBI scrutiny; loss of consumer trust in online rail payments.",
    },
    {
      id: "cj-ad",
      name: "Active Directory & Privileged Accounts",
      criteriaMet: "C2, C4, C5",
      whyItMatters:
        "Central identity store; scenario confirms privileged passwords are never rotated.",
      primaryThreat:
        "Credential compromise, privilege escalation, lateral movement, ransomware",
      businessImpact:
        "Full domain compromise cascading into PRS, database and payment systems; potential ransomware encryption of production servers immediately before the festive booking season.",
    },
  ] as CrownJewel[],
  vulnerabilities: [
    {
      id: "v1",
      title: "Booking bots bypass CAPTCHA protections",
      type: "Technical",
      affectedAssets: ["IRCTC Website", "Mobile Apps", "API Gateway"],
      sourceEvidence: 'Scenario: “Booking bots bypass CAPTCHA protections.”',
      attackScenario: "BOT ATTACK",
      attackType: "Bot Attack / Business Logic Abuse",
      likelyAttacker: "Organized ticket touts / rogue travel agents (external)",
      attackGoal:
        "Illicitly acquire scarce Tatkal tickets in bulk and resell them for profit",
      possibleAttack:
        "Automated scripts register thousands of fake accounts and instantly grab Tatkal tickets, denying access to genuine passengers",
      prevention: [
        "Advanced bot mitigation (behavioural analytics, device fingerprinting, invisible challenge)",
        "Enforce Aadhaar-linked OTP for Tatkal",
        "One active session per user",
        "Rate-limit booking attempts per account/IP",
      ],
      detection: [
        "Real-time booking-velocity analytics per IP/device",
        "SIEM alerts on abnormal multi-account patterns from the same fingerprint/proxy range",
        "Anomaly detection on tickets-issued-per-second",
      ],
      mitigation: [
        "Auto-block/blacklist flagged accounts and IP ranges",
        "Cancel confirmed bot-booked tickets within policy",
        "Continue periodic mass deactivation of fraudulent accounts",
      ],
      likelihood: "ALMOST CERTAIN",
      impact: "MAJOR",
      riskStatement:
        "There is an almost certain risk that organized touts/bots will continue to bypass CAPTCHA and Tatkal controls to mass-book tickets, resulting in major public-trust erosion, political scrutiny of the Ministry of Railways, and denial of service to genuine passengers during peak festive travel.",
      treatmentStrategy: "Mitigate",
      treatmentJustification:
        "Tatkal service cannot be discontinued and ongoing tout abuse cannot be accepted; effective technical/process controls exist and are already partly in motion (Aadhaar OTP mandate).",
      treatmentActions: [
        "Complete rollout of Aadhaar-linked OTP for all Tatkal bookings",
        "Deploy behavioural bot detection and device fingerprinting",
        "Enforce per-account/IP rate limiting and a virtual waiting room",
        "Continue automated detection and mass deactivation of fraudulent accounts",
      ],
    },
    {
      id: "v2",
      title: "Some APIs lack proper authentication",
      type: "Technical",
      affectedAssets: ["API Gateway", "Payment Gateway"],
      sourceEvidence: 'Scenario: “Some APIs lack proper authentication.”',
      attackScenario: "API ATTACK",
      attackType: "API Attack (Broken Authentication / BOLA)",
      likelyAttacker: "External hacker",
      attackGoal: "Data theft and fraudulent, unauthorized bookings",
      possibleAttack:
        "Attacker calls unauthenticated endpoints directly to book tickets, pull PNR/passenger data, or manipulate fares, bypassing the website entirely",
      prevention: [
        "Enforce OAuth2/JWT authentication and authorization on every endpoint",
        "Require API keys/mTLS at the gateway",
        "Mandatory API security testing before release",
      ],
      detection: [
        "API gateway logging with anomaly detection on unauthenticated/failed-auth spikes",
        "SIEM correlation of unusual API traffic",
      ],
      mitigation: [
        "Immediately revoke/rotate exposed API keys",
        "Emergency WAF/gateway rule to block the offending endpoint",
        "Patch and retest before re-exposing",
      ],
      likelihood: "LIKELY",
      impact: "SEVERE",
      riskStatement:
        "There is a likely risk that an external attacker will exploit unauthenticated API endpoints to access passenger data or make fraudulent bookings, resulting in severe data-privacy violations, financial fraud, and regulatory action.",
      treatmentStrategy: "Mitigate",
      treatmentJustification:
        "APIs are essential to core operations; the risk is addressed through standard secure-engineering practice, not by avoidance.",
      treatmentActions: [
        "Mandate OAuth2/JWT authentication on all endpoints",
        "Run API security testing/pen tests before every release",
        "Deploy API gateway WAF policies",
        "Continuous API discovery to catch shadow/undocumented endpoints",
      ],
    },
    {
      id: "v3",
      title: "Legacy applications run on unsupported software",
      type: "Technical",
      affectedAssets: ["Legacy Booking / Ticketing Applications"],
      sourceEvidence:
        'Scenario: “Legacy applications still run on unsupported software.”',
      attackScenario: "LEGACY APPLICATION EXPLOITATION",
      attackType: "Application Attack (known-vulnerability exploitation)",
      likelyAttacker: "External hacker / ransomware group",
      attackGoal:
        "Gain a foothold, escalate access, potentially deploy ransomware",
      possibleAttack:
        "Attacker exploits known, unpatched CVEs in end-of-life components to achieve remote code execution",
      prevention: [
        "Inventory all legacy applications",
        "Prioritize migration/upgrade",
        "Apply compensating controls (segmentation, virtual patching/WAF) where upgrade is not immediate",
      ],
      detection: [
        "Vulnerability scans tuned to flag EOL software",
        "IDS/EDR signatures for known exploit attempts against legacy CVEs",
      ],
      mitigation: [
        "Isolate legacy systems in a segmented zone",
        "Maintain tested rollback/restore plans",
        "Accelerate decommission timeline",
      ],
      likelihood: "LIKELY",
      impact: "SEVERE",
      riskStatement:
        "There is a likely risk that an attacker will exploit unpatched vulnerabilities in unsupported legacy applications to gain unauthorized system access, resulting in severe operational disruption and potential ransomware deployment across production systems.",
      treatmentStrategy: "Mitigate (phased Avoid via decommission)",
      treatmentJustification:
        "Immediate replacement of every legacy system is not feasible; risk must be reduced with compensating controls while migration is planned.",
      treatmentActions: [
        "Inventory and risk-rank all legacy applications",
        "Apply network segmentation and virtual patching (WAF/IPS)",
        "Fast-track a migration/decommission roadmap",
        "Increase monitoring on legacy hosts",
      ],
    },
    {
      id: "v4",
      title:
        "Third-party vendors have direct, standing access to maintain production systems",
      type: "Third-Party / Process",
      affectedAssets: ["PRS", "Production Servers"],
      sourceEvidence:
        'Scenario: “Third-party vendors maintain production systems.”',
      attackScenario: "SUPPLY CHAIN ATTACK",
      attackType: "Supply Chain Attack",
      likelyAttacker: "Third-party vendor (compromised or malicious)",
      attackGoal: "Plant a backdoor, disrupt operations, or exfiltrate data",
      possibleAttack:
        "Compromised vendor credentials, or a malicious vendor insider, push unauthorized code/changes directly into production",
      prevention: [
        "Least-privilege, time-bound, approval-based vendor access via PAM/jump-host",
        "Mandatory code review and change approval for vendor changes",
        "Contractual security SLAs",
      ],
      detection: [
        "Session recording/monitoring of all vendor privileged sessions",
        "SIEM alerts on vendor activity outside approved change windows",
      ],
      mitigation: [
        "Immediately revoke vendor access on suspicious activity",
        "Roll back unauthorized changes from version control",
        "Conduct a vendor security audit",
      ],
      likelihood: "POSSIBLE",
      impact: "SEVERE",
      riskStatement:
        "There is a possible risk that a compromised or malicious third-party vendor will introduce unauthorized changes into production systems, resulting in severe, widespread compromise of the reservation platform and its dependent systems.",
      treatmentStrategy: "Mitigate",
      treatmentJustification:
        "Third-party vendors are operationally necessary; the risk is reduced through access governance rather than eliminated.",
      treatmentActions: [
        "Implement PAM with just-in-time, approval-gated vendor access",
        "Mandatory code review/change approval for vendor changes",
        "Session recording and monitoring for all vendor privileged access",
        "Contractual security SLAs and periodic vendor audits",
      ],
    },
    {
      id: "v5",
      title: "Passenger database backups are stored on shared servers",
      type: "Technical / Process",
      affectedAssets: ["Passenger Database Backups"],
      sourceEvidence:
        'Scenario: “Passenger database backups are stored on shared servers.”',
      attackScenario: "DATA EXFILTRATION",
      attackType: "Data Exfiltration / Lateral Movement",
      likelyAttacker: "External hacker (via a lower-value shared system)",
      attackGoal: "Bulk theft of PII/PNR data for sale on the dark web",
      possibleAttack:
        "Attacker who first compromises any co-located workload on the shared server pivots to and exfiltrates the full backup dataset",
      prevention: [
        "Move backups to isolated, access-controlled, encrypted storage separate from shared/multi-tenant servers",
        "Encrypt at rest (AES-256) with separately managed keys",
      ],
      detection: [
        "File integrity monitoring on backup storage",
        "Alerts on unusual access, copy, or download of backup files",
      ],
      mitigation: [
        "Immediately isolate and re-secure backup storage",
        "Rotate credentials of anyone with access",
        "Forensic review; notify passengers/regulator if exfiltration is confirmed",
      ],
      likelihood: "LIKELY",
      impact: "SEVERE",
      riskStatement:
        "There is a likely risk that an attacker who compromises any co-located workload on the shared servers will pivot to and exfiltrate the passenger database backups, resulting in severe, large-scale exposure of PII for millions of passengers.",
      treatmentStrategy: "Mitigate",
      treatmentJustification:
        "Backups are required for business continuity; the risk is reduced by isolating and encrypting them, not by eliminating backups.",
      treatmentActions: [
        "Migrate backups to a dedicated, access-controlled, encrypted storage tier",
        "Encrypt backups at rest with separately managed keys",
        "Enable file integrity monitoring and access alerting",
        "Restrict backup access to named backup administrators only",
      ],
    },
    {
      id: "v6",
      title:
        "Customer support has broad, unrestricted access to passenger booking history",
      type: "People + Process",
      affectedAssets: ["Customer Support Portal", "Oracle Database"],
      sourceEvidence:
        'Scenario: “Customer support can access passenger booking history.”',
      attackScenario: "INSIDER / ACCOUNT ABUSE",
      attackType: "Insider Threat / Account Abuse",
      likelyAttacker:
        "Insider (current employee) or external attacker via a compromised support account",
      attackGoal:
        "Unauthorized surveillance, data resale, harassment, or fraud",
      possibleAttack:
        "A support agent, or their phished/compromised account, browses or exports booking history of citizens for personal gain, stalking, or resale",
      prevention: [
        "Role-based access control with least privilege",
        "Mask PII fields (partial ID/phone) by default",
        "Require supervisor approval for full-record access",
      ],
      detection: [
        "User and Entity Behaviour Analytics (UEBA) on support-staff query patterns",
        "Audit logging of every record view/export",
      ],
      mitigation: [
        "Suspend the offending account immediately",
        "Revoke unnecessary access",
        "Notify affected individuals per policy",
      ],
      likelihood: "POSSIBLE",
      impact: "MODERATE",
      riskStatement:
        "There is a possible risk that a support employee, or an attacker who compromises a support account, will misuse broad access to view or leak passenger booking history, resulting in moderate reputational damage and privacy violations for affected individuals.",
      treatmentStrategy: "Mitigate",
      treatmentJustification:
        "The support function needs some data access to serve passengers; risk is reduced through least privilege and monitoring, not eliminated.",
      treatmentActions: [
        "Implement RBAC with field-level PII masking by default",
        "Require supervisor approval and justification logging for full-record access",
        "Deploy UEBA to flag anomalous bulk record access",
        "Periodic access recertification",
      ],
    },
    {
      id: "v7",
      title: "Privileged account passwords have not been rotated",
      type: "Technical / Process",
      affectedAssets: ["Active Directory & Privileged Accounts"],
      sourceEvidence:
        'Scenario: “Privileged passwords have not been rotated.”',
      attackScenario: "CREDENTIAL COMPROMISE",
      attackType: "Credential-Based Attack / Privilege Escalation",
      likelyAttacker:
        "Former employee/contractor, or external hacker with leaked credentials",
      attackGoal: "Full domain / administrative compromise",
      possibleAttack:
        "Attacker authenticates using an old leaked, phished, or ex-employee privileged credential that was never changed",
      prevention: [
        "Privileged Access Management (PAM) enforcing mandatory rotation",
        "Short-lived, vaulted credentials",
        "Phishing-resistant MFA for all privileged/admin accounts",
      ],
      detection: [
        "PAM/SIEM alerts on privileged logins from unusual locations/devices or off-hours",
        "Alerts when credential age exceeds policy",
      ],
      mitigation: [
        "Force immediate rotation of all privileged credentials",
        "Review privileged activity logs for misuse",
        "Revoke and reissue via the PAM vault",
      ],
      likelihood: "LIKELY",
      impact: "SEVERE",
      riskStatement:
        "There is a likely risk that an attacker will authenticate using a stale, previously leaked, or ex-employee privileged credential that was never rotated, resulting in severe, wide-reaching compromise of Active Directory and all dependent production systems.",
      treatmentStrategy: "Mitigate",
      treatmentJustification:
        "Regulatory and security best practice; low relative cost against the scale of potential breach impact.",
      treatmentActions: [
        "Deploy a PAM solution enforcing automatic credential rotation",
        "Enforce phishing-resistant MFA (FIDO2) for all privileged accounts",
        "Force an immediate one-time rotation of all existing privileged credentials",
        "Continuously monitor privileged-account usage",
      ],
    },
    {
      id: "v8",
      title: "Production servers expose unnecessary network services",
      type: "Technical",
      affectedAssets: ["Production Servers", "PRS"],
      sourceEvidence:
        'Scenario: “Production servers expose unnecessary services.”',
      attackScenario: "NETWORK / INFRASTRUCTURE ATTACK",
      attackType: "Network / Infrastructure Attack",
      likelyAttacker: "External hacker (opportunistic scanning)",
      attackGoal: "Gain initial access to the production network",
      possibleAttack:
        "Attacker scans exposed ports/services (e.g. stale admin panels, unused protocols) and exploits a weak or default configuration",
      prevention: [
        "CIS-benchmark hardening of production builds",
        "Disable/remove unused services and ports",
        "Firewall/segmentation limiting exposure to required services only",
      ],
      detection: [
        "Recurring external/internal port and service scanning",
        "SIEM/IDS alerts on connections to unexpected exposed services",
      ],
      mitigation: [
        "Immediately disable the exposed service",
        "Patch/harden the host",
        "Review for signs of compromise via that service",
      ],
      likelihood: "POSSIBLE",
      impact: "MAJOR",
      riskStatement:
        "There is a possible risk that an attacker will discover and exploit an unnecessarily exposed service on production servers to gain initial access, resulting in major disruption to reservation services and further internal compromise.",
      treatmentStrategy: "Mitigate",
      treatmentJustification:
        "Standard hardening measure; low cost relative to the risk reduction achieved.",
      treatmentActions: [
        "CIS-benchmark hardening of all production servers",
        "Disable/remove unused services and close unneeded ports",
        "Enforce network segmentation/firewall rules limiting exposure",
        "Recurring external attack-surface scanning",
      ],
    },
    {
      id: "v9",
      title: "Vulnerability assessments across the environment are overdue",
      type: "Process",
      affectedAssets: ["All IT assets (organization-wide)"],
      sourceEvidence: 'Scenario: “Vulnerability assessments are overdue.”',
      attackScenario: "SYSTEMIC RISK",
      attackType: "Systemic Risk (enabler across attack types)",
      likelyAttacker: "Any (external hacker, ransomware group)",
      attackGoal:
        "Sustain long, undetected dwell time within any successful breach",
      possibleAttack:
        "Known but undiscovered vulnerabilities remain exploitable for extended periods, giving attackers a wide, undetected window (often chained with legacy software and exposed services)",
      prevention: [
        "Recurring vulnerability-management program (monthly scans, quarterly pen tests) with SLA-bound remediation, prioritized ahead of the festive season",
      ],
      detection: [
        "Vulnerability-management dashboard tracking scan coverage/cadence",
        "Flags on any asset overdue for assessment",
      ],
      mitigation: [
        "Commission an emergency assessment across production immediately",
        "Fast-track remediation of critical/high findings",
      ],
      likelihood: "ALMOST CERTAIN",
      impact: "MAJOR",
      riskStatement:
        "There is an almost certain risk that known and unknown vulnerabilities across the IRCTC environment remain unidentified and unremediated due to overdue assessments, resulting in a major, prolonged window of exploitability ahead of the high-traffic festive booking season.",
      treatmentStrategy: "Mitigate",
      treatmentJustification:
        "A core risk-management control that is addressable through process and resourcing; cannot be avoided given the platform's scale and regulatory profile.",
      treatmentActions: [
        "Commission an emergency vulnerability assessment/pen test immediately, ahead of the festive season",
        "Establish a recurring (monthly scan/quarterly pen test) VM program with SLA-bound remediation",
        "Assign dedicated ownership and executive reporting for overdue findings",
        "Track remediation via a centralized vulnerability-management dashboard",
      ],
    },
    {
      id: "v10",
      title:
        "Reservation system lacks adequate capacity / anti-automation controls for Tatkal surge traffic",
      type: "Technical / Availability",
      affectedAssets: ["PRS", "IRCTC Website", "API Gateway"],
      sourceEvidence:
        'Scenario: “Tatkal booking traffic overwhelms systems daily.”',
      attackScenario: "DENIAL OF SERVICE",
      attackType: "Denial of Service",
      likelyAttacker:
        "Competing touts wanting exclusive access, or a hacktivist/extortionist",
      attackGoal:
        "Deny service to genuine passengers, extort IRCTC, or damage Railways' reputation",
      possibleAttack:
        "Attacker times a volumetric or application-layer flood to coincide with Tatkal opening, turning normal congestion into a full outage, or threatens to repeat it for extortion",
      prevention: [
        "Elastic auto-scaling of the PRS/API layer for known peak windows",
        "Cloud-based DDoS protection/CDN scrubbing in front of website and APIs",
        "Queue-based virtual waiting room for Tatkal",
      ],
      detection: [
        "Real-time traffic/infrastructure monitoring with alerts on abnormal request volume or latency spikes at Tatkal opening",
        "SIEM correlation with known bot IP ranges",
      ],
      mitigation: [
        "Activate DDoS scrubbing/failover capacity",
        "Throttle/queue excess traffic while preserving service for verified genuine users",
        "Post-incident capacity review",
      ],
      likelihood: "ALMOST CERTAIN",
      impact: "MAJOR",
      riskStatement:
        "There is an almost certain risk that Tatkal-time traffic surges, worsened by bot activity, will overwhelm the reservation system, resulting in major service outages, lost ticket revenue, and significant public dissatisfaction during peak travel periods.",
      treatmentStrategy: "Mitigate",
      treatmentJustification:
        "Service availability cannot be avoided given genuine Tatkal demand; risk is reduced through architecture and DDoS-protection investment.",
      treatmentActions: [
        "Deploy cloud-based DDoS protection/CDN scrubbing in front of the website and APIs",
        "Implement auto-scaling and a virtual waiting-room queue for peak windows",
        "Load-test infrastructure ahead of the festive season",
        "Establish an incident-response runbook specific to Tatkal-time outages",
      ],
    },
  ] as Vulnerability[],
  attackScenarios: [
    {
      id: "a1",
      title: "BOT ATTACK",
      vulnerability: "Booking bots bypass CAPTCHA protections",
      attack:
        "Automated scripts register thousands of fake accounts and instantly grab Tatkal tickets (SIMULATED VISUALIZATION)",
      attackType: "Bot Attack / Business Logic Abuse",
      potentialBusinessImpact:
        "Major public-trust erosion, political scrutiny, denial of service to genuine passengers during peak festive travel",
    },
    {
      id: "a2",
      title: "API ATTACK",
      vulnerability: "Some APIs lack proper authentication",
      attack:
        "Unauthenticated endpoint calls for bookings, PNR/passenger data, or fare manipulation (SIMULATED VISUALIZATION)",
      attackType: "API Attack (Broken Authentication / BOLA)",
      potentialBusinessImpact:
        "Severe data-privacy violations, financial fraud, and regulatory action",
    },
    {
      id: "a3",
      title: "LEGACY APPLICATION EXPLOITATION",
      vulnerability: "Legacy applications run on unsupported software",
      attack:
        "Exploit known unpatched CVEs in EOL components for RCE (SIMULATED VISUALIZATION)",
      attackType: "Application Attack (known-vulnerability exploitation)",
      potentialBusinessImpact:
        "Severe operational disruption and potential ransomware across production",
    },
    {
      id: "a4",
      title: "SUPPLY CHAIN ATTACK",
      vulnerability:
        "Third-party vendors have direct, standing access to maintain production systems",
      attack:
        "Compromised or malicious vendor pushes unauthorized production changes (SIMULATED VISUALIZATION)",
      attackType: "Supply Chain Attack",
      potentialBusinessImpact:
        "Severe, widespread compromise of the reservation platform and dependents",
    },
    {
      id: "a5",
      title: "DATA EXFILTRATION",
      vulnerability: "Passenger database backups are stored on shared servers",
      attack:
        "Pivot from co-located workload to exfiltrate full backup dataset (SIMULATED VISUALIZATION)",
      attackType: "Data Exfiltration / Lateral Movement",
      potentialBusinessImpact:
        "Severe large-scale exposure of PII for millions of passengers",
    },
    {
      id: "a6",
      title: "INSIDER / ACCOUNT ABUSE",
      vulnerability:
        "Customer support has broad, unrestricted access to passenger booking history",
      attack:
        "Support agent or compromised support account exports booking history (SIMULATED VISUALIZATION)",
      attackType: "Insider Threat / Account Abuse",
      potentialBusinessImpact:
        "Moderate reputational damage and privacy violations for affected individuals",
    },
    {
      id: "a7",
      title: "CREDENTIAL COMPROMISE",
      vulnerability: "Privileged account passwords have not been rotated",
      attack:
        "Authenticate with stale leaked/phished/ex-employee privileged credential (SIMULATED VISUALIZATION)",
      attackType: "Credential-Based Attack / Privilege Escalation",
      potentialBusinessImpact:
        "Severe wide-reaching compromise of Active Directory and dependent production systems",
    },
    {
      id: "a8",
      title: "NETWORK / INFRASTRUCTURE ATTACK",
      vulnerability: "Production servers expose unnecessary network services",
      attack:
        "Scan and exploit unnecessarily exposed services/ports (SIMULATED VISUALIZATION)",
      attackType: "Network / Infrastructure Attack",
      potentialBusinessImpact:
        "Major disruption to reservation services and further internal compromise",
    },
    {
      id: "a9",
      title: "SYSTEMIC RISK",
      vulnerability:
        "Vulnerability assessments across the environment are overdue",
      attack:
        "Prolonged window of unidentified/unremediated vulnerabilities (SIMULATED VISUALIZATION)",
      attackType: "Systemic Risk (enabler across attack types)",
      potentialBusinessImpact:
        "Major prolonged window of exploitability ahead of festive booking season",
    },
    {
      id: "a10",
      title: "DENIAL OF SERVICE",
      vulnerability:
        "Reservation system lacks adequate capacity / anti-automation controls for Tatkal surge traffic",
      attack:
        "Volumetric or application-layer flood timed to Tatkal opening (SIMULATED VISUALIZATION)",
      attackType: "Denial of Service",
      potentialBusinessImpact:
        "Major service outages, lost ticket revenue, and significant public dissatisfaction",
    },
  ] as AttackScenario[],
  risk: {
    note: "Per-vulnerability Likelihood, Impact, and Risk Statement are on each vulnerability record (source Task 6). No invented numeric scores.",
    likelihood: "See per-vulnerability ratings (Rare → Almost Certain)",
    impact: "See per-vulnerability ratings (Negligible → Severe)",
    riskStatement:
      "Ten vulnerability–attack pairs are rated in the source assessment; select a vulnerability for its formal risk statement and treatment strategy.",
  },
};
