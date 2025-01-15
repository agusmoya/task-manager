import { type Dayjs } from "dayjs";
import { ButtonCalendar } from "../button-calendar/ButtonCalendar";

import { Clock } from "../Clock/Clock";

import './DateInfo.css'

interface Props {
  taskId: string;
  today: Dayjs;
}

export const DateInfo = ({ taskId, today }: Props) => {
  const currentDate = today.format('dddd, DD/MM/YYYY');

  return (
    <section className="date-info section container">
      <div className="date-info__time">
        <time className="curren-date">{currentDate}</time>
        <Clock today={today} />
        <h2 className="date-info__title">
          <p>Task ID: {taskId}</p>
        </h2>
        <small className="date-info__today-tasks">
          10 tasks today
        </small>
      </div>
      <ButtonCalendar />
    </section>
  );
}