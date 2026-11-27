import { useTranslation } from "react-i18next";
import { PencilIcon, SettingsIcon, UserPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectDetailResponse } from "../../../types";

type ProjectOverviewHeaderProps = {
  project: ProjectDetailResponse;
  onInviteClick?: () => void;
};

export const ProjectOverviewHeader = ({
  project,
  onInviteClick,
}: ProjectOverviewHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {project.name}
          </h1>
          <span className="rounded-md border border-border bg-white/[0.05] px-2 py-0.5 font-mono text-xs font-medium text-foreground-subtle">
            {project.codePrefix}
          </span>
          {project.activeSprint && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-xs font-medium text-sky-400">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-sky-400"
              />
              {t("projectOverview.activeBadge", {
                name: project.activeSprint.name,
              })}
            </span>
          )}
        </div>

        {project.description && (
          <p className="mt-1 max-w-2xl text-[13px] text-muted-foreground">
            {project.description}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onInviteClick}
          className="h-auto gap-1.5 rounded-full border-border bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-foreground-secondary hover:bg-white/[0.08] hover:text-foreground"
        >
          <UserPlusIcon className="size-3.5" />
          {t("projectOverview.invite")}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-auto gap-1.5 rounded-full border-border bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-foreground-secondary hover:bg-white/[0.08] hover:text-foreground"
        >
          <PencilIcon className="size-3.5" />
          {t("projectOverview.editProject")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label={t("projectOverview.projectSettings")}
          className="rounded-full border-border bg-white/[0.04] text-muted-foreground hover:bg-white/[0.08] hover:text-foreground"
        >
          <SettingsIcon className="size-3.5" />
        </Button>
      </div>
    </div>
  );
};
