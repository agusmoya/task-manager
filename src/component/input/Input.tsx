import { useState } from 'react'

import { type InputProps } from '../../types/types.d'


import './Input.css'


export const Input = ({
  required = false,
  id,
  type,
  name,
  labelName,
  placeholder,
  value,
  hint = '',
  error,
  disabled,
  fieldValid = false,
  autoComplete,
  touchedFields = {},
  toggleShowInputButton = null,
  initialStateIcon: InitialStateIcon = null,
  finalStateIcon: FinalStateIcon = null,
  onChange,

}: InputProps
) => {
  const [stateInput, setStateInput] = useState(false)

  const handleClick = () => {
    setStateInput((prevState) => !prevState)
  }

  return (
    <div className="input">
      <div className="input__wrapper">
        <input
          className={[
            'input__field',
            error && touchedFields?.[name] && 'input__field--error',
            disabled && 'input__field--disabled',
          ].filter(Boolean).join(' ')}
          required={required}
          id={id}
          type={(type === 'password' && stateInput) ? 'text' : type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          disabled={disabled}
          onChange={onChange}
          aria-describedby={
            error && touchedFields?.[name]
              ? `${name}-error`
              : undefined
          }
        />
        <label htmlFor={name} className="input__label">
          {labelName}
        </label>
        {
          (toggleShowInputButton === null)
          &&
          FinalStateIcon && <FinalStateIcon className="input__icon" />
        }
        {
          (InitialStateIcon && FinalStateIcon)
          &&
          <button
            type="button"
            className="input__button"
            onClick={handleClick}
          >
            {(stateInput) ? <InitialStateIcon /> : <FinalStateIcon />}
          </button>
        }
      </div>
      <div className="input__feedback">
        <span className={[
          'input__error-message',
          fieldValid && touchedFields?.[name] && 'show',
        ].filter(Boolean).join(' ')}
        >
          {error}
        </span>
        {
          hint
          && <span className={
            [
              'input__hint',
              fieldValid && touchedFields?.[name] && 'show',
            ].filter(Boolean).join(' ')
          }
          >
            Eg: {hint}
          </span>
        }
      </div>
    </div>
  )
}
