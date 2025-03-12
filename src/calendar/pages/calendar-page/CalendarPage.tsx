import { CalendarGridDays } from "../../components/calendar-grid-days/CalendarGridDays.tsx";
import { CalendarLayout } from "../../layouts/CalendarLayout.tsx"
import { GoTo } from "../../components/go-to/GoTo.tsx";
import { FabAddEvent } from "../../components/add-event-btn/FabAddEvent.tsx";
import { CalendarModal } from "../../../component/modal/CalendarModal.tsx";
import { EventCalendarForm } from "../../components/event-form/EventForm.tsx";
import { CalendarEvents } from "../../components/calendar-events/CalendarEvents.tsx";

import { useCalendar } from "../../hooks/useCalendar.ts";

import './CalendarPage.css'


export const CalendarPage = () => {
  const {
    today,
    weekDays,
    month,
    monthName,
    year,
    calendarDays,
    setMonth,
    getPreviousMonth,
    getNextMonth,
    setYear
  } = useCalendar()

  return (
    <CalendarLayout>
      <div className="calendar-container__page">
        <CalendarGridDays
          today={today}
          weekDays={weekDays}
          month={month}
          monthName={monthName}
          year={year}
          calendarDays={calendarDays}
          getPreviousMonth={getPreviousMonth}
          getNextMonth={getNextMonth}
        />
        <GoTo today={today} setMonth={setMonth} setYear={setYear} />
      </div>

      <FabAddEvent />

      <CalendarModal title="New Event">
        <EventCalendarForm />
      </CalendarModal>

      <CalendarEvents monthName={monthName} year={year} />

    </CalendarLayout>
  )
}