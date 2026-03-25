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
    { href: "https://github.com/openjenie", label: "github" },
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
    <footer className="border-border border-t bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Terminal className="text-primary h-4 w-4" />
              <span className="text-primary font-mono text-sm font-bold tracking-tight">
                openjenie
              </span>
            </Link>
            <p className="text-muted-foreground mt-4 font-mono text-xs leading-relaxed">
              {`// your wish is our commit`}
              <br />
              {`// open-source ideas, built monthly`}
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href="https://github.com/openjenie"
                className="border-border text-muted-foreground hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center border transition-colors"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="border-border text-muted-foreground hover:border-primary hover:text-primary flex h-8 w-8 items-center justify-center border transition-colors"
              >
                <XIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-primary font-mono text-xs tracking-wider uppercase">
                {`[${title}]`}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary font-mono text-xs transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border mt-12 border-t pt-8">
          <p className="text-muted-foreground text-center font-mono text-xs">
            &copy; {new Date().getFullYear()} openjenie | MIT License | built by
            the community
          </p>
        </div>
      </div>
    </footer>
  );
}
