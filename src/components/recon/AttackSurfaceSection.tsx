"use client";

import { useState } from "react";
import { attackSurface } from "@/data/attackSurface";
import { AttackPath } from "@/components/recon/AttackPath";

export function AttackSurfaceSection() {
  const [targetId, setTargetId] = useState(attackSurface.targets[0]?.id);
  const target = attackSurface.targets.find((t) => t.id === targetId);

  return (
    <section
      id="section-recon"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="recon-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~/projects/attack-surface-enumeration$
        </p>
        <h2 id="recon-heading" className="mt-2 font-mono text-2xl text-[var(--text)]">
          {attackSurface.title}
        </h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{attackSurface.subtitle}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {attackSurface.framing.map((f) => (
            <span
              key={f}
              className="rounded border border-[var(--cyan)]/30 px-2 py-1 font-mono text-[10px] text-[var(--cyan)]"
            >
              {f}
            </span>
          ))}
        </div>
        <p className="mt-3 max-w-3xl text-sm text-[var(--text-muted)]">
          {attackSurface.disclaimer}
        </p>
        <p className="mt-2 font-mono text-[10px] text-[var(--amber)]">
          {attackSurface.sourceNote}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {attackSurface.targets.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTargetId(t.id)}
              className={`rounded border px-3 py-2 font-mono text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)] ${
                targetId === t.id
                  ? "border-[var(--cyan)] bg-[var(--cyan)]/15 text-[var(--cyan)]"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--cyan)]/40"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {target && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(target.fields) as (keyof typeof target.fields)[]).map(
              (key) => (
                <div
                  key={key}
                  className="rounded border border-[var(--border)] bg-[var(--panel-0)] p-3"
                >
                  <p className="font-mono text-[10px] tracking-wider text-[var(--text-dim)]">
                    {key.toUpperCase()}
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {target.fields[key]}
                  </p>
                </div>
              ),
            )}
          </div>
        )}

        <div className="mt-8">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-dim)]">
            METHODOLOGY
          </p>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {attackSurface.methodology.map((step, i) => (
              <div key={step} className="flex shrink-0 items-center gap-2">
                <span className="rounded border border-[var(--border)] bg-[var(--panel-1)] px-3 py-2 font-mono text-[11px] text-[var(--text-muted)]">
                  {step}
                </span>
                {i < attackSurface.methodology.length - 1 && (
                  <span className="text-[var(--text-dim)]">↓</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <AttackPath chain={[...attackSurface.relationshipChain]} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#section-writeups"
            className="rounded border border-[var(--cyan)]/50 bg-[var(--cyan)]/10 px-4 py-2.5 font-mono text-xs tracking-wider text-[var(--cyan)] hover:bg-[var(--cyan)]/20"
          >
            READ CASE STUDY
          </a>
          <a
            href={attackSurface.reportPath}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[var(--border)] px-4 py-2.5 font-mono text-xs tracking-wider text-[var(--text-muted)] hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
          >
            OPEN FULL REPORT
          </a>
        </div>
      </div>
    </section>
  );
}
