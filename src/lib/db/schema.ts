import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  githubId: text("github_id").unique(),
  username: text("username").notNull(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  role: text("role", { enum: ["member", "contributor", "maintainer", "core"] }).notNull().default("member"),
  votesRemaining: integer("votes_remaining").notNull().default(10),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const ideas = sqliteTable("ideas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  problemStatement: text("problem_statement"),
  targetUsers: text("target_users"),
  submitterId: text("submitter_id").references(() => users.id),
  status: text("status", { enum: ["draft", "voting", "selected", "building", "shipped", "archived"] }).notNull().default("draft"),
  voteCount: integer("vote_count").notNull().default(0),
  tags: text("tags", { mode: "json" }).$type<string[]>().default([]),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const votes = sqliteTable(
  "votes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id").notNull().references(() => users.id),
    ideaId: integer("idea_id").notNull().references(() => ideas.id),
    cycleId: integer("cycle_id").references(() => cycles.id),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  },
  (table) => [uniqueIndex("votes_user_idea_idx").on(table.userId, table.ideaId)]
);

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ideaId: integer("idea_id").references(() => ideas.id),
  name: text("name").notNull(),
  repoUrl: text("repo_url"),
  demoUrl: text("demo_url"),
  description: text("description"),
  techStack: text("tech_stack", { mode: "json" }).$type<string[]>().default([]),
  status: text("status", { enum: ["active", "maintained", "community", "archived"] }).notNull().default("active"),
  launchedAt: integer("launched_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull().references(() => users.id),
  ideaId: integer("idea_id").notNull().references(() => ideas.id),
  body: text("body").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const cycles = sqliteTable("cycles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),
  selectedIdeaId: integer("selected_idea_id").references(() => ideas.id),
  status: text("status", { enum: ["voting", "building", "complete"] }).notNull().default("voting"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
