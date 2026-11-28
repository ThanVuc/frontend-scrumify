import { useTranslation } from "react-i18next";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PbiTaskItem } from "../../../types";
import { PbiStatusBadge, PbiStatusIcon } from "../PbiMetadataBadges";

type PbiTasksSectionProps = {
  tasks: PbiTaskItem[];
};

export const PbiTasksSection = ({ tasks }: PbiTasksSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="space-y-3 border-t border-border pt-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">
            {t("pbi.detail.tasksTitle")}
          </h2>
          <span className="rounded-full border border-border bg-surface-elevated px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {tasks.length}
          </span>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled
          className="gap-1 text-xs text-muted-foreground disabled:opacity-40"
        >
          <PlusIcon className="size-3.5" />
          {t("pbi.detail.addTask")}
        </Button>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-surface px-4 py-6 text-center text-xs text-muted-foreground">
          {t("pbi.detail.noTasks")}
        </div>
      ) : (
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between gap-3 px-4 py-3"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <PbiStatusIcon status={task.status} className="shrink-0" />
                <span className="truncate text-sm text-foreground">
                  {task.title}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <PbiStatusBadge status={task.status} />
                {task.assignee?.name && (
                  <span className="rounded-full border border-border bg-surface-elevated px-2 py-0.5 text-[11px] font-medium text-foreground-secondary">
                    {task.assignee.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
