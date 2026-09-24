"use client";

import { activity } from "@/data/activity";

export function ActivityTerminal() {
  return (
    <section
      className="border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="activity-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~/activity$ tail -f activity.log
        </p>
        <h2
          id="activity-heading"
          className="mt-2 font-mono text-2xl text-[var(--text)]"
        >
          Recent Activity
        </h2>
        <p className="mt-1 font-mono text-[10px] tracking-wider text-[var(--amber)]">
          RECENT ACTIVITY — not live / real-time telemetry
        </p>
        <div className="mt-6 rounded border border-[var(--border)] bg-[var(--bg-0)] p-4 font-mono text-xs leading-6 text-[var(--text-muted)]">
          {activity.map((a) => (
            <div key={a.id}>
              <span className="text-[var(--text-dim)]">[{a.stamp}]</span>{" "}
              <span className="text-[var(--green)]">{a.message}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
