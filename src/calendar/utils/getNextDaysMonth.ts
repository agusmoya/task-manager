import { WEEKDAYS } from "../constants/constants.ts"

import { type CalendarDay } from "../../types/calendar-day"

export const getNextDaysMonth = (
  startDay: number,
  lastMonthDay: number,
  month: number,
  year: number
): CalendarDay[] => {
  const nextDays: CalendarDay[] = []
  const totalCalendarDays = 42
  const remainingNextDays = totalCalendarDays - startDay - lastMonthDay

  for (let i = 1; i <= remainingNextDays; i++) {
    const day = i
    const dayOfWeek = new Date(year, month - 1, day).getDay()
    const dayName = WEEKDAYS[dayOfWeek]
    nextDays.push({
      day: i,
      dayName,
      type: "next",
      events: [], // no events for next days
      month: month === 11 ? 0 : month + 1,
      year: month === 11 ? year + 1 : year
    })
  }
  return nextDays
}