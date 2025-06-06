import type { IEvent, IEventForm, IEventLocal } from './event'
import type { ICategory } from './category'
import type { IUser } from './user'

export const TASK_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  PROGRESS: 'in-progress',
  COMPLETED: 'completed',
} as const

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS]
export interface ITask {
  id: string
  title: string
  creationDate: string
  beginningDate: string
  completionDate: string
  ownerUserId: string
  status: TaskStatus
  progress: number
  duration: number
  participants: IUser[]
  category: ICategory
  events: IEvent[]
}

export interface ITaskForm {
  title: string
  category: string
  events: IEventLocal[]
  participants: IUser[]
}

export interface ITaskCreatePayload {
  title: string
  categoryId: string
  events: IEventForm[]
  participantsIds: string[]
}

export interface ITaskUpdatePayload extends ITaskCreatePayload {
  id: string
}

export type TaskId = ITask['id']
export type TaskTitle = Pick<ITask, 'title'>
export type TaskStatus = Pick<ITask, 'status'>
export type Tasks = ITask[]
