"use client";

import { motion } from "framer-motion";
import { Lightbulb, Vote, Hammer, Globe, Heart, Terminal } from "lucide-react";
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
          className="mx-auto mb-6 flex h-12 w-12 items-center justify-center border border-border"
        >
          <Terminal className="h-6 w-6 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold tracking-tight sm:text-4xl font-mono"
        >
          Turning ideas into
          <br />
          <span className="text-primary">open-source reality</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-sm text-muted-foreground font-mono"
        >
          OpenGenie is a community-powered platform where anyone can submit an
          idea for an open-source project. The community votes, maintainers
          build the winner in one week, and then it&apos;s open for everyone to
          contribute.
        </motion.p>
      </div>

      {/* How it works */}
      <div className="mt-24">
        <h2 className="text-center text-xl font-bold sm:text-2xl font-mono">
          <span className="text-muted-foreground">{`// `}</span>how it works
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Lightbulb,
              step: "01",
              title: "Submit",
              desc: "Share your idea with the community",
            },
            {
              icon: Vote,
              step: "02",
              title: "Vote",
              desc: "Upvote your favorites each week",
            },
            {
              icon: Hammer,
              step: "03",
              title: "Build",
              desc: "Maintainers build the top idea",
            },
            {
              icon: Globe,
              step: "04",
              title: "Open Up",
              desc: "Project goes live as open source",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="border border-border p-5 text-center transition-colors hover:border-primary"
            >
              <div className="text-[10px] font-mono text-muted-foreground/50 mb-2">
                [{item.step}]
              </div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center border border-border">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-3 text-sm font-bold font-mono">
                {item.title}
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-mono">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mt-24">
        <h2 className="text-center text-xl font-bold sm:text-2xl font-mono">
          <span className="text-muted-foreground">{`// `}</span>what we believe
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="border border-border bg-[#0a0a0a] p-5 transition-colors hover:border-primary"
            >
              <value.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-sm font-bold font-mono">
                {value.title}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground font-mono leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 text-center">
        <h2 className="text-xl font-bold sm:text-2xl font-mono">
          {`> `}
          <span className="text-primary">ready_to_build?</span>
        </h2>
        <p className="mt-3 text-xs text-muted-foreground font-mono">
          Join the community and start turning ideas into code.
        </p>
        <Link
          href="/ideas"
          className="mt-8 inline-flex h-10 items-center gap-2 border border-primary bg-primary px-6 text-xs font-bold text-primary-foreground transition-all hover:bg-transparent hover:text-primary font-mono uppercase tracking-widest"
        >
          {`> get_started`} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
