"use client";

import { useState } from "react";
import { SecurityArchitecture } from "@/components/soc/SecurityArchitecture";
import { SocSimulation } from "@/components/soc/SocSimulation";
import { useWorkstation } from "@/context/WorkstationContext";

export function SocLabSection() {
  const [simOpen, setSimOpen] = useState(false);
  const { setSection, path } = useWorkstation();

  return (
    <section
      id="section-soc"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="soc-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs text-[var(--green)]">
            root@manikanta:~/projects/soc-detection-lab$
          </p>
          <span className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-dim)]">
            {path}
          </span>
          <button
            type="button"
            onClick={() => setSection("projects")}
            className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)] hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
          >
            [ cd .. ]
          </button>
        </div>
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
            RUN SIMULATION
          </button>
          <p className="mt-2 font-mono text-[10px] text-[var(--amber)]">
            PORTFOLIO SIMULATION — not live production alerts.
          </p>
        </div>

        {simOpen && <SocSimulation onClose={() => setSimOpen(false)} />}
      </div>
    </section>
  );
}
