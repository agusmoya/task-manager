import { addHours } from 'date-fns'
import dayjs from 'dayjs'

import { IEventForm } from '../../types/event'

import { FormValidations } from '../../hooks/useForm'
import { getToday } from '../../calendar/utils/dateUtils'

/**
 * Implementation with: dayjs.
 * Formatea una fecha al formato 'yyyy-MM-ddTHH:mm', requerido por inputs de tipo datetime-local.
 * @param date - La fecha a formatear.
 * @returns Una cadena con el formato adecuado o una cadena vacía si la fecha no es válida.
 */
export const formatToDatetimeLocal = (date: Date | string): string => {
  if (!date) return ''

  const parsed = dayjs(date)
  if (!parsed.isValid()) return ''

  return parsed.format('YYYY-MM-DDTHH:mm')
}

const now = getToday()

export const eventFormFields: IEventForm = {
  title: '',
  start: formatToDatetimeLocal(addHours(now, 1)),
  end: formatToDatetimeLocal(addHours(now, 3)),
  notes: '',
}
export const eventFormValidations: FormValidations<typeof eventFormFields> = {
  title: [[value => value.trim().length === 0, 'Title is required.']],
  start: [
    [value => !value, 'Start date is required.'],
    [
      (value, formState) => {
        const start = dayjs(value, 'YYYY-MM-DDTHH:mm')
        const end = dayjs(formState.end, 'YYYY-MM-DDTHH:mm')
        return !start.isBefore(end) // si start >= end, devolvemos true para error
      },
      'The start date cannot be later than the end date.',
    ],
  ],
  end: [
    [value => !value, 'End date is required.'],
    [
      (value, formState) => {
        const start = dayjs(formState.start, 'YYYY-MM-DDTHH:mm')
        const end = dayjs(value, 'YYYY-MM-DDTHH:mm')
        return end.isBefore(start)
      },
      'The end date cannot be earlier than the start date.',
    ],
  ],
}

/**
 * Return the next date of event, based on last event's end date.
 * @param date - Date to format.
 * @returns Today's date if events is an empty array, or the last loaded date otherwise.
 */
export const getNextStartDateForEvent = (events: IEventForm[] = []): string => {
  if (events.length === 0) {
    // Si no hay eventos, partimos de ahora + 1h
    const next = dayjs().add(1, 'hour')
    return next.format('YYYY-MM-DDTHH:mm')
  }

  const lastEnd = events.reduce(
    (latest, event) => {
      const eventEnd = dayjs(event.end, 'YYYY-MM-DDTHH:mm')
      return eventEnd.isAfter(latest) ? eventEnd : latest
    },
    dayjs(events[0].end, 'YYYY-MM-DDTHH:mm')
  )

  // Si la última finalización es anterior a la hora actual, volvemos a ahora +1h
  const nowDayjs = dayjs()
  if (lastEnd.isBefore(nowDayjs)) {
    console.warn('Last event end date is in the past; returning now +1h.')
    return nowDayjs.add(1, 'hour').format('YYYY-MM-DDTHH:mm')
  }

  return lastEnd.add(1, 'hour').format('YYYY-MM-DDTHH:mm')
}
