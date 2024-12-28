import Attendance from "../models/attendance.models";
import Class from "../models/class.models";
import Progress from "../models/progress.models";
import User from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

const getAllUsers = asyncHandler( async(req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(user.role !== "Admin"){
            throw new ApiError(403, "You are not authorized to access this route");
        }
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
        const user = await User.findById(req.user._id);
        if(user.role!== "Admin"){
            throw new ApiError(403, "You are not authorized to access this route");
        }
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
        throw new ApiError(500,"Could not get all attendance")
    }
})

const getTrainerAttendance = asyncHandler( async(req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if(user.role!== "Admin"){
            throw new ApiError(403, "You are not authorized to access this route");
        }
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
        throw new ApiError(500,"Could not get all attendance")
    }
})

const getAllClass = asyncHandler( async(request,res) =>{
    try {
        const user = await User.findById(request.user._id);
        if(user.role!== "Admin"){
            throw new ApiError(403, "You are not authorized to access this route");
        }
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
        const user = await User.findById(req.user._id);
        if(user.role!== "Admin"){
            throw new ApiError(403, "You are not authorized to access this route");
        }
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
