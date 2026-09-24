"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useReducedMotion } from "framer-motion";

const EVENTS = [
  { t: "14:31:02", level: "INFO", msg: "Authentication attempt" },
  { t: "14:31:04", level: "INFO", msg: "API request received" },
  { t: "14:31:05", level: "WARNING", msg: "Abnormal request velocity" },
  { t: "14:31:06", level: "ALERT", msg: "Suspicious activity detected" },
  { t: "14:31:07", level: "ALERT", msg: "SIEM correlation triggered" },
  { t: "14:31:08", level: "ACTION", msg: "Investigation started" },
  { t: "14:31:10", level: "ACTION", msg: "Response initiated" },
];

export function SocSimulation({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? EVENTS.length : 0);

  useEffect(() => {
    if (reduce) return;
    if (count >= EVENTS.length) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), 450);
    return () => window.clearTimeout(id);
  }, [count, reduce]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/70 p-3">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="SOC portfolio simulation"
        className="w-full max-w-2xl rounded-lg border border-[var(--border)] bg-[var(--bg-0)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <div>
            <p className="font-mono text-xs text-[var(--amber)]">
              PORTFOLIO SIMULATION
            </p>
            <p className="font-mono text-[10px] text-[var(--text-dim)]">
              Not live production alerts
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-[var(--text-muted)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
            aria-label="Close simulation"
          >
            <X size={16} />
          </button>
        </div>
        <pre className="max-h-[60vh] overflow-y-auto p-4 font-mono text-xs leading-6">
          {EVENTS.slice(0, count).map((e) => {
            const color =
              e.level === "ALERT"
                ? "text-[var(--critical)]"
                : e.level === "WARNING"
                  ? "text-[var(--amber)]"
                  : e.level === "ACTION"
                    ? "text-[var(--cyan)]"
                    : "text-[var(--text-muted)]";
            return (
              <div key={e.t + e.msg} className={color}>
                [{e.t}] {e.level.padEnd(9)} {e.msg}
              </div>
            );
          })}
          {count < EVENTS.length && (
            <span className="inline-block h-3 w-1.5 animate-pulse bg-[var(--cyan)]" />
          )}
        </pre>
      </div>
    </div>
  );
}
