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
        update_Repayments:(state,action)=>{
            const {index,repayments} = action.payload;
            console.log(index)
            state.lendingslist[index].Repayments = repayments;
        }
        
    }
})

export const {setlendings,deleteentry,updatelending,addlending,update_Repayments} = lendingSlice.actions;

export default lendingSlice.reducer