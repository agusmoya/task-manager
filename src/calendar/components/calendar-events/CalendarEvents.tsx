import { useEffect, useMemo } from 'react'

import { DeleteIcon, EditIcon } from '../../../components/icons/Icons.tsx'
import { Button } from '../../../components/button/button.tsx'

import { type CalendarEvent } from '../../../types/calendar-event.d'

import { MONTHS } from '../../constants/constants.ts'
import { useCalendarActions } from '../../../store/hooks/useCalendarActions.ts'
import { useModalActions } from '../../../store/hooks/useModalActions.ts'
import { isSameDay } from '../../utils/validateManagmentDate.ts'
import { fromDateToDatetimeLocal } from '../../../helpers/form-validations/getEventFormValidations.ts'


import './CalendarEvents.css'


export const CalendarEvents = () => {
  const { openModal } = useModalActions()
  const {
    month,
    year,
    activeCalendarDay,
    events,
    deleteEventByTaskState,
    setActiveEvent,
    fetchEventsByUserId
  } = useCalendarActions()

  useEffect(() => {
    fetchEventsByUserId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const eventsForActiveDay = useMemo(
    () => {
      if (!events || !activeCalendarDay) return []
      return events.filter(e => isSameDay(e, activeCalendarDay))
    },
    [events, activeCalendarDay]
  )

  const { day, dayName } = activeCalendarDay || {}
  const eventDate = `${day} ${MONTHS[month]} ${year}`

  const handleClickDeleteEvent = (event: CalendarEvent) => {
    deleteEventByTaskState(event)
  }

  const handleClickEditEvent = (event: CalendarEvent) => {
    setActiveEvent({ ...event })
    openModal()
  }

  const formatEventTime = (event: CalendarEvent): string => {
    const { startDate, endDate } = event
    const safeStartDate = fromDateToDatetimeLocal(startDate)
    const safeEndDate = fromDateToDatetimeLocal(endDate)
    const newStartDate = new Date(safeStartDate)
    const newEndDate = new Date(safeEndDate)

    const startMinutes = newStartDate.getMinutes().toString().padStart(2, '0')
    const endMinutes = newEndDate.getMinutes().toString().padStart(2, '0')

    return `${newStartDate.getHours()}:${startMinutes} hs - ${newEndDate.getHours()}:${endMinutes} hs`
  }

  return (
    <aside className="calendar-events">
      {
        (activeCalendarDay)
          ?
          <>
            <header className="calendar-events__info">
              <span className="calendar-events__day">{dayName}</span>
              <span className="calendar-events__date">{eventDate}</span>
            </header>
            <section className="calendar-events__list">
              {
                (eventsForActiveDay && eventsForActiveDay.length > 0)
                  ?
                  eventsForActiveDay.map(event => {
                    const { id, title } = event
                    return (
                      <article className="calendar-events__item" key={id}>
                        <Button
                          type="button"
                          className="btn btn--text calendar-events__item-edit-btn"
                          onClick={() => handleClickEditEvent(event)}
                        >
                          <EditIcon />
                        </Button>
                        <div className="calendar-events__item-info">
                          <h3 className="calendar-events__item-title">
                            {title}
                          </h3>
                          <span className="calendar-events__item-time">
                            {formatEventTime(event)}
                          </span>
                        </div>
                        <Button
                          type="button"
                          className="btn btn--text calendar-events__item-delete-btn"
                          onClick={() => handleClickDeleteEvent(event)}
                        >
                          <DeleteIcon />
                        </Button>
                      </article>
                    )
                  })
                  :
                  <span className="calendar-events__no-events">
                    No events
                  </span>
              }
            </section>
          </>
          :
          <span className="calendar-events__no-day-selected">
            No day selected
          </span>
      }
    </aside>
  )
}
