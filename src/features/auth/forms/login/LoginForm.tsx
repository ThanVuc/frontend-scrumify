// LoginForm.tsx
import { CircleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CLIENT_ERROR_CODE } from "@/shared/constants";
import { ApiError } from "@/shared/types/error";
import { useLoginForm } from "./login.form";

import { LoginFields } from "./LoginFields";
import { LoginActions } from "./LoginActions";

export const LoginForm = () => {
	const { form, loginMutation } = useLoginForm();

	const errorCode =
		loginMutation.error instanceof ApiError
			? loginMutation.error.code
			: loginMutation.error instanceof TypeError
				? CLIENT_ERROR_CODE.NETWORK_ERROR
				: CLIENT_ERROR_CODE.UNKNOWN_ERROR;

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();

				form.handleSubmit();
			}}
			className="space-y-4"
		>
			{loginMutation.isError && (
				<Alert variant="destructive">
					<CircleAlertIcon />
					<AlertTitle>Login failed</AlertTitle>
					<AlertDescription>
						Error code:{" "}
						<span className="break-all font-mono font-medium">
							{errorCode}
						</span>
					</AlertDescription>
				</Alert>
			)}

			<LoginFields form={form} />
			<LoginActions form={form} />
		</form>
	);
};