import { Router } from "express";
import { getAllClass, getAllProgress, getAllUsers, getTrainerAttendance, getUserAttendance } from "../controllers/admin.controllers.js";
import verifyJWT from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/get-all-users").get(verifyJWT, getAllUsers);
router.route("/get-user-attendance").get(verifyJWT,getUserAttendance);
router.route("/get-trainer-attendance").get(verifyJWT,getTrainerAttendance);
router.route("/get-class-data").get(verifyJWT,getAllClass);
router.route("/get-all-progress").get(verifyJWT,getAllProgress);

export default router;