import { Router } from "express";
import { getDashboardSummary } from "../../modules/dashboard/dashboard.controller.js";
import { checkHealth } from "../../modules/health/health.controller.js";
import { verifyJWT, authorizeRoles } from "../../middlewares/auth.middleware.js";

const router = Router();

// Health check is public (or can be restricted based on your infrastructure preference)
router.get("/health", checkHealth);

// Dashboard metrics are strictly for Controllers and Admins
router.get(
  "/dashboard/summary", 
  verifyJWT, 
  authorizeRoles("CONTROLLER", "ADMIN"), 
  getDashboardSummary
);

export default router;