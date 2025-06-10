import { useEffect } from 'react'

import { Input } from '../input/Input'
import { Textarea } from '../text-area/Textarea'
import { Button } from '../button/button'

import { useForm } from '../../hooks/useForm'

import { IEventForm, IEventLocal } from '../../types/event'

import {
  eventFormFields,
  eventFormValidations,
  formatToDatetimeLocal,
  getNextStartDateForEvent,
} from '../../helpers/form-validations/getEventFormValidations'

import './EventForm.css'

interface Props {
  /** Si viene, precargo el form para editar ese evento */
  initialEvent?: IEventLocal
  /** Todos los eventos locales actuales (para calcular “next start”) */
  existingEvents?: IEventForm[]
  /** Devuelvo IEventLocal al padre para agregarlo */
  onAddEvent: (event: IEventLocal) => void
  /** Devuelvo IEventLocal al padre para actualizarlo */
  onUpdateEvent: (event: IEventLocal) => void
}

export const EventForm = ({ initialEvent, existingEvents, onAddEvent, onUpdateEvent }: Props) => {
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

  useEffect(() => {
    onResetForm()
    if (initialEvent) {
      const { title, start, end, notes } = initialEvent
      setFormState({
        title,
        start,
        end,
        notes,
      })
    } else {
      const nextStart = getNextStartDateForEvent(existingEvents)
      const nextEnd = formatToDatetimeLocal(nextStart)
      setFormState({
        title: '',
        start: nextStart,
        end: nextEnd,
        notes: '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEvent, existingEvents])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) return

    if (initialEvent) {
      const updated: IEventLocal = {
        id: initialEvent.id,
        title: formState.title,
        start: formState.start,
        end: formState.end,
        notes: formState.notes,
      }
      onUpdateEvent(updated)
    } else {
      const created: IEventLocal = {
        id: crypto.randomUUID(),
        title: formState.title,
        start: formState.start,
        end: formState.end,
        notes: formState.notes,
      }
      onAddEvent(created)
    }
    onResetForm()
  }

  return (
    <>
      <form className="event__form" onSubmit={handleSubmit}>
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

        <Input
          id="start"
          type="datetime-local"
          name="start"
          label="Start date"
          required
          placeholder=""
          min={start}
          value={start}
          autoComplete="off"
          error={startValid}
          fieldValid={!!startValid}
          touched={touchedFields.start}
          onChange={onInputChange}
          onBlur={() => onBlurField('start')}
        />

        <Input
          id="end"
          type="datetime-local"
          name="end"
          label="End date"
          required
          placeholder=""
          min={start}
          value={end}
          autoComplete="off"
          error={endValid}
          fieldValid={!!endValid}
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
        <footer className="event__form-footer">
          <Button
            type="submit"
            className="btn btn--filled event__form-button"
            disabled={!isFormValid}
          >
            {initialEvent ? 'Edit' : 'Create'}
          </Button>
          <Button type="reset" className="btn btn--text event__form-button" onClick={onResetForm}>
            Reset
          </Button>
        </footer>
      </form>
    </>
  )
}
