import { useEffect } from 'react'

import clsx from 'clsx'

import { Input } from '../input/Input'
import { Textarea } from '../text-area/Textarea'
import { Button } from '../button/Button'
import { Chip } from '../chip/Chip'

import { EVENT_STATUS, IEventForm, IEventLocal } from '../../types/event.d'

import { useForm } from '../../hooks/useForm'
import {
  eventFormFields,
  eventFormValidations,
  getNextStartDate,
} from '../../helpers/form-validations/getEventFormValidations'

import './EventForm.css'
import dayjs from 'dayjs'

interface Props {
  eventToEdit?: IEventLocal
  existingEvents?: IEventLocal[]
  onAddEvent: (event: IEventLocal) => void
  onUpdateEvent: (event: IEventLocal) => void
}

export const EventForm = ({ eventToEdit, existingEvents, onAddEvent, onUpdateEvent }: Props) => {
  const {
    title,
    titleValid,
    start,
    startValid,
    end,
    endValid,
    notes,
    notesValid,
    isFormValid,
    touchedFields,
    formState,
    setFormState,
    onInputChange,
    onBlurField,
    onResetForm,
  } = useForm<IEventForm>(eventFormFields, eventFormValidations)

  const currentStatus = eventToEdit?.status ?? EVENT_STATUS.PENDING
  const isCompleted = currentStatus === EVENT_STATUS.COMPLETED
  const colorChip =
    currentStatus === EVENT_STATUS.COMPLETED
      ? 'completed'
      : currentStatus === EVENT_STATUS.PROGRESS
        ? 'progress'
        : 'pending'

  useEffect(() => {
    if (eventToEdit) {
      setFormState({
        title: eventToEdit.title,
        start: eventToEdit.start,
        end: eventToEdit.end,
        notes: eventToEdit.notes,
      })
    } else {
      const nextStart = getNextStartDate(existingEvents)
      const nextEnd = dayjs(nextStart).add(1, 'hour').format('YYYY-MM-DDTHH:mm')
      setFormState({
        title: '',
        start: nextStart,
        end: nextEnd,
        notes: '',
      })
    }

    return () => onResetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventToEdit, existingEvents])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid || isCompleted) return

    const submitEvent: IEventLocal = {
      id: eventToEdit?.id ?? crypto.randomUUID(),
      ...formState,
      status: currentStatus,
    }

    if (eventToEdit) onUpdateEvent(submitEvent)
    else onAddEvent(submitEvent)

    onResetForm()
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <header className="event-form__header">
        <h1 className="event-form__title">{eventToEdit ? 'Edit ' : 'Create '} event</h1>
        <Chip label={currentStatus} role="status" color={colorChip} />
      </header>
      <fieldset
        disabled={isCompleted}
        className={clsx('event-form__fieldset', isCompleted && 'event-form__fieldset--readonly')}
      >
        <Input
          type="text"
          name="title"
          label="Title"
          required
          placeholder=""
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
          placeholder=""
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
          placeholder=""
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
          placeholder=""
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
            disabled={!isFormValid}
          >
            {eventToEdit ? 'Edit' : 'Create'}
          </Button>
          <Button variant="text" className="event-form__button" onClick={onResetForm}>
            Reset
          </Button>
        </footer>
      </fieldset>
    </form>
  )
}
