"use client";

import { Badge } from "@/components/ui/badge";
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card"
    >
      {/* Gradient top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-purple-500 to-gold" />

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              <Badge
                variant="outline"
                className={
                  status === "shipped"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                }
              >
                {status}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
          <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-secondary">
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs font-mono">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Star className="h-3.5 w-3.5 text-gold" />
          {votes} votes
        </div>
      </div>
    </motion.div>
  );
}
