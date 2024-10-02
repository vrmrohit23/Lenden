import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    status: false,
    userdata: null,
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
      
    }
})

export const { login, logout} = authslice.actions;

export default authslice.reducer;