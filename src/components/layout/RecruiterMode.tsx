"use client";

import { X } from "lucide-react";
import { profile } from "@/data/profile";
import { useWorkstation } from "@/context/WorkstationContext";
import { ResumeButton } from "@/components/ui/ResumeButton";

export function RecruiterMode() {
  const { recruiterMode, setRecruiterMode, setSection } = useWorkstation();
  if (!recruiterMode) return null;

  const githubUrl = `https://github.com/${profile.contact.githubUsername}`;

  return (
    <div
      className="border-b border-[var(--amber)]/30 bg-[var(--panel-0)]"
      role="region"
      aria-label="Recruiter mode"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--amber)]">
              RECRUITER MODE
            </p>
            <button
              type="button"
              onClick={() => setRecruiterMode(false)}
              className="rounded p-0.5 text-[var(--text-dim)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
              aria-label="Exit recruiter mode"
            >
              <X size={14} />
            </button>
          </div>
          <h2 className="mt-2 font-mono text-xl text-[var(--text)]">
            {profile.fullName}
          </h2>
          <p className="font-mono text-sm text-[var(--cyan)]">{profile.role}</p>
          <p className="mt-3 font-mono text-[10px] tracking-wider text-[var(--text-dim)]">
            CORE SKILLS
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            SOC · SIEM · Incident Response · Security Research · Cloud Security
          </p>
          <p className="mt-3 font-mono text-[10px] tracking-wider text-[var(--text-dim)]">
            FEATURED
          </p>
          <ul className="mt-1 flex flex-wrap gap-2 font-mono text-xs text-[var(--text-muted)]">
            {[
              ["SOC Lab", "soc"],
              ["Attack Surface Enumeration", "recon"],
              ["IRCTC Gap Assessment", "assessment"],
              ["SC-200", "certs"],
            ].map(([label, id]) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => setSection(id as "soc")}
                  className="rounded border border-[var(--border)] px-2 py-1 hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          <ResumeButton />
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[var(--border)] px-4 py-2.5 font-mono text-xs text-[var(--text-muted)] hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
          >
            GITHUB
          </a>
          <button
            type="button"
            onClick={() => setRecruiterMode(false)}
            className="rounded border border-[var(--cyan)]/40 bg-[var(--cyan)]/10 px-4 py-2.5 font-mono text-xs text-[var(--cyan)]"
          >
            FULL WORKSTATION
          </button>
        </div>
      </div>
    </div>
  );
}
