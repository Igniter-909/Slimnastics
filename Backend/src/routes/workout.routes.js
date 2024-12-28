import { Router } from "express"
import { createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout,
    addParticipant,
    removeParticipant,
    joinWorkout,
    exitWorkout } from "../controllers/workout.controllers";

import verifyJWT from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/create-workout").post(verifyJWT, createWorkout);
router.route("/get-workout/:id").get(getWorkout);
router.route("get-workouts").get(getWorkouts);
router.route("/delete-workout/:id").delete(verifyJWT, deleteWorkout);
router.route("/update-workout/:id").put(verifyJWT, updateWorkout);

router.route("/add-participant/:workoutId/:participantId").put(verifyJWT, addParticipant);
router.route("/remove-participant/:workoutId/:participantId").put(verifyJWT, removeParticipant);
router.route("/join-workout/:id").put(verifyJWT, joinWorkout);
router.route("/exit-workout/:id").put(verifyJWT, exitWorkout);

export default router;