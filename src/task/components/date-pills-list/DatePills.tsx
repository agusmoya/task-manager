import { Dispatch, SetStateAction } from 'react'
import { Dayjs } from 'dayjs'

import { DatePill } from '../date-pill/DatePill'

import { useCurrentWeek } from '../../hooks/useCurrentWeek'

import './DatePills.css'

interface Props {
  selectedDate: Dayjs
  onSelectDate: Dispatch<SetStateAction<Dayjs>>
}

export const DatePills = ({ selectedDate, onSelectDate }: Props) => {
  const { currentWeek } = useCurrentWeek()

  return (
    <section className="date-pills section container">
      {currentWeek.map(({ date, isToday }) => (
        <DatePill
          key={date.toString()}
          date={date}
          isToday={isToday}
          isSelected={date.isSame(selectedDate, 'day')}
          onSelect={onSelectDate}
        />
      ))}
    </section>
  )
}
