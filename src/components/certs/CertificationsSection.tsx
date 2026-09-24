"use client";

import { useState } from "react";
import { certifications } from "@/data/certifications";
import { CertificationCard } from "@/components/certs/CertificationCard";
import { CredentialModal } from "@/components/certs/CredentialModal";

export function CertificationsSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = certifications.find((c) => c.id === openId) ?? null;

  return (
    <section
      id="section-certs"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="certs-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~/certifications$ ls
        </p>
        <h2 id="certs-heading" className="mt-2 font-mono text-2xl text-[var(--text)]">
          Certifications
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <li key={c.id}>
              <CertificationCard cert={c} onOpen={() => setOpenId(c.id)} />
            </li>
          ))}
        </ul>
        {open && (
          <CredentialModal cert={open} onClose={() => setOpenId(null)} />
        )}
      </div>
    </section>
  );
}
