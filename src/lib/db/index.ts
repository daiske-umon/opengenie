import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import fs from "fs";
import path from "path";
import { ensureSchema } from "./bootstrap";

const configuredDbPath = process.env.DATABASE_PATH;
const openjenieDbPath = configuredDbPath
  ? path.resolve(/* turbopackIgnore: true */ process.cwd(), configuredDbPath)
  : path.join(process.cwd(), "openjenie.db");
const legacyDbPath = path.join(process.cwd(), "3wishes.db");
const dbPath =
  configuredDbPath || fs.existsSync(openjenieDbPath) || !fs.existsSync(legacyDbPath)
    ? openjenieDbPath
    : legacyDbPath;
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const sqlite = new Database(dbPath);

sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
ensureSchema(sqlite);

export const db = drizzle(sqlite, { schema });
export type DB = typeof db;
