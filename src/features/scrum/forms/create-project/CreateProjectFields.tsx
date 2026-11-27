import { useTranslation } from "react-i18next";
import { HashIcon } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  deriveProjectKey,
  type CreateProjectForm,
} from "./createProject.form";

type CreateProjectFieldsProps = {
  form: CreateProjectForm;
  isPrefixEdited: boolean;
  onPrefixEditedChange: (edited: boolean) => void;
};

export const CreateProjectFields = ({
  form,
  isPrefixEdited,
  onPrefixEditedChange,
}: CreateProjectFieldsProps) => {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-5">
      <form.Field
        name="name"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name} className="sr-only">
                {t("projects.create.nameLabel")}
              </FieldLabel>

              <input
                id={field.name}
                name={field.name}
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  const nextName = event.target.value;
                  field.handleChange(nextName);
                  if (!isPrefixEdited) {
                    form.setFieldValue("codePrefix", deriveProjectKey(nextName));
                  }
                }}
                placeholder={t("projects.create.namePlaceholder")}
                aria-label={t("projects.create.nameLabel")}
                className="w-full bg-transparent text-lg font-semibold tracking-tight text-foreground outline-none placeholder:text-muted-foreground/60"
              />

              {isInvalid && (
                <FieldError
                  errors={field.state.meta.errors}
                  className="text-xs"
                />
              )}
            </Field>
          );
        }}
      />

      <form.Field
        name="description"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid} className="mt-3">
              <FieldLabel htmlFor={field.name} className="sr-only">
                {t("projects.create.descriptionLabel")}
              </FieldLabel>

              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder={t("projects.create.descriptionPlaceholder")}
                aria-label={t("projects.create.descriptionLabel")}
                rows={3}
                className="min-h-[76px] w-full resize-none bg-transparent text-sm leading-relaxed text-foreground-subtle outline-none placeholder:text-muted-foreground/50"
              />

              {isInvalid && (
                <FieldError
                  errors={field.state.meta.errors}
                  className="text-xs"
                />
              )}
            </Field>
          );
        }}
      />

      <div className="mt-4 border-t border-border pt-4">
        <form.Field
          name="codePrefix"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const previewPrefix = field.state.value || "PRJ";

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className="sr-only">
                  {t("projects.create.keyPrefix")}
                </FieldLabel>

                <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs">
                  <HashIcon className="size-3.5 text-muted-foreground" />
                  <span className="font-mono text-foreground-subtle">
                    {t("projects.create.keyLabel")}
                  </span>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      onPrefixEditedChange(true);
                      field.handleChange(
                        event.target.value
                          .toUpperCase()
                          .replace(/[^A-Z0-9]/g, "")
                          .slice(0, 7),
                      );
                    }}
                    placeholder="PRJ"
                    aria-label={t("projects.create.keyPrefix")}
                    style={{
                      width: `${Math.max(previewPrefix.length, 3)}ch`,
                    }}
                    className="bg-transparent font-mono font-semibold text-info uppercase outline-none placeholder:text-info/40"
                  />
                  <span className="text-muted-foreground">
                    {t("projects.create.keyHint", { prefix: previewPrefix })}
                  </span>
                </div>

                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors}
                    className="text-xs"
                  />
                )}
              </Field>
            );
          }}
        />
      </div>
    </div>
  );
};
