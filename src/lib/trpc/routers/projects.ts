import { z } from "zod/v4";
import { router, publicProcedure } from "../server";
import { projects, ideas } from "../../db/schema";
import { eq, desc, count } from "drizzle-orm";

export const projectsRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const rows = ctx.db
      .select({
        id: projects.id,
        name: projects.name,
        description: projects.description,
        techStack: projects.techStack,
        status: projects.status,
        repoUrl: projects.repoUrl,
        demoUrl: projects.demoUrl,
        launchedAt: projects.launchedAt,
        ideaId: projects.ideaId,
        ideaVoteCount: ideas.voteCount,
      })
      .from(projects)
      .leftJoin(ideas, eq(projects.ideaId, ideas.id))
      .orderBy(desc(projects.createdAt))
      .all();
    return rows;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const project = ctx.db
        .select()
        .from(projects)
        .where(eq(projects.id, input.id))
        .get();
      if (!project) return null;

      const idea = project.ideaId
        ? ctx.db.select().from(ideas).where(eq(ideas.id, project.ideaId)).get()
        : null;

      return { ...project, idea };
    }),
});
