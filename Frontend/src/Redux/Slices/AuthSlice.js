import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance  from "../../Helpers/axiosInstance.js"
import {toast} from "react-hot-toast"

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
    role: localStorage.getItem("role") || "",
    data: (() => {
        try {
            const data = localStorage.getItem('data');
            return data ? JSON.parse(data) : {};
        } catch {
            return {};
        }
    })(),
    loading: false,
    error: null
};


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

export const enrollIntoPlan =createAsyncThunk(
    "/plan/:id",
    async(data) => {
        try {
            const res = axiosInstance.post(`/users/add-plan`,data);
            toast.promise(res,{
                loading:"Wait! enrolling in plan progress...",
                success:(data) => {
                    return data?.data?.message;
                },
                error: "Failed to enroll into plan"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const signupUser = createAsyncThunk(
    "auth/signup",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/users/register", data);
            return response.data;
        } catch (error) {
            // Log the full error for debugging
            console.error('Signup error:', error);
            
            // Return a structured error object
            return rejectWithValue({
                message: error.response?.data?.message || 'Registration failed',
                status: error.response?.status,
                details: error.response?.data
            });
        }
    }
);

export const editProfile = createAsyncThunk(
    "auth/editProfile",
    async(data) => {
        try {
            const res = axiosInstance.post("users/update-profile",data);
            toast.promise(res,{
                loading:"Wait! updating profile in progress...",
                success:(data) => {
                    return data?.data?.message;
                },
                error: "Failed to update profile"
            })
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)

export const editAvatar = createAsyncThunk(
    "/auth/editAvatar",
    async(data) => {
        try {
            console.log(data);
            const res = axiosInstance.post("users/update-avatar",data);
            toast.promise(res,{
                loading:"Wait! updating avatar in progress...",
                success:(data) => {
                    return data?.data?.message;
                },
                error: "Failed to update avatar"
            })
            return (await res).data;
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
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)

export const getUser = createAsyncThunk(
    "auth/getUser",
    async() => {
        try {
            const res = axiosInstance.get("users/current-user");
            toast.promise(res,{
                loading:"Wait! fetching user data...",
                success:(data) => {
                    return data?.data?.user;
                },
                error: "Failed to fetch user"
            })
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)

export const deleteProfile = createAsyncThunk(
    "auth/deleteUser",
    async(data,{rejectWithValue}) => {
        try {
            console.log("Receiving data",data);
            const res = axiosInstance.post("/users/delete-profile",data);
            toast.promise(res,{
                loading:"Wait! deleting profile in progress...",
                success:"Profile deleted successfully",
                error: "Failed to delete profile"
            }) 
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
            return rejectWithValue(error.response.data);
        }
    }
)

export const addToCart = createAsyncThunk(
    "/products/add-to-cart",
    async(data) => {
        try {
            console.log(data)
            const res = axiosInstance.post("/users/addToCart",data);
            toast.promise(res,{
                loading:"Wait! adding to cart...",
                success:"Product added to cart successfully",
                error: "Failed to add product to cart"
            })
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)

export const removeFromCart = createAsyncThunk(
    "/products/remove/:id",
    async(id) => {
        try {
            const res = axiosInstance.delete(`/users/removeFromCart/${id}`,)
            toast.promise(res,{
                loading:"Wait! removing from cart...",
                success:"Product removed from cart successfully",
                error: "Failed to remove product from cart"
            })
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);

export const sendFeedback = createAsyncThunk(
    "/contactUs",
    async(data) => {
        try {
            const res = axiosInstance.post("/contact/addContact",data);
            toast.promise(res,{
                loading:"Wait! sending feedback...",
                success:"Feedback sent successfully",
                error: "Failed to send feedback"
            })
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        darkMode: (state) => {
            state.darkmode =!state.darkmode;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.role = action.payload.data?.user?.role || "";
                state.data = action.payload;
                
                // Update localStorage
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("role", action.payload.data?.user?.role || "");
                localStorage.setItem("data", JSON.stringify(action.payload));
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: 'An unknown error occurred' };
                
                // Clear any partial data
                state.isLoggedIn = false;
                state.role = "";
                state.data = {};
            })
        .addCase(loginUser.fulfilled, (state,action) => {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action.payload.data.user.role);
            localStorage.setItem("data", JSON.stringify(action.payload));
            state.isLoggedIn = true;
            state.role = action.payload.data.user.role;
            state.data = action.payload;
        })
        .addCase(logout.fulfilled,(state) =>{
            localStorage.clear();
            state.isLoggedIn = false;
            state.role = "";
            state.data = {};
        })
        .addCase(getUser.fulfilled,(state,action) => {
            if(!action?.payload?.data) return;
            localStorage.setItem("data", JSON.stringify(action.payload));
            state.isLoggedIn = true;
            state.data = action.payload;
        })
        .addCase(deleteProfile.fulfilled,(state) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.role = "";
            state.data = {};
        })
        .addCase(addToCart.fulfilled,(state,action) => {
            state.currentCart = action.payload.data;
        })
    }
});

export const {darkMode} = authSlice.actions;
export const { clearError } = authSlice.actions;
export default authSlice.reducer;