
import { env } from "./env.js";
import { Pool }  from 'pg';

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
    console.log("✅ PostgreSQL Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

