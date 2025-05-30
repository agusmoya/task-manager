import { getCurrentDaysMonth } from './getCurrentDaysMonth'
import { getNextDaysMonth } from './getNextDaysMonth'
import { getPreviousDaysMonth } from './getPrevDaysMonth'

export const computeCalendar = (month: number, year: number) => {
  const firstMonthDate = new Date(year, month, 1)
  const lastMonthDate = new Date(year, month + 1, 0)
  const startDay = firstMonthDate.getDay()
  const lastDayNum = lastMonthDate.getDate()

  const prevDays = getPreviousDaysMonth(startDay, month, year)
  const currDays = getCurrentDaysMonth(lastDayNum, month, year)
  const nextDays = getNextDaysMonth(startDay, lastDayNum, month, year)
  return [...prevDays, ...currDays, ...nextDays]
}
