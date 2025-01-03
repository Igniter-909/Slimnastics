import Attendance from "../models/attendance.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const markAttendance = asyncHandler( async(req,res) => {
    try {
        const { date, status } = req.body;
        const userId = req.user._id;
        const existingAttendance = await Attendance.findOne({
            user: userId,
            date
        });
        if(existingAttendance) {
            throw new ApiError(400,"Attendance for this date already exists");
        }
        const attendance = await Attendance.create({
            user: userId,
            date,
            status
        })

        const createdAttendance = await Attendance.findById(attendance._id);
        if(!createdAttendance){
            throw new ApiError(500,"Failed to create attendance");
        }
        return res
        .status(201)
        .json(new ApiResponse(
            201,
            createdAttendance,
            "Attendance marked successfully"
        ))

    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong in marking attendance");
    }
})

const getAttendance = asyncHandler( async( req,res ) => {
    try {
        const { date } = req.body;
        const userId = req.user._id;
        if(!userId){
            throw new ApiError(401,"Invalid user")
        }
        const attendance = await Attendance.findOne({
            user: userId
        }).populate('user');
        if(!attendance){
            throw new ApiError(404,"Attendance not found for this date");
        }
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            attendance,
            "Attendance fetched successfully"
        ))

    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong in fetching the records")
    }
})

const deleteAttendance = asyncHandler( async(req,res) => {
    try {
        const user = req.user._id;
        if(!user){
            throw new ApiError(401, "User not found");
        }
        const { date } = req.body;
        const attendance = await Attendance.findOne({
            user,
            date
        })
        if(!attendance){
            throw new ApiError(404,"Attendance not found for this date");
        }
        const { attendanceId } = attendance._id;
        const deletedAttendance = await Attendance.findByIdAndDelete(attendanceId);
        if(!deletedAttendance){
            throw new ApiError(404,"Attendance not found");
        }
        return res
       .status(200)
       .json(new ApiResponse(
            200,
            deletedAttendance,
            "Attendance deleted successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while deleting the attendance")
    }
});


export {
    markAttendance,
    getAttendance,
    deleteAttendance
}