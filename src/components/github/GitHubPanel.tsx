"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import {
  fetchGitHubEvents,
  fetchGitHubProfile,
  fetchGitHubRepos,
  type GitHubProfile,
  type GitHubRepo,
} from "@/lib/github";
import { GitHubRepoCard } from "@/components/github/GitHubRepoCard";
import { GitHubActivity } from "@/components/github/GitHubActivity";
import { GitHubTerminal } from "@/components/github/GitHubTerminal";
import { GitHubHeatmap } from "@/components/github/GitHubHeatmap";

export function GitHubPanel() {
  const username = profile.contact.githubUsername;
  const [profileData, setProfileData] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [events, setEvents] = useState<
    { id: string; type: string; repo: string; created_at: string }[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [p, r, e] = await Promise.all([
        fetchGitHubProfile(username),
        fetchGitHubRepos(username),
        fetchGitHubEvents(username),
      ]);
      if (cancelled) return;
      if (!p && !r) setOffline(true);
      setProfileData(p);
      setRepos(r);
      setEvents(e);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const languages = Array.from(
    new Set((repos ?? []).map((r) => r.language).filter(Boolean) as string[]),
  );

  return (
    <section
      id="section-github"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="github-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~/github$ github --status
        </p>
        <h2 id="github-heading" className="mt-2 font-mono text-2xl text-[var(--text)]">
          GitHub
        </h2>
        <p className="mt-2 font-mono text-xs text-[var(--cyan)]">
          ● {offline ? "OFFLINE / FALLBACK" : "CONNECTED"} · @{username}
        </p>

        {loading && (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded border border-[var(--border)] bg-[var(--panel-1)]"
              />
            ))}
          </div>
        )}

        {!loading && profileData && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Repositories" value={String(profileData.public_repos)} />
            <Stat label="Followers" value={String(profileData.followers)} />
            <Stat
              label="Stars (listed)"
              value={String(
                (repos ?? []).reduce((n, r) => n + r.stargazers_count, 0),
              )}
            />
            <Stat
              label="Languages"
              value={languages.length ? languages.slice(0, 4).join(" · ") : "—"}
            />
          </div>
        )}

        {offline && !loading && (
          <p className="mt-4 rounded border border-[var(--amber)]/40 bg-[var(--amber)]/10 p-3 font-mono text-xs text-[var(--amber)]">
            GitHub public API unavailable. Showing graceful offline state — no
            fake repositories.
          </p>
        )}

        <div className="mt-8">
          <p className="font-mono text-xs text-[var(--green)]">
            root@manikanta:~$ github repos
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(repos ?? []).map((r) => (
              <GitHubRepoCard key={r.id} repo={r} />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="font-mono text-xs text-[var(--green)]">
            root@manikanta:~$ github activity
          </p>
          <div className="mt-3">
            <GitHubActivity events={events} loading={loading} />
          </div>
        </div>

        <div className="mt-8">
          <GitHubHeatmap events={events} loading={loading} />
        </div>

        <div className="mt-8">
          <GitHubTerminal username={username} />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-[var(--border)] bg-[var(--panel-0)] px-4 py-3">
      <p className="font-mono text-[10px] text-[var(--text-dim)]">{label}</p>
      <p className="mt-1 break-words font-mono text-lg text-[var(--cyan)]">{value}</p>
    </div>
  );
}
