export type ToolCategory =
  | "OFFENSIVE"
  | "DEFENSIVE"
  | "INFRASTRUCTURE"
  | "AUTOMATION";

export type Tool = {
  name: string;
  category: ToolCategory;
  binary: string;
};

export const tools: Tool[] = [
  { name: "Nmap", category: "OFFENSIVE", binary: "nmap" },
  { name: "Burp Suite", category: "OFFENSIVE", binary: "burpsuite" },
  { name: "FFUF", category: "OFFENSIVE", binary: "ffuf" },
  { name: "Nikto", category: "OFFENSIVE", binary: "nikto" },
  { name: "Wireshark", category: "OFFENSIVE", binary: "wireshark" },
  { name: "Metasploit", category: "OFFENSIVE", binary: "metasploit" },
  { name: "Wazuh", category: "DEFENSIVE", binary: "wazuh" },
  { name: "Sysmon", category: "DEFENSIVE", binary: "sysmon" },
  { name: "SIEM", category: "DEFENSIVE", binary: "siem" },
  {
    name: "Detection Engineering",
    category: "DEFENSIVE",
    binary: "detection-engineering",
  },
  { name: "Linux", category: "INFRASTRUCTURE", binary: "linux" },
  { name: "Docker", category: "INFRASTRUCTURE", binary: "docker" },
  { name: "Networking", category: "INFRASTRUCTURE", binary: "networking" },
  { name: "AWS", category: "INFRASTRUCTURE", binary: "aws" },
  { name: "Azure", category: "INFRASTRUCTURE", binary: "azure" },
  { name: "Python", category: "AUTOMATION", binary: "python" },
  { name: "Bash", category: "AUTOMATION", binary: "bash" },
  { name: "PowerShell", category: "AUTOMATION", binary: "powershell" },
];

export const toolCategories: ToolCategory[] = [
  "OFFENSIVE",
  "DEFENSIVE",
  "INFRASTRUCTURE",
  "AUTOMATION",
];
