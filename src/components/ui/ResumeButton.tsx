"use client";

import { profile } from "@/data/profile";
import { useWorkstation } from "@/context/WorkstationContext";

export function ResumeButton({ className = "" }: { className?: string }) {
  const { resumeAvailable } = useWorkstation();

  if (!resumeAvailable) {
    return (
      <span
        className={`inline-flex cursor-not-allowed flex-col rounded border border-dashed border-[var(--border)] px-4 py-2.5 font-mono text-xs tracking-wider text-[var(--text-dim)] ${className}`}
        title="Resume not uploaded yet"
      >
        RESUME UNAVAILABLE
        <span className="mt-0.5 text-[9px] normal-case tracking-normal">
          Resume not uploaded yet
        </span>
      </span>
    );
  }

  return (
    <a
      href={profile.assets.resume}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded border border-[var(--border)] px-4 py-2.5 font-mono text-xs tracking-wider text-[var(--text-muted)] transition hover:border-[var(--amber)]/40 hover:text-[var(--amber)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)] ${className}`}
    >
      DOWNLOAD RESUME
    </a>
  );
}
