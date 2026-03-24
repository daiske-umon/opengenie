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
      "The community upvotes their favorites from the 1st to the 7th of each month.",
  },
  {
    icon: Hammer,
    cmd: "build",
    title: "Build",
    description:
      "Maintainers build the winning idea from the 8th through the end of the month.",
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
          <h2 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            From idea to open source in{" "}
            <span className="text-primary">one month</span>
          </h2>
          <p className="text-muted-foreground mt-3 font-mono text-xs">
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
              className="group border-border hover:border-primary relative border bg-[#0a0a0a] p-5 transition-colors"
            >
              {/* Step number */}
              <div className="text-muted-foreground/50 mb-3 font-mono text-[10px]">
                {`[${String(i + 1).padStart(2, "0")}]`}
              </div>

              <div className="border-border group-hover:border-primary flex h-8 w-8 items-center justify-center border transition-colors">
                <step.icon className="text-primary h-4 w-4" />
              </div>

              <div className="text-primary mt-3 font-mono text-xs">
                {`$ ${step.cmd}`}
              </div>
              <h3 className="mt-1 font-mono text-sm font-bold">{step.title}</h3>
              <p className="text-muted-foreground mt-2 font-mono text-xs leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div className="bg-border absolute top-1/2 -right-2 hidden h-px w-4 lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
