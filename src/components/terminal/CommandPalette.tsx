"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useWorkstation } from "@/context/WorkstationContext";
import type { SectionId } from "@/data/profile";

type PaletteCommand = {
  label: string;
  section: SectionId;
  hint: string;
  action?: "cert" | "recruiter";
};

const COMMANDS: PaletteCommand[] = [
  { label: "Go to Home", section: "home", hint: "~" },
  { label: "Go to Projects", section: "projects", hint: "~/projects" },
  { label: "Open SOC Lab", section: "soc", hint: "~/projects/soc-detection-lab" },
  {
    label: "Open Attack Surface Enumeration",
    section: "recon",
    hint: "~/projects/attack-surface-enumeration",
  },
  {
    label: "Open IRCTC Assessment",
    section: "assessment",
    hint: "~/projects/irctc-gap-assessment",
  },
  { label: "View SC-200", section: "certs", hint: "~/certifications", action: "cert" },
  { label: "Open GitHub", section: "github", hint: "~/github" },
  { label: "View Writeups", section: "writeups", hint: "~/writeups" },
  { label: "Open Tools", section: "tools", hint: "~/tools" },
  { label: "Contact", section: "contact", hint: "~/contact" },
  { label: "About", section: "about", hint: "~/about.txt" },
  {
    label: "Recruiter Mode",
    section: "home",
    hint: "simplified view",
    action: "recruiter",
  },
];

export function CommandPalette() {
  const {
    paletteOpen,
    setPaletteOpen,
    setSection,
    setOpenCertModal,
    setRecruiterMode,
  } = useWorkstation();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return COMMANDS;
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(needle));
  }, [q]);

  const safeIdx = Math.min(idx, Math.max(filtered.length - 1, 0));

  const run = useCallback(
    (c: PaletteCommand) => {
      if (c.action === "recruiter") {
        setRecruiterMode(true);
        setSection("home");
      } else if (c.action === "cert") {
        setSection("certs");
        setOpenCertModal(true);
      } else {
        setSection(c.section);
      }
      setPaletteOpen(false);
      setQ("");
      setIdx(0);
    },
    [setRecruiterMode, setSection, setOpenCertModal, setPaletteOpen],
  );

  useEffect(() => {
    if (!paletteOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPaletteOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIdx((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[safeIdx]) {
        e.preventDefault();
        run(filtered[safeIdx]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, filtered, safeIdx, setPaletteOpen, run]);

  if (!paletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-3 pt-[12vh]">
      <div
        role="dialog"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--panel-0)] shadow-[0_0_40px_rgba(34,211,238,0.12)]"
      >
        <div className="border-b border-[var(--border)] px-4 py-2 font-mono text-[10px] text-[var(--text-dim)]">
          root@manikanta:~$ command
        </div>
        <input
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setIdx(0);
          }}
          placeholder="Search commands…"
          className="w-full bg-transparent px-4 py-3 font-mono text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-dim)]"
          aria-label="Filter commands"
        />
        <ul
          className="max-h-80 overflow-y-auto border-t border-[var(--border)] py-1"
          role="listbox"
        >
          {filtered.map((c, i) => (
            <li key={c.label}>
              <button
                type="button"
                role="option"
                aria-selected={i === safeIdx}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left font-mono text-sm ${
                  i === safeIdx
                    ? "bg-[var(--cyan)]/15 text-[var(--cyan)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--panel-1)]"
                }`}
                onMouseEnter={() => setIdx(i)}
                onClick={() => run(c)}
              >
                <span>
                  <span className="text-[var(--text-dim)]">&gt; </span>
                  {c.label}
                </span>
                <span className="shrink-0 text-[10px] text-[var(--text-dim)]">
                  {c.hint}
                </span>
              </button>
            </li>
          ))}
          {!filtered.length && (
            <li className="px-4 py-3 font-mono text-xs text-[var(--text-dim)]">
              No matches
            </li>
          )}
        </ul>
        <p className="border-t border-[var(--border)] px-4 py-2 font-mono text-[10px] text-[var(--text-dim)]">
          ↑↓ navigate · Enter select · Esc close
        </p>
      </div>
    </div>
  );
}
