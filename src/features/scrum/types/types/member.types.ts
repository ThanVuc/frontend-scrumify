import type { z } from "zod";
import type { inviteMembersSchema } from "../schema/inviteMember.schema";

export type InviteMembersRequest = z.infer<typeof inviteMembersSchema>;

export interface MemberResponse {
  id: string;
  userId: string;
  name: string;
  role: string;
}

export interface InvitableUser {
  id: string;
  fullName: string;
  email: string;
}

export interface InvitableUserListResponse {
  items: InvitableUser[];
}
