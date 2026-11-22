import { Card, CardContent } from "@/components/ui/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { LoginForm } from "../../forms/login/LoginForm";
import { RegisterForm } from "../../forms/register/RegisterForm";
import "./index.scss";

export const AuthCard = () => {
	return (
		<Card className="w-full max-w-sm rounded-lg border border-border bg-surface/95 shadow-none">
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
						<LoginForm />
					</TabsContent>
					<TabsContent value="register" className="mt-5">
						<RegisterForm />
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
};
