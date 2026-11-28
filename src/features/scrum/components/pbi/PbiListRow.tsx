import { useTranslation } from "react-i18next";
import { ArrowUpIcon, LayersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PbiResponse } from "../../types";
import {
  PbiPriorityBadge,
  PbiStatusBadge,
  PbiStatusIcon,
  PbiTypeBadge,
} from "./PbiMetadataBadges";

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

type PbiListRowProps = {
  pbi: PbiResponse;
  onSelect: (pbiId: string) => void;
  onMoveToTop: (pbiId: string) => void;
  isMovingToTop?: boolean;
};

export const PbiListRow = ({
  pbi,
  onSelect,
  onMoveToTop,
  isMovingToTop = false,
}: PbiListRowProps) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith("vi") ? "vi-VN" : "en-US";

  return (
    <Card
      role="link"
      tabIndex={0}
      onClick={() => onSelect(pbi.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(pbi.id);
        }
      }}
      className="cursor-pointer rounded-xl border border-border bg-surface py-0 shadow-none ring-0 transition-all hover:border-foreground/15 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CardContent className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 shrink-0 rounded-md border border-border bg-surface-elevated px-2 py-0.5 font-mono text-[11px] font-medium text-muted-foreground">
            {pbi.code}
          </span>

          <PbiStatusIcon status={pbi.status} className="mt-1 shrink-0" />

          <div className="min-w-0">
            <h2 className="truncate text-sm font-medium text-foreground">
              {pbi.title}
            </h2>

            {(pbi.epic || pbi.sprint) && (
              <div className="mt-1 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                {pbi.epic && (
                  <span className="inline-flex items-center gap-1">
                    <LayersIcon className="size-3" />
                    {pbi.epic.name}
                  </span>
                )}
                {pbi.sprint && <span>{pbi.sprint.name}</span>}
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:pl-3">
          <PbiStatusBadge status={pbi.status} />
          <PbiPriorityBadge priority={pbi.priority} />
          <PbiTypeBadge type={pbi.type} />
          <span className="min-w-12 text-right font-mono text-xs text-muted-foreground">
            {formatShortDate(pbi.createdAt, locale)}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            disabled={isMovingToTop}
            title={t("pbi.list.moveToTop")}
            aria-label={t("pbi.list.moveToTopAria", { code: pbi.code })}
            onClick={(event) => {
              event.stopPropagation();
              onMoveToTop(pbi.id);
            }}
            className="text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
          >
            <ArrowUpIcon className="size-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
