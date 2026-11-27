import { useMutation } from "@tanstack/react-query";
import { listInvitableUsers } from "../api";

export const useLookupInvitableUsers = (projectId: string) => {
  return useMutation({
    mutationFn: (emails: string[]) => listInvitableUsers(projectId, emails),
  });
};
