import { Router } from "express";
import { addProgress, getProgress } from "../controllers/progress.controllers.js";
import verifyJWT from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/add-progress").post(verifyJWT, addProgress);
router.route("/get-progress").post(verifyJWT, getProgress);

export default router;