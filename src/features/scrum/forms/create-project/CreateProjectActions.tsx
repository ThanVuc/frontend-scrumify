import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
    <div className="flex items-center justify-end gap-4 border-t border-border px-5 py-3.5">
      <label className="flex cursor-pointer items-center gap-2.5 text-xs text-muted-foreground select-none">
        <span>{t("projects.create.createMore")}</span>
        <Switch checked={createMore} onCheckedChange={onCreateMoreChange} />
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
            className="inline-flex h-auto items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-[13px] font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover"
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
