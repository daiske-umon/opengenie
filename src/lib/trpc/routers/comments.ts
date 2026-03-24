import { z } from "zod/v4";
import { router, publicProcedure, protectedProcedure } from "../server";
import { comments, users } from "../../db/schema";
import { eq, desc } from "drizzle-orm";

export const commentsRouter = router({
  getByIdea: publicProcedure
    .input(z.object({ ideaId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select({
          id: comments.id,
          body: comments.body,
          createdAt: comments.createdAt,
          username: users.username,
          avatarUrl: users.avatarUrl,
        })
        .from(comments)
        .leftJoin(users, eq(comments.userId, users.id))
        .where(eq(comments.ideaId, input.ideaId))
        .orderBy(desc(comments.createdAt))
        .all();
    }),

  create: protectedProcedure
    .input(z.object({
      ideaId: z.number(),
      body: z.string().min(1).max(5000),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .insert(comments)
        .values({
          userId: ctx.user.id,
          ideaId: input.ideaId,
          body: input.body,
        })
        .returning()
        .get();
    }),
});
