import { useMemo } from 'react'

import { useAppSelector, useAppDispatch } from '../reduxStore'

import { selectActiveEvent } from '../selectors/event'

import {
  useFetchEventsByUserQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useUpdateEventStatusMutation,
} from '../../services/eventsApi'

import { getErrorMessage, OperationError } from '../../api/helpers/getErrorMessage'
import { resetActiveEventId, setActiveEventId } from '../slices/event/eventSlice'

export const useEventActions = () => {
  const activeEvent = useAppSelector(selectActiveEvent)
  const dispatch = useAppDispatch()

  const setActiveEvent = (id: string) => dispatch(setActiveEventId(id))
  const clearActiveEvent = () => dispatch(resetActiveEventId())

  const {
    data: events = [],
    isLoading: fetching,
    error: fetchError,
    refetch,
  } = useFetchEventsByUserQuery()
  const [createEvent, { isLoading: creating, error: createError }] = useCreateEventMutation()
  const [updateEvent, { isLoading: updating, error: updateError }] = useUpdateEventMutation()
  const [updateEventStatus, { isLoading: updatingStatus, error: updateEvtStatusError }] =
    useUpdateEventStatusMutation()
  const [deleteEvent, { isLoading: deleting, error: deleteError }] = useDeleteEventMutation()

  const {
    fetch: fetchEventError,
    create: createEventError,
    update: updateEventError,
    updateEventStatus: updateEventStatusError,
    delete: deleteEventError,
  } = useMemo(
    () =>
      getErrorMessage([
        { operation: OperationError.FETCH, error: fetchError },
        { operation: OperationError.CREATE, error: createError },
        { operation: OperationError.UPDATE, error: updateError },
        { operation: OperationError.UPDATE_EVENT_STATUS, error: updateEvtStatusError },
        { operation: OperationError.DELETE, error: deleteError },
      ]),
    [fetchError, createError, updateError, updateEvtStatusError, deleteError]
  )

  return {
    // STATE
    activeEvent,
    setActiveEvent,
    clearActiveEvent,
    // Data y flags RTKQ
    events,
    fetching,
    refetch,
    creating,
    updating,
    updatingStatus,
    deleting,
    // Mutations RTKQ
    createEvent,
    updateEvent,
    updateEventStatus,
    deleteEvent,
    // RTKQ errors
    fetchEventError,
    createEventError,
    updateEventError,
    updateEventStatusError,
    deleteEventError,
  }
}
