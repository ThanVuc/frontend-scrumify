import { useTranslation } from "react-i18next";
import { CircleAlertIcon, UsersIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ApiError } from "@/shared/types/error";
import { ScrumModalHeader } from "../../components/ScrumModalHeader";
import type { ProjectDetailResponse } from "../../types";
import { useInviteMemberForm } from "./inviteMember.form";
import { InviteMemberActions } from "./InviteMemberActions";
import { InviteMemberFields } from "./InviteMemberFields";

type InviteMemberFormProps = {
  project: ProjectDetailResponse;
  onClose: () => void;
};

export const InviteMemberForm = ({
  project,
  onClose,
}: InviteMemberFormProps) => {
  const { t } = useTranslation();
  const {
    form,
    inviteMembersMutation,
    isLookingUp,
    emailInput,
    onEmailInputChange,
    onLookupEmails,
    pendingUsers,
    onRemoveUser,
    inputError,
    notFoundEmails,
    onDismissNotFoundEmail,
    createMore,
    setCreateMore,
  } = useInviteMemberForm({
    projectId: project.id,
    projectName: project.name,
    onClose,
  });

  const errorCode =
    inviteMembersMutation.error instanceof ApiError
      ? inviteMembersMutation.error.code
      : inviteMembersMutation.error instanceof TypeError
        ? "NETWORK_ERROR"
        : "UNKNOWN_ERROR";

  const errorMessage =
    inviteMembersMutation.error instanceof ApiError &&
    inviteMembersMutation.error.message &&
    inviteMembersMutation.error.message !== errorCode
      ? inviteMembersMutation.error.message
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
        icon={<UsersIcon className="size-3.5 text-info" />}
        badge={
          <span className="font-mono text-xs font-medium text-foreground">
            {project.codePrefix}
          </span>
        }
        title={t("projectOverview.inviteModal.headerTitle")}
      />

      <div className="px-6 pt-5">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {t("projectOverview.inviteModal.title", { name: project.name })}
        </h2>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          {t("projectOverview.inviteModal.subtitle")}
        </p>
      </div>

      {inviteMembersMutation.isError && (
        <div className="px-6 pt-4">
          <Alert variant="destructive">
            <CircleAlertIcon />
            <AlertTitle>{t("projectOverview.inviteModal.errorTitle")}</AlertTitle>
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

      <InviteMemberFields
        emailInput={emailInput}
        onEmailInputChange={onEmailInputChange}
        onLookupEmails={onLookupEmails}
        isLookingUp={isLookingUp}
        pendingUsers={pendingUsers}
        onRemoveUser={onRemoveUser}
        inputError={inputError}
        notFoundEmails={notFoundEmails}
        onDismissNotFoundEmail={onDismissNotFoundEmail}
      />

      <InviteMemberActions
        form={form}
        isLookingUp={isLookingUp}
        createMore={createMore}
        onCreateMoreChange={setCreateMore}
      />
    </form>
  );
};
