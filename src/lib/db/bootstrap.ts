import type Database from "better-sqlite3";

export function ensureSchema(sqlite: Database.Database) {
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
}
