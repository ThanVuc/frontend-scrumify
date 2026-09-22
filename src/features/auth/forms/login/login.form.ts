// login.form.ts
import { useForm } from "@tanstack/react-form";

import { loginSchema } from "./login.schema";
import type { LoginFormValues } from "./login.types";

export const useLoginForm = () =>
	useForm({
		defaultValues: {
			email: "",
			password: "",
		} satisfies LoginFormValues,

		validators: {
			onSubmit: loginSchema,
		},

		onSubmit: async ({ value }) => {
			console.log(value);
		},
	});

export type LoginForm = ReturnType<typeof useLoginForm>;