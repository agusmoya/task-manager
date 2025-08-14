import { FC, useEffect, useId, useRef, useState } from 'react'

import clsx from 'clsx'

import { InputWithSuggestionsProps } from '../../types/ui/input'

import './inputWithSuggestions.css'

export const InputWithSuggestions: FC<InputWithSuggestionsProps> = ({
  id = null,
  name,
  label,
  value,
  type,
  placeholder = '',
  hint,
  error,
  touched = false,
  required = false,
  disabled = false,
  allowCreateIfNotExists,
  autoComplete = 'off',
  suggestionData,
  loading = false,
  onChange,
  onBlur,
  onCreateNew,
  ...rest
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const hasError = touched && !!error
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`
  const describedBy =
    [hasError && errorId, hint && !hasError && hintId].filter(Boolean).join(' ') || undefined
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!String(value).trim()) {
      setFilteredSuggestions(suggestionData)
      return
    }
    const filtered = suggestionData.filter(item =>
      item.toLowerCase().includes(String(value).toLowerCase())
    )
    setFilteredSuggestions(filtered)
  }, [value, suggestionData])

  // Close suggestions when clicking outside the input or selecting one
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSuggestionClick = (value: string) => {
    const syntheticEvent = {
      target: {
        name,
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>

    onChange?.(syntheticEvent)
    setShowSuggestions?.(false)
  }

  const handleCreateNew = () => {
    onCreateNew!(String(value))
    setShowSuggestions(false)
  }

  return (
    <div className="input" ref={containerRef}>
      <div className="input__wrapper">
        <input
          id={inputId}
          name={name}
          type={type ?? 'text'}
          value={value}
          onBlur={onBlur}
          onChange={e => {
            onChange?.(e)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={clsx(
            'input__field',
            error && touched && 'input__field--error',
            disabled && 'input__field--disabled'
          )}
          role="combobox"
          aria-describedby={describedBy}
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          aria-controls={`${inputId}-suggestions`}
          {...rest}
        />
        <label htmlFor={inputId} className="input__label">
          {label}
        </label>
      </div>

      <div className="input__feedback">
        {showSuggestions && (
          <ul id={`${inputId}-suggestions`} role="listbox" className="input-suggestions">
            {filteredSuggestions.map((item, idx) => (
              <li
                key={idx}
                role="option"
                tabIndex={0}
                className="input-suggestion"
                onClick={() => handleSuggestionClick(item)}
              >
                {item}
              </li>
            ))}
            {allowCreateIfNotExists && value && filteredSuggestions.length === 0 && (
              <li className="input-suggestion input-suggestion--create" onClick={handleCreateNew}>
                Create <strong>"{value}"</strong>
              </li>
            )}
          </ul>
        )}

        {loading && <span>Loading...</span>}
        {hasError && !showSuggestions && (
          <span id={errorId} className="input__error-message" role="alert">
            {error}
          </span>
        )}
        {hint && !showSuggestions && !hasError && (
          <span id={hintId} className="input__hint">
            Eg: {hint}
          </span>
        )}
      </div>
    </div>
  )
}
