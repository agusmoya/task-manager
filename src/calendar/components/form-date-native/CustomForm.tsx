import { useState } from "react"

import dayjs from "dayjs"
import "dayjs/locale/es"
import "dayjs/locale/en"

import "./EventForm.css"

export const EventFormDateNative = () => {

  const [formValues, setFormValues] = useState({
    title: "New event",
    notes: "",
    start: dayjs("2025-02-03 07:30").format("YYYY-MM-DDTHH:mm"),
    end: dayjs("2025-02-04 12:30").format("YYYY-MM-DDTHH:mm"),
    today: dayjs().format("YYYY-MM-DDTHH:mm")
  })

  const { title, notes, start, end, today } = formValues

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const onDateChange = ({ target }: React.ChangeEvent<HTMLInputElement>, changing: string) => {
    setFormValues({
      ...formValues,
      [changing]: target.value,
    })
  }

  return (
    <form action="" className="form">
      {/* START */}
      <div className="form__box">
        <input
          type="datetime-local"
          className="form__input"
          placeholder=""
          autoComplete="off"
          name="start"
          min={today}
          value={today}
          onChange={(event) => onDateChange(event, 'start')}
        />
        <label className="form__label">Start date: {start}</label>
      </div>
      {/* END */}
      <div className="form__box">
        <input
          type="datetime-local"
          className="form__input"
          placeholder=""
          autoComplete="off"
          name="end"
          min={start}
          value={end}
          onChange={(event) => onDateChange(event, 'end')}
        />
        <label className="form__label">End date</label>
      </div>
      {/* TITLE */}
      <div className="form__box">
        <input
          type="text"
          className="form__input"
          placeholder=""
          autoComplete="off"
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <label className="form__label">Title</label>
      </div>
      <div className="form__box">
        <textarea
          className="form__input form__text-area"
          placeholder=""
          rows={3}
          name="notes"
          value={notes}
          onChange={onInputChange}
        />
        <label className="form__label">Notes</label>
      </div>

      <div className="form__footer">
        <button type="reset" className="form__button-reset">
          Reset
        </button>
        <button type="submit" className="form__button-ok">
          Ok
        </button>
      </div>
    </form>
  );
};
