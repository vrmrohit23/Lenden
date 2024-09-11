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
        delete_expense:(state,action)=>{
            state.expenseslist = state.expenseslist.filter((option)=>action.payload !== option.$id)
        },
        setexpenses:(state,action)=>{
            state.expenseslist = action.payload 
        },
        update_expense:(state,action)=>{
            state.expenseslist = state.expenseslist.map((option)=>{
                if(option.$id === action.payload.$id){ 
                   
                  return {...action.payload}
                }
                return option;
            })
        }
        
    }
})

export const {setexpenses,delete_expense,update_expense,addexpense} = expenseslice.actions;

export default expenseslice.reducer