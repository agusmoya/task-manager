import { Header } from "../components";
import { useTasks } from "../hooks/useTasks";

type Props = {
  children: React.ReactNode;
};

export const TaskManagerLayout = ({ children }: Props) => {
  const userName = "Natt";
  const { tasks } = useTasks();
  const pendingTasks = tasks?.filter((task) => !task.completed) || [];

  return (
    <>
      <div className="task-manager-app">
        <Header userName={userName} pendingTasks={pendingTasks} />
        <main className="main">{children}</main>
      </div>
    </>
  );
};
