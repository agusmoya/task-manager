import { createListenerMiddleware } from '@reduxjs/toolkit'
import {
  onGenerateCalendar,
  onSetMonth,
  onGetNextMonth,
  onGetPreviousMonth,
  onSetYear,
} from '../slices/calendar/calendarDaySlice'

// Este objeto nos permitirá "escuchar" acciones y disparar efectos.
export const calendarMiddleware = createListenerMiddleware()

// Cada vez que veamos onSetMonth (o las otras), lanzamos onGenerateCalendar.
calendarMiddleware.startListening({
  actionCreator: onSetMonth,
  effect: (_action, listenerApi) => {
    // listenerApi.dispatch nos da acceso a dispatch dentro del middleware
    listenerApi.dispatch(onGenerateCalendar())
  },
})
calendarMiddleware.startListening({
  actionCreator: onGetNextMonth,
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(onGenerateCalendar())
  },
})
calendarMiddleware.startListening({
  actionCreator: onGetPreviousMonth,
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(onGenerateCalendar())
  },
})
calendarMiddleware.startListening({
  actionCreator: onSetYear,
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(onGenerateCalendar())
  },
})
