import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js"
import membershipReducer from "./Slices/PlanSlice.js"

const store = configureStore({
    reducer : {
        auth: authSliceReducer,
        membership: membershipReducer
    },
    devTools : true
})

export default store;