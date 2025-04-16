import { useState } from "react"

import { type EventForm } from "../../types/calendar-event-dp"

export const useEventFormValidation = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = ({ title, start, end }: EventForm): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!title || title.trim().length === 0) {
      newErrors.title = "Title is required.";
    }

    if (!start) {
      newErrors.start = "Start date is required.";
    }

    if (!end) {
      newErrors.end = "End date is required.";
    }

    if (end < start) {
      newErrors.end = "The end date cannot be earlier than the start date.";
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return { errors, validateForm, setErrors }
}