import { configureStore } from '@reduxjs/toolkit'

import { setupInterceptors } from '../api/setupInterceptors.ts'

import { authSlice } from './slices/auth/authSlice.ts'
import { calendarDaySlice } from './slices/calendar/calendarDaySlice.ts'
import { calendarEventSlice } from './slices/event/eventSlice.ts'
import { modalSlice } from './slices/ui/modalSlice.ts'
import { taskCategorySlice } from './slices/category/categorySlice.ts'
import { taskSlice } from './slices/task/taskSlice.ts'
import { userSlice } from './slices/user/userSlice.ts'
import { toastSlice } from './slices/ui/toastSlice.ts'

import { calendarMiddleware } from './middleware/calendarMiddleware.ts'
import { categoryToastMiddleware } from './middleware/categoryToastMiddleware.ts'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    calendarDay: calendarDaySlice.reducer,
    calendarEvent: calendarEventSlice.reducer,
    task: taskSlice.reducer,
    taskCategory: taskCategorySlice.reducer,
    user: userSlice.reducer,
    // UI
    modal: modalSlice.reducer,
    toast: toastSlice.reducer,
  },
  // Al usar `.prepend` nos aseguramos de que el listener vea las acciones
  // antes que otros middlewares
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(calendarMiddleware.middleware, categoryToastMiddleware.middleware),
})

setupInterceptors(store.dispatch, store.getState)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
