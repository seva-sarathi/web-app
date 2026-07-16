import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT,
  dbUser: process.env.DB_USER,              // string
  dbPassword: process.env.DB_PASSWORD,      // string
  dbHost: process.env.DB_HOST,              // string
  dbPort: Number(process.env.DB_PORT),      // number
  dbName: process.env.DB_NAME               // string
};