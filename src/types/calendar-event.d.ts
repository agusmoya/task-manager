import { type User } from "./user.d"

export const EVENT_STATUS = {
  ACTIVE: "active",
  PENDING: "pending",
  PROGRESS: "in-progress",
  COMPLETED: "done",
} as const

export interface CalendarEvent {
  id: string
  title: string
  startDate: Date
  endDate: Date
  notes: string
  status: (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS]
  taskId: Task | string | undefined // populate or not
  createdBy: User | string | undefined
  // avaliableParticipants: User[]
}

export interface CalendarEventForm {
  title: string
  startDate: Date
  endDate: Date
  notes: string
}

export interface CalendarEventPayload {
  id: string
  title: string
  startDate: Date
  endDate: Date
  notes: string
  status: (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS]
  taskId: string
}

export type EventId = Pick<CalendarEvent, "id">
export type EventTitle = Pick<CalendarEvent, "title">
export type EventStartDate = Pick<CalendarEvent, "startDate">
export type EventEndDate = Pick<CalendarEvent, "endDate">
