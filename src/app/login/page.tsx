"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

export default function LoginPage() {
  const [githubAuthEnabled, setGithubAuthEnabled] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadProviders() {
      const providers = await getProviders();
      if (mounted) {
        setGithubAuthEnabled(Boolean(providers?.github));
      }
    }

    void loadProviders();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center border border-border">
            <Terminal className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-4 text-xl font-bold font-mono">
            sign_in
          </h1>
          <p className="mt-2 text-xs text-muted-foreground font-mono">
            Join the community and start submitting ideas with GitHub
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/ideas" })}
            disabled={!githubAuthEnabled}
            className="flex w-full items-center justify-center gap-2 border border-border px-4 py-2.5 text-xs font-mono text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <GitHubIcon className="h-4 w-4" />
            {githubAuthEnabled
              ? "continue_with_github"
              : "github_oauth_not_configured"}
          </button>
          {!githubAuthEnabled && (
            <p className="text-center font-mono text-[10px] text-muted-foreground">
              Set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to enable GitHub
              sign-in.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
