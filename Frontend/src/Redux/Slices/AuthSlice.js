import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance  from "../../Helpers/axiosInstance.js"
import {toast} from "react-hot-toast"

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
}

export const loginUser = createAsyncThunk(
    "/auth/login",
    async(data) => {
        try {
            const res = axiosInstance.post("users/login",data);
            toast.promise(res,{
                loading:"Wait! authentication in progress...",
                success:(data) => {
                    return data?.data?.message;
                },
                error: "Failed to login"
            })
            console.log(res);
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.fulfilled, (state,action) => {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action.payload.data.user.role);
            localStorage.setItem("data", JSON.stringify(action.payload));
            state.isLoggedIn = true;
            state.role = action.payload.data.user.role;
            state.data = action.payload;
        })
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;