import { Router } from "express";
import * as authController from "./auth.controller.js";

const router = Router();

router.get("/health", authController.health);
router.post("/login", authController.login);
router.post("/register", authController.login);
router.get("/get-user", authController.getUsers);

export default router;