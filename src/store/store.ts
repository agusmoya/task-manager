import { configureStore } from '@reduxjs/toolkit'

import { setupInterceptors } from '../api/setupInterceptors'

import { baseApi } from '../api/RTKQuery/baseApi'
import { rootReducer } from './rootReducer'

import { listenerMiddleware } from './listenerMiddleware'

// Custom middlewares imports
import './middleware/categoryToastMiddleware'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      // El listenerMiddleware para todos los startAppListening
      .prepend(listenerMiddleware.middleware)
      // El middleware de RTK Query para cache y refetch automático
      .concat(baseApi.middleware),
})

setupInterceptors(store.dispatch, store.getState)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
