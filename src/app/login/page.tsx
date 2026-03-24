"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

export default function LoginPage() {
  const [demoUsername, setDemoUsername] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDemoLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!demoUsername.trim()) return;
    setLoading(true);
    await signIn("demo", {
      username: demoUsername.trim(),
      callbackUrl: "/ideas",
    });
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Sign in to OpenGenie</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Join the community and start voting on ideas
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/ideas" })}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <GitHubIcon className="h-5 w-5" />
            Continue with GitHub
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                or use demo login
              </span>
            </div>
          </div>

          <form onSubmit={handleDemoLogin} className="space-y-3">
            <input
              type="text"
              placeholder="Enter a username..."
              value={demoUsername}
              onChange={(e) => setDemoUsername(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-secondary/50 px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={loading || !demoUsername.trim()}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Demo Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Demo login creates a test account — no OAuth needed for local dev
          </p>
        </div>
      </div>
    </div>
  );
}
