import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { isSameDay } from 'date-fns'

export const selectAllEvents = (state: RootState) => state.event.events

export const selectEventsByDate = (date: Date) => {
  return createSelector(selectAllEvents, events =>
    events.filter(evt => isSameDay(new Date(evt.start), date))
  )
}

export const selectEventsByTaskId = (taskId: string) => {
  return createSelector(selectAllEvents, events => events.filter(evt => evt.taskId === taskId))
}
