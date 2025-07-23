import { useMemo } from 'react'

import clsx from 'clsx'

import { OngoingTask } from '../ongoing-task/OngoingTask'
import { PlusIcon } from '../../../components/icons/Icons'
import { ScrollableContainer } from '../../../components/scrollable-container/ScrollableContainer'
import { ButtonLink } from '../../../components/button-link/ButtonLink'

import { useSearch } from '../../hooks/useSearch'
import { useTaskActions } from '../../../store/hooks/useTaskActions'

import './OngoingTasks.css'

export const OngoingTasks = () => {
  const { search } = useSearch()
  const { tasks = [] } = useTaskActions()

  const filteredTasks = tasks?.filter(({ title }) =>
    title.toLowerCase().includes(search.toLowerCase())
  )

  const tasksList = useMemo(() => {
    return filteredTasks.map(task => <OngoingTask key={task.id} task={task} />)
  }, [filteredTasks])

  const thereAreOngoingTasks = tasksList.length > 0

  return (
    <section className="ongoing-tasks section container">
      <header className="ongoing-tasks__header">
        <div className="ongoing-tasks__header-info">
          <h2 className="ongoing-tasks__title">Ongoing Tasks</h2>
          <ButtonLink variant="outlined" className="ongoing-tasks__btn-new" to="task-form">
            <PlusIcon />
          </ButtonLink>
        </div>
        <a className="ongoing-tasks__see-all">See all</a>
      </header>

      <ScrollableContainer
        className={clsx(
          'ongoing-tasks__list',
          !thereAreOngoingTasks && 'ongoing-tasks__list--empty'
        )}
        itemClass="ongoing-task"
      >
        {thereAreOngoingTasks ? (
          tasksList
        ) : (
          <li>No tasks found. Create a new one or clear the search input...</li>
        )}
      </ScrollableContainer>
    </section>
  )
}
