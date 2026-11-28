import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { createPbi } from "../api";
import { SCRUM_QUERY_KEYS, type CreatePbiRequest } from "../types";

export const useCreatePbi = (projectId: string) => {
  return useMutation({
    mutationFn: (data: CreatePbiRequest) => createPbi(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SCRUM_QUERY_KEYS.projectPbisRoot(projectId),
      });
      queryClient.invalidateQueries({
        queryKey: SCRUM_QUERY_KEYS.projectDetail(projectId),
      });
    },
  });
};
