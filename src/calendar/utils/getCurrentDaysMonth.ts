import { WEEKDAYS } from "../constants/constants.ts";

import { type CalendarDay } from "../types/calendar-day.d";

export const getCurrentDaysMonth = (
  lastMonthDay: number,
  month: number,
  year: number
): CalendarDay[] => {
  const currentDays: CalendarDay[] = []
  for (let i = 1; i <= lastMonthDay; i++) {
    const dayNumber = i;
    const dayOfWeek = new Date(year, month - 1, dayNumber).getDay()
    const dayName = WEEKDAYS[dayOfWeek]
    currentDays.push({
      dayNumber,
      dayName,
      type: "current",
      events: [],
      month: month,
      year: year
    })
  }
  return currentDays
}