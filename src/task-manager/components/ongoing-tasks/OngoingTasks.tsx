import { Link } from "react-router-dom";

import { PlusIcon } from "../../../component/icons/Icons.tsx";

import { type Tasks } from "../../../types/types.d";

import { useSearch } from "../../hooks/useSearch.ts";


import "./OngoingTasks.css";

interface Props {
  tasks: Tasks;
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
          <h2>Ongoing Tasks</h2>
          <a>See all</a>
        </header>
        <ul
          className={
            `ongoing__list ${!areOngoingTasks
              ? "ongoing__list--no-result"
              : ""
            }`
          }
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
                      <h3>{task.title}</h3>
                    </Link>
                    <small className="ongoing__duration">
                      {task.duration}&nbsp;d
                    </small>
                  </section>
                  <section className="ongoing__card">
                    <small className="ongoing__schedule">
                      14:30 hs a 17:00 hs
                    </small>
                    <span className="ongoing__progress">
                      {task.progress}%
                    </span>
                  </section>
                </li>
              ))
              :
              <li>No tasks found...</li>
          }
        </ul>
      </div>
    </section>
  )
}
