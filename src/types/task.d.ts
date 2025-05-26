import { type CalendarEvent } from './calendar-event.d'
import { type Category } from './category.d'
import { type User } from './user.d'

export const TASK_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  PROGRESS: 'in-progress',
  COMPLETED: 'completed',
} as const

export interface Task {
  id: string
  title: string
  status: (typeof TASK_STATUS)[keyof typeof TASK_STATUS]
  creationDate: string
  beginningDate: string
  completionDate: string
  progress: number
  duration: number
  ownerUserId: string
  participants: User[]
  category: Category
  events: CalendarEvent[]
}

export interface TaskForm {
  title: string
  category: string
  events: CalendarEvent[]
  participants: User[]
}

export interface TaskPayload {
  title: string
  categoryId: string
  events: CalendarEvent[]
  participantsIds: string[]
}

// export type TaskId = Pick<Task, "id">
export type TaskId = Task['id']
export type TaskTitle = Pick<Task, 'title'>
export type TaskStatus = Pick<Task, 'status'>
export type Tasks = Task[]
