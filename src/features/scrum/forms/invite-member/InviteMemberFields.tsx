import type { KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  AtSignIcon,
  CircleDotIcon,
  CornerDownLeftIcon,
  Loader2Icon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { InvitableUser } from "../../types";

const AVATAR_COLORS = [
  "bg-teal-500/20 text-teal-300 border-teal-500/30",
  "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "bg-sky-500/20 text-sky-300 border-sky-500/30",
  "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
] as const;

const getAvatarColorClass = (seed: string): string => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const getInitial = (user: InvitableUser): string => {
  const source = (user.fullName || user.email).trim();
  return source ? source[0].toUpperCase() : "?";
};

type InviteMemberFieldsProps = {
  emailInput: string;
  onEmailInputChange: (value: string) => void;
  onLookupEmails: () => void;
  isLookingUp: boolean;
  pendingUsers: InvitableUser[];
  onRemoveUser: (email: string) => void;
  inputError: string | null;
  notFoundEmails: string[];
  onDismissNotFoundEmail: (email: string) => void;
};

export const InviteMemberFields = ({
  emailInput,
  onEmailInputChange,
  onLookupEmails,
  isLookingUp,
  pendingUsers,
  onRemoveUser,
  inputError,
  notFoundEmails,
  onDismissNotFoundEmail,
}: InviteMemberFieldsProps) => {
  const { t } = useTranslation();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) {
        onLookupEmails();
      }
    }
  };

  return (
    <div className="space-y-4 px-6 pb-5 pt-4">
      <div className="space-y-2">
        <div
          className={cn(
            "flex items-center gap-2.5 rounded-lg border bg-surface-inset px-3 py-2 transition-colors focus-within:border-foreground/20",
            inputError ? "border-destructive/60" : "border-border",
          )}
        >
          <AtSignIcon className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={emailInput}
            onChange={(event) => onEmailInputChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("projectOverview.inviteModal.emailPlaceholder")}
            aria-label={t("projectOverview.inviteModal.emailPlaceholder")}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          />
          <Button
            type="button"
            variant="ghost"
            disabled={isLookingUp || !emailInput.trim()}
            onClick={onLookupEmails}
            className="h-7 shrink-0 gap-1.5 rounded-md border border-border bg-surface-elevated px-2.5 text-xs font-medium text-foreground-secondary hover:bg-white/[0.08] hover:text-foreground disabled:opacity-40"
          >
            {isLookingUp ? (
              <Loader2Icon className="size-3.5 animate-spin" />
            ) : (
              <CornerDownLeftIcon className="size-3" />
            )}
            <span>{t("projectOverview.inviteModal.enterKey")}</span>
          </Button>
        </div>

        {inputError && (
          <p role="alert" className="text-xs text-destructive">
            {inputError}
          </p>
        )}
      </div>

      {(pendingUsers.length > 0 || notFoundEmails.length > 0) && (
        <div className="max-h-52 space-y-2 overflow-y-auto pr-0.5">
          {pendingUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-popover px-3 py-2.5"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                    getAvatarColorClass(user.email),
                  )}
                >
                  {getInitial(user)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-foreground">
                    {user.email}
                  </p>
                  {user.fullName && user.fullName !== user.email && (
                    <p className="truncate text-[11px] text-muted-foreground">
                      {user.fullName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className="rounded-md border border-border bg-white/[0.04] px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {t("projectOverview.inviteModal.roleMember")}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={t("projectOverview.inviteModal.removeMember", {
                    email: user.email,
                  })}
                  onClick={() => onRemoveUser(user.email)}
                  className="text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                >
                  <XIcon className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}

          {notFoundEmails.map((email) => (
            <div
              key={email}
              role="status"
              className="flex items-center justify-between gap-3 rounded-lg border border-amber-500/20 bg-popover px-3 py-2.5"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex size-6 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/15 text-xs font-semibold text-amber-300"
                >
                  {email[0]?.toUpperCase() ?? "?"}
                </span>
                <p className="truncate text-[13px] font-medium text-foreground-secondary">
                  {email}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                  {t("projectOverview.inviteModal.notFoundLabel")}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={t("projectOverview.inviteModal.removeMember", {
                    email,
                  })}
                  onClick={() => onDismissNotFoundEmail(email)}
                  className="text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                >
                  <XIcon className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-1">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-foreground-secondary">
          <CircleDotIcon className="size-3.5 text-info" />
          <span>{t("projectOverview.inviteModal.roleMember")}</span>
        </span>
      </div>
    </div>
  );
};
