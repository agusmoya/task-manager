import { useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'

import { DeleteIcon, EditIcon } from '../../../components/icons/Icons'
import { Button } from '../../../components/button/Button'
import { Loader } from '../../../components/loader-page/Loader'
import { ConfirmModal } from '../../../components/confirm-modal/ConfirmModal'

import { ModalIds } from '../../../constants/modalIds'
import { EVENT_STATUS, IEvent } from '../../../types/event'

import { useCalendar } from '../../hooks/useCalendar'
import { useModalActions } from '../../../store/hooks/useModalActions'
import { useEventActions } from '../../../store/hooks/useEventActions'
import { useCalendarActions } from '../../../store/hooks/useCalendarActions'

import './CalendarEvents.css'
import clsx from 'clsx'

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
  const { eventsForSelectedDay, activeCalendarDayName, fullDateLabel } = useCalendar()

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
            <header className="calendar-events__header">
              <span className="calendar-events__header-day">{activeCalendarDayName}</span>
              <span className="calendar-events__header-date">{fullDateLabel}</span>
            </header>
            <section className="calendar-events__list">
              {eventsForSelectedDay.length > 0 ? (
                eventsForSelectedDay.map(event => {
                  const { id, title, status } = event
                  return (
                    <article
                      key={id}
                      className={clsx(
                        'calendar-event',
                        status === EVENT_STATUS.COMPLETED && 'calendar-event--disabled'
                      )}
                    >
                      <Button
                        variant="icon"
                        className="calendar-event__button calendar-event__button--edit"
                        onClick={() => handleClickEditEvent(event)}
                        disabled={updating}
                      >
                        <EditIcon />
                      </Button>
                      <div className="calendar-event__info">
                        <p className="calendar-event__title">{title}</p>
                        {status === EVENT_STATUS.COMPLETED && (
                          <p className="calendar-event__status">{EVENT_STATUS.COMPLETED}</p>
                        )}
                        <span className="calendar-event__time">
                          {`${dayjs(event.start).format('HH:mm')} hs - ${dayjs(event.end).format('HH:mm')} hs`}
                        </span>
                      </div>
                      <Button
                        variant="icon"
                        className="calendar-event__button calendar-event__button--delete"
                        onClick={() => handleClickDeleteEvent(id)}
                        disabled={deleting}
                      >
                        <DeleteIcon />
                      </Button>
                    </article>
                  )
                })
              ) : (
                <span className="calendar-events__list-empty">No events</span>
              )}
            </section>
          </>
        ) : (
          <span className="calendar-events__empty">No day selected</span>
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
