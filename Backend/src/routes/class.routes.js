import { Router } from "express";
import { cancelEnrollment, createClass, deleteClass, enrollUser, getAvailableClass, getClass, updateClass } from "../controllers/class.controllers.js";
import verifyJWT from "../middlewares/auth.middlewares.js"

const router = Router();

router.route('/create-class').post(verifyJWT, createClass);
router.route("/update-class/:id").put(verifyJWT, updateClass);
router.route('/delete-class/:id').delete(verifyJWT, deleteClass);
router.route('/get-class/:id').get(getClass);

router.route("/enroll-user/:id").post(verifyJWT,enrollUser);
router.route("/cancel-enroll-user/:id").delete(verifyJWT,cancelEnrollment)
router.route("/get-available-classes").get(getAvailableClass);

export default router;
