import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    currentAttendance : [],
    allAttendance: []
}

export const markAttendance = createAsyncThunk(
    "/attendance/mark",
    async(data) => {
        try {
            const res = axiosInstance.post("/attendance/mark",data);
            toast.promise(res,{
                loading: "Marking Attendance...",
                success: "Attendance Marked Successfully",
                error: "Failed to Mark Attendance"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const deleteAttendance = createAsyncThunk(
    "/attendance/delete",
    async (data) => {
        try {
            const res = axiosInstance.post("/attendance/delete-attendance/", {
                date: data.date,
            });
            toast.promise(res, {
                loading: "Deleting Attendance...",
                success: "Attendance Deleted Successfully",
                error: "Failed to Delete Attendance",
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);

export const getAttendance = createAsyncThunk(
    "/attendance/get-attendance",
    async() => {
        try {
            const res = axiosInstance.get("/attendance/get-attendance");
            toast.promise(res,{
                loading: "Fetching Attendance...",
                success: "Attendance Fetched Successfully",
                error: "Failed to Fetch Attendance"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)

const AttendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(markAttendance.fulfilled, (state,action) => {
            state.currentAttendance = action.payload;
        })
        builder.addCase(deleteAttendance.fulfilled, (state,action) => {
            state.currentAttendance = action.payload;
        })
        builder.addCase(getAttendance.fulfilled, (state,action) => {
            state.allAttendance = action.payload;
        })
    }
})

export default AttendanceSlice.reducer;