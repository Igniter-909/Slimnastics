import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStroage.getItem("isLoggedIn") || false,
    role: localStroage.getItem("role") || "",
    data: localStroage.getItem('data') || {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{

    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;