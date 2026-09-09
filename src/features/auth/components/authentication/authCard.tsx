import { Card, CardContent } from "@/components/ui/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { Login } from "./login";
import { Register } from "./register";
import "./index.scss";

export const AuthCard = () => {
	return (
		<section
			className="relative z-10 flex min-h-screen w-full flex-col bg-background/85 px-4 sm:px-6 lg:w-2/5 lg:bg-background/40"
			aria-labelledby="auth-title"
		>
			<div className="mx-auto flex w-full max-w-sm flex-1 flex-col py-8 sm:py-10 lg:py-6">
				<header>
					<h2
						id="auth-title"
						className="text-center font-serif text-2xl font-normal tracking-tight sm:text-3xl"
					>
						Access your workspace
					</h2>
					<p className="mt-1 text-center text-xs text-muted-foreground sm:text-sm">
						Welcome back. Your sprint is waiting for you.
					</p>
				</header>

				<Card className="mt-6 rounded-lg border border-border bg-surface shadow-none sm:mt-8">
					<CardContent className="p-4 sm:p-5">
						<Tabs defaultValue="login">
							<TabsList className="auth-tab-list">
								<TabsTrigger className="auth-tab-item" value="login">
									Login
								</TabsTrigger>
								<TabsTrigger className="auth-tab-item" value="register">
									Register
								</TabsTrigger>
							</TabsList>
							<TabsContent value="login" className="mt-5">
								<Login />
							</TabsContent>
							<TabsContent value="register" className="mt-5">
								<Register />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<footer className="mt-auto flex flex-wrap items-center justify-between gap-x-5 gap-y-2 pt-6 sm:pt-8">
					<small className="font-mono text-[8px] tracking-[0.15em] text-muted-foreground">
						© 2024 SCRUMIFY INC.
					</small>
					<nav aria-label="Footer navigation" className="flex gap-5">
						<a
							href="#"
							className="font-mono text-[8px] tracking-[0.15em] text-muted-foreground hover:text-foreground"
						>
							PRIVACY
						</a>
						<a
							href="#"
							className="font-mono text-[8px] tracking-[0.15em] text-muted-foreground hover:text-foreground"
						>
							TERMS
						</a>
					</nav>
				</footer>
			</div>
		</section>
	);
};
