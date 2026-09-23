
import { Input } from "@/components/ui/input";
import type { LoginForm } from "./login.form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
    PasswordInput,
} from "@/components/ui/password-input";

type LoginFieldsProps = {
    form: LoginForm;
};

export const LoginFields = ({ form }: LoginFieldsProps) => {
    return (
        <>
            <form.Field
                name="email"
                children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

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
                                placeholder="yourname@gmail.com"
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
                    )
                }}
            />

            <form.Field
                name="password"
                children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                    return (
                        <Field data-invalid={isInvalid}>
                            <div className="flex items-center justify-between">
                                <FieldLabel
                                    htmlFor={field.name}
                                    className="font-mono text-[9px] uppercase tracking-[0.12em]"
                                >
                                    Password
                                </FieldLabel>
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
                    )
                }}
            />
        </>
    );
};