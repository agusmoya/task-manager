import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'

import { Clock } from '../clock/Clock'
import { CalendarIcon } from '../../../components/icons/Icons'
import { Button } from '../../../components/button/Button'
import { ConfirmModal } from '../../../components/confirm-modal/ConfirmModal'

import { ITask } from '../../../types/task'

import { getToday } from '../../../calendar/utils/dateUtils'
import { useTaskActions } from '../../../store/hooks/useTaskActions'

import './TaskInfo.css'

interface Props {
  task: ITask
}

export const TaskInfo = ({ task }: Props) => {
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const { deleting, deleteTask } = useTaskActions()

  const today = dayjs(getToday())
  const { id, title } = task

  const handleConfirmDelete = async () => {
    const result = await deleteTask(id)
    if (!result?.error) {
      setIsConfirmOpen(false)
      navigate('/home', { replace: true })
    }
  }

  return (
    <section className="task-info section container">
      <div className="task-info__time">
        <Clock today={today} />
        <h2 className="task-info__title">{title}</h2>
      </div>

      <div className="task-info__actions">
        <Link className="btn btn--tonal task-info__calendar-btn" to="/home/calendar">
          <CalendarIcon className="task-info__calendar-icon" />
        </Link>

        <Link className="btn btn--filled task-info__edit-btn" to={`/home/task-form/${id}`}>
          Edit
        </Link>

        <Button
          className="btn btn--outlined task-info__delete-btn"
          onClick={() => setIsConfirmOpen(true)}
          disabled={deleting}
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
