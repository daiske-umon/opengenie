"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { stats as mockStats } from "@/lib/mock-data";

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => {
    if (value >= 1000) return Math.round(v).toLocaleString();
    return Math.round(v).toString();
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          animate(motionValue, value, {
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [motionValue, value, hasAnimated]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const labelMap: Record<string, string> = {
  "Ideas Submitted": "IDEAS",
  "Votes Cast": "VOTES",
  "Projects Shipped": "PROJECTS",
  "Contributors": "CONTRIBUTORS",
};

export function Stats() {
  const { data: stats } = trpc.stats.get.useQuery(undefined, {
    staleTime: 30000,
    retry: 1,
  });

  const displayStats = stats ?? mockStats;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl font-mono">
            <span className="text-muted-foreground">{`// `}</span>
            <span className="text-primary">system_status</span>
          </h2>
          <p className="mt-3 text-muted-foreground font-mono text-xs">
            Real numbers from real builders.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 mx-auto max-w-lg border border-border bg-[#0a0a0a] p-6 font-mono"
        >
          <div className="text-[10px] text-muted-foreground/50 mb-4 border-b border-border pb-3">
            {`$ 3wishes stats --live`}
          </div>
          <div className="space-y-2.5">
            {displayStats.map((stat, i) => {
              const label = labelMap[stat.label] ?? stat.label.toUpperCase();
              const dots = ".".repeat(Math.max(1, 24 - label.length));
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-baseline text-xs"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-muted-foreground/30 mx-1">{dots}</span>
                  <span className="text-primary font-bold text-sm ml-auto">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
