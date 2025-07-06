import { useRef } from 'react'

import { ScheduleEvent } from '../schedule-event/ScheduleEvent'

import { EventSegment } from '../../../types/event'

import { useRowHeight } from './hooks/useRowHeight'
import { getHoursSchedule } from '../../../utils/computedEvents'

import './Schedule.css'

interface Props {
  segmentsForDay: EventSegment[]
  onRequestNextDay: () => void
}

export const Schedule = ({ segmentsForDay, onRequestNextDay }: Props) => {
  const timescaleRef = useRef<HTMLElement>(null)
  const { rowHeight, labelHeight } = useRowHeight(timescaleRef)
  const visualRowHeight = rowHeight
  const hoursSchedule = getHoursSchedule(segmentsForDay)
  const initialLocation = hoursSchedule[0] ?? 0

  const transitionKey =
    segmentsForDay
      .map(seg => `${seg.id}-${seg.isStartSegment ? 'S' : ''}${seg.isEndSegment ? 'E' : ''}`)
      .join('|') || 'no-events'

  return (
    <section className={`schedule section container`}>
      <aside className="schedule__timescale" ref={timescaleRef} aria-hidden="true">
        {hoursSchedule.map(h => (
          <small key={h}>{`${h}:00`}</small>
        ))}
      </aside>
      <div
        key={transitionKey}
        className="schedule__event-list schedule__event-list--animate"
        role="list"
      >
        {segmentsForDay.length === 0 && (
          <div className="schedule__no-events">No events scheduled</div>
        )}
        {segmentsForDay.map((segment, index) => {
          return (
            <ScheduleEvent
              key={`${segment.id}-${segment.isStartSegment}`}
              segment={segment}
              index={index}
              initialLocation={initialLocation}
              rowHeight={visualRowHeight}
              labelHeight={labelHeight}
              requestNextDay={onRequestNextDay}
            />
          )
        })}
      </div>
    </section>
  )
}
