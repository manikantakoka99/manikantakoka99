"use client";

import { motion, useReducedMotion } from "framer-motion";

const PANELS = [
  { title: "sysmon", lines: ["EventID 1", "EventID 3", "EventID 10"] },
  { title: "wazuh", lines: ["rule.level 10", "correlation ok", "alert queued"] },
  { title: "nodes", lines: ["kali ●", "win11 ●", "ubuntu ●"] },
];

export function HeroWorkstation() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative min-h-[320px] rounded-lg border border-[var(--border)] bg-[var(--panel-0)] p-4"
      aria-hidden
    >
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] text-[var(--text-dim)]">
        <span>workstation://telemetry</span>
        <span className="text-[var(--green)]">● LIVE UI</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {PANELS.map((p, i) => (
          <motion.div
            key={p.title}
            className="rounded border border-[var(--border)] bg-[var(--panel-1)] p-3"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--cyan)]">
              {p.title}
            </p>
            <ul className="mt-2 space-y-1 font-mono text-[11px] text-[var(--text-muted)]">
              {p.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <svg className="mt-4 h-24 w-full" viewBox="0 0 400 80" fill="none">
        <motion.circle
          cx="40"
          cy="40"
          r="8"
          stroke="var(--cyan)"
          strokeWidth="1.5"
          animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="140" cy="40" r="8" stroke="var(--green)" strokeWidth="1.5" />
        <circle cx="240" cy="40" r="8" stroke="var(--amber)" strokeWidth="1.5" />
        <circle cx="340" cy="40" r="8" stroke="var(--cyan)" strokeWidth="1.5" />
        <path
          d="M48 40 H132 M148 40 H232 M248 40 H332"
          stroke="var(--border-strong)"
          strokeWidth="1"
        />
        <text x="28" y="68" fill="var(--text-dim)" fontSize="8" fontFamily="monospace">
          kali
        </text>
        <text x="126" y="68" fill="var(--text-dim)" fontSize="8" fontFamily="monospace">
          endpoint
        </text>
        <text x="228" y="68" fill="var(--text-dim)" fontSize="8" fontFamily="monospace">
          siem
        </text>
        <text x="328" y="68" fill="var(--text-dim)" fontSize="8" fontFamily="monospace">
          respond
        </text>
      </svg>
      <p className="mt-2 font-mono text-[10px] text-[var(--text-dim)]">
        Interactive workstation visual — no fake attack screenshots.
      </p>
    </div>
  );
}
