import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateProjectForm } from "../../forms/create-project/CreateProjectForm";

type CreateProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateProjectDialog = ({
  open,
  onOpenChange,
}: CreateProjectDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-xl border border-border bg-modal p-0 shadow-2xl ring-0 sm:max-w-2xl"
      >
        {open && (
          <CreateProjectForm onClose={() => onOpenChange(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
};
