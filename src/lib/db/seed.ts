import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { count } from "drizzle-orm";
import path from "path";
import * as schema from "./schema";
import { ensureSchema } from "./bootstrap";

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(
      /* turbopackIgnore: true */ process.cwd(),
      process.env.DATABASE_PATH
    )
  : path.join(process.cwd(), "openjenie.db");

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
ensureSchema(sqlite);

const db = drizzle(sqlite, { schema });

const cycleCount = db.select({ count: count() }).from(schema.cycles).get();

if ((cycleCount?.count ?? 0) === 0) {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  db.insert(schema.cycles)
    .values({
      startDate,
      endDate,
      status: "voting",
    })
    .run();

  console.log("Initialized database schema and created the first voting cycle.");
} else {
  console.log("Initialized database schema. Existing data was left unchanged.");
}

sqlite.close();
