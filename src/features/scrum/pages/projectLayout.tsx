import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { LanguageSwitcher } from "@/components/common";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  getProjectSectionTitleKey,
  ProjectSidebar,
} from "../components/project/ProjectSidebar";
import { useProjectDetail } from "../hooks";

export const ProjectLayout = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const projectId = id ?? "";
  const { data: project } = useProjectDetail(id);
  const activeSection = t(
    getProjectSectionTitleKey(location.pathname, projectId),
  );

  return (
    <SidebarProvider
      defaultOpen={false}
      style={{ "--sidebar-width": "15.5rem" } as CSSProperties}
    >
      <ProjectSidebar
        projectId={projectId}
        activePath={location.pathname}
        hasActiveSprint={Boolean(project?.activeSprint)}
        onSelectItem={(path) => navigate(path)}
        onBackToProjects={() => navigate("/projects")}
      />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-1 h-4 w-px" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link to="/projects" />}>
                  {t("nav.projects")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link to={`/projects/${projectId}`} />}>
                  {project?.name ?? t("projectNav.projectFallback")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{activeSection}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <LanguageSwitcher />
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
