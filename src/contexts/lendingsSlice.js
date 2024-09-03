import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lendingslist:[],
    loaded:false
}

export const lendingSlice = createSlice({
    name:'lendings',
    initialState,
    reducers:{
        addlending:(state,action)=>{
            state.lendingslist.push(action.payload)
        },
        deleteentry:(state,action)=>{
            state.lendingslist = state.lendingslist.filter((option)=>action.payload !== option.$id)
        },
        setlendings:(state,action)=>{
            state.lendingslist = action.payload 
            state.loaded = true;
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
            const {index,repaymentsmodified} = action.payload;
            state.lendingslist[index] = {...state.lendingslist[index],repayments:repaymentsmodified}
        }
        
    }
})

export const {setlendings,deleteentry,updatelending,addlending,updaterepayments} = lendingSlice.actions;

export default lendingSlice.reducer