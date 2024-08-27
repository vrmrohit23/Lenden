import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authslice'
import expenseReducer from './expenseslice'
const store = configureStore({
    reducer: {
        auth:authReducer,
        expense:expenseReducer
    }
})

export default store