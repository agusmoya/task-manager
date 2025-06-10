import { useCallback, useMemo } from 'react'

import { useAppDispatch, useAppSelector } from '../reduxStore'

import type { IEvent } from '../../types/event'

import { setActiveEventId, selectEventById } from '../slices/event/eventSlice'
import {
  useFetchEventsByUserQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} from '../../services/eventsApi'

import { getErrorMessage } from '../../api/helpers/getErrorMessage'

export const useEventActions = () => {
  const dispatch = useAppDispatch()
  // 1) datos y flags de RTK Query
  const {
    data: events = [],
    isLoading: fetching,
    error: fetchError,
    refetch,
  } = useFetchEventsByUserQuery()
  const [createEvent, { isLoading: creating, error: createError }] = useCreateEventMutation()
  const [updateEvent, { isLoading: updating, error: updateError }] = useUpdateEventMutation()
  const [deleteEvent, { isLoading: deleting, error: deleteError }] = useDeleteEventMutation()

  const rawError = useMemo(() => {
    return fetchError ?? createError ?? updateError ?? deleteError
  }, [fetchError, createError, updateError, deleteError])

  const errorMessage = getErrorMessage(rawError)

  // 2) estado local de slice
  const activeEvent: IEvent | undefined = useAppSelector(state =>
    state.event.activeEventId ? selectEventById(state, state.event.activeEventId) : undefined
  )
  // 3) acciones UI
  const setActiveEvent = useCallback(
    (event: IEvent) => dispatch(setActiveEventId(event.id)),
    [dispatch]
  )
  const clearActiveEvent = useCallback(() => {
    dispatch(setActiveEventId(''))
  }, [dispatch])

  return {
    // STATE
    activeEvent,
    setActiveEvent,
    clearActiveEvent,
    // Datos y flags RTKQ
    events,
    fetching,
    creating,
    updating,
    deleting,
    errorMessage,
    refetch,
    // Mutations RTKQ
    createEvent,
    updateEvent,
    deleteEvent,
  }
}
