import { useTranslation } from "react-i18next";
import {
  ArchiveIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  CircleAlertIcon,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { CLIENT_ERROR_CODE } from "@/shared/constants";
import { ApiError } from "@/shared/types/error";
import { PbiInlineContent } from "../components/pbi/detail/PbiInlineContent";
import { PbiPropertiesPanel } from "../components/pbi/detail/PbiPropertiesPanel";
import { PbiTasksSection } from "../components/pbi/detail/PbiTasksSection";
import { usePbiDetail, useProjectDetail, useUpdatePbi } from "../hooks";
import type { UpdatePbiRequest } from "../types";

export const PbiDetailPage = () => {
  const { t } = useTranslation();
  const { id, pbiId } = useParams<{ id: string; pbiId: string }>();
  const navigate = useNavigate();

  const projectId = id ?? "";
  const backlogPath = `/projects/${projectId}/pbis`;

  const { data: project } = useProjectDetail(id);
  const {
    data: detail,
    isLoading,
    isError,
    error,
    refetch,
  } = usePbiDetail(pbiId);
  const updatePbiMutation = useUpdatePbi(id);

  const errorCode =
    error instanceof ApiError
      ? error.code
      : error instanceof TypeError
        ? CLIENT_ERROR_CODE.NETWORK_ERROR
        : CLIENT_ERROR_CODE.UNKNOWN_ERROR;

  const handleUpdate = async (data: UpdatePbiRequest) => {
    if (!pbiId) return;

    try {
      await updatePbiMutation.mutateAsync({ pbiId, data });
    } catch (err) {
      const description =
        err instanceof ApiError && err.message
          ? err.message
          : t("pbi.detail.updateError");
      toast.add({
        title: t("pbi.detail.updateErrorTitle"),
        description,
        type: "error",
      });
    }
  };

  const handleArchive = async () => {
    if (!pbiId) return;

    try {
      await updatePbiMutation.mutateAsync({
        pbiId,
        data: { archived: true },
      });
      toast.add({
        title: t("pbi.detail.archivedTitle"),
        description: t("pbi.detail.archivedDescription", {
          code: detail?.pbi.code ?? "",
        }),
        type: "success",
      });
      navigate(backlogPath);
    } catch (err) {
      const description =
        err instanceof ApiError && err.message
          ? err.message
          : t("pbi.detail.updateError");
      toast.add({
        title: t("pbi.detail.updateErrorTitle"),
        description,
        type: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <Skeleton className="h-7 w-64 rounded-md bg-white/[0.06]" />
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-9 w-3/4 rounded-lg bg-white/[0.06]" />
            <Skeleton className="h-28 w-full rounded-xl bg-white/[0.06]" />
            <Skeleton className="h-40 w-full rounded-xl bg-white/[0.06]" />
          </div>
          <Skeleton className="h-80 w-full rounded-xl bg-white/[0.06] lg:w-72" />
        </div>
      </div>
    );
  }

  if (isError || !detail) {
    return (
      <div className="mx-auto max-w-6xl">
        <Alert variant="destructive">
          <CircleAlertIcon />
          <AlertTitle>{t("pbi.detail.loadErrorTitle")}</AlertTitle>
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
              onClick={() => navigate(backlogPath)}
            >
              {t("pbi.detail.backToBacklog")}
            </Button>
          </AlertAction>
        </Alert>
      </div>
    );
  }

  const { pbi, tasks } = detail;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link
            to={backlogPath}
            className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-3.5" />
            <span>{t("projectNav.productBacklog")}</span>
          </Link>
          <ChevronRightIcon className="size-3.5" />
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-2 py-0.5 font-mono font-medium text-foreground">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-info" />
            {pbi.code}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={updatePbiMutation.isPending}
          onClick={handleArchive}
          className="h-auto gap-1.5 rounded-full border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-white/[0.08] hover:text-foreground"
        >
          <ArchiveIcon className="size-3.5" />
          {t("pbi.detail.archive")}
        </Button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-6">
          <PbiInlineContent
            key={pbi.id}
            pbi={pbi}
            isUpdating={updatePbiMutation.isPending}
            onUpdate={handleUpdate}
          />

          <PbiTasksSection tasks={tasks} />
        </div>

        <PbiPropertiesPanel
          key={pbi.id}
          pbi={pbi}
          project={project}
          isUpdating={updatePbiMutation.isPending}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};
