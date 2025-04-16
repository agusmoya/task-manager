import { CalendarEvents } from "../../components/calendar-events/CalendarEvents.tsx"
import { CalendarGridDays } from "../../components/calendar-grid-days/CalendarGridDays.tsx"
import { CalendarModal } from "../../../components/modal/Modal.tsx"
import { CalendarEventForm } from "../../../components/event-form/CalendarEventForm.tsx";
import { FabAddEvent } from "../../components/add-event-btn/FabAddEvent.tsx"


import './CalendarPage.css';


const CalendarPage = () => {
  return (
    <>
      <CalendarGridDays />
      <FabAddEvent />
      <CalendarModal title="New Event">
        <CalendarEventForm />
      </CalendarModal>
      <CalendarEvents />
    </>
  )
}

export default CalendarPage
