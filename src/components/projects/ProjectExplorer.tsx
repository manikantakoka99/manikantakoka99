"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import { ProjectDirectory } from "@/components/projects/ProjectDirectory";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { useWorkstation } from "@/context/WorkstationContext";

export function ProjectExplorer() {
  const [active, setActive] = useState<Project | null>(null);
  const { setSection } = useWorkstation();

  return (
    <section
      id="section-projects"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~/projects$ ls
        </p>
        <h2
          id="projects-heading"
          className="mt-2 font-mono text-2xl text-[var(--text)]"
        >
          Project Explorer
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
          Projects behave like directories. Open a case study for methodology,
          findings, and sources.
        </p>

        <div className="mt-6">
          <ProjectDirectory
            projects={projects}
            onOpen={(p) => {
              if (p.section) {
                setSection(p.section);
              }
              setActive(p);
            }}
          />
        </div>

        {active && (
          <ProjectCaseStudy project={active} onClose={() => setActive(null)} />
        )}
      </div>
    </section>
  );
}
