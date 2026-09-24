"use client";

import type { GitHubRepo } from "@/lib/github";

export function GitHubRepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded border border-[var(--border)] bg-[var(--panel-0)] p-4 transition hover:border-[var(--cyan)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
    >
      <p className="font-mono text-sm text-[var(--cyan)]">{repo.name}</p>
      <p className="mt-2 line-clamp-2 text-xs text-[var(--text-muted)]">
        {repo.description || "No description"}
      </p>
      <div className="mt-3 flex flex-wrap gap-3 font-mono text-[10px] text-[var(--text-dim)]">
        <span>{repo.language || "—"}</span>
        <span>★ {repo.stargazers_count}</span>
        <span>forks {repo.forks_count}</span>
      </div>
    </a>
  );
}
