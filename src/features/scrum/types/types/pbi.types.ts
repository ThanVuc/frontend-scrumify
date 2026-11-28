import type { z } from "zod";
import type {
  createPbiSchema,
  pbiPrioritySchema,
  pbiStatusSchema,
  pbiTypeSchema,
  updatePbiSchema,
} from "../schema/pbi.schema";

export type PbiType = z.infer<typeof pbiTypeSchema>;
export type PbiStatus = z.infer<typeof pbiStatusSchema>;
export type PbiPriority = z.infer<typeof pbiPrioritySchema>;
export type CreatePbiRequest = z.infer<typeof createPbiSchema>;
export type UpdatePbiRequest = z.infer<typeof updatePbiSchema>;

export interface BacklogQuery {
  status?: PbiStatus;
  type?: PbiType;
  epicId?: string;
  search?: string;
}

export interface EpicSummary {
  id: string;
  name: string;
}

export interface SprintSummary {
  id: string;
  name: string;
}

export interface PbiResponse {
  id: string;
  code: string;
  backlogId: string;
  epicId: string | null;
  epic?: EpicSummary | null;
  sprint?: SprintSummary | null;
  title: string;
  description: string | null;
  type: PbiType;
  status: PbiStatus | string;
  priority: PbiPriority | string;
  storyPoints: number | null;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string | null;
}

export interface BacklogResponse {
  id: string;
  projectId: string;
  pbis: PbiResponse[];
}

export interface PbiTaskItem {
  id: string;
  title: string;
  status: string;
  priority?: string | number;
  assignee?: { id: string; name: string } | null;
  assigneeId?: string | null;
}

export interface PbiDetailResponse {
  pbi: PbiResponse;
  tasks: PbiTaskItem[];
}
