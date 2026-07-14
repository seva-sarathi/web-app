import pkg from "pg";
import { env } from "./env.js";

const { Pool } = pkg;

export const db = new Pool({
  connectionString: env.databaseUrl,
  ssl: { rejectUnauthorized: false }
});


export async function connectDatabase() {
  try {
    await db.query("SELECT NOW()");
    console.log("✅ PostgreSQL Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}