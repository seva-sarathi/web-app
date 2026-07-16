import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./database/db.js";

async function startServer() {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

startServer();