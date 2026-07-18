import { Router } from "express";
import { getAllUsers } from "../../modules/user/user.controller.js";
import { verifyJWT, authorizeRoles } from "../../middlewares/auth.middleware.js"; // Adjust path as needed

const router = Router();

// Protect this route: Only logged-in users who are ADMIN or CONTROLLER can view the staff list
router.get(
  "/", 
  verifyJWT, 
  authorizeRoles("ADMIN", "CONTROLLER"), 
  getAllUsers
);

export default router;