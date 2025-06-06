import { CalendarEvents } from '../../components/calendar-events/CalendarEvents'
import { CalendarGridDays } from '../../components/calendar-grid-days/CalendarGridDays'

import './CalendarPage.css'

const CalendarPage = () => {
  return (
    <>
      <CalendarGridDays />
      <CalendarEvents />
    </>
  )
}

export default CalendarPage
