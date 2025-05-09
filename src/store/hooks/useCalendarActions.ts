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
  onAddNewEventByTaskState,
  onUpdateEventByTaskState,
  onDeleteEventByTaskState,
  onSetActiveEventState,
  onResetEventsByTaskState,
  onFetchEventsByUserId,
  onSetEventsByTaskState,
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
    eventsByTask,
    activeCalendarEvent,
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
    dispatch(onSetActiveEventState(event))
  }

  const setActiveCalendarDay = (activeCalendarDay: CalendarDay) => {
    dispatch(onSetActiveCalendarDay(activeCalendarDay))
  }

  const setEventsByTaskState = (events: CalendarEvent[]) => {
    dispatch(onSetEventsByTaskState(events))
  }

  const fetchEventsByUserId = async () => {
    try {
      await dispatch(onFetchEventsByUserId()).unwrap()
    } catch (error) {
      console.error(error)
    }
  }

  const saveEventByTaskState = async (calendarEvent: CalendarEvent) => {
    if (calendarEvent.id) {
      dispatch(onUpdateEventByTaskState({ ...calendarEvent }))
    } else {
      const randomId = crypto.randomUUID()
      dispatch(onAddNewEventByTaskState({ ...calendarEvent, id: randomId }))
      // dispatch(onAddNewEventState({ ...calendarEvent, id: new Date().getTime().toString() }))
    }
  }

  const deleteEventByTaskState = async (calendarEvent: CalendarEvent) => {
    dispatch(onDeleteEventByTaskState(calendarEvent))
  }

  const resetEventByTaskState = () => {
    dispatch(onResetEventsByTaskState())
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
    eventsByTask,
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
    setEventsByTaskState,
    saveEventByTaskState,
    deleteEventByTaskState,
    resetEventByTaskState,
    // THUNKS
    fetchEventsByUserId,
  }
}