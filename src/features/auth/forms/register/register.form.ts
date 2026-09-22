// register.form.ts
import { useForm } from "@tanstack/react-form";

import { registerSchema } from "./register.schema";
import type { RegisterFormValues } from "./register.types";

export const useRegisterForm = () =>
	useForm({
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		} satisfies RegisterFormValues,

		validators: {
			onSubmit: registerSchema,
		},

		onSubmit: async ({ value }) => {
			console.log(value);
		},
	});

export type RegisterForm = ReturnType<typeof useRegisterForm>;
