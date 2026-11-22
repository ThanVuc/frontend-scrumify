import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectsHeader } from "../components/projects/ProjectsHeader";
import { ProjectStatsGrid } from "../components/projects/ProjectStatsGrid";
import {
  STUB_PROJECT_STATS,
  STUB_PROJECTS,
} from "../types/project.types";

export const ProjectsPage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <ProjectsHeader />
      <ProjectStatsGrid stats={STUB_PROJECT_STATS} />
      <div className="space-y-3">
        {STUB_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
