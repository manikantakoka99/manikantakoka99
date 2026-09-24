"use client";

import { useState } from "react";

export function GitHubTerminal({ username }: { username: string }) {
  const [started, setStarted] = useState(false);

  return (
    <div className="rounded border border-[var(--border)] bg-[var(--bg-0)] p-4 font-mono text-xs">
      <p className="text-[10px] text-[var(--amber)]">
        Website interaction abstraction — not a real SSH connection.
      </p>
      <button
        type="button"
        onClick={() => setStarted(true)}
        className="mt-3 text-[var(--green)] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
      >
        root@manikanta:~$ ssh github
      </button>
      {started && (
        <div className="mt-3 space-y-1 text-[var(--text-muted)]">
          <p>Connecting...</p>
          <p className="text-[var(--green)]">✓ Connected to public profile</p>
          <p>root@github:~$ ls repositories</p>
          <p>
            →{" "}
            <a
              href={`https://github.com/${username}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--cyan)] hover:underline"
            >
              github.com/{username}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
