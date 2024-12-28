import { Router } from "express";
import { addMembershipPlan, 
    deleteMembershipPlan, 
    getAllMembershipPlans, 
    getAllParticipants, 
    getaPlan, 
    updateMembershipPlan 
} from "../controllers/membership.controllers.js";
import verifyJWT from "../middlewares/auth.middlewares.js";
import verifyAdmin from "../middlewares/admin.middleware.js";

const router = Router();

router.route('/add-plan').post(verifyJWT,verifyAdmin,addMembershipPlan);
router.route('/all-plans').get(getAllMembershipPlans);
router.route("/update-membership-plan/:id").put(verifyJWT,verifyAdmin, updateMembershipPlan);
router.route("/delete-membership-plan/:id").delete(verifyJWT,verifyAdmin, deleteMembershipPlan);
router.route("/get-plan/:id").get(getaPlan);
router.route("/get-participants/:id").get(verifyJWT,verifyAdmin, getAllParticipants);

export default router;