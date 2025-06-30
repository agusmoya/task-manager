import clsx from 'clsx'

import { FabMonth } from '../fab-month/FabMonth'
import { Button } from '../../../components/button/Button'

import { MONTHS, type CalendarDay } from '../../../types/calendar-day.d'
import { type IEvent } from '../../../types/event'

import { useCalendarActions } from '../../../store/hooks/useCalendarActions'
import { useEventActions } from '../../../store/hooks/useEventActions'

import {
  isSameDay,
  isActiveDay,
  isNextDay,
  isPrevDay,
  isToday,
  currentDate,
} from '../../utils/validateManagmentDate'
import { getToday } from '../../utils/dateUtils'

import './CalendarGridDays.css'

export const CalendarGridDays = () => {
  const {
    weekDays,
    month,
    year,
    calendarDays,
    activeCalendarDay,
    setActiveCalendarDay,
    getPreviousMonth,
    getNextMonth,
    setMonth,
    setYear,
  } = useCalendarActions()

  const { events } = useEventActions()

  const handleDayClick = (day: CalendarDay) => {
    if (day.type !== 'current') return
    setActiveCalendarDay(day)
  }

  const filterEventsByDays = (events: IEvent[], calendarDay: CalendarDay) => {
    return events.filter(event => isSameDay(event, calendarDay))
  }

  const handleClickGoToday = () => {
    setMonth(getToday().getMonth())
    setYear(getToday().getFullYear())
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
          {currentDate()}
        </Button>
      </div>

      <div className="calendar-wrapper__month">
        <FabMonth onHandleClick={getPreviousMonth} direction="left" />
        <span className="calendar-wrapper__month__date">{`${MONTHS[month]} ${year}`}</span>
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
          const { day, month, year, type } = calendarDay
          const dayHasEvents = filterEventsByDays(events, calendarDay).length > 0

          return (
            <div
              key={`${type}-${year}-${month}-${day}`}
              onClick={() => handleDayClick(calendarDay)}
              className={clsx(
                'calendar-wrapper__day',
                isActiveDay(activeCalendarDay!, calendarDay) && 'calendar-wrapper__day--active',
                isToday(calendarDay) && 'calendar-wrapper__day--today',
                isPrevDay(type) && 'calendar-wrapper__day--prev',
                isNextDay(type) && 'calendar-wrapper__day--next',
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
