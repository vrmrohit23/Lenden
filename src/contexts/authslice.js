import { createSlice } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";


const initialState = {
    status: false,
    adminpass:null,
    userdata: null,
    adminstatus:false,
    users:null

}

export const authslice = createSlice({
    name: 'authorize',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userdata = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userdata = null;
        },
        getadminpass:(state,action)=>{
            state.adminpass = action.payload;

        },
        setadminstatus:(state)=>{
            state.adminstatus = true;
        },
        setusers:(state,action)=>{
            state.users = action.payload;
        }
    }
})

export const { login, logout,getadminpass,setadminstatus,setusers } = authslice.actions;

export default authslice.reducer;