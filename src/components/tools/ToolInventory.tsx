"use client";

import { toolCategories, tools } from "@/data/tools";

export function ToolInventory() {
  return (
    <section
      id="section-tools"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="tools-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~$ security-tools
        </p>
        <h2 id="tools-heading" className="mt-2 font-mono text-2xl text-[var(--text)]">
          Tools
        </h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Installed binaries metaphor — no fake proficiency percentages.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {toolCategories.map((cat) => (
            <div
              key={cat}
              className="rounded border border-[var(--border)] bg-[var(--panel-0)] p-4"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--cyan)]">
                {cat}
              </p>
              <ul className="mt-3 space-y-2">
                {tools
                  .filter((t) => t.category === cat)
                  .map((t) => (
                    <li
                      key={t.binary}
                      className="flex items-center justify-between font-mono text-sm text-[var(--text-muted)]"
                    >
                      <span>{t.name}</span>
                      <span className="text-[10px] text-[var(--text-dim)]">
                        ./{t.binary}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
