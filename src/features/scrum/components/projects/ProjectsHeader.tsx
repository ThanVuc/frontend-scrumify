import { useTranslation } from "react-i18next";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  PROJECT_STAT_ICON,
  type ProjectStat,
  type ProjectStatIconType,
} from "../../types";

const STAT_DOT_COLOR_MAP: Record<ProjectStatIconType, string> = {
  [PROJECT_STAT_ICON.PROJECTS]: "bg-indigo-400",
  [PROJECT_STAT_ICON.PBIS]: "bg-sky-400",
  [PROJECT_STAT_ICON.CONTRIBUTORS]: "bg-rose-400",
};

type ProjectsHeaderProps = {
  stats?: ProjectStat[];
  isLoading?: boolean;
  onCreateClick: () => void;
};

export const ProjectsHeader = ({
  stats,
  isLoading,
  onCreateClick,
}: ProjectsHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="mr-1 text-xl font-semibold tracking-tight text-foreground">
            {t("projects.title")}
          </h1>

          {isLoading &&
            [0, 1, 2].map((index) => (
              <Skeleton
                key={index}
                className="h-6 w-24 rounded-full bg-white/[0.06]"
              />
            ))}

          {!isLoading &&
            stats?.map((stat) => (
              <span
                key={stat.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    STAT_DOT_COLOR_MAP[stat.icon],
                  )}
                />
                <span className="font-semibold text-foreground">{stat.value}</span>
                <span className="text-muted-foreground">{stat.label}</span>
              </span>
            ))}
        </div>
        <p className="text-xs text-muted-foreground">{t("projects.subtitle")}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <Button
          onClick={onCreateClick}
          className="inline-flex h-auto items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[13px] font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover"
        >
          <PlusIcon className="size-3.5" />
          {t("projects.newProject")}
        </Button>
      </div>
    </div>
  );
};
