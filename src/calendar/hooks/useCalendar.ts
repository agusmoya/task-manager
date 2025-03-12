import { useState, useEffect } from "react";

import { WEEKDAYS, MONTHS } from "../constants/constants.ts";

import { useCalendarActions } from "../../store/hooks/useCalendarActions.ts";

import { type CalendarDay } from "../types/calendar-day.d";


export const useCalendar = () => {
  const [today, setToday] = useState(new Date())
  const [month, setMonth] = useState(today.getMonth())
  const [monthName, setMonthName] = useState(MONTHS[month])
  const [year, setYear] = useState(today.getFullYear())
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
  const { calendarEvents } = useCalendarActions()

  // Init calendar
  useEffect(() => {
    generateCalendar()
    setMonthName(MONTHS[month])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today, month, year, calendarEvents])

  const getPrevDaysMonth = (startDay: number): CalendarDay[] => {
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
        events: [], // no events for previous days
        month: month === 0 ? 11 : month - 1,
        year: month === 0 ? year - 1 : year
      })
    }
    return prevDays
  }

  const getCurrentDaysMonth = (lastMonthDay: number): CalendarDay[] => {
    const currentDays: CalendarDay[] = []
    for (let i = 1; i <= lastMonthDay; i++) {
      const dayNumber = i;
      const dayOfWeek = new Date(year, month - 1, dayNumber).getDay()
      const dayName = WEEKDAYS[dayOfWeek]
      currentDays.push({
        dayNumber,
        dayName,
        type: "current",
        events: [], // only visualize current month events
        month: month,
        year: year
      })
    }
    return currentDays
  }

  const getNextDaysMonth = (
    startDay: number,
    lastMonthDay: number
  ): CalendarDay[] => {
    const nextDays: CalendarDay[] = []
    const totalCalendarDays = 42
    const remainingNextDays = totalCalendarDays - startDay - lastMonthDay

    for (let i = 1; i <= remainingNextDays; i++) {
      const dayNumber = i
      const dayOfWeek = new Date(year, month - 1, dayNumber).getDay()
      const dayName = WEEKDAYS[dayOfWeek]
      nextDays.push({
        dayNumber: i,
        dayName,
        type: "next",
        events: [], // no events for next days
        month: month === 11 ? 0 : month + 1,
        year: month === 11 ? year + 1 : year
      })
    }
    return nextDays
  }

  const assignEventsToCurrentMonth = (days: CalendarDay[]): CalendarDay[] => {
    return days.map(
      (cd) => {
        const events = calendarEvents.filter((event) => {
          const { start } = event
          return start.getDate() === cd.dayNumber
            && start.getMonth() === cd.month
            && start.getFullYear() === cd.year
        })
        return { ...cd, events }
      })
  }

  const generateCalendar = () => {
    const firstMonthDate = new Date(year, month, 1)
    const lastMonthDate = new Date(year, month + 1, 0)
    const startDay = firstMonthDate.getDay()
    const lastMonthDay = lastMonthDate.getDate()
    const prevMonthDays = getPrevDaysMonth(startDay)
    const nextMonthDays = getNextDaysMonth(startDay, lastMonthDay)
    const currentMonthDays = getCurrentDaysMonth(lastMonthDay)
    const currentMonthDaysWithEvents = assignEventsToCurrentMonth(currentMonthDays)
    const totalDaysForCalendar = [
      ...prevMonthDays,
      ...currentMonthDaysWithEvents,
      ...nextMonthDays
    ]
    setCalendarDays(totalDaysForCalendar)
  }

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
