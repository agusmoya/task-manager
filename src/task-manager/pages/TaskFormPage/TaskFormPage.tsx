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
import { taskFormFields, taskFormValidations } from "../../../helpers/form-validations/getTaskFromValidations.ts"
import { useTaskCategoryActions } from "../../../store/hooks/useTaskCategoryActions.ts"
import { useUserActions } from "../../../store/hooks/useUserActions.ts"
import { useCalendarActions } from "../../../store/hooks/useCalendarActions.ts"


import './TaskFormPage.css'


const TaskFormPage = () => {
  const {
    categories,
    loading,
    backendErrorMessage,
    getCategories,
    createCategory,
  } = useTaskCategoryActions()
  const { events } = useCalendarActions()
  const { users, getUsers } = useUserActions()

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
    getCategories()
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

  const handleCreateNewCategory = (newCategoryName: string) => {
    createCategory({ name: newCategoryName })
  }

  const handleAddEventsToEventsForm = () => {
    console.log(events)

    onCustomChange('events', [...events])
  }

  const handleTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) {
      console.error('Form with errors')
      return
    }
    handleAddEventsToEventsForm()
    console.log(formState)

  }

  return (
    <section className="task-form-wrapper section container">
      <h1 className="task__form-title">Create Task</h1>
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
          onChange={onInputChange}
          onCreateNew={handleCreateNewCategory}
          backendError={backendErrorMessage}
          loading={loading}
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
          >
            Create
          </Button>
          <Button
            type="reset"
            className="btn btn--outlined task__form-button"
            onClick={onResetForm}
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
