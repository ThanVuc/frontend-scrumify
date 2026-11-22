// login.form.ts
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import { loginSchema } from "../../types/schema/login.schema";
import type { LoginRequest } from "../../types/types/login.types";
import { useLogin } from "../../hooks";


export const useLoginForm = () => {
	const navigate = useNavigate();
	const loginMutation = useLogin();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		} satisfies LoginRequest,

		validators: {
			onSubmit: loginSchema,
		},

		onSubmit: async ({ value }) => {
			try {
				await loginMutation.mutateAsync(value);
				toast.add({
					title: "Login successful",
					description: "You have signed in successfully.",
					type: "success",
				});
				navigate("/", { replace: true });
			} catch {
				// Error state is handled via loginMutation.error
			}
		},
	});

	return { form, loginMutation };
};

export type LoginForm = ReturnType<typeof useLoginForm>["form"];
