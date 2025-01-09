import { useSearch } from "../../hooks/useSearch";
import { type Tasks } from "../../../types/types";
import "./OngoingTasks.css";

interface Props {
  tasks: Tasks;
}

export const OngoingTasks: React.FC<Props> = ({ tasks }) => {
  const { search } = useSearch();
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const areOngoingTasksPresent = filteredTasks.length;
  return (
    <section className="ongoing section" id="ongoing-tasks">
      <div className="ongoing__container container">
        <header className="ongoing__header">
          <h2>Ongoing Tasks</h2>
          <a>See all</a>
        </header>
        <ul
          className={`ongoing__list ${
            !areOngoingTasksPresent ? "ongoing__list--no-result" : ""
          }`}
        >
          {areOngoingTasksPresent > 0 ? (
            filteredTasks.map((task) => (
              <li className="ongoing__item" key={task.id}>
                <article className="ongoin__card">
                  <h3>{task.title}</h3>
                  <small className="ongoing__duration">{task.duration}d</small>
                </article>
                <article className="ongoin__card">
                  <small className="ongoing__schedule">14:30 a 17:00 hs</small>
                  <span className="ongoing__progress">{task.progress}%</span>
                </article>
              </li>
            ))
          ) : (
            <em>No tasks found...</em>
          )}
        </ul>
      </div>
    </section>
  );
};
