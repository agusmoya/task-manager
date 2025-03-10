import { useState } from "react";

import { CalendarGridDays } from "../../components/calendar-grid-days/CalendarGridDays.tsx";
import { CalendarLayout } from "../../layouts/CalendarLayout.tsx"
import { GoTo } from "../../components/go-to/GoTo.tsx";
import { FabAddEvent } from "../../components/add-event-btn/FabAddEvent.tsx";
import { CustomModal } from "../../../component/modal/CustomModal.tsx";
import { EventCalendarForm } from "../../components/event-form/EventForm.tsx";
import { CalendarEvents } from "../../components/calendar-events/CalendarEvents.tsx";

import { useCalendar } from "../../hooks/useCalendar.ts";

import './CalendarPage.css'


export const CalendarPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

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
          setActiveCalendarDay={setActiveCalendarDay}
        />
        <GoTo today={today} setMonth={setMonth} setYear={setYear} />
      </div>

      <FabAddEvent onOpen={handleOpenModal} />

      <CustomModal title="New Event" isOpen={isModalOpen} onClose={handleCloseModal}>
        <EventCalendarForm onClose={handleCloseModal} />
      </CustomModal>
      {
        activeCalendarDay &&
        (<CalendarEvents
          activeCalendarDay={activeCalendarDay}
          monthName={monthName}
          year={year}
        />)
      }
    </CalendarLayout>
  )
}