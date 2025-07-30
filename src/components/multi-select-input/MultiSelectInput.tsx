import { useId, useState } from 'react'

import { CloseIcon } from '../icons/Icons'
import { Button } from '../button/Button'
import { Loader } from '../loader/Loader'

import { MultiSelectProps } from '../../types/ui/input'

import './MultiSelectInput.css'

export function MultiSelectInput<T>({
  label,
  typeOption,
  options = [],
  actionOnEmpty = false,
  actionLabel = '',
  selectedOptions = [],
  // touched = true,
  loading = false,
  error = undefined,
  actionMethod,
  getOptionLabel,
  getOptionKey,
  onAddItem,
  onRemoveItem,
}: MultiSelectProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const inputId = useId()
  const labelId = `${inputId}-label`
  const errorId = `${inputId}-error`
  // const hasError = touched && !!error

  const optionsAvailable = options.length > 0

  const filteredOptions = options
    .filter(op => !selectedOptions.some(sop => getOptionKey(sop) === getOptionKey(op)))
    .filter(op => getOptionLabel(op).toLowerCase().includes(searchTerm.toLowerCase()))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, item: T) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onAddItem?.(item)
    }
  }
  const handleActionOnEmpty = () => {
    if (typeOption === 'email') actionMethod?.(searchTerm)
  }

  return (
    <div className="multi-select" role="group" aria-labelledby={labelId}>
      <label id={labelId} htmlFor={inputId} className="multi-select-label">
        {label}:
      </label>

      {onAddItem && (
        <ul className="multi-select-selected" aria-live="polite">
          {selectedOptions.length > 0 ? (
            selectedOptions.map(item => (
              <li
                key={getOptionKey(item)}
                className="multi-select-chip"
                role="button"
                aria-label={`Remove ${getOptionLabel(item)}`}
                tabIndex={0}
                onClick={() => onRemoveItem?.(item)}
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
      )}

      <div className="multi-select-search-wrapper">
        <input
          id={inputId}
          type="text"
          className="multi-select-search"
          placeholder={`Search by ${typeOption}...`}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          aria-label={`Search ${label}`}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
        />

        {actionOnEmpty && (
          <Button
            variant="text"
            className="multi-select-search__action-on-empty-btn"
            disabled={loading || !searchTerm}
            onClick={handleActionOnEmpty}
          >
            {loading ? <Loader /> : actionLabel}
          </Button>
        )}
      </div>

      <ul className="multi-select-options" role="listbox" aria-label={`Available ${label}`}>
        {optionsAvailable ? (
          filteredOptions.map(item => (
            <li
              key={getOptionKey(item)}
              role="option"
              aria-selected="false"
              className="multi-select-option"
              tabIndex={0}
              onClick={() => onAddItem?.(item)}
              onKeyDown={e => handleKeyDown(e, item)}
            >
              {getOptionLabel(item)}
            </li>
          ))
        ) : (
          <li>
            <i>No options available</i>
          </li>
        )}
      </ul>

      <div className="multi-select-input__feedback">
        <span id={errorId} className="multi-select-input__error-message" role="alert">
          {error || ''}
        </span>
      </div>
    </div>
  )
}
