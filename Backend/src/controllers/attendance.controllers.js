import Attendance from "../models/attendance.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const markAttendance = asyncHandler(async (req, res) => {
    try {
        const { date, status } = req.body;

        // Validate inputs
        if (!date || !status) {
            throw new ApiError(400, "Date and status are required.");
        }

        // Parse and validate the date
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new ApiError(400, "Invalid date format. Use 'YYYY-MM-DD'.");
        }

        const userId = req.user._id;
        if (!userId) {
            throw new ApiError(401, "User not authorized.");
        }

        const existingAttendance = await Attendance.findOne({
            user: userId,
            date: parsedDate,
        });

        if (existingAttendance) {
            throw new ApiError(400, "Attendance for this date already exists.");
        }

        const attendance = await Attendance.create({
            user: userId,
            date: parsedDate,
            status,
        });

        if (!attendance) {
            throw new ApiError(500, "Failed to create attendance.");
        }

        return res.status(201).json(
            new ApiResponse(201, attendance, "Attendance marked successfully.")
        );
    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(
                error.statusCode || 500,
                null,
                error.message || "Something went wrong in marking attendance."
            )
        );
    }
});


const getAttendance = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            throw new ApiError(401, "User not authorized.");
        }

        const currentDate = new Date();
        const pastYearDate = new Date();
        pastYearDate.setFullYear(currentDate.getFullYear() - 1);

        const attendanceRecords = await Attendance.find({
            user: userId,
            date: {
                $gte: pastYearDate,
                $lte: currentDate
            }
        }).populate("user");

        if (!attendanceRecords || attendanceRecords.length === 0) {
            throw new ApiError(404, "No attendance records found for the past year.");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                attendanceRecords,
                "Attendance records fetched successfully."
            )
        );
    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(
                error.statusCode || 500,
                null,
                error.message || "Something went wrong in fetching attendance."
            )
        );
    }
});


const deleteAttendance = asyncHandler(async (req, res) => {
    try {
        const { date } = req.body;

        if (!date) {
            throw new ApiError(400, "Date is required.");
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new ApiError(400, "Invalid date format. Use 'YYYY-MM-DD'.");
        }

        const userId = req.user._id;
        if (!userId) {
            throw new ApiError(401, "User not authorized.");
        }

        const attendance = await Attendance.findOneAndDelete({
            user: userId,
            date: parsedDate,
        });

        if (!attendance) {
            throw new ApiError(404, "Attendance not found for this date.");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                attendance,
                "Attendance deleted successfully."
            )
        );
    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(
                error.statusCode || 500,
                null,
                error.message || "Something went wrong while deleting attendance."
            )
        );
    }
});


export {
    markAttendance,
    getAttendance,
    deleteAttendance
}