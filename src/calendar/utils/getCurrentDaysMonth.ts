import { WEEKDAYS, CalendarDay } from '../../types/calendar-day.d'

export const getCurrentDaysMonth = (
  lastMonthDay: number,
  month: number,
  year: number
): CalendarDay[] => {
  const currentDays: CalendarDay[] = []
  for (let i = 1; i <= lastMonthDay; i++) {
    const day = i
    const dayOfWeek = new Date(year, month - 1, day).getDay()
    const dayName = WEEKDAYS[dayOfWeek]
    currentDays.push({
      day,
      dayName,
      type: 'current',
      month: month,
      year: year,
    })
  }
  return currentDays
}
