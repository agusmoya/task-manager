import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import isEqual from 'lodash.isequal'
import clsx from 'clsx'

import { Button } from '../../components/button/Button'
import { Input } from '../../components/input/Input'
import { Modal } from '../../components/modal/Modal'
import { InputWithSuggestions } from '../../components/input-with-suggestions/InputWithSuggestions'
import { MultiSelectInput } from '../../components/multi-select-input/MultiSelectInput'
import { EventForm } from '../../components/event-form/EventForm'
import { EventCardList } from '../components/event-card-list/EventCardList'
import { Loader } from '../../components/loader-page/Loader'
import { Chip } from '../../components/chip/Chip'

import { ModalIds } from '../../constants/modalIds'
import { IUser } from '../../types/user'
import { IEventLocal } from '../../types/event'
import { ITaskForm, TASK_STATUS } from '../../types/task.d'

import {
  mapTaskFormToCreatePayload,
  mapTaskFormToUpdatePayload,
  taskFormFields,
  taskFormValidations,
} from '../../helpers/form-validations/getTaskFormValidations'
import { formatToDatetimeLocal } from '../../helpers/form-validations/getEventFormValidations'

import { useFetchTaskByIdQuery } from '../../services/tasksApi'

import { useForm } from '../../hooks/useForm'
import { useCategoryActions } from '../../store/hooks/useCategoryActions'
import { useUserActions } from '../../store/hooks/useUserActions'
import { useTaskActions } from '../../store/hooks/useTaskActions'
import { useModalActions } from '../../store/hooks/useModalActions'

import './TaskFormPage.css'

const TaskFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const originalFormRef = useRef<ITaskForm | null>(null)
  const location = useLocation()
  const openEventIdFromState = (location.state as { openEventId?: string })?.openEventId
  const { data: task, isLoading: loadingTask } = useFetchTaskByIdQuery(id!, { skip: !id })

  const {
    createTask,
    creating: creatingTask,
    updateTask,
    updating: updatingTask,
    createTaskError,
    updateTaskError,
  } = useTaskActions()

  const [editingEvent, setEditingEvent] = useState<IEventLocal | undefined>(undefined)
  const { isOpen, open, close } = useModalActions(ModalIds.EventForm)
  const { contacts = [] } = useUserActions()
  const {
    categories,
    fetching: fetchingCat,
    creating: creatingCat,
    createCategoryError,
    updateCategoryError,
    createCategory,
  } = useCategoryActions()

  const {
    title,
    titleValid,
    category,
    categoryValid,
    participants,
    events,
    isFormValid,
    touchedFields,
    formState,
    onInputChange,
    onCustomChange,
    onBlurField,
    onResetForm,
  } = useForm<ITaskForm>(taskFormFields, taskFormValidations)

  const categorySuggestions = useMemo(() => categories.map(cat => cat.name), [categories])
  const validSelectedCategory = categories?.some(cat => cat.name === category)
  const currentStatus = task?.status ?? TASK_STATUS.PENDING
  const isCompleted = currentStatus === TASK_STATUS.COMPLETED
  const colorChip =
    currentStatus === TASK_STATUS.COMPLETED
      ? 'completed'
      : currentStatus === TASK_STATUS.PROGRESS
        ? 'progress'
        : 'pending'

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
        notes: evt.notes,
        status: evt.status,
      }))
      onCustomChange('events', localEvents)

      originalFormRef.current = {
        title: task.title,
        category: task.category.name,
        participants: task.participants,
        events: localEvents,
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task])

  const formHasChanges = useMemo(() => {
    // if there is no original yet, allow
    return originalFormRef.current ? !isEqual(formState, originalFormRef.current) : true
  }, [formState])

  useEffect(() => {
    if (openEventIdFromState && formState.events.length > 0) {
      const eventToEdit = formState.events.find(evt => evt.id === openEventIdFromState)
      if (eventToEdit) {
        handleOpenEditEvent(eventToEdit)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEventIdFromState, formState.events])

  const handleOpenNewEvent = () => {
    setEditingEvent(undefined)
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
    setEditingEvent(undefined)
  }

  const handleSaveEditedEvent = (evt: IEventLocal) => {
    const newArr = formState.events.map(e => (e.id === evt.id ? evt : e))
    onCustomChange('events', newArr)
    close()
    setEditingEvent(undefined)
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
    const newCat = await createCategory({ name }).unwrap()
    if (newCat) {
      onCustomChange('category', newCat.name)
    }
  }

  const handleCloseEventForm = () => {
    close()
  }

  const handleTaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validSelectedCategory) return
    if (!isFormValid) return
    if (!formHasChanges) {
      navigate(`/home/task/${id}`, { replace: true })
      return
    }

    let result = null
    if (id) {
      const payloadEdit = mapTaskFormToUpdatePayload(id, formState, categories)
      result = await updateTask(payloadEdit)
    } else {
      const payloadSave = mapTaskFormToCreatePayload(formState, categories)
      result = await createTask(payloadSave)
    }

    if (!result?.error) {
      const taskId = id ?? result.data.id
      navigate(`/home/task/${taskId}`, { replace: true })
    }
  }

  if (id && loadingTask) return <Loader />

  return (
    <section className="task-form-page section container">
      <p className="task-form-page__error">
        {createCategoryError?.message ||
          updateCategoryError?.message ||
          createTaskError?.message ||
          updateTaskError?.message}
      </p>
      <form className="task-form-page__form" onSubmit={handleTaskSubmit}>
        <header className="task-form-page__header">
          <h1 className="task-form-page__title">{id ? 'Edit ' : 'Create '} task</h1>
          <Chip label={currentStatus!} role="status" color={colorChip} />
        </header>
        <fieldset
          disabled={isCompleted}
          className={clsx(
            'task-form-page__fieldset',
            isCompleted && 'task-form-page__fieldset--readonly'
          )}
        >
          <Input
            type="text"
            name="title"
            label="Title"
            required
            placeholder=""
            value={title}
            autoComplete="off"
            error={
              titleValid ??
              createTaskError?.fieldsValidations?.title ??
              updateTaskError?.fieldsValidations?.title
            }
            touched={touchedFields.title}
            onChange={onInputChange}
            onBlur={() => onBlurField('title')}
          />

          <InputWithSuggestions
            name="category"
            label="Category"
            value={category}
            hint="Develop, UX, UI."
            error={
              categoryValid ??
              createCategoryError?.fieldsValidations?.name ??
              updateTaskError?.fieldsValidations?.name
            }
            touched={touchedFields.category}
            allowCreateIfNotExists
            suggestionData={categorySuggestions}
            onCreateNew={handleCreateNewCategory}
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

          <footer className="task-form-page__footer">
            <Button
              type="submit"
              variant="filled"
              className="task-form-page__button"
              disabled={
                !validSelectedCategory ||
                !formHasChanges ||
                !isFormValid ||
                creatingCat ||
                creatingTask ||
                updatingTask
              }
            >
              {id ? 'Edit ' : 'Create'}
            </Button>

            <Button
              type="reset"
              variant="outlined"
              className="task-form-page__button"
              onClick={onResetForm}
              disabled={isFormValid || creatingCat || creatingTask || updatingTask}
            >
              Reset
            </Button>
          </footer>
        </fieldset>
      </form>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={handleCloseEventForm}>
          <EventForm
            existingEvents={events}
            eventToEdit={editingEvent}
            onAddEvent={handleAddNewEvent}
            onUpdateEvent={handleSaveEditedEvent}
          />
        </Modal>
      )}
    </section>
  )
}

export default TaskFormPage
