import { configureStore } from "@reduxjs/toolkit"

import { authSlice } from "./slices/auth/authSlice.ts"
import { calendarDaySlice } from "./slices/calendar/calendarDaySlice.ts"
import { calendarEventSlice } from "./slices/event/calendarEventSlice.ts"
import { modalSlice } from "./slices/ui/modalSlice.ts"
import { taskCategorySlice } from "./slices/category/taskCategorySlice.ts"
import { taskSlice } from "./slices/task/taskSlice.ts"
import { userSlice } from "./slices/user/userSlice.ts"
import { toastSlice } from "./slices/ui/toastSlice.ts"


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    calendarDay: calendarDaySlice.reducer,
    calendarEvent: calendarEventSlice.reducer,
    taskCategory: taskCategorySlice.reducer,
    task: taskSlice.reducer,
    // UI
    modal: modalSlice.reducer,
    toast: toastSlice.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
