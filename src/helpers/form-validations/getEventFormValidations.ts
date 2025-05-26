import { addHours } from 'date-fns'
import dayjs from 'dayjs'

import { CalendarEventForm } from '../../types/calendar-event.d'

import { FormValidations } from '../../hooks/useForm.ts'
import { getToday } from '../../calendar/utils/dateUtils.ts'

const now = getToday()

export const eventFormFields: CalendarEventForm = {
  title: '',
  startDate: addHours(now, 1),
  endDate: addHours(now, 3),
  notes: '',
}
export const eventFormValidations: FormValidations<typeof eventFormFields> = {
  title: [[value => value.trim().length === 0, 'Title is required.']],
  startDate: [
    [value => !value, 'Start date is required.'],
    [
      (value, formState) => {
        const start = new Date(value)
        const end = new Date(formState.endDate)
        return start >= end
      },
      'The start date cannot be later than the end date.',
    ],
  ],
  endDate: [
    [value => !value, 'End date is required.'],
    [
      (value, formState) => {
        const start = new Date(formState.startDate)
        const end = new Date(value)
        return end < start
      },
      'The end date cannot be earlier than the start date.',
    ],
  ],
  notes: [[value => !value, 'Notes are required.']],
}

/**
 * Implementation with: dayjs.
 * Formatea una fecha al formato 'yyyy-MM-ddTHH:mm', requerido por inputs de tipo datetime-local.
 * @param date - La fecha a formatear.
 * @returns Una cadena con el formato adecuado o una cadena vacía si la fecha no es válida.
 */
export const fromDateToDatetimeLocal = (date: Date | string): string => {
  if (!date) {
    console.warn('Date is null')
    return ''
  }
  const parsed = dayjs(date)
  if (!parsed.isValid()) {
    console.warn('Date has an unknown format')
    return ''
  }

  return parsed.format('YYYY-MM-DDTHH:mm')
}

/**
 * Implementation with: date-fns
 * Formatea una fecha al formato 'yyyy-MM-ddTHH:mm', requerido por inputs de tipo datetime-local.
 * @param date - La fecha a formatear.
 * @returns Una cadena con el formato adecuado o una cadena vacía si la fecha no es válida.
 */
// export const formatDateForDatetimeLocal = (date: Date | string): string => {
//   if (!date) return ''
//   const parsedDate = date instanceof Date ? date : new Date(date)
//   if (isNaN(parsedDate.getTime())) return ''
//   return format(parsedDate, "yyyy-MM-dd'T'HH:mm")
// }

/**
 * Return the next date of event, based on last event's end date.
 * @param date - Date to format.
 * @returns Today's date if events is an empty array, or the last loaded date otherwise.
 */
export const validateStartDateNextEvent = (events: CalendarEventForm[] = []): Date => {
  if (events.length === 0) return new Date()

  const lastEndDate = events.reduce((latest, event) => {
    const eventEnd = new Date(event.endDate)
    return eventEnd > latest ? eventEnd : latest
  }, new Date(events[0].endDate))

  return lastEndDate
}
