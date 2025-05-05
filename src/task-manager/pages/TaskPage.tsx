import { useEffect } from "react"

import { useParams } from "react-router-dom"

import { DateInfo } from "../components/date-info/DateInfo.tsx"
import { DatePills } from "../components/date-pills-list/DatePills.tsx"
import { Schedule } from "../components/schedule/Schedule.tsx"

import { useCurrentWeek } from "../hooks/useCurrentWeek.ts"
import { useTaskActions } from "../../store/hooks/useTaskActions.ts"
import { Loader } from "../../components/loader-page/Loader.tsx"

const TaskPage = () => {
  const { id } = useParams<{ id: string }>()
  const { currentWeek, today } = useCurrentWeek()
  const { tasks, fetchTaskById } = useTaskActions()

  const task = tasks.find((t) => t.id === id)

  useEffect(() => {
    if (id && !task) fetchTaskById({ id })

  }, [id, task, fetchTaskById])

  if (!task) return <Loader />

  return (
    <>
      <DateInfo task={task} today={today} />
      <DatePills weekDays={currentWeek} />
      <Schedule today={today} />
    </>
  )
}

export default TaskPage
