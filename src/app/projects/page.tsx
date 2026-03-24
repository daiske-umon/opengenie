"use client";

import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc/client";

export default function ProjectsPage() {
  const { data: projects, isLoading } = trpc.projects.list.useQuery();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl font-mono">
          <span className="text-muted-foreground">{`// `}</span>
          <span className="text-primary">projects</span>
        </h1>
        <p className="mt-2 text-xs text-muted-foreground font-mono">
          Open-source projects shipped by the community — from idea to code in
          one week.
        </p>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-muted-foreground font-mono">
          Loading projects...
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(projects ?? []).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectCard
                title={project.name}
                description={project.description ?? ""}
                techStack={(project.techStack as string[]) ?? []}
                votes={project.ideaVoteCount ?? 0}
                status={project.status === "active" ? "building" : "shipped"}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
