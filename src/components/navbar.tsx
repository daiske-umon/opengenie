"use client";

import Link from "next/link";
import { Menu, X, Terminal } from "lucide-react";
import { GitHubIcon } from "./icons";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/ideas", label: "ideas" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[#0a0a0a]">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold tracking-tight font-mono text-primary">
            OpenGenie
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-mono transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-primary" />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-mono">
                @{session.user.name}
              </span>
              <button
                onClick={() => signOut()}
                className="inline-flex h-8 items-center gap-2 border border-border px-3 text-xs font-mono text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-8 items-center gap-2 border border-border px-3 text-xs font-mono text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              sign_in
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-center border border-border text-muted-foreground"
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
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 text-sm font-mono transition-colors ${
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {`> ${link.label}`}
                  </Link>
                );
              })}
              {session?.user ? (
                <button
                  onClick={() => signOut()}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 border border-border px-4 py-2 text-xs font-mono text-muted-foreground"
                >
                  logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 border border-border px-4 py-2 text-xs font-mono text-muted-foreground"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  sign_in
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
