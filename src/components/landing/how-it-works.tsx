"use client";

import { motion } from "framer-motion";
import { Lightbulb, Vote, Hammer, Globe } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    cmd: "submit",
    title: "Submit",
    description:
      "Got an idea for an open-source project? Drop it in. No gatekeepers, no pitch decks.",
  },
  {
    icon: Vote,
    cmd: "vote",
    title: "Vote",
    description:
      "The community upvotes their favorites. Best ideas rise to the top every week.",
  },
  {
    icon: Hammer,
    cmd: "build",
    title: "Build",
    description:
      "Maintainers build the winning idea in one week. Fast, focused, and functional.",
  },
  {
    icon: Globe,
    cmd: "deploy",
    title: "Open Up",
    description:
      "The project goes live as open source. Anyone can contribute, extend, and improve.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl font-mono">
            From idea to open source in{" "}
            <span className="text-primary">one week</span>
          </h2>
          <p className="mt-3 text-xs text-muted-foreground font-mono">
            A simple, transparent process that turns community ideas into real
            projects.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative border border-border bg-[#0a0a0a] p-5 transition-colors hover:border-primary"
            >
              {/* Step number */}
              <div className="text-[10px] font-mono text-muted-foreground/50 mb-3">
                {`[${String(i + 1).padStart(2, "0")}]`}
              </div>

              <div className="flex h-8 w-8 items-center justify-center border border-border group-hover:border-primary transition-colors">
                <step.icon className="h-4 w-4 text-primary" />
              </div>

              <div className="mt-3 text-xs font-mono text-primary">
                {`$ ${step.cmd}`}
              </div>
              <h3 className="mt-1 text-sm font-bold font-mono">{step.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground font-mono leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-border lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
