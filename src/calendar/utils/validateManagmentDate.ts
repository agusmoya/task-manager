import dayjs from "dayjs"
import { fromDateToDatetimeLocal } from "../../helpers/form-validations/getEventFormValidations"
import { type CalendarDay } from "../../types/calendar-day"
import { type CalendarEvent } from "../../types/calendar-event"
import { TODAY } from "../constants/constants"

export const isSameDay = (event: CalendarEvent, calendarDay: CalendarDay): boolean => {
  const { startDate } = event
  const { day, month, year } = calendarDay

  const safeStartDate = fromDateToDatetimeLocal(startDate)
  const newStartDate = new Date(safeStartDate)

  return (
    newStartDate.getDate() === day
    && newStartDate.getMonth() === month
    && newStartDate.getFullYear() === year
  )
}

export const isToday = (cd: CalendarDay) => {
  const { day, month, year } = cd
  return (
    TODAY.getDate() === day
    && TODAY.getMonth() === month
    && TODAY.getFullYear() === year
  )
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
    activeCalendarDay.day === day
    && activeCalendarDay.month === month
    && activeCalendarDay.year === year
  )
}


export const currentDate = () => {
  const todayDayJS = dayjs(TODAY)
  return todayDayJS.format('dddd, DD MMMM')
}