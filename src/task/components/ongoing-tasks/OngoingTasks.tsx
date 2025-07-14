import clsx from 'clsx'

import { ExternalLinkIcon } from '../../../components/icons/Icons'
import { PlusIcon } from '../../../components/icons/Icons'
import { CircularProgress } from '../circular-progress/CircularProgress'
import { ScrollableContainer } from '../../../components/scrollable-container/ScrollableContainer'
import { ButtonLink } from '../../../components/button-link/ButtonLink'

import { useSearch } from '../../hooks/useSearch'
import { useTaskActions } from '../../../store/hooks/useTaskActions'

import './OngoingTasks.css'

export const OngoingTasks = () => {
  const { search } = useSearch()
  const { tasks } = useTaskActions()

  const filteredTasks = tasks?.filter(({ title }) =>
    title.toLowerCase().includes(search.toLowerCase())
  )

  const areOngoingTasks = filteredTasks?.length

  return (
    <section className="ongoing section" id="ongoing-tasks">
      <div className="ongoing__container container">
        <header className="ongoing__header">
          <div className="ongoing__header-content">
            <h2 className="ongoing__title">Ongoing Tasks</h2>
            <ButtonLink className="ongoing__card-new-button" variant="outlined" to="task-form">
              <span className="btn__state-layer"></span>
              <span className="btn__content">
                <PlusIcon />
              </span>
            </ButtonLink>
          </div>
          <a className="ongoing__see-all">See all</a>
        </header>

        <ScrollableContainer
          itemClass="ongoing__item"
          className={clsx('ongoing__list', !areOngoingTasks && 'ongoing__list--no-result')}
        >
          {
            <li key="newTask" className="ongoing__item ongoing__item--new-task">
              <h3 className="ongoing__item-title">New Task</h3>
              <div className="ongoing__card ongoing__card--new">
                <ButtonLink className="ongoing__card-new-button" variant="outlined" to="task-form">
                  <span className="btn__state-layer"></span>
                  <span className="btn__content">
                    <PlusIcon />
                  </span>
                </ButtonLink>
              </div>
            </li>
          }
          {areOngoingTasks ? (
            filteredTasks.map(
              ({ id, title, duration, beginningDate, completionDate, progress }) => (
                <li className="ongoing__item" key={id}>
                  <section className="ongoing__card">
                    <ButtonLink variant="text" to={`task/${id}`}>
                      <h3 className="ongoing__item-title">
                        {title}&nbsp;
                        <ExternalLinkIcon size={18} />
                      </h3>
                    </ButtonLink>
                    <small className="ongoing__duration">{`${duration} d`}</small>
                  </section>
                  <section className="ongoing__card">
                    <small className="ongoing__schedule">
                      Start: {beginningDate?.split('T')[0]}&nbsp;
                    </small>
                    <small className="ongoing__schedule">
                      End: {completionDate?.split('T')[0]}
                    </small>
                    <CircularProgress progress={progress} />
                  </section>
                </li>
              )
            )
          ) : (
            <li>No tasks found. Create a new one or clear de search input...</li>
          )}
        </ScrollableContainer>
      </div>
    </section>
  )
}
