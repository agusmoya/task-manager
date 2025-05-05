import { type CalendarEvent } from "../../types/calendar-event.d"
import { type CalendarDay } from "../../types/calendar-day.d"

import { useAppDispatch, useAppSelector } from "./reduxStore.ts"
import {
  onGenerateCalendar,
  onGetNextMonth,
  onGetPreviousMonth,
  onSetActiveCalendarDay,
  onSetMonth,
  onSetYear,
} from "../slices/calendar/calendarDaySlice.ts"
import {
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onResetEvents,
  onFetchEventsByUserId,
} from "./../slices/event/calendarEventSlice.ts"


export const useCalendarActions = () => {
  const dispatch = useAppDispatch()
  const {
    today,
    weekDays,
    month,
    year,
    calendarDays,
    activeCalendarDay,
  } = useAppSelector((state) => state.calendarDay)

  const {
    events,
    activeCalendarEvent
  } = useAppSelector(state => state.calendarEvent)

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

  const setActiveCalendarDay = (activeCalendarDay: CalendarDay) => {
    dispatch(onSetActiveCalendarDay(activeCalendarDay))
  }

  const fetchEventsByUserId = async () => {
    try {
      await dispatch(onFetchEventsByUserId()).unwrap()
    } catch (error) {
      console.error(error)
    }
  }

  const saveEventState = async (calendarEvent: CalendarEvent) => {
    if (calendarEvent.id) {
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      dispatch(onAddNewEvent({ ...calendarEvent, id: new Date().getTime().toString() }))
    }
  }

  const deleteEventState = async (calendarEvent: CalendarEvent) => {
    dispatch(onDeleteEvent(calendarEvent))
  }

  const resetEventState = () => {
    dispatch(onResetEvents())
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
    //STATE
    generateCalendar,
    setMonth,
    setYear,
    getNextMonth,
    getPreviousMonth,
    setActiveCalendarDay,
    setActiveEvent,
    saveEventState,
    deleteEventState,
    resetEventState,
    // THUNKS
    fetchEventsByUserId,
  }
}