import { useEffect } from "react"

import { addHours } from "date-fns"

import { Input } from "../input/Input.tsx"
import { Textarea } from "../text-area/Textarea.tsx"
import { Button } from "../button/button.tsx"

import { useForm } from "../../hooks/useForm.ts"
import { useCalendarActions } from "../../store/hooks/useCalendarActions.ts"
import { useModalActions } from "../../store/hooks/useModalActions.ts"
import { eventFormFields, eventFormValidations, fromDateToDatetimeLocal, validateStartDateNextEvent, } from "../../helpers/form-validations/getEventFormValidations.ts"
import { mapEventFormToPayload } from "../../helpers/mapEventFormToPayload.ts"


import "./CalendarEventForm.css"


export const CalendarEventForm = () => {
  const {
    title,
    titleValid,
    startDate,
    startDateValid,
    endDate,
    endDateValid,
    notes,
    notesValid,
    isFormValid,
    touchedFields,
    formState,
    setFormState,
    onInputChange,
    onBlurField,
    onResetForm
  } = useForm(eventFormFields, eventFormValidations)
  const { activeCalendarEvent, eventsByTask, saveEventByTaskState } = useCalendarActions()
  const { isModalOpen, closeModal } = useModalActions()

  const formattedStartDate = fromDateToDatetimeLocal(startDate)
  const formattedEndDate = fromDateToDatetimeLocal(endDate)

  useEffect(() => {
    onResetForm()

    if (activeCalendarEvent) {
      setFormState({ ...activeCalendarEvent })
    } else {
      const nextStartDate = validateStartDateNextEvent(eventsByTask)
      const nextEndDate = addHours(nextStartDate, 1)

      setFormState({
        ...eventFormFields,
        startDate: nextStartDate,
        endDate: nextEndDate,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCalendarEvent, isModalOpen, eventsByTask])

  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid) return

    const payload = mapEventFormToPayload(formState)

    await saveEventByTaskState(payload)
    onResetForm()
    closeModal()
  }

  return (
    <>
      <form
        className="event__form"
        onSubmit={handleEventSubmit}
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

        <Input
          id="startDate"
          type="datetime-local"
          name="startDate"
          label="Start date"
          required
          placeholder=""
          min={formattedStartDate}
          value={formattedStartDate}
          autoComplete="off"
          error={startDateValid}
          fieldValid={!!startDateValid}
          touched={touchedFields.startDate}
          onChange={onInputChange}
          onBlur={() => onBlurField('startDate')}
        />

        <Input
          id="endDate"
          type="datetime-local"
          name="endDate"
          label="End date"
          required
          placeholder=""
          min={formattedStartDate}
          value={formattedEndDate}
          autoComplete="off"
          error={endDateValid}
          fieldValid={!!endDateValid}
          touched={touchedFields.endDate}
          onChange={onInputChange}
          onBlur={() => onBlurField('endDate')}
        />

        <Textarea
          id="notes"
          name="notes"
          label="Notes"
          required
          placeholder=""
          value={notes}
          onChange={onInputChange}
          error={notesValid}
          touched={touchedFields.notes}
          autoResize={true}
          onBlur={() => onBlurField('notes')}
        />
        <footer className="event__form-footer">
          <Button
            type="submit"
            className="btn btn--filled event__form-button"
            disabled={!isFormValid}
          >
            Create
          </Button>
          <Button
            type="reset"
            className="btn btn--text event__form-button"
            onClick={onResetForm}
          >
            Reset
          </Button>
        </footer>
      </form>
    </>
  )
}
