import { Router } from "express";
import { getAllClass, getAllProgress, getAllUsers, getTrainerAttendance, getUserAttendance } from "../controllers/admin.controllers.js";
import verifyJWT from "../middlewares/auth.middlewares.js";
import verifyAdmin from "../middlewares/admin.middleware.js"

const router = Router();

router.route("/get-all-users").get(verifyJWT, verifyAdmin, getAllUsers);
router.route("/get-user-attendance").get(verifyJWT,verifyAdmin,getUserAttendance);
router.route("/get-trainer-attendance").get(verifyJWT,verifyAdmin,getTrainerAttendance);
router.route("/get-class-data").get(verifyJWT,verifyAdmin,getAllClass);
router.route("/get-all-progress").get(verifyJWT,verifyAdmin,getAllProgress);

export default router;