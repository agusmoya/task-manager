import { TASK_STATUS } from "../../types/types.d";
import { Header } from "../components/header/Header";
import { useTasks } from "../hooks/useTasks";

type Props = {
  children: React.ReactNode
}

export const TaskManagerLayout = ({ children }: Props) => {
  const { tasks } = useTasks()
  const pendingTasks = tasks?.filter(({ status }) => status !== TASK_STATUS.COMPLETED) || []

  return (
    <>
      <Header pendingTasks={pendingTasks} />
      <main className="main">
        {children}
      </main>
    </>
  )
}
