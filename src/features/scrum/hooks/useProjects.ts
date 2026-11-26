import { useQuery } from "@tanstack/react-query";
import { listProjects } from "../api";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: listProjects,
  });
};
