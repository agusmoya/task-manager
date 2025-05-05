import { useEffect } from "react"

import { Button } from "../../../components/button/button.tsx"
import { Input } from "../../../components/input/Input.tsx"
import { Modal } from "../../../components/modal/Modal.tsx"
import { InputWithSuggestions } from "../../../components/input-with-suggestions/InputWithSuggestions.tsx"
import { MultiSelectInput } from "../../../components/multi-select-input/MultiSelectInput.tsx"
import { CalendarEventForm } from "../../../components/event-form/CalendarEventForm.tsx"
import { EventCardList } from '../../components/event-card-list/EventCardList.tsx'

import { type User } from "../../../types/user.d"

import { useForm } from "../../../hooks/useForm.ts"
import { mapTaskFormToPayload, taskFormFields, taskFormValidations } from "../../../helpers/form-validations/getTaskFromValidations.ts"
import { useTaskCategoryActions } from "../../../store/hooks/useTaskCategoryActions.ts"
import { useUserActions } from "../../../store/hooks/useUserActions.ts"
import { useCalendarActions } from "../../../store/hooks/useCalendarActions.ts"
import { useTaskActions } from "../../../store/hooks/useTaskActions.ts"


import './TaskFormPage.css'


const TaskFormPage = () => {
  const { events, resetEventState } = useCalendarActions()
  const { users, getUsers } = useUserActions()
  const { loading: loadingTaskAction, backendErrorMessage: backendTaskError, saveTask } = useTaskActions()
  const {
    categories,
    loading: lodaingCategoryAction,
    backendErrorMessage: backendCategoryError,
    fetchCategories,
    saveCategory,
  } = useTaskCategoryActions()
  const {
    title,
    titleValid,
    category,
    categoryValid,
    participants,
    isFormValid,
    touchedFields,
    formState,
    onInputChange,
    onCustomChange,
    onBlurField,
    onResetForm,
  } = useForm(taskFormFields, taskFormValidations)

  const handleAddParticipant = (user: User) => {
    onCustomChange('participants', [...participants, user])
  }

  const handleRemoveParticipant = (user: User) => {
    onCustomChange('participants', participants.filter(p => p.id !== user.id))
  }

  useEffect(() => {
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    onCustomChange('events', [...events])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  const handleCreateNewCategory = async (newCategoryName: string) => {
    const { wasSuccessful } = await saveCategory({ name: newCategoryName })
    if (!wasSuccessful) onCustomChange('category', '')
  }

  const handleAddEventsToEventsForm = () => {
    onCustomChange('events', [...events])
  }

  const handleTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) return

    handleAddEventsToEventsForm()
    const payload = mapTaskFormToPayload(formState, categories)

    const { wasSuccessful } = await saveTask(payload)
    if (wasSuccessful) {
      onResetForm()
      resetEventState()
    }
  }

  const handleResetForm = () => {
    onResetForm()
    resetEventState()
  }

  return (
    <section className="task-form-wrapper section container">
      <h1 className="task__form-title">Create Task</h1>
      {
        <p className="form__error">
          {backendTaskError}
        </p>
      }
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
          onBlur={() => onBlurField('title')}
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
          onCreateNew={handleCreateNewCategory}
          backendError={backendCategoryError}
          loading={lodaingCategoryAction}
          onChange={onInputChange}
          onBlur={() => onBlurField('category')}
        />

        <MultiSelectInput<User>
          label="Participants"
          options={users}
          selectedOptions={participants}
          onAddItem={handleAddParticipant}
          onRemoveItem={handleRemoveParticipant}
          getOptionLabel={(user: User) => user.email}
          getOptionKey={(user: User) => user.id}
          touched={touchedFields.completionDate}
        />

        <EventCardList events={events} />

        <footer className="task__form-footer">
          <Button
            type="submit"
            className="btn btn--filled task__form-button"
            disabled={!isFormValid || loadingTaskAction}
          >
            Create
          </Button>
          <Button
            type="reset"
            className="btn btn--outlined task__form-button"
            onClick={handleResetForm}
          >
            Reset
          </Button>
        </footer>
      </form>

      <Modal title="New Event">
        <CalendarEventForm />
      </Modal>
    </section>
  )
}

export default TaskFormPage
