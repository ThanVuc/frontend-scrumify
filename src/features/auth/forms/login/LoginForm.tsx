// LoginForm.tsx
import { useLoginForm } from "./login.form";

import { LoginFields } from "./LoginFields";
import { LoginActions } from "./LoginActions";

export const LoginForm = () => {
	const form = useLoginForm();

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();

				form.handleSubmit();
			}}
			className="space-y-4"
		>
			<LoginFields form={form} />
			<LoginActions form={form} />
		</form>
	);
};