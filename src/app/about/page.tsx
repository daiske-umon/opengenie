"use client";

import { motion } from "framer-motion";
import { Lightbulb, Vote, Hammer, Globe, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Ideas First",
    description:
      "Everyone has ideas worth building. We remove the barriers between imagination and execution.",
  },
  {
    icon: Heart,
    title: "Open by Default",
    description:
      "Everything we build is open source. Transparency, collaboration, and community ownership.",
  },
  {
    icon: Hammer,
    title: "Ship Every Week",
    description:
      "Momentum beats perfection. We ship working projects weekly and iterate with the community.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Mission */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
        >
          <Sparkles className="h-8 w-8 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold tracking-tight sm:text-5xl"
        >
          Turning ideas into
          <br />
          <span className="text-gradient">open-source reality</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground"
        >
          OpenGenie is a community-powered platform where anyone can submit an
          idea for an open-source project. The community votes, maintainers
          build the winner in one week, and then it&apos;s open for everyone to
          contribute.
        </motion.p>
      </div>

      {/* How it works */}
      <div className="mt-24">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          How it works
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Lightbulb, step: "1", title: "Submit", desc: "Share your idea with the community" },
            { icon: Vote, step: "2", title: "Vote", desc: "Upvote your favorites each week" },
            { icon: Hammer, step: "3", title: "Build", desc: "Maintainers build the top idea" },
            { icon: Globe, step: "4", title: "Open Up", desc: "Project goes live as open source" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="mt-4 text-lg font-semibold">{item.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mt-24">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          What we believe
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <value.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Ready to build?</h2>
        <p className="mt-4 text-muted-foreground">
          Join the community and start turning ideas into code.
        </p>
        <Link
          href="/ideas"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
        >
          Get Started <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
