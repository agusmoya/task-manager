import { DatePill } from '../date-pill/DatePill.tsx';

import { type WeekDay } from '../../../types/types.d';

import './DatePills.css'

interface Props {
  weekDays: WeekDay[];
}

export const DatePills = ({ weekDays }: Props) => {

  return (
    <section className="date-pills section container">
      {
        weekDays.map(
          ({ date, isToday }) =>
            <DatePill key={date} date={date} isToday={isToday} />
        )
      }
    </section>
  )
}