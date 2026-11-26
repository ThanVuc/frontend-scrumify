import { useTranslation } from "react-i18next";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { ProjectStat, ProjectStatIconType } from "../../types";

const STAT_DOT_COLOR_MAP: Record<ProjectStatIconType, string> = {
  projects: "bg-indigo-400",
  pbis: "bg-sky-400",
  contributors: "bg-rose-400",
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
    <div className="flex flex-col gap-3 border-b border-white/[0.08] pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="mr-1 text-xl font-semibold tracking-tight text-white">
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
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#18191e] px-2.5 py-0.5 text-xs"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    STAT_DOT_COLOR_MAP[stat.icon],
                  )}
                />
                <span className="font-semibold text-white">{stat.value}</span>
                <span className="text-[#8a8b98]">{stat.label}</span>
              </span>
            ))}
        </div>
        <p className="text-xs text-[#8a8b98]">{t("projects.subtitle")}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <Button
          onClick={onCreateClick}
          className="inline-flex h-auto items-center gap-1.5 rounded-full bg-[#6366f1] px-4 py-1.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#5558e6]"
        >
          <PlusIcon className="size-3.5" />
          {t("projects.newProject")}
        </Button>
      </div>
    </div>
  );
};
