import { useState, useEffect } from "react";

import { CalendarDay } from "../types/DayCalendar.tsx";
import { WEEKDAYS, MONTHS } from "../constants.ts";

export const useCalendar = () => {
  const [today, setToday] = useState(new Date())
  const [month, setMonth] = useState(today.getMonth())
  const [monthName, setMonthName] = useState(MONTHS[month])
  const [year, setYear] = useState(today.getFullYear())
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])

  const getPrevDaysMonth = (startDay: number): CalendarDay[] => {
    const prevDays: CalendarDay[] = []
    const lastPrevMonthDate = new Date(year, month, 0)
    const lastPrevMonthDay = lastPrevMonthDate.getDate()
    for (let x = startDay; x > 0; x--) {
      prevDays.push({ day: lastPrevMonthDay - x + 1, type: "prev" })
    }
    return prevDays
  }

  const getCurrentDaysMonth = (lastMonthDay: number): CalendarDay[] => {
    const currentDays: CalendarDay[] = []
    for (let i = 1; i <= lastMonthDay; i++) {
      currentDays.push({ day: i, type: "current" })
    }
    return currentDays
  }

  const getNextDaysMonth = (startDay: number, lastMonthDay: number): CalendarDay[] => {
    const nextDays: CalendarDay[] = []
    const totalCalendarDays = 42
    const remainingNextDays = totalCalendarDays - startDay - lastMonthDay
    for (let i = 1; i <= remainingNextDays; i++) {
      nextDays.push({ day: i, type: "next" })
    }
    return nextDays
  }

  const generateCalendar = () => {
    const firstMonthDate = new Date(year, month, 1)
    const lastMonthDate = new Date(year, month + 1, 0)
    const startDay = firstMonthDate.getDay()
    const lastMonthDay = lastMonthDate.getDate()
    const prevDays = getPrevDaysMonth(startDay)
    const currentDays = getCurrentDaysMonth(lastMonthDay)
    const nextDays = getNextDaysMonth(startDay, lastMonthDay)
    setCalendarDays([...prevDays, ...currentDays, ...nextDays])
  }

  // Init calendar
  useEffect(() => {
    generateCalendar()
    setMonthName(MONTHS[month])
  }, [month, year])

  const getPreviousMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 0) {
        // If is january, downgrade the year
        setYear((prevYear) => prevYear - 1)
        return 11 // change to december
      }
      return prevMonth - 1
    })
  }

  const getNextMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 11) {
        // If is december, increase the year
        setYear((prevYear) => prevYear + 1)
        return 0 // change to january
      }
      return prevMonth + 1
    })
  }

  return {
    today,
    weekDays: WEEKDAYS,
    month,
    monthName,
    year,
    calendarDays,
    setToday,
    setMonth,
    setYear,
    getPreviousMonth,
    getNextMonth
  }
}
