"use client";

import { CountdownTimer } from "@/components/countdown-timer";
import { PageIllustration } from "@/components/page-illustration";
import { trpc } from "@/lib/trpc/client";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const headline = "Ideas in. Code out. Every month.";
const codeRainColumns = Array.from({ length: 24 }, (_, i) => {
  const chars = "01{}[]<>=/;:_-+*&|!?.#@$%^~`";
  const seed = (i * 37 + 17) % chars.length;

  return {
    left: `${i * 4.2}%`,
    duration: 10 + ((i * 13) % 10),
    delay: ((i * 7) % 6) + i * 0.05,
    content: Array.from({ length: 40 }, (_, line) => {
      return chars[(seed + line * 11) % chars.length];
    }).join("\n"),
  };
});

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
        className={`bg-primary ml-1 inline-block h-7 w-3 align-middle sm:h-10 ${
          done ? "animate-blink" : ""
        }`}
      />
    </span>
  );
}

function CodeRain() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03] select-none">
      {codeRainColumns.map((column, i) => (
        <motion.div
          key={i}
          className="text-primary absolute font-mono text-[10px] leading-tight whitespace-pre"
          style={{ left: column.left, top: -300 }}
          animate={{ y: ["-300px", "100vh"] }}
          transition={{
            duration: column.duration,
            repeat: Infinity,
            delay: column.delay,
            ease: "linear",
          }}
        >
          {column.content}
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  const { data: cycle } = trpc.cycles.getCurrent.useQuery();

  return (
    <section className="relative overflow-hidden">
      <CodeRain />
      <PageIllustration
        variant="landing"
        className="-top-12 left-1/2 h-[820px] w-[1180px] -translate-x-1/2 md:h-[900px] md:w-[1280px]"
      />

      <div className="mx-auto max-w-7xl px-4 pt-24 pb-24 sm:px-6 sm:pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="border-border text-muted-foreground mb-6 inline-flex items-center gap-2 border px-4 py-1.5 font-mono text-xs">
              <Terminal className="text-primary h-3 w-3" />
              {`// open source. community driven. built monthly.`}
            </div>
          </motion.div>

          <h1 className="font-mono text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <TypingText text={headline} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="text-muted-foreground mt-6 font-mono text-sm leading-relaxed sm:text-base"
          >
            Submit your idea. The community votes during the first week of each
            month. We spend the rest of the month building the winner, then ship
            it back to the community as open source.{" "}
            <span className="text-primary">Your wish is our commit.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.95 }}
            className="mt-8 flex justify-center"
          >
            <CountdownTimer endDate={cycle?.endDate} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/ideas"
              className="group border-primary bg-primary text-primary-foreground hover:text-primary inline-flex h-10 items-center gap-2 border px-6 font-mono text-xs font-bold tracking-widest uppercase transition-all hover:bg-transparent"
            >
              {`> submit_idea`}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/projects"
              className="border-border hover:border-primary hover:text-primary text-muted-foreground inline-flex h-10 items-center gap-2 border px-6 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
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
          <div className="border-border border bg-[#0a0a0a]">
            {/* Terminal title bar */}
            <div className="border-border flex items-center gap-2 border-b px-4 py-2">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 bg-[#27272a]" />
                <div className="h-2.5 w-2.5 bg-[#27272a]" />
                <div className="h-2.5 w-2.5 bg-[#27272a]" />
              </div>
              <span className="text-muted-foreground ml-2 font-mono text-[10px]">
                ~/3wishes — zsh
              </span>
            </div>
            {/* Terminal content */}
            <div className="space-y-2.5 p-5 font-mono text-xs">
              <div>
                <span className="text-primary">$</span>{" "}
                <span className="text-white">
                  3wishes submit --idea &quot;Your idea here&quot;
                </span>
              </div>
              <div className="text-green-400">
                {`✓ Idea submitted. Voting starts now.`}
              </div>
              <div className="mt-2">
                <span className="text-primary">$</span>{" "}
                <span className="text-white">3wishes status</span>
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
                <span className="animate-blink text-primary ml-1">█</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
