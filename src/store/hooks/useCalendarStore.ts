import { useDispatch, useSelector } from "react-redux"

import { RootState } from "../store"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../calendar/calendarSlice"
import { CustomEvent } from "../../calendar/types/event"

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar)

  const setActiveEvent = (activeEvent: CustomEvent) => {
    dispatch(onSetActiveEvent(activeEvent))
  }

  const startSavignEvent = async (calendarEvent: CustomEvent) => {
    console.log(calendarEvent)

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
    // hasEventSelected: !!activeEvent,
    // methods
    setActiveEvent,
    startSavignEvent,
    startDeletingEvent
  }
}