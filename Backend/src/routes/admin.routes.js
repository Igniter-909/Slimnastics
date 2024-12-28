import { Router } from "express";
import { getAllClass, getAllUsers, getTrainerAttendance, getUserAttendance } from "../controllers/admin.controllers";
import verifyJWT from "../middlewares/auth.middlewares";

const router = Router();

router.route("/get-all-users").get(verifyJWT, getAllUsers);
router.route("/get-user-attendance").get(verifyJWT,getUserAttendance);
router.route("/get-trainer-attendance").get(verifyJWT,getTrainerAttendance);
router.route("get-class-data").get(verifyJWT,getAllClass);

export default router;