import { certifications } from "@/data/certifications";
import { projects } from "@/data/projects";
import { tools } from "@/data/tools";
import { writeups } from "@/data/writeups";
import type { SectionId } from "@/data/profile";

export type SearchResult = {
  id: string;
  title: string;
  category: "Projects" | "Writeups" | "Tools" | "Certifications";
  section: SectionId;
  hint: string;
};

export function searchPortfolio(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const p of projects) {
    const hay = [p.title, p.subtitle, p.dir, ...p.tags, ...p.tools].join(" ").toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `project-${p.id}`,
        title: p.title,
        category: "Projects",
        section: p.section ?? "projects",
        hint: p.dir,
      });
    }
  }

  for (const w of writeups) {
    const hay = [w.title, w.filename, w.overview, ...w.methodology].join(" ").toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `writeup-${w.id}`,
        title: w.title,
        category: "Writeups",
        section: "writeups",
        hint: `Writeups / ${w.filename}`,
      });
    }
  }

  for (const t of tools) {
    const hay = `${t.name} ${t.binary} ${t.category}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `tool-${t.binary}`,
        title: t.name,
        category: "Tools",
        section: "tools",
        hint: `Tools / ${t.category}`,
      });
    }
  }

  for (const c of certifications) {
    const hay = `${c.title} ${c.code} ${c.issuer} ${c.filename}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `cert-${c.id}`,
        title: `${c.code} — ${c.title}`,
        category: "Certifications",
        section: "certs",
        hint: c.filename,
      });
    }
  }

  return results;
}
