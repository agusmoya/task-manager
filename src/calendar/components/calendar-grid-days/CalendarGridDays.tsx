import { Dispatch, SetStateAction } from "react";

import { FabNextMonth } from "../fab-next/FabNextMonth.tsx";
import { FabPreviousMonth } from "../fab-previous/FabPreviousMonth.tsx";

import { type CalendarDay } from "../../types/day-calendar.d";

import './CalendarGridDays.css';

interface CalendarGridDayProps {
  today: Date;
  weekDays: string[];
  month: number;
  monthName: string;
  year: number;
  calendarDays: CalendarDay[];
  getPreviousMonth: () => void;
  getNextMonth: () => void;
  setActiveCalendarDay: Dispatch<SetStateAction<CalendarDay | undefined>>;
}

export const CalendarGridDays = (
  {
    today,
    weekDays,
    month,
    monthName,
    year,
    calendarDays,
    getPreviousMonth,
    getNextMonth,
    setActiveCalendarDay
  }: CalendarGridDayProps
) => {
  const handleDayClick = (event: React.MouseEvent<HTMLDivElement>, day: CalendarDay) => {
    if (day.type === 'prev' || day.type === 'next') return
    // Find previous active day and remove active class
    const prevActive = document.querySelector('.calendar-days__day--active')
    if (prevActive) prevActive.classList.remove('calendar-days__day--active')
    event.currentTarget.classList.add('calendar-days__day--active')
    setActiveCalendarDay(day)
  }

  return (
    <>
      <div className="calendar-month">
        <FabPreviousMonth onClickPrev={getPreviousMonth} />
        <span className="calendar-month__date">
          {`${monthName} ${year}`}
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
          calendarDays.map((cd: CalendarDay) => {
            const dayHasEvents = cd.events.length > 0
            const isToday =
              today.getDate() === cd.dayNumber &&
              today.getMonth() === month &&
              today.getFullYear() === year

            return (
              <div
                key={`${cd.type}-${year}-${month}-${cd.dayNumber}`}
                className={
                  `calendar-days__day
                  ${isToday ? 'calendar-days__day--today' : ''}
                  ${cd.type === 'prev' ? 'calendar-days__day--prev-day' : ''}
                  ${cd.type === 'next' ? 'calendar-days__day--next-day' : ''}
                  ${dayHasEvents ? 'calendar-days__day--event' : ''}`
                }
                onClick={(event) => handleDayClick(event, cd)}
              >
                {cd.dayNumber}
              </div>
            )
          })
        }
      </div>
    </>
  )
}
