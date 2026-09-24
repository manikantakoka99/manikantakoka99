"use client";

import { useEffect, useMemo, useState } from "react";
import { useWorkstation } from "@/context/WorkstationContext";
import { searchPortfolio } from "@/lib/search";

export function GlobalSearch() {
  const { searchOpen, setSearchOpen, setSection } = useWorkstation();
  const [q, setQ] = useState("");
  const results = useMemo(() => searchPortfolio(q), [q]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-3 pt-[12vh]">
      <div
        role="dialog"
        aria-label="Global search"
        className="w-full max-w-lg overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--panel-0)]"
      >
        <div className="border-b border-[var(--border)] px-4 py-2 font-mono text-[10px] text-[var(--text-dim)]">
          root@manikanta:~$ search
        </div>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects, writeups, tools, certs…"
          className="w-full bg-transparent px-4 py-3 font-mono text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-dim)]"
          aria-label="Search query"
        />
        <ul className="max-h-80 overflow-y-auto border-t border-[var(--border)]">
          {results.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                className="flex w-full flex-col gap-0.5 px-4 py-2.5 text-left hover:bg-[var(--cyan)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
                onClick={() => {
                  setSection(r.section);
                  setSearchOpen(false);
                  setQ("");
                }}
              >
                <span className="font-mono text-sm text-[var(--text)]">{r.title}</span>
                <span className="font-mono text-[10px] text-[var(--text-dim)]">
                  {r.category} · {r.hint}
                </span>
              </button>
            </li>
          ))}
          {q && !results.length && (
            <li className="px-4 py-3 font-mono text-xs text-[var(--text-dim)]">
              No results for “{q}”
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
