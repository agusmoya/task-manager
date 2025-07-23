import dayjs from 'dayjs'

import { ButtonLink } from '../../../components/button-link/ButtonLink'
import { ExternalLinkIcon, CalendarIcon } from '../../../components/icons/Icons'
import { CircularProgress } from '../circular-progress/CircularProgress'
import { CollaboratorAvatars } from '../../../components/collaborators-avatars/CollaboratorAvatars'

import { ITask } from '../../../types/task'

import './OngoingTask.css'

export interface Props {
  task: ITask
}

export const OngoingTask = ({ task }: Props) => {
  const { id, title, totalHours, beginningDate, completionDate, progress, participants } = task

  const formattedBeginningDate = dayjs(beginningDate).format('DD MMM')
  const formattedCompletionDate = dayjs(completionDate).format('DD MMM')

  return (
    <li className="ongoing-task" key={id}>
      <header className="ongoing-task__header">
        <ButtonLink variant="text" to={`task/${id}`}>
          <h3 className="ongoing-task__title">
            {title}&nbsp;
            <ExternalLinkIcon size={20} />
          </h3>
        </ButtonLink>
        <CircularProgress progress={progress} />
      </header>
      {participants.length > 0 && (
        <section className="ongoing-task__body">
          <small className="ongoing-task__collaborators">Collaborators</small>
          <CollaboratorAvatars users={participants} />
        </section>
      )}
      <footer className="ongoing-task__footer">
        <small className="ongoing-task__schedule">
          <CalendarIcon className="ongoing-task__calendar-icon" size={20} />
          &nbsp;{`${formattedBeginningDate} - ${formattedCompletionDate}`}
        </small>
        <small className="ongoing-task__duration">{`${totalHours} h`}</small>
      </footer>
    </li>
  )
}
