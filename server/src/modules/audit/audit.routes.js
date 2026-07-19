import { Router } from "express";
import { getAuditLogs } from "../modules/audit/audit.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// Secure the route
router.get(
  "/logs", 
  verifyJWT, 
  authorizeRoles("CONTROLLER", "ADMIN"), 
  getAuditLogs
);

export default router;