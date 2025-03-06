import { configureStore } from "@reduxjs/toolkit";

import { calendarSlice } from "./slices/calendar/calendarSlice.ts";
import { eventModalSlice } from "./slices/ui/uiEventModalSlice.ts";


export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    ui: eventModalSlice.reducer // TODO: remover
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch