import { ChangeEvent } from "react"

export interface TextareaProps {
  id: string
  name: string
  label: string
  placeholder?: string
  value: string
  error?: string | null
  touched?: boolean
  hint?: string
  disabled?: boolean
  required?: boolean
  autoResize?: boolean
  rows?: number
  cols?: number
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
