import { Link } from "react-router-dom";

import { ExternalLinkIcon } from '../../../component/icons/Icons.tsx';
import { PlusIcon } from "../../../component/icons/Icons.tsx";

import { type Tasks } from "../../../types/types.d";

import { useSearch } from "../../hooks/useSearch.ts";


import "./OngoingTasks.css";
import { ScrollableContainer } from "../scrollable-container/ScrollableContainer.tsx";
import { CircularProgress } from "../circular-progress/CircularProgress.tsx";

interface Props {
  tasks: Tasks
}

export const OngoingTasks: React.FC<Props> = ({ tasks }) => {
  const { search } = useSearch()
  const filteredTasks = tasks.filter(
    ({ title }) => title.toLowerCase().includes(search.toLowerCase())
  )

  const areOngoingTasks = filteredTasks.length;
  return (
    <section className="ongoing section" id="ongoing-tasks">
      <div className="ongoing__container container">
        <header className="ongoing__header">
          <h2 className="ongoing__title">Ongoing Tasks</h2>
          <a className="ongoing__see-all">See all</a>
        </header>

        <ScrollableContainer
          itemClass="ongoing__item"
          className={[
            'ongoing__list',
            !areOngoingTasks && 'ongoing__list--no-result',
          ].filter(Boolean).join(' ')}
        >
          {
            <li
              key="newTask"
              className="ongoing__item ongoing__item--new-task"
            >
              <h3>New Task</h3>
              <section className="ongoing__card">
                <Link to='/new-task'>
                  <PlusIcon className="ongoing__card-new-icon" />
                </Link>
              </section>
            </li>
          }
          {
            areOngoingTasks
              ?
              filteredTasks.map(task => (
                <li className="ongoing__item" key={task.id}>
                  <section className="ongoing__card">
                    <Link to={`/task-day/${task.id}`}>
                      <h3 className="ongoing__title">
                        {task.title}&nbsp;<ExternalLinkIcon size={18} />
                      </h3>
                    </Link>
                    <small className="ongoing__duration">
                      {task.duration}&nbsp;d
                    </small>
                  </section>
                  <section className="ongoing__card">
                    <small className="ongoing__schedule">
                      14:30 hs a 17:00 hs
                    </small>
                    {/* <span className="ongoing__progress">
                      {task.progress}%
                    </span> */}
                    <CircularProgress
                      progress={task.progress}
                    />
                  </section>
                </li>
              ))
              :
              <li>No tasks found...</li>
          }
        </ScrollableContainer>

      </div>
    </section>
  )
}
