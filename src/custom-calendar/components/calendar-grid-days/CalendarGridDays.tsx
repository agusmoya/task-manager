import { FabNextMonth } from "../fab-next/FabNextMonth.tsx";
import { FabPreviousMonth } from "../fab-previous/FabPreviousMonth.tsx";

import { type CalendarDay } from "../../types/DayCalendar.ts";

interface CalendarGridDayProps {
  today: Date;
  weekDays: string[];
  month: number;
  monthName: string;
  year: number;
  calendarDays: CalendarDay[];
  getPreviousMonth: () => void;
  getNextMonth: () => void;
}

export const CalendarGridDays = ({ today, weekDays, month, monthName, year, calendarDays, getPreviousMonth, getNextMonth }: CalendarGridDayProps) => {

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
            <div key={dayName} className="calendar__weekday">{dayName}</div>
          ))
        }
      </div>
      <div className="calendar__days">
        {
          calendarDays.map((cd: CalendarDay) => {
            const isToday = today.getDate() === cd.day && today.getMonth() === month && today.getFullYear() === year
            const typeClasses = {
              prev: "prev-date",
              current: isToday ? "today" : "",
              next: "next-date",
            }

            return (
              <div
                key={`${cd.type}-${year}-${month}-${cd.day}`}
                className={`calendar__day ${typeClasses[cd.type]}`}
              >
                {cd.day}
              </div>
            )
          })
        }
      </div>
    </>
  )
}
