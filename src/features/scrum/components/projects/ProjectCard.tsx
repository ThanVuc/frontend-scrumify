import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  CircleCheckIcon,
  LayersIcon,
  MoreHorizontalIcon,
  RefreshCwIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProjectListItem } from "../../types";

const AVATAR_COLOR_CLASSES = [
  "bg-indigo-500 text-white",
  "bg-sky-500 text-white",
  "bg-emerald-500 text-white",
  "bg-amber-500 text-white",
  "bg-rose-500 text-white",
  "bg-violet-500 text-white",
] as const;

const MAX_VISIBLE_MEMBERS = 3;

const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return "?";
  }

  if (words.length === 1) {
    return Array.from(words[0]).slice(0, 2).join("").toUpperCase();
  }

  const first = Array.from(words[0])[0] ?? "";
  const last = Array.from(words[words.length - 1])[0] ?? "";
  return `${first}${last}`.toUpperCase() || "?";
};

const getAvatarColorClass = (userId: string): string => {
  let hash = 0;
  for (let index = 0; index < userId.length; index += 1) {
    hash = (hash + userId.charCodeAt(index)) % AVATAR_COLOR_CLASSES.length;
  }
  return AVATAR_COLOR_CLASSES[hash];
};

const formatShortDate = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(parsed);
};

type ProjectCardProps = {
  project: ProjectListItem;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const visibleMembers = project.members.slice(0, MAX_VISIBLE_MEMBERS);
  const extraMembersCount = project.members.length - visibleMembers.length;

  const scheduleLabel = project.activeSprint
    ? project.activeSprint.end
      ? t("projects.card.endsDate", {
          name: project.activeSprint.name,
          date: formatShortDate(project.activeSprint.end),
        })
      : project.activeSprint.name
    : t("projects.card.noActiveSprint");

  const openProject = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <Card
      role="link"
      tabIndex={0}
      onClick={openProject}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProject();
        }
      }}
      className="cursor-pointer rounded-xl border border-border bg-surface py-0 shadow-none ring-0 transition-all hover:border-foreground/15 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CardContent className="flex items-center justify-between gap-4 px-5 py-4">
        <div
          className={cn(
            "flex min-w-0 gap-3.5",
            project.description ? "items-start" : "items-center",
          )}
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white/[0.04]">
            <LayersIcon className="size-4 text-indigo-400" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-[15px] font-semibold text-foreground">
              {project.name}
            </h2>

            {project.description && (
              <p className="mt-0.5 truncate text-[13px] text-muted-foreground">
                {project.description}
              </p>
            )}

            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                {project.activeSprint ? (
                  <RefreshCwIcon className="size-3.5 text-sky-400" />
                ) : (
                  <CalendarIcon className="size-3.5 text-muted-foreground" />
                )}
                {scheduleLabel}
              </span>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5">
                <CircleCheckIcon className="size-3.5 text-muted-foreground" />
                {t("projects.card.pbisCount", {
                  active: project.activePBIsCount,
                  total: project.totalPBIsCount,
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {visibleMembers.length > 0 && (
            <AvatarGroup className="*:data-[slot=avatar]:size-6 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-surface">
              {visibleMembers.map((member) => (
                <Avatar key={member.id} size="sm" title={member.name}>
                  <AvatarFallback
                    className={cn(
                      "text-[10px] font-semibold",
                      getAvatarColorClass(member.userId),
                    )}
                  >
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {extraMembersCount > 0 && (
                <AvatarGroupCount className="size-6 bg-surface-subtle text-[10px] font-semibold text-foreground-secondary ring-2 ring-surface">
                  +{extraMembersCount}
                </AvatarGroupCount>
              )}
            </AvatarGroup>
          )}

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={t("projects.card.moreOptions", { name: project.name })}
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
