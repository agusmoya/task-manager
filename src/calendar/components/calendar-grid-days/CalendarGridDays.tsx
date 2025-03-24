import { useEffect } from "react";

import { type CalendarDay } from "../../types/calendar-day.d";
import { type CalendarEvent } from "../../types/calendar-event.d";

import { FabNextMonth } from "../fab-next/FabNextMonth.tsx";
import { FabPreviousMonth } from "../fab-previous/FabPreviousMonth.tsx";

import { MONTHS } from "../../constants/constants.ts";
import { useCalendarActions } from "../../../store/hooks/useCalendarActions.ts";

import './CalendarGridDays.css';


export const CalendarGridDays = () => {
  const {
    today,
    weekDays,
    month,
    year,
    calendarDays,
    events,
    activeCalendarDay,
    generateCalendar,
    setActiveCalendarDay,
    getPreviousMonth,
    getNextMonth
  } = useCalendarActions()

  useEffect(() => {
    generateCalendar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, events])

  const handleDayClick = (day: CalendarDay) => {
    if (day.type !== 'current') return
    setActiveCalendarDay(day)
  }

  const isToday = (cd: CalendarDay) => {
    const { dayNumber, month, year } = cd
    return (
      today.getDate() === dayNumber
      && today.getMonth() === month
      && today.getFullYear() === year
    )
  }

  const isPrevDay = (type: string) => {
    return type === 'prev'
  }

  const isNextDay = (type: string) => {
    return type === 'next'
  }

  const isActiveDay = (activeCalendarDay: CalendarDay, day: CalendarDay) => {
    if (!activeCalendarDay) return
    const { dayNumber, month, year } = day
    return (
      activeCalendarDay.dayNumber === dayNumber
      && activeCalendarDay.month === month
      && activeCalendarDay.year === year
    )
  }

  const filterEventsByDays = (events: CalendarEvent[], day: CalendarDay) => {
    const { dayNumber, month, year } = day
    return events.filter(
      ({ start }) => (
        start.getDate() === dayNumber
        && start.getMonth() === month
        && start.getFullYear() === year
      ))
  }

  return (
    <>
      <div className="calendar-month">
        <FabPreviousMonth onClickPrev={getPreviousMonth} />
        <span className="calendar-month__date">
          {`${MONTHS[month]} ${year}`}
        </span>
        <FabNextMonth onClickNext={getNextMonth} />
      </div>
      <div className="calendar-weekdays">
        {
          weekDays.map((dayName) => (
            <div key={dayName} className="calendar-weekdays__weekday">
              {dayName.slice(0, 3)}
            </div>
          ))
        }
      </div>
      <div className="calendar-days">
        {
          calendarDays.map((day: CalendarDay) => {
            const { dayNumber, month, year, type } = day
            const dayHasEvents = filterEventsByDays(events, day).length > 0

            return (
              <div
                key={`${type}-${year}-${month}-${dayNumber}`}
                className={[
                  'calendar-days__day',
                  isActiveDay(activeCalendarDay!, day) && 'calendar-days__day--active',
                  isToday(day) && 'calendar-days__day--today',
                  isPrevDay(type) && 'calendar-days__day--prev-day',
                  isNextDay(type) && 'calendar-days__day--next-day',
                  dayHasEvents && 'calendar-days__day--event'
                ].filter(Boolean).join(' ')}
                onClick={() => handleDayClick(day)}
              >
                {dayNumber}
              </div>
            )
          })
        }
      </div>
    </>
  )
}
