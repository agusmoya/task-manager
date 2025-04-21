import { useEffect } from "react"

import { Input } from "../../../components/input/Input.tsx"
import { InputWithSuggestions } from "../../../components/input-with-suggestions/InputWithSuggestions.tsx"

import { useTaskCategoryActions } from "../../../store/hooks/useTaskCategoryActions.ts"
import { useForm } from "../../../auth/hooks/useForm.ts"
import {
  taskFormFields,
  taskFormValidations
} from "../../../helpers/form-validations/getTaskFromValidations.ts"


import './TaskFormPage.css'


const TaskFormPage = () => {
  const {
    categories,
    getCategories,
    createCategory,
    backendErrorMessage,
    loading
  } = useTaskCategoryActions()
  const {
    title,
    titleValid,
    category,
    categoryValid,
    // creationDate,
    // creationDateValid,
    // duration,
    // durationValid,
    isFormValid,
    touchedFields,
    onInputChange,
    onResetForm
  } = useForm(taskFormFields, taskFormValidations)

  useEffect(() => {
    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateNewCategory = (newCategoryName: string) => {
    createCategory({ name: newCategoryName })
  }

  const handleTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) {
      console.error('Form with errors')
      return
    }
    // startSavingTask()
    onResetForm()
  }

  return (
    <section className="task section container">
      <h1>New Task PAGE</h1>
      <form
        className="task__form"
        onSubmit={handleTaskSubmit}
      >
        <Input
          id="title"
          type="text"
          name="title"
          label="Title"
          required
          placeholder=""
          value={title}
          autoComplete="off"
          error={titleValid}
          fieldValid={!!titleValid}
          touched={touchedFields.title}
          onChange={onInputChange}
        />

        <InputWithSuggestions
          id="category"
          name="category"
          label="Category"
          value={category}
          hint="Develop, UX, UI."
          error={categoryValid}
          fieldValid={!!categoryValid}
          touched={touchedFields.category}
          allowCreateIfNotExists
          suggestionData={categories.map((cat) => cat.name)}
          onChange={onInputChange}
          onCreateNew={handleCreateNewCategory}
          backendError={backendErrorMessage}
          loading={loading}
        />

        <footer className="task__form-footer">
          <button
            type="submit"
            className="btn btn--filled task__form-button"
            disabled={!isFormValid}
          >
            <span className="btn__state-layer"></span>
            <span className="btn__content">Create</span>
          </button>
          <button
            type="reset"
            className="btn btn--outlined task__form-button"
            onClick={onResetForm}
          >
            <span className="btn__state-layer"></span>
            <span className="btn__content">Reset</span>
          </button>
        </footer>
      </form>
    </section>
  )
}

export default TaskFormPage
