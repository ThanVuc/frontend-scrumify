import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  ChevronRightIcon,
  LayersIcon,
  ListIcon,
  ListTodoIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProjectDetailResponse } from "../../../types";

type ProjectWorkspacesGridProps = {
  project: ProjectDetailResponse;
};

export const ProjectWorkspacesGrid = ({
  project,
}: ProjectWorkspacesGridProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const basePath = `/projects/${project.id}`;

  const workspaces = [
    {
      id: "backlog",
      title: t("projectOverview.workspaces.backlogTitle"),
      subtitle: t("projectOverview.workspaces.backlogSubtitle", {
        count: project.pbiStatistic.backlogTotal,
      }),
      path: `${basePath}/pbis`,
      icon: ListIcon,
      iconClass: "text-indigo-400",
    },
    {
      id: "tasks",
      title: t("projectOverview.workspaces.tasksTitle"),
      subtitle: t("projectOverview.workspaces.tasksSubtitle"),
      path: `${basePath}/tasks`,
      icon: ListTodoIcon,
      iconClass: "text-indigo-400",
      badge:
        project.pbiStatistic.debtTotal > 0
          ? t("projectOverview.workspaces.debtBadge", {
              count: project.pbiStatistic.debtTotal,
            })
          : undefined,
    },
    {
      id: "sprints",
      title: t("projectOverview.workspaces.sprintsTitle"),
      subtitle: project.activeSprint
        ? t("projectOverview.workspaces.sprintsActiveSubtitle", {
            name: project.activeSprint.name,
          })
        : t("projectOverview.workspaces.sprintsDefaultSubtitle"),
      path: `${basePath}/sprints`,
      icon: CalendarIcon,
      iconClass: "text-sky-400",
    },
    {
      id: "epics",
      title: t("projectOverview.workspaces.epicsTitle"),
      subtitle: t("projectOverview.workspaces.epicsSubtitle"),
      path: `${basePath}/epics`,
      icon: LayersIcon,
      iconClass: "text-violet-400",
    },
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#8a8b98]">
          {t("projectOverview.workspaces.heading")}
        </h2>
        <span className="text-xs text-[#8a8b98]">
          {t("projectOverview.workspaces.areasCount", {
            count: workspaces.length,
          })}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {workspaces.map((workspace) => {
          const Icon = workspace.icon;

          return (
            <Card
              key={workspace.id}
              role="link"
              tabIndex={0}
              onClick={() => navigate(workspace.path)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate(workspace.path);
                }
              }}
              className="cursor-pointer rounded-xl border border-white/[0.08] bg-[#18191e] py-0 shadow-none ring-0 transition-all hover:border-white/[0.14] hover:bg-[#1d1e25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <CardContent className="flex items-center justify-between gap-3 px-4 py-3.5">
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
                    <Icon className={cn("size-4", workspace.iconClass)} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {workspace.title}
                      </span>
                      {workspace.badge && (
                        <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2 py-0.5 text-[11px] leading-none font-medium text-[#a1a1aa]">
                          {workspace.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-[#8a8b98]">
                      {workspace.subtitle}
                    </p>
                  </div>
                </div>

                <ChevronRightIcon className="size-4 shrink-0 text-[#8a8b98]" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
