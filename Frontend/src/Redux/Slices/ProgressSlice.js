import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    progressData: [],
    loading: false,
    error: null,
    statistics: {},
    dateRange: {}
};

export const addProgress = createAsyncThunk(
    "/progress/add",
    async(data) => {
        try {
            const res = await axiosInstance.post("/progress/add-progress", data);
            console.log('Add progress response:', res.data); // Log the response
            
            if (res.data.success) {
                toast.success(res.data.message || "Progress Added Successfully");
                return res.data.data; // Return the actual progress data
            } else {
                throw new Error(res.data.message || "Failed to add progress");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add progress");
            throw error;
        }
    }
);

export const getProgress = createAsyncThunk(
    "/progress/get",
    async() => {
        try {
            const res = await axiosInstance.get("/progress/get-progress");
            console.log('Get progress response:', res.data); // Log the response
            
            if (res.data.success) {
                return res.data.data || []; // Return the actual progress data array
            } else {
                throw new Error(res.data.message || "Failed to fetch progress");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch progress");
            throw error;
        }
    }
);

const ProgressSlice = createSlice({
    name: "progress",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(addProgress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProgress.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.error = null;
                }
            })
            .addCase(addProgress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add progress";
            })
            .addCase(getProgress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProgress.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.progressData = action.payload.data.progressData || [];
                    state.statistics = action.payload.data.statistics || {};
                    state.dateRange = action.payload.data.dateRange || {};
                }
                state.error = null;
            })
            .addCase(getProgress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch progress";
                state.progressData = [];
            });
    }
});

export default ProgressSlice.reducer;