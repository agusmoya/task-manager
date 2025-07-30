import clsx from 'clsx'

import { Button } from '../../components/button/Button'
import { Chip } from '../../components/chip/Chip'
import { EventCardList } from '../components/event-card-list/EventCardList'
import { EventForm } from '../../components/event-form/EventForm'
import { Input } from '../../components/input/Input'
import { InputWithSuggestions } from '../../components/input-with-suggestions/InputWithSuggestions'
import { LoaderPage } from '../../components/loader-page/LoaderPage'
import { Modal } from '../../components/modal/Modal'
import { MultiSelectInput } from '../../components/multi-select-input/MultiSelectInput'

import { IUser } from '../../types/user'

import { useTaskFormLogic } from '../hooks/useTaskFormLogic'
import { useTaskFormEventModal } from '../hooks/useTaskFormEventModal'

import './TaskFormPage.css'

const TaskFormPage = () => {
  const {
    // State
    task,
    loadingTask,
    refetch,
    currentStatus,
    isCompleted,
    colorChip,
    errorMessage,
    // Form state
    formState: { title, category, participants, events },
    titleValid,
    categoryValid,
    eventsValid,
    touchedFields,
    // Computed
    categorySuggestions,
    isSubmitDisabled,
    isResetDisabled,
    contacts,
    fetchingCat,
    // Form errors
    fetchError,
    createTaskError,
    updateTaskError,
    createCategoryError,
    // Handlers
    onInputChange,
    onBlurField,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    handleAddParticipant,
    handleRemoveParticipant,
    handleCreateNewCategory,
    handleTaskSubmit,
    handleResetForm,
  } = useTaskFormLogic()

  const {
    isOpen,
    editingEvent,
    handleOpenNewEvent,
    handleOpenEditEvent,
    handleCreateEvent,
    handleUpdateEvent,
    handleCloseModal,
  } = useTaskFormEventModal({
    events,
    handleAddModalEvent: handleAddEvent,
    handleEditModalEvent: handleEditEvent,
  })

  if (task?.id && loadingTask) return <LoaderPage />

  if (fetchError) {
    return (
      <div>
        <p>Error loading task.</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }

  return (
    <section className="task-form-page section container">
      <form className="task-form" onSubmit={handleTaskSubmit}>
        <p className="task-form__backend-error">{errorMessage}</p>
        <header className="task-form__header">
          <h1 className="task-form__title">{task?.id ? 'Edit ' : 'Create '} task</h1>
          <Chip label={currentStatus!} role="status" color={colorChip} />
        </header>
        <fieldset
          disabled={isCompleted}
          className={clsx('task-form__fieldset', isCompleted && 'task-form__fieldset--readonly')}
        >
          <Input
            type="text"
            name="title"
            label="Title"
            required
            placeholder=""
            value={title}
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
            typeOption="email"
            options={contacts}
            selectedOptions={participants}
            onAddItem={handleAddParticipant}
            onRemoveItem={handleRemoveParticipant}
            getOptionLabel={(user: IUser) => user.email}
            getOptionKey={(user: IUser) => user.id}
          />

          <EventCardList
            events={events}
            onOpenNewEventModal={handleOpenNewEvent}
            onOpenEditEventModal={handleOpenEditEvent}
            onDelete={handleDeleteEvent}
            eventsValid={eventsValid}
          />

          <footer className="task-form__footer">
            <Button
              type="submit"
              variant="filled"
              className="task-form__btn"
              disabled={isSubmitDisabled}
            >
              {task?.id ? 'Edit ' : 'Create'}
            </Button>

            <Button
              type="reset"
              variant="outlined"
              className="task-form__btn"
              onClick={handleResetForm}
              disabled={isResetDisabled}
            >
              Reset
            </Button>
          </footer>
        </fieldset>
      </form>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <EventForm
            existingEvents={events}
            eventToEdit={editingEvent}
            onAddEvent={handleCreateEvent}
            onUpdateEvent={handleUpdateEvent}
          />
        </Modal>
      )}
    </section>
  )
}

export default TaskFormPage
