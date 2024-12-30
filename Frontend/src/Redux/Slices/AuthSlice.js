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
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const signupUser = createAsyncThunk(
    "auth/signup",
    async(data) => {
        try {
            const res = axiosInstance.post("users/register",data);
            toast.promise(res,{
                loading:"Wait! registration in progress...",
                success:(data) => {
                    return data?.data?.message;
                },
                error: "Failed to signup"
            })
            return (await res).data
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async() => {
        try {
            const res = axiosInstance.post("users/logout");
            toast.promise(res,{
                loading:"Wait! logout in progress...",
                success:"Logged out successfully",
                error: "Failed to logout"
            })
        } catch (error) {
            toast.error(error?.response?.data?.message);
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
        .addCase(logout.fulfilled,(state) =>{
            localStorage.setItem("isLoggedIn", false);
            localStorage.setItem("role", "");
            localStorage.setItem("data",null);
            state.isLoggedIn = false;
            state.role = "";
            state.data = {};
        })
    }
});

// export const {logout} = authSlice.actions;
export default authSlice.reducer;