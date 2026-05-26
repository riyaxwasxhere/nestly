import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import authReducer from './authSlice'
import studentReducer from './studentSlice'
import ownerReducer from './ownerSlice'
import savedReducer from './savedSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        student: studentReducer,
        owner: ownerReducer,
        saved: savedReducer
    }
})