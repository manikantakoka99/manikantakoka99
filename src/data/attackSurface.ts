export type AttackSurfaceField =
  | "Domains"
  | "Subdomains"
  | "Hosting / CDN"
  | "Observed Services"
  | "Exposed Interfaces"
  | "Interesting Findings"
  | "Potential Risks"
  | "Methodology"
  | "Limitations";

export type AttackSurfaceTarget = {
  id: string;
  name: string;
  fields: Record<AttackSurfaceField, string>;
};

const UNSPECIFIED = "Not specified in source";

export const attackSurface = {
  title: "Attack Surface Enumeration",
  subtitle: "Public Reconnaissance & External Attack-Surface Mapping",
  framing: [
    "PUBLIC RECONNAISSANCE",
    "ATTACK-SURFACE ENUMERATION",
    "SECURITY RESEARCH",
  ] as const,
  disclaimer:
    "This section presents public reconnaissance and attack-surface mapping research. It is not penetration testing and does not claim unauthorized access or exploitation.",
  methodology: [
    "Certificate Transparency",
    "DNS Enumeration",
    "Subdomain Discovery",
    "Hosting Identification",
    "Service Enumeration",
    "Attack Surface Mapping",
    "Security Observations",
  ] as const,
  relationshipChain: [
    "TARGET",
    "DOMAIN",
    "SUBDOMAIN",
    "HOSTING",
    "SERVICE",
    "OBSERVATION",
    "RISK",
  ] as const,
  reportPath: "/assets/attack-surface-enumeration.pdf",
  sourceNote:
    "Authoritative PDF was not available on the build worker. Field-level details show Not specified in source until the report is attached under public/assets/.",
  targets: [
    {
      id: "irctc",
      name: "IRCTC",
      fields: {
        Domains: UNSPECIFIED,
        Subdomains: UNSPECIFIED,
        "Hosting / CDN": UNSPECIFIED,
        "Observed Services": UNSPECIFIED,
        "Exposed Interfaces": UNSPECIFIED,
        "Interesting Findings": UNSPECIFIED,
        "Potential Risks": UNSPECIFIED,
        Methodology:
          "Certificate Transparency → DNS Enumeration → Subdomain Discovery → Hosting Identification → Service Enumeration → Attack Surface Mapping → Security Observations",
        Limitations:
          "Public sources only. No unauthorized access. Source PDF detail unavailable on build worker.",
      },
    },
    {
      id: "lic",
      name: "LIC",
      fields: {
        Domains: UNSPECIFIED,
        Subdomains: UNSPECIFIED,
        "Hosting / CDN": UNSPECIFIED,
        "Observed Services": UNSPECIFIED,
        "Exposed Interfaces": UNSPECIFIED,
        "Interesting Findings": UNSPECIFIED,
        "Potential Risks": UNSPECIFIED,
        Methodology:
          "Certificate Transparency → DNS Enumeration → Subdomain Discovery → Hosting Identification → Service Enumeration → Attack Surface Mapping → Security Observations",
        Limitations:
          "Public sources only. No unauthorized access. Source PDF detail unavailable on build worker.",
      },
    },
    {
      id: "bsnl",
      name: "BSNL",
      fields: {
        Domains: UNSPECIFIED,
        Subdomains: UNSPECIFIED,
        "Hosting / CDN": UNSPECIFIED,
        "Observed Services": UNSPECIFIED,
        "Exposed Interfaces": UNSPECIFIED,
        "Interesting Findings": UNSPECIFIED,
        "Potential Risks": UNSPECIFIED,
        Methodology:
          "Certificate Transparency → DNS Enumeration → Subdomain Discovery → Hosting Identification → Service Enumeration → Attack Surface Mapping → Security Observations",
        Limitations:
          "Public sources only. No unauthorized access. Source PDF detail unavailable on build worker.",
      },
    },
    {
      id: "aai",
      name: "AAI",
      fields: {
        Domains: UNSPECIFIED,
        Subdomains: UNSPECIFIED,
        "Hosting / CDN": UNSPECIFIED,
        "Observed Services": UNSPECIFIED,
        "Exposed Interfaces": UNSPECIFIED,
        "Interesting Findings": UNSPECIFIED,
        "Potential Risks": UNSPECIFIED,
        Methodology:
          "Certificate Transparency → DNS Enumeration → Subdomain Discovery → Hosting Identification → Service Enumeration → Attack Surface Mapping → Security Observations",
        Limitations:
          "Public sources only. No unauthorized access. Source PDF detail unavailable on build worker.",
      },
    },
  ] as AttackSurfaceTarget[],
};
