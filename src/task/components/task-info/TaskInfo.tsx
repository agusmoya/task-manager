import { Link } from 'react-router-dom'

import dayjs from 'dayjs'

import { Clock } from '../clock/Clock'
import { CalendarIcon } from '../../../components/icons/Icons'

import { type ITask } from '../../../types/task'

import { getToday } from '../../../calendar/utils/dateUtils'

import './TaskInfo.css'

interface Props {
  task: ITask
}

export const TaskInfo = ({ task }: Props) => {
  const today = dayjs(getToday())
  const { id, title } = task

  return (
    <section className="task-info section container">
      <div className="task-info__time">
        <Clock today={today} />
        <h2 className="task-info__title">
          <p>Task: {title}</p>
        </h2>
      </div>
      <div className="task-info__actions">
        <Link className="btn btn--tonal see-calendar" to="/home/calendar">
          <CalendarIcon />
          &nbsp;Calendar
        </Link>

        <Link className="btn btn--filled edit__task-btn" to={`/home/task-form/${id}`}>
          Edit
        </Link>

        <Link className="btn btn--outlined delete__task-btn" to="/home/calendar">
          Delete
        </Link>
      </div>
    </section>
  )
}
