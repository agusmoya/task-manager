import { useRef } from 'react'

import { EventSegment } from './type-ui/event-ui'

import { NextIcon, PhoneIcon } from '../../../components/icons/Icons'
import { Button } from '../../../components/button/Button'

import { useRowHeight } from './hooks/useRowHeight'
import { getHoursSchedule } from '../../../utils/computedEvents'

import './Schedule.css'

const userImages = [
  '/images/members/user-2.webp',
  '/images/members/user-7.webp',
  '/images/members/user-4.webp',
]

interface Props {
  segmentsForDay: EventSegment[]
  onRequestNextDay: () => void
}

export const Schedule = ({ segmentsForDay, onRequestNextDay }: Props) => {
  const tiemscaleRef = useRef<HTMLElement>(null)
  const rowHeight = useRowHeight(tiemscaleRef)
  const hoursSchedule = getHoursSchedule(segmentsForDay)

  return (
    <section className="schedule section container">
      <aside className="schedule__timescale" ref={tiemscaleRef}>
        {hoursSchedule.map(h => (
          <small key={h}>{`${h}:00`}</small>
        ))}
      </aside>
      <div className="schedule__event-list">
        {segmentsForDay.length === 0 && (
          <div className="schedule__no-events">No events scheduled</div>
        )}
        {segmentsForDay.map(
          ({ event: { id, title, notes }, start, duration, isStartSegment, isEndSegment }) => {
            const offsetHours = start.hour() - hoursSchedule[0]
            const offsetMinutes = start.minute() / 60
            const topRem = Math.round((offsetHours + offsetMinutes) * rowHeight * 2) / 2

            return (
              <article
                key={`${id}-${isStartSegment}`}
                className={[
                  'schedule__event',
                  isStartSegment && 'schedule__event--start',
                  isEndSegment && 'schedule__event--end',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  top: `${topRem}rem`,
                  height: `${Math.round(duration * rowHeight * 2) / 2}rem`,
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
                  <Button
                    type="button"
                    className="btn schedule__follow-event-btn"
                    onClick={onRequestNextDay}
                  >
                    <span className="schedule__next-text">Follow event</span>
                    <NextIcon className="schedule__follow-event-icon" />
                  </Button>
                )}
              </article>
            )
          }
        )}
      </div>
    </section>
  )
}
