import { InputHTMLAttributes } from 'react'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> {
  id?: string
  name: string
  label: string
  hint?: string
  error?: string | null
  touched?: boolean
  initialStateIcon?: React.ElementType | null
  finalStateIcon?: React.ElementType | null
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export interface InputWithSuggestionsProps
  extends Omit<InputProps, 'initialStateIcon' | 'finalStateIcon'> {
  suggestionData: string[]
  allowCreateIfNotExists: boolean
  loading?: boolean
  onSuggestionClick?: (value: string) => void
  onCreateNew?: (value: string) => void
}

interface MultiSelectProps<T> {
  label: string
  typeOption: string
  options: T[]
  actionOnEmpty?: boolean
  actionLabel?: string
  selectedOptions?: T[]
  touched?: boolean
  error?: string
  loading?: boolean
  actionMethod?: (item: string) => void
  getOptionLabel: (item: T) => string
  getOptionKey: (item: T) => string
  onAddItem?: (item: T) => void
  onRemoveItem?: (item: T) => void
}
