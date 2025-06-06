import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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

import { useForm } from '../../../hooks/useForm'
import {
  mapTaskFormToCreatePayload,
  mapTaskFormToUpdatePayload,
  taskFormFields,
  taskFormValidations,
} from '../../../helpers/form-validations/getTaskFormValidations'

import { useCategoryActions } from '../../../store/hooks/useCategoryActions'
import { useUserActions } from '../../../store/hooks/useUserActions'
import { useTaskActions } from '../../../store/hooks/useTaskActions'
import { useModalActions } from '../../../store/hooks/useModalActions'

import './TaskFormPage.css'
import { formatToDatetimeLocal } from '../../../helpers/form-validations/getEventFormValidations'

const TaskFormPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [editingEvent, setEditingEvent] = useState<IEventLocal | null>(null)
  const { isOpen, open, close } = useModalActions(ModalIds.EventForm)
  const { users, fetchContacts } = useUserActions()
  const {
    categories,
    isLoading: { list, create: creatingCat },
    errorMessage,
    createCategory,
  } = useCategoryActions()

  const {
    loading: loadingTaskAction,
    backendErrorMessage: backendTaskError,
    activeTask,
    saveTask,
    updateTask,
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
  } = useForm<ITaskForm>(taskFormFields, taskFormValidations)

  const categorySuggestions = useMemo(() => categories.map(cat => cat.name), [categories])

  //* Load initial data and clean form inputs when component unmount
  useEffect(() => {
    if (id) fetchTaskById(id)
    fetchContacts()

    return () => {
      resetActiveTask()
      onResetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Si estamos editando, transformo cada IEvent (de backend) en IEventLocal
  useEffect(() => {
    if (id && activeTask) {
      const { title, category, participants, events } = activeTask
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
  }, [activeTask])

  // Abrir modal para “Evento Nuevo”
  const handleOpenNewEvent = () => {
    setEditingEvent(null)
    open()
  }

  // Abrir modal para editar evento existente
  const handleOpenEditEvent = (evt: IEventLocal) => {
    setEditingEvent(evt)
    open()
  }

  // Callback cuando EventForm envía un evento nuevo
  const handleAddNewEvent = (evt: IEventLocal) => {
    // Asigna un ID único si no viene generado
    const newEvt: IEventLocal = { ...evt, id: evt.id || crypto.randomUUID() }
    onCustomChange('events', [...formState.events, newEvt])
    close()
    setEditingEvent(null)
  }

  // Callback cuando EventForm envía un evento editado
  const handleSaveEditedEvent = (evt: IEventLocal) => {
    const newArr = formState.events.map(e => (e.id === evt.id ? evt : e))
    onCustomChange('events', newArr)
    close()
    setEditingEvent(null)
  }

  // Eliminar evento del arreglo local
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
      result = await saveTask(payload)
    }

    if (result) {
      onResetForm()
      navigate('/')
    }
  }

  // Si estamos editando y aún no llegó activeTask, mostramos loader
  if (id && !activeTask) return <Loader />

  return (
    <section className="task-form-wrapper section container">
      <h1 className="task__form-title">{id ? 'Edit ' : 'Create '} task</h1>

      <p className="form__error">{backendTaskError}</p>

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

        <MultiSelectInput<IUser>
          label="Participants"
          options={users}
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
            disabled={!isFormValid || loadingTaskAction || creatingCat}
          >
            {id ? 'Edit ' : 'Create'}
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
