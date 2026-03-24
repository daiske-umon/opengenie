"use client";

import { PageIllustration } from "@/components/page-illustration";
import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc/client";

export default function ProjectsPage() {
  const { data: projects, isLoading } = trpc.projects.list.useQuery();

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageIllustration
        variant="projects"
        className="top-0 right-0 h-40 w-40 md:h-56 md:w-56"
      />
      <div className="mb-8">
        <h1 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="text-muted-foreground">{`// `}</span>
          <span className="text-primary">projects</span>
        </h1>
        <p className="text-muted-foreground mt-2 font-mono text-xs">
          Open-source projects shipped by the community, built over each monthly
          cycle.
        </p>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground py-12 text-center font-mono text-xs">
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
