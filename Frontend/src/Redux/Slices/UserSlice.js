import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance  from "../../Helpers/axiosInstance.js"
import toast from "react-hot-toast"

const initialState = {
    isLoggedIn: false,
    role: "",
    users:[]
};

export const getAllUsers = createAsyncThunk(
    "/users",
    async() => {
        try {
            const res = axiosInstance.get("/users/allUsers");
            toast.promise(res,{
                loading:"Wait! fetching all users...",
                success:(data) => {
                    return data?.data?.users;
                },
                error: "Failed to fetch users"
            })
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
    }
})

export default UserSlice.reducer;