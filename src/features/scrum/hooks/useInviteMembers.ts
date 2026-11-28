import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { inviteMembers } from "../api";
import { SCRUM_QUERY_KEYS, type InviteMembersRequest } from "../types";

export const useInviteMembers = (projectId: string) => {
  return useMutation({
    mutationFn: (data: InviteMembersRequest) => inviteMembers(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SCRUM_QUERY_KEYS.projectDetail(projectId),
      });
      queryClient.invalidateQueries({ queryKey: SCRUM_QUERY_KEYS.projects });
    },
  });
};
