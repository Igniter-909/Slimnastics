import { Router } from "express";
import verifyJWT from "../middlewares/auth.middlewares.js";
import { deleteAttendance, getAttendance, markAttendance, updateAttendance } from "../controllers/attendance.controllers.js";

const router = Router();

router.route('/mark').post(verifyJWT, markAttendance);
router.route("/update").put(verifyJWT,updateAttendance)
router.route("/get-attendance").post(verifyJWT, getAttendance);
router.route("/delete-attendance").delete(verifyJWT,deleteAttendance);

export default router;