import { router, publicProcedure } from "../server";
import { ideas, votes, projects, users } from "../../db/schema";
import { count } from "drizzle-orm";

export const statsRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const ideaCount = ctx.db.select({ count: count() }).from(ideas).get();
    const voteCount = ctx.db.select({ count: count() }).from(votes).get();
    const projectCount = ctx.db.select({ count: count() }).from(projects).get();
    const userCount = ctx.db.select({ count: count() }).from(users).get();

    return [
      { label: "Ideas Submitted", value: ideaCount?.count ?? 0, suffix: "" },
      { label: "Votes Cast", value: voteCount?.count ?? 0, suffix: "+" },
      { label: "Projects Shipped", value: projectCount?.count ?? 0, suffix: "" },
      { label: "Contributors", value: userCount?.count ?? 0, suffix: "" },
    ];
  }),
});
