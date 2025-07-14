import clsx from 'clsx'

import { Button } from '../../../components/button/Button'
import { ArrowRightIcon, CheckIcon, PhoneIcon } from '../../../components/icons/Icons'
import { CollaboratorAvatars } from '../../../components/collaborators-avatars/CollaboratorAvatars'

import { EVENT_STATUS, IEventSegment } from '../../../types/event'

import { useEventActions } from '../../../store/hooks/useEventActions'

import './ScheduleEvent.css'

interface Prop {
  initialLocation: number
  rowHeight: number
  labelHeight: number
  segment: IEventSegment
  index: number
  requestNextDay: () => void
}

export const ScheduleEvent = ({
  initialLocation,
  rowHeight,
  labelHeight,
  segment,
  index,
  requestNextDay,
}: Prop) => {
  const {
    id,
    title,
    status,
    notes,
    start,
    isStartSegment,
    isEndSegment,
    duration,
    collaborators = [],
  } = segment
  const offsetHours = start.hour() + start.minute() / 60 - initialLocation
  const top = offsetHours * rowHeight + labelHeight / 2
  const height = duration * rowHeight
  const { updateEventStatus, updating } = useEventActions()

  const handleToggle = () => {
    const next = status === EVENT_STATUS.PENDING ? EVENT_STATUS.COMPLETED : EVENT_STATUS.PENDING
    updateEventStatus({ id, status: next })
  }

  return (
    <article
      className={clsx(
        'schedule-event',
        isStartSegment && 'schedule-event--start',
        isEndSegment && 'schedule-event--end',
        status === EVENT_STATUS.COMPLETED && 'schedule-event--completed'
      )}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        animationDelay: `${index * 60}ms`,
      }}
      role="listitem"
    >
      <header className="schedule-event__header">
        <h3 className="schedule-event__title">
          <span className="schedule-event__title-text">{title}</span>&nbsp;
          {status === EVENT_STATUS.COMPLETED && (
            <small className="schedule-event__text-completed">(done)</small>
          )}
        </h3>
        <Button
          className={clsx(
            'schedule-event__status-btn',
            status === EVENT_STATUS.COMPLETED && 'schedule-event__status-btn--completed'
          )}
          onClick={handleToggle}
          disabled={updating}
        >
          <CheckIcon className="schedule-event__status-icon" />
        </Button>
      </header>
      <div className="schedule-event__body">
        <h4>{notes}</h4>
        <div className="schedule-event__collaborators">
          <CollaboratorAvatars users={collaborators ?? []} />
          <Button variant="filled" className="schedule-event__phone-btn">
            <PhoneIcon className="schedule-event__phone-icon" />
          </Button>
        </div>
        {isStartSegment && (
          <Button className="schedule-event__follow-btn" onClick={requestNextDay}>
            <span className="schedule-event__next-text">Follow event&nbsp;</span>
            <ArrowRightIcon className="schedule-event__follow-icon" />
          </Button>
        )}
      </div>
    </article>
  )
}
