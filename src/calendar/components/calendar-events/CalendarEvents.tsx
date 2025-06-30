import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { DeleteIcon, EditIcon } from '../../../components/icons/Icons'
import { Button } from '../../../components/button/Button'
import { Loader } from '../../../components/loader-page/Loader'

import { MONTHS } from '../../../types/calendar-day.d'
import { IEvent } from '../../../types/event'

import { useCalendarActions } from '../../../store/hooks/useCalendarActions'
import { useEventActions } from '../../../store/hooks/useEventActions'

import { isSameDay } from '../../utils/validateManagmentDate'

import './CalendarEvents.css'

export const CalendarEvents = () => {
  const navigate = useNavigate()
  const { month, year, activeCalendarDay } = useCalendarActions()
  const { events, fetching, fetchEventError, refetch, updating, deleting, deleteEvent } =
    useEventActions()

  // Filter and sort events for the selected day
  const eventsForSelectedDay = useMemo(() => {
    if (!events || !activeCalendarDay) return []
    return events
      .filter(e => isSameDay(e, activeCalendarDay))
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
  }, [events, activeCalendarDay])

  const { day, dayName } = activeCalendarDay || {}
  const eventDate = `${day} ${MONTHS[month]} ${year}`

  const handleClickDeleteEvent = (event: IEvent) => {
    deleteEvent(event.id as string)
  }

  const handleClickEditEvent = (event: IEvent) => {
    const taskId = event.taskId
    if (!taskId) return
    navigate(`/home/task-form/${taskId}`, {
      state: { openEventId: event.id },
    })
  }

  // Format event time range as "HH:mm hs - HH:mm hs"
  const getEventTimeRange = (event: IEvent): string => {
    const { start, end } = event
    const startDate = new Date(start)
    const endDate = new Date(end)

    const pad = (num: number) => num.toString().padStart(2, '0')
    const startH = pad(startDate.getHours())
    const startM = pad(startDate.getMinutes())
    const endH = pad(endDate.getHours())
    const endM = pad(endDate.getMinutes())

    return `${startH}:${startM} hs - ${endH}:${endM} hs`
  }

  if (fetching) {
    return <Loader />
  }
  if (fetchEventError) {
    return (
      <div className="calendar-events__error">
        <p>Error al cargar eventos.</p>
        <Button onClick={() => refetch()}>Reintentar</Button>
      </div>
    )
  }

  return (
    <aside className="calendar-events">
      {activeCalendarDay ? (
        <>
          <header className="calendar-events__info">
            <span className="calendar-events__day">{dayName}</span>
            <span className="calendar-events__date">{eventDate}</span>
          </header>
          <section className="calendar-events__list">
            {eventsForSelectedDay.length > 0 ? (
              eventsForSelectedDay.map(event => {
                const { id, title } = event
                return (
                  <article className="calendar-events__item" key={id}>
                    <Button
                      type="button"
                      variant="text"
                      className="calendar-events__item-edit-btn"
                      onClick={() => handleClickEditEvent(event)}
                      disabled={updating}
                    >
                      <EditIcon />
                    </Button>
                    <div className="calendar-events__item-info">
                      <h3 className="calendar-events__item-title">{title}</h3>
                      <span className="calendar-events__item-time">{getEventTimeRange(event)}</span>
                    </div>
                    <Button
                      type="button"
                      variant="text"
                      className="calendar-events__item-delete-btn"
                      onClick={() => handleClickDeleteEvent(event)}
                      disabled={deleting}
                    >
                      <DeleteIcon />
                    </Button>
                  </article>
                )
              })
            ) : (
              <span className="calendar-events__no-events">No events</span>
            )}
          </section>
        </>
      ) : (
        <span className="calendar-events__no-day-selected">No day selected</span>
      )}
    </aside>
  )
}
