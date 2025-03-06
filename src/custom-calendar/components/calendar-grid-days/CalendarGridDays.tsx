import { Dispatch, SetStateAction } from "react";

import { FabNextMonth } from "../fab-next/FabNextMonth.tsx";
import { FabPreviousMonth } from "../fab-previous/FabPreviousMonth.tsx";

import { type CalendarDay } from "../../types/day-calendar.d";

interface CalendarGridDayProps {
  today: Date;
  weekDays: string[];
  month: number;
  monthName: string;
  year: number;
  calendarDays: CalendarDay[];
  getPreviousMonth: () => void;
  getNextMonth: () => void;
  setActiveCalendarDay: Dispatch<SetStateAction<CalendarDay>>;
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

  const handleDayClick = (day: CalendarDay) => {
    setActiveCalendarDay(day)
  }

  return (
    <>
      <div className="calendar__month">
        <FabPreviousMonth onClickPrev={getPreviousMonth} />
        <span className="date">{`${monthName} ${year}`}</span>
        <FabNextMonth onClickNext={getNextMonth} />
      </div>
      <div className="calendar__weekdays">
        {
          weekDays.map((dayName) => (
            <div key={dayName} className="calendar__weekday">
              {dayName.slice(0, 3)}
            </div>
          ))
        }
      </div>
      <div className="calendar__days">
        {
          calendarDays.map((cd: CalendarDay) => {
            const isToday =
              today.getDate() === cd.dayNumber &&
              today.getMonth() === month &&
              today.getFullYear() === year

            const typeClasses = {
              prev: "prev-date",
              current: isToday ? "today" : "",
              next: "next-date",
            }
            const dayHasEvents = cd.events.length > 0

            return (
              <div
                key={`${cd.type}-${year}-${month}-${cd.dayNumber}`}
                className={
                  `calendar__day
                  ${typeClasses[cd.type]}
                  ${dayHasEvents ? 'event' : ''}`
                }
                onClick={() => handleDayClick(cd)}
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
