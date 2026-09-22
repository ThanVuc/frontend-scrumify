import type { AnyFieldMeta } from "@tanstack/react-form";

type FieldErrorProps = {
	meta: AnyFieldMeta;
};

export const FieldError = ({ meta }: FieldErrorProps) => {
	if (!meta.isTouched || meta.errors.length === 0) {
		return null;
	}

	return (
		<p className="text-xs text-destructive">
			{meta.errors[0]?.message}
		</p>
	);
};

