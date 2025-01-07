import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    activeUser:0,
    userCountByGender:[],
    newUserCount:0,
    attendanceSummary: null,
    lastDayPresentUser:0,
    upcomingExpiry:[],
    productRatings:null,
    allusers: [],
    userGrowth: [],
    productSummary:[]
}

export const getAllUsers = createAsyncThunk(
    "/admin/allusers",
    async() => {
        try {
            const res = axiosInstance.get("/admin/get-all-users");
            toast.promise(res,{
                loading: "Wait! fetching all users...",
                success: (data) => {
                    return data?.data?.users;
                },
                error: "Failed to fetch all users"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const removeUser = createAsyncThunk(
    "/admin/remove-user/:id",
    async(id) => {
        try {
            const res = axiosInstance.delete(`/admin/removeUser/${id}`);
            toast.promise(res,{
                loading: "Wait! Deleting user...",
                success: "User deleted successfully",
                error: "Failed to delete user"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const getActiveUserCount = createAsyncThunk(
    "/admin/getActiveUserCount",
    async() => {
        try {
            console.log("receiving at slice")
            const res = axiosInstance.get("/admin/getActiveUserCount");
            toast.promise(res,{
                loading: "Wait! fetching active user count...",
                success: (data) => {
                    return data?.data?.count;
                },
                error: "Failed to fetch active user count"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const getUserCountByGender = createAsyncThunk(
    "/admin/getUserCountByGender",
    async() => {
        try {
            const res = axiosInstance.get("/admin/getUserbyGender");
            toast.promise(res,{
                loading: "Wait! fetching user count by gender...",
                success: (data) => {
                    return data?.data?.counts;
                },
                error: "Failed to fetch user count by gender"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const NewUserCount = createAsyncThunk(
    "/admin/newUserCount",
    async() => {
        try {
            console.log("reaching")
            const res = axiosInstance.get("/admin/newusersCount");
            toast.promise(res,{
                loading: "Wait! fetching new user count...",
                success: (data) => {
                    return data?.data?.count;
                },
                error: "Failed to fetch new user count"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const getAttendanceSummaryy = createAsyncThunk(
    "/admin/getattendancesummaryy",
    async() => {
        try {
            const res =axiosInstance.get("/admin/getAttendanceSummary");
            toast.promise(res,{
                loading: "Wait! fetching attendance summary...",
                success: (data) => {
                    return data?.data?.summary;
                },
                error: "Failed to fetch attendance summary"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const getLastDayPresntUserC = createAsyncThunk(
    "/admin/getlastDatDetails",
    async() => {
        try {
            const res = axiosInstance.get("/admin/lastDayPresentUserCount");
            toast.promise(res,{
                loading: "Wait! fetching last day present user count...",
                success: (data) => {
                    return data?.data?.count;
                },
                error: "Failed to fetch last day present user count"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const upcomingExpiryData = createAsyncThunk(
    "/admin/upcominexpiry",
    async() => {
        try {
            const res = axiosInstance.get('/admin/upcomingExpirations')
            toast.promise(res,{
                loading: "Wait! fetching upcoming expiry data...",
                success: (data) => {
                    return data?.data?.expirations;
                },
                error: "Failed to fetch upcoming expiry data"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const getProductRatings = createAsyncThunk(
    "/admin/productRatings",
    async() => {
        try {
            const res = axiosInstance.get('/admin/getProductSalesSummary');
            toast.promise(res,{
                loading: "Wait! fetching product ratings...",
                success: (data) => {
                    return data?.data?.ratings;
                },
                error: "Failed to fetch product ratings"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const getUserGrowthData = createAsyncThunk(
    "/admin/getUserGrowthData",
    async() => {
        try {
            const res = axiosInstance.get("/admin/getUserGrowthData");
            toast.promise(res,{
                loading: "Wait! fetching user growth data...",
                success: (data) => {
                    return data?.data?.growth;
                },
                error: "Failed to fetch user growth data"
            });
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)



const AdminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{},
    extraReducers : (builder) => {
        builder.addCase(getActiveUserCount.fulfilled,(state,action) => {
            state.data = action.payload;
            console.log("Active user count fetched successfully", action.payload);
        })
        builder.addCase(getUserCountByGender.fulfilled,(state,action) => {
            state.userCountByGender = action.payload;
            console.log("User count by gender fetched successfully", action.payload);
        })
        builder.addCase(NewUserCount.fulfilled,(state,action) => {
            state.newUserCount = action.payload;
            console.log("New user count fetched successfully", action.payload);
        })
        builder.addCase(getAttendanceSummaryy.fulfilled,(state,action) => {
            state.attendanceSummary = action.payload;
            console.log("Attendance summary fetched successfully", action.payload);
        })
        builder.addCase(getLastDayPresntUserC.fulfilled,(state,action) => {
            state.lastDayPresentUser = action.payload;
            console.log("Last day present user count fetched successfully", action.payload);
        })
        builder.addCase(upcomingExpiryData.fulfilled,(state,action) => {
            state.upcomingExpiry = action.payload;
            console.log("Upcoming expiry data fetched successfully", action.payload);
        })
        builder.addCase(getProductRatings.fulfilled,(state,action) => {
            state.productRatings = action.payload;
            console.log("Product ratings fetched successfully", action.payload);
        })
        builder.addCase(getAllUsers.fulfilled,(state,action) => {
            state.allusers = action.payload.data;
            console.log("All users fetched successfully", action.payload);
        })
        builder.addCase(removeUser.fulfilled,(state,action) => {
            const index = state.allusers.findIndex(user => user.id === action.payload.id);
            if(index!== -1) {
                state.allusers.splice(index, 1);
            }
            console.log("User removed successfully", action.payload);
        })
        builder.addCase(getUserGrowthData.fulfilled,(state,action) => {
            state.userGrowth = action.payload.data;
            console.log("User growth data fetched successfully", action.payload.data);
        })
        
    }
})

export default AdminSlice.reducer;