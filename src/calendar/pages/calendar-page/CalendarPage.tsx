import { CalendarGridDays } from "../../components/calendar-grid-days/CalendarGridDays.tsx";
import { CalendarLayout } from "../../layouts/CalendarLayout.tsx"
import { GoTo } from "../../components/go-to/GoTo.tsx";
import { FabAddEvent } from "../../components/add-event-btn/FabAddEvent.tsx";
import { CalendarModal } from "../../../component/modal/CalendarModal.tsx";
import { EventCalendarForm } from "../../components/event-form/EventForm.tsx";
import { CalendarEvents } from "../../components/calendar-events/CalendarEvents.tsx";

import './CalendarPage.css'


export const CalendarPage = () => {
  return (
    <CalendarLayout>
      <div className="calendar-container__page">
        <CalendarGridDays />
        <GoTo />
      </div>

      <FabAddEvent />

      <CalendarModal title="New Event">
        <EventCalendarForm />
      </CalendarModal>

      <CalendarEvents />

    </CalendarLayout>
  )
}