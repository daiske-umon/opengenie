import Link from "next/link";
import { Sparkles } from "lucide-react";
import { GitHubIcon, XIcon } from "./icons";

const footerLinks = {
  Platform: [
    { href: "/ideas", label: "Ideas" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
  ],
  Community: [
    { href: "https://github.com/opengenie", label: "GitHub" },
    { href: "#", label: "Discord" },
    { href: "#", label: "Twitter" },
  ],
  Resources: [
    { href: "#", label: "Documentation" },
    { href: "#", label: "Contributing Guide" },
    { href: "#", label: "Code of Conduct" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                OpenGenie
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your wish is our commit.
              <br />
              Open-source ideas, built every week.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://github.com/opengenie"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <XIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} OpenGenie. Open source under MIT
            License.
          </p>
        </div>
      </div>
    </footer>
  );
}
