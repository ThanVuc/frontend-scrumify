import type { BacklogQuery } from "../types/pbi.types";

export const PBI_STATUS = {
  TODO: "TODO",
  INPROGRESS: "INPROGRESS",
  INREVIEW: "INREVIEW",
  DONE: "DONE",
} as const;

export const PBI_TYPE = {
  FEATURE: "feature",
  BUG: "bug",
  TECHNICAL: "technical",
} as const;

export const PBI_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  HIGHEST: "HIGHEST",
} as const;

export const PROJECT_STAT_ICON = {
  PROJECTS: "projects",
  PBIS: "pbis",
  CONTRIBUTORS: "contributors",
} as const;

export const SCRUM_QUERY_KEYS = {
  projects: ["projects"] as const,
  projectDetail: (projectId: string | undefined) =>
    ["projects", projectId] as const,
  projectPbisRoot: (projectId: string | undefined) =>
    ["projects", projectId, "pbis"] as const,
  projectPbis: (projectId: string | undefined, query?: BacklogQuery) =>
    ["projects", projectId, "pbis", query] as const,
  pbiDetail: (pbiId: string | undefined) => ["pbis", pbiId] as const,
};
