import { z } from "zod/v4";
import { router, publicProcedure, adminProcedure } from "../server";
import { cycles, ideas } from "../../db/schema";
import { eq, desc } from "drizzle-orm";

export const cyclesRouter = router({
  getCurrent: publicProcedure.query(async ({ ctx }) => {
    const cycle = ctx.db
      .select()
      .from(cycles)
      .where(eq(cycles.status, "voting"))
      .orderBy(desc(cycles.createdAt))
      .get();

    if (!cycle) {
      // Try building cycle
      const building = ctx.db
        .select()
        .from(cycles)
        .where(eq(cycles.status, "building"))
        .orderBy(desc(cycles.createdAt))
        .get();
      if (building) {
        const idea = building.selectedIdeaId
          ? ctx.db.select().from(ideas).where(eq(ideas.id, building.selectedIdeaId)).get()
          : null;
        return { ...building, selectedIdea: idea };
      }
      return null;
    }

    const idea = cycle.selectedIdeaId
      ? ctx.db.select().from(ideas).where(eq(ideas.id, cycle.selectedIdeaId)).get()
      : null;

    return { ...cycle, selectedIdea: idea };
  }),

  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(cycles)
      .orderBy(desc(cycles.startDate))
      .all();
  }),

  selectIdea: adminProcedure
    .input(z.object({ cycleId: z.number(), ideaId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      ctx.db
        .update(cycles)
        .set({ selectedIdeaId: input.ideaId, status: "building" })
        .where(eq(cycles.id, input.cycleId))
        .run();

      ctx.db
        .update(ideas)
        .set({ status: "selected" })
        .where(eq(ideas.id, input.ideaId))
        .run();

      return { success: true };
    }),

  complete: adminProcedure
    .input(z.object({ cycleId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const cycle = ctx.db.select().from(cycles).where(eq(cycles.id, input.cycleId)).get();
      if (cycle?.selectedIdeaId) {
        ctx.db.update(ideas).set({ status: "shipped" }).where(eq(ideas.id, cycle.selectedIdeaId)).run();
      }
      ctx.db.update(cycles).set({ status: "complete" }).where(eq(cycles.id, input.cycleId)).run();
      return { success: true };
    }),

  create: adminProcedure
    .input(z.object({
      startDate: z.string(),
      endDate: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const cycle = ctx.db
        .insert(cycles)
        .values({
          startDate: new Date(input.startDate),
          endDate: new Date(input.endDate),
          status: "voting",
        })
        .returning()
        .get();
      return cycle;
    }),
});
