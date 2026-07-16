
import { env } from "../config/env.js";
import { Pool }  from 'pg';
import { initDB } from "./init.js";

export const db = new Pool({
  user: env.dbUser,        // postgres
  password: env.dbPassword, // 1608
  host: env.dbHost,        // localhost
  port: Number(env.dbPort), // 5432 (ensure it's a number)
  database: env.dbName  // udemydb
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

