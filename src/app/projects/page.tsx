"use client";

import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/lib/mock-data";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="mt-2 text-muted-foreground">
          Open-source projects shipped by the community — from idea to code in one week.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
    </div>
  );
}
