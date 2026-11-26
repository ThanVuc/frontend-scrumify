import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CircleAlertIcon, FolderIcon, PlusIcon } from "lucide-react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiError } from "@/shared/types/error";
import { CreateProjectDialog } from "../components/projects/CreateProjectDialog";
import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectsHeader } from "../components/projects/ProjectsHeader";
import { useProjects } from "../hooks";
import type { ProjectStat } from "../types";

export const ProjectsPage = () => {
  const { t } = useTranslation();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { data, isLoading, isError, error, refetch } = useProjects();

  const items = data?.items ?? [];
  const activePBIs = items.reduce(
    (sum, item) => sum + item.activePBIsCount,
    0,
  );
  const uniqueMembers = new Set(
    items.flatMap((item) => item.members.map((member) => member.userId)),
  );

  const stats: ProjectStat[] = [
    {
      id: "total-projects",
      value: items.length,
      label: t("projects.stats.project", { count: items.length }),
      icon: "projects",
    },
    {
      id: "active-pbis",
      value: activePBIs,
      label: t("projects.stats.activePbi", { count: activePBIs }),
      icon: "pbis",
    },
    {
      id: "contributors",
      value: uniqueMembers.size,
      label: t("projects.stats.contributor", { count: uniqueMembers.size }),
      icon: "contributors",
    },
  ];

  const errorCode =
    error instanceof ApiError
      ? error.code
      : error instanceof TypeError
        ? "NETWORK_ERROR"
        : "UNKNOWN_ERROR";

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <ProjectsHeader
        stats={data ? stats : undefined}
        isLoading={isLoading}
        onCreateClick={() => setIsCreateOpen(true)}
      />

      {isLoading && (
        <div className="space-y-2.5">
          {[0, 1, 2].map((index) => (
            <Skeleton
              key={index}
              className="h-[72px] rounded-xl bg-white/[0.06]"
            />
          ))}
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <CircleAlertIcon />
          <AlertTitle>{t("projects.loadErrorTitle")}</AlertTitle>
          <AlertDescription>
            {t("projects.errorCodeLabel")}{" "}
            <span className="break-all font-mono font-medium">
              {errorCode}
            </span>
          </AlertDescription>
          <AlertAction>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => refetch()}
            >
              {t("common.retry")}
            </Button>
          </AlertAction>
        </Alert>
      )}

      {!isLoading && !isError && (
        <>
          {items.length === 0 ? (
            <Card className="rounded-xl border border-dashed border-white/[0.1] bg-[#18191e] py-0 shadow-none ring-0">
              <CardContent className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
                <div className="flex size-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
                  <FolderIcon className="size-5 text-indigo-400" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-sm font-semibold text-white">
                    {t("projects.emptyTitle")}
                  </h2>
                  <p className="text-xs text-[#8a8b98]">
                    {t("projects.emptyDescription")}
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => setIsCreateOpen(true)}
                  className="mt-1 inline-flex h-auto items-center gap-1.5 rounded-lg bg-[#6366f1] px-3.5 py-1.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#5558e6]"
                >
                  <PlusIcon className="size-3.5" />
                  {t("projects.newProject")}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2.5">
              {items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </>
      )}

      <CreateProjectDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
};
