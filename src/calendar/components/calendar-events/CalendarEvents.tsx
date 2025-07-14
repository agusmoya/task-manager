import { useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'

import { DeleteIcon, EditIcon } from '../../../components/icons/Icons'
import { Button } from '../../../components/button/Button'
import { Loader } from '../../../components/loader-page/Loader'
import { ConfirmModal } from '../../../components/confirm-modal/ConfirmModal'

import { ModalIds } from '../../../constants/modalIds'
import { IEvent } from '../../../types/event'

import { useCalendar } from '../../hooks/useCalendar'
import { useModalActions } from '../../../store/hooks/useModalActions'
import { useEventActions } from '../../../store/hooks/useEventActions'
import { useCalendarActions } from '../../../store/hooks/useCalendarActions'

import './CalendarEvents.css'

export const CalendarEvents = () => {
  const navigate = useNavigate()
  const { isOpen, open, close } = useModalActions(ModalIds.Confirm)
  const { activeCalendarDay } = useCalendarActions()
  const {
    fetching,
    updating,
    deleting,
    activeEvent,
    setActiveEvent,
    clearActiveEvent,
    deleteEvent,
  } = useEventActions()
  const { eventsForSelectedDay, activeCalendarDayDate, activeCalendarDayName } = useCalendar()

  const handleClickDeleteEvent = (id: string) => {
    setActiveEvent(id)
    open()
  }

  const handleConfirmDelete = async () => {
    if (!activeEvent) return
    await deleteEvent(activeEvent.id)
    clearActiveEvent()
    close()
  }

  const handleClickEditEvent = (event: IEvent) => {
    const taskId = event.taskId
    if (!taskId) return
    navigate(`/home/task-form/${taskId}?editEvent=${event.id}`, { replace: true })
  }

  if (fetching) return <Loader />

  return (
    <>
      <aside className="calendar-events">
        {activeCalendarDay ? (
          <>
            <header className="calendar-events__info">
              <span className="calendar-events__day">{activeCalendarDayName}</span>
              <span className="calendar-events__date">{activeCalendarDayDate}</span>
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
                        <span className="calendar-events__item-time">
                          {dayjs(event.start).format('HH:mm')} - {dayjs(event.end).format('HH:mm')}
                          &nbsp;hs
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="text"
                        className="calendar-events__item-delete-btn"
                        onClick={() => handleClickDeleteEvent(id)}
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
    </>
  )
}
