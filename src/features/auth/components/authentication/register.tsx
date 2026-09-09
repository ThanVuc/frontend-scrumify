import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import GithubOutlineFillIcon from "@iconify-react/akar-icons/github-outline-fill";
import GoogleContainedFillIcon from "@iconify-react/akar-icons/google-contained-fill";

export const Register = () => {
	return (
		<form className="space-y-4">
			<div className="space-y-1">
				<Label
					htmlFor="register-full-name"
					className="font-mono text-[9px] uppercase tracking-[0.12em]"
				>
					Full name
				</Label>
				<Input
					id="register-full-name"
					type="text"
					placeholder="Evelyn S.Architect"
					className="h-9 text-sm"
				/>
			</div>

			<div className="space-y-1">
				<Label
					htmlFor="register-email"
					className="font-mono text-[9px] uppercase tracking-[0.12em]"
				>
					Email address
				</Label>
				<Input
					id="register-email"
					type="email"
					placeholder="name@company.com"
					className="h-9 text-sm"
				/>
			</div>

			<div className="space-y-1">
				<div className="flex items-center justify-between">
					<Label
						htmlFor="register-password"
						className="font-mono text-[9px] uppercase tracking-[0.12em]"
					>
						Password
					</Label>
					<span className="font-mono text-[8px] uppercase tracking-wide text-muted-foreground">
						8+ characters
					</span>
				</div>
				<Input
					id="register-password"
					type="password"
					placeholder="••••••••"
					className="h-9 text-sm"
				/>
			</div>

			<div className="space-y-1">
				<Label
					htmlFor="register-confirm-password"
					className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em]"
				>
					Confirm password
					<span className="font-mono text-[8px] uppercase tracking-wide text-muted-foreground">
						must match password
					</span>
				</Label>
				<Input
					id="register-confirm-password"
					type="password"
					placeholder="••••••••"
					className="h-9 text-sm"
				/>
			</div>

			<Button type="submit" className="h-9 w-full text-sm">
				Create Account
				<span aria-hidden="true">→</span>
			</Button>

			<div>
				<Separator />
				<p className="my-4 text-center font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
					Or continue with
				</p>
				<div className="auth-social-grid grid grid-cols-2 gap-2.5">
					<Button variant="outline" type="button" className="h-9 text-sm">
						<GithubOutlineFillIcon height="1em" />
						Github
					</Button>
					<Button variant="outline" type="button" className="h-9 text-sm">
						<GoogleContainedFillIcon height="1em" />
						Google
					</Button>
				</div>
			</div>
		</form>
	);
};
