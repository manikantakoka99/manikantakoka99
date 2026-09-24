"use client";

import { useState } from "react";
import { SecurityArchitecture } from "@/components/soc/SecurityArchitecture";
import { SocSimulation } from "@/components/soc/SocSimulation";

export function SocLabSection() {
  const [simOpen, setSimOpen] = useState(false);

  return (
    <section
      id="section-soc"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="soc-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~/labs/soc-detection-lab$
        </p>
        <h2 id="soc-heading" className="mt-2 font-mono text-2xl text-[var(--text)]">
          SOC Detection & Incident Response Lab
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
          PERSONAL SOC DETECTION & INCIDENT RESPONSE LAB — Kali, Windows 11,
          Sysmon, Ubuntu Server, Wazuh.
        </p>

        <div className="mt-8">
          <SecurityArchitecture />
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => setSimOpen(true)}
            className="rounded border border-[var(--cyan)]/50 bg-[var(--cyan)]/10 px-4 py-2.5 font-mono text-xs tracking-wider text-[var(--cyan)] hover:bg-[var(--cyan)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
          >
            LAUNCH SOC SIMULATION
          </button>
          <p className="mt-2 font-mono text-[10px] text-[var(--amber)]">
            Clearly labeled PORTFOLIO SIMULATION — not live production alerts.
          </p>
        </div>

        {simOpen && <SocSimulation onClose={() => setSimOpen(false)} />}
      </div>
    </section>
  );
}
