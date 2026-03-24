"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const headline = "Ideas in. Code out. Every week.";

function TypingText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      <span
        className={`inline-block w-3 h-7 sm:h-10 bg-primary ml-1 align-middle ${
          done ? "animate-blink" : ""
        }`}
      />
    </span>
  );
}

function CodeRain() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none select-none">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary font-mono text-[10px] leading-tight whitespace-pre"
          style={{ left: `${i * 4.2}%`, top: -300 }}
          animate={{ y: ["-300px", "100vh"] }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "linear",
          }}
        >
          {Array.from({ length: 40 })
            .map(() => {
              const chars = "01{}[]<>=/;:_-+*&|!?.#@$%^~`";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("\n")}
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <CodeRain />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 sm:pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 border border-border px-4 py-1.5 text-xs text-muted-foreground font-mono">
              <Terminal className="h-3 w-3 text-primary" />
              {`// open source. community driven. built weekly.`}
            </div>
          </motion.div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-mono">
            <TypingText text={headline} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="mt-6 text-sm text-muted-foreground sm:text-base font-mono leading-relaxed"
          >
            Submit your idea. The community votes. We build the winner in one
            week — then open it up for everyone to contribute.{" "}
            <span className="text-primary">
              Your wish is our commit.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/ideas"
              className="group inline-flex h-10 items-center gap-2 border border-primary bg-primary px-6 text-xs font-bold text-primary-foreground transition-all hover:bg-transparent hover:text-primary font-mono uppercase tracking-widest"
            >
              {`> submit_idea`}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-10 items-center gap-2 border border-border px-6 text-xs font-bold transition-colors hover:border-primary hover:text-primary font-mono uppercase tracking-widest text-muted-foreground"
            >
              {`> view_projects`}
            </Link>
          </motion.div>
        </div>

        {/* Terminal mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="relative mx-auto mt-20 max-w-2xl"
        >
          <div className="border border-border bg-[#0a0a0a]">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 bg-[#27272a]" />
                <div className="h-2.5 w-2.5 bg-[#27272a]" />
                <div className="h-2.5 w-2.5 bg-[#27272a]" />
              </div>
              <span className="ml-2 text-[10px] text-muted-foreground font-mono">
                ~/opengenie — zsh
              </span>
            </div>
            {/* Terminal content */}
            <div className="p-5 font-mono text-xs space-y-2.5">
              <div>
                <span className="text-primary">$</span>{" "}
                <span className="text-white">
                  opengenie submit --idea &quot;Your idea here&quot;
                </span>
              </div>
              <div className="text-green-400">
                {`✓ Idea submitted. Voting starts now.`}
              </div>
              <div className="mt-2">
                <span className="text-primary">$</span>{" "}
                <span className="text-white">opengenie status</span>
              </div>
              <div className="text-muted-foreground space-y-1">
                <div>
                  <span className="text-primary">IDEAS</span>
                  <span className="text-muted-foreground/40">
                    {"    ............ "}
                  </span>
                  <span className="text-white">47</span>
                </div>
                <div>
                  <span className="text-primary">VOTES</span>
                  <span className="text-muted-foreground/40">
                    {"    ............ "}
                  </span>
                  <span className="text-white">1,200+</span>
                </div>
                <div>
                  <span className="text-primary">SHIPPED</span>
                  <span className="text-muted-foreground/40">
                    {"  ............ "}
                  </span>
                  <span className="text-white">12</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-primary">$</span>{" "}
                <span className="animate-blink ml-1 text-primary">█</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
