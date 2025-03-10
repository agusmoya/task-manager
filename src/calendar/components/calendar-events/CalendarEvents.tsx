import { useCalendarActions } from '../../../store/hooks/useCalendarActions.ts';

import { DeleteIcon, EditIcon } from '../../icons/Icons.tsx';

import { type CalendarDay } from '../../types/day-calendar.d';
import { type CustomEvent } from '../../types/event.d';

import './CalendarEvents.css';

type CalendarEventsProps = {
  activeCalendarDay: CalendarDay;
  monthName: string;
  year: number;
}
export const CalendarEvents = ({ activeCalendarDay, monthName, year }: CalendarEventsProps) => {
  const { startDeletingEvent } = useCalendarActions()
  const { dayNumber, dayName, events } = activeCalendarDay

  const formatEventTime = (event: CustomEvent): string => {
    const { start, end } = event
    return `${start.getHours()}:${start.getMinutes()} hs - ${end.getHours()}:${end.getMinutes()} hs`
  }

  const eventDate = `${dayNumber} ${monthName} ${year}`

  const handleClickDeleteEvent = (event: CustomEvent) => {
    startDeletingEvent(event)
  }

  const handleClickEditEvent = (event: CustomEvent) => {
    console.log('Edit event', event)
    // startSavignEvent(event)
  }

  return (
    <section className="calendar-events">
      <div className="calendar-events__info">
        <span className="calendar-events__day">{dayName}</span>
        <span className="calendar-events__date">{eventDate}</span>
      </div>
      <div className="calendar-events__events">
        {
          (events.length > 0)
            ?
            events.map(event => {
              const { _id, title } = event
              return (
                <article className="calendar-events__item" key={_id}>
                  <button
                    className="calendar-events__item-edit-btn"
                    onClick={() => handleClickEditEvent(event)}
                  >
                    <EditIcon size={22} />
                  </button>
                  <div className="calendar-events__item-info">
                    <h3 className="calendar-events__item-title">
                      {title}
                    </h3>
                    <span className="calendar-events__item-time">
                      {formatEventTime(event)}
                    </span>
                  </div>
                  <button
                    className="calendar-events__item-delete-btn"
                    onClick={() => handleClickDeleteEvent(event)}
                  >
                    <DeleteIcon size={22} />
                  </button>
                </article>
              )
            })
            :
            <span className="calendar-events__no-events">
              No events
            </span>
        }
      </div>
    </section>
  )
}