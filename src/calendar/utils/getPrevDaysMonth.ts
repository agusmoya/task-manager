import { WEEKDAYS } from "../constants/constants"
import { type CalendarDay } from "../types/calendar-day.d"

export const getPreviousDaysMonth = (
  startDay: number,
  month: number,
  year: number
): CalendarDay[] => {
  const prevDays: CalendarDay[] = []
  const lastPrevMonthDate = new Date(year, month, 0)
  const lastPrevMonthDay = lastPrevMonthDate.getDate()

  for (let x = startDay; x > 0; x--) {
    const dayNumber = lastPrevMonthDay - x + 1
    const dayOfWeek = new Date(year, month - 1, dayNumber).getDay()
    const dayName = WEEKDAYS[dayOfWeek]
    prevDays.push({
      dayNumber,
      dayName,
      type: "prev",
      events: [],
      month: month === 0 ? 11 : month - 1,
      year: month === 0 ? year - 1 : year
    })
  }
  return prevDays
}