import { FC, useId, useState } from 'react'

import clsx from 'clsx'

import { InputProps } from '../../types/ui/input'

import './Input.css'

/**
 * Accessible input component with support for error state and screen readers
 */
export const Input: FC<InputProps> = ({
  id = null,
  name,
  type,
  label,
  value,
  placeholder = '',
  autoComplete = 'off',
  hint,
  error,
  touched,
  required,
  disabled,
  step,
  min,
  max,
  initialStateIcon: InitialStateIcon,
  finalStateIcon: FinalStateIcon,
  onChange,
  onBlur,
  ...rest
}) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`
  const hasError = touched && !!error
  const describedBy =
    [hasError && errorId, hint && !hasError && hintId].filter(Boolean).join(' ') || undefined
  const [stateInput, setStateInput] = useState(false)

  const handleClick = () => {
    setStateInput(prevState => !prevState)
  }

  return (
    <div className="input">
      <div className="input__wrapper">
        <input
          className={clsx(
            'input__field',
            hasError && 'input__field--error',
            disabled && 'input__field--disabled'
          )}
          id={inputId}
          name={name}
          type={type === 'password' && stateInput ? 'text' : type}
          value={value}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          {...rest}
        />
        <label
          htmlFor={inputId}
          className={clsx('input__label', disabled && 'input__label--disabled')}
        >
          {label}
        </label>
        {
          /* For common input */
          !InitialStateIcon && FinalStateIcon && <FinalStateIcon className="input__icon" />
        }
        {
          /* For password type input */
          type === 'password' && InitialStateIcon && FinalStateIcon && (
            <button type="button" className="input__button" onClick={handleClick}>
              {stateInput ? <InitialStateIcon /> : <FinalStateIcon />}
            </button>
          )
        }
      </div>
      <div className="input__feedback">
        {hasError && (
          <span id={errorId} className="input__error-message" role="alert">
            {error}
          </span>
        )}
        {hint && (
          <span id={hintId} className="input__hint">
            Eg: {hint}
          </span>
        )}
      </div>
    </div>
  )
}
