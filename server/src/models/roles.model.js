import { db } from "../database/db.js";

export const initRolesTable = async () => {
  await db.query(`
        CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'CONTROLLER', 'ADMIN', 'USER'
        description TEXT);
    `);
};
