import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { auth } from "../auth";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export type Context = {
  db: typeof db;
  session: { user?: { id?: string; name?: string | null; email?: string | null; image?: string | null } } | null;
  user: typeof users.$inferSelect | null;
};

export async function createContext(): Promise<Context> {
  const session = await auth() as { user?: { id?: string; name?: string | null; email?: string | null; image?: string | null } } | null;
  let user = null;
  if (session?.user?.id) {
    user = db.select().from(users).where(eq(users.id, session.user.id)).get() ?? null;
  }
  return { db, session, user };
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user || !ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, session: ctx.session, user: ctx.user } });
});

export const adminProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user || !["maintainer", "core"].includes(ctx.user.role)) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx: { ...ctx, session: ctx.session!, user: ctx.user } });
});
