import { Router } from "express";
import * as authController from "./auth.controller.js";
import * as authValidation from "./auth.validation.js"
const router = Router();

router.post("/register",authValidation.registerRules,authValidation.validateRegister, authController.register);

export default router;