import { Loader } from '../../../components/loader-page/Loader'
import { useEventActions } from '../../../store/hooks/useEventActions'
import { CalendarEvents } from '../../components/calendar-events/CalendarEvents'
import { CalendarGridDays } from '../../components/calendar-grid-days/CalendarGridDays'

import './CalendarPage.css'

const CalendarPage = () => {
  const { fetching } = useEventActions()

  if (fetching) return <Loader />

  return (
    <section className="calendar-page section container">
      <CalendarGridDays />
      <CalendarEvents />
    </section>
  )
}

export default CalendarPage
