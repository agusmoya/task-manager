import { useMemo } from 'react';

import { DeleteIcon, EditIcon } from '../../../component/icons/Icons.tsx';

import { useCalendarActions } from '../../../store/hooks/useCalendarActions.ts';
import { useEventModalActions } from '../../../store/hooks/useEventModalActions.ts';
import { MONTHS } from '../../constants/constants.ts';
import { isSameDay } from '../../utils/isSameDay.ts';

import { type CalendarEvent } from '../../types/calendar-event.d';

import './CalendarEvents.css';

export const CalendarEvents = () => {
  const { openModal } = useEventModalActions()
  const {
    month,
    year,
    activeCalendarDay,
    events,
    startDeletingEvent,
    setActiveEvent
  } = useCalendarActions()

  const eventsForActiveDay = useMemo(
    () => {
      if (!events || !activeCalendarDay) return []
      return events.filter(e => isSameDay(e, activeCalendarDay))
    },
    [events, activeCalendarDay]
  )

  const { dayNumber, dayName } = activeCalendarDay || {}
  const eventDate = `${dayNumber} ${MONTHS[month]} ${year}`

  const handleClickDeleteEvent = (event: CalendarEvent) => {
    startDeletingEvent(event)
  }

  const handleClickEditEvent = (event: CalendarEvent) => {
    setActiveEvent({ ...event })
    openModal()
  }

  const formatEventTime = (event: CalendarEvent): string => {
    const { start, end } = event
    const startMinutes = start.getMinutes() < 10 ? `${'0' + start.getMinutes()}` : start.getMinutes()
    const endMinutes = end.getMinutes() < 10 ? `${'0' + end.getMinutes()}` : end.getMinutes()
    return `${start.getHours()}:${startMinutes} hs - ${end.getHours()}:${endMinutes} hs`
  }

  return (
    <section className="calendar-events">
      {
        (activeCalendarDay)
          ?
          <>
            <div className="calendar-events__info">
              <span className="calendar-events__day">{dayName}</span>
              <span className="calendar-events__date">{eventDate}</span>
            </div>
            <div className="calendar-events__events">
              {
                (eventsForActiveDay && eventsForActiveDay.length > 0)
                  ?
                  eventsForActiveDay.map(event => {
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
          </>
          :
          <span className="calendar-events__no-day-selected">
            No day selected
          </span>
      }
    </section>
  )
}