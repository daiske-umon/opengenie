"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, oklch(0.55 0.24 270 / 0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, oklch(0.78 0.16 75 / 0.2) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 sm:pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Open source. Community driven. Built weekly.
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Ideas in.{" "}
            <span className="text-gradient">Code out.</span>
            <br />
            Every week.
          </motion.h1>

          <motion.p
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground sm:text-xl"
          >
            Submit your idea. The community votes. We build the winner in one
            week — then open it up for everyone to contribute.{" "}
            <span className="text-foreground font-medium">
              Your wish is our commit.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/ideas"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%] transition-all group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
              <span className="relative flex items-center gap-2">
                Submit an Idea
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-secondary/50 px-8 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              View Projects
            </Link>
          </motion.div>
        </div>

        {/* Hero visual - floating cards */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mx-auto mt-20 max-w-4xl"
        >
          <div className="glass rounded-2xl p-1">
            <div className="rounded-xl bg-card/80 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/50" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                  <div className="h-3 w-3 rounded-full bg-green-500/50" />
                </div>
                <span className="ml-2 font-mono">opengenie — this week</span>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  { icon: "💡", text: "AI-powered code review bot", votes: 342, hot: true },
                  { icon: "📅", text: "Open source Calendly alternative", votes: 287, hot: false },
                  { icon: "💰", text: "CLI dashboard for cloud costs", votes: 256, hot: false },
                ].map((idea, i) => (
                  <motion.div
                    key={idea.text}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.15 }}
                    className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                      idea.hot
                        ? "border-primary/30 bg-primary/5"
                        : "border-border bg-secondary/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{idea.icon}</span>
                      <span className="text-sm font-medium">{idea.text}</span>
                      {idea.hot && (
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          TOP VOTED
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-sm font-semibold tabular-nums text-muted-foreground">
                      ▲ {idea.votes}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* Glow effect under the card */}
          <div className="absolute -bottom-8 left-1/2 -z-10 h-32 w-3/4 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
