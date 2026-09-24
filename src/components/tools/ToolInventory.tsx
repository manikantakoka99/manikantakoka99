"use client";

import { useState } from "react";
import { toolCategories, tools } from "@/data/tools";

export function ToolInventory() {
  const [open, setOpen] = useState<string | null>("OFFENSIVE");

  return (
    <section
      id="section-tools"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="tools-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~$ ls /usr/bin/security-tools
        </p>
        <h2 id="tools-heading" className="mt-2 font-mono text-2xl text-[var(--text)]">
          Tools
        </h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Categorized binaries — no fake proficiency percentages.
        </p>
        <ul className="mt-6 space-y-2 font-mono text-sm">
          {toolCategories.map((cat) => {
            const expanded = open === cat;
            const items = tools.filter((t) => t.category === cat);
            return (
              <li key={cat} className="rounded border border-[var(--border)] bg-[var(--panel-0)]">
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : cat)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-[var(--cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
                  aria-expanded={expanded}
                >
                  <span>/{cat.toLowerCase()}</span>
                  <span className="text-[10px] text-[var(--text-dim)]">
                    {expanded ? "collapse" : "expand"} · {items.length}
                  </span>
                </button>
                {expanded && (
                  <ul className="border-t border-[var(--border)] px-4 py-3 space-y-2">
                    {items.map((t) => (
                      <li
                        key={t.binary}
                        className="flex items-center justify-between text-[var(--text-muted)]"
                      >
                        <span>{t.name}</span>
                        <span className="text-[10px] text-[var(--text-dim)]">
                          ./{t.binary}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
