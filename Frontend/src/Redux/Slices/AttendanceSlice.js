import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    currentAttendance: [],
    allAttendance: []
}

export const markAttendance = createAsyncThunk(
    "/attendance/mark",
    async(data) => {
        try {
            const res = await axiosInstance.post("/attendance/mark", data);
            toast.success("Attendance Marked Successfully");
            return res.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
)

export const deleteAttendance = createAsyncThunk(
    "/attendance/delete",
    async (data) => {
        try {
            const res = await axiosInstance.post("/attendance/delete-attendance/", {
                date: data.date,
            });
            toast.success("Attendance Deleted Successfully");
            return res.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
);

export const getAttendance = createAsyncThunk(
    "/attendance/get-attendance",
    async() => {
        try {
            const res = await axiosInstance.get("/attendance/get-attendance");
            return res.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
)

const AttendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(markAttendance.fulfilled, (state, action) => {
                state.currentAttendance = action.payload;
            })
            .addCase(markAttendance.rejected, (state) => {
                state.currentAttendance = [];
            })
            .addCase(deleteAttendance.fulfilled, (state, action) => {
                state.currentAttendance = action.payload;
            })
            .addCase(deleteAttendance.rejected, (state) => {
                state.currentAttendance = [];
            })
            .addCase(getAttendance.fulfilled, (state, action) => {
                state.allAttendance = action.payload;
            })
            .addCase(getAttendance.rejected, (state) => {
                state.allAttendance = [];
            });
    }
});

export default AttendanceSlice.reducer;