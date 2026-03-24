import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "opengenie.db");

// Read and execute the SQL schema to create tables
const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

// Create tables manually since we're not using drizzle-kit push here
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    github_id TEXT UNIQUE,
    username TEXT NOT NULL,
    name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'member',
    votes_remaining INTEGER NOT NULL DEFAULT 10,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS cycles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_date INTEGER NOT NULL,
    end_date INTEGER NOT NULL,
    selected_idea_id INTEGER,
    status TEXT NOT NULL DEFAULT 'voting',
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS ideas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    problem_statement TEXT,
    target_users TEXT,
    submitter_id TEXT REFERENCES users(id),
    status TEXT NOT NULL DEFAULT 'draft',
    vote_count INTEGER NOT NULL DEFAULT 0,
    tags TEXT DEFAULT '[]',
    created_at INTEGER,
    updated_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL REFERENCES users(id),
    idea_id INTEGER NOT NULL REFERENCES ideas(id),
    cycle_id INTEGER REFERENCES cycles(id),
    created_at INTEGER
  );

  CREATE UNIQUE INDEX IF NOT EXISTS votes_user_idea_idx ON votes(user_id, idea_id);

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idea_id INTEGER REFERENCES ideas(id),
    name TEXT NOT NULL,
    repo_url TEXT,
    demo_url TEXT,
    description TEXT,
    tech_stack TEXT DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'active',
    launched_at INTEGER,
    created_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL REFERENCES users(id),
    idea_id INTEGER NOT NULL REFERENCES ideas(id),
    body TEXT NOT NULL,
    created_at INTEGER,
    updated_at INTEGER
  );
`);

const db = drizzle(sqlite, { schema });

function ts(daysAgo: number = 0): Date {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
}

// Clear existing data
sqlite.exec("DELETE FROM comments");
sqlite.exec("DELETE FROM votes");
sqlite.exec("DELETE FROM projects");
sqlite.exec("DELETE FROM ideas");
sqlite.exec("DELETE FROM cycles");
sqlite.exec("DELETE FROM users");

console.log("Seeding database...");

// --- Users ---
const adminUser = db.insert(schema.users).values({
  id: "user-admin",
  username: "sarah_dev",
  name: "Sarah Chen",
  avatarUrl: null,
  role: "core",
  votesRemaining: 10,
  createdAt: ts(90),
}).returning().get();

const contributorUser = db.insert(schema.users).values({
  id: "user-contributor",
  username: "marcus_j",
  name: "Marcus Johnson",
  avatarUrl: null,
  role: "contributor",
  votesRemaining: 8,
  createdAt: ts(60),
}).returning().get();

const memberUser = db.insert(schema.users).values({
  id: "user-member",
  username: "aiko_t",
  name: "Aiko Tanaka",
  avatarUrl: null,
  role: "member",
  votesRemaining: 10,
  createdAt: ts(30),
}).returning().get();

console.log("  Created 3 users");

// --- Ideas ---
const ideaData = [
  {
    title: "AI-powered code review bot",
    slug: "ai-code-review-bot",
    description: "A GitHub bot that reviews PRs using LLMs and suggests improvements based on project conventions.",
    problemStatement: "Code reviews are slow and inconsistent. Junior devs wait hours for feedback while senior devs are overwhelmed.",
    targetUsers: "Development teams using GitHub",
    submitterId: adminUser.id,
    status: "building" as const,
    voteCount: 342,
    tags: JSON.stringify(["AI", "Developer Tools", "GitHub"]),
    createdAt: ts(45),
    updatedAt: ts(10),
  },
  {
    title: "Open source Calendly alternative",
    slug: "open-source-calendly",
    description: "Privacy-first scheduling tool with Cal.com-level features but even simpler setup. One-click deploy.",
    problemStatement: "Calendly charges $10/mo for basic features and stores user data on their servers.",
    targetUsers: "Freelancers, small businesses, privacy-conscious users",
    submitterId: contributorUser.id,
    status: "voting" as const,
    voteCount: 287,
    tags: JSON.stringify(["Productivity", "SaaS", "Privacy"]),
    createdAt: ts(30),
    updatedAt: ts(5),
  },
  {
    title: "CLI dashboard for cloud costs",
    slug: "cli-cloud-costs",
    description: "Terminal-based dashboard showing real-time cloud spending across AWS, GCP, and Azure. TUI built with Ink.",
    problemStatement: "Cloud bills are opaque. Engineers don't know what they're spending until the monthly bill arrives.",
    targetUsers: "DevOps engineers, platform teams, CTOs",
    submitterId: memberUser.id,
    status: "voting" as const,
    voteCount: 256,
    tags: JSON.stringify(["Cloud", "CLI", "DevOps"]),
    createdAt: ts(25),
    updatedAt: ts(3),
  },
  {
    title: "Markdown-to-slides generator",
    slug: "markdown-to-slides",
    description: "Write talks in Markdown, get beautiful slides. Supports themes, speaker notes, and live preview.",
    targetUsers: "Conference speakers, educators, anyone who presents",
    submitterId: adminUser.id,
    status: "voting" as const,
    voteCount: 198,
    tags: JSON.stringify(["Productivity", "Markdown", "Presentations"]),
    createdAt: ts(20),
    updatedAt: ts(20),
  },
  {
    title: "Package dependency visualizer",
    slug: "dependency-visualizer",
    description: "Interactive graph showing your project's dependency tree with vulnerability highlights and size analysis.",
    problemStatement: "node_modules is a black hole. Devs have no idea what's actually in their dependency tree.",
    targetUsers: "JavaScript/TypeScript developers",
    submitterId: contributorUser.id,
    status: "shipped" as const,
    voteCount: 176,
    tags: JSON.stringify(["Developer Tools", "Security", "Visualization"]),
    createdAt: ts(60),
    updatedAt: ts(15),
  },
  {
    title: "Open source feature flag service",
    slug: "feature-flag-service",
    description: "Self-hosted feature flags with a clean dashboard, SDK for 10+ languages, and A/B testing built in.",
    targetUsers: "Product teams, SaaS companies, anyone doing gradual rollouts",
    submitterId: memberUser.id,
    status: "voting" as const,
    voteCount: 164,
    tags: JSON.stringify(["Infrastructure", "SaaS", "Developer Tools"]),
    createdAt: ts(15),
    updatedAt: ts(15),
  },
  {
    title: "Git-based CMS for docs sites",
    slug: "git-based-cms",
    description: "Visual editor for Markdown docs that commits directly to your repo. No database, no vendor lock-in.",
    problemStatement: "Non-technical team members can't contribute to docs without learning Git.",
    targetUsers: "Open source projects, docs teams, technical writers",
    submitterId: adminUser.id,
    status: "shipped" as const,
    voteCount: 312,
    tags: JSON.stringify(["Developer Tools", "Documentation", "CMS"]),
    createdAt: ts(80),
    updatedAt: ts(20),
  },
  {
    title: "API mocking server with AI",
    slug: "ai-api-mock-server",
    description: "Point it at an OpenAPI spec and get a mock server with realistic, AI-generated responses. Hot reload on spec changes.",
    targetUsers: "Frontend developers, QA engineers, API designers",
    submitterId: contributorUser.id,
    status: "building" as const,
    voteCount: 221,
    tags: JSON.stringify(["AI", "API", "Testing"]),
    createdAt: ts(35),
    updatedAt: ts(7),
  },
  {
    title: "Local-first habit tracker",
    slug: "local-first-habit-tracker",
    description: "Privacy-respecting habit tracker with offline sync. Data stays on your devices, syncs via CRDTs.",
    targetUsers: "Privacy-conscious users, self-improvement enthusiasts",
    submitterId: memberUser.id,
    status: "voting" as const,
    voteCount: 145,
    tags: JSON.stringify(["Privacy", "Productivity", "Mobile"]),
    createdAt: ts(10),
    updatedAt: ts(10),
  },
  {
    title: "Browser extension for GitHub insights",
    slug: "github-insights-extension",
    description: "Adds contribution analytics, code frequency charts, and team activity heatmaps right into the GitHub UI.",
    targetUsers: "Engineering managers, open source maintainers",
    submitterId: adminUser.id,
    status: "shipped" as const,
    voteCount: 289,
    tags: JSON.stringify(["Developer Tools", "GitHub", "Analytics"]),
    createdAt: ts(70),
    updatedAt: ts(25),
  },
];

const insertedIdeas = ideaData.map((idea) =>
  db.insert(schema.ideas).values(idea).returning().get()
);
console.log(`  Created ${insertedIdeas.length} ideas`);

// --- Votes ---
const userIds = [adminUser.id, contributorUser.id, memberUser.id];
let voteCount = 0;
for (const idea of insertedIdeas) {
  // Each user votes on some ideas randomly (based on idea id for determinism)
  for (const userId of userIds) {
    if ((idea.id + userId.charCodeAt(5)) % 3 !== 0) {
      try {
        db.insert(schema.votes).values({
          userId,
          ideaId: idea.id,
          createdAt: ts(Math.floor(Math.random() * 30)),
        }).run();
        voteCount++;
      } catch {
        // Skip duplicate
      }
    }
  }
}
console.log(`  Created ${voteCount} votes`);

// --- Projects (for shipped/building ideas) ---
const projectData = [
  {
    ideaId: insertedIdeas.find((i) => i.slug === "dependency-visualizer")!.id,
    name: "DepViz",
    description: "Interactive graph showing your project's dependency tree with vulnerability highlights and size analysis.",
    repoUrl: "https://github.com/opengenie/depviz",
    demoUrl: "https://depviz.dev",
    techStack: JSON.stringify(["TypeScript", "D3.js", "CLI", "SVG"]),
    status: "maintained" as const,
    launchedAt: ts(15),
    createdAt: ts(40),
  },
  {
    ideaId: insertedIdeas.find((i) => i.slug === "git-based-cms")!.id,
    name: "GitDocs",
    description: "Visual editor for Markdown docs that commits directly to your repo. No database, no vendor lock-in.",
    repoUrl: "https://github.com/opengenie/gitdocs",
    demoUrl: "https://gitdocs.dev",
    techStack: JSON.stringify(["Next.js", "ProseMirror", "GitHub API"]),
    status: "maintained" as const,
    launchedAt: ts(20),
    createdAt: ts(50),
  },
  {
    ideaId: insertedIdeas.find((i) => i.slug === "github-insights-extension")!.id,
    name: "GitHub Insights",
    description: "Adds contribution analytics, code frequency charts, and team activity heatmaps right into the GitHub UI.",
    repoUrl: "https://github.com/opengenie/gh-insights",
    techStack: JSON.stringify(["TypeScript", "Chrome Extension", "Chart.js"]),
    status: "maintained" as const,
    launchedAt: ts(25),
    createdAt: ts(45),
  },
];

const insertedProjects = projectData.map((p) =>
  db.insert(schema.projects).values(p).returning().get()
);
console.log(`  Created ${insertedProjects.length} projects`);

// --- Active Voting Cycle ---
const cycle = db.insert(schema.cycles).values({
  startDate: ts(7),
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  status: "voting",
  createdAt: ts(7),
}).returning().get();

// Past complete cycles
db.insert(schema.cycles).values({
  startDate: ts(28),
  endDate: ts(14),
  selectedIdeaId: insertedIdeas.find((i) => i.slug === "dependency-visualizer")!.id,
  status: "complete",
  createdAt: ts(28),
}).run();

db.insert(schema.cycles).values({
  startDate: ts(42),
  endDate: ts(28),
  selectedIdeaId: insertedIdeas.find((i) => i.slug === "git-based-cms")!.id,
  status: "complete",
  createdAt: ts(42),
}).run();

console.log("  Created 3 cycles (1 active voting, 2 complete)");

// --- Comments ---
const commentData = [
  { userId: contributorUser.id, ideaId: insertedIdeas[0].id, body: "This would be amazing! I spend hours reviewing PRs every day.", createdAt: ts(40) },
  { userId: memberUser.id, ideaId: insertedIdeas[0].id, body: "Would it support custom rules per project?", createdAt: ts(38) },
  { userId: adminUser.id, ideaId: insertedIdeas[0].id, body: "Yes! The plan is to support .reviewrc config files.", createdAt: ts(37) },
  { userId: memberUser.id, ideaId: insertedIdeas[1].id, body: "I'd love a self-hosted Calendly. Take my vote!", createdAt: ts(28) },
  { userId: adminUser.id, ideaId: insertedIdeas[1].id, body: "The one-click deploy angle is really compelling.", createdAt: ts(27) },
  { userId: contributorUser.id, ideaId: insertedIdeas[2].id, body: "Multi-cloud cost tracking from the terminal? Sign me up.", createdAt: ts(22) },
  { userId: adminUser.id, ideaId: insertedIdeas[3].id, body: "Marp is good but this could be even better with live preview.", createdAt: ts(18) },
  { userId: memberUser.id, ideaId: insertedIdeas[4].id, body: "This has saved me from so many dependency issues already!", createdAt: ts(50) },
  { userId: contributorUser.id, ideaId: insertedIdeas[5].id, body: "We need a good open-source alternative to LaunchDarkly.", createdAt: ts(12) },
  { userId: adminUser.id, ideaId: insertedIdeas[6].id, body: "GitDocs is one of our best shipped projects. Great community effort!", createdAt: ts(30) },
  { userId: memberUser.id, ideaId: insertedIdeas[7].id, body: "AI-generated mock data is a game changer for frontend dev.", createdAt: ts(32) },
  { userId: contributorUser.id, ideaId: insertedIdeas[8].id, body: "CRDTs for sync is the right call. No server needed!", createdAt: ts(8) },
];

for (const c of commentData) {
  db.insert(schema.comments).values({ ...c, updatedAt: c.createdAt }).run();
}
console.log(`  Created ${commentData.length} comments`);

console.log("\nDone! Database seeded successfully.");
sqlite.close();
