import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";


const initialState = {
    data: []
};

export const addProgress = createAsyncThunk(
    "/progress/add",
    async(data) => {
        try {
            const res = axiosInstance.post("/progress/add-progress",data);
            toast.promise(res,{
                loading: "Adding Progress...",
                success: "Progress Added Successfully",
                error: "Failed to Add Progress"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)

const ProgressSlice = createSlice({
    name: "progress",
    initialState,
    reducers: {},
    extraReducers:(builder) => {

    }
})

export default ProgressSlice.reducer;