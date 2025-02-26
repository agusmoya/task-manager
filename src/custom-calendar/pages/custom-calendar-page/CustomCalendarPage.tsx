import { CalendarGridDays } from "../../components/calendar-grid-days/CalendarGridDays.tsx";
import { CircleIcon, PlusIcon } from "../../icons/Icons.tsx";
import { CustomCalendarLayout } from "../../layouts/CustomCalendarLayout.tsx"
import { GoTo } from "../../components/go-to/GoTo.tsx";

import { useCalendar } from "../../hooks/useCalendar.ts";

import './CustomCalendarPage.css'

export const CustomCalendarPage = () => {

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
    <CustomCalendarLayout>
      <div className="calendar__container">
        <div className="calendar__page">
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
        <div className="calendar__events">
          <div className="today-date">
            <div className="event-day">Wed</div>
            <div className="event-date">17 february 2025</div>
          </div>
          <div className="events">
            <div className="event">
              <div className="title">
                <CircleIcon className="event-circle" />
                <h3 className="event-title">Event 1</h3>
              </div>
              <div className="event-time">
                10:00AM - 12:00PM
              </div>
            </div>
          </div>
          {/* <div className="add-event-wrapper active">
            <div className="add-event-header">
              <div className="title">Add Event</div>
              <CloseIcon />
              <i className="fas fa-times close"></i>
            </div>
            <div className="add-event-body">
              <div className="add-event-input">
                <input type="text" placeholder="Event Name" className="event-name" />
              </div>
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Event Time From"
                  className="event-time-from"
                />
              </div>
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Event Time To"
                  className="event-time-to"
                />
              </div>
            </div>
            <div className="add-event-footer">
              <button className="add-event-btn">Add Event</button>
            </div>
          </div> */}
          <button className="add-event">
            <PlusIcon className="add-event-icon" />
          </button>
        </div>
      </div>
    </CustomCalendarLayout>
  )
}