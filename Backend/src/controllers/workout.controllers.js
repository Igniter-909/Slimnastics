import asyncHandler from '../utils/asyncHandler.js';
import {ApiError }from '../utils/ApiError.js';
import User from '../models/user.models.js';
import Workout from '../models/workout.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const createWorkout = asyncHandler( async(req,res) =>{
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(404, "User not found");
        }
        if(user.role !== "Trainer"){
            throw new ApiError(403, "You are not authorized to create a workout");
        }
        const {name,description,difficulty,duration,equipment,steps,caloriesBurned,muscleGroup} = req.body;
        const newWorkout = await Workout.create({
            name,
            description,
            difficulty,
            duration,
            equipment,
            steps,
            caloriesBurned,
            muscleGroup,
            trainerId:req.user._id,
            participants: []
        });
        const createdWorkout = await Workout.findById(newWorkout._id);
        if(!createdWorkout){
            throw new ApiError(500, "Workout could not be created");
        }
        return res
        .status(201)
        .json(new ApiResponse(
            201,
            createdWorkout,
            "Workout created successfully"
        ))
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while creating a new workout");
    }
})

const getWorkouts = asyncHandler(async(req,res) =>{
    try {
        const workouts = await Workout.find();
        return res.status(200).json(new ApiResponse(
            200,
            workouts,
            "Workouts fetched successfully"
        ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while fetching workouts");
    }
})

const getWorkout = asyncHandler(async(req,res) =>{
    try {
        const workout = await Workout.findById(req.params.id);
        if(!workout){
            throw new ApiError(404, "Workout not found");
        }
        return res.status(200).json(new ApiResponse(
            200,
            workout,
            "Workout fetched successfully"
        ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while fetching workout");
    }
})

const updateWorkout = asyncHandler(async(req,res) =>{
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(404, "User not found");
        };
        if(user.role !== "Trainer"){
            throw new ApiError(403, "You are not authorized to update a workout");
        };
        
        const ww = await Workout.findById(req.params.id);
        console.log(ww)
        console.log(user)
        if(ww.trainerId.toString() !== req.user._id.toString()){
            throw new ApiError(403, "You are not authorized to update this workout");
        };
        const {name,description,difficulty,duration,equipment,steps,caloriesBurned,muscleGroup} = req.body;
        const workout = await Workout.findByIdAndUpdate(req.params.id, {
            name,
            description,
            difficulty,
            duration,
            equipment,
            steps,
            caloriesBurned,
            muscleGroup
        }, {new: true});
        if(!workout){
            throw new ApiError(404, "Workout not found");
        }
        return res.status(200).json(new ApiResponse(
            200,
            workout,
            "Workout updated successfully"
        ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while updating workout");
    }
})

const deleteWorkout = asyncHandler(async(req,res) =>{
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(404, "User not found");
        };
        if(user.role === "User"){
            throw new ApiError(403, "You are not authorized to delete a workout");
        };
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if(!workout){
            throw new ApiError(404, "Workout not found");
        }
        return res.status(200).json(new ApiResponse(
            200,
            workout,
            "Workout deleted successfully"
        ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while deleting workout");
    }
})

const addParticipant = asyncHandler(async(req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(404, "User not found");
        };
        if(user.role !== "Trainer"){
            throw new ApiError(403, "You are not authorized to add a participant");
        };
        const {date, duration} = req.body;
        const workout = await Workout.findByIdAndUpdate(req.params.workoutId, {
            $push: { participants: {
                userId: req.params.participantId,
                date: date,
                duration: duration
            }}
        }, {new: true});
        if(!workout){
            throw new ApiError(404, "Workout not found");
        }
        return res.status(200).json(new ApiResponse(
            200,
            workout,
            "Participant added successfully"
        ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while adding a participant");
    }
})

const removeParticipant = asyncHandler(async(req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(404, "User not found");
        };
        if(user.role!== "Trainer"){
            throw new ApiError(403, "You are not authorized to remove a participant");
        };
        const workout = await Workout.findByIdAndUpdate(req.params.workoutId, {
            $pull: { participants: {
                userId : req.params.participantId
                }
            }
        }, {new: true});
        if(!workout){
            throw new ApiError(404, "Workout not found");
        }
        return res.status(200).json(new ApiResponse(
            200,
            workout,
            "Participant removed successfully"
        ));
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while removing a participant");
    }
});

const joinWorkout = asyncHandler( async( req,res ) =>{
    try {
        const user = await User.findById(req.user._id);
        const { trainerApproval, date, duration } = req.body;
        if(!user){
            throw new ApiError(404, "User not found");
        };
        if(user.role !== "User"){
            throw new ApiError(403, "Only users can join a workout plan")
        }
        const workoutPlan = await Workout.findById(req.params.id).populate('trainerId','name email');
        if(!workoutPlan){
            throw new ApiError(404, "Workout not found");
        }
        const trainer = workoutPlan.trainerId;
        if(!trainerApproval){
            throw new ApiError(403, "Trainer has not approved your request yet");
        }
        if(workoutPlan.participants.includes(req.user._id)){
            throw new ApiError(403, "You have already joined this workout plan");
        }
        const participantData = {
            userId:req.user._id,
            date,
            duration
        }
        workoutPlan.participants.push(participantData);
        await workoutPlan.save();
        return res.status(200).json(new ApiResponse(
            200,
            workoutPlan,
            "You have successfully joined the workout plan"
        ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while joining a workout");
    }
})

const exitWorkout = asyncHandler( async(req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(404, "User not found");
        }
        const workoutId = req.params.id;
        const workoutPlan = await Workout.findById(workoutId);
        if(!workoutPlan){
            throw new ApiError(404, "Workout not found");
        }
        if (!workoutPlan.participants.some(participant => participant.userId.equals(req.user._id))) {
            throw new ApiError(403, "You are not a participant of this workout plan");
        }
        workoutPlan.participants = workoutPlan.participants.filter(
            (participant) => !participant.userId.equals(req.user._id)
        );

        await workoutPlan.save();
        return res.status(200).json(new ApiResponse(
            200,
            workoutPlan,
            "You have successfully exited the workout plan"
        ));
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while exiting a workout plan")
    }
})

                                                                                                             

export {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout,
    addParticipant,
    removeParticipant,
    joinWorkout,
    exitWorkout
}