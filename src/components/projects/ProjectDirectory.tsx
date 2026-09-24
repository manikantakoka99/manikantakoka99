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
            className="group flex h-full w-full flex-col rounded border border-[var(--border)] bg-[var(--panel-0)] p-4 text-left transition hover:border-[var(--cyan)]/40 hover:bg-[var(--panel-1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
          >
            <span className="font-mono text-[10px] text-[var(--text-dim)]">
              ~/projects/{p.dir}
            </span>
            <span className="mt-2 font-mono text-sm text-[var(--cyan)] group-hover:underline">
              {p.dir}
            </span>
            <span className="mt-1 text-sm text-[var(--text)]">{p.title}</span>
            <span className="mt-2 font-mono text-[10px] text-[var(--amber)]">
              {p.status}
            </span>
            <span className="mt-3 flex flex-wrap gap-1">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] text-[var(--text-dim)]"
                >
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
