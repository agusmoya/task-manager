import { type CalendarEvent } from '../../types/calendar-event.d'

import { useAppDispatch, useAppSelector } from './reduxStore.ts'

import {
  onAddNewEventByTaskState,
  onUpdateEventByTaskState,
  onDeleteEventByTaskState,
  onSetActiveEventState,
  onResetEventsByTaskState,
  onSetEventsByTaskState,
  onClearBackendErrorMessage,
} from '../slices/event/eventSlice.ts'
import { fetchEventsByUserIdThunk } from '../slices/event/eventThunks.ts'
import { useCallback } from 'react'

export const useEventActions = () => {
  const dispatch = useAppDispatch()

  const { events, eventsByTask, activeCalendarEvent, loading, backendErrorMessage } =
    useAppSelector(state => state.calendarEvent)

  const fetchEventsByUser = useCallback(async () => {
    try {
      await dispatch(fetchEventsByUserIdThunk()).unwrap()
    } catch (error) {
      console.error('Error fetching user. ', error)
    }
  }, [dispatch])

  const setActiveEvent = useCallback(
    (ev: CalendarEvent) => dispatch(onSetActiveEventState(ev)),
    [dispatch]
  )

  const setEventsByTaskState = useCallback(
    (ev: CalendarEvent[]) => dispatch(onSetEventsByTaskState(ev)),
    [dispatch]
  )

  const addEventByTaskState = useCallback(
    (ev: CalendarEvent) => dispatch(onAddNewEventByTaskState(ev)),
    [dispatch]
  )

  const updateEventByTaskState = useCallback(
    (ev: CalendarEvent) => dispatch(onUpdateEventByTaskState(ev)),
    [dispatch]
  )

  const deleteEventByTaskState = useCallback(
    (ev: CalendarEvent) => dispatch(onDeleteEventByTaskState(ev)),
    [dispatch]
  )

  const resetEventByTaskState = useCallback(() => dispatch(onResetEventsByTaskState()), [dispatch])

  const clearBackendErrorMessage = useCallback(() => {
    dispatch(onClearBackendErrorMessage())
  }, [dispatch])

  return {
    //* Properties:
    events,
    eventsByTask,
    activeCalendarEvent,
    loading,
    backendErrorMessage,
    //* Methods:
    //STATE
    setActiveEvent,
    setEventsByTaskState,
    addEventByTaskState,
    updateEventByTaskState,
    deleteEventByTaskState,
    resetEventByTaskState,
    clearBackendErrorMessage,
    // THUNKS
    // saveEventByTaskStateThunk,
    fetchEventsByUser,
  }
}
