import { useTranslation } from "react-i18next";
import {
  ChevronDownIcon,
  CircleDotIcon,
  FilterIcon,
  LayersIcon,
  SearchIcon,
  TagIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EpicSummary, PbiStatus, PbiType } from "../../types";
import {
  PBI_STATUS_OPTIONS,
  PBI_TYPE_OPTIONS,
  PbiStatusIcon,
  PbiTypeIcon,
} from "./PbiMetadataBadges";

type PbiFilterBarProps = {
  status?: PbiStatus;
  type?: PbiType;
  epicId?: string;
  search: string;
  epics: EpicSummary[];
  onStatusChange: (status: PbiStatus | undefined) => void;
  onTypeChange: (type: PbiType | undefined) => void;
  onEpicChange: (epicId: string | undefined) => void;
  onSearchChange: (search: string) => void;
  onClearAll: () => void;
};

export const PbiFilterBar = ({
  status,
  type,
  epicId,
  search,
  epics,
  onStatusChange,
  onTypeChange,
  onEpicChange,
  onSearchChange,
  onClearAll,
}: PbiFilterBarProps) => {
  const { t } = useTranslation();

  const selectedEpic = epics.find((epic) => epic.id === epicId);
  const hasFilters = Boolean(status || type || epicId || search.trim());

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <FilterIcon className="size-3.5" />
          {t("pbi.list.filterLabel")}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground-secondary transition-colors hover:bg-surface-elevated hover:text-foreground"
              />
            }
          >
            <CircleDotIcon className="size-3.5 text-muted-foreground" />
            <span>
              {status
                ? t(`pbi.status.${status}`)
                : t("pbi.list.filterStatus")}
            </span>
            <ChevronDownIcon className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-44 rounded-xl border border-border bg-popover p-1 shadow-xl"
          >
            <DropdownMenuItem
              onClick={() => onStatusChange(undefined)}
              className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
            >
              {t("pbi.list.allStatuses")}
            </DropdownMenuItem>
            {PBI_STATUS_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => onStatusChange(option)}
                className="gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
              >
                <PbiStatusIcon status={option} />
                <span>{t(`pbi.status.${option}`)}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground-secondary transition-colors hover:bg-surface-elevated hover:text-foreground"
              />
            }
          >
            <TagIcon className="size-3.5 text-muted-foreground" />
            <span>
              {type ? t(`pbi.type.${type}`) : t("pbi.list.filterType")}
            </span>
            <ChevronDownIcon className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-40 rounded-xl border border-border bg-popover p-1 shadow-xl"
          >
            <DropdownMenuItem
              onClick={() => onTypeChange(undefined)}
              className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
            >
              {t("pbi.list.allTypes")}
            </DropdownMenuItem>
            {PBI_TYPE_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => onTypeChange(option)}
                className="gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
              >
                <PbiTypeIcon type={option} />
                <span>{t(`pbi.type.${option}`)}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground-secondary transition-colors hover:bg-surface-elevated hover:text-foreground"
              />
            }
          >
            <LayersIcon className="size-3.5 text-muted-foreground" />
            <span>
              {selectedEpic ? selectedEpic.name : t("pbi.list.filterEpic")}
            </span>
            <ChevronDownIcon className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-48 rounded-xl border border-border bg-popover p-1 shadow-xl"
          >
            <DropdownMenuItem
              onClick={() => onEpicChange(undefined)}
              className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
            >
              {t("pbi.list.allEpics")}
            </DropdownMenuItem>
            {epics.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => onEpicChange(item.id)}
                className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
              >
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {hasFilters && (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={onClearAll}
            className="gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <XIcon className="size-3" />
            {t("pbi.list.clearFilters")}
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 focus-within:border-foreground/20">
        <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t("pbi.list.searchPlaceholder")}
          aria-label={t("pbi.list.searchPlaceholder")}
          className="w-44 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none sm:w-56"
        />
      </div>
    </div>
  );
};
