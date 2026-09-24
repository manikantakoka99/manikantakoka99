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
      "Detailed findings: Not specified in source (authoritative PDF unavailable on build worker).",
    ],
    securityRelevance:
      "External attack-surface mapping supports defensive prioritization using public information only.",
    lessons: [
      "Frame work as PUBLIC RECONNAISSANCE / SECURITY RESEARCH.",
      "Avoid sensitive operational overshare in public portfolios.",
    ],
    limitations: [
      "Public sources only",
      "No unauthorized access or exploitation claimed",
      "Source PDF not attached on build worker",
    ],
    references: ["/assets/attack-surface-enumeration.pdf"],
  },
  {
    id: "irctc-gap-assessment",
    filename: "irctc-gap-assessment.md",
    title: "IRCTC Cyber Security Gap Assessment",
    overview:
      "Gap assessment covering 13 assets, 5 crown jewels, 10 vulnerabilities, and 10 attack scenarios.",
    methodology: [
      "Asset inventory",
      "Crown jewel analysis",
      "Vulnerability mapping",
      "Attack scenario modeling",
      "Prevent / Detect / Mitigate pairing",
    ],
    architecture: [
      "ASSETS → CROWN JEWELS → VULNERABILITIES → ATTACK SCENARIOS → PREVENTION → DETECTION → MITIGATION → RISK",
    ],
    findings: [
      "Structured vulnerability and attack-scenario inventory from assessment framing.",
      "Risk scores: Not specified in source (not invented).",
    ],
    securityRelevance:
      "Demonstrates structured risk analysis and control pairing for enterprise-style assessments.",
    lessons: [
      "Crown jewels focus remediation priority.",
      "Label attack-path animations as SIMULATED VISUALIZATION.",
    ],
    limitations: [
      "Authoritative DOCX unavailable on build worker for field-level evidence.",
      "No invented risk scores or severity rankings.",
    ],
    references: ["/assets/irctc-gap-assessment.pdf"],
  },
];
