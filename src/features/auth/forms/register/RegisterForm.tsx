// RegisterForm.tsx
import { useRegisterForm } from "./register.form";

import { RegisterFields } from "./RegisterFields";
import { RegisterActions } from "./RegisterActions";

export const RegisterForm = () => {
	const form = useRegisterForm();

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();

				form.handleSubmit();
			}}
			className="space-y-4"
		>
			<RegisterFields form={form} />
			<RegisterActions form={form} />
		</form>
	);
};
