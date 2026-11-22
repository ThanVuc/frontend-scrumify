// RegisterForm.tsx
import { CircleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ApiError } from "@/shared/types/error";
import { useRegisterForm } from "./register.form";

import { RegisterFields } from "./RegisterFields";
import { RegisterActions } from "./RegisterActions";

export const RegisterForm = () => {
	const { form, registerMutation } = useRegisterForm();

	const errorCode =
		registerMutation.error instanceof ApiError
			? registerMutation.error.code
			: registerMutation.error instanceof TypeError
				? "NETWORK_ERROR"
				: "UNKNOWN_ERROR";

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();

				form.handleSubmit();
			}}
			className="space-y-4"
		>
			{registerMutation.isError && (
				<Alert variant="destructive">
					<CircleAlertIcon />
					<AlertTitle>Registration failed</AlertTitle>
					<AlertDescription>
						Error code:{" "}
						<span className="break-all font-mono font-medium">
							{errorCode}
						</span>
					</AlertDescription>
				</Alert>
			)}

			<RegisterFields form={form} />
			<RegisterActions form={form} />
		</form>
	);
};
