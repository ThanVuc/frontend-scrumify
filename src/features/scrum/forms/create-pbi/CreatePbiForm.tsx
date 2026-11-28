import { useTranslation } from "react-i18next";
import { CircleAlertIcon, ListChecksIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CLIENT_ERROR_CODE } from "@/shared/constants";
import { ApiError } from "@/shared/types/error";
import { ScrumModalHeader } from "../../components/ScrumModalHeader";
import type { ProjectDetailResponse } from "../../types";
import { useCreatePbiForm } from "./createPbi.form";
import { CreatePbiActions } from "./CreatePbiActions";
import { CreatePbiFields } from "./CreatePbiFields";

type CreatePbiFormProps = {
  project: ProjectDetailResponse;
  onClose: () => void;
};

export const CreatePbiForm = ({ project, onClose }: CreatePbiFormProps) => {
  const { t } = useTranslation();
  const { form, createPbiMutation, createMore, setCreateMore } =
    useCreatePbiForm({
      projectId: project.id,
      onClose,
    });

  const errorCode =
    createPbiMutation.error instanceof ApiError
      ? createPbiMutation.error.code
      : createPbiMutation.error instanceof TypeError
        ? CLIENT_ERROR_CODE.NETWORK_ERROR
        : CLIENT_ERROR_CODE.UNKNOWN_ERROR;

  const errorMessage =
    createPbiMutation.error instanceof ApiError &&
    createPbiMutation.error.message &&
    createPbiMutation.error.message !== errorCode
      ? createPbiMutation.error.message
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
        icon={<ListChecksIcon className="size-3.5 text-info" />}
        badge={
          <span className="font-mono text-xs font-medium text-foreground">
            {project.codePrefix}
          </span>
        }
        title={t("pbi.create.headerTitle")}
      />

      {createPbiMutation.isError && (
        <div className="px-6 pt-4">
          <Alert variant="destructive">
            <CircleAlertIcon />
            <AlertTitle>{t("pbi.create.errorTitle")}</AlertTitle>
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

      <CreatePbiFields form={form} project={project} />

      <CreatePbiActions
        form={form}
        createMore={createMore}
        onCreateMoreChange={setCreateMore}
      />
    </form>
  );
};
