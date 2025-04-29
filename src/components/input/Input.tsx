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
    initialStateIcon: InitialStateIcon = null,
    finalStateIcon: FinalStateIcon = null,
    onChange,
    onBlur,
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
          className={[
            'input__field',
            fieldValid && touched ? 'input__field--error' : '',
            disabled ? 'input__field--disabled' : '',
          ].filter(Boolean).join(' ')}
          aria-describedby={
            fieldValid && touched ? `${name}-error` : undefined
          }
          onChange={onChange}
          onBlur={onBlur}
        />
        <label htmlFor={name} className="input__label">
          {label}
        </label>
        {
          /* For common input */
          !InitialStateIcon
          && FinalStateIcon
          && <FinalStateIcon className="input__icon" />
        }
        {
          /* For password type input */
          (type === 'password' && InitialStateIcon && FinalStateIcon)
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
          fieldValid && touched
          &&
          <span
            id={`${name}-error`}
            className="input__error-message"
          >
            {error}
          </span>
        }
        {
          hint
          && <span className='input__hint'>
            Eg: {hint}
          </span>
        }
      </div>
    </div>
  )
}
