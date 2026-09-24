"use client";

import type { Certification } from "@/data/certifications";
import { CheckCircle2 } from "lucide-react";

export function CertificationCard({
  cert,
  onOpen,
  featured,
}: {
  cert: Certification;
  onOpen: () => void;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded border bg-[var(--panel-0)] p-5 text-left ${
        featured
          ? "border-[var(--cyan)]/40 shadow-[0_0_28px_rgba(34,211,238,0.1)]"
          : "border-[var(--border)]"
      }`}
    >
      <p className="font-mono text-[10px] text-[var(--text-dim)]">{cert.filename}</p>
      <p className="mt-3 font-mono text-xs tracking-wider text-[var(--text-muted)]">
        {cert.issuer.toUpperCase()}:
      </p>
      <p className="mt-1 font-mono text-base leading-snug text-[var(--cyan)]">
        {cert.title.toUpperCase()}
      </p>
      <p className="mt-4 font-mono text-2xl text-[var(--text)]">{cert.code}</p>
      <div className="mt-4 flex items-center gap-2 font-mono text-xs text-[var(--green)]">
        {cert.verified && <CheckCircle2 size={14} />}
        VERIFIED
      </div>
      <p className="mt-4 font-mono text-[11px] text-[var(--text-dim)]">
        Earned: {cert.earned}
      </p>
      <p className="font-mono text-[11px] text-[var(--text-dim)]">
        Expires: {cert.expires}
      </p>
      <p className="mt-3 font-mono text-[10px] text-[var(--amber)]">{cert.status}</p>
      <button
        type="button"
        onClick={onOpen}
        className="mt-5 rounded border border-[var(--cyan)]/50 bg-[var(--cyan)]/10 px-4 py-2.5 font-mono text-xs tracking-wider text-[var(--cyan)] transition hover:bg-[var(--cyan)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
      >
        VIEW CREDENTIAL
      </button>
    </div>
  );
}
