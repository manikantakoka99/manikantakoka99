"use client";

import { useState } from "react";
import type { AttackScenario } from "@/data/irctcAssessment";

export function AttackPathViz({
  scenarios,
  onViewControls,
}: {
  scenarios: AttackScenario[];
  onViewControls?: (scenarioId: string) => void;
}) {
  const [active, setActive] = useState(scenarios[0]?.id);
  const s = scenarios.find((x) => x.id === active);

  return (
    <div>
      <p className="mb-3 font-mono text-[10px] text-[var(--amber)]">
        SIMULATED VISUALIZATION
      </p>
      <div className="flex flex-wrap gap-2">
        {scenarios.map((sc) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => setActive(sc.id)}
            className={`rounded border px-3 py-2 font-mono text-[10px] ${
              active === sc.id
                ? "border-[var(--critical)]/50 bg-[var(--critical)]/10 text-[var(--text)]"
                : "border-[var(--border)] text-[var(--text-muted)]"
            }`}
          >
            {sc.title}
          </button>
        ))}
      </div>
      {s && (
        <div className="mt-4 space-y-3">
          <div className="flex flex-col gap-2 rounded border border-[var(--border)] bg-[var(--panel-0)] p-4 font-mono text-xs sm:flex-row sm:items-stretch">
            <Node label="Vulnerability" value={s.vulnerability} />
            <span className="self-center text-[var(--text-dim)]" aria-hidden>
              ↓
            </span>
            <Node label="Attack" value={s.attack} />
            <span className="self-center text-[var(--text-dim)]" aria-hidden>
              ↓
            </span>
            <Node
              label="Business Impact"
              value={s.potentialBusinessImpact}
            />
          </div>
          {onViewControls && (
            <button
              type="button"
              onClick={() => onViewControls(s.id)}
              className="rounded border border-[var(--cyan)]/40 px-3 py-2 font-mono text-[10px] text-[var(--cyan)] hover:bg-[var(--cyan)]/10"
            >
              VIEW CONTROLS
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Node({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel-1)] p-3">
      <p className="text-[10px] text-[var(--text-dim)]">{label}</p>
      <p className="mt-1 text-[var(--text-muted)]">{value}</p>
    </div>
  );
}
