import { useState } from "react"

import './MultiSelectInput.css'

interface MultiSelectProps<T> {
  label: string
  options: T[]
  selectedOptions: T[]
  fieldValid?: string | null
  touched: boolean
  getOptionLabel: (item: T) => string
  getOptionKey: (item: T) => string
  onAddItem: (item: T) => void
  onRemoveItem: (item: T) => void
}

export function MultiSelectInput<T>({
  label,
  options,
  selectedOptions,
  fieldValid,
  touched = false,
  getOptionLabel,
  getOptionKey,
  onAddItem,
  onRemoveItem,
}: MultiSelectProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, item: T) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onAddItem(item)
    }
  }

  const addedOptions = selectedOptions ?? []

  const filteredOptions = options
    .filter(op => !selectedOptions.some(sop => getOptionKey(sop) === getOptionKey(op)))
    .filter(op => getOptionLabel(op).toLowerCase().includes(searchTerm.toLowerCase()))


  return (
    <div className="multi-select" role="group" aria-labelledby={`${label}-label`}>

      <label htmlFor={`${label}-search-label`} className="multi-select-label">
        Participants:
      </label>

      <ul className="multi-select-selected" aria-live="polite">
        {
          addedOptions.length > 0
            ?
            addedOptions.map((item) => (
              <li
                key={getOptionKey(item)}
                className="multi-select-chip"
                role="button"
                aria-label={`Remove ${getOptionLabel(item)}`}
                tabIndex={0}
                onClick={() => onRemoveItem(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
              >
                {getOptionLabel(item)} <span aria-hidden>&nbsp;✕</span>
              </li>
            ))
            :
            <li className="multi-select-chip--none">No {label?.toLocaleLowerCase()} selected</li>
        }
      </ul>

      <input
        id={`${label}-search-label`}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="multi-select-search"
        aria-label={`Search ${label}`}
      />

      <ul
        className="multi-select-options"
        role="listbox"
        aria-label={`Available ${label}`}
      >
        {
          filteredOptions.length > 0
            ?
            filteredOptions.map((item) => (
              <li
                key={getOptionKey(item)}
                role="option"
                aria-selected="false"
                className="multi-select-option"
                tabIndex={0}
                onClick={() => onAddItem(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
              >
                {getOptionLabel(item)}
              </li>
            ))
            :
            <li><i>No options availables</i></li>
        }
      </ul>

      <div className="multi-select-input__feedback">
        {
          fieldValid && touched && (
            <span
              id={`${label}-error`}
              className="multi-select-input__error-message"
            >
              {fieldValid}
            </span>
          )
        }
      </div>
    </div>
  )
}
