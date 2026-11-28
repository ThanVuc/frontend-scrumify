import { useTranslation } from "react-i18next";
import {
  CalendarIcon,
  CircleDashedIcon,
  GaugeIcon,
  LayersIcon,
  SignalHighIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  PBI_PRIORITY_OPTIONS,
  PBI_TYPE_OPTIONS,
  PbiTypeIcon,
} from "../../components/pbi/PbiMetadataBadges";
import type { ProjectDetailResponse } from "../../types";
import type { CreatePbiForm } from "./createPbi.form";

type CreatePbiFieldsProps = {
  form: CreatePbiForm;
  project?: ProjectDetailResponse;
};

export const CreatePbiFields = ({ form, project }: CreatePbiFieldsProps) => {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-5">
      <form.Field
        name="title"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name} className="sr-only">
                {t("pbi.create.titleLabel")}
              </FieldLabel>

              <input
                id={field.name}
                name={field.name}
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder={t("pbi.create.titlePlaceholder")}
                aria-label={t("pbi.create.titleLabel")}
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
                {t("pbi.create.descriptionLabel")}
              </FieldLabel>

              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder={t("pbi.create.descriptionPlaceholder")}
                aria-label={t("pbi.create.descriptionLabel")}
                rows={4}
                className="min-h-[92px] w-full resize-none bg-transparent text-sm leading-relaxed text-foreground-subtle outline-none placeholder:text-muted-foreground/50"
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

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-foreground-secondary">
          <CircleDashedIcon className="size-3.5 text-muted-foreground" />
          <span>{t("pbi.status.TODO")}</span>
        </span>

        <form.Field
          name="type"
          children={(field) => (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-foreground-secondary transition-colors hover:bg-white/[0.08] hover:text-foreground"
                  />
                }
              >
                <PbiTypeIcon type={field.state.value} />
                <span>{t(`pbi.type.${field.state.value}`)}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-40 rounded-xl border border-border bg-popover p-1 shadow-xl"
              >
                {PBI_TYPE_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => field.handleChange(option)}
                    className="gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
                  >
                    <PbiTypeIcon type={option} />
                    <span>{t(`pbi.type.${option}`)}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        />

        <form.Field
          name="priority"
          children={(field) => (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-foreground-secondary transition-colors hover:bg-white/[0.08] hover:text-foreground"
                  />
                }
              >
                <SignalHighIcon className="size-3.5 text-muted-foreground" />
                <span>{t(`pbi.priority.${field.state.value}`)}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-40 rounded-xl border border-border bg-popover p-1 shadow-xl"
              >
                {PBI_PRIORITY_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => field.handleChange(option)}
                    className="gap-2 rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
                  >
                    <span>{t(`pbi.priority.${option}`)}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        />

        <form.Field
          name="storyPoints"
          children={(field) => (
            <label className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-foreground-secondary">
              <GaugeIcon className="size-3.5 text-muted-foreground" />
              <input
                type="number"
                min={0}
                step={1}
                value={field.state.value ?? ""}
                onChange={(event) => {
                  const raw = event.target.value;
                  if (raw === "") {
                    field.handleChange(null);
                    return;
                  }
                  const parsed = Number.parseInt(raw, 10);
                  if (!Number.isNaN(parsed) && parsed >= 0) {
                    field.handleChange(parsed);
                  }
                }}
                placeholder="0"
                aria-label={t("pbi.fields.storyPoints")}
                className="w-9 bg-transparent text-center font-mono text-xs text-foreground outline-none placeholder:text-muted-foreground/60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-muted-foreground">
                {t("pbi.create.pointsSuffix")}
              </span>
            </label>
          )}
        />

        <form.Field
          name="sprintId"
          children={(field) => {
            const activeSprint = project?.activeSprint ?? null;
            const selectedSprintName =
              field.state.value && activeSprint?.id === field.state.value
                ? activeSprint.name
                : t("pbi.fields.noSprint");

            return (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-foreground-secondary transition-colors hover:bg-white/[0.08] hover:text-foreground"
                    />
                  }
                >
                  <CalendarIcon className="size-3.5 text-muted-foreground" />
                  <span>{selectedSprintName}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-48 rounded-xl border border-border bg-popover p-1 shadow-xl"
                >
                  <DropdownMenuItem
                    onClick={() => field.handleChange(null)}
                    className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
                  >
                    {t("pbi.fields.noSprint")}
                  </DropdownMenuItem>
                  {activeSprint && (
                    <DropdownMenuItem
                      onClick={() => field.handleChange(activeSprint.id)}
                      className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
                    >
                      {activeSprint.name}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }}
        />

        <form.Field
          name="epicId"
          children={(field) => (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-foreground-secondary transition-colors hover:bg-white/[0.08] hover:text-foreground"
                  />
                }
              >
                <LayersIcon className="size-3.5 text-muted-foreground" />
                <span>
                  {field.state.value ? field.state.value : t("pbi.fields.noEpic")}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-44 rounded-xl border border-border bg-popover p-1 shadow-xl"
              >
                <DropdownMenuItem
                  onClick={() => field.handleChange(null)}
                  className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-secondary focus:bg-white/[0.06] focus:text-foreground"
                >
                  {t("pbi.fields.noEpic")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        />
      </div>
    </div>
  );
};
