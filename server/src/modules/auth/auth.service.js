import bcrypt from "bcrypt";
import { createUser as createUserInDb, findUserByEmail, findUserByUsername } from "../../models/user.model.js";
import { db } from "../../database/db.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import ApiError from "../../utils/ApiError.js";
export const inviteUser = async (username, email, phone, role) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  // 1. Generate a random temporary password so the DB doesn't complain about NOT NULL
  const tempPassword = crypto.randomBytes(32).toString("hex");
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  // 2. Fetch role_id
  const roleQuery = await db.query('SELECT id FROM roles WHERE name = $1', [role]);
  if (roleQuery.rows.length === 0) throw new Error(`Role '${role}' does not exist.`);
  
  // 3. Create the user in the database
  const newUser = await createUserInDb({
    username,
    email,
    password: hashedPassword,
    phone,
    role_id: roleQuery.rows[0].id
  });

  // 4. Generate a Setup Token (Valid for 24 hours)
  const setupToken = jwt.sign(
    { userId: newUser.id, email: newUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" }
  );

  return { newUser, setupToken };
};

// export const createUser = async (username, email, password, phone, role) => {
//   const existingUser = await findUserByEmail(email);

//   if (existingUser) {
//     const error = new Error("User already exists");
//     error.statusCode = 400;
//     throw error;
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   // 2. Fetch the correct role_id from the database
//     const roleQuery = await db.query('SELECT id FROM roles WHERE name = $1', [role]);
//     if (roleQuery.rows.length === 0) {
//         throw new Error(`Role '${role}' does not exist.`);
//     }
    
//     const role_id = roleQuery.rows[0].id;

//   return createUserInDb({
//     username,
//     email,
//     password: hashedPassword,
//     phone,
//     role_id

//   });
// };

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

export const setupPasswordService = async(token,password) =>{
  if(!password || !token){
    console.log("invalid");
  }
  console.log("hello 1");
  let decoded;
  
  try {
    // 1. Verify the token. If it was tampered with or is expired (past 24h), this throws an error.
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    const error = new Error("Invalid or expired setup token. Please request a new invite.");
    error.statusCode = 400;
    throw error;
  }
  console.log("hello 2");

  // 2. Hash the new password the user typed
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Update the password in the database using the ID embedded in the token
  // 3. Update password and activate, ONLY if currently inactive
  const result = await db.query(
    `UPDATE users 
     SET password_hash = $1, is_active = true 
     WHERE id = $2 AND is_active = false 
     RETURNING id`,
    [hashedPassword, decoded.userId]
  );

  console.log("hello 3");
  // If rowCount is 0, either the ID is wrong, OR the user is already active
  if (result.rowCount === 0) {
  throw new ApiError(400, "User not found or account has already been set up.");
}

  console.log("hello 4");

  return result;

}