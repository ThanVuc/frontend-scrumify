import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { updatePbi } from "../api";
import { SCRUM_QUERY_KEYS, type UpdatePbiRequest } from "../types";

type UpdatePbiVariables = {
  pbiId: string;
  data: UpdatePbiRequest;
};

export const useUpdatePbi = (projectId?: string) => {
  return useMutation({
    mutationFn: ({ pbiId, data }: UpdatePbiVariables) =>
      updatePbi(pbiId, data),
    onSuccess: (_updated, variables) => {
      queryClient.invalidateQueries({
        queryKey: SCRUM_QUERY_KEYS.pbiDetail(variables.pbiId),
      });
      if (projectId) {
        queryClient.invalidateQueries({
          queryKey: SCRUM_QUERY_KEYS.projectPbisRoot(projectId),
        });
        queryClient.invalidateQueries({
          queryKey: SCRUM_QUERY_KEYS.projectDetail(projectId),
        });
      }
    },
  });
};
