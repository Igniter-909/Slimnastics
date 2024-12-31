import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js"
import membershipReducer from "./Slices/PlanSlice.js"
import userReducer from "./Slices/UserSlice.js"

const store = configureStore({
    reducer : {
        auth: authSliceReducer,
        membership: membershipReducer,
        user: userReducer
    },
    devTools : true
})

export default store;