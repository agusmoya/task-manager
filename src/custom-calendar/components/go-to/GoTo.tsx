import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"

import './GoTo.css'

interface GoToProps {
  today: Date;
  setMonth: Dispatch<SetStateAction<number>>;
  setYear: Dispatch<SetStateAction<number>>;
}

export const GoTo = ({ today, setMonth, setYear }: GoToProps) => {

  const [inputValue, setInputValue] = useState('')

  const handleSubmitGoDate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.length !== 6) return
    const dateArray = inputValue.split('/')
    const [month, year] = dateArray
    setMonth(Number(month) - 1)
    setYear(Number(year))
  }

  const handleClickGoToday = () => {
    setMonth(today.getMonth())
  }

  const handleOnChangeGoToDate = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    let onlyNumbersValue = value.replace(/[^0-9/]/g, "")
    setInputValue(onlyNumbersValue)

    if (onlyNumbersValue.length === 2) {
      setInputValue(onlyNumbersValue + '/')
    }

    if (onlyNumbersValue.length === 7) {
      onlyNumbersValue = onlyNumbersValue.slice(0, 7)
      setInputValue(onlyNumbersValue)
    }

    const { nativeEvent } = event
    const inputEvent = nativeEvent as InputEvent
    if (
      inputEvent.inputType === 'deleteContentBackward'
      && onlyNumbersValue.length === 3
    ) {
      setInputValue(onlyNumbersValue.slice(0, 2))
    }

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
      <button type="button" className="goto__btn-today" onClick={handleClickGoToday}>Today</button>
    </div>
  )
}