"use client";

import { profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section
      id="section-about"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~$ cat about.txt
        </p>
        <h2 id="about-heading" className="mt-2 font-mono text-2xl text-[var(--text)]">
          About
        </h2>
        <div className="mt-6 rounded border border-[var(--border)] bg-[var(--panel-0)] p-5 font-mono text-sm leading-7 text-[var(--text-muted)]">
          <p className="text-[var(--cyan)]"># about.txt</p>
          {profile.about.map((line) => (
            <p key={line} className="mt-3">
              {line}
            </p>
          ))}
          <p className="mt-4 text-[var(--text-dim)]">
            Focus areas: Security Operations · SIEM · Threat Detection · Incident
            Response · Reconnaissance · Penetration Testing · Application Security ·
            Cloud Security · Linux
          </p>
        </div>
      </div>
    </section>
  );
}
