import { CalendarEvents } from "../../components/calendar-events/CalendarEvents.tsx"
import { CalendarGridDays } from "../../components/calendar-grid-days/CalendarGridDays.tsx"
import { Modal } from "../../../components/modal/Modal.tsx"
import { CalendarEventForm } from "../../../components/event-form/CalendarEventForm.tsx";
import { FabAddEvent } from "../../components/add-event-btn/FabAddEvent.tsx"


import './CalendarPage.css';


const CalendarPage = () => {
  return (
    <>
      <CalendarGridDays />
      <FabAddEvent />
      <Modal title="New Event">
        <CalendarEventForm />
      </Modal>
      <CalendarEvents />
    </>
  )
}

export default CalendarPage
