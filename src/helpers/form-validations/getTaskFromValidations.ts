
import { TASK_STATUS, TaskForm } from "../../types/task.d"

import { TODAY } from "../../calendar/constants/constants.ts"
import { FormValidations } from "../../auth/hooks/useForm.ts"


export const taskFormFields: TaskForm = {
  id: "",
  category: "",
  userId: "",
  creationDate: TODAY,
  title: "",
  status: TASK_STATUS.ACTIVE,
  progress: 0,
  duration: 0,
}

export const taskFormValidations: FormValidations<typeof taskFormFields> = {
  title: [
    [(value) => value.trim().length === 0, "Title is required."],
  ],
  category: [
    [(value) => value.trim().length === 0, "You must select a category."],
  ],

}
