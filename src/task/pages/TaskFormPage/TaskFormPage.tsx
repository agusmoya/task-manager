import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../../components/button/button'
import { Input } from '../../../components/input/Input'
import { Modal } from '../../../components/modal/Modal'
import { InputWithSuggestions } from '../../../components/input-with-suggestions/InputWithSuggestions'
import { MultiSelectInput } from '../../../components/multi-select-input/MultiSelectInput'
import { CalendarEventForm } from '../../../components/event-form/CalendarEventForm'
import { EventCardList } from '../../components/event-card-list/EventCardList'
import { Loader } from '../../../components/loader-page/Loader'

import { type User } from '../../../types/user'

import { useForm } from '../../../hooks/useForm'
import {
  mapTaskFormToPayload,
  taskFormFields,
  taskFormValidations,
} from '../../../helpers/form-validations/getTaskFromValidations'

import { useCategoryActions } from '../../../store/hooks/useCategoryActions'
import { useUserActions } from '../../../store/hooks/useUserActions'
import { useTaskActions } from '../../../store/hooks/useTaskActions'
import { useEventActions } from '../../../store/hooks/useEventActions'

import './TaskFormPage.css'

const TaskFormPage = () => {
  const { id } = useParams<{ id: string }>()

  const { users } = useUserActions()
  const { eventsByTask, setEventsByTaskState, resetEventByTaskState } = useEventActions()
  const {
    categories,
    isLoading: { list, create: creatingCat, update: updatingCat },
    errorMessage,
    refetch,
    createCategory,
  } = useCategoryActions()

  const {
    loading: loadingTaskAction,
    backendErrorMessage: backendTaskError,
    activeTask,
    saveTask,
    fetchTaskById,
    resetActiveTask,
  } = useTaskActions()

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

  const categorySuggestions = useMemo(() => categories.map(cat => cat.name), [categories])

  //* Load initial data and clean form inputs when component unmount
  useEffect(() => {
    if (id) fetchTaskById(id)
    refetch()
    // fetchContacts()

    return () => {
      resetActiveTask()
      onResetForm()
      resetEventByTaskState()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //* Inicializa el form si se está editando y ya cargó activeTask
  useEffect(() => {
    if (!id || !activeTask) return
    console.log(activeTask)
    const { title, category, participants, events } = activeTask
    onCustomChange('title', title)
    onCustomChange('category', category.name)
    onCustomChange('participants', participants)
    setEventsByTaskState(events)
    onCustomChange('events', events)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTask])

  //* Sincroniza eventos desde Redux con el form
  useEffect(() => {
    onCustomChange('events', [...eventsByTask])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsByTask])

  //* Handlers
  const handleAddParticipant = (user: User) => {
    onCustomChange('participants', [...participants, user])
  }

  const handleRemoveParticipant = (user: User) => {
    onCustomChange(
      'participants',
      participants.filter(p => p.id !== user.id)
    )
  }

  const handleCreateNewCategory = async (name: string) => {
    const newCat = await createCategory(name)
    if (newCat) {
      onCustomChange('category', newCat.name)
    }
  }

  const handleTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) return

    const payload = mapTaskFormToPayload(formState, categories)
    console.log(payload)

    const newTask = await saveTask(payload)
    if (newTask) handleResetFormAndEvents()
  }

  const handleResetFormAndEvents = () => {
    onResetForm()
    resetEventByTaskState()
  }

  //*  Render condicional si estás editando y todavía no cargó la tarea
  if (id && !activeTask) return <Loader />

  return (
    <section className="task-form-wrapper section container">
      <h1 className="task__form-title">{id ? 'Edit ' : 'Create '} task</h1>

      {<p className="form__error">{backendTaskError}</p>}

      <form className="task__form" onSubmit={handleTaskSubmit}>
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
          suggestionData={categorySuggestions}
          onCreateNew={handleCreateNewCategory}
          backendError={errorMessage}
          loading={list}
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
          touched={touchedFields.participants}
        />

        <EventCardList events={eventsByTask} />

        <footer className="task__form-footer">
          <Button
            type="submit"
            className="btn btn--filled task__form-button"
            disabled={!isFormValid || loadingTaskAction || creatingCat || updatingCat}
          >
            {id ? 'Edit ' : 'Create'}
          </Button>

          <Button
            type="reset"
            className="btn btn--outlined task__form-button"
            onClick={handleResetFormAndEvents}
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
