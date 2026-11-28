import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2Icon } from "lucide-react";
import type { PbiResponse, UpdatePbiRequest } from "../../../types";

type PbiInlineContentProps = {
  pbi: PbiResponse;
  isUpdating: boolean;
  onUpdate: (data: UpdatePbiRequest) => Promise<void>;
};

export const PbiInlineContent = ({
  pbi,
  isUpdating,
  onUpdate,
}: PbiInlineContentProps) => {
  const { t } = useTranslation();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(pbi.title);
  const titleCancelledRef = useRef(false);

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [descriptionDraft, setDescriptionDraft] = useState(
    pbi.description ?? "",
  );
  const descriptionCancelledRef = useRef(false);

  const startEditingTitle = () => {
    titleCancelledRef.current = false;
    setTitleDraft(pbi.title);
    setIsEditingTitle(true);
  };

  const commitTitle = async () => {
    if (titleCancelledRef.current) {
      titleCancelledRef.current = false;
      setIsEditingTitle(false);
      return;
    }

    const trimmed = titleDraft.trim();
    setIsEditingTitle(false);

    if (!trimmed || trimmed === pbi.title) {
      return;
    }

    await onUpdate({ title: trimmed });
  };

  const startEditingDescription = () => {
    descriptionCancelledRef.current = false;
    setDescriptionDraft(pbi.description ?? "");
    setIsEditingDescription(true);
  };

  const commitDescription = async () => {
    if (descriptionCancelledRef.current) {
      descriptionCancelledRef.current = false;
      setIsEditingDescription(false);
      return;
    }

    const current = pbi.description ?? "";
    setIsEditingDescription(false);

    if (descriptionDraft === current) {
      return;
    }

    await onUpdate({ description: descriptionDraft });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        {isEditingTitle ? (
          <input
            type="text"
            autoFocus
            maxLength={256}
            value={titleDraft}
            onChange={(event) => setTitleDraft(event.target.value)}
            onBlur={commitTitle}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                event.currentTarget.blur();
              } else if (event.key === "Escape") {
                event.preventDefault();
                titleCancelledRef.current = true;
                setIsEditingTitle(false);
              }
            }}
            aria-label={t("pbi.create.titleLabel")}
            className="w-full rounded-lg border border-border bg-surface-inset px-2.5 py-1 text-xl font-semibold tracking-tight text-foreground outline-none focus:border-foreground/25"
          />
        ) : (
          <button
            type="button"
            onClick={startEditingTitle}
            title={t("pbi.detail.clickToEdit")}
            className="-mx-2 w-full cursor-text rounded-lg px-2 py-1 text-left text-xl font-semibold tracking-tight text-foreground transition-colors hover:bg-white/[0.04]"
          >
            {pbi.title}
          </button>
        )}

        {isUpdating && (
          <span className="mt-2 inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
            <Loader2Icon className="size-3.5 animate-spin" />
            <span>{t("pbi.detail.saving")}</span>
          </span>
        )}
      </div>

      {isEditingDescription ? (
        <div className="space-y-1.5">
          <textarea
            autoFocus
            rows={5}
            value={descriptionDraft}
            onChange={(event) => setDescriptionDraft(event.target.value)}
            onBlur={commitDescription}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                (event.ctrlKey || event.metaKey)
              ) {
                event.preventDefault();
                event.currentTarget.blur();
              } else if (event.key === "Escape") {
                event.preventDefault();
                descriptionCancelledRef.current = true;
                setIsEditingDescription(false);
              }
            }}
            placeholder={t("pbi.detail.descriptionPlaceholder")}
            aria-label={t("pbi.create.descriptionLabel")}
            className="min-h-[120px] w-full resize-y rounded-lg border border-border bg-surface-inset px-3 py-2.5 text-sm leading-relaxed text-foreground-secondary outline-none placeholder:text-muted-foreground/60 focus:border-foreground/25"
          />
          <p className="text-[11px] text-muted-foreground">
            {t("pbi.detail.descriptionEditHint")}
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={startEditingDescription}
          title={t("pbi.detail.clickToEdit")}
          className="-mx-2.5 block w-full cursor-text rounded-lg px-2.5 py-2 text-left text-sm leading-relaxed transition-colors hover:bg-white/[0.04]"
        >
          {pbi.description ? (
            <span className="whitespace-pre-wrap text-foreground-secondary">
              {pbi.description}
            </span>
          ) : (
            <span className="text-muted-foreground/70">
              {t("pbi.detail.descriptionPlaceholder")}
            </span>
          )}
        </button>
      )}
    </div>
  );
};
