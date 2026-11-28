import { useQuery } from "@tanstack/react-query";
import { listProjectPbis } from "../api";
import { SCRUM_QUERY_KEYS, type BacklogQuery } from "../types";

export const useProjectPbis = (
  projectId: string | undefined,
  query: BacklogQuery = {},
) => {
  return useQuery({
    queryKey: SCRUM_QUERY_KEYS.projectPbis(projectId, query),
    queryFn: () => listProjectPbis(projectId!, query),
    enabled: Boolean(projectId),
  });
};
