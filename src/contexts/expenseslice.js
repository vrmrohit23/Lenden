import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenseslist:[],
    loaded:false
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
            state.loaded = true; 
        },
        reset_expenses:(state)=>{
            state.expenseslist =[];
            state.loaded = false;
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

export const {setexpenses,delete_expense,update_expense,addexpense,reset_expenses} = expenseslice.actions;

export default expenseslice.reducer