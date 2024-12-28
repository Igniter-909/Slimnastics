import Attendance from "../models/attendance.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const markAttendance = asyncHandler( async(req,res) => {
    try {
        const { date, status, remarks } = req.body;
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
            status,
            remarks
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
        const { date } = req.query;
        const userId = req.user._id;
        if(!userId){
            throw new ApiError(401,"Invalid user")
        }
        const attendance = await Attendance.findOne({
            date: new Date(date),
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

const updateAttendance = asyncHandler( async(req,res) => {
    try {
        const {attendanceId} = req.params;
        const { status, remarks} = req.body;
        const attendance = await Attendance.findByIdAndUpdate(
            attendanceId,
            { status, remarks },
            { new: true }
        );
        if(!attendance){
            throw new ApiError(404,"Attendance not found");
        }
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            attendance,
            "Attendance updated successfully"
        ))
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while updating the attendance")
    }
});

const deleteAttendance = asyncHandler( async(req,res) => {
    try {
        const { attendanceId } = req.params;
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
    updateAttendance,
    deleteAttendance
}