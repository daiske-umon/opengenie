import { z } from "zod/v4";
import { router, publicProcedure, protectedProcedure } from "../server";
import { votes, ideas } from "../../db/schema";
import { eq, and, sql, count } from "drizzle-orm";

export const votesRouter = router({
  cast: protectedProcedure
    .input(z.object({ ideaId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const existing = ctx.db
        .select()
        .from(votes)
        .where(and(eq(votes.userId, ctx.user.id), eq(votes.ideaId, input.ideaId)))
        .get();

      if (existing) {
        throw new Error("Already voted on this idea");
      }

      ctx.db.insert(votes).values({
        userId: ctx.user.id,
        ideaId: input.ideaId,
      }).run();

      ctx.db
        .update(ideas)
        .set({ voteCount: sql`${ideas.voteCount} + 1` })
        .where(eq(ideas.id, input.ideaId))
        .run();

      const idea = ctx.db.select().from(ideas).where(eq(ideas.id, input.ideaId)).get();
      return { voteCount: idea?.voteCount ?? 0 };
    }),

  remove: protectedProcedure
    .input(z.object({ ideaId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const existing = ctx.db
        .select()
        .from(votes)
        .where(and(eq(votes.userId, ctx.user.id), eq(votes.ideaId, input.ideaId)))
        .get();

      if (!existing) {
        throw new Error("Vote not found");
      }

      ctx.db
        .delete(votes)
        .where(and(eq(votes.userId, ctx.user.id), eq(votes.ideaId, input.ideaId)))
        .run();

      ctx.db
        .update(ideas)
        .set({ voteCount: sql`MAX(${ideas.voteCount} - 1, 0)` })
        .where(eq(ideas.id, input.ideaId))
        .run();

      const idea = ctx.db.select().from(ideas).where(eq(ideas.id, input.ideaId)).get();
      return { voteCount: idea?.voteCount ?? 0 };
    }),

  getByIdea: publicProcedure
    .input(z.object({ ideaId: z.number() }))
    .query(async ({ ctx, input }) => {
      const voteList = ctx.db
        .select()
        .from(votes)
        .where(eq(votes.ideaId, input.ideaId))
        .all();
      return voteList;
    }),

  hasVoted: publicProcedure
    .input(z.object({ ideaId: z.number(), userId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (!input.userId) return false;
      const vote = ctx.db
        .select()
        .from(votes)
        .where(and(eq(votes.userId, input.userId), eq(votes.ideaId, input.ideaId)))
        .get();
      return !!vote;
    }),
});
