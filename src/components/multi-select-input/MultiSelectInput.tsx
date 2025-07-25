import { useId, useState } from 'react'

import { CloseIcon } from '../icons/Icons'

import { MultiSelectProps } from '../../types/ui/input'

import './MultiSelectInput.css'

export function MultiSelectInput<T>({
  label,
  options,
  selectedOptions,
  touched = false,
  error = undefined,
  getOptionLabel,
  getOptionKey,
  onAddItem,
  onRemoveItem,
}: MultiSelectProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const inputId = useId()
  const labelId = `${inputId}-label`
  const errorId = `${inputId}-error`
  const hasError = touched && !!error

  const addedOptions = selectedOptions ?? []

  const filteredOptions = options
    .filter(op => !selectedOptions.some(sop => getOptionKey(sop) === getOptionKey(op)))
    .filter(op => getOptionLabel(op).toLowerCase().includes(searchTerm.toLowerCase()))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, item: T) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onAddItem(item)
    }
  }

  return (
    <div className="multi-select" role="group" aria-labelledby={labelId}>
      <label id={labelId} htmlFor={inputId} className="multi-select-label">
        {label}:
      </label>

      <ul className="multi-select-selected" aria-live="polite">
        {addedOptions.length > 0 ? (
          addedOptions.map(item => (
            <li
              key={getOptionKey(item)}
              className="multi-select-chip"
              role="button"
              aria-label={`Remove ${getOptionLabel(item)}`}
              tabIndex={0}
              onClick={() => onRemoveItem(item)}
              onKeyDown={e => handleKeyDown(e, item)}
            >
              <span>{getOptionLabel(item)}</span>
              <CloseIcon />
            </li>
          ))
        ) : (
          <li className="multi-select-chip--none">No {label.toLocaleLowerCase()} selected</li>
        )}
      </ul>

      <input
        id={inputId}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="multi-select-search"
        aria-label={`Search ${label}`}
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError}
      />

      <ul className="multi-select-options" role="listbox" aria-label={`Available ${label}`}>
        {filteredOptions.length > 0 ? (
          filteredOptions.map(item => (
            <li
              key={getOptionKey(item)}
              role="option"
              aria-selected="false"
              className="multi-select-option"
              tabIndex={0}
              onClick={() => onAddItem(item)}
              onKeyDown={e => handleKeyDown(e, item)}
            >
              {getOptionLabel(item)}
            </li>
          ))
        ) : (
          <li>
            <i>No options availables</i>
          </li>
        )}
      </ul>

      <div className="multi-select-input__feedback">
        {hasError && (
          <span id={errorId} className="multi-select-input__error-message" role="alert">
            {error}
          </span>
        )}
      </div>
    </div>
  )
}
