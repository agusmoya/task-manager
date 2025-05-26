import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { TaskInfo } from '../components/task-info/TaskInfo.tsx'
import { DatePills } from '../components/date-pills-list/DatePills.tsx'
import { Schedule } from '../components/schedule/Schedule.tsx'
import { Loader } from '../../components/loader-page/Loader.tsx'

import { type TaskId } from '../../types/task.d'

import { useCurrentWeek } from '../hooks/useCurrentWeek.ts'
import { useTaskActions } from '../../store/hooks/useTaskActions.ts'

const TaskPage = () => {
  const { id } = useParams<{ id: TaskId }>()
  const { currentWeek, today } = useCurrentWeek()
  const { activeTask, fetchTaskById } = useTaskActions()

  useEffect(() => {
    if (!id) return
    fetchTaskById(id)
  }, [id, fetchTaskById])

  if (!activeTask) return <Loader />

  return (
    <>
      <TaskInfo task={activeTask} />
      {/* <TaskInfo task={activeTask} /> */}
      <DatePills weekDays={currentWeek} />
      <Schedule today={today} />
    </>
  )
}

export default TaskPage
