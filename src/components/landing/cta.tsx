"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-6 flex h-12 w-12 items-center justify-center border border-border"
          >
            <Terminal className="h-6 w-6 text-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold tracking-tight sm:text-4xl font-mono"
          >
            Got an idea?
            <br />
            <span className="text-primary">{`> make_a_wish`}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-sm text-muted-foreground font-mono"
          >
            Submit your idea and let the community decide. The best ones get
            built — for real, as open source, every single week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Link
              href="/ideas"
              className="group inline-flex h-10 items-center gap-2 border border-primary bg-primary px-6 text-xs font-bold text-primary-foreground transition-all hover:bg-transparent hover:text-primary font-mono uppercase tracking-widest"
            >
              {`> submit_idea`}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
