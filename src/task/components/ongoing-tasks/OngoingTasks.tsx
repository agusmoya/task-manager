import { Link } from 'react-router-dom'

import { ExternalLinkIcon } from '../../../components/icons/Icons'
import { PlusIcon } from '../../../components/icons/Icons'
import { ScrollableContainer } from '../scrollable-container/ScrollableContainer'
import { CircularProgress } from '../circular-progress/CircularProgress'

import { useSearch } from '../../hooks/useSearch'
import { useTaskActions } from '../../../store/hooks/useTaskActions'

import './OngoingTasks.css'
import { useEffect } from 'react'

export const OngoingTasks = () => {
  const { search } = useSearch()
  const { tasks, fetchTasks } = useTaskActions()

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <Link to="task-form" className="btn btn--outlined ongoing__card-new-button">
              <span className="btn__state-layer"></span>
              <span className="btn__content">
                <PlusIcon />
              </span>
            </Link>
          </div>
          <a className="ongoing__see-all">See all</a>
        </header>

        <ScrollableContainer
          itemClass="ongoing__item"
          className={['ongoing__list', !areOngoingTasks && 'ongoing__list--no-result']
            .filter(Boolean)
            .join(' ')}
        >
          {
            <li key="newTask" className="ongoing__item ongoing__item--new-task">
              <h3 className="ongoing__item-title">New Task</h3>
              <div className="ongoing__card ongoing__card--new">
                <Link to="task-form" className="btn btn--outlined ongoing__card-new-button">
                  <span className="btn__state-layer"></span>
                  <span className="btn__content">
                    <PlusIcon />
                  </span>
                </Link>
              </div>
            </li>
          }
          {areOngoingTasks ? (
            filteredTasks.map(
              ({ id, title, duration, beginningDate, completionDate, progress }) => (
                <li className="ongoing__item" key={id}>
                  <section className="ongoing__card">
                    <Link to={`task/${id}`}>
                      <h3 className="ongoing__item-title">
                        {title}&nbsp;
                        <ExternalLinkIcon size={18} />
                      </h3>
                    </Link>
                    <small className="ongoing__duration">{duration}&nbsp;d</small>
                  </section>
                  <section className="ongoing__card">
                    <small className="ongoing__schedule">
                      Start: {beginningDate.split('T')[0]}&nbsp;
                    </small>
                    <small className="ongoing__schedule">End: {completionDate.split('T')[0]}</small>
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
