"use client";

import { useState } from "react";

const NODES = [
  {
    id: "kali",
    label: "Kali Linux",
    detail: "Attacker / testing environment for generating lab activity.",
  },
  {
    id: "win",
    label: "Windows 11",
    detail: "Endpoint environment under observation.",
  },
  {
    id: "sysmon",
    label: "Sysmon",
    detail: "Endpoint telemetry: process, network, and access events.",
  },
  {
    id: "ubuntu",
    label: "Ubuntu Server",
    detail: "Server hosting SIEM / collection stack.",
  },
  {
    id: "wazuh",
    label: "Wazuh",
    detail: "SIEM and detection platform for correlation and alerting.",
  },
  {
    id: "detection",
    label: "Detection",
    detail: "Rule evaluation against incoming telemetry.",
  },
  {
    id: "alert",
    label: "Alert",
    detail: "Analyst-facing alert generated from correlation.",
  },
  {
    id: "invest",
    label: "Investigation",
    detail: "Triage and investigation workflow.",
  },
  {
    id: "response",
    label: "Response",
    detail: "Containment and response actions in the lab.",
  },
];

export function SecurityArchitecture() {
  const [active, setActive] = useState<string | null>("wazuh");
  const node = NODES.find((n) => n.id === active) ?? null;

  return (
    <div className="rounded border border-[var(--border)] bg-[var(--panel-0)] p-4">
      <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-dim)]">
        ARCHITECTURE
      </p>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {NODES.map((n, i) => (
          <div key={n.id} className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setActive(n.id)}
              className={`rounded border px-3 py-2 font-mono text-[11px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)] ${
                active === n.id
                  ? "border-[var(--cyan)] bg-[var(--cyan)]/15 text-[var(--cyan)]"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--cyan)]/40"
              }`}
            >
              {n.label}
            </button>
            {i < NODES.length - 1 && (
              <span className="font-mono text-[var(--text-dim)]" aria-hidden>
                →
              </span>
            )}
          </div>
        ))}
      </div>
      {node && (
        <div className="mt-4 rounded border border-[var(--border)] bg-[var(--panel-1)] p-3">
          <p className="font-mono text-xs text-[var(--cyan)]">{node.label}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{node.detail}</p>
        </div>
      )}
    </div>
  );
}
