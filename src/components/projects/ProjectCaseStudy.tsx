"use client";

import { X } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCaseStudy({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const blocks: { title: string; body: React.ReactNode }[] = [
    { title: "Overview", body: <p>{project.overview}</p> },
    { title: "Objective", body: <p>{project.objective}</p> },
    {
      title: "Methodology / Architecture",
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {project.methodology.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Tools",
      body: (
        <p className="font-mono text-xs text-[var(--cyan)]">
          {project.tools.join(" · ")}
        </p>
      ),
    },
    {
      title: "Findings",
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {project.findings.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Security Relevance",
      body: <p>{project.securityRelevance}</p>,
    },
    {
      title: "Lessons Learned",
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {project.lessons.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Source / Report",
      body: project.source?.href ? (
        <a
          href={project.source.href}
          className="font-mono text-xs text-[var(--cyan)] underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.source.label}
        </a>
      ) : (
        <p>{project.source?.label ?? "Not specified in source"}</p>
      ),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center bg-black/70 p-3"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--panel-0)]">
        <div className="sticky top-0 flex items-start justify-between gap-3 border-b border-[var(--border)] bg-[var(--panel-0)] px-4 py-3">
          <div>
            <p className="font-mono text-[10px] text-[var(--text-dim)]">{project.dir}</p>
            <h3 className="font-mono text-lg text-[var(--cyan)]">{project.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-[var(--text-muted)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
            aria-label="Close case study"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-6 p-4 text-sm text-[var(--text-muted)]">
          {blocks.map((b) => (
            <section key={b.title}>
              <h4 className="mb-2 font-mono text-[11px] tracking-[0.18em] text-[var(--text-dim)]">
                {b.title.toUpperCase()}
              </h4>
              {b.body}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
