import { useState } from "react";
import { DownloadIcon, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateProjectDialog } from "./CreateProjectDialog";

export const ProjectsHeader = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Projects
          </h1>
          <Badge variant="secondary" className="text-[#8a8b98]">
            5 Active
          </Badge>
        </div>
        <p className="text-[13px] text-[#8a8b98]">
          Manage workspaces, active sprints, backlog roadmaps, and engineering initiatives.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          className="inline-flex h-auto items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[13px] font-medium text-[#d4d4d8] transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          <DownloadIcon className="size-3.5" />
          Export
        </Button>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex h-auto items-center gap-1.5 rounded-lg bg-[#6366f1] px-3.5 py-1.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#5558e6]"
        >
          <PlusIcon className="size-3.5" />
          New project
        </Button>
      </div>

      <CreateProjectDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
};
