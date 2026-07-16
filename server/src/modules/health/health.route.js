import {Router} from "express";
import * as healthController from "./health.controller.js"
const router = Router();

router.get("/", healthController.health);

export default router;