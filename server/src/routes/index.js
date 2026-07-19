import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import healthRoute from "../modules/health/health.route.js";
import userRoutes from "../modules/user/user.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js"
// import hospitalRoutes from "../modules/hospitals/hospital.routes.js";

const router = Router();

router.use("/v1/auth", authRoutes);
router.use("/v1/health",healthRoute );

router.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

router.use("/v1/users", userRoutes);

router.use("/v1", dashboardRoutes)
//router.use("/v1/users", userRoutes);

//router.use("/v1/hospitals", hospitalRoutes);

export default router;