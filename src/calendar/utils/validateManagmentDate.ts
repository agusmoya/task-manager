import dayjs from 'dayjs'

import { type CalendarDay } from '../../types/calendar-day.d'
import { type CalendarEvent } from '../../types/calendar-event.d'

import { fromDateToDatetimeLocal } from '../../helpers/form-validations/getEventFormValidations'
import { getToday } from './dateUtils'

export const isSameDay = (event: CalendarEvent, calendarDay: CalendarDay): boolean => {
  const { startDate } = event
  const { day, month, year } = calendarDay

  const safeStartDate = fromDateToDatetimeLocal(startDate)
  const newStartDate = new Date(safeStartDate)

  return (
    newStartDate.getDate() === day &&
    newStartDate.getMonth() === month &&
    newStartDate.getFullYear() === year
  )
}

export const isToday = (cd: CalendarDay) => {
  const now = getToday()
  const { day, month, year } = cd
  return now.getDate() === day && now.getMonth() === month && now.getFullYear() === year
}

export const isPrevDay = (type: string) => {
  return type === 'prev'
}

export const isNextDay = (type: string) => {
  return type === 'next'
}

export const isActiveDay = (activeCalendarDay: CalendarDay, calendarDay: CalendarDay) => {
  if (!activeCalendarDay) return
  const { day, month, year } = calendarDay
  return (
    activeCalendarDay.day === day &&
    activeCalendarDay.month === month &&
    activeCalendarDay.year === year
  )
}

export const currentDate = () => {
  const todayDayJS = dayjs(getToday())
  return todayDayJS.format('dddd, DD MMMM')
}
