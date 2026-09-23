
import { z } from "zod";
import type { loginSchema } from "../schema/login.schema";


export type LoginRequest = z.infer<typeof loginSchema>;