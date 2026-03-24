"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Shipped by the{" "}
              <span className="text-gradient">community</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every project started as someone&apos;s idea. Here are a few favorites.
            </p>
          </motion.div>
          <Link
            href="/projects"
            className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:flex"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                votes={project.votes}
                status={project.status}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            View all projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
