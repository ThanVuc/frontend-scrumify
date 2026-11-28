import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { createProject } from "../api";
import { SCRUM_QUERY_KEYS } from "../types";

export const useCreateProject = () => {
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCRUM_QUERY_KEYS.projects });
    },
  });
};
