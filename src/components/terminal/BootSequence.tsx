"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useWorkstation } from "@/context/WorkstationContext";

const LINES = [
  "root@manikanta:~$ ./initialize_portfolio.sh",
  "",
  "[+] Loading security modules...",
  "[+] Initializing SOC environment...",
  "[+] Loading project files...",
  "[+] Loading certifications...",
  "[+] Loading security research...",
  "[+] Connecting GitHub...",
  "[+] Wazuh ................. ONLINE",
  "[+] Kali .................. ONLINE",
  "[+] GitHub ................ CONNECTED",
  "[+] SC-200 ................ VERIFIED",
  "",
  "SYSTEM READY.",
  "",
  "root@manikanta:~$",
];

export function BootSequence() {
  const { booted, setBooted } = useWorkstation();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(0);
  const show = !booted;

  useEffect(() => {
    if (!show) return;
    if (reduce) {
      const id = window.requestAnimationFrame(() => setVisible(LINES.length));
      return () => window.cancelAnimationFrame(id);
    }
    if (visible >= LINES.length) return;
    const t = window.setTimeout(
      () => setVisible((v) => v + 1),
      visible === 0 ? 200 : 90,
    );
    return () => window.clearTimeout(t);
  }, [show, visible, reduce]);

  const enter = () => setBooted(true);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-0)] px-4"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-label="System boot sequence"
        >
          <div className="scanline pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative w-full max-w-2xl rounded-lg border border-[var(--border)] bg-[var(--panel-0)] p-6 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="font-mono text-xs text-[var(--cyan)]">
                PORTFOLIO BOOTLOADER
              </p>
              <button
                type="button"
                onClick={enter}
                className="font-mono text-xs text-[var(--text-muted)] underline-offset-2 hover:text-[var(--cyan)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
              >
                Skip
              </button>
            </div>
            <pre
              className="min-h-[280px] overflow-hidden font-mono text-[13px] leading-6 text-[var(--text)]"
              aria-live="polite"
            >
              {LINES.slice(0, visible).map((line, i) => (
                <div key={`${i}-${line}`}>
                  {line.startsWith("[+]") ? (
                    <span className="text-[var(--green)]">{line}</span>
                  ) : line.includes("SYSTEM READY") ? (
                    <span className="text-[var(--cyan)]">{line}</span>
                  ) : (
                    line
                  )}
                </div>
              ))}
              {visible < LINES.length && (
                <span className="inline-block h-4 w-2 animate-pulse bg-[var(--cyan)] align-middle" />
              )}
            </pre>
            {visible >= LINES.length && (
              <button
                type="button"
                onClick={enter}
                className="mt-6 w-full rounded border border-[var(--cyan)]/50 bg-[var(--cyan)]/10 px-4 py-3 font-mono text-sm tracking-widest text-[var(--cyan)] transition hover:bg-[var(--cyan)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
              >
                [ ENTER SYSTEM ]
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
