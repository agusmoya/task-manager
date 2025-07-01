import { Dispatch, SetStateAction } from 'react'
import { Dayjs } from 'dayjs'

import { DatePill } from '../date-pill/DatePill'

import { EventSegment } from '../../../types/event'

import { useCurrentWeek } from '../../hooks/useCurrentWeek'

import './DatePills.css'

interface Props {
  eventSegments: EventSegment[]
  selectedDate: Dayjs
  onSelectDate: Dispatch<SetStateAction<Dayjs>>
}

export const DatePills = ({ eventSegments, selectedDate, onSelectDate }: Props) => {
  const { currentWeek } = useCurrentWeek()

  const days = new Set<number>()
  eventSegments.forEach(seg => {
    const startDay = seg.start.startOf('day')
    const endDay = seg.end.startOf('day')
    days.add(startDay.date())
    days.add(endDay.date())
  })

  return (
    <section className="date-pills section container">
      {currentWeek.map(({ date, isToday }) => {
        const hasEvents = Array.from(days).some(d => d === date.date())

        return (
          <DatePill
            key={date.toString()}
            date={date}
            isToday={isToday}
            isSelected={date.isSame(selectedDate, 'day')}
            onSelect={onSelectDate}
            hasEvents={hasEvents}
          />
        )
      })}
    </section>
  )
}
