import { Router } from "express";

import * as authController from "./auth.controller.js";
import * as authValidation from "./auth.validation.js";
import { verifyJWT, authorizeRoles } from "../../middlewares/auth.middleware.js";
const router = Router();

router.post(
  "/register",
  verifyJWT, 
  authorizeRoles("CONTROLLER", "ADMIN"), 
  authValidation.registerRules,
  authValidation.validateRegister, 
  authController.register
);

router.post("/login", authController.login)

router.post("/password-setup", authController.setupPassword);
router.post("/refresh", authController.refresh);
export default router;