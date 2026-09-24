"use client";

import { useEffect, useMemo, useState } from "react";
import { navItems, type SectionId } from "@/data/profile";
import { useWorkstation } from "@/context/WorkstationContext";

const COMMANDS: { label: string; section: SectionId }[] = [
  { label: "Go Home", section: "home" },
  { label: "About", section: "about" },
  { label: "Projects", section: "projects" },
  { label: "SOC Lab", section: "soc" },
  { label: "Attack Surface Enumeration", section: "recon" },
  { label: "IRCTC Assessment", section: "assessment" },
  { label: "Writeups", section: "writeups" },
  { label: "Certifications", section: "certs" },
  { label: "Tools", section: "tools" },
  { label: "GitHub", section: "github" },
  { label: "Contact", section: "contact" },
];

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, setSection } = useWorkstation();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return COMMANDS;
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(needle));
  }, [q]);

  const safeIdx = Math.min(idx, Math.max(filtered.length - 1, 0));

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
        setSection(filtered[safeIdx].section);
        setPaletteOpen(false);
        setQ("");
        setIdx(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, filtered, safeIdx, setPaletteOpen, setSection]);

  if (!paletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-3 pt-[12vh]">
      <div
        role="dialog"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--panel-0)] shadow-[0_0_40px_rgba(34,211,238,0.12)]"
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setIdx(0);
          }}
          placeholder="Type a command…"
          className="w-full border-b border-[var(--border)] bg-transparent px-4 py-3 font-mono text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-dim)]"
          aria-label="Filter commands"
        />
        <ul className="max-h-72 overflow-y-auto py-1" role="listbox">
          {filtered.map((c, i) => {
            const path = navItems.find((n) => n.id === c.section)?.path;
            return (
              <li key={c.label}>
                <button
                  type="button"
                  role="option"
                  aria-selected={i === safeIdx}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left font-mono text-sm ${
                    i === safeIdx
                      ? "bg-[var(--cyan)]/15 text-[var(--cyan)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--panel-1)]"
                  }`}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => {
                    setSection(c.section);
                    setPaletteOpen(false);
                    setQ("");
                    setIdx(0);
                  }
                  }
                >
                  <span>{c.label}</span>
                  <span className="text-[10px] text-[var(--text-dim)]">{path}</span>
                </button>
              </li>
            );
          })}
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
