import { AuthCard, Cover } from "../components";

export const AuthPage = () => {
  return (
    <main className="relative min-h-screen">
      <div className="relative z-10 flex min-h-screen">
        <Cover />
        <AuthCard />
      </div>
    </main>
  );
};
