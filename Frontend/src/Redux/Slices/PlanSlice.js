import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance  from "../../Helpers/axiosInstance.js"
import toast from "react-hot-toast"

const initialState = {
    plans:[],
    loading: true,
}

export const getAllPlans = createAsyncThunk(
    "/plans",
    async (_,{rejectWithValue}) => {
        try {
            const res = axiosInstance.get("membership/all-plans")
            toast.promise(res,{
                loading: "Wait fetching all plans...",
                success: "All plans fetched successfully",
                error: "Failed to fetch all plans"
            })
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
            return rejectWithValue(error?.response?.data)
        }
    }
)

const membershipSlice = createSlice({
    name: "membership",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPlans.fulfilled,(state,action) => {
            state.plans = action.payload.data,
            state.loading = false,
            console.log("Membership plans fetched successfully", action.payload.data)
        })
    }
});

export default membershipSlice.reducer;