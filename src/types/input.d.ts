export type InputProps = {
  id: string
  name: string
  label: string
  type: string
  placeholder: string
  value: string
  min?: string
  max?: string
  hint?: string
  error?: string | null
  touched?: boolean
  required?: boolean
  disabled?: boolean
  fieldValid: boolean
  autoComplete: string
  initialStateIcon?: React.ElementType | null
  finalStateIcon?: React.ElementType | null
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

interface InputWithSuggestionsProps {
  id: string
  name: string
  label: string
  placeholder?: string
  value: string
  hint?: string
  error?: string | null
  touched?: boolean
  required?: boolean
  disabled?: boolean
  fieldValid: boolean
  autoComplete?: string
  suggestionData: string[]
  allowCreateIfNotExists: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSuggestionClick?: (value: string) => void
  onCreateNew?: (value: string) => void
  loading?: boolean
  backendError?: string | null
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
