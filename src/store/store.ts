import { configureStore } from "@reduxjs/toolkit"

import { authSlice } from "./slices/auth/authSlice.ts"
import { calendarDaysSlice } from "./slices/calendar/calendarDaysSlice.ts"
import { calendarEventsSlice } from "./slices/events/calendarEventsSlice.ts"
import { eventModalSlice } from "./slices/ui/uiEventModalSlice.ts"
import { taskCategorySlice } from "./slices/category/taskCategorySlice.ts"


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    calendarDays: calendarDaysSlice.reducer,
    calendarEvents: calendarEventsSlice.reducer,
    taskCategory: taskCategorySlice.reducer,
    ui: eventModalSlice.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
