"use client";

import { useState } from "react";
import { irctcAssessment } from "@/data/irctcAssessment";
import { AttackPathViz } from "@/components/assessment/AttackPathViz";

type Tab =
  | "assets"
  | "jewels"
  | "vulns"
  | "attacks"
  | "pdm"
  | "risk";

export function IrctcAssessmentSection() {
  const [tab, setTab] = useState<Tab>("assets");
  const [assetId, setAssetId] = useState(irctcAssessment.assets[0]?.id);
  const [jewelId, setJewelId] = useState(irctcAssessment.crownJewels[0]?.id);
  const [vulnId, setVulnId] = useState(irctcAssessment.vulnerabilities[0]?.id);
  const asset = irctcAssessment.assets.find((a) => a.id === assetId);
  const jewel = irctcAssessment.crownJewels.find((j) => j.id === jewelId);
  const vuln = irctcAssessment.vulnerabilities.find((v) => v.id === vulnId);

  const tabs: { id: Tab; label: string }[] = [
    { id: "assets", label: "ASSETS" },
    { id: "jewels", label: "CROWN JEWELS" },
    { id: "vulns", label: "VULNERABILITIES" },
    { id: "attacks", label: "ATTACK SCENARIOS" },
    { id: "pdm", label: "PREVENT / DETECT / MITIGATE" },
    { id: "risk", label: "RISK" },
  ];

  return (
    <section
      id="section-assessment"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="assessment-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~/projects/irctc-gap-assessment$
        </p>
        <h2
          id="assessment-heading"
          className="mt-2 font-mono text-2xl text-[var(--text)]"
        >
          {irctcAssessment.title}
        </h2>
        <p className="mt-1 font-mono text-xs text-[var(--cyan)]">
          {irctcAssessment.framing}
        </p>
        <p className="mt-2 max-w-3xl text-sm text-[var(--text-muted)]">
          {irctcAssessment.disclaimer}
        </p>
        <p className="mt-2 font-mono text-[10px] text-[var(--amber)]">
          {irctcAssessment.sourceNote}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {irctcAssessment.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded border border-[var(--border)] bg-[var(--panel-0)] px-4 py-3"
            >
              <p className="font-mono text-2xl text-[var(--cyan)]">{m.value}</p>
              <p className="font-mono text-[10px] text-[var(--text-dim)]">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {irctcAssessment.flow.map((f, i) => (
            <span key={f} className="flex shrink-0 items-center gap-2 font-mono text-[10px] text-[var(--text-dim)]">
              {f}
              {i < irctcAssessment.flow.length - 1 && <span>→</span>}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded border px-3 py-2 font-mono text-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)] ${
                tab === t.id
                  ? "border-[var(--cyan)] bg-[var(--cyan)]/15 text-[var(--cyan)]"
                  : "border-[var(--border)] text-[var(--text-muted)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "assets" && (
            <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
              <ul className="space-y-2">
                {irctcAssessment.assets.map((a) => (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() => setAssetId(a.id)}
                      className={`w-full rounded border px-3 py-2 text-left font-mono text-xs ${
                        assetId === a.id
                          ? "border-[var(--cyan)] bg-[var(--cyan)]/10 text-[var(--cyan)]"
                          : "border-[var(--border)] text-[var(--text-muted)]"
                      }`}
                    >
                      {a.name}
                    </button>
                  </li>
                ))}
              </ul>
              {asset && (
                <div className="rounded border border-[var(--border)] bg-[var(--panel-0)] p-4 text-sm">
                  {(
                    [
                      ["ASSET", asset.name],
                      ["CATEGORY", asset.category],
                      ["SENSITIVITY", asset.sensitivity],
                      ["CRITICALITY", asset.criticality],
                      ["JUSTIFICATION", asset.justification],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="mb-3">
                      <p className="font-mono text-[10px] text-[var(--text-dim)]">{k}</p>
                      <p className="text-[var(--text-muted)]">{v}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "jewels" && (
            <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
              <ul className="space-y-2">
                {irctcAssessment.crownJewels.map((j) => (
                  <li key={j.id}>
                    <button
                      type="button"
                      onClick={() => setJewelId(j.id)}
                      className={`w-full rounded border px-3 py-2 text-left font-mono text-xs ${
                        jewelId === j.id
                          ? "border-[var(--amber)] bg-[var(--amber)]/10 text-[var(--amber)]"
                          : "border-[var(--border)] text-[var(--text-muted)]"
                      }`}
                    >
                      {j.name}
                    </button>
                  </li>
                ))}
              </ul>
              {jewel && (
                <div className="rounded border border-[var(--border)] bg-[var(--panel-0)] p-4 text-sm">
                  {(
                    [
                      ["CROWN JEWEL", jewel.name],
                      ["CRITERIA MET", jewel.criteriaMet],
                      ["WHY IT MATTERS", jewel.whyItMatters],
                      ["PRIMARY THREAT", jewel.primaryThreat],
                      ["BUSINESS IMPACT", jewel.businessImpact],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="mb-3">
                      <p className="font-mono text-[10px] text-[var(--text-dim)]">{k}</p>
                      <p className="text-[var(--text-muted)]">{v}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "vulns" && (
            <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
              <ul className="space-y-2">
                {irctcAssessment.vulnerabilities.map((v) => (
                  <li key={v.id}>
                    <button
                      type="button"
                      onClick={() => setVulnId(v.id)}
                      className={`w-full rounded border px-3 py-2 text-left font-mono text-xs ${
                        vulnId === v.id
                          ? "border-[var(--critical)]/60 bg-[var(--critical)]/10 text-[var(--text)]"
                          : "border-[var(--border)] text-[var(--text-muted)]"
                      }`}
                    >
                      {v.title}
                    </button>
                  </li>
                ))}
              </ul>
              {vuln && (
                <div className="rounded border border-[var(--border)] bg-[var(--panel-0)] p-4 text-sm space-y-3">
                  <Field label="VULNERABILITY" value={vuln.title} />
                  <Field label="TYPE" value={vuln.type} />
                  <Field
                    label="AFFECTED ASSETS"
                    value={vuln.affectedAssets.join(", ")}
                  />
                  <Field label="SOURCE EVIDENCE" value={vuln.sourceEvidence} />
                  <Field label="ATTACK SCENARIO" value={vuln.attackScenario} />
                  <Field label="POSSIBLE ATTACK" value={vuln.possibleAttack} />
                  <Field label="ATTACK TYPE" value={vuln.attackType} />
                  <Field label="LIKELY ATTACKER" value={vuln.likelyAttacker} />
                  <Field label="ATTACK GOAL" value={vuln.attackGoal} />
                </div>
              )}
            </div>
          )}

          {tab === "attacks" && (
            <AttackPathViz scenarios={irctcAssessment.attackScenarios} />
          )}

          {tab === "pdm" && vuln && (
            <div className="space-y-4">
              <p className="font-mono text-xs text-[var(--text-muted)]">
                Controls for: <span className="text-[var(--cyan)]">{vuln.title}</span>
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {(
                  [
                    ["PREVENT", vuln.prevention],
                    ["DETECT", vuln.detection],
                    ["MITIGATE", vuln.mitigation],
                  ] as const
                ).map(([label, items]) => (
                  <div
                    key={label}
                    className="rounded border border-[var(--border)] bg-[var(--panel-0)] p-3"
                  >
                    <p className="font-mono text-[10px] text-[var(--cyan)]">{label}</p>
                    <ul className="mt-2 space-y-1 text-sm text-[var(--text-muted)]">
                      {items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[10px] text-[var(--text-dim)]">
                Select a vulnerability in the VULNERABILITIES tab to change focus.
              </p>
            </div>
          )}

          {tab === "risk" && (
            <div className="space-y-4">
              <p className="font-mono text-[10px] text-[var(--text-dim)]">
                {irctcAssessment.risk.note}
              </p>
              <div className="flex flex-wrap gap-2">
                {irctcAssessment.vulnerabilities.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVulnId(v.id)}
                    className={`rounded border px-3 py-2 font-mono text-[10px] ${
                      vulnId === v.id
                        ? "border-[var(--amber)]/50 bg-[var(--amber)]/10 text-[var(--amber)]"
                        : "border-[var(--border)] text-[var(--text-muted)]"
                    }`}
                  >
                    {v.attackScenario}
                  </button>
                ))}
              </div>
              {vuln && (
                <div className="rounded border border-[var(--border)] bg-[var(--panel-0)] p-4 space-y-3">
                  <Field label="VULNERABILITY + ATTACK" value={vuln.title} />
                  <Field label="LIKELIHOOD" value={vuln.likelihood} />
                  <Field label="IMPACT" value={vuln.impact} />
                  <Field label="RISK STATEMENT" value={vuln.riskStatement} />
                  <Field
                    label="TREATMENT STRATEGY"
                    value={vuln.treatmentStrategy}
                  />
                  <Field
                    label="TREATMENT JUSTIFICATION"
                    value={vuln.treatmentJustification}
                  />
                  <div>
                    <p className="font-mono text-[10px] text-[var(--text-dim)]">
                      SPECIFIC ACTIONS
                    </p>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--text-muted)]">
                      {vuln.treatmentActions.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <p className="font-mono text-[10px] text-[var(--amber)]">
                No invented numeric risk scores — source ordinal scales only.
              </p>
            </div>
          )}
        </div>

        <a
          href={irctcAssessment.reportPath}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex rounded border border-[var(--border)] px-4 py-2.5 font-mono text-xs tracking-wider text-[var(--text-muted)] hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
        >
          OPEN FULL REPORT
        </a>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] text-[var(--text-dim)]">{label}</p>
      <p className="text-[var(--text-muted)]">{value}</p>
    </div>
  );
}
