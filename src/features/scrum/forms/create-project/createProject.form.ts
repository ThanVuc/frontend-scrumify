import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "@tanstack/react-form";
import { toast } from "@/components/ui/toast";
import { useCreateProject } from "../../hooks";
import { createProjectSchema, type CreateProjectRequest } from "../../types";

export const deriveProjectKey = (projectName: string): string => {
  const words = projectName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "D")
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean);

  if (words.length === 0) {
    return "";
  }

  if (words.length === 1) {
    return words[0].slice(0, 4).toUpperCase();
  }

  return words
    .map((word) => word[0])
    .join("")
    .slice(0, 4)
    .toUpperCase();
};

type UseCreateProjectFormOptions = {
  onClose: () => void;
};

export const useCreateProjectForm = ({
  onClose,
}: UseCreateProjectFormOptions) => {
  const { t } = useTranslation();
  const createProjectMutation = useCreateProject();
  const [isPrefixEdited, setIsPrefixEdited] = useState(false);
  const [createMore, setCreateMore] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      codePrefix: "",
      description: "",
    } satisfies CreateProjectRequest,

    validators: {
      onSubmit: createProjectSchema,
    },

    onSubmit: async ({ value, formApi }) => {
      try {
        const created = await createProjectMutation.mutateAsync(value);
        toast.add({
          title: t("projects.create.successTitle"),
          description: t("projects.create.successDescription", {
            name: created.name,
            codePrefix: created.codePrefix,
          }),
          type: "success",
        });
        formApi.reset();
        setIsPrefixEdited(false);
        createProjectMutation.reset();

        if (!createMore) {
          onClose();
        }
      } catch {
        // Error state is handled via createProjectMutation.error
      }
    },
  });

  return {
    form,
    createProjectMutation,
    isPrefixEdited,
    setIsPrefixEdited,
    createMore,
    setCreateMore,
  };
};

export type CreateProjectForm = ReturnType<typeof useCreateProjectForm>["form"];
