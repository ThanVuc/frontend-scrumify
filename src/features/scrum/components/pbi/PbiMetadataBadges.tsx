import { useTranslation } from "react-i18next";
import {
  BookmarkIcon,
  BugIcon,
  CheckCircle2Icon,
  CircleDashedIcon,
  CircleDotIcon,
  ClockIcon,
  WrenchIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PBI_PRIORITY,
  PBI_STATUS,
  PBI_TYPE,
  type PbiPriority,
  type PbiStatus,
  type PbiType,
} from "../../types";

export const PBI_STATUS_OPTIONS: readonly PbiStatus[] = Object.values(PBI_STATUS);

export const PBI_TYPE_OPTIONS: readonly PbiType[] = Object.values(PBI_TYPE);

export const PBI_PRIORITY_OPTIONS: readonly PbiPriority[] =
  Object.values(PBI_PRIORITY);

export const normalizePbiStatus = (status: string): PbiStatus => {
  const upper = status.replace(/[\s_-]/g, "").toUpperCase();
  if (upper === PBI_STATUS.INPROGRESS) return PBI_STATUS.INPROGRESS;
  if (upper === PBI_STATUS.INREVIEW) return PBI_STATUS.INREVIEW;
  if (upper === PBI_STATUS.DONE) return PBI_STATUS.DONE;
  return PBI_STATUS.TODO;
};

export const normalizePbiPriority = (priority: string | number): PbiPriority => {
  if (typeof priority === "number") {
    if (priority >= 4) return PBI_PRIORITY.HIGHEST;
    if (priority === 3) return PBI_PRIORITY.HIGH;
    if (priority === 2) return PBI_PRIORITY.MEDIUM;
    return PBI_PRIORITY.LOW;
  }
  const upper = priority.trim().toUpperCase();
  if (upper === PBI_PRIORITY.HIGHEST || upper === "CRITICAL") {
    return PBI_PRIORITY.HIGHEST;
  }
  if (upper === PBI_PRIORITY.HIGH) return PBI_PRIORITY.HIGH;
  if (upper === PBI_PRIORITY.MEDIUM) return PBI_PRIORITY.MEDIUM;
  return PBI_PRIORITY.LOW;
};

export const normalizePbiType = (type: string): PbiType => {
  const lower = type.trim().toLowerCase();
  if (lower === PBI_TYPE.BUG) return PBI_TYPE.BUG;
  if (lower === PBI_TYPE.TECHNICAL) return PBI_TYPE.TECHNICAL;
  return PBI_TYPE.FEATURE;
};

const STATUS_STYLE_MAP = {
  TODO: {
    badge: "border-border bg-white/[0.04] text-muted-foreground",
    dot: "bg-muted-foreground",
    labelKey: "pbi.status.TODO",
  },
  INPROGRESS: {
    badge: "border-sky-500/30 bg-sky-500/10 text-sky-400",
    dot: "bg-sky-400",
    labelKey: "pbi.status.INPROGRESS",
  },
  INREVIEW: {
    badge: "border-violet-500/30 bg-violet-500/10 text-violet-400",
    dot: "bg-violet-400",
    labelKey: "pbi.status.INREVIEW",
  },
  DONE: {
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400",
    labelKey: "pbi.status.DONE",
  },
} as const satisfies Record<PbiStatus, { badge: string; dot: string; labelKey: string }>;

const PRIORITY_STYLE_MAP = {
  LOW: {
    badge: "border-border bg-white/[0.04] text-muted-foreground",
    dot: "bg-muted-foreground",
    labelKey: "pbi.priority.LOW",
  },
  MEDIUM: {
    badge: "border-sky-500/30 bg-sky-500/10 text-sky-400",
    dot: "bg-sky-400",
    labelKey: "pbi.priority.MEDIUM",
  },
  HIGH: {
    badge: "border-rose-500/30 bg-rose-500/10 text-rose-400",
    dot: "bg-rose-400",
    labelKey: "pbi.priority.HIGH",
  },
  HIGHEST: {
    badge: "border-red-500/30 bg-red-500/10 text-red-400",
    dot: "bg-red-400",
    labelKey: "pbi.priority.HIGHEST",
  },
} as const satisfies Record<PbiPriority, { badge: string; dot: string; labelKey: string }>;

const TYPE_STYLE_MAP = {
  feature: {
    badge: "border-indigo-500/30 bg-indigo-500/10 text-info",
    dot: "bg-info",
    labelKey: "pbi.type.feature",
  },
  bug: {
    badge: "border-rose-500/30 bg-rose-500/10 text-rose-400",
    dot: "bg-rose-400",
    labelKey: "pbi.type.bug",
  },
  technical: {
    badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    dot: "bg-cyan-400",
    labelKey: "pbi.type.technical",
  },
} as const satisfies Record<PbiType, { badge: string; dot: string; labelKey: string }>;

export const PbiStatusIcon = ({
  status,
  className,
}: {
  status: string;
  className?: string;
}) => {
  const normalized = normalizePbiStatus(status);
  if (normalized === "INPROGRESS") {
    return <ClockIcon className={cn("size-3.5 text-sky-400", className)} />;
  }
  if (normalized === "INREVIEW") {
    return (
      <CircleDotIcon className={cn("size-3.5 text-violet-400", className)} />
    );
  }
  if (normalized === "DONE") {
    return (
      <CheckCircle2Icon
        className={cn("size-3.5 text-emerald-400", className)}
      />
    );
  }
  return (
    <CircleDashedIcon
      className={cn("size-3.5 text-muted-foreground", className)}
    />
  );
};

export const PbiTypeIcon = ({
  type,
  className,
}: {
  type: string;
  className?: string;
}) => {
  const normalized = normalizePbiType(type);
  if (normalized === "bug") {
    return <BugIcon className={cn("size-3.5 text-rose-400", className)} />;
  }
  if (normalized === "technical") {
    return <WrenchIcon className={cn("size-3.5 text-cyan-400", className)} />;
  }
  return <BookmarkIcon className={cn("size-3.5 text-info", className)} />;
};

export const PbiStatusBadge = ({ status }: { status: string }) => {
  const { t } = useTranslation();
  const normalized = normalizePbiStatus(status);
  const style = STATUS_STYLE_MAP[normalized];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
        style.badge,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", style.dot)} />
      {t(style.labelKey)}
    </span>
  );
};

export const PbiPriorityBadge = ({
  priority,
}: {
  priority: string | number;
}) => {
  const { t } = useTranslation();
  const normalized = normalizePbiPriority(priority);
  const style = PRIORITY_STYLE_MAP[normalized];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
        style.badge,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", style.dot)} />
      {t(style.labelKey)}
    </span>
  );
};

export const PbiTypeBadge = ({ type }: { type: string }) => {
  const { t } = useTranslation();
  const normalized = normalizePbiType(type);
  const style = TYPE_STYLE_MAP[normalized];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
        style.badge,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", style.dot)} />
      {t(style.labelKey)}
    </span>
  );
};
