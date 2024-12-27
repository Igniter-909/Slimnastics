import { Router } from "express";
import verifyJWT from "../middlewares/auth.middlewares";
import { deleteAttendance, getAttendance, markAttendance, updateAttendance } from "../controllers/attendance.controllers";

const router = Router();

router.route('/mark').post(verifyJWT, markAttendance);
router.route("/update").put(verifyJWT,updateAttendance)
router.route("/get-attendance").post(verifyJWT, getAttendance);
router.route("/delete-attendance").delete(verifyJWT,deleteAttendance);

export default router;