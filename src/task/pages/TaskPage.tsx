import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import dayjs from 'dayjs'

import { TaskId } from '../../types/task'

import { TaskInfo } from '../components/task-info/TaskInfo'
import { DatePills } from '../components/date-pills-list/DatePills'
import { Schedule } from '../components/schedule/Schedule'
import { Loader } from '../../components/loader-page/Loader'

import { useFetchTaskByIdQuery } from '../../services/tasksApi'
import { getEventsSegments } from '../../utils/computedEvents'

const TaskPage = () => {
  const { id } = useParams<{ id: TaskId }>()
  const { data: task, isLoading, isError, refetch } = useFetchTaskByIdQuery(id!, { skip: !id })
  const [selectedDate, setSelectedDate] = useState(dayjs())

  const [allSegments, segmentsForDay] = useMemo(() => {
    const allSegments = getEventsSegments(task?.events)
    const segmentsForDay = allSegments.filter(({ start }) =>
      dayjs(start).isSame(selectedDate, 'day')
    )
    return [allSegments, segmentsForDay]
  }, [selectedDate, task?.events])

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <div>
        <p>Error loading task.</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }

  return (
    <>
      <TaskInfo task={task!} />
      <DatePills
        eventSegments={allSegments}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <Schedule
        segmentsForDay={segmentsForDay}
        onRequestNextDay={() => setSelectedDate(selectedDate.add(1, 'day'))}
      />
    </>
  )
}

export default TaskPage
