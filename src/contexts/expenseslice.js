import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenseslist:[]
}

export const expenseslice = createSlice({
    name:'expenses',
    initialState,
    reducers:{
        addexpense:(state,action)=>{
            state.expenseslist = [...state.expenseslist,{...action.payload}]
           
        },
        deleteentry:(state,action)=>{
            state.expenseslist = state.expenseslist.filter((option)=>action.payload !== option.$id)
        },
        setexpenses:(state,action)=>{
            state.expenseslist = action.payload 
        },
        updateexpense:(state,action)=>{
            state.expenseslist = state.expenseslist.map((option)=>{
                if(option.$id === action.payload.$id){ 
                   
                  return {...action.payload}
                }
                return option;
            })
        }
        
    }
})

export const {setexpenses,deleteentry,updateexpense,addexpense} = expenseslice.actions;

export default expenseslice.reducer