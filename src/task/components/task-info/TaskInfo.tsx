import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'

import { Clock } from '../clock/Clock'
import { ArrowRightIcon, CalendarIcon } from '../../../components/icons/Icons'
import { Button } from '../../../components/button/Button'
import { ConfirmModal } from '../../../components/confirm-modal/ConfirmModal'
import { ButtonLink } from '../../../components/button-link/ButtonLink'
import { Chip } from '../../../components/chip/Chip'
import { CollaboratorAvatars } from '../../../components/collaborators-avatars/CollaboratorAvatars'

import { ITask, TASK_STATUS } from '../../../types/task.d'

import { getToday } from '../../../calendar/utils/dateUtils'
import { useTaskActions } from '../../../store/hooks/useTaskActions'

import './TaskInfo.css'
import { LinearProgress } from '../../../components/linear-progress/LinearProgress'

interface Props {
  task: ITask
}

export const TaskInfo = ({ task }: Props) => {
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const { deleting, deleteTask } = useTaskActions()
  const today = dayjs(getToday())
  const { id, title, status, category, participants, beginningDate, completionDate, progress } =
    task

  const chipColor =
    status === TASK_STATUS.COMPLETED
      ? 'success'
      : status === TASK_STATUS.PROGRESS
        ? 'info'
        : status === TASK_STATUS.PENDING
          ? 'warning'
          : 'default'

  const handleConfirmDelete = async () => {
    const result = await deleteTask(id)
    if (!result?.error) {
      setIsConfirmOpen(false)
      navigate('/home', { replace: true })
    }
  }

  return (
    <section className="task-info section container">
      <div className="task-info__header">
        <div className="task-info__title-block">
          <h2 className="task-info__title">{title}</h2>
          <div className="task-info__meta">
            <span className="task-info__category">{category?.name}</span>
            <Chip label={status} color={chipColor} />
            <div className="task-info__progress" style={{ width: '10rem' }}>
              <LinearProgress showLabel value={progress} />
            </div>
            <span className="task-info__dates">
              {dayjs(beginningDate).format('DD MMM')}
              <ArrowRightIcon size={15} />
              {dayjs(completionDate).format('DD MMM')}
            </span>
          </div>
        </div>
        <Clock today={today} />
      </div>

      <div className="task-info__participants">
        <CollaboratorAvatars users={participants} />
      </div>

      <div className="task-info__actions">
        <ButtonLink variant="tonal" className="task-info__calendar-btn" to="/home/calendar">
          <CalendarIcon className="task-info__calendar-icon" />
        </ButtonLink>

        <ButtonLink variant="filled" className="task-info__edit-btn" to={`/home/task-form/${id}`}>
          Edit
        </ButtonLink>

        <Button
          variant="outlined"
          className="task-info__delete-btn"
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
