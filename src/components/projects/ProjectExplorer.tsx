"use client";

import { projects, type Project } from "@/data/projects";
import { ProjectDirectory } from "@/components/projects/ProjectDirectory";
import { useWorkstation } from "@/context/WorkstationContext";

export function ProjectExplorer() {
  const { setSection, path } = useWorkstation();

  const openProject = (p: Project) => {
    if (p.section) setSection(p.section);
    else setSection("projects");
  };

  return (
    <section
      id="section-projects"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs text-[var(--green)]">
            root@manikanta:~/projects$ ls
          </p>
          <span className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-dim)]">
            {path.startsWith("~/projects") ? path : "~/projects"}
          </span>
          <button
            type="button"
            onClick={() => setSection("home")}
            className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)] hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
          >
            [ cd .. ]
          </button>
        </div>
        <h2
          id="projects-heading"
          className="mt-2 font-mono text-2xl text-[var(--text)]"
        >
          Project Explorer
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
          Directories open into immersive case studies. Hover a folder for
          metadata — click to enter.
        </p>

        <div className="mt-6">
          <ProjectDirectory projects={projects} onOpen={openProject} />
        </div>
      </div>
    </section>
  );
}
