"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/mock-data";

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl font-mono">
            Loved by{" "}
            <span className="text-primary">builders</span>
          </h2>
          <p className="mt-3 text-xs text-muted-foreground font-mono">
            Hear from the people turning ideas into reality.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative border border-border bg-[#0a0a0a] p-5 transition-colors hover:border-primary"
            >
              <div className="text-primary font-mono text-lg">{`"`}</div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground font-mono">
                {t.content}
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-8 w-8 items-center justify-center border border-border text-xs font-bold text-primary font-mono">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold font-mono">{t.name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
