import { z } from "zod";

export const inviteEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(256, { error: "Email must be at most 256 characters" })
  .pipe(z.email({ error: "Please enter a valid email address" }));

export const inviteMembersSchema = z.object({
  members: z
    .array(inviteEmailSchema)
    .min(1, { error: "Add at least one valid member to invite" }),
});
