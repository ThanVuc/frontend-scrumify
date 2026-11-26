import { useQuery } from "@tanstack/react-query";
import { getProjectDetail } from "../api";

export const useProjectDetail = (projectId: string | undefined) => {
  return useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProjectDetail(projectId!),
    enabled: Boolean(projectId),
  });
};
