import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreatePbiForm } from "../../forms/create-pbi/CreatePbiForm";
import type { ProjectDetailResponse } from "../../types";

type CreatePbiDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectDetailResponse;
};

export const CreatePbiDialog = ({
  open,
  onOpenChange,
  project,
}: CreatePbiDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-xl border border-border bg-modal p-0 shadow-2xl ring-0 sm:max-w-2xl"
      >
        {open && (
          <CreatePbiForm
            project={project}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
