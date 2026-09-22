import { z } from "zod";

export const registerSchema = z
	.object({
		fullName: z.string().min(1, {
			error: "Full name is required",
		}),

		email: z.email({
			error: "Please enter a valid email address",
		}),

		password: z.string().min(8, {
			error: "Password must contain at least 8 characters",
		}),

		confirmPassword: z.string().min(8, {
			error: "Password must contain at least 8 characters",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
