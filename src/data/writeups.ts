export type Writeup = {
  id: string;
  filename: string;
  title: string;
  overview: string;
  methodology: string[];
  architecture: string[];
  findings: string[];
  securityRelevance: string;
  lessons: string[];
  limitations: string[];
  references: string[];
};

export const writeups: Writeup[] = [
  {
    id: "soc-detection-lab",
    filename: "soc-detection-lab.md",
    title: "SOC Detection & Incident Response Lab",
    overview:
      "Personal SOC detection and incident response lab spanning Kali, Windows 11, Sysmon, Ubuntu Server, and Wazuh.",
    methodology: [
      "Deploy endpoint telemetry (Sysmon)",
      "Forward and normalize events into Wazuh",
      "Author and tune detection rules",
      "Investigate alerts and practice response",
    ],
    architecture: [
      "Kali Linux → Windows 11 → Sysmon → Ubuntu Server → Wazuh → Detection → Alert → Investigation → Response",
    ],
    findings: [
      "Portfolio simulation demonstrates velocity-based correlation and investigation handoff.",
      "All alerts in the UI are labeled PORTFOLIO SIMULATION.",
    ],
    securityRelevance:
      "Builds practical SOC skills: telemetry, SIEM correlation, triage, and response.",
    lessons: [
      "Clear labeling prevents simulation from being mistaken for live production monitoring.",
      "Node-level architecture aids explanation during interviews.",
    ],
    limitations: [
      "Personal lab only — not a production SOC.",
      "Simulation events are illustrative.",
    ],
    references: ["Personal SOC lab architecture"],
  },
  {
    id: "attack-surface-enumeration",
    filename: "attack-surface-enumeration.md",
    title: "Attack Surface Enumeration",
    overview:
      "Public reconnaissance and external attack-surface mapping across IRCTC, LIC, BSNL, and AAI.",
    methodology: [
      "Certificate Transparency",
      "DNS Enumeration",
      "Subdomain Discovery",
      "Hosting Identification",
      "Service Enumeration",
      "Attack Surface Mapping",
      "Security Observations",
    ],
    architecture: [
      "TARGET → DOMAIN → SUBDOMAIN → HOSTING → SERVICE → OBSERVATION → RISK",
    ],
    findings: [
      "Mixed hosting across own networks, CDNs, cloud load balancers, and vendors for IRCTC, LIC, BSNL, and AAI.",
      "Most exposed surface was login, customer, employee, and partner portals — not open storage or databases.",
      "IRCTC agent page showed an internal-looking deployment identifier; several UAT/stage labels still resolve.",
      "BSNL cymn redirect exposed WAF diagnostic parameters; stock Apache / indexed Tomcat docs disclosed metadata.",
      "LIC digital/portal names resolve through third-party engagement/CDN infrastructure.",
      "AAI primary site independently fingerprinted as Drupal 7 (EOL) — needs internal confirmation.",
      "Report does not prove any listed system is vulnerable.",
    ],
    securityRelevance:
      "External attack-surface mapping supports defensive prioritization using public information only.",
    lessons: [
      "Frame work as PUBLIC RECONNAISSANCE / SECURITY RESEARCH.",
      "Hostname matters more than shared CDN IPs in passive indexes.",
      "Avoid sensitive operational overshare in public portfolios.",
    ],
    limitations: [
      "DNS answers can change with time and location, especially behind CDNs",
      "CT records are historical and include inactive names",
      "Search engines and Shodan can be stale, incomplete, or wrong",
      "A HEAD response may differ from a normal browser GET",
      "Public recon only — not a penetration test",
    ],
    references: ["/assets/attack-surface-enumeration.pdf"],
  },
  {
    id: "irctc-gap-assessment",
    filename: "irctc-gap-assessment.md",
    title: "IRCTC Cyber Security Gap Assessment",
    overview:
      "Gap assessment (IIIT-B Cohort 58, August 2026) covering 13 assets, 5 crown jewels, 10 vulnerabilities, and 10 attack scenarios for the IRCTC online reservation platform.",
    methodology: [
      "Asset inventory & classification (sensitivity / criticality)",
      "Crown jewel selection against C1–C5 criteria",
      "Vulnerability identification from scenario known concerns",
      "Attack scenario mapping",
      "Prevent / Detect / Mitigate controls",
      "Likelihood / Impact / Risk statements (ISO 31000-aligned ordinal scales)",
      "Risk treatment strategies",
    ],
    architecture: [
      "ASSETS → CROWN JEWELS → VULNERABILITIES → ATTACK SCENARIOS → PREVENTION → DETECTION → MITIGATION → RISK",
    ],
    findings: [
      "Highest-likelihood risks include bot-driven Tatkal abuse, overdue vulnerability assessments, and Tatkal capacity gaps (ALMOST CERTAIN / MAJOR).",
      "Unauthenticated APIs, legacy software, shared backups, and unrotated privileged passwords rated LIKELY / SEVERE.",
      "All ten risks assigned Mitigate treatment with specific actions in the source assessment.",
      "Real-world context includes reported Tatkal bot abuse, insider-enabled ticketing fraud, and application-layer weaknesses used to calibrate likelihood — not claimed as new exploit results.",
    ],
    securityRelevance:
      "Demonstrates structured risk analysis and control pairing for enterprise-style assessments.",
    lessons: [
      "Crown jewels focus remediation priority.",
      "Pair prevention, detection, and mitigation for each vulnerability class.",
      "Label attack-path animations as SIMULATED VISUALIZATION.",
    ],
    limitations: [
      "Assessment is a scenario exercise grounded in publicly reported incidents — not an authorized live penetration test of production.",
      "No invented numeric risk scores — ordinal scales only as in the source.",
    ],
    references: ["/assets/irctc-gap-assessment.pdf"],
  },
];
