"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const NODES = [
  {
    id: "kali",
    label: "KALI",
    detail: "Attacker / testing environment for generating lab activity.",
  },
  {
    id: "win",
    label: "WINDOWS",
    detail: "Endpoint environment under observation.",
  },
  {
    id: "sysmon",
    label: "SYSMON",
    detail: "Endpoint telemetry: process, network, and access events.",
  },
  {
    id: "wazuh",
    label: "WAZUH",
    detail: "SIEM and detection platform for correlation and alerting.",
  },
  {
    id: "detection",
    label: "DETECTION",
    detail: "Rule evaluation against incoming telemetry.",
  },
  {
    id: "invest",
    label: "INVESTIGATION",
    detail: "Triage and investigation workflow.",
  },
  {
    id: "response",
    label: "RESPONSE",
    detail: "Containment and response actions in the lab.",
  },
];

export function SecurityArchitecture() {
  const [active, setActive] = useState<string>("wazuh");
  const [hover, setHover] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const node = NODES.find((n) => n.id === active) ?? null;
  const focus = hover ?? active;

  return (
    <div className="rounded border border-[var(--border)] bg-[var(--panel-0)] p-4">
      <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-dim)]">
        ARCHITECTURE
      </p>
      <div className="mt-4 flex gap-1 overflow-x-auto pb-2 sm:gap-2">
        {NODES.map((n, i) => (
          <div key={n.id} className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              title={n.detail}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setActive(n.id)}
              className={`relative rounded border px-3 py-2 font-mono text-[11px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)] ${
                focus === n.id
                  ? "border-[var(--cyan)] bg-[var(--cyan)]/15 text-[var(--cyan)] shadow-[0_0_16px_rgba(34,211,238,0.15)]"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--cyan)]/40"
              }`}
            >
              {n.label}
            </button>
            {i < NODES.length - 1 && (
              <motion.span
                className="font-mono text-[var(--text-dim)]"
                aria-hidden
                animate={
                  reduce
                    ? undefined
                    : focus === n.id || focus === NODES[i + 1]?.id
                      ? { opacity: [0.4, 1, 0.4] }
                      : { opacity: 0.45 }
                }
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                ↓
              </motion.span>
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
