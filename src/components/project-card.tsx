"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  votes: number;
  status: "shipped" | "building";
}

export function ProjectCard({
  title,
  description,
  techStack,
  votes,
  status,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden border border-border bg-[#0a0a0a] transition-colors hover:border-primary"
    >
      {/* Top accent line */}
      <div className="h-px w-full bg-primary/30" />

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-mono">{title}</h3>
              <span
                className={`border px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                  status === "shipped"
                    ? "border-green-500/30 text-green-400"
                    : "border-primary/30 text-primary"
                }`}
              >
                {status}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground line-clamp-2 font-mono">
              {description}
            </p>
          </div>
          <button className="flex h-7 w-7 shrink-0 items-center justify-center border border-border text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:border-primary hover:text-primary">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="border border-border px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
            >
              [{tech}]
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Star className="h-3 w-3 text-primary" />
          {votes} votes
        </div>
      </div>
    </motion.div>
  );
}
