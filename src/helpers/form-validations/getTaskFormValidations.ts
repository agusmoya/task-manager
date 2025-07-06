import { ITaskForm } from '../../types/task.d'
import { ITaskCreatePayload, ITaskUpdatePayload } from '../../types/dtos/task'
import { ICategory } from '../../types/category'
import { IEventForm, IEventLocal } from '../../types/event'

import { FormValidations } from '../../hooks/useForm'

export const taskFormFields: ITaskForm = {
  title: '',
  category: '',
  participants: [],
  events: [],
}

export const taskFormValidations: FormValidations<typeof taskFormFields> = {
  title: [[value => !value, 'Title is required.']],
  category: [[value => !value, 'You must select a category.']],
  events: [[value => value.length === 0, 'You must add at least one event.']],
}

const mapEventLocalToEventForm = (events: IEventLocal[]): IEventForm[] => {
  return events.map(evt => ({
    title: evt.title,
    start: evt.start,
    end: evt.end,
    notes: evt.notes,
    status: evt.status,
  }))
}

export const mapTaskFormToCreatePayload = (
  form: ITaskForm,
  categories: ICategory[]
): ITaskCreatePayload => {
  const { title, category, events, participants } = form
  return {
    title: title.trim(),
    categoryId: categories.find(cat => cat.name === category)!.id,
    participantsIds: participants.map(p => p.id),
    events: mapEventLocalToEventForm(events),
  }
}

export const mapTaskFormToUpdatePayload = (
  taskId: string,
  form: ITaskForm,
  categories: ICategory[]
): ITaskUpdatePayload => {
  const { title, category, events, participants } = form
  return {
    id: taskId,
    title: title.trim(),
    categoryId: categories.find(cat => cat.name === category)!.id,
    participantsIds: participants.map(p => p.id),
    events: mapEventLocalToEventForm(events),
  }
}
