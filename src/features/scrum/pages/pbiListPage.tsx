import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CircleAlertIcon, ListChecksIcon, PlusIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { CLIENT_ERROR_CODE } from "@/shared/constants";
import { ApiError } from "@/shared/types/error";
import { CreatePbiDialog } from "../components/pbi/CreatePbiDialog";
import { PbiFilterBar } from "../components/pbi/PbiFilterBar";
import { PbiListRow } from "../components/pbi/PbiListRow";
import { useProjectDetail, useProjectPbis, useUpdatePbi } from "../hooks";
import type { EpicSummary, PbiStatus, PbiType } from "../types";

export const PbiListPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = id ?? "";

  const [statusFilter, setStatusFilter] = useState<PbiStatus | undefined>();
  const [typeFilter, setTypeFilter] = useState<PbiType | undefined>();
  const [epicFilter, setEpicFilter] = useState<string | undefined>();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 250);
  };

  const { data: project } = useProjectDetail(id);
  const {
    data: backlog,
    isLoading,
    isError,
    error,
    refetch,
  } = useProjectPbis(id, {
    status: statusFilter,
    type: typeFilter,
    epicId: epicFilter,
    search: debouncedSearch || undefined,
  });

  const updatePbiMutation = useUpdatePbi(id);

  const pbis = backlog?.pbis ?? [];
  const epicMap = new Map<string, EpicSummary>();
  for (const pbi of pbis) {
    if (pbi.epic) {
      epicMap.set(pbi.epic.id, pbi.epic);
    }
  }
  const availableEpics = Array.from(epicMap.values());

  const errorCode =
    error instanceof ApiError
      ? error.code
      : error instanceof TypeError
        ? CLIENT_ERROR_CODE.NETWORK_ERROR
        : CLIENT_ERROR_CODE.UNKNOWN_ERROR;

  const handleMoveToTop = async (pbiId: string) => {
    try {
      await updatePbiMutation.mutateAsync({
        pbiId,
        data: { moveToTop: true },
      });
      toast.add({
        title: t("pbi.list.movedToTop"),
        type: "success",
      });
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

  const handleClearFilters = () => {
    setStatusFilter(undefined);
    setTypeFilter(undefined);
    setEpicFilter(undefined);
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    setSearchInput("");
    setDebouncedSearch("");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              {t("pbi.list.title")}
            </h1>
            {!isLoading && (
              <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                {pbis.length}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {t("pbi.list.subtitle")}
          </p>
        </div>

        <Button
          type="button"
          disabled={!project}
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex h-auto items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[13px] font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover disabled:opacity-40"
        >
          <PlusIcon className="size-3.5" />
          {t("common.new")}
        </Button>
      </div>

      <PbiFilterBar
        status={statusFilter}
        type={typeFilter}
        epicId={epicFilter}
        search={searchInput}
        epics={availableEpics}
        onStatusChange={setStatusFilter}
        onTypeChange={setTypeFilter}
        onEpicChange={setEpicFilter}
        onSearchChange={handleSearchChange}
        onClearAll={handleClearFilters}
      />

      {isLoading && (
        <div className="space-y-2.5">
          {[0, 1, 2, 3].map((index) => (
            <Skeleton
              key={index}
              className="h-16 rounded-xl bg-white/[0.06]"
            />
          ))}
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <CircleAlertIcon />
          <AlertTitle>{t("pbi.list.loadErrorTitle")}</AlertTitle>
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
          {pbis.length === 0 ? (
            <Card className="rounded-xl border border-dashed border-border bg-surface py-0 shadow-none ring-0">
              <CardContent className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-white/[0.04]">
                  <ListChecksIcon className="size-5 text-info" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-sm font-semibold text-foreground">
                    {t("pbi.list.emptyTitle")}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {t("pbi.list.emptyDescription")}
                  </p>
                </div>
                <Button
                  type="button"
                  disabled={!project}
                  onClick={() => setIsCreateOpen(true)}
                  className="mt-1 inline-flex h-auto items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-[13px] font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover disabled:opacity-40"
                >
                  <PlusIcon className="size-3.5" />
                  {t("pbi.list.newPbi")}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2.5">
              {pbis.map((pbi) => (
                <PbiListRow
                  key={pbi.id}
                  pbi={pbi}
                  onSelect={(pbiId) =>
                    navigate(`/projects/${projectId}/pbis/${pbiId}`)
                  }
                  onMoveToTop={handleMoveToTop}
                  isMovingToTop={
                    updatePbiMutation.isPending &&
                    updatePbiMutation.variables?.pbiId === pbi.id
                  }
                />
              ))}
            </div>
          )}
        </>
      )}

      {project && (
        <CreatePbiDialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          project={project}
        />
      )}
    </div>
  );
};
