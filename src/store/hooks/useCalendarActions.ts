import { useAppDispatch, useAppSelector } from "./reduxStore.ts"
import {
  onGenerateCalendar,
  onGetNextMonth,
  onGetPreviousMonth,
  onSetActiveCalendarDay,
  onSetMonth,
  onSetYear,
} from "../slices/calendar/calendarDaysSlice.ts"
import {
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onSetActiveEvent,
} from "../slices/events/calendarEventsSlice.ts"

import { type CalendarEvent } from "../../types/calendar-event"
import { type CalendarDay } from "../../types/calendar-day"

export const useCalendarActions = () => {
  const dispatch = useAppDispatch()
  const {
    today,
    weekDays,
    month,
    year,
    calendarDays,
    activeCalendarDay,
  } = useAppSelector((state) => state.calendarDays)

  const {
    events,
    activeCalendarEvent
  } = useAppSelector(state => state.calendarEvents)

  const generateCalendar = () => {
    dispatch(onGenerateCalendar())
  }

  const setMonth = (month: number) => {
    dispatch(onSetMonth(month))
  }

  const setYear = (year: number) => {
    dispatch(onSetYear(year))
  }

  const getNextMonth = () => {
    dispatch(onGetNextMonth())
  }

  const getPreviousMonth = () => {
    dispatch(onGetPreviousMonth())
  }

  const setActiveEvent = (event: CalendarEvent) => {
    dispatch(onSetActiveEvent(event))
  }

  const setActiveCalendarDay = (activeCalendarDay: CalendarDay | undefined) => {
    dispatch(onSetActiveCalendarDay(activeCalendarDay))
  }

  const startSavingEvent = async (calendarEvent: CalendarEvent) => {
    console.log(calendarEvent)

    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime().toString() }))
    }
  }

  const startDeletingEvent = async (calendarEvent: CalendarEvent) => {
    dispatch(onDeleteEvent(calendarEvent))
  }

  return {
    //* Properties:
    // days
    today,
    weekDays,
    month,
    year,
    calendarDays,
    activeCalendarDay,
    // events
    events,
    activeCalendarEvent,
    //* Methods:
    generateCalendar,
    setMonth,
    setYear,
    getNextMonth,
    getPreviousMonth,
    setActiveCalendarDay,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  }
}