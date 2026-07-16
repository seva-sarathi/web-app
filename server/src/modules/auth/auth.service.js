import bcrypt from "bcrypt";
import { createUser as createUserInDb, findUserByEmail } from "../../models/user.model.js";

export const createUser = async (username, email, password) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return createUserInDb({
    name: username,
    email,
    password: hashedPassword,
  });
};