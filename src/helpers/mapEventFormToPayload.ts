import { type CalendarEvent, type CalendarEventForm } from "../types/calendar-event"

export const mapEventFormToPayload = (form: CalendarEventForm, taskId: string = '', createdBy: string = ''): CalendarEvent => {
  const { title, startDate, endDate } = form

  return {
    ...form,
    title: title.trim(),
    id: "",
    status: "pending",
    taskId,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    createdBy
  }
}
