import type { ComponentType } from "react";
import {
  CalendarIcon,
  CircleCheckIcon,
  LayersIcon,
  MoreHorizontalIcon,
  NetworkIcon,
  RefreshCwIcon,
  SmartphoneIcon,
  TerminalIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  ProjectIconType,
  ProjectItem,
  ProjectStatus,
} from "../../types/project.types";

const PROJECT_ICON_MAP: Record<
  ProjectIconType,
  { Icon: ComponentType<{ className?: string }>; colorClass: string }
> = {
  platform: { Icon: LayersIcon, colorClass: "text-indigo-400" },
  design: { Icon: NetworkIcon, colorClass: "text-sky-400" },
  api: { Icon: TerminalIcon, colorClass: "text-amber-400" },
  mobile: { Icon: SmartphoneIcon, colorClass: "text-violet-400" },
};

const STATUS_BADGE_MAP: Record<
  ProjectStatus,
  { badgeClass: string; dotClass: string }
> = {
  in_progress: {
    badgeClass: "border-success/30 bg-success/10 text-success",
    dotClass: "bg-success",
  },
  on_track: {
    badgeClass: "border-sky-500/30 bg-sky-500/10 text-sky-400",
    dotClass: "bg-sky-400",
  },
  planning: {
    badgeClass: "border-warning/30 bg-warning/10 text-warning",
    dotClass: "bg-warning",
  },
  active_beta: {
    badgeClass: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    dotClass: "bg-indigo-400",
  },
};

type ProjectCardProps = {
  project: ProjectItem;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { Icon: ProjectIcon, colorClass } = PROJECT_ICON_MAP[project.icon];
  const statusStyle = STATUS_BADGE_MAP[project.status];
  const ScheduleIcon =
    project.scheduleType === "sprint" ? RefreshCwIcon : CalendarIcon;

  return (
    <Card className="rounded-xl border border-white/[0.08] bg-[#18191e] py-0 shadow-none ring-0 transition-all hover:border-white/[0.14] hover:bg-[#1d1e25]">
      <CardContent className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex min-w-0 items-start gap-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
            <ProjectIcon className={cn("size-4", colorClass)} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[15px] font-semibold text-white">
                {project.name}
              </h2>
              <Badge
                variant="outline"
                className={cn("gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium", statusStyle.badgeClass)}
              >
                <span
                  aria-hidden="true"
                  className={cn("size-1.5 rounded-full", statusStyle.dotClass)}
                />
                {project.statusLabel}
              </Badge>
            </div>

            <p className="mt-0.5 truncate text-[13px] text-[#8a8b98]">
              {project.description}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#8a8b98]">
              <span className="inline-flex items-center gap-1.5">
                <ScheduleIcon
                  className={cn(
                    "size-3.5",
                    project.scheduleType === "sprint"
                      ? "text-sky-400"
                      : "text-amber-400"
                  )}
                />
                {project.scheduleLabel}
              </span>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5">
                <CircleCheckIcon className="size-3.5 text-[#8a8b98]" />
                {project.pbiSummary}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <AvatarGroup className="*:data-[slot=avatar]:size-6 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-[#18191e]">
            {project.members.map((member) => (
              <Avatar key={member.initials} size="sm">
                <AvatarFallback
                  className={cn("text-[10px] font-semibold", member.colorClass)}
                >
                  {member.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.extraMembersCount !== undefined && (
              <AvatarGroupCount className="size-6 bg-[#232429] text-[10px] font-semibold text-[#d4d4d8] ring-2 ring-[#18191e]">
                +{project.extraMembersCount}
              </AvatarGroupCount>
            )}
          </AvatarGroup>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`More options for ${project.name}`}
            className="rounded-md p-1.5 text-[#8a8b98] transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
