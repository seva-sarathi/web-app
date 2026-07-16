import bcrypt from "bcrypt";
import { createUser as createUserInDb, findUserByEmail, findUserByUsername } from "../../models/user.model.js";
import { db } from "../../database/db.js";
import jwt from "jsonwebtoken";
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

export const loginUser = async(username, password) => {
  console.log(username);
  const user = await findUserByUsername(username);
  if (!user) {
    const error = new Error("User does not exists");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  // 3. Generate Access Token (Short-lived, e.g., 15 minutes)
  const accessToken = jwt.sign(
    { 
      userId: user.id, 
      role: user.role_name // Inject role so middleware can read it without querying the DB
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  // 4. Generate Refresh Token (Long-lived, e.g., 7 days)
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // 5. Remove sensitive data before returning to the controller
  delete user.password_hash;

  return { user, accessToken, refreshToken };

}