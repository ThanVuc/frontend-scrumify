import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";

type ScrumModalHeaderProps = {
  icon: ReactNode;
  badge: ReactNode;
  title: string;
};

export const ScrumModalHeader = ({
  icon,
  badge,
  title,
}: ScrumModalHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
      <div className="flex items-center gap-2.5">
        <div className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-elevated px-2.5 py-1">
          {icon}
          {badge}
        </div>
        <ChevronRightIcon className="size-3.5 text-muted-foreground" />
        <DialogTitle className="text-sm font-semibold text-foreground">
          {title}
        </DialogTitle>
      </div>

      <DialogClose
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={t("common.close")}
            className="text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
          />
        }
      >
        <XIcon className="size-4" />
      </DialogClose>
    </div>
  );
};
