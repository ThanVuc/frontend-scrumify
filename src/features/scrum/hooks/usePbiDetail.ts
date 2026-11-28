import { useQuery } from "@tanstack/react-query";
import { getPbiDetail } from "../api";
import { SCRUM_QUERY_KEYS } from "../types";

export const usePbiDetail = (pbiId: string | undefined) => {
  return useQuery({
    queryKey: SCRUM_QUERY_KEYS.pbiDetail(pbiId),
    queryFn: () => getPbiDetail(pbiId!),
    enabled: Boolean(pbiId),
  });
};
