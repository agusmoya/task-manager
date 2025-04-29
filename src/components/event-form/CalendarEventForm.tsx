import { useEffect } from "react"

import { Input } from "../input/Input.tsx"
import { Textarea } from "../text-area/Textarea.tsx"
import { Button } from "../button/button.tsx"

import { useForm } from "../../hooks/useForm.ts"
import { useCalendarActions } from "../../store/hooks/useCalendarActions.ts"
import { useEventModalActions } from "../../store/hooks/useEventModalActions.ts"
import {
  eventFormFields,
  eventFormValidations,
  fromDateToDatetimeLocal
} from "../../helpers/form-validations/getEventFormValidations.ts"


import "./CalendarEventForm.css"
import { TODAY } from "../../calendar/constants/constants.ts"


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
  const { activeCalendarEvent, saveEventState } = useCalendarActions()
  const { closeModal } = useEventModalActions()

  useEffect(() => {
    if (activeCalendarEvent) {
      onResetForm()
      setFormState({ ...activeCalendarEvent })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCalendarEvent])


  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) {
      return console.error('Form with errors')
    }

    await saveEventState(formState)
    onResetForm()
    closeModal()
  }

  const formattedStartDate = fromDateToDatetimeLocal(startDate)
  const formattedEndDate = fromDateToDatetimeLocal(endDate)
  const formattedTodayDate = fromDateToDatetimeLocal(TODAY)

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
          value={formattedStartDate}
          min={formattedTodayDate}
          autoComplete="off"
          error={startDateValid}
          fieldValid={!!startDateValid}
          touched={touchedFields.endDate}
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
          value={formattedEndDate}
          min={formattedStartDate}
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
