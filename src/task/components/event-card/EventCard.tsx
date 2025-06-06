import { Button } from '../../../components/button/button'
import { DeleteIcon, EditIcon, SeparatorIcon } from '../../../components/icons/Icons'

import { IEventLocal } from '../../../types/event'

import './EventCard.css'

interface Props {
  event: IEventLocal
  onEdit: (evt: IEventLocal) => void
  onDelete: (evtId: string) => void
}

export const EventCard = ({ event, onEdit, onDelete }: Props) => {
  const { title, start, end, notes } = event
  const formattedStart = new Date(start).toLocaleString()
  const formattedEnd = new Date(end).toLocaleString()

  return (
    <article className="event-card" aria-label={`Event: ${title || 'no title'}`}>
      <div className="event-card__actions">
        <Button
          aria-label="Edit event"
          type="button"
          className="btn btn--filled event-card__btn event-card__btn--edit"
          onClick={() => onEdit({ ...event })}
        >
          <EditIcon />
        </Button>
        <Button
          aria-label="Delete event"
          type="button"
          className="btn btn--filled event-card__btn event-card__btn--delete"
          onClick={() => onDelete(event.id!)}
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
      </div>
    </article>
  )
}
