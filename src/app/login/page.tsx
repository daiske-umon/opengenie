"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Terminal } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

export default function LoginPage() {
  const [demoUsername, setDemoUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDemoLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!demoUsername.trim()) return;
    setLoading(true);
    setError("");
    try {
      const result = await signIn("demo", {
        username: demoUsername.trim(),
        callbackUrl: "/ideas",
        redirect: false,
      });
      if (result?.error) {
        setError("Login failed. Please try again.");
        setLoading(false);
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch {
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  }

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
            Join the community and start voting on ideas
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/ideas" })}
            className="flex w-full items-center justify-center gap-2 border border-border px-4 py-2.5 text-xs font-mono text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <GitHubIcon className="h-4 w-4" />
            continue_with_github
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[10px]">
              <span className="bg-[#0a0a0a] px-2 text-muted-foreground font-mono">
                or use demo login
              </span>
            </div>
          </div>

          <form onSubmit={handleDemoLogin} className="space-y-3">
            <input
              type="text"
              placeholder="enter username..."
              value={demoUsername}
              onChange={(e) => setDemoUsername(e.target.value)}
              className="h-9 w-full border border-border bg-[#0a0a0a] px-4 text-xs font-mono outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
            {error && (
              <p className="text-xs text-red-400 font-mono">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !demoUsername.trim()}
              className="w-full border border-primary bg-primary px-4 py-2 text-xs font-bold font-mono text-primary-foreground transition-colors hover:bg-transparent hover:text-primary disabled:opacity-50 uppercase tracking-widest"
            >
              {loading ? "signing in..." : "> demo_login"}
            </button>
          </form>

          <p className="text-center text-[10px] text-muted-foreground font-mono">
            {`// demo login creates a test account — no OAuth needed`}
          </p>
        </div>
      </div>
    </div>
  );
}
