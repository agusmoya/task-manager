import clsx from 'clsx'

import { Button } from '../../../components/button/Button'
import { ArrowRightIcon, PhoneIcon } from '../../../components/icons/Icons'
import { EventSegment } from '../schedule/type-ui/event-ui'

import './ScheduleEvent.css'
import { CollaboratorAvatars } from '../../../components/collaborators-avatars/CollaboratorAvatars'
import { IUser } from '../../../types/user'

interface Prop {
  initialLocation: number
  rowHeight: number
  labelHeight: number
  segment: EventSegment
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
  const { title, notes, start, isStartSegment, isEndSegment, duration } = segment

  const offsetHours = start.hour() + start.minute() / 60 - initialLocation
  const top = offsetHours * rowHeight + labelHeight / 2
  const height = duration * rowHeight

  const collaborators: IUser[] = []

  return (
    <article
      className={clsx(
        'schedule__event',
        isStartSegment && 'schedule__event--start',
        isEndSegment && 'schedule__event--end'
      )}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        animationDelay: `${index * 60}ms`,
      }}
    >
      <h3>{title}</h3>
      <h4>{notes}</h4>
      <div className="schedule__event-collaborators">
        <CollaboratorAvatars users={collaborators} />
        <Button variant="filled" className="schedule__icon-btn">
          <PhoneIcon className="schedule__icon" />
        </Button>
      </div>
      {isStartSegment && (
        <Button variant="text" className="schedule__follow-event-btn" onClick={requestNextDay}>
          <span className="schedule__next-text">Follow event</span>
          <ArrowRightIcon className="schedule__follow-event-icon" />
        </Button>
      )}
    </article>
  )
}
