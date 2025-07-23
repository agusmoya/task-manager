import clsx from 'clsx'

import { Input } from '../input/Input'
import { Textarea } from '../text-area/Textarea'
import { Button } from '../button/Button'
import { Chip } from '../chip/Chip'

import { IEventLocal } from '../../types/event'

import { useEventFormLogic } from './useEventFormLogic'

import './EventForm.css'

interface Props {
  eventToEdit?: IEventLocal
  existingEvents?: IEventLocal[]
  onAddEvent: (event: IEventLocal) => void
  onUpdateEvent: (event: IEventLocal) => void
}

export const EventForm = ({
  eventToEdit,
  existingEvents = [],
  onAddEvent,
  onUpdateEvent,
}: Props) => {
  const {
    formState: { title, start, end, notes },
    titleValid,
    startValid,
    endValid,
    notesValid,
    touchedFields,
    isFormValid,
    hasConflict,
    isStatusCompleted,
    colorChip,
    currentStatus,
    onInputChange,
    onBlurField,
    handleSubmit,
    handleResetForm,
  } = useEventFormLogic(eventToEdit, existingEvents, onAddEvent, onUpdateEvent)

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <header className="event-form__header">
        <h1 className="event-form__title">{eventToEdit ? 'Edit ' : 'Create '} event</h1>
        <Chip label={currentStatus} role="status" color={colorChip} />
      </header>

      {hasConflict && (
        <div className="event-form__error">
          Another event is already occupying that time slot. Adjust the start or end time.
        </div>
      )}

      <fieldset
        disabled={isStatusCompleted}
        className={clsx(
          'event-form__fieldset',
          isStatusCompleted && 'event-form__fieldset--readonly'
        )}
      >
        <Input
          type="text"
          name="title"
          label="Title"
          required
          value={title}
          autoComplete="off"
          error={titleValid}
          touched={touchedFields.title}
          onChange={onInputChange}
          onBlur={() => onBlurField('title')}
        />

        <Input
          type="datetime-local"
          name="start"
          label="Start date"
          required
          min={start}
          value={start}
          step="900"
          autoComplete="off"
          error={startValid}
          touched={touchedFields.start}
          onChange={onInputChange}
          onBlur={() => onBlurField('start')}
        />

        <Input
          type="datetime-local"
          name="end"
          label="End date"
          required
          min={start}
          value={end}
          step="900"
          autoComplete="off"
          error={endValid}
          touched={touchedFields.end}
          onChange={onInputChange}
          onBlur={() => onBlurField('end')}
        />

        <Textarea
          id="notes"
          name="notes"
          label="Notes"
          required
          value={notes || ''}
          onChange={onInputChange}
          error={notesValid}
          touched={touchedFields.notes}
          onBlur={() => onBlurField('notes')}
          autoResize
        />

        <footer className="event-form__footer">
          <Button
            type="submit"
            variant="filled"
            className="event-form__button"
            disabled={!isFormValid || hasConflict}
          >
            {eventToEdit ? 'Edit' : 'Create'}
          </Button>
          <Button variant="outlined" className="event-form__button" onClick={handleResetForm}>
            Reset
          </Button>
        </footer>
      </fieldset>
    </form>
  )
}
