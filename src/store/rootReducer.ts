import { combineReducers } from '@reduxjs/toolkit'

import { baseApi } from '../api/RTKQuery/baseApi'

import { authSlice } from './slices/auth/authSlice'
import { userSlice } from './slices/user/userSlice'
import { taskSlice } from './slices/task/taskSlice'
import { calendarDaySlice } from './slices/calendar/calendarDaySlice'
import { eventSlice } from './slices/event/eventSlice'
import { modalSlice } from './slices/ui/modalSlice'
import { toastSlice } from './slices/ui/toastSlice'

export const rootReducer = combineReducers({
  // Reducer de RTK Query para baseApi
  [baseApi.reducerPath]: baseApi.reducer,
  // Reducers de slices
  auth: authSlice.reducer,
  user: userSlice.reducer,
  task: taskSlice.reducer,
  // category: categorySlice.reducer,
  calendarDay: calendarDaySlice.reducer,
  event: eventSlice.reducer,
  // UI
  modal: modalSlice.reducer,
  toast: toastSlice.reducer,
})
