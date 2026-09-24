"use client";

import { profile } from "@/data/profile";

export function StatusPanel() {
  return (
    <div className="border-t border-[var(--border)] p-4">
      <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-[var(--text-dim)]">
        SYSTEM STATUS
      </p>
      <ul className="space-y-2">
        {profile.systemStatus.map((s) => (
          <li
            key={s.label}
            className="flex items-center justify-between gap-2 font-mono text-[11px]"
          >
            <span className="flex items-center gap-2 text-[var(--text-muted)]">
              <span
                className="status-led inline-block h-1.5 w-1.5 rounded-full bg-[var(--green)]"
                aria-hidden
              />
              {s.label}
            </span>
            <span className="text-[var(--green)]">{s.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
