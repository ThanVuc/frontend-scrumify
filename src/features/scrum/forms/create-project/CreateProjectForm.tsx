import { useTranslation } from "react-i18next";
import { CircleAlertIcon, LayoutGridIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CLIENT_ERROR_CODE } from "@/shared/constants";
import { ApiError } from "@/shared/types/error";
import { ScrumModalHeader } from "../../components/ScrumModalHeader";
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
        ? CLIENT_ERROR_CODE.NETWORK_ERROR
        : CLIENT_ERROR_CODE.UNKNOWN_ERROR;

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
      <ScrumModalHeader
        icon={<LayoutGridIcon className="size-3.5 text-info" />}
        badge={
          <form.Subscribe selector={(state) => state.values.codePrefix}>
            {(codePrefix) => (
              <span className="font-mono text-xs font-medium text-foreground">
                {codePrefix || "PRJ"}
              </span>
            )}
          </form.Subscribe>
        }
        title={t("projects.create.title")}
      />

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
