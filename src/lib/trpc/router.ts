import { router } from "./server";
import { ideasRouter } from "./routers/ideas";
import { votesRouter } from "./routers/votes";
import { projectsRouter } from "./routers/projects";
import { cyclesRouter } from "./routers/cycles";
import { usersRouter } from "./routers/users";
import { statsRouter } from "./routers/stats";
import { commentsRouter } from "./routers/comments";

export const appRouter = router({
  ideas: ideasRouter,
  votes: votesRouter,
  projects: projectsRouter,
  cycles: cyclesRouter,
  users: usersRouter,
  stats: statsRouter,
  comments: commentsRouter,
});

export type AppRouter = typeof appRouter;
