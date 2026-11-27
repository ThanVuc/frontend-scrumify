import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { inviteMembers } from "../api";
import type { InviteMembersRequest } from "../types";

export const useInviteMembers = (projectId: string) => {
  return useMutation({
    mutationFn: (data: InviteMembersRequest) => inviteMembers(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
