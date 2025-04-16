import { useParams } from "react-router-dom"

import { DateInfo } from "../components/date-info/DateInfo.tsx"
import { DatePills } from "../components/date-pills-list/DatePills.tsx"
import { Schedule } from "../components/schedule/Schedule.tsx"
import { useCurrentWeek } from "../hooks/useCurrentWeek.ts"

const TaskPage = () => {
  const { id } = useParams<{ id: string }>()
  const { currentWeek, today } = useCurrentWeek()

  return (
    <>
      <DateInfo taskId={id || 'undefined'} today={today} />
      <DatePills weekDays={currentWeek} />
      <Schedule today={today} />
    </>
  )
}

export default TaskPage
