import { useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'

import { Clock } from '../clock/Clock'
import { ArrowRightIcon, CalendarIcon } from '../../../components/icons/Icons'
import { Button } from '../../../components/button/Button'
import { ConfirmModal } from '../../../components/confirm-modal/ConfirmModal'
import { ButtonLink } from '../../../components/button-link/ButtonLink'
import { Chip } from '../../../components/chip/Chip'
import { CollaboratorAvatars } from '../../../components/collaborators-avatars/CollaboratorAvatars'
import { LinearProgress } from '../../../components/linear-progress/LinearProgress'

import { ModalIds } from '../../../constants/modalIds'

import { ITask, TASK_STATUS } from '../../../types/task'
import { EVENT_STATUS } from '../../../types/event'

import { useTaskActions } from '../../../store/hooks/useTaskActions'
import { useModalActions } from '../../../store/hooks/useModalActions'

import './TaskInfo.css'

interface Props {
  task: ITask
}

export const TaskInfo = ({ task }: Props) => {
  const navigate = useNavigate()
  const { isOpen, open, close } = useModalActions(ModalIds.Confirm)
  const { deleting, deleteTask } = useTaskActions()
  const {
    id,
    title,
    status,
    category,
    events,
    participants,
    beginningDate,
    completionDate,
    progress,
    totalHours,
  } = task

  const totalEvents = events?.length ?? 0
  const completeEvents = events?.filter(e => e.status === EVENT_STATUS.COMPLETED).length ?? 0
  const eventProgresTask = `${completeEvents}/${totalEvents}`

  const colorChip =
    status === TASK_STATUS.COMPLETED
      ? 'completed'
      : status === TASK_STATUS.PROGRESS
        ? 'progress'
        : 'pending'

  const handleConfirmDelete = async () => {
    const result = await deleteTask(id)
    if (!result?.error) {
      close()
      navigate('/home', { replace: true })
    }
  }

  return (
    <section className="task-info section container">
      <div className="task-info__header">
        <div className="task-info__title-block">
          <h2 className="task-info__title">{title}</h2>
          <div className="task-info__meta">
            <Chip label={category?.name} variant="outlined" role="category" />
            <Chip label={status} color={colorChip} role="status" />
            <span className="task-info__dates">
              {dayjs(beginningDate).format('DD MMM')}
              <ArrowRightIcon className="task-info__date-separator" />
              {dayjs(completionDate).format('DD MMM')}
            </span>
            <span>Duration: {`${totalHours} h`}</span>
            <div className="task-info__progress-group">
              <LinearProgress showLabel value={progress} />
              <small className="task-info__event-count">({eventProgresTask}) events done.</small>
            </div>
          </div>
        </div>
        <Clock />
      </div>

      <div className="task-info__participants">
        <CollaboratorAvatars users={participants} />
      </div>

      <div className="task-info__actions">
        <ButtonLink variant="tonal" className="task-info__calendar-btn" to="/home/calendar">
          <CalendarIcon className="task-info__calendar-icon" />
        </ButtonLink>

        <ButtonLink variant="filled" className="task-info__edit-btn" to={`/home/task-form/${id}`}>
          Edit task
        </ButtonLink>

        <Button
          variant="outlined"
          className="task-info__delete-btn"
          onClick={() => open()}
          disabled={deleting}
        >
          Delete task
        </Button>
      </div>
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          title="Delete Task"
          message="Are you sure you want to delete this task?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => close()}
        />
      )}
    </section>
  )
}
