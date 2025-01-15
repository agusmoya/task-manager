import { DatePill } from '../date-pill/DatePill';


import './DatePills.css'
import { WeekDay } from '../../../types/types';

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
  );
}