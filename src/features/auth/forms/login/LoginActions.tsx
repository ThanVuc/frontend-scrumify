import type { LoginForm } from "./login.form";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import GithubOutlineFillIcon from "@iconify-react/akar-icons/github-outline-fill";
import GoogleContainedFillIcon from "@iconify-react/akar-icons/google-contained-fill";

type LoginActionsProps = {
    form: LoginForm;
};

export const LoginActions = ({ form }: LoginActionsProps) => {
    return (
        <>
            <form.Subscribe
                selector={(state) => ({
                    canSubmit: state.canSubmit,
                    isSubmitting: state.isSubmitting,
                })}
            >
                {({ canSubmit, isSubmitting }) => (
                    <Button
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                        className="h-9 w-full text-sm"
                    >
                        {isSubmitting ? "Signing in..." : "Sign in"}

                        {!isSubmitting && (
                            <span aria-hidden="true">→</span>
                        )}
                    </Button>
                )}
            </form.Subscribe>

            <div>
                <Separator />

                <p className="my-4 text-center font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
                    Or continue with
                </p>

                <div className="auth-social-grid grid grid-cols-2 gap-2.5">
                    <Button
                        variant="outline"
                        type="button"
                        className="h-9 text-sm"
                        onClick={() => {
                            // TODO: GitHub OAuth
                        }}
                    >
                        <GithubOutlineFillIcon height="1em" />
                        Github
                    </Button>

                    <Button
                        variant="outline"
                        type="button"
                        className="h-9 text-sm"
                        onClick={() => {
                            // TODO: Google OAuth
                        }}
                    >
                        <GoogleContainedFillIcon height="1em" />
                        Google
                    </Button>
                </div>
            </div>
        </>
    );
};
