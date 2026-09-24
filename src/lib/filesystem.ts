import type { SectionId } from "@/data/profile";

/** Simulated home filesystem for the portfolio terminal (frontend only). */
export type FsNode = {
  name: string;
  type: "dir" | "file";
  section?: SectionId;
  children?: FsNode[];
  cat?: string[];
};

export const HOME = "/home/manikanta";

export const filesystem: FsNode = {
  name: "manikanta",
  type: "dir",
  children: [
    {
      name: "about.txt",
      type: "file",
      section: "about",
      cat: [
        "Cybersecurity Analyst focused on security operations, detection, and defensive engineering.",
        "SOC · SIEM · Threat Detection · Incident Response · Recon · AppSec · Cloud · Linux",
      ],
    },
    {
      name: "projects",
      type: "dir",
      section: "projects",
      children: [
        {
          name: "soc-detection-lab",
          type: "dir",
          section: "soc",
        },
        {
          name: "attack-surface-enumeration",
          type: "dir",
          section: "recon",
        },
        {
          name: "irctc-gap-assessment",
          type: "dir",
          section: "assessment",
        },
        { name: "web-security", type: "dir", section: "projects" },
        { name: "cloud-security", type: "dir", section: "projects" },
      ],
    },
    {
      name: "labs",
      type: "dir",
      section: "soc",
      children: [
        { name: "soc-detection-lab", type: "dir", section: "soc" },
      ],
    },
    {
      name: "certifications",
      type: "dir",
      section: "certs",
      children: [
        {
          name: "SC-200.credential",
          type: "file",
          section: "certs",
          cat: [
            "Microsoft Certified: Security Operations Analyst Associate",
            "SC-200 · VERIFIED",
            "Earned: September 17, 2026",
            "Expires: September 18, 2027",
          ],
        },
      ],
    },
    {
      name: "tools",
      type: "dir",
      section: "tools",
      children: [
        { name: "offensive", type: "dir", section: "tools" },
        { name: "defensive", type: "dir", section: "tools" },
        { name: "infrastructure", type: "dir", section: "tools" },
        { name: "automation", type: "dir", section: "tools" },
      ],
    },
    {
      name: "writeups",
      type: "dir",
      section: "writeups",
      children: [
        {
          name: "attack-surface-enumeration.md",
          type: "file",
          section: "writeups",
        },
        {
          name: "irctc-gap-assessment.md",
          type: "file",
          section: "writeups",
        },
        { name: "soc-detection-lab.md", type: "file", section: "writeups" },
      ],
    },
    { name: "github", type: "dir", section: "github" },
    { name: "contact", type: "dir", section: "contact" },
  ],
};

export function displayPath(cwd: string): string {
  if (cwd === HOME || cwd === `${HOME}/`) return "~";
  if (cwd.startsWith(`${HOME}/`)) return `~${cwd.slice(HOME.length)}`;
  return cwd;
}

export function promptPath(cwd: string): string {
  const d = displayPath(cwd);
  return d === "~" ? "root@manikanta:~$" : `root@manikanta:${d}$`;
}

function resolve(cwd: string, target: string): string {
  if (!target || target === ".") return cwd;
  if (target === "~" || target === "~/") return HOME;
  if (target.startsWith("~/")) return `${HOME}/${target.slice(2)}`.replace(/\/+/g, "/");
  if (target.startsWith("/")) return target.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
  const parts = [...cwd.split("/").filter(Boolean), ...target.split("/")];
  const out: string[] = [];
  for (const p of parts) {
    if (p === "." || p === "") continue;
    if (p === "..") out.pop();
    else out.push(p);
  }
  return `/${out.join("/")}`;
}

function nodeAt(absPath: string): FsNode | null {
  const normalized = absPath.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
  if (normalized === HOME) return filesystem;
  if (!normalized.startsWith(`${HOME}/`)) return null;
  const parts = normalized.slice(HOME.length + 1).split("/").filter(Boolean);
  let node: FsNode = filesystem;
  for (const part of parts) {
    const next = node.children?.find((c) => c.name === part);
    if (!next) return null;
    node = next;
  }
  return node;
}

export function listDir(cwd: string): string[] | null {
  const node = nodeAt(cwd);
  if (!node || node.type !== "dir") return null;
  return (node.children ?? []).map((c) =>
    c.type === "dir" ? `${c.name}/` : c.name,
  );
}

export function changeDir(
  cwd: string,
  target: string,
): { cwd: string; section?: SectionId; error?: string } {
  const next = resolve(cwd, target || HOME);
  const node = nodeAt(next);
  if (!node) return { cwd, error: `cd: no such file or directory: ${target}` };
  if (node.type !== "dir") return { cwd, error: `cd: not a directory: ${target}` };
  return { cwd: next, section: node.section };
}

export function catFile(
  cwd: string,
  target: string,
): { lines: string[]; section?: SectionId; error?: string } {
  const abs = resolve(cwd, target);
  const node = nodeAt(abs);
  if (!node) return { lines: [], error: `cat: ${target}: No such file or directory` };
  if (node.type === "dir") return { lines: [], error: `cat: ${target}: Is a directory` };
  return {
    lines: node.cat ?? [`# ${node.name}`, "(open the matching UI section for full content)"],
    section: node.section,
  };
}

export const COMMAND_SUGGESTIONS = [
  "help",
  "clear",
  "history",
  "whoami",
  "pwd",
  "ls",
  "cd",
  "cd projects",
  "cd labs",
  "cd certifications",
  "cd writeups",
  "cd tools",
  "cd github",
  "cat about.txt",
  "cat certifications/SC-200.credential",
  "projects",
  "profile",
  "soc",
  "recon",
  "assessment",
  "certs",
  "tools",
  "github",
  "github repos",
  "github activity",
  "github profile",
  "writeups",
  "contact",
  "recruiter",
  "home",
  "about",
  "search",
  "ssh github",
] as const;

export function autocomplete(input: string): string[] {
  const q = input.trimStart().toLowerCase();
  if (!q) return [...COMMAND_SUGGESTIONS].slice(0, 8);
  return COMMAND_SUGGESTIONS.filter((c) => c.startsWith(q) || c.includes(q)).slice(
    0,
    8,
  );
}

/** Map section → filesystem cwd for UI path sync. */
export const SECTION_CWD: Record<SectionId, string> = {
  home: HOME,
  about: HOME,
  projects: `${HOME}/projects`,
  soc: `${HOME}/projects/soc-detection-lab`,
  recon: `${HOME}/projects/attack-surface-enumeration`,
  assessment: `${HOME}/projects/irctc-gap-assessment`,
  writeups: `${HOME}/writeups`,
  certs: `${HOME}/certifications`,
  tools: `${HOME}/tools`,
  github: `${HOME}/github`,
  contact: `${HOME}/contact`,
};
