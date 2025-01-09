import { Router } from "express";
import { getActiveUserCount, getAllClass, getAllContacts, getAllProgress, getAllUsers, getAttendanceSummary, getLastDayPresntUserCount, getMembershipPlanCount, getNewUsersCount, getProductSalesSummary, getTrainerAttendance, getUpcomingExpirations, getUserAttendance, getUserCountByGender, removeUser, userGrowthData } from "../controllers/admin.controllers.js";
import verifyJWT from "../middlewares/auth.middlewares.js";
import verifyAdmin from "../middlewares/admin.middleware.js"

const router = Router();

router.route("/get-all-users").get(verifyJWT, verifyAdmin, getAllUsers);
router.route("/get-user-attendance").get(verifyJWT,verifyAdmin,getUserAttendance);
router.route("/get-trainer-attendance").get(verifyJWT,verifyAdmin,getTrainerAttendance);
router.route("/get-class-data").get(verifyJWT,verifyAdmin,getAllClass);
router.route("/get-all-progress").get(verifyJWT,verifyAdmin,getAllProgress);
router.route("/getActiveUserCount").get(verifyJWT,verifyAdmin,getActiveUserCount);
router.route("/getUserbyGender").get(verifyJWT,verifyAdmin,getUserCountByGender);
router.route("/getAttendanceSummary").get(verifyJWT,verifyAdmin,getAttendanceSummary)
router.route("/getProductSalesSummary").get(verifyJWT,verifyAdmin,getProductSalesSummary);
router.route("/getMembershipPlanCount").get(verifyJWT,verifyAdmin,getMembershipPlanCount);
router.route("/newusersCount").get(verifyJWT,verifyAdmin,getNewUsersCount);
router.route("/lastDayPresentUserCount").get(verifyJWT,verifyAdmin,getLastDayPresntUserCount);
router.route("/upcomingExpirations").get(verifyJWT,verifyAdmin,getUpcomingExpirations);
router.route("/removeUser/:id").delete(verifyJWT,verifyAdmin,removeUser);
router.route("/getUserGrowthData").get(verifyJWT,verifyAdmin,userGrowthData);
router.route("/getAllContact").get(verifyJWT,verifyAdmin,getAllContacts);

export default router;