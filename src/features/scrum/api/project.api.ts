import { apiClient } from "@/shared/apis/apiClient";
import type {
  CreateProjectRequest,
  ProjectDetailResponse,
  ProjectListResponse,
  ProjectResponse,
} from "../types";

export const createProject = async (
  data: CreateProjectRequest,
): Promise<ProjectResponse> => {
  const trimmedDescription = data.description.trim();
  const payload = {
    name: data.name.trim(),
    codePrefix: data.codePrefix.trim().toUpperCase(),
    ...(trimmedDescription ? { description: trimmedDescription } : {}),
  };

  const response = await apiClient("/projects", {
    method: "POST",
    body: payload,
  });

  return response.json();
};

export const listProjects = async (): Promise<ProjectListResponse> => {
  const response = await apiClient("/projects");
  return response.json();
};

export const getProjectDetail = async (
  projectId: string,
): Promise<ProjectDetailResponse> => {
  const response = await apiClient(`/projects/${encodeURIComponent(projectId)}`);
  return response.json();
};
