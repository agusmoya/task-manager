import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../../components/button/button'
import { Input } from '../../../components/input/Input'
import { Modal } from '../../../components/modal/Modal'
import { InputWithSuggestions } from '../../../components/input-with-suggestions/InputWithSuggestions'
import { MultiSelectInput } from '../../../components/multi-select-input/MultiSelectInput'
import { EventForm } from '../../../components/event-form/EventForm'
import { EventCardList } from '../../components/event-card-list/EventCardList'
import { Loader } from '../../../components/loader-page/Loader'

import { ModalIds } from '../../../constants/modalIds'
import type { IUser } from '../../../types/user'
import type { IEventLocal } from '../../../types/event'
import type { ITaskForm } from '../../../types/task'

import {
  mapTaskFormToCreatePayload,
  mapTaskFormToUpdatePayload,
  taskFormFields,
  taskFormValidations,
} from '../../../helpers/form-validations/getTaskFormValidations'
import { formatToDatetimeLocal } from '../../../helpers/form-validations/getEventFormValidations'

import { useFetchTaskByIdQuery } from '../../../services/tasksApi'

import { useForm } from '../../../hooks/useForm'
import { useCategoryActions } from '../../../store/hooks/useCategoryActions'
import { useUserActions } from '../../../store/hooks/useUserActions'
import { useTaskActions } from '../../../store/hooks/useTaskActions'
import { useModalActions } from '../../../store/hooks/useModalActions'

import './TaskFormPage.css'

const TaskFormPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const openEventIdFromState = (location.state as { openEventId?: string })?.openEventId
  const { id } = useParams<{ id: string }>()

  const {
    data: task,
    isLoading: loadingTask,
    isError: fetchTaskError,
  } = useFetchTaskByIdQuery(id!, { skip: !id })

  const {
    createTask,
    updateTask,
    creating: creatingTask,
    updating: updatingTask,
    errorMessage: taskError,
  } = useTaskActions()

  const [editingEvent, setEditingEvent] = useState<IEventLocal | null>(null)
  const { isOpen, open, close } = useModalActions(ModalIds.EventForm)
  const { contacts = [] } = useUserActions()
  const {
    categories,
    fetching: fetchingCat,
    creating: creatingCat,
    errorMessage: categoryError,
    createCategory,
  } = useCategoryActions()

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
  } = useForm<ITaskForm>(taskFormFields, taskFormValidations)

  const categorySuggestions = useMemo(() => categories.map(cat => cat.name), [categories])

  // Load initial data and clear form inputs when component unmount
  // useEffect(() => {
  //   return () => {
  //     onResetForm()
  //   }

  // }, [])

  // If we are editing, transform each IEvent (from backend) to IEventLocal
  useEffect(() => {
    if (id && task) {
      const { title, category, participants, events } = task
      onCustomChange('title', title)
      onCustomChange('category', category.name)
      onCustomChange('participants', participants)
      const localEvents: IEventLocal[] = events.map(evt => ({
        id: evt.id,
        title: evt.title,
        start: formatToDatetimeLocal(evt.start),
        end: formatToDatetimeLocal(evt.end),
        notes: evt.notes || '',
      }))
      onCustomChange('events', localEvents)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task])

  useEffect(() => {
    if (openEventIdFromState && formState.events.length) {
      const eventToEdit = formState.events.find(evt => evt.id === openEventIdFromState)
      if (eventToEdit) {
        handleOpenEditEvent(eventToEdit)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEventIdFromState, formState.events])

  const handleOpenNewEvent = () => {
    setEditingEvent(null)
    open()
  }

  const handleOpenEditEvent = (evt: IEventLocal) => {
    setEditingEvent(evt)
    open()
  }

  const handleAddNewEvent = (evt: IEventLocal) => {
    const newEvt: IEventLocal = { ...evt, id: evt.id || crypto.randomUUID() }
    onCustomChange('events', [...formState.events, newEvt])
    close()
    setEditingEvent(null)
  }

  const handleSaveEditedEvent = (evt: IEventLocal) => {
    const newArr = formState.events.map(e => (e.id === evt.id ? evt : e))
    onCustomChange('events', newArr)
    close()
    setEditingEvent(null)
  }

  const handleDeleteEvent = (evtId: string) => {
    const newArr = formState.events.filter(evt => evt.id !== evtId)
    onCustomChange('events', newArr)
  }

  const handleAddParticipant = (user: IUser) => {
    onCustomChange('participants', [...participants, user])
  }

  const handleRemoveParticipant = (user: IUser) => {
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

    let result = null
    if (id) {
      const payload = mapTaskFormToUpdatePayload(id, formState, categories)
      result = await updateTask(payload)
    } else {
      const payload = mapTaskFormToCreatePayload(formState, categories)
      result = await createTask(payload)
    }

    if (result) {
      onResetForm()
      navigate('/')
    }
  }

  // If we are editing and the active task is not yet ready, show the loader
  if (id && loadingTask) return <Loader />

  return (
    <section className="task-form-wrapper section container">
      <h1 className="task__form-title">{id ? 'Edit ' : 'Create '} task</h1>

      <p className="form__error">{taskError || fetchTaskError}</p>

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
          backendError={categoryError}
          loading={fetchingCat}
          onChange={onInputChange}
          onBlur={() => onBlurField('category')}
        />

        <MultiSelectInput<IUser>
          label="Participants"
          options={contacts}
          selectedOptions={participants}
          onAddItem={handleAddParticipant}
          onRemoveItem={handleRemoveParticipant}
          getOptionLabel={(user: IUser) => user.email}
          getOptionKey={(user: IUser) => user.id}
          touched={touchedFields.participants}
        />

        <EventCardList
          events={formState.events}
          onOpenModal={handleOpenNewEvent}
          onEdit={handleOpenEditEvent}
          onDelete={handleDeleteEvent}
        />

        <footer className="task__form-footer">
          <Button
            type="submit"
            className="btn btn--filled task__form-button"
            disabled={!isFormValid || creatingCat || creatingTask || updatingTask}
          >
            {id ? 'Edit ' : 'Create'}
          </Button>

          <Button
            type="reset"
            className="btn btn--outlined task__form-button"
            onClick={onResetForm}
            disabled={isFormValid || creatingCat || creatingTask || updatingTask}
          >
            Reset
          </Button>
        </footer>
      </form>

      <Modal title={editingEvent ? 'Edit Event' : 'New Event'} isOpen={isOpen} onClose={close}>
        <EventForm
          initialEvent={editingEvent ?? undefined}
          existingEvents={formState.events}
          onAddEvent={handleAddNewEvent}
          onUpdateEvent={handleSaveEditedEvent}
        />
      </Modal>
    </section>
  )
}

export default TaskFormPage
