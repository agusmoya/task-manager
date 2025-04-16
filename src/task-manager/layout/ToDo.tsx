// import { Header } from "../components/header/Header.tsx";
// import { Breadcrumb } from '../../component/breadcrumb/Breadcrumb.tsx';

// import { TASK_STATUS } from "../../types/types.d";

// import { useTasks } from "../hooks/useTasks.ts";

// import './ToDo.css'


// type Props = {
//   children: React.ReactNode
// }

// export const TaskManagerLayout = ({ children }: Props) => {
// const { tasks } = useTasks()
// const pendingTasks = tasks?.filter(({ status }) => status !== TASK_STATUS.COMPLETED) || []

//   return (
//     <>
//       <Header pendingTasks={[]} />
//       <main className="main">
//         <Breadcrumb />
//         {children}
//       </main>
//     </>
//   )
// }
