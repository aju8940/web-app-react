import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Auth/authSlice'

export const Store = configureStore({
  reducer: {
    auth: authReducer
  },
})