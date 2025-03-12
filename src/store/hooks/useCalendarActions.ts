
import { useAppDispatch, useAppSelector } from "./reduxStore.ts"
import {
  onSetActiveCalendarDay,
  onSetActiveEvent,
  onAddNewEvent,
  onDeleteEvent,
  onUpdateEvent
} from "../slices/calendar/calendarSlice.ts"

import { type CustomEvent } from "../../calendar/types/event.d"
import { type CalendarDay } from "../../calendar/types/calendar-day"

export const useCalendarActions = () => {
  const dispatch = useAppDispatch()
  const {
    activeCalendarDay,
    activeCalendarEvent,
    calendarEvents
  } = useAppSelector((state) => state.calendar)

  const setActiveEvent = (event: CustomEvent) => {
    dispatch(onSetActiveEvent(event))
  }

  const setActiveCalendarDay = (activeCalendarDay: CalendarDay) => {
    dispatch(onSetActiveCalendarDay(activeCalendarDay))
  }

  const startSavignEvent = async (calendarEvent: CustomEvent) => {
    console.log(calendarEvent);

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

  const startDeletingEvent = async (calendarEvent: CustomEvent) => {
    dispatch(onDeleteEvent(calendarEvent))
  }

  return {
    // properties
    activeCalendarDay,
    activeCalendarEvent,
    calendarEvents,
    // methods
    setActiveCalendarDay,
    setActiveEvent,
    startSavignEvent,
    startDeletingEvent
  }
}