import { useEffect, useState } from "react"

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

import { useCalendarStore } from "../../../store/hooks/useCalendarStore.ts";
import { useEventModalStore } from "../../../store/hooks/useEventModalStore.ts";
import { useEventFormValidation } from "../../hooks/useEventFormValidation.ts";

import { type EventForm } from "../../types/event.d";

import "./EventForm.css"

registerLocale('es', es)

export const EventCalendarForm = () => {
  const [formValues, setFormValues] = useState<EventForm>({
    title: "",
    notes: "",
    start: new Date(),
    end: new Date(),
  })
  const { title, start, end, notes } = formValues
  const { errors, setErrors, validateForm } = useEventFormValidation()
  const { activeEvent, startSavignEvent } = useCalendarStore()
  const { closeModal } = useEventModalStore()

  useEffect(() => {
    if (activeEvent) {
      setFormValues({ ...activeEvent })
      setErrors({}) // clean previous errors
    }

  }, [activeEvent, setErrors])

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target
    // Clear the error if the field is corrected
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }))
      return
    }

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const onDateChange = (date: Date | null, changing: string) => {
    if (date && changing === 'end' && date.getTime() < start.getTime()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        end: "The end date cannot be earlier than the start date."
      }))
      return
    }

    // Clear the error if the date is corrected
    if (errors[changing]) {
      setErrors((prevErrors) => ({ ...prevErrors, [changing]: "" }))
    }
    setFormValues({
      ...formValues,
      [changing]: date,
    })
  }

  const handleReset = () => {
    setFormValues({
      title: "",
      notes: "",
      start: new Date(),
      end: new Date(),
    })
    setErrors({})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm(formValues)) {
      console.log("Form with errors. Please, check data.")
      return
    }

    await startSavignEvent(formValues)
    handleReset()
    closeModal()
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="grid">
        {/* START */}
        <div className="form__box">
          <DatePicker
            className="form__input"
            id="start-date"
            name="start-date"
            minDate={start}
            selected={start}
            onChange={(date) => onDateChange(date, 'start')}
            dateFormat="Pp"
            showTimeSelect
            locale='es'
            timeCaption="Hora"
            autoFocus={false}
            aria-invalid={!!errors.end}
            aria-describedby="start-error"
          />
          <label htmlFor="start-date" className="form__label form__label-date">Start date</label>
          {errors.start && <small className="form__error">{errors.start}</small>}
        </div>
        {/* END */}
        <div className="form__box">
          <DatePicker
            className="form__input"
            id="end-date"
            name="end-date"
            minDate={start}
            selected={end}
            onChange={(date) => onDateChange(date, 'end')}
            dateFormat="Pp"
            showTimeSelect
            locale='es'
            timeCaption="Hora"
            aria-invalid={!!errors.end}
            aria-describedby="end-error"
          />
          <label htmlFor="end-date" className="form__label form__label-date">End date</label>
          {errors.end && <small className="form__error">{errors.end}</small>}
        </div>
      </div>
      {/* TITLE */}
      <div className="form__box">
        <input
          id="title"
          name="title"
          type="text"
          className="form__input"
          placeholder=""
          autoComplete="off"
          value={title}
          onChange={onInputChange}
          aria-invalid={!!errors.title}
          aria-describedby="title-error"
        />
        <label htmlFor="title" className="form__label">Title</label>
        {errors.title && <small className="form__error">{errors.title}</small>}
      </div>
      {/* NOTES */}
      <div className="form__box">
        <textarea
          id="notes"
          name="notes"
          className="form__input form__text-area"
          placeholder=""
          rows={3}
          value={notes}
          onChange={onInputChange}
          autoFocus={false}
        />
        <label htmlFor="notes" className="form__label">Notes</label>
      </div>
      <div className="form__footer">
        <button type="submit" className="form__button-save">
          Save
        </button>
        <button type="reset" className="form__button-reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  )
}
