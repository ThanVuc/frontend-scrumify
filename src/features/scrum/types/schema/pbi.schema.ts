import { z } from "zod";
import { PBI_PRIORITY, PBI_STATUS, PBI_TYPE } from "../constants/scrum.constants";

export const pbiTypeSchema = z.enum(PBI_TYPE);

export const pbiStatusSchema = z.enum(PBI_STATUS);

export const pbiPrioritySchema = z.enum(PBI_PRIORITY);

export const createPbiSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: "Title is required" })
    .max(256, { error: "Title must be at most 256 characters" }),
  description: z.string(),
  type: pbiTypeSchema,
  priority: pbiPrioritySchema,
  storyPoints: z
    .number()
    .int({ error: "Story points must be a whole number" })
    .min(0, { error: "Story points must be 0 or greater" })
    .nullable(),
  epicId: z.string().nullable(),
  sprintId: z.string().nullable(),
});

export const updatePbiSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: "Title is required" })
    .max(256, { error: "Title must be at most 256 characters" })
    .optional(),
  description: z.string().optional(),
  type: pbiTypeSchema.optional(),
  priority: pbiPrioritySchema.optional(),
  storyPoints: z
    .number()
    .int({ error: "Story points must be a whole number" })
    .min(0, { error: "Story points must be 0 or greater" })
    .nullable()
    .optional(),
  epicId: z.string().nullable().optional(),
  status: pbiStatusSchema.optional(),
  sprintId: z.string().nullable().optional(),
  moveToTop: z.boolean().optional(),
  archived: z.boolean().optional(),
});
