"use client";

import { PageIllustration } from "@/components/page-illustration";
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
    title: "Ship Every Month",
    description:
      "Momentum beats perfection. We ship working projects on a monthly cycle and iterate with the community.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageIllustration
        variant="about"
        className="top-4 right-0 h-40 w-56 md:h-52 md:w-72"
      />
      {/* Mission */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-border mx-auto mb-6 flex h-12 w-12 items-center justify-center border"
        >
          <Terminal className="text-primary h-6 w-6" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-mono text-2xl font-bold tracking-tight sm:text-4xl"
        >
          Turning ideas into
          <br />
          <span className="text-primary">open-source reality</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mt-5 font-mono text-sm"
        >
          OpenGenie is a community-powered platform where anyone can submit an
          idea for an open-source project. The community votes, maintainers
          review the board during the first week of each month, build the winner
          for the rest of the month, and then ship it back for everyone to
          contribute.
        </motion.p>
      </div>

      {/* How it works */}
      <div className="mt-24">
        <h2 className="text-center font-mono text-xl font-bold sm:text-2xl">
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
              desc: "Upvote your favorites from the 1st to the 7th",
            },
            {
              icon: Hammer,
              step: "03",
              title: "Build",
              desc: "Maintainers build from the 8th through release day",
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
              className="border-border hover:border-primary border p-5 text-center transition-colors"
            >
              <div className="text-muted-foreground/50 mb-2 font-mono text-[10px]">
                [{item.step}]
              </div>
              <div className="border-border mx-auto flex h-10 w-10 items-center justify-center border">
                <item.icon className="text-primary h-5 w-5" />
              </div>
              <div className="mt-3 font-mono text-sm font-bold">
                {item.title}
              </div>
              <p className="text-muted-foreground mt-1 font-mono text-xs">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mt-24">
        <h2 className="text-center font-mono text-xl font-bold sm:text-2xl">
          <span className="text-muted-foreground">{`// `}</span>what we believe
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="border-border hover:border-primary border bg-[#0a0a0a] p-5 transition-colors"
            >
              <value.icon className="text-primary h-5 w-5" />
              <h3 className="mt-3 font-mono text-sm font-bold">
                {value.title}
              </h3>
              <p className="text-muted-foreground mt-2 font-mono text-xs leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 text-center">
        <h2 className="font-mono text-xl font-bold sm:text-2xl">
          {`> `}
          <span className="text-primary">ready_to_build?</span>
        </h2>
        <p className="text-muted-foreground mt-3 font-mono text-xs">
          Join the community and start turning ideas into code.
        </p>
        <Link
          href="/ideas"
          className="border-primary bg-primary text-primary-foreground hover:text-primary mt-8 inline-flex h-10 items-center gap-2 border px-6 font-mono text-xs font-bold tracking-widest uppercase transition-all hover:bg-transparent"
        >
          {`> get_started`} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
