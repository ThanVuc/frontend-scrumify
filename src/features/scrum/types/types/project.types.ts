import type { z } from "zod";
import type { createProjectSchema } from "../schema/createProject.schema";

export type CreateProjectRequest = z.infer<typeof createProjectSchema>;

export interface ProjectResponse {
  id: string;
  createdBy: string;
  name: string;
  codePrefix: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MemberSummary {
  id: string;
  userId: string;
  name: string;
}

export interface ActiveSprintSummary {
  id: string;
  name: string;
  end: string | null;
}

export interface ProjectListItem {
  id: string;
  name: string;
  description?: string | null;
  members: MemberSummary[];
  activeSprint: ActiveSprintSummary | null;
  activePBIsCount: number;
  totalPBIsCount: number;
}

export interface ProjectListResponse {
  items: ProjectListItem[];
}

export interface MemberDetail {
  id: string;
  userId: string;
  name: string;
  role: string;
}

export interface ActiveSprintDetail {
  id: string;
  name: string;
  start: string | null;
  end: string | null;
}

export interface PbiStatistic {
  total: number;
  backlogTotal: number;
  debtTotal: number;
}

export interface ProjectDetailResponse {
  id: string;
  createdBy: MemberSummary;
  name: string;
  codePrefix: string;
  description: string | null;
  members: MemberDetail[];
  activeSprint: ActiveSprintDetail | null;
  pbiStatistic: PbiStatistic;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatIconType = "projects" | "pbis" | "contributors";

export interface ProjectStat {
  id: string;
  value: number;
  label: string;
  icon: ProjectStatIconType;
}
