import clsx from 'clsx'
import dayjs from 'dayjs'

import { EVENT_STATUS, IEvent } from '../../types/event'
import { Button } from '../../components/button/Button'
import { useEventActions } from '../../store/hooks/useEventActions'
import { CheckIcon, DeleteIcon, EditIcon } from '../../components/icons/Icons'

import './EventTimelineItem.css'

interface Props {
  event: IEvent
  onEditEvent: (event: IEvent) => void
  onDeleteEvent: (id: string) => void
}

export const EventTimelineItem = ({ event, onEditEvent, onDeleteEvent }: Props) => {
  const { id, status, title } = event
  const { updating, deleting } = useEventActions()

  return (
    <li
      className={clsx(
        'event-timeline',
        status === EVENT_STATUS.COMPLETED && 'event-timeline--disabled'
      )}
    >
      <Button
        variant="icon"
        className="event-timeline__btn event-timeline__btn--edit"
        onClick={() => onEditEvent(event)}
        disabled={updating}
        aria-label={`Edit event: ${title}`}
      >
        <EditIcon />
      </Button>
      <span
        className={clsx(
          'event-timeline__marker',
          status === EVENT_STATUS.COMPLETED && 'event-timeline__marker--completed'
        )}
      >
        {status === EVENT_STATUS.COMPLETED && <CheckIcon className="event-timeline__icon" />}
      </span>

      <div className="event-timeline__content">
        <p className="event-timeline__title">{title}</p>
        <span className="event-timeline__time">
          {`${dayjs(event.start).format('HH:mm')} hs - ${dayjs(event.end).format('HH:mm')} hs`}
        </span>
      </div>
      <Button
        variant="icon"
        className="event-timeline__btn event-timeline__btn--delete"
        onClick={() => onDeleteEvent(id)}
        disabled={deleting}
        aria-label={`Delete event: ${title}`}
      >
        <DeleteIcon />
      </Button>
    </li>
  )
}
