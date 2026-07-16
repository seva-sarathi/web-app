
import { env } from "../config/env.js";
import { Pool }  from 'pg';
import { initDB } from "./init.js";

export const db = new Pool({
  user: 'postgres',
  password: '1608',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'udemydb'
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

