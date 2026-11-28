import { useTranslation } from "react-i18next";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { CreatePbiForm } from "./createPbi.form";

type CreatePbiActionsProps = {
  form: CreatePbiForm;
  createMore: boolean;
  onCreateMoreChange: (value: boolean) => void;
};

export const CreatePbiActions = ({
  form,
  createMore,
  onCreateMoreChange,
}: CreatePbiActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-end gap-4 border-t border-border px-5 py-3.5">
      <label className="flex cursor-pointer items-center gap-2.5 text-xs text-muted-foreground select-none">
        <span>{t("pbi.create.createMore")}</span>
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
            className="inline-flex h-auto items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-40"
          >
            {isSubmitting && <Loader2Icon className="size-3.5 animate-spin" />}
            <span>
              {isSubmitting ? t("pbi.create.submitting") : t("pbi.create.submit")}
            </span>
          </Button>
        )}
      </form.Subscribe>
    </div>
  );
};
