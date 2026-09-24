"use client";

export function GitHubActivity({
  events,
  loading,
}: {
  events: { id: string; type: string; repo: string; created_at: string }[] | null;
  loading: boolean;
}) {
  return (
    <div className="rounded border border-[var(--border)] bg-[var(--panel-0)] p-4">
      <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-dim)]">
        PUBLIC ACTIVITY
      </p>
      <p className="mt-1 font-mono text-[10px] text-[var(--text-dim)]">
        Sourced from GitHub public events API when available — not invented.
      </p>
      {loading && (
        <div className="mt-3 h-24 animate-pulse rounded bg-[var(--panel-1)]" />
      )}
      {!loading && (!events || events.length === 0) && (
        <p className="mt-3 font-mono text-xs text-[var(--text-muted)]">
          No public events available (API limited or offline).
        </p>
      )}
      <ul className="mt-3 space-y-2">
        {(events ?? []).map((e) => (
          <li key={e.id} className="font-mono text-xs text-[var(--text-muted)]">
            <span className="text-[var(--cyan)]">{e.type}</span> · {e.repo} ·{" "}
            <span className="text-[var(--text-dim)]">
              {new Date(e.created_at).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
