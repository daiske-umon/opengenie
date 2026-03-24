import Link from "next/link";
import { Terminal } from "lucide-react";
import { GitHubIcon, XIcon } from "./icons";

const footerLinks = {
  platform: [
    { href: "/ideas", label: "ideas" },
    { href: "/projects", label: "projects" },
    { href: "/about", label: "about" },
  ],
  community: [
    { href: "https://github.com/opengenie", label: "github" },
    { href: "#", label: "discord" },
    { href: "#", label: "twitter" },
  ],
  resources: [
    { href: "#", label: "docs" },
    { href: "#", label: "contributing" },
    { href: "#", label: "code_of_conduct" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold tracking-tight font-mono text-primary">
                OpenGenie
              </span>
            </Link>
            <p className="mt-4 text-xs text-muted-foreground font-mono leading-relaxed">
              {`// your wish is our commit`}
              <br />
              {`// open-source ideas, built weekly`}
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href="https://github.com/opengenie"
                className="flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <XIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-mono text-primary uppercase tracking-wider">
                {`[${title}]`}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground font-mono transition-colors hover:text-primary"
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
          <p className="text-center text-xs text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} OpenGenie | MIT License | built by the community
          </p>
        </div>
      </div>
    </footer>
  );
}
