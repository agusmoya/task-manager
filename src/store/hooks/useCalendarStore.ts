import { useDispatch, useSelector } from "react-redux"

import { RootState } from "../store.ts"
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent
} from "../slices/calendar/calendarSlice.ts"

import { type CustomEvent } from "../../calendar/types/event.d"

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar)

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

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent())
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