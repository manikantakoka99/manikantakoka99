"use client";

import { useState } from "react";

export function AttackPath({ chain }: { chain: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="rounded border border-[var(--border)] bg-[var(--panel-0)] p-4">
      <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-dim)]">
        RELATIONSHIP CHAIN
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {chain.map((node, i) => (
          <div key={node} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActive(i)}
              className={`rounded border px-3 py-2 font-mono text-[11px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)] ${
                active === i
                  ? "border-[var(--cyan)] bg-[var(--cyan)]/15 text-[var(--cyan)]"
                  : "border-[var(--border)] text-[var(--text-muted)]"
              }`}
            >
              {node}
            </button>
            {i < chain.length - 1 && (
              <span className="text-[var(--text-dim)]" aria-hidden>
                ↓
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-[var(--text-muted)]">
        Selected node: <span className="text-[var(--cyan)]">{chain[active]}</span>
      </p>
    </div>
  );
}
