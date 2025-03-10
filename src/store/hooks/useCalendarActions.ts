
import { useAppDispatch, useAppSelector } from "./reduxStore.ts"
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent
} from "../slices/calendar/calendarSlice.ts"

import { type CustomEvent } from "../../calendar/types/event"

export const useCalendarActions = () => {
  const dispatch = useAppDispatch()
  const { events, activeEvent } = useAppSelector((state) => state.calendar)

  const setActiveEvent = (activeEvent: CustomEvent) => {
    dispatch(onSetActiveEvent(activeEvent))
  }

  const startSavignEvent = async (calendarEvent: CustomEvent) => {
    if (calendarEvent._id) {
      //update
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      //create
      dispatch(onAddNewEvent({
        ...calendarEvent,
        _id: new Date().getTime()
      }))
    }
  }

  const startDeletingEvent = (event: CustomEvent) => {
    dispatch(onDeleteEvent(event))
  }

  return {
    // properties
    events,
    activeEvent,
    // methods
    setActiveEvent,
    startSavignEvent,
    startDeletingEvent
  }
}