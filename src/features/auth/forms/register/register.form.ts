// register.form.ts
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import { registerSchema } from "../../types/schema/register.schema";
import type { RegisterRequest } from "../../types/types/register.types";
import { useRegister } from "../../hooks";

export const useRegisterForm = () => {
	const navigate = useNavigate();
	const registerMutation = useRegister();

	const form = useForm({
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
			try {
				await registerMutation.mutateAsync(value);
				toast.add({
					title: "Registration successful",
					description: "Your account has been created.",
					type: "success",
				});
				navigate("/", { replace: true });
			} catch {
				// Error state is handled via registerMutation.error
			}
		},
	});

	return { form, registerMutation };
};

export type RegisterForm = ReturnType<typeof useRegisterForm>["form"];
