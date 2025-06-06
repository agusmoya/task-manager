import { useCallback } from 'react'

import { type IEvent } from '../../types/event'

import { useAppDispatch, useAppSelector } from '../reduxStore'

import {
  onSetActiveEventState,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onClearBackendErrorMessage,
} from '../slices/event/eventSlice'
import { fetchEventsByUserIdThunk } from '../slices/event/eventThunks'

export const useEventActions = () => {
  const dispatch = useAppDispatch()
  const { events, activeEvent, loading, backendErrorMessage } = useAppSelector(state => state.event)

  const fetchEvents = useCallback(async () => {
    try {
      await dispatch(fetchEventsByUserIdThunk()).unwrap()
    } catch (error) {
      console.error('Error fetching user. ', error)
    }
  }, [dispatch])

  const setActiveEvent = useCallback(
    (ev: IEvent) => dispatch(onSetActiveEventState(ev)),
    [dispatch]
  )
  const addEvent = useCallback((evt: IEvent) => dispatch(onAddEvent(evt)), [dispatch])
  const updateEvent = useCallback((evt: IEvent) => dispatch(onUpdateEvent(evt)), [dispatch])
  const deleteEvent = useCallback((id: string) => dispatch(onDeleteEvent(id)), [dispatch])

  const clearBackendErrorMessage = useCallback(() => {
    dispatch(onClearBackendErrorMessage())
  }, [dispatch])

  return {
    //* Properties:
    events,
    activeEvent,
    loading,
    backendErrorMessage,
    //* Methods:
    // STATE
    setActiveEvent,
    addEvent,
    updateEvent,
    deleteEvent,
    clearBackendErrorMessage,
    // THUNKS
    fetchEvents,
  }
}
