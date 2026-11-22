import authCover from "../assets/auth-cover.png";
import { AuthCard } from "../components";

export const AuthPage = () => {
  return (
    <main className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${authCover})` }}
        aria-hidden="true"
      />
      <div className="fixed inset-0 bg-background/20" aria-hidden="true" />

      <header className="fixed left-6 top-6 z-20 sm:left-12 sm:top-10">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">
          Scrumify
        </h1>
      </header>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <AuthCard />
      </div>
    </main>
  );
};
