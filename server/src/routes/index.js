import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
//import userRoutes from "../modules/users/user.routes.js";
// import hospitalRoutes from "../modules/hospitals/hospital.routes.js";

const router = Router();

router.use("/v1/auth", authRoutes);

router.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});
//router.use("/v1/users", userRoutes);

//router.use("/v1/hospitals", hospitalRoutes);

export default router;