import express from "express";
import cors from "cors";

import routes from "./routes/index.js";

import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", // EXACT URL of your Next.js frontend (no trailing slash)
  credentials: true,               // CRITICAL: Allows cookies (Refresh Tokens) to be sent/received
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));

// Standard middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import cookieParser from "cookie-parser";
app.use(cookieParser());

app.use("/api", routes);

app.use(notFound);

app.use(errorHandler);

export default app;