"use client";

import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { GitHubIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "/ideas", label: "Ideas" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-shadow group-hover:glow-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold tracking-tight">OpenGenie</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {session.user.name}
              </span>
              <button
                onClick={() => signOut()}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 text-sm font-medium transition-colors hover:bg-secondary"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <GitHubIcon className="h-4 w-4" />
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-border md:hidden"
          >
            <div className="space-y-1 px-4 pb-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              {session?.user ? (
                <button
                  onClick={() => signOut()}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-medium"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-medium"
                >
                  <GitHubIcon className="h-4 w-4" />
                  Sign in with GitHub
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
