"use client";

import { Menu, Search, TerminalSquare, UserRound } from "lucide-react";
import { profile } from "@/data/profile";
import { useWorkstation } from "@/context/WorkstationContext";

export function TopBar() {
  const {
    path,
    prompt,
    setMobileNavOpen,
    setPaletteOpen,
    setSearchOpen,
    setTerminalOpen,
    recruiterMode,
    setRecruiterMode,
  } = useWorkstation();

  return (
    <header className="sticky top-0 z-40 flex h-12 items-center gap-3 border-b border-[var(--border)] bg-[var(--panel-0)]/95 px-3 backdrop-blur">
      <button
        type="button"
        className="rounded p-1.5 text-[var(--text-muted)] hover:bg-[var(--panel-1)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)] lg:hidden"
        onClick={() => setMobileNavOpen(true)}
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>

      <div className="min-w-0 flex-1 font-mono text-xs sm:text-sm">
        <span className="text-[var(--green)]">{profile.identity}</span>
        <span className="text-[var(--cyan)]">:{path === "~" ? "~" : path}</span>
        <span className="mx-2 hidden text-[var(--text-dim)] sm:inline">|</span>
        <span className="hidden truncate text-[var(--text-dim)] sm:inline">
          {prompt}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden items-center gap-1.5 font-mono text-[10px] tracking-wider text-[var(--green)] sm:inline-flex">
          <span className="status-led h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
          SYSTEM ONLINE
        </span>
        <button
          type="button"
          onClick={() => setRecruiterMode(!recruiterMode)}
          className={`rounded border p-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)] ${
            recruiterMode
              ? "border-[var(--amber)]/50 text-[var(--amber)]"
              : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
          }`}
          aria-label="Toggle recruiter mode"
          title="Recruiter mode"
        >
          <UserRound size={16} />
        </button>
        <button
          type="button"
          onClick={() => setTerminalOpen(true)}
          className="rounded border border-[var(--border)] p-1.5 text-[var(--text-muted)] hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
          aria-label="Open terminal"
          title="Terminal"
        >
          <TerminalSquare size={16} />
        </button>
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="rounded border border-[var(--border)] p-1.5 text-[var(--text-muted)] hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
          aria-label="Open search"
          title="Search"
        >
          <Search size={16} />
        </button>
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="hidden rounded border border-[var(--border)] px-2 py-1 font-mono text-[10px] text-[var(--text-muted)] hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)] sm:inline-flex"
          aria-label="Open command palette"
        >
          Ctrl+K
        </button>
      </div>
    </header>
  );
}
