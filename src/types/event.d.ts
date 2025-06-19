import { ITask } from './task'
import { IUser } from './user'

export const EVENT_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  PROGRESS: 'in-progress',
  COMPLETED: 'done',
} as const

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS]

// start and end --> formato "YYYY-MM-DDTHH:mm"
export interface IEventForm {
  title: string
  start: string
  end: string
  notes: string
}

/**
 * Tipo “local” que se almacena en el form de tareas:
 *  - Hereda todos los campos de IEventForm
 *  - Añade un `id` (temporal o el _id que venga del servidor)
 */
interface IEventLocal extends IEventForm {
  id: string
}

export interface IEvent {
  id: string
  title: string
  start: string
  end: string
  notes?: string
  status: EventStatus
  taskId?: string
  task?: ITask
  createdBy?: IUser | string
  creatorId?: string
}

export type EventId = Pick<IEvent, 'id'>
export type EventTitle = Pick<IEvent, 'title'>
export type EventDates = Pick<IEvent, 'start' | 'end'>
