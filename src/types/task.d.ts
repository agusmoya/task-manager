import { type CalendarEvent } from "./calendar-event.d"
import { type Category } from "./category.d"
import { type User } from "./user.d"

export const TASK_STATUS = {
  PENDING: "pending",
  ACTIVE: "active",
  PROGRESS: "in-progress",
  COMPLETED: "completed",
} as const

export interface Task {
  id: string
  title: string
  status: (typeof TASK_STATUS)[keyof typeof TASK_STATUS]
  creationDate: Date
  progress: number
  duration: number
  category: Category
  ownerUserId: string
  participants: User[]
  events: CalendarEvent[]
}

export interface TaskForm {
  title: string
  category: string
  events: CalendarEvent[]
  participants: User[]
}

export interface TasksResponse {
  Tasks: Task[]
}

export type TaskId = Pick<Task, "id">
export type TaskTitle = Pick<Task, "title">
export type TaskStatus = Pick<Task, "status">
export type Tasks = Task[]

export interface FetchState {
  data: undefined | null
  error: ErrorFetch | null
  isLoading: boolean
  hasError: boolean
}

export interface ErrorFetch {
  status: number
  statusText: string
}
