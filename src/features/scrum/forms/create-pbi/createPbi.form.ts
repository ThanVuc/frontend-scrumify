import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "@tanstack/react-form";
import { toast } from "@/components/ui/toast";
import { useCreatePbi } from "../../hooks";
import {
  PBI_PRIORITY,
  PBI_TYPE,
  createPbiSchema,
  type CreatePbiRequest,
} from "../../types";

type UseCreatePbiFormOptions = {
  projectId: string;
  onClose: () => void;
};

export const useCreatePbiForm = ({
  projectId,
  onClose,
}: UseCreatePbiFormOptions) => {
  const { t } = useTranslation();
  const createPbiMutation = useCreatePbi(projectId);
  const [createMore, setCreateMore] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: PBI_TYPE.FEATURE,
      priority: PBI_PRIORITY.MEDIUM,
      storyPoints: null,
      epicId: null,
      sprintId: null,
    } as CreatePbiRequest,

    validators: {
      onSubmit: createPbiSchema,
    },

    onSubmit: async ({ value, formApi }) => {
      try {
        const created = await createPbiMutation.mutateAsync(value);
        toast.add({
          title: t("pbi.create.successTitle"),
          description: t("pbi.create.successDescription", {
            code: created.code,
            title: created.title,
          }),
          type: "success",
        });
        formApi.reset();
        createPbiMutation.reset();

        if (!createMore) {
          onClose();
        }
      } catch {
        // Error state is handled via createPbiMutation.error
      }
    },
  });

  return {
    form,
    createPbiMutation,
    createMore,
    setCreateMore,
  };
};

export type CreatePbiForm = ReturnType<typeof useCreatePbiForm>["form"];
