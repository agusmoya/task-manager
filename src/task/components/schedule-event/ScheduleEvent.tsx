import { Button } from '../../../components/button/Button'
import { NextIcon, PhoneIcon } from '../../../components/icons/Icons'
import { EventSegment } from '../schedule/type-ui/event-ui'

import './ScheduleEvent.css'

const userImages = [
  '/images/members/user-2.webp',
  '/images/members/user-7.webp',
  '/images/members/user-4.webp',
]

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

  return (
    <article
      className={[
        'schedule__event',
        isStartSegment && 'schedule__event--start',
        isEndSegment && 'schedule__event--end',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        animationDelay: `${index * 60}ms`,
      }}
    >
      <h3>{title}</h3>
      <h4>{notes}</h4>
      <div className="schedule__event-collaborators">
        <div className="schedule__avatars">
          {userImages.slice(0, 3).map((img, index) => (
            <img
              src={`${img}`}
              className="schedule__avatar"
              key={index}
              alt={`User ${index + 1}`}
            />
          ))}
          <span className="schedule__avatar schedule__avatar--more">+1</span>
        </div>
        <Button type="button" className="btn btn--filled schedule__icon-btn">
          <PhoneIcon className="schedule__icon" />
        </Button>
      </div>
      {isStartSegment && (
        <Button type="button" className="btn schedule__follow-event-btn" onClick={requestNextDay}>
          <span className="schedule__next-text">Follow event</span>
          <NextIcon className="schedule__follow-event-icon" />
        </Button>
      )}
    </article>
  )
}
