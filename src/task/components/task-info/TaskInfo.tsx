import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'

import { Clock } from '../clock/Clock'
import { CalendarIcon } from '../../../components/icons/Icons'
import { Button } from '../../../components/button/button'
import { ConfirmModal } from '../../../components/confirm-modal/ConfirmModal'

import { type ITask } from '../../../types/task'

import { getToday } from '../../../calendar/utils/dateUtils'
import { useTaskActions } from '../../../store/hooks/useTaskActions'

import './TaskInfo.css'

interface Props {
  task: ITask
}

export const TaskInfo = ({ task }: Props) => {
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const { deleteTask } = useTaskActions()

  const today = dayjs(getToday())
  const { id, title } = task

  const handleConfirmDelete = () => {
    deleteTask(task.id)
    setIsConfirmOpen(false)
    navigate('/home')
  }

  return (
    <section className="task-info section container">
      <div className="task-info__time">
        <Clock today={today} />
        <h2 className="task-info__title">Task: {title}</h2>
      </div>

      <div className="task-info__actions">
        <Link className="btn btn--tonal see-calendar" to="/home/calendar">
          <CalendarIcon />
          &nbsp;Calendar
        </Link>

        <Link className="btn btn--filled edit__task-btn" to={`/home/task-form/${id}`}>
          Edit
        </Link>

        <Button
          className="btn btn--outlined delete__task-btn"
          onClick={() => setIsConfirmOpen(true)}
        >
          Delete
        </Button>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </section>
  )
}
