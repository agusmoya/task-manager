import { WEEKDAYS } from "../constants/constants.ts";

import { type CalendarDay } from "../../types/calendar-day";

export const getCurrentDaysMonth = (
  lastMonthDay: number,
  month: number,
  year: number
): CalendarDay[] => {
  const currentDays: CalendarDay[] = []
  for (let i = 1; i <= lastMonthDay; i++) {
    const day = i;
    const dayOfWeek = new Date(year, month - 1, day).getDay()
    const dayName = WEEKDAYS[dayOfWeek]
    currentDays.push({
      day,
      dayName,
      type: "current",
      events: [],
      month: month,
      year: year
    })
  }
  return currentDays
}