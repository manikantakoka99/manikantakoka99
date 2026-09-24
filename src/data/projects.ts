export type Project = {
  id: string;
  slug: string;
  dir: string;
  title: string;
  subtitle: string;
  status: string;
  tags: string[];
  overview: string;
  objective: string;
  methodology: string[];
  tools: string[];
  findings: string[];
  securityRelevance: string;
  lessons: string[];
  source?: { label: string; href?: string };
  section?: "soc" | "recon" | "assessment";
};

export const projects: Project[] = [
  {
    id: "soc-detection-lab",
    slug: "soc-detection-lab",
    dir: "01_soc-detection-lab/",
    title: "SOC Detection & Incident Response Lab",
    subtitle: "Personal production-style security lab",
    status: "PERSONAL LAB",
    tags: ["SOC", "SIEM", "Detection", "IR"],
    overview:
      "Personal production-style security lab for detection engineering and incident response practice using Kali Linux, Windows 11, Ubuntu Server, Wazuh, Sysmon, SIEM, detection rules, and IR workflows.",
    objective:
      "Build and operate an end-to-end detection pipeline: generate telemetry, collect and correlate events, investigate alerts, and practice response actions in a controlled personal lab.",
    methodology: [
      "Kali Linux (attacker / testing environment)",
      "Windows 11 endpoint with Sysmon telemetry",
      "Ubuntu Server hosting Wazuh SIEM",
      "Detection rule development and alert triage",
      "Investigation and response playbooks",
    ],
    tools: [
      "Kali Linux",
      "Windows 11",
      "Ubuntu Server",
      "Wazuh",
      "Sysmon",
      "SIEM",
      "Detection Rules",
    ],
    findings: [
      "Lab demonstrates authentication, API velocity, correlation, and response stages as a labeled portfolio simulation.",
      "Architecture nodes map attacker environment → endpoint → telemetry → SIEM → detection → investigation → response.",
    ],
    securityRelevance:
      "Mirrors SOC workflows used in security operations: telemetry collection, SIEM correlation, alert investigation, and incident response.",
    lessons: [
      "Detection quality depends on endpoint telemetry coverage (Sysmon) and clear correlation logic.",
      "Simulation must remain clearly labeled as portfolio simulation — never presented as live production alerts.",
    ],
    source: { label: "SOC Lab (personal)" },
    section: "soc",
  },
  {
    id: "attack-surface-enumeration",
    slug: "attack-surface-enumeration",
    dir: "02_attack-surface-enumeration/",
    title: "Attack Surface Enumeration",
    subtitle: "Public Reconnaissance & External Attack-Surface Mapping",
    status: "PUBLIC RECONNAISSANCE",
    tags: ["Recon", "Attack Surface", "Research"],
    overview:
      "Public reconnaissance and external attack-surface mapping research across selected targets. Presented as security research — not penetration testing.",
    objective:
      "Map externally observable domains, subdomains, hosting, services, and potential risk observations using public sources only.",
    methodology: [
      "Certificate Transparency",
      "DNS Enumeration",
      "Subdomain Discovery",
      "Hosting Identification",
      "Service Enumeration",
      "Attack Surface Mapping",
      "Security Observations",
    ],
    tools: ["Public CT logs", "DNS tooling", "OSINT sources"],
    findings: [
      "Detailed per-target findings: Not specified in source (source PDF unavailable on build worker).",
    ],
    securityRelevance:
      "External attack-surface awareness informs defensive prioritization without requiring unauthorized access.",
    lessons: [
      "Keep framing as PUBLIC RECONNAISSANCE / ATTACK-SURFACE MAPPING / SECURITY RESEARCH.",
      "Do not overshare sensitive operational detail in a public portfolio.",
    ],
    source: {
      label: "OPEN FULL REPORT",
      href: "/assets/attack-surface-enumeration.pdf",
    },
    section: "recon",
  },
  {
    id: "irctc-gap-assessment",
    slug: "irctc-gap-assessment",
    dir: "03_irctc-gap-assessment/",
    title: "IRCTC Cyber Security Gap Assessment",
    subtitle: "Cyber security gap assessment case study",
    status: "GAP ASSESSMENT",
    tags: ["Gap Assessment", "Risk", "AppSec"],
    overview:
      "Interactive cyber security gap assessment covering assets, crown jewels, vulnerabilities, attack scenarios, and prevent/detect/mitigate controls.",
    objective:
      "Structure risk analysis from assets through crown jewels, vulnerabilities, attack scenarios, and defensive controls.",
    methodology: [
      "Asset inventory",
      "Crown jewel identification",
      "Vulnerability mapping",
      "Attack scenario analysis",
      "Prevention / Detection / Mitigation",
      "Risk statements",
    ],
    tools: ["Structured risk analysis", "Attack path modeling"],
    findings: [
      "13 assets, 5 crown jewels, 10 vulnerabilities, and 10 attack scenarios captured from assessment framing.",
      "Per-item evidence detail: Not specified in source where source document fields were unavailable.",
    ],
    securityRelevance:
      "Demonstrates structured gap-assessment thinking used in enterprise security reviews.",
    lessons: [
      "Crown jewels drive prioritization.",
      "Prevention, detection, and mitigation should be paired for each vulnerability class.",
    ],
    source: {
      label: "OPEN FULL REPORT",
      href: "/assets/irctc-gap-assessment.pdf",
    },
    section: "assessment",
  },
  {
    id: "web-security",
    slug: "web-security",
    dir: "04_web-security/",
    title: "Web Security",
    subtitle: "Application security practice area",
    status: "LAB / PRACTICE",
    tags: ["AppSec", "Web"],
    overview:
      "Application security practice covering common web testing workflows and defensive awareness.",
    objective:
      "Strengthen web application security skills through structured practice.",
    methodology: ["Recon", "Endpoint mapping", "Input testing awareness", "Reporting"],
    tools: ["Burp Suite", "FFUF", "Nikto", "Browser tooling"],
    findings: ["Practice area — no production findings claimed."],
    securityRelevance:
      "Supports application security and offensive/defensive overlap.",
    lessons: ["Document methodology and limitations clearly."],
  },
  {
    id: "cloud-security",
    slug: "cloud-security",
    dir: "05_cloud-security/",
    title: "Cloud Security",
    subtitle: "Cloud security learning track",
    status: "LEARNING",
    tags: ["Cloud", "AWS", "Azure"],
    overview:
      "Cloud security learning across AWS and Azure concepts, identity, and infrastructure hardening awareness.",
    objective: "Build cloud security fluency alongside SOC and AppSec work.",
    methodology: ["Identity basics", "Network segmentation awareness", "Logging & monitoring"],
    tools: ["AWS", "Azure", "Linux", "Docker"],
    findings: ["Learning track — no invented cloud audit results."],
    securityRelevance:
      "Cloud security complements SOC and detection engineering.",
    lessons: ["Prefer evidence-backed claims over speculative findings."],
  },
];
