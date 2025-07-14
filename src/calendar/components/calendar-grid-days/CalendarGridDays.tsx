import clsx from 'clsx'

import { FabMonth } from '../fab-month/FabMonth'
import { Button } from '../../../components/button/Button'

import { CalendarDay, CALENDAR_DAY_TYPE } from '../../../types/calendar-day'

import { isActiveDay, isToday } from '../../utils/validateManagmentDate'

import { useCalendar } from '../../hooks/useCalendar'
import { useCalendarActions } from '../../../store/hooks/useCalendarActions'

import './CalendarGridDays.css'

export const CalendarGridDays = () => {
  const { calendarDays, todayDateLabel, monthYearLabel } = useCalendar()
  const {
    weekDays,
    activeCalendarDay,
    setActiveCalendarDay,
    setMonth,
    setYear,
    getPreviousMonth,
    getNextMonth,
  } = useCalendarActions()

  const handleDayClick = (day: CalendarDay) => {
    if (day.type !== CALENDAR_DAY_TYPE.CURRENT) return
    setActiveCalendarDay(day)
  }

  const handleClickGoToday = () => {
    const today = new Date()
    setMonth(today.getMonth())
    setYear(today.getFullYear())
  }

  return (
    <div className="calendar-wrapper">
      <div className="calendar-wrapper__today">
        <Button
          type="button"
          variant="text"
          className="calendar-wrapper__today-button"
          onClick={handleClickGoToday}
        >
          {todayDateLabel}
        </Button>
      </div>

      <div className="calendar-wrapper__month">
        <FabMonth onHandleClick={getPreviousMonth} direction="left" />
        <span className="calendar-wrapper__month__date">{monthYearLabel}</span>
        <FabMonth onHandleClick={getNextMonth} direction="right" />
      </div>

      <div className="calendar-wrapper__weekdays">
        {weekDays.map(dayName => (
          <div key={dayName} className="calendar-wrapper__weekday">
            {dayName.slice(0, 3)}
          </div>
        ))}
      </div>

      <div className="calendar-wrapper__days">
        {calendarDays.map(calendarDay => {
          const { day, month, year, type, events } = calendarDay
          const dayHasEvents = events.length > 0

          return (
            <div
              key={`${type}-${year}-${month}-${day}`}
              onClick={() => handleDayClick(calendarDay)}
              className={clsx(
                'calendar-wrapper__day',
                type === CALENDAR_DAY_TYPE.PREVIOUS && 'calendar-wrapper__day--prev',
                type === CALENDAR_DAY_TYPE.NEXT && 'calendar-wrapper__day--next',
                isActiveDay(activeCalendarDay!, calendarDay) && 'calendar-wrapper__day--active',
                isToday(calendarDay) && 'calendar-wrapper__day--today',
                dayHasEvents && 'calendar-wrapper__day--event'
              )}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}
