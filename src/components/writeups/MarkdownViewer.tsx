"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { Writeup } from "@/data/writeups";

export function MarkdownViewer({
  writeup,
  onClose,
}: {
  writeup: Writeup;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const sections: { title: string; body: React.ReactNode }[] = [
    { title: "Overview", body: <p>{writeup.overview}</p> },
    {
      title: "Methodology",
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {writeup.methodology.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Architecture",
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {writeup.architecture.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Findings",
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {writeup.findings.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Security Relevance",
      body: <p>{writeup.securityRelevance}</p>,
    },
    {
      title: "Lessons Learned",
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {writeup.lessons.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Limitations",
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {writeup.limitations.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "References",
      body: (
        <ul className="list-disc space-y-1 pl-5">
          {writeup.references.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/70 p-3">
      <article
        role="dialog"
        aria-modal="true"
        aria-label={writeup.title}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--panel-0)]"
      >
        <div className="sticky top-0 flex items-start justify-between border-b border-[var(--border)] bg-[var(--panel-0)] px-4 py-3">
          <div>
            <p className="font-mono text-[10px] text-[var(--text-dim)]">
              {writeup.filename}
            </p>
            <h3 className="font-mono text-lg text-[var(--cyan)]">{writeup.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-[var(--text-muted)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
            aria-label="Close writeup"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-6 p-4 text-sm text-[var(--text-muted)]">
          {sections.map((s) => (
            <section key={s.title}>
              <h4 className="mb-2 font-mono text-[11px] tracking-[0.18em] text-[var(--text-dim)]">
                {s.title.toUpperCase()}
              </h4>
              {s.body}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
