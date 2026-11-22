import type { ComponentType } from "react";
import {
  CircleCheckIcon,
  FolderIcon,
  GaugeIcon,
  UsersIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  ProjectStat,
  ProjectStatIconType,
} from "../../types/project.types";

const STAT_ICON_MAP: Record<
  ProjectStatIconType,
  { Icon: ComponentType<{ className?: string }>; colorClass: string }
> = {
  projects: { Icon: FolderIcon, colorClass: "text-indigo-400" },
  pbis: { Icon: CircleCheckIcon, colorClass: "text-sky-400" },
  velocity: { Icon: GaugeIcon, colorClass: "text-amber-400" },
  contributors: { Icon: UsersIcon, colorClass: "text-rose-400" },
};

type ProjectStatsGridProps = {
  stats: ProjectStat[];
};

export const ProjectStatsGrid = ({ stats }: ProjectStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const { Icon, colorClass } = STAT_ICON_MAP[stat.icon];

        return (
          <Card
            key={stat.id}
            className="rounded-xl border border-white/[0.08] bg-[#18191e] py-0 shadow-none ring-0"
          >
            <CardContent className="flex flex-col justify-between gap-2 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#8a8b98]">
                  {stat.label}
                </span>
                <Icon className={cn("size-4 shrink-0", colorClass)} />
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold tracking-tight text-white">
                  {stat.value}
                </span>
                <span
                  className={cn(
                    "text-xs",
                    stat.unitAccent
                      ? "font-medium text-emerald-400"
                      : "text-[#8a8b98]"
                  )}
                >
                  {stat.unit}
                </span>
              </div>

              <p className="text-xs text-[#8a8b98]">{stat.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
