import { type CalendarDay } from '../../types/calendar-day.d'

import { useAppDispatch, useAppSelector } from './reduxStore.ts'
import {
  onGenerateCalendar,
  onGetNextMonth,
  onGetPreviousMonth,
  onSetActiveCalendarDay,
  onSetMonth,
  onSetYear,
} from '../slices/calendar/calendarDaySlice.ts'
import { useCallback } from 'react'

export const useCalendarActions = () => {
  const dispatch = useAppDispatch()
  const { today, weekDays, month, year, calendarDays, activeCalendarDay } = useAppSelector(
    state => state.calendarDay
  )

  const generateCalendar = useCallback(() => {
    dispatch(onGenerateCalendar())
  }, [dispatch])

  const setMonth = useCallback(
    (m: number) => {
      dispatch(onSetMonth(m))
    },
    [dispatch]
  )

  const setYear = useCallback(
    (y: number) => {
      dispatch(onSetYear(y))
    },
    [dispatch]
  )

  const getNextMonth = useCallback(() => {
    dispatch(onGetNextMonth())
  }, [dispatch])

  const getPreviousMonth = useCallback(() => {
    dispatch(onGetPreviousMonth())
  }, [dispatch])

  const setActiveCalendarDay = useCallback(
    (day: CalendarDay) => {
      dispatch(onSetActiveCalendarDay(day))
    },
    [dispatch]
  )

  return {
    //* Properties:
    today,
    weekDays,
    month,
    year,
    calendarDays,
    activeCalendarDay,
    //* Methods:
    //STATE
    generateCalendar,
    setMonth,
    setYear,
    getNextMonth,
    getPreviousMonth,
    setActiveCalendarDay,
  }
}
