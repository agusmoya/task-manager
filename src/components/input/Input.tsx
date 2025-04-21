import { useState } from 'react'

import { type InputProps } from '../../types/input.d'


import './Input.css'


export const Input = (
  {
    id,
    required = false,
    type,
    name,
    label,
    placeholder,
    value,
    min = '',
    max = '',
    hint = '',
    error,
    disabled = false,
    fieldValid = false,
    autoComplete,
    touched = false,
    toggleShowInputButton = null,
    initialStateIcon: InitialStateIcon = null,
    finalStateIcon: FinalStateIcon = null,
    onChange,
  }: InputProps) => {

  const [stateInput, setStateInput] = useState(false)

  const handleClick = () => {
    setStateInput((prevState) => !prevState)
  }

  return (
    <div className="input">
      <div className="input__wrapper">
        <input
          required={required}
          id={id}
          type={(type === 'password' && stateInput) ? 'text' : type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          min={type === 'datetime-local' ? min : ''}
          max={type === 'datetime-local' ? max : ''}
          disabled={disabled}
          onChange={onChange}
          aria-describedby={
            error && touched ? `${name}-error` : undefined
          }
          className={[
            'input__field',
            error && touched ? 'input__field--error' : '',
            disabled ? 'input__field--disabled' : '',
          ].filter(Boolean).join(' ')}
        />
        <label htmlFor={name} className="input__label">
          {label}
        </label>
        {
          /* For common input */
          toggleShowInputButton
          && FinalStateIcon
          && <FinalStateIcon className="input__icon" />
        }
        {
          /* For password type input */
          (InitialStateIcon && FinalStateIcon)
          &&
          <button
            type="button"
            className="input__button"
            onClick={handleClick}
          >
            {
              (stateInput)
                ? <InitialStateIcon />
                : <FinalStateIcon />
            }
          </button>
        }
      </div>
      <div className="input__feedback">
        {
          fieldValid && touched && (
            <span
              id={`${name}-error`}
              className="input__error-message"
            >
              {error}
            </span>
          )
        }
        {
          hint && !error
          && <span className='input__hint'>
            Eg: {hint}
          </span>
        }
      </div>
    </div>
  )
}
