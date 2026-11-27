import { useTranslation } from "react-i18next";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { InviteMemberForm } from "./inviteMember.form";

type InviteMemberActionsProps = {
  form: InviteMemberForm;
  isLookingUp: boolean;
  createMore: boolean;
  onCreateMoreChange: (value: boolean) => void;
};

export const InviteMemberActions = ({
  form,
  isLookingUp,
  createMore,
  onCreateMoreChange,
}: InviteMemberActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-end gap-4 border-t border-border px-5 py-3.5">
      <label className="flex cursor-pointer items-center gap-2.5 text-xs text-muted-foreground select-none">
        <span>{t("projectOverview.inviteModal.createMore")}</span>
        <Switch checked={createMore} onCheckedChange={onCreateMoreChange} />
      </label>

      <form.Subscribe
        selector={(state) => ({
          membersCount: state.values.members.length,
          isSubmitting: state.isSubmitting,
        })}
      >
        {({ membersCount, isSubmitting }) => (
          <Button
            type="submit"
            disabled={membersCount === 0 || isSubmitting || isLookingUp}
            className="inline-flex h-auto items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-40"
          >
            {isSubmitting && <Loader2Icon className="size-3.5 animate-spin" />}
            <span>
              {isSubmitting
                ? t("projectOverview.inviteModal.submitting")
                : t("projectOverview.inviteModal.submit")}
            </span>
          </Button>
        )}
      </form.Subscribe>
    </div>
  );
};
