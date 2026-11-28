import { useQuery } from "@tanstack/react-query";
import { getProjectDetail } from "../api";
import { SCRUM_QUERY_KEYS } from "../types";

export const useProjectDetail = (projectId: string | undefined) => {
  return useQuery({
    queryKey: SCRUM_QUERY_KEYS.projectDetail(projectId),
    queryFn: () => getProjectDetail(projectId!),
    enabled: Boolean(projectId),
  });
};
