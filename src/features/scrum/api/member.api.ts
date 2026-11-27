import { apiClient } from "@/shared/apis/apiClient";
import type {
  InvitableUserListResponse,
  InviteMembersRequest,
  MemberResponse,
} from "../types";

const normalizeUniqueEmails = (emails: string[]): string[] => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const email of emails) {
    const normalized = email.trim().toLowerCase();
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      result.push(normalized);
    }
  }

  return result;
};

export const inviteMembers = async (
  projectId: string,
  data: InviteMembersRequest,
): Promise<MemberResponse> => {
  const members = normalizeUniqueEmails(data.members);

  const response = await apiClient(
    `/projects/${encodeURIComponent(projectId)}/members`,
    {
      method: "POST",
      body: { members },
    },
  );

  return response.json();
};

export const listInvitableUsers = async (
  projectId: string,
  emails: string[],
): Promise<InvitableUserListResponse> => {
  const normalizedEmails = normalizeUniqueEmails(emails);
  if (normalizedEmails.length === 0) {
    return { items: [] };
  }

  const response = await apiClient(
    `/projects/${encodeURIComponent(projectId)}/invitable-users`,
    {
      query: { emails: normalizedEmails },
    },
  );

  return response.json();
};
