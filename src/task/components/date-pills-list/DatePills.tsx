import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

import { DatePill } from '../date-pill/DatePill'

import { EventSegment } from '../../../types/event'

import './DatePills.css'
import { Button } from '../../../components/button/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '../../../components/icons/Icons'

interface Props {
  eventSegments: EventSegment[]
  selectedDate: Dayjs
  onSelectDate: Dispatch<SetStateAction<Dayjs>>
}

export const DatePills = ({ eventSegments, selectedDate, onSelectDate }: Props) => {
  const [weekStart, setWeekStart] = useState<Dayjs>(() => selectedDate.startOf('week'))

  const daysWithEvents = useMemo(() => {
    const set = new Set<string>()
    eventSegments.forEach(seg => {
      set.add(seg.start.startOf('day').toISOString())
      set.add(seg.end.startOf('day').toISOString())
    })
    return set
  }, [eventSegments])

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day')),
    [weekStart]
  )

  const handlePrevWeek = () => {
    const newStart = weekStart.subtract(1, 'week')
    setWeekStart(newStart)
    onSelectDate(newStart)
  }

  const handleNextWeek = () => {
    const newStart = weekStart.add(1, 'week')
    setWeekStart(newStart)
    onSelectDate(newStart)
  }

  const handleResetCurrentWeek = () => {
    setWeekStart(dayjs().startOf('week'))
    onSelectDate(dayjs())
  }

  return (
    <section className="date-pills-nav section container">
      <div className="date-pills-actions">
        <Button className="date-pills-nav__btn" onClick={handlePrevWeek} aria-label="Previous week">
          <ArrowLeftIcon className="date-pills-nav__icon" />
        </Button>
        <Button
          variant="text"
          className="date-pills-nav__btn"
          onClick={handleResetCurrentWeek}
          aria-label="Current week"
        >
          Current week
        </Button>
        <Button className="date-pills-nav__btn" onClick={handleNextWeek} aria-label="Next week">
          <ArrowRightIcon className="date-pills-nav__icon" />
        </Button>
      </div>
      <div className="date-pills">
        {weekDays.map(date => {
          const isToday = date.isSame(dayjs(), 'day')
          const isSelected = date.isSame(selectedDate, 'day')
          const isoKey = date.startOf('day').toISOString()
          const hasEvents = daysWithEvents.has(isoKey)

          return (
            <DatePill
              key={date.toString()}
              date={date}
              isToday={isToday}
              isSelected={isSelected}
              onSelect={onSelectDate}
              hasEvents={hasEvents}
            />
          )
        })}
      </div>
    </section>
  )
}
