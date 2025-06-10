import { useParams } from 'react-router-dom'

import { TaskInfo } from '../components/task-info/TaskInfo'
import { DatePills } from '../components/date-pills-list/DatePills'
import { Schedule } from '../components/schedule/Schedule'
import { Loader } from '../../components/loader-page/Loader'

import { type TaskId } from '../../types/task'

import { useCurrentWeek } from '../hooks/useCurrentWeek'
import { useFetchTaskByIdQuery } from '../../services/tasksApi'

const TaskPage = () => {
  const { id } = useParams<{ id: TaskId }>()
  const { currentWeek, today } = useCurrentWeek()
  const { data: task, isLoading, isError, refetch } = useFetchTaskByIdQuery(id!, { skip: !id })

  if (isLoading) return <Loader />

  if (isError || !task) {
    return (
      <div>
        <p>Error al cargar la tarea.</p>
        <button onClick={() => refetch()}>Reintentar</button>
      </div>
    )
  }

  return (
    <>
      <TaskInfo task={task} />
      <DatePills weekDays={currentWeek} />
      <Schedule today={today} />
    </>
  )
}

export default TaskPage
