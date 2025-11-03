import { configureStore } from '@reduxjs/toolkit'
import instagramReducer from '@/features/instagram/instagramSlice'
import authReducer from '@/features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    instagram: instagramReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
