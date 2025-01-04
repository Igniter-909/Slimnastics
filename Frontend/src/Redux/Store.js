import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js"
import membershipReducer from "./Slices/PlanSlice.js"
import userReducer from "./Slices/UserSlice.js"
import AttendanceReducer from "./Slices/AttendanceSlice.js"
import ProductReducer from "./Slices/ProductSlice.js"

const store = configureStore({
    reducer : {
        auth: authSliceReducer,
        membership: membershipReducer,
        user: userReducer,
        attendance: AttendanceReducer,
        product: ProductReducer
    },
    devTools : true
})

export default store;