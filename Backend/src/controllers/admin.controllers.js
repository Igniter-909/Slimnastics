import Attendance from "../models/attendance.models.js";
import Class from "../models/class.models.js";
import Progress from "../models/progress.models.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getAllUsers = asyncHandler( async(req,res) => {
    try {
        const users = await User.find({});
        if(users.length <= 0){
            throw new ApiError(404, "No users found");
        }
        return res
            .status(200)
            .json(new ApiResponse(
                200,
                users,
                "Users fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch all users")
    }
})

const getUserAttendance = asyncHandler( async(req,res) => {
    try {
        
        const attendance = await Attendance.find().populate('user');
        if(attendance.length <= 0){
            throw new ApiError(404, "No attendance records found");
        }

        const filteredAttendance = attendance.filter(record => (
            record.user.role.toString() === "User"
        ))

        return res
           .status(200)
           .json(new ApiResponse(
                200,
                filteredAttendance,
                "Attendance records fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not get all attendance")
    }
})

const getTrainerAttendance = asyncHandler( async(req,res) => {
    try {
        const attendance = await Attendance.find().populate('user');
        if(attendance.length <= 0){
            throw new ApiError(404, "No attendance records found");
        }

        const filteredAttendance = attendance.filter(record => (
            record.user.role.toString() === "Trainer"
        ))

        return res
           .status(200)
           .json(new ApiResponse(
                200,
                filteredAttendance,
                "Attendance records fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not get all attendance")
    }
})

const getAllClass = asyncHandler( async(request,res) =>{
    try {
        const classes = await Class.find({});
        if(classes.length <= 0){
            throw new ApiError(404, "No classes found");
        }
        return res
           .status(200)
           .json(new ApiResponse(
                200,
                classes,
                "Classes fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Could not fetch all classes")
    }
})

const getAllProgress = asyncHandler( async(request,res) => {
    try {
        const progress = await Progress.find({});
        if(progress.length <= 0){
            throw new ApiError(404, "No progress records found");
        }
        return res
         .status(200)
         .json(new ApiResponse(
                200,
                progress,
                "Progress records fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500, error?.message || "Could not fetch all progress");
    }
})

export {
    getAllUsers,
    getUserAttendance,
    getTrainerAttendance,
    getAllClass,
    getAllProgress
 };
