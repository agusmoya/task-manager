import { useCalendarActions } from '../../../store/hooks/useCalendarActions.ts';
import { useEventModalActions } from '../../../store/hooks/useEventModalActions.ts';

import { DeleteIcon, EditIcon } from '../../icons/Icons.tsx';

import { type CustomEvent } from '../../types/event.d';

import './CalendarEvents.css';

type CalendarEventsProps = {
  monthName: string;
  year: number;
}
export const CalendarEvents = ({ monthName, year }: CalendarEventsProps) => {
  const { activeCalendarDay, startDeletingEvent, setActiveEvent } = useCalendarActions()
  const { openModal } = useEventModalActions()

  const { dayNumber, dayName, events } = activeCalendarDay
  const eventDate = `${dayNumber} ${monthName} ${year}`

  const handleClickDeleteEvent = (event: CustomEvent) => {
    startDeletingEvent(event)
  }

  const handleClickEditEvent = (event: CustomEvent) => {
    setActiveEvent(event)
    openModal()
  }

  const formatEventTime = (event: CustomEvent): string => {
    const { start, end } = event
    const startMinutes = start.getMinutes() < 10 ? `${'0' + start.getMinutes()}` : start.getMinutes()
    const endMinutes = end.getMinutes() < 10 ? `${'0' + end.getMinutes()}` : end.getMinutes()
    return `${start.getHours()}:${startMinutes} hs - ${end.getHours()}:${endMinutes} hs`
  }

  return (
    <section className="calendar-events">
      <div className="calendar-events__info">
        <span className="calendar-events__day">{dayName}</span>
        <span className="calendar-events__date">{eventDate}</span>
      </div>
      <div className="calendar-events__events">
        {
          (events && events.length > 0)
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