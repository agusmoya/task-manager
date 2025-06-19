import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import dayjs from 'dayjs'

import { TaskId } from '../../types/task'

import { TaskInfo } from '../components/task-info/TaskInfo'
import { DatePills } from '../components/date-pills-list/DatePills'
import { Schedule } from '../components/schedule/Schedule'
import { Loader } from '../../components/loader-page/Loader'

import { useFetchTaskByIdQuery } from '../../services/tasksApi'
import { useCurrentWeek } from '../hooks/useCurrentWeek'
import { getEventsSegments } from '../../utils/computedEvents'

const TaskPage = () => {
  const { id } = useParams<{ id: TaskId }>()
  const { data: task, isLoading, isError, refetch } = useFetchTaskByIdQuery(id!, { skip: !id })
  const { today } = useCurrentWeek()
  const [selectedDate, setSelectedDate] = useState(today)

  const allEventsSegments = getEventsSegments(task?.events)

  const segmentsForDay = useMemo(
    () => allEventsSegments.filter(seg => dayjs(seg.start).isSame(selectedDate, 'day')) ?? [],
    [allEventsSegments, selectedDate]
  )

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <div>
        <p>Error al cargar la tarea.</p>
        <button onClick={() => refetch()}>Reintentar</button>
      </div>
    )
  }

  return (
    <>
      <TaskInfo task={task!} />
      <DatePills selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      <Schedule
        segmentsForDay={segmentsForDay}
        onRequestNextDay={() => setSelectedDate(selectedDate.add(1, 'day'))}
      />
    </>
  )
}

export default TaskPage
