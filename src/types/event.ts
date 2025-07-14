import { Dayjs } from 'dayjs'

import { ITask } from './task'
import { IUser } from './user'

export const EVENT_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  PROGRESS: 'in-progress',
  COMPLETED: 'done',
} as const

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS]

// start & end --> format "YYYY-MM-DDTHH:mm"
export interface IEventForm {
  title: string
  start: string
  end: string
  notes: string
}

/**
 * To manage existing or new events (generated ID):
 *  - Inherits all fields from IEventForm
 *  - Add an `id` (temporary or the _id that comes from the server)
 */
export interface IEventLocal extends IEventForm {
  id: string
  status?: EventStatus
  taskId?: string
}

export interface IEvent {
  id: string
  title: string
  start: string
  end: string
  notes: string
  status: EventStatus
  collaborators?: IUser[]
  taskId?: string
  task?: ITask
  createdBy?: IUser | string
  creatorId?: string
}

export type EventId = Pick<IEvent, 'id'>
export type EventTitle = Pick<IEvent, 'title'>
export type EventDates = Pick<IEvent, 'start' | 'end'>

export interface IEventSegment extends Omit<IEvent, 'start' | 'end'> {
  start: Dayjs
  end: Dayjs
  duration: number
  isStartSegment: boolean
  isEndSegment: boolean
}
