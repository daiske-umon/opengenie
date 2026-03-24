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
            className="border-border mx-auto mb-6 flex h-12 w-12 items-center justify-center border"
          >
            <Terminal className="text-primary h-6 w-6" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-2xl font-bold tracking-tight sm:text-4xl"
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
            className="text-muted-foreground mt-5 font-mono text-sm"
          >
            Submit your idea and let the community decide. The best ones get
            built for real, as open source, every single month.
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
              className="group border-primary bg-primary text-primary-foreground hover:text-primary inline-flex h-10 items-center gap-2 border px-6 font-mono text-xs font-bold tracking-widest uppercase transition-all hover:bg-transparent"
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
