import { type TaskPayload, type TaskForm } from "../../types/task.d"

import { FormValidations } from "../../hooks/useForm.ts"
import { Category } from "../../types/category"


export const taskFormFields: TaskForm = {
  title: "",
  category: "",
  participants: [],
  events: []
}

export const taskFormValidations: FormValidations<typeof taskFormFields> = {
  title: [
    [(value) => value.trim().length === 0, "Title is required."],
  ],
  category: [
    [(value) => (!value), "You must select a category."],
  ],
}

export const mapTaskFormToPayload = (form: TaskForm, categories: Category[]): TaskPayload => {
  const { title, category, events, participants } = form
  return {
    title: title.trim(),
    categoryId: categories.find(cat => cat.name === category)!.id!,
    participantsIds: participants.map(user => user.id),
    events: events,
  }
}
