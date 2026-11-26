import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import type { ProjectDetailResponse } from "../../../types";

const MS_PER_DAY = 86_400_000;

const formatShortDate = (value: string, locale: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(parsed);
};

type ProjectOverviewStatsProps = {
  project: ProjectDetailResponse;
};

export const ProjectOverviewStats = ({
  project,
}: ProjectOverviewStatsProps) => {
  const { t, i18n } = useTranslation();
  const [nowMs] = useState(() => Date.now());
  const locale = i18n.language.startsWith("vi") ? "vi-VN" : "en-US";

  const formatSprintProgress = (
    start: string | null,
    end: string | null,
  ): string | null => {
    if (start && end) {
      const startMs = Date.parse(start);
      const endMs = Date.parse(end);

      if (!Number.isNaN(startMs) && !Number.isNaN(endMs) && endMs >= startMs) {
        const totalDays = Math.max(
          1,
          Math.round((endMs - startMs) / MS_PER_DAY) + 1,
        );

        if (nowMs < startMs) {
          return `${formatShortDate(start, locale)} – ${formatShortDate(end, locale)}`;
        }

        const elapsed = Math.floor((nowMs - startMs) / MS_PER_DAY) + 1;
        const currentDay = Math.min(totalDays, Math.max(1, elapsed));
        return t("projectOverview.stats.dayOfTotal", {
          current: currentDay,
          total: totalDays,
        });
      }
    }

    if (end) {
      return t("projectOverview.stats.endsDate", {
        date: formatShortDate(end, locale),
      });
    }

    if (start) {
      return t("projectOverview.stats.startsDate", {
        date: formatShortDate(start, locale),
      });
    }

    return null;
  };

  const sprintSubtitle = project.activeSprint
    ? (formatSprintProgress(
        project.activeSprint.start,
        project.activeSprint.end,
      ) ?? t("projectOverview.stats.activeIteration"))
    : t("projectOverview.stats.planSprintHint");

  const cards = [
    {
      id: "active-sprint",
      label: t("projectOverview.stats.activeSprintLabel"),
      value:
        project.activeSprint?.name ?? t("projectOverview.stats.noActiveSprint"),
      subtitle: sprintSubtitle,
    },
    {
      id: "total-pbis",
      label: t("projectOverview.stats.totalPbisLabel"),
      value: String(project.pbiStatistic.total),
      subtitle: t("projectOverview.stats.pbisBreakdown", {
        backlog: project.pbiStatistic.backlogTotal,
        debt: project.pbiStatistic.debtTotal,
      }),
    },
    {
      id: "project-owner",
      label: t("projectOverview.stats.projectOwnerLabel"),
      value: project.createdBy.name,
      subtitle: t("projectOverview.stats.ownerSubtitle", {
        count: project.members.length,
      }),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.id}
          className="rounded-xl border border-white/[0.08] bg-[#18191e] py-0 shadow-none ring-0"
        >
          <CardContent className="flex flex-col gap-1.5 p-4">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#8a8b98]">
              {card.label}
            </span>
            <span className="truncate text-lg font-semibold tracking-tight text-white">
              {card.value}
            </span>
            <span className="truncate text-xs text-[#8a8b98]">
              {card.subtitle}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
