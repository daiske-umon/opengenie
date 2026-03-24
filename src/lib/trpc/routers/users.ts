import { z } from "zod/v4";
import { router, publicProcedure, adminProcedure } from "../server";
import { users, ideas, votes, comments } from "../../db/schema";
import { eq, count, desc } from "drizzle-orm";

export const usersRouter = router({
  getProfile: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = ctx.db.select().from(users).where(eq(users.id, input.id)).get();
      if (!user) return null;

      const ideaCount = ctx.db
        .select({ count: count() })
        .from(ideas)
        .where(eq(ideas.submitterId, input.id))
        .get();

      const voteCount = ctx.db
        .select({ count: count() })
        .from(votes)
        .where(eq(votes.userId, input.id))
        .get();

      return {
        ...user,
        ideaCount: ideaCount?.count ?? 0,
        voteCount: voteCount?.count ?? 0,
      };
    }),

  getActivity: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userIdeas = ctx.db
        .select()
        .from(ideas)
        .where(eq(ideas.submitterId, input.id))
        .orderBy(desc(ideas.createdAt))
        .all();

      const userComments = ctx.db
        .select()
        .from(comments)
        .where(eq(comments.userId, input.id))
        .orderBy(desc(comments.createdAt))
        .all();

      return { ideas: userIdeas, comments: userComments };
    }),

  list: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(users).all();
  }),

  updateRole: adminProcedure
    .input(z.object({
      id: z.string(),
      role: z.enum(["member", "contributor", "maintainer", "core"]),
    }))
    .mutation(async ({ ctx, input }) => {
      ctx.db.update(users).set({ role: input.role }).where(eq(users.id, input.id)).run();
      return { success: true };
    }),
});
