"use client";

import { navItems, profile } from "@/data/profile";
import { useWorkstation } from "@/context/WorkstationContext";
import { StatusPanel } from "@/components/layout/StatusPanel";
import { X } from "lucide-react";

export function Sidebar() {
  const { section, setSection, mobileNavOpen, setMobileNavOpen } = useWorkstation();

  const nav = (
    <nav aria-label="Primary" className="flex flex-1 flex-col gap-1">
      {navItems.map((item) => {
        const active = section === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setSection(item.id)}
            className={`group flex items-center gap-2 rounded px-3 py-2 text-left font-mono text-xs tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)] ${
              active
                ? "border border-[var(--cyan)]/40 bg-[var(--cyan)]/10 text-[var(--cyan)]"
                : "border border-transparent text-[var(--text-muted)] hover:border-[var(--border)] hover:bg-[var(--panel-1)] hover:text-[var(--text)]"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <span className={active ? "text-[var(--cyan)]" : "text-[var(--text-dim)]"}>
              {active ? ">" : " "}
            </span>
            {item.label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--panel-0)]/90 lg:flex">
        <div className="border-b border-[var(--border)] px-4 py-4">
          <p className="font-mono text-[11px] text-[var(--text-dim)]">identity</p>
          <p className="mt-1 font-mono text-sm text-[var(--cyan)]">
            {profile.identity}:~$
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">{profile.role}</p>
        </div>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-3">{nav}</div>
        <StatusPanel />
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${mobileNavOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileNavOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/60 transition ${mobileNavOpen ? "opacity-100" : "opacity-0"}`}
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col border-r border-[var(--border)] bg-[var(--panel-0)] transition-transform ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <span className="font-mono text-sm text-[var(--cyan)]">
              {profile.identity}
            </span>
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="rounded p-1 text-[var(--text-muted)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-3">{nav}</div>
          <StatusPanel />
        </div>
      </div>
    </>
  );
}
