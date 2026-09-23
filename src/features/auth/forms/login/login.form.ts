// login.form.ts
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "../../types/schema/login.schema";
import type { LoginRequest } from "../../types/types/login.types";
import { useLogin } from "../../hooks";


export const useLoginForm = () => {
	const loginMutation = useLogin();

	return useForm({
		defaultValues: {
			email: "",
			password: "",
		} satisfies LoginRequest,

		validators: {
			onSubmit: loginSchema,
		},

		onSubmit: async ({ value }) => {
			await loginMutation.mutateAsync(value);
		},
	});
};

export type LoginForm = ReturnType<typeof useLoginForm>;
