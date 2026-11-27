import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InviteMemberForm } from "../../forms/invite-member/InviteMemberForm";
import type { ProjectDetailResponse } from "../../types";

type InviteMemberDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectDetailResponse;
};

export const InviteMemberDialog = ({
  open,
  onOpenChange,
  project,
}: InviteMemberDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-xl border border-border bg-modal p-0 shadow-2xl ring-0 sm:max-w-xl"
      >
        {open && (
          <InviteMemberForm
            project={project}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
