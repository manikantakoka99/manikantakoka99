"use client";

import type { Project } from "@/data/projects";

export function ProjectDirectory({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (p: Project) => void;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <li key={p.id}>
          <button
            type="button"
            onClick={() => onOpen(p)}
            className="group flex h-full w-full cursor-pointer flex-col rounded border border-[var(--border)] bg-[var(--panel-0)] p-4 text-left transition hover:-translate-y-0.5 hover:border-[var(--cyan)]/40 hover:bg-[var(--panel-1)] hover:shadow-[0_0_24px_rgba(34,211,238,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
          >
            <span className="font-mono text-[10px] text-[var(--text-dim)]">
              ~/projects/{p.dir}
            </span>
            <span className="mt-2 flex items-center gap-2 font-mono text-sm text-[var(--cyan)]">
              <span
                className="inline-flex h-4 w-5 items-end justify-center rounded-sm border border-[var(--cyan)]/50 bg-[var(--cyan)]/10 transition group-hover:border-[var(--cyan)] group-hover:bg-[var(--cyan)]/20"
                aria-hidden
              >
                <span className="mb-0.5 h-2 w-3 rounded-[1px] bg-[var(--cyan)]/40" />
              </span>
              <span className="group-hover:underline">{p.dir}</span>
            </span>
            <span className="mt-1 text-sm text-[var(--text)]">{p.title}</span>
            <span className="mt-2 max-h-0 overflow-hidden font-mono text-[10px] text-[var(--text-dim)] opacity-0 transition-all group-hover:mt-2 group-hover:max-h-16 group-hover:opacity-100">
              {p.subtitle} · {p.status}
            </span>
            <span className="mt-2 font-mono text-[10px] text-[var(--amber)]">
              {p.status}
            </span>
            <span className="mt-3 flex flex-wrap gap-1">
              {p.tags.map((t) => (
                <span key={t} className="font-mono text-[10px] text-[var(--text-dim)]">
                  #{t}
                </span>
              ))}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
