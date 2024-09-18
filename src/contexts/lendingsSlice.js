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
        delete_lending:(state,action)=>{
            state.lendingslist = state.lendingslist.filter((option)=>action.payload !== option.$id)
        },
        setlendings:(state,action)=>{
            state.lendingslist = action.payload 
            state.loaded = true;
        },
        reset_lendings:(state)=>{
            state.lendingslist = [];
            state.loaded = false;
        },
        update_lending:(state,action)=>{
            state.lendingslist = state.lendingslist.map((option)=>{
                if(option.$id === action.payload.$id){       
                  return {...action.payload}
                }
                return option;
            })
        },
        update_Repayments:(state,action)=>{
            const {index,repayment,repayment_object,repaid} = action.payload;
            state.lendingslist[index].Repayments.push(repayment);
            state.lendingslist[index].Repayments_Objects.push(repayment_object);
            state.lendingslist[index].Repaid = repaid;
        },
        delete_Repayment:(state,action)=>{
            const {index,innerindex,repaid} = action.payload
            state.lendingslist[index].Repayments.splice(innerindex,1); 
            state.lendingslist[index].Repayments_Objects.splice(innerindex,1); 
            state.lendingslist[index].Repaid = repaid;
        }
        
    }
})

export const {setlendings,delete_lending,update_lending,addlending,update_Repayments,delete_Repayment,reset_lendings} = lendingSlice.actions;

export default lendingSlice.reducer