import express from "express";

import routes from "./routes/index.js";

import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api", routes);

app.use(notFound);

// app.use(errorHandler);

export default app;