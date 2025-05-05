import { useEffect, useRef, useState } from 'react'

import { type InputWithSuggestionsProps } from '../../types/input.d'

import '../input/Input.css'
import './inputWithSuggestions.css'


export const InputWithSuggestions = ({
  id,
  name,
  label,
  placeholder = '',
  value,
  hint = '',
  error,
  touched = false,
  required = false,
  disabled = false,
  fieldValid = false,
  allowCreateIfNotExists,
  autoComplete = 'off',
  suggestionData,
  loading = false,
  backendError = null,
  onChange,
  onBlur,
  onCreateNew,

}: InputWithSuggestionsProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!value.trim()) {
      setFilteredSuggestions(suggestionData)
      return
    }
    const filtered = suggestionData.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredSuggestions(filtered)
  }, [value, suggestionData])

  // Close suggestions when clicking outside the input or selecting one
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current
        && !containerRef.current.contains(event.target as Node)
      ) {
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

    onChange(syntheticEvent)
    setShowSuggestions(false)
  }

  const handleCreateNew = () => {
    onCreateNew!(value)
    setShowSuggestions(false)
  }

  return (
    <div className="input" ref={containerRef}>
      <div className="input__wrapper">
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          onBlur={onBlur}
          onChange={(e) => {
            onChange(e)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-describedby={error && touched ? `${name}-error` : undefined}
          className={[
            'input__field',
            error && touched ? 'input__field--error' : '',
            disabled ? 'input__field--disabled' : '',
          ].filter(Boolean).join(' ')}
        />
        <label htmlFor={name} className="input__label">
          {label}
        </label>
      </div>

      <div className="input__feedback">
        {
          showSuggestions
          &&
          <ul className="input-suggestions">
            {
              filteredSuggestions.map((item, index) => (
                <li
                  key={index}
                  className="input-suggestion"
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item}
                </li>
              ))
            }
            {
              allowCreateIfNotExists
              && filteredSuggestions.length === 0
              &&
              <li
                className="input-suggestion input-suggestion--create"
                onClick={handleCreateNew}
              >
                Create <strong>"{value}"</strong>
              </li>

            }
          </ul>
        }

        {loading && <span>Loading...</span>}
        {
          backendError
          && <span id={`${name}-error`} className="input__error-message">
            {backendError}
          </span>
        }
        {
          !showSuggestions && touched && fieldValid
          && (
            <span id={`${name}-error`} className="input__error-message">
              {error}
            </span>
          )
        }
        {
          !showSuggestions && hint
          && (
            <span className="input__hint">
              Eg: {hint}
            </span>
          )
        }
      </div>
    </div>
  )
}
