
import { env } from "../config/env.js";
import { Pool }  from 'pg';
import { initDB } from "./init.js";

export const db = new Pool({
  user: env.dbUser,
  password: env.dbPassword,
  host: env.dbHost,
  port: env.dbPort, // default Postgres port
  database: env.database
});



export async function connectDatabase() {
  try {
    await db.query("SELECT NOW()");
    initDB();
    console.log("✅ PostgreSQL Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

