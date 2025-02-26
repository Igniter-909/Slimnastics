import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance  from "../../Helpers/axiosInstance.js"
import toast from "react-hot-toast"

const initialState = {
    isLoggedIn: false,
    role: "",
    users:[],
    attendanceRecords : [],
    progressStat:[],
    allTrainersData:[]
};

export const getAllUsers = createAsyncThunk(
    "/users",
    async() => {
        try {
            const res = axiosInstance.get("/users/allUsers");
            // toast.promise(res,{
            //     loading:"Wait! fetching all users...",
            //     success:"Fetched all users successfully",
            //     error: "Failed to fetch users"
            // })
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)

export const getAttendanceData = createAsyncThunk(
    "/users/attendanceData",
    async() => {
        try {
            const res = axiosInstance.get("/users/attendanceData");
            // toast.promise(res,{
            //     loading: "Fetching Attendance Data...",
            //     success: "Fetched attendance data successfully",
            //     error: "Failed to Fetch Attendance Data"
            // });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const getProgress = createAsyncThunk(
    "/user/progress",
    async() => {
        try {
            const res = await axiosInstance.get("/users/progress");
            return res.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
)

export const allTrainers = createAsyncThunk(
    "/allTrainersData",
    async() => {
        try {
            const res = axiosInstance.get("/users/getTrainers");
            // toast.promise(res,{
            //     loading: "Fetching all trainers...",
            //     success: "Successfully fetched trainers...",
            //     error: "Failed to fetch trainers"
            // });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(getAllUsers.fulfilled,(state,action) => {
            state.users = action.payload.data
        })
        builder.addCase(getAttendanceData.fulfilled,(state,action) => {
            state.attendanceRecords = action.payload.data;
            console.log("Attendance data fetched successfully", action.payload);
        })
        builder.addCase(getProgress.fulfilled,(state,action) => {
            state.progressStat = action.payload?.data || { progressData: [], statistics: {} };
        })
        builder.addCase(getProgress.rejected,(state) => {
            state.progressStat = { progressData: [], statistics: {} };
        })
        builder.addCase(allTrainers.fulfilled,(state,action) => {
            state.allTrainersData = action.payload.data
            console.log("All trainers fetched successfully", action.payload);
        })
    }
})

export default UserSlice.reducer;