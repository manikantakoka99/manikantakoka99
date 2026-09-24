"use client";

import { useMemo } from "react";

/** Activity-derived heatmap (public events only — never fabricated). */
export function GitHubHeatmap({
  events,
  loading,
}: {
  events: { id: string; type: string; repo: string; created_at: string }[] | null;
  loading: boolean;
}) {
  const cells = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of events ?? []) {
      const day = e.created_at.slice(0, 10);
      map.set(day, (map.get(day) ?? 0) + 1);
    }
    const days: { key: string; count: number }[] = [];
    const today = new Date();
    for (let i = 83; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({ key, count: map.get(key) ?? 0 });
    }
    return days;
  }, [events]);

  const max = Math.max(1, ...cells.map((c) => c.count));

  return (
    <div className="rounded border border-[var(--border)] bg-[var(--panel-0)] p-4">
      <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-dim)]">
        PUBLIC ACTIVITY HEATMAP
      </p>
      <p className="mt-1 font-mono text-[10px] text-[var(--text-dim)]">
        Built from available public events only — empty cells mean no events in
        the fetched window (not fabricated contributions).
      </p>
      {loading ? (
        <div className="mt-3 h-16 animate-pulse rounded bg-[var(--panel-1)]" />
      ) : (
        <div
          className="mt-3 grid gap-1"
          style={{ gridTemplateColumns: "repeat(28, minmax(0, 1fr))" }}
          role="img"
          aria-label="Public GitHub activity heatmap"
        >
          {cells.map((c) => {
            const intensity = c.count / max;
            return (
              <div
                key={c.key}
                title={`${c.key}: ${c.count} event(s)`}
                className="aspect-square rounded-[2px]"
                style={{
                  background:
                    c.count === 0
                      ? "rgba(15, 26, 38, 0.9)"
                      : `rgba(34, 211, 238, ${0.15 + intensity * 0.75})`,
                  border: "1px solid rgba(56, 189, 248, 0.08)",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
