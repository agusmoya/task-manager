import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"

import './GoTo.css'

interface GoToProps {
  today: Date;
  setMonth: Dispatch<SetStateAction<number>>;
  setYear: Dispatch<SetStateAction<number>>;
}

export const GoTo = ({ today, setMonth, setYear }: GoToProps) => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')

  const handleSubmitGoDate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputValue.length !== 7) return
    const dateArray = inputValue.split('/')
    const [month, year] = dateArray

    if (Number(month) > 12 || Number(month) < 1) {
      setError('Invalid month')
      return
    }
    setMonth(Number(month) - 1)
    setYear(Number(year))
  }

  const handleClickGoToday = () => {
    setMonth(today.getMonth())
    setYear(today.getFullYear())
  }

  const handleOnChangeGoToDate = (event: ChangeEvent<HTMLInputElement>) => {
    setError('')
    const { value } = event.target
    const inputEvent = event.nativeEvent as InputEvent

    // Extraer solo números
    let onlyNumbers = value.replace(/[^0-9]/g, "")

    // Asegurar que no haya más de un "/"
    if (onlyNumbers.length > 2) {
      onlyNumbers = onlyNumbers.slice(0, 2) + '/' + onlyNumbers.slice(2)
    }

    // Limitar a 7 caracteres (mm/yyyy)
    let formattedValue = onlyNumbers.slice(0, 7)
    // Manejo de borrado (evitar que al borrar el "/" se reescriba)
    if (inputEvent.inputType === "deleteContentBackward" && formattedValue.length === 3) {
      formattedValue = formattedValue.slice(0, 3)
    }

    setInputValue(formattedValue)
  }

  return (
    <div className="goto">
      <form className="goto__form" onSubmit={handleSubmitGoDate}>
        <input
          className="goto__form-date"
          value={inputValue}
          type="text"
          placeholder="mm/yyyy"
          onChange={handleOnChangeGoToDate}
        />
        <button className="goto__form-btn">Go</button>
      </form>
      {error && <span className="goto__form-error">{error}</span>}
      <button type="button" className="goto__btn-today" onClick={handleClickGoToday}>Today</button>
    </div>
  )
}
