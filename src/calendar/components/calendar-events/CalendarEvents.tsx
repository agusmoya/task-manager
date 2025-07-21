import { useCallback, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import { Loader } from '../../../components/loader-page/Loader'
import { ConfirmModal } from '../../../components/confirm-modal/ConfirmModal'
import { EventTimelineItem } from '../../event-timeline-item/EventTimelineItem'

import { ModalIds } from '../../../constants/modalIds'
import { IEvent } from '../../../types/event'

import { useCalendar } from '../../hooks/useCalendar'
import { useModalActions } from '../../../store/hooks/useModalActions'
import { useEventActions } from '../../../store/hooks/useEventActions'
import { useCalendarActions } from '../../../store/hooks/useCalendarActions'

import './CalendarEvents.css'

/**
 * Calendar Events Component
 *
 * Displays events for the selected calendar day with timeline view.
 * Provides functionality to edit and delete events.
 *
 * @returns JSX element containing the calendar events sidebar
 */
export const CalendarEvents = () => {
  const navigate = useNavigate()
  const { isOpen, open, close } = useModalActions(ModalIds.Confirm)
  const { activeCalendarDay } = useCalendarActions()
  const { fetching, activeEvent, setActiveEvent, clearActiveEvent, deleteEvent } = useEventActions()
  const { eventsForActiveDay, activeCalendarDayName, fullDateLabel } = useCalendar()

  const handleClickDeleteEvent = useCallback(
    (id: string) => {
      setActiveEvent(id)
      open()
    },
    [setActiveEvent, open]
  )

  const handleClickEditEvent = useCallback(
    ({ taskId, id }: IEvent) => {
      if (!taskId) return
      navigate(`/home/task-form/${taskId}?editEvent=${id}`, { replace: true })
    },
    [navigate]
  )

  const handleConfirmDelete = useCallback(async () => {
    if (!activeEvent) return
    await deleteEvent(activeEvent.id)
    clearActiveEvent()
    close()
  }, [activeEvent, deleteEvent, clearActiveEvent, close])

  const eventsListContent = useMemo(() => {
    if (eventsForActiveDay.length === 0) {
      return <span className="events-timeline--empty">No events</span>
    }

    return eventsForActiveDay.map(event => (
      <EventTimelineItem
        key={event.id}
        event={event}
        onEditEvent={handleClickEditEvent}
        onDeleteEvent={handleClickDeleteEvent}
      />
    ))
  }, [eventsForActiveDay, handleClickEditEvent, handleClickDeleteEvent])

  if (fetching) return <Loader />

  return (
    <aside className="calendar-events">
      {!activeCalendarDay && <span className="calendar-events--empty">No day selected</span>}

      <header className="calendar-events__header">
        <span className="calendar-events__header-day">{activeCalendarDayName}</span>
        <span className="calendar-events__header-date">{fullDateLabel}</span>
      </header>

      <ul className="events-timeline">{eventsListContent}</ul>

      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          title="Delete Task"
          message="Are you sure you want to delete this event?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={close}
        />
      )}
    </aside>
  )
}
