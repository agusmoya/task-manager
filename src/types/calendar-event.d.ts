import { User } from "./user"

export interface CalendarEvent {
  id?: string
  title: string
  startDate: Date
  endDate: Date
  notes: string
  taskId?: string
  createdBy?: User
}

export type EventId = Pick<CalendarEvent, "id">
export type EventTitle = Pick<CalendarEvent, "title">
export type EventStartDate = Pick<CalendarEvent, "startDate">
export type EventEndDate = Pick<CalendarEvent, "endDate">
