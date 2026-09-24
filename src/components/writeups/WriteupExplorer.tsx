"use client";

import { useState } from "react";
import { writeups, type Writeup } from "@/data/writeups";
import { MarkdownViewer } from "@/components/writeups/MarkdownViewer";

export function WriteupExplorer() {
  const [active, setActive] = useState<Writeup | null>(null);

  return (
    <section
      id="section-writeups"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="writeups-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~/writeups$ ls
        </p>
        <h2
          id="writeups-heading"
          className="mt-2 font-mono text-2xl text-[var(--text)]"
        >
          Writeups
        </h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Markdown-style readers —{" "}
          <span className="font-mono text-[var(--cyan)]">
            cat &lt;file&gt;.md
          </span>
        </p>
        <ul className="mt-6 space-y-2">
          {writeups.map((w) => (
            <li key={w.id}>
              <button
                type="button"
                onClick={() => setActive(w)}
                className="group w-full rounded border border-[var(--border)] bg-[var(--panel-0)] px-4 py-3 text-left transition hover:border-[var(--cyan)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
              >
                <span className="font-mono text-xs text-[var(--text-dim)]">
                  root@manikanta:~/writeups$ cat {w.filename}
                </span>
                <span className="mt-1 block font-mono text-sm text-[var(--cyan)] group-hover:underline">
                  {w.filename}
                </span>
                <span className="mt-1 block text-xs text-[var(--text-muted)]">
                  {w.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {active && (
          <MarkdownViewer writeup={active} onClose={() => setActive(null)} />
        )}
      </div>
    </section>
  );
}
