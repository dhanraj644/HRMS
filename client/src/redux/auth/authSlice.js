import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
};


const authSlice = createSlice({
    name:"auth",
    initialState,
    isAuthenticated: false,

    reducers: {
        loginSuccess:(state, action)=>{
            state.user = action.payload.userData;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        },
    }
})


export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;