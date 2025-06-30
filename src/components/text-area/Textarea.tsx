import clsx from 'clsx'

import { TextareaProps } from '../../types/text-area.d'

import './Textarea.css'

export const Textarea = ({
  id,
  required = false,
  name,
  label,
  placeholder = '',
  value,
  error,
  touched = false,
  hint,
  disabled = false,
  rows = 4,
  cols,
  onChange,
  onBlur,
}: TextareaProps) => {
  return (
    <div className="textarea">
      <div className="textarea__wrapper">
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          rows={rows}
          cols={cols}
          className={clsx(
            'textarea__field',
            error && touched && 'textarea__field--error',
            disabled && 'textarea__field--disabled'
          )}
          aria-describedby={error && touched ? `${name}-error` : undefined}
        />
        <label htmlFor={name} className="textarea__label">
          {label}
        </label>
      </div>
      <div className="textarea__feedback">
        {error && touched && (
          <span id={`${id}-error`} className="textarea__error-message">
            {error}
          </span>
        )}
        {hint && <span className="textarea__hint">Eg: {hint}</span>}
      </div>
    </div>
  )
}
