import { Input } from "@/components/ui/input";
import type { RegisterForm } from "./register.form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
	PasswordInput,
	PasswordInputStrengthChecker,
} from "@/components/ui/password-input";

type RegisterFieldsProps = {
	form: RegisterForm;
};

export const RegisterFields = ({ form }: RegisterFieldsProps) => {
	return (
		<>
			<form.Field
				name="name"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel
								htmlFor={field.name}
								className="font-mono text-[9px] uppercase tracking-[0.12em]"
							>
								Full name
							</FieldLabel>

							<Input
								id={field.name}
								name={field.name}
								type="text"
								placeholder="Evelyn S.Architect"
								className="h-9 text-sm"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(event) =>
									field.handleChange(event.target.value)
								}
							/>

							{isInvalid && (
								<FieldError errors={field.state.meta.errors} />
							)}
						</Field>
					);
				}}
			/>

			<form.Field
				name="email"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel
								htmlFor={field.name}
								className="font-mono text-[9px] uppercase tracking-[0.12em]"
							>
								Email address
							</FieldLabel>

							<Input
								id={field.name}
								name={field.name}
								type="email"
								placeholder="name@company.com"
								className="h-9 text-sm"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(event) =>
									field.handleChange(event.target.value)
								}
							/>

							{isInvalid && (
								<FieldError errors={field.state.meta.errors} />
							)}
						</Field>
					);
				}}
			/>

			<form.Field
				name="password"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

					return (
						<Field data-invalid={isInvalid}>
							<div className="flex items-center justify-between">
								<FieldLabel
									htmlFor={field.name}
									className="font-mono text-[9px] uppercase tracking-[0.12em]"
								>
									Password
								</FieldLabel>

								<span className="font-mono text-[8px] uppercase tracking-wide text-muted-foreground">
									8+ characters
								</span>
							</div>

							<PasswordInput
								id={field.name}
								name={field.name}
								placeholder="••••••••"
								className="h-9 text-sm"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(event) =>
									field.handleChange(event.target.value)
								}
							>
								<PasswordInputStrengthChecker />
							</PasswordInput>

							{isInvalid && (
								<FieldError errors={field.state.meta.errors} />
							)}
						</Field>
					);
				}}
			/>

			<form.Field
				name="confirmPassword"
				children={(field) => {
					const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

					return (
						<Field data-invalid={isInvalid}>
							<div className="flex items-center justify-between">
								<FieldLabel
									htmlFor={field.name}
									className="font-mono text-[9px] uppercase tracking-[0.12em]"
								>
									Confirm password
								</FieldLabel>

								<span className="font-mono text-[8px] uppercase tracking-wide text-muted-foreground">
									must match password
								</span>
							</div>

							<PasswordInput
								id={field.name}
								name={field.name}
								placeholder="••••••••"
								className="h-9 text-sm"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(event) =>
									field.handleChange(event.target.value)
								}
							/>

							{isInvalid && (
								<FieldError errors={field.state.meta.errors} />
							)}
						</Field>
					);
				}}
			/>
		</>
	);
};
