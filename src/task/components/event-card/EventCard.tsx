import { Button } from '../../../components/button/button'
import { DeleteIcon, EditIcon, SeparatorIcon } from '../../../components/icons/Icons'

import { type CalendarEvent } from '../../../types/calendar-event.d'

import { useEventActions } from '../../../store/hooks/useEventActions'
import { useModalActions } from '../../../store/hooks/useModalActions'

import './EventCard.css'

interface Props {
  event: CalendarEvent
}

export const EventCard = ({ event }: Props) => {
  const { title, startDate, endDate, notes } = event

  const { openModal } = useModalActions()
  const { deleteEventByTaskState, setActiveEvent } = useEventActions()

  const formattedStart = new Date(startDate).toLocaleString()
  const formattedEnd = new Date(endDate).toLocaleString()

  const handleClickDeleteEvent = (event: CalendarEvent) => {
    deleteEventByTaskState(event)
  }

  const handleClickEditEvent = (event: CalendarEvent) => {
    setActiveEvent({ ...event })
    openModal()
  }

  return (
    <article className="event-card" aria-label={`Event: ${title || 'no title'}`}>
      <div className="event-card__actions">
        <Button
          aria-label="Edit event"
          type="button"
          className="btn btn--filled event-card__btn event-card__btn--edit"
          onClick={() => handleClickEditEvent(event)}
        >
          <EditIcon />
        </Button>
        <Button
          aria-label="Delete event"
          type="button"
          className="btn btn--filled event-card__btn event-card__btn--delete"
          onClick={() => handleClickDeleteEvent(event)}
        >
          <DeleteIcon />
        </Button>
      </div>
      <header className="event-card__header">
        <span className="event-card__title">{title || 'No title'}</span>
      </header>
      <div className="event-card__content">
        <time className="event-card__time">
          {formattedStart} <SeparatorIcon size={20} /> {formattedEnd}
        </time>
        {notes && <p className="event-card__notes">{notes}</p>}
        <div className="collaborators">Collaborators:</div>
      </div>
    </article>
  )
}
