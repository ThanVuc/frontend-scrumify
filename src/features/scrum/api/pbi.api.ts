import { apiClient } from "@/shared/apis/apiClient";
import type {
  BacklogQuery,
  BacklogResponse,
  CreatePbiRequest,
  PbiDetailResponse,
  PbiResponse,
  UpdatePbiRequest,
} from "../types";

export const listProjectPbis = async (
  projectId: string,
  query: BacklogQuery = {},
): Promise<BacklogResponse> => {
  const response = await apiClient(
    `/projects/${encodeURIComponent(projectId)}/pbis`,
    {
      query: {
        status: query.status || undefined,
        type: query.type || undefined,
        epicId: query.epicId || undefined,
        search: query.search?.trim() || undefined,
      },
    },
  );
  return response.json();
};

export const getPbiDetail = async (
  pbiId: string,
): Promise<PbiDetailResponse> => {
  const response = await apiClient(`/pbis/${encodeURIComponent(pbiId)}`);
  return response.json();
};

export const createPbi = async (
  projectId: string,
  data: CreatePbiRequest,
): Promise<PbiResponse> => {
  const trimmedDescription = data.description.trim();
  const payload = {
    title: data.title.trim(),
    ...(trimmedDescription ? { description: trimmedDescription } : {}),
    type: data.type,
    priority: data.priority,
    ...(data.storyPoints !== null ? { storyPoints: data.storyPoints } : {}),
    epicId: data.epicId ?? null,
    sprintId: data.sprintId ?? null,
  };

  const response = await apiClient(
    `/projects/${encodeURIComponent(projectId)}/pbis`,
    {
      method: "POST",
      body: payload,
    },
  );
  return response.json();
};

export const updatePbi = async (
  pbiId: string,
  data: UpdatePbiRequest,
): Promise<PbiResponse> => {
  const response = await apiClient(`/pbis/${encodeURIComponent(pbiId)}`, {
    method: "PATCH",
    body: data,
  });
  return response.json();
};
