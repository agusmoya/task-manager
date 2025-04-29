
import { type TaskForm } from "../../types/task.d"

import { FormValidations } from "../../hooks/useForm.ts"


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
    [(value) => value.trim().length === 0, "You must select a category."],
  ],
}
