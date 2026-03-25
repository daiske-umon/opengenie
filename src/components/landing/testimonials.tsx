"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { trpc } from "@/lib/trpc/client";

export function Testimonials() {
  const { data } = trpc.ideas.list.useQuery({ limit: 3 });
  const ideas = data?.ideas ?? [];

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
            Live from the{" "}
            <span className="text-primary">idea board</span>
          </h2>
          <p className="mt-3 text-xs text-muted-foreground font-mono">
            Current submissions from the real database.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {ideas.length > 0 ? (
            ideas.map((idea, i) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative border border-border bg-[#0a0a0a] p-5 transition-colors hover:border-primary"
              >
                <div className="text-primary font-mono text-lg">{`>`}</div>
                <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted-foreground font-mono">
                  {idea.description}
                </p>
                <div className="mt-5 border-t border-border pt-4">
                  <div className="text-xs font-bold font-mono">{idea.title}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground font-mono">
                    by @{idea.submitterUsername ?? "unknown"} • {idea.voteCount} votes
                  </div>
                  <Link
                    href={`/ideas/${idea.slug}`}
                    className="mt-3 inline-flex text-[10px] font-mono text-primary"
                  >
                    open_idea
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="border border-dashed border-border p-6 font-mono text-xs text-muted-foreground sm:col-span-3">
              No ideas have been submitted yet. Once the first GitHub-authenticated
              member posts an idea, it will show up here.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
