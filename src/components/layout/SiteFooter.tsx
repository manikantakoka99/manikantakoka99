"use client";

import { profile } from "@/data/profile";

export function SiteFooter() {
  const { githubUsername, linkedin, email } = profile.contact;

  return (
    <footer className="px-4 py-10">
      <div className="mx-auto max-w-6xl border-t border-[var(--border)] pt-8">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~$ exit
        </p>
        <p className="mt-2 font-mono text-xs text-[var(--green)]">
          SYSTEM STATUS: ONLINE
        </p>
        <p className="mt-4 font-mono text-sm text-[var(--text-muted)]">
          © {profile.name}
        </p>
        <p className="mt-2 font-mono text-[10px] text-[var(--text-dim)]">
          Cybersecurity · SOC · Security Research · Cloud Security
        </p>
        <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-[var(--cyan)]">
          {githubUsername && (
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="hover:underline">
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
