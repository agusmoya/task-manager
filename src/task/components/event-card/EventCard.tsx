import dayjs from 'dayjs'
import { Button } from '../../../components/button/Button'
import { DeleteIcon, EditIcon, SeparatorIcon } from '../../../components/icons/Icons'

import { IEventLocal } from '../../../types/event'

import './EventCard.css'

interface Props {
  event: IEventLocal
  onEdit: (evt: IEventLocal) => void
  onDelete: (evtId: string) => void
}

export const EventCard = ({ event, onEdit, onDelete }: Props) => {
  const { id, title, start, end, notes } = event

  const formattedStart = dayjs(start).format('YYYY-MM-DD HH:mm') + ' hs'
  const formattedEnd = dayjs(end).format('YYYY-MM-DD HH:mm') + ' hs'

  return (
    <article className="event-card" aria-label={`Event: ${title}`}>
      <div className="event-card__actions">
        <Button
          aria-label="Edit event"
          variant="filled"
          className="event-card__btn event-card__btn--edit"
          onClick={() => onEdit({ ...event })}
        >
          <EditIcon />
        </Button>
        <Button
          aria-label="Delete event"
          variant="filled"
          className="event-card__btn event-card__btn--delete"
          onClick={() => onDelete(id)}
        >
          <DeleteIcon />
        </Button>
      </div>
      <header className="event-card__header">
        <span className="event-card__title">{title}</span>
      </header>
      <div className="event-card__content">
        <time className="event-card__time">
          <span>{formattedStart}</span>
          <SeparatorIcon size={20} />
          <span>{formattedEnd}</span>
        </time>
        {notes && <p className="event-card__notes">{notes}</p>}
      </div>
    </article>
  )
}
