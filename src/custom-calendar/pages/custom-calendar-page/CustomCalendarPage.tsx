import { CalendarGridDays } from "../../components/calendar-grid-days/CalendarGridDays.tsx";
import { CustomCalendarLayout } from "../../layouts/CustomCalendarLayout.tsx"
import { GoTo } from "../../components/go-to/GoTo.tsx";
import { FabAddEvent } from "../../components/add-event-btn/FabAddEvent.tsx";
import { CustomModal } from "../../../component/modal/CustomModal.tsx";
import { EventCalendarForm } from "../../components/event-form/EventForm.tsx";
import { CalendarEvents } from "../../components/calendar-events/CalendarEvents.tsx";

import { useCalendar } from "../../hooks/useCalendar.ts";
import { useEventModalStore } from "../../../store/hooks/useEventModalStore.ts";

import './CustomCalendarPage.css'


export const CustomCalendarPage = () => {
  const { isModalOpen } = useEventModalStore()
  const {
    today,
    weekDays,
    month,
    monthName,
    year,
    calendarDays,
    activeCalendarDay,
    setActiveCalendarDay,
    setMonth,
    getPreviousMonth,
    getNextMonth,
    setYear
  } = useCalendar()

  return (
    <CustomCalendarLayout>
      <div className="calendar-container">
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
            setActiveCalendarDay={setActiveCalendarDay}
          />
          <GoTo today={today} setMonth={setMonth} setYear={setYear} />
        </div>

        <FabAddEvent />

        <CustomModal title="New Event" isOpen={isModalOpen}>
          <EventCalendarForm />
        </CustomModal>

        <CalendarEvents
          activeCalendarDay={activeCalendarDay}
          monthName={monthName}
          year={year}
        />

      </div>
    </CustomCalendarLayout>
  )
}