import { useState, useEffect } from "react";

import { WEEKDAYS, MONTHS } from "../constants/constants.ts";

import { type CalendarDay } from "../types/day-calendar.d";
import { useAppSelector } from "../../store/hooks/reduxStore.ts";

export const useCalendar = () => {
  const [today, setToday] = useState(new Date())
  const [month, setMonth] = useState(today.getMonth())
  const [monthName, setMonthName] = useState(MONTHS[month])
  const [year, setYear] = useState(today.getFullYear())
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
  const [activeCalendarDay, setActiveCalendarDay] = useState<CalendarDay | undefined>(undefined)
  const { events } = useAppSelector((state) => state.calendar);

  // Init calendar
  useEffect(() => {
    generateCalendar()
    setMonthName(MONTHS[month])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today, month, year, events])

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
        events: [],
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
        events: [],
        month: month,
        year: year
      })
    }
    return currentDays
  }

  const getNextDaysMonth = (startDay: number, lastMonthDay: number): CalendarDay[] => {
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
        events: [],
        month: month === 11 ? 0 : month + 1,
        year: month === 11 ? year + 1 : year
      })
    }
    return nextDays
  }

  const assignEventsToDays = (days: CalendarDay[]): CalendarDay[] => {
    const daysWithEvents = days.map(
      (cd) => {
        const dayEvents = events.filter((event) => {
          const eventDate = new Date(event.start)
          return eventDate.getDate() === cd.dayNumber
            && eventDate.getMonth() === cd.month
            && eventDate.getFullYear() === cd.year
        })
        return { ...cd, events: dayEvents }
      })

    return daysWithEvents
  }

  const generateCalendar = () => {
    const firstMonthDate = new Date(year, month, 1)
    const lastMonthDate = new Date(year, month + 1, 0)
    const startDay = firstMonthDate.getDay()
    const lastMonthDay = lastMonthDate.getDate()
    const prevDays = getPrevDaysMonth(startDay)
    const nextDays = getNextDaysMonth(startDay, lastMonthDay)
    const currentDays = getCurrentDaysMonth(lastMonthDay)
    const currentDaysWithEvents = assignEventsToDays(currentDays)
    const totalDaysForCalendar = [...prevDays, ...currentDaysWithEvents, ...nextDays]
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
    activeCalendarDay,
    setActiveCalendarDay,
    setToday,
    setMonth,
    setYear,
    getPreviousMonth,
    getNextMonth
  }
}
