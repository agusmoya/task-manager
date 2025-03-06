import { type CalendarDay } from '../../types/day-calendar.d';
import { type CustomEvent } from '../../types/event.d';

import './CalendarEvents.css';

type CalendarEventsProps = {
  activeCalendarDay: CalendarDay;
  monthName: string;
  year: number;
}
export const CalendarEvents = ({ activeCalendarDay, monthName, year }: CalendarEventsProps) => {
  const { dayNumber, dayName, events } = activeCalendarDay

  const formatEventTime = (event: CustomEvent): string => {
    const { start, end } = event
    return `${start.getHours()}:${start.getMinutes()} hs - ${end.getHours()}:${end.getMinutes()} hs`
  }

  return (
    <section className="calendar-events">
      <div className="calendar-events__info">
        <div className="calendar-events__day">{dayName}</div>
        <div className="calendar-events__date">{dayNumber} {monthName} {year}</div>
      </div>
      <div className="calendar-events__events">
        {
          (events.length > 0)
            ? events.map(event => {
              const { _id, title } = event
              return (
                <div className="calendar-events__event" key={_id}>
                  <h3 className="calendar-events__event-title">{title}</h3>
                  <div className="event-time">
                    {formatEventTime(event)}
                  </div>
                </div>
              )
            })
            : <div className="calendar-events__events-none">No events</div>
        }
      </div>
    </section>
  )
}