"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{
            background:
              "conic-gradient(from 0deg, oklch(0.55 0.24 270 / 0.3), oklch(0.78 0.16 75 / 0.3), oklch(0.55 0.24 270 / 0.3))",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-gold/20 glow-primary"
          >
            <Sparkles className="h-10 w-10 text-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-5xl"
          >
            Got an idea?
            <br />
            <span className="text-gradient">Make a wish.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Submit your idea and let the community decide. The best ones get
            built — for real, as open source, every single week.
          </motion.p>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10"
          >
            <Link
              href="/ideas"
              className="group relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-xl bg-primary px-10 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%] transition-all group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
              <span className="relative flex items-center gap-2">
                Submit Your Idea
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
