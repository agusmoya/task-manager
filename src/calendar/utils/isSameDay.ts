import { type CalendarDay } from "../types/calendar-day.d";
import { type CalendarEvent } from "../types/calendar-event.d";

export const isSameDay = (event: CalendarEvent, day: CalendarDay): boolean => {
  const { start } = event
  const { dayNumber, month, year } = day
  return (start.getDate() === dayNumber && start.getMonth() === month && start.getFullYear() === year)
}