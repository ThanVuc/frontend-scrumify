import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  GaugeIcon,
  LayersIcon,
  RefreshCwIcon,
  SignalHighIcon,
  TagIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  PbiResponse,
  ProjectDetailResponse,
  SprintSummary,
  UpdatePbiRequest,
} from "../../../types";
import {
  PBI_PRIORITY_OPTIONS,
  PBI_STATUS_OPTIONS,
  PBI_TYPE_OPTIONS,
  PbiStatusIcon,
  PbiTypeIcon,
  normalizePbiPriority,
  normalizePbiStatus,
  normalizePbiType,
} from "../PbiMetadataBadges";

const formatShortDate = (value: string, locale: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
};

type PbiPropertiesPanelProps = {
  pbi: PbiResponse;
  project?: ProjectDetailResponse;
  isUpdating: boolean;
  onUpdate: (data: UpdatePbiRequest) => Promise<void>;
};

export const PbiPropertiesPanel = ({
  pbi,
  project,
  isUpdating,
  onUpdate,
}: PbiPropertiesPanelProps) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith("vi") ? "vi-VN" : "en-US";

  const [isEditingPoints, setIsEditingPoints] = useState(false);
  const [pointsDraft, setPointsDraft] = useState(
    pbi.storyPoints !== null ? String(pbi.storyPoints) : "",
  );
  const pointsCancelledRef = useRef(false);

  const normalizedType = normalizePbiType(pbi.type);
  const normalizedStatus = normalizePbiStatus(pbi.status);
  const normalizedPriority = normalizePbiPriority(pbi.priority);

  const sprintOptionsMap = new Map<string, SprintSummary>();
  if (pbi.sprint) {
    sprintOptionsMap.set(pbi.sprint.id, pbi.sprint);
  }
  if (project?.activeSprint) {
    sprintOptionsMap.set(project.activeSprint.id, {
      id: project.activeSprint.id,
      name: project.activeSprint.name,
    });
  }
  const sprintOptions = Array.from(sprintOptionsMap.values());

  const startEditingPoints = () => {
    pointsCancelledRef.current = false;
    setPointsDraft(pbi.storyPoints !== null ? String(pbi.storyPoints) : "");
    setIsEditingPoints(true);
  };

  const commitPoints = async () => {
    if (pointsCancelledRef.current) {
      pointsCancelledRef.current = false;
      setIsEditingPoints(false);
      return;
    }

    setIsEditingPoints(false);
    const trimmed = pointsDraft.trim();
    const nextValue = trimmed === "" ? null : Number.parseInt(trimmed, 10);

    if (
      nextValue !== null &&
      (Number.isNaN(nextValue) || nextValue < 0)
    ) {
      return;
    }

    if (nextValue === pbi.storyPoints) {
      return;
    }

    await onUpdate({ storyPoints: nextValue });
  };

  return (
    <aside className="w-full shrink-0 space-y-4 rounded-xl border border-border bg-surface p-4 lg:w-72">
      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {t("pbi.detail.propertiesTitle")}
      </h2>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <TagIcon className="size-3.5" />
            {t("pbi.fields.type")}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger
              disabled={isUpdating}
              render={
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-2.5 py-1 text-xs font-medium text-foreground-secondary transition-colors hover:bg-white/[0.08] hover:text-foreground disabled:opacity-50"
                />
              }
            >
              <PbiTypeIcon type={normalizedType} />
              <span>{t(`pbi.type.${normalizedType}`)}</span>
              <ChevronDownIcon className="size-3 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 rounded-xl border border-border bg-popover p-1 shadow-xl"
            >
              {PBI_TYPE_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => {
                    if (option !== normalizedType) {
                      onUpdate({ type: option });
                    }
                  }}
                  className="gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
                >
                  <PbiTypeIcon type={option} />
                  <span>{t(`pbi.type.${option}`)}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <PbiStatusIcon status={normalizedStatus} />
            {t("pbi.fields.status")}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger
              disabled={isUpdating}
              render={
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-2.5 py-1 text-xs font-medium text-foreground-secondary transition-colors hover:bg-white/[0.08] hover:text-foreground disabled:opacity-50"
                />
              }
            >
              <PbiStatusIcon status={normalizedStatus} />
              <span>{t(`pbi.status.${normalizedStatus}`)}</span>
              <ChevronDownIcon className="size-3 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 rounded-xl border border-border bg-popover p-1 shadow-xl"
            >
              {PBI_STATUS_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => {
                    if (option !== normalizedStatus) {
                      onUpdate({ status: option });
                    }
                  }}
                  className="gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
                >
                  <PbiStatusIcon status={option} />
                  <span>{t(`pbi.status.${option}`)}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <SignalHighIcon className="size-3.5" />
            {t("pbi.fields.priority")}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger
              disabled={isUpdating}
              render={
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-2.5 py-1 text-xs font-medium text-foreground-secondary transition-colors hover:bg-white/[0.08] hover:text-foreground disabled:opacity-50"
                />
              }
            >
              <span>{t(`pbi.priority.${normalizedPriority}`)}</span>
              <ChevronDownIcon className="size-3 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 rounded-xl border border-border bg-popover p-1 shadow-xl"
            >
              {PBI_PRIORITY_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => {
                    if (option !== normalizedPriority) {
                      onUpdate({ priority: option });
                    }
                  }}
                  className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
                >
                  {t(`pbi.priority.${option}`)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <CalendarIcon className="size-3.5" />
            {t("pbi.fields.sprint")}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger
              disabled={isUpdating}
              render={
                <button
                  type="button"
                  className="inline-flex max-w-36 items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-2.5 py-1 text-xs font-medium text-foreground-secondary transition-colors hover:bg-white/[0.08] hover:text-foreground disabled:opacity-50"
                />
              }
            >
              <span className="truncate">
                {pbi.sprint ? pbi.sprint.name : t("pbi.fields.noSprint")}
              </span>
              <ChevronDownIcon className="size-3 shrink-0 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl border border-border bg-popover p-1 shadow-xl"
            >
              <DropdownMenuItem
                onClick={() => {
                  if (pbi.sprint) {
                    onUpdate({ sprintId: null });
                  }
                }}
                className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
              >
                {t("pbi.fields.noSprint")}
              </DropdownMenuItem>
              {sprintOptions.map((sprint) => (
                <DropdownMenuItem
                  key={sprint.id}
                  onClick={() => {
                    if (pbi.sprint?.id !== sprint.id) {
                      onUpdate({ sprintId: sprint.id });
                    }
                  }}
                  className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
                >
                  {sprint.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <GaugeIcon className="size-3.5" />
            {t("pbi.fields.storyPoints")}
          </span>

          {isEditingPoints ? (
            <div className="inline-flex items-center gap-1.5 rounded-md border border-foreground/25 bg-surface-inset px-2 py-0.5">
              <input
                type="number"
                min={0}
                step={1}
                autoFocus
                value={pointsDraft}
                onChange={(event) => setPointsDraft(event.target.value)}
                onBlur={commitPoints}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    event.currentTarget.blur();
                  } else if (event.key === "Escape") {
                    event.preventDefault();
                    pointsCancelledRef.current = true;
                    setIsEditingPoints(false);
                  }
                }}
                aria-label={t("pbi.fields.storyPoints")}
                className="w-10 bg-transparent text-center font-mono text-xs text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-[11px] text-muted-foreground">
                {t("pbi.detail.spUnit")}
              </span>
            </div>
          ) : (
            <button
              type="button"
              disabled={isUpdating}
              onClick={startEditingPoints}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-2.5 py-1 font-mono text-xs font-medium text-foreground-secondary transition-colors hover:bg-white/[0.08] hover:text-foreground disabled:opacity-50"
            >
              <span>{pbi.storyPoints ?? "—"}</span>
              <span className="text-muted-foreground">
                {t("pbi.detail.spUnit")}
              </span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <LayersIcon className="size-3.5" />
            {t("pbi.fields.epic")}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger
              disabled={isUpdating}
              render={
                <button
                  type="button"
                  className="inline-flex max-w-36 items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-2.5 py-1 text-xs font-medium text-foreground-secondary transition-colors hover:bg-white/[0.08] hover:text-foreground disabled:opacity-50"
                />
              }
            >
              <span className="truncate">
                {pbi.epic ? pbi.epic.name : t("pbi.fields.noEpic")}
              </span>
              <ChevronDownIcon className="size-3 shrink-0 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl border border-border bg-popover p-1 shadow-xl"
            >
              <DropdownMenuItem
                onClick={() => {
                  if (pbi.epicId) {
                    onUpdate({ epicId: null });
                  }
                }}
                className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
              >
                {t("pbi.fields.noEpic")}
              </DropdownMenuItem>
              {pbi.epic && (
                <DropdownMenuItem
                  onClick={() => {
                    if (pbi.epicId !== pbi.epic?.id) {
                      onUpdate({ epicId: pbi.epic!.id });
                    }
                  }}
                  className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
                >
                  {pbi.epic.name}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-2 border-t border-border pt-3 text-xs">
        <div className="flex items-center justify-between gap-2 text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <ClockIcon className="size-3.5" />
            {t("pbi.detail.created")}
          </span>
          <span className="font-mono text-foreground-subtle">
            {formatShortDate(pbi.createdAt, locale)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <RefreshCwIcon className="size-3.5" />
            {t("pbi.detail.updated")}
          </span>
          <span className="font-mono text-foreground-subtle">
            {formatShortDate(pbi.updatedAt, locale)}
          </span>
        </div>
      </div>
    </aside>
  );
};
