import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { createProject } from "../api";

export const useCreateProject = () => {
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
