import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "@tanstack/react-form";
import { toast } from "@/components/ui/toast";
import { ApiError } from "@/shared/types/error";
import { useInviteMembers, useLookupInvitableUsers } from "../../hooks";
import {
  inviteEmailSchema,
  inviteMembersSchema,
  type InvitableUser,
  type InviteMembersRequest,
} from "../../types";

export const parseEmailInput = (raw: string): string[] => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const token of raw.split(/[\s,]+/)) {
    const normalized = token.trim().toLowerCase();
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      result.push(normalized);
    }
  }

  return result;
};

type UseInviteMemberFormOptions = {
  projectId: string;
  projectName: string;
  onClose: () => void;
};

export const useInviteMemberForm = ({
  projectId,
  projectName,
  onClose,
}: UseInviteMemberFormOptions) => {
  const { t } = useTranslation();
  const inviteMembersMutation = useInviteMembers(projectId);
  const lookupMutation = useLookupInvitableUsers(projectId);
  const lookupInFlightRef = useRef(false);

  const [emailInput, setEmailInput] = useState("");
  const [pendingUsers, setPendingUsers] = useState<InvitableUser[]>([]);
  const [inputError, setInputError] = useState<string | null>(null);
  const [notFoundEmails, setNotFoundEmails] = useState<string[]>([]);
  const [createMore, setCreateMore] = useState(false);

  const form = useForm({
    defaultValues: {
      members: [] as string[],
    } as InviteMembersRequest,

    validators: {
      onSubmit: inviteMembersSchema,
    },

    onSubmit: async ({ value, formApi }) => {
      try {
        await inviteMembersMutation.mutateAsync(value);
        toast.add({
          title: t("projectOverview.inviteModal.successTitle"),
          description: t("projectOverview.inviteModal.successDescription", {
            count: value.members.length,
            project: projectName,
          }),
          type: "success",
        });

        formApi.reset();
        setPendingUsers([]);
        setEmailInput("");
        setInputError(null);
        setNotFoundEmails([]);
        inviteMembersMutation.reset();

        if (!createMore) {
          onClose();
        }
      } catch {
        // Error state is handled via inviteMembersMutation.error
      }
    },
  });

  const handleEmailInputChange = (value: string) => {
    setEmailInput(value);
    if (inputError) {
      setInputError(null);
    }
  };

  const mergeNotFoundEmails = (
    emailsToAdd: string[],
    emailsToExclude: Set<string> = new Set(),
  ) => {
    setNotFoundEmails((prev) => {
      const seen = new Set<string>();
      const merged: string[] = [];

      for (const email of [...prev, ...emailsToAdd]) {
        const normalized = email.toLowerCase();
        if (!emailsToExclude.has(normalized) && !seen.has(normalized)) {
          seen.add(normalized);
          merged.push(email);
        }
      }

      return merged;
    });
  };

  const handleLookupEmails = async () => {
    if (lookupInFlightRef.current || lookupMutation.isPending) {
      return;
    }

    const tokens = parseEmailInput(emailInput);
    if (tokens.length === 0) {
      return;
    }

    const invalidEmails: string[] = [];
    const validEmails: string[] = [];

    for (const token of tokens) {
      const parsed = inviteEmailSchema.safeParse(token);
      if (parsed.success) {
        validEmails.push(parsed.data);
      } else {
        invalidEmails.push(token);
      }
    }

    if (invalidEmails.length > 0) {
      setInputError(
        t("projectOverview.inviteModal.invalidEmailError", {
          emails: invalidEmails.join(", "),
        }),
      );
      return;
    }

    const existingEmails = new Set(
      pendingUsers.map((user) => user.email.toLowerCase()),
    );
    const newValidEmails = validEmails.filter(
      (email) => !existingEmails.has(email.toLowerCase()),
    );

    if (newValidEmails.length === 0) {
      setEmailInput("");
      setInputError(t("projectOverview.inviteModal.alreadyAddedInfo"));
      return;
    }

    setInputError(null);
    lookupInFlightRef.current = true;

    try {
      const response = await lookupMutation.mutateAsync(newValidEmails);
      const returnedUsers = response.items;

      if (returnedUsers.length > 0) {
        const mergedUsers = [...pendingUsers];
        const mergedSet = new Set(existingEmails);

        for (const user of returnedUsers) {
          const normalized = user.email.toLowerCase();
          if (!mergedSet.has(normalized)) {
            mergedSet.add(normalized);
            mergedUsers.push(user);
          }
        }

        setPendingUsers(mergedUsers);
        form.setFieldValue(
          "members",
          mergedUsers.map((user) => user.email),
        );
      }

      const returnedEmailSet = new Set(
        returnedUsers.map((user) => user.email.toLowerCase()),
      );
      const missingEmails = newValidEmails.filter(
        (email) => !returnedEmailSet.has(email.toLowerCase()),
      );

      mergeNotFoundEmails(missingEmails, returnedEmailSet);
      setEmailInput("");
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        mergeNotFoundEmails(newValidEmails);
        setEmailInput("");
        return;
      }

      const message =
        error instanceof ApiError && error.message
          ? error.message
          : t("projectOverview.inviteModal.lookupError");
      setInputError(message);
    } finally {
      lookupInFlightRef.current = false;
    }
  };

  const handleRemoveUser = (email: string) => {
    const normalized = email.toLowerCase();
    const updatedUsers = pendingUsers.filter(
      (user) => user.email.toLowerCase() !== normalized,
    );
    setPendingUsers(updatedUsers);
    form.setFieldValue(
      "members",
      updatedUsers.map((user) => user.email),
    );
  };

  const handleDismissNotFoundEmail = (email: string) => {
    const normalized = email.toLowerCase();
    setNotFoundEmails((prev) =>
      prev.filter((item) => item.toLowerCase() !== normalized),
    );
  };

  return {
    form,
    inviteMembersMutation,
    isLookingUp: lookupMutation.isPending,
    emailInput,
    onEmailInputChange: handleEmailInputChange,
    onLookupEmails: handleLookupEmails,
    pendingUsers,
    onRemoveUser: handleRemoveUser,
    inputError,
    notFoundEmails,
    onDismissNotFoundEmail: handleDismissNotFoundEmail,
    createMore,
    setCreateMore,
  };
};

export type InviteMemberForm = ReturnType<typeof useInviteMemberForm>["form"];
