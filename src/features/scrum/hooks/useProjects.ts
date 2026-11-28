import { useQuery } from "@tanstack/react-query";
import { listProjects } from "../api";
import { SCRUM_QUERY_KEYS } from "../types";

export const useProjects = () => {
  return useQuery({
    queryKey: SCRUM_QUERY_KEYS.projects,
    queryFn: listProjects,
  });
};
