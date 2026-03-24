import { z } from "zod/v4";
import { router, publicProcedure, protectedProcedure, adminProcedure } from "../server";
import { ideas, votes, comments, users } from "../../db/schema";
import { eq, desc, asc, like, and, sql, count } from "drizzle-orm";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

export const ideasRouter = router({
  list: publicProcedure
    .input(
      z.object({
        status: z.enum(["draft", "voting", "selected", "building", "shipped", "archived"]).optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      const { status, search, limit = 20, offset = 0 } = input ?? {};
      const conditions = [];

      if (status) conditions.push(eq(ideas.status, status));
      if (search) conditions.push(like(ideas.title, `%${search}%`));

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const rows = ctx.db
        .select({
          id: ideas.id,
          title: ideas.title,
          slug: ideas.slug,
          description: ideas.description,
          status: ideas.status,
          voteCount: ideas.voteCount,
          tags: ideas.tags,
          createdAt: ideas.createdAt,
          submitterUsername: users.username,
        })
        .from(ideas)
        .leftJoin(users, eq(ideas.submitterId, users.id))
        .where(where)
        .orderBy(desc(ideas.voteCount))
        .limit(limit)
        .offset(offset)
        .all();

      // Get comment counts
      const ideasWithComments = rows.map((row) => {
        const commentCount = ctx.db
          .select({ count: count() })
          .from(comments)
          .where(eq(comments.ideaId, row.id))
          .get();
        return { ...row, commentCount: commentCount?.count ?? 0 };
      });

      const total = ctx.db
        .select({ count: count() })
        .from(ideas)
        .where(where)
        .get();

      return { ideas: ideasWithComments, total: total?.count ?? 0 };
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const idea = ctx.db
        .select()
        .from(ideas)
        .where(eq(ideas.slug, input.slug))
        .get();
      if (!idea) return null;

      const submitter = idea.submitterId
        ? ctx.db.select().from(users).where(eq(users.id, idea.submitterId)).get()
        : null;

      const ideaComments = ctx.db
        .select({
          id: comments.id,
          body: comments.body,
          createdAt: comments.createdAt,
          username: users.username,
          avatarUrl: users.avatarUrl,
        })
        .from(comments)
        .leftJoin(users, eq(comments.userId, users.id))
        .where(eq(comments.ideaId, idea.id))
        .orderBy(desc(comments.createdAt))
        .all();

      return { ...idea, submitter, comments: ideaComments };
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3).max(200),
        description: z.string().min(10).max(5000),
        problemStatement: z.string().max(2000).optional(),
        targetUsers: z.string().max(1000).optional(),
        tags: z.array(z.string()).max(5).default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const slug = slugify(input.title) + "-" + Date.now().toString(36);
      const idea = ctx.db
        .insert(ideas)
        .values({
          ...input,
          slug,
          submitterId: ctx.user.id,
          status: "voting",
        })
        .returning()
        .get();
      return idea;
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(3).max(200).optional(),
        description: z.string().min(10).max(5000).optional(),
        status: z.enum(["draft", "voting", "selected", "building", "shipped", "archived"]).optional(),
        tags: z.array(z.string()).max(5).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const idea = ctx.db
        .update(ideas)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(ideas.id, id))
        .returning()
        .get();
      return idea;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      ctx.db.delete(votes).where(eq(votes.ideaId, input.id)).run();
      ctx.db.delete(comments).where(eq(comments.ideaId, input.id)).run();
      ctx.db.delete(ideas).where(eq(ideas.id, input.id)).run();
      return { success: true };
    }),
});
