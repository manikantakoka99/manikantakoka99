"use client";

import dynamic from "next/dynamic";
import { WorkstationProvider } from "@/context/WorkstationContext";
import { BootSequence } from "@/components/terminal/BootSequence";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { CommandPalette } from "@/components/terminal/CommandPalette";
import { GlobalSearch } from "@/components/terminal/GlobalSearch";
import { TerminalShell } from "@/components/terminal/TerminalShell";
import { HeroTerminal } from "@/components/hero/HeroTerminal";
import { AboutSection } from "@/components/layout/AboutSection";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { SocLabSection } from "@/components/soc/SocLabSection";
import { AttackSurfaceSection } from "@/components/recon/AttackSurfaceSection";
import { IrctcAssessmentSection } from "@/components/assessment/IrctcAssessmentSection";
import { CertificationsSection } from "@/components/certs/CertificationsSection";
import { ToolInventory } from "@/components/tools/ToolInventory";
import { WriteupExplorer } from "@/components/writeups/WriteupExplorer";
import { ActivityTerminal } from "@/components/activity/ActivityTerminal";
import { ContactTerminal } from "@/components/contact/ContactTerminal";
import { SiteFooter } from "@/components/layout/SiteFooter";

const GitHubPanel = dynamic(
  () =>
    import("@/components/github/GitHubPanel").then((m) => m.GitHubPanel),
  {
    ssr: false,
    loading: () => (
      <section id="section-github" className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs text-[var(--text-dim)]">Loading GitHub…</p>
        </div>
      </section>
    ),
  },
);

export function Workstation() {
  return (
    <WorkstationProvider>
      <BootSequence />
      <div className="flex min-h-screen bg-[var(--bg-0)] text-[var(--text)]">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 overflow-x-hidden">
            <HeroTerminal />
            <AboutSection />
            <ProjectExplorer />
            <SocLabSection />
            <AttackSurfaceSection />
            <IrctcAssessmentSection />
            <CertificationsSection />
            <ToolInventory />
            <GitHubPanel />
            <WriteupExplorer />
            <ActivityTerminal />
            <ContactTerminal />
            <SiteFooter />
          </main>
        </div>
      </div>
      <CommandPalette />
      <GlobalSearch />
      <TerminalShell />
    </WorkstationProvider>
  );
}
