import { LoaderPage } from '../../../components/loader-page/LoaderPage'
import { useEventActions } from '../../../store/hooks/useEventActions'
import { CalendarEvents } from '../../components/calendar-events/CalendarEvents'
import { CalendarGridDays } from '../../components/calendar-grid-days/CalendarGridDays'

import './CalendarPage.css'

const CalendarPage = () => {
  const { fetching } = useEventActions()

  if (fetching) return <LoaderPage />

  return (
    <section className="calendar-page section container">
      <CalendarGridDays />
      <CalendarEvents />
    </section>
  )
}

export default CalendarPage
