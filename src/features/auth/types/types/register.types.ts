import { z } from "zod";
import type { registerSchema } from "../schema/register.schema";

export type RegisterRequest = z.infer<typeof registerSchema>;
