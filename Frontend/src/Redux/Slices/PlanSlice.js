import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance  from "../../Helpers/axiosInstance.js"
import toast from "react-hot-toast"

const initialState = {
    plans:[],
    loading: true,
    plan:{}
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



export const getAPlan = createAsyncThunk(
    "/plans/:id",
    async (id) => {
        try {
            const res = axiosInstance.get(`/membership/get-plan/${id}`);
            toast.promise(res,{
                loading: "Wait! fetching plan...",
                success: (data) => {
                    return data?.data?.plan;
                },
                error: "Failed to fetch plan"
            })
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)

export const updatePlan = createAsyncThunk(
    "/plans/update",
    async(data) => {
        try {
            const res = axiosInstance.put(`/membership/update-membership-plan`,data);
            toast.promise(res,{
                loading: "Wait! Updating plan...",
                success: "Plan updated successfully",
                error: "Failed to update plan"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const addPlan = createAsyncThunk(
    '/plans/add',
    async(data) => {
        try {
            const res = axiosInstance.post(`/membership/add-plan`,data);
            toast.promise(res,{
                loading: "Wait! Adding plan...",
                success: "Plan added successfully",
                error: "Failed to add plan"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)


export const deletePlan = createAsyncThunk(
    "/plans/:id/delete",
    async (id) => {
        try {
            const res = axiosInstance.delete(`/membership/delete-membership-plan/${id}`);
            toast.promise(res,{
                loading: "Wait! Deleting plan...",
                success: "Plan deleted successfully",
                error: "Failed to delete plan"
            });
            console.log("delete pressed")
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
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
        builder.addCase(getAPlan.fulfilled,(state,action) => {
            state.plan = action.payload.data
            console.log("Plan fetched successfully",action.payload.data);
        })
        builder.addCase(updatePlan.fulfilled,(state,action) => {
            state.plan = action.payload.data,
            console.log("Plan updated successfully", action.payload.data)
        })
        builder.addCase(deletePlan.fulfilled,(state,action) => {
            console.log("Plan deleted successfully", action.payload.data)
        })
        builder.addCase(addPlan.fulfilled,(state,action) => {
            state.plans.push(action.payload.data);
            console.log("Plan added successfully", action.payload.data)
        })

    }
});

export default membershipSlice.reducer;