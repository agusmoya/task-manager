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
  toggleShowInputButton?: boolean | null
  initialStateIcon?: React.ElementType | null
  finalStateIcon?: React.ElementType | null
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}
