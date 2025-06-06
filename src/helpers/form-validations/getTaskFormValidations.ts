import type { ITaskCreatePayload, ITaskForm, ITaskUpdatePayload } from '../../types/task'

import { FormValidations } from '../../hooks/useForm'
import { ICategory } from '../../types/category'
import { IEventForm, IEventLocal } from '../../types/event'

export const taskFormFields: ITaskForm = {
  title: '',
  category: '',
  participants: [],
  events: [],
}

export const taskFormValidations: FormValidations<typeof taskFormFields> = {
  title: [[value => value.trim().length === 0, 'Title is required.']],
  category: [[value => !value, 'You must select a category.']],
  // participants: [[value => value.length === 0, 'You must select at least one participant.']],
  events: [[value => value.length === 0, 'You must add at least one event.']],
}

const mapEventLocalToEventForm = (events: IEventLocal[]): IEventForm[] => {
  return events.map(evt => ({
    title: evt.title,
    start: evt.start,
    end: evt.end,
    notes: evt.notes,
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
