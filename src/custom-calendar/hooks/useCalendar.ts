import { useState, useEffect } from "react";

import { WEEKDAYS, MONTHS } from "../constants.ts";
import { useCalendarStore } from "../../store/hooks/useCalendarStore.ts";

import { type CalendarDay } from "../types/day-calendar.d";

export const useCalendar = () => {
  const [today, setToday] = useState(new Date())
  const [month, setMonth] = useState(today.getMonth())
  const [monthName, setMonthName] = useState(MONTHS[month])
  const [year, setYear] = useState(today.getFullYear())
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
  const [activeCalendarDay, setActiveCalendarDay] = useState<CalendarDay>({
    dayNumber: today.getDate(),
    dayName: WEEKDAYS[today.getDay()],
    type: 'current',
    events: []
  })
  const { events } = useCalendarStore()


  const getPrevDaysMonth = (startDay: number): CalendarDay[] => {
    const prevDays: CalendarDay[] = []
    const lastPrevMonthDate = new Date(year, month, 0)
    const lastPrevMonthDay = lastPrevMonthDate.getDate()

    for (let x = startDay; x > 0; x--) {
      const dayNumber = lastPrevMonthDay - x + 1;
      const dayOfWeek = new Date(year, month - 1, dayNumber).getDay();
      const dayName = WEEKDAYS[dayOfWeek];
      prevDays.push({ dayNumber, dayName, type: "prev", events: [] })
    }
    return prevDays
  }

  const getCurrentDaysMonth = (lastMonthDay: number): CalendarDay[] => {
    const currentDays: CalendarDay[] = []
    for (let i = 1; i <= lastMonthDay; i++) {
      const dayNumber = i;
      const dayOfWeek = new Date(year, month - 1, dayNumber).getDay();
      const dayName = WEEKDAYS[dayOfWeek];
      currentDays.push({ dayNumber, dayName, type: "current", events: [] })
    }
    return currentDays
  }

  const getNextDaysMonth = (startDay: number, lastMonthDay: number): CalendarDay[] => {
    const nextDays: CalendarDay[] = []
    const totalCalendarDays = 42
    const remainingNextDays = totalCalendarDays - startDay - lastMonthDay
    for (let i = 1; i <= remainingNextDays; i++) {
      const dayNumber = i;
      const dayOfWeek = new Date(year, month - 1, dayNumber).getDay();
      const dayName = WEEKDAYS[dayOfWeek];
      nextDays.push({ dayNumber: i, dayName, type: "next", events: [] })
    }
    return nextDays
  }

  const assignEventsToDays = (days: CalendarDay[]): CalendarDay[] => {
    const daysWithEvents = days.map(
      (cd) => {
        const dayEvents = events.filter((event) => {
          const eventDate = new Date(event.start)
          return eventDate.getDate() === cd.dayNumber
            && eventDate.getMonth() === month
            && eventDate.getFullYear() === year
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

  // to avoid undefined active day
  useEffect(() => {
    const newActiveDay = calendarDays.find(cd => cd.dayNumber === today.getDate());
    if (newActiveDay) {
      setActiveCalendarDay(newActiveDay);
    }
  }, [calendarDays, today]);

  // Init calendar
  useEffect(() => {
    generateCalendar()
    setMonthName(MONTHS[month])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today, month, year, events])

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
