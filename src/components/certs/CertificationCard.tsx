"use client";

import type { Certification } from "@/data/certifications";
import { CheckCircle2 } from "lucide-react";

export function CertificationCard({
  cert,
  onOpen,
}: {
  cert: Certification;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-full w-full flex-col rounded border border-[var(--border)] bg-[var(--panel-0)] p-4 text-left transition hover:border-[var(--cyan)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
    >
      <p className="font-mono text-[10px] text-[var(--text-dim)]">{cert.filename}</p>
      <p className="mt-2 font-mono text-xs tracking-wider text-[var(--text-muted)]">
        {cert.issuer.toUpperCase()}:
      </p>
      <p className="mt-1 font-mono text-sm text-[var(--cyan)]">
        {cert.title.toUpperCase()}
      </p>
      <p className="mt-3 font-mono text-lg text-[var(--text)]">{cert.code}</p>
      <div className="mt-4 flex items-center gap-2 font-mono text-xs text-[var(--green)]">
        {cert.verified && <CheckCircle2 size={14} />}
        {cert.status === "CERTIFIED" ? "✓ VERIFIED" : cert.status}
      </div>
      <p className="mt-3 font-mono text-[10px] text-[var(--text-dim)]">
        Earned: {cert.earned}
      </p>
      <p className="font-mono text-[10px] text-[var(--text-dim)]">
        Expires: {cert.expires}
      </p>
      <p className="mt-3 font-mono text-[10px] text-[var(--amber)]">{cert.status}</p>
    </button>
  );
}
