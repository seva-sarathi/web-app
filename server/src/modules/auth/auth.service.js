import bcrypt from "bcrypt";
import { createUser as createUserInDb, findUserByEmail } from "../../models/user.model.js";
import { db } from "../../database/db.js";

export const createUser = async (username, email, password, phone, role) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // 2. Fetch the correct role_id from the database
    const roleQuery = await db.query('SELECT id FROM roles WHERE name = $1', [role]);
    if (roleQuery.rows.length === 0) {
        throw new Error(`Role '${role}' does not exist.`);
    }
    
    const role_id = roleQuery.rows[0].id;

  return createUserInDb({
    username,
    email,
    password: hashedPassword,
    phone,
    role_id

  });
};