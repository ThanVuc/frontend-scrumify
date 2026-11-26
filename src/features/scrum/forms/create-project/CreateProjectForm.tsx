import { useTranslation } from "react-i18next";
import {
  ChevronRightIcon,
  CircleAlertIcon,
  LayoutGridIcon,
  XIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";
import { ApiError } from "@/shared/types/error";
import { useCreateProjectForm } from "./createProject.form";
import { CreateProjectActions } from "./CreateProjectActions";
import { CreateProjectFields } from "./CreateProjectFields";

type CreateProjectFormProps = {
  onClose: () => void;
};

export const CreateProjectForm = ({ onClose }: CreateProjectFormProps) => {
  const { t } = useTranslation();
  const {
    form,
    createProjectMutation,
    isPrefixEdited,
    setIsPrefixEdited,
    createMore,
    setCreateMore,
  } = useCreateProjectForm({ onClose });

  const errorCode =
    createProjectMutation.error instanceof ApiError
      ? createProjectMutation.error.code
      : createProjectMutation.error instanceof TypeError
        ? "NETWORK_ERROR"
        : "UNKNOWN_ERROR";

  const errorMessage =
    createProjectMutation.error instanceof ApiError &&
    createProjectMutation.error.message &&
    createProjectMutation.error.message !== errorCode
      ? createProjectMutation.error.message
      : null;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-[#1d1e25] px-2.5 py-1">
            <LayoutGridIcon className="size-3.5 text-[#818cf8]" />
            <form.Subscribe selector={(state) => state.values.codePrefix}>
              {(codePrefix) => (
                <span className="font-mono text-xs font-medium text-white">
                  {codePrefix || "PRJ"}
                </span>
              )}
            </form.Subscribe>
          </div>
          <ChevronRightIcon className="size-3.5 text-[#8a8b98]" />
          <DialogTitle className="text-sm font-semibold text-white">
            {t("projects.create.title")}
          </DialogTitle>
        </div>

        <DialogClose
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={t("common.close")}
              className="text-[#8a8b98] hover:bg-white/[0.06] hover:text-white"
            />
          }
        >
          <XIcon className="size-4" />
        </DialogClose>
      </div>

      {createProjectMutation.isError && (
        <div className="px-6 pt-4">
          <Alert variant="destructive">
            <CircleAlertIcon />
            <AlertTitle>{t("projects.create.errorTitle")}</AlertTitle>
            <AlertDescription>
              {errorMessage && <p>{errorMessage}</p>}
              <p>
                {t("projects.errorCodeLabel")}{" "}
                <span className="break-all font-mono font-medium">
                  {errorCode}
                </span>
              </p>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <CreateProjectFields
        form={form}
        isPrefixEdited={isPrefixEdited}
        onPrefixEditedChange={setIsPrefixEdited}
      />

      <CreateProjectActions
        form={form}
        createMore={createMore}
        onCreateMoreChange={setCreateMore}
      />
    </form>
  );
};
