import { useState, type FormEvent } from "react";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  HashIcon,
  LayoutGridIcon,
  PaperclipIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type CreateProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const deriveProjectKey = (projectName: string): string => {
  const words = projectName
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "PRJ";
  }

  if (words.length === 1) {
    return words[0].replace(/[^a-zA-Z0-9]/g, "").slice(0, 4).toUpperCase() || "PRJ";
  }

  const initials = words
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, "")[0])
    .filter(Boolean)
    .join("")
    .slice(0, 4)
    .toUpperCase();

  return initials || "PRJ";
};

export const CreateProjectDialog = ({
  open,
  onOpenChange,
}: CreateProjectDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [codePrefix, setCodePrefix] = useState("");
  const [isPrefixEdited, setIsPrefixEdited] = useState(false);
  const [createMore, setCreateMore] = useState(false);

  const displayKey = (isPrefixEdited ? codePrefix : deriveProjectKey(name)) || "PRJ";

  const resetForm = () => {
    setName("");
    setDescription("");
    setCodePrefix("");
    setIsPrefixEdited(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetForm();
    if (!createMore) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#16171c] p-0 shadow-2xl ring-0 sm:max-w-2xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-[#1d1e25] px-2.5 py-1">
                <LayoutGridIcon className="size-3.5 text-[#818cf8]" />
                <span className="font-mono text-xs font-medium text-white">
                  {displayKey}
                </span>
              </div>
              <ChevronRightIcon className="size-3.5 text-[#8a8b98]" />
              <DialogTitle className="text-sm font-semibold text-white">
                New project
              </DialogTitle>
            </div>

            <DialogClose
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close dialog"
                  className="text-[#8a8b98] hover:bg-white/[0.06] hover:text-white"
                />
              }
            >
              <XIcon className="size-4" />
            </DialogClose>
          </div>

          <div className="px-6 py-5">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Project name"
              aria-label="Project name"
              className="w-full bg-transparent text-lg font-semibold tracking-tight text-white outline-none placeholder:text-[#8a8b98]/60"
            />

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add a brief description of the workspace, goals, or scope..."
              aria-label="Project description"
              rows={3}
              className="mt-3 min-h-[76px] w-full resize-none bg-transparent text-sm leading-relaxed text-[#a1a1aa] outline-none placeholder:text-[#8a8b98]/50"
            />

            <div className="mt-4 border-t border-white/[0.08] pt-4">
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#1d1e25] px-3 py-1.5 text-xs">
                <HashIcon className="size-3.5 text-[#8a8b98]" />
                <span className="font-mono text-[#a1a1aa]">Key:</span>
                <input
                  type="text"
                  value={isPrefixEdited ? codePrefix : displayKey}
                  onChange={(event) => {
                    setIsPrefixEdited(true);
                    setCodePrefix(
                      event.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, "")
                        .slice(0, 6)
                    );
                  }}
                  aria-label="Project key prefix"
                  style={{ width: `${Math.max((isPrefixEdited ? codePrefix : displayKey).length, 3)}ch` }}
                  className="bg-transparent font-mono font-semibold text-[#818cf8] uppercase outline-none"
                />
                <span className="text-[#8a8b98]">
                  (Prefix for PBIs: {displayKey}-101)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.08] px-5 py-3.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Attach file"
              className="text-[#8a8b98] hover:bg-white/[0.06] hover:text-white"
            >
              <PaperclipIcon className="size-4" />
            </Button>

            <div className="flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#8a8b98] select-none">
                <span>Create more</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={createMore}
                  onClick={() => setCreateMore((prev) => !prev)}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-white/[0.08] transition-colors",
                    createMore ? "bg-[#6366f1]" : "bg-[#232429]"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block size-3.5 rounded-full bg-white transition-transform",
                      createMore ? "translate-x-4" : "translate-x-0.5"
                    )}
                  />
                </button>
              </label>

              <Button
                type="submit"
                className="inline-flex h-auto items-center gap-1.5 rounded-lg bg-[#6366f1] px-4 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#5558e6]"
              >
                <span>Create project</span>
                <ArrowRightIcon className="size-3.5" />
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
