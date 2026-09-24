export const profile = {
  name: "Manikanta",
  fullName: "Manikanta Koka",
  role: "Cybersecurity Analyst",
  identity: "root@manikanta",
  prompt: "root@manikanta:~$",
  tagline: "I build, break, detect, investigate and secure systems.",
  summary:
    "Cybersecurity-focused practitioner working across security operations, SIEM, threat detection, incident response, reconnaissance, penetration testing, application security, and cloud security.",
  specialties: ["SOC", "RED TEAM", "BLUE TEAM", "CLOUD SECURITY"] as const,
  focus: [
    "SOC Detection & Incident Response",
    "Cloud Security",
    "Application Security",
    "Security Research",
  ] as const,
  about: [
    "Cybersecurity Analyst focused on security operations, detection, and defensive engineering.",
    "Working across SOC workflows, SIEM, threat detection, incident response, reconnaissance, penetration testing, application security, cloud security, and Linux.",
    "Building personal labs and research case studies to practice detection, investigation, and risk analysis.",
  ] as const,
  metrics: [
    { label: "TryHackMe Rooms", value: "130+" },
    { label: "Certified", value: "SC-200" },
    { label: "Security Case Studies", value: "2" },
    { label: "Projects / Labs", value: "10+" },
  ] as const,
  dashboardCards: [
    { id: "soc", title: "SOC", status: "ACTIVE" },
    { id: "siem", title: "SIEM", status: "OPERATIONAL" },
    { id: "threat", title: "THREAT DETECTION", status: "ACTIVE" },
    { id: "ir", title: "INCIDENT RESPONSE", status: "READY" },
    { id: "cloud", title: "CLOUD SECURITY", status: "LEARNING" },
  ] as const,
  systemStatus: [
    { label: "Kali Environment", status: "ONLINE" },
    { label: "SOC Lab", status: "ONLINE" },
    { label: "SIEM", status: "ONLINE" },
    { label: "GitHub", status: "CONNECTED" },
  ] as const,
  contact: {
    // From repo PROFILE_README.md (user-authored). Override via env if needed.
    githubUsername:
      process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim() || "manikantakoka99",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ||
      "https://www.linkedin.com/in/manikanta-koka-7524b3211",
    email:
      process.env.NEXT_PUBLIC_EMAIL?.trim() || "manikantakoka99@gmail.com",
  },
  assets: {
    certificate: "/assets/sc-200-certificate.png",
    attackSurfaceReport: "/assets/attack-surface-enumeration.pdf",
    irctcReport: "/assets/irctc-gap-assessment.pdf",
    resume: "/assets/resume.pdf",
  },
  seo: {
    title: "Manikanta | Cybersecurity Analyst",
    description:
      "Personal cybersecurity workstation portfolio — SOC, SIEM, incident response, security research, and cloud security.",
  },
} as const;

export type SectionId =
  | "home"
  | "about"
  | "projects"
  | "soc"
  | "recon"
  | "assessment"
  | "writeups"
  | "certs"
  | "tools"
  | "github"
  | "contact";

export const navItems: { id: SectionId; label: string; path: string }[] = [
  { id: "home", label: "HOME", path: "~" },
  { id: "about", label: "ABOUT", path: "~/about.txt" },
  { id: "projects", label: "PROJECTS", path: "~/projects" },
  { id: "soc", label: "SOC LAB", path: "~/projects/soc-detection-lab" },
  { id: "recon", label: "RECON", path: "~/projects/attack-surface-enumeration" },
  {
    id: "assessment",
    label: "ASSESSMENT",
    path: "~/projects/irctc-gap-assessment",
  },
  { id: "writeups", label: "WRITEUPS", path: "~/writeups" },
  { id: "certs", label: "CERTIFICATIONS", path: "~/certifications" },
  { id: "tools", label: "TOOLS", path: "~/tools" },
  { id: "github", label: "GITHUB", path: "~/github" },
  { id: "contact", label: "CONTACT", path: "~/contact" },
];
