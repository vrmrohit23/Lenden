import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lendingslist:[]
}

export const lendingSlice = createSlice({
    name:'lendings',
    initialState,
    reducers:{
        addlending:(state,action)=>{
            state.lendingslist = [...state.lendingslist,{...action.payload}]
        },
        deleteentry:(state,action)=>{
            state.lendingslist = state.lendingslist.filter((option)=>action.payload !== option.$id)
        },
        setlendings:(state,action)=>{
            state.lendingslist = action.payload 
        },
        updatelending:(state,action)=>{
            state.lendingslist = state.lendingslist.map((option)=>{
                if(option.$id === action.payload.$id){       
                  return {...action.payload}
                }
                return option;
            })
        },
        updaterepayments:(state,action)=>{
            const {id,repaymentsmodified} = action.payload;
            state.lendingslist[index] = {...state.lendingslist[index],repayments:repaymentsmodified}
        }
        
    }
})

export const {setexpenses,deleteentry,updateexpense,addexpense} = lendingSlice.actions;

export default lendingSlice.reducer