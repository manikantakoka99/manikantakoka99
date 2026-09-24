"use client";

import { useMemo, useState } from "react";
import { irctcAssessment } from "@/data/irctcAssessment";
import { AttackPathViz } from "@/components/assessment/AttackPathViz";
import { useWorkstation } from "@/context/WorkstationContext";

type Tab =
  | "overview"
  | "assets"
  | "jewels"
  | "vulns"
  | "attacks"
  | "controls"
  | "risk"
  | "source";

export function IrctcAssessmentSection() {
  const [tab, setTab] = useState<Tab>("overview");
  const [assetId, setAssetId] = useState(irctcAssessment.assets[0]?.id);
  const [jewelId, setJewelId] = useState(irctcAssessment.crownJewels[0]?.id);
  const [vulnId, setVulnId] = useState(irctcAssessment.vulnerabilities[0]?.id);
  const [vulnQuery, setVulnQuery] = useState("");
  const [expandedVuln, setExpandedVuln] = useState<string | null>(null);
  const { setSection, path } = useWorkstation();
  const asset = irctcAssessment.assets.find((a) => a.id === assetId);
  const jewel = irctcAssessment.crownJewels.find((j) => j.id === jewelId);
  const vuln = irctcAssessment.vulnerabilities.find((v) => v.id === vulnId);

  const filteredVulns = useMemo(() => {
    const q = vulnQuery.trim().toLowerCase();
    if (!q) return irctcAssessment.vulnerabilities;
    return irctcAssessment.vulnerabilities.filter((v) =>
      [v.title, v.type, v.attackScenario, ...v.affectedAssets]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [vulnQuery]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "OVERVIEW" },
    { id: "assets", label: "ASSETS" },
    { id: "jewels", label: "CROWN JEWELS" },
    { id: "vulns", label: "VULNERABILITIES" },
    { id: "attacks", label: "ATTACKS" },
    { id: "controls", label: "CONTROLS" },
    { id: "risk", label: "RISK" },
    { id: "source", label: "SOURCE" },
  ];

  return (
    <section
      id="section-assessment"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="assessment-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs text-[var(--green)]">
            root@manikanta:~/projects/irctc-gap-assessment$
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

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded border px-3 py-2 font-mono text-[10px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)] ${
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
          {tab === "overview" && (
            <div className="space-y-4 rounded border border-[var(--border)] bg-[var(--panel-0)] p-4">
              <p className="text-sm text-[var(--text-muted)]">
                {irctcAssessment.disclaimer}
              </p>
              <p className="font-mono text-[10px] tracking-wider text-[var(--text-dim)]">
                FLOW
              </p>
              <div className="flex flex-wrap gap-2">
                {irctcAssessment.flow.map((f, i) => (
                  <span
                    key={f}
                    className="flex items-center gap-2 font-mono text-[11px] text-[var(--cyan)]"
                  >
                    {f}
                    {i < irctcAssessment.flow.length - 1 && (
                      <span className="text-[var(--text-dim)]">→</span>
                    )}
                  </span>
                ))}
              </div>
              <p className="font-mono text-[10px] text-[var(--text-dim)]">
                Scales: {irctcAssessment.ratingScales.likelihood} ·{" "}
                {irctcAssessment.ratingScales.impact}
              </p>
            </div>
          )}
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
            <div className="space-y-4">
              <input
                value={vulnQuery}
                onChange={(e) => setVulnQuery(e.target.value)}
                placeholder="Search vulnerabilities…"
                className="w-full rounded border border-[var(--border)] bg-[var(--panel-0)] px-3 py-2 font-mono text-xs text-[var(--text)] outline-none placeholder:text-[var(--text-dim)] focus:border-[var(--cyan)]/40"
                aria-label="Search vulnerabilities"
              />
              <ul className="space-y-2">
                {filteredVulns.map((v) => {
                  const open = expandedVuln === v.id || vulnId === v.id;
                  return (
                    <li key={v.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setVulnId(v.id);
                          setExpandedVuln((cur) => (cur === v.id ? null : v.id));
                        }}
                        className={`w-full rounded border px-3 py-2 text-left font-mono text-xs ${
                          vulnId === v.id
                            ? "border-[var(--critical)]/60 bg-[var(--critical)]/10 text-[var(--text)]"
                            : "border-[var(--border)] text-[var(--text-muted)]"
                        }`}
                      >
                        <span className="text-[var(--amber)]">{v.type}</span>
                        <span className="mx-2 text-[var(--text-dim)]">·</span>
                        {v.title}
                      </button>
                      {open && (
                        <div className="mt-2 space-y-2 rounded border border-[var(--border)] bg-[var(--panel-0)] p-3 text-sm">
                          <Field label="TYPE" value={v.type} />
                          <Field
                            label="AFFECTED ASSETS"
                            value={v.affectedAssets.join(", ")}
                          />
                          <Field label="SOURCE EVIDENCE" value={v.sourceEvidence} />
                          <Field label="ATTACK" value={v.possibleAttack} />
                          <Field
                            label="PREVENTION"
                            value={v.prevention.join("; ")}
                          />
                          <Field
                            label="DETECTION"
                            value={v.detection.join("; ")}
                          />
                          <Field
                            label="MITIGATION"
                            value={v.mitigation.join("; ")}
                          />
                          <button
                            type="button"
                            onClick={() => setTab("controls")}
                            className="mt-2 rounded border border-[var(--cyan)]/40 px-3 py-1.5 font-mono text-[10px] text-[var(--cyan)]"
                          >
                            VIEW CONTROLS
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {tab === "attacks" && (
            <AttackPathViz
              scenarios={irctcAssessment.attackScenarios}
              onViewControls={(scenarioId) => {
                const match = irctcAssessment.vulnerabilities.find(
                  (v) =>
                    v.attackScenario ===
                    irctcAssessment.attackScenarios.find((s) => s.id === scenarioId)
                      ?.title,
                );
                if (match) setVulnId(match.id);
                setTab("controls");
              }}
            />
          )}

          {tab === "controls" && vuln && (
            <div className="space-y-4">
              <p className="font-mono text-xs text-[var(--text-muted)]">
                Controls for:{" "}
                <span className="text-[var(--cyan)]">{vuln.title}</span>
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
                Select a vulnerability in VULNERABILITIES to change focus.
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

          {tab === "source" && (
            <div className="space-y-3 rounded border border-[var(--border)] bg-[var(--panel-0)] p-4">
              <p className="font-mono text-xs text-[var(--text-muted)]">
                {irctcAssessment.sourceNote}
              </p>
              <a
                href={irctcAssessment.reportPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded border border-[var(--cyan)]/40 bg-[var(--cyan)]/10 px-4 py-2.5 font-mono text-xs text-[var(--cyan)]"
              >
                OPEN FULL REPORT
              </a>
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
