import { TASK_STATUS } from "../../types/types.d";
import { Header } from "../components/header/Header";
import { useTasks } from "../hooks/useTasks";

type Props = {
  children: React.ReactNode;
};

export const TaskManagerLayout = ({ children }: Props) => {
  const userName = "Natt";
  const { tasks } = useTasks();
  const pendingTasks =
    tasks?.filter((task) => task.status !== TASK_STATUS.COMPLETED) || [];

  return (
    <>
      <div className="task-manager-app">
        <Header userName={userName} pendingTasks={pendingTasks} />
        <main className="main">{children}</main>
      </div>
    </>
  );
};
