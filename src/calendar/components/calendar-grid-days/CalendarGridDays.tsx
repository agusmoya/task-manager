import { useEffect, useState } from 'react'

import clsx from 'clsx'
import dayjs from 'dayjs'

import { Button } from '../../../components/button/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '../../../components/icons/Icons'
import { SlideTransition } from '../../../components/slide-transition/SlideTransition'

import { CalendarDay, CALENDAR_DAY_TYPE } from '../../../types/calendar-day'

import { isActiveDay, isToday } from '../../utils/validateManagmentDate'

import { useCalendar } from '../../hooks/useCalendar'
import { useCalendarActions } from '../../../store/hooks/useCalendarActions'

import './CalendarGridDays.css'

export const CalendarGridDays = () => {
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'center' | null>(null)
  const { calendarDays, todayDateLabel, resetActiveCalendarDay } = useCalendar()
  const {
    weekDays,
    activeCalendarDay,
    setActiveCalendarDay,
    setMonth,
    setYear,
    getPreviousMonth,
    getNextMonth,
  } = useCalendarActions()

  useEffect(() => {
    return () => resetActiveCalendarDay()
  }, [resetActiveCalendarDay])

  const handleDayClick = (day: CalendarDay) => {
    if (day.type !== CALENDAR_DAY_TYPE.CURRENT) return
    setActiveCalendarDay(day)
  }

  const handleClickGoToday = () => {
    setSlideDirection('center')
    const today = dayjs()
    setMonth(today.month())
    setYear(today.year())
  }

  const handleGetPreviousMonth = () => {
    setSlideDirection('left')
    getPreviousMonth()
  }

  const handleGetNextMonth = () => {
    setSlideDirection('right')
    getNextMonth()
  }

  return (
    <div className="calendar">
      <section className="calendar__header">
        <Button
          variant="fab"
          className="calendar__nav-btn calendar__nav-btn--prev"
          onClick={handleGetPreviousMonth}
        >
          <ArrowLeftIcon />
        </Button>

        <Button
          variant="text"
          className="calendar__button calendar__button--today"
          onClick={handleClickGoToday}
        >
          {todayDateLabel}
        </Button>

        <Button
          variant="fab"
          className="calendar__nav-btn calendar__nav-btn--prev"
          onClick={handleGetNextMonth}
        >
          <ArrowRightIcon />
        </Button>
      </section>

      <section className="calendar__weekdays">
        {weekDays.map(dayName => (
          <span key={dayName} className="calendar__weekday">
            {dayName}
          </span>
        ))}
      </section>

      <SlideTransition direction={slideDirection} onAnimationEnd={() => setSlideDirection(null)}>
        <section className="calendar__days">
          {calendarDays.map(calendarDay => {
            const { day, month, year, type, events } = calendarDay
            const dayHasEvents = events.length > 0

            return (
              <div
                key={`${type}-${year}-${month}-${day}`}
                onClick={() => handleDayClick(calendarDay)}
                className={clsx(
                  'calendar__day',
                  type === CALENDAR_DAY_TYPE.PREVIOUS && 'calendar__day--prev',
                  type === CALENDAR_DAY_TYPE.NEXT && 'calendar__day--next',
                  isActiveDay(activeCalendarDay!, calendarDay) && 'calendar__day--active',
                  isToday(calendarDay) && 'calendar__day--today',
                  dayHasEvents && 'calendar__day--event'
                )}
              >
                {day}
              </div>
            )
          })}
        </section>
      </SlideTransition>
    </div>
  )
}
