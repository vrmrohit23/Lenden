import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authslice'
import expenseReducer from './expenseslice'
import lendingReducer from "./lendingsSlice"
const store = configureStore({
    reducer: {
        auth:authReducer,
        expense:expenseReducer,
        lending:lendingReducer
    }
})

export default store