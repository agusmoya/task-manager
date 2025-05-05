import { Link } from "react-router-dom"

import { type Dayjs } from "dayjs"

import { Clock } from "../clock/Clock.tsx"
import { CalendarIcon } from "../../../components/icons/Icons.tsx"

import { type Task } from "../../../types/task.d"


import './DateInfo.css'


interface Props {
  task: Task,
  today: Dayjs
}

export const DateInfo = ({ task, today }: Props) => {

  return (
    <section className="date-info section container">
      <div className="date-info__time">
        <Clock today={today} />
        <h2 className="date-info__title">
          <p>Task ID: {task.id}</p>
        </h2>
        <small className="date-info__today-tasks">
          5 task(s) today
        </small>
      </div>
      <div>
        <Link to='/calendar'>
          <CalendarIcon />
        </Link>
      </div>
    </section>
  )
}
