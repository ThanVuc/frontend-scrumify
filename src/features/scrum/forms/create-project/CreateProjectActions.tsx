import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CreateProjectForm } from "./createProject.form";

type CreateProjectActionsProps = {
  form: CreateProjectForm;
  createMore: boolean;
  onCreateMoreChange: (value: boolean) => void;
};

export const CreateProjectActions = ({
  form,
  createMore,
  onCreateMoreChange,
}: CreateProjectActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-end gap-4 border-t border-white/[0.08] px-5 py-3.5">
      <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#8a8b98] select-none">
        <span>{t("projects.create.createMore")}</span>
        <button
          type="button"
          role="switch"
          aria-checked={createMore}
          onClick={() => onCreateMoreChange(!createMore)}
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-white/[0.08] transition-colors",
            createMore ? "bg-[#6366f1]" : "bg-[#232429]",
          )}
        >
          <span
            className={cn(
              "inline-block size-3.5 rounded-full bg-white transition-transform",
              createMore ? "translate-x-4" : "translate-x-0.5",
            )}
          />
        </button>
      </label>

      <form.Subscribe
        selector={(state) => ({
          canSubmit: state.canSubmit,
          isSubmitting: state.isSubmitting,
        })}
      >
        {({ canSubmit, isSubmitting }) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="inline-flex h-auto items-center gap-1.5 rounded-lg bg-[#6366f1] px-4 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#5558e6]"
          >
            <span>
              {isSubmitting
                ? t("projects.create.submitting")
                : t("projects.create.submit")}
            </span>
            {!isSubmitting && <ArrowRightIcon className="size-3.5" />}
          </Button>
        )}
      </form.Subscribe>
    </div>
  );
};
