import { Router } from "express";
import { addMembershipPlan, 
    deleteMembershipPlan, 
    getAllMembershipPlans, 
    getAllParticipants, 
    getaPlan, 
    updateMembershipPlan 
} from "../controllers/membership.controllers.js";
import verifyJWT from "../middlewares/auth.middlewares.js";

const router = Router();

router.route('/add-plan').post(verifyJWT,addMembershipPlan);
router.route('/all-plans').get(getAllMembershipPlans);
router.route("/update-membership-plan/:id").put(verifyJWT, updateMembershipPlan);
router.route("/delete-membership-plan/:id").delete(verifyJWT, deleteMembershipPlan);
router.route("/get-plan/:id").get(getaPlan);
router.route("/get-participants/:id").get(verifyJWT, getAllParticipants);

export default router;