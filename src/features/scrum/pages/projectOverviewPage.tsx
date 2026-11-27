import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CircleAlertIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiError } from "@/shared/types/error";
import { InviteMemberDialog } from "../components/project/InviteMemberDialog";
import { ProjectOverviewHeader } from "../components/project/overview/ProjectOverviewHeader";
import { ProjectOverviewStats } from "../components/project/overview/ProjectOverviewStats";
import { ProjectWorkspacesGrid } from "../components/project/overview/ProjectWorkspacesGrid";
import { useProjectDetail } from "../hooks";

export const ProjectOverviewPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, isError, error, refetch } = useProjectDetail(id);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const errorCode =
    error instanceof ApiError
      ? error.code
      : error instanceof TypeError
        ? "NETWORK_ERROR"
        : "UNKNOWN_ERROR";

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-56 rounded-md bg-white/[0.06]" />
            <Skeleton className="h-4 w-80 rounded-md bg-white/[0.06]" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-full bg-white/[0.06]" />
            <Skeleton className="h-8 w-24 rounded-full bg-white/[0.06]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <Skeleton
              key={index}
              className="h-[92px] rounded-xl bg-white/[0.06]"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[0, 1, 2, 3].map((index) => (
            <Skeleton
              key={index}
              className="h-[76px] rounded-xl bg-white/[0.06]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="mx-auto max-w-6xl">
        <Alert variant="destructive">
          <CircleAlertIcon />
          <AlertTitle>{t("projectOverview.loadErrorTitle")}</AlertTitle>
          <AlertDescription>
            {t("projects.errorCodeLabel")}{" "}
            <span className="break-all font-mono font-medium">
              {errorCode}
            </span>
          </AlertDescription>
          <AlertAction className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => refetch()}
            >
              {t("common.retry")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => navigate("/projects")}
            >
              {t("common.backToProjects")}
            </Button>
          </AlertAction>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <ProjectOverviewHeader
        project={project}
        onInviteClick={() => setIsInviteOpen(true)}
      />
      <ProjectOverviewStats project={project} />
      <ProjectWorkspacesGrid project={project} />
      <InviteMemberDialog
        open={isInviteOpen}
        onOpenChange={setIsInviteOpen}
        project={project}
      />
    </div>
  );
};
