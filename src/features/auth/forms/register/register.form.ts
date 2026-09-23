// register.form.ts
import { useForm } from "@tanstack/react-form";
import { registerSchema } from "../../types/schema/register.schema";
import type { RegisterRequest } from "../../types/types/register.types";
import { useRegister } from "../../hooks";

export const useRegisterForm = () => {
	const registerMutation = useRegister();

	return useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		} satisfies RegisterRequest,

		validators: {
			onSubmit: registerSchema,
		},

		onSubmit: async ({ value }) => {
			await registerMutation.mutateAsync(value);
		},
	})
};

export type RegisterForm = ReturnType<typeof useRegisterForm>;
