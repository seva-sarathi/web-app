// src/models/user.model.js
import { db } from "../database/db.js";

export const initUserTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL, -- Added UNIQUE here
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role_id INT NOT NULL REFERENCES roles(id),
      phone TEXT NOT NULL,
      is_active BOOLEAN DEFAULT TRUE, -- Added default value
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

export const findUserByEmail = async (email) => {
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

export const findUserByUsername = async (username) => {
  const result = await db.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  return result.rows[0];
};

export const createUser = async ({ username, email, password, phone, role_id }) => {
  // Notice the columns here are changed to "username" and "password_hash"
  const result = await db.query(
    `INSERT INTO users (username, email, password_hash, phone, role_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, username, email, phone, role_id, is_active, created_at`,
    [username, email, password, phone, role_id] 
  );

  return result.rows[0];
};