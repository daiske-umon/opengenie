"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { trpc } from "@/lib/trpc/client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
  const { data: projects } = trpc.projects.list.useQuery(undefined, {
    staleTime: 30000,
    retry: 1,
  });

  const dbProjects = (projects ?? []).slice(0, 4).map((p) => ({
    id: p.id,
    title: p.name,
    description: p.description ?? "",
    techStack: (p.techStack as string[]) ?? [],
    votes: p.ideaVoteCount ?? 0,
    status: (p.status === "active" ? "building" : "shipped") as
      | "building"
      | "shipped",
  }));

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl font-mono">
              Shipped by the{" "}
              <span className="text-primary">community</span>
            </h2>
            <p className="mt-3 text-xs text-muted-foreground font-mono">
              Every project started as someone&apos;s idea.
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden items-center gap-1 text-xs font-mono text-primary transition-colors hover:text-primary/80 sm:flex"
          >
            view_all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dbProjects.length > 0 ? (
            dbProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
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
            ))
          ) : (
            <div className="border border-dashed border-border p-6 font-mono text-xs text-muted-foreground sm:col-span-2 lg:col-span-4">
              No projects have been shipped yet. The first selected idea will
              appear here once maintainers publish it.
            </div>
          )}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-xs font-mono text-primary"
          >
            view_all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
