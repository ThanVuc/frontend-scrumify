import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Project name is required" })
    .max(256, { error: "Project name must be at most 256 characters" }),
  codePrefix: z
    .string()
    .trim()
    .min(1, { error: "Project key prefix is required" })
    .max(7, { error: "Project key prefix must be at most 7 characters" })
    .regex(/^[A-Z0-9]+$/, {
      error: "Key prefix must contain only uppercase letters and numbers",
    }),
  description: z
    .string()
    .max(2000, { error: "Description must be at most 2000 characters" }),
});
