import { db } from "./db.js";
import bcrypt from "bcrypt"
import { initRolesTable } from "../models/roles.model.js";
import { initUserTable } from "../models/user.model.js";
import { seedRoles } from "./seed/roles.seed.js";
import { seedUser } from "./seed/user.seed.js";


export const initDB = async () =>{
    await initRolesTable();
    await initUserTable();
    await seedRoles();
    await seedUser();
}